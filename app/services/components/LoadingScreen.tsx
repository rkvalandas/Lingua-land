export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50/50 dark:bg-indigo-900/50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
        <p className="text-emerald-800 dark:text-yellow-200 font-handwriting text-lg">
          Loading...
        </p>
      </div>
    </div>
  );
}
