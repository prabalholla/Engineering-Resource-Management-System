import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useStore } from '../store';

const SKILL_OPTIONS = [
  'JavaScript',
  'TypeScript',
  'React',
  'Node.js',
  'Python',
  'Java',
  'C#',
  'SQL',
  'MongoDB',
  'AWS',
  'Docker',
  'Kubernetes'
];

const SENIORITY_LEVELS = [
  { value: 'junior', label: 'Junior Engineer' },
  { value: 'mid', label: 'Mid-Level Engineer' },
  { value: 'senior', label: 'Senior Engineer' },
  { value: 'lead', label: 'Lead Engineer' }
];

export default function EngineerForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { engineers, loading, createEngineer, updateEngineer, fetchEngineers } = useStore();
  const { register, handleSubmit, setValue, watch } = useForm();

  const selectedSkills = watch('skills', []);
  const employmentType = watch('employmentType', 'full-time');

  React.useEffect(() => {
    if (id) {
      fetchEngineers();
    }
  }, [id, fetchEngineers]);

  React.useEffect(() => {
    if (id && engineers.length > 0) {
      const engineer = engineers.find(e => e._id === id);
      if (engineer) {
        setValue('name', engineer.name);
        setValue('email', engineer.email);
        setValue('skills', engineer.skills);
        setValue('seniority', engineer.seniority);
        setValue('employmentType', engineer.employmentType);
      }
    }
  }, [id, engineers, setValue]);

  const onSubmit = async (data) => {
    const engineerData = {
      ...data,
      role: 'engineer',
      maxCapacity: data.employmentType === 'full-time' ? 100 : 50,
      availableCapacity: data.employmentType === 'full-time' ? 100 : 50
    };

    if (id) {
      await updateEngineer(id, engineerData);
    } else {
      await createEngineer(engineerData);
    }
    navigate('/engineers');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          {id ? 'Edit Engineer Profile' : 'Add New Engineer'}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white rounded-lg shadow-sm border p-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                {...register('name', { required: true })}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                {...register('email', { required: true })}
                className="w-full p-2 border rounded-md"
              />
            </div>

            {!id && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  {...register('password', { required: !id })}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            )}
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skills
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {SKILL_OPTIONS.map((skill) => (
                <label key={skill} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    value={skill}
                    {...register('skills')}
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <span className="ml-2 text-sm text-gray-700">{skill}</span>
                </label>
              ))}
            </div>
            {selectedSkills.length === 0 && (
              <p className="mt-1 text-sm text-red-600">
                Please select at least one skill
              </p>
            )}
          </div>

          {/* Seniority Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Seniority Level
            </label>
            <select
              {...register('seniority', { required: true })}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select level</option>
              {SENIORITY_LEVELS.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Employment Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Employment Type
            </label>
            <select
              {...register('employmentType', { required: true })}
              className="w-full p-2 border rounded-md"
            >
              <option value="full-time">Full-time (100% capacity)</option>
              <option value="part-time">Part-time (50% capacity)</option>
            </select>
            <p className="mt-1 text-sm text-gray-500">
              Maximum capacity: {employmentType === 'full-time' ? '100%' : '50%'}
            </p>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => navigate('/engineers')}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              disabled={selectedSkills.length === 0}
            >
              {id ? 'Update Profile' : 'Create Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
