'use client';

import React from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { ChartDataPoint } from '@/types/fred';
import { formatDate, formatNumber } from '@/utils/dataTransform';

interface BarChartProps {
  data: ChartDataPoint[];
  title: string;
  color?: string;
  unit?: string;
  height?: number;
  source?: string;
  description?: string;
}

export default function BarChart({
  data,
  title,
  color = '#10b981',
  unit = '',
  height = 400,
  source,
  description,
}: BarChartProps) {
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
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {description}
        </p>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis
            dataKey="date"
            tickFormatter={(date) => formatDate(date, 'MMM yy')}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            tickFormatter={(value) => formatNumber(value)}
            tick={{ fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="value" fill={color} name={title} />
        </RechartsBarChart>
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
