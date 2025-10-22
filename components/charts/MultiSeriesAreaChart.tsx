'use client';

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { MultiSeriesDataPoint, SeriesConfig } from '@/types/fred';
import { formatDate, formatNumber } from '@/utils/dataTransform';

interface MultiSeriesAreaChartProps {
  data: MultiSeriesDataPoint[];
  title: string;
  series: SeriesConfig[];
  height?: number;
  xAxisLabel?: string;
  yAxisLabel?: string;
  description?: string;
  source?: string;
  stacked?: boolean;
}

export default function MultiSeriesAreaChart({
  data,
  title,
  series,
  height = 400,
  xAxisLabel,
  yAxisLabel,
  description,
  source,
  stacked = false,
}: MultiSeriesAreaChartProps) {
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
        <AreaChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: xAxisLabel ? 25 : 5 }}
        >
          <defs>
            {series.map((s) => (
              <linearGradient key={`gradient-${s.id}`} id={`gradient-${s.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={s.color} stopOpacity={0.8} />
                <stop offset="95%" stopColor={s.color} stopOpacity={0.1} />
              </linearGradient>
            ))}
          </defs>
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
            <Area
              key={s.id}
              type="monotone"
              dataKey={s.name}
              stroke={s.color}
              strokeWidth={2}
              fillOpacity={1}
              fill={`url(#gradient-${s.id})`}
              name={s.name}
              stackId={stacked ? 'stack' : undefined}
            />
          ))}
        </AreaChart>
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
