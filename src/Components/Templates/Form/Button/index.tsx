import React from 'react'
import './button.scss'

const Button = ({ children, ...props }: any) => {
  return (
    <button {...props} className="button">
      {children}
    </button>
  )
}

export default Button
