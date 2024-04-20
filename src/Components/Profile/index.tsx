import React from 'react'
import './profile.scss'

import { useSelector, useDispatch } from 'react-redux'
import { GET_PROFILE_PHOTO } from 'Services/api'
import { PATCH_PROFILE_PHOTO } from 'Services/api'
import { updatePhoto } from 'Store/user/user'
import useFetch from 'Hooks/useFetch'

import Head from 'Components/Helper/Head'
import Breadcrumb from 'Components/Templates/Breadcrumb'

import Form from './Form'
import ImageProfile from './Image'

const Profile = () => {
  const { data: dataFile, request: getFile } = useFetch('blob');
  const { loading: loadingUpload, error: errorUpload, data: dataUpload, request: uploadFile } = useFetch();
  const { data: dataUser } = useSelector((state: any) => state.user);
  const [successUpload, setSuccessUpload] = React.useState(false);

  const dispatch = useDispatch();

  React.useEffect(() => {
    const { url, options } = GET_PROFILE_PHOTO(dataUser.token);
    getFile(url, options);
  }, [dataUpload, dataUser.token, getFile]);
  
  React.useEffect(() => {
    if (!loadingUpload && !errorUpload && dataUpload) {
      setSuccessUpload(true);
      setTimeout(() => setSuccessUpload(false), 500);
    }
  }, [loadingUpload, errorUpload]);
  
  async function uploadPhoto(file: any) {
    const { url, options } = PATCH_PROFILE_PHOTO({ file, token: dataUser.token })
    const { response }: any = await uploadFile(url, options)
    if (response.ok) dispatch(updatePhoto({ file }))
    if (errorUpload) alert(errorUpload)
  }

  return (
    <section>
      <Head title="Minha Conta" />
      <Breadcrumb title="Minha Conta" path="Informações de Usuário" />

      <div className="content__page">
        <div className="menu__pages animeLeft">
          <ImageProfile 
            uploadFile={uploadPhoto} 
            value={dataFile}
            success={successUpload}
            error={errorUpload}
            loading={loadingUpload}
          />
        </div>

        <div className="content__body">
          <Form />
        </div>
      </div>
    </section>
  )
}

export default Profile
