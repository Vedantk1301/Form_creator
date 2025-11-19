import { useMemo, useState } from 'react';

const ADMIN_CODE = process.env.NEXT_PUBLIC_ADMIN_CODE || 'hydrate-admin';

export default function Admin() {
  const [authCode, setAuthCode] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [session, setSession] = useState(null);
  const [fileName, setFileName] = useState('');

  const isUnlocked = useMemo(() => authCode.trim() === ADMIN_CODE, [authCode]);

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
        throw new Error(payload.error || 'Failed to upload');
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
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="bg-white rounded-3xl shadow-card p-8 space-y-4">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Admin only</p>
          <h1 className="text-3xl font-semibold text-slate-900">Upload a Pocari questionnaire brief</h1>
          <p className="text-slate-600">
            We deterministically parse the file, enrich every question with type metadata, and publish a
            shareable /form/&lt;id&gt; link. GPT-5 nano is used only when the formatting deviates from the
            expected pattern.
          </p>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            {[
              { label: 'Allowed formats', value: 'PDF, DOCX, DOC, TXT' },
              { label: 'Parser status', value: session ? 'Ready for fillers' : 'Awaiting upload' },
              { label: 'Sheet sync', value: 'Responses mirror to Google Sheets' }
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-slate-100 p-4 bg-slate-50">
                <p className="text-slate-500">{item.label}</p>
                <p className="font-semibold text-slate-900">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-card p-8 space-y-6">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-slate-700">Admin passcode</p>
            <input
              type="password"
              placeholder="Enter the shared admin code"
              value={authCode}
              onChange={(e) => setAuthCode(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-200"
            />
            {!isUnlocked && (
              <p className="text-xs text-slate-500">This workspace stays hidden until the correct code is provided.</p>
            )}
          </div>

          <div className={`rounded-2xl border-2 border-dashed px-6 py-10 text-center ${isUnlocked ? 'border-brand-200 bg-brand-50/40' : 'border-slate-200 bg-slate-100/60'}`}>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              className="hidden"
              id="upload-input"
              disabled={!isUnlocked || uploading}
              onChange={handleUpload}
            />
            <label
              htmlFor="upload-input"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold ${
                isUnlocked
                  ? 'bg-brand-600 text-white hover:bg-brand-500 cursor-pointer'
                  : 'bg-slate-300 text-slate-600 cursor-not-allowed'
              }`}
            >
              {uploading ? 'Parsing brief…' : 'Choose document'}
            </label>
            <p className="mt-3 text-sm text-slate-500">
              {uploading ? 'Extracting sections and questions' : fileName || 'Drop a file or tap the button to browse.'}
            </p>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>

        {session && (
          <div className="bg-white rounded-3xl shadow-card p-8 space-y-4">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Shareable link ready</p>
            <h2 className="text-2xl font-semibold text-slate-900">{session.session?.meta?.title}</h2>
            <div className="flex flex-wrap gap-4 items-center">
              <code className="px-4 py-2 rounded-full bg-slate-100 text-sm text-slate-600">
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
