import React from 'react'
import './modal.scss'

import { ReactComponent as Close } from 'Assets/svg/x.svg'

const Modal = (props: any) => {
  return (
    <div className="details__modal">
      <div className="details__modal__close">
        <Close />
      </div>
      <div className="details__modal__title">
        <h1>{props.title}</h1>
      </div>
      <div className="details__modal__content">
        {props.children}
      </div>
    </div>
  )
}

export default Modal
