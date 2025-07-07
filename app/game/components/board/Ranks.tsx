import React, { FC } from 'react';
import '../../styles/ranks.css';

type RanksProps = {
  ranks: number[];
};

const Ranks: FC<RanksProps> = ({ ranks }) => {
  return (
    <div className="ranks bg-bone-main/10">
      {ranks.map((rank) => (
        <span key={rank} className="rank">
          {rank}
        </span>
      ))}
    </div>
  );
};

export default Ranks;
