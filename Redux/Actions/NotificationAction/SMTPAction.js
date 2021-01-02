import * as ApiInfo from "../../../APIConfig/ApiParameters";
import axios from "axios";
import React from "react";
import { GET_SMTP } from "../../Types/NotificationTypes/NotificationTypes";
import { message, Icon } from "antd";
import { displayMessageAndDispatchAction } from "../utils";
import { getAuthenticUserInfo } from '../LoginAction/LoginAction';
import GetUserRole  from '../GetUserRoleAction/GetUserRoleAction';
message.config({
  top: 10,
  duration: 5,
  maxCount: 1
});

export const getSMTPSetting = SMTPdata => {
  return {
    type: GET_SMTP,
    payload: {
      SMTPdata: SMTPdata
    }
  };
};

export const fetchSMTPSetting = noMessage => dispatch => {
  !noMessage &&
    message
      .loading("Fetching SMTP setting", 100)
      .then(() => message.error(ApiInfo.ApiResponseMessages.error));
  axios({
    method: "GET",
    url: ApiInfo.APIPORT + "/api/v2/notification/smtp/get",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    }
  })
    .then(async response => {
      ApiInfo.DEBUGER && console.log("fetchSMTPSetting Response", response);
      !noMessage && message.destroy && message.destroy();
      dispatch(getSMTPSetting(response.data.data.output[0]));
      response.data.status !== 200 && message.error(<span>{response.data.message}<Icon type="close" className="closebtn" onClick={() => message.destroy && message.destroy()} /></span>, 0)
      if(response.data && response.data.status === 401){
        await dispatch(getAuthenticUserInfo(null))
        await dispatch(GetUserRole(null))
        if(!JSON.stringify(localStorage.getItem("userInfo")))
        window.location.pathname = '/'
        if(response.data && response.data.status === !204){
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
        )
        };
      }
    })
    .catch(error => {
      ApiInfo.DEBUGER && console.log("fetchSMTPSetting error", error);
      dispatch(getSMTPSetting([]));
    });
};
export const postSMTPSetting = data => dispatch => {
  message
    .loading(ApiInfo.ApiResponseMessages.postData, 20)
    .then(() => message.error(ApiInfo.ApiResponseMessages.error));
  ApiInfo.DEBUGER && console.log(" data got to  postSMTPSetting Data", data);
  const prevHistory = window.location.pathname;

  axios({
    method: "Post",
    url: ApiInfo.APIPORT + "/api/v2/notification/smtp/update",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: data
  })
    .then(response => {
      ApiInfo.DEBUGER && console.log(" postSMTPSetting Response", response);
      message.destroy && message.destroy();

      displayMessageAndDispatchAction(
        ApiInfo.ApiResponseMessages.updated,
        response,
        dispatch,
        fetchSMTPSetting,
        undefined,
        true,
        undefined,
        prevHistory
      );

    //   if (response.data.status === 200) {
    //     message.success(ApiInfo.ApiResponseMessages.updated);
    //     dispatch(fetchSMTPSetting(true));
    //   } else {
    //     message.error(
    //       <span>
    //         {response.data.message}
    //         <Icon
    //           type="close"
    //           className="closebtn"
    //           onClick={() => message.destroy && message.destroy()}
    //         />
    //       </span>,
    //       0
    //     );
    //   }
    })
    .catch(error => {
      ApiInfo.DEBUGER &&  console.log("postSSOSetting error", error);
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};
