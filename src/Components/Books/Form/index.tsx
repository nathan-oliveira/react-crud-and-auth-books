import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import useForm from 'Hooks/useForm'
import useFetch from 'Hooks/useFetch'

import { POST_BOOK, PUT_BOOK, GET_BOOK_ID, GET_USERS } from 'Services/api'

import Input from 'Components/Templates/Form/Input'
import SelectLazy from 'Components/Templates/Form/SelectLazy'
// import Select from 'Components/Templates/Form/Select'

import Button from 'Components/Templates/Form/Button'
import Grid from 'Components/Templates/Form/Grid'
import Row from 'Components/Templates/Form/Row'
import RowButton from 'Components/Templates/Form/RowButton'
import If from 'Components/Templates/Operator/If'
import Loading from 'Components/Helper/Loading'
import Error from 'Components/Helper/Error'

import { FaSave } from "react-icons/fa";


const Form = (): any => {
  const { id } = useParams();
  const navigate = useNavigate();

  const title = useForm();
  const description = useForm();
  const userId = useForm();

  const { token } = useSelector((state: any) => state.user.data);
  const { data, loading, error, request }: any = useFetch();
  const { error: errorPost, loading: loadingPost, request: requestPost } = useFetch();
  const { loading: errorPut, error: loadingPut, request: requestPut } = useFetch();

  const { data: dataUser } = useSelector((state: any) => state.user)
  
  React.useEffect(() => {
    if (id) {
      const { url, options } = GET_BOOK_ID({ id, token })
      request(url, options)
    }
  }, [id]);

  React.useEffect(() => {
    if (data && id) {
      title.setValue(data.title);
      description.setValue(data.description);
    }
  }, [data, id]);

  function changeUserId(id: string) {
    if (dataUser.rule === 2) userId.setValue(id);
  }

  async function handleSubmit(event: any) {
    event.preventDefault();

    if (title.validate() && description.validate()) {
      const formData = {
        title: title.value,
        description: description.value,
      }

      if (id) {
        const { url, options } = PUT_BOOK({ id, formData, token })
        const { response }: any = await requestPut(url, options)

        if (response.ok) navigate('/books');
      } else {
        const { url, options } = POST_BOOK({ formData, token })
        const { response }: any = await requestPost(url, options)

        if (response.ok) navigate('/books');
      }
    }
  }

  if (loading) return <Loading />
  if (error) return <Error error={error} />
  if (data || !loading) return (
    <form onSubmit={handleSubmit} className="form animeLeft" autoComplete="off">
      <Row>
        <Grid cols="12">
          <Input
            label="Título"
            type="text"
            name="title"
            max="255"
            {...title}
          />
        </Grid>
      </Row>
      {(dataUser.rule === 2) && (
        <Row>
          <Grid cols="12">
            <SelectLazy 
              label="Usuário" 
              type="text" 
              name="user"
              GET={GET_USERS} 
              prop={{ key: 'id', title: 'name' }}
              setValue={changeUserId}
              orderBy={{ column: 'name', order: 'ASC' }} 
            />
          </Grid>
        </Row>
      )}
      <Row>
        <Grid cols="12">
          <Input
            label="Descrição"
            type="text"
            name="description"
            max="255"
            {...description}
          />
        </Grid>
      </Row>
      
      <RowButton>
        <If test={loading}>
          <Button color="green" disabled>
            <FaSave />
            {id ? 'Atualizando...' : 'Cadastrando...'}
          </Button>
        </If>
        <If test={!loading}>
          <Button color="green" className="button__save">
            <FaSave />
            Salvar
          </Button>
        </If>
      </RowButton>
    </form>
  )
}

export default Form;
