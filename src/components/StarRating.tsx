import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface Props {
  rating: number;
  onChange?: (rating: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function StarRating({ rating, onChange, readonly = false, size = 'md' }: Props) {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  const containerPadding = readonly ? 'py-0' : 'py-2';
  const touchTarget = readonly ? 'w-auto' : 'min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer';

  return (
    <div className={`flex items-center gap-1 ${containerPadding}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.div
          key={star}
          whileTap={!readonly ? { scale: 0.8 } : undefined}
          className={touchTarget}
          onClick={() => !readonly && onChange && onChange(star)}
        >
          <Star 
            className={`${sizeClasses[size]} transition-colors ${
              star <= rating 
                ? 'fill-amber-400 text-amber-400' 
                : 'fill-transparent text-gray-300'
            }`} 
          />
        </motion.div>
      ))}
    </div>
  );
}
