import React from 'react'
import './select-lazy.scss'
import { useSelector } from 'react-redux';

import useFetch from 'Hooks/useFetch';

const SelectLazy = ({ GET, orderBy }: any) => {
  const [total, setTotal] = React.useState(0);
  const [items, setItems] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(6);
  const [timeoutSearch, setTimeoutSearch] = React.useState(null);
  const [search, setSearch] = React.useState(null);

  const { token } = useSelector((state: any) => state.user.data)
  const { 
    total: totalRequest, 
    data: dataRequest, 
    loading: loadingRequest, 
    error: errorRequest, 
    request,
  }: any = useFetch()

  function mathRoundValue(value: number) {
    if (value >= 0.5) {
      return Math.ceil(value);
    } else {
      return Math.floor(value);
    }
  }

  const bottomVisible = React.useCallback(() => {
    const div: any = document.getElementById('content_select_lazy');
    const visible = div.clientHeight;
    const pageHeight = div.scrollHeight;
    return visible + mathRoundValue(div.scrollTop) >= pageHeight;
  }, []);

  const loadItems = React.useCallback((limit: number, page: number, search = null) => {
    const { url, options } = GET(token);
    const params: any = {
      page: page.toString(),
      limit: limit.toString(),
      orderBy: JSON.stringify(orderBy),
    };
    request(`${url}?${new URLSearchParams(params).toString()}`, options);
  }, [GET, request, token, orderBy]);

  const addItems = React.useCallback(() => {
    const isBottomVisible = bottomVisible();
    if (!isBottomVisible) return;
    if (items.length >= totalRequest) return;
    setPage((value) => value + 1);
    loadItems(limit, page);
  }, [bottomVisible, items.length, totalRequest, loadItems, limit, page]);

  React.useEffect(() => {
    function initialize() {
      setPage((value) => value + 1);
      loadItems(limit, page);
    }

    initialize()
  }, []);

  React.useEffect(() => {
    const div: any = document.getElementById('content_select_lazy');
    div.addEventListener('scroll', addItems);
    return () => div.removeEventListener('scroll', addItems);
  }, [items, totalRequest, addItems]);

  React.useEffect(() => {
    function interactionItems() {
      if (!dataRequest) return;
      if (items.length >= totalRequest) return;
      const newItems = items.concat(dataRequest)
      setItems(newItems);
    }

    interactionItems();
  }, [dataRequest]);

  return (
    <div className="content_select_lazy" id="content_select_lazy">
      {items.length} {totalRequest}
      {(items.length > 0) && (
        items.map((record: any) => (
          <div key={record.id}>{record.id}</div>
        ))
      )}
    </div>
  )
}

export default SelectLazy
