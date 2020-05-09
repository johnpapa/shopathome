import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal');

function Modal(props) {
  let el = document.createElement('div');

  useEffect(() => {
    modalRoot.appendChild(el);
  }, [el]);

  useEffect(() => {
    return () => {
      modalRoot.removeChild(el);
    };
  }, [el]);

  return createPortal(props.children, el);
}

export default Modal;
