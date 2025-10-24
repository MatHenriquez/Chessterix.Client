import React from 'react';
import { useAppContext } from '@/core/contexts/Context';
import '../../styles/promotion-box.css';
import { copyPosition, getNewMoveNotation } from '@/game/helpers/position';
import { clearCandidateMoves, makeNewMove } from '@/core/reducer/actions/move';
import arbiter from '@/game/utils/arbiter';
import { detectCheckmate } from '@/core/reducer/actions/game';

interface PromotionBoxProps {
  onClosePopup: VoidFunction;
}

const PromotionBox = ({ onClosePopup }: PromotionBoxProps) => {
  const { state, dispatch } = useAppContext();
  const { promotionSquare } = state;

  if (!promotionSquare) return null;

  const color = promotionSquare.x === 7 ? 'w' : 'b';
  const opponent = color === 'w' ? 'b' : 'w';
  const options = ['q', 'r', 'b', 'n'];

  const onClick = (option: string) => {
    onClosePopup();
    const currentPosition = state.position.at(-1) as string[][];
    const newPosition = copyPosition(currentPosition);

    newPosition[promotionSquare.rank][promotionSquare.file] = '';
    newPosition[promotionSquare.x][promotionSquare.y] = color + option;

    const newMove = getNewMoveNotation({
      ...promotionSquare,
      position: currentPosition,
      promotesTo: option,
      piece: promotionSquare.x === 7 ? 'wp' : 'bp',
      isCheck: arbiter.isPlayerInCheck({ positionAfterMove: newPosition, position: currentPosition, player: opponent }),
      isCheckmate: arbiter.isCheckMate(newPosition, opponent, state.castleDirection[opponent])
    });
    dispatch(clearCandidateMoves());

    dispatch(makeNewMove({ newPosition: [newPosition], newMove, resetFiftyMoveCounter: true }));

    if (arbiter.isCheckMate(newPosition, opponent, state.castleDirection[opponent])) {
      dispatch(detectCheckmate(color));
    }
  };

  return (
    <div
      className="popup--inner promotion-choices"
      style={{ position: 'relative' }}
    >
      <button
        onClick={onClosePopup}
        style={{
          position: 'absolute',
          top: '-12px',
          right: '-12px',
          background: 'white',
          border: '2px solid #8b4513',
          borderRadius: '50%',
          color: '#8b4513',
          fontSize: '16px',
          cursor: 'pointer',
          fontWeight: 'bold',
          width: '24px',
          height: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}
        title="Cerrar"
      >
        ×
      </button>

      {options.map((option) => (
        <input
          key={option}
          role="button"
          tabIndex={0}
          onClick={() => onClick(option)}
          className={`piece ${color}${option}`}
          aria-label={`Promote to ${option}`}
        />
      ))}
    </div>
  );
};

export default PromotionBox;
