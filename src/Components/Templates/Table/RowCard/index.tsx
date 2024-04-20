import React from 'react'
import '../table.scss'
import './row-card.scss'

import { orderTableKeys } from 'Helpers'

import useMedia from 'Hooks/useMedia'

import { useSelector } from 'react-redux'
import If from 'Components/Templates/Operator/If'

const Row = ({ children: expandChildren, record, getPost, deletePost, tableHead, head, isExpand, isPair }: any) => {
  const [expand, setExpand] = React.useState(false);
  const mobile = useMedia('(max-width: 800px)');
  
  const { menu } = useSelector((state: any) => state.menu)

  const keys = Object.keys(record)
  const orderKeys = orderTableKeys(keys as any, head)

  let indexRow = 0;

  const childList = expandChildren
    .map((child: any) => child.props.slot)
    .filter((value: string) => value !== 'actions');

  const childrenToRender = React.Children.map(expandChildren, (child, childIndex) => {
    if (child.props.slot === 'form') {
      return (
        <div className="table__row__expanded_form">
          {React.cloneElement(child, {
            identifier: `form_${childIndex}`,
            record,
          })}
        </div>
      )
    }
    return null;
  });

  const activeOrInativeToRender = (key: any) => (
    <>
      {typeof record[key] === 'boolean' ? (`Ativo/Inativo: ${record[key] ? 'Ativo' : 'Inativo'}`) : (
        <div className="table__row__expanded__card__row">
          <span className="table__row__expanded__card__title">{ tableHead[key] }:</span>
          {record[key]}
        </div>
      )}
    </>
  );

  const childrenActionsToRender = React.Children.map(expandChildren, (child, childIndex) => {
    if (child.props.slot === 'actions') {
      return (
        React.cloneElement(child, {
          identifier: `actions_${childIndex}`,
          record,
        })
      )
    }
    return null;
  });

  const childExpandedToRender = (key: any) => React.Children.map(expandChildren, (child, childIndex) => {
    if (child.props.slot === key) {
      return (
        <div className="table__row__expanded__card__row">
          <span className="table__row__expanded__card__title">{ tableHead[key] }:</span>
          {React.cloneElement(child, {
            identifier: `${child.props.slot}_${childIndex}_${Math.round(Math.random() * 5e20)}`,
            items: { record, key, title: tableHead[key] },
          })}
        </div>
      )
    }
    return null
  });

  const resizeExpanded = React.useCallback(() => {
    const headSelected = document.querySelector('.table__thead');
    if (!headSelected) return;
    const headRows = headSelected.childNodes[0]?.childNodes;
    const isRows = headRows && headRows.length;
    if (!isRows) return;

    const rowsExpanded: any = document.querySelector('.table__row__expanded')?.childNodes;
    const isExpanded = rowsExpanded && rowsExpanded.length;
    if (!isExpanded) return;

    headRows.forEach((el: any, index: any) => {
      if (index === 0) {
        const math = Math.ceil(22 / headRows.length);
        rowsExpanded[index].width = `${el.clientWidth + math}px`;
        rowsExpanded[index].style.paddingLeft = '25px';
      } else {
        rowsExpanded[index].width = `${el.clientWidth}px`;
        rowsExpanded[index].style.paddingLeft = '19px';
      }

      rowsExpanded[index].style.paddingTop = '7px';
    })
  }, [expand, menu, mobile]);

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
  }, [expand, menu, mobile]);

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

  console.log(tableHead)

  if (record !== '')
    return (
      <>
        <div className={`${expand ? 'table__row__expanded table__row__expanded__card' : 'table__row__card'}`} key={record.id}>
          {orderKeys.map((key) => {
            if (tableHead[key]) indexRow = indexRow + 1;
            return (
              tableHead[key] && (
                <div onClick={() => expandRow()} key={key} className={`table__col${indexRow}`}>
                  <If test={childList.includes(key)}>
                    {childExpandedToRender(key)}
                  </If>
                  <If test={!childList.includes(key)}>
                    {activeOrInativeToRender(key)}
                  </If>
                </div>
              )
            )
          })}

          {(tableHead && Object.keys(tableHead).includes('actions')) && (
            <>
              <If test={!expand}>
                <div className="table__action" key={Math.round(Math.random() * 5e20)}>
                  <div className="table__action___button">
                    {childrenActionsToRender && (childrenActionsToRender)}
                  </div>
                </div>
              </If>
              <If test={expand}>
                <div className="table__action" key={Math.round(Math.random() * 5e20)}>
                  <div className="table__action___button"></div>
                </div>
              </If>
            </>
          )}

          {(expand && expandChildren) && childrenToRender}
        </div>

        {/* invisible */}
        {(expand && expandChildren) && (
          <div className="table__row__card table__row__card__old" key={record.id + '-' + Math.random() * 5e20}>
            {orderKeys.map((key) => {
              if (tableHead[key]) indexRow = indexRow + 1;
              return (
                tableHead[key] && (
                  <div key={key + Math.random() * 5e20} className={`table__col${indexRow}`}>
                    <If test={childList.includes(key)}>
                      {childExpandedToRender(key)}
                    </If>

                    <If test={!childList.includes(key)}>
                      {activeOrInativeToRender(key)}
                    </If>
                  </div>
                )
              )
            })}

            {(tableHead && Object.keys(tableHead).includes('actions')) && (
              <div className="table__action__card" key={Math.round(Math.random() * 5e20)}>
                <div className="table__action___button__card">
                  {childrenActionsToRender && (childrenActionsToRender)}
                </div>
              </div>
            )}
          </div>
        )}
      </>
    )
  else
    return (
      <tr>
        <td></td>
      </tr>
    )
}

export default Row