import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const NoRegistry = ({ path }: any) => {
  const { t } = useTranslation()

  return (
    <div className="animeLeft empty__table">
      <h1 className="title__empty__table">{t('helper.noRecordsFound')}</h1>
      <Link to={path}>{t('helper.createNow')}</Link>
    </div>
  )
}

export default NoRegistry
