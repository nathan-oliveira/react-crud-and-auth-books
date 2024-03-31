import React from 'react'
import './input.scss'

const Input = ({ label, type, name, value, onChange, error, onBlur, max }: any) => {
  return (
    <div className="wrapper">
      <label htmlFor={name} className={error ? 'label__error' : 'label'}>{label}:</label>
      {/* className={error ? 'input__error' : (value ? 'input' : 'input__success')} */}
      <input
        type={type}
        className={error ? 'input__error' : 'input'}
        id={name}
        name={name}
        maxLength={max}
        onChange={onChange}
        onBlur={onBlur}
        value={type === 'file' ? '' : (value ?? '')}
      />
      {error && <p className="msg__error">{error}</p>}
    </div>
  )
}

export default Input
