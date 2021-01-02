import * as ApiInfo from "../../../APIConfig/ApiParameters";
import axios from "axios";

import {
  GET_NOTIFICATION_DROPDOWN_LIST,
  GET_NOTIFICATION,
  GET_SELECTED_NOTIFICATION
} from "../../Types/NotificationTypes/NotificationTypes";
import { message, Icon } from "antd";
import React from "react";
import { displayMessageAndDispatchAction } from "../utils";
import { resetSelectedRecords } from "../updateSelectedRecordsAction/updateSelectedRecordsAction";
import { getAuthenticUserInfo } from '../LoginAction/LoginAction'
import GetUserRole from '../GetUserRoleAction/GetUserRoleAction'
message.config({
  top: 10,
  duration: 5,
  maxCount: 1
});

export const getNotification = notificationlist => {
  return {
    type: GET_NOTIFICATION,
    payload: {
      notificationlist: notificationlist
    }
  };
};
export const getSelectedNotification = selectednotification => {
  return {
    type: GET_SELECTED_NOTIFICATION,
    payload: {
      selectednotification: selectednotification
    }
  };
};
export const getNotificationDropDownList = notificationdropdownlist => {
  return {
    type: GET_NOTIFICATION_DROPDOWN_LIST,
    payload: {
      notificationdropdownlist: notificationdropdownlist
    }
  };
};

export const fetchNotification = () => dispatch => {
  axios({
    method: "Get",
    url: ApiInfo.APIPORT + "/api/v2/notification",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    }
  })
    .then(async response => {
      ApiInfo.DEBUGER && console.log("fetchNotification Response", response);
      if (response.data.status === 200) {
        dispatch(getNotification(response.data.data.output));
      } else {
        dispatch(getNotification([]));
        if (response.data && response.data.status === 401) {
          await dispatch(getAuthenticUserInfo(null))
          await dispatch(GetUserRole(null))
          if (!JSON.stringify(localStorage.getItem("userInfo")))
            window.location.pathname = '/'
        }
        if (response.data && response.data.status === !204) {
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
      ApiInfo.DEBUGER && console.log("fetchNotification error", error);
      dispatch(getNotification([]));
    });
};
export const fetchSelectedNotification = data => dispatch => {
  ApiInfo.DEBUGER && console.log("post data fetchSelectedNotification", data);
  const prevHistory = window.location.pathname;

  if (data) {
    axios({
      method: "Get",
      url: ApiInfo.APIPORT + "/api/v2/notification/" + data.id,
      headers: {
        "api-token": ApiInfo.APITOKEN,
        "Content-Type": "application/json",
        "x-channel": ApiInfo.APICHANNEL
      }
    })
      // .then(response => {
      //   ApiInfo.DEBUGER && console.log('fetchSelectedNotification Response', response);
      //   response.data.message !== 'Success' &&
      //     message.error(`${response.data.data.output.Error}`);

      //   dispatch(
      //     getNotification(
      //       response.data &&
      //         response.data.data.output &&
      //         Array.isArray(response.data.data.output) &&
      //         response.data.data.output.length === 0
      //         ? []
      //         : response.data.data.output || []
      //     )
      //   );
      // })
      // .catch(error => {
      //   console.log('fetchNotification error', error);
      //   dispatch(getNotification([]));
      // })
      .then(response => {
        ApiInfo.DEBUGER &&
          console.log("fetchSelectedNotification Response", response);

        displayMessageAndDispatchAction(
          undefined,
          response,
          dispatch,
          getSelectedNotification,
          undefined,
          response.data.data.output[0],
          undefined,
          prevHistory
        );

        // if (response.data.status === 200) {
        //   dispatch(getSelectedNotification(response.data.data.output[0]));
        // } else {
        //   dispatch(getSelectedNotification([]));
        //   message.error(
        //     <span>
        //       {response.data.message}
        //       <Icon
        //         type="close"
        //         className="closebtn"
        //         onClick={() => message.destroy && message.destroy()}
        //       />
        //     </span>,
        //     0
        //   );
        // }
      })
      .catch(error => {
        ApiInfo.DEBUGER && console.log("fetchSelectedNotification error", error);
        dispatch(getSelectedNotification([]));
      });
  } else {
    dispatch(getSelectedNotification([]));
  }
};
export const fetchNotificationDropDownList = () => dispatch => {
  const prevHistory = window.location.pathname;

  axios({
    method: "Get",
    url: ApiInfo.APIPORT + "/api/v2/notification/bind",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    }
  }).then(response => {
    ApiInfo.DEBUGER &&
      console.log("fetchNotificationDropDownList Response", response);

    displayMessageAndDispatchAction(
      undefined,
      response,
      dispatch,
      getNotificationDropDownList,
      undefined,
      response.data.data.output,
      undefined,
      prevHistory
    );

    // if (response.data.status === 200) {
    //   const res = response.data.data.output;
    //   // res.unshift({ id: 0, notificationType: 'All' });
    //   dispatch(getNotificationDropDownList(response.data.data.output));
    // } else {
    //   dispatch(getNotificationDropDownList([]));
    //   message.error(
    //     <span>
    //       {response.data.message}
    //       <Icon
    //         type="close"
    //         className="closebtn"
    //         onClick={() => message.destroy && message.destroy()}
    //       />
    //     </span>,
    //     0
    //   );
    // }
  });
};

export const postNotification = data => dispatch => {
  message
    .loading(ApiInfo.ApiResponseMessages.postData, 20)
    .then(() => message.error(ApiInfo.ApiResponseMessages.error));
  ApiInfo.DEBUGER && console.log(data);
  ApiInfo.DEBUGER && console.log(" data got to  postNotification Data", {
    notificationType: [data.Notification_Type],
    to: data.to,
    cc: data.Cc || ""
  });
  const prevHistory = window.location.pathname;

  axios({
    method: "post",
    url: ApiInfo.APIPORT + "/api/v2/notification",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: {
      notificationType: data.Notification_Type,
      to: data.to,
      cc: data.Cc || ""
    }
  })
    .then(response => {
      ApiInfo.DEBUGER && console.log(" postNotification Response", response);
      message.loading();

      displayMessageAndDispatchAction(
        ApiInfo.ApiResponseMessages.updated,
        response,
        dispatch,
        fetchNotification,
        undefined,
        undefined,
        undefined,
        prevHistory
      );

      // response.data.status === 200
      //   ? message.success(ApiInfo.ApiResponseMessages.updated)
      //   : message.error(
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
      // dispatch(fetchNotification());
    })
    .catch(error => {
      ApiInfo.DEBUGER && console.log("postSSOSetting error", error);
    });
};
export const editNotification = data => dispatch => {
  message
    .loading(ApiInfo.ApiResponseMessages.postData, 20)
    .then(() => message.error(ApiInfo.ApiResponseMessages.error));
  ApiInfo.DEBUGER && console.log(" data got to  editNotification Data", {
    notificationType: [data.notificationType],
    to: data.to,
    cc: data.Cc || ""
  });
  const prevHistory = window.location.pathname;

  axios({
    method: "post",
    url: ApiInfo.APIPORT + "/api/v2/notification",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: {
      notificationType: [data.notificationType],
      to: data.to,
      cc: data.Cc || []
    }
  })
    .then(response => {
      ApiInfo.DEBUGER && console.log(" editNotification Response", response);
      message.destroy && message.destroy();

      displayMessageAndDispatchAction(
        ApiInfo.ApiResponseMessages.updated,
        response,
        dispatch,
        fetchNotification,
        undefined,
        undefined,
        undefined,
        prevHistory
      );

      // response.data.status === 200
      //   ? message.success(ApiInfo.ApiResponseMessages.updated)
      //   : message.error(
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
      // dispatch(fetchNotification());
    })
    .catch(error => {
      ApiInfo.DEBUGER && console.log("postSSOSetting error", error);
    });
};
export const deleteNotification = data => dispatch => {
  message
    .loading(ApiInfo.ApiResponseMessages.deletingData, 20)
    .then(() => message.error(ApiInfo.ApiResponseMessages.error));
  ApiInfo.DEBUGER && console.log(" data got to  deleteNotification Data", data);
  const prevHistory = window.location.pathname;

  if (data && Array.isArray(data)) {
    axios({
      method: "delete",
      url: ApiInfo.APIPORT + "/api/v2/notification",
      headers: {
        "api-token": ApiInfo.APITOKEN,
        "Content-Type": "application/json",
        "x-channel": ApiInfo.APICHANNEL
      },
      data: { notificationType: [data.map(val => val.id)] }
    })
      .then(response => {
        ApiInfo.DEBUGER &&
          console.log(" deleteNotification Response", response);
        message.destroy && message.destroy();
        if (response.data && response.data.status === 200) {
          resetSelectedRecords && dispatch(resetSelectedRecords())
        }
        displayMessageAndDispatchAction(
          ApiInfo.ApiResponseMessages.deleted,
          response,
          dispatch,
          fetchNotification,
          undefined,
          undefined,
          undefined,
          prevHistory
        );

        // response.data.status === 200
        //   ? message.success(ApiInfo.ApiResponseMessages.deleted)
        //   : message.error(
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
        // dispatch(fetchNotification());
      })
      .catch(error => {
        ApiInfo.DEBUGER && console.log("postSSOSetting error", error);
      });
  } else {
    axios({
      method: "delete",
      url: ApiInfo.APIPORT + "/api/v2/notification",
      headers: {
        "api-token": ApiInfo.APITOKEN,
        "Content-Type": "application/json",
        "x-channel": ApiInfo.APICHANNEL
      },
      data: { notificationType: [data.id] }
    })
      .then(response => {
        ApiInfo.DEBUGER &&
          console.log(" deleteNotification Response", response);
        message.destroy && message.destroy();

        displayMessageAndDispatchAction(
          ApiInfo.ApiResponseMessages.deleted,
          response,
          dispatch,
          fetchNotification,
          undefined,
          undefined,
          undefined,
          prevHistory
        );

        // response.data.status === 200
        //   ? message.success(ApiInfo.ApiResponseMessages.deleted)
        //   : message.error(response.data.message);
        // dispatch(fetchNotification());
      })
      .catch(error => {
        ApiInfo.DEBUGER && console.log("postSSOSetting error", error);
      });
  }
};
