import React from 'react'
import './form.scss'

import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import useForm from 'Hooks/useForm'
import { userSignUp, userLogin, verifyToken } from 'Store/user/auth'

import { SnackbarMessage } from 'Components/Templates/SnackbarMessage';

import Input from 'Components/Templates/Form/Input'
import Button from 'Components/Templates/Form/Button'
import Grid from 'Components/Templates/Form/Grid'
import Row from 'Components/Templates/Form/Row'
import If from 'Components/Templates/Operator/If'

const Form = ({ login, setLogin, setError }: any) => {
  const name = useForm()
  const username = useForm()
  const email = useForm({ type: 'email' })
  const password = useForm()
  const password_confirmation = useForm()
  const [messageToSnackbar, setMessageToSnackbar] = React.useState('');

  const { t } = useTranslation()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: any) => state.user)

  React.useEffect(() => {
    setError(error);
  }, [error, setError])

  async function handleSubmit(event: any) {
    event.preventDefault();

    if (login) {
      if (username.validate() && password.validate()) {
        await dispatch(userLogin({ username: username.value, password: password.value }))
        if (error) setError(error)
        if (!error) {
          await dispatch(verifyToken())
          navigate('/')
        }
      }
    } else {
      if (name.validate() && username.validate() && password.validate() && password_confirmation.validate()) {
        if (password_confirmation.value !== password.value) {
          password.setError(true)
          password_confirmation.setError(true)
          setMessageToSnackbar(t('auth.passwordsAreNotTheSame'));
          return;
        }

        if (password.value.length < 5 || password_confirmation.value.length < 6) {
          password.setError(true)
          password_confirmation.setError(true)
          setMessageToSnackbar(t('auth.passwordsMinimumCharacter'));
          return;
        }

        await dispatch(userSignUp({
          name: name.value,
          username: username.value,
          email: email.value,
          password: password.value,
        }));

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
              label={t('auth.form.name')}
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
              label={t('auth.form.email')}
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
            label={t('auth.form.username')}
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
            label={t('auth.form.password')}
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
              label={t('auth.form.passwordConfirmation')}
              type="password"
              name="password_confirmation"
              max="255"
              {...password_confirmation}
            />
          </Grid>
        </Row>
      </If>

      <Row classRow="row__reverse row__login">
        <If test={loading}>
          <Button disabled>{login ? t('auth.form.entering') : t('auth.form.registering')}</Button>
        </If>

        <If test={!loading}>
          <Button>{login ? t('auth.form.loginAccount') : t('auth.form.createAccount')}</Button>
        </If>

        <button
          disabled={loading ? true : false}
          type="button"
          className="button__link"
          onClick={() => setLogin(!login)}
        >
          {login ? t('auth.form.createAccountNow') : 'Já possui uma conta? Entrar Agora!'}
        </button>
      </Row>

      <SnackbarMessage
        active={!!messageToSnackbar}
        message={messageToSnackbar}
        handlerClose={() => setMessageToSnackbar('')}
      />
    </form>
  )
}

export default Form
