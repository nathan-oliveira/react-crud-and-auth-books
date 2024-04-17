import React from 'react'
import './table.scss'

import Head from './Head'
import Row from './Row'

import Switch from 'Components/Templates/Form/Switch'
import If from '../Operator/If'

export const TableWrapper = ({ children, changeActive }: any) => {
  const [active, setActive] = React.useState(true);

  function handlerActive(value: boolean) {
    changeActive(value);
    setActive(value);
  }

  return (
    <>
      <If test={changeActive}>
        <div className="animeLeft table__filters">
          <Switch name="active" value={active} onChange={(e: any) => handlerActive(e.target.value)} />
        </div>
      </If>

      <div className="animeLeft table_wrapper">
        {children}
      </div>
    </>
  );
};

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
