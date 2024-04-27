import React from 'react'

import { GET_BOOKS } from 'Services/api'

import Head from 'Components/Helper/Head'
import LazyLoad from 'Components/Templates/LazyLoad';
import DatePicker from './DatePicker';

const Home = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [period, setPeriod] = React.useState<any>([null, null]);

  function onChangeDate(value: Array<Date> | null | Array<null>) {
    if (!value) {
      setPeriod([null, null]);
    } else {
      const arrayDate = value.map((value) => value?.toISOString())
      setPeriod(arrayDate)
    }
  }

  return (
    <section>
      <Head title="Home" />
      <h1>Home</h1>

      {period[0] + ' - '+ period[1]}

      <div>
        <button
          onClick={() => {
            setIsOpen(true)
          }}
        >
          Open
        </button>
        <DatePicker
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Período"
          headerFormat='DD, MM dd'
          onChange={(value) => onChangeDate(value)}
          range={true}
        />
          {/* defaultValueInit={new Date(new Date().setHours(0, 0, 0))}
          defaultValueEnd={new Date(new Date().setHours(23, 59, 59))} */}

          {/* minDate={new Date(2022, 10, 10)} */}
          {/* maxDate={new Date(2023, 0, 10)} */}
      </div>

      <br/>

      <LazyLoad GET={GET_BOOKS} orderBy={{ column: 'description', order: 'ASC' }} />
    </section>
  )
};

export default Home;