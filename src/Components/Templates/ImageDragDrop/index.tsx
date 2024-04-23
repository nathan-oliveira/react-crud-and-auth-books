import React from 'react'
import './image-drag-drop.scss'

import { MdFileUpload } from 'react-icons/md';
import { LuCheckCircle2 } from 'react-icons/lu';
import { MdDelete } from "react-icons/md";

import useMedia from 'Hooks/useMedia';
import Avatar from 'Assets/img/avatar.png'
import { validateFile } from 'Hooks/useForm';
import If from 'Components/Templates/Operator/If';

const ImageDragDrop = ({ uploadFile, deleteFile, value, success, loading, removed, error }: any) => {
  const [photo, setPhoto] = React.useState(null);
  const [dragging, setDragging] = React.useState(false);
  const inputFileRef: any = React.useRef(null)
  const mobile = useMedia('(max-width: 800px)');

  React.useEffect(() => {
    let objectUrl: any;
    if (value) {
      objectUrl = URL.createObjectURL(value)
      setPhoto(objectUrl);
    }
    return () => { if (objectUrl) URL.revokeObjectURL(objectUrl) }
  }, [value]);

  React.useEffect(() => {
    if (removed) setPhoto(null);
  }, [removed]);

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
    if (validateFile(file?.type)) {
      uploadFile(file);
    } else {
      // alert arquivo inválido
    }
  }

  return (
    <div 
      className="content__image" 
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="content__image__body">
        <If test={!mobile}>
          <img src={photo ?? Avatar} alt="Foto de Perfil" />
        </If>
        <If test={mobile}>
          <img
            src={photo ?? Avatar} 
            alt="Foto de Perfil" 
            onClick={() => {
              if (inputFileRef.current && !success) inputFileRef.current.click();
            }}
          />
        </If>
        
        <If test={mobile}>
          <span className="content__image__send_mobile">
            <If test={!success && !photo}>
              <MdFileUpload 
                onClick={() => {
                  if (inputFileRef.current) inputFileRef.current.click();
                }}
              />
            </If>

            <If test={!success && photo}>
              <div className="content__image_display_delete">
                <MdDelete onClick={() => deleteFile()} />
              </div>
            </If>

            <If test={success}>
              <LuCheckCircle2 />
            </If>
          </span>
        </If>
      </div>

      <If test={loading}>
        <div className="content__image__loading">
          <span className="loading__infinite"></span>
        </div>
      </If>
     
      <If test={success}>
        <div className="content__image__success">
          <LuCheckCircle2 />
        </div>
      </If>
     
      <div className="content__image_display">
        <input
          type="file" 
          name="file" 
          id="file" 
          accept="image/png,image/jpg,image/jpeg"
          ref={inputFileRef}
          onChange={emitFile}
        />

        <MdFileUpload 
          onClick={() => {
            if (inputFileRef.current) inputFileRef.current.click();
          }}
        />
      </div>

      <If test={photo && !mobile}>
        <div className="content__image_display_delete">
          <MdDelete onClick={() => deleteFile()} />
        </div>
      </If>
    </div>
  )
}

export default ImageDragDrop
