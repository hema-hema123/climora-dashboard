'use client';

import { BarChart3, Map as MapIcon, Sparkles, TreeDeciduous } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { ActionSimulator } from '@/components/analytics/ActionSimulator';
import { CityComparison } from '@/components/analytics/CityComparison';
import { HeatZoneList } from '@/components/analytics/HeatZoneList';
import { ImpactProjections } from '@/components/analytics/ImpactProjections';
import { StatsCards } from '@/components/analytics/StatsCards';
import { TemperatureChart } from '@/components/analytics/TemperatureChart';
import { TimeSlider } from '@/components/controls/TimeSlider';
import { ExportPanel } from '@/components/export/ExportPanel';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { RecommendationsPanel } from '@/components/recommendations/RecommendationsPanel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { type DashboardTab, useDashboardStore } from '@/lib/store';
import { cn } from '@/lib/utils';

// Dynamic import for HeatMap (uses Leaflet which requires client-side rendering)
const HeatMap = dynamic(() => import('@/components/map/HeatMap').then((mod) => mod.HeatMap), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="text-center">
        <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent mx-auto" />
        <p className="text-gray-600 dark:text-gray-400">Loading map...</p>
      </div>
    </div>
  ),
});

export default function DashboardPage() {
  const { dashboardTab, setDashboardTab, desktopSidebarOpen, implementedRecommendations } =
    useDashboardStore();
  const [rightPanelTab, setRightPanelTab] = useState<'actions' | 'charts'>('actions');

  return (
    <DashboardShell>
      <div className="flex h-full flex-col overflow-hidden">
        {/* Mobile Tabs */}
        <div className="flex flex-col flex-1 overflow-hidden lg:hidden">
          <Tabs
            value={dashboardTab}
            onValueChange={(value) => setDashboardTab(value as DashboardTab)}
            className="flex-1 flex flex-col overflow-hidden"
          >
            <div className="border-b border-gray-200 bg-white px-4 py-2 dark:border-gray-800 dark:bg-gray-950">
              <TabsList className="w-full">
                <TabsTrigger value="map" className="flex-1 gap-2">
                  <MapIcon className="h-4 w-4" />
                  Map
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex-1 gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Analytics
                </TabsTrigger>
                <TabsTrigger value="actions" className="flex-1 gap-2">
                  <TreeDeciduous className="h-4 w-4 text-emerald-400" />
                  Action Plans ({implementedRecommendations.length})
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent
              value="map"
              className="flex-1 m-0 data-[state=active]:flex data-[state=active]:flex-col"
            >
              <div id="climora-map-container-mobile" className="flex-1">
                <HeatMap />
              </div>
              <div className="p-4 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
                <TimeSlider />
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="flex-1 overflow-auto p-4 space-y-4 m-0">
              <StatsCards />
              <CityComparison />
              <TemperatureChart />
              <HeatZoneList />
              <ImpactProjections />
            </TabsContent>

            <TabsContent value="actions" className="flex-1 overflow-auto p-4 space-y-4 m-0">
              <ActionSimulator />
              <RecommendationsPanel />
              <ExportPanel />
            </TabsContent>
          </Tabs>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex lg:flex-1 lg:overflow-hidden">
          {/* Main Content Area */}
          <div className="flex flex-1 flex-col overflow-hidden">
            {/* Stats Row */}
            <div className="shrink-0 border-b border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
              <StatsCards />
            </div>

            {/* Map and Charts Row */}
            <div className="flex flex-1 overflow-hidden">
              {/* Map Section */}
              <div
                className={cn(
                  'flex flex-1 flex-col overflow-hidden transition-all duration-300',
                  !desktopSidebarOpen && 'bg-gray-100 p-3 dark:bg-gray-800',
                )}
              >
                <div id="climora-map-container" className="min-h-0 min-w-0 flex-1">
                  <HeatMap />
                </div>
                <div className="shrink-0 border-t border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
                  <TimeSlider />
                </div>
              </div>

              {/* Right Panel - Action Plans & Analytics Toggle */}
              <div className="w-[340px] xl:w-[420px] shrink-0 flex flex-col overflow-hidden border-l border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
                {/* Action vs Analytics Tab Switcher */}
                <div className="p-3 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shrink-0">
                  <div className="flex items-center gap-1.5 p-1 bg-gray-100 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
                    <button
                      type="button"
                      onClick={() => setRightPanelTab('actions')}
                      className={cn(
                        'flex-1 py-1.5 px-2 rounded-md text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer',
                        rightPanelTab === 'actions'
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white',
                      )}
                    >
                      <TreeDeciduous className="h-3.5 w-3.5" />
                      ⚡ Action Plans ({implementedRecommendations.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setRightPanelTab('charts')}
                      className={cn(
                        'flex-1 py-1.5 px-2 rounded-md text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer',
                        rightPanelTab === 'charts'
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white',
                      )}
                    >
                      <BarChart3 className="h-3.5 w-3.5" />
                      📊 Trends & Charts
                    </button>
                  </div>
                </div>

                {/* Tab Content Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {rightPanelTab === 'actions' ? (
                    <>
                      <ActionSimulator />
                      <RecommendationsPanel />
                      <ExportPanel />
                    </>
                  ) : (
                    <>
                      <TemperatureChart />
                      <CityComparison />
                      <HeatZoneList />
                      <ImpactProjections />
                      <ExportPanel />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations Panel - Visible on ultra-wide screens */}
          <div className="hidden 2xl:block w-[300px] xl:w-[340px] shrink-0 overflow-y-auto border-l border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
            <RecommendationsPanel />
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
