import React from 'react';
import Board from './components/Board';
import './page.css';

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