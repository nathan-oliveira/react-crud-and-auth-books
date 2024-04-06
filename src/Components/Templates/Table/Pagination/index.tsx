import React from 'react'
import './pagination.scss'

import { useNavigate, useLocation } from 'react-router-dom';
import { useLimit, usePage, useSearch } from 'Hooks/useQuery';

import { TbChevronLeftPipe } from "react-icons/tb";
import { TbChevronRightPipe } from "react-icons/tb";
import { TbChevronLeft } from "react-icons/tb";
import { TbChevronRight } from "react-icons/tb";

import If from 'Components/Templates/Operator/If';

const Pagination = ({ data, setPage, page, setLimit, limit, limits, total, search, setDataTable, oldPaginate }: any) => {
  const [qtdPage, setQtdPage] = React.useState(0);
  const [rowPages, setRowPages] = React.useState([]);
  const [optionsLimit, setOptionsLimit] = React.useState([10, 20, 30, 40]);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const querySearch = useSearch();
  const queryPage = usePage();
  const queryLimit = useLimit();

  const changeLimit = React.useCallback((limitValue: number) => {
    const value = limitValue === 0 ? optionsLimit[0] : limitValue;
    const paramsURL: any = { q: querySearch, page: `${page}`, limit: `${value}` };
    navigate(`${pathname}?${new URLSearchParams(paramsURL).toString()}`, { replace: true })
    setLimit(value);
  }, [navigate, optionsLimit, page, pathname, querySearch, setLimit]);

  const changePage = React.useCallback((pageValue: number) => {
    const value = pageValue === 0 ? 1 : pageValue;
    const paramsURL: any = { q: querySearch, page: `${value}`, limit: `${limit}` };
    navigate(`${pathname}?${new URLSearchParams(paramsURL).toString()}`, { replace: true })
    setPage(value)
  }, [limit, navigate, pathname, querySearch, setPage]);

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
  }, [data, page, limit, total, setPage, setDataTable, changePage])

  React.useEffect(() => {
    function setParams() {
      let optionsLimits = optionsLimit;
      if (limits && limits.length) {
        setOptionsLimit(limits)
        optionsLimits = limits;
      }
      const limitValue = (!queryLimit || queryLimit === 0) ? optionsLimits[0] : (Number(queryLimit) >= optionsLimits[optionsLimits.length - 1] ? optionsLimits[optionsLimits.length - 1] : Number(queryLimit));
      const pageValue = (!queryPage || queryPage === 0) ? 1 : (limitValue >= total ? 1 : (Number(queryPage) >= Math.ceil(total / limitValue) ? Math.ceil(total / limitValue) : Number(queryPage)));
      const paramsURL: any = { q: querySearch, page: `${pageValue}`, limit: `${limitValue}` };
      navigate(`${pathname}?${new URLSearchParams(paramsURL).toString()}`, { replace: true });
      setPage(pageValue)
      setLimit(limitValue)
    }
  
    setParams()
  }, [queryPage, queryLimit, optionsLimit, limits, total, querySearch, navigate, pathname, setPage, setLimit]);

  return (
    <div className="table__pagination">
      <ul>
        {limit && (
         <div className="table__pagination_limit">
            <span>Linhas por página:</span>
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
          </div>
        )}
      </ul>
      <ul className="total">
        {page} - {limit} de {qtdPage}
      </ul>
      <If test={!!oldPaginate}>
        <ul className="pagination">
          <li onClick={() => descPage(page)} className="page__button">&#8678;</li>
          {search === '' ? (
            rowPages
          ) : (
              <li className="page__link page__link__active">1</li>
            )}
          <li onClick={() => incPage(page)} className="page__button">&#8680;</li>
        </ul>
      </If>
      <If test={!oldPaginate}>
        <ul className="pagination pagination__new">
          <li className="pagination__new__pad" onClick={() => changePage(1)}>
            <TbChevronLeftPipe className="pagination__icons" />
          </li>

          <li className="pagination__new__pad" onClick={() => descPage(page)}>
            <TbChevronLeft className="pagination__icons" />
          </li>

          <li className="pagination__new__pad" onClick={() => incPage(page)}>
            <TbChevronRight className="pagination__icons" />
          </li>

          <li onClick={() => changePage(qtdPage)}>
            <TbChevronRightPipe className="pagination__icons" />
          </li>
        </ul>
      </If>
    </div>
  )
}

export default Pagination
