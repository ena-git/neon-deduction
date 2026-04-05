// ============================================================
//  NEON DEDUCTION — Shared Mystery Data & Utilities
// ============================================================

const MYSTERIES = [

  // ── CASE #001 ───────────────────────────────────────────────
  {
    id: 'last-photograph',
    caseNumber: 'CASE #001',
    title: 'The Last Photograph',
    difficulty: 'HARD',
    difficultyClass: 'hard',
    mode: 'competitive',
    location: 'Abandoned Apartment, East District',

    scenario:
      'A man is found dead clutching a photograph of himself. ' +
      'The photo was taken yesterday — yet he\'s been alone all week. ' +
      'There are no signs of forced entry.',

    truth:
      'The man was blind. He had no idea anyone else was in the apartment. ' +
      'A killer broke in, photographed him, and murdered him. ' +
      'The photograph was left in his hands as a deliberate calling card.',

    // Three key facts that anchor signal evaluation
    hints: [
      'The man was completely blind and could not perceive the intruder',
      'A killer broke into the apartment and took the photograph',
      'The photo was planted in his hands as a calling card — not taken by the victim'
    ],

    // Used by checkAnswer() for final answer scoring
    keywords: [
      'blind', 'blindness', 'could not see', 'murder', 'murdered',
      'killer', 'killed', 'intruder', 'calling card', 'someone else',
      'broke in', 'break in', 'planted'
    ],
    requiredKeywords: ['blind', 'blindness', 'murder', 'murdered', 'killer', 'calling card'],

    // ── Structured truth model for deterministic judging ──────
    // Core truth: victim was blind; intruder murdered him; photo is a calling card
    // False assumptions: he took it himself (self-timer), supernatural cause, suicide
    truthModel: {
      greenKeywords: [
        // The blindness angle — the key twist
        'blind', 'blindness', 'blind man', 'could not see', 'cannot see',
        'sight', 'sightless', 'visually impaired', 'no vision', 'lost his sight',
        'he was blind', 'the victim was blind',
        // The murder angle
        'murder', 'murdered', 'killer', 'killed', 'intruder', 'intruded',
        'broke in', 'break in', 'breaking in', 'someone broke',
        'someone else', 'another person', 'someone was there', 'someone entered',
        // The calling card angle
        'calling card', 'planted', 'left behind', 'left the photo',
        'placed the photo', 'message', 'signature', 'deliberate'
      ],
      yellowKeywords: [
        // Relevant scene details — circling the mystery without solving it
        'alone', 'week', 'no entry', 'no forced entry', 'fingerprint',
        'photograph', 'photo', 'picture', 'victim', 'motive', 'who', 'why',
        'camera', 'evidence', 'clue', 'crime scene'
      ],
      redKeywords: [
        // Old wrong path: self-timer / suicide assumptions
        'timer', 'self-timer', 'timed', 'delay', 'delayed', 'automatic',
        'auto', 'tripod', 'remote', 'shutter', 'countdown', 'self-portrait',
        'took himself', 'he took', 'took it himself',
        // Supernatural / accidental
        'ghost', 'supernatural', 'paranormal', 'spirit', 'magic',
        'accident', 'accidental', 'fell', 'natural causes'
      ]
    }
  },

  // ── CASE #002 ───────────────────────────────────────────────
  {
    id: 'man-in-bar',
    caseNumber: 'CASE #002',
    title: 'The Man in the Bar',
    difficulty: 'EASY',
    difficultyClass: 'easy',
    mode: 'practice',
    location: 'Neon Lounge, Downtown',

    scenario:
      'A man walks into a bar and asks for a glass of water. ' +
      'The bartender pulls out a gun and points it at him. ' +
      'The man says "Thank you" and calmly walks out.',

    truth:
      'The man had a severe case of hiccups and wanted water to cure them. ' +
      'The bartender recognized this and instead scared him with the gun. ' +
      'The sudden fright stopped the hiccups instantly. ' +
      'The man thanked him because the cure worked.',

    hints: [
      'The man had hiccups — the real reason he wanted water',
      'The bartender used the gun to frighten him, not to threaten him',
      'Fear cured the hiccups; the man left grateful, not afraid'
    ],

    keywords: [
      'hiccup', 'hiccups', 'scare', 'scared', 'fright', 'frighten',
      'shock', 'cure', 'startled', 'startle', 'hiccuping', 'remedy'
    ],
    requiredKeywords: ['hiccup', 'hiccups', 'hiccuping', 'hiccupped'],

    // Core truth: man had hiccups; bartender scared them away; both parties were cooperative
    // False assumptions: anger, threat, robbery, hostility
    truthModel: {
      greenKeywords: [
        'hiccup', 'hiccups', 'hiccupping', 'hiccupped', 'hiccuping',
        'scare', 'scared', 'scaring',
        'frighten', 'frightened', 'fright',
        'startle', 'startled', 'startling',
        'cure', 'cured', 'curing', 'remedy', 'remedied',
        'shock', 'shocked',
        'help', 'helped', 'helping', 'assist', 'assisted',
        'treat', 'treated', 'treatment',
        'grateful', 'thankful'
      ],
      yellowKeywords: [
        'water', 'drink', 'glass', 'thirst', 'thirsty',
        'gun', 'weapon', 'pointed',
        'bartender', 'bar',
        'reason', 'why', 'purpose', 'intention', 'motive', 'meant',
        'medical', 'condition', 'illness', 'sick', 'ill', 'suffering', 'symptom',
        'calm', 'calmly', 'relax', 'relaxed',
        'fear', 'afraid',
        'thank', 'thanks', 'thank you'
      ],
      redKeywords: [
        'attack', 'attacking', 'threaten', 'threat', 'threatening',
        'angry', 'anger', 'mad', 'rage', 'furious',
        'drunk', 'intoxicated', 'alcohol',
        'robbery', 'rob', 'robbing', 'steal', 'theft',
        'criminal', 'crime',
        'harm', 'hurt', 'injure', 'injury',
        'kill', 'murder', 'death', 'die', 'dead',
        'violence', 'violent', 'hostile', 'danger', 'dangerous'
      ]
    }
  },

  // ── CASE #003 ───────────────────────────────────────────────
  {
    id: 'room-314',
    caseNumber: 'CASE #003',
    title: 'Room 314',
    difficulty: 'MEDIUM',
    difficultyClass: 'medium',
    mode: 'both',
    location: 'Hotel Obsidian, Midtown',

    scenario:
      'A woman checks into a hotel and is assigned Room 314 on the 13th floor. ' +
      'She has never visited this hotel before. ' +
      'Without entering the room, she immediately calls the front desk and demands to be moved.',

    truth:
      'The woman is a doctor. ' +
      'In her culture, the number 8 is associated with death. ' +
      '3 + 1 + 4 = 8. She noticed this immediately. ' +
      'She refused to stay in a room whose digits sum to 8, out of deep cultural superstition.',

    hints: [
      'The woman is a doctor — her profession and cultural background matter',
      'She noticed that 3 + 1 + 4 = 8, and 8 symbolises death in her culture',
      'She is deeply superstitious about this number, not about the number 13'
    ],

    keywords: [
      'doctor', 'physician', 'medical', 'superstition', 'superstitious',
      'eight', '8', 'numerology', 'adds up', 'sum', 'culture', 'cultural',
      'death', '3+1+4', '3 1 4', 'three one four'
    ],
    requiredKeywords: ['doctor', 'physician', 'eight', '8', 'superstition', 'superstitious', 'numerology'],

    // Core truth: she is a doctor; cultural numerology (3+1+4=8=death); deeply superstitious
    // False assumptions: peephole/occupant, noise, ghost, superstition about 13
    truthModel: {
      greenKeywords: [
        // The doctor identity
        'doctor', 'physician', 'medical', 'medicine', 'surgeon',
        'she is a doctor', 'she is a physician',
        // The numerology angle — the actual reason
        'numerology', 'eight', '8', 'adds up', 'add up', 'sum to', 'sums to',
        'sum is', 'equals 8', 'equals eight', 'total is 8', '3+1+4', '3 1 4',
        'digits', 'digit sum', 'digit total', 'number eight',
        // The cultural belief
        'culture', 'cultural', 'cultural belief', 'tradition', 'background',
        'death in her culture', 'means death', 'symbolises death', 'symbolizes death',
        'associated with death', 'sign of death', 'omen', 'bad omen',
        // Superstition as the mechanism
        'superstition', 'superstitious', 'belief', 'believes'
      ],
      yellowKeywords: [
        // Relevant context — true but not the specific reason
        'thirteen', '13', 'unlucky', 'floor', 'number', 'room number',
        'scared', 'afraid', 'uncomfortable', 'uneasy',
        'anxious', 'nervous', 'cultural reason', 'personal reason',
        'bad luck', 'luck', 'omen'
      ],
      redKeywords: [
        // Completely wrong directions
        'peephole', 'peep hole', 'spy hole', 'look through', 'saw someone',
        'someone inside', 'person inside', 'occupied', 'previous guest',
        'ghost', 'haunted', 'supernatural', 'paranormal', 'spirit',
        'noise', 'sound', 'smell', 'odor',
        'history', 'bad reputation', 'accident', 'murder in room', 'death in room'
      ]
    }
  },

  // ── CASE #004 ───────────────────────────────────────────────
  {
    id: 'impossible-suicide',
    caseNumber: 'CASE #004',
    title: 'The Impossible Suicide',
    difficulty: 'HARD',
    difficultyClass: 'hard',
    mode: 'competitive',
    location: 'Sealed Suite 7, The Meridian Hotel',

    scenario:
      'A man is found dead in a perfectly locked room. ' +
      'The door was bolted from the inside. The windows are sealed shut. ' +
      'There are no weapons of any kind. ' +
      'The only anomaly: the floor is covered in puddles of water.',

    truth:
      'The man stood on a large block of ice and hanged himself from a ceiling beam. ' +
      'As hours passed, the ice melted completely — leaving only puddles. ' +
      'The platform he used to reach the noose dissolved before anyone found him, ' +
      'making the scene appear impossible.',

    hints: [
      'The water on the floor was not pre-existing — it came from something that melted',
      'He used a temporary platform that no longer exists by the time the body was found',
      'The room was locked from the inside; no one else was involved'
    ],

    keywords: [
      'ice', 'block', 'melted', 'melt', 'freeze', 'frozen',
      'hang', 'hanged', 'hung', 'rope', 'stood', 'standing',
      'platform', 'beam', 'ceiling', 'noose'
    ],
    requiredKeywords: ['ice', 'block of ice', 'frozen', 'melted', 'melt'],

    // Core truth: stood on ice block; hanged from ceiling beam; ice melted = water
    // False assumptions: murder, accomplice, hidden mechanism, outside access
    truthModel: {
      greenKeywords: [
        'ice', 'icy', 'melted', 'melt', 'melting', 'frozen', 'freeze', 'thaw', 'thawed',
        'block of ice', 'ice block', 'ice cube', 'ice platform',
        'stood on', 'standing on', 'stood on ice', 'standing on ice',
        'water source', 'water came from', 'water from ice',
        'ice melted', 'used ice', 'ice dissolved',
        'ice as platform', 'ice to reach'
      ],
      yellowKeywords: [
        'rope', 'hang', 'hanged', 'hung', 'hanging',
        'ceiling', 'beam', 'noose', 'tied', 'knot',
        'suicide', 'how', 'reach', 'ladder', 'chair', 'stool', 'table', 'jump',
        'stood', 'standing', 'platform',
        'water', 'puddle', 'wet', 'evaporate', 'evaporated'
      ],
      redKeywords: [
        'murder', 'murdered', 'killed', 'killer', 'accomplice',
        'weapon', 'secret passage', 'hidden door', 'hidden room', 'trap door',
        'poison', 'poisoned',
        'locked from outside', 'trick mechanism', 'mechanical',
        'escape', 'intruder', 'another person', 'someone helped'
      ]
    }
  },

  // ── CASE #005 ───────────────────────────────────────────────
  {
    id: 'surgeons-son',
    caseNumber: 'CASE #005',
    title: "The Surgeon's Son",
    difficulty: 'MEDIUM',
    difficultyClass: 'medium',
    mode: 'practice',
    location: 'City General Hospital, North Ward',

    scenario:
      'A father and his son are in a car accident. ' +
      'The father dies at the scene. ' +
      'The son is rushed to the operating room. ' +
      'The surgeon looks at the boy and says: "I cannot operate on him — he is my son."',

    truth:
      'The surgeon is the boy\'s mother. ' +
      'The puzzle relies on the false assumption that surgeons are male. ' +
      'There is no contradiction: the father died in the crash, ' +
      'and the surgeon — his mother — is waiting in the operating room.',

    hints: [
      'There is no second father, stepfather, or adoption involved',
      'The surgeon is female — the boy\'s biological mother',
      'The apparent contradiction dissolves once gender bias is removed'
    ],

    keywords: [
      'mother', 'mom', 'mum', 'mama', 'woman', 'female', 'her',
      'she', 'the surgeon is the mother', 'his mother', 'the boy\'s mother'
    ],
    requiredKeywords: ['mother', 'mom', 'mum', 'mama', 'woman', 'female'],

    // Core truth: surgeon is female; she is the boy's biological mother
    // False assumptions: second father, stepfather, uncle, godfather, adoption
    truthModel: {
      greenKeywords: [
        // The gender reveal
        'mother', 'mom', 'mum', 'mama', 'ma',
        'woman', 'female', 'her', 'she', 'lady',
        'the surgeon is', 'the surgeon was',
        'his mother', 'the boy\'s mother', 'the son\'s mother',
        'a woman', 'a female', 'woman surgeon', 'female surgeon',
        // The implicit bias angle
        'assumption', 'assumed', 'gender', 'gender bias', 'bias',
        'assumed male', 'assumed he', 'not male', 'not a man'
      ],
      yellowKeywords: [
        // Relevant relationships and context
        'surgeon', 'doctor', 'physician', 'operate', 'hospital',
        'son', 'boy', 'child', 'parent', 'family', 'relative',
        'know', 'knows', 'knew', 'relationship', 'connection',
        'who is', 'who was', 'identify'
      ],
      redKeywords: [
        // Wrong alternative explanations
        'uncle', 'stepfather', 'step father', 'step-father',
        'godfather', 'god father', 'guardian', 'adopted', 'adoption',
        'second father', 'another father', 'two fathers',
        'grandfather', 'grand father',
        'man', 'male', 'he is the father', 'was the father',
        'twin', 'clone', 'supernatural', 'ghost'
      ]
    }
  },

  // ── CASE #006 ───────────────────────────────────────────────
  {
    id: 'elevator-phobia',
    caseNumber: 'CASE #006',
    title: 'Elevator Phobia',
    difficulty: 'EASY',
    difficultyClass: 'easy',
    mode: 'practice',
    location: 'Meridian Towers, West End',

    scenario:
      'Every morning, a man takes the elevator from the ground floor up to his apartment on the 13th floor. ' +
      'Every evening, he takes the elevator to the 7th floor and then walks up 6 flights of stairs. ' +
      'Why?',

    truth:
      'The man is too short to reach the button for the 13th floor. ' +
      'In the morning, other people are in the elevator and press the button for him. ' +
      'In the evening he is alone, so he can only reach as high as the 7th floor button, ' +
      'and walks the rest of the way.',

    hints: [
      'The man cannot reach the 13th floor button by himself',
      'In the morning, other passengers press the button for him without him asking',
      'In the evening the elevator is empty and he can only reach floor 7'
    ],

    keywords: [
      'short', 'height', 'reach', 'button', 'tall', 'dwarf',
      'small', 'stature', 'people press', 'others press', 'someone press',
      'alone', 'by himself', 'no one', 'nobody'
    ],
    requiredKeywords: ['short', 'too short', 'height', 'reach', 'button', 'dwarf', 'stature'],

    // Core truth: man is too short to reach button 13; mornings others help; evenings alone
    // False assumptions: fear of elevators, exercise preference, superstition about 13
    truthModel: {
      greenKeywords: [
        // The physical limitation
        'short', 'too short', 'not tall enough', 'height', 'short stature',
        'dwarf', 'little person', 'small stature', 'physical', 'size',
        // The button-reaching mechanism
        'reach', 'cannot reach', "can't reach", 'could not reach',
        'button', 'floor button', 'elevator button', 'the button', 'press the button',
        'too low', 'not high enough', 'reach the button', 'reach floor 13',
        // The social dynamic
        'people press', 'others press', 'someone presses', 'someone pressed',
        'others help', 'people help', 'helped by', 'people in elevator',
        'other passengers', 'other people', 'morning crowd',
        // Alone in the evening
        'alone in elevator', 'nobody in elevator', 'no one in elevator',
        'alone at night', 'alone in the evening', 'by himself'
      ],
      yellowKeywords: [
        // Contextual elements — on the right track but not the answer
        'morning', 'evening', 'night', 'alone', 'other people', 'people',
        'crowded', 'busy', 'quiet', 'different time', 'routine', 'empty',
        'walk', 'stairs', 'floor', 'why', 'reason'
      ],
      redKeywords: [
        // Wrong assumptions — preference, phobia, superstition
        'phobia', 'fear of elevator', 'claustrophobia', 'scared of elevator',
        'anxiety', 'panic', 'agoraphobia',
        'exercise', 'fitness', 'healthy', 'prefer to walk', 'enjoys walking', 'likes stairs',
        'lazy', 'habit', 'routine preference',
        'superstition', 'thirteen', 'unlucky', 'thirteen is unlucky',
        'fear of 13', 'scared of 13', 'triskaidekaphobia'
      ]
    }
  },

  // ── CASE #007 — last-photograph variant ─────────────────────
  {
    id: 'last-photograph-v2',
    variantOf: 'last-photograph',
    caseNumber: 'CASE #007',
    title: 'The Studio Portrait',
    difficulty: 'HARD',
    difficultyClass: 'hard',
    mode: 'competitive',
    location: 'Glass Studio, Arts Quarter',

    scenario:
      'A blind sculptor is found dead in his studio. ' +
      'Police find a professional photograph of him at work, ' +
      'slipped under the front door. ' +
      'His assistant confirms he had no visitors and his phone shows no activity.',

    truth:
      'The sculptor was completely blind and unaware of any intruder. ' +
      'A killer entered the studio, photographed him at work, and murdered him. ' +
      'The photograph slipped under the door was a deliberate calling card left behind.',

    hints: [
      'The sculptor was blind — he could not see or sense the intruder',
      'An intruder entered and took the photograph during the murder',
      'The photograph was left as a calling card, not taken by the victim'
    ],
    keywords: [
      'blind', 'blindness', 'could not see', 'murder', 'murdered',
      'killer', 'killed', 'intruder', 'calling card', 'someone else',
      'broke in', 'break in', 'planted'
    ],
    requiredKeywords: ['blind', 'blindness', 'murder', 'murdered', 'killer', 'calling card'],
    truthModel: {
      greenKeywords: [
        'blind', 'blindness', 'blind man', 'could not see', 'cannot see',
        'sight', 'sightless', 'visually impaired', 'no vision', 'lost his sight',
        'murder', 'murdered', 'killer', 'killed', 'intruder', 'intruded',
        'broke in', 'break in', 'breaking in', 'someone broke',
        'someone else', 'another person', 'someone was there', 'someone entered',
        'calling card', 'planted', 'left behind', 'left the photo',
        'placed the photo', 'message', 'signature', 'deliberate'
      ],
      yellowKeywords: [
        'alone', 'week', 'no entry', 'no forced entry', 'fingerprint',
        'photograph', 'photo', 'picture', 'victim', 'motive', 'who', 'why',
        'camera', 'evidence', 'clue', 'crime scene'
      ],
      redKeywords: [
        'timer', 'self-timer', 'timed', 'delay', 'delayed', 'automatic',
        'auto', 'tripod', 'remote', 'shutter', 'countdown', 'self-portrait',
        'took himself', 'he took', 'took it himself',
        'ghost', 'supernatural', 'paranormal', 'spirit', 'magic',
        'accident', 'accidental', 'fell', 'natural causes'
      ]
    }
  },

  // ── CASE #008 — last-photograph variant ─────────────────────
  {
    id: 'last-photograph-v3',
    variantOf: 'last-photograph',
    caseNumber: 'CASE #008',
    title: 'The Sleeping Witness',
    difficulty: 'HARD',
    difficultyClass: 'hard',
    mode: 'competitive',
    location: 'Penthouse Loft, River District',

    scenario:
      'A blind pianist is found dead in his apartment. ' +
      'He is clutching a printed photograph of himself asleep in his armchair — ' +
      'taken inside his own living room. ' +
      'The building\'s security logs show no visitors.',

    truth:
      'The man was blind and had no idea anyone entered his apartment. ' +
      'A killer bypassed security, photographed him sleeping, and murdered him. ' +
      'The photograph placed in his hands was a calling card — a signature of the crime.',

    hints: [
      'The pianist was blind and completely unaware of any intruder',
      'A killer bypassed security and photographed him while he slept',
      'The photo was planted on the body as a deliberate calling card'
    ],
    keywords: [
      'blind', 'blindness', 'could not see', 'murder', 'murdered',
      'killer', 'killed', 'intruder', 'calling card', 'someone else',
      'broke in', 'break in', 'planted'
    ],
    requiredKeywords: ['blind', 'blindness', 'murder', 'murdered', 'killer', 'calling card'],
    truthModel: {
      greenKeywords: [
        'blind', 'blindness', 'blind man', 'could not see', 'cannot see',
        'sight', 'sightless', 'visually impaired', 'no vision', 'lost his sight',
        'murder', 'murdered', 'killer', 'killed', 'intruder', 'intruded',
        'broke in', 'break in', 'breaking in', 'someone broke',
        'someone else', 'another person', 'someone was there', 'someone entered',
        'calling card', 'planted', 'left behind', 'left the photo',
        'placed the photo', 'message', 'signature', 'deliberate'
      ],
      yellowKeywords: [
        'alone', 'week', 'no entry', 'no forced entry', 'fingerprint',
        'photograph', 'photo', 'picture', 'victim', 'motive', 'who', 'why',
        'camera', 'evidence', 'clue', 'crime scene'
      ],
      redKeywords: [
        'timer', 'self-timer', 'timed', 'delay', 'delayed', 'automatic',
        'auto', 'tripod', 'remote', 'shutter', 'countdown', 'self-portrait',
        'took himself', 'he took', 'took it himself',
        'ghost', 'supernatural', 'paranormal', 'spirit', 'magic',
        'accident', 'accidental', 'fell', 'natural causes'
      ]
    }
  },

  // ── CASE #009 — man-in-bar variant ──────────────────────────
  {
    id: 'man-in-bar-v2',
    variantOf: 'man-in-bar',
    caseNumber: 'CASE #009',
    title: 'The Pharmacy Scare',
    difficulty: 'EASY',
    difficultyClass: 'easy',
    mode: 'practice',
    location: 'Night Pharmacy, Canal Street',

    scenario:
      'A woman rushes into a pharmacy and urgently asks for a glass of water. ' +
      'The pharmacist pulls a toy cap gun from under the counter and points it at her. ' +
      'The woman bursts out laughing, says "Thank you so much," and leaves without the water.',

    truth:
      'The woman had a severe case of hiccups and wanted water to cure them. ' +
      'The pharmacist recognised this and scared her with the toy gun instead. ' +
      'The sudden shock stopped the hiccups instantly. ' +
      'She left laughing because the trick worked perfectly.',

    hints: [
      'The woman had hiccups — the real reason she wanted water',
      'The pharmacist used the toy gun to frighten her on purpose',
      'Fear cured the hiccups; she left grateful, not afraid'
    ],
    keywords: [
      'hiccup', 'hiccups', 'scare', 'scared', 'fright', 'frighten',
      'shock', 'cure', 'startled', 'startle', 'hiccuping', 'remedy'
    ],
    requiredKeywords: ['hiccup', 'hiccups', 'hiccuping', 'hiccupped'],
    truthModel: {
      greenKeywords: [
        'hiccup', 'hiccups', 'hiccupping', 'hiccupped', 'hiccuping',
        'scare', 'scared', 'scaring',
        'frighten', 'frightened', 'fright',
        'startle', 'startled', 'startling',
        'cure', 'cured', 'curing', 'remedy', 'remedied',
        'shock', 'shocked',
        'help', 'helped', 'helping', 'assist', 'assisted',
        'treat', 'treated', 'treatment',
        'grateful', 'thankful'
      ],
      yellowKeywords: [
        'water', 'drink', 'glass', 'thirst', 'thirsty',
        'gun', 'weapon', 'pointed',
        'pharmacist', 'pharmacy',
        'reason', 'why', 'purpose', 'intention', 'motive', 'meant',
        'medical', 'condition', 'illness', 'sick', 'ill', 'suffering', 'symptom',
        'calm', 'calmly', 'relax', 'relaxed',
        'fear', 'afraid',
        'thank', 'thanks', 'thank you'
      ],
      redKeywords: [
        'attack', 'attacking', 'threaten', 'threat', 'threatening',
        'angry', 'anger', 'mad', 'rage', 'furious',
        'drunk', 'intoxicated', 'alcohol',
        'robbery', 'rob', 'robbing', 'steal', 'theft',
        'criminal', 'crime',
        'harm', 'hurt', 'injure', 'injury',
        'kill', 'murder', 'death', 'die', 'dead',
        'violence', 'violent', 'hostile', 'danger', 'dangerous'
      ]
    }
  },

  // ── CASE #010 — man-in-bar variant ──────────────────────────
  {
    id: 'man-in-bar-v3',
    variantOf: 'man-in-bar',
    caseNumber: 'CASE #010',
    title: 'The Diner Shout',
    difficulty: 'EASY',
    difficultyClass: 'easy',
    mode: 'practice',
    location: 'Noodle Diner, South Market',

    scenario:
      'A man enters a diner and asks the server for a glass of milk. ' +
      'Instead, the chef storms out from the kitchen and shouts loudly in his ear. ' +
      'The man pauses, thanks the chef warmly, and leaves the diner without the milk.',

    truth:
      'The man had severe hiccups and hoped milk would cure them. ' +
      'The chef noticed this and chose to cure the hiccups the old-fashioned way — by shocking him with a shout. ' +
      'The fright worked instantly. ' +
      'The man thanked him because his hiccups were gone.',

    hints: [
      'The man had hiccups — the real reason he asked for milk',
      'The chef shouted to frighten him and cure the hiccups',
      'The shock worked; the man left grateful'
    ],
    keywords: [
      'hiccup', 'hiccups', 'scare', 'scared', 'fright', 'frighten',
      'shock', 'cure', 'startled', 'startle', 'hiccuping', 'remedy'
    ],
    requiredKeywords: ['hiccup', 'hiccups', 'hiccuping', 'hiccupped'],
    truthModel: {
      greenKeywords: [
        'hiccup', 'hiccups', 'hiccupping', 'hiccupped', 'hiccuping',
        'scare', 'scared', 'scaring',
        'frighten', 'frightened', 'fright',
        'startle', 'startled', 'startling',
        'cure', 'cured', 'curing', 'remedy', 'remedied',
        'shock', 'shocked',
        'help', 'helped', 'helping', 'assist', 'assisted',
        'treat', 'treated', 'treatment',
        'grateful', 'thankful'
      ],
      yellowKeywords: [
        'water', 'drink', 'glass', 'thirst', 'thirsty', 'milk',
        'chef', 'diner', 'kitchen',
        'reason', 'why', 'purpose', 'intention', 'motive', 'meant',
        'medical', 'condition', 'illness', 'sick', 'ill', 'suffering', 'symptom',
        'calm', 'calmly', 'relax', 'relaxed',
        'fear', 'afraid',
        'thank', 'thanks', 'thank you'
      ],
      redKeywords: [
        'attack', 'attacking', 'threaten', 'threat', 'threatening',
        'angry', 'anger', 'mad', 'rage', 'furious',
        'drunk', 'intoxicated', 'alcohol',
        'robbery', 'rob', 'robbing', 'steal', 'theft',
        'criminal', 'crime',
        'harm', 'hurt', 'injure', 'injury',
        'kill', 'murder', 'death', 'die', 'dead',
        'violence', 'violent', 'hostile', 'danger', 'dangerous'
      ]
    }
  },

  // ── CASE #011 — room-314 variant ────────────────────────────
  {
    id: 'room-314-v2',
    variantOf: 'room-314',
    caseNumber: 'CASE #011',
    title: 'Room 206',
    difficulty: 'MEDIUM',
    difficultyClass: 'medium',
    mode: 'both',
    location: 'Hotel Argent, Midtown',

    scenario:
      'A woman checks into a hotel and is given room 206 on the 12th floor. ' +
      'She has never stayed here before. ' +
      'Before even touching the door handle, she calls the front desk and insists on a different room.',

    truth:
      'The woman is a doctor. ' +
      'In her culture, the number 8 is associated with death. ' +
      '2 + 0 + 6 = 8. She calculated this immediately. ' +
      'She refused the room out of deep cultural superstition about the number 8.',

    hints: [
      'The woman is a doctor — her profession and cultural background matter',
      'She noticed that 2 + 0 + 6 = 8, and 8 symbolises death in her culture',
      'She is deeply superstitious about this number — not the floor number'
    ],
    keywords: [
      'doctor', 'physician', 'medical', 'superstition', 'superstitious',
      'eight', '8', 'numerology', 'adds up', 'sum', 'culture', 'cultural',
      'death', '2+0+6', '2 0 6'
    ],
    requiredKeywords: ['doctor', 'physician', 'eight', '8', 'superstition', 'superstitious', 'numerology'],
    truthModel: {
      greenKeywords: [
        'doctor', 'physician', 'medical', 'medicine', 'surgeon',
        'she is a doctor', 'she is a physician',
        'numerology', 'eight', '8', 'adds up', 'add up', 'sum to', 'sums to',
        'sum is', 'equals 8', 'equals eight', 'total is 8', '2+0+6', '2 0 6',
        'digits', 'digit sum', 'digit total', 'number eight',
        'culture', 'cultural', 'cultural belief', 'tradition', 'background',
        'death in her culture', 'means death', 'symbolises death', 'symbolizes death',
        'associated with death', 'sign of death', 'omen', 'bad omen',
        'superstition', 'superstitious', 'belief', 'believes'
      ],
      yellowKeywords: [
        'twelve', 'twelve', '12', 'unlucky', 'floor', 'number', 'room number',
        'scared', 'afraid', 'uncomfortable', 'uneasy',
        'anxious', 'nervous', 'cultural reason', 'personal reason',
        'bad luck', 'luck', 'omen'
      ],
      redKeywords: [
        'peephole', 'peep hole', 'spy hole', 'look through', 'saw someone',
        'someone inside', 'person inside', 'occupied', 'previous guest',
        'ghost', 'haunted', 'supernatural', 'paranormal', 'spirit',
        'noise', 'sound', 'smell', 'odor',
        'history', 'bad reputation', 'accident', 'murder in room', 'death in room'
      ]
    }
  },

  // ── CASE #012 — room-314 variant ────────────────────────────
  {
    id: 'room-314-v3',
    variantOf: 'room-314',
    caseNumber: 'CASE #012',
    title: 'Room 512',
    difficulty: 'MEDIUM',
    difficultyClass: 'medium',
    mode: 'both',
    location: 'The Arcadia Hotel, West End',

    scenario:
      'A surgeon arrives at a luxury hotel and is shown to room 512. ' +
      'She pauses in the corridor, counts quietly on her fingers, ' +
      'then firmly refuses the room without any explanation.',

    truth:
      'The surgeon is deeply superstitious. ' +
      'In her culture, the number 8 is a symbol of death. ' +
      '5 + 1 + 2 = 8. She calculated this the moment she heard the room number. ' +
      'She refused on the basis of this cultural belief.',

    hints: [
      'She is a surgeon — her cultural background is key',
      'She noticed that 5 + 1 + 2 = 8, and 8 means death in her culture',
      'The counting on her fingers was her calculating the digit sum'
    ],
    keywords: [
      'doctor', 'physician', 'medical', 'superstition', 'superstitious',
      'eight', '8', 'numerology', 'adds up', 'sum', 'culture', 'cultural',
      'death', '5+1+2', '5 1 2'
    ],
    requiredKeywords: ['doctor', 'physician', 'surgeon', 'eight', '8', 'superstition', 'superstitious', 'numerology'],
    truthModel: {
      greenKeywords: [
        'doctor', 'physician', 'medical', 'medicine', 'surgeon',
        'she is a doctor', 'she is a physician', 'she is a surgeon',
        'numerology', 'eight', '8', 'adds up', 'add up', 'sum to', 'sums to',
        'sum is', 'equals 8', 'equals eight', 'total is 8', '5+1+2', '5 1 2',
        'digits', 'digit sum', 'digit total', 'number eight',
        'culture', 'cultural', 'cultural belief', 'tradition', 'background',
        'death in her culture', 'means death', 'symbolises death', 'symbolizes death',
        'associated with death', 'sign of death', 'omen', 'bad omen',
        'superstition', 'superstitious', 'belief', 'believes'
      ],
      yellowKeywords: [
        'five', 'floor', 'number', 'room number',
        'scared', 'afraid', 'uncomfortable', 'uneasy',
        'anxious', 'nervous', 'cultural reason', 'personal reason',
        'bad luck', 'luck', 'omen'
      ],
      redKeywords: [
        'peephole', 'peep hole', 'spy hole', 'look through', 'saw someone',
        'someone inside', 'person inside', 'occupied', 'previous guest',
        'ghost', 'haunted', 'supernatural', 'paranormal', 'spirit',
        'noise', 'sound', 'smell', 'odor',
        'history', 'bad reputation', 'accident', 'murder in room', 'death in room'
      ]
    }
  },

  // ── CASE #013 — impossible-suicide variant ───────────────────
  {
    id: 'impossible-suicide-v2',
    variantOf: 'impossible-suicide',
    caseNumber: 'CASE #013',
    title: 'The Wet Storeroom',
    difficulty: 'HARD',
    difficultyClass: 'hard',
    mode: 'competitive',
    location: 'Sealed Storeroom, The Meridian Hotel',

    scenario:
      'A woman is found hanged in a locked storage room. ' +
      'The door was bolted from the inside. ' +
      'No stool, chair, ladder, or any object she could have stood on is present. ' +
      'The concrete floor is wet throughout.',

    truth:
      'The woman stood on a large block of ice to reach the ceiling beam. ' +
      'She tied the noose and hanged herself. ' +
      'By the time the body was discovered, the ice had fully melted — ' +
      'leaving only the puddles, with no trace of how she reached the beam.',

    hints: [
      'The water came from something that was present earlier but is now gone',
      'She used a temporary platform to reach the beam — it dissolved completely',
      'The room was locked from inside; no other person was involved'
    ],
    keywords: [
      'ice', 'block', 'melted', 'melt', 'freeze', 'frozen',
      'hang', 'hanged', 'hung', 'rope', 'stood', 'standing',
      'platform', 'beam', 'ceiling', 'noose'
    ],
    requiredKeywords: ['ice', 'block of ice', 'frozen', 'melted', 'melt'],
    truthModel: {
      greenKeywords: [
        'ice', 'icy', 'melted', 'melt', 'melting', 'frozen', 'freeze', 'thaw', 'thawed',
        'block of ice', 'ice block', 'ice cube', 'ice platform',
        'stood on', 'standing on', 'stood on ice', 'standing on ice',
        'water source', 'water came from', 'water from ice',
        'ice melted', 'used ice', 'ice dissolved',
        'ice as platform', 'ice to reach'
      ],
      yellowKeywords: [
        'rope', 'hang', 'hanged', 'hung', 'hanging',
        'ceiling', 'beam', 'noose', 'tied', 'knot',
        'suicide', 'how', 'reach', 'ladder', 'chair', 'stool', 'table', 'jump',
        'stood', 'standing', 'platform',
        'water', 'puddle', 'wet', 'evaporate', 'evaporated'
      ],
      redKeywords: [
        'murder', 'murdered', 'killed', 'killer', 'accomplice',
        'weapon', 'secret passage', 'hidden door', 'hidden room', 'trap door',
        'poison', 'poisoned',
        'locked from outside', 'trick mechanism', 'mechanical',
        'escape', 'intruder', 'another person', 'someone helped'
      ]
    }
  },

  // ── CASE #014 — impossible-suicide variant ───────────────────
  {
    id: 'impossible-suicide-v3',
    variantOf: 'impossible-suicide',
    caseNumber: 'CASE #014',
    title: 'The Locked Barn',
    difficulty: 'HARD',
    difficultyClass: 'hard',
    mode: 'competitive',
    location: 'Sealed Barn, Outskirts',

    scenario:
      'A man is found hanging from a rafter inside a sealed barn. ' +
      'All doors and windows are fastened from within. ' +
      'No equipment to reach the rafters is anywhere in the barn. ' +
      'The only clue: large wet patches across the earthen floor.',

    truth:
      'The man used a large block of ice as a platform to reach the rafters and hang himself. ' +
      'Over time the ice melted entirely into the ground, ' +
      'leaving wet patches but no evidence of how he reached the beam.',

    hints: [
      'The wet patches on the floor came from something that melted',
      'He had a platform to reach the rafters — it no longer exists',
      'No other person entered the barn'
    ],
    keywords: [
      'ice', 'block', 'melted', 'melt', 'freeze', 'frozen',
      'hang', 'hanged', 'hung', 'rope', 'stood', 'standing',
      'platform', 'beam', 'ceiling', 'noose', 'rafter'
    ],
    requiredKeywords: ['ice', 'block of ice', 'frozen', 'melted', 'melt'],
    truthModel: {
      greenKeywords: [
        'ice', 'icy', 'melted', 'melt', 'melting', 'frozen', 'freeze', 'thaw', 'thawed',
        'block of ice', 'ice block', 'ice cube', 'ice platform',
        'stood on', 'standing on', 'stood on ice', 'standing on ice',
        'water source', 'water came from', 'water from ice',
        'ice melted', 'used ice', 'ice dissolved',
        'ice as platform', 'ice to reach'
      ],
      yellowKeywords: [
        'rope', 'hang', 'hanged', 'hung', 'hanging',
        'ceiling', 'beam', 'noose', 'tied', 'knot', 'rafter',
        'suicide', 'how', 'reach', 'ladder', 'chair', 'stool', 'table', 'jump',
        'stood', 'standing', 'platform',
        'water', 'puddle', 'wet', 'evaporate', 'evaporated'
      ],
      redKeywords: [
        'murder', 'murdered', 'killed', 'killer', 'accomplice',
        'weapon', 'secret passage', 'hidden door', 'hidden room', 'trap door',
        'poison', 'poisoned',
        'locked from outside', 'trick mechanism', 'mechanical',
        'escape', 'intruder', 'another person', 'someone helped'
      ]
    }
  },

  // ── CASE #015 — surgeons-son variant ────────────────────────
  {
    id: 'surgeons-son-v2',
    variantOf: 'surgeons-son',
    caseNumber: 'CASE #015',
    title: 'The Neurosurgeon\'s Daughter',
    difficulty: 'MEDIUM',
    difficultyClass: 'medium',
    mode: 'practice',
    location: 'St Clair Medical Centre',

    scenario:
      'A girl and her father are in a bus crash. ' +
      'The father dies at the scene. ' +
      'The girl is rushed to hospital. ' +
      'The neurosurgeon on call looks at her and says: ' +
      '"I cannot operate on this child — she is my daughter."',

    truth:
      'The neurosurgeon is the girl\'s mother. ' +
      'The puzzle relies on the false assumption that surgeons are male. ' +
      'There is no contradiction: the father died in the crash, ' +
      'and the surgeon — her mother — is the neurosurgeon on call.',

    hints: [
      'There is no second father or adoption involved',
      'The neurosurgeon is female — the girl\'s biological mother',
      'The apparent contradiction dissolves once gender assumptions are removed'
    ],
    keywords: [
      'mother', 'mom', 'mum', 'mama', 'woman', 'female', 'her',
      'she', 'the surgeon is the mother', 'his mother', 'the girl\'s mother'
    ],
    requiredKeywords: ['mother', 'mom', 'mum', 'mama', 'woman', 'female'],
    truthModel: {
      greenKeywords: [
        'mother', 'mom', 'mum', 'mama', 'ma',
        'woman', 'female', 'her', 'she', 'lady',
        'the surgeon is', 'the surgeon was',
        'his mother', 'the boy\'s mother', 'the son\'s mother',
        'her mother', 'the girl\'s mother', 'the daughter\'s mother',
        'a woman', 'a female', 'woman surgeon', 'female surgeon',
        'assumption', 'assumed', 'gender', 'gender bias', 'bias',
        'assumed male', 'assumed he', 'not male', 'not a man'
      ],
      yellowKeywords: [
        'surgeon', 'doctor', 'physician', 'operate', 'hospital',
        'son', 'boy', 'child', 'parent', 'family', 'relative', 'daughter', 'girl',
        'know', 'knows', 'knew', 'relationship', 'connection',
        'who is', 'who was', 'identify'
      ],
      redKeywords: [
        'uncle', 'stepfather', 'step father', 'step-father',
        'godfather', 'god father', 'guardian', 'adopted', 'adoption',
        'second father', 'another father', 'two fathers',
        'grandfather', 'grand father',
        'man', 'male', 'he is the father', 'was the father',
        'twin', 'clone', 'supernatural', 'ghost'
      ]
    }
  },

  // ── CASE #016 — surgeons-son variant ────────────────────────
  {
    id: 'surgeons-son-v3',
    variantOf: 'surgeons-son',
    caseNumber: 'CASE #016',
    title: 'My Son',
    difficulty: 'MEDIUM',
    difficultyClass: 'medium',
    mode: 'practice',
    location: 'Riverside Trauma Centre',

    scenario:
      'Two brothers are caught in a building collapse. ' +
      'The elder brother is killed instantly. ' +
      'The younger brother is rushed to the ER in critical condition. ' +
      'The head of trauma surgery looks at him and says: ' +
      '"I cannot be this boy\'s surgeon — he is my son."',

    truth:
      'The head of trauma surgery is the boy\'s mother. ' +
      'The puzzle assumes the surgeon must be male. ' +
      'The boy\'s father died in the collapse; ' +
      'his mother, the trauma surgeon, is the one on duty.',

    hints: [
      'There is no adoption or second father involved',
      'The head of trauma surgery is female — the boy\'s biological mother',
      'The father died in the same collapse; remove the gender assumption'
    ],
    keywords: [
      'mother', 'mom', 'mum', 'mama', 'woman', 'female', 'her',
      'she', 'the surgeon is the mother', 'his mother', 'the boy\'s mother'
    ],
    requiredKeywords: ['mother', 'mom', 'mum', 'mama', 'woman', 'female'],
    truthModel: {
      greenKeywords: [
        'mother', 'mom', 'mum', 'mama', 'ma',
        'woman', 'female', 'her', 'she', 'lady',
        'the surgeon is', 'the surgeon was',
        'his mother', 'the boy\'s mother', 'the son\'s mother',
        'a woman', 'a female', 'woman surgeon', 'female surgeon',
        'assumption', 'assumed', 'gender', 'gender bias', 'bias',
        'assumed male', 'assumed he', 'not male', 'not a man'
      ],
      yellowKeywords: [
        'surgeon', 'doctor', 'physician', 'operate', 'hospital',
        'son', 'boy', 'child', 'parent', 'family', 'relative',
        'know', 'knows', 'knew', 'relationship', 'connection',
        'who is', 'who was', 'identify'
      ],
      redKeywords: [
        'uncle', 'stepfather', 'step father', 'step-father',
        'godfather', 'god father', 'guardian', 'adopted', 'adoption',
        'second father', 'another father', 'two fathers',
        'grandfather', 'grand father',
        'man', 'male', 'he is the father', 'was the father',
        'twin', 'clone', 'supernatural', 'ghost'
      ]
    }
  },

  // ── CASE #017 — elevator-phobia variant ─────────────────────
  {
    id: 'elevator-phobia-v2',
    variantOf: 'elevator-phobia',
    caseNumber: 'CASE #017',
    title: 'The 22nd Floor',
    difficulty: 'EASY',
    difficultyClass: 'easy',
    mode: 'practice',
    location: 'Summit Tower, North Quarter',

    scenario:
      'A woman lives on the 22nd floor of a residential tower. ' +
      'Every morning she rides the elevator all the way to floor 22. ' +
      'Every evening she takes the elevator to floor 10 and walks the remaining 12 floors. ' +
      'On rainy days, she always rides all the way to floor 22.',

    truth:
      'The woman is too short to reach the button for floor 22. ' +
      'In the morning, other residents in the lift press it for her. ' +
      'In the evening she is alone and can only reach as high as floor 10. ' +
      'On rainy days she carries an umbrella, which she uses to press the higher button.',

    hints: [
      'She cannot reach the button for floor 22 by herself',
      'Morning crowds help her without being asked; evenings she is alone',
      'The rain day clue is the umbrella extending her reach'
    ],
    keywords: [
      'short', 'height', 'reach', 'button', 'tall', 'dwarf',
      'small', 'stature', 'people press', 'others press', 'someone press',
      'alone', 'by himself', 'no one', 'nobody', 'umbrella'
    ],
    requiredKeywords: ['short', 'too short', 'height', 'reach', 'button', 'dwarf', 'stature', 'umbrella'],
    truthModel: {
      greenKeywords: [
        'short', 'too short', 'not tall enough', 'height', 'short stature',
        'dwarf', 'little person', 'small stature', 'physical', 'size',
        'reach', 'cannot reach', "can't reach", 'could not reach',
        'button', 'floor button', 'elevator button', 'the button', 'press the button',
        'too low', 'not high enough', 'reach the button', 'reach floor 22',
        'people press', 'others press', 'someone presses', 'someone pressed',
        'others help', 'people help', 'helped by', 'people in elevator',
        'other passengers', 'other people', 'morning crowd',
        'alone in elevator', 'nobody in elevator', 'no one in elevator',
        'alone at night', 'alone in the evening', 'by herself',
        'umbrella', 'uses umbrella', 'prod', 'extend reach', 'stick'
      ],
      yellowKeywords: [
        'morning', 'evening', 'night', 'alone', 'other people', 'people',
        'crowded', 'busy', 'quiet', 'different time', 'routine', 'empty',
        'walk', 'stairs', 'floor', 'why', 'reason', 'rain', 'rainy'
      ],
      redKeywords: [
        'phobia', 'fear of elevator', 'claustrophobia', 'scared of elevator',
        'anxiety', 'panic', 'agoraphobia',
        'exercise', 'fitness', 'healthy', 'prefer to walk', 'enjoys walking', 'likes stairs',
        'lazy', 'habit', 'routine preference',
        'superstition', 'twenty two', 'unlucky',
        'triskaidekaphobia'
      ]
    }
  },

  // ── CASE #018 — elevator-phobia variant ─────────────────────
  {
    id: 'elevator-phobia-v3',
    variantOf: 'elevator-phobia',
    caseNumber: 'CASE #018',
    title: 'Office Floors',
    difficulty: 'EASY',
    difficultyClass: 'easy',
    mode: 'practice',
    location: 'Nexus Business Tower',

    scenario:
      'A man works on the 18th floor of an office building. ' +
      'He always takes the elevator all the way up in the morning. ' +
      'In the evening, he exits the elevator at floor 9 and walks the rest. ' +
      'Except when a colleague is riding the lift with him — then he goes straight up.',

    truth:
      'The man is too short to reach the button for floor 18. ' +
      'In the morning the lift is crowded and someone always presses it. ' +
      'In the evening he is usually alone, so he can only reach as high as floor 9. ' +
      'When a colleague is with him, that person presses floor 18 for him.',

    hints: [
      'He cannot reach the button for floor 18 by himself',
      'Morning crowds inadvertently help him; evenings he is alone',
      'When a colleague is present, they press the button he cannot reach'
    ],
    keywords: [
      'short', 'height', 'reach', 'button', 'tall', 'dwarf',
      'small', 'stature', 'people press', 'others press', 'someone press',
      'alone', 'by himself', 'no one', 'nobody', 'colleague'
    ],
    requiredKeywords: ['short', 'too short', 'height', 'reach', 'button', 'dwarf', 'stature'],
    truthModel: {
      greenKeywords: [
        'short', 'too short', 'not tall enough', 'height', 'short stature',
        'dwarf', 'little person', 'small stature', 'physical', 'size',
        'reach', 'cannot reach', "can't reach", 'could not reach',
        'button', 'floor button', 'elevator button', 'the button', 'press the button',
        'too low', 'not high enough', 'reach the button', 'reach floor 18',
        'people press', 'others press', 'someone presses', 'someone pressed',
        'others help', 'people help', 'helped by', 'people in elevator',
        'other passengers', 'other people', 'morning crowd', 'colleague',
        'alone in elevator', 'nobody in elevator', 'no one in elevator',
        'alone at night', 'alone in the evening', 'by himself'
      ],
      yellowKeywords: [
        'morning', 'evening', 'night', 'alone', 'other people', 'people',
        'crowded', 'busy', 'quiet', 'different time', 'routine', 'empty',
        'walk', 'stairs', 'floor', 'why', 'reason'
      ],
      redKeywords: [
        'phobia', 'fear of elevator', 'claustrophobia', 'scared of elevator',
        'anxiety', 'panic', 'agoraphobia',
        'exercise', 'fitness', 'healthy', 'prefer to walk', 'enjoys walking', 'likes stairs',
        'lazy', 'habit', 'routine preference',
        'superstition', 'eighteen', 'unlucky',
        'triskaidekaphobia'
      ]
    }
  }

];

// ── Answer Checking ──────────────────────────────────────────
function checkAnswer(mysteryId, playerAnswer) {
  const mystery = MYSTERIES.find(m => m.id === mysteryId);
  if (!mystery) return false;

  const lower = playerAnswer.toLowerCase();
  const matchCount = mystery.keywords.filter(kw => lower.includes(kw)).length;

  if (mystery.requiredKeywords.length > 0) {
    return mystery.requiredKeywords.some(kw => lower.includes(kw));
  }

  return matchCount >= 2;
}

// ── Deterministic Judge ───────────────────────────────────────
// Negation words — trigger a signal polarity flip (green ↔ red)
const NEGATION_WORDS = [
  'not', 'no', 'never', 'nobody', 'nothing', 'nowhere',
  "didn't", "doesn't", "wasn't", "weren't", "isn't",
  "aren't", "wouldn't", "couldn't", "can't", "won't",
  "don't", "hasn't", "haven't", "hadn't", "shouldn't", 'without'
];

// Evaluates a player question against a mystery's structured truth model.
// Returns: 'green' | 'yellow' | 'red' | 'gray'
//
// Signal meanings:
//   green  = YES  — the answer to the question is yes
//   red    = NO   — the answer to the question is no
//   yellow = DOUBTFUL — ambiguous, could be yes or no
//   gray   = IRRELEVANT — not connected to the story at all
//
// Classification rules (in priority order):
//   1. GREEN + RED both match  → 'yellow'  (mixed/conflicting concepts)
//   2. GREEN match only        → 'green'   (yes)
//   3. RED match only          → 'red'     (no)
//   4. YELLOW match only       → 'yellow'  (doubtful)
//   5. No match                → 'gray'    (irrelevant)
//
// Negation flip (applied after classification):
//   negation + green → red   (question asks about something true in a negative way → no)
//   negation + red   → green (question negates something false → yes)
//   negation + yellow/gray → unchanged
function judgeQuestion(mysteryId, rawQuestion) {
  const mystery = MYSTERIES.find(m => m.id === mysteryId);
  if (!mystery || !mystery.truthModel) return 'gray';

  const q = rawQuestion.toLowerCase();
  const { greenKeywords, yellowKeywords, redKeywords } = mystery.truthModel;

  // Detect negation with word-boundary matching
  const hasNegation = NEGATION_WORDS.some(word => {
    if (word.includes("'")) {
      // Contractions: simple substring match (they're specific enough)
      return q.includes(word);
    }
    // Plain words: use word boundary to avoid partial matches (e.g. "not" in "notion")
    return new RegExp('\\b' + word + '\\b').test(q);
  });

  // Keyword bucket matching
  const matchesGreen  = greenKeywords.some(kw => q.includes(kw));
  const matchesRed    = redKeywords.some(kw => q.includes(kw));
  const matchesYellow = yellowKeywords.some(kw => q.includes(kw));

  // Resolve raw signal
  let raw;
  if (matchesGreen && matchesRed) {
    raw = 'yellow'; // conflict — mixes correct and incorrect concepts
  } else if (matchesGreen) {
    raw = 'green';
  } else if (matchesRed) {
    raw = 'red';
  } else if (matchesYellow) {
    raw = 'yellow';
  } else {
    raw = 'gray';
  }

  // Apply negation flip (green ↔ red only)
  if (hasNegation) {
    if (raw === 'green') return 'red';
    if (raw === 'red')   return 'green';
  }

  return raw;
}

// ── Scoring ───────────────────────────────────────────────────
function calculateScore(questionsUsed, timeSeconds, penalties) {
  const base = 100;
  const accuracyBonus = Math.max(0, Math.round(50 * (7 - questionsUsed) / 6));
  const speedBonus =
    timeSeconds <= 120 ? 50 :
    timeSeconds >= 300 ? 0 :
    Math.round(50 * (300 - timeSeconds) / 180);
  const total = Math.max(0, base + accuracyBonus + speedBonus - (penalties || 0));
  return { base, accuracyBonus, speedBonus, penalties: penalties || 0, total };
}

// ── Helpers ───────────────────────────────────────────────────
function getMystery(id) {
  return MYSTERIES.find(m => m.id === id) || null;
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function getCurrency() {
  return parseInt(localStorage.getItem('nd_currency') || '0');
}

function addCurrency(amount) {
  const current = getCurrency();
  localStorage.setItem('nd_currency', String(current + amount));
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── Ranking Tiers ─────────────────────────────────────────────
const TIERS = [
  { tier: 'Master',          min: 2500, color: '#FF2D78', glow: 'rgba(255,45,120,0.5)'  },
  { tier: 'Elite',           min: 2000, color: '#7B2FFF', glow: 'rgba(123,47,255,0.5)'  },
  { tier: 'Senior Detective',min: 1500, color: '#00F5FF', glow: 'rgba(0,245,255,0.5)'   },
  { tier: 'Detective',       min: 1000, color: '#00FF88', glow: 'rgba(0,255,136,0.5)'   },
  { tier: 'Rookie',          min:    0, color: '#888888', glow: 'rgba(136,136,136,0.3)' },
];

function getTierInfo(rankPoints) {
  return TIERS.find(t => rankPoints >= t.min) || TIERS[TIERS.length - 1];
}

// ── Player Profiles ───────────────────────────────────────────
// Stored in nd_players: [{name, rankPoints, wins, losses}]

function getPlayers() {
  try { return JSON.parse(localStorage.getItem('nd_players') || '[]'); }
  catch (_) { return []; }
}

function savePlayers(players) {
  localStorage.setItem('nd_players', JSON.stringify(players));
}

function getOrCreatePlayer(name) {
  const players = getPlayers();
  let p = players.find(x => x.name.toLowerCase() === name.toLowerCase());
  if (!p) {
    p = { name, rankPoints: 1000, wins: 0, losses: 0, skillsBought: 0 };
    players.push(p);
    savePlayers(players);
  }
  return p;
}

function updatePlayerStats(name, { rankDelta = 0, winDelta = 0, lossDelta = 0 }) {
  const players = getPlayers();
  const idx = players.findIndex(x => x.name.toLowerCase() === name.toLowerCase());
  if (idx < 0) return;
  players[idx].rankPoints = Math.max(0, players[idx].rankPoints + rankDelta);
  players[idx].wins   += winDelta;
  players[idx].losses += lossDelta;
  savePlayers(players);
  return players[idx];
}

// ── Custom Mystery Submissions ────────────────────────────────
// nd_custom_submissions: [{id, title, scenario, truth, submittedAt, status}]
// status: 'pending' | 'accepted'

function getSubmissions() {
  try { return JSON.parse(localStorage.getItem('nd_custom_submissions') || '[]'); }
  catch (_) { return []; }
}

function saveSubmissions(subs) {
  localStorage.setItem('nd_custom_submissions', JSON.stringify(subs));
}

// Save a custom mystery for review, returns the submission id.
function submitCustomMystery(mysteryData) {
  const subs = getSubmissions();
  const id = 'sub-' + Date.now();
  subs.push({
    id,
    title:     mysteryData.title,
    scenario:  mysteryData.scenario,
    truth:     mysteryData.truth,
    submittedAt: Date.now(),
    status: 'pending'
  });
  saveSubmissions(subs);
  return id;
}

// Accept a submission (simulated admin action) — awards 200 currency.
function acceptSubmission(submissionId) {
  const subs = getSubmissions();
  const idx = subs.findIndex(s => s.id === submissionId);
  if (idx < 0) return false;
  subs[idx].status = 'accepted';
  saveSubmissions(subs);
  addCurrency(200);
  return true;
}

// ── Party-mode detective colours ──────────────────────────────
const DETECTIVE_COLORS = ['#00F5FF', '#FF2D78', '#00FF88', '#FFD700', '#7B2FFF'];

// ── Anti-cheat — Competitive Seen Tracking ────────────────────
// Tracks which competitive mystery IDs each player has played.
// Stored per-player: nd_seen_comp_{normalized_name}

function _seenKey(playerName) {
  return 'nd_seen_comp_' + playerName.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
}

function getSeenCompetitive(playerName) {
  try { return JSON.parse(localStorage.getItem(_seenKey(playerName)) || '[]'); }
  catch (_) { return []; }
}

function markSeenCompetitive(playerName, mysteryId) {
  const key = _seenKey(playerName);
  const seen = getSeenCompetitive(playerName);
  if (!seen.includes(mysteryId)) {
    seen.push(mysteryId);
    localStorage.setItem(key, JSON.stringify(seen));
  }
}

// Returns mysteries available for competitive mode that playerName hasn't played.
// If all are exhausted, resets their seen list and returns full pool.
function getAvailableCompetitive(playerName) {
  const pool = MYSTERIES.filter(m => m.mode === 'competitive' || m.mode === 'both');
  const seen = getSeenCompetitive(playerName);
  const available = pool.filter(m => !seen.includes(m.id));
  if (available.length === 0) {
    // Reset — player has seen everything; start fresh
    localStorage.removeItem(_seenKey(playerName));
    return pool;
  }
  return available;
}

// ── Anti-cheat — Party Seen Tracking ─────────────────────────
function _seenPartyKey(playerName) {
  return 'nd_seen_party_' + playerName.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
}
function getSeenParty(playerName) {
  try { return JSON.parse(localStorage.getItem(_seenPartyKey(playerName)) || '[]'); }
  catch (_) { return []; }
}
function markSeenParty(playerName, mysteryId) {
  const key = _seenPartyKey(playerName);
  const seen = getSeenParty(playerName);
  if (!seen.includes(mysteryId)) {
    seen.push(mysteryId);
    localStorage.setItem(key, JSON.stringify(seen));
  }
}
// Returns party mysteries not yet played by any of the given players.
// Falls back to full pool if everyone has seen everything.
function getAvailableParty(playerNames) {
  const pool = MYSTERIES.filter(m => m.mode === 'party' || m.mode === 'both');
  if (!pool.length) return MYSTERIES.filter(m => !m.variantOf); // safety fallback
  const allSeen = playerNames.flatMap(n => getSeenParty(n));
  const available = pool.filter(m => !allSeen.includes(m.id));
  if (available.length === 0) {
    // Reset everyone — full cycle done
    playerNames.forEach(n => localStorage.removeItem(_seenPartyKey(n)));
    return pool;
  }
  return available;
}

// ── Profile Helpers ───────────────────────────────────────────
function getProfileName() {
  return localStorage.getItem('nd_profile_name') || '';
}

function setProfileName(name) {
  const trimmed = name.trim();
  if (!trimmed) return;
  // If old name existed in nd_players, rename the entry
  const oldName = getProfileName();
  if (oldName && oldName !== trimmed) {
    const players = getPlayers();
    const idx = players.findIndex(p => p.name.toLowerCase() === oldName.toLowerCase());
    if (idx >= 0) {
      players[idx].name = trimmed;
      savePlayers(players);
    }
  }
  localStorage.setItem('nd_profile_name', trimmed);
}

function getSolvedCount() {
  try {
    const practice = JSON.parse(localStorage.getItem('nd_completed_cases') || '[]').length;
    const name = getProfileName();
    const comp = name ? (getOrCreatePlayer(name).wins || 0) : 0;
    return practice + comp;
  } catch (_) { return 0; }
}

function getSoundEnabled() {
  return localStorage.getItem('nd_sound') !== 'false';
}

function setSoundEnabled(val) {
  localStorage.setItem('nd_sound', val ? 'true' : 'false');
}
