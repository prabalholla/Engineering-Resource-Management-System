import React from 'react';
import { format } from 'date-fns';
import { cn } from '../../lib/utils';
import { Assignment } from '../../types';

interface AssignmentTimelineProps {
  assignments: Assignment[];
}

export function AssignmentTimeline({ assignments }: AssignmentTimelineProps): JSX.Element {
  const sortedAssignments = [...assignments].sort((a, b) => 
    new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );

  return (
    <div className="space-y-6">
      {sortedAssignments.map((assignment, index) => (
        <div key={assignment._id} className="relative flex items-center">
          <div className="flex items-center">
            {/* Timeline dot */}
            <div className="absolute left-0 w-3 h-3 bg-blue-600 rounded-full" />
            
            {/* Timeline line */}
            {index < assignments.length - 1 && (
              <div className="absolute left-1.5 top-3 w-px h-full bg-gray-200" />
            )}
          </div>

          {/* Assignment card */}
          <div className="ml-8 p-4 bg-white rounded-lg shadow-sm border w-full">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-gray-900">
                  {assignment.project.name}
                </h4>
                <p className="text-sm text-gray-500">{assignment.engineer.name}</p>
              </div>
              <span className={cn(
                "px-2 py-1 text-xs rounded-full",
                assignment.allocationPercentage >= 90 ? "bg-red-100 text-red-800" :
                assignment.allocationPercentage >= 70 ? "bg-yellow-100 text-yellow-800" :
                "bg-blue-100 text-blue-800"
              )}>
                {assignment.allocationPercentage}%
              </span>
            </div>
            
            <div className="mt-2 text-sm text-gray-600">
              {format(new Date(assignment.startDate), 'MMM d, yyyy')} - {' '}
              {format(new Date(assignment.endDate), 'MMM d, yyyy')}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
