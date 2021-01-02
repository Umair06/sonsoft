import {
  GET_SIMPLESEARCH,
  CLEAR_SEARCHED_RESULTS,
  TOTAL_SIMPLE_SEARCHED_DOCS,
  GET_SIMPLESEARCHRESULT,
  LOADING,
  ERROR,
  EMPTY_ATTACHMENT,
  SUCCESS,
  QUERYBUILDER,
  GET_ATTACHMENTID,
  MOVED_TO_FILTER,
  SMARTSEARCHACESSTOKEN,
  GETFILTERAGGREGATIONS
} from "../../Types/SimpleSearchTypes/SimpleSearchTypes";
import * as ApiInfo from "../../../APIConfig/ApiParameters";
import axios from "axios";
import { message, Icon } from "antd";
import React from "react";
import { displayMessageAndDispatchAction } from "../utils";
// import { resetSelectedRecords } from "../updateSelectedRecordsAction/updateSelectedRecordsAction";
import { getAuthenticUserInfo } from '../LoginAction/LoginAction'
import GetUserRole from '../GetUserRoleAction/GetUserRoleAction'
// message.config({
//     top: 10,
//     duration: 5,
// });
message.config({
  top: 600,
  duration: 2,
  maxCount: 3
});

var CancelToken = axios.CancelToken;
let cancelSimpleSearchRequest;
let cancelSmartSearchRequest;
let cancelQueryBuilderSearchRequest;
let cancelGetSimpleSearchAttachment;
let cancelfilterSearchResultSetRequest;

export const clearSearchedResults = notRemoveFilter => {
  return {
    type: CLEAR_SEARCHED_RESULTS,
    payload: {
      notRemoveFilter
    }
  };
};

export const totalSimpeSearchedDocs = searchedDataLength => {
  return {
    type: TOTAL_SIMPLE_SEARCHED_DOCS,
    payload: {
      searchedDataLength
    }
  };
};

export const getSimpleSearch = simpleSearchDropDownData => {
  return {
    type: GET_SIMPLESEARCH,
    payload: {
      simplesearch: simpleSearchDropDownData
    }
  };
};
export const getSimpleSearchResult = data => {
  return {
    type: GET_SIMPLESEARCHRESULT,
    payload: {
      simplesearchresult: data
    }
  };
};

export const getFilterAggeragations = data => {
  return {
    type: GETFILTERAGGREGATIONS,
    payload: {
      filterAggregations: data
    }
  }
}

export const filterDocuments = filter => {
  return {
    type: MOVED_TO_FILTER,
    payload: {
      filter
    }
  };
};
export const successMessage = success => {
  return {
    type: SUCCESS,
    payload: {
      success: success
    }
  };
};

export const dataLoading = loading => dispatch => {
  dispatch({
    type: LOADING,
    payload: {
      loaded: loading
    }
  });
};
export const errorMessage = (errorVariable = "error", isError) => {
  return {
    type: ERROR,
    payload: {
      errorVariable,
      isError
    }
  };
};

export const queryBuilder = query => {
  return {
    type: QUERYBUILDER,
    payload: {
      query: query
    }
  };
};

export const getSearchAttachment = attachmentid => {
  return {
    type: GET_ATTACHMENTID,
    payload: {
      attachmentid: attachmentid
    }
  };
};

export const EmptySearchAttachment = () => {
  return {
    type: EMPTY_ATTACHMENT,
    payload: {}
  };
};

export const saveSmartSearchAccessToken = token => {
  return {
    type: SMARTSEARCHACESSTOKEN,
    payload: { token }
  }
}

// export const GetAttachmentSave = data => {
//   return {
//     type: GET_ATTACHMENT_SAVE,
//     payload: data
//   };
// };

export const fetchSimpleSearch = (labelType, funcToDispatch) => dispatch => {
  axios
    .get(ApiInfo.APIPORT + `/api/v2/search/simple/${labelType ? labelType : ''}`, {
      headers: {
        "api-token": ApiInfo.APITOKEN,
        "Content-Type": "application/json; charset=utf-8",
        Accept: "application/json",
        "x-channel": ApiInfo.APICHANNEL
      }
    })
    .then(response => {
      ApiInfo.DEBUGER && console.log("fetchSimpleSearch response", response);
      dispatch(getSimpleSearch());
      funcToDispatch && typeof (funcToDispatch) === "function" && funcToDispatch();
      displayMessageAndDispatchAction(
        undefined,
        response,
        dispatch,
        getSimpleSearch,
        undefined,
        response.data.data.output[0]
      );
    })
    .catch(error => {
      ApiInfo.DEBUGER && console.log("fetchSimpleSearch error", error);
      dispatch(getSimpleSearch([]));
      dispatch(errorMessage());
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};

export const postSearchData = (APIbody, cancelRequest, closeReadingPane, notInitialSearch) => dispatch => {
  dispatch(clearSearchedResults(notInitialSearch));
  dispatch(totalSimpeSearchedDocs());
  closeReadingPane && typeof (closeReadingPane) === "function" && closeReadingPane()
  ApiInfo.DEBUGER && console.log("data got to postSearchData", APIbody);
  cancelSimpleSearchRequest && cancelSimpleSearchRequest();
  if (!cancelRequest) {
    dispatch(dataLoading(true));
    dispatch(errorMessage("searchArchiveGETError", false));
    axios({
      method: "POST",
      url: ApiInfo.APIPORT + "/api/v2/search/simple",
      headers: {
        "api-token": ApiInfo.APITOKEN,
        "Content-Type": "application/json",
        "x-channel": ApiInfo.APICHANNEL
      },
      data: APIbody,
      cancelToken: new CancelToken(function executor(c) {
        // An executor function receives a cancel function as a parameter
        cancelSimpleSearchRequest = c;
      })
    })
      .then(async response => {
        ApiInfo.DEBUGER && console.log("Simple searched response", response);
        if (response.data.status === 200) {
          dispatch(
            getSimpleSearchResult(response.data.data.output[0].hits.hits)
          );
          dispatch(totalSimpeSearchedDocs(response.data.data.output[0].hits.total.value));
          dispatch(dataLoading(false));
          dispatch(getFilterAggeragations(response.data.data.output[0].aggregations))
          // response.data.data.output[0].hits.hits.length === 0
          //   ? message.info(`No Records Found`)
          message.success(
            `took ${response.data.data.output[0].took}ms to find ${response.data.data.output[0].hits.hits.length} Documents`
          );
        } else {
          dispatch(getSimpleSearchResult([]));
          dispatch(totalSimpeSearchedDocs(0));
          if (response.data && response.data.status === 401) {
            await dispatch(getAuthenticUserInfo(null))
            await dispatch(GetUserRole(null))
            if (!JSON.stringify(localStorage.getItem("userInfo")))
              window.location.pathname = '/'
          }
          if (response.data && response.data.status !== 204) {
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
        // message.destroy && message.destroy()
        // message.success("Success")
        // }
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          // message.destroy && message.destroy()
          // message.warn("Request Cancelled")
        } else {
          // message.destroy && message.destroy()
          message.error(ApiInfo.ApiResponseMessages.error);
          dispatch(dataLoading(false));
          dispatch(errorMessage("searchArchiveGETError", true));
        }
        ApiInfo.DEBUGER && console.log("simple searched get API error", error);
      });
  } else {
    dispatch(errorMessage("searchArchiveGETError", true));
  }
};

export const filterSearchResultSet = (APIbody, cancelRequest, searchType, searchTypeTree) => dispatch => {
  dispatch(clearSearchedResults(true));
  dispatch(totalSimpeSearchedDocs());
  ApiInfo.DEBUGER && console.log("data got to filterSearchResultSet", APIbody);
  cancelfilterSearchResultSetRequest && cancelfilterSearchResultSetRequest();
  if (!cancelRequest) {
    dispatch(dataLoading(true));
    dispatch(errorMessage("searchArchiveGETError", false));
    axios({
      method: "POST",
      url: ApiInfo.APIPORT + "/api/v2/search/simple",
      headers: {
        "api-token": ApiInfo.APITOKEN,
        "Content-Type": "application/json",
        "x-channel": ApiInfo.APICHANNEL
      },
      data: APIbody,
      cancelToken: new CancelToken(function executor(c) {
        // An executor function receives a cancel function as a parameter
        cancelfilterSearchResultSetRequest = c;
      })
    })
      .then(async response => {
        ApiInfo.DEBUGER && console.log("filterSearchResultSet response", response);
        if (response.data.status === 200) {
          dispatch(getSimpleSearchResult(response.data.data.output[0].hits.hits));
          dispatch(totalSimpeSearchedDocs(response.data.data.output[0].hits.total.value));
          dispatch(dataLoading(false));
          message.success(`took ${response.data.data.output[0].took}ms to filter ${response.data.data.output[0].hits.hits.length} Documents`);
        } else {
          dispatch(getSimpleSearchResult([]));
          dispatch(totalSimpeSearchedDocs(0));
          if (response.data && response.data.status === 401) {
            await dispatch(getAuthenticUserInfo(null))
            await dispatch(GetUserRole(null))
            if (!JSON.stringify(localStorage.getItem("userInfo")))
              window.location.pathname = '/'
          }
          if (response.data && response.data.status !== 204) {
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
  }
}

export const requestSmartSearchAccessToken = APIbody => dispatch => {
  axios({
    method: "post",
    url: "https://auraapi.nugene.ai/aura/getAccessToken",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      "emailID": APIbody.emailID
      // "emailID": "sonasoft_knb@sonasoft.com"
    }
  })
    .then(response => {
      ApiInfo.DEBUGER && console.log("accestoken response", response)
      if (response.data.accessToken) {
        dispatch(saveSmartSearchAccessToken(response.data.accessToken))
        dispatch(smartSearch(APIbody, false, response.data.accessToken))
      }
    })
    .catch(error => {
      ApiInfo.DEBUGER && console.log("postMailboxAccess error", error);
    });
};

export const smartSearch = (APIbody, cancelRequest, accessToken) => dispatch => {
  dispatch(totalSimpeSearchedDocs());
  ApiInfo.DEBUGER && console.log("data got to smartSearch", APIbody && JSON.stringify(APIbody));
  cancelSmartSearchRequest && cancelSmartSearchRequest();
  dispatch(clearSearchedResults());
  if (!cancelRequest) {
    dispatch(dataLoading(true));
    dispatch(errorMessage("searchArchiveGETError", false));
    axios({
      method: "POST",
      url: "https://auraapi.nugene.ai/aura/smartSearch/resolve",
      headers: {
        "Authorization": accessToken,
        "Content-Type": "application/json"
      },
      data: APIbody && JSON.stringify(APIbody),
      cancelToken: new CancelToken(function executor(c) {
        // An executor function receives a cancel function as a parameter
        cancelSmartSearchRequest = c;
      })
      // data: { "fromCount": 0, "toCount": 100, "fromDate": "1996-12-11", "toDate": "2022-12-30", "employee": [], "filterType": [], "labelType": ["default", "test"], "contentValue": "test" }
    })
      .then(response => {
        ApiInfo.DEBUGER && console.log("smartSearch response", response);
        let customizedDocs = []
        let totalDocs;
        if (response.data.messageCode === 1238) {
          dispatch(saveSmartSearchAccessToken(accessToken))
          if (response.data.resolution["answers"]) {
            let docs = response.data.resolution["answers"]
            totalDocs = response.data.totalDocumentsRetrieved
            docs.forEach(doc => {
              customizedDocs.push({
                _id: doc.docID,
                score: doc.score,
                _index: doc.context && doc.context.datasource,
                _source: {
                  file_path: doc.context && doc.context.file_path,
                  encrypted: "True",
                  bcc: doc.context && doc.context.bcc && typeof (doc.context.bcc) === "string" ? doc.context.bcc.split(",") : doc.context.bcc,
                  subject: doc.answer && (Array.isArray(doc.answer) ? doc.answer[0] && doc.answer[0].Subject : doc.answer.Subject),
                  case_site_name: doc.context && doc.context["case-site_name"],
                  message_body: doc.answer && (Array.isArray(doc.answer) ? doc.answer[0] && doc.answer[0].body1 : doc.answer.body1),
                  case_site_id: doc.context && doc.context.case_site_id,
                  from: doc.context && doc.context.From && (typeof (doc.context.From) === "string" ? doc.context.From.split(",") : doc.context.From),
                  cc: doc.context && doc.context.CC && (typeof (doc.context.CC) === "string" ? doc.context.CC.split(",") : doc.context.CC),
                  hash_file: doc.context && doc.context.hash_file,
                  source_folder: doc.context && doc.context.source_folder,
                  html_body: doc.context && doc.context["html body"] && (Array.isArray(doc.context["html body"]) ? doc.context["html body"][0] : doc.context["html body"]),
                  datasource: doc.context && doc.context.datasource,
                  header: { header: { ...doc.context.header }, date: doc.context.Date },
                  attachments: doc.context && doc.context.attachments,
                  to: doc.context && doc.context.To && (typeof (doc.context.To) === "string" ? doc.context.To.split(",") : doc.context.To),
                  attachment_count: doc.context && doc.context.attachments && doc.context.attachments.length,
                  has_attachment: doc.context && doc.context.attachments && doc.context.attachments.length > 0
                }
              })
            })
          }
          dispatch(getSimpleSearchResult(customizedDocs));
          dispatch(totalSimpeSearchedDocs(totalDocs || (customizedDocs && customizedDocs.length)));
          // dispatch(dataLoading(false));
          // response.data.resolution["answers"].length === 0
          //   ? message.info(`No Records Found`)
          message.success(
            `${response.data.resolution["answers"].length} Documents Found`
          );
        } else {
          if (response.data && response.data.status !== 204) {
            message.error(<span>{response.data.message}<Icon type="close" className="closebtn" onClick={() => message.destroy && message.destroy()} /></span>, 0)
          }
          dispatch(getSimpleSearchResult([]));
          dispatch(totalSimpeSearchedDocs());
          dispatch(dataLoading(false));
          dispatch(errorMessage("searchArchiveGETError", true));
        }
      })
      .catch(error => {
        ApiInfo.DEBUGER && console.log("smart Search API error", error);
        if (axios.isCancel(error)) {
          return
        } else if (error.response && error.response.status !== 401) {
          message.error(ApiInfo.ApiResponseMessages.error);
          dispatch(getSimpleSearchResult([]));
          dispatch(totalSimpeSearchedDocs());
          dispatch(dataLoading(false));
          dispatch(errorMessage("searchArchiveGETError", true));
        }
        if (error.response && error.response.status === 401) {
          message.error(<span>{"Access Token Expired"}<Icon type="close" className="closebtn" onClick={() => message.destroy && message.destroy()} /></span>, 0)
          // message.warn()
          // if (APIbody.emailID) {
          //   // dispatch(requestSmartSearchAccessToken(APIbody))
          // } else {
          // message.warn("cannot find smart search email Id")
          dispatch(getSimpleSearchResult([]));
          dispatch(totalSimpeSearchedDocs());
          dispatch(dataLoading(false));
          dispatch(errorMessage("searchArchiveGETError", true));
          // }
        } else {
          message.error(ApiInfo.ApiResponseMessages.error);
          dispatch(getSimpleSearchResult([]));
          dispatch(totalSimpeSearchedDocs());
          dispatch(dataLoading(false));
          dispatch(errorMessage("searchArchiveGETError", true));
        }
        // message.destroy()
      });
  } else {
    dispatch(errorMessage("searchArchiveGETError", true));
  }
};

export const saveSearchData = data => dispatch => {
  ApiInfo.DEBUGER && console.log(
    "saveSearchData",
    JSON.stringify({
      fromCount: 0,
      toCount: 5,
      fromDate: data.fromDate,
      toDate: data.toDate,
      employee: data.employee,
      filterType: data.filterType,
      labelType: data.labelType,
      contentValue: data.contentValue,
      searchedBy: 1,
      searchCriteriaName: data.searchCriteriaName,
      searchCriteriaDesc: data.searchCriteriaDesc,
      searchType: "S"
    })
  );
  axios({
    method: "POST",
    url: ApiInfo.APIPORT + "/api/v2/search/simple/add",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: {
      fromCount: 0,
      toCount: 5,
      fromDate: data.fromDate,
      toDate: data.toDate,
      employee: data.employee,
      filterType: data.filterType,
      labelType: [],
      contentValue: data.contentValue,
      searchedBy: 1,
      searchCriteriaName: data.searchCriteriaName,
      searchCriteriaDesc: data.searchCriteriaDesc,
      searchType: "S"
    }
  })
    .then(response => {
      ApiInfo.DEBUGER && console.log("saveSearchData response", response);

      displayMessageAndDispatchAction(
        ApiInfo.ApiResponseMessages.saved,
        response
      );
    })
    .catch(error => {
      ApiInfo.DEBUGER && console.log("saveSearchData error", error);
      dispatch(errorMessage());
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};

export const queryBuilderSearchData = (data, cancelRequest) => dispatch => {
  // message.loading('Loading..', 20)
  ApiInfo.DEBUGER && console.log("query got to Query Builder API", data, cancelRequest);
  let parsedQuery;
  try {
    parsedQuery = JSON.parse(data.body);
  } catch (e) {
    parsedQuery = data.body;
  }
  const index = data.index;
  cancelQueryBuilderSearchRequest && cancelQueryBuilderSearchRequest();
  ApiInfo.DEBUGER && console.log("query got to Query Builder API", { body: parsedQuery, labelType: ["_doc"], filterType: index });
  if (!cancelRequest) {
    dispatch(dataLoading(true));
    dispatch(errorMessage("searchArchiveGETError", false));
    axios({
      method: "POST",
      url: ApiInfo.APIPORT + "/api/v2/search/querybuilder",
      headers: {
        "api-token": ApiInfo.APITOKEN,
        "Content-Type": "application/json",
        "x-channel": ApiInfo.APICHANNEL
      },
      data: { body: parsedQuery, labelType: ["_doc"], filterType: index },
      cancelToken: new CancelToken(function executor(c) {
        // An executor function receives a cancel function as a parameter
        cancelSimpleSearchRequest = c;
      })
    })
      .then(async response => {
        ApiInfo.DEBUGER && console.log("query Builder response", response);
        // message.destroy && message.destroy()
        if (response.data.status === 200) {
          response.data.data.output[0].hits.hits.length === 0
            ? message.warn(
              `took ${response.data.data.output[0].took}ms to find 0 Documents Found!`
            )
            : message.success(
              `took ${response.data.data.output[0].took}ms to find ${response.data.data.output[0].hits.hits.length} Documents Found!`
            );
          dispatch(queryBuilder(response.data.message));
          dispatch(
            getSimpleSearchResult(response.data.data.output[0].hits.hits)
          );
          dispatch(
            totalSimpeSearchedDocs(
              response.data.data.output[0].hits.total.value
            )
          );
          dispatch(dataLoading(false));
          dispatch(getFilterAggeragations(response.data.data.output[0].aggregations))
        } else {
          dispatch(totalSimpeSearchedDocs(0));
          dispatch(getSimpleSearchResult([]));
          if (response.data && response.data.status === 401) {
            await dispatch(getAuthenticUserInfo(null))
            await dispatch(GetUserRole(null))
            if (!JSON.stringify(localStorage.getItem("userInfo"))) {
              window.location.pathname = '/'
            }
          } else if (response.data && response.data.status !== 204) {
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
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          // message.destroy && message.destroy()
          // message.warn("Request Cancelled")
        } else {
          dispatch(dataLoading(false));
          // message.destroy && message.destroy()
          message.error(ApiInfo.ApiResponseMessages.error);
          dispatch(errorMessage("searchArchiveGETError", true));
        }
        ApiInfo.DEBUGER && console.log("query Builder error", error);
      });
  } else {
    dispatch(errorMessage("searchArchiveGETError", true));
  }
};

export const getSimpleSearchAttachment = data => dispatch => {
  ApiInfo.DEBUGER &&
    console.log(
      "data got to getSimpleSearchAttachment",
      data && { docIds: [data._id], filterType: [data._index], labelType: [] }
    );
  dispatch(getSearchAttachment([]));
  cancelGetSimpleSearchAttachment && cancelGetSimpleSearchAttachment();
  if (data) {
    axios({
      method: "POST",
      url: ApiInfo.APIPORT + "/api/v2/search/searchbyids",
      headers: {
        "api-token": ApiInfo.APITOKEN,
        "Content-Type": "application/json",
        "x-channel": ApiInfo.APICHANNEL
      },
      data: { docIds: [data._id], filterType: [data._index], labelType: [] },
      cancelToken: new CancelToken(function executor(c) {
        // An executor function receives a cancel function as a parameter
        cancelGetSimpleSearchAttachment = c;
      })
    })
      .then(response => {
        ApiInfo.DEBUGER && console.log("getSimpleSearchAttachment Response", response);

        displayMessageAndDispatchAction(
          undefined,
          response,
          dispatch,
          getSearchAttachment,
          undefined,
          response.data.data.output[0].hits.hits
        );

        // if (response.data.status === 200) {
        //   dispatch(getSearchAttachment(response.data.data.output[0].hits.hits));
        // } else {
        //   dispatch(getSearchAttachment([]));
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
        ApiInfo.DEBUGER && console.log("getSimpleSearchAttachment error", error);
        dispatch(getSearchAttachment([]));
        dispatch(errorMessage());
      });
  }
};

