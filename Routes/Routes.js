import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import { createBrowserHistory } from "history";
import Login from "../Screens/Login/Login";
import HomeScreen from "../Screens/HomeScreen/HomeScreen";
import ControlCenter from "../Screens/ControlCenter/ControlCenter";
import Scheduler from "../Screens/Scheduler/Scheduler";
import Reporting from "../Screens/Reporting/Reporting";
import Setting from "../Screens/Setting/Setting";
import SearchArchive from "../Screens/SearchArchive/SearchArchive";
import MyArchivedEmails from "../Screens/MyArchiveEmail/MyArchiveEmail";
import ContentIdentification from "../Screens/ContentIdentification/ContentIdentification";
import LegalHold from "../Screens/LegalHold/LegalHold";
import Export from "../Screens/Export/Export";
import LegalHoldCase from "../Screens/LegalHold/LegalCase";
import Notification from "../Screens/Notification/Notification";
import WhatsNew from "../Screens/Help/What'sNew/What'sNew";
import Help from "../Screens/Help/Help/Help";
import SavedSearches from "../Screens/SearchArchive/SaveSearch";
import MultiTenant from "../Screens/MultiTenant/MultiTenant"
import { connect } from "react-redux";
import {
  updateHistory,
  goBack
} from "../Redux/Actions/UpdateHistory/UpdateHistory";
import NotFound from "../Screens/NotFound/NotFound";
import PrivateRoute from "./PrivateRoute";
import ReadingPaneModal from "../Components/ReadingPane/Components/ReadingPaneModal";
// import ReadingPane from "../Components/ReadingPane/ReadingPane";
// import SimpleSearchReducer from "../Redux/Reducers/SimpleSearchReducer/SimpleSearchReducer";
// import Status from "../Screens/Help/Help/SettingHelp/ControlCenter/Status/Status";
import PolicyScreen from "../Screens/Policies/PolicyScreen";
const history = createBrowserHistory();

class Routers extends Component {
  // constructor(props) {
  //   super(props);
  // }

  // const routePatZZh = {}

  render() {
    const {
      intl: { formatMessage },
      customHistory,
      userLoggedin,
      // authenticUserInfo,
      // attachmentId
    } = this.props;
    let userInfo = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : false;
    !customHistory && this.props.updateHistory(history);
    // console.log("authenticUserInfo",authenticUserInfo)
    return (
      <Router history={customHistory}>
        <Switch>
          <Route
            exact
            path="/"
            component={props => (
              <Login
                {...props}
                formatMessage={formatMessage}
                userLoggedin={userLoggedin}
              />
            )}
          />

          <Route
            path={`/help`}
            component={props => (
              <Help {...props} formatMessage={formatMessage} />
            )}
          />

          <Route
            path="/whatsnew"
            component={props => (
              <WhatsNew {...props} formatMessage={formatMessage} />
            )}
          />
           <Route
            path="/multitenant"
            component={props => (
              <MultiTenant
                {...props}
                formatMessage={formatMessage}
              />
            )}
          />

          <PrivateRoute
            path="/myarchivedemail"
            formatMessage={formatMessage}
            component={MyArchivedEmails}
          />

          <Route
            path="/readingpanemodal"
            formatMessage={formatMessage}
            component={props => (
              <ReadingPaneModal {...props} formatMessage={formatMessage} />
            )}
          />
          {/* 
          <Route
            path="/myarchivedemail"
            render={(props) =>
              userInfo && userInfo.data && userInfo.data.status === 200 ?
                <MyArchivedEmails {...props} formatMessage={formatMessage} />
                : <Redirect to="/" />}
          /> */}

          <PrivateRoute
            path="/homescreen"
            component={props => (
              <HomeScreen {...props} formatMessage={formatMessage} />
            )}
          />

          <PrivateRoute
            path="/policies"
            component={PolicyScreen}
            formatMessage={formatMessage}
          />  

          <PrivateRoute
          
            path="/controlcenter"
            component={ControlCenter}
            formatMessage={formatMessage}
          />

          <PrivateRoute
            path="/setting"
            component={Setting}
            formatMessage={formatMessage}
          />

          <PrivateRoute
            path="/searcharchive"
            component={SearchArchive}
            formatMessage={formatMessage}
          />

          <PrivateRoute
            path="/legalholds"
            component={LegalHold}
            formatMessage={formatMessage}
          />

          <PrivateRoute
            path="/exports"
            component={Export}
            formatMessage={formatMessage}
          />

          <PrivateRoute
            path="/case"
            component={LegalHoldCase}
            formatMessage={formatMessage}
          />

          <PrivateRoute
            path="/notifications"
            component={Notification}
            formatMessage={formatMessage}
          />

          <PrivateRoute
            path="/savedsearch"
            component={SavedSearches}
            formatMessage={formatMessage}
          />
          <PrivateRoute
            path="/reports"
            component={Reporting}
            formatMessage={formatMessage}
          />
          <PrivateRoute
            path="/contentidentification"
            component={ContentIdentification}
            formatMessage={formatMessage}
          />
          <PrivateRoute
            path="/scheduler"
            component={Scheduler}
            formatMessage={formatMessage}
          />
          

          <Route
            path="*"
            render={props =>
              userInfo && userInfo.data && userInfo.data.status === 200 ? (
                userInfo.data.data.output.role_id !== 3 ? (
                  <NotFound {...props} formatMessage={formatMessage} />
                ) : (
                    <Redirect to="/myarchivedemail" />
                  )
              ) : (
                  <Redirect to="/" />
                )
            }
          />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticUserInfo: state.LoginReducer.authenticUserInfo,
    customHistory: state.MoveToTemplateReducer.customHistory,
    attachmentId: state.SimpleSearchReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateHistory: (history, pathname) =>
      dispatch(updateHistory(history, pathname)),
    goBack: history => dispatch(goBack(history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Routers);

// {/* <Route path="/scheduler" component={(props) => <Scheduler {...props} formatMessage={formatMessage}/>} /> */ }
// {/* <Route path="/reporting" component={(props) => <Export {...props} formatMessage={formatMessage}/>} /> */ }
// {/* <Route path="/contentidentification" component={C(props) => <Login {...props} formatMessage={formatMessage}/>ontentIdentification} /> */ }
