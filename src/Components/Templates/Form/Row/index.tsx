import React from 'react'
import './row.scss'

const RowButton = ({ children, classRow }: any) => {
  return (
    <div className={`row ${classRow ? classRow : ''}`}>
      {children}
    </div>
  )
}

export default RowButton
