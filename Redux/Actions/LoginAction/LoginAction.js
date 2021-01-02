import React from "react";
import * as ApiInfo from "../../../APIConfig/ApiParameters";
import axios from "axios";
import { GET_AUTHENTICUSERINFO } from "../../Types/LoginTypes/LoginTypes";
import { message, Icon } from "antd";
import GetUserRole from "../GetUserRoleAction/GetUserRoleAction";
import { displayMessageAndDispatchAction } from "../utils";
// import { fetchLicenseInformation } from "../ControlCenterAction/LicenseAction"
message.config({
  top: 10,
  duration: 5,
  maxCount: 1
});

export const getAuthenticUserInfo = data => {
  return {
    type: GET_AUTHENTICUSERINFO,
    payload: data
  };
};

export const postLogin = data => dispatch => {
  // ApiInfo.DEBUGER && console.log("data got to postLogin", JSON.stringify(data));
  message
    .loading(ApiInfo.ApiResponseMessages.getData, 30)
    .then(() => message.error("Network Error"));
  const prevHistory = window.location.pathname;

  axios({
    method: "Post",
    url: ApiInfo.APIPORT + "/api/v2/login",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: JSON.stringify(data)
  })
    .then(response => {
      ApiInfo.DEBUGER && console.log("postUserInfoData response", response);
      message.destroy && message.destroy(); 
      displayMessageAndDispatchAction(
        ApiInfo.ApiResponseMessages.loggedIn,
        response,
        dispatch,
        getAuthenticUserInfo,
        GetUserRole,
        response,
        response,
        prevHistory
      );
      if(response.data.status === 200){
        // dispatch(fetchLicenseInformation())
      }
      //   if (response.data.status === 200) {
      //     message.success(ApiInfo.ApiResponseMessages.loggedIn, 2);
      //     dispatch(getAuthenticUserInfo(response));
      //     dispatch(GetUserRole(response));
      //   } else {
      //     message.error(
      //       <span>
      //         {response.data.message}
      //         <Icon
      //           className="closebtn"
      //           type="close"
      //           onClick={() => message.destroy && message.destroy()}
      //         />
      //       </span>,
      //       0
      //     );
      //   }
    })
    .catch(error => {
      ApiInfo.DEBUGER && console.log("postUserInfoData error", error);
      message.error(
        <span>
          Something went wrong. Please try again. If the problem persist then please contact the admin. Thanks
          <Icon
            type="close"
            className="closebtn"
            onClick={() => message.destroy && message.destroy()}
          />
        </span>,
        0
      );
    });
};

export const GetUserByID = ID => dispatch => {
  // const prevHistory = window.location.pathname;
  axios({
    method: "GET",
    url: ApiInfo.APIPORT + "/api/v2/security/getuserinfobyid/" + ID,
    headers: {
      "api-token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVU0VSX0lEIjowLCJVU0VSX05BTUUiOiJzb25hc29mdGFyYyIsIkRJU1BMQVlfTkFNRSI6IiIsIkRPTUFJTl9OQU1FIjoiIiwiVVNFUl9QV0QiOiJFa2dMOUZ0TmQ0REtiMWJua3JBVjFnPT0iLCJNQUlMQk9YX05BTUUiOiIiLCJST0xFX0lEIjoxLCJVU0VSX1RZUEUiOiJTIiwiVVNFUl9QUklOQ0lQQUxfTkFNRSI6bnVsbCwiUk9MRV9OQU1FIjoiRUFTIEFETUlOSVNUUkFUT1IiLCJST0xFX0RFU0NSSVBUSU9OIjoiRUFTIEFETUlOSVNUUkFUT1IiLCJTVEFUVVMiOjEsIlJPTEVfVFlQRSI6IlMiLCJUT0tFTl9TRUNSRVQiOiIzMCVeJjkxYTUxYWE0YiFAYjFBd2R-KDYpKiY1YjllNDc5ODdkZXYiLCJDTElFTlRfTkFNRSI6InNvbmFzb2Z0IiwiaWF0IjoxNTc2ODI3ODU3fQ.QKCq7bM5jQi5SgcY083aTpnyeiD1aLvcbOIOq5UyGIE",
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
  })
    .then(response => {
      ApiInfo.DEBUGER && console.log("Get USER By ID response", response);
      dispatch(getAuthenticUserInfo(response))
      // displayMessageAndDispatchAction(
      //   undefined,
      //   response,
      //   dispatch,
      //   getAuthenticUserInfo,
      //   GetUserRole,
      //   response,
      //   response,
      //   prevHistory
      // );
      // if(response.data.status === 200){
      //   dispatch(fetchLicenseInformation())
      // }
      
    })
    .catch(error => {
      ApiInfo.DEBUGER && console.log("Get USER By ID error", error);
      message.error(
        <span>
          something went wrong
          <Icon
            type="close"
            className="closebtn"
            onClick={() => message.destroy && message.destroy()}
          />
        </span>,
        0
      );
    });
};


