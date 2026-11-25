'use client';

import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Building2,
  Calendar,
  CloudSun,
  Download,
  Flame,
  Info,
  Layers,
  Thermometer,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import { CityComparison } from '@/components/analytics/CityComparison';
import { HeatZoneList } from '@/components/analytics/HeatZoneList';
import { TemperatureChart } from '@/components/analytics/TemperatureChart';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { generateCityStats, generateHeatZones, INDIAN_CITIES } from '@/lib/data';
import { useDashboardStore } from '@/lib/store';

export default function AnalyticsPage() {
  const { selectedCity, selectedDate, userRole } = useDashboardStore();
  const [selectedTimeframe, setSelectedTimeframe] = useState<'30days' | 'seasonal' | 'annual'>('30days');

  const stats = generateCityStats(selectedCity);
  const heatZones = generateHeatZones(selectedCity, selectedDate);

  const isGovernment = userRole === 'government';

  return (
    <DashboardShell>
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6 bg-gray-900/95 text-gray-100">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/30">
                NASA POWER Telemetry · Real-Time Satellite Analysis
              </span>
              {isGovernment && (
                <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-xs font-semibold text-amber-400 border border-amber-500/30">
                  Municipal Planning Mode
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-alliance">
              Climate Analytics & Trends
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Longitudinal temperature monitoring, heat island differentials, and ward risk metrics for{' '}
              <span className="text-emerald-400 font-semibold">{selectedCity.name}, {selectedCity.province}</span>.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex rounded-lg bg-gray-800 p-1 border border-gray-700">
              <button
                type="button"
                onClick={() => setSelectedTimeframe('30days')}
                className={`px-3 py-1 text-xs rounded-md font-medium transition-all ${
                  selectedTimeframe === '30days'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                30 Days
              </button>
              <button
                type="button"
                onClick={() => setSelectedTimeframe('seasonal')}
                className={`px-3 py-1 text-xs rounded-md font-medium transition-all ${
                  selectedTimeframe === 'seasonal'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Seasonal
              </button>
              <button
                type="button"
                onClick={() => setSelectedTimeframe('annual')}
                className={`px-3 py-1 text-xs rounded-md font-medium transition-all ${
                  selectedTimeframe === 'annual'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Annual Projections
              </button>
            </div>
          </div>
        </div>

        {/* Highlight KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gray-950/80 border-gray-800">
            <CardHeader className="pb-2">
              <CardDescription className="text-gray-400 flex items-center justify-between">
                <span>Peak Urban Temperature</span>
                <Thermometer className="h-4 w-4 text-red-400" />
              </CardDescription>
              <CardTitle className="text-2xl sm:text-3xl font-bold text-white font-alliance">
                {stats.avgUrbanTemp.toFixed(1)}°C
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-xs text-red-400 gap-1 font-medium">
                <ArrowUpRight className="h-3.5 w-3.5" />
                <span>+{(stats.avgUrbanTemp - stats.avgRuralTemp).toFixed(1)}°C vs Rural Baseline</span>
              </div>
              <p className="text-[11px] text-gray-500 mt-1">Based on NASA T2M satellite observation</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-950/80 border-gray-800">
            <CardHeader className="pb-2">
              <CardDescription className="text-gray-400 flex items-center justify-between">
                <span>Heat Island Differential</span>
                <TrendingUp className="h-4 w-4 text-orange-400" />
              </CardDescription>
              <CardTitle className="text-2xl sm:text-3xl font-bold text-orange-400 font-alliance">
                +{stats.heatIslandIntensity.toFixed(1)}°C
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-xs text-orange-300 gap-1 font-medium">
                <Flame className="h-3.5 w-3.5" />
                <span>Extreme microclimate effect</span>
              </div>
              <p className="text-[11px] text-gray-500 mt-1">Concrete albedo & asphalt trap thermal mass</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-950/80 border-gray-800">
            <CardHeader className="pb-2">
              <CardDescription className="text-gray-400 flex items-center justify-between">
                <span>Vegetation & Canopy Cover</span>
                <Layers className="h-4 w-4 text-emerald-400" />
              </CardDescription>
              <CardTitle className="text-2xl sm:text-3xl font-bold text-emerald-400 font-alliance">
                {stats.greenCoverage.toFixed(1)}%
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-xs text-emerald-400 gap-1 font-medium">
                <ArrowDownRight className="h-3.5 w-3.5" />
                <span>Need +15% canopy to reach safe threshold</span>
              </div>
              <p className="text-[11px] text-gray-500 mt-1">NDVI analysis from Sentinel-2 spectral data</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-950/80 border-gray-800">
            <CardHeader className="pb-2">
              <CardDescription className="text-gray-400 flex items-center justify-between">
                <span>High-Risk Population</span>
                <Users className="h-4 w-4 text-purple-400" />
              </CardDescription>
              <CardTitle className="text-2xl sm:text-3xl font-bold text-purple-400 font-alliance">
                {(stats.vulnerablePopulation / 100000).toFixed(2)} Lakh
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-xs text-purple-300 gap-1 font-medium">
                <AlertTriangle className="h-3.5 w-3.5" />
                <span>Senior citizens & outdoor workers</span>
              </div>
              <p className="text-[11px] text-gray-500 mt-1">Census 2021 + localized vulnerability scoring</p>
            </CardContent>
          </Card>
        </div>

        {/* Longitudinal Temperature Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-gray-950/80 border-gray-800">
              <CardHeader className="pb-2 border-b border-gray-800/80">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                      <CloudSun className="h-5 w-5 text-emerald-400" />
                      30-Day Urban vs. Rural Temperature Telemetry
                    </CardTitle>
                    <CardDescription className="text-gray-400 text-xs">
                      Daily satellite observations comparing central urban areas against outer green-buffer reference stations.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <TemperatureChart />
              </CardContent>
            </Card>

            {/* Cross-City Benchmark Table */}
            <Card className="bg-gray-950/80 border-gray-800">
              <CardHeader className="pb-2 border-b border-gray-800/80">
                <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-emerald-400" />
                  National Heat Resilience Comparative Matrix
                </CardTitle>
                <CardDescription className="text-gray-400 text-xs">
                  Benchmark {selectedCity.name} against other major metropolitan hubs across India.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <CityComparison />
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Ward Hotspots & Vulnerability Breakdown */}
          <div className="space-y-6">
            <Card className="bg-gray-950/80 border-gray-800">
              <CardHeader className="pb-2 border-b border-gray-800/80">
                <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                  <Flame className="h-5 w-5 text-red-500" />
                  Top Vulnerability Wards ({selectedCity.name})
                </CardTitle>
                <CardDescription className="text-gray-400 text-xs">
                  Prioritized by maximum recorded heat and population vulnerability index.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <HeatZoneList />
              </CardContent>
            </Card>

            {/* Special Policy Brief / Advisory Card */}
            <Card className="bg-gradient-to-br from-gray-950 to-emerald-950/40 border-emerald-900/40">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-emerald-400" />
                  {isGovernment ? 'Government Climate Advisory' : 'Public Heat Safety Brief'}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-gray-300 space-y-2.5">
                {isGovernment ? (
                  <>
                    <p>
                      <strong>Active Protocol:</strong> Stage-2 Orange Heat Alert recommended for Dwarka and Okhla Industrial Area.
                    </p>
                    <p>
                      <strong>Municipal Directive:</strong> Mobilize water misting cannons along arterial corridors; ensure night cooling shelters are operational in high-density wards.
                    </p>
                    <div className="pt-2">
                      <Button size="sm" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs">
                        Export Official Municipal Heat Advisory (PDF)
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <p>
                      <strong>Current Advisory:</strong> High heat index recorded between 11:30 AM and 3:30 PM. Stay hydrated and avoid direct outdoor exertion.
                    </p>
                    <p>
                      <strong>Cooling Centers:</strong> 14 municipal air-conditioned public libraries and transit shelters operational within 2 km of city center.
                    </p>
                    <div className="pt-2">
                      <Button size="sm" variant="outline" className="w-full border-sky-500 text-sky-400 hover:bg-sky-950/30 text-xs">
                        Find Nearest Shaded Public Space
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
