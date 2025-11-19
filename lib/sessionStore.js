const path = require('path');
const { readJson, writeJson } = require('./fileStore');

const SESSION_FILE = path.join(process.cwd(), 'data', 'sessions.json');

async function saveSession(sessionId, payload) {
  const allSessions = await readJson(SESSION_FILE);
  allSessions[sessionId] = payload;
  await writeJson(SESSION_FILE, allSessions);
  return payload;
}

async function getSession(sessionId) {
  const allSessions = await readJson(SESSION_FILE);
  return allSessions[sessionId];
}

async function listSessions() {
  const allSessions = await readJson(SESSION_FILE);
  return Object.keys(allSessions).map((id) => ({ id, meta: allSessions[id].meta }));
}

module.exports = { saveSession, getSession, listSessions };
