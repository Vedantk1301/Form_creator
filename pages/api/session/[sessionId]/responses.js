const { appendResponse, listResponses } = require('../../../../lib/sheetStore');

module.exports = async function handler(req, res) {
  const {
    query: { sessionId },
    method,
    body
  } = req;

  if (method === 'GET') {
    const responses = await listResponses(sessionId);
    return res.status(200).json({ responses });
  }

  if (method === 'POST') {
    const submission = {
      submittedAt: new Date().toISOString(),
      answers: body.answers || {}
    };
    await appendResponse(sessionId, submission);
    return res.status(201).json({ status: 'stored', submission });
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).json({ error: 'Method not allowed' });
};
