import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

import useFetch from 'Hooks/useFetch'
import { useSearch } from 'Hooks/useQuery';
import { GET_BOOKS, DELETE_BOOK } from 'Services/api'
import { openModal, closeModal } from 'Store/ui';

import { useTranslation } from 'react-i18next'

import Error from 'Components/Helper/Error';
import Loading from 'Components/Helper/Loading';
import NoRegistry from 'Components/Helper/NoRegistry';
import Table, { TableWrapper } from 'Components/Templates/Table';
import Pagination from 'Components/Templates/Table/Pagination';
import ModalDelete from 'Components/Templates/ModalDelete';
import ActiveSlot from 'Components/Templates/Slots/Active';
import { SnackbarMessage } from 'Components/Templates/SnackbarMessage';

import BookExpand from './Slots/Expand';
import BookActions from './Slots/Actions';
import BookTitleTag from './Slots/TitleTag';

const Listing = () => {
  const [page, setPage] = React.useState(1)
  const [limit, setLimit] = React.useState(10)
  const [dataTable, setDataTable] = React.useState([])
  const [orderBy, setOrderBy] = React.useState({ column: 'title', order: 'DESC' })
  const [active, setActive] = React.useState(true)
  const [messageToSnackbar, setMessageToSnackbar] = React.useState('');

  const { t } = useTranslation();
  const querySearch = useSearch();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const headerTable = [
    { key: 'title', title: t('book.datatable.title') },
    { key: 'description', title: t('book.datatable.description') },
    { key: 'active', title: t('book.datatable.active') },
    { key: 'actions', title: '', width: 19 },
  ];

  const { token } = useSelector((state: any) => state.user.data)
  const { total, data, loading, error, request } = useFetch()
  const { request: requestDelete } = useFetch()

  React.useEffect(() => {
    const { url, options } = GET_BOOKS(token)
    const params: any = {
      search: querySearch,
      page: page.toString(),
      limit: limit.toString(),
      orderBy: JSON.stringify(orderBy),
      active,
    };

    request(`${url}?${new URLSearchParams(params)}`, options);
  }, [page, limit, querySearch, token, orderBy, active, messageToSnackbar, request])

  async function deleteBook(id: string) {
    const { url, options } = DELETE_BOOK({ id, token })
    const { response }: any = await requestDelete(url, options)

    if (response.ok) {
      dispatch(closeModal())
      setMessageToSnackbar(t('book.deletedRecord'));
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
        <div className="content__body">
          <ModalDelete handlerSubmit={deleteBook} />
          <TableWrapper
            changeActive={(value: boolean) => setActive(value)}
            setOrderBy={setOrderBy}
            orderBy={orderBy}
            orderByItems={headerTable}
          >
            <Table
              dataTable={dataTable}
              loading={loading}
              deletePost={deleteBook}
              getPost={getBook}
              setOrderBy={setOrderBy}
              orderBy={orderBy}
              isExpand
              head={headerTable}
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
          </TableWrapper>

          <SnackbarMessage
            active={!!messageToSnackbar}
            message={messageToSnackbar}
            handlerClose={() => setMessageToSnackbar('')}
          />
        </div>
      ) : (
        <NoRegistry to="/books/create" />
      )}
    </React.Fragment>
  )
}

export default Listing
