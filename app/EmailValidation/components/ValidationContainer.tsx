import React, { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

const ValidationContainer = ({ children }: Props) => {
    return (
        <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center p-4 bg-gradient-to-br from-slate-800 via-gray-700 to-slate-800">
            <div className="absolute inset-0 bg-[url('/image/bg.png')] bg-cover bg-center opacity-40"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-kimono-900/20 via-transparent to-red-main/15"></div>
            <div className="absolute top-10 left-10 w-32 h-32 border-2 border-red-main/40 rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-kimono-200/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 right-10 w-20 h-20 border-2 border-bone-500/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            {children}
        </div>
    );
};

export default ValidationContainer;
