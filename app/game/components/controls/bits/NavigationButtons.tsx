'use client'

import React from 'react';
import GoBack from './GoBack';
import GoForward from './GoForward';
import '@/game/styles/navigation.css';

const NavigationButtons = () => {
    return (
        <div className='navigation-buttons'>
            <GoBack />
            <GoForward />
        </div>
    );
}

export default NavigationButtons
