import React, { Component } from "react";
import { Layout, Menu, message } from "antd";
import style from "../../styles";
import rightArrow from "../../Assets/icons/Side Column Arrow Expand.png";
import leftArrow from "../../Assets/icons/Side Column Arrow compressed.png";
import { NavLink, Route } from "react-router-dom";
import NavHeader from "../../Components/Navbar/Header/Header";
import PageHeader from "../../Components/PageHeader/PageHeader";
import myTheme from "../../Assets/Theme/Theme";
import { connect } from "react-redux";
import { updateHistory } from "../../Redux/Actions/UpdateHistory/UpdateHistory";
// import AboutUsDrawer from "../../Components/Modal/AboutUsDrawer";
// import ChangePasswordDrawer from "../../Components/Modal/ChangePasswordDrawer"
// import HelpDrawer from "../../Components/Modal/HelpSideDrawer"
// import QuickDrawer from "../../Components/Modal/QuickNavigationDrawer";
// import ProfileDrawer from "../../Components/Modal/ProfileDrawer"
// import LanguageSwitcher from '../../Components/LanguageSwitcher/languageSwitcher';
// import NotificationDrawer from "../../Components/Modal/NotificationDrawer";

let Index = [];
let actionRowArray = []
const { color } = myTheme;
const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

const GenrateMenu = props => {
  const { route, index, collapsed, /*routemoveto,*/ activeOnlyWhenExact } = props;
  return (
    <Route
      path={route.path}
      exact={activeOnlyWhenExact}
      children={({ match }) => {
        return (
          <NavLink
            style={{ color: "#000", width: "100%", backgroundColor: "inherit" }}
            to={route.path}
            title={route.breadCrums}
          >
            <div
            // onClick={() => routemoveto()}
            >
              <Menu.Item
                {...props}
                key={index}
                style={
                  match
                    ? {
                      borderLeft: `8px solid ${color.Orange}`,
                      width: "100%",
                      backgroundColor: "#F5F7FA"
                    }
                    : {
                      borderLeft: `8px solid #F5F7FA`,
                      backgroundColor: "#F5F7FA",
                      width: "100%"
                    }
                }
              >
                {route.iconName && (
                  <img
                    src={require(`../../Assets/icons/SV_ICONS/${route.iconName}.png`)}
                    width={30}
                    height={30}
                    alt={route.breadCrums}
                    title={route.breadCrums}
                  />
                )}
                {!collapsed && (
                  <span
                    style={
                      match
                        ? {
                          backgroundColor: "inherit",
                          color: "#F05A28",
                          marginLeft: 15,
                          fontSize: 15
                        }
                        : { ...style.sideMenuSpan, color: '#446BA8' }
                    }
                  >
                    {route.breadCrums}
                  </span>
                )}
              </Menu.Item>
            </div>
          </NavLink>
        );
      }}
    />
  );
};

const CustomMenuItem = props => {
  const {
    route,
    index,
    keysOpen,
    updateOpenKeys,
    collapsed,
    activeOnlyWhenExact,
    // routemoveto
  } = props;
  return collapsed ? (
    <Menu mode="inline" style={{ backgroundColor: "#F5F7FA" }}>
      <SubMenu
        onTitleClick={subMenu => updateOpenKeys(subMenu.key)}
        style={{ backgroundColor: "#F5F7FA" }}
        key={index}
        title={
          <img
            src={require(`../../Assets/icons/SV_ICONS/${route.iconName}.png`)}
            width={30}
            height={30}
            alt={route.breadCrums}
            title={route.breadCrums}
          />
        }
      >
        {route.children.map((subMenu, menuIndex) => {
          return (
            <Route
              key={menuIndex}
              path={subMenu.path}
              exact={activeOnlyWhenExact}
              children={({ match }) => {
                return (
                  <NavLink
                    style={{
                      color: "#000",
                      width: "100%",
                      backgroundColor: "#F5F7FA"
                    }}
                    to={subMenu.path}
                    title={subMenu.breadCrums}
                  >
                    <div
                    // onClick={() => routemoveto()}
                    >
                      <Menu.Item
                        {...props}
                        key={menuIndex}
                        style={
                          match
                            ? {
                              borderLeft: `8px solid ${color.Orange}`,
                              width: "100%",
                              backgroundColor: "#F5F7FA"
                            }
                            : {
                              backgroundColor: "inherit",
                              borderLeft: `8px solid #F5F7FA`,
                              width: "100%"
                            }
                        }
                      >
                        {subMenu.iconName && (
                          <img
                            title={subMenu.breadCrums}
                            src={require(`../../Assets/icons/SV_ICONS/${subMenu.iconName}.png`)}
                            style={{
                              marginLeft: 20,
                              backgroundColor: "#F5F7FA"
                            }}
                            width={30}
                            height={30}
                            alt={subMenu.breadCrums}
                          />
                        )}
                        {
                          <span
                            style={
                              match
                                ? {
                                  backgroundColor: "#F5F7FA",
                                  color: "#446BA8",
                                  marginLeft: 15,
                                  fontSize: 15
                                }
                                : style.sideMenuSpan
                            }
                          >
                            {subMenu.breadCrums}
                          </span>
                        }
                      </Menu.Item>
                    </div>
                  </NavLink>
                );
              }}
            />
          );
        })}
      </SubMenu>
    </Menu>
  ) : (
      <Menu
        mode="inline"
        style={{ backgroundColor: "inherit" }}
        openKeys={keysOpen}
      >
        <SubMenu
          onTitleClick={subMenu => updateOpenKeys(subMenu.key)}
          style={{ backgroundColor: "inherit" }}
          key={index}
          title={
            <span>
              <img
                src={require(`../../Assets/icons/SV_ICONS/${route.iconName}.png`)}
                width={30}
                height={30}
                alt={route.breadCrums}
                title={route.breadCrums}
              />
              <span style={{ marginLeft: 18, color: '#446BA8' }}>{route.breadCrums}</span>
            </span>
          }
        >
          {route.children.map((subMenu, menuIndex) => {
            return (
              <Route
                key={menuIndex}
                path={subMenu.path}
                exact={activeOnlyWhenExact}
                children={({ match }) => {
                  return (
                    <NavLink
                      style={{ ...style.blackColor }}
                      to={subMenu.path}
                      title={subMenu.breadCrums}
                    >
                      <div
                      // onClick={() => routemoveto()}
                      >
                        <Menu.Item
                          {...props}
                          key={menuIndex}
                          style={
                            match
                              ? {
                                borderLeft: `8px solid ${color.Orange}`,
                                backgroundColor: "inherit"
                              }
                              : {
                                borderLeft: `8px solid #F5F7FA`,
                                backgroundColor: "inherit"
                              }
                          }
                        >
                          {subMenu.iconName && (
                            <img
                              title={subMenu.breadCrums}
                              src={require(`../../Assets/icons/SV_ICONS/${subMenu.iconName}.png`)}
                              style={{ marginLeft: 20 }}
                              width={30}
                              height={30}
                              alt={route.iconName}
                            />
                          )}
                          {
                            <span
                              style={
                                match
                                  ? {
                                    color: "#F05A28",
                                    marginLeft: 15,
                                    fontSize: 15
                                  }
                                  : style.sideMenuSpan
                              }
                            >
                              {subMenu.breadCrums}
                            </span>
                          }
                        </Menu.Item>
                      </div>
                    </NavLink>
                  );
                }}
              />
            );
          })}
        </SubMenu>
      </Menu>
    );
};

class Template extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rootRoutes: props.routes.slice(0, 2),
      activePageIndex: -1,
      aboutUsDrawer: false,
      collapsed: 1,
      menu: false,
      helpDrawer: false,
      profileDrawer: false,
      openKeys: props.openKeys,
      activeRouteIndex: false,
      prevDrawer: false,
      flag: false
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (!state.notRunAgain) {
      const { openKeys } = state;
      const { routes } = props;
      let activePageIndex = state.activePageIndex;
      let activeRouteIndex = state.activeRouteIndex;
      let rootRoutes = state.rootRoutes || [];
      routes.forEach((route, routeIndex) => {
        if (route.actionRow) {
          if (actionRowArray.indexOf(route.path) === -1) {
            actionRowArray.push(route.path)
          }
        }
        if (route.children) {
          route.children.forEach((subMenu, subMenuIndex) => {
            if (subMenu.actionRow) {
              if (actionRowArray.indexOf(subMenu.path) === -1) {
                actionRowArray.push(subMenu.path)
              }
            }
            if (subMenu.path === window.location.pathname) {
              subMenu.active = true;
              rootRoutes.push(routes[routeIndex]);
              Index.push(routeIndex);
              openKeys && !openKeys.includes(routeIndex.toString()) && openKeys.pop() && openKeys.push(routeIndex.toString());
                activePageIndex = subMenuIndex;
                activeRouteIndex = routeIndex;
            }
          });
        }
        if (route.path === window.location.pathname) {
          route.active = true;
          rootRoutes.push(routes[routeIndex]);
          Index.push(routeIndex);
          openKeys &&
            !openKeys.includes(routeIndex.toString()) &&
            openKeys.pop() &&
            openKeys.push(routeIndex.toString());
            activeRouteIndex = routeIndex;
            activePageIndex = -1;
        }
      });
      return {
        rootRoutes,
        activeRouteIndex,
        activePageIndex,
        notRunAgain: true
      }
    }
    return null;
  }

  updateOpenKeys = key => {
    const { openKeys } = this.state;
    if (openKeys.includes(key)) {
      openKeys.splice(openKeys.indexOf(key), 1);
    } else {
      openKeys.push(key);
    }
    this.setState({
      openKeys
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { rootRoutes, openKeys } = this.state;
    const { routes } = this.props;
    routes.forEach((route, routeIndex) => {
      if (route.children) {
        route.children.forEach((subMenu, subMenuIndex) => {
          if (subMenu.path === window.location.pathname) {
            if (
              prevState.activePageIndex !== subMenuIndex ||
              prevState.activeRouteIndex !== routeIndex
            ) {
              rootRoutes.pop();
              rootRoutes.push(routes[routeIndex]);
              openKeys &&
                !openKeys.includes(routeIndex.toString()) &&
                openKeys.pop() &&
                openKeys.push(routeIndex.toString());
              this.setState({
                activePageIndex: subMenuIndex,
                activeRouteIndex: routeIndex,
                rootRoutes
              });
            }
            subMenu.active = true;
            route.active = true;
          }
        });
      }
      if (route.path === window.location.pathname) {
        route.active = true;
        if (prevState.activeRouteIndex !== routeIndex) {
          rootRoutes.pop();
          rootRoutes.push(routes[routeIndex]);
          openKeys &&
            !openKeys.includes(routeIndex.toString()) &&
            openKeys.pop() &&
            openKeys.push(routeIndex.toString());
          this.setState({
            activeRouteIndex: routeIndex,
            activePageIndex: -1,
            rootRoutes
          });
        }
      }
    });
  }

  // routemoveto = () => {
  //   this.setState({
  //     subMenu: false
  //   });
  // };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  collapseSideMenu = () => {
    const toggleCollapsed = !this.state.collapsed;
    this.setState({
      collapsed: toggleCollapsed
    });
  };
  componentDidMount() {
    message.destroy && message.destroy();
    this.collapseSideMenu();
  }
  openDrawer = drawer => {
    const { prevDrawer } = this.state;
    const toggleDrawer = !this.state[drawer];
    this.setState({
      [drawer]: toggleDrawer,
      [prevDrawer]: prevDrawer !== drawer ? false : toggleDrawer,
      prevDrawer: drawer
    });
  };

  closeDrawer = drawer => {
    this.setState({
      [drawer]: false
    });
  };
  changeFlag = () => {
    this.setState({
      flag: true
    })
  }

  render() {
    const { routes, formatMessage, MoveToTemplate, historyProp } = this.props;
    const {
      collapsed,
      activeRouteIndex,
      activePageIndex,
      rootRoutes,
      aboutUsDrawer,
      changePassDrawer,
      menuDrawer,
      helpDrawer,
      profileDrawer,
      openKeys,
      notificationDrawer,
    } = this.state;
    let newArray = [...new Set(actionRowArray)]
    return (

      <div style={{ ...style.page }}>
        <Layout style={{ ...style.page }}>
          <Header style={{ ...style.header }}>
            <NavHeader
              historyProp={historyProp}
              formatMessage={formatMessage}
              MoveToTemplate={(cardTitle, children) =>
                MoveToTemplate(cardTitle, children)
              }
              aboutUsDrawer={aboutUsDrawer}
              changePassDrawer={changePassDrawer}
              helpDrawer={helpDrawer}
              profileDrawer={profileDrawer}
              notificationDrawer={notificationDrawer}
              menuDrawer={menuDrawer}
              openDrawer={drawer => this.openDrawer(drawer)}
              closeDrawer={drawer => this.closeDrawer(drawer)}

              iconName={
                activePageIndex === -1 && activeRouteIndex
                  ? routes[activeRouteIndex].iconName
                  : activeRouteIndex &&
                  routes[activeRouteIndex] &&
                  routes[activeRouteIndex].children[activePageIndex]
                    .iconName
              }
              title={
                activePageIndex === -1 && activeRouteIndex
                  ? routes[activeRouteIndex].breadCrums
                  : activeRouteIndex &&
                  routes[activeRouteIndex] &&
                  routes[activeRouteIndex].children[activePageIndex]
                    .breadCrums
              }
              routes={rootRoutes}
              imageFlag={this.props.imageFlag}

            />
          </Header>

          {/* <LanguageSwitcher/> */}

          <Layout style={{ backgroundColor: "#fff", overflowY: "hidden", overflowX: "hidden" }}>
            <Sider
              trigger={null}
              style={{
                backgroundColor: "#F5F7FA",
                // MozBoxShadow: "4px 4px 8px -3px #777",
                // WebkitBoxShadow: "`4px 4px 8px -3px #777",
                // boxShadow: "4px 4px 8px -3px #777 ",
                overflow: "auto",
                overflowX: "inherit"

              }}
              width={!collapsed ? 260 : 0}
              collapsible
              breakpoint="lg"
              collapsed={collapsed ? 1 : 0}
              onCollapse={this.onCollapse}
            >
              <div style={{ ...style.sideMenuHeight }}>
                <div
                  style={
                    collapsed
                      ? style.collapsedSideMenuIcon
                      : style.sideMenuIcon
                  }
                  onClick={() => this.collapseSideMenu()}
                >
                  {collapsed ?
                    <div style={{ cursor: "pointer", width: "100%", display: "flex", justifyContent: "center" }}>
                      <img title="Open Menu" src={rightArrow} alt={"button"} width={20} height={20} />
                    </div>
                    :
                    <div style={{ display: 'flex', justifyContent: 'flex-end', width: '95%', alignItems: "center" }}>

                      <img src={leftArrow} title="Close Menu" style={{ cursor: "pointer" }} alt={"button"} width={20} height={20} />
                    </div>}
                  {/* {collapsed ? (
                    <img
                      src={rightArrow}
                      title="Open Menu"
                      alt={"button"}
                      width={20}
                      height={20}
                    />
                  ) : (
                      <div style={{display:"flex", justifyContent:"flex-end", width:"90%"}}>
                        <img
                          title="Close Menu"
                          src={leftArrow}
                          alt={"button"}
                          width={20}
                          height={20}
                        />
                      </div>
                    )} */}
                </div>
                <Menu
                  style={collapsed ? style.collapsedSideMenu : style.sideMenu}
                  theme="light"
                  mode={collapsed ? "horizontal" : "inline"}
                >
                  {routes.map((route, index) =>
                    route.iconName !== undefined &&
                      route.children &&
                      route.children.length !== 0 ? (
                        <CustomMenuItem
                          keysOpen={openKeys}
                          updateOpenKeys={key => this.updateOpenKeys(key)}
                          route={route}
                          key={index}
                          index={index}
                          collapsed={collapsed ? 1 : 0}
                        // routemoveto={() => this.routemoveto()}
                        />
                      ) : (
                        route.iconName !== undefined && (
                          <GenrateMenu
                            route={route}
                            key={index}
                            index={index}
                            collapsed={collapsed ? 1 : 0}
                          // routemoveto={() => this.routemoveto()}
                          />
                        )
                      )
                  )}
                </Menu>
              </div>
            </Sider>
            {/* <Content style={{ backgroundColor: "#fff", overflow: 'auto', height: "92vh" }} */}
            <Content>
              {/* BreadCrums */}
              {!this.props.updatedRowActions && <div
                style={{
                  position: "fixed",
                  right: 0,
                  left: `${collapsed ? "80px" : "260px"}`,
                  // MozBoxShadow: "2px 2px 8px -3px #777",
                  // WebkitBoxShadow: "2px 2px 8px -3px #777",
                  // boxShadow: "2px 2px 8px -3px #777",
                  zIndex: 2
                }}
              >
                {routes && newArray.includes(window.location.pathname) && (
                  <PageHeader
                    formatMessage={formatMessage}
                    historyProp={historyProp}
                    iconName={
                      activePageIndex === -1 && activeRouteIndex
                        ? routes[activeRouteIndex].iconName
                        : activeRouteIndex &&
                        routes[activeRouteIndex] &&
                        routes[activeRouteIndex].children[activePageIndex]
                          .iconName}
                    title={
                      activePageIndex === -1 && activeRouteIndex
                        ? routes[activeRouteIndex].breadCrums
                        : activeRouteIndex &&
                        routes[activeRouteIndex] &&
                        routes[activeRouteIndex].children[activePageIndex]
                          .breadCrums
                    }
                    routes={rootRoutes}
                  />
                )}
              </div>}
              <div style={(newArray.includes(window.location.pathname) && !this.props.updatedRowActions) ? { marginTop: "65px" } : { marginTop: "0px" }}>
                {routes.map((route, index) => {
                  return (
                    <Route
                      exact={route.exact}
                      key={index}
                      path={route.path}
                      component={route.main}

                      actionRow={true}
                      children={
                        route.children &&
                        route.children.map((route, index) => {
                          if (route.actionRow) {
                            actionRowArray.push(route.path)
                          }
                          // route.actionRow && this.changeFlag()
                          return (<Route
                            key={index}
                            path={route.path}
                            actionRow={true}
                            component={route.main}
                          />
                          )
                        }
                        )
                      }
                    />
                  );
                })}
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    actions: state.pageHeaderReducer.actions,
    updatedRowActions: state.ActionRowReducer.updatedRowActions,
    customHistory: state.MoveToTemplateReducer.customHistory
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateHistory: (history, pathname) =>
      dispatch(updateHistory(history, pathname))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Template);
