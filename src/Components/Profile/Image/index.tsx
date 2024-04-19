import React from 'react'

import { MdCloudUpload } from "react-icons/md";
import Avatar from 'Assets/img/avatar.png'
import { validateFile } from 'Hooks/useForm';

const Image = ({ uploadFile, value }: any) => {
  const [photo, setPhoto] = React.useState(Avatar);
  const [dragging, setDragging] = React.useState(false);
  const inputFileRef: any = React.useRef(null)

  React.useEffect(() => {
    let objectUrl: any;
    if (value) {
      objectUrl = URL.createObjectURL(value)
      setPhoto(objectUrl);
    }
    return () => { if (objectUrl) URL.revokeObjectURL(objectUrl) }
  }, [value]);

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);
    const files = Array.from(e.dataTransfer.files);
    emitFile({ target: { files } });
  };

  function emitFile(e: any) {
    const file = e.target.files[0];
    if (validateFile(file.type)) {
      uploadFile(file);
    } else {
      // alert arquivo invalido
    }
  }

  return (
    <div 
      className="content__image" 
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <img src={photo} alt="Foto de Perfil" />
      <div className="content__image_display">
        <input
          type="file" 
          name="file" 
          id="file" 
          accept="image/png,image/jpg,image/jpeg"
          ref={inputFileRef}
          onChange={emitFile}
        />

        <MdCloudUpload 
          onClick={() => {
            if (inputFileRef.current) inputFileRef.current.click();
          }}
        />
      </div>
    </div>
  )
}

export default Image
