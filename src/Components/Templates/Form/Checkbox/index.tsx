import React from 'react'
import './checkbox.scss'

import If from 'Components/Templates/Operator/If';

import { FaCheck } from "react-icons/fa";

const Checkbox = ({ label, name, value, onChange, onBlur }: any) => {
  const [isChecked, setIsChecked] = React.useState(false);
  
  function handleChange(e: any) {
    setIsChecked(e.target.checked);        
  }

  function toggleChecked() {
    onChange({ target: { value: !value } })
    setIsChecked(!value);
  }

  React.useEffect(() => {
    setIsChecked(!!value); 
  }, [value]);

  return (
    <div className="checkbox">
      <span>
        <input 
          type="checkbox"
          id={name}
          name={name}
          checked={isChecked}
          onChange={(e) => handleChange(e)}
          onBlur={onBlur}
        />
        <button
          className="slider"
          type="button"
          onClick={() => toggleChecked()}
        >
          {isChecked && (<FaCheck />)}
        </button>
      </span>

      <If test={label}>
        <label htmlFor={name}>{isChecked ? 'Ativo' : 'Inativo'}</label>
      </If>
    </div>       
  )
}

export default Checkbox
