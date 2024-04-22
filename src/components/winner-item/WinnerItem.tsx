import { CarIcon } from '../../shared/icons';

import { Winner } from '../../types';

import './winner-item.scss';

type WinnerItemProps = {
  winner: Winner;
};

export const WinnerItem: React.FC<WinnerItemProps> = ({ winner }) => {
  return (
    <div className="winner">
      <div>{winner.id}</div>
      <div>
        <CarIcon color={winner.color} size={30} />
      </div>
      <div>{winner.name || 'Without name'}</div>
      <div>{winner.wins}</div>
      <div>{winner.time}</div>
    </div>
  );
};
