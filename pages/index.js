import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen px-6 py-16 bg-gradient-to-b from-white to-slate-100">
      <div className="max-w-4xl mx-auto space-y-10 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Pocari Perspective Toolkit</p>
        <h1 className="text-4xl md:text-5xl font-semibold text-slate-900">
          Create single-question focus forms from long-form briefs in seconds.
        </h1>
        <p className="text-lg text-slate-600">
          Admins upload structured PDFs, DOCX, or TXT files. We deterministically parse the parts,
          attach form control metadata, and mint a secure share link. Form fillers land directly
          inside their questionnaire and sync every answer to the connected sheet.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/admin"
            className="px-6 py-3 rounded-full bg-brand-600 text-white font-semibold shadow-card hover:bg-brand-500 transition"
          >
            Admin upload workspace
          </Link>
          <a
            href="https://docs.google.com/spreadsheets/"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-full border border-slate-300 text-slate-700 font-semibold bg-white hover:border-brand-400"
          >
            View sample sheet
          </a>
        </div>
        <div className="grid md:grid-cols-3 gap-6 text-left">
          {[
            {
              title: 'Deterministic parser',
              body: 'Pattern-based sectioning ensures every “Part” and bullet point is captured without calling large LLMs.'
            },
            {
              title: 'GPT-5 nano fallback',
              body: 'If a document deviates from the template, a lightweight GPT-5 nano call normalizes questions before publishing.'
            },
            {
              title: 'Sheet + link ready',
              body: 'Each upload issues a shareable /form/{id} link and keeps responses synced to the paired Google Sheet.'
            }
          ].map((item) => (
            <div key={item.title} className="p-6 bg-white rounded-2xl shadow-card space-y-2">
              <p className="text-sm font-semibold text-brand-600">{item.title}</p>
              <p className="text-slate-600">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
