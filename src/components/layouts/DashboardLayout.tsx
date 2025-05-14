
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { SidebarProvider, useSidebar } from '@/components/ui/sidebar';
import AppSidebar from './AppSidebar';
import Topbar from './Topbar';

const DashboardContent = () => {
  const { state } = useSidebar();
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="flex flex-col flex-1 w-full overflow-hidden transition-all duration-300">
      <Topbar />
      <main className={`flex-1 overflow-y-auto p-4 md:p-6 transition-all duration-300 ${state === 'collapsed' ? 'w-full' : 'w-[calc(100%-var(--sidebar-width))]'}`}>
        <div className="animate-enter max-w-[80%] mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

const DashboardLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background overflow-hidden">
        <AppSidebar />
        <DashboardContent />
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
