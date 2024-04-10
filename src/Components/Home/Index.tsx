import React from 'react'

import { GET_BOOKS } from 'Services/api'

import Head from 'Components/Helper/Head'
import SelectLazy from 'Components/Templates/Form/SelectLazy';

const Home = () => {
  return (
    <section>
      <Head title="Home" />
      <h1>Home</h1>
      <SelectLazy GET={GET_BOOKS} orderBy={{ column: 'description', order: 'ASC' }}/>
    </section>
  )
};

export default Home;