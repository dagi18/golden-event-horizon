
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useAuth } from '../../contexts/AuthContext';

const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user } = useAuth();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <div 
        className={`
          fixed inset-y-0 z-50 flex flex-col transition-all duration-300 ease-in-out 
          ${sidebarOpen ? 'left-0' : '-left-64 md:left-0'} 
          md:relative md:w-64 print:hidden
        `}
      >
        <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      </div>
      
      <div className="flex flex-col flex-1 w-full overflow-hidden">
        <Topbar onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        
        <main className={`
          flex-1 overflow-y-auto p-4 md:p-6 transition-all duration-300 
          ${sidebarOpen ? 'md:ml-0' : 'md:ml-0'}
        `}>
          <div className="animate-enter max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
