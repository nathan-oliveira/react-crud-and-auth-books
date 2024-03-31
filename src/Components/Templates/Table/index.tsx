import React from 'react'
import './table.scss'

import Head from './Head'
import Row from './Row'

const Table = ({ dataTable, loading, deletePost, getPost, head }: any) => {
  const keys = Object.keys(dataTable[0] || [])

  return (
    <React.Fragment>
      <table className={`table ${!loading && 'listing'}`}>
        <Head keys={keys} head={head} />
        <tbody className={'table__tbody'}>
          {(keys.length > 0) ? (
            dataTable.map((record: any) => <Row key={record.id} record={record} deletePost={deletePost} getPost={getPost} head={head} />)
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
