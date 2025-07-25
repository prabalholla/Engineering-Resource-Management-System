import React from 'react';
import { cn } from '../../lib/utils';

export function CapacityBar({ capacity, maxCapacity = 100 }) {
  const percentage = (capacity / maxCapacity) * 100;
  const getColorClass = () => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm mb-1">
        <span>Capacity</span>
        <span>{percentage.toFixed(0)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={cn("h-2.5 rounded-full", getColorClass())}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
