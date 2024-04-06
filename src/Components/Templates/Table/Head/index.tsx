import React from 'react'
import '../table.scss'

import { TiArrowDown } from "react-icons/ti";
import { TiArrowUp } from "react-icons/ti";

const Head = ({ keys, head, setOrderBy, orderBy }: any) => {
  const tableHead = head || []
  let indexRow = 0;

  function sortBy(column: string) {
    if (setOrderBy && orderBy) {
      setOrderBy({
        column,
        order: orderBy.order === 'DESC' ? 'ASC' : 'DESC',
      });
    }
  }

  return (
    <thead className="table__thead">
      <tr>
        {keys.map((key: any, index: any) => {
          const filterHead = tableHead.find((h: any) => h.key === key);
          if (filterHead) indexRow = indexRow + 1;
          return (
            filterHead && (
              <th key={key} className={`table__col${indexRow}`}>
                <div className="table__thead_icons">
                  {filterHead.title}
                  {orderBy.order && (orderBy.order === 'ASC' ? 
                    <TiArrowDown onClick={() => sortBy(key)} className="table__thead_icon_arrow" /> : 
                    <TiArrowUp onClick={() => sortBy(key)} className="table__thead_icon_arrow" />
                  )}
                </div>
              </th>
            )
          )
        })}

        {(keys.length > 0) ? (
          <th className="table__action"></th>
        ) : (
            <th className="table__notItem">&nbsp;</th>
          )}
      </tr>
    </thead >
  )
}

export default Head