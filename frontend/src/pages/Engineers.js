import React, { useState, useEffect } from 'react';
import { useStore } from '../store';
import { useAuth } from '../store/auth';

import { SkillTagList } from '../components/ui/skill-tag';
import { CapacityBar } from '../components/ui/capacity-bar';
import { SeniorityBadge } from '../components/ui/seniority-badge';
import axios from 'axios';

function Engineers() {
  const { engineers, loading, fetchEngineers } = useStore();
  const { isManager } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEngineer, setEditingEngineer] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    seniority: 'junior',
    skills: [],
    employmentType: 'full-time'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEngineers();
  }, [fetchEngineers]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSkillsChange = (e) => {
    const value = e.target.value.trim();
    if (value && !formData.skills.includes(value)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, value]
      }));
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = editingEngineer
        ? await axios.put(`http://localhost:5000/api/engineers/${editingEngineer._id}`, formData)
        : await axios.post('http://localhost:5000/api/engineers', formData);
      
      if (response.status === 201 || response.status === 200) {
        await fetchEngineers();
        setIsModalOpen(false);
        resetForm();
      } else {
        setError('Unexpected response from server');
      }
    } catch (err) {
      console.error('Error saving engineer:', err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError('Failed to save engineer. Please check your connection and try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      seniority: 'junior',
      skills: [],
      employmentType: 'full-time'
    });
    setEditingEngineer(null);
    setError('');
  };

  const handleEdit = (engineer) => {
    setEditingEngineer(engineer);
    setFormData({
      name: engineer.name,
      email: engineer.email,
      seniority: engineer.seniority,
      skills: engineer.skills,
      employmentType: engineer.employmentType
    });
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Engineers</h1>
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add New Engineer
        </button>
      </div>

      {loading ? (
        <p>Loading engineers...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {engineers.map((engineer) => (
            <div key={engineer._id} className="bg-white rounded-lg shadow-sm p-6 border">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{engineer.name}</h2>
                  <p className="text-sm text-gray-500">{engineer.email}</p>
                </div>
                <SeniorityBadge level={engineer.seniority} />
              </div>

              <div className="mb-4">
                <div className="text-sm font-medium text-gray-700 mb-1">Skills</div>
                <SkillTagList skills={engineer.skills} />
              </div>

              <div className="space-y-3">
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-1">Employment Type</div>
                  <p className="text-sm text-gray-900">
                    {engineer.employmentType === 'full-time' ? 'Full-time (100%)' : 'Part-time (50%)'}
                  </p>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-700 mb-1">Capacity</div>
                  <CapacityBar 
                    capacity={100 - engineer.availableCapacity} 
                    maxCapacity={engineer.employmentType === 'full-time' ? 100 : 50}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {engineer.availableCapacity}% Available
                  </p>
                </div>
              </div>

              {isManager() && (
                <div className="mt-4 pt-4 border-t flex justify-end space-x-2">
                  <button
                    onClick={() => handleEdit(engineer)}
                    className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                  >
                    Edit Profile
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl transform transition-all">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {editingEngineer ? 'Edit Engineer Profile' : 'Add New Engineer'}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
                >
                  <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="px-6 py-4">
              {error && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 text-red-700 rounded">
                  <div className="flex">
                    <svg className="h-5 w-5 text-red-400 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span className="text-sm font-medium">{error}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      required
                      placeholder="Enter engineer's full name"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      required
                      placeholder="email@example.com"
                    />
                  </div>

                  {/* Seniority Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Seniority Level</label>
                    <select
                      name="seniority"
                      value={formData.seniority}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    >
                      <option value="junior">Junior Engineer</option>
                      <option value="mid">Mid-Level Engineer</option>
                      <option value="senior">Senior Engineer</option>
                    </select>
                  </div>

                  {/* Employment Type Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Employment Type</label>
                    <select
                      name="employmentType"
                      value={formData.employmentType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    >
                      <option value="full-time">Full-time (100%)</option>
                      <option value="part-time">Part-time (50%)</option>
                    </select>
                  </div>

                  {/* Skills Field */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                    <div className="flex flex-col space-y-3">
                      <input
                        type="text"
                        placeholder="Type a skill and press Enter"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleSkillsChange(e);
                            e.target.value = '';
                          }
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                      <div className="flex flex-wrap gap-2 min-h-[2.5rem] p-2 bg-gray-50 rounded-lg">
                        {formData.skills.map((skill) => (
                          <span
                            key={skill}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 group hover:bg-blue-200 transition-colors"
                          >
                            {skill}
                            <button
                              type="button"
                              onClick={() => removeSkill(skill)}
                              className="ml-2 text-blue-600 hover:text-blue-900 focus:outline-none"
                            >
                              <svg className="h-4 w-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M6 18L18 6M6 6l12 12"></path>
                              </svg>
                            </button>
                          </span>
                        ))}
                        {formData.skills.length === 0 && (
                          <span className="text-sm text-gray-500 italic">No skills added yet</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 rounded-b-xl border-t border-gray-100">
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="engineer-form"
                  disabled={isSubmitting}
                  className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors
                    ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </span>
                  ) : (
                    'Save Engineer'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Engineers;
