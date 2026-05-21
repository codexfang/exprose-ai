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
import type { PlotPoint } from '../lib/math'

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
)

type PlotData = { points: PlotPoint[]; label: string }

type GraphCardProps = {
  plot: PlotData | null
}

export function GraphCard({ plot }: GraphCardProps) {
  const chartData = plot
    ? {
        datasets: [
          {
            label: plot.label,
            data: plot.points.map((p) => ({ x: p.x, y: p.y })),
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.08)',
            borderWidth: 2,
            pointRadius: 0,
            tension: 0.2,
            fill: true,
          },
        ],
      }
    : null

  return (
    <section className="card flex min-h-[360px] flex-1 flex-col">
      <h2 className="text-lg font-semibold text-slate-900">Graph</h2>

      {chartData ? (
        <div className="mt-4 min-h-[280px] flex-1 rounded-xl border border-gray-100 bg-white p-3 sm:min-h-[320px]">
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              animation: { duration: 200 },
              plugins: {
                legend: {
                  display: true,
                  position: 'top',
                  labels: { color: '#64748b', font: { size: 12 } },
                },
              },
              scales: {
                x: {
                  type: 'linear',
                  title: {
                    display: true,
                    text: 'x',
                    color: '#64748b',
                  },
                  grid: { color: '#f1f5f9' },
                  ticks: { color: '#64748b' },
                  min: -10,
                  max: 10,
                },
                y: {
                  type: 'linear',
                  title: {
                    display: true,
                    text: 'y',
                    color: '#64748b',
                  },
                  grid: { color: '#f1f5f9' },
                  ticks: { color: '#64748b' },
                },
              },
            }}
          />
        </div>
      ) : (
        <div className="mt-4 flex min-h-[280px] flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-slate-50/80 px-6 py-12 text-center sm:min-h-[320px]">
          <p className="text-sm font-medium text-slate-500">
            Enter an equation to generate graph
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Graph will appear here after you plot
          </p>
        </div>
      )}
    </section>
  )
}
