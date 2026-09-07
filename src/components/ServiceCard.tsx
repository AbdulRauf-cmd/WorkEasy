import React from 'react';
import { motion } from 'framer-motion';
import { ServiceType } from '../types';

interface Props {
  service: ServiceType;
  icon: string;
  selected?: boolean;
  onSelect?: () => void;
}

export default function ServiceCard({ service, icon, selected, onSelect }: Props) {
  const formattedService = service.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      onClick={onSelect}
      className={`w-full flex flex-col items-center justify-center p-4 rounded-xl transition-all border-2 ${
        selected 
          ? 'border-blue-600 bg-blue-50/50 shadow-sm' 
          : 'border-transparent bg-white shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] hover:shadow-md'
      }`}
    >
      <span className="text-4xl mb-2">{icon}</span>
      <span className={`font-medium text-center leading-tight ${selected ? 'text-blue-900' : 'text-gray-700'}`}>
        {formattedService}
      </span>
    </motion.button>
  );
}
