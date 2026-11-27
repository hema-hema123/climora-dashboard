'use client';

import {
  AlertTriangle,
  Calendar,
  CheckCircle2,
  CheckSquare,
  Compass,
  Droplet,
  Footprints,
  HeartHandshake,
  MapPin,
  Send,
  ShieldCheck,
  Sparkles,
  Square,
  Sun,
  ThermometerSnowflake,
  Trees,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useDashboardStore } from '@/lib/store';

export default function CitizenPage() {
  const { selectedCity, showToast } = useDashboardStore();

  const [reportLocation, setReportLocation] = useState('');
  const [reportType, setReportType] = useState('no_shade');
  const [reportNotes, setReportNotes] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);
  const [joinedDrives, setJoinedDrives] = useState<string[]>([]);

  // Optimistic Citizen Tracked Reports
  const [userReports, setUserReports] = useState([
    {
      id: 'CLR-4821',
      location: 'Dwarka Sector 12 Metro Walkway',
      type: 'Missing Shade & Barren Asphalt',
      status: 'Scheduled for Tree Planting',
      date: 'Yesterday, 2:15 PM',
      officer: 'S. Sharma (MCD Zone 4)',
    },
    {
      id: 'CLR-3790',
      location: 'Lajpat Nagar Central Bus Terminal',
      type: 'Broken Drinking Water Dispenser',
      status: 'Repaired & Operational',
      date: '3 days ago',
      officer: 'R. K. Gupta (Delhi Jal Board)',
    },
  ]);

  // Interactive Checklist State
  const [checklist, setChecklist] = useState({
    hydration: true,
    clothing: false,
    checkSeniors: false,
    waterAnimals: true,
  });

  // Interactive Shaded Walk Navigator State
  const [routeFrom, setRouteFrom] = useState('Metro Station Exit 3');
  const [routeTo, setRouteTo] = useState('Central Community Market');
  const [activeRoute, setActiveRoute] = useState<'shaded' | 'direct'>('shaded');
  const [routeStarted, setRouteStarted] = useState(false);

  const toggleChecklistItem = (key: keyof typeof checklist) => {
    const newState = !checklist[key];
    setChecklist((prev) => ({ ...prev, [key]: newState }));
    if (newState) {
      showToast('✓ Great job! Safety checklist item completed.', 'success');
    }
  };

  const completedCount = Object.values(checklist).filter(Boolean).length;

  const coolingCenters = [
    {
      name: `${selectedCity.name} Central Public Library & Community AC Center`,
      distance: '0.8 km away',
      address: 'Sector 6, Community Complex',
      amenities: ['Air Conditioning', 'Free RO Drinking Water', 'First Aid Station'],
      openUntil: 'Open until 8:00 PM',
    },
    {
      name: 'District Multi-Modal Metro Transit Hub Shaded Lounge',
      distance: '1.4 km away',
      address: 'Main Arterial Interchange',
      amenities: ['Misting Water Cannons', 'Shaded Seating', 'Hydration Kiosk'],
      openUntil: 'Open 24/7',
    },
    {
      name: 'Indira Smriti Shaded Biodiversity Park & Lake Buffer',
      distance: '2.1 km away',
      address: 'Green Corridor Gate 3',
      amenities: ['Dense Tree Canopy (-3.5°C Cooler)', 'Drinking Water Fountains'],
      openUntil: 'Open until 7:30 PM',
    },
  ];

  const volunteerDrives = [
    {
      id: 'drive-1',
      title: `${selectedCity.name} Urban Miyawaki Forest Plantation`,
      date: 'This Saturday · 7:00 AM - 10:30 AM',
      location: 'Ward 14 Reclamation Zone',
      volunteersCount: 48,
      targetTrees: 500,
    },
    {
      id: 'drive-2',
      title: 'Community White Roof & High-Albedo Coating Drive',
      date: 'Sunday · 8:00 AM - 12:00 PM',
      location: 'Public Primary School & Anganwadi Complex',
      volunteersCount: 26,
      targetTrees: 120,
    },
  ];

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportLocation.trim()) return;

    const newTicketId = `CLR-${Math.floor(1000 + Math.random() * 9000)}`;
    const newReport = {
      id: newTicketId,
      location: reportLocation,
      type:
        reportType === 'no_shade'
          ? 'No Tree Shade / Barren Asphalt'
          : reportType === 'missing_shelter'
            ? 'Missing Bus Stop Canopy'
            : reportType === 'water_needed'
              ? 'Broken Drinking Water Dispenser'
              : 'Loss of Canopy',
      status: 'Transmitted to Municipal Green Taskforce',
      date: 'Just now',
      officer: 'Assigned to Ward Climate Inspector',
    };

    setUserReports([newReport, ...userReports]);
    setSubmittedMessage(
      `✓ Thank you! Your report for "${reportLocation}" has been logged and transmitted to the Municipal Climate Resilience Cell. Ticket: #${newTicketId}`,
    );
    showToast(`📋 Report #${newTicketId} logged with Municipal Climate Cell!`, 'success');
    setReportLocation('');
    setReportNotes('');
    setTimeout(() => setSubmittedMessage(null), 6000);
  };

  const handleToggleJoinDrive = (id: string, title: string) => {
    if (joinedDrives.includes(id)) {
      setJoinedDrives(joinedDrives.filter((d) => d !== id));
      showToast(`Unregistered from ${title}`, 'info');
    } else {
      setJoinedDrives([...joinedDrives, id]);
      showToast(`🌱 You are registered for ${title}!`, 'success');
    }
  };

  return (
    <DashboardShell>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full text-gray-100">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="rounded-full bg-sky-500/20 px-2.5 py-0.5 text-xs font-semibold text-sky-400 border border-sky-500/30">
                Citizen Climate Action Hub
              </span>
              <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/30">
                Community Resilience
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-alliance">
              Citizen Heat Protection & Community Action
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Find cooling shelters, join tree-planting drives, and report severe urban heat corridors in{' '}
              <span className="text-emerald-400 font-semibold">{selectedCity.name}</span>.
            </p>
          </div>
        </div>

        {/* Live Heat Advisory Alert Banner */}
        <div className="rounded-xl p-4 sm:p-5 bg-gradient-to-r from-amber-950/40 via-gray-950 to-orange-950/40 border border-amber-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="rounded-lg bg-amber-500/20 p-2.5 text-amber-400 shrink-0 mt-0.5">
              <Sun className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">
                Yellow Heat Advisory in Effect ({selectedCity.name})
              </h3>
              <p className="text-xs text-gray-300 mt-1 leading-relaxed max-w-2xl">
                Surface temperatures in industrial and dense residential sectors are projected to peak at{' '}
                <strong>43.5°C</strong>. Stay hydrated, drink minimum 3 litres of water, and utilize public cooling shelters between 12:00 PM and 3:30 PM.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold px-3 py-1 border border-amber-500/30">
              Peak Hours: 12 PM - 3:30 PM
            </span>
          </div>
        </div>

        {/* Grid Layout: Left Column (Report Form + Volunteer Drives) / Right Column (Cooling Shelters) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Interactive Shaded Walk Navigator */}
            <Card className="bg-gradient-to-br from-gray-950 via-gray-900 to-emerald-950/40 border border-emerald-500/40 shadow-xl overflow-hidden">
              <CardHeader className="border-b border-gray-800 pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                      <Footprints className="h-5 w-5 text-emerald-400" />
                      Pedestrian Shaded Walk Navigator
                    </CardTitle>
                    <CardDescription className="text-xs text-gray-400">
                      Find routes sheltered by tree canopies, covered colonnades, and free municipal water refill points.
                    </CardDescription>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Live Planner
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-gray-300 font-medium block mb-1">Starting Point</label>
                    <input
                      type="text"
                      value={routeFrom}
                      onChange={(e) => setRouteFrom(e.target.value)}
                      className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-1.5 text-white text-xs focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-gray-300 font-medium block mb-1">Destination</label>
                    <input
                      type="text"
                      value={routeTo}
                      onChange={(e) => setRouteTo(e.target.value)}
                      className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-1.5 text-white text-xs focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Route Option Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setActiveRoute('shaded')}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      activeRoute === 'shaded'
                        ? 'bg-emerald-950/80 border-emerald-400 ring-1 ring-emerald-400'
                        : 'bg-gray-900/60 border-gray-800 hover:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                        <Trees className="h-3.5 w-3.5" />
                        🌳 Shaded Green Route
                      </span>
                      <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">
                        -3.5°C Cooler
                      </span>
                    </div>
                    <p className="text-xs text-white font-semibold">12 mins · 850m</p>
                    <p className="text-[11px] text-gray-300 mt-1">
                      85% shaded by Neem & Peepal canopy · 💧 2 Free RO water fountains on path
                    </p>
                    <p className="text-[10px] text-emerald-400 font-bold mt-2">
                      {activeRoute === 'shaded' ? '✓ Recommended Safe Route Selected' : 'Click to Select'}
                    </p>
                  </div>

                  <div
                    onClick={() => setActiveRoute('direct')}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      activeRoute === 'direct'
                        ? 'bg-red-950/80 border-red-400 ring-1 ring-red-400'
                        : 'bg-gray-900/60 border-gray-800 hover:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-red-400 flex items-center gap-1">
                        <Sun className="h-3.5 w-3.5" />
                        ☀️ Exposed Asphalt Highway
                      </span>
                      <span className="text-[10px] font-bold bg-red-500/20 text-red-300 px-2 py-0.5 rounded">
                        Extreme 43.8°C
                      </span>
                    </div>
                    <p className="text-xs text-white font-semibold">10 mins · 750m</p>
                    <p className="text-[11px] text-gray-300 mt-1">
                      0% tree shade · High surface radiant heat · Heat exhaustion risk
                    </p>
                    <p className="text-[10px] text-red-400 font-bold mt-2">
                      {activeRoute === 'direct' ? '⚠ Unsafe Route Selected' : 'Click to Compare'}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                  <span className="text-xs text-gray-300">
                    {routeStarted
                      ? `🚶 Active Guided Walk: ${routeFrom} → ${routeTo} (-3.5°C cooler)`
                      : 'Choose your route above and start guided shaded walk.'}
                  </span>
                  <Button
                    size="sm"
                    onClick={() => {
                      const next = !routeStarted;
                      setRouteStarted(next);
                      if (next) {
                        showToast(`🚶 Shaded Walk Navigation active (-3.5°C cooler)`, 'success');
                      } else {
                        showToast('Navigation ended', 'info');
                      }
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-4 cursor-pointer"
                  >
                    {routeStarted ? 'End Navigation' : 'Start Shaded Walk →'}
                  </Button>
                </div>

                {/* Turn-by-turn guidance */}
                {routeStarted && (
                  <div className="mt-3 p-3.5 bg-emerald-950/70 border border-emerald-500/50 rounded-xl space-y-2.5 text-xs animate-in fade-in">
                    <div className="flex items-center justify-between border-b border-emerald-900/60 pb-2">
                      <span className="font-bold text-white flex items-center gap-1.5">
                        <Footprints className="h-4 w-4 text-emerald-400" />
                        Live Shaded Navigation Steps ({routeFrom} → {routeTo})
                      </span>
                      <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">
                        Active Pedestrian Guidance
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                      <div className="bg-gray-950/60 p-2 rounded-lg border border-gray-800">
                        <p className="font-bold text-emerald-400">1. Depart {routeFrom}</p>
                        <p className="text-gray-300">Exit via Gate 3 · Enter covered pedestrian walkway (36.8°C)</p>
                      </div>
                      <div className="bg-gray-950/60 p-2 rounded-lg border border-gray-800">
                        <p className="font-bold text-emerald-400">2. Green Canopy Corridor</p>
                        <p className="text-gray-300">Walk 350m along Sector 6 Neem Tree Avenue (-3.5°C cool)</p>
                      </div>
                      <div className="bg-gray-950/60 p-2 rounded-lg border border-gray-800">
                        <p className="font-bold text-cyan-400">3. Hydration Refill Point</p>
                        <p className="text-gray-300">Free Municipal RO dispenser opposite Community Library</p>
                      </div>
                      <div className="bg-gray-950/60 p-2 rounded-lg border border-gray-800">
                        <p className="font-bold text-emerald-400">4. Arrive at {routeTo}</p>
                        <p className="text-gray-300">Enter shaded market colonnade with misting fans</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Daily Citizen Heat Action Checklist */}
            <Card className="bg-gray-950/80 border-gray-800">
              <CardHeader className="border-b border-gray-800/80 pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5 text-sky-400" />
                      Today&apos;s Citizen Heat Action Checklist
                    </CardTitle>
                    <CardDescription className="text-xs text-gray-400">
                      Simple actions to keep yourself, your family, and your neighborhood safe today.
                    </CardDescription>
                  </div>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                    {completedCount} / 4 Done
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-2.5">
                {[
                  {
                    key: 'hydration' as const,
                    title: 'Drink at least 3 Litres of Water',
                    desc: 'Hydrate continuously; avoid sugary drinks during peak afternoon hours.',
                  },
                  {
                    key: 'clothing' as const,
                    title: 'Wear Loose Light-Colored Cotton Clothes',
                    desc: 'Reflects heat and allows skin breathing.',
                  },
                  {
                    key: 'checkSeniors' as const,
                    title: 'Check on Elderly Family & Neighbors',
                    desc: 'Elderly bodies have harder times regulating sudden heat jumps.',
                  },
                  {
                    key: 'waterAnimals' as const,
                    title: 'Place a Bowl of Water for Birds & Community Animals',
                    desc: 'Keeps stray animals and urban wildlife alive through 43°C+ days.',
                  },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => toggleChecklistItem(item.key)}
                    className={`w-full p-2.5 rounded-lg border text-left flex items-start gap-3 transition-all cursor-pointer ${
                      checklist[item.key]
                        ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                        : 'bg-gray-900/40 border-gray-800 text-gray-300 hover:border-gray-700'
                    }`}
                  >
                    <span className="mt-0.5 text-emerald-400 shrink-0">
                      {checklist[item.key] ? (
                        <CheckSquare className="h-4 w-4" />
                      ) : (
                        <Square className="h-4 w-4 text-gray-500" />
                      )}
                    </span>
                    <div className="flex-1">
                      <p
                        className={`text-xs font-bold ${
                          checklist[item.key] ? 'line-through text-emerald-400' : 'text-white'
                        }`}
                      >
                        {item.title}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-0.5">{item.desc}</p>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Community Hotspot Report Form */}
            <Card className="bg-gray-950/80 border-gray-800">
              <CardHeader className="border-b border-gray-800/80 pb-3">
                <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-red-400" />
                  Report a Local Heat Hotspot or Lack of Shade
                </CardTitle>
                <CardDescription className="text-xs text-gray-400">
                  Are you experiencing intense unshaded streets, missing bus shelters, or fallen trees in your neighbourhood? Submit a report directly to the Municipal Green Taskforce.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                {submittedMessage && (
                  <div className="mb-4 p-3.5 bg-emerald-950/70 border border-emerald-500/50 rounded-lg flex items-center gap-2.5 text-emerald-300 text-xs">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>{submittedMessage}</span>
                  </div>
                )}

                <form onSubmit={handleSubmitReport} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-300 font-medium block mb-1">
                        Exact Location / Street / Ward *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Near Metro Pillar 124, Dwarka Sector 12"
                        value={reportLocation}
                        onChange={(e) => setReportLocation(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white text-xs focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="text-gray-300 font-medium block mb-1">
                        Issue Type *
                      </label>
                      <select
                        value={reportType}
                        onChange={(e) => setReportType(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white text-xs focus:outline-none focus:border-emerald-500"
                      >
                        <option value="no_shade">No Tree Shade / Barren Asphalt</option>
                        <option value="missing_shelter">Missing Bus Stop Canopy / Shelter</option>
                        <option value="water_needed">Broken / Missing Drinking Water Dispenser</option>
                        <option value="tree_cut">Unauthorized Tree Felling / Loss of Canopy</option>
                        <option value="other">Extreme Trapped Heat in Public Area</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-300 font-medium block mb-1">
                      Observation Details & Impact on Pedestrians
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Describe pedestrian conditions, elderly residents impacted, or proposed locations for saplings..."
                      value={reportNotes}
                      onChange={(e) => setReportNotes(e.target.value)}
                      className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white text-xs focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <Send className="h-3.5 w-3.5" />
                      Submit Citizen Heat Report
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Real-time Tracked Citizen Reports Feed */}
            <Card className="bg-gray-950/80 border-gray-800">
              <CardHeader className="border-b border-gray-800/80 pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5 text-emerald-400" />
                      My Tracked Community Reports & Resolution Status
                    </CardTitle>
                    <CardDescription className="text-xs text-gray-400">
                      Live status of your submitted heat hotspot and tree canopy requests.
                    </CardDescription>
                  </div>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                    {userReports.length} Active Tickets
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-3">
                {userReports.map((report) => (
                  <div
                    key={report.id}
                    className="p-3.5 rounded-lg bg-gray-900/60 border border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono font-bold text-emerald-400">#{report.id}</span>
                        <span className="text-gray-400">•</span>
                        <span className="font-semibold text-white">{report.location}</span>
                      </div>
                      <p className="text-gray-400 text-[11px]">{report.type}</p>
                      <p className="text-gray-500 text-[10px] mt-1">Logged: {report.date} · {report.officer}</p>
                    </div>
                    <div className="shrink-0">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {report.status}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Volunteer Planting Drives */}
            <Card className="bg-gray-950/80 border-gray-800">
              <CardHeader className="border-b border-gray-800/80 pb-3">
                <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                  <HeartHandshake className="h-5 w-5 text-emerald-400" />
                  Upcoming Community Tree-Planting & Green Drives
                </CardTitle>
                <CardDescription className="text-xs text-gray-400">
                  Join fellow citizens and local NGOs in expanding urban shade canopy across {selectedCity.name}.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4 space-y-3">
                {volunteerDrives.map((drive) => {
                  const isJoined = joinedDrives.includes(drive.id);
                  return (
                    <div
                      key={drive.id}
                      className="p-4 rounded-lg bg-gray-900/60 border border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                    >
                      <div>
                        <h4 className="font-bold text-white text-sm">{drive.title}</h4>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 mt-1">
                          <span className="flex items-center gap-1 text-emerald-400">
                            <Calendar className="h-3.5 w-3.5" /> {drive.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" /> {drive.location}
                          </span>
                          <span className="flex items-center gap-1 text-sky-400">
                            <Users className="h-3.5 w-3.5" /> {drive.volunteersCount + (isJoined ? 1 : 0)} Volunteers Joined
                          </span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleToggleJoinDrive(drive.id, drive.title)}
                        className={`text-xs font-semibold shrink-0 cursor-pointer ${
                          isJoined
                            ? 'bg-emerald-600 text-white'
                            : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
                        }`}
                      >
                        {isJoined ? '✓ Registered' : 'Join Volunteer Drive'}
                      </Button>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Nearest Cooling Shelters & Public Centers */}
          <div className="space-y-6">
            <Card className="bg-gray-950/80 border-gray-800">
              <CardHeader className="border-b border-gray-800/80 pb-3">
                <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                  <Droplet className="h-4 w-4 text-sky-400" />
                  Nearest Cooling Shelters & Water Kiosks
                </CardTitle>
                <CardDescription className="text-xs text-gray-400">
                  Municipal designated heat relief spots near {selectedCity.name} center.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4 space-y-3.5">
                {coolingCenters.map((center, index) => (
                  <div
                    key={index}
                    className="p-3.5 rounded-lg bg-gray-900/50 border border-gray-800/90 space-y-1.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-semibold text-white text-xs">{center.name}</h4>
                      <span className="text-[10px] font-bold text-emerald-400 shrink-0 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        {center.distance}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-400">{center.address}</p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {center.amenities.map((item, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] bg-gray-800/80 text-gray-300 px-2 py-0.5 rounded"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                    <p className="text-[10px] text-sky-400 font-medium pt-0.5">{center.openUntil}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Practical Heat Safety Rules */}
            <Card className="bg-gradient-to-br from-gray-950 to-sky-950/30 border-sky-900/40">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-sky-400" />
                  Daily Heat Safety Checklist
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-gray-300 space-y-2">
                <p>💧 <strong>Hydration:</strong> Drink water or electrolytes every 30 minutes, even if not thirsty.</p>
                <p>👕 <strong>Clothing:</strong> Wear light-colored, loose cotton clothing and wide-brim hats.</p>
                <p>👵 <strong>Vulnerable Care:</strong> Regularly check on elderly relatives and keep children indoors during peak heat.</p>
                <p>🐾 <strong>Animal Welfare:</strong> Place water bowls outdoors for community birds and street animals.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
