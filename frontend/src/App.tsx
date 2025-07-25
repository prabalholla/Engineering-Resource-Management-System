import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './store/auth';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Projects from './pages/Projects';
import Engineers from './pages/Engineers';
import EngineerForm from './pages/EngineerForm';
import Assignments from './pages/Assignments';
import CreateAssignment from './pages/CreateAssignment';
import MyAssignments from './pages/MyAssignments';
import Profile from './pages/Profile';
import Layout from './components/Layout';
import { ManagerRoute } from './components/ManagerRoute';
import { User } from './types';

function App(): JSX.Element {
  const { isAuthenticated, user } = useAuth();
  const isManager = user?.role === 'manager';

  // Ensure we redirect to the correct initial route based on role
  const getDefaultRoute = (): string => {
    if (!user) return '/login';
    return isManager ? '/projects' : '/my-assignments';
  };

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route 
          path="/login" 
          element={!isAuthenticated ? <Login /> : <Navigate to={getDefaultRoute()} />} 
        />
      
        <Route 
          path="/" 
          element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}
        >
          <Route 
            index 
            element={<Navigate to={getDefaultRoute()} replace />} 
          />
          <Route 
            path="projects" 
            element={<ManagerRoute><Projects /></ManagerRoute>} 
          />
          <Route 
            path="engineers" 
            element={<Engineers />} 
          />
          <Route 
            path="engineers/create" 
            element={<ManagerRoute><EngineerForm /></ManagerRoute>} 
          />
          <Route 
            path="engineers/:id/edit" 
            element={<ManagerRoute><EngineerForm /></ManagerRoute>} 
          />
          <Route 
            path="assignments" 
            element={<Assignments />} 
          />
          <Route 
            path="assignments/create" 
            element={<ManagerRoute><CreateAssignment /></ManagerRoute>} 
          />
          <Route 
            path="my-assignments" 
            element={<MyAssignments />} 
          />
          <Route 
            path="profile" 
            element={<Profile />} 
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
