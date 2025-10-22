'use client'

import React from 'react';
import { useAppContext } from '@/core/contexts/Context';
import { takeBack } from '@/core/reducer/actions/move';

const GoBack = () => {
    const { dispatch, state } = useAppContext();
    const currentIndex = state.currentMoveIndex ?? state.position.length - 1;
    const isDisabled = currentIndex === 0;

    return (
        <button 
            onClick={() => dispatch(takeBack())} 
            disabled={isDisabled}
            className='navigation-button'
            aria-label="Previous move"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
        </button>
    );
}

export default GoBack