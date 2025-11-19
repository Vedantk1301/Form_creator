import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import QuestionSection from '@/components/QuestionSection';

export default function SessionForm() {
  const router = useRouter();
  const { sessionId } = router.query;
  const [session, setSession] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (!sessionId) return;
    const fetchSession = async () => {
      try {
        const response = await fetch(`/api/session/${sessionId}`);
        if (!response.ok) {
          throw new Error('Session not found');
        }
        const payload = await response.json();
        setSession(payload);
        const savedAnswers = window.localStorage.getItem(`form-${sessionId}`);
        if (savedAnswers) {
          setAnswers(JSON.parse(savedAnswers));
        }
      } catch (error) {
        setToast(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSession();
  }, [sessionId]);

  useEffect(() => {
    if (!sessionId) return;
    window.localStorage.setItem(`form-${sessionId}`, JSON.stringify(answers));
  }, [answers, sessionId]);

  const totalQuestions = useMemo(() => {
    if (!session) return 0;
    return session.parts.reduce((count, part) => count + part.questions.length, 0);
  }, [session]);

  const answeredCount = useMemo(() => {
    return Object.values(answers).filter((value) =>
      Array.isArray(value) ? value.length > 0 : Boolean(value?.trim?.() || value?.length)
    ).length;
  }, [answers]);

  const handleChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async () => {
    if (!sessionId) return;
    setSyncing(true);
    setToast('Syncing responses to the sheet…');
    try {
      const response = await fetch(`/api/session/${sessionId}/responses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ answers })
      });
      if (!response.ok) {
        throw new Error('Unable to sync responses');
      }
      setToast('Responses saved to the sheet. You can update anytime.');
    } catch (error) {
      setToast(error.message);
    } finally {
      setSyncing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-600">
        Preparing your questionnaire…
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Unable to locate this form link.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[280px,1fr] gap-8">
        <aside className="space-y-6">
          <div className="bg-white rounded-3xl shadow-card p-6 space-y-3">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Session</p>
            <h1 className="text-2xl font-semibold text-slate-900">{session.meta.title}</h1>
            <p className="text-sm text-slate-500">{session.meta.docDate || 'Undated brief'}</p>
            <div className="pt-2">
              <p className="text-xs text-slate-500">Progress</p>
              <p className="text-lg font-semibold text-slate-900">
                {answeredCount}/{totalQuestions} answered
              </p>
              <div className="mt-2 h-2 rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-brand-500 transition-all"
                  style={{ width: `${totalQuestions ? Math.round((answeredCount / totalQuestions) * 100) : 0}%` }}
                />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-3xl shadow-card p-6 space-y-4">
            <p className="text-sm font-semibold text-slate-800">Parts overview</p>
            <ul className="space-y-3">
              {session.parts.map((part) => (
                <li key={part.id} className="flex items-start gap-3">
                  <span className="text-sm text-slate-400 mt-1">{part.label}</span>
                  <div>
                    <p className="font-medium text-slate-800">{part.name}</p>
                    <p className="text-xs text-slate-500">{part.questions.length} prompts</p>
                  </div>
                </li>
              ))}
            </ul>
            <button
              onClick={handleSubmit}
              disabled={syncing}
              className="w-full px-4 py-3 rounded-2xl bg-brand-600 text-white font-semibold hover:bg-brand-500 disabled:opacity-60"
            >
              {syncing ? 'Syncing…' : 'Save to Google Sheet'}
            </button>
            {toast && <p className="text-xs text-slate-500">{toast}</p>}
          </div>
        </aside>
        <main className="space-y-10">
          {session.parts.map((part) => (
            <QuestionSection key={part.id} part={part} answers={answers} onChange={handleChange} />
          ))}
        </main>
      </div>
    </div>
  );
}
