import React from 'react'
import './input.scss'

import { FaEye, FaEyeSlash } from 'react-icons/fa';

import If from 'Components/Templates/Operator/If';

const Input = ({ label, type, name, value, onChange, error, onBlur, max }: any) => {
  const [typeInput, setTypeInput] = React.useState('text');
  const [eyeText, setEyeText] = React.useState(true);

  React.useEffect(() => {
    setTypeInput(type);
  }, [type]);

  function showPassword() {
    setEyeText((eye) => !eye);
  }

  return (
    <div className={`input-wrapper${type === 'password' ? ' input-wrapper__password' : ''}`}>
      <input 
        type={type === 'password' ? (eyeText ? 'password' : 'text') : typeInput} 
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
     
      <If test={type === 'password' && eyeText}>
        <FaEye onClick={() => showPassword()}/>
      </If>
      <If test={type === 'password' && !eyeText}>
        <FaEyeSlash onClick={() => showPassword()}/>
      </If>
    </div>
  )
}

export default Input
