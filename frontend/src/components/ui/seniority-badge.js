import React from 'react';

export function SeniorityBadge({ seniority }) {
  const colors = {
    junior: 'bg-green-100 text-green-800',
    mid: 'bg-blue-100 text-blue-800',
    senior: 'bg-purple-100 text-purple-800',
    lead: 'bg-indigo-100 text-indigo-800'
  };

  const level = seniority || 'junior'; // Default to junior if no seniority provided

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[level] || colors.junior}`}>
      {level.charAt(0).toUpperCase() + level.slice(1)}
    </span>
  );
}
