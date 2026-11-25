'use client';

import {
  AlertCircle,
  Building2,
  Calendar,
  CheckCircle,
  Coins,
  DollarSign,
  Download,
  Droplets,
  FileCheck2,
  Filter,
  Plus,
  Share2,
  ThermometerSnowflake,
  TreeDeciduous,
  Trees,
} from 'lucide-react';
import { useState } from 'react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { generateRecommendations } from '@/lib/data';
import { useDashboardStore } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';
import type { GreenInfrastructureRecommendation } from '@/types';

export default function MitigationPage() {
  const { selectedCity, selectedDate, implementedRecommendations, toggleImplementedRecommendation, userRole } =
    useDashboardStore();

  const [filterType, setFilterType] = useState<string>('all');
  const [approvalFeedback, setApprovalFeedback] = useState<string | null>(null);

  const allRecommendations = generateRecommendations(selectedCity, selectedDate);

  const filteredRecs = allRecommendations.filter((rec) => {
    if (filterType === 'all') return true;
    return rec.type === filterType;
  });

  const implementedRecs = allRecommendations.filter((rec) =>
    implementedRecommendations.includes(rec.id),
  );

  const totalCostCr = implementedRecs.reduce((sum, r) => sum + r.estimatedCost, 0) / 10000000;
  const totalCooling = implementedRecs.reduce((sum, r) => sum + r.estimatedCoolingEffect, 0);
  const totalAreaHa = implementedRecs.reduce((sum, r) => sum + r.area, 0) / 10000;

  const isGovernment = userRole === 'government';

  const handleApproveBatch = () => {
    setApprovalFeedback(
      `Approved ${implementedRecs.length} infrastructure projects for Phase-1 municipal allocation under Smart Cities Climate Mission.`,
    );
    setTimeout(() => setApprovalFeedback(null), 4000);
  };

  return (
    <DashboardShell>
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6 bg-gray-900/95 text-gray-100">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/30">
                Actionable Urban Heat Interventions
              </span>
              {isGovernment ? (
                <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-xs font-semibold text-amber-400 border border-amber-500/30 flex items-center gap-1">
                  <Building2 className="h-3 w-3" />
                  Municipal Budget Planner
                </span>
              ) : (
                <span className="rounded-full bg-sky-500/20 px-2.5 py-0.5 text-xs font-semibold text-sky-400 border border-sky-500/30">
                  Citizen Climate Action
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-alliance">
              Green Infrastructure & Mitigation Planning
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Simulate cooling efficacy, budget allocation, and municipal rollout for{' '}
              <span className="text-emerald-400 font-semibold">{selectedCity.name}</span>.
            </p>
          </div>

          {isGovernment && (
            <div className="flex items-center gap-2">
              <Button
                onClick={handleApproveBatch}
                disabled={implementedRecs.length === 0}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium flex items-center gap-2"
              >
                <FileCheck2 className="h-4 w-4" />
                Approve Municipal Rollout ({implementedRecs.length})
              </Button>
            </div>
          )}
        </div>

        {approvalFeedback && (
          <div className="p-4 bg-emerald-950/80 border border-emerald-500/40 rounded-lg flex items-center gap-3 text-emerald-300 text-sm animate-in fade-in">
            <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0" />
            <span>{approvalFeedback}</span>
          </div>
        )}

        {/* Impact Simulator Summary Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gray-950/80 border-gray-800">
            <CardHeader className="pb-2">
              <CardDescription className="text-gray-400 flex items-center justify-between">
                <span>Selected Interventions</span>
                <Trees className="h-4 w-4 text-emerald-400" />
              </CardDescription>
              <CardTitle className="text-2xl sm:text-3xl font-bold text-white font-alliance">
                {implementedRecs.length} <span className="text-sm font-normal text-gray-400">/ {allRecommendations.length} sites</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-400">Click &quot;Allocate Project&quot; below to add to simulation</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-950/80 border-gray-800">
            <CardHeader className="pb-2">
              <CardDescription className="text-gray-400 flex items-center justify-between">
                <span>Projected City Cooling</span>
                <ThermometerSnowflake className="h-4 w-4 text-sky-400" />
              </CardDescription>
              <CardTitle className="text-2xl sm:text-3xl font-bold text-sky-400 font-alliance">
                -{totalCooling.toFixed(1)}°C
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-400">Local microclimate temperature reduction</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-950/80 border-gray-800">
            <CardHeader className="pb-2">
              <CardDescription className="text-gray-400 flex items-center justify-between">
                <span>Total Treated Land Area</span>
                <TreeDeciduous className="h-4 w-4 text-emerald-400" />
              </CardDescription>
              <CardTitle className="text-2xl sm:text-3xl font-bold text-emerald-400 font-alliance">
                {totalAreaHa.toFixed(1)} <span className="text-sm font-normal text-gray-400">ha</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-400">Permeable canopy, bioswales, and green roofs</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-950/80 border-gray-800">
            <CardHeader className="pb-2">
              <CardDescription className="text-gray-400 flex items-center justify-between">
                <span>Est. Municipal Budget</span>
                <Coins className="h-4 w-4 text-amber-400" />
              </CardDescription>
              <CardTitle className="text-2xl sm:text-3xl font-bold text-amber-400 font-alliance">
                ₹ {totalCostCr.toFixed(2)} <span className="text-sm font-normal text-gray-400">Cr</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-400">Capital cost + 5-year maintenance estimate</p>
            </CardContent>
          </Card>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-xs text-gray-400 mr-2 flex items-center gap-1">
            <Filter className="h-3.5 w-3.5" /> Filter by Type:
          </span>
          {[
            { id: 'all', label: 'All Interventions' },
            { id: 'tree_planting', label: '🌲 Tree Planting' },
            { id: 'green_roof', label: '🏢 Green Roofs' },
            { id: 'bioswale', label: '💧 Bioswales' },
            { id: 'cool_pavement', label: '🛤️ Cool Pavements' },
            { id: 'urban_park', label: '🌳 Urban Parks' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilterType(tab.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                filterType === tab.id
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Actionable Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRecs.map((rec) => {
            const isImplemented = implementedRecommendations.includes(rec.id);
            return (
              <Card
                key={rec.id}
                className={`transition-all border ${
                  isImplemented
                    ? 'border-emerald-500/60 bg-emerald-950/20 shadow-lg'
                    : 'border-gray-800 bg-gray-950/60 hover:border-gray-700'
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        rec.priority === 'critical'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : rec.priority === 'high'
                            ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                            : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      }`}
                    >
                      {rec.priority} Priority
                    </span>
                    <span className="text-xs font-bold text-sky-400">
                      -{rec.estimatedCoolingEffect.toFixed(1)}°C Cooling
                    </span>
                  </div>
                  <CardTitle className="text-base font-bold text-white mt-1">
                    {rec.name}
                  </CardTitle>
                  <CardDescription className="text-xs text-gray-400 line-clamp-2">
                    {rec.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-3 pt-0">
                  <div className="grid grid-cols-2 gap-2 text-xs border-t border-b border-gray-800/80 py-2.5">
                    <div>
                      <span className="text-gray-500 block">Est. Cost</span>
                      <span className="font-semibold text-gray-200">
                        ₹ {(rec.estimatedCost / 10000000).toFixed(2)} Cr
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Covered Area</span>
                      <span className="font-semibold text-gray-200">
                        {(rec.area / 10000).toFixed(2)} ha
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Benefit Score</span>
                      <span className="font-semibold text-emerald-400">
                        {rec.benefitScore} / 100
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Type</span>
                      <span className="font-semibold capitalize text-gray-200">
                        {rec.type.replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  <div className="pt-1 flex items-center justify-between">
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => toggleImplementedRecommendation(rec.id)}
                      className={`w-full text-xs font-semibold transition-all ${
                        isImplemented
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          : 'bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700'
                      }`}
                    >
                      {isImplemented ? (
                        <span className="flex items-center gap-1.5">
                          <CheckCircle className="h-4 w-4" /> Allocated to Municipal Plan
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5">
                          <Plus className="h-4 w-4" /> Allocate Project to Plan
                        </span>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardShell>
  );
}
