import React from 'react';

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { userLogout } from 'Store/user/auth';

const useFetch = (typeResult: string = 'json') => {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [total, setTotal] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const request = React.useCallback(async (url: any, options: any) => {
    let response: any;
    let json: any;
    try {
      setError(null);
      setLoading(true);
      response = await fetch(url, options);
      json = await response[typeResult]();
      if (response.ok === false) throw new Error(json.message);
      const totalItems = response.headers.get('X-Total-Items')
      if (!!totalItems) setTotal(Number(totalItems))
    } catch (err: any) {
      const errorUnauthorized = response.status === 401 && response.statusText === 'Unauthorized';
      if (errorUnauthorized) {
        dispatch(userLogout())
        navigate('/login')
      }

      json = null;
      setError(err.message);
    } finally {
      setData(json);
      setLoading(false);
      return { response, json };
    }
  }, []);

  return {
    data,
    total,
    loading,
    error,
    request,
  };
};

export default useFetch;
