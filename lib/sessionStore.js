const path = require('path');
const { readJson, writeJson } = require('./fileStore');

const CUSTOM_SESSION_FILE = process.env.SESSION_STORE_PATH;
const DEFAULT_SESSION_FILE = CUSTOM_SESSION_FILE || path.join(process.cwd(), 'data', 'sessions.json');
const FALLBACK_SESSION_FILE = process.env.SESSION_STORE_FALLBACK_PATH || path.join('/tmp', 'glassbox-sessions.json');
const CAN_FALLBACK = !CUSTOM_SESSION_FILE;

let resolvedSessionFile = DEFAULT_SESSION_FILE;

async function withWritableStore(fn) {
  try {
    return await fn(resolvedSessionFile);
  } catch (error) {
    const isReadOnly = error && (error.code === 'EROFS' || error.code === 'EACCES');
    if (isReadOnly && CAN_FALLBACK && resolvedSessionFile !== FALLBACK_SESSION_FILE) {
      resolvedSessionFile = FALLBACK_SESSION_FILE;
      return fn(resolvedSessionFile);
    }
    throw error;
  }
}

async function saveSession(sessionId, payload) {
  return withWritableStore(async (filePath) => {
    const allSessions = await readJson(filePath);
    allSessions[sessionId] = payload;
    await writeJson(filePath, allSessions);
    return payload;
  });
}

async function getSession(sessionId) {
  return withWritableStore(async (filePath) => {
    const allSessions = await readJson(filePath);
    return allSessions[sessionId];
  });
}

async function listSessions() {
  return withWritableStore(async (filePath) => {
    const allSessions = await readJson(filePath);
    return Object.keys(allSessions).map((id) => ({ id, meta: allSessions[id].meta }));
  });
}

module.exports = { saveSession, getSession, listSessions };
