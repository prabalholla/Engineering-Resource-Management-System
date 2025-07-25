import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [engineers, setEngineers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentAssignmentId, setCurrentAssignmentId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [newAssignment, setNewAssignment] = useState({
    engineerId: '',
    projectId: '',
    startDate: '',
    endDate: '',
    role: '',
    timeCommitment: 100
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [assignmentsRes, engineersRes, projectsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/assignments'),
          axios.get('http://localhost:5000/api/engineers'),
          axios.get('http://localhost:5000/api/projects')
        ]);
        
        setAssignments(assignmentsRes.data);
        setEngineers(engineersRes.data);
        setProjects(projectsRes.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAssignment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = (assignment) => {
    setIsEditMode(true);
    setCurrentAssignmentId(assignment._id);
    setNewAssignment({
      engineerId: assignment.engineerId,
      projectId: assignment.projectId,
      startDate: assignment.startDate.split('T')[0],
      endDate: assignment.endDate.split('T')[0],
      role: assignment.role,
      timeCommitment: assignment.timeCommitment
    });
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setNewAssignment({
      engineerId: '',
      projectId: '',
      startDate: '',
      endDate: '',
      role: '',
      timeCommitment: 100
    });
    setIsEditMode(false);
    setCurrentAssignmentId(null);
    setIsModalOpen(false);
    setError('');
  };

  const validateDates = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return end > start;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate dates
    if (!validateDates(newAssignment.startDate, newAssignment.endDate)) {
      setError('End date must be after start date');
      return;
    }

    setIsSubmitting(true);

    try {
      // Transform timeCommitment to allocationPercentage
      const assignmentData = {
        ...newAssignment,
        allocationPercentage: newAssignment.timeCommitment
      };
      delete assignmentData.timeCommitment;

      let response;
      if (isEditMode) {
        response = await axios.put(`http://localhost:5000/api/assignments/${currentAssignmentId}`, assignmentData);
        setAssignments(prev => prev.map(a => a._id === currentAssignmentId ? response.data : a));
      } else {
        response = await axios.post('http://localhost:5000/api/assignments', assignmentData);
        setAssignments(prev => [...prev, response.data]);
      }
      
      resetForm();
    } catch (err) {
      if (err.response?.data?.message?.includes('capacity would be exceeded')) {
        const engineer = engineers.find(e => e._id === newAssignment.engineerId);
        const engineerName = engineer ? engineer.name : 'The engineer';
        setError(`${engineerName}'s capacity would be exceeded during this period. Please adjust the time commitment or dates.`);
      } else {
        setError(err.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'create'} assignment`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getEngineerName = (engineerId) => {
    const engineer = engineers.find(e => e._id === engineerId);
    return engineer ? engineer.name : 'Unknown Engineer';
  };

  const getProjectName = (projectId) => {
  const project = projects.find(p => p._id === projectId);
  return project ? project.name : 'Unknown Project';
};


  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateProgress = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    
    if (today < start) return 0;
    if (today > end) return 100;
    
    const total = end.getTime() - start.getTime();
    const current = today.getTime() - start.getTime();
    return Math.round((current / total) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
              Project Assignments
            </h1>
            <p className="text-gray-600 mt-2">Manage team assignments and project allocations</p>
          </div>
          <button 
            onClick={() => {
              resetForm();
              setIsModalOpen(true);
            }}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg 
                     hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200
                     shadow-md hover:shadow-xl flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>New Assignment</span>
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {assignments.map((assignment) => {
              const progress = calculateProgress(assignment.startDate, assignment.endDate);
              return (
                <div key={assignment._id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-3 rounded-lg">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                          {getProjectName(assignment.projectId)}
                        </h3>
                        <p className="text-gray-500 text-sm">{assignment.role}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>{getEngineerName(assignment.engineerId)}</span>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm text-gray-500 mb-1">
                          <span>{formatDate(assignment.startDate)}</span>
                          <span>{formatDate(assignment.endDate)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 rounded-full h-2 transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm font-medium text-gray-600">Progress</span>
                          <span className="text-sm font-medium text-blue-600">{progress}%</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Time Commitment:</span>
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          {assignment.timeCommitment}%
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <button
                        onClick={() => handleEdit(assignment)}
                        className="w-full bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-600 
                                 py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        <span>Edit Assignment</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl transform transition-all duration-300 scale-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
                  {isEditMode ? 'Edit Assignment' : 'New Assignment'}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {error && (
                <div className="mb-6 bg-red-50 text-red-600 px-4 py-3 rounded-lg flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Engineer</label>
                  <select
                    name="engineerId"
                    value={newAssignment.engineerId}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 rounded-lg border border-gray-200 
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             transition-all duration-200"
                    required
                  >
                    <option value="">Select Engineer</option>
                    {engineers.map(engineer => (
                      <option key={engineer._id} value={engineer._id}>
                        {engineer.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
                  <select
                    name="projectId"
                    value={newAssignment.projectId}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 rounded-lg border border-gray-200 
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             transition-all duration-200"
                    required
                  >
                    <option value="">Select Project</option>
                    {projects.map(project => (
                      <option key={project._id} value={project._id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <input
                    type="text"
                    name="role"
                    value={newAssignment.role}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 rounded-lg border border-gray-200 
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             placeholder-gray-400 transition-all duration-200"
                    placeholder="e.g., Frontend Developer"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input
                      type="date"
                      name="startDate"
                      value={newAssignment.startDate}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="block w-full px-4 py-3 rounded-lg border border-gray-200 
                               focus:ring-2 focus:ring-blue-500 focus:border-transparent
                               transition-all duration-200"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <input
                      type="date"
                      name="endDate"
                      value={newAssignment.endDate}
                      onChange={handleInputChange}
                      min={newAssignment.startDate || new Date().toISOString().split('T')[0]}
                      className={`block w-full px-4 py-3 rounded-lg border transition-all duration-200
                                ${!validateDates(newAssignment.startDate, newAssignment.endDate) && newAssignment.endDate
                                  ? 'border-red-300 focus:ring-2 focus:ring-red-500 focus:border-transparent'
                                  : 'border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                }`}
                      required
                    />
                    {!validateDates(newAssignment.startDate, newAssignment.endDate) && newAssignment.endDate && (
                      <p className="mt-1 text-sm text-red-600">End date must be after start date</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time Commitment (%)
                  </label>
                  <input
                    type="number"
                    name="timeCommitment"
                    value={newAssignment.timeCommitment}
                    onChange={handleInputChange}
                    className={`block w-full px-4 py-3 rounded-lg border transition-all duration-200
                              ${newAssignment.timeCommitment < 1 || newAssignment.timeCommitment > 100
                                ? 'border-red-300 focus:ring-2 focus:ring-red-500 focus:border-transparent'
                                : 'border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                              }`}
                    min="1"
                    max="100"
                    step="1"
                    placeholder="Enter a value between 1 and 100"
                    required
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 
                             hover:bg-gray-200 rounded-lg transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-6 py-2.5 text-sm font-medium text-white rounded-lg
                              transform transition-all duration-200 flex items-center space-x-2
                              ${isSubmitting 
                                ? 'bg-blue-400 cursor-not-allowed' 
                                : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg'
                              }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>{isEditMode ? 'Updating...' : 'Creating...'}</span>
                      </>
                    ) : (
                      <span>{isEditMode ? 'Update Assignment' : 'Create Assignment'}</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Assignments;
