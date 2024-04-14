import React from 'react';
import { formatMoney, mascaraCpf } from 'Helpers'

const types: any = {
  email: {
    regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'Preencha um email válido',
  },
  password: {
    regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
    message:
      'A senha precisa ter 1 caracter maíusculo, 1 minúsculo e 1 digito. Com no mínimo 8 caracteres.',
  },
  number: {
    regex: /^\d+$/,
    message: 'Utilize números apenas.',
  },
  file: {
    mimeTypes: ['image/png', 'image/jpg', 'image/jpeg'],
    message: 'Imagem é inválida'
  },
};

interface UseFormProps {
  type?: string;
  required?: boolean;
}

const useForm = (props: UseFormProps = { type: '', required: true }): any => {
  const type = props?.type ?? '';
  const required = props?.required ?? true;

  const [value, setValue] = React.useState(null);
  const [error, setError] = React.useState(null);

  function validate(input: any) {
    const target = { 
      value: type === 'file' ? input?.value : input,  
      type: type === 'file' ? input?.type : null,
    };
    
    if ((target.value === null || target.value?.length === 0) && required === true) {
      setError('Preencha um valor.' as any);
      return false;
    } else if (type === 'file' && types.file && !types.file.mimeTypes.includes(target?.type)) {
      setError(types[type].message);
      return false;
    } else if (type !== 'file' && types[type] && !types[type].regex.test(target?.value)) {
      setError(types[type].message);
      return false;
    } else {
      setError(null);
      return true;
    }
  }

  function onChange({ target }: any) {
    if (error) validate(target);
    if (type === 'file') return setValue(target.files[0]);
    if (type === 'money') return setValue(formatMoney(target.value))
    if (type === 'cpf') return setValue(mascaraCpf(target.value))
    setValue(target.value);
  }

  return {
    value,
    setValue,
    onChange,
    error,
    validate: () => validate(value),
    onBlur: () => validate(value),
    setError,
  };
};

export default useForm;
