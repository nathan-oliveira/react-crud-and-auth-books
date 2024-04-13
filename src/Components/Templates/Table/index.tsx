import React from 'react'
import './table.scss'

import Head from './Head'
import Row from './Row'

const Table = ({ children, dataTable, loading, deletePost, getPost, head, setOrderBy, orderBy, isExpand }: any) => {
  const keys = Object.keys(dataTable[0] || [])
  const headValue = head.reduce((acc: any, current: any) => {
    acc[current.key] = current.title;
    return acc;
  }, {});

  return (
    <React.Fragment>
      <table className={`table ${!loading && 'listing'}`}>
        <Head keys={keys} head={head} setOrderBy={setOrderBy} orderBy={orderBy} />
        <tbody className={'table__tbody'}>
          {(keys.length > 0) ? (
            dataTable.map(
              (record: any, index: number) => (
                <Row 
                  key={record.id} 
                  record={record} 
                  deletePost={deletePost} 
                  getPost={getPost}
                  head={head}
                  tableHead={headValue} 
                  isExpand={!!isExpand} 
                  isPair={(index + 1) % 2 === 0}
                >
                  {children}
                </Row>
              )
            )
          ) : (
            <tr>
              <td className="table__notItem">Nenhum registro encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>
    </React.Fragment>
  )
}

export default Table
