import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

import useFetch from 'Hooks/useFetch'
import { useSearch } from 'Hooks/useQuery';
import { GET_BOOKS, DELETE_BOOK } from 'Services/api'

import Error from 'Components/Helper/Error';
import Loading from 'Components/Helper/Loading';
import NoRegistry from 'Components/Helper/NoRegistry';
import Table from 'Components/Templates/Table';
import Pagination from 'Components/Templates/Table/Pagination';

import ActiveSlot from 'Components/Templates/Slots/Active';
import BookExpand from './Slots/Expand';
import BookActions from './Slots/Actions';
import BookTitleTag from './Slots/TitleTag';
import ModalDelete from './ModalDelete';
import { openModal, closeModal } from 'Store/ui';


const Listing = () => {
  const [page, setPage] = React.useState(1)
  const [limit, setLimit] = React.useState(10)
  const [dataTable, setDataTable] = React.useState([])
  const [orderBy, setOrderBy] = React.useState({ column: 'title', order: 'DESC' })

  const querySearch = useSearch();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state: any) => state.user.data)
  const { total, data, loading, error, request } = useFetch()
  const { request: requestDelete } = useFetch()

  React.useEffect(() => {
    function find() {
      const { url, options } = GET_BOOKS(token)
      const params: any = { search: querySearch, page: page.toString(), limit: limit.toString(), orderBy: JSON.stringify(orderBy) };
      request(`${url}?${new URLSearchParams(params).toString()}`, options);
    }

    find()
  }, [page, limit, querySearch, token, orderBy, request])

  async function deleteBook(id: string) {
    const { url, options } = DELETE_BOOK({ id, token })
    const { response }: any = await requestDelete(url, options)

    if (response.ok) {
      const { url, options } = GET_BOOKS(token)
      request(url, options)
      dispatch(closeModal())
    }
  }
  
  async function getBook(id: string) {
    navigate(`/books/edit/${id}`)
  }

  if (data === null && loading) return <Loading />
  if (error) return <Error error={error} />
  return (
    <React.Fragment>
      {(data !== null) ? (
        <>
          <ModalDelete handlerSubmit={deleteBook} />
          <div className="animeLeft table_wrapper">
            <Table
              dataTable={dataTable}
              loading={loading}
              deletePost={deleteBook}
              getPost={getBook}
              setOrderBy={setOrderBy}
              orderBy={orderBy}
              isExpand
              head={[
                { key: 'title', title: 'Título' },
                { key: 'description', title: 'Descrição' },
                { key: 'active', title: 'Ativo' },
                { key: 'actions', title: '', width: 10 },
              ]}
            >
              <BookExpand slot="form" />
              <BookTitleTag slot="title" />
              <ActiveSlot slot="active" />
              <BookActions slot="actions" 
                deleteBook={(id: string) => dispatch(openModal(id))} 
                getBook={getBook} 
              />
            </Table>

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
        </>
      ) : (
        <NoRegistry to="/books/create" />
      )}
    </React.Fragment>
  )
}

export default Listing
