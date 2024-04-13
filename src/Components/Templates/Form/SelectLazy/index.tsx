import React from 'react'
import './select-lazy.scss'
import '../Input/input.scss'
import { useSelector } from 'react-redux';

import useFetch from 'Hooks/useFetch';
import If from 'Components/Templates/Operator/If';

import { FaCaretDown } from "react-icons/fa6";
import { FaCaretUp } from "react-icons/fa6";
import { CgClose } from "react-icons/cg";
import { IoCloseCircleOutline } from "react-icons/io5";

const SelectLazy = ({ GET, orderBy, label, name, error, onBlur, prop, setValue, valueSelected }: any) => {
  const [items, setItems] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(6);
  const [timeoutSearch, setTimeoutSearch] = React.useState(null);
  const [search, setSearch] = React.useState('');

  const [expanded, setExpanded] = React.useState(false);
  const [valueEye, setValueEye] = React.useState('');

  const { token } = useSelector((state: any) => state.user.data)
  const { 
    total: totalRequest, 
    data: dataRequest, 
    loading: loadingRequest, 
    error: errorRequest, 
    request,
  }: any = useFetch()

  function showExpanded() {
    setExpanded((ex) => !ex);
  }

  function mathRoundValue(value: number) {
    if (value >= 0.5) {
      return Math.ceil(value);
    } else {
      return Math.floor(value);
    }
  }

  function emitValue(record: any) {
    setValue(record[prop.key]); 
    setValueEye(record[prop.title])
    setExpanded(false);
  }

  function clearValue() {
    setValue(null); 
    setValueEye('')
  }

  const debounceSearch = React.useCallback((value: any) => {
    if (timeoutSearch) clearTimeout(timeoutSearch);
    setPage(1)
    setItems([])

    const searchValue = (value !== '' && value !== null) ? value : '';
    if (!searchValue) setSearch('');
    setSearch(searchValue);

    const timeout: any = setTimeout(() => {
      setItems([])
      setPage(p => p + 1);
      loadItems(limit, page, searchValue);
    }, 500);

    setTimeoutSearch(timeout);
  }, [search]);

  const bottomVisible = React.useCallback(() => {
    const div: any = document.getElementById('content_select_lazy');
    const visible = div.clientHeight;
    const pageHeight = div.scrollHeight;
    return visible + mathRoundValue(div.scrollTop) >= pageHeight;
  }, []);

  const loadItems = React.useCallback((limit: number, page: number, searchValue = null) => {
    const { url, options } = GET(token);
    const params: any = {
      page: page.toString(),
      limit: limit.toString(),
      orderBy: JSON.stringify(orderBy),
    };
    if (searchValue !== '' && searchValue !== null) {
      params.search = searchValue;
    }

    request(`${url}?${new URLSearchParams(params).toString()}`, options);
  }, [GET, request, token, orderBy, search]);

  const addItems = React.useCallback(() => {
    const isBottomVisible = bottomVisible();
    if (!isBottomVisible) return;
    if (items.length >= totalRequest) return;
    setPage((value) => value + 1);
    loadItems(limit, page, search as any);
  }, [bottomVisible, items.length, totalRequest, loadItems, limit, page, search]);

  React.useEffect(() => {
    if (expanded) {
      setPage((value) => value + 1);
      loadItems(limit, page, search as any);
    } else {
      setPage(1)
      setItems([]);
      setSearch('');
    }
  }, [expanded]);

  React.useEffect(() => {
    if (expanded) {
      const div: any = document.getElementById('content_select_lazy');
      div.addEventListener('scroll', addItems);
      return () => div.removeEventListener('scroll', addItems);
    }
  }, [items, totalRequest, addItems]);

  React.useEffect(() => {
    function interactionItems() {
      if (!dataRequest) return;
      if (items.length >= totalRequest) return;
      const newItems = items.concat(dataRequest)
      setItems(newItems);
    }

    if (expanded) interactionItems();
  }, [dataRequest]);

  React.useEffect(() => {
    if (valueSelected) emitValue(valueSelected)
  }, [valueSelected])

  return (
    <div className={`select__lazy${expanded ? ' select__lazy_shadow' : ''}`}>
      <div className="input-wrapper input-wrapper__select">
        <input 
          type="text" 
          className={`input input-text__select input-text${error ? ' input-text-error' : ''}${expanded ? ' input-text__select_shadow' : ''}`}
          id={name} 
          name={name}
          onChange={(e) => debounceSearch(e.target.value)}
          onClick={() => {
            if (!expanded) showExpanded()
          }}
          autoComplete="off" 
          onBlur={onBlur}
          value={!expanded ? valueEye : search}
          placeholder={!expanded ? ' ': 'Pesquisar'}
          readOnly={!expanded}
        />

        <If test={!expanded}>
          <label
            htmlFor={name} 
            className={`input-label${error ? ' input-label-error' : ''}`}
          >{label}</label>
        </If>

        <If test={!expanded}>
          <FaCaretDown onClick={() => showExpanded()}/>
        </If>
        <If test={expanded}>
          <FaCaretUp onClick={() => showExpanded()}/>
        </If>

        <If test={valueEye !== '' && valueEye !== null && !expanded}>
          <IoCloseCircleOutline onClick={() => clearValue()} />
        </If>
      </div>

      <If test={expanded}>
        <div className="content_select_lazy animeTop" id="content_select_lazy">
          {(items.length > 0) && (
            items.map((record: any) => (
              <div 
                className="content_select_lazy_item" 
                key={record[prop.key]} onClick={() => emitValue(record)}
              >
                {record[prop.title]}
              </div>
            ))
          )}

          {(items.length === 0) && (
            <div className="content_select_lazy_item">Nenhum registro encontrado.</div>
          )}
        </div>
      </If>
    </div>
  )
}

export default SelectLazy
