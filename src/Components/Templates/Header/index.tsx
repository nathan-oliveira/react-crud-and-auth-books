import React, { useRef } from 'react'
import './header.scss'

import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// import { userLogout } from 'Store/user/userPost'
import { toggleSideBar } from 'Store/menu/menuToggle'

import useMedia from 'Hooks/useMedia'
import NavItem from 'Components/Templates/NavItem'
import If from 'Components/Templates/Operator/If'

import { ReactComponent as SearchIcon } from 'Assets/svg/search.svg'
import { SidebarData } from 'Main/SidebarData'
// import Dropdown from 'Components/Templates/DropdownItem'

const Header = () => {
  const mobile = useMedia('(max-width: 800px)');
  const [mobileMenu, setMobileMenu] = React.useState(false);
  const [headerInfo, setHeaderInfo] = React.useState('');
  
  const { sideBar } = useSelector((state: any) => state.menu);
  const refInputSearch: any = useRef(null);
  // const { data } = useSelector((state: any) => state.user)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  React.useEffect(() => {
    const currentPage = SidebarData.find((side: any) => side.path === pathname);
    if (currentPage) setHeaderInfo(currentPage.title)
    else setHeaderInfo('');
  }, [pathname])

  const changeMenuMobile = () => setMobileMenu(!mobileMenu);
  const changeMenuSideBar = () => dispatch(toggleSideBar(!sideBar));

  function logout() {
    // dispatch(userLogout())
    navigate('/login')
  }
  
  function handleSearchClick() {
    refInputSearch.current.focus();
  };

  function handleChangeSearch(event: any) {
    event.preventDefault();
    if(event.target.value) {
      navigate(`${pathname}?q=${encodeURIComponent(event.target.value)}`, { replace: true })
    } else {
      navigate(pathname, { replace: true })
    }
  }

  return (
    <React.Fragment>
      <header className="nav navbar animeTop">
        <div className="navbar_header">
          <If test={mobile}>
            <button
              className={`navbar__icon ${mobileMenu ? 'navbar__icon___active' : ''}`}
              onClick={changeMenuMobile}></button>
          </If>

          <If test={!mobile}>
            <button onClick={changeMenuSideBar} className="navbar__icon"></button>
            <span className="navbar_header_info">{headerInfo}</span>
          </If>
        </div>
        <ul className="navbar__items">
          <li className="navbar__items_search">
            <input type="text"
              ref={refInputSearch} 
              id="search" 
              name="search"
              className="navbar__items_search_input"  
              placeholder="Pesquisar"
              autoComplete="off"
              onChange={handleChangeSearch}
            />
            <SearchIcon className="navbar__items_search_icon" onClick={handleSearchClick} />
          </li>

          {/* <li> */}
            {/* {data ? data.name.split(' ')[0] : "Carregando..."} */}
            {/* <Dropdown title="Carregando...">
              <ul>
                <li onClick={() => navigate("/profile")}>Meu Perfil</li>
                <li onClick={() => navigate("/alterar-senha")}>Alterar Senha</li>
                <li onClick={logout}>Sair</li>
              </ul>
            </Dropdown> */}
          {/* </li> */}
        </ul>
      </header>

      <If test={mobile}>
        <nav className={`navbar__mobile ${mobileMenu ? 'navbar__mobile__active' : 'navbar__mobile__disabled'}`}>
          <NavItem mobile={true} changeMenuMobile={changeMenuMobile} />
        </nav>
      </If>
    </React.Fragment>
  );
};

export default Header
