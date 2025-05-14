
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

// Layouts
import DashboardLayout from "./components/layouts/DashboardLayout";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import EventStage from "./pages/EventStage";
import Guests from "./pages/Guests";
import Vendors from "./pages/Vendors";
import Approvals from "./pages/Approvals";
import PrintBadges from "./pages/PrintBadges";
import MobileCheckIn from "./pages/MobileCheckIn";
import Analytics from "./pages/Analytics";
import BadgeManagement from "./pages/BadgeManagement";
import UserManagement from "./pages/UserManagement";
import Settings from "./pages/Settings";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";

// Route Guard
import RouteGuard from "./components/RouteGuard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            {/* Protected routes with DashboardLayout */}
            <Route element={
              <RouteGuard>
                <DashboardLayout />
              </RouteGuard>
            }>
              {/* Dashboard - accessible to all roles */}
              <Route path="/dashboard" element={<Dashboard />} />
              
              {/* Events routes */}
              <Route path="/events" element={<Events />} />
              <Route path="/events/stage" element={
                <RouteGuard allowedRoles={['admin', 'organizer']}>
                  <EventStage />
                </RouteGuard>
              } />
              
              {/* Guests routes */}
              <Route path="/guests" element={<Guests />} />
              
              {/* Vendors routes */}
              <Route path="/vendors" element={<Vendors />} />
              
              {/* Approvals - admin only */}
              <Route path="/approvals" element={
                <RouteGuard allowedRoles={['admin']}>
                  <Approvals />
                </RouteGuard>
              } />
              
              {/* Badge management */}
              <Route path="/badge-management" element={<BadgeManagement />} />
              
              {/* Badge printing */}
              <Route path="/print-badges" element={<PrintBadges />} />
              
              {/* Mobile check-in */}
              <Route path="/mobile-check-in" element={<MobileCheckIn />} />
              
              {/* Analytics */}
              <Route path="/analytics" element={<Analytics />} />

              {/* User Management - admin only */}
              <Route path="/users" element={
                <RouteGuard allowedRoles={['admin']}>
                  <UserManagement />
                </RouteGuard>
              } />

              {/* Settings - accessible to all roles */}
              <Route path="/settings" element={<Settings />} />
            </Route>
            
            {/* Redirect root to dashboard or login */}
            <Route path="/" element={<RouteGuard><Dashboard /></RouteGuard>} />
            
            {/* 404 page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
