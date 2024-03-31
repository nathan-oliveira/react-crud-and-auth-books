import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { toggleMenu } from 'Store/menu/menuToggle'

import If from 'Components/Templates/Operator/If'

import { ReactComponent as ChevronDown } from 'Assets/svg/chevron-down.svg'

const NavDropItem = ({ mobile, subItems, icon, title }: any) => {
  const { menu } = useSelector((state: any) => state.menu);
  const [open, setOpen] = React.useState(false);
  const [visibleIcons, setVisibleIcons] = React.useState(false);
  const [rowItems, setItems] = React.useState([]);

  React.useEffect(() => {
    if (!menu) setOpen(false);
  }, [menu]);

  React.useEffect(() => {
    function rowItems() {
      const arrayItems: any = [];

      subItems.forEach((data: any, index: any) => {
        arrayItems.push(
          <div className="nav__item_dropdown_list animeTop" key={index + '-' + Math.ceil(Math.random() * 5e4)}>
            <Link to={data.path} className="animeTop navbar__item_height">
              {data.icon}
              <span className={(!menu && !mobile) ? 'offscreen' : 'onscreen'}>{data.title}</span>
            </Link>
          </div>
        );
      })

      setItems(arrayItems)
    }

    rowItems();
  }, [menu, mobile, subItems])

  React.useEffect(() => {
    if (!menu && !mobile) setVisibleIcons(false);
    else setTimeout(() => { setVisibleIcons(true); }, 300)
  }, [menu, mobile]);

  const dispatch = useDispatch();
  async function toggleSidebar() {
    if (!menu) {
      dispatch(toggleMenu(!menu));
      await new Promise(resolve => setTimeout(resolve, 250));
    }

    setOpen(prev => !prev)
  }

  return (
    <div className="nav__item_dropdown animeTop navbar__item_height">
      <div className="nav__item_dropdown_text" onClick={toggleSidebar}>
        {icon}
        <div className="nav__item_dropdown_content">
          <span className={(!menu && !mobile) ? 'offscreen' : 'onscreen'}>{title}</span>
          
          <If test={open && visibleIcons}>
            <ChevronDown className={`chevron-up`} />
          </If>
          <If test={!open && visibleIcons}>
            <ChevronDown className={`chevron-down`}/>
          </If>
        </div>
      </div>

      <If test={open}>
        { rowItems }
      </If>
    </div>
  );
}

export default NavDropItem;
