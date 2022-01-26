import React, { useState } from 'react';

import menuList from './DrawerItemList.json';
import classes from '../../styles/components/drawer.module.scss';

const drawer: React.FC = () => {
  const [mouseOverCss, setMouseOverCss] = useState('bars');
  const [isDrawerOpen, setDrawerOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState(0);

  const changeMenu = (index: number) => {
    setSelectedMenu(index);
  };
  return (
    <div className={`${classes.container} ${isDrawerOpen || classes.drawerClose}`}>
      <div className={classes.navDrawerMenu}>
        <button
          type="button"
          className={classes.barsIconButton}
          onClick={() => setDrawerOpen(isDrawerOpen === false)}
          onMouseEnter={() => setMouseOverCss(`angle double ${isDrawerOpen ? 'left' : 'right'}`)}
          onMouseLeave={() => setMouseOverCss('bars')}
        >
          <i className={`${mouseOverCss} icon big`} />
        </button>
      </div>
      {menuList.map((menu, index) => (
        <button
          type="button"
          className={`${classes.navItem} ${selectedMenu === index && classes.selected}`}
          key={menu.menuId}
          onClick={() => changeMenu(index)}
        >
          <i className={`${classes.navItemIcon} icon ${menu.icon} large`} />
          {isDrawerOpen === true && <p className={classes.navItemLabel}>{menu.menuName}</p>}
        </button>
      ))}
    </div>
  );
};

export default drawer;
