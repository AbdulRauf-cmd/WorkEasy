import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, CalendarCheck2, Plus, Clock3, UserRound } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useApp();
  
  if (state.role === 'admin') return null;

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="w-full bg-white border-t border-slate-200/80 pb-safe z-40">
      <div className="flex justify-around items-center h-14 px-2">
        {/* Home */}
        <button 
          onClick={() => navigate('/')} 
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors ${
            isActive('/') ? 'text-slate-900 font-semibold' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" strokeWidth={isActive('/') ? 2.25 : 1.75} />
          <span className="text-[10px] tracking-tight">Explore</span>
        </button>

        {/* Bookings / Jobs */}
        <button 
          onClick={() => navigate('/jobs')} 
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors relative ${
            isActive('/jobs') || isActive('/job-details') ? 'text-slate-900 font-semibold' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <div className="relative">
            <CalendarCheck2 className="w-5 h-5 mb-0.5" strokeWidth={isActive('/jobs') || isActive('/job-details') ? 2.25 : 1.75} />
            {state.currentJob && (
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white" />
            )}
          </div>
          <span className="text-[10px] tracking-tight">{state.role === 'worker' ? 'Jobs' : 'Bookings'}</span>
        </button>

        {/* Primary Post / Dispatch Button */}
        {state.role === 'customer' && (
          <button
            onClick={() => navigate('/post-job')}
            className="flex-1 flex flex-col items-center justify-center py-1 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <Plus className="w-5 h-5" strokeWidth={2.5} />
            </div>
            <span className="text-[10px] font-semibold text-blue-700 tracking-tight mt-0.5">Book</span>
          </button>
        )}

        {/* Activity */}
        <button 
          onClick={() => navigate('/activity')} 
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors ${
            isActive('/activity') ? 'text-slate-900 font-semibold' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Clock3 className="w-5 h-5 mb-0.5" strokeWidth={isActive('/activity') ? 2.25 : 1.75} />
          <span className="text-[10px] tracking-tight">Activity</span>
        </button>

        {/* Profile */}
        <button 
          onClick={() => navigate('/profile')} 
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors ${
            isActive('/profile') ? 'text-slate-900 font-semibold' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <UserRound className="w-5 h-5 mb-0.5" strokeWidth={isActive('/profile') ? 2.25 : 1.75} />
          <span className="text-[10px] tracking-tight">Account</span>
        </button>
      </div>
    </nav>
  );
}
