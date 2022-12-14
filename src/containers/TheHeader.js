import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,
  CLink
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Logo from '../assets/icons/logo.png';
import { setResponsive } from '../store/action/action';
import { useHistory } from 'react-router';
// import { setIsLogin } from '../store/action/action';
// routes config
import routes from '../routes'

const TheHeader = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sidebarShow = useSelector(state => state.cmsReducer.sidebarShow);


  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch(setResponsive(val))
  }
  
  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch(setResponsive(val))
  }

  const logout = () => {
    const token = localStorage.getItem('access_token');
    if (token) {
      localStorage.removeItem('access_token');
      // dispatch(setIsLogin(false));
      history.push('/login');
    }
  }

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <img src={Logo} alt='Techartsy' />
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
        <CHeaderNavItem className="px-3" >
          <CHeaderNavLink to="/dashboard">Dashboard</CHeaderNavLink>
        </CHeaderNavItem>
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter 
          className="border-0 c-subheader-nav m-0 px-0 px-md-3" 
          routes={routes} 
        />
          <div className="d-md-down-none mfe-2 c-subheader-nav">
            <div className="c-subheader-nav-link logout-btn" onClick={logout}>
              Log Out
            </div>
          </div>
      </CSubheader>
    </CHeader>
  )
}

export default TheHeader
