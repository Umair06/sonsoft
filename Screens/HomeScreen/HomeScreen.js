import React, { Component } from "react";
import style from "../../styles";
import { Layout, message } from "antd";
import NavHeader from "../../Components/Navbar/Header/Header";
import HomeScreenCard from "../../Components/HomeScreenCard/HomeScreenCard";
// import { defineMessages } from "react-intl";
import { connect } from "react-redux";
// import * as ApiInfo from "../../APIConfig/ApiParameters";
const { Header, Content } = Layout;

// const messages = defineMessages({
//   "CONTROL CENTER": {
//     id: "homeScreen.controlCenterCard",
//     defaultMessage: "CONTROL CENTER"
//   },
//   "MY ARCHIVED EMAIL": {
//     id: "homeScreen.myArchivedEmailCard",
//     defaultMessage: "MY ARCHIVED EMAIL"
//   },
//   "SEARCH ARCHIVE": {
//     id: "homeScreen.searchArchiveCard",
//     defaultMessage: "SEARCH ARCHIVE"
//   },
//   "LEGAL HOLDS": {
//     id: "homeScreen.legalHoldsCard",
//     defaultMessage: "LEGAL HOLDS"
//   },
//   EXPORTS: {
//     id: "homeScreen.exportsCard",
//     defaultMessage: "EXPORTS"
//   },
//   POLICIES: {
//     id: "homeScreen.policiesCard",
//     defaultMessage: "POLICIES"
//   },
//   SCHEDULER: {
//     id: "homeScreen.schedulerCard",
//     defaultMessage: "SCHEDULER"
//   }
// });

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aboutUsDrawer: false,
      helpDrawer: false,
      changePassDrawer: false,
      notificationDrawer: false,
      profileDrawer: false,
      prevDrawer: "test",
      redirect: false
    };
    message.destroy();
  }

  // componentWillMount() {
  //   message.destroy && message.destroy();
  //   let userLoggedin = localStorage.getItem('loggedIn');
  //   if (userLoggedin === null) {
  //     this.props.history.push('/');
  //   }
  // }

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

  render() {
    const {
      aboutUsDrawer,
      changePassDrawer,
      helpDrawer,
      profileDrawer,
      notificationDrawer,
      // redirect
    } = this.state;
    const { formatMessage, currentUserRole, authenticUserInfo } = this.props;

    // const getUserTile = (authenticUserInfo, userRoles) => {

    //   return getUserTile
    // }

    // this.props.history.push('/');
    return (
      <div style={{ ...style.homeScreen.background }}>
        <Layout style={{ minHeight: "100vh", height: "inherit" }}>
          <Header style={{ ...style.homeScreen.homeScreenHeader }}>
            <NavHeader
              historyProp={this.props.history}
              MoveToTemplate={(cardTitle, children) =>
                this.MoveToTemplate(cardTitle, children)
              }
              formatMessage={formatMessage}
              homeScreen={true}
              aboutUsDrawer={aboutUsDrawer}
              changePassDrawer={changePassDrawer}
              helpDrawer={helpDrawer}
              profileDrawer={profileDrawer}
              notificationDrawer={notificationDrawer}
              openDrawer={drawer => this.openDrawer(drawer)}
              closeDrawer={drawer => this.closeDrawer(drawer)}
            />
          </Header>
          {/* <LanguageSwitcher/> */}
          <Content style={{ ...style.homeScreen.homeScreenContent }}>
            <div style={{ ...style.homeScreen.homeScreenContentDiv }}>
              { currentUserRole
                ? currentUserRole.tiles.map(({ id, ...otherTileProps }) => (

                  <HomeScreenCard
                    uid={authenticUserInfo && authenticUserInfo.data && authenticUserInfo.data.data && authenticUserInfo.data.data.output && Array.isArray(authenticUserInfo.data.data.output) && authenticUserInfo.data.data.output[0] && authenticUserInfo.data.data.output[0].uid}
                    historyProp={this.props.history}
                    key={id}
                    {...otherTileProps}
                  />
                ))
                : null}
            </div>
          </Content>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticUserInfo: state.LoginReducer.authenticUserInfo,
    currentUserRole: state.RouteRolesReducer.currentUserRole
  };
};

export default connect(mapStateToProps)(HomeScreen);

// {
//   HomeScreenTilesData.map(({ id, formatMessage, cardTitle, ...otherTileProps }) => {
//     try {
//       if (authenticUserInfo) {
//         const roleId = authenticUserInfo.data.data.output[0].role_id.toString()
//         const getUsertileArray = userRoles.routeRoles[roleId].tiles
//         const isTileForYou = getUsertileArray.find(tile =>
//           tile === cardTitle
//         )
//         return cardTitle === isTileForYou && (
//           < HomeScreenCard formatMessage={formatMessage} cardTitle={cardTitle} historyProp={this.props.history} key={id} {...otherTileProps} />
//         )
//       }
//     } catch (e) {
//      ApiInfo.DEBUGER && console.log('Printing this message if HomeScreen tile Role contion not run', e.message)
//     }
//   }
//   )
// }
