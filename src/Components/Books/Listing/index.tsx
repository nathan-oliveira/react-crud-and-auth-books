import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import useFetch from 'Hooks/useFetch'
import { GET_BOOKS, DELETE_BOOK } from 'Services/api'

import Error from 'Components/Helper/Error';
import Loading from 'Components/Helper/Loading';
import NoRegistry from 'Components/Helper/NoRegistry';
import Table from 'Components/Templates/Table';
import Pagination from 'Components/Templates/Table/Pagination';
import { useSearch } from 'Hooks/useQuery';

const Listing = () => {
  const [page, setPage] = React.useState(1)
  const [limit, setLimit] = React.useState(10)
  const [dataTable, setDataTable] = React.useState([])

  const querySearch = useSearch();

  const navigate = useNavigate();

  const { token } = useSelector((state: any) => state.user.data)
  const { total, data, loading, error, request: requestGetAll } = useFetch()
  const { request: requestDelete } = useFetch()

  React.useEffect(() => {
    const { url, options } = GET_BOOKS(token)
    const params: any = { search: querySearch, page: `${page}`, limit: `${limit}` };
    requestGetAll(`${url}?${new URLSearchParams(params).toString()}`, options);
  }, [page, limit, querySearch, token])

  async function deleteBook(id: string) {
    const confirm = window.confirm('Tem certeza que deseja deletar?');

    if (confirm) {
      const { url, options } = DELETE_BOOK({ id, token })
      const { response }: any = await requestDelete(url, options)

      if (response.ok) {
        const { url, options } = GET_BOOKS(token)
        requestGetAll(url, options)
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
            requestGetAll={requestGetAll}
            fetchGet={GET_BOOKS}
          />
        </div>
      ) : (
        <NoRegistry to="/books/create" />
      )}
    </React.Fragment>
  )
}

export default Listing
