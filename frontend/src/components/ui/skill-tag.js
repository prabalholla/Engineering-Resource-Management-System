import React from 'react';
import { cn } from '../../lib/utils';

const skillColors = {
  'React': 'bg-blue-100 text-blue-800',
  'Node.js': 'bg-green-100 text-green-800',
  'Python': 'bg-yellow-100 text-yellow-800',
  'TypeScript': 'bg-blue-100 text-blue-800',
  'MongoDB': 'bg-green-100 text-green-800',
  'PostgreSQL': 'bg-blue-100 text-blue-800',
  'AWS': 'bg-orange-100 text-orange-800',
  'default': 'bg-gray-100 text-gray-800'
};

export function SkillTag({ skill, className }) {
  return (
    <span className={cn(
      "px-2 py-1 rounded-full text-xs font-medium",
      skillColors[skill] || skillColors.default,
      className
    )}>
      {skill}
    </span>
  );
}

export function SkillTagList({ skills, className }) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {skills.map((skill, index) => (
        <SkillTag key={index} skill={skill} />
      ))}
    </div>
  );
}
