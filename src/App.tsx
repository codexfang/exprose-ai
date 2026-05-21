import { useState } from 'react'
import { evaluateExpression, generatePlotPoints, type PlotPoint } from './lib/math'
import { GraphCard } from './components/GraphCard'
import { Header } from './components/Header'
import { InputCard } from './components/InputCard'
import { ResultCard } from './components/ResultCard'

type PlotData = { points: PlotPoint[]; label: string }

export default function App() {
  const [expression, setExpression] = useState('')
  const [equation, setEquation] = useState('')
  const [result, setResult] = useState<string | null>(null)
  const [plot, setPlot] = useState<PlotData | null>(null)
  const [calcError, setCalcError] = useState<string | null>(null)
  const [graphError, setGraphError] = useState<string | null>(null)

  function handleSolve() {
    try {
      const value = evaluateExpression(expression)
      setResult(String(value))
      setCalcError(null)
    } catch (err) {
      setResult(null)
      setCalcError(
        err instanceof Error ? err.message : 'Calculation failed.',
      )
    }
  }

  function handlePlot() {
    try {
      const points = generatePlotPoints(equation)
      setPlot({ points, label: equation.trim() || 'f(x)' })
      setGraphError(null)
    } catch (err) {
      setPlot(null)
      setGraphError(
        err instanceof Error ? err.message : 'Could not plot equation.',
      )
    }
  }

  function handleClear() {
    setExpression('')
    setEquation('')
    setResult(null)
    setPlot(null)
    setCalcError(null)
    setGraphError(null)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <InputCard
            expression={expression}
            equation={equation}
            calcError={calcError}
            graphError={graphError}
            onExpressionChange={setExpression}
            onEquationChange={setEquation}
            onSolve={handleSolve}
            onPlot={handlePlot}
            onClear={handleClear}
          />

          <div className="flex flex-col gap-6 lg:gap-8">
            <ResultCard result={result} />
            <GraphCard plot={plot} />
          </div>
        </div>
      </main>
    </div>
  )
}
