import React from 'react';
import './App.scss'
import { BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { verifyToken } from 'Store/user/userPost'
import Router from './Router'

import Header from 'Components/Templates/Header'
import Main from 'Components/Templates/Main'
import SideNav from 'Components/Templates/SideNav'
import Footer from 'Components/Templates/Footer'
import If from 'Components/Templates/Operator/If';

const App = () => {
  const dispatch = useDispatch();
  const { error, data } = useSelector((state: any) => state.user)

  React.useEffect(() => {
    const updateVhOffset = () => {
      document.documentElement.style.setProperty('--vh-offset', `${window.innerHeight}px`);
    };
  
    updateVhOffset();
  
    window.addEventListener('resize', updateVhOffset);
  
    return () => {
      window.removeEventListener('resize', updateVhOffset);
    };
  }, []);

  React.useEffect(() => {
    dispatch(verifyToken())
  }, [dispatch]);

  return (
    <React.Fragment>
      <BrowserRouter>
        <If test={!error && data?.token}>
          <Header />
        </If>

        <Main>
          <Router />
        </Main>

        <If test={!error && data?.token}>
          <SideNav />
          <Footer />
        </If>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
