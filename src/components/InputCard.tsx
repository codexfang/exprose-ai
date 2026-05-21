const EXAMPLES = ['y = x^2', 'y = sin(x)', 'y = 2x + 5'] as const

type InputCardProps = {
  expression: string
  equation: string
  calcError: string | null
  graphError: string | null
  onExpressionChange: (value: string) => void
  onEquationChange: (value: string) => void
  onSolve: () => void
  onPlot: () => void
  onClear: () => void
}

export function InputCard({
  expression,
  equation,
  calcError,
  graphError,
  onExpressionChange,
  onEquationChange,
  onSolve,
  onPlot,
  onClear,
}: InputCardProps) {
  return (
    <section className="card flex h-full flex-col">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">Input</h2>
        <p className="mt-1 text-sm text-slate-500">
          Enter expressions and equations to solve or plot.
        </p>
      </div>

      <div className="flex flex-1 flex-col gap-6">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">
            Math expression
          </span>
          <input
            type="text"
            value={expression}
            onChange={(e) => onExpressionChange(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSolve()}
            placeholder="e.g. (3 + 5) * 2"
            className="input-field"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">
            Graph equation
          </span>
          <input
            type="text"
            value={equation}
            onChange={(e) => onEquationChange(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onPlot()}
            placeholder="y = x^2"
            className="input-field"
          />
        </label>

        <div>
          <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-400">
            Examples
          </span>
          <div className="flex flex-wrap gap-2">
            {EXAMPLES.map((example) => (
              <button
                key={example}
                type="button"
                onClick={() => onEquationChange(example)}
                className="chip"
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        {(calcError || graphError) && (
          <div className="space-y-2">
            {calcError && (
              <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {calcError}
              </p>
            )}
            {graphError && (
              <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {graphError}
              </p>
            )}
          </div>
        )}

        <div className="mt-auto flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={onSolve} className="btn-primary flex-1">
            Solve
          </button>
          <button type="button" onClick={onPlot} className="btn-primary flex-1">
            Plot Graph
          </button>
          <button
            type="button"
            onClick={onClear}
            className="btn-secondary flex-1 sm:flex-none"
          >
            Clear
          </button>
        </div>

        <p className="text-center text-xs text-slate-400">
          Calculator: + − × ÷ ( ) · Graph: x from −10 to 10
        </p>
      </div>
    </section>
  )
}
