import If from 'Components/Templates/Operator/If';
import React from 'react'
import './active.scss'

import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

import { Tooltip } from 'Components/Templates/Tooltip';

const ActiveSlot = ({ items }: any) => {
  const { record, key } = items;
  if (!items || !record || !key) return null;
  return (
    <React.Fragment>
      <If test={record[key] === true}>
        <div className="table__col_active_active">
          <Tooltip message="Ativo" position="left">
            <FaCheck />
          </Tooltip>
        </div>
      </If>
      <If test={record[key] === false}>
        <div className="table__col_active_close">
          <Tooltip message="Inativo" position="left">
            <FaXmark />
          </Tooltip>
        </div>
      </If>
    </React.Fragment>
  );
}

export default ActiveSlot;
