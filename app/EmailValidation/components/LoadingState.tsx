import React from 'react';

const LoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-8 animate-slide-up">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-red-main border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-kimono-200/30 rounded-full"></div>
      </div>
      <p className="text-kimono-900 text-lg animate-pulse font-medium">Validating your email...</p>
      <div className="flex space-x-1">
        <span className="w-2 h-2 bg-red-main rounded-full animate-bounce"></span>
        <span className="w-2 h-2 bg-kimono-200 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
        <span className="w-2 h-2 bg-red-main rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
      </div>
    </div>
  );
};

export default LoadingState;
