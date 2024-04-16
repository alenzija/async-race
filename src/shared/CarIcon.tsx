import car from '../assets/svg/car.svg';

type CarIconProps = {
  color?: string;
  size?: number;
};

export const CarIcon: React.FC<CarIconProps> = ({
  color = '#000000',
  size = 70,
}) => {
  return (
    <svg width={size} viewBox="0 0 1000 500" fill={color}>
      <use href={`${car}#car`} />
    </svg>
  );
};
