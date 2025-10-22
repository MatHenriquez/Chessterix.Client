'use client'

import React from 'react';
import { useAppContext } from '@/core/contexts/Context';
import '@/game/styles/moves-list.css';

const MovesList = () => {

    const { state: { movesList } } = useAppContext();
    
    const groupedMoves: Array<{ number: number; white: string; black?: string }> = [];
    
    for (let i = 0; i < movesList.length; i += 2) {
        groupedMoves.push({
            number: Math.floor(i / 2) + 1,
            white: movesList[i],
            black: movesList[i + 1]
        });
    }

    return <div className='moves-list'>
        {groupedMoves.map((movePair) =>
            <div key={`move-${movePair.number}-${movePair.white}`} className='move-row'>
                <span className='move-number'>{movePair.number}.</span>
                <span className='white-move'>{movePair.white}</span>
                <span className='black-move'>{movePair.black || ''}</span>
            </div>
        )}
    </div>
}

export default MovesList