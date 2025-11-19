export default function QuestionSection({ part, answers, onChange }) {
  return (
    <section className="space-y-4">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-slate-400">{part.label}</p>
        <h3 className="text-xl font-semibold text-slate-900">{part.name}</h3>
        {part.description && <p className="text-sm text-slate-500 mt-1">{part.description}</p>}
      </div>
      <div className="space-y-6">
        {part.questions.map((question) => (
          <div key={question.id} className="p-4 bg-white rounded-2xl border border-slate-100">
            <p className="text-sm font-semibold text-slate-700">{question.prompt}</p>
            {question.type === 'dropdown' || question.type === 'multi-select' ? (
              <select
                multiple={question.type === 'multi-select'}
                value={answers[question.id] || (question.type === 'multi-select' ? [] : '')}
                onChange={(event) => {
                  if (question.type === 'multi-select') {
                    const values = Array.from(event.target.selectedOptions).map((option) => option.value);
                    onChange(question.id, values);
                  } else {
                    onChange(question.id, event.target.value);
                  }
                }}
                className="mt-3 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-100"
              >
                {question.type === 'dropdown' && <option value="">Select an option</option>}
                {question.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <textarea
                rows={3}
                value={answers[question.id] || ''}
                onChange={(event) => onChange(question.id, event.target.value)}
                className="mt-3 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-100"
                placeholder="Document your insight here"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
