import React from 'react'
import './search.scss'

import { useTranslation } from 'react-i18next';
import { ReactComponent as SearchIcon } from 'Assets/svg/search.svg'

const Search = ({ setQuery }: any) => {
  const { t } = useTranslation();
  return (
    <div className="search">
      <input
        type="text"
        className="search__input"
        onChange={ev => setQuery(ev.target.value)}
        placeholder={t('template.search')}
      />
      <SearchIcon />
    </div>
  )
}

export default Search
