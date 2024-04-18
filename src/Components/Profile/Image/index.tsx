import React from 'react'
import { useSelector } from 'react-redux'

import { MdCloudUpload } from "react-icons/md";
import Avatar from 'Assets/img/avatar.png'

const Image = () => {
  const [photo, setPhoto] = React.useState(Avatar);
  const inputFileRef: any = React.useRef(null)
  const { data } = useSelector((state: any) => state.user)

  React.useEffect(() => {
    let objectUrl: any;
    if (data.file) objectUrl = URL.createObjectURL(data.file)
    setPhoto(!data.file ? Avatar : objectUrl)
    return () => { if (objectUrl) URL.revokeObjectURL(objectUrl) }
  }, [data])

  const handleClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };


  return (
    <div className="content__image">
      <img src={photo} alt="Foto de Perfil" />
      <div className="content__image_display">
        <input type="file" name="file" id="file" ref={inputFileRef} />
        <MdCloudUpload onClick={handleClick} />
      </div>
    </div>
  )
}

export default Image
