import React, { Component } from 'react';
import style from "../../styles"
import { Menu } from "antd";
import rightArrow from "../../Assets/icons/Side Column Arrow Expand.png";
import leftArrow from "../../Assets/icons/Side Column Arrow compressed.png";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import myTheme from '../../Assets/Theme/Theme';
const { color } = myTheme;
class SideMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  genrateMenu = (route, index) => {
    const { collapsed, routemoveto, activeIndex } = this.props
    return (
      <Menu.Item key={index} onClick={() => routemoveto(route, index)} style={activeIndex === index && { borderLeft: `4px solid ${color.Orange}` }}>
        <NavLink style={{...style.blackColor}} to={route.path}>
          <img src={require(`../../Assets/icons/SV_ICONS/${route.iconName}.png`)} width={30} height={30} alt={route.iconName} />
          {!collapsed && <span style={{...style.sideMenuSpan}}>{route.breadCrums}</span>}
        </NavLink>
      </Menu.Item>
    )
  }
  render() {
    const { collapsed, collapseSideMenu, routes } = this.props
    return (
      <Router>
        <div style={{...style.sideMenuHeight}}>
          <div style={{...style.sideMenuIcon}} onClick={() => collapseSideMenu()} >
            {collapsed ? <img title="Open Menu" src={rightArrow} alt={"button"} width={35} height={35} /> : <img title="Close Menu" src={leftArrow} alt={"button"} width={35} height={35} />}
          </div>
          <Menu style={{...style.sideMenu}} theme="light" defaultSelectedKeys={['0']} mode="inline">
            {routes.forEach((route, index) => route.iconName !== undefined && this.genrateMenu(route, index))}

          </Menu>
        </div>
      </Router>
    )
  }
};

export default SideMenu
