'use client';

import { Building2, CheckCircle2, ChevronRight, Shield, Sparkles, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Footer from '@/components/layout/Footer';
import { useDashboardStore } from '@/lib/store';
import type { UserRole } from '@/types';
import dashboardImage from './dashboard/verdantimage.png';

export default function LandingPage() {
  const router = useRouter();
  const { setUserRole, setUserProfile, setIsAuthenticated } = useDashboardStore();

  const handleEnterPlatform = (role: UserRole) => {
    setUserRole(role);
    if (role === 'government') {
      setUserProfile({
        name: 'Dr. Rajesh Verma',
        email: 'r.verma@mcd.gov.in',
        role: 'government',
        organization: 'Municipal Corporation of Delhi (MCD)',
        department: 'Urban Resilience Cell',
        verified: true,
      });
    } else if (role === 'citizen') {
      setUserProfile({
        name: 'Priya Sundaram',
        email: 'priya.s@gmail.com',
        role: 'citizen',
        organization: 'Citizen Community Action Group',
        department: 'Ward 24 Residents',
        verified: true,
      });
    } else {
      setUserProfile({
        name: 'Prof. A. Sengupta',
        email: 'asengupta@iitd.ac.in',
        role: 'researcher',
        organization: 'Center for Atmospheric Sciences, IIT Delhi',
        department: 'Climate Telemetry Lab',
        verified: true,
      });
    }
    setIsAuthenticated(true);
    router.push('/dashboard');
  };

  return (
    <div className="relative min-h-screen overflow-x-clip flex flex-col mb-0 bg-[#ecefe8]">
      {/* Background Map */}
      <div className="fixed inset-0 -z-10">
        <Image src="/MAP BG.svg" alt="" fill className="object-cover opacity-80" />
      </div>

      {/* Header */}
      <header className="sticky top-0 left-0 right-0 h-[64px] bg-[#1f2b26]/95 backdrop-blur z-50 border-b border-white/10 shadow-lg">
        <div className="relative h-full flex items-center justify-between px-4 sm:px-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-alliance text-xl sm:text-2xl font-bold text-[#ecefe8] tracking-tight">Climora</span>
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Live Map</Link>
            <Link href="/analytics" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Analytics</Link>
            <Link href="/mitigation" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Mitigation</Link>
            <Link href="/reports" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Reports & HAP</Link>
            <Link href="/citizen" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Citizen Action</Link>
          </nav>

          <button
            type="button"
            onClick={() => handleEnterPlatform('government')}
            className="rounded-lg bg-emerald-400 hover:bg-emerald-300 text-gray-950 font-bold px-4 py-2 text-xs transition-all shadow-md hover:scale-105 active:scale-95"
          >
            Launch Platform →
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-[60px] sm:pt-[90px] lg:pt-[120px] pb-12">
        {/* Decorative Green Blobs */}
        <div className="hidden lg:block absolute right-[-13px] top-[167px] w-[500px] h-[500px] z-0 pointer-events-none opacity-90">
          <Image
            src="/images/landing/dark-green-1.svg"
            alt=""
            width={500}
            height={500}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Hero Text */}
        <div className="relative z-10 px-4 sm:px-8 lg:px-[60px]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1f2b26]/10 border border-[#1f2b26]/20 mb-4 sm:mb-6">
            <Sparkles className="h-3.5 w-3.5 text-[#1f2b26]" />
            <span className="text-xs font-semibold text-[#1f2b26] tracking-tight uppercase">
              Urban Heat Island Intelligence Platform · Indian Cities
            </span>
          </div>

          <h1 className="font-alliance text-[2.5rem] sm:text-6xl md:text-7xl lg:text-[105px] leading-[1.08] text-[#1f2b26] tracking-tight lg:tracking-[-4.5px] max-w-full lg:w-[1100px]">
            <p className="mb-0">the new</p>
            <p className="mb-0 text-[#010103] font-extrabold">blueprint</p>
            <p className="mb-0">for a climate</p>
            <p className="mb-0">resilient city.</p>
          </h1>

          {/* Platform Access Gate - Government vs Citizen vs Researcher */}
          <div className="mt-10 sm:mt-14 max-w-5xl">
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1f2b26] bg-[#c0ffbd] px-2.5 py-1 rounded inline-block">
                Select Your Access Role to Enter
              </span>
              <p className="text-sm text-gray-700 mt-1 font-medium">
                Choose your identity to enter Climora with tailored tools, permissions, and dashboards:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Government Portal Card */}
              <div className="bg-[#1f2b26] text-white rounded-2xl p-6 border-2 border-[#1f2b26] hover:border-emerald-400 transition-all shadow-xl hover:-translate-y-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
                      <Building2 className="h-6 w-6" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Official Tier
                    </span>
                  </div>
                  <h3 className="font-alliance text-xl font-bold text-white mb-1">
                    Municipal Authority & Urban Planners
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed mb-4">
                    For MCD, BBMP, Town Planning Authorities, and Disaster Management Cells (SDMA).
                  </p>
                  <ul className="text-xs text-gray-400 space-y-1.5 mb-6">
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
                      Ward Project Rollout Approvals
                    </li>
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => handleEnterPlatform('government')}
                  className="w-full bg-emerald-400 hover:bg-emerald-300 text-gray-950 font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  Enter as Municipal Authority
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* Citizen Portal Card */}
              <div className="bg-white text-gray-950 rounded-2xl p-6 border-2 border-gray-300 hover:border-sky-500 transition-all shadow-xl hover:-translate-y-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-sky-100 text-sky-600">
                      <Users className="h-6 w-6" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-sky-100 text-sky-700 border border-sky-300">
                      Public Tier
                    </span>
                  </div>
                  <h3 className="font-alliance text-xl font-bold text-gray-950 mb-1">
                    Citizens & Community Action
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed mb-4">
                    For residents, community advocates, and environmental volunteer taskforces.
                  </p>
                  <ul className="text-xs text-gray-600 space-y-1.5 mb-6">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-sky-600 shrink-0" />
                      Report Local Heat Hotspots & No-Shade Zones
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-sky-600 shrink-0" />
                      Find Nearest Air-Conditioned Cooling Shelters
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-sky-600 shrink-0" />
                      Volunteer for Urban Tree-Planting Drives
                    </li>
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => handleEnterPlatform('citizen')}
                  className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  Enter as Citizen
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* Researcher Portal Card */}
              <div className="bg-white text-gray-950 rounded-2xl p-6 border-2 border-gray-300 hover:border-purple-500 transition-all shadow-xl hover:-translate-y-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-purple-100 text-purple-600">
                      <Shield className="h-6 w-6" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-purple-100 text-purple-700 border border-purple-300">
                      Academic Tier
                    </span>
                  </div>
                  <h3 className="font-alliance text-xl font-bold text-gray-950 mb-1">
                    Climate Scientists & Researchers
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed mb-4">
                    For atmospheric research labs, IIT/IISc scholars, and meteorologists.
                  </p>
                  <ul className="text-xs text-gray-600 space-y-1.5 mb-6">
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
                  onClick={() => handleEnterPlatform('researcher')}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  Enter as Researcher
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="relative pb-10 sm:pb-16 lg:pb-20 pt-8 border-t border-gray-300/80">
        <div className="px-4 sm:px-8 lg:px-[57px]">
          <div className="flex items-start gap-3 sm:gap-4 mb-6 sm:mb-8">
            <p className="font-alliance text-4xl sm:text-6xl md:text-7xl lg:text-[96px] leading-[1.2] text-[#1f2b26] tracking-tight lg:tracking-[-4px]">
              live platform preview
            </p>
          </div>
        </div>

        {/* Dashboard Image */}
        <div className="relative w-full max-w-[1141px] aspect-[1141/412] rounded-xl sm:rounded-2xl lg:rounded-[25px] overflow-hidden mb-4 mx-auto px-4 sm:px-8 lg:px-0 shadow-2xl">
          <Image
            src={dashboardImage}
            alt="Climora Dashboard - Indian cities"
            fill
            className="object-cover"
          />
        </div>

        {/* Caption */}
        <div className="px-4 sm:px-8 lg:px-[57px] max-w-[1101px] mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-2">
          <div className="font-alliance text-sm sm:text-base leading-relaxed text-black">
            <p className="font-bold">Climora GIS Heat Intelligence · Indian Metropolitan Coverage →</p>
            <p className="text-gray-600">Active monitoring across Delhi, Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata, and 50+ Smart Cities.</p>
          </div>
          <Link
            href="/dashboard"
            className="px-5 py-2.5 bg-[#1f2b26] hover:bg-black text-white font-bold rounded-xl text-xs transition-all shadow-md shrink-0"
          >
            Open Interactive Live Map →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
