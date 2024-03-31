import React from 'react'
import './profile.scss'

import { useSelector, useDispatch } from 'react-redux'
import { GET_PROFILE_PHOTO } from 'Services/api'
import { updatePhoto } from 'Store/user/user'
import useFetch from 'Hooks/useFetch'

import Head from 'Components/Helper/Head'
import Breadcrumb from 'Components/Templates/Breadcrumb'
import Modal from 'Components/Templates/Modal'
import Summary from 'Components/Templates/Modal/Summary'
import Details from 'Components/Templates/Modal/Details'

import Form from './Form'
import FormModal from './FormModal'
import ImageProfile from './Image'

const Profile = () => {
  const { data, loading, error, request } = useFetch('blob');
  const { data: dataUser } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const { url, options } = GET_PROFILE_PHOTO(dataUser.token);
    request(url, options);
  }, []);

  
  React.useEffect(() => {
    if (data) dispatch(updatePhoto({ file: data ?? null }))
  }, [data])
  
  return (
    <section>
      <Head title="Minha Conta" />
      <Breadcrumb title="Minha Conta" path="Informações de Usuário" />

      <div className="content__page animeLeft">
        <div className="content__image">
          <ImageProfile />
          <Details>
            <Summary>
              <div className="content__image__button">Alterar Foto</div>
            </Summary>
            <Modal title="Alterar Foto">
              <FormModal />
            </Modal>
          </Details>
        </div>
        <div className="content__form">
          <Form />
        </div>
      </div>
    </section>
  )
}

export default Profile
