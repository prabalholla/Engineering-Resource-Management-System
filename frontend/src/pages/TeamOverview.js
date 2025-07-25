import React from 'react';
import { useStore } from '../store';
import { CapacityBar } from '../components/ui/capacity-bar';
import { SkillTagList } from '../components/ui/skill-tag';

export default function TeamOverview() {
  const { engineers, loading, fetchEngineers } = useStore();

  React.useEffect(() => {
    fetchEngineers();
  }, [fetchEngineers]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Team Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {engineers.map((engineer) => (
          <div key={engineer._id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg">{engineer.name}</h3>
                <p className="text-sm text-gray-600">{engineer.department}</p>
                <p className="text-sm text-gray-600 capitalize">{engineer.seniority} Engineer</p>
              </div>
            </div>

            <div className="mb-4">
              <SkillTagList skills={engineer.skills} />
            </div>

            <div className="mt-4">
              <CapacityBar 
                capacity={100 - engineer.availableCapacity} 
                maxCapacity={engineer.maxCapacity}
              />
            </div>

            <div className="mt-4 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Current Projects:</span>
                <span>{engineer.activeProjects || 0}</span>
              </div>
              <div className="flex justify-between">
                <span>Available Capacity:</span>
                <span>{engineer.availableCapacity}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
