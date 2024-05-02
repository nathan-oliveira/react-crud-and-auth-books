import React from 'react'

import { GET_BOOKS } from 'Services/api'

import Head from 'Components/Helper/Head'
import LazyLoad from 'Components/Templates/LazyLoad';
import DatePicker from './DatePicker';

const Home = () => {
  const [periodRange, setPeriodRange] = React.useState<any>([null, null]);

  function onChangeDate(value: Array<Date> | null | Array<null>) {
    if (!value) {
      setPeriodRange([null, null]);
    } else {
      const arrayDate = value.map((value) => value ? value.toISOString() : null)
      setPeriodRange(arrayDate)
    }
  }

  return (
    <section>
      <Head title="Home" />
      <h1>Home</h1>

      {periodRange[0] + ' - '+ periodRange[1]}

      <div>
        <DatePicker
          valueSelectedInput={periodRange}
          title="Período Range"
          headerFormat='DD, MM dd'
          onChange={(value) => onChangeDate(value)}
          range
          hours
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