import {
  ChangeEventHandler,
  FormEventHandler,
  useContext,
  useEffect,
  useState,
} from 'react';

import { Spinner } from '../spinner';

import { Car } from '../../types';

import { AppContext } from '../../app-context';

import './car-form.scss';

type CarFormProps = {
  buttonTitle: 'Update' | 'Create';
  colorId: string;
  nameId: string;
  submitAction: (data: Car) => Promise<void>;
  defaultValue?: boolean;
};

export const CarForm: React.FC<CarFormProps> = ({
  buttonTitle,
  colorId,
  nameId,
  submitAction,
  defaultValue,
}) => {
  const { selectedCar } = useContext(AppContext);
  const [name, setName] = useState('');
  const [color, setColor] = useState('#000000');
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    submitAction({
      id: defaultValue && selectedCar ? selectedCar.id : undefined,
      name,
      color,
    }).finally(() => {
      setColor('#000000');
      setName('');
      setLoading(false);
    });
  };

  return (
    <form onSubmit={onSubmit} className="form">
      <input
        type="text"
        value={name}
        name={nameId}
        id={nameId}
        onChange={onNameChange}
        disabled={defaultValue && !selectedCar}
        className="form__input--text"
      />
      <input
        type="color"
        value={color}
        name={colorId}
        id={colorId}
        onChange={onColorChange}
        disabled={defaultValue && !selectedCar}
        className="form__input--color"
      />
      <button
        type="submit"
        disabled={(defaultValue && !selectedCar) || !name || name === ''}
        className="form__button"
      >
        {loading ? <Spinner size={30} /> : buttonTitle}
      </button>
    </form>
  );
};
