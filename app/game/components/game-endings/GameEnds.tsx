import React from 'react';
import { useAppContext } from '@/core/contexts/Context';
import { setupNewGame } from '@/core/reducer/actions/game';
import '../../styles/game-ends.css';

interface GameEndsProps {
    onClosePopup?: () => void;
}

const GameEnds = ({ onClosePopup }: GameEndsProps) => {
    const { state: { status }, dispatch } = useAppContext();

    if (status === 'onGoing' || status === 'promoting') return null

    const newGame = () => {
        dispatch(setupNewGame());
        if (onClosePopup) {
            onClosePopup();
        }
    }

const getGameEndMessage = () => {
  switch (status) {
    case 'whiteWins':
      return {
        title: 'Checkmate!',
        subtitle: 'White Wins',
        titleColor: '#4d0705',
        subtitleColor: '#4d0705',
        isWin: true,
        isDraw: false
      };
    case 'blackWins':
      return {
        title: 'Checkmate!',
        subtitle: 'Black Wins',
        titleColor: '#4d0705',
        subtitleColor: '#4d0705',
        isWin: true,
        isDraw: false
      };
    case 'stalemate':
      return {
        title: 'Draw',
        subtitle: 'Stalemate',
        titleColor: '#4d0705',
        subtitleColor: '#4d0705',
        isWin: false,
        isDraw: true
      };
    case 'insufficient-material':
      return {
        title: 'Draw',
        subtitle: 'Insufficient Material',
        titleColor: '#4d0705',
        subtitleColor: '#4d0705',
        isWin: false,
        isDraw: true
      };
    case 'threefold-repetition':
      return {
        title: 'Draw',
        subtitle: 'Threefold Repetition',
        titleColor: '#4d0705',
        subtitleColor: '#4d0705',
        isWin: false,
        isDraw: true
      };
    case 'fifty-move-rule':
      return {
        title: 'Draw',
        subtitle: 'Fifty Move Rule',
        titleColor: '#4d0705',
        subtitleColor: '#4d0705',
        isWin: false,
        isDraw: true
      };
    default:
      return {
        title: 'Game Over',
        subtitle: status,
        titleColor: '#4d0705',
        subtitleColor: '#4d0705',
        isWin: false,
        isDraw: true
      };
  }
};
    const { title, subtitle, titleColor, subtitleColor, isWin, isDraw } = getGameEndMessage();

    const renderIcon = () => {
        if (isDraw) {
            return (
                <div className="game-end-icons">
                    <div className="king-icon white-king" />
                    <div className="king-icon black-king" />
                </div>
            );
        }

        if (isWin) {
            const winnerClass = status === 'whiteWins' ? 'white-king' : 'black-king';
            return (
                <div className="game-end-icons">
                    <div className={`king-icon ${winnerClass} winner`} />
                </div>
            );
        }

        return null;
    };

    return (
        <div
            style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '10px',
                textAlign: 'center',
                minWidth: '300px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
        >
            <h2 style={{
                margin: '0 0 10px 0',
                color: titleColor,
                fontSize: '28px',
                fontWeight: 'bold',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                letterSpacing: '0.5px'
            }}>
                {title}
            </h2>
            <h3 style={{
                margin: '0 0 20px 0',
                color: subtitleColor,
                fontSize: '18px',
                fontWeight: 'bold',
                opacity: 0.8
            }}>
                {subtitle}
            </h3>

            {renderIcon()}

            <button
                onClick={newGame}
                style={{
                    padding: '12px 24px',
                    backgroundColor: '#4d0705',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#6d0907';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                }}
                onFocus={(e) => {
                    e.currentTarget.style.backgroundColor = '#6d0907';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#4d0705';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                }}
                onBlur={(e) => {
                    e.currentTarget.style.backgroundColor = '#4d0705';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                }}
            >
                New Game
            </button>
        </div>
    );
}

export default GameEnds;