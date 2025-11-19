const { getSession } = require('../../../lib/sessionStore');

module.exports = async function handler(req, res) {
  const {
    query: { sessionId },
    method
  } = req;

  if (method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = await getSession(sessionId);
  if (!session) {
    return res.status(404).json({ error: 'Session not found' });
  }
  res.status(200).json(session);
};
