import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useForm from 'Hooks/useForm'
import useFetch from 'Hooks/useFetch'

import { PATCH_PROFILE_PHOTO } from 'Services/api'
import { updatePhoto } from 'Store/user/user'

import Input from 'Components/Templates/Form/Input'
import RowButton from 'Components/Templates/Form/RowButton'
import Button from 'Components/Templates/Form/Button'
import If from 'Components/Templates/Operator/If'

const FormModal = () => {
  const file = useForm('file')
  const { loading, error, request } = useFetch();
  const { data } = useSelector((state: any) => state.user)

  const dispatch = useDispatch()

  // React.useEffect(() => {
  //   if (data) file.setValue(data.file)
  // }, [data])

  async function handleSubmit(event: any) {
    event.preventDefault()

    if (file.validate()) {
      const { url, options } = PATCH_PROFILE_PHOTO({ file: file.value, token: data.token })
      const { response }: any = await request(url, options)
  
      if (response.ok) dispatch(updatePhoto({ file: file.value ?? null }))
      if (error) alert(error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form" autoComplete="off">
      <Input
        label="Imagem"
        type="file"
        name="file"
        accept="image/png,image/jpg,image/jpeg"
        size="2000000"
        {...file}
      />
      <RowButton>
        <If test={loading}>
          <Button disabled>Alterando...</Button>
        </If>

        <If test={!loading}>
          <Button>Alterar</Button>
        </If>
      </RowButton>
    </form>
  )
}

export default FormModal
