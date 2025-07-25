import React from 'react';
import { useStore } from '../store';
import { AssignmentTimeline } from '../components/ui/assignment-timeline';
import { CapacityBar } from '../components/ui/capacity-bar';
import { Assignment } from '../types';

export default function MyAssignments(): JSX.Element {
  const { assignments, loading, fetchAssignments } = useStore();

  React.useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  const currentDate = new Date();
  
  const currentAssignments: Assignment[] = assignments
    .filter(a => new Date(a.startDate) <= currentDate && new Date(a.endDate) >= currentDate)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

  const upcomingAssignments: Assignment[] = assignments
    .filter(a => new Date(a.startDate) > currentDate)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

  const totalCapacityUsed: number = currentAssignments.reduce(
    (sum, assignment) => sum + assignment.allocationPercentage,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent tracking-tight">
              My Assignments
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage and track your project assignments and capacity
            </p>
          </div>
        </div>
        
        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Capacity Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Capacity</h2>
              <CapacityBar capacity={totalCapacityUsed} />
              <p className="text-sm text-gray-600 mt-2">
                {totalCapacityUsed}% of 100% capacity allocated
              </p>
              {totalCapacityUsed > 100 && (
                <p className="text-sm text-red-600 mt-2">
                  Warning: You are over capacity
                </p>
              )}
            </div>
          </div>

          {/* Current Assignments Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Projects</h2>
              {currentAssignments.length > 0 ? (
                <AssignmentTimeline assignments={currentAssignments} />
              ) : (
                <p className="text-gray-500">No current assignments</p>
              )}
            </div>
          </div>
        </div>

        {/* Upcoming Assignments */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Projects</h2>
          {upcomingAssignments.length > 0 ? (
            <AssignmentTimeline assignments={upcomingAssignments} />
          ) : (
            <p className="text-gray-500">No upcoming assignments</p>
          )}
        </div>
      </div>
    </div>
  );
}
