import { useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import SocialLogin from '../components/auth/SocialLogin';
import { AlertBanner, Button } from '../components/ui';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

interface ForgotPasswordFormData {
  email: string;
}

type AuthMode = 'login' | 'signup' | 'forgot-password';

const AuthPage = () => {
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string>('');
  const [authSuccess, setAuthSuccess] = useState<string>('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register } = useAuth();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  const loginForm = useForm<LoginFormData>();
  const signupForm = useForm<SignupFormData>();
  const forgotPasswordForm = useForm<ForgotPasswordFormData>();

  const switchAuthMode = (newMode: AuthMode) => {
    setAuthMode(newMode);
    setAuthError('');
    setAuthSuccess('');
  };

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    setAuthError('');
    
    try {
      await login(data.email, data.password);
      setAuthSuccess('Login successful! Redirecting...');
      
      // Redirect to intended destination or dashboard
      const from = (location.state as any)?.from?.pathname || '/dashboard';
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1000);
    } catch (error) {
      setAuthError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (data: SignupFormData) => {
    setIsLoading(true);
    setAuthError('');
    
    if (data.password !== data.confirmPassword) {
      setAuthError('Passwords do not match.');
      setIsLoading(false);
      return;
    }
    
    try {
      await register({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      });
      
      setAuthSuccess('Account created successfully! Redirecting to dashboard...');
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 1000);
    } catch (error) {
      setAuthError('An error occurred during signup. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (_data: ForgotPasswordFormData) => {
    setIsLoading(true);
    setAuthError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setAuthSuccess('Password reset link sent to your email!');
      setTimeout(() => {
        switchAuthMode('login');
      }, 2000);
    } catch (error) {
      setAuthError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderLoginForm = () => (
    <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Email Address
        </label>
        <input
          type="email"
          {...loginForm.register('email', { 
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200"
          placeholder="Enter your email"
        />
        {loginForm.formState.errors.email && (
          <p className="mt-1 text-sm text-red-600">{loginForm.formState.errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Password
        </label>
        <input
          type="password"
          {...loginForm.register('password', { 
            required: 'Password is required',
            minLength: { value: 6, message: 'Password must be at least 6 characters' }
          })}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200"
          placeholder="Enter your password"
        />
        {loginForm.formState.errors.password && (
          <p className="mt-1 text-sm text-red-600">{loginForm.formState.errors.password.message}</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input
            type="checkbox"
            {...loginForm.register('rememberMe')}
            className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
          />
          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Remember me</span>
        </label>
        <button
          type="button"
          onClick={() => switchAuthMode('forgot-password')}
          className="text-sm text-red-600 hover:text-red-500 transition-colors"
        >
          Forgot password?
        </button>
      </div>

      <Button
        type="submit"
        loading={isLoading}
        disabled={isLoading}
        className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium text-lg"
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </Button>

      <SocialLogin />
    </form>
  );

  const renderSignupForm = () => (
    <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            First Name
          </label>
          <input
            type="text"
            {...signupForm.register('firstName', { required: 'First name is required' })}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200"
            placeholder="First name"
          />
          {signupForm.formState.errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{signupForm.formState.errors.firstName.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Last Name
          </label>
          <input
            type="text"
            {...signupForm.register('lastName', { required: 'Last name is required' })}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200"
            placeholder="Last name"
          />
          {signupForm.formState.errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{signupForm.formState.errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Email Address
        </label>
        <input
          type="email"
          {...signupForm.register('email', { 
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200"
          placeholder="Enter your email"
        />
        {signupForm.formState.errors.email && (
          <p className="mt-1 text-sm text-red-600">{signupForm.formState.errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Password
        </label>
        <input
          type="password"
          {...signupForm.register('password', { 
            required: 'Password is required',
            minLength: { value: 8, message: 'Password must be at least 8 characters' }
          })}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200"
          placeholder="Create a password"
        />
        {signupForm.formState.errors.password && (
          <p className="mt-1 text-sm text-red-600">{signupForm.formState.errors.password.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Confirm Password
        </label>
        <input
          type="password"
          {...signupForm.register('confirmPassword', { required: 'Please confirm your password' })}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200"
          placeholder="Confirm your password"
        />
        {signupForm.formState.errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">{signupForm.formState.errors.confirmPassword.message}</p>
        )}
      </div>

      <div>
        <label className="flex items-start">
          <input
            type="checkbox"
            {...signupForm.register('agreeToTerms', { required: 'You must agree to the terms' })}
            className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded mt-1"
          />
          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
            I agree to the{' '}
            <Link to="/terms" className="text-red-600 hover:text-red-500">Terms of Service</Link>
            {' '}and{' '}
            <Link to="/privacy" className="text-red-600 hover:text-red-500">Privacy Policy</Link>
          </span>
        </label>
        {signupForm.formState.errors.agreeToTerms && (
          <p className="mt-1 text-sm text-red-600">{signupForm.formState.errors.agreeToTerms.message}</p>
        )}
      </div>

      <Button
        type="submit"
        loading={isLoading}
        disabled={isLoading}
        className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium text-lg"
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>

      <SocialLogin />
    </form>
  );

  const renderForgotPasswordForm = () => (
    <form onSubmit={forgotPasswordForm.handleSubmit(handleForgotPassword)} className="space-y-6">
      <div className="text-center mb-6">
        <p className="text-gray-600 dark:text-gray-400">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Email Address
        </label>
        <input
          type="email"
          {...forgotPasswordForm.register('email', { 
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200"
          placeholder="Enter your email"
        />
        {forgotPasswordForm.formState.errors.email && (
          <p className="mt-1 text-sm text-red-600">{forgotPasswordForm.formState.errors.email.message}</p>
        )}
      </div>

      <Button
        type="submit"
        loading={isLoading}
        disabled={isLoading}
        className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium text-lg"
      >
        {isLoading ? 'Sending...' : 'Send Reset Link'}
      </Button>

      <div className="text-center">
        <button
          type="button"
          onClick={() => switchAuthMode('login')}
          className="text-sm text-red-600 hover:text-red-500 transition-colors"
        >
          Back to Sign In
        </button>
      </div>
    </form>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background */}
      <div ref={backgroundRef} className="absolute inset-0 pointer-events-none">
        <div className="auth-particle absolute top-20 left-20 w-2 h-2 bg-red-400 rounded-full opacity-30"></div>
        <div className="auth-particle absolute top-40 right-32 w-3 h-3 bg-red-300 rounded-full opacity-20"></div>
        <div className="auth-particle absolute bottom-32 left-40 w-1.5 h-1.5 bg-red-500 rounded-full opacity-40"></div>
        <div className="auth-particle absolute bottom-20 right-20 w-2.5 h-2.5 bg-red-200 rounded-full opacity-25"></div>
        <div className="auth-particle absolute top-1/2 left-1/4 w-1 h-1 bg-red-600 rounded-full opacity-35"></div>
        <div className="auth-particle absolute top-1/3 right-1/3 w-2 h-2 bg-red-400 rounded-full opacity-30"></div>
      </div>

      <div ref={containerRef} className="max-w-md w-full space-y-8 relative z-10">
        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-3xl transition-shadow duration-300">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-2 mb-6">
              <span className="text-red-600 text-2xl">❤️</span>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">CrimeGuard</span>
            </Link>
            
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {authMode === 'login' ? 'Welcome Back' : 
               authMode === 'signup' ? 'Create Account' : 
               'Reset Password'}
            </h1>
            
            <p className="text-gray-600 dark:text-gray-400">
              {authMode === 'login' ? 'Sign in to your account to continue' : 
               authMode === 'signup' ? 'Join CrimeGuard to help keep your community safe' : 
               'We\'ll help you get back into your account'}
            </p>
          </div>

          {/* Alert Messages */}
          {authError && (
            <div className="mb-6">
              <AlertBanner type="error" message={authError} onClose={() => setAuthError('')} />
            </div>
          )}
          
          {authSuccess && (
            <div className="mb-6">
              <AlertBanner type="success" message={authSuccess} />
            </div>
          )}

          {/* Form */}
          <div ref={formRef}>
            {authMode === 'login' && renderLoginForm()}
            {authMode === 'signup' && renderSignupForm()}
            {authMode === 'forgot-password' && renderForgotPasswordForm()}
          </div>

          {/* Footer */}
          {authMode !== 'forgot-password' && (
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => switchAuthMode(authMode === 'login' ? 'signup' : 'login')}
                  className="text-red-600 hover:text-red-500 font-medium transition-colors"
                >
                  {authMode === 'login' ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          )}

          {/* Demo Credentials */}
          {authMode === 'login' && (
            <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                <strong>Demo:</strong> admin@crimeguard.com / password
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;