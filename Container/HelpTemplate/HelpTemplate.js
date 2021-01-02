import React, { Component } from 'react';
import { Layout, Menu, Typography } from 'antd';
import style from "../../styles";
import rightArrow from "../../Assets/icons/Side Column Arrow Expand.png";
import leftArrow from "../../Assets/icons/Side Column Arrow compressed.png";
import { NavLink, Route } from "react-router-dom";
import NavHeader from "../../Components/Navbar/Header/Header";
// import PageHeader from "../../Components/PageHeader/PageHeader";
import myTheme from '../../Assets/Theme/Theme';
import { defineMessages } from 'react-intl';
import { updateHistory } from "../../Redux/Actions/UpdateHistory/UpdateHistory";
import { connect } from "react-redux";

const messages = defineMessages({
  'Contents': {
    id: "HelpTemplate.Contents",
    defaultMessage: "Contents",
  },
})
const { color } = myTheme;
const { Header, Content, Sider } = Layout;
const { Text } = Typography;
const { SubMenu } = Menu;
let Index = []

const GenrateMenu = props => {
  const { route, index, collapsed, /*routemoveto,*/ activeOnlyWhenExact } = props;
  return (
    <Route
      path={route.path}
      exact={activeOnlyWhenExact}
      children={({ match }) => {
        return (
          <NavLink
            style={{ color: "#000", width: "100%" }}
            to={route.path}>
            <Menu.Item
              {...props}
              key={index}
              // onClick={() => routemoveto(route, index, match)}
              style={match ? { borderLeft: `8px solid ${color.Orange}`, width: "100%" }
                : { borderLeft: `8px solid #F5F7FA`, width: "100%" }}
            >
              {route.iconName && <img title={route.breadCrums}
                src={require(`../../Assets/icons/SV_ICONS/${route.iconName}.png`)}
                width={30} height={30} alt={route.iconName}
              />}

              {!collapsed && <span style={match ? {
                color: color.Orange, marginLeft: 15,
                fontSize: 15
              } : style.helpSideMenuSpan}>{route.breadCrums.toUpperCase()}</span>}
            </Menu.Item>
          </ NavLink >
        )
      }
      }
    />
  )
}

const CustomMenuItem = props => {
  const { route, index, keysOpen, updateOpenKeys, collapsed, activeOnlyWhenExact, /*routemoveto*/ } = props;
  return (
    collapsed ?
      <Menu mode="inline" style={{ backgroundColor: '#F5F7FA' }}>
        <SubMenu onTitleClick={subMenu => updateOpenKeys(subMenu.key)} style={{ backgroundColor: '#F5F7FA' }} key={index} title={
          <img src={require(`../../Assets/icons/SV_ICONS/${route.iconName}.png`)} width={30} height={30} alt={route.breadCrums} title={route.breadCrums} />
        }>
          {route.children && route.children.map((subMenu, menuIndex) => {
            return (
              <Route
                key={menuIndex}
                path={subMenu.path && subMenu.path.path}
                exact={activeOnlyWhenExact}
                children={({ match }) => {
                  return (
                    <NavLink
                      style={{ color: "#000", width: "100%", backgroundColor: "#F5F7FA" }}
                      to={subMenu && subMenu.path && subMenu.path}
                      title={subMenu.breadCrums && subMenu.breadCrums.breadCrums}>
                      <Menu.Item {...props} key={menuIndex}
                        // onClick={() => routemoveto(route, index, menuIndex, match)}
                        style={match ? { borderLeft: `8px solid ${color.Orange}`, width: "100%", backgroundColor: "#F5F7FA" } : { backgroundColor: "inherit", borderLeft: `8px solid #F5F7FA`, width: "100%" }}
                      >

                        {subMenu.iconName && <img title={subMenu.breadCrums}
                          src={require(`../../Assets/icons/SV_ICONS/${subMenu.iconName}.png`)} style={{ marginLeft: 20, backgroundColor: "#F5F7FA" }} width={30} height={30} alt={subMenu.breadCrums} />}
                        {<span style={match ? {
                          backgroundColor: "#F5F7FA",
                          color: "#446BA8", marginLeft: 15,
                          fontSize: 15
                        } : style.sideMenuSpan}>{subMenu.breadCrums}</span>}


                      </Menu.Item>
                    </ NavLink>
                  )
                }}
              />
            )
          })
          }
        </SubMenu>
      </Menu>
      :
      <Menu mode="inline" style={{ backgroundColor: 'inherit', color: color.Blue }} openKeys={keysOpen}>
        <SubMenu onTitleClick={subMenu => updateOpenKeys(subMenu.key)} style={{ backgroundColor: 'inherit' }} key={index} title={
          <span>
            <img
              src={require(`../../Assets/icons/SV_ICONS/${route.iconName}.png`)}
              width={30} height={30} alt={route.breadCrums} title={route.breadCrums} />
            <span style={{ color: color.Blue, marginLeft: 18, fontSize: 15 }}>{route.breadCrums}</span>
          </span>
        }>

          {route.children.map((subMenu, menuIndex) => {
            return (
              <Route
                key={menuIndex}
                path={subMenu.path}
                exact={activeOnlyWhenExact}
                children={({ match }) => {
                  return (
                    <NavLink style={{ color: color.Blue }} to={subMenu.path} title={subMenu.breadCrums}>
                      <Menu.Item {...props} key={menuIndex}
                        // onClick={() => routemoveto(route, index, menuIndex, match)}
                        style={match ? { borderLeft: `8px solid ${color.Orange}`, backgroundColor: 'inherit' } : { borderLeft: `8px solid #F5F7FA`, backgroundColor: 'inherit' }}
                      >
                        {subMenu.iconName &&
                          <img title={subMenu.breadCrums} src={require(`../../Assets/icons/SV_ICONS/${subMenu.iconName}.png`)}
                            style={{ marginLeft: 20 }} width={30} height={30} alt={route.iconName}
                          />}
                        <span style={match ? {
                          color: color.Orange, marginLeft: 15,
                          fontSize: 15
                        } : style.sideMenuSpan}>{subMenu.breadCrums}</span>
                      </Menu.Item>
                    </ NavLink>
                  )
                }}
              />
            )
          })
          }
        </SubMenu>
      </Menu>
  )
}


class HelpTemplate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rootRoutes: props.routes.slice(0, 2),
      activePageIndex: -1,
      aboutUsDrawer: false,
      menuDrawer: false,
      helpDrawer: false,
      profileDrawer: false,
      openKeys: props.openKeys
    }
    const { rootRoutes, openKeys } = this.state
    const { routes } = this.props
    this.props.routes.forEach((route, routeIndex) => {
      if (route.children) {
        route.children.forEach((subMenu, subMenuIndex) => {
          if (subMenu.path === window.location.pathname) {
            subMenu.active = true
            rootRoutes.push(routes[routeIndex])
            Index.push(routeIndex)
            openKeys && !openKeys.includes(routeIndex.toString()) && openKeys.pop() && openKeys.push(routeIndex.toString())
            this.setState({ activePageIndex: subMenuIndex, activeRouteIndex: routeIndex, rootRoutes })
          }
        })
      }
      if (route.path === window.location.pathname) {
        route.active = true
        rootRoutes.push(routes[routeIndex])
        Index.push(routeIndex)
        openKeys && !openKeys.includes(routeIndex.toString()) && openKeys.pop() && openKeys.push(routeIndex.toString())
        this.setState({ activeRouteIndex: routeIndex, activePageIndex: -1, rootRoutes })
      }
    })
  }

  updateOpenKeys = key => {
    const { openKeys } = this.state;
    if (openKeys.includes(key)) {
      openKeys.splice(openKeys.indexOf(key), 1)
    } else {

      openKeys.push(key)
    }
    this.setState({
      openKeys
    })
  };
  componentDidUpdate(prevProps, prevState) {
    const { rootRoutes, openKeys } = this.state
    const { routes } = this.props
    routes.forEach((route, routeIndex) => {
      if (route.children) {
        route.children.forEach((subMenu, subMenuIndex) => {
          if (subMenu.path === window.location.pathname) {
            if ((prevState.activePageIndex !== subMenuIndex) || (prevState.activeRouteIndex !== routeIndex)) {
              rootRoutes.pop()
              rootRoutes.push(routes[routeIndex])
              openKeys && !openKeys.includes(routeIndex.toString()) && openKeys.pop() && openKeys.push(routeIndex.toString())
              this.setState({ activePageIndex: subMenuIndex, activeRouteIndex: routeIndex, rootRoutes })
            }
            subMenu.active = true
            route.active = true
          }
        })
      }
      if (route.path === window.location.pathname) {
        route.active = true
        if (prevState.activeRouteIndex !== routeIndex) {
          rootRoutes.pop()
          rootRoutes.push(routes[routeIndex])
          openKeys && !openKeys.includes(routeIndex.toString()) && openKeys.pop() && openKeys.push(routeIndex.toString())
          this.setState({ activeRouteIndex: routeIndex, activePageIndex: -1, rootRoutes })
        }
      }
    })
  }

  // routemoveto = (route, index, menuIndex, match) => {
  //   this.setState({
  //     subMenu: false
  //   })
  // };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  collapseSideMenu = () => {
    const toggleCollapsed = !this.state.collapsed
    this.setState({
      collapsed: toggleCollapsed
    })
  };

  openDrawer = drawer => {
    const { prevDrawer } = this.state
    const toggleDrawer = !(this.state[drawer])
    this.setState({
      [drawer]: toggleDrawer,
      [prevDrawer]: prevDrawer !== drawer ? false : toggleDrawer,
      prevDrawer: drawer
    })
  }

  closeDrawer = drawer => {
    this.setState({
      [drawer]: false
    })
  }

  navigateToLogin = () => {
    this.props.updateHistory(this.props.historyProp, "/")
  }

  render() {
    const { routes, iconName, heading, formatMessage, historyProp } = this.props
    const { collapsed, activeRouteIndex, activePageIndex, rootRoutes, aboutUsDrawer, changePassDrawer, helpDrawer,
      menuDrawer, profileDrawer, notificationDrawer, openKeys } = this.state

    return (
      <div style={{ ...style.page }}>
        <Layout style={{ ...style.page }}>
          <Header style={{ ...style.header }}>
            <NavHeader navigateToLogin={() => this.navigateToLogin()}
              iconName={(this.props.whatsNewScreen || this.props.helpScreen) ? (activePageIndex === -1 && activeRouteIndex) ? routes[activeRouteIndex].iconName : activeRouteIndex && routes[activeRouteIndex] && routes[activeRouteIndex].children[activePageIndex].iconName : iconName}
              title={this.props.whatsNewScreen ? (activePageIndex === -1 && activeRouteIndex) ? routes[activeRouteIndex].breadCrums : activeRouteIndex
                && routes[activeRouteIndex] && routes[activeRouteIndex].children[activePageIndex].breadCrums : heading}
              routes={rootRoutes}
              formatMessage={formatMessage}
              historyProp={historyProp} gridViewEmails
              aboutUsDrawer={aboutUsDrawer}
              changePassDrawer={changePassDrawer}
              helpDrawer={helpDrawer}
              profileDrawer={profileDrawer}
              notificationDrawer={notificationDrawer}
              menuDrawer={menuDrawer}
              closeDrawer={drawer => this.closeDrawer(drawer)}
              openDrawer={drawer => this.openDrawer(drawer)}
              imageFlag={this.props.imageFlag}

            />
          </Header>
          <Layout style={{ backgroundColor: "#fff", overflowY: "hidden" }} >
            <Sider trigger={null} style={{
              backgroundColor: '#F5F7FA',
              // MozBoxShadow: "4px 4px 8px -3px #777",
              // WebkitBoxShadow: "`4px 4px 8px -3px #777",
              // boxShadow: "4px 4px 8px -3px #777 ",
              overflowX: 'inherit'
              // overflowY: 'scroll',
            }} width={!collapsed ? 260 : 0}
              collapsible breakpoint="lg"
              collapsed={collapsed}
              onCollapse={this.onCollapse}>
              <div style={{ ...style.sideMenuHeight }}>
                <div style={collapsed ? style.collapsedHelpSideMenuIcon : style.helpSideMenuIcon} onClick={() => this.collapseSideMenu()} >
                  {/* {collapsed ? <img src={rightArrow} alt={"button"} title="Open Menu" width={20} height={20} onClick={() => this.collapseSideMenu()} /> :
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", padding: "0px 18px" }}>
                      <Text style={{ ...style.pageHeaderSideBarContent }}>{formatMessage(messages["Contents"])}</Text>
                      <img title="Close Menu" src={leftArrow} alt={"button"} width={20} height={20} />
                    </div>} */}
                  {collapsed ?
                    <div onClick={() => this.collapseSideMenu()} style={{ cursor: "pointer", width: "100%", display: "flex", justifyContent: "center" }}>
                      <img src={rightArrow} alt={"button"} title="Open Menu" width={20} height={20} />
                    </div>
                    :
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '95%', alignItems: "center" }}>
                      <Text style={{ ...style.pageHeaderSideBarContent }}>{formatMessage(messages["Contents"])}</Text>
                      <img title="Close Menu" src={leftArrow} style={{ cursor: "pointer" }} alt={"button"} width={20} height={20} onClick={() => this.collapseSideMenu()} />
                    </div>}
                </div>
                <Menu style={collapsed ? style.collapsedSideMenu : style.sideMenu} theme="light"
                  mode={collapsed ? "horizontal" : "inline"}
                >
                  {routes.map((route, index) =>
                    (route.iconName !== undefined && route.children && route.children.length !== 0) ?
                      (<CustomMenuItem keysOpen={openKeys} updateOpenKeys={key => this.updateOpenKeys(key)} route={route} key={index} index={index} collapsed={collapsed ? 1 : 0}
                      // routemoveto={() => this.routemoveto()} 
                      />)
                      :
                      (route.iconName !== undefined && <GenrateMenu key={index} route={route} index={index} collapsed={collapsed ? 1 : 0}
                      // routemoveto={() => this.routemoveto()} 
                      />))}
                </Menu>
              </div>
            </Sider>
            <Content style={{ backgroundColor: "#fff", overflow: 'auto', height: "92vh" }} >

              {/* <div style={{
                position: "fixed",
                right: 0,
                left: `${collapsed ? "80px" : "260px"}`,
                MozBoxShadow: "2px 2px 8px -3px #777",
                WebkitBoxShadow: "2px 2px 8px -3px #777",
                boxShadow: "2px 2px 8px -3px #777",
                zIndex: 2
              }} >
                <PageHeader formatMessage={formatMessage} helpScreen={this.props.helpScreen} whatsNewScreen={this.props.whatsNewScreen}
                  iconName={(this.props.whatsNewScreen || this.props.helpScreen) ? (activePageIndex === -1 && activeRouteIndex) ? routes[activeRouteIndex].iconName : activeRouteIndex && routes[activeRouteIndex] && routes[activeRouteIndex].children[activePageIndex].iconName : iconName}
                  title={this.props.whatsNewScreen ? (activePageIndex === -1 && activeRouteIndex) ? routes[activeRouteIndex].breadCrums : activeRouteIndex
                    && routes[activeRouteIndex] && routes[activeRouteIndex].children[activePageIndex].breadCrums : heading}
                  routes={rootRoutes}
                />  

              </div> */}
              <div style={{ marginTop: "0px" }}>
                {
                  routes.map((route, index) => {
                    return (<Route
                      key={index}
                      path={route.path}
                      component={route.main}
                      children={route.children && route.children.map((route, index) => {
                        return (
                          <Route
                            key={index}
                            path={route.path}
                            component={route.main}
                            children={route.children && route.children.map((route, index) => {
                              return (
                                <Route
                                  key={index}
                                  path={route.path}
                                  component={route.main}
                                  children={route.children && route.children.map((route, index) => {
                                    return (
                                      <Route
                                        key={index}
                                        path={route.path}
                                        component={route.main} />
                                    )
                                  })} />
                              )
                            })}
                          />
                        )
                      }
                      )}
                    />)

                  })
                }
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    )
  }
};

const mapDispatchToProps = dispatch => {
  return {
    updateHistory: (history, pathname) => dispatch(updateHistory(history, pathname))

  }
}


export default connect(null, mapDispatchToProps)(HelpTemplate);

