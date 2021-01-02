import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import style from '../../../styles';
import { Avatar, Badge, Button } from 'antd';
import brandLogo1 from '../../../Assets/icons/Logo/SonaVault_Blue.png';
import notificationIcon from '../../../Assets/icons/alarm_bell.png';
import Settings_DBlue from '../../../Assets/icons/SV_ICONS/Settings_DBlue.png';
import Help_DBlue from '../../../Assets/icons/SV_ICONS/Help_DBlue.png';
import Apps_DBlue from '../../../Assets/icons/SV_ICONS/Apps_DBlue.png';
import ChangePasswordDrawer from '../../../Components/Modal/ChangePasswordDrawer';
import QuickDrawer from '../../../Components/Modal/QuickNavigationDrawer';
import HelpDrawer from '../../../Components/Modal/HelpSideDrawer';
import ProfileDrawer from '../../../Components/Modal/ProfileDrawer';
import NotificationDrawer from '../../../Components/Modal/NotificationDrawer';
import AboutUsDrawer from '../../../Components/Modal/AboutUsDrawer';
import Theme from '../../../Assets/Theme/Theme';
import { version } from '../../../APIConfig/Config';
import { defineMessages } from 'react-intl';
import { connect } from 'react-redux';
import { updateHistory } from '../../../Redux/Actions/UpdateHistory/UpdateHistory';
import moveToTemplate from '../../../Redux/Actions/UpdateHistory/MoveToTemplate/MoveToTemplate';
import * as ApiInfo from "../../../APIConfig/ApiParameters";
import { Breadcrumb, Typography, Icon } from "antd"

import SaveSearch from "../../../Components/SaveSearch/SaveSearch";
import ApplyGlobalLabel from "../../../Components/ApplyGlobalLabel/ApplyGlobalLabel"
import GlobalLabel from "../../../Components/GlobalLabel/GlobalLabel";
import ExportEmail from "../../../Components/Export/Export";
import ReportEmail from "../../../Components/Report/Report";
import DismissDrawer from "../../../Components/Modal/DismissDrawer";
import RemoveDocument from '../../Modal/RemoveDocument';


const messages = defineMessages({
  '2019 Fall Release': {
    id: 'Header.2019FallRelease',
    defaultMessage: '2019 Fall Release'
  },
  'Customer Management': {
    id: 'Header.CustomerManagement',
    defaultMessage: 'Customer Management'
  },
  'Sign In': {
    id: 'Header.SignIn',
    defaultMessage: 'Sign In'
  }
});



const { color } = Theme;
const { Title } = Typography;
const notification = [
  '3 emails expired',
  'mailbox not configured',
  'policy updated'
];

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : false,
      settingsButton: null
    };
  }

  // navigateToPage = pathname => {
  //   let customHistory = this.props.historyProp || this.props.customHistory
  //   this.props.updateHistory(customHistory, pathname)
  // }
  navigateToPage = (pathname) => {
    let customHistory = this.props.historyProp || this.props.customHistory;
    this.props.updateHistory(customHistory, pathname);
    this.setState({ clicked: 1 })
    if (pathname === '/setting/controlcenter/status') {
      this.setState({ toSettings: 1 })
    }
    if (pathname === '/help/controlcenter') {
      this.setState({ toHelp: 1 })
    }
  };

  // itemRender = (route) => {
  //   console.log('route', route);
  //   return (
  //     <span style={{ color: "#446BA8" }}>
  //       <span style={{ color: "#446BA8", cursor: "pointer" }}
  //         onClick={() => this.navigateToPage(route.path)}
  //       >{route.breadCrums}</span>
  //     </span>
  //   )
  // }

  itemRender = route => {

    return route &&
      route.children &&
      route.children &&
      route.children.children &&
      route.children.children.path ? (
        <span style={{ color: '#446BA8' }}>
          <span
            style={{ color: '#446BA8', cursor: 'pointer' }}
          //onClick={() => this.navigateToPage(route.children.children.path)}
          >
            {route.breadCrums}
          </span>
        </span>
      ) : (
        <span style={{ color: '#446BA8' }}>
          <span
            style={{ color: '#446BA8', cursor: 'pointer' }}
            onClick={() => this.navigateToPage(route.redirect)}
          >
            {route.breadCrums}
          </span>
        </span>
      );
  };

  naviagateToSettings = () => {
    // let customHistory = this.props.historyProp || this.props.customHistory;
    // this.props.updateHistory(customHistory, '/setting/controlcenter/status');2
    this.setState({ settingsButton: 1 })
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.settingsButton === 1) {
      this.setState({ settingsButton: 0 })
    }
  }

  navigateToNotification = openedNotification => {
    let customHistory = this.props.historyProp || this.props.customHistory;
    this.props.updateHistory(customHistory, '/notifications', openedNotification);
  };
  navigateToHomeScreen = () => {
    let userInfo = localStorage.getItem('userInfo');
    userInfo = userInfo === 0 || userInfo === 'null' ? false : true;
    let customHistory = this.props.historyProp || this.props.customHistory;

    if (userInfo) {
      this.props.updateHistory(customHistory, `/homescreen`);
    } else {
      this.props.updateHistory(customHistory, '/');
    }
  };

  navigateToHelp = () => {
    let customHistory = this.props.historyProp || this.props.customHistory;
    this.props.updateHistory(customHistory, '/help/controlcenter');
  };

  navigateToWhatsNew = () => {
    let customHistory = this.props.historyProp || this.props.customHistory;
    this.props.updateHistory(customHistory, '/whatsnew/whatsnew');
  };

  logout = () => {
    let customHistory = this.props.historyProp || this.props.customHistory;
    this.props.updateHistory(customHistory, '/');
  };

  uid = this.props.authenticUserInfo && this.props.authenticUserInfo.data && this.props.authenticUserInfo.data.data && this.props.authenticUserInfo.data.data.output && Array.isArray(this.props.authenticUserInfo.data.data.output) && this.props.authenticUserInfo.data.data.output[0] && this.props.authenticUserInfo.data.data.output[0].uid

  render() {
    const { userInfo, settingsButton } = this.state;

    const { formatMessage,
      iconName,
      title,
      routes,
      saveSearch, globalLabel, exportEmail, reportEmail, homeScreen, actions, whatsNewScreen, helpDrawer, notificationDrawer, menuDrawer, aboutUsDrawer, changePassDrawer, profileDrawer, openDrawer, closeDrawer, MultiTenant, selected, selectedDocs, onApplyGlobalLabel, applyGlobalLabel, createLegalHold, searchCritearea, customizedColums, removeAllDocFromOnHold, reportHeading, onCase, onHoldTab, columData, /*handleChangeCase, applySelected, background, confirmDrawer,*/ legalHold, apiBodyLegalHold, applyOrRemove, currentPage, pageSize } = this.props;

    let breadCrumsRoutes = routes && routes.map(route => {
      return {
        breadCrums: route.breadCrums,
        exact: route.exact,
        path: route.path,
        component: route.main,
        to: route.to,
        redirect: route.redirect,
        children: []
      };

    });
    const children = routes && routes[2] && routes[2].children;
    const activechild =
      children &&
      children.filter(
        (child, index) => child.path === window.location.pathname
      );
    if (children && activechild.length) {
      breadCrumsRoutes.push(activechild[0]);
    }
    // var loggedIn = localStorage.getItem('loggedIn');
    // loggedIn = loggedIn === '0' || loggedIn === 'null' ? false : true;
    let displayName
    try {
      displayName = userInfo.data.data.output[0].displayName ? userInfo.data.data.output[0].displayName.split(' ')
        : userInfo.data.data.output[0].name.split(' ');
    } catch (error) {
      ApiInfo.DEBUGER && console.log(error.message)

    }

    return (
      <div style={{ ...style.header.container, backgroundColor: "#F5F7FA" }}>

        <NotificationDrawer
          formatMessage={formatMessage}
          navigateToNotification={openedNotification =>
            this.navigateToNotification(openedNotification)
          }
          notificationDrawer={notificationDrawer}
          close={() => closeDrawer('notificationDrawer')}
          openChangePassDrawer={() => this.openChangePassDrawer()}
        />
        <QuickDrawer
          formatMessage={formatMessage}
          MoveToTemplate={(cardTitle, children) =>
            this.props.moveToTemplate(
              this.props.historyProp || this.props.customHistory,
              cardTitle,
              children
            )}
          menuDrawer={menuDrawer}
          close={() => closeDrawer('menuDrawer')}
        />
        <AboutUsDrawer
          formatMessage={formatMessage}
          aboutUsDrawer={aboutUsDrawer}
          close={() => closeDrawer('aboutUsDrawer')}
        />
        <ChangePasswordDrawer
          formatMessage={formatMessage}
          changePassDrawer={changePassDrawer}
          close={() => closeDrawer('changePassDrawer')}
        />
        <ProfileDrawer
          formatMessage={formatMessage}
          logout={() => this.logout()}
          profileDrawer={profileDrawer}
          close={() => closeDrawer('profileDrawer')}
          openChangePassDrawer={() =>
            openDrawer && openDrawer('changePassDrawer')
          }
        />
        <HelpDrawer
          formatMessage={formatMessage}
          NavigateToHelp={() => this.navigateToHelp()}
          NavigateToWhatsNew={() => this.navigateToWhatsNew()}
          helpDrawer={helpDrawer}
          close={() => closeDrawer('helpDrawer')}
          openAboutUsDrawer={() => openDrawer && openDrawer('aboutUsDrawer')}
        />

        {/* <div style={{...style.header.emailsLogo}} onClick={}> */}

        <div
          style={{ ...style.header.emailsLogo }}
          onClick={() => userInfo && userInfo.data && userInfo.data.status === 200 ? this.navigateToHomeScreen() : this.props.navigateToLogin && this.props.navigateToLogin()}>
          <img src={brandLogo1} alt='SonaVault' width="260" title='SonaVault' />
        </div>

        <div
          style={
            {
              width: 'calc(100% - 260px)',
              // MozBoxShadow: background ? null : '4px 4px 8px -3px #777',
              // WebkitBoxShadow: background ? null : '4px 4px 8px -3px #777',
              // boxShadow: background ? null : '4px 4px 8px -3px #777',
              display: 'flex',
              justifyContent: 'space-between'
            }
          }>
          {/* <div>
          </div> */}
          {/* <div style={{
            display: 'flex',
            justifyContent: 'flex-end'

          }}> */}
          <div style={{ width: "50%", display: "flex", justifyContent: "flex-start", flexDirection: "row" }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }} >
              {
                this.props.imageFlag && this.props.iconName &&
                <img style={{ marginLeft: '30px' }}
                  src={require(`../../../Assets/icons/SV_ICONS/${iconName}.png`)}
                  title={title}
                  alt={title}
                  width={35}
                  height={35}
                />
              }
              <div>
                <Title style={{ ...style.pageHeaderTitle }}>{title}</Title>
                <Breadcrumb
                  style={{ marginLeft: 20, padding: style.noPadding.padding }}
                  itemRender={this.itemRender} routes={breadCrumsRoutes}
                  separator={<Icon type="right" />}
                />
              </div>
            </div>


            {MultiTenant && <div style={{}}>
              <Title level={4} style={{
                marginTop: 10,
                color: `${color.Blue}`,
                paddingLeft: 10,
                fontSize: 28
              }}>
                {formatMessage(messages['Customer Management'])}
              </Title>
            </div>}

          </div>
          <div style={{ width: "50%", display: "flex", justifyContent: "flex-end", flexDirection: "row" }}>
            {whatsNewScreen && (
              <div>
                <Title level={4} style={{ ...style.headerTextTitle }}>
                  {formatMessage(messages['2019 Fall Release'])}
                </Title>
              </div>
            )}

            {
              userInfo &&
                userInfo.data &&
                userInfo.data.data &&
                userInfo.data.data.output ? (
                  <div
                    style={
                      version > 7.2
                        ? { ...style.header.mainWithNotfications }
                        : userInfo &&
                          userInfo.data &&
                          userInfo.data.data &&
                          userInfo.data.data.output && userInfo.data.data.output[0] &&
                          userInfo.data.data.output[0].role_id !== 3
                          ? { ...style.header.main }
                          : { ...style.header.mainForGeneralUser }
                    }>
                    {(!actions || !actions.noNotification) && version > 7.2 && (
                      <Badge
                        count={notification.length}
                        style={{
                          margin: '2px 7px 0 0',
                          backgroundColor: color.Orange
                        }}>
                        <div className='ant-dropdown-link'>
                          <img
                            src={notificationIcon}
                            width='30px'
                            style={{ ...style.cursorPointer }}
                            title='Alerts'
                            alt='Alerts'
                            onClick={() => openDrawer && openDrawer("notificationDrawer")}
                          />
                        </div>
                      </Badge>
                    )}
                    {!MultiTenant && userInfo &&
                      userInfo.data &&
                      userInfo.data.data &&
                      userInfo.data.data.output && userInfo.data.data.output[0] &&
                      (userInfo.data.data.output[0].role_id !== 3 &&
                        userInfo.data.data.output[0].role_id !== 2 &&
                        userInfo.data.data.output[0].role_id !== -2) ? (
                        <div>
                          <img
                            src={Settings_DBlue}
                            width='30px'
                            title='Settings'
                            style={{ ...style.cursorPointer }}
                            alt='setting'
                            onClick={() => this.naviagateToSettings()}
                          />
                          {settingsButton && settingsButton === 1 ? <Redirect to={`/setting/controlcenter/status`} /> : null}
                        </div>
                      ) : (
                        <div style={{ width: '30px' }} />
                      )}
                    {userInfo &&
                      userInfo.data &&
                      userInfo.data.data &&
                      userInfo.data.data.output && userInfo.data.data.output[0] &&
                      userInfo.data.data.output[0].role_id !== 3 && (
                        <div>
                          <img
                            src={Help_DBlue}
                            width='25px'
                            title='Help'
                            style={{ ...style.cursorPointer }}
                            alt='menu'
                            onClick={() => openDrawer && openDrawer('helpDrawer')}
                          />
                        </div>
                      )}
                    {!homeScreen &&
                      !MultiTenant &&
                      userInfo &&
                      userInfo.data &&
                      userInfo.data.data &&
                      userInfo.data.data.output && userInfo.data.data.output[0] &&
                      userInfo.data.data.output[0].role_id !== 3 && (
                        <img
                          src={Apps_DBlue}
                          width='25px'
                          title='Quick Navigation'
                          style={{ ...style.cursorPointer }}
                          alt='menu'
                          onClick={() => openDrawer && openDrawer('menuDrawer')}
                        />
                      )}
                    {userInfo &&
                      userInfo.data &&
                      userInfo.data &&
                      userInfo.data.status === 200 ? (
                        <div
                          href='#'
                          onClick={() => openDrawer && openDrawer('profileDrawer')}
                          title={
                            userInfo &&
                            userInfo.data &&
                            userInfo.data.data &&
                            userInfo.data.data.output && userInfo.data.data.output[0] &&
                            userInfo.data.data.output[0].name
                          }>
                          <Avatar
                            style={{
                              backgroundColor: color.Orange,
                              cursor: 'pointer'
                            }}>
                            {displayName &&
                              displayName.map(name => name[0] && name[0].toUpperCase())}
                          </Avatar>
                        </div>
                      ) : (
                        false
                      )}

                  </div>
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      alignItems: 'center'
                    }}>
                    <Button
                      type='link'
                      onClick={() =>
                        this.props.navigateToLogin && this.props.navigateToLogin()
                      }
                      style={{ border: 'none', fontSize: 17 }}
                      size='large'>
                      {formatMessage(messages['Sign In'])}
                    </Button>
                  </div>

                )}
          </div>
        </div>
        {/* This work is for Action DropDown */}
        <ApplyGlobalLabel
          selectedDocs={selectedDocs}
          onCase={onCase && onCase.CASE_NAME}
          selected={selected}
          handleChangeCase={this.props.handleChangeCase}
          formatMessage={formatMessage}
          applyGlobalLabel={applyGlobalLabel}
          createLegalHold={createLegalHold}
          onApplyGlobalLabel={caseInfo => onApplyGlobalLabel && onApplyGlobalLabel(caseInfo)}
          applyLegalHoldToAllDocs={caseInfo => this.props.applyLegalHoldToAllDocs &&
            this.props.applyLegalHoldToAllDocs(caseInfo)}
          openDrawer={(drawer, notCloseDrawer) => openDrawer(drawer, notCloseDrawer)}
          closeDrawer={drawer => closeDrawer(drawer)}
          close={() => closeDrawer && closeDrawer('applyGlobalLabel')}
        />

        <SaveSearch
          searchCritearea={searchCritearea}
          formatMessage={formatMessage}
          customizedColums={customizedColums}
          saveSearch={saveSearch}
          close={() => closeDrawer && closeDrawer('saveSearch')}
        />

        <GlobalLabel
          formatMessage={formatMessage}
          customizedColums={customizedColums}
          globalLabel={globalLabel}
          close={() => closeDrawer && closeDrawer('globalLabel')}
          selected={selectedDocs}
          openDrawer={() => openDrawer('globalLabel')}
          legalHold={legalHold}
          apiBodyLegalHold={apiBodyLegalHold}
          pageSize={pageSize}
          currentPage={currentPage}
          caseId={this.props.onCase && this.props.onCase.CASE_ID}
          onHoldTab={this.props.onHoldTab}
          applyOrRemove={applyOrRemove}
        />


        <ExportEmail
          selectedDocs={selectedDocs}
          onHoldTab={onHoldTab && onHoldTab}
          legalhold={onCase && onCase}
          selected={selected}
          formatMessage={formatMessage}
          customizedColums={customizedColums}
          exportEmail={exportEmail}
          close={() => closeDrawer && closeDrawer('exportEmail')}
        />

        <ReportEmail
          reportHeading={reportHeading}
          formatMessage={formatMessage}
          reportEmail={reportEmail}
          customizedColums={customizedColums}
          columData={columData && columData}
          customizeColumn={(val) => this.props.customizeColumn(val)}
          close={() => closeDrawer && closeDrawer('reportEmail')}
        />

        <DismissDrawer
          formatMessage={formatMessage}
          /*dismissDrawer={dismissDrawer}*/
          close={() => closeDrawer('dismissDrawer')}
        />

        <RemoveDocument
          formatMessage={formatMessage}
          removeDocument={this.props.removeDocument}
          close={() => closeDrawer && closeDrawer('removeDocument')}
          selected={this.props.selectedOnHoldDocs}
          removeSelectedDocFromOnHold={() => this.removeSelectedDocFromOnHold()}
          removeAllDocFromOnHold={() => removeAllDocFromOnHold()} />
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    customHistory: state.MoveToTemplateReducer.customHistory,
    authenticUserInfo: state.LoginReducer.authenticUserInfo,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateHistory: (history, pathname, state) =>
      dispatch(updateHistory(history, pathname, state)),
    moveToTemplate: (history, cardTitle, children) =>
      dispatch(moveToTemplate(history, cardTitle, children))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);