'use client';

import { useEffect, useState } from 'react';
import { getFredApi } from '@/lib/fredApi';

export default function TestPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const fredApi = getFredApi();
        const result = await fredApi.getSeriesObservations('DFF', {
          observationStart: '2024-01-01',
        });
        console.log('API Response:', result);
        setData(result);
        setLoading(false);
      } catch (err: any) {
        console.error('Error:', err);
        setError(err.message);
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-600">Error: {error}</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">API Test</h1>
      <div className="bg-gray-100 p-4 rounded">
        <h2 className="font-bold mb-2">Raw Data:</h2>
        <pre className="text-xs overflow-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
      {data?.observations && (
        <div className="mt-4">
          <h2 className="font-bold mb-2">Observations Count: {data.observations.length}</h2>
          <h3 className="font-bold mb-2">First 5 observations:</h3>
          <ul>
            {data.observations.slice(0, 5).map((obs: any, i: number) => (
              <li key={i}>
                {obs.date}: {obs.value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
