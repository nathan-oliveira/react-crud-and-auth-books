import React from 'react'
import { useSelector } from 'react-redux'
import useForm from 'Hooks/useForm'
import useFetch from 'Hooks/useFetch'
import { PUT_PROFILE } from 'Services/api'

import Input from 'Components/Templates/Form/Input'
import Row from 'Components/Templates/Form/Row'
import Grid from 'Components/Templates/Form/Grid'
import RowButton from 'Components/Templates/Form/RowButton'
import Button from 'Components/Templates/Form/Button'
import If from 'Components/Templates/Operator/If'

const Form = () => {
  const name = useForm();
  const username = useForm(null);
  const email = useForm('email');
  const password = useForm();
  const password_confirmation = useForm();

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
      const dataForm = {
        name: name.value,
        email: email.value,
        password: password.value ? password.value : undefined,
        password_confirmation: password_confirmation.value ? password_confirmation.value : undefined
      }

      if (password.value || password_confirmation.value) {
        if (password.value !== password_confirmation.value) {
          password.setError(true)
          password_confirmation.setError(true)
          return alert("O campo 'Nova Senha' e 'Confirmar (Nova Senha)' não são iguais!")
        }
  
        if (password.value.length < 5 || password_confirmation.value.length < 6) {
          password.setError(true)
          password_confirmation.setError(true)
          return alert("O campo 'Nova Senha' e 'Confirmar (Nova Senha)' deve conter no mínimo 6 caracteres!")
        }
      }

      const { url, options } = PUT_PROFILE(dataForm, data.token)
      const { response } = await request(url, options)

      if (response.ok) alert('Perfil atualizado!')
      if (error) alert(error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form" autoComplete="off">
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
            label="E-mail"
            type="email"
            name="email"
            max="255"
            {...email}
          />
        </Grid>
      </Row>
      <Row>
        <Grid cols="6">
          <Input
            label="Nova Senha"
            type="password"
            name="password"
            max="255"
            {...password}
          />
        </Grid>
        <Grid cols="6">
          <Input
            label="Confirmar (Nova Senha)"
            type="password"
            name="password_confirmation"
            max="255"
            {...password_confirmation}
          />
        </Grid>
      </Row>
      <RowButton>
        <If test={loading}>
          <Button disabled>Atualizando...</Button>
        </If>

        <If test={!loading}>
          <Button>Atualizar</Button>
        </If>
      </RowButton>
    </form>
  );
}

export default Form;