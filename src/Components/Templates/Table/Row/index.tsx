import React from 'react'
import '../table.scss'

import { ReactComponent as Trash } from 'Assets/svg/trash.svg'
import { ReactComponent as Edit } from 'Assets/svg/edit.svg'

const Row = ({ record, getPost, deletePost, head }: any) => {
  const keys = Object.keys(record)
  const tableHead = head || {}
  let indexRow = 0;

  if (record !== '')
    return (
      <tr key={record.id}>
        {keys.map((key) => {
          if (tableHead[key]) indexRow = indexRow + 1;
          return (
            tableHead[key] && <td key={key} className={`table__col${indexRow}`}>{record[key]}</td>
          )
        })}
        <td className="table__action">
          <div className="table__action___button">
            <button title="Editar" onClick={() => getPost(record.id)} className="table__action__edit">
              <Edit />
            </button>
            <button title="Excluir" onClick={() => deletePost(record.id)} className="table__action__trash">
              <Trash />
            </button>
          </div>
        </td>
      </tr>
    )
  else
    return (
      <tr>
        <td>Ops</td>
      </tr>
    )
}

export default Row