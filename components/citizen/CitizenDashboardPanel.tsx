'use client';

import {
  AlertTriangle,
  Building2,
  Calendar,
  CheckCircle2,
  CheckSquare,
  Clock,
  Compass,
  Droplet,
  Droplets,
  Footprints,
  HeartHandshake,
  MapPin,
  Send,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Square,
  Sun,
  Trees,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useDashboardStore } from '@/lib/store';

export function CitizenDashboardPanel() {
  const router = useRouter();
  const { selectedCity, showToast } = useDashboardStore();

  const [routeFrom, setRouteFrom] = useState('Metro Station Exit 3');
  const [routeTo, setRouteTo] = useState('Sector 6 Market Plaza');
  const [navStarted, setNavStarted] = useState(false);

  // Quick report state
  const [quickStreet, setQuickStreet] = useState('');
  const [quickReportSent, setQuickReportSent] = useState(false);

  // Volunteer state
  const [volunteerRegistered, setVolunteerRegistered] = useState(false);

  // Checklist state
  const [checklist, setChecklist] = useState({
    water: true,
    cotton: false,
    seniors: false,
    animals: true,
  });

  const toggleChecklist = (key: keyof typeof checklist) => {
    const next = !checklist[key];
    setChecklist((prev) => ({ ...prev, [key]: next }));
    if (next) {
      showToast('✓ Great habit! Safety checklist updated.', 'success');
    }
  };

  const handleQuickReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickStreet.trim()) return;
    const ticketId = `CLR-${Math.floor(1000 + Math.random() * 9000)}`;
    setQuickReportSent(true);
    showToast(`📋 Hotspot report #${ticketId} logged with Green Taskforce!`, 'success');
    setQuickStreet('');
    setTimeout(() => setQuickReportSent(false), 4000);
  };

  return (
    <div className="space-y-3.5 font-alliance">
      {/* Citizen Heat Safety Status Banner */}
      <div className="rounded-xl p-3 bg-gradient-to-r from-amber-950/60 via-gray-900 to-orange-950/60 border border-amber-500/40 shadow-lg">
        <div className="flex items-start gap-2.5">
          <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
            <Sun className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">Yellow Heat Alert · {selectedCity.name}</span>
              <span className="text-[10px] font-semibold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
                Peak: 12 - 3:30 PM
              </span>
            </div>
            <p className="text-[11px] text-gray-300 mt-1 leading-snug">
              Surface heat is elevated. Drink water every 45 mins. Utilize free municipal AC shelters.
            </p>
          </div>
        </div>
      </div>

      {/* Shaded Walk Navigator */}
      <Card className="bg-gray-950/90 border-emerald-500/40 shadow-xl overflow-hidden">
        <CardHeader className="p-3 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xs font-bold text-white flex items-center gap-1.5">
              <Footprints className="h-4 w-4 text-emerald-400" />
              Pedestrian Shaded Route Navigator
            </CardTitle>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded">
              -3.5°C Cooler
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-3 space-y-2.5 text-xs">
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div>
              <span className="text-gray-400 block mb-0.5">From</span>
              <input
                type="text"
                value={routeFrom}
                onChange={(e) => setRouteFrom(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded px-2 py-1 text-white text-[11px]"
              />
            </div>
            <div>
              <span className="text-gray-400 block mb-0.5">To</span>
              <input
                type="text"
                value={routeTo}
                onChange={(e) => setRouteTo(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded px-2 py-1 text-white text-[11px]"
              />
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-emerald-950/50 border border-emerald-500/30 flex items-center justify-between text-[11px]">
            <div>
              <span className="font-bold text-white block">🌳 Shaded Canopy Walkway</span>
              <span className="text-gray-300 text-[10px]">85% shade · 💧 2 Free Water Kiosks</span>
            </div>
            <Button
              size="sm"
              onClick={() => {
                const next = !navStarted;
                setNavStarted(next);
                showToast(next ? '🚶 Navigation active along shaded path' : 'Navigation ended', 'info');
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[11px] h-7 px-3 cursor-pointer"
            >
              {navStarted ? 'End Walk' : 'Start Walk →'}
            </Button>
          </div>

          {navStarted && (
            <div className="p-2 bg-gray-900 rounded-lg border border-gray-800 text-[11px] space-y-1 text-gray-300">
              <p className="font-semibold text-emerald-400">Step 1: Walk 180m under Neem canopy</p>
              <p className="text-[10px]">Hydration stop: RO dispenser opposite Library Gate</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Nearest Free AC Cooling Centers */}
      <Card className="bg-gray-950/90 border-gray-800">
        <CardHeader className="p-3 border-b border-gray-800">
          <CardTitle className="text-xs font-bold text-white flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Building2 className="h-4 w-4 text-sky-400" />
              Nearest Free Cooling Shelters
            </span>
            <Link href="/citizen" className="text-[10px] text-sky-400 hover:underline">
              View All →
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 space-y-2 text-xs">
          {[
            {
              name: `${selectedCity.name} Central Public Library AC Hall`,
              dist: '0.8 km',
              amenities: 'AC · RO Water · Seating',
            },
            {
              name: 'Metro Transit Hub Shaded Multi-Modal Lounge',
              dist: '1.4 km',
              amenities: 'Misting Fans · Hydration Kiosk',
            },
          ].map((c, i) => (
            <div
              key={i}
              className="p-2 rounded-lg bg-gray-900/60 border border-gray-800 flex items-center justify-between"
            >
              <div>
                <p className="font-semibold text-white text-[11px]">{c.name}</p>
                <p className="text-[10px] text-gray-400">{c.dist} away · {c.amenities}</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => showToast(`📍 Directions to ${c.name} mapped`, 'info')}
                className="text-[10px] h-6 px-2 border-gray-700 text-sky-300 hover:bg-sky-950/40"
              >
                Directions
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Fast 1-Click Hotspot Report */}
      <Card className="bg-gray-950/90 border-gray-800">
        <CardHeader className="p-3 border-b border-gray-800">
          <CardTitle className="text-xs font-bold text-white flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-red-400" />
            Report Overheating Street in My Area
          </CardTitle>
          <CardDescription className="text-[10px] text-gray-400">
            Submit unshaded pavement or broken water dispenser to MCD Taskforce.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3">
          <form onSubmit={handleQuickReport} className="flex gap-2">
            <input
              type="text"
              required
              placeholder="e.g. Street 4, Lajpat Nagar"
              value={quickStreet}
              onChange={(e) => setQuickStreet(e.target.value)}
              className="flex-1 bg-gray-900 border border-gray-700 rounded px-2.5 py-1.5 text-white text-[11px] focus:outline-none focus:border-emerald-500"
            />
            <Button
              type="submit"
              size="sm"
              className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 font-semibold h-8 cursor-pointer"
            >
              Submit Report
            </Button>
          </form>
          {quickReportSent && (
            <p className="text-[10px] text-emerald-400 mt-2 font-semibold">
              ✓ Logged! Transmitted to Ward Climate Inspector.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Daily Sun & Hydration Checklist */}
      <Card className="bg-gray-950/90 border-gray-800">
        <CardHeader className="p-3 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xs font-bold text-white flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              Daily Citizen Heat Checklist
            </CardTitle>
            <span className="text-[10px] font-bold text-emerald-400">
              {Object.values(checklist).filter(Boolean).length}/4 Done
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-3 space-y-1.5">
          {[
            { key: 'water' as const, label: 'Drink 3+ Litres of Water' },
            { key: 'cotton' as const, label: 'Wear Light Cotton Clothing' },
            { key: 'seniors' as const, label: 'Check on Elderly Neighbors' },
            { key: 'animals' as const, label: 'Water Bowl Outside for Birds' },
          ].map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => toggleChecklist(item.key)}
              className="w-full flex items-center gap-2 p-1.5 rounded hover:bg-gray-900/60 text-left transition-colors cursor-pointer"
            >
              {checklist[item.key] ? (
                <CheckSquare className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              ) : (
                <Square className="h-3.5 w-3.5 text-gray-500 shrink-0" />
              )}
              <span
                className={`text-[11px] ${
                  checklist[item.key] ? 'line-through text-gray-400' : 'text-gray-200'
                }`}
              >
                {item.label}
              </span>
            </button>
          ))}
        </CardContent>
      </Card>

      {/* Volunteer Weekend Drive */}
      <div className="p-3 rounded-xl bg-gray-900/80 border border-gray-800 flex items-center justify-between text-xs">
        <div>
          <span className="font-bold text-white block text-[11px]">🌳 Weekend Urban Forest Plantation</span>
          <span className="text-gray-400 text-[10px]">This Saturday · Ward 14 · 48 volunteers</span>
        </div>
        <Button
          size="sm"
          onClick={() => {
            const next = !volunteerRegistered;
            setVolunteerRegistered(next);
            showToast(
              next ? '🌱 Registered for Saturday Tree Plantation!' : 'Unregistered from drive',
              next ? 'success' : 'info',
            );
          }}
          className={`text-[10px] h-7 px-3 font-semibold cursor-pointer ${
            volunteerRegistered
              ? 'bg-emerald-600 text-white'
              : 'bg-gray-800 hover:bg-gray-700 text-gray-200'
          }`}
        >
          {volunteerRegistered ? '✓ Registered' : 'Join Drive'}
        </Button>
      </div>
    </div>
  );
}
