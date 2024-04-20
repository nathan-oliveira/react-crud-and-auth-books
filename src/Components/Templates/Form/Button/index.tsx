import React from 'react'
import './button.scss'

const Button = ({ children, color, classBtn, ...props }: any) => {
  // button__green
  return (
    <button {...props} className={`button${color === 'green' ? ' button__green' : ''}${classBtn ? ` ${classBtn}`: ''}`}>
      {children}
    </button>
  )
}

export default Button
