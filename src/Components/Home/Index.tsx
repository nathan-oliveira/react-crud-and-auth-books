import React from 'react'

import { GET_BOOKS } from 'Services/api'

import Head from 'Components/Helper/Head'
import LazyLoad from 'Components/Templates/LazyLoad';

const Home = () => {
  return (
    <section>
      <Head title="Home" />
      <h1>Home</h1>
      <LazyLoad GET={GET_BOOKS} orderBy={{ column: 'description', order: 'ASC' }} />
    </section>
  )
};

export default Home;