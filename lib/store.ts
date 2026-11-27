import { create } from 'zustand';
import type { City, GreenInfrastructureRecommendation, HeatZone, LayerType, UserProfile, UserRole } from '@/types';
import { INDIAN_CITIES } from './data';

export type DashboardTab = 'map' | 'analytics' | 'actions';

interface DashboardStore {
  dashboardTab: DashboardTab;
  setDashboardTab: (tab: DashboardTab) => void;

  // City selection
  selectedCity: City;
  setSelectedCity: (city: City) => void;

  // Date selection
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;

  // Map view
  mapCenter: [number, number];
  mapZoom: number;
  setMapView: (center: [number, number], zoom: number) => void;

  // Layer visibility
  activeLayers: LayerType[];
  toggleLayer: (layer: LayerType) => void;
  setActiveLayers: (layers: LayerType[]) => void;

  // Recommendations panel
  showRecommendations: boolean;
  setShowRecommendations: (show: boolean) => void;
  selectedRecommendation: GreenInfrastructureRecommendation | null;
  setSelectedRecommendation: (rec: GreenInfrastructureRecommendation | null) => void;
  implementedRecommendations: string[]; // IDs of implemented recommendations
  toggleImplementedRecommendation: (recId: string) => void;

  // Heat zones
  selectedHeatZone: HeatZone | null;
  setSelectedHeatZone: (zone: HeatZone | null) => void;

  // Time slider
  timeSliderValue: number;
  setTimeSliderValue: (value: number) => void;

  // Sidebar
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  desktopSidebarOpen: boolean;
  setDesktopSidebarOpen: (open: boolean) => void;

  // Temperature unit
  temperatureUnit: 'C' | 'F';
  setTemperatureUnit: (unit: 'C' | 'F') => void;

  // 3D Visualization
  enable3D: boolean;
  setEnable3D: (enable: boolean) => void;

  // Authentication & Role
  hasSelectedRole: boolean;
  setHasSelectedRole: (selected: boolean) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile | null) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  selectRoleAndEnter: (role: UserRole, profile: UserProfile | null) => void;
  exitPortal: () => void;
  logout: () => void;

  // Optimistic Global Toast Notification
  activeToast: { id: string; message: string; type: 'success' | 'info' | 'warning' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  clearToast: () => void;
}

export const useDashboardStore = create<DashboardStore>((set) => {
  // Find default city (first Indian city)
  const defaultCity = INDIAN_CITIES[0];

  return {
    dashboardTab: 'map',
    setDashboardTab: (tab) => set({ dashboardTab: tab }),

    // City selection - default to first Indian city
    selectedCity: defaultCity,
    setSelectedCity: (city) =>
      set({
        selectedCity: city,
        mapCenter: city.coordinates,
        mapZoom: 12,
        implementedRecommendations: [], // Clear implemented recommendations when city changes
      }),

    // Date selection
    selectedDate: new Date(),
    setSelectedDate: (date) => set({ selectedDate: date }),

    // Map view
    mapCenter: defaultCity.coordinates,
    mapZoom: 12,
    setMapView: (center, zoom) => set({ mapCenter: center, mapZoom: zoom }),

    // Layer visibility
    activeLayers: ['heat', 'recommendations'],
    toggleLayer: (layer) =>
      set((state) => ({
        activeLayers: state.activeLayers.includes(layer)
          ? state.activeLayers.filter((l) => l !== layer)
          : [...state.activeLayers, layer],
      })),
    setActiveLayers: (layers) => set({ activeLayers: layers }),

    // Recommendations panel
    showRecommendations: true,
    setShowRecommendations: (show) => set({ showRecommendations: show }),
    selectedRecommendation: null,
    setSelectedRecommendation: (rec) => set({ selectedRecommendation: rec }),
    implementedRecommendations: [],
    toggleImplementedRecommendation: (recId) =>
      set((state) => ({
        implementedRecommendations: state.implementedRecommendations.includes(recId)
          ? state.implementedRecommendations.filter((id) => id !== recId)
          : [...state.implementedRecommendations, recId],
      })),

    // Heat zones
    selectedHeatZone: null,
    setSelectedHeatZone: (zone) => set({ selectedHeatZone: zone }),

    // Time slider - start at maximum (right side)
    timeSliderValue: 100,
    setTimeSliderValue: (value) => set({ timeSliderValue: value }),

    // Sidebar - default closed on mobile, open on desktop
    // Keep the initial store state identical during SSR and hydration.
    // The sidebar is always visible at desktop widths through its lg: styles.
    sidebarOpen: false,
    setSidebarOpen: (open) => set({ sidebarOpen: open }),
    desktopSidebarOpen: true,
    setDesktopSidebarOpen: (open) => set({ desktopSidebarOpen: open }),

    // Temperature unit
    temperatureUnit: 'C',
    setTemperatureUnit: (unit) => set({ temperatureUnit: unit }),

    // 3D Visualization
    enable3D: false,
    setEnable3D: (enable) => set({ enable3D: enable }),

    // Authentication & Role - Locked session architecture
    hasSelectedRole: false,
    setHasSelectedRole: (selected) => set({ hasSelectedRole: selected }),
    userRole: 'citizen',
    setUserRole: (role) => set({ userRole: role }),
    userProfile: null,
    setUserProfile: (profile) => set({ userProfile: profile }),
    isAuthenticated: false,
    setIsAuthenticated: (auth) => set({ isAuthenticated: auth }),
    selectRoleAndEnter: (role, profile) => {
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('climora_role_active', role);
          if (profile) {
            localStorage.setItem('climora_profile_active', JSON.stringify(profile));
          }
        } catch {
          // Ignore localStorage errors
        }
      }
      set({
        userRole: role,
        userProfile: profile,
        hasSelectedRole: true,
        isAuthenticated: true,
      });
    },
    exitPortal: () => {
      if (typeof window !== 'undefined') {
        try {
          localStorage.removeItem('climora_role_active');
          localStorage.removeItem('climora_profile_active');
        } catch {
          // Ignore localStorage errors
        }
      }
      set({
        userRole: 'citizen',
        userProfile: null,
        hasSelectedRole: false,
        isAuthenticated: false,
      });
    },
    logout: () => {
      if (typeof window !== 'undefined') {
        try {
          localStorage.removeItem('climora_role_active');
          localStorage.removeItem('climora_profile_active');
        } catch {
          // Ignore localStorage errors
        }
      }
      set({
        userRole: 'citizen',
        userProfile: null,
        hasSelectedRole: false,
        isAuthenticated: false,
      });
    },

    // Optimistic Global Toast Notification
    activeToast: null,
    showToast: (message, type = 'success') => {
      const id = Math.random().toString(36).substring(2, 9);
      set({ activeToast: { id, message, type } });
      setTimeout(() => {
        set((state) => (state.activeToast?.id === id ? { activeToast: null } : {}));
      }, 3500);
    },
    clearToast: () => set({ activeToast: null }),
  };
});
