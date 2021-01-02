import {
  GET_ARCHIVEDUSERLIST,
  GET_FOLDERSYNCUSERS,
  GET_FOLDERSYNCHISTORY
} from "../../Types/PoliciesTypes/PoliciesTypes";
import axios from "axios";
import * as ApiInfo from "../../../APIConfig/ApiParameters";
import { message } from "antd";
import { displayMessageAndDispatchAction } from "../utils";
message.config({
  top: 10,
  duration: 5,
  maxCount: 1
});

export const ArchivedUser = archivedusers => {
  return {
    type: GET_ARCHIVEDUSERLIST,
    payload: {
      archivedusers: archivedusers
    }
  };
};
export const FolderSyncUser = foldersyncusers => {
  return {
    type: GET_FOLDERSYNCUSERS,
    payload: {
      foldersyncusers: foldersyncusers
    }
  };
};
export const FolderSyncHistory = foldersynchistory => {
  return {
    type: GET_FOLDERSYNCHISTORY,
    payload: {
      foldersynchistory: foldersynchistory
    }
  };
};

export const fetchArchivedUserList = () => dispatch => {
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
      //ApiInfo.DEBUGER && console.log("fetch Archived UserList response",response)

      displayMessageAndDispatchAction(
        undefined,
        response,
        dispatch,
        ArchivedUser,
        undefined,
        response.data.data.output,
        undefined,
        prevHistory
      );

      //   if (response.data.status === 200) {
      //     dispatch(ArchivedUser(response.data.data.output));
      //   } else {
      //     dispatch(ArchivedUser([]));
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
      dispatch(ArchivedUser([]));
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};

export const fetchFolderSyncUserList = () => dispatch => {
  const prevHistory = window.location.pathname;

  axios({
    method: "get",
    url: ApiInfo.APIPORT + "/api/v2/policies/folderSyncUsers",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    }
  })
    .then(response => {
      ApiInfo.DEBUGER && console.log("fetchFolderSyncUserList response", response);

      displayMessageAndDispatchAction(
        undefined,
        response,
        dispatch,
        FolderSyncUser,
        undefined,
        response.data.data.output,
        undefined,
        prevHistory
      );

      //   if (response.data.status === 200) {
      //     dispatch(FolderSyncUser(response.data.data.output));
      //   } else {
      //     dispatch(FolderSyncUser([]));
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
      ApiInfo.DEBUGER && console.log("fetchFolderSyncUserList error", error);
      dispatch(FolderSyncUser([]));
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};
export const fetchFolderSyncHistory = () => dispatch => {
  const prevHistory = window.location.pathname;

  axios({
    method: "get",
    url: ApiInfo.APIPORT + "/api/v2/policies/folderSyncHistory",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    }
  })
    .then(response => {
      ApiInfo.DEBUGER && console.log("fetchFolderSyncHistory response", response);

      displayMessageAndDispatchAction(
        undefined,
        response,
        dispatch,
        FolderSyncHistory,
        undefined,
        response.data.data.output,
        undefined,
        prevHistory
      );

      //   if (response.data.status === 200) {
      //     dispatch(FolderSyncHistory(response.data.data.output));
      //   } else {
      //     dispatch(FolderSyncHistory([]));
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
      ApiInfo.DEBUGER && console.log("fetchFolderSyncHistory error", error);
      dispatch(FolderSyncHistory([]));
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};
export const postFolderSyncHistoryUpdate = data => dispatch => {
  message
    .loading(ApiInfo.ApiResponseMessages.postData, 20)
    .then(() => message.error(ApiInfo.ApiResponseMessages.error));
  ApiInfo.DEBUGER &&
    ApiInfo.DEBUGER && console.log("data got to postFolderSyncHistoryUpdate", data && data.join());
  const prevHistory = window.location.pathname;
  
  axios({
    method: "post",
    url: ApiInfo.APIPORT + "/api/v2/policies/insertFolderSyncUsers",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: { UID: data && Array.isArray(data) && data.map(val => val) }
  })
    .then(response => {
      ApiInfo.DEBUGER &&
        ApiInfo.DEBUGER && console.log("postFolderSyncHistoryUpdate response", response);
      message.destroy && message.destroy();

      displayMessageAndDispatchAction(
        ApiInfo.ApiResponseMessages.updated,
        response,
        dispatch,
        fetchFolderSyncUserList,
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
      //   dispatch(fetchFolderSyncUserList());

    })
    .catch(error => {
      ApiInfo.DEBUGER && console.log("postFolderSyncHistoryUpdate error", error);
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};
