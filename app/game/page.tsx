import React from 'react';
import './styles/page.css';
import Board from './components/board/Board';
import Control from './components/controls/control';
import MovesList from './components/controls/bits/MovesList';
import NavigationButtons from './components/controls/bits/NavigationButtons';

const Page = () => {
  return (
    <div className="board-container-wrapper bg-[url('/image/bg.png')] bg-cover bg-center bg-no-repeat h-screen">
      <div className="board-container glass-effect">
        <Board />
        <Control >
          <MovesList />
          <NavigationButtons />
        </Control>
      </div>
    </div>
  );
};

export default Page;