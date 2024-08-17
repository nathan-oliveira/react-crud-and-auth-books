import React from 'react'
import { useTranslation } from 'react-i18next';

const Head = (props: any) => {
  const { t } = useTranslation();

  React.useEffect(() => {
    document.title = `${props.title} | ${t('helper.system')}`
    document.querySelector("meta[name='description']")?.setAttribute('content', props.description || t('helper.system'))
  }, [props])

  return (
    <React.Fragment>
    </React.Fragment>
  )
}

export default Head;
