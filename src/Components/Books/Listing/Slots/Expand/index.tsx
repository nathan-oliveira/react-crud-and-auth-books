import React from 'react'
import { useTranslation } from 'react-i18next'

import Button from 'Components/Templates/Form/Button';
import RowButton from 'Components/Templates/Form/Row';

const BookExpand = ({ record, close }: any) => {
  const { t } = useTranslation();

  if (!record) return null;
  return (
    <React.Fragment>
      <form>
        { record.id }

        <RowButton classRow="row__button_right">
          <Button type="button" classBtn="btn__close" onClick={() => close()}>
            <span>{t('book.close')}</span>
          </Button>
        </RowButton>
      </form>
    </React.Fragment>
  );
}

export default BookExpand;