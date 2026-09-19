import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Role } from '../types';
import { RotateCcw } from 'lucide-react';

import LanguageSwitch from './LanguageSwitch';

export default function RoleSwitch() {
  const { state, setRole, resetDemo, t } = useApp();
  const navigate = useNavigate();

  const handleRoleChange = (role: Role) => {
    setRole(role);
    if (role === 'customer') {
      navigate('/');
    } else if (role === 'worker') {
      navigate('/');
    } else if (role === 'admin') {
      navigate('/admin');
    }
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    resetDemo();
    navigate('/');
  };

  const roles: { id: Role; label: string; sub: string }[] = [
    { id: 'customer', label: t('roleCustomer'), sub: 'Priya' },
    { id: 'worker', label: t('roleWorker'), sub: 'Ramesh' },
    { id: 'admin', label: t('roleAdmin'), sub: 'HQ' },
  ];

  return (
    <header className="absolute top-0 inset-x-0 z-50 px-2.5 pt-2 pb-1.5 bg-white/95 backdrop-blur-md border-b border-slate-200/80 flex items-center justify-between shadow-xs gap-1.5">
      <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200/60">
        {roles.map((r) => {
          const isSelected = state.role === r.id;
          return (
            <button
              key={r.id}
              onClick={() => handleRoleChange(r.id)}
              className={`px-2 py-1 text-[10px] font-bold rounded-md transition-all ${
                isSelected 
                  ? 'bg-white text-slate-900 shadow-xs' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {r.label}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-1.5">
        <LanguageSwitch />
        <button
          onClick={handleReset}
          title="Reset Demo State"
          className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition active:scale-95"
        >
          <RotateCcw size={12} />
        </button>
      </div>
    </header>
  );
}
