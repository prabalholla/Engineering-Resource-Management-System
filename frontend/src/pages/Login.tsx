import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { useState } from 'react';
import { ErrorResponse } from '../types';

interface LoginFormInputs {
  email: string;
  password: string;
}

function Login(): JSX.Element {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<LoginFormInputs>();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [role, setRole] = useState<'engineer' | 'manager'>('engineer');
  const [loginError, setLoginError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onSubmit = async (data: LoginFormInputs): Promise<void> => {
    try {
      console.log('Form submitted with:', data);
      setLoginError('');
      
      if (!data.email || !data.password) {
        setLoginError('Email and password are required');
        return;
      }
      
      const success = await login(data.email, data.password);
      console.log('Login success:', success);
      
      if (success) {
        navigate('/');
      } else {
        setLoginError('Invalid email or password');
      }
    } catch (error) {
      const err = error as ErrorResponse;
      console.error('Login error:', err);
      setLoginError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  const toggleRole = (newRole: 'engineer' | 'manager'): void => {
    setRole(newRole);
    setValue('email', newRole === 'manager' ? 'manager@gmail.com' : 'engineer@gmail.com');
    setValue('password', '12345');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-30 bg-pattern"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-slate-900/50"></div>
      </div>

      {/* Login Container */}
      <div className="relative z-10 w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="mt-2 text-gray-600">Sign in to access your account</p>
        </div>

        {/* Role Toggle */}
        <div className="flex p-1 mb-6 bg-gray-100 rounded-lg">
          <button
            onClick={() => toggleRole('engineer')}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
              role === 'engineer'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Engineer
          </button>
          <button
            onClick={() => toggleRole('manager')}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
              role === 'manager'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Manager
          </button>
        </div>

        {loginError && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm">
            {loginError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="mt-1">
              <input
                id="email"
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                className="appearance-none block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="you@company.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1 relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                {...register('password', { required: 'Password is required' })}
                className="appearance-none block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                )}
              </button>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
