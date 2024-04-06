import React from 'react'
import './table.scss'

import Head from './Head'
import Row from './Row'

const Table = ({ dataTable, loading, deletePost, getPost, head, setOrderBy, orderBy, isExpand }: any) => {
  const keys = Object.keys(dataTable[0] || [])
  const headValue = head.reduce((acc: any, current: any) => {
    acc[current.key] = current.title;
    return acc;
 }, {});

  return (
    <React.Fragment>
      <table className={`table ${!loading && 'listing'}`}>
        <Head keys={keys} head={head} setOrderBy={setOrderBy} orderBy={orderBy}/>
        <tbody className={'table__tbody'}>
          {(keys.length > 0) ? (
            dataTable.map((record: any) => <Row key={record.id} record={record} deletePost={deletePost} getPost={getPost} head={headValue} isExpand={!!isExpand} />)
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
