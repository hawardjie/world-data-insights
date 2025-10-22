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
  Cell,
} from 'recharts';
import { formatNumber } from '@/utils/dataTransform';

interface CategoryDataPoint {
  category: string;
  value: number;
  label?: string;
}

interface CategoryBarChartProps {
  data: CategoryDataPoint[];
  title: string;
  color?: string;
  unit?: string;
  height?: number;
  description?: string;
  categoryLabel?: string;
  valueLabel?: string;
  colors?: string[];
  source?: string;
}

export default function CategoryBarChart({
  data,
  title,
  color = '#10b981',
  unit = '',
  height = 400,
  description,
  categoryLabel = 'Category',
  valueLabel = 'Value',
  colors,
  source,
}: CategoryBarChartProps) {
  // Default color palette if multiple colors not provided
  const defaultColors = [
    '#3b82f6', // blue
    '#10b981', // green
    '#f59e0b', // amber
    '#ef4444', // red
    '#8b5cf6', // purple
    '#ec4899', // pink
    '#06b6d4', // cyan
    '#f97316', // orange
  ];

  const barColors = colors || defaultColors;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-300 dark:border-gray-600 rounded shadow-lg">
          <p className="text-sm font-semibold">{label}</p>
          <p className="text-sm" style={{ color: payload[0].fill }}>
            {valueLabel}: {formatNumber(payload[0].value)} {unit}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {description}
          </p>
        )}
      </div>
      {data && data.length > 0 ? (
        <ResponsiveContainer width="100%" height={height}>
          <RechartsBarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 100 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis
              dataKey="category"
              angle={-45}
              textAnchor="end"
              height={80}
              interval={0}
            />
            <YAxis
              tickFormatter={(value) => formatNumber(value)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="value" name={valueLabel} fill={color}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
              ))}
            </Bar>
          </RechartsBarChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
          No data available for bar chart
        </div>
      )}
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
