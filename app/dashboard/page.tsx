'use client';

import {
  AlertTriangle,
  BarChart3,
  Building2,
  Footprints,
  Layers,
  Lock,
  LogOut,
  Map as MapIcon,
  Shield,
  ShieldCheck,
  Sparkles,
  TreeDeciduous,
  Users,
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ActionSimulator } from '@/components/analytics/ActionSimulator';
import { CityComparison } from '@/components/analytics/CityComparison';
import { HeatZoneList } from '@/components/analytics/HeatZoneList';
import { ImpactProjections } from '@/components/analytics/ImpactProjections';
import { StatsCards } from '@/components/analytics/StatsCards';
import { TemperatureChart } from '@/components/analytics/TemperatureChart';
import { AuthModal } from '@/components/auth/AuthModal';
import { CitizenDashboardPanel } from '@/components/citizen/CitizenDashboardPanel';
import { TimeSlider } from '@/components/controls/TimeSlider';
import { ExportPanel } from '@/components/export/ExportPanel';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { RecommendationsPanel } from '@/components/recommendations/RecommendationsPanel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { type DashboardTab, useDashboardStore } from '@/lib/store';
import type { UserRole } from '@/types';
import { cn } from '@/lib/utils';

// Dynamic import for HeatMap (Leaflet requires client-side rendering)
const HeatMap = dynamic(() => import('@/components/map/HeatMap').then((mod) => mod.HeatMap), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <div className="mb-3 h-10 w-10 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent mx-auto" />
        <p className="text-xs font-semibold text-gray-400">Loading satellite map tiles...</p>
      </div>
    </div>
  ),
});

export default function DashboardPage() {
  const router = useRouter();
  const {
    dashboardTab,
    setDashboardTab,
    desktopSidebarOpen,
    implementedRecommendations,
    userRole,
    setUserRole,
    userProfile,
    hasSelectedRole,
    exitPortal,
    showToast,
  } = useDashboardStore();

  const [govSubTab, setGovSubTab] = useState<'actions' | 'charts'>('actions');
  const [researchSubTab, setResearchSubTab] = useState<'trends' | 'projections'>('trends');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authDefaultRole, setAuthDefaultRole] = useState<UserRole>('government');

  useEffect(() => {
    // If user arrives at dashboard without selecting a role, prompt mandatory role gate
    if (!hasSelectedRole) {
      setAuthModalOpen(true);
    }
  }, [hasSelectedRole]);

  return (
    <DashboardShell>
      <div className="flex h-full flex-col overflow-hidden font-alliance">
        {/* Mobile Tabs - Role Optimized */}
        <div className="flex flex-col flex-1 overflow-hidden lg:hidden">
          <Tabs
            value={dashboardTab}
            onValueChange={(value) => setDashboardTab(value as DashboardTab)}
            className="flex-1 flex flex-col overflow-hidden"
          >
            <div className="border-b border-gray-800 bg-gray-950 px-2 py-1.5 shrink-0">
              <TabsList className="w-full h-8 bg-gray-900 text-gray-300">
                <TabsTrigger value="map" className="flex-1 text-xs gap-1 data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
                  <MapIcon className="h-3.5 w-3.5" />
                  Map
                </TabsTrigger>
                {userRole === 'citizen' ? (
                  <>
                    <TabsTrigger value="actions" className="flex-1 text-xs gap-1 data-[state=active]:bg-sky-600 data-[state=active]:text-white">
                      <Footprints className="h-3.5 w-3.5" />
                      Safe Walk & Shelters
                    </TabsTrigger>
                    <TabsTrigger value="analytics" className="flex-1 text-xs gap-1 data-[state=active]:bg-sky-600 data-[state=active]:text-white">
                      <BarChart3 className="h-3.5 w-3.5" />
                      City Heat Stats
                    </TabsTrigger>
                  </>
                ) : userRole === 'government' ? (
                  <>
                    <TabsTrigger value="actions" className="flex-1 text-xs gap-1 data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
                      <TreeDeciduous className="h-3.5 w-3.5 text-emerald-400" />
                      Action Plans ({implementedRecommendations.length})
                    </TabsTrigger>
                    <TabsTrigger value="analytics" className="flex-1 text-xs gap-1 data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
                      <BarChart3 className="h-3.5 w-3.5" />
                      Municipal Stats
                    </TabsTrigger>
                  </>
                ) : (
                  <>
                    <TabsTrigger value="analytics" className="flex-1 text-xs gap-1 data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                      <BarChart3 className="h-3.5 w-3.5" />
                      Telemetry Trends
                    </TabsTrigger>
                    <TabsTrigger value="actions" className="flex-1 text-xs gap-1 data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                      <Layers className="h-3.5 w-3.5" />
                      Climate Projections
                    </TabsTrigger>
                  </>
                )}
              </TabsList>
            </div>

            <TabsContent
              value="map"
              className="flex-1 m-0 data-[state=active]:flex data-[state=active]:flex-col overflow-hidden"
            >
              <div id="climora-map-container-mobile" className="flex-1 min-h-0">
                <HeatMap />
              </div>
              <div className="p-2.5 bg-gray-950 border-t border-gray-800 shrink-0">
                <TimeSlider />
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="flex-1 overflow-y-auto p-3 space-y-3 m-0">
              <StatsCards />
              <CityComparison />
              <TemperatureChart />
              <HeatZoneList />
              <ImpactProjections />
            </TabsContent>

            <TabsContent value="actions" className="flex-1 overflow-y-auto p-3 space-y-3 m-0">
              {userRole === 'citizen' ? (
                <CitizenDashboardPanel />
              ) : (
                <>
                  <ActionSimulator />
                  <RecommendationsPanel />
                  <ExportPanel />
                </>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex lg:flex-1 lg:overflow-hidden">
          {/* Main Content Area */}
          <div className="flex flex-1 flex-col overflow-hidden min-w-0">
            {/* Stats Row - Compact & high-density */}
            <div className="shrink-0 border-b border-gray-800 bg-gray-950/90 px-3 py-2 backdrop-blur">
              <StatsCards />
            </div>

            {/* Map and Context Panel Row */}
            <div className="flex flex-1 overflow-hidden min-w-0">
              {/* Map Section */}
              <div
                className={cn(
                  'flex flex-1 flex-col overflow-hidden transition-all duration-300 min-w-0',
                  !desktopSidebarOpen && 'bg-gray-900',
                )}
              >
                <div id="climora-map-container" className="min-h-0 min-w-0 flex-1 relative">
                  <HeatMap />
                </div>
                <div className="shrink-0 border-t border-gray-800 bg-gray-950 px-3 py-2">
                  <TimeSlider />
                </div>
              </div>

              {/* Right Panel - Tailored directly to user role, strictly bounded */}
              <div className="w-[360px] xl:w-[420px] shrink-0 flex flex-col overflow-hidden border-l border-gray-800 bg-gray-900/95">
                {/* Role Switcher Pill Header */}
                <div className="p-2.5 border-b border-gray-800 bg-gray-950 shrink-0">
                  <div className="flex items-center justify-between mb-2 gap-2">
                    <div className="flex items-center gap-1.5 min-w-0">
                      {userRole === 'government' ? (
                        <span className="p-1 rounded bg-emerald-500/20 text-emerald-400 shrink-0">
                          <Building2 className="h-3.5 w-3.5" />
                        </span>
                      ) : userRole === 'citizen' ? (
                        <span className="p-1 rounded bg-sky-500/20 text-sky-400 shrink-0">
                          <Users className="h-3.5 w-3.5" />
                        </span>
                      ) : (
                        <span className="p-1 rounded bg-purple-500/20 text-purple-400 shrink-0">
                          <Shield className="h-3.5 w-3.5" />
                        </span>
                      )}
                      <span className="text-xs font-bold text-white truncate">
                        {userRole === 'government'
                          ? 'Municipal Authority Hub'
                          : userRole === 'citizen'
                            ? 'Citizen Public Portal'
                            : 'Scientific Telemetry Hub'}
                      </span>
                    </div>

                    {/* Official Verification Badge */}
                    <button
                      type="button"
                      onClick={() => {
                        setAuthDefaultRole(userRole);
                        setAuthModalOpen(true);
                      }}
                      className={cn(
                        'text-[10px] font-semibold px-2 py-0.5 rounded border transition-all cursor-pointer flex items-center gap-1 shrink-0',
                        userProfile?.verified
                          ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20',
                      )}
                      title="Click to view credentials or re-verify identity"
                    >
                      {userProfile?.verified ? (
                        <>
                          <ShieldCheck className="h-3 w-3 text-emerald-400 shrink-0" />
                          <span className="truncate">{userProfile.badge || 'Verified ✓'}</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="h-3 w-3 text-amber-400 shrink-0" />
                          <span>Verify Identity</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Locked Active Role Session Banner */}
                  <div className="flex items-center justify-between p-2 bg-gray-900 rounded-lg border border-gray-800 text-[11px]">
                    <div className="flex items-center gap-1.5 text-gray-300 min-w-0">
                      <Lock className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span className="font-medium text-gray-400">Locked Role:</span>
                      <span className="font-bold text-white capitalize truncate">{userRole} Portal</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        exitPortal();
                        showToast('🚪 Exited portal session. Please select your role to enter again.', 'info');
                        router.push('/');
                      }}
                      className="text-[10px] text-rose-400 hover:text-rose-300 font-semibold transition-colors flex items-center gap-1 cursor-pointer bg-rose-950/40 hover:bg-rose-900/50 px-2 py-1 rounded border border-rose-500/30 shrink-0"
                      title="Exit to front entrance to choose another role"
                    >
                      <LogOut className="h-3 w-3" />
                      <span>Exit Portal (बाहर निकलें)</span>
                    </button>
                  </div>
                </div>

                {/* Role Specific Sub-Tabs (for Govt and Researcher) */}
                {userRole === 'government' && (
                  <div className="px-2.5 py-1.5 border-b border-gray-800 bg-gray-950/70 shrink-0">
                    <div className="flex items-center gap-1 p-0.5 bg-gray-900 rounded-lg border border-gray-800">
                      <button
                        type="button"
                        onClick={() => setGovSubTab('actions')}
                        className={cn(
                          'flex-1 py-1 px-2 rounded-md text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer',
                          govSubTab === 'actions'
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'text-gray-400 hover:text-white',
                        )}
                      >
                        <TreeDeciduous className="h-3 w-3" />
                        Action Plans ({implementedRecommendations.length})
                      </button>
                      <button
                        type="button"
                        onClick={() => setGovSubTab('charts')}
                        className={cn(
                          'flex-1 py-1 px-2 rounded-md text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer',
                          govSubTab === 'charts'
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'text-gray-400 hover:text-white',
                        )}
                      >
                        <BarChart3 className="h-3 w-3" />
                        Municipal Analytics
                      </button>
                    </div>
                  </div>
                )}

                {userRole === 'researcher' && (
                  <div className="px-2.5 py-1.5 border-b border-gray-800 bg-gray-950/70 shrink-0">
                    <div className="flex items-center gap-1 p-0.5 bg-gray-900 rounded-lg border border-gray-800">
                      <button
                        type="button"
                        onClick={() => setResearchSubTab('trends')}
                        className={cn(
                          'flex-1 py-1 px-2 rounded-md text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer',
                          researchSubTab === 'trends'
                            ? 'bg-purple-600 text-white shadow-sm'
                            : 'text-gray-400 hover:text-white',
                        )}
                      >
                        <BarChart3 className="h-3 w-3" />
                        NASA Telemetry & Trends
                      </button>
                      <button
                        type="button"
                        onClick={() => setResearchSubTab('projections')}
                        className={cn(
                          'flex-1 py-1 px-2 rounded-md text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer',
                          researchSubTab === 'projections'
                            ? 'bg-purple-600 text-white shadow-sm'
                            : 'text-gray-400 hover:text-white',
                        )}
                      >
                        <Layers className="h-3 w-3" />
                        Simulation Models
                      </button>
                    </div>
                  </div>
                )}

                {/* Role Specific Content Body */}
                <div className="flex-1 overflow-y-auto p-3 space-y-3 w-full max-w-full">
                  {userRole === 'citizen' ? (
                    /* 1. CITIZEN VIEW: Safety alerts, turn-by-turn shaded walk, cooling shelters, 1-click reports */
                    <CitizenDashboardPanel />
                  ) : userRole === 'government' ? (
                    /* 2. GOVERNMENT VIEW: Municipal action simulator, project implementation, HAP dossiers */
                    govSubTab === 'actions' ? (
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
                    )
                  ) : (
                    /* 3. RESEARCHER VIEW: Satellite telemetry, UHI differentials, multi-city benchmarks, raw export */
                    researchSubTab === 'trends' ? (
                      <>
                        <TemperatureChart />
                        <CityComparison />
                        <HeatZoneList />
                        <ExportPanel />
                      </>
                    ) : (
                      <>
                        <ImpactProjections />
                        <ActionSimulator />
                        <HeatZoneList />
                        <ExportPanel />
                      </>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Role Verification & Authentication Dialog */}
      <AuthModal
        open={authModalOpen}
        onOpenChange={setAuthModalOpen}
        defaultRole={authDefaultRole}
      />
    </DashboardShell>
  );
}
