'use client';

import { AlertTriangle, CheckCircle2, Info, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useDashboardStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const pathname = usePathname();
  const { sidebarOpen, activeToast, clearToast } = useDashboardStore();
  const isDashboard = pathname === '/dashboard';

  return (
    <div className="flex min-h-screen flex-col bg-gray-950 text-gray-100 w-full antialiased font-alliance selection:bg-emerald-500 selection:text-black relative">
      <Header />

      {/* Global Optimistic Floating Toast */}
      {activeToast && (
        <div className="fixed top-[76px] left-1/2 -translate-x-1/2 z-[100000] pointer-events-none animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-gray-900/95 border border-emerald-500/60 text-white px-4 py-2 rounded-full shadow-2xl backdrop-blur-md flex items-center gap-2.5 pointer-events-auto text-xs font-semibold">
            {activeToast.type === 'success' ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            ) : activeToast.type === 'warning' ? (
              <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
            ) : (
              <Info className="h-4 w-4 text-sky-400 shrink-0" />
            )}
            <span>{activeToast.message}</span>
            <button
              type="button"
              onClick={clearToast}
              className="text-gray-400 hover:text-white ml-1.5 p-0.5 rounded-full transition-colors cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {isDashboard ? (
        // Flagship Dashboard: Fixed viewport with map layout and layer sidebar
        <div className="flex h-[calc(100vh-64px)] overflow-hidden w-full relative">
          <Sidebar />
          <main
            className={cn(
              'flex-1 overflow-hidden transition-all duration-300 w-full min-w-0 flex flex-col',
              sidebarOpen ? 'lg:ml-0' : '',
            )}
          >
            {children}
          </main>
        </div>
      ) : (
        // Multi-page Views (Analytics, Mitigation, Reports, Citizen): Smooth natural scrolling across full screen
        <main className="flex-1 w-full min-w-0 bg-gray-950 overflow-y-auto">
          {children}
        </main>
      )}
    </div>
  );
}
