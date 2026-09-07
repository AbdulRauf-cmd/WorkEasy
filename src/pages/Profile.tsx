import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import AnimatedPage from '../components/AnimatedPage';
import WorkerProfile from './worker/WorkerProfile';
import CooperativeDashboard from './admin/CooperativeDashboard';
import { User, Settings, HelpCircle, MapPin, ShieldCheck, RotateCcw, ChevronRight } from 'lucide-react';

const Profile: React.FC = () => {
  const { state, resetDemo } = useApp();
  const navigate = useNavigate();

  if (state.role === 'worker') {
    return <WorkerProfile />;
  }

  if (state.role === 'admin') {
    return <CooperativeDashboard />;
  }

  const handleReset = () => {
    resetDemo();
    navigate('/');
  };

  return (
    <AnimatedPage className="pb-16 pt-4 px-4 bg-slate-50 min-h-screen">
      {/* Profile Header */}
      <div className="flex items-center gap-3.5 mb-4 bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
        <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-white font-bold text-sm">
          {state.customer?.avatar || 'PS'}
        </div>
        <div>
          <h1 className="text-sm font-bold text-slate-900">{state.customer?.name || 'Priya Sharma'}</h1>
          <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
            <MapPin size={12} className="text-slate-400" /> {state.customer?.location || 'Coimbatore'}, Tamil Nadu
          </p>
        </div>
      </div>

      {/* Safety & Escrow Protection */}
      <div className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-2xs mb-3.5">
        <div className="flex items-center gap-2 mb-1">
          <ShieldCheck size={16} className="text-slate-900" />
          <span className="text-xs font-bold text-slate-900">Cooperative Escrow Protected</span>
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          All service bookings are secured under WorkEasy cooperative standards with upfront transparent pricing.
        </p>
      </div>

      {/* Menu Options */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden mb-6 divide-y divide-slate-100">
        <div className="p-3 flex items-center justify-between cursor-pointer hover:bg-slate-50">
          <div className="flex items-center gap-2.5">
            <User size={16} className="text-slate-400" />
            <span className="text-xs font-medium text-slate-800">Personal Information</span>
          </div>
          <ChevronRight size={14} className="text-slate-300" />
        </div>

        <div className="p-3 flex items-center justify-between cursor-pointer hover:bg-slate-50">
          <div className="flex items-center gap-2.5">
            <MapPin size={16} className="text-slate-400" />
            <span className="text-xs font-medium text-slate-800">Saved Addresses</span>
          </div>
          <span className="text-xs text-slate-400">RS Puram</span>
        </div>

        <div className="p-3 flex items-center justify-between cursor-pointer hover:bg-slate-50">
          <div className="flex items-center gap-2.5">
            <HelpCircle size={16} className="text-slate-400" />
            <span className="text-xs font-medium text-slate-800">Help & Support</span>
          </div>
          <span className="text-[11px] text-blue-600 font-semibold">24/7 Helpline</span>
        </div>
      </div>

      {/* Reset Demo Button */}
      <div className="flex justify-center">
        <button 
          onClick={handleReset}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-100 text-slate-600 font-medium rounded-lg hover:bg-slate-200 hover:text-slate-900 transition active:scale-95 text-xs"
        >
          <RotateCcw size={12} />
          Reset Demo Flow
        </button>
      </div>
    </AnimatedPage>
  );
};

export default Profile;
