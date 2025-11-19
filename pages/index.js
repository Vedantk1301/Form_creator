import { useState } from 'react';

export default function Home() {
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');
  const [session, setSession] = useState(null);

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setError('');
    setUploading(true);
    setFileName(file.name);

    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const payload = await response.json();
        throw new Error(payload.error || 'Failed to upload file');
      }

      const payload = await response.json();
      setSession(payload);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="bg-white rounded-3xl shadow-card p-10 space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Glassbox form creator</p>
          <h1 className="text-4xl font-semibold text-slate-900">Upload a brief and mint a form</h1>
          <p className="text-base text-slate-600">
            Drag in a PDF, DOCX, DOC, or TXT file and we will publish a Glassbox form instantly. No passcodes or
            detours—just upload and grab the link.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-card p-8 space-y-6">
          <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center">
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              className="hidden"
              id="upload-input"
              disabled={uploading}
              onChange={handleUpload}
            />
            <label
              htmlFor="upload-input"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition ${
                uploading ? 'bg-slate-300 text-slate-600 cursor-not-allowed' : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              {uploading ? 'Uploading…' : 'Choose file'}
            </label>
            <p className="mt-3 text-sm text-slate-500">
              {uploading ? 'Parsing sections and questions' : fileName || 'Supports PDF, DOCX, DOC, and TXT'}
            </p>
          </div>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
        </div>

        {session && (
          <div className="bg-white rounded-3xl shadow-card p-8 space-y-4">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Ready to share</p>
              <h2 className="text-2xl font-semibold text-slate-900">{session.session?.meta?.title}</h2>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <code className="flex-1 px-4 py-2 rounded-2xl bg-slate-100 text-sm text-slate-700 overflow-x-auto">
                {session.shareUrl}
              </code>
              <button
                className="px-4 py-2 rounded-full bg-slate-900 text-white text-sm"
                onClick={() => navigator.clipboard?.writeText(session.shareUrl)}
              >
                Copy link
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {session.session.parts.map((part) => (
                <div key={part.id} className="rounded-2xl border border-slate-100 p-4">
                  <p className="text-xs text-slate-500">{part.label}</p>
                  <p className="font-semibold text-slate-900">{part.name}</p>
                  <p className="text-sm text-slate-500 mt-2">{part.questions.length} questions</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
