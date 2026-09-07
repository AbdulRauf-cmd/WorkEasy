import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useApp } from './context/AppContext';

// Components
import RoleSwitch from './components/RoleSwitch';
import BottomNav from './components/BottomNav';

// Customer Pages
import { CustomerHome } from './pages/customer/CustomerHome';
import { PostJob } from './pages/customer/PostJob';
import { JobClassification } from './pages/customer/JobClassification';
import { MatchedWorker } from './pages/customer/MatchedWorker';
import { CustomerJobDetails } from './pages/customer/CustomerJobDetails';
import { CustomerVerification } from './pages/customer/CustomerVerification';
import { JobComplete } from './pages/customer/JobComplete';
import CustomerJobs from './pages/customer/CustomerJobs';

// Worker Pages
import WorkerHome from './pages/worker/WorkerHome';
import WorkerActiveJob from './pages/worker/WorkerActiveJob';
import WorkerCompletion from './pages/worker/WorkerCompletion';
import WorkerProfile from './pages/worker/WorkerProfile';

// Other Pages
import CooperativeDashboard from './pages/admin/CooperativeDashboard';
import Profile from './pages/Profile';
import Activity from './pages/Activity';

const AppRoutes = () => {
  const { state } = useApp();
  const location = useLocation();

  const getHomeComponent = () => {
    switch (state.role) {
      case 'worker': return <WorkerHome />;
      case 'admin': return <CooperativeDashboard />;
      default: return <CustomerHome />;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={getHomeComponent()} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/job-classification" element={<JobClassification />} />
        <Route path="/matched-worker" element={<MatchedWorker />} />
        <Route path="/job-details" element={state.role === 'worker' ? <WorkerActiveJob /> : <CustomerJobDetails />} />
        <Route path="/verify" element={<CustomerVerification />} />
        <Route path="/job-complete" element={<JobComplete />} />
        <Route path="/jobs" element={state.role === 'customer' ? <CustomerJobs /> : <Navigate to="/" />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/profile" element={state.role === 'worker' ? <WorkerProfile /> : <Profile />} />
        
        {/* Worker specific routes */}
        <Route path="/worker/active-job" element={<WorkerActiveJob />} />
        <Route path="/worker/completion" element={<WorkerCompletion />} />
        
        {/* Admin specific routes */}
        <Route path="/admin" element={<CooperativeDashboard />} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  const { state } = useApp();

  return (
    <div className="h-[100dvh] bg-gray-200 flex justify-center overflow-hidden">
      <div className="w-full max-w-[430px] bg-gray-50 h-full relative shadow-2xl overflow-hidden flex flex-col">
        <RoleSwitch />
        
        <div className="flex-1 overflow-y-auto mt-14 relative no-scrollbar">
          <AppRoutes />
        </div>

        {state.role !== 'admin' && <BottomNav />}
      </div>
    </div>
  );
};

export default App;
