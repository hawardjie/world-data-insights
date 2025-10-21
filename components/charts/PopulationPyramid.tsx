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
  Cell,
} from 'recharts';

interface PyramidDataPoint {
  age_group: string;
  male: number;
  female: number;
}

interface PopulationPyramidProps {
  data: PyramidDataPoint[];
  title: string;
  country: string;
  year: number;
  height?: number;
  description?: string;
  source?: string;
}

export default function PopulationPyramid({
  data,
  title,
  country,
  year,
  height = 500,
  description,
  source,
}: PopulationPyramidProps) {
  // Prepare data for pyramid (male values negative for left side)
  const pyramidData = data.map((item) => ({
    age_group: item.age_group,
    male: -Math.abs(item.male), // Negative for left side
    female: Math.abs(item.female), // Positive for right side
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-300 dark:border-gray-600 rounded shadow-lg">
          <p className="text-sm font-semibold">{label}</p>
          <p className="text-sm" style={{ color: '#3b82f6' }}>
            Male: {Math.abs(payload[0]?.value || 0).toFixed(1)}%
          </p>
          <p className="text-sm" style={{ color: '#ec4899' }}>
            Female: {Math.abs(payload[1]?.value || 0).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom tick formatter for X-axis to show absolute values
  const formatXAxis = (value: number) => {
    return `${Math.abs(value).toFixed(0)}%`;
  };

  return (
    <div className="w-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {country} - {year}
        </p>
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {description}
          </p>
        )}
      </div>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={pyramidData}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis
            type="number"
            tickFormatter={formatXAxis}
            tick={{ fontSize: 12 }}
            domain={[-12, 12]} // Adjust based on your data range
          />
          <YAxis
            type="category"
            dataKey="age_group"
            tick={{ fontSize: 11 }}
            width={60}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="male" fill="#3b82f6" name="Male" stackId="stack" />
          <Bar dataKey="female" fill="#ec4899" name="Female" stackId="stack" />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400">
        <span className="mr-4">← Male</span>
        <span>Female →</span>
      </div>
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
