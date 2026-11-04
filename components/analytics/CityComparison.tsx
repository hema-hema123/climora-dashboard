'use client';

import { ArrowLeftRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useHeatIslandComparison } from '@/hooks/useClimateData';
import { generateCityStats, INDIAN_CITIES } from '@/lib/data';
import { useDashboardStore } from '@/lib/store';
import { formatNumber } from '@/lib/utils';

export function CityComparison() {
  const { selectedCity } = useDashboardStore();
  const [compareCityId, setCompareCityId] = useState('bengaluru');

  const compareCity = useMemo(() => {
    return (
      INDIAN_CITIES.find((city) => city.id === compareCityId && city.id !== selectedCity.id) ??
      INDIAN_CITIES.find((city) => city.id !== selectedCity.id) ??
      selectedCity
    );
  }, [compareCityId, selectedCity]);

  const selectedStats = useMemo(() => generateCityStats(selectedCity), [selectedCity]);
  const compareStats = useMemo(() => generateCityStats(compareCity), [compareCity]);
  const { data: selectedClimate } = useHeatIslandComparison(selectedCity);
  const { data: compareClimate } = useHeatIslandComparison(compareCity);

  const rows = [
    {
      label: 'Heat island',
      selected: `${(selectedClimate?.heatIslandIntensity ?? selectedStats.heatIslandIntensity).toFixed(1)}°C`,
      comparison: `${(compareClimate?.heatIslandIntensity ?? compareStats.heatIslandIntensity).toFixed(1)}°C`,
    },
    {
      label: 'Green cover',
      selected: `${selectedStats.greenCoverage}%`,
      comparison: `${compareStats.greenCoverage}%`,
    },
    {
      label: 'Hotspot zones',
      selected: selectedStats.hotspotCount.toString(),
      comparison: compareStats.hotspotCount.toString(),
    },
    {
      label: 'At-risk residents',
      selected: formatNumber(selectedStats.vulnerablePopulation),
      comparison: formatNumber(compareStats.vulnerablePopulation),
    },
    {
      label: 'Warming by 2050',
      selected: `+${selectedStats.projectedTempIncrease.toFixed(1)}°C`,
      comparison: `+${compareStats.projectedTempIncrease.toFixed(1)}°C`,
    },
  ];

  return (
    <Card>
      <CardHeader className="space-y-3 pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
          <ArrowLeftRight className="h-4 w-4 text-emerald-500" />
          Compare cities
        </CardTitle>
        <Select value={compareCity.id} onValueChange={setCompareCityId}>
          <SelectTrigger aria-label="Choose a city to compare" className="h-9 w-full">
            <SelectValue placeholder="Choose a city" />
          </SelectTrigger>
          <SelectContent>
            {INDIAN_CITIES.filter((city) => city.id !== selectedCity.id).map((city) => (
              <SelectItem key={city.id} value={city.id}>
                {city.name}, {city.province}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)_minmax(0,0.8fr)] gap-2 border-b border-gray-200 pb-2 text-[10px] font-medium dark:border-gray-800 sm:text-xs">
          <span className="text-gray-500 dark:text-gray-400">Metric</span>
          <span className="truncate text-gray-900 dark:text-white">{selectedCity.name}</span>
          <span className="truncate text-gray-900 dark:text-white">{compareCity.name}</span>
        </div>
        <div className="space-y-3">
          {rows.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)_minmax(0,0.8fr)] gap-2 text-[11px] sm:text-xs"
            >
              <span className="text-gray-500 dark:text-gray-400">{row.label}</span>
              <span className="font-semibold tabular-nums text-gray-900 dark:text-gray-100">
                {row.selected}
              </span>
              <span className="font-semibold tabular-nums text-gray-900 dark:text-gray-100">
                {row.comparison}
              </span>
            </div>
          ))}
        </div>
        <p className="border-t border-gray-200 pt-2 text-[10px] text-gray-400 dark:border-gray-800 sm:text-xs">
          Heat island uses NASA POWER when available; other figures are modelled estimates.
        </p>
      </CardContent>
    </Card>
  );
}
