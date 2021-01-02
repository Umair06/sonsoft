import * as ApiInfo from "../../../APIConfig/ApiParameters";

import axios from "axios";
import {
  GET_LEGAL_HOLDS,
  GET_ON_HOLD_DOCUMENTS,
  CLEAR_ON_HOLD_DOCUMENTS,
  TOTAL_ON_HOLD_DOCS,
  ON_HOLD_API_BODY_DATA
} from "../../Types/LegalHoldTypes/LegalHoldTypes";
import { message, Icon } from "antd";
import React from "react";
import {
  postSearchData,
  clearSearchedResults,
  queryBuilderSearchData,
  smartSearch,
  errorMessage,
  // fetchSimpleSearch
} from "../SimpleSearchAction/SimpleSearchAction";
import { fetchAutoLabels } from "../Policies/AutoLabelingAction";
import { postAdvancedSearch } from "../AdvancedSearchAction/AdvancedSearchAction";
import { displayMessageAndDispatchAction } from "../utils";
import { resetSelectedRecords } from "../updateSelectedRecordsAction/updateSelectedRecordsAction";
import { getAuthenticUserInfo } from '../LoginAction/LoginAction'
import GetUserRole from '../GetUserRoleAction/GetUserRoleAction'
import moment from "moment";

var CancelToken = axios.CancelToken;
let cancelGetOnHoldRequest;
let cancelApplyLegalHoldToAllDocsRequest;

message.config({
  top: 10,
  duration: 5
});
export const getOnholdDocs = data => {
  return {
    type: GET_ON_HOLD_DOCUMENTS,
    payload: {
      onHoldDocuments: data
    }
  };
};
export const totalOnHoldDocs = onHoldDataLength => {
  return {
    type: TOTAL_ON_HOLD_DOCS,
    payload: {
      onHoldDataLength
    }
  };
};

export const clearOnholdDocuments = () => {
  return {
    type: CLEAR_ON_HOLD_DOCUMENTS
  };
};

export const onHoldApiBodyData = apiBodyData => {
  return {
    type: ON_HOLD_API_BODY_DATA,
    payload: {
      apiBodyData
    }
  };
};

export const fetchLegalHolds = () => dispatch => {
  axios
    .get(ApiInfo.APIPORT + "/api/v2/legalhold/caselist", {
      headers: {
        "api-token": ApiInfo.APITOKEN,
        "Content-Type": "application/json; charset=utf-8",
        Accept: "application/json",
        "x-channel": ApiInfo.APICHANNEL
      }
    })
    .then(async response => {
      ApiInfo.DEBUGER && console.log("Get Legal holds response", response);
      if (response.data.status === 200) {
        dispatch({
          type: GET_LEGAL_HOLDS,
          payload: {
            legalHolds: response.data.data.output
          }
        });
        // dispatch(fetchSimpleSearch("all"))
      } else {
        if (response.data && response.data.status === 401) {
          await dispatch(getAuthenticUserInfo(null))
          await dispatch(GetUserRole(null))
          if (!JSON.stringify(localStorage.getItem("userInfo")))
            window.location.pathname = '/'
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
          }
        }
        dispatch({
          type: GET_LEGAL_HOLDS,
          payload: {
            legalHolds: []
          }
        });
        if (response.data.status !== 204) {
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
      }
    })
    .catch(error => {
      message.error(ApiInfo.ApiResponseMessages.error);
      dispatch({
        type: GET_LEGAL_HOLDS,
        payload: {
          legalHolds: []
        }
      });
      ApiInfo.DEBUGER && console.log("fetchLegalHolds error", error);
    });
};
export const postLegalHolds = (data, noMessage) => dispatch => {
  !noMessage &&
    message
      .loading(ApiInfo.ApiResponseMessages.postData, 200)

      .then(() => message.error(ApiInfo.ApiResponseMessages.error));
  ApiInfo.DEBUGER && console.log("data got to postLegalHolds", {
    attorneyUserId: 1,
    caseName: data.caseName,
    caseDesc: data.Description || "",
    legal_hole_type_Id: 1,
    legal_hole_team_Id: 1
  });

  axios({
    method: "post",
    url: ApiInfo.APIPORT + "/api/v2/legalhold/add_case",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: {
      attorneyUserId: 1,
      caseName: data.caseName,
      caseDesc: data.Description || "",
      legal_hole_type_Id: 1,
      legal_hole_team_Id: 1
    }
  })
    .then(response => {
      ApiInfo.DEBUGER && console.log("Post Legal Hold response", response);
      displayMessageAndDispatchAction(
        ApiInfo.ApiResponseMessages.updated,
        response,
        dispatch,
        fetchLegalHolds,
        undefined,
        undefined
      );
    })
    .catch(error => {
      message.error(ApiInfo.ApiResponseMessages.error);
      ApiInfo.DEBUGER && console.log("postLegalHolds error", error);
      // dispatch(errorMessage())
    });
};
export const editLegalHolds = data => dispatch => {
  message
    .loading(ApiInfo.ApiResponseMessages.postData, 200)
    .then(() => message.error(ApiInfo.ApiResponseMessages.error));
  ApiInfo.DEBUGER && console.log("data got to editLegalHolds", data);
  axios({
    method: "put",
    url: ApiInfo.APIPORT + "/api/v2/legalhold/update_case",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: {
      caseId: data.CASE_ID,
      attorneyUserId: 1,
      caseName: data.caseName,
      caseDesc: data.Description,
      legal_hole_type_Id: 1,
      legal_hole_team_Id: 1
    }
  })
    .then(response => {
      ApiInfo.DEBUGER && console.log("Post Legal Hold response", response);

      //Info About this function ===> This function check the status of response and dispatch the actions with some of validation.
      displayMessageAndDispatchAction(
        ApiInfo.ApiResponseMessages.updated,
        response,
        dispatch,
        fetchLegalHolds,
        undefined,
        undefined,
        undefined
      );
    })
    .catch(error => {
      message.error(ApiInfo.ApiResponseMessages.error);
      ApiInfo.DEBUGER && console.log("editLegalHolds error", error);
      // dispatch(errorMessage())
    });
};

export const ApplyLegalHoldToAllSmartSearchDocs = (totalResultSetSize, APIbody, updatedSearchCriteria, case_info, pageSize, searchType, smartSearchAccessToken, searchTypeTree, closeReadingPane) => dispatch => {
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
      dispatch(applyLegalHold(APIbody, updatedSearchCriteria, case_info, pageSize, searchType, smartSearchAccessToken, searchTypeTree, closeReadingPane))
    }).catch(error => {
      console.log("error", error)
    })
  } else{
    dispatch(applyLegalHold(APIbody, updatedSearchCriteria, case_info, pageSize, searchType, smartSearchAccessToken, searchTypeTree, closeReadingPane))
  }
}


export const applyLegalHold = (
  APIbody,
  updatedSearchCriteria,
  case_info,
  pageSize,
  searchType,
  smartSearchAccessToken,
  searchTypeTree,
  closeReadingPane
) => dispatch => {
  closeReadingPane && typeof (closeReadingPane) === "function" && closeReadingPane()
  message
    .loading(ApiInfo.ApiResponseMessages.postData, 200)
    .then(() => message.error(ApiInfo.ApiResponseMessages.error));
  ApiInfo.DEBUGER && console.log("data got to applyLegalHold", APIbody, "case_info", case_info, '===', updatedSearchCriteria);
  axios({
    method: "put",
    url: ApiInfo.APIPORT + "/api/v2/legalhold/merge_case",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: APIbody
  })
    .then(async response => {
      ApiInfo.DEBUGER && console.log("applyLegalHold response", response);
      if (response.data.status === 200) {
        message.success(ApiInfo.ApiResponseMessages.appliedLegalHold);
        dispatch(clearSearchedResults({}));
        if (searchType === 1 || (searchType === 4 && searchTypeTree === "S")) {
          let customValues = { ...updatedSearchCriteria }
          customValues.from = customValues.from ? customValues.from.format("YYYY-MM-DD") : ""
          customValues.to = customValues.to ? customValues.to.format("YYYY-MM-DD") : ""
          let searchAPIbody = {
            fromCount: customValues.fromCount || 0,
            toCount: customValues.toCount || 20,
            fromDate: customValues.from || "",
            toDate: customValues.to || "",
            employee: customValues.Select_Employees || customValues.employee || [],
            filterType: customValues.Select_Type || customValues.filterType || [],
            labelType: customValues.Select_Labels || customValues.labelType || [],
            contentValue: customValues.New_Search || customValues.contentValue || "",
            labelName: []
          };
          dispatch(postSearchData(searchAPIbody, false, case_info));
        } else if (searchType === 3 || (searchType === 4 && searchTypeTree === "Q")) {
          console.log("updatedSearchCriteria", updatedSearchCriteria)
          dispatch(queryBuilderSearchData(updatedSearchCriteria, false));
        } else if (searchType === 2 || (searchType === 4 && searchTypeTree === "A")) {
          dispatch(postAdvancedSearch(updatedSearchCriteria, false, false));
        } else if (searchType === 5 || (searchType === 4 && searchTypeTree === "SS")) {
          dispatch(smartSearch(updatedSearchCriteria, false, smartSearchAccessToken))
        }
        dispatch(clearOnholdDocuments());
        dispatch(
          getOnholdDocuments({
            caseId: case_info && Number(case_info.CASE_ID),
            fromCount: 0,
            toCount: pageSize
          })
        );
        resetSelectedRecords && dispatch(resetSelectedRecords())
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
      // dispatch(fetchLegalHolds())
    })
    .catch(error => {
      message.error(ApiInfo.ApiResponseMessages.error);
      ApiInfo.DEBUGER && console.log("applyLegalHold error", error);
      // dispatch(errorMessage())
    });
};

export const applyLegalHoldToAllDocs = (APIbody, updatedSearchCriteria, case_info, pageSize, searchType, cancelRequest, closeReadingPane) => dispatch => {
  closeReadingPane && typeof (closeReadingPane) === "function" && closeReadingPane()
  message.loading(ApiInfo.ApiResponseMessages.postData, 200)
    .then(() => message.error(ApiInfo.ApiResponseMessages.error));
  ApiInfo.DEBUGER && console.log("data got to applyLegalHoldToAllDocs", APIbody, "case_info", case_info);
  cancelApplyLegalHoldToAllDocsRequest && cancelApplyLegalHoldToAllDocsRequest();
  if (!cancelRequest) {
    axios({
      method: "put",
      url: ApiInfo.APIPORT + "/api/v2/legalhold/merge_case_all",
      headers: {
        "api-token": ApiInfo.APITOKEN,
        "Content-Type": "application/json",
        "x-channel": ApiInfo.APICHANNEL
      },
      data: APIbody,
      cancelToken: new CancelToken(function executor(c) {
        // An executor function receives a cancel function as a parameter
        cancelApplyLegalHoldToAllDocsRequest = c;
      })
    })
      .then(async response => {
        ApiInfo.DEBUGER && console.log("applyLegalHoldToAllDocs response", response);
        if (response.data.status === 200) {
          message.success(ApiInfo.ApiResponseMessages.appliedLegalHold);
          dispatch(clearSearchedResults({}));
          // dispatch(postSearchData(null, true))
          // if (searchType === 1  || (searchType === 4 && searchTypeTree === "S")) {

          let customValues = { ...updatedSearchCriteria }
          let from = customValues.from || customValues.fromDate
          let to = customValues.to || customValues.toDate
          customValues.from = from ? (from.format ? from.format("YYYY-MM-DD") : moment(from).format("YYYY-MM-DD")) : ""
          customValues.to = to ? (to.format ? to.format("YYYY-MM-DD") : moment(to).format("YYYY-MM-DD")) : ""
          let searchAPIbody = {
            fromCount: customValues.fromCount || 0,
            toCount: customValues.toCount || 20,
            fromDate: customValues.from || "",
            toDate: customValues.to || "",
            employee: customValues.Select_Employees || customValues.employee || [],
            filterType: customValues.Select_Type || customValues.filterType || [],
            // labelType: customValues.Select_Labels || customValues.labelType || [],
            labelType: ["_doc"],
            contentValue: customValues.New_Search || customValues.contentValue || "",
            labelName: []
          };
          dispatch(postSearchData(searchAPIbody, false, case_info));
          // }
          dispatch(clearOnholdDocuments());
          dispatch(
            getOnholdDocuments({
              caseId: case_info && Number(case_info.CASE_ID),
              fromCount: 0,
              toCount: pageSize
            })
          );
          resetSelectedRecords && dispatch(resetSelectedRecords())
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
          // if (response && response.data && response.data.data && response.data.data.Error && response.data.data.Error === "records does not exist against your search criterea") {
          //   message.error("Cannot apply legal hold " + response.data.data.Error)
          // } else {
          //   message.error(response && response.data && response.data.data && response.data.data.Error)
          // }
        }
        // dispatch(fetchLegalHolds())
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          //message.warn(ApiInfo.ApiResponseMessages.cancelAPIcall);
        } else {
          message.error(ApiInfo.ApiResponseMessages.error);
          ApiInfo.DEBUGER && console.log("applyLegalHoldToAllDocs error", error);
          // dispatch(errorMessage())
        }
      });
  }
  else {
    dispatch(errorMessage())
  }

};

export const applyLegalQueryBuildHoldToAllDocs = (APIbody, updatedSearchCriteria, case_info, pageSize) => dispatch => {
  message.loading(ApiInfo.ApiResponseMessages.postData, 200)
    .then(() => message.error(ApiInfo.ApiResponseMessages.error));
  ApiInfo.DEBUGER && console.log("data got to applyLegalQueryBuildHoldToAllDocs", APIbody, "case_info", case_info);
  axios({
    method: "put",
    url: ApiInfo.APIPORT + "/api/v2/legalhold/merge_case_all_query_builder",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: APIbody
  })
    .then(async response => {
      ApiInfo.DEBUGER && console.log("applyLegalQueryBuildHoldToAllDocs response", response);
      if (response.data.status === 200) {
        message.success(ApiInfo.ApiResponseMessages.appliedLegalHold);
        dispatch(clearSearchedResults({}));
        dispatch(queryBuilderSearchData(updatedSearchCriteria, false))
        dispatch(clearOnholdDocuments());
        dispatch(getOnholdDocuments({
          caseId: case_info && case_info.CASE_ID && Number(case_info.CASE_ID),
          fromCount: 0,
          toCount: pageSize
        })
        );
        resetSelectedRecords && dispatch(resetSelectedRecords())
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
        // if (response && response.data && response.data.data && response.data.data.Error && response.data.data.Error === "records does not exist against your search criterea") {
        //   message.error("Cannot apply legal hold " + response.data.data.Error)
        // } else {
        //   message.error(response && response.data && response.data.data && response.data.data.Error)
        // }
      }
      // dispatch(fetchLegalHolds())
    })
    .catch(error => {
      message.error(ApiInfo.ApiResponseMessages.error);
      ApiInfo.DEBUGER && console.log("applyLegalQueryBuildHoldToAllDocs error", error);
      // dispatch(errorMessage())
    });
};

export const applyLegalAdvanceSearchHoldToAllDocs = (APIbody, updatedSearchCriteria, case_info, pageSize) => dispatch => {
  message.loading(ApiInfo.ApiResponseMessages.postData, 200)
    .then(() => message.error(ApiInfo.ApiResponseMessages.error));
  ApiInfo.DEBUGER && console.log("data got to applyLegalAdvanceSearchHoldToAllDocs", APIbody, "case_info", case_info);
  axios({
    method: "put",
    url: ApiInfo.APIPORT + "/api/v2/legalhold/merge_case_all_advance",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: APIbody
  })
    .then(async response => {
      ApiInfo.DEBUGER && console.log("applyLegalAdvanceSearchHoldToAllDocs response", response);
      if (response.data.status === 200) {
        message.success(ApiInfo.ApiResponseMessages.appliedLegalHold);
        dispatch(clearSearchedResults({}));
        dispatch(postAdvancedSearch(updatedSearchCriteria, false, false));
        dispatch(clearOnholdDocuments());
        dispatch(getOnholdDocuments({
          caseId: case_info && case_info.CASE_ID && Number(case_info.CASE_ID),
          fromCount: 0,
          toCount: pageSize
        })
        );
        resetSelectedRecords && dispatch(resetSelectedRecords())
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
        // if (response && response.data && response.data.data && response.data.data.Error && response.data.data.Error === "records does not exist against your search criterea") {
        //   message.error("Cannot apply legal hold " + response.data.data.Error)
        // } else {
        //   message.error(response && response.data && response.data.data && response.data.data.Error)
        // }
      }
      // dispatch(fetchLegalHolds())
    })
    .catch(error => {
      message.error(ApiInfo.ApiResponseMessages.error);
      ApiInfo.DEBUGER && console.log("applyLegalAdvanceSearchHoldToAllDocs error", error);
      // dispatch(errorMessage())
    });
};

export const removeSelectedFromOnHold = (
  APIbody,
  case_info,
  updatedSearchCriteria,
  pageSize
) => dispatch => {
  message
    .loading(ApiInfo.ApiResponseMessages.postData, 200)
    .then(() => message.error(ApiInfo.ApiResponseMessages.error));
  ApiInfo.DEBUGER && console.log("data got to removeFromOnHold", APIbody);
  axios({
    method: "put",
    url: ApiInfo.APIPORT + "/api/v2/legalhold/remove_case",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: APIbody
  })
    .then(response => {
      ApiInfo.DEBUGER && console.log("removeFromOnHold", response);
      resetSelectedRecords && dispatch(resetSelectedRecords())
      displayMessageAndDispatchAction(
        ApiInfo.ApiResponseMessages.removeOnHold,
        response,
        dispatch,
        clearOnholdDocuments,
        getOnholdDocuments,
        undefined,
        {
          caseId: case_info && +case_info.CASE_ID,
          fromCount: 0,
          toCount: pageSize
        }
      );
      // if (response.data.status === 200) {
      //   message.success(ApiInfo.ApiResponseMessages.removeOnHold);
      //   dispatch(clearOnholdDocuments());
      //   dispatch(
      //     getOnholdDocuments({
      //       caseId: case_info && +case_info.CASE_ID,
      //       fromCount: 0,
      //       toCount: pageSize
      //     })
      //   );
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
      // // dispatch(fetchLegalHolds())
    })
    .catch(error => {
      message.error(ApiInfo.ApiResponseMessages.error);
      ApiInfo.DEBUGER && console.log("removeFromOnHold error", error);
    });
};

export const removeAllFromOnHold = (
  APIbody,
  case_info,
  updatedSearchCriteria,
  pageSize
) => dispatch => {
  message
    .loading(ApiInfo.ApiResponseMessages.postData, 200)
    .then(() => message.error(ApiInfo.ApiResponseMessages.error));
  ApiInfo.DEBUGER && console.log("data got to removeFromOnHold", APIbody);
  axios({
    method: "put",
    url: ApiInfo.APIPORT + "/api/v2/legalhold/remove_case_all",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: APIbody
  })
    .then(response => {
      ApiInfo.DEBUGER && console.log("removeAllFromOnHold", response);
      resetSelectedRecords && dispatch(resetSelectedRecords())
      displayMessageAndDispatchAction(
        ApiInfo.ApiResponseMessages.removeOnHold,
        response,
        dispatch,
        clearOnholdDocuments,
        getOnholdDocuments,
        undefined,
        {
          caseId: case_info && +case_info.CASE_ID,
          fromCount: 0,
          toCount: pageSize
        }
      );

      // if (response.data.status === 200) {
      //   message.success(ApiInfo.ApiResponseMessages.removeOnHold);
      //   dispatch(clearOnholdDocuments());
      //   dispatch(
      //     getOnholdDocuments({
      //       caseId: case_info && +case_info.CASE_ID,
      //       fromCount: 0,
      //       toCount: pageSize
      //     })
      //   );
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
      // dispatch(errorMessage())
      message.error(ApiInfo.ApiResponseMessages.error);
      ApiInfo.DEBUGER && console.log("removeAllFromOnHold error", error);
    });
};

export const getOnholdDocuments = APIbody => dispatch => {
  ApiInfo.DEBUGER && console.log("data got to getOnholdDocuments", APIbody);
  cancelGetOnHoldRequest && cancelGetOnHoldRequest();
  dispatch(totalOnHoldDocs(0));
  axios({
    method: "POST",
    url: ApiInfo.APIPORT + "/api/v2/legalhold/onhold",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: APIbody,
    cancelToken: new CancelToken(function executor(c) {
      // An executor function receives a cancel function as a parameter
      cancelGetOnHoldRequest = c;
    })
  })
    .then(response => {
      ApiInfo.DEBUGER && console.log("getOnholdDocuments response", response);
      displayMessageAndDispatchAction(
        undefined,
        response,
        dispatch,
        getOnholdDocs,
        totalOnHoldDocs,
        response.data.status === 200 && response.data.data.output[0].hits.hits,
        response.data.status === 200 && response.data.data.output[0].hits.total.value
      );
      if (response.data.status === 200) {
        dispatch(fetchAutoLabels("all"))
      //   dispatch(getOnholdDocs(response.data.data.output[0].hits.hits));
      //   dispatch(
      //     totalOnHoldDocs(response.data.data.output[0].hits.total.value)
      //   );
      } 
      // else {
      //   dispatch(getOnholdDocs([]));
      //   dispatch(totalOnHoldDocs(0));
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
      if (axios.isCancel(error)) {
        // message.warn("Request Cancelled")
        ApiInfo.DEBUGER && console.log("getOnholdDocuments error", error);
      } else {
        ApiInfo.DEBUGER && console.log("getOnholdDocuments error", error);
        dispatch(totalOnHoldDocs(0));
        // dispatch(getOnholdDocuemnts([]))
        message.error(ApiInfo.ApiResponseMessages.error);
        // dispatch(errorMessage())
      }
    });
};

export const updateLegalHoldStatus = (caseId, status) => dispatch => {
  message
    .loading(
      status === 2
        ? ApiInfo.ApiResponseMessages.releasingLegalHold
        : ApiInfo.ApiResponseMessages.activatingLegalHold,
      200
    )
    .then(() => message.error(ApiInfo.ApiResponseMessages.error));
  axios({
    method: "PUT",
    url: ApiInfo.APIPORT + "/api/v2/legalhold/update_status",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: { caseId: caseId, status: status }
  })
    .then(async response => {
      ApiInfo.DEBUGER && console.log("updateLegalHoldStatus response", response);
      if (response.data.status === 200) {
        resetSelectedRecords && dispatch(resetSelectedRecords())
        message.destroy();
        status === 2 ?
          message.success(ApiInfo.ApiResponseMessages.releasedLegalHold)
          : message.success(ApiInfo.ApiResponseMessages.activatedLegalHold);
        dispatch(fetchLegalHolds());
      } else {
        message.destroy();
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
    })
    .catch(error => {
      ApiInfo.DEBUGER && console.log("getOnholdDocuments error", error);
      message.error(ApiInfo.ApiResponseMessages.error);
      // dispatch(errorMessage())
    });
};
