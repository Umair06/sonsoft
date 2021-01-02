import React, { Component } from 'react';
import style from '../../styles';
import { Typography, Icon, Input } from 'antd';
import { PrimaryButton, SecondryButton } from '../Button/Button';
import { connect } from 'react-redux';
import { updateHistory } from '../../Redux/Actions/UpdateHistory/UpdateHistory';
import { defineMessages } from 'react-intl';
import { version } from '../../APIConfig/Config';
import { Redirect } from "react-router-dom";

const messages = defineMessages({
  'Last Updated': {
    id: 'PageHeading.LastUpdated',
    defaultMessage: 'Last Updated September 31st, 2019'
  },
  Search: {
    id: 'PageHeading.Search',
    defaultMessage: 'Search'
  },
  Save: {
    id: 'PageHeading.Save',
    defaultMessage: 'Save'
  },
  Assign: {
    id: 'PageHeading.Assign',
    defaultMessage: 'Assign'
  },
  Apply: {
    id: 'PageHeading.Apply',
    defaultMessage: 'Apply'
  },
  _Search: {
    id: 'PageHeading._Search',
    defaultMessage: 'Search'
  },
  Cancel: {
    id: 'PageHeading.Cancel',
    defaultMessage: 'Cancel'
  },
  Run: {
    id: 'PageHeading.Run',
    defaultMessage: 'Run'
  }
});

const { Text } = Typography;

class PageHeading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: null,
      toSettings: null,
      toHelp: null
    };
  }
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
  componentDidUpdate(prevProps, prevState) {
    if (prevState.clicked === 1) {
      this.setState({ clicked: 0 })
      this.setState({ toSettings: 0 })
      this.setState({ toHelp: 0 })
    }
  }
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
            {this.state.clicked === 1 ? <Redirect to={route.redirect} /> : null}
            {this.state.toSettings === 1 ? <Redirect to='/setting/controlcenter/status' /> : null}
            {this.state.toHelp === 1 ? <Redirect to='/help/controlcenter' /> : null}
          </span>
        </span>
      );
  };

  render() {
    const { /*title, iconName, routes,*/ formatMessage } = this.props;
    // let breadCrumsRoutes = routes.map(route => {

    //   return {
    //     breadCrums: route.breadCrums,
    //     exact: route.exact,
    //     path: route.path,
    //     component: route.main,
    //     to: route.to,
    //     redirect: route.redirect,
    //     children: []
    //   };

    // });
    // const children = routes && routes[2] && routes[2].children;
    // const activechild =
    //   children &&
    //   children.filter(
    //     (child, index) => child.path === window.location.pathname
    //   );
    // if (children && activechild.length) {
    //   breadCrumsRoutes.push(activechild[0]);
    // }
    return (
      <div
        style={{
          width: '100%',
          height: 65,
          backgroundColor: `#fff`,
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '0 7px 0 30px',
          alignItems: 'center',
          borderBottom: "1px solid #F5F7FA"

        }}>
        {/* <div style={{ width: '60%', display: 'flex', alignItems: 'center' }}>
          <div style={{ ...style.pageHeaderDivContent }}>
            {console.log('iconName', this.props.iconName)}
            {iconName && (
              <img
                src={require(`../../Assets/icons/SV_ICONS/${iconName}.png`)}
                title={title}
                alt={title}
                width={35}
                height={35}
              />
            )}
          </div>
          <div>
            <Title style={{ ...style.pageHeaderTitle }}>{title}</Title>
            <Breadcrumb
              style={{ margin: '0 0 0 20px', padding: style.noPadding.padding }}
              itemRender={this.itemRender}
              routes={breadCrumsRoutes}
              separator={<Icon type='right' />}
            />
          </div>
        </div> */}
        <div>
          {(this.props.whatsNewScreen || this.props.helpScreen) &&
            version > 7.1 ? (
              <div>
                {this.props.whatsNewScreen && (
                  <Text style={{ ...style.pageHeaderHelpText }}>
                    {formatMessage(messages['Last Updated'])}
                  </Text>
                )}
                {this.props.helpScreen && (
                  <Input
                    style={{ width: '500px' }}
                    type='text'
                    placeholder={formatMessage(messages['Search'])}
                    suffix={
                      <div>
                        <Text style={{ marginRight: 10 }}>0/0</Text>|
                      <Icon
                          style={{ marginLeft: 10, cursor: 'pointer' }}
                          type='up'></Icon>
                        <Icon
                          style={{ marginLeft: 10, cursor: 'pointer' }}
                          type='down'></Icon>
                        <Icon
                          style={{ marginLeft: 10, cursor: 'pointer' }}
                          type='close'></Icon>
                      </div>
                    }
                  />
                )}
              </div>
            ) : (
              <div
                style={{
                  display: 'flex',
                  maxWidth: 400,
                  width: '100%',
                  justifyContent: 'flex-end',
                  alignItems: 'center'
                }}>
                <div style={{ ...style.setting.drawerIconTitleWrapper }}>
                  {this.props.actions && this.props.actions.setting && (
                    <div style={{ padding: '0 28px', }}>
                      <Icon
                        type='setting'
                        title='Page Settings'
                        theme='filled'
                        width='32px'
                        style={{ fontSize: '25px', cursor: 'pointer' }}
                        onClick={() =>
                          this.props.actions.settingOpenDrawer &&
                          this.props.actions.settingOpenDrawer()
                        }
                      />
                    </div>
                  )}
                  {this.props.actions && this.props.actions.save && (
                    <div
                      style={{ fontSize: '20px', paddingRight: 15 }}
                      onClick={() =>
                        this.props.actions.saveValues &&
                        this.props.actions.saveValues()
                      }>
                      <PrimaryButton
                        text={formatMessage(messages['Save'])}></PrimaryButton>
                    </div>
                  )}
                  {this.props.actions && this.props.actions.refresh && (
                    <div
                      style={{ padding: '0 28px', fontSize: '20px' }}
                      onClick={() =>
                        this.props.actions.onRefresh &&
                        this.props.actions.onRefresh()
                      }>
                      <img
                        alt=''
                        src={require(`../../Assets/icons/SV_ICONS/Refresh_Blue.png`)}
                        style={{ cursor: 'pointer' }}
                        width='32px'
                      />
                    </div>
                  )}

                  {this.props.actions && this.props.actions.assign && (
                    <div>
                      <PrimaryButton

                        onClick={() =>
                          this.props.actions.saveAssign &&
                          this.props.actions.saveAssign()
                        }
                        text={formatMessage(messages['Assign'])}></PrimaryButton>
                    </div>
                  )}
                  {this.props.actions && this.props.actions.apply && (
                    <div
                      onClick={() =>
                        this.props.actions.applyFunction &&
                        this.props.actions.applyFunction()
                      }>
                      <PrimaryButton
                        text={formatMessage(messages['Apply'])}></PrimaryButton>
                    </div>
                  )}

                  {this.props.actions && this.props.actions.search && (
                    <div style={{ fontSize: '20px' }}>
                      <PrimaryButton
                        text={formatMessage(messages['_Search'])}></PrimaryButton>
                    </div>
                  )}
                  {this.props.actions && this.props.actions.cancel && (
                    <div
                      style={{ fontSize: '20px' }}
                      onClick={() =>
                        this.props.actions.cancelFunction &&
                        this.props.actions.cancelFunction()
                      }>
                      <SecondryButton text={formatMessage(messages['Cancel'])} />
                    </div>
                  )}
                  {this.props.actions && this.props.actions.run && (
                    <div style={{ fontSize: '20px' }}>
                      <SecondryButton text={formatMessage(messages['Run'])} />
                    </div>
                  )}
                </div>
              </div>
            )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    actions: state.pageHeaderReducer.actions,
    customHistory: state.MoveToTemplateReducer.customHistory
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateHistory: (history, pathname) =>
      dispatch(updateHistory(history, pathname))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageHeading);
