'use client';

import {
  BarChart3,
  Building2,
  CheckCircle2,
  ChevronDown,
  Download,
  FileImage,
  FileSpreadsheet,
  FileText,
  Info,
  KeyRound,
  Layers,
  Lock,
  LogOut,
  MapPin,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Shield,
  ShieldCheck,
  TreeDeciduous,
  Users,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { AuthModal } from '@/components/auth/AuthModal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  generateCityStats,
  generateHeatZones,
  generateRecommendations,
  INDIAN_CITIES,
} from '@/lib/data';
import { captureMapSnapshot } from '@/lib/snapshot';
import { useDashboardStore } from '@/lib/store';
import type { UserRole } from '@/types';
import { cn } from '@/lib/utils';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [cityQuery, setCityQuery] = useState('');
  const [citySearchOpen, setCitySearchOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authDefaultRole, setAuthDefaultRole] = useState<UserRole>('government');

  const {
    selectedCity,
    selectedDate,
    setSelectedCity,
    sidebarOpen,
    setSidebarOpen,
    desktopSidebarOpen,
    setDesktopSidebarOpen,
    userRole,
    setUserRole,
    userProfile,
    exitPortal,
    showToast,
  } = useDashboardStore();

  const matchingCities = useMemo(() => {
    const query = cityQuery.trim().toLocaleLowerCase();
    if (!query) return INDIAN_CITIES;
    return INDIAN_CITIES.filter((city) =>
      `${city.name} ${city.province}`.toLocaleLowerCase().includes(query),
    );
  }, [cityQuery]);

  const handleCityChange = (cityId: string) => {
    const city = INDIAN_CITIES.find((c) => c.id === cityId);
    if (city) {
      setSelectedCity(city);
      setCityQuery('');
      setCitySearchOpen(false);
      showToast(`📍 Platform centered on ${city.name}, ${city.province}`, 'info');
    }
  };

  const handleExport = async (format: 'csv' | 'json' | 'png') => {
    showToast(`Generating ${format.toUpperCase()} export...`, 'info');
    const stats = generateCityStats(selectedCity);
    const zones = generateHeatZones(selectedCity, selectedDate);
    const recommendations = generateRecommendations(selectedCity, selectedDate);

    if (format === 'csv') {
      const csvContent = [
        ['Heat Zone Report for', selectedCity.name, selectedCity.province].join(','),
        '',
        [
          'Zone Name',
          'Severity',
          'Avg Temperature',
          'Max Temperature',
          'Area (km²)',
          'Vulnerability Score',
        ].join(','),
        ...zones.map((z) =>
          [
            z.name,
            z.severity,
            z.avgTemperature.toFixed(1),
            z.maxTemperature.toFixed(1),
            z.area.toFixed(2),
            z.vulnerabilityScore.toFixed(0),
          ].join(','),
        ),
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      downloadBlob(blob, `climora-${selectedCity.id}-report.csv`);
    } else if (format === 'json') {
      const report = {
        city: selectedCity,
        stats,
        heatZones: zones,
        recommendations,
        generatedAt: new Date().toISOString(),
      };

      const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
      downloadBlob(blob, `climora-${selectedCity.id}-data.json`);
    } else if (format === 'png') {
      await captureMapSnapshot(selectedCity.id);
    }
  };

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const navLinks = [
    { href: '/dashboard', label: 'Live Map', icon: MapPin },
    { href: '/analytics', label: 'Analytics', icon: BarChart3 },
    { href: '/mitigation', label: 'Mitigation', icon: TreeDeciduous },
    { href: '/reports', label: 'Reports & HAP', icon: FileText },
    { href: '/citizen', label: 'Citizen Action', icon: Users },
  ];

  return (
    <>
      <header className="sticky top-0 z-[10000] flex h-16 items-center justify-between border-b border-gray-800 bg-gray-950/95 px-3 sm:px-4 backdrop-blur supports-[backdrop-filter]:bg-gray-950/80 w-full">
        {/* Left Side: Logo & Sidebar Toggles */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden text-gray-300 hover:text-white hover:bg-gray-800"
            aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {pathname === '/dashboard' && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDesktopSidebarOpen(!desktopSidebarOpen)}
              className="hidden lg:inline-flex text-gray-300 hover:text-white hover:bg-gray-800"
              aria-label={desktopSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
            >
              {desktopSidebarOpen ? (
                <PanelLeftClose className="h-5 w-5" />
              ) : (
                <PanelLeftOpen className="h-5 w-5" />
              )}
            </Button>
          )}

          <Link
            href="/"
            className="flex items-center gap-2.5 hover:opacity-85 transition-opacity cursor-pointer shrink-0"
          >
            <div className="relative h-9 w-9 shrink-0">
              <Image
                src="/favicons/LIGHT-GREEN-LOGO.svg"
                alt="Climora Logo"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <div className="hidden sm:block shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold text-white font-alliance tracking-tight">Climora</span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-[10px] text-gray-400 -mt-0.5">
                Urban Heat Island Intelligence
              </p>
            </div>
          </Link>
        </div>

        {/* Center: Multi-Page Navigation Bar */}
        <nav className="hidden lg:flex items-center gap-1 mx-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-500/20 text-emerald-400 font-semibold shadow-sm border border-emerald-500/30'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800/60'
                }`}
              >
                <link.icon className="h-3.5 w-3.5" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Side: City Search, Role Switcher Badge, Export */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Mobile Pages Dropdown */}
          <div className="lg:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 px-2 text-xs border-gray-700 bg-gray-900 text-gray-200">
                  <Layers className="h-3.5 w-3.5 mr-1" />
                  Pages
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-gray-900 border-gray-800 text-gray-200">
                {navLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild className="cursor-pointer">
                    <Link href={link.href} className="flex items-center gap-2">
                      <link.icon className="h-4 w-4" />
                      <span>{link.label}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* City Search Bar - Proportional responsive width */}
          <div className="relative w-[110px] sm:w-[140px] md:w-[160px] lg:w-[140px] xl:w-[180px] shrink-0">
            <Search
              className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400"
              aria-hidden="true"
            />
            <input
              id="city-search"
              type="search"
              placeholder={selectedCity.name}
              value={cityQuery}
              onFocus={() => setCitySearchOpen(true)}
              onBlur={() => setTimeout(() => setCitySearchOpen(false), 200)}
              onChange={(event) => {
                setCityQuery(event.target.value);
                setCitySearchOpen(true);
              }}
              className="h-9 w-full rounded-lg border border-gray-700 bg-gray-900 py-1.5 pl-8 pr-7 text-xs text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-alliance"
            />
            {cityQuery && (
              <button
                type="button"
                onClick={() => {
                  setCityQuery('');
                  setCitySearchOpen(true);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-gray-400 hover:text-gray-100 cursor-pointer"
              >
                <X className="h-3 w-3" />
              </button>
            )}
            {citySearchOpen && (
              <div
                role="listbox"
                className="absolute right-0 top-full z-50 mt-1 max-h-56 w-52 overflow-y-auto rounded-lg border border-gray-700 bg-gray-900 p-1 text-gray-100 shadow-2xl"
              >
                {matchingCities.length ? (
                  matchingCities.map((city) => (
                    <button
                      key={city.id}
                      type="button"
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => handleCityChange(city.id)}
                      className="flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-left text-xs hover:bg-gray-800 cursor-pointer"
                    >
                      <span className="font-medium">{city.name}</span>
                      <span className="text-[10px] text-gray-400">{city.province}</span>
                    </button>
                  ))
                ) : (
                  <div className="px-3 py-2 text-xs text-gray-400">No matching cities</div>
                )}
              </div>
            )}
          </div>

          {/* Role & Access Controller Dropdown - Cleanly Proportioned */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className={cn(
                  'h-9 px-2 sm:px-2.5 rounded-lg flex items-center gap-1.5 text-xs font-semibold border transition-all cursor-pointer shadow-sm shrink-0',
                  userRole === 'government'
                    ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50 hover:bg-emerald-900/80'
                    : userRole === 'citizen'
                      ? 'bg-sky-950/80 text-sky-300 border-sky-500/50 hover:bg-sky-900/80'
                      : 'bg-purple-950/80 text-purple-300 border-purple-500/50 hover:bg-purple-900/80',
                )}
                title="Current Portal Role & Identity"
              >
                {userRole === 'government' ? (
                  <Building2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                ) : userRole === 'citizen' ? (
                  <Users className="h-3.5 w-3.5 text-sky-400 shrink-0" />
                ) : (
                  <Shield className="h-3.5 w-3.5 text-purple-400 shrink-0" />
                )}

                <span className="font-bold text-white whitespace-nowrap text-[11px] sm:text-xs">
                  {userRole === 'government'
                    ? 'Govt'
                    : userRole === 'citizen'
                      ? 'Citizen'
                      : 'Research'}
                </span>

                {userProfile?.verified ? (
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" title="Verified Identity" />
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" title="Unverified" />
                )}

                <ChevronDown className="h-3 w-3 text-gray-400 shrink-0" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-64 bg-gray-950 border border-gray-800 text-gray-200 p-2 shadow-2xl font-alliance">
              <div className="px-2 py-1.5 border-b border-gray-800 mb-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Active Clearance
                  </span>
                  <span
                    className={cn(
                      'text-[9px] font-semibold px-1.5 py-0.5 rounded border',
                      userProfile?.verified
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : 'bg-amber-500/20 text-amber-300 border-amber-500/40',
                    )}
                  >
                    {userProfile?.verified ? 'Verified ✓' : 'Unverified'}
                  </span>
                </div>
                <p className="text-xs font-bold text-white mt-1 truncate">
                  {userProfile?.name || (userRole === 'government' ? 'Municipal Officer' : userRole === 'citizen' ? 'Citizen Resident' : 'Scholar')}
                </p>
                <p className="text-[10px] text-gray-400 truncate">
                  {userProfile?.organization || 'Municipal Authority'}
                </p>
                {userProfile?.officerId && (
                  <p className="text-[10px] text-emerald-400 font-mono mt-0.5">
                    ID: {userProfile.officerId}
                  </p>
                )}
              </div>

              {/* Locked Portal Session Info */}
              <div className="p-2 my-1.5 rounded-lg bg-gray-900 border border-gray-800 text-[11px] space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <Lock className="h-3.5 w-3.5 shrink-0" />
                  <span>Role Locked for Active Session</span>
                </div>
                <p className="text-[10px] text-gray-400 leading-relaxed">
                  Inside the platform, role switching is locked. To access a different portal, please exit to the front entrance.
                </p>
              </div>

              <DropdownMenuSeparator className="bg-gray-800 my-1" />

              <DropdownMenuItem
                onClick={() => {
                  exitPortal();
                  showToast('🚪 Exited portal session. Select your role to re-enter.', 'info');
                  router.push('/');
                }}
                className="cursor-pointer text-xs text-rose-400 hover:text-rose-300 font-semibold py-2 px-2.5 flex items-center gap-2 hover:bg-rose-950/40 rounded-md transition-colors"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Exit Portal to Switch Role (बाहर निकलें)</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-gray-800 my-1" />

              <DropdownMenuItem
                onClick={() => {
                  setAuthDefaultRole(userRole);
                  setAuthModalOpen(true);
                }}
                className="cursor-pointer text-xs text-emerald-400 hover:text-emerald-300 font-medium py-1.5 px-2 flex items-center gap-2"
              >
                <KeyRound className="h-3.5 w-3.5" />
                <span>Verify / Update Credentials</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Quick Export Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 border-gray-700 bg-gray-900 text-gray-200 hover:text-white hover:bg-gray-800"
              >
                <Download className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-gray-900 border-gray-800 text-gray-200">
              <DropdownMenuItem onClick={() => handleExport('csv')} className="cursor-pointer">
                <FileSpreadsheet className="mr-2 h-4 w-4 text-emerald-400" />
                <span>CSV Report</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('json')} className="cursor-pointer">
                <FileText className="mr-2 h-4 w-4 text-sky-400" />
                <span>JSON Data</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('png')} className="cursor-pointer">
                <FileImage className="mr-2 h-4 w-4 text-purple-400" />
                <span>Map Image (PNG)</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Info Tooltip */}
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-gray-400 hover:text-white hidden sm:flex"
                >
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                align="end"
                className="max-w-md p-5 text-xs bg-gray-900 border-gray-800 text-gray-100 shadow-xl"
              >
                <div className="space-y-3">
                  <h4 className="font-semibold text-white text-sm">Climora Heat Intelligence</h4>
                  <p className="text-gray-300 leading-relaxed">
                    A multi-page decision support system combining NASA telemetry, satellite land-use data, and predictive cooling models for Indian cities.
                  </p>
                  <div className="border-t border-gray-800 pt-2 text-[11px] text-gray-400 space-y-1">
                    <p>• <strong>Live Map:</strong> Spatial heat polygons & 3D building extrusions</p>
                    <p>• <strong>Analytics:</strong> Longitudinal urban-rural differential curves</p>
                    <p>• <strong>Mitigation:</strong> Municipal budget simulator & cooling impact</p>
                    <p>• <strong>Reports:</strong> Statutory Heat Action Plan (HAP) dossiers</p>
                    <p>• <strong>Citizen Action:</strong> Community hotspot reporting & cooling centers</p>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </header>

      {/* Mobile & Tablet Sub-Navbar for 1-Tap Page Switching */}
      <div className="lg:hidden flex items-center gap-2 px-3 py-2 bg-gray-950/95 border-b border-gray-800/80 overflow-x-auto no-scrollbar scroll-smooth w-full z-40 sticky top-16">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap shrink-0 transition-all ${
                isActive
                  ? 'bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/50 shadow-sm'
                  : 'text-gray-400 hover:text-white bg-gray-900 border border-gray-800'
              }`}
            >
              <link.icon className="h-3.5 w-3.5" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Role & Authentication Switcher Modal */}
      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} defaultRole={userRole} />
    </>
  );
}
