'use client';

import { Check, Download, FileImage, FileSpreadsheet, FileText } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { generateCityStats, generateHeatZones, generateRecommendations } from '@/lib/data';
import { captureMapSnapshot } from '@/lib/snapshot';
import { useDashboardStore } from '@/lib/store';

type ExportFormat = 'png' | 'csv' | 'json';

export function ExportPanel() {
  const { selectedCity, selectedDate, showToast } = useDashboardStore();
  const [exporting, setExporting] = useState<ExportFormat | null>(null);
  const [exported, setExported] = useState<ExportFormat | null>(null);

  const handleExport = async (format: ExportFormat) => {
    setExporting(format);
    showToast(`Generating ${format.toUpperCase()} export...`, 'info');

    // Simulate export delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

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
      const success = await captureMapSnapshot(selectedCity.id);
      setExporting(null);
      if (success) {
        setExported('png');
        setTimeout(() => setExported(null), 2000);
      }
      return;
    }

    setExporting(null);
    setExported(format);
    showToast(`📥 Downloaded ${format.toUpperCase()} dataset for ${selectedCity.name}`, 'success');
    setTimeout(() => setExported(null), 2000);
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

  const exportOptions = [
    {
      format: 'csv' as ExportFormat,
      icon: <FileSpreadsheet className="h-5 w-5" />,
      title: 'CSV Report',
      description: 'Heat zones & statistics',
    },
    {
      format: 'json' as ExportFormat,
      icon: <FileText className="h-5 w-5" />,
      title: 'JSON Data',
      description: 'Full data export',
    },
    {
      format: 'png' as ExportFormat,
      icon: <FileImage className="h-5 w-5" />,
      title: 'Map Image',
      description: 'Current view snapshot',
    },
  ];

  return (
    <Card className="w-full border border-gray-800 bg-gray-950/80 font-alliance rounded-xl overflow-hidden shadow-lg">
      <CardHeader className="p-3 border-b border-gray-800">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold text-white">
          <Download className="h-4 w-4 text-emerald-400" />
          Export Official Heat Data
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <div className="grid grid-cols-3 gap-1.5 w-full">
          {exportOptions.map((option) => (
            <Button
              key={option.format}
              variant="outline"
              className="h-auto flex-col gap-1 p-2 min-w-0 border-gray-800 bg-gray-900/60 hover:bg-gray-800 cursor-pointer overflow-hidden"
              onClick={() => handleExport(option.format)}
              disabled={exporting !== null}
            >
              {exporting === option.format ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
              ) : exported === option.format ? (
                <Check className="h-4 w-4 text-emerald-400" />
              ) : (
                <span className="text-gray-400 shrink-0">{option.icon}</span>
              )}
              <span className="text-[11px] font-semibold text-center truncate w-full text-white">{option.title}</span>
              <span className="text-[9px] text-gray-400 text-center truncate w-full">
                {option.description}
              </span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
