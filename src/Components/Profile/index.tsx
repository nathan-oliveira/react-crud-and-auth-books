import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { DELETE_PHOTO_PROFILE, GET_PROFILE_PHOTO } from 'Services/api'
import { PATCH_PROFILE_PHOTO } from 'Services/api'
import { updatePhoto } from 'Store/user/user'
import useFetch from 'Hooks/useFetch'

import Head from 'Components/Helper/Head'
import Breadcrumb from 'Components/Templates/Breadcrumb'
import ImageDragDrop from 'Components/Templates/ImageDragDrop'

import Form from './Form'

const Profile = () => {
  const { data: dataFile, request: getFile } = useFetch('blob');
  const { loading: loadingUpload, error: errorUpload, data: dataUpload, request: uploadFile } = useFetch();
  const { loading: loadingDeletePhoto, error: errorDeletePhoto, request: deletePhoto } = useFetch();
  const { data: dataUser } = useSelector((state: any) => state.user);
  const [successUpload, setSuccessUpload] = React.useState(false);
  const [successRemovedPhoto, setSuccessRemovedPhoto] = React.useState(false);

  const { t } = useTranslation()
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

  async function removePhoto() {
    const { url, options } = DELETE_PHOTO_PROFILE({ token: dataUser.token })
    const { response }: any = await deletePhoto(url, options);
    if (response.ok) {
      setSuccessRemovedPhoto(true);
      setTimeout(() => setSuccessRemovedPhoto(false), 500);
    }
  }

  return (
    <section>
      <Head title={t('profile.myAccount')} />
      <Breadcrumb title={t('profile.myAccount')} path={t('profile.userInformation')} />

      <div className="content__page">
        <div className="menu__pages animeLeft">
          <ImageDragDrop
            uploadFile={uploadPhoto}
            deleteFile={removePhoto}
            value={dataFile}
            success={successUpload}
            error={errorUpload}
            loading={loadingUpload}
            removed={successRemovedPhoto}
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
