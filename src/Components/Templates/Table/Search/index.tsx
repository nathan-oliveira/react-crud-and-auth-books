import React from 'react'
import './search.scss'

import { ReactComponent as SearchIcon } from 'Assets/svg/search.svg'

const Search = ({ setQuery }: any) => {
  return (
    <div className="search">
      <input
        type="text"
        className="search__input"
        onChange={ev => setQuery(ev.target.value)}
        placeholder="Pesquisar"
      />
      <SearchIcon />
    </div>
  )
}

export default Search
