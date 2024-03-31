import React from 'react'
import './select.scss'

const Select = ({ label, name, value, onChange, error, onBlur, options }: any) => {
  return (
    <div className="wrapper">
      <label htmlFor={name} className={error ? 'label__error' : 'label'}>{label}:</label>
      <select
        className={error ? 'select__error' : (value === '' ? 'select' : 'select__success')}
        id={name}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      >
        <option value="" hidden disabled>Selecione...</option>
        {options.map((op: any) => (
          <option value={op.id} key={op.id}>{op.name}</option>
        ))}
      </select>
      {error && <p className="msg__error">{error}</p>}
    </div>
  )
}

export default Select