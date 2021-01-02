import React, { Component } from "react";
import "./App.css";
import Routers from "./Routes/Routes";
import { injectIntl } from "react-intl";
import ErrorBoundary from "./Components/ErrorBoundary/ErrorBoundary";
import { connect } from 'react-redux'
import { compose } from 'redux'
import Apis from "./APIConfig/ApiParameters";
import { GetUserByID } from "./Redux/Actions/LoginAction/LoginAction";
let uid;
window.addEventListener("load", function () {
  uid = window.location.pathname && window.location.pathname.slice(window.location.pathname.lastIndexOf("/") + 1)
  window.localStorage.setItem("Url", uid)
  window.sessionStorage.setItem("Url", uid)

})
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // code to logout user every time browser is closed or tab is closed
  // componentDidMount() {
  //   localStorage.setItem("userInfo", 0)
  // }

  // static getDerivedStateFromProps(props) {
  //   let userInfo = this.props.authenticUserInfo
  //   return null;
  // }
  // static getDerivedStateFromProps(props, state) {
  // let route = { ...window.location }
  // let uid = route.pathname && route.pathname.slice(route.pathname.lastIndexOf("/") + 1)
  // if (uid && !isNaN(uid)){
  //   uid = Number(uid)
  //   props.GetUserByID(uid)
  // }
  // return null;
  // }

  userLoggedin = () => {
    this.setState({
      loggedIn: true
    });
  };
  render() {
    const { intl } = this.props;
    // const { userLoggedin } = this.state;
    return (
      <div>
        <Apis />
        <ErrorBoundary>
          <Routers intl={intl} userLoggedin={() => this.userLoggedin()} />
        </ErrorBoundary>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticUserInfo: state.LoginReducer.authenticUserInfo
    // loaded: state.SimpleSearchReducer.loaded,
    // savedSearch: state.SimpleSearchReducer.savedSearch
  };
};

const mapDispatchToProps = dispatch => {
  return {
    GetUserByID: ID => dispatch(GetUserByID(ID))
  }
}
export default compose(connect(mapStateToProps, mapDispatchToProps), injectIntl)(App);
