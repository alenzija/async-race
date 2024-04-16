import { ChangeEventHandler, FormEventHandler, useState } from 'react';

import './car-form.scss';

type CarFormProps = {
  buttonTitle: 'Update' | 'Create';
  colorId: string;
  nameId: string;
};

export const CarForm: React.FC<CarFormProps> = ({
  buttonTitle,
  colorId,
  nameId,
}) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#000000');

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
    console.log(name, color);
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
