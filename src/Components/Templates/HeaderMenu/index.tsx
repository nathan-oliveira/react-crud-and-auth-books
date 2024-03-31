import React from 'react'
import './header-menu.scss'
import { NavLink, useLocation } from 'react-router-dom'

const HeaderMenu = ({ path }: any) => {
  const { pathname } = useLocation();

  return (
    <nav className="animeLeft menu__pages">
      <ul>
        <li>
          <NavLink 
            to={path} 
            end 
            className={({ isActive }) => {
              const linkClasses = [];
              if (isActive) linkClasses.push('menu__item__active');
              return linkClasses.join(" ");
            }}
          >Listagem</NavLink>
        </li>

        {pathname.includes('edit') ? (
          <li>
            <NavLink 
              to={`${path}/edit`}
              className={({ isActive }) => {
                const linkClasses = [];
                if (isActive) linkClasses.push('menu__item__active');
                return linkClasses.join(" ");
              }}  
            >Editar</NavLink>
          </li>
        ) : (
          <li>
            <NavLink 
              to={`${path}/create`} 
              className={({ isActive }) => {
                const linkClasses = [];
                if (isActive) linkClasses.push('menu__item__active');
                return linkClasses.join(" ");
              }}  
            >Cadastrar</NavLink>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default HeaderMenu
