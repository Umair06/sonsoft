import * as ApiInfo from "../../../APIConfig/ApiParameters";
import axios from "axios";

import { GET_MAILBOXACCESS, GET_MAILBOXACCESS_DELETED_USERS } from "../../Types/SecurityTypes/SecurityTypes";

import { message } from "antd";
import { displayMessageAndDispatchAction } from "../utils";
message.config({
  top: 10,
  duration: 5,
  maxCount: 1
});

export const getMailboxAccess = mailboxaccess => {
  return {
    type: GET_MAILBOXACCESS,
    payload: {
      mailboxaccess: mailboxaccess
    }
  };
};

export const fetchMailboxAccess = () => dispatch => {
  const prevHistory = window.location.pathname;

  axios({
    method: "Get",
    url: ApiInfo.APIPORT + "/api/v2/security/mailboxaccess",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    }
  })
    .then(response => {
      ApiInfo.DEBUGER && console.log("fetchMailboxAccess Response", response);
      // response.data.status === 200 ? message.success(response.data.message) :  message.error(<span>{response.data.message}<Icon type="close" className="closebtn" onClick={() => message.destroy && message.destroy()} /></span>, 0)
      displayMessageAndDispatchAction(
        undefined,
        response,
        dispatch,
        getMailboxAccess,
        undefined,
        response.data.data.output,
        undefined,
        prevHistory
      );
      //   if (response.data.status === 200) {
      //     dispatch(getMailboxAccess(response.data.data.output));
      //   } else {
      //     dispatch(getMailboxAccess([]));
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
      ApiInfo.DEBUGER && console.log("fetchMailboxAccess error", error);
      dispatch(getMailboxAccess([]));
    });
};

export const postMailboxAccess = data => dispatch => {
  message
    .loading(ApiInfo.ApiResponseMessages.postData, 20)
    .then(() => message.error(ApiInfo.ApiResponseMessages.error));
  ApiInfo.DEBUGER && console.log(
    " data got to postMailboxAccess",
    JSON.stringify({
      oUser_LogonId: [data.userId],
      Edit: data.Edit,
      Granted_MailBoxes: data.Granted_Mailboxes || []
    })
  );
  const prevHistory = window.location.pathname;

  axios({
    method: "post",
    url: ApiInfo.APIPORT + "/api/v2/security/mailboxaccess",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: {
      oUser_LogonId: [data.userId],
      Edit: data.Edit,
      Granted_MailBoxes: data.Granted_Mailboxes || []
    }
  })
    .then(response => {
      ApiInfo.DEBUGER && console.log("postMailboxAccess Response", response);
      message.destroy && message.destroy();

      displayMessageAndDispatchAction(
        ApiInfo.ApiResponseMessages.updated,
        response,
        dispatch,
        fetchMailboxAccess,
        undefined,
        undefined,
        undefined,
        prevHistory
      );

      //   if (response.data.status === 200) {
      //     message.success(ApiInfo.ApiResponseMessages.updated);
      //     dispatch(fetchMailboxAccess());
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
      ApiInfo.DEBUGER && console.log("postMailboxAccess error", error);
    });
};

export const deleteMailboxAccess = data => dispatch => {
  ApiInfo.DEBUGER && console.log(" data got to deleteMailboxAccess", data);
  message
    .loading(ApiInfo.ApiResponseMessages.deletingData, 20)
    .then(() => message.error(ApiInfo.ApiResponseMessages.error));
  const prevHistory = window.location.pathname;

  if (data && Array.isArray(data)) {
    axios({
      method: "delete",
      url: ApiInfo.APIPORT + "/api/v2/security/mailboxaccess",
      headers: {
        "api-token": ApiInfo.APITOKEN,
        "Content-Type": "application/json",
        "x-channel": ApiInfo.APICHANNEL
      },
      data: { oUser_Id: [data.map(val => val.mailboxId)] }
    })
      .then(response => {
        ApiInfo.DEBUGER &&
          console.log("deleteMailboxAccess Response", response);
        message.destroy && message.destroy();

        displayMessageAndDispatchAction(
          ApiInfo.ApiResponseMessages.deleted,
          response,
          dispatch,
          fetchMailboxAccess,
          undefined,
          undefined,
          undefined,
          prevHistory
        );

        // if (response.data.status === 200) {
        //   message.success(ApiInfo.ApiResponseMessages.deleted);
        //   dispatch(fetchMailboxAccess());
        // } else {
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
        ApiInfo.DEBUGER && console.log("deleteMailboxAccess error", error);
      });
  } else {
    axios({
      method: "delete",
      url: ApiInfo.APIPORT + "/api/v2/security/mailboxaccess",
      headers: {
        "api-token": ApiInfo.APITOKEN,
        "Content-Type": "application/json",
        "x-channel": ApiInfo.APICHANNEL
      },
      data: { oUser_Id: [data.mailboxId] }
    })
      .then(response => {
        ApiInfo.DEBUGER &&
          console.log("deleteMailboxAccess Response", response);

        displayMessageAndDispatchAction(
          ApiInfo.ApiResponseMessages.deleted,
          response,
          dispatch,
          fetchMailboxAccess
        );

        // if (response.data.status === 200) {
        //   message.success(ApiInfo.ApiResponseMessages.deleted);
        //   dispatch(fetchMailboxAccess());
        // } else {
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
        ApiInfo.DEBUGER && console.log("deleteMailboxAccess error", error);
      });
  }
};

export const getDeletedMailboxAccessOnReceived = deletedUsers => ({
  type: GET_MAILBOXACCESS_DELETED_USERS,
  payload: deletedUsers
})


export const getDeleltedMailboxAccess = (server, users) => dispatch => {
  ApiInfo.DEBUGER && console.log(" data got to getDeleltedMailboxAccess", server);
  axios({
    method: "post",
    url: ApiInfo.APIPORT + "/api/v2/security/mailboxaccess/deletedUsers",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: { server: server, storageGroup: "", mailboxStore: "" }
  })
    .then(response => {
      ApiInfo.DEBUGER &&
        console.log("getDeleltedMailboxAccess Response", response, users);
      // const DeletedUsers = response
      // users.push(response.data.data.output[0]);
      // console.log('users',users)
      // message.destroy && message.destroy();
      // response.data.status === 200 ? message.success(response.data.message) :  message.error(<span>{response.data.message}<Icon type="close" className="closebtn" onClick={() => message.destroy && message.destroy()} /></span>, 0)
      dispatch(getDeletedMailboxAccessOnReceived(response.data.data.output))
    })
    .catch(error => {
      ApiInfo.DEBUGER && console.log("getDeleltedMailboxAccess error", error);
    });
};
