import React from "react";
import * as ApiInfo from "../../../APIConfig/ApiParameters";
import axios from "axios";
import {
  GET_EXPORTDROPDOWN,
  GET_EXPORTDOWNLOADLINK
} from "../../Types/ExportTypes/ExportTypes";
import { message, Icon } from "antd";
import { displayMessageAndDispatchAction } from "../utils";
import { resetSelectedRecords } from "../updateSelectedRecordsAction/updateSelectedRecordsAction";
import { getAuthenticUserInfo } from '../LoginAction/LoginAction'
import GetUserRole from '../GetUserRoleAction/GetUserRoleAction'
message.config({
  top: 10,
  duration: 5,
  maxCount: 1
});

let userInfo = JSON.parse(localStorage.getItem("userInfo"));
let userId;
try {
  userId = userInfo.data.data.userInfo[0].uid;
} catch (e) {
  userId = 0;
}
export const getExpotDropDown = data => {
  return {
    type: GET_EXPORTDROPDOWN,
    payload: {
      exportDropDown: data
    }
  };
};

export const getDownloadLink = data => {
  return {
    type: GET_EXPORTDOWNLOADLINK,
    payload: {
      exportDownloadLink: data
    }
  };
};

export const fetchExports = () => dispatch => {
  const prevHistory = window.location.pathname;

  axios({
    method: "get",
    url: ApiInfo.APIPORT + `/api/v2/export/${userId || 0}`,
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    }
  })
    .then(response => {
      ApiInfo.DEBUGER && console.log("fetchExports response", response);

      displayMessageAndDispatchAction(
        undefined,
        response,
        dispatch,
        getDownloadLink,
        undefined,
        response.data.data.output,
        undefined,
        prevHistory
      );

      // if (response.data.status === 200) {
      //   dispatch(getDownloadLink(response.data.data.output));
      // } else {
      //   dispatch(getDownloadLink([]));
      //   message.error(response.data.message);
      // }
    })
    .catch(error => {
      message.error(ApiInfo.ApiResponseMessages.error);
      ApiInfo.DEBUGER && console.log("fetchExports error", error);
      getDownloadLink([]);
    });
};

export const fetchExportDropDown = noMessage => dispatch => {
  // !noMessage &&
  //   message
  //     .loading('Fetching export options', 100)
  //     .then(() => message.error('Network is slow'));
  const prevHistory = window.location.pathname;

  axios({
    method: "get",
    url: ApiInfo.APIPORT + "/api/v2/search-exports/export-type-list",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    }
  })
    .then(response => {
      ApiInfo.DEBUGER && console.log("fetchExportDropDown response", response);

      displayMessageAndDispatchAction(
        undefined,
        response,
        dispatch,
        getExpotDropDown,
        undefined,
        response.data.data.output[0].exportsType,
        undefined,
        prevHistory
      );

      // if (response.data.status === 200) {
      //   dispatch(getExpotDropDown(response.data.data.output[0].exportsType));
      // } else {
      //   dispatch(getExpotDropDown([]));
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
      // !noMessage && message.destroy && message.destroy();
    })
    .catch(error => {
      dispatch(getExpotDropDown([]));
      message.error(ApiInfo.ApiResponseMessages.error);
      ApiInfo.DEBUGER && console.log("fetchExportDropDown error", error);
    });
};
export const exportAllSmartSearchDocs = (totalResultSetSize, APIbody, updatedSearchCriteria, pageSize, searchType, smartSearchAccessToken, searchTypeTree, closeReadingPane) => dispatch => {
  console.log("exportAllSmartSearchDocs called")
  if (!totalResultSetSize || !pageSize || Number(totalResultSetSize) > Number(pageSize)) {
    message
      .loading(`Fetching All ${totalResultSetSize} Documents`, 200)
      .then(() => message.error(ApiInfo.ApiResponseMessages.error));
    let searchCriteria = { ...updatedSearchCriteria }
    searchCriteria.resultType = "docIDs";
    searchCriteria.startIndex = 0;
    searchCriteria.itemsPerPage = totalResultSetSize;
    delete searchCriteria["topN"]
    axios({
      method: "POST",
      url: "https://auraapi.nugene.ai/aura/smartSearch/resolve",
      headers: {
        "Authorization": smartSearchAccessToken,
        "Content-Type": "application/json"
      },
      data: searchCriteria && JSON.stringify(searchCriteria),
    }).then(response => {
      message.destroy();
      let docIds;
      ApiInfo.DEBUGER && console.log("smartSearch DocIds", response);
      if (response.data && response.data.resolution && response.data.resolution.docIDs) {
        docIds = response.data.resolution.docIDs.map(el => el.docID)
      }
      APIbody.docIds = docIds
      dispatch(postExportData(APIbody))
    }).catch(error => {
      console.log("error", error)
    })
  } else {
    dispatch(postExportData(APIbody))
  }
}

export const postExportData = data => dispatch => {
  ApiInfo.DEBUGER &&
    console.log("data got to postExportData", {
      fromDate: data.from || "",
      action: 1,
      toDate: data.to || "",
      employee: data.employee || [],
      filterType: data.filterType || [],
      labelType: ["_doc"],
      contentValue: data.contentValue || "",
      queryType: data.docIds && data.docIds.length ? "not" : "all",
      userId: userId,
      jobName: data.Task,
      jobDesc: data.Task,
      jobType: data.docIds && data.docIds.length ? 16 : 36,
      password: data.password || "",
      exclusion: "",
      redaction: [],
      docIds: data.docIds,
      exportType: data.Select_Export,
      caseId: ""
    });
  data.from = data.from ? data.from.format("YYYY-MM-DD") : "";
  data.to = data.to ? data.to.format("YYYY-MM-DD") : "";
  message.loading(ApiInfo.ApiResponseMessages.postData, 100).then(
    () =>
      message.error(
        <span>
          Network is slow
          <Icon
            type="close"
            className="closebtn"
            onClick={() => message.destroy && message.destroy()}
            style={{ marginLeft: 10, color: "red" }}
          />
        </span>
      ),
    0
  );
  axios({
    method: "Post",
    url: ApiInfo.APIPORT + "/api/v2/search-exports/save-exports",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: JSON.stringify({
      fromDate: data.from || "",
      action: 1,
      toDate: data.to || "",
      employee: data.employee || [],
      filterType: data.filterType || [],
      labelType: ["_doc"],
      contentValue: data.contentValue || "",
      queryType: data.docIds && data.docIds.length ? "not" : "all",
      userId: userId,
      jobName: data.Task,
      jobDesc: data.Task,
      jobType: data.docIds && data.docIds.length ? 16 : 36,
      password: data.password || "",
      exclusion: "",
      redaction: [],
      docIds: data.docIds,
      exportType: data.Select_Export,
      caseId: ""
    })
  })
    .then(async response => {
      ApiInfo.DEBUGER && console.log("postExportData response", response);
      message.destroy && message.destroy();
      if (response.data.status === 200) {
        message.success("Download from “Exports” screen");
        resetSelectedRecords && dispatch(resetSelectedRecords());
      } else if (response.data.status !== 204) {
        if (response.data && response.data.status === 401) {
          await dispatch(getAuthenticUserInfo(null))
          await dispatch(GetUserRole(null))
          if (!JSON.stringify(localStorage.getItem("userInfo")))
            window.location.pathname = '/'
        }
        message.error(
          <span>
            {response.data.message}
            <Icon
              type="close"
              className="closebtn"
              style={{ marginLeft: 10, color: "red" }}
              onClick={() => message.destroy && message.destroy()}
            />
          </span>,
          0
        );
      } else {
        message.info(

          <span>
            {response.data.message}
            <Icon
              type="close"
              style={{ marginLeft: 10, color: "red" }}
              onClick={() => message.destroy && message.destroy()}
            />
          </span>,
          0
        );
      }
      //response.data.status === 200 && dispatch(exportforward());
    })
    .catch(error => {
      ApiInfo.DEBUGER && console.log("postExportData error", error);
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};

export const postExportAdvanceSearchData = data => dispatch => {
  ApiInfo.DEBUGER &&
    console.log("data got to postExportAdvanceSearchData", data);
  data.from = data.from ? data.from.format("YYYY-MM-DD") : "";
  data.to = data.to ? data.to.format("YYYY-MM-DD") : "";
  message.loading(ApiInfo.ApiResponseMessages.postData, 100).then(
    () =>
      message.error(
        <span>
          Network is slow
          <Icon
            type="close"
            className="closebtn"
            onClick={() => message.destroy && message.destroy()}
            style={{ marginLeft: 10, color: "red" }}
          />
        </span>
      ),
    0
  );
  axios({
    method: "Post",
    url: ApiInfo.APIPORT + "/api/v2/search-exports/save-advance-exports",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: data
  })
    .then(async response => {
      ApiInfo.DEBUGER &&
        console.log("postExportAdvanceSearchData response", response);
      message.destroy && message.destroy();
      if (response.data.status === 200) {
        message.success(ApiInfo.ApiResponseMessages.exported);
        resetSelectedRecords && dispatch(resetSelectedRecords());
      } else {
        if (response.data && response.data.status === 401) {
          await dispatch(getAuthenticUserInfo(null))
          await dispatch(GetUserRole(null))
          if (!JSON.stringify(localStorage.getItem("userInfo")))
            window.location.pathname = '/'
        }
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
      //response.data.status === 200 && dispatch(exportforward());
    })
    .catch(error => {
      ApiInfo.DEBUGER &&
        console.log("postExportAdvanceSearchData error", error);
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};

export const postExportQueryBuilderData = data => dispatch => {
  ApiInfo.DEBUGER &&
    console.log("data got to postExportQueryBuilderData", data);
  message.loading(ApiInfo.ApiResponseMessages.postData, 100).then(
    () =>
      message.error(
        <span>
          Network is slow
          <Icon
            type="close"
            className="closebtn"
            onClick={() => message.destroy && message.destroy()}
            style={{ marginLeft: 10, color: "red" }}
          />
        </span>
      ),
    0
  );
  const prevHistory = window.location.pathname;

  axios({
    method: "Post",
    url: ApiInfo.APIPORT + "/api/v2/search-exports/save-querybuilder-exports",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: data
  })
    .then(response => {
      ApiInfo.DEBUGER &&
        console.log("postExportQueryBuilderData response", response);
      message.destroy && message.destroy();
      if (response.data.status === 200) {
        resetSelectedRecords && dispatch(resetSelectedRecords());
      }
      displayMessageAndDispatchAction(
        ApiInfo.ApiResponseMessages.exported,
        response,
        dispatch,
        undefined,
        undefined,
        undefined,
        undefined,
        prevHistory
      );

      // response.data.status === 200
      //   ? message.success(ApiInfo.ApiResponseMessages.exported)
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
      //response.data.status === 200 && dispatch(exportforward());
    })
    .catch(error => {
      ApiInfo.DEBUGER && console.log("postExportQueryBuilderData error", error);
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};

export const postExportLegalHoldData = APIBody => dispatch => {
  ApiInfo.DEBUGER &&
    console.log("data got to postExportLegalHoldData", {
      ...APIBody,
      fromDate: "",
      toDate: "",
      employee: [],
      filterType: [],
      labelType: ["_doc"],
      contentValue: ""
    });
  message.loading(ApiInfo.ApiResponseMessages.postData, 100).then(
    () =>
      message.error(
        <span>
          Network is slow
          <Icon
            type="close"
            className="closebtn"
            onClick={() => message.destroy && message.destroy()}
            style={{ marginLeft: 10, color: "red" }}
          />
        </span>
      ),
    0
  );
  axios({
    method: "Post",
    url: ApiInfo.APIPORT + "/api/v2/search-exports/save-exports",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: {
      ...APIBody,
      fromDate: "",
      toDate: "",
      employee: [],
      filterType: [],
      labelType: ["_doc"],
      contentValue: ""
    }
  })
    .then(async response => {
      ApiInfo.DEBUGER &&
        console.log("postExportLegalHoldData response", response);
      message.destroy && message.destroy();
      if (response.data.status === 200) {
        message.success("Successfully Exported");
        resetSelectedRecords && dispatch(resetSelectedRecords());
      } else if (response.data && response.data.status === 401) {
        await dispatch(getAuthenticUserInfo(null))
        await dispatch(GetUserRole(null))
        if (!JSON.stringify(localStorage.getItem("userInfo")))
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
      //response.data.status === 200 && dispatch(exportforward());
    })
    .catch(error => {
      ApiInfo.DEBUGER && console.log("postExportLegalHoldData error", error);
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};

export const postDownloadData = (data, index) => dispatch => {
  ApiInfo.DEBUGER &&
    console.log("data got to postDownloadData", {
      Job_ID: data.keyID,
      fileName: data.downloadLinks[index]
    });
  axios({
    method: "GET",
    url:
      ApiInfo.APIPORT +
      `/api/v2/search-exports/${data.keyID}/${data.downloadLinks[index]}`,
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    }
  })
    .then(async response => {
      if (response.data && response.data.status === 401) {
        await dispatch(getAuthenticUserInfo(null))
        await dispatch(GetUserRole(null))
        if (!JSON.stringify(localStorage.getItem("userInfo")))
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
      ApiInfo.DEBUGER && console.log("postDownloadData response", response);
      document
        .getElementById("download")
        .setAttribute(
          "href",
          ApiInfo.APIPORT +
          `/api/v2/search-exports/${data.keyID}/${data.downloadLinks[index]}`
        );
    })

    .catch(error => {
      ApiInfo.DEBUGER && console.log("postDownloadData error", error);
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};
export const exportforward = () => dispatch => {
  axios({
    method: "GET",
    url: ApiInfo.APIPORT + "/api/v2/task/exportForward"
  })
    .then(response => {
      ApiInfo.DEBUGER && console.log("exportforward response", response);
    })
    .catch(error => {
      ApiInfo.DEBUGER && console.log("exportforward error", error);
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};
