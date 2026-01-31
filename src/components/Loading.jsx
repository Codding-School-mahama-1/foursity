import React from 'react';

const LoadingSpinner = ({ size = 'medium', message = 'Loading...' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className={`${sizeClasses[size]} border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-2`}></div>
      {message && (
        <p className="text-gray-600 text-sm">{message}</p>
      )}
    </div>
  );
};

const LoadingPage = ({ message = 'Loading page...' }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <LoadingSpinner size="large" message={message} />
    </div>
  );
};

const LoadingButton = ({ loading, children, className = '', ...props }) => {
  return (
    <button
      className={`relative ${className}`}
      disabled={loading}
      {...props}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <span className={loading ? 'invisible' : ''}>
        {children}
      </span>
    </button>
  );
};

export { LoadingSpinner, LoadingPage, LoadingButton };
export default LoadingSpinner;