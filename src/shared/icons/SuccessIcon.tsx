import { IconProps } from '../../types';

import spriteSVG from '../../assets/svg/sprite.svg';

export const SuccessIcon: React.FC<IconProps> = ({
  size = 28,
  color = '#27ae60',
}) => {
  return (
    <svg width={size} viewBox="0 0 1000 500" fill={color}>
      <use href={`${spriteSVG}#success`} />
    </svg>
  );
};
