'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { MultiSeriesDataPoint, SeriesConfig } from '@/types/fred';
import { formatDate, formatNumber } from '@/utils/dataTransform';

interface MultiSeriesBarChartProps {
  data: MultiSeriesDataPoint[];
  title: string;
  series: SeriesConfig[];
  height?: number;
  xAxisLabel?: string;
  yAxisLabel?: string;
  description?: string;
  source?: string;
}

export default function MultiSeriesBarChart({
  data,
  title,
  series,
  height = 400,
  xAxisLabel,
  yAxisLabel,
  description,
  source,
}: MultiSeriesBarChartProps) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-300 dark:border-gray-600 rounded shadow-lg">
          <p className="text-sm font-semibold mb-2">{formatDate(label, 'MMM dd, yyyy')}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {formatNumber(entry.value)} {entry.unit || ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{description}</p>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: xAxisLabel ? 25 : 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis
            dataKey="date"
            tickFormatter={(date) => formatDate(date, 'MMM yy')}
            tick={{ fontSize: 12 }}
            {...(xAxisLabel && { label: { value: xAxisLabel, position: 'insideBottom', offset: -15, style: { fontSize: 12, fill: '#6B7280' } } })}
          />
          <YAxis
            tickFormatter={(value) => formatNumber(value)}
            tick={{ fontSize: 12 }}
            {...(yAxisLabel && { label: { value: yAxisLabel, angle: -90, position: 'insideLeft', style: { fontSize: 12, fill: '#6B7280' } } })}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: '10px' }} />
          {series.map((s) => (
            <Bar
              key={s.id}
              dataKey={s.name}
              fill={s.color}
              name={s.name}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
      {source && (
        <div className="text-right mt-2">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Source: {source}
          </p>
        </div>
      )}
    </div>
  );
}
