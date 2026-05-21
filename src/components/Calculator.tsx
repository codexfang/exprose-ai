import { useState } from 'react'
import { evaluateExpression } from '../lib/math'

export function Calculator() {
  const [expression, setExpression] = useState('')
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  function handleCalculate() {
    try {
      const value = evaluateExpression(expression)
      setResult(String(value))
      setError(null)
    } catch (err) {
      setResult(null)
      setError(err instanceof Error ? err.message : 'Calculation failed.')
    }
  }

  return (
    <div className="space-y-6">
      <label className="block">
        <span className="mb-3 block text-base font-medium text-slate-600">
          Math expression
        </span>
        <input
          type="text"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
          placeholder="e.g. (3 + 5) * 2"
          className="w-full rounded-xl border border-slate-200 bg-white px-5 py-4 text-lg text-slate-900 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
        />
      </label>

      <button
        type="button"
        onClick={handleCalculate}
        className="w-full rounded-xl bg-indigo-600 px-5 py-4 text-lg font-medium text-white shadow-sm transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2"
      >
        Calculate
      </button>

      {error && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-base text-red-700">
          {error}
        </p>
      )}

      {result !== null && !error && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-6 py-5">
          <p className="text-base font-medium text-emerald-800">Result</p>
          <p className="mt-2 text-4xl font-semibold text-emerald-900">{result}</p>
        </div>
      )}

      <p className="text-center text-sm text-slate-400">
        Supports + − × ÷ and parentheses ( )
      </p>
    </div>
  )
}
