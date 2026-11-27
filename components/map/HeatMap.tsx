'use client';

import 'leaflet/dist/leaflet.css';
import dynamic from 'next/dynamic';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  CircleMarker,
  MapContainer,
  Polygon,
  Popup,
  TileLayer,
  useMap,
} from 'react-leaflet';
import {
  generateHeatZones,
  generateInfrastructurePoints,
  generateRecommendations,
  generateSensorLocations,
  generateVegetationAreas,
} from '@/lib/data';
import { useDashboardStore } from '@/lib/store';
import { getInfrastructureIcon, getPriorityColor } from '@/lib/utils';

// Dynamic import for MapboxMap (client-side only for 3D view)
const MapboxMap = dynamic(() => import('./MapboxMap').then((mod) => mod.MapboxMap), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-gray-900">
      <div className="text-center">
        <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent mx-auto" />
        <p className="text-gray-400">Loading 3D Mapbox...</p>
      </div>
    </div>
  ),
});

function MapResizeHandler() {
  const map = useMap();

  useEffect(() => {
    map.invalidateSize();
    const container = map.getContainer();
    const observer = new ResizeObserver(() => {
      map.invalidateSize({ animate: false });
    });
    observer.observe(container);

    const timer1 = setTimeout(() => map.invalidateSize(), 150);
    const timer2 = setTimeout(() => map.invalidateSize(), 500);

    return () => {
      observer.disconnect();
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [map]);

  return null;
}

function MapController({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom, { animate: true });
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 200);
    return () => clearTimeout(timer);
  }, [map, center, zoom]);

  return null;
}

export function HeatMap() {
  const {
    selectedCity,
    selectedDate,
    activeLayers,
    selectedHeatZone,
    setSelectedHeatZone,
    setSelectedRecommendation,
    implementedRecommendations,
    toggleImplementedRecommendation,
    showToast,
    mapCenter,
    mapZoom,
    enable3D,
  } = useDashboardStore();

  const [isMounted, setIsMounted] = useState(false);
  const [mapStyle, setMapStyle] = useState<'voyager' | 'dark' | 'satellite' | 'osm'>('voyager');
  const containerRef = useRef<HTMLDivElement>(null);

  const tileLayerConfig = {
    voyager: {
      url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      attribution: '&copy; CARTO &copy; OpenStreetMap',
    },
    dark: {
      url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      attribution: '&copy; CARTO &copy; OpenStreetMap',
    },
    satellite: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: '&copy; Esri, Maxar, Earthstar Geographics',
    },
    osm: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; OpenStreetMap contributors',
    },
  }[mapStyle];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const heatZones = useMemo(() => {
    return generateHeatZones(selectedCity, selectedDate);
  }, [selectedCity, selectedDate]);

  const recommendations = useMemo(() => {
    return generateRecommendations(selectedCity, selectedDate);
  }, [selectedCity, selectedDate]);

  const vegetationAreas = useMemo(() => {
    return generateVegetationAreas(selectedCity);
  }, [selectedCity]);

  const infrastructurePoints = useMemo(() => {
    return generateInfrastructurePoints(selectedCity);
  }, [selectedCity]);

  const sensorLocations = useMemo(() => {
    return generateSensorLocations(selectedCity);
  }, [selectedCity]);

  if (!isMounted) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent mx-auto" />
          <p className="text-gray-400">Initializing Live Heat Map...</p>
        </div>
      </div>
    );
  }

  // Render 3D Mapbox map if enabled
  if (enable3D) {
    return <MapboxMap />;
  }

  // Render 2D Leaflet map
  return (
    <div
      ref={containerRef}
      id="climora-map-view"
      className="relative h-full w-full min-h-[350px] bg-gray-950 overflow-hidden"
    >
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        className="h-full w-full"
        zoomControl={true}
        preferCanvas={true}
        style={{ height: '100%', width: '100%', minHeight: '350px', backgroundColor: '#090d16' }}
        key={`climora-map-${selectedCity.id}`}
      >
        <MapResizeHandler />
        <MapController center={mapCenter} zoom={mapZoom} />

        <TileLayer
          key={mapStyle}
          attribution={tileLayerConfig.attribution}
          url={tileLayerConfig.url}
          crossOrigin="anonymous"
          maxZoom={19}
        />

        {/* Heat layer: Heat zones (polygons) */}
        {activeLayers.includes('heat') &&
          heatZones.map((zone) => (
            <Polygon
              key={zone.id}
              positions={zone.coordinates}
              pathOptions={{
                fillColor:
                  zone.severity === 'extreme'
                    ? '#7f1d1d'
                    : zone.severity === 'high'
                      ? '#dc2626'
                      : zone.severity === 'moderate'
                        ? '#f97316'
                        : '#facc15',
                fillOpacity: 0.35,
                color:
                  zone.id === selectedHeatZone?.id
                    ? '#10b981'
                    : zone.severity === 'extreme'
                      ? '#7f1d1d'
                      : zone.severity === 'high'
                        ? '#dc2626'
                        : zone.severity === 'moderate'
                          ? '#f97316'
                          : '#facc15',
                weight: zone.id === selectedHeatZone?.id ? 4 : 2,
              }}
              eventHandlers={{
                click: () => {
                  setSelectedHeatZone(zone);
                  showToast(`📍 Selected ${zone.name} heat zone (${zone.avgTemperature.toFixed(1)}°C)`, 'info');
                },
              }}
            >
              <Popup>
                <div className="text-sm p-1">
                  <p className="font-bold text-base mb-1 text-gray-900">{zone.name}</p>
                  <p className="text-xs text-gray-600">
                    Severity: <span className="font-semibold capitalize text-red-600">{zone.severity}</span>
                  </p>
                  <p className="text-xs text-gray-700">Mean Temp: <strong>{zone.avgTemperature.toFixed(1)}°C</strong></p>
                  <p className="text-xs text-gray-700">Peak Temp: <strong>{zone.maxTemperature.toFixed(1)}°C</strong></p>
                  <p className="text-xs text-gray-700">Vulnerability Index: <strong>{zone.vulnerabilityScore.toFixed(0)}/100</strong></p>
                </div>
              </Popup>
            </Polygon>
          ))}

        {/* Recommendations Layer */}
        {activeLayers.includes('recommendations') &&
          recommendations.map((rec) => {
            const isAllocated = implementedRecommendations.includes(rec.id);
            return (
              <CircleMarker
                key={rec.id}
                center={rec.location}
                radius={isAllocated ? 10 : 8}
                pathOptions={{
                  fillColor: getPriorityColor(rec.priority),
                  fillOpacity: 0.9,
                  color: isAllocated ? '#10b981' : '#ffffff',
                  weight: isAllocated ? 3.5 : 2,
                }}
                eventHandlers={{
                  click: () => setSelectedRecommendation(rec),
                }}
              >
                <Popup>
                  <div className="text-sm min-w-[220px] p-1">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <p className="font-bold text-base text-gray-900">{rec.name}</p>
                      {isAllocated && (
                        <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                          ✓ Allocated
                        </span>
                      )}
                    </div>
                    <p className="mb-2 text-xs text-gray-600 leading-relaxed">{rec.description}</p>
                    <div className="space-y-1 text-xs border-t pt-1.5 border-gray-200">
                      <p className="text-gray-700">
                        Type: <span className="font-semibold">{getInfrastructureIcon(rec.type)} {rec.type.replace('_', ' ')}</span>
                      </p>
                      <p className="text-gray-700">
                        Priority: <span className="font-semibold capitalize text-amber-600">{rec.priority}</span>
                      </p>
                      <p className="text-emerald-700 font-bold">
                        Est. Cooling: -{rec.estimatedCoolingEffect.toFixed(1)}°C
                      </p>
                      <p className="text-gray-700">
                        Est. Budget: ₹ {(rec.estimatedCost / 10000000).toFixed(2)} Cr
                      </p>
                    </div>
                    <div className="pt-2.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleImplementedRecommendation(rec.id);
                          if (!isAllocated) {
                            showToast(`✓ Added ${rec.name} to municipal plan! (-${rec.estimatedCoolingEffect.toFixed(1)}°C)`, 'success');
                          } else {
                            showToast(`Removed ${rec.name} from municipal plan`, 'info');
                          }
                        }}
                        className={`w-full py-1.5 px-2 rounded text-xs font-bold transition-all cursor-pointer ${
                          isAllocated
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                            : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300'
                        }`}
                      >
                        {isAllocated ? '✓ In Active Action Plan' : '+ Allocate to Action Plan'}
                      </button>
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}

        {/* Vegetation Layer */}
        {activeLayers.includes('vegetation') &&
          vegetationAreas.map((area) => (
            <Polygon
              key={area.id}
              positions={area.coordinates}
              pathOptions={{
                fillColor: '#10b981',
                fillOpacity: 0.45,
                color: '#059669',
                weight: 1.5,
              }}
            >
              <Popup>
                <div className="text-sm p-1">
                  <p className="font-bold text-base mb-1 text-gray-900">{area.name}</p>
                  <p className="text-xs text-gray-600">Type: <span className="capitalize">{area.type}</span></p>
                  <p className="text-xs text-emerald-700 font-semibold">NDVI Index: {area.ndvi.toFixed(2)}</p>
                </div>
              </Popup>
            </Polygon>
          ))}

        {/* Infrastructure Layer */}
        {activeLayers.includes('infrastructure') &&
          infrastructurePoints.map((point) => (
            <CircleMarker
              key={point.id}
              center={point.location}
              radius={point.size * 3}
              pathOptions={{
                fillColor: '#3b82f6',
                fillOpacity: 0.7,
                color: '#1e40af',
                weight: 2,
              }}
            >
              <Popup>
                <div className="text-sm p-1">
                  <p className="font-bold text-base mb-1 text-gray-900">{point.name}</p>
                  <p className="text-xs text-gray-600">Type: <span className="capitalize">{point.type}</span></p>
                </div>
              </Popup>
            </CircleMarker>
          ))}

        {/* Sensors Layer */}
        {activeLayers.includes('sensors') &&
          sensorLocations.map((sensor) => (
            <CircleMarker
              key={sensor.id}
              center={sensor.location}
              radius={6}
              pathOptions={{
                fillColor: '#a855f7',
                fillOpacity: 0.9,
                color: '#ffffff',
                weight: 2,
              }}
            >
              <Popup>
                <div className="text-sm p-1">
                  <p className="font-bold text-base mb-1 text-gray-900">{sensor.name}</p>
                  <p className="text-xs text-purple-700 font-bold">Telemetry: {sensor.temperature.toFixed(1)}°C</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">
                    Updated: {new Date(sensor.lastReading).toLocaleTimeString()}
                  </p>
                </div>
              </Popup>
            </CircleMarker>
          ))}
      </MapContainer>

      {/* Map Style Selector Pill */}
      <div className="absolute top-3 right-12 z-[1000] flex items-center bg-gray-950/90 border border-gray-800 rounded-lg p-1 backdrop-blur shadow-2xl gap-1 text-[11px] font-medium">
        <button
          type="button"
          onClick={() => {
            setMapStyle('voyager');
            showToast('Map style: CARTO Clean Voyager', 'info');
          }}
          className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
            mapStyle === 'voyager'
              ? 'bg-emerald-600 text-white font-bold'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          🗺️ Clean
        </button>
        <button
          type="button"
          onClick={() => {
            setMapStyle('dark');
            showToast('Map style: High-Contrast Dark Thermal', 'info');
          }}
          className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
            mapStyle === 'dark'
              ? 'bg-emerald-600 text-white font-bold'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          🌙 Dark
        </button>
        <button
          type="button"
          onClick={() => {
            setMapStyle('satellite');
            showToast('Map style: High-Resolution Satellite Imagery', 'info');
          }}
          className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
            mapStyle === 'satellite'
              ? 'bg-emerald-600 text-white font-bold'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          🛰️ Satellite
        </button>
      </div>

      {/* Map City Info Pill */}
      <div className="absolute bottom-3 left-3 z-[1000] flex flex-col gap-1.5 pointer-events-none">
        <div className="rounded-lg bg-gray-950/90 border border-gray-800 p-2.5 shadow-2xl backdrop-blur pointer-events-auto">
          <p className="text-xs font-bold text-white mb-0.5 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            {selectedCity.name}, {selectedCity.province}
          </p>
          <p className="text-[11px] text-gray-400">
            Population: {selectedCity.population.toLocaleString('en-IN')}
          </p>
        </div>
      </div>
    </div>
  );
}
