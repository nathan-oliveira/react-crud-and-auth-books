import React from 'react'
import './sidenav.scss'
import { useSelector } from 'react-redux'

import useMedia from 'Hooks/useMedia'

import NavItem from 'Components/Templates/NavItem'
import Logo from 'Components/Templates/Logo'

const SideNav = () => {
  const mobile = useMedia('(max-width: 800px)');
  const { menu, sideBar } = useSelector((state: any) => state.menu)

  if (mobile) return null;
  return (
    <aside className={`${!sideBar ? 'sidenav__hide ' : 'animeLeft'} ${!menu ? 'sidenav__close' : 'sidenav'}`}>
      <nav className="sidenav__content">
        <Logo />
        <NavItem />
      </nav>
    </aside>
  )
}

export default SideNav;
