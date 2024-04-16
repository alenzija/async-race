import { CARS } from '../car-models';
import { generateRandomColor } from './generateRandomColor';

export const generateRandomCar = () => {
  const carNameIndex = Math.floor(Math.random() * CARS.length);
  const carModelIndex = Math.floor(Math.random() * CARS[carNameIndex].models.length);
  const name = `${CARS[carNameIndex].name} ${CARS[carNameIndex].models[carModelIndex].name}`;
  const color = generateRandomColor();
  return { name, color };
};
