import { ReactComponent as Trash } from 'Assets/svg/trash.svg'
import { ReactComponent as Edit } from 'Assets/svg/edit.svg'

const BookActions = ({ record, getBook, deleteBook }: any) => {
  if (!record) return null;
  return (
    <>
     <button className="table__action__edit" title="Editar" onClick={() => getBook(record.id)} >
        <Edit />
      </button>
      <button className="table__action__trash" title="Excluir" onClick={() => deleteBook(record.id)}>
        <Trash />
      </button>
    </>
  );
}

export default BookActions;
