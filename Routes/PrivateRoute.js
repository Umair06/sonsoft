import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux'
import { getAuthenticUserInfo } from '../Redux/Actions/LoginAction/LoginAction'
import ROLES_DATA from '../Redux/Reducers/RouteRolesReducer/ROLES_DATA';
import * as ApiInfo from "../APIConfig/ApiParameters";


const IsUserAccess = (authenticUserInfo, path, userRoles, logoutCurrentUser) => {
  let IsUserAccess
  try {
    if (authenticUserInfo && authenticUserInfo !== null && authenticUserInfo.data.status === 200) {
      const rollId = authenticUserInfo.data.data.output[0].role_id.toString()
      const getUserPathArray = ROLES_DATA[rollId].paths
      if (getUserPathArray.length === 0) {
        logoutCurrentUser(null)
        window.location.pathname = '/'
      } else {
        IsUserAccess = getUserPathArray.find(
          rollPath => path.indexOf(":") !== -1 ?
            path.slice(0, path.indexOf(":") - 1) === rollPath : rollPath === path
        )
        return IsUserAccess
      }
    }
    // else {
    //   return true
    // }
  }
  catch (error) {
    ApiInfo.DEBUGER && console.log(error.message)
  }
}

const PrivateRoute = ({ component: Component, authenticUserInfo, userRoles, logoutCurrentUser, ...rest }) => {
  const { formatMessage, path, } = { ...rest }
  return (
    <div>
      {/* {(!authenticUserInfo || authenticUserInfo.data.status !== 200) && <Redirect to='/' />} */}
      <Route {...rest} render={(props) => (
        // This return value of this function deside the user can accesss the route or not
        IsUserAccess(authenticUserInfo, path, userRoles, logoutCurrentUser) ?
          <Component {...props} formatMessage={formatMessage} />
          : authenticUserInfo ? props.history.goBack() : window.location.pathname = '/'
      )}
      />
    </div>
  );
};

const mapStateToProps = state => {

  return {
    authenticUserInfo: state.LoginReducer.authenticUserInfo,
    // userRoles: state.RouteRolesReducer.routeRoles
  }

};
const mapdispatchToProps = dispatch => ({
  logoutCurrentUser: data => dispatch(getAuthenticUserInfo(data)),
})

export default connect(mapStateToProps, mapdispatchToProps)(PrivateRoute)
