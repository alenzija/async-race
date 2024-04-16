import {
  ChangeEventHandler,
  FormEventHandler,
  useContext,
  useState,
} from 'react';

import { BasicCar, Car } from '../../types';

import { AppContext } from '../../app-context';

import './car-form.scss';

type CarFormProps = {
  buttonTitle: 'Update' | 'Create';
  colorId: string;
  nameId: string;
  submitAction: (data: BasicCar) => Promise<Car>;
};

export const CarForm: React.FC<CarFormProps> = ({
  buttonTitle,
  colorId,
  nameId,
  submitAction,
}) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#000000');
  const { setMessage, setResponseStatus } = useContext(AppContext);

  const onNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value);
  };

  const onColorChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setColor(e.target.value);
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!name || name === '') {
      return;
    }
    submitAction({ name, color })
      .then(() => {
        setResponseStatus('success');
        setMessage('Car was successfully created');
      })
      .catch(() => {
        setResponseStatus('error');
        setMessage('Something went wrong');
      })
      .finally(() => {
        setColor('#000000');
        setName('');
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={name}
        name={nameId}
        id={nameId}
        onChange={onNameChange}
      />
      <input
        type="color"
        value={color}
        name={colorId}
        id={colorId}
        onChange={onColorChange}
      />
      <button type="submit">{buttonTitle}</button>
    </form>
  );
};
