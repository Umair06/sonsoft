import React, { Component } from 'react';
import style from '../../styles'
import { Layout, Row, Col, Typography } from 'antd';
import NavFooter from "../../Components/Navbar/Footer/Footer";
import LoginForm from "./LoginForm";
import Help_DBlue from "../../Assets/icons/SV_ICONS/Help_DBlue.png";
import brandLogo from "../../Assets/icons/Logo/SV-Logo -02.png";
import AboutUsDrawer from "../../Components/Modal/AboutUsDrawer"
import HelpDrawer from "../../Components/Modal/HelpSideDrawer";
import { connect } from "react-redux";
import { updateHistory, replace } from "../../Redux/Actions/UpdateHistory/UpdateHistory";
// import LanguageSwitcher from '../../Components/LanguageSwitcher/languageSwitcher';
import { defineMessages } from 'react-intl';

const messages = defineMessages({
  'Sign In': {
    id: "Login.SignIn",
    defaultMessage: "Sign In",
  },
})


const { Footer, Sider, Content } = Layout;
const { Title } = Typography;

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      aboutUsDrawer: false,
      helpDrawer: false,
    }
  }
  uid = this.props.authenticUserInfo && this.props.authenticUserInfo.data && this.props.authenticUserInfo.data.data && this.props.authenticUserInfo.data.data.output && Array.isArray(this.props.authenticUserInfo.data.data.output) && this.props.authenticUserInfo.data.data.output[0] && this.props.authenticUserInfo.data.data.output[0].uid

  openAboutUsDrawer = () => {
    this.setState({
      aboutUsDrawer: !this.state.aboutUsDrawer,
      helpDrawer: false
    })
  };
  closeAboutUsDrawer = () => {
    this.setState({
      aboutUsDrawer: false
    })
  }
  openHelpDrawer = () => {
    this.setState({
      helpDrawer: !this.state.helpDrawer,
      aboutUsDrawer: false
    })
  };
  closeHelpDrawer = () => {
    this.setState({
      helpDrawer: false
    })
  }

  navigateToHomeScreen = userInfo => {
    if (userInfo.data.data.output[0].role === "EAS GENERAL USER") {
      this.props.history.replace("/myarchivedemail")
      this.props.userLoggedin()
    } else if (userInfo.data.data.output[0].role === 'EAS AUDITOR') {
      this.props.history.replace('/exports/tasks')
      this.props.userLoggedin()
    }
    else {
      this.props.history.replace(`/homescreen`)
      this.props.userLoggedin()
    }
  }
  NavigateToWhatsNew = () => {
    this.props.updateHistory(this.props.history, "/whatsnew/whatsnew")

  }
  NavigateToHelp = () => {
    this.props.updateHistory(this.props.history, "/help/controlcenter")
  }

  render() {
    const { aboutUsDrawer, helpDrawer } = this.state;
    const { formatMessage } = this.props;
    return (
      <div style={{ ...style.page }}>
        <Layout style={{ ...style.page }}>
          {/* <LanguageSwitcher/> */}
          <Layout>
            <Sider
              width={"25%"}
              trigger={null}
              breakpoint="lg"
              collapsedWidth="0"
              style={{ ...style.loginPageSiderBackGroundColor }}
            >
              <div className='backgroundImage' style={{ ...style.login.backgroundImage }}>
                <div style={{ ...style.loginPageLogoDivSize }}>
                  <img src={brandLogo} style={{ ...style.loginPageLogoWidth }} title='SonaVault' alt="SonaVault" />
                </div>
              </div>
            </Sider>

            <Content style={{ ...style.whiteBackGround }}>
              <AboutUsDrawer formatMessage={formatMessage} signIn aboutUsDrawer={aboutUsDrawer} close={() => this.closeAboutUsDrawer()} />
              <HelpDrawer formatMessage={formatMessage} signIn helpDrawer={helpDrawer} NavigateToWhatsNew={() => this.NavigateToWhatsNew()} NavigateToHelp={() => this.NavigateToHelp()} close={() => this.closeHelpDrawer()} openAboutUsDrawer={() => this.openAboutUsDrawer()} />
              <Row style={{ ...style.loginPageFormRowSize }}>
                <Col style={{ ...style.loginPageFormColumnSize }}
                  xs={{ span: 16, offset: 4 }}
                  sm={{ span: 14, offset: 5 }}
                  md={{ span: 12, offset: 6 }}
                  lg={{ span: 12, offset: 3 }}
                  xl={{ span: 12, offset: 3 }}
                >
                  <Title style={{ marginBottom: 40, fontSize: 50 }}>{formatMessage(messages["Sign In"])}</Title>
                  <LoginForm formatMessage={formatMessage} navigateToHomeScreen={(userInfo) => this.navigateToHomeScreen(userInfo)} />
                </Col>

                <Col style={style.login.helpButton}
                  xs={{ span: 4 }}
                  sm={{ span: 5 }}
                  md={{ span: 6 }}
                  lg={{ span: 9 }}
                  xl={{ span: 9 }}
                >
                  <img style={{ ...style.cursorPointer }} src={Help_DBlue} title="Help" alt="help" width="40px" onClick={() => this.openHelpDrawer()} />
                </Col>
              </Row>
            </Content>
          </Layout>
          <Footer style={{ ...style.noPadding }}>
            <NavFooter formatMessage={formatMessage} />
          </Footer>
        </Layout>
      </div>
    )
  }
};
const mapStateToProps = state => {
  return {
    authenticUserInfo: state.LoginReducer.authenticUserInfo
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updateHistory: (history, pathname) => dispatch(updateHistory(history, pathname)),
    replace: (history, pathname) => dispatch(replace(history, pathname))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);
