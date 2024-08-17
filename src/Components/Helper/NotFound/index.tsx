import React from 'react'
import './notfound.scss'

import { useTranslation } from 'react-i18next'

const NotFound = () => {
  const { t } = useTranslation()

  return (
    <section className="animeTop not__found">
      <h1 className="not__found___title">Erro: 404</h1>
      <p>{t('pageNotFound')}</p>
    </section>
  )
}

export default NotFound

