const sections = [
  {
    title: "Part 1 · Product Composition & Formulation",
    context:
      "Pocari Sweat is an isotonic ion-supply drink inspired by Japanese IV science, focused on balanced electrolytes for faster absorption.",
    questions: [
      "Are there any formulation variations (ion balance, sugar concentration, or taste profiles) across global markets like Japan, Indonesia, or China?",
      "Does India use the same global formula, or are there adaptations for local palates or climate?",
      "How does the moderate sugar level contribute to Pocari’s claim of “gentle, long-lasting hydration”?",
      "Pocari’s formula is said to match the body’s natural fluid balance for faster absorption. How is this science currently communicated, as a technical differentiator or in a simpler, consumer-friendly way?",
      "Are there any ongoing R&D efforts to evolve the formula for India’s high-heat, high-humidity context?",
    ],
  },
  {
    title: "Part 2 · Product Experience & Taste Perception",
    context:
      "Mild sweetness, clean finish, and a texture that sits between water and flavored drinks make Pocari distinct.",
    questions: [
      "How do Indian consumers respond to the taste and texture of Pocari?",
      "Has taste acceptance been a barrier in early trials or studies?",
      "Are there plans for flavor or pack extensions, even in pilot testing stages?",
      "How important is temperature to the experience, does the brand recommend it chilled, ambient, or flexible?",
    ],
  },
  {
    title: "Part 3 · Market Presence & Distribution",
    context: "Availability, depth of distribution, and discovery tactics across India.",
    questions: [
      "Where is Pocari Sweat currently available in India (geography + channels)?",
      "How deep is the distribution network, early-stage pilot, focused metros, or national rollout?",
      "What are the key retail and e-commerce partners, and how do pricing and visibility vary across platforms?",
      "What’s the current discovery strategy, sampling at gyms, sports events, pharmacies, or modern trade?",
      "Are there any regional trends in adoption (e.g., coastal, southern, or metro markets showing faster traction)?",
    ],
  },
  {
    title: "Part 4 · Seasonal & Situational Consumption",
    context:
      "Map the heat, ritual, and cultural moments where Pocari fits naturally in India.",
    questions: [
      "Have you observed seasonal spikes in consumption, e.g., peak summer or pre-festive months?",
      "Are there specific daily moments where Pocari naturally fits (morning routines, post-work fatigue, travel, sleep recovery)?",
      "Do Indian consumers see Pocari as a preventive ritual or a recovery drink today?",
      "Based on learnings from Southeast Asian markets (like Ramadan cycles or outdoor labor), do you see parallel cultural moments in India where Pocari could play a role?",
    ],
  },
  {
    title: "Part 5 · Competitive Landscape",
    context:
      "Pocari straddles hydration and wellness, distinct from typical sports or energy drinks.",
    questions: [
      "Which brands do you consider direct competitors in India (ORS+, Enerzal, Fast&Up, Electrol, Gatorade)?",
      "Which adjacent categories (coconut water, functional teas, protein drinks, bottled water) compete for the same consumption moments?",
      "What’s Pocari’s current pricing and value perception relative to these players?",
      "How do you currently differentiate Pocari’s scientific story from ORS-based products that also talk about electrolytes?",
    ],
  },
  {
    title: "Part 6 · Consumer Understanding",
    context: "Profile, triggers, and repeat behavior of current vs aspirational consumers.",
    questions: [
      "Who is Pocari Sweat’s current core consumer in India currently (profile, lifestyle, and mindset)?",
      "What is their trigger moment, physical activity, fatigue, heat, or proactive wellness?",
      "How does this differ from your target aspirational consumer for scale?",
      "What have you observed about repeat purchase patterns, what drives or deters them?",
      "What are the key consumer misconceptions or education gaps that persist in the market?",
    ],
  },
  {
    title: "Part 7 · Brand Perception & Education",
    context:
      "Globally the brand stands for rhythm, balance, quiet strength – how is that resonating locally?",
    questions: [
      "In India, what are current brand perceptions, niche, foreign, clinical, or lifestyle-led?",
      "What are the strongest product truths you feel are under-communicated in India?",
      "Are there specific proof points or studies (like 2.2x faster hydration) that could be highlighted locally?",
      "How do you measure belief and trust in Pocari’s science among Indian consumers?",
    ],
  },
  {
    title: "Part 8 · Brand Philosophy & Localization",
    context: "Identify the non-negotiable Japanese DNA versus local flavors that can flex.",
    questions: [
      "Which parts of the Japanese DNA (precision, discipline, care) are most essential to retain?",
    ],
  },
  {
    title: "Part 9 · Growth & Innovation",
    context: "Ambitions, innovation pipeline, and partnerships for the next 24–36 months.",
    questions: [
      "What’s the three-year ambition for Pocari Sweat in India, awareness, trial, loyalty, or mainstreaming?",
      "Are there variant launches or format innovations (smaller packs, sachets, or sugar-free versions) on the horizon?",
      "Do you see potential in corporate wellness, education, or medical partnerships as future growth channels?",
      "What are your key milestones for India over the next 12–24 months?",
    ],
  },
  {
    title: "Part 10 · The Insight Behind the Science",
    context: "Capture the essence, myth-busting, and day-in-the-life role for Pocari.",
    questions: [
      "What’s the one thing people most misunderstand about Pocari Sweat?",
      "What’s the one truth or fact about the product that you feel defines its essence?",
      "If you had to describe the real role of Pocari in a consumer’s day, beyond hydration what would it be?",
    ],
  },
];

const bucketList = document.querySelector(".bucket-list");
const partTitle = document.querySelector(".part-title");
const partContext = document.querySelector(".part-context");
const questionText = document.querySelector(".question-text");
const textarea = document.querySelector(".response-input");
const progressLabel = document.querySelector(".progress-label");
const progressFill = document.querySelector(".progress-bar__fill");

let currentPart = 0;
let currentQuestion = 0;
const responses = new Map();
const bookmarks = new Set();

function totalQuestions() {
  return sections.reduce((sum, section) => sum + section.questions.length, 0);
}

function currentIndex() {
  let index = 0;
  for (let i = 0; i < currentPart; i += 1) {
    index += sections[i].questions.length;
  }
  return index + currentQuestion;
}

function updateProgress() {
  const absoluteIndex = currentIndex();
  const total = totalQuestions();
  const label = `Question ${absoluteIndex + 1} / ${total}`;
  progressLabel.textContent = label;
  progressFill.style.width = `${((absoluteIndex + 1) / total) * 100}%`;
}

function updateBucketMap() {
  bucketList.innerHTML = "";
  sections.forEach((section, index) => {
    const item = document.createElement("li");
    item.className = "bucket-item";
    if (index === currentPart) {
      item.classList.add("active");
    }

    const answeredCount = section.questions.filter((_, qIndex) =>
      responses.has(`${index}-${qIndex}`)
    ).length;

    if (answeredCount === section.questions.length) {
      item.classList.add("complete");
    }

    item.innerHTML = `
      <span>
        <strong>${index + 1}.</strong>
        ${section.title.replace(/Part \d+ · /, "")}
      </span>
      <small>${answeredCount}/${section.questions.length}</small>
    `;

    item.addEventListener("click", () => {
      currentPart = index;
      currentQuestion = 0;
      renderQuestion();
    });
    bucketList.appendChild(item);
  });
}

function renderQuestion() {
  const section = sections[currentPart];
  const question = section.questions[currentQuestion];
  partTitle.textContent = section.title;
  partContext.textContent = section.context;
  questionText.textContent = question;
  const storedValue = responses.get(`${currentPart}-${currentQuestion}`) ?? "";
  textarea.value = storedValue;
  updateProgress();
  updateBucketMap();
}

function persistResponse() {
  const key = `${currentPart}-${currentQuestion}`;
  if (textarea.value.trim()) {
    responses.set(key, textarea.value.trim());
  } else {
    responses.delete(key);
  }
}

function goToNextQuestion() {
  persistResponse();
  const section = sections[currentPart];
  if (currentQuestion < section.questions.length - 1) {
    currentQuestion += 1;
  } else if (currentPart < sections.length - 1) {
    currentPart += 1;
    currentQuestion = 0;
  }
  renderQuestion();
}

function goToPreviousQuestion() {
  persistResponse();
  if (currentQuestion > 0) {
    currentQuestion -= 1;
  } else if (currentPart > 0) {
    currentPart -= 1;
    currentQuestion = sections[currentPart].questions.length - 1;
  }
  renderQuestion();
}

function toggleBookmark() {
  const key = `${currentPart}-${currentQuestion}`;
  if (bookmarks.has(key)) {
    bookmarks.delete(key);
  } else {
    bookmarks.add(key);
  }
  document
    .querySelector("[data-action='bookmark']")
    .classList.toggle("active", bookmarks.has(key));
}

function addEventListeners() {
  document
    .querySelector("[data-action='next']")
    .addEventListener("click", goToNextQuestion);
  document
    .querySelector("[data-action='previous']")
    .addEventListener("click", goToPreviousQuestion);
  document
    .querySelector("[data-action='bookmark']")
    .addEventListener("click", toggleBookmark);

  textarea.addEventListener("input", () => {
    persistResponse();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      goToNextQuestion();
    }
    if (event.key === "ArrowLeft") {
      goToPreviousQuestion();
    }
  });
}

addEventListeners();
renderQuestion();
