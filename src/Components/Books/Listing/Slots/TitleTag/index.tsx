import React from 'react'
import './title-tag.scss'

const BookTitleTag = ({ items }: any) => {
  const { record, key } = items;
  if (!items || !record || !key) return null;
  return (
    <React.Fragment>
      <div className="tag__info_blue">{ record[key] }</div>
    </React.Fragment>
  );
}

export default BookTitleTag;
