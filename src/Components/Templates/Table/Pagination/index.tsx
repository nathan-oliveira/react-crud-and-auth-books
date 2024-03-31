import React from 'react'
import './pagination.scss'

import { useNavigate, useLocation } from 'react-router-dom';
import { useLimit, usePage, useSearch } from 'Hooks/useQuery';

const Pagination = ({ data, setPage, page, setLimit, limit, total, search, setDataTable }: any) => {
  const [qtdPage, setQtdPage] = React.useState(0);
  const [rowPages, setRowPages] = React.useState([]);
  const [optionsLimit, setOptionsLimit] = React.useState([10, 20, 30, 40]);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const querySearch = useSearch();
  const queryPage = usePage();
  const queryLimit = useLimit();

  const changeLimit = React.useCallback((limit: number) => {
    const paramsURL: any = { q: querySearch, page: `${queryPage}`, limit: `${limit}` };
    navigate(`${pathname}?${new URLSearchParams(paramsURL).toString()}`, { replace: true })
    setLimit(limit);
  }, [querySearch, queryPage, navigate, pathname, setLimit])

  const changePage = React.useCallback((page: number) => {
    const paramsURL: any = { q: querySearch, page: `${page}`, limit: `${queryLimit}` };
    navigate(`${pathname}?${new URLSearchParams(paramsURL).toString()}`, { replace: true })
    setPage(page)
  }, [querySearch, queryLimit, navigate, pathname, setPage]);

  const incPage: any = React.useCallback(() => page < qtdPage && changePage(page + 1), [page, qtdPage, changePage]);
  const descPage: any = React.useCallback(() => page > 1 && changePage(page - 1), [page, changePage])

  React.useEffect(() => {
    function rowPages() {
      const arrayPages: any = [];
      const numberOfPages = Math.ceil(total / limit);

      for (let index = 1; index <= numberOfPages; index++) {
        arrayPages.push(<li className={`page__link ${page === index ? 'page__link__active' : ''}`} key={index} onClick={() => changePage(index)}>{index}</li>);
      }

      setQtdPage(numberOfPages)
      setRowPages(arrayPages)
      setDataTable(data)
    }

    rowPages()
  }, [data, page, limit, total, setPage, setDataTable])

  return (
    <div className="table__pagination">
      <ul className="total"> Mostrando {page} de {qtdPage} páginas</ul>
      <ul>
        {limit && (
          <select
            id="limit"
            name="limit"
            onChange={(event) => changeLimit(event.target.value ? Number(event.target.value) : limit)}
            value={limit}
          >
            {optionsLimit.map((value) => (
              <option value={value} key={value}>{value}</option>
            ))}
          </select>
        )}
      </ul>
      <ul className="pagination">
        <li onClick={() => descPage(page)} className="page__button">&#8678;</li>
        {search === '' ? (
          rowPages
        ) : (
            <li className="page__link page__link__active">1</li>
          )}
        <li onClick={() => incPage(page)} className="page__button">&#8680;</li>
      </ul>
    </div>
  )
}

export default Pagination
