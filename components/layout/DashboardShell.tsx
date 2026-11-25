'use client';

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
  const { sidebarOpen } = useDashboardStore();
  const isDashboard = pathname === '/dashboard';

  return (
    <div className="flex min-h-screen flex-col bg-gray-950 text-gray-100 w-full antialiased font-alliance selection:bg-emerald-500 selection:text-black">
      <Header />
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
