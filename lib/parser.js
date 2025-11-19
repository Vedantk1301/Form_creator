const PART_REGEX = /^part\s*(\d+)[\.:\-]?\s*(.*)$/i;
const BULLET_REGEX = /^([\u2022\-\*]|\d+\.)\s*/i;

function cleanLine(line) {
  return line.replace(/\s+/g, ' ').trim();
}

function extractOptions(text) {
  const matches = text.match(/\(([^)]+)\)/g);
  if (!matches) return [];
  const possibleOptions = matches
    .map((segment) => segment.replace(/[()]/g, '').trim())
    .filter((segment) => segment.includes(',') || segment.includes('|'));
  if (!possibleOptions.length) return [];
  const raw = possibleOptions.pop();
  return raw
    .split(/[,|]/)
    .map((option) => option.trim())
    .filter(Boolean);
}

function inferType(options) {
  if (options?.length) {
    return options.length > 4 ? 'multi-select' : 'dropdown';
  }
  return 'textarea';
}

function parseDocument(text) {
  const normalized = text.replace(/\r/g, '');
  const lines = normalized
    .split('\n')
    .map((line) => cleanLine(line))
    .filter((line) => line.length);

  let title = 'Untitled Brief';
  let docDate = null;
  const headerLines = [];

  while (lines.length && !lines[0].toLowerCase().startsWith('part')) {
    const line = lines.shift();
    headerLines.push(line);
  }

  if (headerLines.length) {
    title = headerLines[0];
    const dateLine = headerLines.find((line) => line.toLowerCase().startsWith('date'));
    if (dateLine) {
      const [, dateValue] = dateLine.split(':');
      docDate = dateValue?.trim() || null;
    }
  }

  const parts = [];
  let currentPart = null;

  lines.forEach((line) => {
    if (PART_REGEX.test(line)) {
      const [, number, name] = line.match(PART_REGEX);
      currentPart = {
        id: `part-${number}`,
        label: `Part ${number}`,
        name: name?.trim() || `Section ${number}`,
        description: '',
        questions: []
      };
      parts.push(currentPart);
      return;
    }

    if (!currentPart) return;

    if (BULLET_REGEX.test(line)) {
      const prompt = line.replace(BULLET_REGEX, '').trim();
      if (!prompt) return;
      const options = extractOptions(prompt);
      currentPart.questions.push({
        id: `${currentPart.id}-q${currentPart.questions.length + 1}`,
        prompt,
        type: inferType(options),
        options
      });
      return;
    }

    if (!currentPart.description) {
      currentPart.description = line;
    } else {
      currentPart.description = `${currentPart.description} ${line}`.trim();
    }
  });

  return {
    meta: {
      title,
      docDate,
      fallbackModel: 'gpt-5-nano'
    },
    parts
  };
}

module.exports = { parseDocument };
