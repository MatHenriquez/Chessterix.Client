import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const ValidationCard = ({ children }: Props) => {
  return (
    <div className="relative backdrop-blur-lg bg-gradient-to-br from-white/95 via-bone-300/90 to-white/95 border-2 border-kimono-700/40 rounded-xl shadow-2xl shadow-black/60 max-w-md w-full p-8 sm:p-10 text-center overflow-hidden animate-fade-in">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-main to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-main to-transparent"></div>
      <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-kimono-700/50 rounded-tl-xl"></div>
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-kimono-700/50 rounded-br-xl"></div>
      {children}
    </div>
  );
};

export default ValidationCard;
