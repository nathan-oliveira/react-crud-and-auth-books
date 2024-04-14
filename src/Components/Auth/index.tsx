import React from 'react'
import './auth.scss'

import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import Head from 'Components/Helper/Head'

import Form from './Form'

const Auth = () => {
  const [error, setError] = React.useState(null);
  const [login, setLogin] = React.useState(true);
  const { data } = useSelector((state: any) => state.user)

  if ((data === null || data?.token === null)) 
    return (
      <section className="content animeTop">
        <Head title="Autenticação" />
        <div className="card">
          <div className="card__header">
            <h1 className={login ? "card__header__title" : "card__header__title2"}>
              {login ? 'Entrar' : 'Cadastrar'}
            </h1>
          </div>
          <div className="card__main">
            {error && <p className="_card__main__error">{error}</p>}
            <Form login={login} setLogin={setLogin} setError={setError} />
          </div>
        </div>
      </section>
    )
  else
    return <Navigate to="/" />;
}

export default Auth
