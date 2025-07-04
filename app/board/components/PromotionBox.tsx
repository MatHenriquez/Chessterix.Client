import React from 'react';
import { useAppContext } from '@/contexts/Context';
import '../styles/promotion-box.css';
import { copyPosition, getNewMoveNotation } from '../helpers/position';
import { clearCandidateMoves, makeNewMove } from '@/reducer/actions/move';

interface PromotionBoxProps {
  onClosePopup: VoidFunction;
}

const PromotionBox = ({ onClosePopup }: PromotionBoxProps) => {
  const { state, dispatch } = useAppContext();
  const { promotionSquare } = state;

  if (!promotionSquare) return null;

  const color = promotionSquare.x === 7 ? 'w' : 'b';
  const options = ['q', 'r', 'b', 'n'];

  const onClick = (option: string) => {
    onClosePopup();
    const newPosition = copyPosition(state.position[state.position.length - 1]);

    newPosition[promotionSquare.rank][promotionSquare.file] = '';
    newPosition[promotionSquare.x][promotionSquare.y] = color + option;

    const newMove = getNewMoveNotation({
      ...promotionSquare,
      position: state.position[state.position.length - 1],
      promotesTo: option,
      piece: promotionSquare.x === 7 ? 'wp' : 'bp'
    });
    dispatch(clearCandidateMoves());

    dispatch(makeNewMove({ newPosition: [newPosition], newMove }));
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
