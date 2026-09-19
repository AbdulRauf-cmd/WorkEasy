import React from 'react';
import { useApp } from '../context/AppContext';
import { Language } from '../types';
import { Globe } from 'lucide-react';

export default function LanguageSwitch() {
  const { state, setLanguage } = useApp();
  const currentLang = state.language || 'en';

  const languages: { id: Language; label: string }[] = [
    { id: 'en', label: 'EN' },
    { id: 'ta', label: 'தமிழ்' },
    { id: 'hi', label: 'हिंदी' },
  ];

  return (
    <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200/80">
      <Globe size={11} className="text-slate-400 ml-1 shrink-0" />
      <div className="flex items-center">
        {languages.map((l) => {
          const active = currentLang === l.id;
          return (
            <button
              key={l.id}
              onClick={() => setLanguage(l.id)}
              className={`px-1.5 py-0.5 text-[10px] font-bold rounded transition-all ${
                active 
                  ? 'bg-slate-900 text-white shadow-xs' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title={`Switch to ${l.label}`}
            >
              {l.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
