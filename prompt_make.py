import json
import re
import requests
from typing import Any, Dict, Optional


def extract_json_from_text(text: str) -> Optional[Dict[str, Any]]:
    """
    Extract the first JSON object from LLM output.
    Works even if the model adds extra text before/after the JSON.
    """
    if not text:
        return None

    # Try parsing the whole output first
    try:
        parsed = json.loads(text)
        if isinstance(parsed, dict):
            return parsed
    except json.JSONDecodeError:
        pass

    # Regex fallback: grab the first JSON-like object
    match = re.search(r"\{[\s\S]*?\}", text)
    if not match:
        return None

    candidate = match.group(0)

    try:
        parsed = json.loads(candidate)
        if isinstance(parsed, dict):
            return parsed
    except json.JSONDecodeError:
        return None

    return None


def extract_verdict(parsed: Dict[str, Any]) -> str:
    """
    Normalize verdict into YES / NO / IRRELEVANT.
    """
    raw = str(parsed.get("verdict", "")).strip().upper()

    if raw in {"YES", "NO", "IRRELEVANT"}:
        return raw

    if "YES" in raw:
        return "YES"
    if "NO" in raw:
        return "NO"
    if "IRRELEVANT" in raw or "DOESNT MATTER" in raw or "DOESN'T MATTER" in raw:
        return "IRRELEVANT"

    return "UNKNOWN"


def load_game_file(filepath: str) -> Dict[str, Any]:
    with open(filepath, "r", encoding="utf-8") as f:
        return json.load(f)


def call_lm_studio(prompt: str) -> str:
    url = "http://127.0.0.1:1234/v1/chat/completions"

    payload = {
        "model": "meta-llama-3.1-8b-instruct",
        "messages": [
            {"role": "system", "content": "Return only one JSON object."},
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.1
    }

    response = requests.post(url, json=payload, timeout=120)
    response.raise_for_status()

    result = response.json()

    if "choices" not in result:
        raise KeyError(f"Response JSON does not contain 'choices': {result}")

    return result["choices"][0]["message"]["content"]


def build_prompt(data: Dict[str, Any], public_info: str, userQ: str) -> str:
   prompt = f"""
You are the judge for a Turtle Soup (lateral thinking puzzle) game.

Your job is to answer the player's yes/no question using the hidden solution as the ground truth.

IMPORTANT:
- The player only sees the public scenario.
- You, the judge, also know the hidden truth.
- Judge the player's question against the hidden truth, NOT only against the public scenario.

Return one of these verdicts:
- YES: the question is supported by the hidden truth.
- NO: the question is contradicted by the hidden truth.
- IRRELEVANT: the question asks about something not established by the hidden truth, or not meaningfully related to solving the puzzle.

Rules:
1. Use hidden_truth as the main source of truth.
2. Use public_info only as the visible setup seen by the player.
3. Do not invent facts beyond hidden_truth.
4. If the hidden truth clearly supports the question, answer YES.
5. If the hidden truth clearly contradicts the question, answer NO.
6. If the hidden truth does not establish the answer, answer IRRELEVANT.
7. Return only valid JSON.
8. clarification must be short and directly explain the verdict.

Public scenario:
\"\"\"
{public_info}
\"\"\"

Hidden truth:
\"\"\"
{data.get("hidden_truth", "")}
\"\"\"

Player question:
\"\"\"
{userQ}
\"\"\"

Full data:
{json.dumps(data, ensure_ascii=False, indent=2)}

Output format:
{{
  "verdict": "YES | NO | IRRELEVANT",
  "clarification": "short explanation"
}}

Examples:

Example 1
Public scenario:
A man walks into a restaurant and orders turtle soup. After tasting it, he goes home and kills himself.

Hidden truth:
Years ago he was stranded and was fed human flesh while being told it was turtle soup. After tasting real turtle soup, he realized the truth.

Question:
Did he unknowingly eat human flesh before?

Output:
{{
  "verdict": "YES",
  "clarification": "The hidden truth says the earlier soup was actually human flesh."
}}

Example 2
Question:
Did the restaurant poison him?

Output:
{{
  "verdict": "NO",
  "clarification": "The hidden truth says the restaurant served real turtle soup, not poison."
}}

Example 3
Question:
Was the chef his brother?

Output:
{{
  "verdict": "IRRELEVANT",
  "clarification": "The hidden truth gives no information about the chef being his brother."
}}

Now answer the player question.
"""
   
   return prompt


def main() -> None:
    game_path = "soup_archive/Turtle_Soup.json"

    try:
        data = load_game_file(game_path)
    except FileNotFoundError:
        print(f"Game file not found: {game_path}")
        return
    except json.JSONDecodeError as e:
        print(f"Invalid JSON in game file: {e}")
        return

    public_info = data.get("public_info") or ""

    print("=== Turtle Soup ===")
    print("Scenario:")
    print(public_info)

    while True:
        userQ = input("\nAsk a yes/no question (type 'exit' to quit): ").strip()

        if userQ.lower() in {"exit", "quit"}:
            print("Game ended.")
            break

        if not userQ:
            print("Please enter a valid question.")
            continue

        print(f"\nYou asked: {userQ}")

        prompt = build_prompt(data, public_info, userQ)

        try:
            output_text = call_lm_studio(prompt)
        except requests.exceptions.RequestException as e:
            print(f"HTTP request failed: {e}")
            continue
        except KeyError as e:
            print(f"Unexpected LM Studio response format: {e}")
            continue
        except json.JSONDecodeError as e:
            print(f"Failed to decode LM Studio response JSON: {e}")
            continue

        parsed = extract_json_from_text(output_text)

        if parsed is None:
            print("\nCould not extract valid JSON from model output.")
            print("Raw model output:")
            print(output_text)
            continue

        verdict = extract_verdict(parsed)
        clarification = str(parsed.get("clarification", "")).strip()

        print("\nResult:")
        print("Verdict:", verdict)
        print("Clarification:", clarification)


if __name__ == "__main__":
    main()