'use client';

import React from 'react';
import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { ChartDataPoint } from '@/types/fred';
import { formatDate, formatNumber } from '@/utils/dataTransform';

interface AreaChartProps {
  data: ChartDataPoint[];
  title: string;
  color?: string;
  unit?: string;
  height?: number;
  xAxisLabel?: string;
  yAxisLabel?: string;
  description?: string;
  source?: string;
}

export default function AreaChart({
  data,
  title,
  color = '#3b82f6',
  unit = '',
  height = 400,
  xAxisLabel,
  yAxisLabel,
  description,
  source,
}: AreaChartProps) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-300 dark:border-gray-600 rounded shadow-lg">
          <p className="text-sm font-semibold">{formatDate(label, 'MMM dd, yyyy')}</p>
          <p className="text-sm" style={{ color }}>
            Value: {formatNumber(payload[0].value)} {unit}
          </p>
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
        <RechartsAreaChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: xAxisLabel ? 25 : 5 }}
        >
          <defs>
            <linearGradient id={`color-${title}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.8} />
              <stop offset="95%" stopColor={color} stopOpacity={0.1} />
            </linearGradient>
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
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            fillOpacity={1}
            fill={`url(#color-${title})`}
          />
        </RechartsAreaChart>
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
