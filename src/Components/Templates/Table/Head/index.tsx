import React from 'react'
import '../table.scss'

const Head = ({ keys, head }: any) => {
  const tableHead = head || {}
  let indexRow = 0;

  return (
    <thead className="table__thead">
      <tr>
        {keys.map((key: any, index: any) => {
          if (tableHead[key]) indexRow = indexRow + 1;
          return (
            tableHead[key] && <th key={key} className={`table__col${indexRow}`}>{tableHead[key]}</th>
          )
        })}

        {(keys.length > 0) ? (
          <th className="table__action">Ações</th>
        ) : (
            <th className="table__notItem">&nbsp;</th>
          )}

      </tr>
    </thead >
  )
}

export default Head