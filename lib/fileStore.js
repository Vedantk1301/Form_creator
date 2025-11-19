import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

async function ensureDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

export async function readJson(file) {
  await ensureDir();
  const filePath = path.join(DATA_DIR, file);
  try {
    const content = await fs.readFile(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return null;
    }
    throw error;
  }
}

export async function writeJson(file, data) {
  await ensureDir();
  const filePath = path.join(DATA_DIR, file);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
}
