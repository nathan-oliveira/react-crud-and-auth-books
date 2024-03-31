import React from 'react'
import './form.scss'

import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import useForm from 'Hooks/useForm'
import { userPost, userLogin } from 'Store/user/userPost'


import Input from 'Components/Templates/Form/Input'
import Button from 'Components/Templates/Form/Button'
import Grid from 'Components/Templates/Form/Grid'
import Row from 'Components/Templates/Form/Row'
import If from 'Components/Templates/Operator/If'


const Form = ({ login, setLogin, setError }: any) => {
  const name = useForm(null)
  const username = useForm(null)
  const email = useForm('email')
  const password = useForm(null)
  const password_confirmation = useForm(null)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: any) => state.user)
  const { error: errorToken } = useSelector((state: any) => state.user) // data: dataToken, 

  React.useEffect(() => {
    setError(errorToken);
  }, [errorToken, setError]) // setError

  async function handleSubmit(event: any) {
    event.preventDefault();

    if (login) {
      if (username.validate() && password.validate()) {
        await dispatch(userLogin({ username: username.value, password: password.value }))
        if (!errorToken) navigate('/')
        if (error) setError(error)
      }
    } else {
      if (name.validate() && username.validate() && password.validate() && password_confirmation.validate()) {
        await dispatch(userPost({
          name: name.value,
          username: username.value,
          email: email.value,
          password: password.value,
          password_confirmation: password_confirmation.value
        }))

        if (error) setError(error)
        if (!error) setLogin(true);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="form">
      <If test={!login}>
        <Row>
          <Grid cols="12">
            <Input
              label="Nome"
              type="text"
              name="name"
              max="255"
              {...name}
            />
          </Grid>
        </Row>
      </If>
      <If test={!login}>
        <Row>
          <Grid cols="12">
            <Input
              label="Email"
              type="email"
              name="email"
              max="255"
              {...email}
            />
          </Grid>
        </Row>
      </If>
      <Row>
        <Grid cols="12">
          <Input
            label="Usuário"
            type="text"
            name="username"
            max="255"
            {...username}
          />
        </Grid>
      </Row>
      <Row>
        <Grid cols="12">
          <Input
            label="Senha"
            type="password"
            name="password"
            max="255"
            {...password}
          />
        </Grid>
      </Row>
      <If test={!login}>
        <Row>
          <Grid cols="12">
            <Input
              label="Confirmar Senha"
              type="password"
              name="password_confirmation"
              max="255"
              {...password_confirmation}
            />
          </Grid>
        </Row>
      </If>

      <Row classRow="row__reverse">
        <If test={loading}>
          <Button disabled>{login ? 'Entrando...' : 'Cadastrando...'}</Button>
        </If>

        <If test={!loading}>
          <Button>{login ? 'Entrar' : 'Cadastrar'}</Button>
        </If>
        
        <button
          disabled={loading ? true : false}
          type="button"
          className="button__link"
          onClick={() => setLogin(!login)}
        >
          {login ? 'Não possui uma conta? Criar Agora.' : 'Já possui uma conta? Entrar Agora. '}
        </button>
      </Row>
    </form>
  )
}

export default Form
