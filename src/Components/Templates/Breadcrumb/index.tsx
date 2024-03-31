import React from 'react'
import './breadcrumb.scss'

import { useLocation } from 'react-router-dom'

const Breadcrumb = ({ title, path }: any) => {
  const [breadcrumb, setBreadcrumb] = React.useState('');
  const location = useLocation();

  React.useEffect(() => {
    const { pathname } = location;

    switch (!!pathname) {
      case pathname.includes('cadastrar'):
        setBreadcrumb('Cadastrar');
        break;
      case pathname.includes('editar'):
        setBreadcrumb('Editar');
        break;
      case pathname.includes(path):
        setBreadcrumb('Listagem');
        break;
      default:
        setBreadcrumb(path);
    }
  }, [location, path])

  return (
    <div className="animeLeft breadcrumb">
      <ol className="breadcrumb__nav">
        <li>
          <ul className="breadcrumb__item">
            {title} <small className="breadcrumb__small">{breadcrumb}</small>
          </ul>
        </li>
      </ol>
    </div>
  )
}

export default Breadcrumb;
