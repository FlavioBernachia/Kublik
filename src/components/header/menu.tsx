import React from "react"


interface MenuProps {
    openMenu: boolean;
    setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
  }
export const Menu : React.FC<MenuProps> = ({ openMenu, setOpenMenu }) => {
    return(
<div className={`menuContent ${openMenu ? 'active' : ''}`}>
      <ul>
        <li>
          <a href="#home" onClick={() => setOpenMenu(false)}>Home</a>
        </li>
        <li>
          <a href="#portfolio" onClick={() => setOpenMenu(false)}>Portfolio</a>
        </li>
        <li>
          <a href="#contact" onClick={() => setOpenMenu(false)}>Contact</a>
        </li>
      </ul>
    </div>
    )
}