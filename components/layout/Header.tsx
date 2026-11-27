'use client';

import {
  BarChart3,
  Building2,
  Download,
  FileImage,
  FileSpreadsheet,
  FileText,
  Info,
  Layers,
  MapPin,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Shield,
  TreeDeciduous,
  Users,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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

export function Header() {
  const pathname = usePathname();
  const [cityQuery, setCityQuery] = useState('');
  const [citySearchOpen, setCitySearchOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const {
    selectedCity,
    selectedDate,
    setSelectedCity,
    sidebarOpen,
    setSidebarOpen,
    desktopSidebarOpen,
    setDesktopSidebarOpen,
    userRole,
    userProfile,
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
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-gray-800 bg-gray-950/95 px-3 sm:px-4 backdrop-blur supports-[backdrop-filter]:bg-gray-950/80 w-full">
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

          {/* City Search Bar */}
          <div className="relative w-[130px] sm:w-[170px] md:w-[200px]">
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
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-gray-400 hover:text-gray-100"
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
                      className="flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-left text-xs hover:bg-gray-800"
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

          {/* Role Switcher Badge */}
          <button
            type="button"
            onClick={() => setAuthModalOpen(true)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              userRole === 'government'
                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/50 hover:bg-emerald-900/60'
                : userRole === 'citizen'
                  ? 'bg-sky-950/60 text-sky-300 border-sky-500/50 hover:bg-sky-900/60'
                  : 'bg-purple-950/60 text-purple-300 border-purple-500/50 hover:bg-purple-900/60'
            }`}
            title="Click to switch between Government, Citizen, or Researcher roles"
          >
            {userRole === 'government' ? (
              <Building2 className="h-3.5 w-3.5 text-emerald-400" />
            ) : userRole === 'citizen' ? (
              <Users className="h-3.5 w-3.5 text-sky-400" />
            ) : (
              <Shield className="h-3.5 w-3.5 text-purple-400" />
            )}
            <span className="hidden md:inline">
              {userRole === 'government'
                ? 'Govt Portal'
                : userRole === 'citizen'
                  ? 'Citizen Portal'
                  : 'Researcher'}
            </span>
            <span className="text-[10px] font-normal text-gray-400 hidden xl:inline">
              ({userProfile?.name?.split(' ')[0] || 'User'})
            </span>
          </button>

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
      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </>
  );
}
