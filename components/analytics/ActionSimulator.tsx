'use client';

import {
  AlertTriangle,
  Building2,
  CheckCircle2,
  Coins,
  Download,
  Droplets,
  Flame,
  Info,
  RefreshCw,
  Send,
  Shield,
  ShieldCheck,
  Sparkles,
  ThermometerSnowflake,
  Trees,
} from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { useDashboardStore } from '@/lib/store';
import { formatNumber } from '@/lib/utils';

export function ActionSimulator() {
  const { selectedCity, userRole, userProfile, showToast } = useDashboardStore();

  // Interactive slider values
  const [treeCanopyBoost, setTreeCanopyBoost] = useState<number>(25); // %
  const [coolRoofsPercent, setCoolRoofsPercent] = useState<number>(30); // %
  const [waterMistingUnits, setWaterMistingUnits] = useState<number>(12); // units
  const [actionDispatched, setActionDispatched] = useState<boolean>(false);
  const [dispatchFeedback, setDispatchFeedback] = useState<string | null>(null);

  // Calculate simulated cooling based on user sliders
  const treeCooling = (treeCanopyBoost / 100) * 1.8;
  const roofCooling = (coolRoofsPercent / 100) * 1.2;
  const mistingCooling = (waterMistingUnits / 20) * 0.9;
  const totalCooling = Math.min(3.8, treeCooling + roofCooling + mistingCooling);

  // Simulated metrics
  const protectedCitizens = Math.round(selectedCity.population * (totalCooling / 15));
  const estimatedCostCr = (
    treeCanopyBoost * 0.28 +
    coolRoofsPercent * 0.19 +
    waterMistingUnits * 0.12
  ).toFixed(1);

  const isVerifiedGovt = userRole === 'government' && userProfile?.verified;

  const handleDispatch = () => {
    setActionDispatched(true);
    const officerSignature = userProfile?.officerId ? ` [Officer ID: ${userProfile.officerId}]` : ' [MCD-URC-7491]';
    const officerName = userProfile?.name || 'Dr. Rajesh Verma';
    
    setDispatchFeedback(
      `✓ Official Directives Transmitted: Sanctioned by ${officerName}${officerSignature}. Emergency misting and shade directives sent to ward engineers.`,
    );
    showToast(
      `🏛️ Municipal Action Plan Dispatched for ${selectedCity.name}!`,
      'success',
    );
    setTimeout(() => {
      setDispatchFeedback(null);
    }, 6000);
  };

  const handleReset = () => {
    setTreeCanopyBoost(20);
    setCoolRoofsPercent(15);
    setWaterMistingUnits(6);
    setActionDispatched(false);
    showToast('Simulation parameters reset to default baseline', 'info');
  };

  const handlePrintPlan = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <Card className="border border-emerald-500/30 bg-gradient-to-br from-gray-950 via-gray-900 to-emerald-950/40 shadow-xl overflow-hidden font-alliance w-full max-w-full">
      <CardHeader className="p-3 border-b border-gray-800">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0">
              <ThermometerSnowflake className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <CardTitle className="text-sm font-bold text-white flex items-center gap-1.5 truncate">
                <span>Action Plan Simulator</span>
                <Badge variant="outline" className="text-[9px] border-emerald-500/40 text-emerald-400 uppercase tracking-wide px-1.5 py-0 shrink-0">
                  Municipal Tool
                </Badge>
              </CardTitle>
              <CardDescription className="text-[11px] text-gray-400 truncate">
                Adjust cooling actions for {selectedCity.name}
              </CardDescription>
            </div>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleReset}
            className="text-gray-400 hover:text-white text-xs h-7 px-2 shrink-0 cursor-pointer"
          >
            <RefreshCw className="h-3 w-3 mr-1" />
            Reset
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-3 space-y-3 w-full max-w-full overflow-hidden">
        {/* Outcome Dashboard - Tightened columns so numbers never overflow */}
        <div className="grid grid-cols-3 gap-1 rounded-xl bg-gray-950/90 p-2 border border-gray-800 w-full overflow-hidden">
          <div className="text-center min-w-0 px-1">
            <p className="text-[10px] text-gray-400 flex items-center justify-center gap-1 truncate">
              <ThermometerSnowflake className="h-3 w-3 text-sky-400 shrink-0" />
              <span className="truncate">Cooling</span>
            </p>
            <p className="text-sm sm:text-base font-black text-sky-400 mt-0.5 truncate tabular-nums">
              -{totalCooling.toFixed(1)}°C
            </p>
            <span className="text-[9px] text-gray-500 block truncate">Peak relief</span>
          </div>

          <div className="text-center border-x border-gray-800 px-1 min-w-0">
            <p className="text-[10px] text-gray-400 flex items-center justify-center gap-1 truncate">
              <Shield className="h-3 w-3 text-emerald-400 shrink-0" />
              <span className="truncate">Protected</span>
            </p>
            <p className="text-sm sm:text-base font-black text-emerald-400 mt-0.5 truncate tabular-nums">
              {formatNumber(protectedCitizens)}
            </p>
            <span className="text-[9px] text-gray-500 block truncate">Residents</span>
          </div>

          <div className="text-center min-w-0 px-1">
            <p className="text-[10px] text-gray-400 flex items-center justify-center gap-1 truncate">
              <Coins className="h-3 w-3 text-amber-400 shrink-0" />
              <span className="truncate">Budget</span>
            </p>
            <p className="text-sm sm:text-base font-black text-amber-400 mt-0.5 truncate tabular-nums">
              ₹{estimatedCostCr} <span className="text-[9px] font-normal">Cr</span>
            </p>
            <span className="text-[9px] text-gray-500 block truncate">Capex</span>
          </div>
        </div>

        {/* Feedback Alert */}
        {dispatchFeedback && (
          <div className="p-2.5 bg-emerald-950/90 border border-emerald-500/50 rounded-lg flex items-start gap-2 text-xs text-emerald-300 animate-in fade-in">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
            <span className="leading-snug">{dispatchFeedback}</span>
          </div>
        )}

        {/* Action Controls - Compact & Non-Overflowing */}
        <div className="space-y-2.5 w-full">
          {/* Action 1: Urban Trees */}
          <div className="space-y-1 bg-gray-900/70 p-2 rounded-lg border border-gray-800/80 w-full overflow-hidden">
            <div className="flex items-center justify-between text-xs gap-2 min-w-0">
              <span className="font-semibold text-gray-200 flex items-center gap-1.5 truncate">
                <Trees className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">1. Hotspot Roadside Shade Trees</span>
              </span>
              <span className="font-mono font-bold text-emerald-400 shrink-0">+{treeCanopyBoost}%</span>
            </div>
            <Slider
              value={[treeCanopyBoost]}
              onValueChange={(vals) => setTreeCanopyBoost(vals[0])}
              min={0}
              max={60}
              step={5}
              className="py-1 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-400">
              <span className="truncate">Expands canopy cover</span>
              <span className="text-emerald-400 font-medium shrink-0">-{treeCooling.toFixed(1)}°C</span>
            </div>
          </div>

          {/* Action 2: Cool Roofs */}
          <div className="space-y-1 bg-gray-900/70 p-2 rounded-lg border border-gray-800/80 w-full overflow-hidden">
            <div className="flex items-center justify-between text-xs gap-2 min-w-0">
              <span className="font-semibold text-gray-200 flex items-center gap-1.5 truncate">
                <Building2 className="h-3.5 w-3.5 text-sky-400 shrink-0" />
                <span className="truncate">2. Reflective White Cool Roofs</span>
              </span>
              <span className="font-mono font-bold text-sky-400 shrink-0">{coolRoofsPercent}%</span>
            </div>
            <Slider
              value={[coolRoofsPercent]}
              onValueChange={(vals) => setCoolRoofsPercent(vals[0])}
              min={0}
              max={80}
              step={5}
              className="py-1 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-400">
              <span className="truncate">Reflects 85% solar heat</span>
              <span className="text-sky-400 font-medium shrink-0">-{roofCooling.toFixed(1)}°C</span>
            </div>
          </div>

          {/* Action 3: Water Misting Cannons */}
          <div className="space-y-1 bg-gray-900/70 p-2 rounded-lg border border-gray-800/80 w-full overflow-hidden">
            <div className="flex items-center justify-between text-xs gap-2 min-w-0">
              <span className="font-semibold text-gray-200 flex items-center gap-1.5 truncate">
                <Droplets className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                <span className="truncate">3. Transit Evaporative Misting</span>
              </span>
              <span className="font-mono font-bold text-cyan-400 shrink-0">{waterMistingUnits} Units</span>
            </div>
            <Slider
              value={[waterMistingUnits]}
              onValueChange={(vals) => setWaterMistingUnits(vals[0])}
              min={0}
              max={30}
              step={2}
              className="py-1 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-400">
              <span className="truncate">Evaporative mist cooling</span>
              <span className="text-cyan-400 font-medium shrink-0">-{mistingCooling.toFixed(1)}°C</span>
            </div>
          </div>
        </div>

        {/* Action Execution Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1 w-full">
          <Button
            size="sm"
            onClick={handleDispatch}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-950 cursor-pointer"
          >
            <Send className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{actionDispatched ? '✓ Dispatched' : 'Execute Plan'}</span>
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={handlePrintPlan}
            className="w-full border-gray-700 hover:bg-gray-800 text-gray-200 text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Download className="h-3.5 w-3.5 text-gray-400 shrink-0" />
            <span className="truncate">Print Brief</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
