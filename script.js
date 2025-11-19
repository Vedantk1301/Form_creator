const sections = [
  {
    title: "Part 1 · Product Composition & Formulation",
    context:
      "Pocari Sweat is an isotonic ion-supply drink inspired by Japanese IV science, focused on balanced electrolytes for faster absorption.",
    questions: [
      {
        text: "Are there any formulation variations (ion balance, sugar concentration, or taste profiles) across global markets like Japan, Indonesia, or China?",
        type: "textarea",
      },
      {
        text: "Does India use the same global formula, or are there adaptations for local palates or climate?",
        type: "textarea",
      },
      {
        text: "How does the moderate sugar level contribute to Pocari’s claim of ‘gentle, long-lasting hydration’?",
        type: "textarea",
      },
      {
        text: "Pocari’s formula matches the body’s natural fluid balance for faster absorption. How is this science currently communicated?",
        type: "textarea",
      },
      {
        text: "Are there any ongoing R&D efforts to evolve the formula for India’s high-heat, high-humidity context?",
        type: "dropdown",
        options: [
          "Yes – regional pilots running",
          "Yes – exploratory stage",
          "Planned but not initiated",
          "Not currently",
        ],
      },
    ],
  },
  {
    title: "Part 2 · Product Experience & Taste Perception",
    context:
      "Mild sweetness, clean finish, and a texture that sits between water and flavored drinks make Pocari distinct.",
    questions: [
      {
        text: "How do Indian consumers respond to the taste and texture of Pocari?",
        type: "textarea",
      },
      {
        text: "Has taste acceptance been a barrier in early trials or studies?",
        type: "dropdown",
        options: [
          "Consistently positive",
          "Mixed feedback",
          "Needs localization",
          "Insufficient data",
        ],
      },
      {
        text: "Are there plans for flavor or pack extensions, even in pilot testing stages?",
        type: "textarea",
      },
      {
        text: "How important is temperature to the experience, does the brand recommend it chilled, ambient, or flexible?",
        type: "dropdown",
        options: ["Chilled", "Ambient", "Flexible"],
      },
    ],
  },
  {
    title: "Part 3 · Market Presence & Distribution",
    context: "Availability, depth of distribution, and discovery tactics across India.",
    questions: [
      { text: "Where is Pocari Sweat currently available in India (geography + channels)?", type: "textarea" },
      { text: "How deep is the distribution network, early-stage pilot, focused metros, or national rollout?", type: "dropdown", options: [
          "Early-stage pilot",
          "Metro-focused",
          "Expanding regionally",
          "National rollout",
        ],
      },
      { text: "What are the key retail and e-commerce partners, and how do pricing and visibility vary across platforms?", type: "textarea" },
      { text: "What’s the current discovery strategy, sampling at gyms, sports events, pharmacies, or modern trade?", type: "textarea" },
      { text: "Are there any regional trends in adoption (e.g., coastal, southern, or metro markets showing faster traction)?", type: "textarea" },
    ],
  },
  {
    title: "Part 4 · Seasonal & Situational Consumption",
    context: "Map the heat, ritual, and cultural moments where Pocari fits naturally in India.",
    questions: [
      { text: "Have you observed seasonal spikes in consumption, e.g., peak summer or pre-festive months?", type: "textarea" },
      { text: "Are there specific daily moments where Pocari naturally fits (morning routines, post-work fatigue, travel, sleep recovery)?", type: "textarea" },
      {
        text: "Do Indian consumers see Pocari as a preventive ritual or a recovery drink today?",
        type: "dropdown",
        options: ["Preventive", "Recovery", "Both", "Not sure"],
      },
      { text: "Based on learnings from Southeast Asian markets, do you see parallel cultural moments in India where Pocari could play a role?", type: "textarea" },
    ],
  },
  {
    title: "Part 5 · Competitive Landscape",
    context:
      "Pocari straddles hydration and wellness, distinct from typical sports or energy drinks.",
    questions: [
      {
        text: "Which brands do you consider direct competitors in India (ORS+, Enerzal, Fast&Up, Electrol, Gatorade)?",
        type: "textarea",
      },
      {
        text: "Which adjacent categories compete for the same consumption moments?",
        type: "textarea",
      },
      {
        text: "What’s Pocari’s current pricing and value perception relative to these players?",
        type: "textarea",
      },
      {
        text: "How do you currently differentiate Pocari’s scientific story from ORS-based products that also talk about electrolytes?",
        type: "textarea",
      },
    ],
  },
  {
    title: "Part 6 · Consumer Understanding",
    context: "Profile, triggers, and repeat behavior of current vs aspirational consumers.",
    questions: [
      { text: "Who is Pocari Sweat’s current core consumer in India (profile, lifestyle, and mindset)?", type: "textarea" },
      { text: "What is their trigger moment: physical activity, fatigue, heat, or proactive wellness?", type: "dropdown", options: [
          "Physical activity",
          "Fatigue",
          "Heat management",
          "Proactive wellness",
          "Other",
        ],
      },
      { text: "How does this differ from your target aspirational consumer for scale?", type: "textarea" },
      { text: "What have you observed about repeat purchase patterns, what drives or deters them?", type: "textarea" },
      { text: "What are the key consumer misconceptions or education gaps that persist in the market?", type: "textarea" },
    ],
  },
  {
    title: "Part 7 · Brand Perception & Education",
    context:
      "Globally the brand stands for rhythm, balance, quiet strength – how is that resonating locally?",
    questions: [
      { text: "In India, what are current brand perceptions, niche, foreign, clinical, or lifestyle-led?", type: "textarea" },
      { text: "What are the strongest product truths you feel are under-communicated in India?", type: "textarea" },
      { text: "Are there specific proof points or studies (like 2.2x faster hydration) that could be highlighted locally?", type: "textarea" },
      { text: "How do you measure belief and trust in Pocari’s science among Indian consumers?", type: "textarea" },
    ],
  },
  {
    title: "Part 8 · Brand Philosophy & Localization",
    context: "Identify the non-negotiable Japanese DNA versus local flavors that can flex.",
    questions: [
      {
        text: "Which parts of the Japanese DNA (precision, discipline, care) are most essential to retain?",
        type: "textarea",
      },
    ],
  },
  {
    title: "Part 9 · Growth & Innovation",
    context: "Ambitions, innovation pipeline, and partnerships for the next 24–36 months.",
    questions: [
      { text: "What’s the three-year ambition for Pocari Sweat in India?", type: "textarea" },
      { text: "Are there variant launches or format innovations (smaller packs, sachets, or sugar-free versions) on the horizon?", type: "textarea" },
      {
        text: "Do you see potential in corporate wellness, education, or medical partnerships as future growth channels?",
        type: "dropdown",
        options: [
          "Corporate wellness",
          "Education",
          "Medical",
          "All of the above",
          "Exploring",
        ],
      },
      { text: "What are your key milestones for India over the next 12–24 months?", type: "textarea" },
    ],
  },
  {
    title: "Part 10 · The Insight Behind the Science",
    context: "Capture the essence, myth-busting, and day-in-the-life role for Pocari.",
    questions: [
      { text: "What’s the one thing people most misunderstand about Pocari Sweat?", type: "textarea" },
      { text: "What’s the one truth or fact about the product that you feel defines its essence?", type: "textarea" },
      { text: "If you had to describe the real role of Pocari in a consumer’s day, beyond hydration what would it be?", type: "textarea" },
    ],
  },
];

const bucketList = document.querySelector(".bucket-list");
const partTitle = document.querySelector(".part-title");
const partContext = document.querySelector(".part-context");
const questionText = document.querySelector(".question-text");
const progressLabel = document.querySelector(".progress-label");
const progressFill = document.querySelector(".progress-bar__fill");
const responseField = document.querySelector(".response-field");
const entryScreen = document.querySelector(".entry-screen");
const workspace = document.querySelector(".workspace");
const uploadInput = document.getElementById("brief-upload");
const generateButton = document.querySelector("[data-action='generate-form']");
const uploadChipLabel = document.querySelector(".upload-chip span");
const sessionFile = document.querySelector(".session-file");
const sheetStatus = document.querySelector(".sheet-status");
const shareLink = document.querySelector(".share-link");
const copyLinkButton = document.querySelector("[data-action='copy-link']");
const autosaveState = document.querySelector(".autosave-state");
const navButtons = document.querySelectorAll(".nav-controls button");
const bookmarkButton = document.querySelector("[data-action='bookmark']");

let currentPart = 0;
let currentQuestion = 0;
let activeInputElement = null;
let workspaceReady = false;
let sessionId = "";
let sessionShareLink = "";
let storageKey = "";

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
      if (!workspaceReady) return;
      persistResponse();
      currentPart = index;
      currentQuestion = 0;
      renderQuestion();
    });
    bucketList.appendChild(item);
  });
}

function buildInputControl(question, storedValue) {
  if (question.type === "dropdown" && Array.isArray(question.options)) {
    const select = document.createElement("select");
    select.className = "response-select";
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "Select an option";
    select.appendChild(placeholder);

    question.options.forEach((option) => {
      const optionEl = document.createElement("option");
      optionEl.value = option;
      optionEl.textContent = option;
      select.appendChild(optionEl);
    });

    select.value = storedValue ?? "";
    select.addEventListener("change", () => {
      persistResponse();
    });
    return select;
  }

  const textarea = document.createElement("textarea");
  textarea.className = "response-input";
  textarea.rows = 6;
  textarea.placeholder = "Capture insights, numbers, anecdotes or quick notes...";
  textarea.value = storedValue ?? "";
  textarea.addEventListener("input", () => {
    persistResponse();
  });
  return textarea;
}

function renderQuestion() {
  const section = sections[currentPart];
  const question = section.questions[currentQuestion];
  partTitle.textContent = section.title;
  partContext.textContent = section.context;
  questionText.textContent = question.text;
  const storedValue = responses.get(`${currentPart}-${currentQuestion}`) ?? "";
  responseField.innerHTML = "";
  activeInputElement = buildInputControl(question, storedValue);
  responseField.appendChild(activeInputElement);
  bookmarkButton.classList.toggle(
    "active",
    bookmarks.has(`${currentPart}-${currentQuestion}`)
  );
  updateProgress();
  updateBucketMap();
}

function getActiveValue() {
  if (!activeInputElement) return "";
  return activeInputElement.value ?? "";
}

function updateAutosaveState(message) {
  const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  autosaveState.textContent = `${message} · ${time}`;
}

function saveSessionSnapshot() {
  if (typeof window === "undefined" || !storageKey) return;
  const payload = {
    responses: Array.from(responses.entries()),
    bookmarks: Array.from(bookmarks),
    currentPart,
    currentQuestion,
    sessionId,
  };
  window.localStorage.setItem(storageKey, JSON.stringify(payload));
}

function hydrateSessionSnapshot() {
  if (typeof window === "undefined" || !storageKey) return;
  const raw = window.localStorage.getItem(storageKey);
  if (!raw) return;
  try {
    const parsed = JSON.parse(raw);
    responses.clear();
    parsed.responses.forEach(([key, value]) => {
      responses.set(key, value);
    });
    bookmarks.clear();
    parsed.bookmarks.forEach((key) => bookmarks.add(key));
    currentPart = parsed.currentPart ?? 0;
    currentQuestion = parsed.currentQuestion ?? 0;
  } catch (error) {
    console.error("Failed to hydrate session", error);
  }
}

function persistResponse() {
  if (!workspaceReady || !activeInputElement) return;
  const key = `${currentPart}-${currentQuestion}`;
  const value = getActiveValue().trim();
  if (value) {
    responses.set(key, value);
  } else {
    responses.delete(key);
  }
  saveSessionSnapshot();
  updateAutosaveState("Draft saved locally");
}

function goToNextQuestion() {
  if (!workspaceReady) return;
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
  if (!workspaceReady) return;
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
  if (!workspaceReady) return;
  const key = `${currentPart}-${currentQuestion}`;
  if (bookmarks.has(key)) {
    bookmarks.delete(key);
  } else {
    bookmarks.add(key);
  }
  bookmarkButton.classList.toggle("active", bookmarks.has(key));
  saveSessionSnapshot();
}

function handleCopyLink() {
  if (!sessionShareLink) return;
  const text = sessionShareLink;
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      copyLinkButton.textContent = "Copied";
      setTimeout(() => {
        copyLinkButton.textContent = "Copy link";
      }, 1600);
    });
  }
}

function createSessionId() {
  return `pocari-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

function buildShareUrl(id) {
  if (typeof window !== "undefined" && window.location?.origin) {
    return `${window.location.origin}/forms/${id}`;
  }
  return `https://pocari-form.vercel.app/forms/${id}`;
}

function activateWorkspace() {
  sessionId = createSessionId();
  sessionShareLink = buildShareUrl(sessionId);
  storageKey = `pocari-session-${sessionId}`;
  responses.clear();
  bookmarks.clear();
  currentPart = 0;
  currentQuestion = 0;
  hydrateSessionSnapshot();

  entryScreen.classList.add("collapsed");
  workspace.classList.remove("is-idle");
  workspaceReady = true;
  sessionFile.textContent = uploadChipLabel.textContent;
  sheetStatus.textContent = "Connected · responses sync via share link";
  shareLink.textContent = sessionShareLink;
  copyLinkButton.disabled = false;
  navButtons.forEach((button) => button.removeAttribute("disabled"));
  autosaveState.textContent = "Autosave armed";
  persistResponse();
  renderQuestion();
}

function handleUploadChange(event) {
  const file = event.target.files?.[0];
  if (!file) {
    uploadChipLabel.textContent = "Upload PDF / DOC / TXT";
    generateButton.disabled = true;
    return;
  }
  uploadChipLabel.textContent = file.name;
  generateButton.disabled = false;
}

function addEventListeners() {
  document
    .querySelector("[data-action='next']")
    .addEventListener("click", goToNextQuestion);
  document
    .querySelector("[data-action='previous']")
    .addEventListener("click", goToPreviousQuestion);
  bookmarkButton.addEventListener("click", toggleBookmark);

  document.addEventListener("keydown", (event) => {
    if (!workspaceReady) return;
    if (event.key === "ArrowRight") {
      goToNextQuestion();
    }
    if (event.key === "ArrowLeft") {
      goToPreviousQuestion();
    }
  });

  uploadInput.addEventListener("change", handleUploadChange);
  generateButton.addEventListener("click", activateWorkspace);
  copyLinkButton.addEventListener("click", handleCopyLink);
}

addEventListeners();
updateProgress();
updateBucketMap();
renderQuestion();
