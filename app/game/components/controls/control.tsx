import React from 'react';
import '@/game/styles/control.css';

type ControlProps = {
    children: React.ReactNode
}

const Control = ({ children }: ControlProps) => {
    return <div className='control'>
        <h2 className='control-title'>History</h2>
        {children}
    </div>
}

export default Control