import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom';
import useFetch from 'Hooks/useFetch'
import { GET_BOOKS, DELETE_BOOK } from 'Services/api'

import Error from 'Components/Helper/Error';
import Loading from 'Components/Helper/Loading';
import NoRegistry from 'Components/Helper/NoRegistry';
import Table from 'Components/Templates/Table';
import Pagination from 'Components/Templates/Table/Pagination';
import { usePage, useSearch, useLimit } from 'Hooks/useQuery';

const Listing = () => {
  const [page, setPage] = React.useState(1)
  const [limit, setLimit] = React.useState(10)
  const [dataTable, setDataTable] = React.useState([])

  const querySearch = useSearch();
  const queryPage = usePage();
  const queryLimit = useLimit();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { token } = useSelector((state: any) => state.user.data)
  const { total, data, loading, error, request } = useFetch()
  const { request: requestDelete } = useFetch()

  React.useEffect(() => {
    const { url, options } = GET_BOOKS(token)
    const params: any = { search: querySearch, page: `${page}`, limit: `${limit}` };
    const paramsURL: any = { q: querySearch, page: `${page}`, limit: `${limit}` };
    if (querySearch) params.search = querySearch;

    if (queryPage) {
      params.page = queryPage;
      paramsURL.page = queryPage;
      setPage(Number(queryPage))
    } else {
      params.page = page;
      paramsURL.page = page;
    }

    if (queryLimit) {
      params.limit = queryLimit;
      paramsURL.limit = queryLimit;
      setLimit(Number(queryLimit))
    } else {
      params.limit = limit;
      paramsURL.limit = limit;
    }
    
    navigate(`${pathname}?${new URLSearchParams(paramsURL).toString()}`, { replace: true })
    request(`${url}?${new URLSearchParams(params).toString()}`, options);
    console.log('hmm')
  }, [page, limit, querySearch, token])

  async function deleteBook(id: string) {
    const confirm = window.confirm('Tem certeza que deseja deletar?');

    if (confirm) {
      const { url, options } = DELETE_BOOK({ id, token })
      const { response }: any = await requestDelete(url, options)

      if (response.ok) {
        const { url, options } = GET_BOOKS(token)
        request(url, options)
      }
    }
  }

  async function getBook(id: string) {
    navigate(`/books/edit/${id}`)
  }

  if (loading) return <Loading />
  if (error) return <Error error={error} />
  return (
    <React.Fragment>
      {(data !== null) ? (
        <div className="animeLeft">
          <Table
            dataTable={dataTable}
            loading={loading}
            deletePost={deleteBook}
            getPost={getBook}
            head={{ title: 'Título', description: 'Descrição'}}
          />
          <Pagination
            data={data}
            total={total}
            setPage={setPage}
            setLimit={setLimit}
            page={page}
            limit={limit}
            search={querySearch}
            setDataTable={setDataTable}
          />
        </div>
      ) : (
        <NoRegistry to="/books/create" />
      )}
    </React.Fragment>
  )
}

export default Listing
