import { Link, useLocation } from 'react-router-dom';

export function NavLink({ to, children, className }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  const baseClasses = "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-2";
  const activeClasses = "bg-blue-600/20 text-white shadow-lg border border-blue-500/20";
  const inactiveClasses = "text-blue-100/80 hover:bg-blue-800/30 hover:text-white";

  return (
    <Link
      to={to}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses} ${className || ''}`}
    >
      {children}
    </Link>
  );
}
