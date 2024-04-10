import React from "react";

const BookExpand = ({ record }: any) => {
  // React.useEffect(() => {
  //   console.log(record)
  // }, []);

  if (!record) return null;
  return (
    <form>
      { record.id }
    </form>
  );
}

export default BookExpand;