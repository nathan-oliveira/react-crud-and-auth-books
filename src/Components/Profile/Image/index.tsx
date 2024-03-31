import React from 'react'
import { useSelector } from 'react-redux'
import Avatar from 'Assets/img/avatar.png'

const Image = () => {
  const [photo, setPhoto] = React.useState(Avatar);
  const { data } = useSelector((state: any) => state.user)

  React.useEffect(() => {
    let objectUrl: any;
    if (data.file) objectUrl = URL.createObjectURL(data.file)
    setPhoto((data.file === null) ? Avatar : objectUrl)
    return () => { if (objectUrl) URL.revokeObjectURL(objectUrl) }
  }, [data])

  return (
    <img src={photo} alt="Foto de Perfil" width="200px" />
  )
}

export default Image
