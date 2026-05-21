type ResultCardProps = {
  result: string | null
}

export function ResultCard({ result }: ResultCardProps) {
  const hasResult = result !== null

  return (
    <section className="card min-h-[200px]">
      <h2 className="text-lg font-semibold text-slate-900">Answer</h2>

      {hasResult ? (
        <p className="mt-4 break-all text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
          {result}
        </p>
      ) : (
        <div className="mt-6 flex min-h-[120px] flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-slate-50/80 px-6 py-10 text-center">
          <p className="text-sm font-medium text-slate-500">
            Enter a math expression to begin
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Press Solve or hit Enter in the expression field
          </p>
        </div>
      )}
    </section>
  )
}
