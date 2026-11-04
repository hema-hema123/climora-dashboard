'use client';

import { Loader2 } from 'lucide-react';
import { useMemo } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useHeatIslandComparison } from '@/hooks/useClimateData';
import { generateTemperatureHistory } from '@/lib/data';
import { useDashboardStore } from '@/lib/store';

export function TemperatureChart() {
  const { selectedCity } = useDashboardStore();
  const { data: heatIslandData, isLoading, error } = useHeatIslandComparison(selectedCity);
  const estimatedHistory = useMemo(() => generateTemperatureHistory(selectedCity), [selectedCity]);

  const hasLiveData = Boolean(heatIslandData?.comparison.length);
  const chartData = hasLiveData
    ? heatIslandData?.comparison.map((record) => ({
        date: record.date,
        urban: Math.round(record.urban * 10) / 10,
        rural: Math.round(record.rural * 10) / 10,
      })) || []
    : estimatedHistory.map((record) => ({
        date: record.date,
        urban: record.urban,
        rural: record.rural,
      }));

  const formatDate = (dateStr: string) => {
    // NASA date format: YYYYMMDD
    if (dateStr.length === 8) {
      const month = parseInt(dateStr.slice(4, 6), 10);
      const day = parseInt(dateStr.slice(6, 8), 10);
      return `${month}/${day}`;
    }
    return dateStr;
  };

  if (isLoading) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm sm:text-base font-semibold">
            Temperature Trends (NASA POWER Data)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-[200px] sm:h-[240px] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
            <span className="ml-2 text-sm text-gray-500">Loading NASA data...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm sm:text-base font-semibold">
            {selectedCity.name} Temperature Trends
          </CardTitle>
          <span className="text-[10px] sm:text-xs text-gray-400">
            {hasLiveData
              ? 'NASA POWER · 30 days'
              : error
                ? 'Estimated city profile'
                : '12-month estimate'}
          </span>
        </div>
      </CardHeader>
      <CardContent className="px-3 sm:px-6">
        <div className="h-[200px] sm:h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="urbanGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="ruralGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="date"
                tickFormatter={formatDate}
                tick={{ fontSize: 10 }}
                stroke="#9ca3af"
                interval="preserveStartEnd"
              />
              <YAxis
                tick={{ fontSize: 11 }}
                stroke="#9ca3af"
                tickFormatter={(value) => `${value}°`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
                formatter={(value, name) => [
                  `${Number(value).toFixed(1)}°C`,
                  name === 'urban' ? 'Urban Center' : 'Rural Reference',
                ]}
                labelFormatter={(label) => `Date: ${formatDate(label as string)}`}
              />
              <Legend
                verticalAlign="top"
                height={36}
                formatter={(value) => (
                  <span className="text-xs capitalize">
                    {value === 'urban' ? 'Urban Center' : 'Rural Reference'}
                  </span>
                )}
              />
              <Area
                type="monotone"
                dataKey="urban"
                stroke="#ef4444"
                strokeWidth={2}
                fill="url(#urbanGradient)"
                name="urban"
              />
              <Area
                type="monotone"
                dataKey="rural"
                stroke="#22c55e"
                strokeWidth={2}
                fill="url(#ruralGradient)"
                name="rural"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
