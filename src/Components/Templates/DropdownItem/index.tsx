import React from 'react'
import './dropdownitem.scss'

import { ReactComponent as ChevronDown } from 'Assets/svg/chevron-down.svg'

const DropdownItem = ({ title, children }: any) => {
  return (
    <div className="dropdown">
    <div className="dropdown__center">
      <button className="dropdown__button">{title}</button>
      <ChevronDown />
    </div>
    <div className="dropdown__content">
      {children}
    </div>
  </div>
  )
}

export default DropdownItem
