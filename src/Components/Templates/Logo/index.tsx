import React, { useEffect, useState } from 'react'
import './logo.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import useMedia from 'Hooks/useMedia'
import { toggleMenu } from 'Store/menu/menuToggle'

import { ReactComponent as ChevronDown } from 'Assets/svg/chevron-down.svg'
import If from '../Operator/If'

const Logo = () => {
  const mobile = useMedia('(max-width: 800px)');
  const [textMenu, setTextMenu] = useState('');
  const { menu } = useSelector((state: any) => state.menu);

  const dispatch = useDispatch();
  const changeMenuSide = () => dispatch(toggleMenu(!menu));

  useEffect(() => {
    if (menu) 
      setTimeout(() => setTextMenu('APP Test'), 200);
    else
      setTimeout(() => setTextMenu(''), 140);
  }, [menu]);

  return (
    <ul className={`logo ${!menu ? `logo_close_${mobile ? 'mobile' : 'web'}` : `logo_open_${mobile ? 'mobile' : 'web'}`}`}>
      <li>
        <If test={menu}>
          <Link to="/">
            <span className={!menu ? 'offscreen' : 'onscreen'}>{textMenu}</span> 
          </Link>
        </If>
        <If test={!menu}>
          <ChevronDown onClick={changeMenuSide} className="svg_menu_screen" />
        </If>
        <If test={menu}>
          <ChevronDown onClick={changeMenuSide} className="svg_menu_offscreen" />
        </If>
      </li>
    </ul>
  )
}

export default Logo;