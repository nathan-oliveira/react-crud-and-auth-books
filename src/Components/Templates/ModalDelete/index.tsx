import React from 'react'
import './modal-delete.scss'
import { useDispatch, useSelector } from 'react-redux'

import { closeModal } from 'Store/ui'

import { PiWarningCircleThin } from "react-icons/pi";

const ModalDelete = ({ handlerSubmit }: any) => {
  const { modal, value } = useSelector((state: any) => state.ui)
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(closeModal())
  }, [dispatch])

  function handleOutsideClick(event: any) {
    if (event.target === event.currentTarget) {
      dispatch(closeModal())
    }
  }

  if (!modal) return null
  return (
    <div className="modal__delete" onClick={handleOutsideClick}>
      <div className="modal__delete__content">
        <div className="modal__delete__header">
          <PiWarningCircleThin />
        </div>
        <div className="modal__delete__body">
          <h1 className="modal__delete__body__title">
            Você tem certeza que deseja excluir este registro?
          </h1>
          <span className="modal_delete__body__message">
            Você não poderá recuperar este registro após excluir!
          </span>
        </div>
        <div className="modal__delete__action">
          <button className="modal__close" title="fechar" onClick={handleOutsideClick}>Cancelar</button>
          <button className="modal__submit" onClick={() => handlerSubmit(value)}>Sim</button>
        </div>
      </div>
      
    </div>
  )
};

export default ModalDelete;
