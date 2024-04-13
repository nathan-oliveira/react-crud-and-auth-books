import React from 'react'
import './row-button.scss'

const RowButton = ({ children, className }: any) => {
  return (
    <div className={`row__button ${className}`}>
      {children}
    </div>
  )
}

export default RowButton
