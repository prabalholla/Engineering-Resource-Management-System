import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { useState } from 'react';

function Login() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [role, setRole] = useState('engineer');
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      console.log('Form submitted with:', data); // Debug log
      setLoginError(''); // Clear any previous errors
      
      // Validate input
      if (!data.email || !data.password) {
        setLoginError('Email and password are required');
        return;
      }
      
      const success = await login(data.email, data.password);
      console.log('Login success:', success); // Debug log
      
      if (success) {
        // Simply navigate to root and let App.js handle the routing
        navigate('/');
      } else {
        setLoginError('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  const toggleRole = (newRole) => {
    setRole(newRole);
    setValue('email', newRole === 'manager' ? 'manager@gmail.com' : 'engineer@gmail.com');
    setValue('password', '12345'); // Default password for demo
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Professional Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Corporate geometric patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-repeat bg-[linear-gradient(45deg,#ffffff0a_1px,transparent_1px)] bg-[length:40px_40px] animate-slide-diagonal"></div>
          <div className="absolute inset-0 bg-repeat bg-[linear-gradient(-45deg,#ffffff0a_1px,transparent_1px)] bg-[length:40px_40px] animate-slide-diagonal-reverse"></div>
        </div>
        
        {/* Subtle gradient orbs */}
        <div className="absolute -left-1/4 -top-1/4 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-3xl animate-float-subtle"></div>
        <div className="absolute -right-1/4 -bottom-1/4 w-1/2 h-1/2 bg-indigo-500/10 rounded-full blur-3xl animate-float-subtle-reverse"></div>
        
        {/* Professional accent lines */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent animate-pulse-slow"></div>
        
        {/* Modern gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-800/30 via-transparent to-transparent"></div>
      </div>
      <div className="max-w-md w-full mx-4 relative z-10">
        {/* Logo/Icon Section */}
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-br from-blue-600 to-blue-800 p-4 rounded-xl mb-4 shadow-xl border border-blue-700/30 animate-float-subtle group relative overflow-hidden">
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
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200 mb-2 drop-shadow-lg animate-fade-in-up">
            Engineering Resource Management System
          </h1>
          <div className="w-32 h-0.5 bg-gradient-to-r from-blue-500/50 via-white/50 to-blue-500/50 mx-auto rounded-full mb-6 animate-pulse-slow"></div>
          <div className="bg-gradient-to-r from-slate-800/50 to-blue-900/50 backdrop-blur-md px-6 py-3 rounded-lg inline-block border border-white/10 shadow-lg transform hover:scale-105 transition-all duration-500">
            <h2 className="text-xl text-white/90 font-semibold tracking-wide">Welcome Back</h2>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-8 border border-white/20 hover:shadow-blue-500/10 transition-all duration-500">
          {/* Role Selection */}
          <div className="flex justify-center space-x-4 mb-8">
            <button
              type="button"
              onClick={() => toggleRole('engineer')}
              className={`flex items-center px-6 py-3 rounded-lg transition-all duration-500 ${
                role === 'engineer'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-105'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:shadow'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
              Engineer
            </button>
            <button
              type="button"
              onClick={() => toggleRole('manager')}
              className={`flex items-center px-6 py-3 rounded-lg transition-all duration-200 ${
                role === 'manager'
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              Manager
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <div className="relative">
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-blue-500 pl-10 transition-all duration-300 hover:border-blue-300 bg-white/50 backdrop-blur-sm"
                  placeholder="Username"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
            </div>

            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: true })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-blue-500 pl-10 pr-10"
                  placeholder="Password"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 hover:text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                      <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 hover:text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && <span className="text-red-500 text-sm">Password is required</span>}
            </div>
            {loginError && (
              <div className="text-red-500 text-sm text-center">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/25 active:scale-[0.98]"
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
