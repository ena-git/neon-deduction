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
    Normalize verdict into YES / NO / IRRELEVANT / DOUBTFUL.
    """
    raw = str(parsed.get("verdict", "")).strip().upper()

    if raw in {"YES", "NO", "IRRELEVANT", "DOUBTFUL"}:
        return raw

    if "YES" in raw:
        return "YES"
    if "DOUBTFUL" in raw:
        return "DOUBTFUL"
    if "NO" in raw:
        return "NO"
    if "IRRELEVANT" in raw or "DOESNT MATTER" in raw or "DOESN'T MATTER" in raw:
        return "IRRELEVANT"

    return "UNKNOWN"


def load_game_file(filepath: str) -> Dict[str, Any]:
    with open(filepath, "r", encoding="utf-8") as f:
        return json.load(f)


def call_lm_studio(prompt: str) -> str:
    url = input ("Enter the API URL:").strip()

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
   hidden_truth = data.get("hidden_truth", "")

   prompt = f"""You are the judge of a Turtle Soup (lateral thinking) puzzle game.

The player sees only the public scenario and asks yes/no questions to deduce the hidden truth. You know both. Judge the player's question strictly against the hidden truth.

---

## Verdicts (pick exactly one)

| Verdict    | When to use |
|------------|-------------|
| YES        | The hidden truth clearly supports or confirms the question. |
| NO         | The hidden truth explicitly contradicts the question. Only use NO when there is a direct contradiction. |
| DOUBTFUL   | The question is partially related to the hidden truth but is neither clearly confirmed nor clearly contradicted. The player is on a plausible but uncertain track. |
| IRRELEVANT | The question asks about something the hidden truth says nothing about, or it has no meaningful connection to the puzzle. |

Key distinction -- NO vs DOUBTFUL:
- NO = the hidden truth states the opposite of what the player asked.
- DOUBTFUL = the hidden truth does not fully confirm it, but does not contradict it either.
When in doubt between NO and DOUBTFUL, prefer DOUBTFUL.

Key distinction -- DOUBTFUL vs IRRELEVANT:
- DOUBTFUL = the topic is related to the puzzle but the specific claim is uncertain.
- IRRELEVANT = the topic has no connection to the puzzle at all.

---

## Rules
1. Use the hidden truth as the sole source of truth. Do not invent facts beyond it.
2. The public scenario is only context for what the player can see.
3. Return exactly one JSON object, nothing else.
4. The clarification must be one short sentence explaining the verdict without revealing the hidden truth.

---

## Puzzle

Public scenario (visible to the player):
\"\"\"
{public_info}
\"\"\"

Hidden truth (only you know this):
\"\"\"
{hidden_truth}
\"\"\"

Player's question:
\"\"\"
{userQ}
\"\"\"

---

## Examples

Using the classic turtle soup puzzle as reference:
- Public: "A man orders turtle soup at a restaurant, tastes it, then kills himself."
- Hidden: "He was once stranded and fed human flesh disguised as turtle soup. Tasting real turtle soup revealed the truth."

Q: "Did he unknowingly eat human flesh before?"
-> {{{{"verdict": "YES", "clarification": "The hidden truth confirms he was fed human flesh."}}}}

Q: "Did the restaurant poison him?"
-> {{{{"verdict": "NO", "clarification": "The hidden truth says the restaurant served real turtle soup, not poison."}}}}

Q: "Was the waiter rude to him?"
-> {{{{"verdict": "IRRELEVANT", "clarification": "The hidden truth says nothing about the waiter's behavior."}}}}

Q: "Was he feeling guilty about something?"
-> {{{{"verdict": "DOUBTFUL", "clarification": "Guilt is plausible but the hidden truth does not explicitly mention guilt."}}}}

---

Now judge the player's question. Return only valid JSON:
{{{{
  "verdict": "YES | NO | DOUBTFUL | IRRELEVANT",
  "clarification": "one short sentence"
}}}}"""

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
