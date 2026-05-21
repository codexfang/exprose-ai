import { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { generatePlotPoints, type PlotPoint } from '../lib/math'

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
)

const EXAMPLES = ['y = x^2', 'y = sin(x)', 'y = 2x + 5'] as const

type PlotData = { points: PlotPoint[]; label: string }

export function Graph() {
  const [equation, setEquation] = useState('y = x^2')
  const [plot, setPlot] = useState<PlotData | null>(null)
  const [error, setError] = useState<string | null>(null)

  function handlePlot() {
    try {
      const points = generatePlotPoints(equation)
      setPlot({ points, label: equation.trim() || 'f(x)' })
      setError(null)
    } catch (err) {
      setPlot(null)
      setError(err instanceof Error ? err.message : 'Could not plot equation.')
    }
  }

  useEffect(() => {
    handlePlot()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const chartData = plot
    ? {
        datasets: [
          {
            label: plot.label,
            data: plot.points.map((p) => ({ x: p.x, y: p.y })),
            borderColor: 'rgb(79, 70, 229)',
            backgroundColor: 'rgba(79, 70, 229, 0.08)',
            borderWidth: 2,
            pointRadius: 0,
            tension: 0.2,
            fill: true,
          },
        ],
      }
    : null

  return (
    <div className="space-y-6">
      <label className="block">
        <span className="mb-3 block text-base font-medium text-slate-600">
          Equation
        </span>
        <input
          type="text"
          value={equation}
          onChange={(e) => setEquation(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handlePlot()}
          placeholder="y = x^2"
          className="w-full rounded-xl border border-slate-200 bg-white px-5 py-4 text-lg text-slate-900 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
        />
      </label>

      <div className="flex flex-wrap gap-3">
        {EXAMPLES.map((example) => (
          <button
            key={example}
            type="button"
            onClick={() => setEquation(example)}
            className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-base text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
          >
            {example}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={handlePlot}
        className="w-full rounded-xl bg-indigo-600 px-5 py-4 text-lg font-medium text-white shadow-sm transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2"
      >
        Plot
      </button>

      {error && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-base text-red-700">
          {error}
        </p>
      )}

      {chartData && !error && (
        <div className="h-96 w-full rounded-xl border border-slate-100 bg-white p-4 sm:h-[28rem]">
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: true, position: 'top' },
              },
              scales: {
                x: {
                  type: 'linear',
                  title: { display: true, text: 'x' },
                  min: -10,
                  max: 10,
                },
                y: {
                  type: 'linear',
                  title: { display: true, text: 'y' },
                },
              },
            }}
          />
        </div>
      )}

      <p className="text-center text-sm text-slate-400">
        x range: −10 to 10 · supports ^, sin, cos, tan, and linear terms
      </p>
    </div>
  )
}
