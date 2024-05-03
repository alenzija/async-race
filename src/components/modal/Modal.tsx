import { MouseEventHandler } from 'react';

import './modal.scss';

type ModalPopup = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal: React.FC<ModalPopup> = ({ isOpen, onClose, children }) => {
  const onBackgroundClick: MouseEventHandler = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    isOpen && (
      <div className="modal-wrapper" onClick={onBackgroundClick}>
        <div className="modal">{children}</div>
      </div>
    )
  );
};
