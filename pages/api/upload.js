import formidable from 'formidable';
import { promises as fs } from 'fs';
import path from 'path';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import { nanoid } from 'nanoid';
import { parseDocument } from '../../lib/parser';
import { saveSession } from '../../lib/sessionStore';

export const config = {
  api: {
    bodyParser: false
  }
};

const SUPPORTED_EXTENSIONS = ['.pdf', '.doc', '.docx', '.txt'];

function parseForm(req) {
  const form = formidable({ multiples: false });
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      const upload = files.file;
      if (!upload) return reject(new Error('Missing file field.'));
      resolve(upload);
    });
  });
}

async function extractText(file) {
  const ext = path.extname(file.originalFilename || '').toLowerCase();
  if (!SUPPORTED_EXTENSIONS.includes(ext)) {
    throw new Error('Unsupported file type. Please upload PDF, DOC, DOCX, or TXT.');
  }
  const buffer = await fs.readFile(file.filepath);
  if (ext === '.pdf') {
    const data = await pdfParse(buffer);
    return data.text;
  }
  if (ext === '.docx' || ext === '.doc') {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }
  return buffer.toString('utf8');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const upload = await parseForm(req);
    const text = await extractText(upload);
    const parsed = parseDocument(text);
    const sessionId = nanoid(10);
    const sessionPayload = {
      meta: {
        ...parsed.meta,
        sessionId,
        createdAt: new Date().toISOString(),
        originalFilename: upload.originalFilename
      },
      parts: parsed.parts
    };
    await saveSession(sessionId, sessionPayload);
    const baseUrl = req.headers.origin || process.env.NEXT_PUBLIC_BASE_URL || '';
    res.status(200).json({
      sessionId,
      shareUrl: `${baseUrl}/form/${sessionId}`,
      session: sessionPayload
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message || 'Failed to process document.' });
  }
}
