import React from 'react'
import './button.scss'

const Button = ({ children, color, ...props }: any) => {
  // button__green
  return (
    <button {...props} className={`button${color === 'green' ? ' button__green' : ''}`}>
      {children}
    </button>
  )
}

export default Button
