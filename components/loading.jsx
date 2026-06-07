export default function Loading() {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/30 dark:bg-black/30 backdrop-blur-md z-50">
        <div className="rounded-3xl border border-white/10 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl p-8">
          <div className="h-12 w-12 mx-auto animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
          <p className="mt-4 text-center font-medium">
            Cargando...
          </p>
        </div>
      </div>
    );
  }