import React from 'react'

const BookExpand = ({ record }: any) => {
  // React.useEffect(() => {
  //   console.log(record)
  // }, []);

  if (!record) return null;
  return (
    <React.Fragment>
      <form>
        { record.id }
      </form>
    </React.Fragment>
  );
}

export default BookExpand;