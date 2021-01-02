import * as ApiInfo from "../../../APIConfig/ApiParameters";
import axios from "axios";

import {
  GET_HISTORICDOMAIN,
  GET_ARCHIVEDUSERLIST
} from "../../Types/HistoricDomainTypes/HistoricDomainTypes";

import { message } from "antd";
import { displayMessageAndDispatchAction } from "../utils";
import { resetSelectedRecords } from "../updateSelectedRecordsAction/updateSelectedRecordsAction";
message.config({
  top: 10,
  duration: 5,
  maxCount: 1
});

export const getArchivedUserlist = archiveduserlist => {
  return {
    type: GET_ARCHIVEDUSERLIST,
    payload: {
      archiveduserlist: archiveduserlist
    }
  };
};
export const getHistoricDomain = historicdomain => {
  return {
    type: GET_HISTORICDOMAIN,
    payload: {
      historicdomain: historicdomain
    }
  };
};

export const fetchArchivedUserList = noMessage => dispatch => {
  !noMessage &&
    message
      .loading(ApiInfo.ApiResponseMessages.getData, 100)
      .then(() => message.error(ApiInfo.ApiResponseMessages.error));
      const prevHistory = window.location.pathname;

  axios({
    method: "get",
    url: ApiInfo.APIPORT + "/api/v2/policies/archivedUserList",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    }
  })
    .then(response => {
      ApiInfo.DEBUGER &&
        console.log("fetchArchivedUserList  Response", response);
      message.destroy && message.destroy();

      displayMessageAndDispatchAction(
        undefined,
        response,
        dispatch,
        getArchivedUserlist,
        undefined,
        response.data.data.output,
        undefined,
        prevHistory
      );

      //   if (response.data.status === 200) {
      //     dispatch(getArchivedUserlist(response.data.data.output));
      //   } else {
      //     dispatch(getArchivedUserlist([]));
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
      ApiInfo.DEBUGER && console.log("fetchArchivedUserList error", error);
      dispatch(getArchivedUserlist([]));
    });
};
export const fetchHistoricDomain = () => dispatch => {
  // !noMessage && message.loading("Fetching Configuration", 100)
  // .then(() => message.error(ApiInfo.ApiResponseMessages.error))
  const prevHistory = window.location.pathname;

  axios({
    method: "get",
    url: ApiInfo.APIPORT + "/api/v2/configuration/historicDomains",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    }
  })
    .then(response => {
      ApiInfo.DEBUGER && console.log("fetchHistoricDomain response", response);
      // message.destroy && message.destroy()
      // response.data.status === 200 ? message.success(response.data.message) :  message.error(<span>{response.data.message}<Icon type="close" className="closebtn" onClick={() => message.destroy && message.destroy()} /></span>, 0)
      displayMessageAndDispatchAction(
        undefined,
        response,
        dispatch,
        getHistoricDomain,
        undefined,
        response.data.data.output,
        undefined,
        prevHistory
      );

      //   if (response.data.status === 200) {
      //     dispatch(getHistoricDomain(response.data.data.output));
      //   } else {
      //     dispatch(getHistoricDomain([]));
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
      dispatch(getHistoricDomain([]));
      ApiInfo.DEBUGER &&  console.log("fetchHistoricDomain error", error);
    });
};

export const postHistoricDomain = data => dispatch => {
  message
    .loading(ApiInfo.ApiResponseMessages.postData, 20)
    .then(() => message.error(ApiInfo.ApiResponseMessages.error));
  ApiInfo.DEBUGER && console.log("post Historic Domain data", data);
  const prevHistory = window.location.pathname;

  axios({
    method: "post",
    url: ApiInfo.APIPORT + "/api/v2/configuration/historicDomains/add",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: {
      oldDomainName: data.Old_Domain_Name,
      description: data.Old_Domain_Description || "",
      Granted_MailBoxes: data.Granted_Mailboxes
    }
  })
    .then(response => {
      ApiInfo.DEBUGER && console.log("postHistoricDomain Response", response);
      message.destroy && message.destroy();

      displayMessageAndDispatchAction(
        ApiInfo.ApiResponseMessages.updated,
        response,
        dispatch,
        fetchHistoricDomain,
        undefined,
        undefined,
        undefined,
        prevHistory
      );

      //   response.data.status === 200
      //     ? message.success(ApiInfo.ApiResponseMessages.updated)
      //     : message.error(
      //         <span>
      //           {response.data.message}
      //           <Icon
      //             type="close"
      //             className="closebtn"
      //             onClick={() => message.destroy && message.destroy()}
      //           />
      //         </span>,
      //         0
      //       );
      //   dispatch(fetchHistoricDomain());
    })
    .catch(error => {
      ApiInfo.DEBUGER && console.log("postHistoricDomain error", error);
    });
};
export const editHistoricDomain = data => dispatch => {
  message
    .loading(ApiInfo.ApiResponseMessages.postData, 20)
    .then(() => message.error(ApiInfo.ApiResponseMessages.error));
  ApiInfo.DEBUGER && console.log("edit historic Domain Data", data);
  const prevHistory = window.location.pathname;

  axios({
    method: "post",
    url: ApiInfo.APIPORT + "/api/v2/configuration/historicDomains/update",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: {
      oldDomainId: [data.oldDomainId],
      oldDomainName: data.Old_Domain_Name,
      description: data.Old_Domain_Description,
      Granted_MailBoxes:
        data.Granted_Mailboxes === undefined ? [] : data.Granted_Mailboxes
    }
  })
    .then(response => {
      ApiInfo.DEBUGER &&
        console.log("Edit Historic Domain  Response", response);
      message.destroy && message.destroy();

      displayMessageAndDispatchAction(
        ApiInfo.ApiResponseMessages.updated,
        response,
        dispatch,
        fetchHistoricDomain,
        undefined,
        undefined,
        undefined,
        prevHistory
      );

    //   if (response.data.status === 200) {
    //     message.success(ApiInfo.ApiResponseMessages.updated);
    //     dispatch(fetchHistoricDomain());
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
      ApiInfo.DEBUGER && console.log("editHistoricDomain error", error);
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};

export const deleteHistoricDomain = ids => dispatch => {
  message
    .loading(ApiInfo.ApiResponseMessages.deletingData, 20)
    .then(() => message.error(ApiInfo.ApiResponseMessages.error));
  ApiInfo.DEBUGER && console.log("data got to delete historic Domain", ids);
  const prevHistory = window.location.pathname;
  
  axios({
    method: "post",
    url: ApiInfo.APIPORT + "/api/v2/configuration/historicDomains/delete",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: { oldDomainId: ids }
  })
    .then(response => {
      ApiInfo.DEBUGER &&
        console.log("deleteHistoric Domain  Response", response);
      message.destroy && message.destroy();
      if (response.data && response.data.status === 200) {
        resetSelectedRecords && dispatch(resetSelectedRecords())
      }
       displayMessageAndDispatchAction(
         ApiInfo.ApiResponseMessages.deleted,
         response,
         dispatch,
         fetchHistoricDomain,
         undefined,
         undefined,
         undefined,
         prevHistory
       );

    //   if (response.data.status === 200) {
    //     message.success(ApiInfo.ApiResponseMessages.deleted);
    //     dispatch(fetchHistoricDomain());
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
      ApiInfo.DEBUGER && console.log("deleteHistoricDomain error", error);
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};
