import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';

function Layout() {
  const navigate = useNavigate();
  const { user, logout, isManager } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getLinkClass = ({ isActive }) => `
    px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-2
    ${isActive 
      ? 'bg-blue-600/20 text-white shadow-lg border border-blue-500/20' 
      : 'text-blue-100/80 hover:bg-blue-800/30 hover:text-white'
    }
  `;

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 shadow-xl">
        <div className=" mx-auto px-4">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center space-x-3 group">
                <div className="relative z-10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white/90 transform group-hover:scale-110 transition-transform duration-500" viewBox="0 0 24 24" fill="none">
                    {/* Main circular frame */}
                    <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="0.5" className="opacity-20" />
                    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1" className="opacity-50" />
                    
                    {/* Dynamic grid pattern */}
                    <path d="M12 4v16M4 12h16" stroke="currentColor" strokeWidth="0.5" className="opacity-30" />
                    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="0.5" className="opacity-30" />
                    
                    {/* Central network nodes */}
                    <circle cx="12" cy="12" r="1.5" fill="currentColor" className="opacity-90" />
                    <circle cx="12" cy="7" r="1" fill="currentColor" className="opacity-70" />
                    <circle cx="17" cy="12" r="1" fill="currentColor" className="opacity-70" />
                    <circle cx="12" cy="17" r="1" fill="currentColor" className="opacity-70" />
                    <circle cx="7" cy="12" r="1" fill="currentColor" className="opacity-70" />
                    
                    {/* Connection lines */}
                    <path d="M12 8.5L12 10.5M13.5 12L15.5 12M12 13.5L12 15.5M8.5 12L10.5 12" 
                          stroke="currentColor" strokeWidth="0.5" className="opacity-50" />
                    
                    {/* Outer connection points */}
                    <circle cx="12" cy="4" r="0.5" fill="currentColor" className="opacity-50" />
                    <circle cx="20" cy="12" r="0.5" fill="currentColor" className="opacity-50" />
                    <circle cx="12" cy="20" r="0.5" fill="currentColor" className="opacity-50" />
                    <circle cx="4" cy="12" r="0.5" fill="currentColor" className="opacity-50" />
                    
                    {/* Abstract gear segments */}
                    <path d="M12 2.5C14.5 2.5 17 3.5 19 5.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" className="opacity-80" />
                    <path d="M21.5 12C21.5 14.5 20.5 17 18.5 19" stroke="currentColor" strokeWidth="1" strokeLinecap="round" className="opacity-80" />
                    <path d="M12 21.5C9.5 21.5 7 20.5 5 18.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" className="opacity-80" />
                    <path d="M2.5 12C2.5 9.5 3.5 7 5.5 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" className="opacity-80" />
                  </svg>
                  
                  {/* Management overlay icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/90 absolute transform group-hover:scale-110 transition-transform duration-500 -right-1 -bottom-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87" />
                    <path d="M16 3.13a4 4 0 010 7.75" />
                  </svg>
                </div>
                <span className="text-lg font-semibold text-white tracking-wide group-hover:text-blue-100 transition-colors duration-300">
                  Engineering Resources
                </span>
              </Link>

              <div className="hidden sm:ml-10 sm:flex sm:space-x-1">
                {isManager() ? (
                  <>
                    <NavLink to="/projects" className={getLinkClass}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                      </svg>
                      <span>Projects</span>
                    </NavLink>
                    <NavLink to="/engineers" className={getLinkClass}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                      </svg>
                      <span>Team</span>
                    </NavLink>
                    <NavLink to="/assignments" className={getLinkClass}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
                      </svg>
                      <span>Assignments</span>
                    </NavLink>
                  </>
                ) : (
                  <>
                    <NavLink to="/my-assignments" className={getLinkClass}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
                      </svg>
                      <span>My Tasks</span>
                    </NavLink>
                    <NavLink to="/profile" className={getLinkClass}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                      </svg>
                      <span>Profile</span>
                    </NavLink>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 px-4 py-2 rounded-lg bg-blue-800/30 border border-blue-700/30">
                <svg className="w-5 h-5 text-blue-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                <span className="text-sm font-medium text-blue-100">{user?.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium
                          hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-900"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
