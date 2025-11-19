import { readJson, writeJson } from './fileStore';

const SESSION_FILE = 'sessions.json';

export async function saveSession(id, data) {
  const existing = (await readJson(SESSION_FILE)) || {};
  existing[id] = data;
  await writeJson(SESSION_FILE, existing);
}

export async function getSession(id) {
  const existing = (await readJson(SESSION_FILE)) || {};
  return existing[id] || null;
}
