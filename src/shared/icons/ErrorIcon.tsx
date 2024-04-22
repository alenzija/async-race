import { IconProps } from '../../types';

import spriteSVG from '../../assets/svg/sprite.svg';

export const ErrorIcon: React.FC<IconProps> = ({
  size = 28,
  color = '#f54a3f',
}) => {
  return (
    <svg width={size} viewBox="0 0 1000 500" fill={color}>
      <use href={`${spriteSVG}#error`} />
    </svg>
  );
};
