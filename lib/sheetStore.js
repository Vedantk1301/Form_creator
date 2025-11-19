const path = require('path');
const { readJson, writeJson } = require('./fileStore');

const RESPONSES_FILE = path.join(process.cwd(), 'data', 'responses.json');

async function appendResponse(sessionId, response) {
  const allResponses = await readJson(RESPONSES_FILE);
  if (!allResponses[sessionId]) {
    allResponses[sessionId] = [];
  }
  allResponses[sessionId].push(response);
  await writeJson(RESPONSES_FILE, allResponses);
  return response;
}

async function listResponses(sessionId) {
  const allResponses = await readJson(RESPONSES_FILE);
  return allResponses[sessionId] || [];
}

module.exports = { appendResponse, listResponses };
