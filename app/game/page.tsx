import React from 'react';
import './styles/page.css';
import Board from './components/board/Board';

const Page = () => {
  return (
    <div className="board-container-wrapper bg-[url('/image/bg.png')] bg-cover bg-center bg-no-repeat h-screen">
      <div className="board-container glass-effect">
        <Board />
      </div>
    </div>
  );
};

export default Page;