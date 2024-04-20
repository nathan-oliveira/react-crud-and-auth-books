import Button from 'Components/Templates/Form/Button';
import RowButton from 'Components/Templates/Form/Row';
import React from 'react'

const BookExpand = ({ record, close }: any) => {
  // React.useEffect(() => {
  //   console.log(record)
  // }, []);

  if (!record) return null;
  return (
    <React.Fragment>
      <form>
        { record.id }

        <RowButton classRow="row__button_right">
          <Button type="button" classBtn="btn__close" onClick={() => close()}>
            <span>Fechar</span>
          </Button>
        </RowButton>
      </form>
    </React.Fragment>
  );
}

export default BookExpand;