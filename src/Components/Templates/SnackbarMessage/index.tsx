import React from 'react';
import './snackbar.scss';

import { IoIosClose } from "react-icons/io";

export const SnackbarMessage = ({ message, active, handlerClose }: any) => {
  const [show, setShow] = React.useState(false)

  function close() {
    setShow(false);
    handlerClose()
  }

  React.useEffect(() => {
    if (active && !!message) {
      setShow(true);
      setTimeout(() => close(), 3000);
    }
  }, [active]);


  return (
    <div className={`snackbar${show ? ' show' : ''}`}>
      {message}
      <IoIosClose onClick={() => close()}/>
    </div>
  );
}