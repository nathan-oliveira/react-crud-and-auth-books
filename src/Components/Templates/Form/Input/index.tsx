import React from 'react'
import './input.scss'

const Input = ({ label, type, name, value, onChange, error, onBlur, max }: any) => {
  return (
    <div className="input-wrapper">
      <input 
        type={type} 
        className={`input input-text${error ? ' input-text-error' : ''}`}
        id={name} 
        name={name}
        maxLength={max}
        onChange={onChange}
        autoComplete="off" 
        onBlur={onBlur}
        value={type === 'file' ? '' : (value ?? '')}
        placeholder=" "
      />
      <label
        htmlFor={name} 
        className={`input-label${error ? ' input-label-error' : ''}`}
      >{label}</label>
      {/* {error && <p className="msg__error">{error}</p>}  */}
    </div>
  )
}

export default Input
