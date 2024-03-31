import React from 'react'
import './books.scss'

import { Routes, Route } from 'react-router-dom'

import Breadcrumb from 'Components/Templates/Breadcrumb'
import HeaderMenu from 'Components/Templates/HeaderMenu'
import Head from 'Components/Helper/Head'
import NotFound from 'Components/Helper/NotFound'

import Listing from './Listing'
import Form from './Form'

const Books = () => {
  return (
    <section>
      <Head title="Livros" />
      <Breadcrumb title="Livros" path="/books" />

      <div className="content__page">
        <HeaderMenu path="/books" />
        <Routes>
          <Route path="/" element={<Listing />} />
          <Route path="/create" element={<Form />} />
          <Route path="/edit/:id" element={<Form />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </section>
  )
}

export default Books
