import React from 'react';
import { useStore } from '../store';
import { AssignmentTimeline } from '../components/ui/assignment-timeline';
import { CapacityBar } from '../components/ui/capacity-bar';

export default function MyAssignments() {
  const { assignments, loading, fetchAssignments } = useStore();

  React.useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  // We don't need to filter by engineerId anymore since the backend handles that
  const currentDate = new Date();
  
  const currentAssignments = assignments
    .filter(a => new Date(a.startDate) <= currentDate && new Date(a.endDate) >= currentDate)
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

  const upcomingAssignments = assignments
    .filter(a => new Date(a.startDate) > currentDate)
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

  // Calculate total capacity used
  const totalCapacityUsed = currentAssignments.reduce(
    (sum, assignment) => sum + assignment.allocationPercentage,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent tracking-tight">My Assignments</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage and track your project assignments and capacity
            </p>
          </div>
        </div>
        
        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Capacity Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Current Capacity</h2>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium
                  ${totalCapacityUsed >= 90 ? 'bg-red-100 text-red-800' :
                    totalCapacityUsed >= 70 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'}`}>
                  {totalCapacityUsed}%
                </span>
              </div>
              <CapacityBar 
                capacity={totalCapacityUsed}
                maxCapacity={100}
              />
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-gray-500">Total Allocation</span>
                <span className="font-medium text-gray-900">{totalCapacityUsed}% of 100%</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-sm font-medium text-gray-500">Current Projects</h3>
              <div className="mt-2 flex items-baseline">
                <p className="text-3xl font-semibold text-gray-900">{currentAssignments.length}</p>
                <p className="ml-2 text-sm text-gray-500">assignments</p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-sm font-medium text-gray-500">Upcoming Projects</h3>
              <div className="mt-2 flex items-baseline">
                <p className="text-3xl font-semibold text-gray-900">{upcomingAssignments.length}</p>
                <p className="ml-2 text-sm text-gray-500">assignments</p>
              </div>
            </div>
          </div>
        </div>

        {/* Current Assignments Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Current Projects</h2>
              <p className="mt-1 text-sm text-gray-500">
                Active assignments that require your attention
              </p>
            </div>
          </div>
          
          {currentAssignments.length > 0 ? (
            <AssignmentTimeline assignments={currentAssignments} />
          ) : (
            <div className="text-center py-8">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No Current Assignments</h3>
              <p className="mt-1 text-sm text-gray-500">You don't have any active projects at the moment.</p>
            </div>
          )}
        </div>

        {/* Upcoming Assignments Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Upcoming Projects</h2>
              <p className="mt-1 text-sm text-gray-500">
                Projects starting in the future
              </p>
            </div>
          </div>
          
          {upcomingAssignments.length > 0 ? (
            <AssignmentTimeline assignments={upcomingAssignments} />
          ) : (
            <div className="text-center py-8">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No Upcoming Assignments</h3>
              <p className="mt-1 text-sm text-gray-500">You don't have any projects scheduled for the future.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
