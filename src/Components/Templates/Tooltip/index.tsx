import * as React from 'react';
import './tooltip.scss'

export interface ITooltipProps {
  position: string;
  message: string;
  children: any;
}

export const Tooltip = ({ message, position, children }: ITooltipProps) => {
  return (
    <div className="tooltip_element">
      {children}
      <span className={`tooltip tooltip-${position}`}>{message}</span>
    </div>
  );
}
