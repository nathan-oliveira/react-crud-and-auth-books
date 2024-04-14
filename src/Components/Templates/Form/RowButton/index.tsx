import React from 'react'
import './row-button.scss'

const RowButton = ({ children, classRow }: any) => {
  return (
    <div className={`row__button ${classRow}`}>
      {children}
    </div>
  )
}

export default RowButton
