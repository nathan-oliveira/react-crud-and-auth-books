import React, { ReactNode } from 'react'
import './main.scss';

import { useSelector } from 'react-redux'

type Props = { children: ReactNode }

const Main = ({ children }: Props) => {
  const { data } = useSelector((state: any) => state.user)

  // <main className={`${styles.content} ${!data?.token ? styles.content__login__center : '' }`}>
  return (
    <React.Fragment>
      <main className={`content_main${!data?.token ? ' content__login__center' : ''}`}>
        {children}
      </main>
    </React.Fragment>
  )
};

export default Main