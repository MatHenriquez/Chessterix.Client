'use client'

import React from 'react';
import { useAppContext } from '@/core/contexts/Context';
import '@/game/styles/moves-list.css';

const MovesList = () => {
    const { state: { movesList, currentMoveIndex } } = useAppContext();

    const currentMovePairIndex = Math.floor(currentMoveIndex ?? 0 / 4);

    const groupedMoves: Array<{ number: number; white: string; black?: string }> = [];

    for (let i = 0; i < movesList.length; i += 2) {
        groupedMoves.push({
            number: Math.floor(i / 2) + 1,
            white: movesList[i],
            black: movesList[i + 1],
        });
    }

    const highlitedMoveClass = 'bg-kimono-900/50 rounded';

    const whiteMove = (white: string) => <span className={'white-move'}>{white}</span>;
    const highlitedWhiteMove = (white: string) => <span className={`white-move ${highlitedMoveClass}`}>{white}</span>;

    const blackMove = (black: string) => <span className={'black-move'}>{black}</span>;
    const highlitedBlackMove = (black: string) => <span className={`black-move ${highlitedMoveClass}`}>{black}</span>;

    const shouldBeHighlighted = (movePairIndex: number, turn: string) => {
        if (turn === 'w') {
            return movePairIndex * 2 - 1 === currentMovePairIndex;
        } else {
            return movePairIndex * 2 === currentMovePairIndex;
        }
    }

    return <div className='moves-list'>
        {groupedMoves.map((movePair) =>
            <div key={`move-${movePair.number}-${movePair.white}`} className={'move-row'}>
                <span className='move-number'>{movePair.number}.</span>
                {shouldBeHighlighted(movePair.number, 'w') ? highlitedWhiteMove(movePair.white) : whiteMove(movePair.white)}
                {shouldBeHighlighted(movePair.number, 'b') ? highlitedBlackMove(movePair.black || '') : blackMove(movePair.black || '')}
            </div>
        )}
    </div>;
}

export default MovesList