import {
  ChangeEventHandler,
  FormEventHandler,
  useContext,
  useEffect,
  useState,
} from 'react';

import { Car } from '../../types';

import { AppContext } from '../../app-context';

import './car-form.scss';

type CarFormProps = {
  buttonTitle: 'Update' | 'Create';
  colorId: string;
  nameId: string;
  submitAction: (data: Car) => Promise<Car>;
  defaultValue?: boolean;
};

export const CarForm: React.FC<CarFormProps> = ({
  buttonTitle,
  colorId,
  nameId,
  submitAction,
  defaultValue,
}) => {
  const { selectedCar, setMessage, setResponseStatus } = useContext(AppContext);
  const [name, setName] = useState('');
  const [color, setColor] = useState('#000000');

  useEffect(() => {
    if (defaultValue && selectedCar) {
      setName(selectedCar.name);
      setColor(selectedCar.color);
    }
  }, [selectedCar, defaultValue]);

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
    submitAction({
      id: defaultValue && selectedCar ? selectedCar.id : undefined,
      name,
      color,
    })
      .then(() => {
        setResponseStatus('success');
        setMessage(`Car was successfully ${buttonTitle.toLowerCase()}d`);
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
