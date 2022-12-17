import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react'
import Logo from '../assets/images/logo.png';
// import { setResponsive } from '../store/action/action';
import { useHistory } from 'react-router';
import CIcon from '@coreui/icons-react'
// import { setIsLogin } from '../store/action/action';

// sidebar nav config
import navigation from './_nav'

const TheSidebar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const show = useSelector(state => state.cmsReducer.sidebarShow);

  const logout = () => {
    const token = localStorage.getItem('access_token');
    if (token) {
      localStorage.removeItem('access_token');
      // dispatch(setIsLogin(false));
      history.push('/login');
    }
  }

  return (
    <CSidebar
      show={show}
      // onShowChange={(val) => dispatch(setResponsive(val))}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <img src={Logo} style={{width: '50%'}} alt='logo' />
        <CIcon
          className="c-sidebar-brand-minimized"
          name="sygnet"
          height={35}
        />
      </CSidebarBrand>
      <CSidebarNav>

        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
        <p className='logout' onClick={logout}>
          Logout
        </p>
        <CCreateElement
          components='Log out'
        />
      </CSidebarNav>
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
