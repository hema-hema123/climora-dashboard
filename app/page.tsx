'use client';

import {
  Building2,
  CheckCircle2,
  ChevronRight,
  Droplets,
  Flame,
  RefreshCw,
  Shield,
  Sparkles,
  ThermometerSnowflake,
  Trees,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AuthModal } from '@/components/auth/AuthModal';
import Footer from '@/components/layout/Footer';
import { useDashboardStore } from '@/lib/store';
import type { UserRole } from '@/types';
import dashboardImage from './dashboard/verdantimage.png';

export default function LandingPage() {
  const router = useRouter();
  const { userProfile, isAuthenticated, showToast } = useDashboardStore();

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authRole, setAuthRole] = useState<UserRole>('government');

  // Interactive Front-Page Sandbox
  const [sandboxTrees, setSandboxTrees] = useState(false);
  const [sandboxRoofs, setSandboxRoofs] = useState(false);
  const [sandboxMisting, setSandboxMisting] = useState(false);

  const baseTemp = 43.9;
  const coolingOffset =
    (sandboxTrees ? 0.8 : 0) + (sandboxRoofs ? 0.6 : 0) + (sandboxMisting ? 0.5 : 0);
  const currentTemp = (baseTemp - coolingOffset).toFixed(1);
  const citizensSaved = Math.round(coolingOffset * 85000);

  const handleOpenAuth = (role: UserRole) => {
    setAuthRole(role);
    setAuthModalOpen(true);
  };

  return (
    <div className="relative min-h-screen overflow-x-clip flex flex-col mb-0 bg-[#ecefe8] font-alliance">
      {/* Background Map */}
      <div className="fixed inset-0 -z-10">
        <Image src="/MAP BG.svg" alt="" fill className="object-cover opacity-80" />
      </div>

      {/* Header */}
      <header className="sticky top-0 left-0 right-0 h-[60px] bg-[#1f2b26]/95 backdrop-blur z-50 border-b border-white/10 shadow-lg">
        <div className="relative h-full flex items-center justify-between px-4 sm:px-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-alliance text-xl sm:text-2xl font-bold text-[#ecefe8] tracking-tight">Climora</span>
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          </Link>

          <nav className="hidden md:flex items-center gap-5">
            <Link href="/dashboard" className="text-xs font-semibold text-gray-300 hover:text-white transition-colors">Live Map</Link>
            <Link href="/analytics" className="text-xs font-semibold text-gray-300 hover:text-white transition-colors">Analytics</Link>
            <Link href="/mitigation" className="text-xs font-semibold text-gray-300 hover:text-white transition-colors">Mitigation</Link>
            <Link href="/reports" className="text-xs font-semibold text-gray-300 hover:text-white transition-colors">Reports & HAP</Link>
            <Link href="/citizen" className="text-xs font-semibold text-gray-300 hover:text-white transition-colors">Citizen Action</Link>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleOpenAuth('citizen')}
              className="hidden sm:inline-flex rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium px-3 py-1.5 text-xs transition-all border border-white/20 cursor-pointer"
            >
              👥 Citizen Portal
            </button>
            <button
              type="button"
              onClick={() => handleOpenAuth('government')}
              className="rounded-lg bg-emerald-400 hover:bg-emerald-300 text-gray-950 font-bold px-3.5 py-1.5 text-xs transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer"
            >
              Launch Platform →
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section - Compact padding */}
      <section className="relative pt-6 sm:pt-8 lg:pt-10 pb-8">
        {/* Decorative Green Blobs */}
        <div className="hidden lg:block absolute right-[-13px] top-[140px] w-[450px] h-[450px] z-0 pointer-events-none opacity-90">
          <Image
            src="/images/landing/dark-green-1.svg"
            alt=""
            width={450}
            height={450}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Hero Text */}
        <div className="relative z-10 px-4 sm:px-8 lg:px-[60px]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1f2b26]/10 border border-[#1f2b26]/20 mb-3 sm:mb-4">
            <Sparkles className="h-3.5 w-3.5 text-[#1f2b26]" />
            <span className="text-[11px] font-bold text-[#1f2b26] tracking-tight uppercase">
              Urban Heat Island Intelligence Platform · Indian Cities
            </span>
          </div>

          <h1 className="font-alliance text-3xl sm:text-5xl md:text-6xl lg:text-[84px] leading-[1.04] text-[#1f2b26] tracking-tight lg:tracking-[-3px] max-w-full lg:w-[1050px]">
            <span className="block">the new <span className="text-[#010103] font-extrabold">blueprint</span></span>
            <span className="block text-gray-900">for a climate resilient city.</span>
          </h1>

          {/* Platform Access Gate - Government vs Citizen vs Researcher */}
          <div className="mt-6 sm:mt-8 max-w-5xl">
            <div className="mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1f2b26] bg-[#c0ffbd] px-2.5 py-0.5 rounded inline-block">
                Select Your Access Role to Enter
              </span>
              <p className="text-xs text-gray-700 mt-1 font-medium">
                Choose your role to load custom dashboard controls, live satellite layers, and action plans:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {/* Government Portal Card */}
              <div className="bg-[#1f2b26] text-white rounded-2xl p-4 sm:p-5 border-2 border-[#1f2b26] hover:border-emerald-400 transition-all shadow-xl hover:-translate-y-0.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Official Tier
                    </span>
                  </div>
                  <h3 className="font-alliance text-lg font-bold text-white mb-1">
                    Municipal Authority & Urban Planners
                  </h3>
                  <p className="text-[11px] text-gray-300 leading-relaxed mb-3">
                    For MCD, BBMP, Town Planning Authorities, and Disaster Management Cells (SDMA).
                  </p>
                  <ul className="text-[11px] text-gray-400 space-y-1 mb-4">
                    <li className="flex items-center gap-1.5 text-gray-300">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      Statutory Heat Action Plan (HAP) Dossiers
                    </li>
                    <li className="flex items-center gap-1.5 text-gray-300">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      Municipal Budget Simulation (₹ Cr)
                    </li>
                    <li className="flex items-center gap-1.5 text-gray-300">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      Ward Project Rollout Sanctions
                    </li>
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenAuth('government')}
                  className="w-full bg-emerald-400 hover:bg-emerald-300 text-gray-950 font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
                >
                  Verify & Enter as Municipal Authority
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Citizen Portal Card */}
              <div className="bg-white text-gray-950 rounded-2xl p-4 sm:p-5 border-2 border-gray-300 hover:border-sky-500 transition-all shadow-xl hover:-translate-y-0.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="p-2 rounded-xl bg-sky-100 text-sky-600">
                      <Users className="h-5 w-5" />
                    </div>
                    <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-sky-100 text-sky-700 border border-sky-300">
                      Public Tier
                    </span>
                  </div>
                  <h3 className="font-alliance text-lg font-bold text-gray-950 mb-1">
                    Citizens & Community Action
                  </h3>
                  <p className="text-[11px] text-gray-600 leading-relaxed mb-3">
                    For residents, community advocates, and environmental volunteer taskforces.
                  </p>
                  <ul className="text-[11px] text-gray-600 space-y-1 mb-4">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-sky-600 shrink-0" />
                      Shaded Walk Navigator & Cool Routes
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-sky-600 shrink-0" />
                      Find Nearest AC Municipal Shelters
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-sky-600 shrink-0" />
                      1-Click Hotspot & Shade Reporting
                    </li>
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenAuth('citizen')}
                  className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
                >
                  Verify & Enter as Citizen
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Researcher Portal Card */}
              <div className="bg-white text-gray-950 rounded-2xl p-4 sm:p-5 border-2 border-gray-300 hover:border-purple-500 transition-all shadow-xl hover:-translate-y-0.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="p-2 rounded-xl bg-purple-100 text-purple-600">
                      <Shield className="h-5 w-5" />
                    </div>
                    <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-purple-100 text-purple-700 border border-purple-300">
                      Academic Tier
                    </span>
                  </div>
                  <h3 className="font-alliance text-lg font-bold text-gray-950 mb-1">
                    Climate Scientists & Researchers
                  </h3>
                  <p className="text-[11px] text-gray-600 leading-relaxed mb-3">
                    For atmospheric research labs, IIT/IISc scholars, and meteorologists.
                  </p>
                  <ul className="text-[11px] text-gray-600 space-y-1 mb-4">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-purple-600 shrink-0" />
                      NASA POWER Telemetry Observations
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-purple-600 shrink-0" />
                      Sentinel-2 NDVI Vegetation Indices
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-purple-600 shrink-0" />
                      Raw Microclimate Simulation Modeling
                    </li>
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenAuth('researcher')}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
                >
                  Verify & Enter as Researcher
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Interactive Live Cooling Sandbox */}
            <div className="mt-5 bg-[#1f2b26] text-white rounded-2xl p-4 sm:p-5 border border-emerald-500/30 shadow-2xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-gray-800 pb-3 mb-3">
                <div>
                  <span className="text-[10px] font-bold tracking-wider uppercase bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30 inline-block mb-1">
                    ⚡ 5-Second Cooling Sandbox
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    Try an Action Plan: Click below to simulate urban cooling in real-time
                  </h3>
                  <p className="text-xs text-gray-300">
                    See how quick, actionable interventions immediately lower peak ground heat for Delhi:
                  </p>
                </div>

                <div className="flex items-center gap-3 bg-gray-950/80 px-3.5 py-2 rounded-xl border border-gray-800 shrink-0">
                  <div className="text-right">
                    <span className="text-[9px] uppercase font-bold text-gray-400 block">Delhi Surface Heat</span>
                    <span className={`text-xl sm:text-2xl font-black tabular-nums ${
                      coolingOffset > 0 ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {currentTemp}°C
                    </span>
                  </div>
                  {coolingOffset > 0 && (
                    <div className="border-l border-gray-800 pl-3">
                      <span className="text-[9px] uppercase font-bold text-emerald-400 block">Cooling Drop</span>
                      <span className="text-lg sm:text-xl font-bold text-emerald-300">
                        -{coolingOffset.toFixed(1)}°C
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* 3 Simple Action Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setSandboxTrees(!sandboxTrees)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    sandboxTrees
                      ? 'bg-emerald-950/80 border-emerald-400 shadow-md shadow-emerald-950'
                      : 'bg-gray-900/60 border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="p-1 rounded-lg bg-emerald-500/20 text-emerald-400">
                      <Trees className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-xs font-bold text-emerald-400">-0.8°C</span>
                  </div>
                  <p className="text-xs font-bold text-white">1. Plant 1,200 Shade Trees</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Expands roadside canopy cover</p>
                  <span className="mt-1.5 inline-block text-[10px] font-semibold text-emerald-400">
                    {sandboxTrees ? '✓ Active in Plan' : '+ Tap to Add'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setSandboxRoofs(!sandboxRoofs)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    sandboxRoofs
                      ? 'bg-sky-950/80 border-sky-400 shadow-md shadow-sky-950'
                      : 'bg-gray-900/60 border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="p-1 rounded-lg bg-sky-500/20 text-sky-400">
                      <Building2 className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-xs font-bold text-sky-400">-0.6°C</span>
                  </div>
                  <p className="text-xs font-bold text-white">2. Solar-Reflective Cool Roofs</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Reflects 85% of rooftop heat</p>
                  <span className="mt-1.5 inline-block text-[10px] font-semibold text-sky-400">
                    {sandboxRoofs ? '✓ Active in Plan' : '+ Tap to Add'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setSandboxMisting(!sandboxMisting)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    sandboxMisting
                      ? 'bg-cyan-950/80 border-cyan-400 shadow-md shadow-cyan-950'
                      : 'bg-gray-900/60 border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="p-1 rounded-lg bg-cyan-500/20 text-cyan-400">
                      <Droplets className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-xs font-bold text-cyan-400">-0.5°C</span>
                  </div>
                  <p className="text-xs font-bold text-white">3. Water Misting Cannons</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Transit hub evaporative mist</p>
                  <span className="mt-1.5 inline-block text-[10px] font-semibold text-cyan-400">
                    {sandboxMisting ? '✓ Active in Plan' : '+ Tap to Add'}
                  </span>
                </button>
              </div>

              {/* Action Result Footer */}
              <div className="mt-3 pt-2.5 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs">
                <span className="text-gray-300">
                  {coolingOffset > 0 ? (
                    <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4" />
                      Simulated Impact: ~{citizensSaved.toLocaleString('en-IN')} residents protected from severe heat stroke!
                    </span>
                  ) : (
                    '👉 Select any intervention above to start the simulation'
                  )}
                </span>

                <button
                  type="button"
                  onClick={() => handleOpenAuth('government')}
                  className="bg-emerald-400 hover:bg-emerald-300 text-gray-950 font-bold px-3.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-all shadow-md shrink-0 cursor-pointer"
                >
                  Verify Credentials & Launch Full Platform
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section - Compact padding */}
      <section className="relative py-6 sm:py-8 border-t border-gray-300/80">
        <div className="px-4 sm:px-8 lg:px-[57px]">
          <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
            <p className="font-alliance text-3xl sm:text-5xl md:text-6xl lg:text-[72px] leading-[1.1] text-[#1f2b26] tracking-tight lg:tracking-[-2px]">
              live platform preview
            </p>
          </div>
        </div>

        {/* Dashboard Image */}
        <div className="relative w-full max-w-[1141px] aspect-[1141/412] rounded-xl sm:rounded-2xl lg:rounded-[20px] overflow-hidden mb-3 mx-auto px-4 sm:px-8 lg:px-0 shadow-2xl">
          <Image
            src={dashboardImage}
            alt="Climora Dashboard - Indian cities"
            fill
            className="object-cover"
          />
        </div>

        {/* Caption */}
        <div className="px-4 sm:px-8 lg:px-[57px] max-w-[1101px] mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-1">
          <div className="font-alliance text-xs sm:text-sm leading-relaxed text-black">
            <p className="font-bold">Climora GIS Heat Intelligence · Indian Metropolitan Coverage →</p>
            <p className="text-gray-600">Active monitoring across Delhi, Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata, and 50+ Smart Cities.</p>
          </div>
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-[#1f2b26] hover:bg-black text-white font-bold rounded-xl text-xs transition-all shadow-md shrink-0"
          >
            Open Interactive Live Map →
          </Link>
        </div>
      </section>

      <Footer />

      {/* Role Verification & Authentication Dialog */}
      <AuthModal
        open={authModalOpen}
        onOpenChange={setAuthModalOpen}
        defaultRole={authRole}
      />
    </div>
  );
}
