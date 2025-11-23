import React from 'react';

type Props = {
  errorMessage: string | null;
  onGoHome: () => void;
};

const ErrorState = ({ errorMessage, onGoHome }: Props) => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="relative inline-block">
        <div className="w-20 h-20 bg-gradient-to-br from-red-400/40 to-red-600/40 rounded-full flex items-center justify-center mx-auto border-2 border-red-600 shadow-lg shadow-red-500/40">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <div className="absolute inset-0 w-20 h-20 bg-red-500/30 rounded-full animate-ping mx-auto"></div>
      </div>
      <h2 className="text-3xl font-bold text-kimono-900 tracking-wide">Validation Failed</h2>
      <p className="text-red-main leading-relaxed px-4 bg-red-100 py-3 rounded-lg border border-red-300">
        {errorMessage || "Something went wrong."}
      </p>
      <button
        onClick={onGoHome}
        className="w-full bg-kimono-900 hover:bg-kimono-700 text-white font-bold py-3 px-6 rounded-md transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform border border-kimono-700"
      >
        Back to Home
      </button>
    </div>
  );
};

export default ErrorState;
