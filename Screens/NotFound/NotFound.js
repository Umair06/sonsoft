import React, { Component } from 'react';
import { Layout, message } from "antd";
import style from "../../styles";
import brandLogo from "../../Assets/icons/Logo/Sonavault_logo.svg";
import { updateHistory } from "../../Redux/Actions/UpdateHistory/UpdateHistory";
import { connect } from "react-redux";

const { Header, Content } = Layout;

class NotFound extends Component {
  componentDidMount() {
    message.destroy && message.destroy()
  }
  navigateToHomeScreen = () => {
    this.props.updateHistory(this.props.history, `/homescreen`)
  }
  uid = this.props.authenticUserInfo && this.props.authenticUserInfo.data && this.props.authenticUserInfo.data.data && this.props.authenticUserInfo.data.data.output && Array.isArray(this.props.authenticUserInfo.data.data.output) && this.props.authenticUserInfo.data.data.output[0] && this.props.authenticUserInfo.data.data.output[0].uid

  render() {
    return (
      <div style={{ ...style.homeScreen.background }}>
        <Layout style={{ minHeight: "100vh", height: "inherit", backgroundColor: "#fff" }}>
          <Header style={{ ...style.homeScreen.homeScreenHeader }} >
            <div style={{ ...style.header.container }}>
              <div style={{ ...style.header.emailsLogo }} onClick={() => this.navigateToHomeScreen()}>
                <img src={brandLogo} alt="SonaVault" title="SonaVault" />
              </div>
              <div
                style={{
                  width: 'calc(100% - 260px)',
                  MozBoxShadow: "4px 4px 8px -3px #777",
                  WebkitBoxShadow: "4px 4px 8px -3px #777",
                  boxShadow: "4px 4px 8px -3px #777",
                  display: 'flex',
                  justifyContent: "flex-end"
                }}>
              </div>
            </div>
          </Header>
          {/* <LanguageSwitcher/> */}

          <Content style={{ padding: 20, paddingTop: 80 }}>
            <div>
              <h1>404 - File or directory not found.</h1>
              <h2>The resource you are looking for might have been removed, had its name changed, or is temporarily unavailable.</h2>
            </div>
          </Content>
        </Layout>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    authenticUserInfo: state.LoginReducer.authenticUserInfo,
    customHistory: state.MoveToTemplateReducer.customHistory
  }
};

const mapDispatchToProps = dispatch => {
  return {
    updateHistory: (history, pathname, state) => dispatch(updateHistory(history, pathname, state))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(NotFound);