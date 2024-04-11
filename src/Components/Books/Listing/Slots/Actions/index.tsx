import React from 'react'

import { ReactComponent as Trash } from 'Assets/svg/trash.svg'
import { ReactComponent as Edit } from 'Assets/svg/edit.svg'

const BookActions = ({ record, getBook, deleteBook }: any) => {
  if (!record) return null;
  return (
    <React.Fragment>
      <button className="table__action__edit" title="Editar" onClick={() => getBook(record.id)} >
        <Edit />
      </button>
      <button className="table__action__trash" title="Excluir" onClick={() => deleteBook(record.id)}>
        <Trash />
      </button>
    </React.Fragment>
  );
}

export default BookActions;
