// import * as ApiInfo from "../../APIConfig/ApiParameters";
import React from "react";
import { message, Icon } from "antd";
import * as ApiInfo from "../../APIConfig/ApiParameters";
import { getAuthenticUserInfo } from '../../Redux/Actions/LoginAction/LoginAction'
import GetUserRole from '../../Redux/Actions/GetUserRoleAction/GetUserRoleAction';


export const displayMessageAndDispatchAction = async (
  messageForSuccess, // written in api config file.
  response, // The response we are getting from the apis.
  dispatch, // we getting dispatch function from redux thunk.
  actionForDispatch1, // we getting the first action.
  actionForDispatch2, // we getting the second action.
  dispatchActionParam1, //Here is the first param of first action
  dispatchActionParam2, //Here is the first param of second action
  prevHistory
) => {
  
  // console.log(
  //   messageForSuccess, // written in api config file.
  //   response, // The response we are getting from the apis.
  //   dispatch, // we getting dispatch function from redux thunk.
  //   actionForDispatch1, // we getting the first action.
  //   actionForDispatch2, // we getting the second action.
  //   dispatchActionParam1, //Here is the first param of first action
  //   dispatchActionParam2, //Here is the first param of second action
  //   prevHistory
  // )

  try {
    if (response.data.status === 200) {
      //check the if messageForSuccess is available in this action or not.
      messageForSuccess && message.success(messageForSuccess, 2);
      //check the if action available or not and action param as well because some action have the param and some not.
      actionForDispatch1 &&
        (dispatchActionParam1
          ? dispatch(actionForDispatch1(dispatchActionParam1))
          : dispatch(actionForDispatch1()));
      actionForDispatch2 &&
        (dispatchActionParam2
          ? dispatch(actionForDispatch2(dispatchActionParam2))
          : dispatch(actionForDispatch2()));
    } else if (response.data.status === 204) {

      //if we didn't get the user in the response so the we jump here
      actionForDispatch1 &&
        // dispatchActionParam1 &&
        dispatch(actionForDispatch1([]))
      actionForDispatch2 &&
        // dispatchActionParam2 &&
        dispatch(actionForDispatch2([]))
    } else {
      // const currentHistory = window.location.pathname;
      if (response.data && response.data.status === 401) {

        await dispatch(getAuthenticUserInfo(null))
        await dispatch(GetUserRole(null))
        await localStorage.setItem("userInfo", 0)
        window.location.pathname = '/'
        message.error(
          <span>
            {response.data.message}
            <Icon
              type="close"
              className="closebtn"
              onClick={() => message.destroy && message.destroy()}
              />
          </span>,
          0
          );
        }

      // if (currentHistory === prevHistory) {
        return message.error(
          <span>
            {response.data.message}
            <Icon
              type="close"
              className="closebtn"
              onClick={() => message.destroy && message.destroy()}
            />
          </span>,
          0
        );
      // }

    }
  } catch (error) {
    ApiInfo.DEBUGER && console.log(error);
  }
};
