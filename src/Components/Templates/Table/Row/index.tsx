import React from 'react'
import '../table.scss'

import useMedia from 'Hooks/useMedia'

import { ReactComponent as Trash } from 'Assets/svg/trash.svg'
import { ReactComponent as Edit } from 'Assets/svg/edit.svg'
import { useSelector } from 'react-redux'

const Row = ({ children, expandChildren, record, getPost, deletePost, head, isExpand, isPair }: any) => {
  const [expand, setExpand] = React.useState(false);
  const mobile = useMedia('(max-width: 800px)');
  
  const { menu, sideBar } = useSelector((state: any) => state.menu)

  const keys = Object.keys(record)
  const tableHead = head || {}
  let indexRow = 0;

  const childrenToRender = React.Children.map(expandChildren, (child, childIndex) => {
    if (child.props.slot === 'form') {
      return (
        <td className="table__row__expanded_form" colSpan={indexRow + 1}>
          {React.cloneElement(child, {
            identifier: `form_${childIndex}`,
            record,
          })}
        </td>
      )
    }
    return null;
  });

  const resizeExpanded = React.useCallback(() => {
    const head = document.querySelector('.table__thead');
    if (!head) return;
    const headRows = head.childNodes[0]?.childNodes;
    const isRows = headRows && headRows.length;
    if (!isRows) return;

    const rowsExpanded: any = document.querySelector('.table__row__expanded')?.childNodes;
    const isExpanded = rowsExpanded && rowsExpanded.length;
    if (!isExpanded) return;

    headRows.forEach((el: any, index: any) => {
      rowsExpanded[index].width = `${el.clientWidth}px`;
      rowsExpanded[index].style.paddingLeft = '25px';
    })
  },[]);

  const resizeOffsetRows = React.useCallback(() => {
    if (expand) {
      resizeExpanded();
    } else {
      document.querySelectorAll('.table__row').forEach((el: any) => {
        el.childNodes.forEach((cn: any) => {
          cn.style.paddingLeft = null;
        });
     });
    }
  }, [expand, resizeExpanded]);

  React.useEffect(() => {
    resizeOffsetRows();

    setTimeout(() => { resizeOffsetRows(); }, 500)

    window.addEventListener('resize', () => { 
      setTimeout(() => { resizeOffsetRows(); }, 500)
    });

    return () => {
      window.removeEventListener('resize', () => { 
        setTimeout(() => { resizeOffsetRows(); }, 500)
      });
    };
  }, [expand, menu, resizeOffsetRows]);

  function expandRow() {
    if (!isExpand) return;
    const rowsExpanded: any = document.querySelector('.table__row__expanded');
    if (rowsExpanded && !expand) rowsExpanded.childNodes[0].click();
    setExpand((value) => !value);
  }

  if (record !== '')
    return (
      <>
        <tr className={`${expand ? 'table__row__expanded' : 'table__row'}${isPair ? ' table__row__pair' : ''}`} key={record.id}>
          {keys.map((key) => {
            if (tableHead[key]) indexRow = indexRow + 1;
            return (
              tableHead[key] && (
                <td onClick={() => expandRow()} key={key} className={`table__col${indexRow}`}>
                  {record[key]}
                </td>
              )
            )
          })}
          <td className="table__action" key={Math.random() * 5e20}>
            <div className="table__action___button">
              <button title="Editar" onClick={() => getPost(record.id)} className="table__action__edit">
                <Edit />
              </button>
              <button title="Excluir" onClick={() => deletePost(record.id)} className="table__action__trash">
                <Trash />
              </button>
            </div>
          </td>

          {(expand && expandChildren) && childrenToRender}
        </tr>
        {(expand && expandChildren) && (
          <tr className="table__row table__row_expanded_invisible" key={record.id + '-expanded-invisible'}>
            <td colSpan={indexRow + 1}>&nbsp;</td>
          </tr>
        )}
      </>
    )
  else
    return (
      <tr>
        <td>Ops</td>
      </tr>
    )
}

export default Row