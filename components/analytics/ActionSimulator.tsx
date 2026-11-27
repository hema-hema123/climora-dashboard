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
  const { selectedCity, userRole, showToast } = useDashboardStore();

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

  const handleDispatch = () => {
    setActionDispatched(true);
    setDispatchFeedback(
      `✓ Official Action Plan dispatched for ${selectedCity.name}! Emergency misting and shade directives sent to municipal ward officers.`,
    );
    showToast(
      `🚀 Action Plan Dispatched for ${selectedCity.name}! Municipal directives transmitted.`,
      'success',
    );
    setTimeout(() => {
      setDispatchFeedback(null);
    }, 5000);
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
    <Card className="border border-emerald-500/30 bg-gradient-to-br from-gray-950 via-gray-900 to-emerald-950/40 shadow-xl overflow-hidden font-alliance">
      <CardHeader className="pb-3 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
              <ThermometerSnowflake className="h-5 w-5" />
            </span>
            <div>
              <CardTitle className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Action Plan & Cooling Simulator
                <Badge variant="outline" className="text-[10px] border-emerald-500/40 text-emerald-400 uppercase tracking-wide">
                  Interactive
                </Badge>
              </CardTitle>
              <CardDescription className="text-xs text-gray-400">
                Adjust simple cooling actions below to see immediate simulated temperature relief for{' '}
                <span className="text-emerald-400 font-medium">{selectedCity.name}</span>.
              </CardDescription>
            </div>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleReset}
            className="text-gray-400 hover:text-white text-xs h-7 px-2"
          >
            <RefreshCw className="h-3 w-3 mr-1" />
            Reset
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        {/* Outcome Dashboard */}
        <div className="grid grid-cols-3 gap-2 rounded-xl bg-gray-950/80 p-3 border border-gray-800">
          <div className="text-center">
            <p className="text-[10px] sm:text-xs text-gray-400 flex items-center justify-center gap-1">
              <ThermometerSnowflake className="h-3 w-3 text-sky-400" />
              Projected Relief
            </p>
            <p className="text-lg sm:text-2xl font-black text-sky-400 mt-0.5">
              -{totalCooling.toFixed(1)}°C
            </p>
            <span className="text-[9px] text-gray-500">Peak heat reduction</span>
          </div>

          <div className="text-center border-x border-gray-800 px-1">
            <p className="text-[10px] sm:text-xs text-gray-400 flex items-center justify-center gap-1">
              <Shield className="h-3 w-3 text-emerald-400" />
              People Shielded
            </p>
            <p className="text-lg sm:text-2xl font-black text-emerald-400 mt-0.5">
              {formatNumber(protectedCitizens)}
            </p>
            <span className="text-[9px] text-gray-500">Lower heat stroke risk</span>
          </div>

          <div className="text-center">
            <p className="text-[10px] sm:text-xs text-gray-400 flex items-center justify-center gap-1">
              <Coins className="h-3 w-3 text-amber-400" />
              Est. Budget
            </p>
            <p className="text-lg sm:text-2xl font-black text-amber-400 mt-0.5">
              ₹ {estimatedCostCr} <span className="text-xs font-normal">Cr</span>
            </p>
            <span className="text-[9px] text-gray-500">Capital + rollout</span>
          </div>
        </div>

        {/* Feedback Alert */}
        {dispatchFeedback && (
          <div className="p-3 bg-emerald-950/90 border border-emerald-500/50 rounded-lg flex items-center gap-2.5 text-xs text-emerald-300 animate-in fade-in">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>{dispatchFeedback}</span>
          </div>
        )}

        {/* Action Controls */}
        <div className="space-y-3.5 pt-1">
          {/* Action 1: Urban Trees */}
          <div className="space-y-1.5 bg-gray-900/60 p-2.5 rounded-lg border border-gray-800/80">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-gray-200 flex items-center gap-1.5">
                <Trees className="h-3.5 w-3.5 text-emerald-400" />
                1. Plant Shade Trees in Hotspot Wards
              </span>
              <span className="font-mono font-bold text-emerald-400">+{treeCanopyBoost}% Canopy</span>
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
              <span>Adds roadside shade canopy</span>
              <span className="text-emerald-400 font-medium">-{treeCooling.toFixed(1)}°C local relief</span>
            </div>
          </div>

          {/* Action 2: Cool Roofs */}
          <div className="space-y-1.5 bg-gray-900/60 p-2.5 rounded-lg border border-gray-800/80">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-gray-200 flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5 text-sky-400" />
                2. Paint White Solar-Reflective Cool Roofs
              </span>
              <span className="font-mono font-bold text-sky-400">{coolRoofsPercent}% of Roofs</span>
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
              <span>Reflects 85% of solar radiation</span>
              <span className="text-sky-400 font-medium">-{roofCooling.toFixed(1)}°C indoor cooling</span>
            </div>
          </div>

          {/* Action 3: Water Misting Cannons */}
          <div className="space-y-1.5 bg-gray-900/60 p-2.5 rounded-lg border border-gray-800/80">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-gray-200 flex items-center gap-1.5">
                <Droplets className="h-3.5 w-3.5 text-cyan-400" />
                3. Mobilize Water Misting Cannons in Transit Hubs
              </span>
              <span className="font-mono font-bold text-cyan-400">{waterMistingUnits} Mobile Cannons</span>
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
              <span>Immediate evaporative cooling</span>
              <span className="text-cyan-400 font-medium">-{mistingCooling.toFixed(1)}°C transit relief</span>
            </div>
          </div>
        </div>

        {/* Action Execution Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <Button
            size="sm"
            onClick={handleDispatch}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-950"
          >
            <Send className="h-3.5 w-3.5" />
            {actionDispatched ? '✓ Plan Dispatched' : 'Execute Action Plan'}
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={handlePrintPlan}
            className="w-full border-gray-700 hover:bg-gray-800 text-gray-200 text-xs font-medium flex items-center justify-center gap-1.5"
          >
            <Download className="h-3.5 w-3.5 text-gray-400" />
            Print Action Brief
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
