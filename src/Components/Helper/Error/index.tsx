import React from 'react'
import './error.scss'

const Error = ({ error }: any) => {
  return (
    <div className="animeTop error">
      <h1 className="error__title">Erro: 404</h1>
      <p>{error}</p>
    </div >
  )
}

export default Error
