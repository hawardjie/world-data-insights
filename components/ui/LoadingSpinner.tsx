export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="w-full animate-pulse">
      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
      <div className="h-96 bg-gray-200 dark:bg-gray-800 rounded"></div>
    </div>
  );
}
