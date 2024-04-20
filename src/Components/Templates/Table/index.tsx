import React from 'react'
import './table.scss'

import Head from './Head'
import Row from './Row'
import RowCard from './RowCard'

import Switch from 'Components/Templates/Form/Switch'
import If from '../Operator/If'
import useMedia from 'Hooks/useMedia'

export const TableWrapper = ({ children, changeActive }: any) => {
  const [active, setActive] = React.useState(true);
  const mobile = useMedia('(max-width: 800px)');

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

      <div className={mobile ? 'animeLeft' : 'animeLeft table_wrapper'}>
        {children}
      </div>
    </>
  );
};

const Table = ({ children, dataTable, loading, deletePost, getPost, head, setOrderBy, orderBy, isExpand }: any) => {
  const mobile = useMedia('(max-width: 800px)');

  const keys = Object.keys(dataTable[0] || [])
  const headValue = head.reduce((acc: any, current: any) => {
    acc[current.key] = current.title;
    return acc;
  }, {});

  return (
    <React.Fragment>
      <If test={!mobile}>
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
      </If>

      <If test={mobile}>
        {(keys.length > 0) ? (
          dataTable.map(
            (record: any, index: number) => (
              <RowCard 
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
              </RowCard>
            )
          )
        ) : (
          <tr>
            <td className="table__notItem">Nenhum registro encontrado.</td>
          </tr>
        )}
        {/* card aqui?? */}
      </If>
    </React.Fragment>
  )
}

export default Table
