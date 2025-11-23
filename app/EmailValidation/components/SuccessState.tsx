import React from 'react';

type Props = {
  onGoHome: () => void;
};

const SuccessState = ({ onGoHome }: Props) => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="relative inline-block">
        <div className="w-20 h-20 bg-gradient-to-br from-green-400/40 to-green-600/40 rounded-full flex items-center justify-center mx-auto border-2 border-green-600 shadow-lg shadow-green-500/40">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="absolute inset-0 w-20 h-20 bg-green-500/30 rounded-full animate-ping mx-auto"></div>
      </div>
      <h2 className="text-3xl font-bold text-kimono-900 tracking-wide">Email Verified!</h2>
      <p className="text-kimono-700 leading-relaxed px-4">
        Your email has been successfully validated. You can now log in and start your chess journey.
      </p>
      <button
        onClick={onGoHome}
        className="w-full bg-red-main hover:bg-kimono-200 text-white font-bold py-3 px-6 rounded-md transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
      >
        Go to Home
      </button>
    </div>
  );
};

export default SuccessState;
