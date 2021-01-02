import * as ApiInfo from "../../../APIConfig/ApiParameters";
import axios from "axios";
// import store from "../../store";
import {
  GET_EMAILSERVER,
  GET_EMAILSERVEREDITDETAILS,
  GET_EMAILSERVERCOMBO
} from "../../Types/EmailServerTypes/EmailServerTypes";
import { message } from "antd";
import { displayMessageAndDispatchAction } from "../utils";
import { resetSelectedRecords } from "../updateSelectedRecordsAction/updateSelectedRecordsAction";
message.config({
  top: 10,
  duration: 5,
  maxCount: 1
});
export const getEmailServer = (emailserver) => {
  return {
    type: GET_EMAILSERVER,
    payload: {
      emailserver: emailserver
    }
  }
};
export const getEmailServerDetails = emailservereditdetails => {
  return {
    type: GET_EMAILSERVEREDITDETAILS,
    payload: {
      emailservereditdetails: emailservereditdetails
    }
  };
};
export const getEmailServerCombo = emailservercombo => {
  return {
    type: GET_EMAILSERVERCOMBO,
    payload: {
      emailservercombo: emailservercombo
    }
  };
};

export const fetchEmailServer = noMessage => (dispatch, getState) => {
  const prevHistory = window.location.pathname;

  axios({
    method: "get",
    url: ApiInfo.APIPORT + "/api/v2/configuration/mailserver",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    }
  })
    .then(response => {
      ApiInfo.DEBUGER && console.log("fetchEmailServer Response", response);
      // message.destroy && message.destroy()
      // response.data.status === 200 ? message.success(response.data.message) :  message.error(<span>{response.data.message}<Icon type="close" className="closebtn" onClick={() => message.destroy && message.destroy()} /></span>, 0)
      displayMessageAndDispatchAction(
        undefined,
        response,
        dispatch,
        getEmailServer,
        undefined,
        response.data.data.output,
        undefined,
        prevHistory
      );

      //   if (response.data.status === 200) {
      //     dispatch(getEmailServer(response.data.data.output));
      //   } else {
      //     dispatch(getEmailServer([]));
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
      message.error(ApiInfo.ApiResponseMessages.error);
      ApiInfo.DEBUGER && console.log("fetchEmailServer error", error);
    });
};
export const fetchEmailServerCombo = noMessage => dispatch => {
  // !noMessage && message.loading("Fetching Configuration", 100)
  //     .then(() => message.error(ApiInfo.ApiResponseMessages.error))
  const prevHistory = window.location.pathname;
  getEmailServerCombo(null);

  axios({
    method: "get",
    url: ApiInfo.APIPORT + "/api/v2/configuration/mailserver/combo",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    }
  })
    .then(response => {
      ApiInfo.DEBUGER &&
        console.log("fetchEmailServerCombo response", response);
      message.destroy && message.destroy();
      // response.data.status === 200 ? message.success("Fetched") :  message.error(<span>{response.data.message}<Icon type="close" className="closebtn" onClick={() => message.destroy && message.destroy()} /></span>, 0)
      displayMessageAndDispatchAction(
        undefined,
        response,
        dispatch,
        getEmailServerCombo,
        undefined,
        response.data.data.output[0],
        undefined,
        prevHistory
      );

      //   if (response.data.status === 200) {
      //     dispatch(getEmailServerCombo(response.data.data.output[0]));
      //   } else {
      //     dispatch(getEmailServerCombo([]));
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
    .catch(error => { });
};
export const fetchEmailServerDetails = (data, noMessage) => dispatch => {
  // !noMessage && message.loading("Fetching Configuration", 100)
  //     .then(() => message.error(ApiInfo.ApiResponseMessages.error))
  ApiInfo.DEBUGER && console.log("data got to fetchEmailServerDetails", data);
  const prevHistory = window.location.pathname;

  if (data) {
    axios({
      method: "get",
      url:
        ApiInfo.APIPORT +
        "/api/v2/configuration/mailserver/" +
        data.emailServerId,
      headers: {
        "api-token": ApiInfo.APITOKEN,
        "Content-Type": "application/json",
        "x-channel": ApiInfo.APICHANNEL
      }
    })
      .then(response => {
        ApiInfo.DEBUGER &&
          console.log("fetchEmailServerDetails Response ", response);
        message.destroy && message.destroy();
        // response.data.status === 200 ? message.success("Fecthed Email Server Details By Email Server ID ") :  message.error(<span>{response.data.message}<Icon type="close" className="closebtn" onClick={() => message.destroy && message.destroy()} /></span>, 0)
        displayMessageAndDispatchAction(
          undefined,
          response,
          dispatch,
          getEmailServerDetails,
          undefined,
          response.data.data.output,
          undefined,
          prevHistory
        );

        // if (response.data.status === 200) {
        //   dispatch(getEmailServerDetails(response.data.data.output));
        // } else {
        //   dispatch(getEmailServerDetails([]));
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
        message.destroy && message.destroy();
        message.error(ApiInfo.ApiResponseMessages.error);
        ApiInfo.DEBUGER && console.log("fetchEmailServerDetails error", error);
      });
  } else {
    dispatch(getEmailServerDetails([]));
  }
};

export const updateEmailServerStatus = data => dispatch => {
  message
    .loading(ApiInfo.ApiResponseMessages.postData, 20)
    .then(() => message.error(ApiInfo.ApiResponseMessages.error));
  ApiInfo.DEBUGER && console.log("data got to updateEmailServerStatus", data);
  const prevHistory = window.location.pathname;

  axios({
    method: "post",
    url: ApiInfo.APIPORT + "/api/v2/configuration/mailserver/update_status",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: {
      IDs: data.map(val => val.emailServerId),
      status: data.status.toString()
    }
  })
    .then(response => {
      ApiInfo.DEBUGER &&
        console.log("updateEmailServerStatus Response", response);
      message.destroy && message.destroy();
      if (response.data && response.data.status === 200) {
        resetSelectedRecords && dispatch(resetSelectedRecords())
      }
      displayMessageAndDispatchAction(
        ApiInfo.ApiResponseMessages.updated,
        response,
        dispatch,
        fetchEmailServer,
        undefined,
        undefined,
        undefined,
        prevHistory
      );

      //   if (response.data.status === 200) {
      //     message.success(ApiInfo.ApiResponseMessages.updated);
      //     dispatch(fetchEmailServer());
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
      ApiInfo.DEBUGER && console.log("updateEmailServerStatus error", error);
    });
};
export const postEmailServerData = data => dispatch => {
  message
    .loading(ApiInfo.ApiResponseMessages.postData, 20)
    .then(() => message.error(ApiInfo.ApiResponseMessages.error));
  let APIbody = {
    domainID: data.Domain_Id === undefined ? "" : data.Domain_Id,
    emailSever: data.Email_Server,
    exchangeVer:
      data.Exchange_Version === undefined ? "" : data.Exchange_Version,
    servicePack:
      data.Exchange_Service_Pack === undefined
        ? ""
        : data.Exchange_Service_Pack,
    journalMailName: data.Journal_Mailbox,
    journalLogon: data.Journal_Logon,
    journalPassword: data.Journal_Password,
    active: data.enable === undefined ? 0 : 1,
    frequency: data.Frequency,
    agentName: data.Email_Server,
    exludeHours: data.excludeHours ? 1 : 0,
    excludeStart:
      data.Exclude_Hours_Start_Time === undefined
        ? ""
        : data.Exclude_Hours_Start_Time,
    excludeEnd:
      data.Exclude_Hours_End_Time === undefined
        ? ""
        : data.Exclude_Hours_End_Time,
    archivePublicFolder: data.archivePublicFolder ? 1 : 0,
    publicFolderPolicy: data.public_folder_poll_Frequency || "",
    stubEnabled: data.stubPeriodPolicy ? 1 : 0,
    stubPeriod: data.Stub_Period === undefined ? "" : data.Stub_Period,
    stubOrDelete: data.stub_delete === undefined ? "" : data.stub_delete,
    stubOrDeleteOption:
      data.stub_delete_option === undefined ? "" : data.stub_delete_option,
    stubSize: data.Email_Size === undefined ? "" : data.Email_Size
  };

  // let APIbody = { "domainID": [data.Domain_Id] === undefined ? "" :  [data.Domain_Id], "emailSever": data.Email_Server, "exchangeVer": data.Exchange_Version === undefined ? "" : data.Exchange_Version, "servicePack": data.Exchange_Service_Pack === undefined ? "" : data.Exchange_Service_Pack, "journalMailName": data.Journal_Mailbox, "journalLogon": data.Journal_Logon, "journalPassword": data.Journal_Password, "active": data.enable ? "1" : "0", "frequency": data.Frequency, "agentName": data.Exchange_Service_Pack, "exludeHours": data.excludeHours ? "1" : "0", "excludeStart": data.Exclude_Hours_Start_Time === undefined ? "" : data.Exclude_Hours_Start_Time, "excludeEnd": data.Exclude_Hours_End_Time === undefined ? "" : data.Exclude_Hours_End_Time, "archivePublicFolder": data.archivePublicFolder ? "1" : "0", "publicFolderPolicy": data.public_folder_poll_Frequency || "", "stubEnabled": data.stubPeriodPolicy ? "1" : "0", "stubPeriod": data.Stub_Period === undefined ? "" : data.Stub_Period || "", "stubOrDelete": data.stub_delete === undefined ? "" : data.stub_delete || "", "stubOrDeleteOption": data.stub_delete_option === undefined ? "" : data.stub_delete_option , "stubSize": data.Email_Size === undefined ? "" : data.Email_Size }
  ApiInfo.DEBUGER && console.log("data got to postEmailServerData", APIbody);
  const prevHistory = window.location.pathname;

  axios({
    method: "post",
    url: ApiInfo.APIPORT + "/api/v2/configuration/mailserver/add",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: APIbody
  })
    .then(response => {
      ApiInfo.DEBUGER && console.log("postEmailServerData Response", response);
      message.destroy && message.destroy();

      displayMessageAndDispatchAction(
        ApiInfo.ApiResponseMessages.updated,
        response,
        dispatch,
        fetchEmailServer,
        undefined,
        undefined,
        undefined,
        prevHistory
      );
      //   if (response.data.status === 200) {
      //     message.success(ApiInfo.ApiResponseMessages.updated);
      //     dispatch(fetchEmailServer());
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
      message.destroy && message.destroy();
      ApiInfo.DEBUGER && console.log("postEmailServerData error", error);
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};
export const editEmailServerData = data => dispatch => {
  message
    .loading(ApiInfo.ApiResponseMessages.postData, 20)
    .then(() => message.error(ApiInfo.ApiResponseMessages.error));
  ApiInfo.DEBUGER && console.log("data got to editEmailServerData", {
    emailServerId: [data.emailServerId],
    domainID: [data.Domain_Id],
    emailSever: data.Email_Server,
    exchangeVer:
      data.Exchange_Version === undefined ? "" : data.Exchange_Version,
    servicePack:
      data.Exchange_Service_Pack === undefined
        ? ""
        : data.Exchange_Service_Pack,
    journalMailName: data.Journal_Mailbox,
    journalLogon: data.Journal_Logon,
    journalPassword: data.Journal_Password,
    active: data.enable ? 1 : 0,
    frequency: data.Frequency,
    agentName: data.Email_Server,
    exludeHours: data.excludeHours ? 1 : 0,
    excludeStart:
      data.Exclude_Hours_Start_Time === undefined
        ? ""
        : data.Exclude_Hours_Start_Time,
    excludeEnd:
      data.Exclude_Hours_End_Time === undefined
        ? ""
        : data.Exclude_Hours_End_Time,
    archivePublicFolder: data.archivePublicFolder ? 1 : 0,
    publicFolderPolicy: data.public_folder_poll_Frequency || "",
    stubEnabled: data.stubPeriodPolicy ? 1 : 0,
    stubPeriod: data.Stub_Period === undefined ? "" : data.Stub_Period || "",
    stubOrDelete: data.stub_delete === undefined ? "" : data.stub_delete || "",
    stubOrDeleteOption:
      data.stub_delete_option === undefined ? "" : data.stub_delete_option,
    stubSize: data.Email_Size === undefined ? "" : data.Email_Size
  });
  const prevHistory = window.location.pathname;

  axios({
    method: "post",
    url: ApiInfo.APIPORT + "/api/v2/configuration/mailserver/update",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: {
      emailServerId: [data.emailServerId],
      domainID: [data.Domain_Id],
      emailSever: data.Email_Server,
      exchangeVer:
        data.Exchange_Version === undefined ? "" : data.Exchange_Version,
      servicePack:
        data.Exchange_Service_Pack === undefined
          ? ""
          : data.Exchange_Service_Pack,
      journalMailName: data.Journal_Mailbox,
      journalLogon: data.Journal_Logon,
      journalPassword: data.Journal_Password,
      active: data.enable ? 1 : 0,
      frequency: data.Frequency,
      agentName: data.Email_Server,
      exludeHours: data.excludeHours ? 1 : 0,
      excludeStart:
        data.Exclude_Hours_Start_Time === undefined
          ? ""
          : data.Exclude_Hours_Start_Time,
      excludeEnd:
        data.Exclude_Hours_End_Time === undefined
          ? ""
          : data.Exclude_Hours_End_Time,
      archivePublicFolder: data.archivePublicFolder ? 1 : 0,
      publicFolderPolicy: data.public_folder_poll_Frequency || "",
      stubEnabled: data.stubPeriodPolicy ? 1 : 0,
      stubPeriod: data.Stub_Period === undefined ? "" : data.Stub_Period || "",
      stubOrDelete:
        data.stub_delete === undefined ? "" : data.stub_delete || "",
      stubOrDeleteOption:
        data.stub_delete_option === undefined ? "" : data.stub_delete_option,
      stubSize: data.Email_Size === undefined ? "" : data.Email_Size
    }
  })
    .then(response => {
      ApiInfo.DEBUGER && console.log("editEmailServerData Response", response);
      message.destroy && message.destroy();

      displayMessageAndDispatchAction(
        ApiInfo.ApiResponseMessages.updated,
        response,
        dispatch,
        fetchEmailServer,
        undefined,
        undefined,
        undefined,
        prevHistory
      );
      //   if (response.data.status === 200) {
      //     message.success(ApiInfo.ApiResponseMessages.updated);
      //     dispatch(fetchEmailServer());
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
    .catch(error => { });
};
