import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';

interface NavLinkProps {
  isActive: boolean;
}

function Layout(): JSX.Element {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const isManager = user?.role === 'manager';

  const handleLogout = (): void => {
    logout();
    navigate('/login');
  };

  const getLinkClass = ({ isActive }: NavLinkProps): string => `
    px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-2
    ${isActive 
      ? 'bg-blue-600/20 text-white shadow-lg border border-blue-500/20' 
      : 'text-blue-100/80 hover:bg-blue-800/30 hover:text-white'
    }
  `;

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 shadow-xl">
        <div className="mx-auto px-4">
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
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Resource Manager</h1>
                  <p className="text-xs text-blue-100/60">Engineering Assignment System</p>
                </div>
              </Link>
              
              <div className="ml-10 flex items-center space-x-4">
                {isManager ? (
                  <>
                    <NavLink to="/projects" className={getLinkClass}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      <span>Projects</span>
                    </NavLink>
                    <NavLink to="/engineers" className={getLinkClass}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <span>Engineers</span>
                    </NavLink>
                    <NavLink to="/assignments" className={getLinkClass}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                      <span>Assignments</span>
                    </NavLink>
                  </>
                ) : (
                  <NavLink to="/my-assignments" className={getLinkClass}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <span>My Assignments</span>
                  </NavLink>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <NavLink to="/profile" className={getLinkClass}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Profile</span>
              </NavLink>
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 rounded-lg text-sm font-medium text-blue-100/80 hover:bg-blue-800/30 hover:text-white transition-all duration-300 flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="py-10">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
