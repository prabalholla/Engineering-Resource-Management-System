import React from 'react';
import { useForm } from 'react-hook-form';
import { useStore } from '../store';
import { SkillTagList } from '../components/ui/skill-tag';
import { CapacityBar } from '../components/ui/capacity-bar';

export default function CreateAssignment() {
  const { register, handleSubmit, watch } = useForm();
  const { engineers, projects, loading, fetchEngineers, fetchProjects, createAssignment } = useStore();
  const selectedProjectId = watch('projectId');
  const selectedEngineerId = watch('engineerId');

  React.useEffect(() => {
    fetchEngineers();
    fetchProjects();
  }, [fetchEngineers, fetchProjects]);

  const selectedProject = projects.find(p => p._id === selectedProjectId);
  const selectedEngineer = engineers.find(e => e._id === selectedEngineerId);

  const onSubmit = async (data) => {
    await createAssignment({
      ...data,
      allocationPercentage: parseInt(data.allocationPercentage),
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate)
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Create Assignment</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl bg-white rounded-lg shadow-sm border p-6">
        <div className="grid grid-cols-1 gap-6">
          {/* Project Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project
            </label>
            <select
              {...register('projectId', { required: true })}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select a project</option>
              {projects.map((project) => (
                <option key={project._id} value={project._id}>
                  {project.name}
                </option>
              ))}
            </select>
            {selectedProject && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">{selectedProject.description}</p>
                <div className="mt-2">
                  <label className="text-xs text-gray-500">Required Skills:</label>
                  <SkillTagList skills={selectedProject.requiredSkills} className="mt-1" />
                </div>
              </div>
            )}
          </div>

          {/* Engineer Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Engineer
            </label>
            <select
              {...register('engineerId', { required: true })}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select an engineer</option>
              {engineers.map((engineer) => (
                <option key={engineer._id} value={engineer._id}>
                  {engineer.name} - {engineer.availableCapacity}% Available
                </option>
              ))}
            </select>
            {selectedEngineer && (
              <div className="mt-2">
                <SkillTagList skills={selectedEngineer.skills} className="mb-2" />
                <CapacityBar 
                  capacity={100 - selectedEngineer.availableCapacity}
                  maxCapacity={selectedEngineer.maxCapacity}
                />
              </div>
            )}
          </div>

          {/* Allocation Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <input
                type="date"
                {...register('startDate', { required: true })}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <input
                type="date"
                {...register('endDate', { required: true })}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Allocation Percentage
            </label>
            <input
              type="number"
              min="0"
              max="100"
              {...register('allocationPercentage', { 
                required: true,
                min: 0,
                max: 100
              })}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <input
              type="text"
              {...register('role', { required: true })}
              className="w-full p-2 border rounded-md"
              placeholder="e.g., Frontend Developer"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Create Assignment
          </button>
        </div>
      </form>
    </div>
  );
}
