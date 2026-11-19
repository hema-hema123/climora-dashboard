'use client';

import {
  Download,
  FileImage,
  FileSpreadsheet,
  FileText,
  Info,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
  const [cityQuery, setCityQuery] = useState('');
  const [citySearchOpen, setCitySearchOpen] = useState(false);
  const {
    selectedCity,
    selectedDate,
    setSelectedCity,
    sidebarOpen,
    setSidebarOpen,
    desktopSidebarOpen,
    setDesktopSidebarOpen,
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
    }
  };

  const handleExport = async (format: 'csv' | 'json' | 'png') => {
    const stats = generateCityStats(selectedCity);
    const zones = generateHeatZones(selectedCity, selectedDate);
    const recommendations = generateRecommendations(selectedCity, selectedDate);

    if (format === 'csv') {
      // Generate CSV content
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
      downloadBlob(blob, `verdant-${selectedCity.id}-report.csv`);
    } else if (format === 'json') {
      const report = {
        city: selectedCity,
        stats,
        heatZones: zones,
        recommendations,
        generatedAt: new Date().toISOString(),
      };

      const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
      downloadBlob(blob, `verdant-${selectedCity.id}-data.json`);
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

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-gray-200 bg-white/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-gray-800 dark:bg-gray-950/95 dark:supports-[backdrop-filter]:bg-gray-950/60 w-full">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden"
          aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          aria-controls="dashboard-sidebar"
          aria-expanded={sidebarOpen}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setDesktopSidebarOpen(!desktopSidebarOpen)}
          className="hidden lg:inline-flex"
          aria-label={desktopSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          aria-controls="dashboard-sidebar"
          aria-expanded={desktopSidebarOpen}
        >
          {desktopSidebarOpen ? (
            <PanelLeftClose className="h-5 w-5" />
          ) : (
            <PanelLeftOpen className="h-5 w-5" />
          )}
        </Button>

        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer flex-shrink-0"
        >
          <div className="relative h-10 w-10 flex-shrink-0">
            <Image
              src="/favicons/LIGHT-GREEN-LOGO.svg"
              alt="Verdant Logo"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="hidden sm:block flex-shrink-0">
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">Climora</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Urban Heat Intelligence for Indian Cities
            </p>
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="relative w-[min(42vw,280px)] min-w-[130px]">
          <label htmlFor="city-search" className="sr-only">
            Search cities
          </label>
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
            aria-hidden="true"
          />
          <input
            id="city-search"
            type="search"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={citySearchOpen}
            aria-controls="city-search-results"
            placeholder={selectedCity.name}
            value={cityQuery}
            onFocus={() => setCitySearchOpen(true)}
            onBlur={() => setTimeout(() => setCitySearchOpen(false), 150)}
            onChange={(event) => {
              setCityQuery(event.target.value);
              setCitySearchOpen(true);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Escape') setCitySearchOpen(false);
              if (event.key === 'Enter' && matchingCities[0]) {
                event.preventDefault();
                handleCityChange(matchingCities[0].id);
              }
            }}
            className="h-10 w-full rounded-lg border border-gray-700 bg-gray-900 py-2 pl-9 pr-8 text-sm text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-alliance"
          />
          {cityQuery && (
            <button
              type="button"
              aria-label="Clear city search"
              onClick={() => {
                setCityQuery('');
                setCitySearchOpen(true);
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-gray-400 hover:text-gray-100"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
          {citySearchOpen && (
            <div
              id="city-search-results"
              role="listbox"
              className="absolute right-0 top-full z-50 mt-2 max-h-64 w-[min(80vw,280px)] overflow-y-auto rounded-lg border border-gray-700 bg-gray-900 p-1 text-gray-100 shadow-xl"
            >
              {matchingCities.length ? (
                matchingCities.map((city) => (
                  <div key={city.id}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={city.id === selectedCity.id}
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => handleCityChange(city.id)}
                      className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm hover:bg-gray-800 focus:bg-gray-800 focus:outline-none"
                    >
                      <span>{city.name}</span>
                      <span className="text-xs text-gray-400">{city.province}</span>
                    </button>
                  </div>
                ))
              ) : (
                <div className="px-3 py-2 text-sm text-gray-400">No matching cities</div>
              )}
            </div>
          )}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="hidden sm:flex">
              <Download className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => handleExport('csv')} className="cursor-pointer">
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              <span>CSV Report</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport('json')} className="cursor-pointer">
              <FileText className="mr-2 h-4 w-4" />
              <span>JSON Data</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport('png')} className="cursor-pointer">
              <FileImage className="mr-2 h-4 w-4" />
              <span>Map Image</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Info className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              align="end"
              sideOffset={8}
              className="max-w-md p-5 text-sm !bg-gray-900 !border-gray-800 !text-gray-100 shadow-xl backdrop-blur-sm"
            >
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 text-gray-50 text-base">Dashboard Overview</h4>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Climora provides data-driven insights into urban heat islands and green
                    infrastructure planning for Indian cities. Use this dashboard to understand heat
                    patterns, identify vulnerable areas, and explore recommendations for climate
                    resilience.
                  </p>
                </div>
                <div className="border-t border-gray-700 pt-3">
                  <h4 className="font-semibold mb-1.5 text-gray-50">How to Use</h4>
                  <ul className="text-xs text-gray-300 leading-relaxed space-y-1.5 list-disc list-inside">
                    <li>Select a city from the dropdown to view its heat data</li>
                    <li>Hover over stat card icons to see detailed metric information</li>
                    <li>Use the time slider to explore temperature trends over time</li>
                    <li>Click on heat zones on the map to view specific area details</li>
                    <li>Review recommendations panel for green infrastructure suggestions</li>
                    <li>Export data in CSV, JSON, or PNG formats for further analysis</li>
                  </ul>
                </div>
                <div className="border-t border-gray-700 pt-3">
                  <h4 className="font-semibold mb-1.5 text-gray-50">Interpreting the Data</h4>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    <strong className="text-gray-200">Temperature Metrics:</strong> Compare urban
                    vs. rural temperatures to understand the heat island effect. Higher differences
                    indicate stronger heat island intensity.
                  </p>
                  <p className="text-xs text-gray-300 leading-relaxed mt-1.5">
                    <strong className="text-gray-200">Hotspot Zones:</strong> Areas with elevated
                    temperatures requiring immediate attention. Severity levels help prioritize
                    intervention areas.
                  </p>
                  <p className="text-xs text-gray-300 leading-relaxed mt-1.5">
                    <strong className="text-gray-200">Green Coverage:</strong> Percentage of
                    vegetation indicates cooling potential. Lower coverage suggests opportunities
                    for green infrastructure expansion.
                  </p>
                  <p className="text-xs text-gray-300 leading-relaxed mt-1.5">
                    <strong className="text-gray-200">Vulnerable Population:</strong> Residents at
                    higher risk from heat exposure. Use this to target cooling interventions and
                    emergency planning.
                  </p>
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </header>
  );
}
