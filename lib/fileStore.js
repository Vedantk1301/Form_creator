const fs = require('fs').promises;
const path = require('path');

async function ensureFile(filePath) {
  try {
    await fs.access(filePath);
  } catch (err) {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, '{}', 'utf8');
  }
}

async function readJson(filePath) {
  await ensureFile(filePath);
  const data = await fs.readFile(filePath, 'utf8');
  return data ? JSON.parse(data) : {};
}

async function writeJson(filePath, payload) {
  await ensureFile(filePath);
  await fs.writeFile(filePath, JSON.stringify(payload, null, 2), 'utf8');
}

module.exports = { readJson, writeJson };
