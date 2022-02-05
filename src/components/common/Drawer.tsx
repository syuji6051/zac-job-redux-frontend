import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import menuList from '../../constants/DrawerItemList.json';
import classes from '../../styles/components/drawer.module.scss';

const drawer: React.FC = () => {
  const [mouseOverCss, setMouseOverCss] = React.useState('bars');
  const [isDrawerOpen, setDrawerOpen] = React.useState(true);
  const [selectedMenu, setSelectedMenu] = React.useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    (() => {
      const index = menuList.findIndex((menu) => menu.path === location.pathname);
      if (index !== -1) changeMenu(index);
    })();
  }, []);

  const changeMenu = (index: number) => {
    setSelectedMenu(index);
    navigate(menuList[index].path);
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
