'use client';

import {
  Building2,
  Calendar,
  CheckCircle2,
  Download,
  FileCheck,
  FileImage,
  FileSpreadsheet,
  FileText,
  Printer,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react';
import { useState } from 'react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { generateCityStats, generateHeatZones, generateRecommendations } from '@/lib/data';
import { captureMapSnapshot } from '@/lib/snapshot';
import { useDashboardStore } from '@/lib/store';

export default function ReportsPage() {
  const { selectedCity, selectedDate, userRole } = useDashboardStore();
  const [downloadingFormat, setDownloadingFormat] = useState<string | null>(null);

  const stats = generateCityStats(selectedCity);
  const zones = generateHeatZones(selectedCity, selectedDate);
  const recommendations = generateRecommendations(selectedCity, selectedDate);

  const isGovernment = userRole === 'government';

  const handleExportCsv = () => {
    setDownloadingFormat('csv');
    const csvContent = [
      ['CLIMORA MUNICIPAL HEAT VULNERABILITY REPORT - OFFICIAL DOSSIER'],
      ['City', selectedCity.name, selectedCity.province],
      ['Population', selectedCity.population.toString()],
      ['Report Generated At', new Date().toISOString()],
      ['Authority', isGovernment ? 'Municipal Corporation / Climate Resilience Cell' : 'Citizen Public Registry'],
      [''],
      ['ZONE NAME', 'SEVERITY', 'AVG TEMP (°C)', 'MAX TEMP (°C)', 'AREA (KM²)', 'VULNERABILITY SCORE (0-100)'],
      ...zones.map((z) => [
        z.name,
        z.severity.toUpperCase(),
        z.avgTemperature.toFixed(1),
        z.maxTemperature.toFixed(1),
        z.area.toFixed(2),
        z.vulnerabilityScore.toFixed(0),
      ]),
      [''],
      ['RECOMMENDED INTERVENTION', 'TYPE', 'PRIORITY', 'EST. COOLING (°C)', 'EST. COST (INR)'],
      ...recommendations.map((r) => [
        r.name,
        r.type,
        r.priority.toUpperCase(),
        `-${r.estimatedCoolingEffect.toFixed(1)}`,
        r.estimatedCost.toString(),
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `climora-${selectedCity.id}-official-report.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setTimeout(() => setDownloadingFormat(null), 1000);
  };

  const handleExportJson = () => {
    setDownloadingFormat('json');
    const dossier = {
      project: 'Climora - Urban Heat Island Intelligence Platform',
      classification: isGovernment ? 'OFFICIAL MUNICIPAL DOCUMENT' : 'PUBLIC CITIZEN REPORT',
      city: selectedCity,
      metrics: stats,
      heatVulnerabilityZones: zones,
      recommendedInterventions: recommendations,
      generatedTimestamp: new Date().toISOString(),
      standardsCompliance: 'NDMA Heat Action Plan Framework 2026',
    };

    const blob = new Blob([JSON.stringify(dossier, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `climora-${selectedCity.id}-heat-dossier.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setTimeout(() => setDownloadingFormat(null), 1000);
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <DashboardShell>
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6 bg-gray-900/95 text-gray-100 print:bg-white print:text-black">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-5 print:hidden">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/30">
                Official Heat Action Plan (HAP) 2026-2027
              </span>
              <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-xs font-semibold text-amber-400 border border-amber-500/30">
                NDMA Guidelines Aligned
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-alliance">
              Executive Reports & Policy Dossiers
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Statutory urban resilience documentation, ward-wise vulnerability scores, and intervention briefs for{' '}
              <span className="text-emerald-400 font-semibold">{selectedCity.name}</span>.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={handlePrint}
              variant="outline"
              className="border-gray-700 text-gray-200 hover:bg-gray-800 text-xs flex items-center gap-1.5"
            >
              <Printer className="h-4 w-4" />
              Print / Save PDF
            </Button>
            <Button
              onClick={handleExportCsv}
              disabled={downloadingFormat !== null}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs flex items-center gap-1.5 font-medium"
            >
              <FileSpreadsheet className="h-4 w-4" />
              Download CSV Dossier
            </Button>
          </div>
        </div>

        {/* Printable Official Government Header */}
        <div className="bg-gray-950/90 border border-gray-800 rounded-xl p-6 print:border-gray-300 print:bg-white space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-800 pb-4 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Building2 className="h-6 w-6 text-emerald-400 print:text-black" />
                <h2 className="text-xl font-bold text-white print:text-black font-alliance">
                  CLIMORA URBAN HEAT ACTION DOSSIER
                </h2>
              </div>
              <p className="text-xs text-gray-400 print:text-gray-600 mt-0.5">
                Prepared for Municipal Corporation & State Disaster Management Authority (SDMA)
              </p>
            </div>
            <div className="text-left sm:text-right text-xs text-gray-400 print:text-gray-600">
              <p><strong className="text-gray-300 print:text-black">Target City:</strong> {selectedCity.name}, {selectedCity.province}</p>
              <p><strong className="text-gray-300 print:text-black">Observation Date:</strong> {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              <p><strong className="text-gray-300 print:text-black">Authority Status:</strong> {isGovernment ? 'Verified Municipal Operator' : 'Public Access View'}</p>
            </div>
          </div>

          {/* Executive Summary Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2">
            <div className="bg-gray-900/60 p-3 rounded-lg border border-gray-800 print:border-gray-200">
              <span className="text-[11px] text-gray-400 uppercase tracking-wider block">Urban Mean Temp</span>
              <span className="text-xl font-bold text-red-400 print:text-black">{stats.avgUrbanTemp.toFixed(1)}°C</span>
            </div>
            <div className="bg-gray-900/60 p-3 rounded-lg border border-gray-800 print:border-gray-200">
              <span className="text-[11px] text-gray-400 uppercase tracking-wider block">Heat Island Differential</span>
              <span className="text-xl font-bold text-orange-400 print:text-black">+{stats.heatIslandIntensity.toFixed(1)}°C</span>
            </div>
            <div className="bg-gray-900/60 p-3 rounded-lg border border-gray-800 print:border-gray-200">
              <span className="text-[11px] text-gray-400 uppercase tracking-wider block">Identified Hotspots</span>
              <span className="text-xl font-bold text-emerald-400 print:text-black">{stats.hotspotCount} Critical Wards</span>
            </div>
            <div className="bg-gray-900/60 p-3 rounded-lg border border-gray-800 print:border-gray-200">
              <span className="text-[11px] text-gray-400 uppercase tracking-wider block">At-Risk Citizens</span>
              <span className="text-xl font-bold text-purple-400 print:text-black">{(stats.vulnerablePopulation / 100000).toFixed(2)} Lakh</span>
            </div>
          </div>

          {/* Section: Priority Ward Vulnerability Ranking */}
          <div className="space-y-3 pt-3">
            <h3 className="text-sm font-bold text-white print:text-black uppercase tracking-wider border-b border-gray-800/80 pb-2">
              Ward-Level Heat Vulnerability Ranking (Top Priority Zones)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-800 text-gray-400 uppercase">
                    <th className="py-2 px-2">Ward Name</th>
                    <th className="py-2 px-2">Severity</th>
                    <th className="py-2 px-2">Mean Temp</th>
                    <th className="py-2 px-2">Max Recorded</th>
                    <th className="py-2 px-2">Area (km²)</th>
                    <th className="py-2 px-2">Vulnerability Index</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/60 text-gray-300 print:text-black">
                  {zones.map((zone) => (
                    <tr key={zone.id} className="hover:bg-gray-900/40">
                      <td className="py-2 px-2 font-medium text-white print:text-black">{zone.name}</td>
                      <td className="py-2 px-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                            zone.severity === 'extreme'
                              ? 'bg-red-500/20 text-red-400'
                              : zone.severity === 'high'
                                ? 'bg-orange-500/20 text-orange-400'
                                : 'bg-emerald-500/20 text-emerald-400'
                          }`}
                        >
                          {zone.severity}
                        </span>
                      </td>
                      <td className="py-2 px-2">{zone.avgTemperature.toFixed(1)}°C</td>
                      <td className="py-2 px-2 font-bold text-red-400 print:text-black">{zone.maxTemperature.toFixed(1)}°C</td>
                      <td className="py-2 px-2">{zone.area.toFixed(2)} km²</td>
                      <td className="py-2 px-2 font-semibold text-amber-400 print:text-black">{zone.vulnerabilityScore.toFixed(0)} / 100</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Statutory Policy Directives */}
          <div className="pt-4 border-t border-gray-800/80 space-y-2 text-xs text-gray-300 print:text-black">
            <h4 className="font-bold text-white print:text-black">Statutory Recommendations & Mitigation Rollout:</h4>
            <ol className="list-decimal list-inside space-y-1 text-gray-400 print:text-gray-700">
              <li>Deploy high-priority tree canopy planting along Dwarka sector roads and Okhla arterial corridors to restore minimum 25% vegetative density.</li>
              <li>Mandate high-albedo cool roof coatings (solar reflectance index &gt; 78) across all municipal buildings, hospitals, and primary schools.</li>
              <li>Establish dedicated 24x7 misted cooling transit hubs at Connaught Place, Lajpat Nagar, and major interchange metro stations during summer heatwaves.</li>
            </ol>
          </div>
        </div>

        {/* Downloadable Package Options */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 print:hidden">
          <Card className="bg-gray-950/80 border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                <FileSpreadsheet className="h-4 w-4 text-emerald-400" />
                Raw CSV Data Table
              </CardTitle>
              <CardDescription className="text-xs text-gray-400">
                Detailed coordinate polygons, temperatures, and vulnerability ratings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleExportCsv} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium">
                Download CSV Table
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gray-950/80 border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="h-4 w-4 text-sky-400" />
                Full JSON Climate Dossier
              </CardTitle>
              <CardDescription className="text-xs text-gray-400">
                Machine-readable JSON schema for GIS mapping and smart city ingest.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleExportJson} className="w-full bg-sky-600 hover:bg-sky-700 text-white text-xs font-medium">
                Download JSON Package
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gray-950/80 border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                <FileImage className="h-4 w-4 text-purple-400" />
                Satellite Map Snapshot
              </CardTitle>
              <CardDescription className="text-xs text-gray-400">
                Download current 2D/3D map render as a high-resolution PNG image.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => captureMapSnapshot(selectedCity.id)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium"
              >
                Export Map Image (PNG)
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}
