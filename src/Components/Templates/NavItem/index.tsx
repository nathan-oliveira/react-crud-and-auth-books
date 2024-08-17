import React, { useEffect, useState } from 'react'
import './navItem.scss'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { MdLogout } from "react-icons/md";
import { useTranslation } from 'react-i18next'

import useMedia from 'Hooks/useMedia'
import { userLogout } from 'Store/user/auth'

import If from 'Components/Templates/Operator/If'
import NavDropItem from './NavDropItem'

import { ReactComponent as Users } from 'Assets/svg/users.svg'
import { SidebarData } from 'Main/SidebarData'
import { Tooltip } from '../Tooltip';

const NavItem = ({ mobile, changeMenuMobile }: any) => {
  const [textProfile, setTextMenu] = useState('');
  const [rowItems, setItems] = React.useState([]);

  const { menu } = useSelector((state: any) => state.menu);
  const { data } = useSelector((state: any) => state.user)
  const isMenuMobile = useMedia('(max-width: 800px)');

  const { t } = useTranslation()
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function logout() {
    dispatch(userLogout())
    navigate('/login')
  }
 
  const setMobile = React.useCallback(() => {
    if (mobile) changeMenuMobile()
  }, [changeMenuMobile, mobile])

  useEffect(() => {
    function rowItems() {
      const arrayItems: any = [];

      SidebarData.forEach((sidebar: any, index: any) => {
        if (!sidebar.subNav) {
          arrayItems.push(
            <Link key={index} to={sidebar.path} onClick={setMobile} className="animeTop navbar__item_height">
              {sidebar.icon}
              <span className={(!menu && !mobile) ? 'offscreen' : 'onscreen'}>{sidebar.title}</span>
            </Link>
          );
        } else {
          arrayItems.push(
            <NavDropItem key={index} mobile={mobile} icon={sidebar.icon} title={sidebar.title} subItems={sidebar.subNav} />
          );
        }
      })

      setItems(arrayItems)
    }

    rowItems();
  }, [menu, mobile, setMobile]);

  useEffect(() => {
    if (menu || isMenuMobile) {
      const [fistName, secondName] = (data.name ?? '').split(' ');
      setTimeout(() => setTextMenu(`${fistName ?? ''} ${secondName ?? ''}`), 240);
    } else {
      setTimeout(() => setTextMenu(''), 140);
    }
  }, [menu, isMenuMobile, data]);

  return (
    <ul className={`${!mobile ? 'navbar__item' : 'navbar__item__mobile'}${menu ? ' navbar__item__open': ''}`}>
      <If test={data}>
        <div className="navbar__item_content">
          { rowItems }
        </div>

        <div className={`${!isMenuMobile ? 'navbar__item_profile_fixed' : 'navbar__item_profile_fixed_mobile'}`}>
          <Link to="/profile" onClick={setMobile}
            className={`animeTop ${(!isMenuMobile) ? (menu ? 'navbar__item_profile_open' : 'navbar__item_profile_close') : 'navbar__item__profile_mobile'}`}>
            <Users />
            <If test={textProfile}>
              <div className={`navbar__item_profile_text ${(!menu && !mobile) ? 'offscreen' : 'onscreen'}`}>{textProfile}</div>
            </If>
          </Link>
          <If test={menu && !mobile}>
            <div onClick={() => logout()} className="navbar__logout">
              <Tooltip message="Sair" position="right">
                <MdLogout />
              </Tooltip>
            </div>
          </If>
          <If test={isMenuMobile}>
            <div className="navbar__logout_mobile" onClick={() => logout()}>
              {t('template.logout')}
              <MdLogout />
            </div>
          </If>
        </div>

        {/* import { LuLogOut } from "react-icons/lu"; */}
        {/* <If test={(data.nivel === 2) || (data.id_nivel === 2)}>
          <Link to="/importdata" onClick={setMobile} className="animeTop">
            <PlusCircle />
            <span className={(!menu && !mobile) ? 'offscreen' : 'onscreen'}>Importação IHC</span>
          </Link>
        </If> */}
      </If>
    </ul>
  )
}

export default NavItem
