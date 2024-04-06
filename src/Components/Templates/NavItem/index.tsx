import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './navItem.scss'

import useMedia from 'Hooks/useMedia'

import If from 'Components/Templates/Operator/If'

import NavDropItem from './NavDropItem'

import { ReactComponent as Users } from 'Assets/svg/users.svg'
import { SidebarData } from 'Main/SidebarData'

const NavItem = ({ mobile, changeMenuMobile }: any) => {
  const [textProfile, setTextMenu] = useState('');
  const [rowItems, setItems] = React.useState([]);

  const { menu } = useSelector((state: any) => state.menu);
  const { data } = useSelector((state: any) => state.user)
  const isMenuMobile = useMedia('(max-width: 800px)');
 
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
    if (menu || isMenuMobile) 
      setTimeout(() => setTextMenu('Meus dados'), 240);
    else
      setTimeout(() => setTextMenu(''), 140);
  }, [menu, isMenuMobile]);

  // mobile
  return (
    <ul className={`${!mobile ? 'navbar__item' : 'navbar__item__mobile'}${menu ? ' navbar__item__open': ''}`}>
      <If test={data}>
        <div className="navbar__item_content">
          { rowItems }
        </div>
        
        <Link to="/profile" onClick={setMobile} 
          className={`animeTop ${(!isMenuMobile) ? (menu ? 'navbar__item_profile_open' : 'navbar__item_profile_close') : 'navbar__item__profile_mobile'}`}>
          <Users />
          <If test={textProfile}>
            <div className={`navbar__item_profile_text ${(!menu && !mobile) ? 'offscreen' : 'onscreen'}`}>{textProfile}</div>
          </If>
        </Link>

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
