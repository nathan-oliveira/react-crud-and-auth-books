import React from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import useForm from 'Hooks/useForm'
import useFetch from 'Hooks/useFetch'
import { PUT_PROFILE } from 'Services/api'

import { SnackbarMessage } from 'Components/Templates/SnackbarMessage';

import Input from 'Components/Templates/Form/Input'
import Row from 'Components/Templates/Form/Row'
import Grid from 'Components/Templates/Form/Grid'
import RowButton from 'Components/Templates/Form/RowButton'
import Button from 'Components/Templates/Form/Button'
import If from 'Components/Templates/Operator/If'

const Form = () => {
  const name = useForm();
  const username = useForm();
  const email = useForm({ type: 'email' });
  const password = useForm({ required: false });
  const password_confirmation = useForm({ required: false });

  const [messageToSnackbar, setMessageToSnackbar] = React.useState('');

  const { t } = useTranslation()
  const { loading, error, request }: any = useFetch();
  const { data } = useSelector((state: any) => state.user);

  React.useEffect(() => {
    if (data) {
      name.setValue(data.name)
      username.setValue(data.username)
      email.setValue(data.email)
    }
  }, [data])

  async function handleSubmit(event: any) {
    event.preventDefault();

    if (name.validate() && email.validate()) {
      const dataForm: any = {
        name: name.value,
        email: email.value,
      }

      if (password.value) dataForm.password = password.value;
      if (password_confirmation.value) dataForm.passwordConfirmation = password_confirmation.value;

      if (password.value || password_confirmation.value) {
        if (password.value !== password_confirmation.value) {
          password.setError(true)
          password_confirmation.setError(true)
          setMessageToSnackbar(t('profile.newPasswordsAreNotTheSame'));
          return;
        }

        if (password.value.length < 5 || password_confirmation.value.length < 6) {
          password.setError(true)
          password_confirmation.setError(true)
          setMessageToSnackbar(t('profile.newPasswordsMinimumCharacter'))
          return;
        }
      }

      const { url, options } = PUT_PROFILE(dataForm, data.token)
      const { response } = await request(url, options)

      if (response.ok) setMessageToSnackbar(t('profile.profileUpdated'))
      if (error) setMessageToSnackbar(error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form animeLeft" autoComplete="off">
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
        <Grid cols="6">
          <Input
            label={t('profile.newPassword')}
            type="password"
            name="password"
            max="255"
            {...password}
          />
        </Grid>
        <Grid cols="6">
          <Input
            label={t('profile.newConfirmPassword')}
            type="password"
            name="password_confirmation"
            max="255"
            {...password_confirmation}
          />
        </Grid>
      </Row>
      <RowButton classRow="row__button_right">
        <If test={loading}>
          <Button color="green" disabled>{t('profile.updating')}</Button>
        </If>

        <If test={!loading}>
          <Button color="green">{t('profile.toUpdate')}</Button>
        </If>
      </RowButton>

      <SnackbarMessage
        active={!!messageToSnackbar}
        message={messageToSnackbar}
        handlerClose={() => setMessageToSnackbar('')}
      />
    </form>
  );
}

export default Form;