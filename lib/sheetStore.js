import { readJson, writeJson } from './fileStore';

const SHEET_FILE = 'responses.json';

export async function appendResponse(sessionId, payload) {
  const existing = (await readJson(SHEET_FILE)) || {};
  const list = existing[sessionId] || [];
  list.push({ ...payload, submittedAt: new Date().toISOString() });
  existing[sessionId] = list;
  await writeJson(SHEET_FILE, existing);
  return list;
}

export async function listResponses(sessionId) {
  const existing = (await readJson(SHEET_FILE)) || {};
  return existing[sessionId] || [];
}
