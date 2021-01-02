import * as ApiInfo from "../../../APIConfig/ApiParameters";
import axios from "axios";
import {
  dataLoading,
  errorMessage,
  getSimpleSearchResult,
  totalSimpeSearchedDocs,
  getFilterAggeragations
} from "../SimpleSearchAction/SimpleSearchAction";
import {
  GET_ADVANCEDSEARCHQUERY,
  GET_ADVANCEDSEARCHTYPELIST
} from "../../Types/AdvancedSearchTypes/AdvancedSearchTypes";
import { setFolderRelatedDocuments, totalFolderDocs } from "../MyArchivedEmailActions/MyArchivedEmailsActions";
import { message, Icon } from "antd";
import React from "react";
import { displayMessageAndDispatchAction } from "../utils";
import { resetSelectedRecords } from "../updateSelectedRecordsAction/updateSelectedRecordsAction";
import { getAuthenticUserInfo } from '../LoginAction/LoginAction'
import GetUserRole  from '../GetUserRoleAction/GetUserRoleAction'
message.config({
  top: 10,
  duration: 5,
  maxCount: 1
});

var CancelToken = axios.CancelToken;
let cancelPostAdvancedSearch;
let cancelAdvancedSearchTypeList;
// let cancelQueryBuilderSearchRequest;

export const postAdvancedSearch = (data, cancelRequest, isMyarchivedEmail) => dispatch => {
  ApiInfo.DEBUGER && console.log("data got to postAdvancedSearch", JSON.stringify(data));
  cancelPostAdvancedSearch && cancelPostAdvancedSearch();
  if (!cancelRequest && Object.keys(data) && Object.keys(data).length > 0) {
    if (isMyarchivedEmail) {
      dispatch(setFolderRelatedDocuments())
      dispatch(totalFolderDocs())
    } else {
      dispatch(dataLoading(true));
      dispatch(errorMessage("searchArchiveGETError", false));
    }
    axios({
      method: "POST",
      url: ApiInfo.APIPORT + "/api/v2/search/advance",
      headers: {
        "api-token": ApiInfo.APITOKEN,
        "Content-Type": "application/json",
        "x-channel": ApiInfo.APICHANNEL
      },
      data: data,
      cancelToken: new CancelToken(function executor(c) {
        // An executor function receives a cancel function as a parameter
        cancelPostAdvancedSearch = c;
      })
    })
      .then(async response => {
        ApiInfo.DEBUGER && console.log("Advanced searched response", response);
        if (response.data.status === 200) {
          response.data.data.output[0].hits.hits.length === 0
            ? message.success(
              `took ${response.data.data.output[0].took}ms to find 0 Documents`
            )
            : message.success(
              `took ${response.data.data.output[0].took}ms to find ${response.data.data.output[0].hits.hits.length} Documents`
            );
          if (isMyarchivedEmail) {
            dispatch(setFolderRelatedDocuments(response.data.data.output[0].hits.hits))
            dispatch(totalFolderDocs(response.data.data.output[0].hits.total.value))
          } else {
            dispatch(getSimpleSearchResult(response.data.data.output[0].hits.hits));
            dispatch(totalSimpeSearchedDocs(response.data.data.output[0].hits.total.value));
            dispatch(dataLoading(false));
            dispatch(errorMessage("searchArchiveGETError", false));
            dispatch(getFilterAggeragations(response.data.data.output[0].aggregations))
          }
        } else {
          if(response.data && response.data.status === 401){
            await dispatch(getAuthenticUserInfo(null))
            await dispatch(GetUserRole(null))
            if(!JSON.stringify(localStorage.getItem("userInfo")))
            window.location.pathname = '/'
          }
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
          )}
          if (isMyarchivedEmail) {
            dispatch(setFolderRelatedDocuments([]))
            dispatch(totalFolderDocs())
          } else {
            dispatch(getSimpleSearchResult([]));
            dispatch(totalSimpeSearchedDocs(0));
          }
        }
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          // message.warn("Request Cancelled")
        } else {
          message.error(ApiInfo.ApiResponseMessages.error);
          dispatch(dataLoading(false));
          dispatch(errorMessage("searchArchiveGETError", true));
        }
        if (isMyarchivedEmail) {
          dispatch(setFolderRelatedDocuments([]))
          dispatch(totalFolderDocs())
        }
        ApiInfo.DEBUGER && console.log("simple searched get API error", error);
      });
  } else {
    dispatch(errorMessage("searchArchiveGETError", true));
  }
};
export const fetchAdvanceSearchTypeList = () => dispatch => {
  cancelAdvancedSearchTypeList && cancelAdvancedSearchTypeList();
  axios({
    method: "get",
    url: ApiInfo.APIPORT + "/api/v2/search/metadata-type-list",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    cancelToken: new CancelToken(function executor(c) {
      // An executor function receives a cancel function as a parameter
      cancelAdvancedSearchTypeList = c;
    })
  })
    .then(response => {
      ApiInfo.DEBUGER &&
        ApiInfo.DEBUGER && console.log("fetchAdvanceSearchTypeList response", response);
      if (response.data.status === 200) {
        resetSelectedRecords && dispatch(resetSelectedRecords());
      }
      displayMessageAndDispatchAction(
        undefined,
        response,
        dispatch,
        getAdvanceSearchTypeList,
        undefined,
        response.data,
        undefined
      );

      // if (response.data.status === 200) {
      //   dispatch(getAdvanceSearchTypeList(response.data));
      // } else {
      //   dispatch(getAdvanceSearchTypeList([]));
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
      // dispatch(getExpotDropDown([]))
      // message.error(ApiInfo.ApiResponseMessages.error)
      ApiInfo.DEBUGER && console.log("fetchAdvanceSearchTypeList error", error);
    });
};
export const AdvancedSearchQueryBuilder = query => {
  return {
    type: GET_ADVANCEDSEARCHQUERY,
    payload: {
      advancedquery: query
    }
  };
};

export const getAdvanceSearchTypeList = data => {
  return {
    type: GET_ADVANCEDSEARCHTYPELIST,
    payload: {
      advancedtypelist: data
    }
  };
};
