import { IconProps } from '../../types';

import spriteSVG from '../../assets/svg/sprite.svg';

export const CarIcon: React.FC<IconProps> = ({ color = '#fff', size = 70 }) => {
  return (
    <svg width={size} viewBox="0 0 1000 500" fill={color}>
      <use href={`${spriteSVG}#car`} />
    </svg>
  );
};
