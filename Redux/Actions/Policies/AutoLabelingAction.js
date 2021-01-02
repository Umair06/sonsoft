import { GET_GLOBAL_AUTO_LABELING, GET_LEGAL_HOLD_AUTO_LABELING, GET_SORTED_GLOBAL_LABEL } from "../../Types/PoliciesTypes/PoliciesTypes";
import axios from "axios";
import * as ApiInfo from "../../../APIConfig/ApiParameters";
import { displayMessageAndDispatchAction } from "../utils";
import React from "react";
import { message, Icon } from "antd";
import {
  postSearchData,
  clearSearchedResults,
  queryBuilderSearchData,
  smartSearch,
  // errorMessage
} from "../SimpleSearchAction/SimpleSearchAction";
import { postAdvancedSearch } from "../AdvancedSearchAction/AdvancedSearchAction";
import { getOnholdDocuments, clearOnholdDocuments } from "../LegalHoldsActions/LegalHoldsActions";


message.config({
  top: 10,
  duration: 5,
  maxCount: 1
});

export const getGlobalAutoLabels = globalAutoLabels => {
  return {
    type: GET_GLOBAL_AUTO_LABELING,
    payload: {
      globalAutoLabels: globalAutoLabels
    }
  };
};

export const getLegalHoldAutoLabels = legalHoldAutoLabels => {
  return {
    type: GET_LEGAL_HOLD_AUTO_LABELING,
    payload: {
      legalHoldAutoLabels: legalHoldAutoLabels
    }
  };
};

export const getTreeDataGlobalLabel = treeDataOfGlobalLabel => {
  return {
    type: GET_SORTED_GLOBAL_LABEL,
    payload: {
      treeDataOfGlobalLabel
    }
  };
};


export const fetchAutoLabels = labelType => dispatch => {
  ApiInfo.DEBUGER && console.log("data got to fetchAutoLabel", labelType)
  const prevHistory = window.location.pathname;
  axios({
    method: "get",
    url: `${ApiInfo.APIPORT}/api/v2/autolabel/${labelType}`,
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
  })
    .then(response => {
      ApiInfo.DEBUGER && console.log("fetchAutoLabels response", response)
      displayMessageAndDispatchAction(
        undefined,
        response,
        dispatch,
        labelType && (labelType === "L" || labelType === "all") ? getLegalHoldAutoLabels : labelType && labelType === "G" && getGlobalAutoLabels,
        undefined,
        response.data.data.output,
        undefined,
        prevHistory
      )
    })
    .catch(error => {
      ApiInfo.DEBUGER && console.log("fetchAutoLabels error", error);
      if (labelType) {
        if (labelType === "L") {
          dispatch(getLegalHoldAutoLabels([]));
        } else if (labelType === "G") {
          dispatch(getGlobalAutoLabels([]));
        }
      }
      message.error(ApiInfo.ApiResponseMessages.error);
    });
}


export const postAutoLabels = data => dispatch => {
  message.destroy()
  const prevHistory = window.location.pathname;
  ApiInfo.DEBUGER && console.log("data got postAutoLabels", data);
  message.loading(ApiInfo.ApiResponseMessages.postData, 100)
    .then(() => message.error(ApiInfo.ApiResponseMessages.error))
  axios({
    method: "post",
    url: ApiInfo.APIPORT + "/api/v2/autolabel/add",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: data
  })
    .then(response => {
      ApiInfo.DEBUGER && console.log("postAutoLabels response", response);
      displayMessageAndDispatchAction(
        ApiInfo.ApiResponseMessages.updated,
        response,
        dispatch,
        fetchAutoLabels,
        undefined,
        data.filterType,
        undefined,
        prevHistory
      )
    })
    .catch(error => {
      ApiInfo.DEBUGER && console.log("postAutoLabels error", error);
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};

export const editAutoLabels = data => dispatch => {
  message.destroy()
  ApiInfo.DEBUGER && console.log("data got editAutoLabels", data);
  const prevHistory = window.location.pathname;
  message.loading(ApiInfo.ApiResponseMessages.postData, 100)
    .then(() => message.error(ApiInfo.ApiResponseMessages.error))
  axios({
    method: "put",
    url: ApiInfo.APIPORT + "/api/v2/autolabel/update",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: data
  })
    .then(response => {
      ApiInfo.DEBUGER && console.log("editAutoLabels response", response);
      message.destroy()
      displayMessageAndDispatchAction(
        ApiInfo.ApiResponseMessages.updated,
        response,
        dispatch,
        fetchAutoLabels,
        undefined,
        data.filterType,
        undefined,
        prevHistory
      )
    })
    .catch(error => {
      ApiInfo.DEBUGER && console.log("editAutoLabels error", error);
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};

export const deleteAutoLabel = (filterId, labelType) => dispatch => {
  const prevHistory = window.location.pathname;
  ApiInfo.DEBUGER && console.log("filterId got deleteAutoLabel", filterId);
  message.loading(ApiInfo.ApiResponseMessages.deletingData, 100)
    .then(() => message.error(ApiInfo.ApiResponseMessages.error))
  axios({
    method: "delete",
    url: ApiInfo.APIPORT + "/api/v2/autolabel/filter",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: { "filterId": [filterId] }
  })
    .then(response => {
      ApiInfo.DEBUGER && console.log("deleteAutoLabel response", response);
      displayMessageAndDispatchAction(
        ApiInfo.ApiResponseMessages.deleted,
        response,
        dispatch,
        fetchAutoLabels,
        undefined,
        labelType,
        undefined,
        prevHistory
      )
      if (response.data.status === 404 && response.data && response.data.data && response.data.data.output && response.data.data.output[0]) {
        message.error(
          <span>
            {response.data.data.output[0].split(",") && response.data.data.output[0].split(",").length > 1 ? response.data.data.output[0] + " policies can not be deleted until you remove all labels under these policy from documents" : response.data.data.output[0].split(",") && response.data.data.output[0].split(",").length === 1 && response.data.data.output[0] + " policy can not be deleted until you remove all labels under this policy from documents"}
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
      ApiInfo.DEBUGER && console.log("deleteAutoLabel error", error);
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};


//Active or Deactivate work
export const activeOrDeActiveDocs = (filterId, status, labelType) => dispatch => {
  const prevHistory = window.location.pathname;
  ApiInfo.DEBUGER && console.log("Data go to for Active or Deactive", filterId, status);
  message.loading(ApiInfo.ApiResponseMessages.postData, 100)
    .then(() => message.error(ApiInfo.ApiResponseMessages.error))
  axios({
    method: "put",
    url: ApiInfo.APIPORT + "/api/v2/autolabel/status",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: {
      filterId,
      status: status ? 1 : 0
    }
  })
    .then(response => {
      ApiInfo.DEBUGER && console.log("Active or Deactive Response", response);
      displayMessageAndDispatchAction(
        status ? ApiInfo.ApiResponseMessages.active : ApiInfo.ApiResponseMessages.deactive,
        response,
        dispatch,
        fetchAutoLabels,
        undefined,
        labelType,
        // undefined,
        prevHistory
      )
    })
    .catch(error => {
      ApiInfo.DEBUGER && console.log("deleteAutoLabel error", error);
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};


//Active or Deactivate work
export const applyRemoveLabelsOnSearchArchiveDocs =
  (apiBody, searchCriteria, removeOrApply, searchTypeTree, searchType, legalHold, apiBodyLegalHold, smartSearchAccessToken) => dispatch => {
    //Dynamically Displaying the message Removing Label(s) or Applying Label(s)
    message.loading(`${removeOrApply.includes('remove') ?
      removeOrApply.replace('remove', 'Removing Label(s)') : 'Applying Label(s)'}`,
      100)

      .then(() => message.error(ApiInfo.ApiResponseMessages.error))
    const prevHistory = window.location.pathname;

    ApiInfo.DEBUGER && console.log("Data go to for applyLabelsOnSearchArchiveDocs", JSON.stringify(apiBody));
    axios({
      method: "put",
      url: ApiInfo.APIPORT + `/api/v2/autolabel/${removeOrApply}`,
      headers: {
        "api-token": ApiInfo.APITOKEN,
        "Content-Type": "application/json",
        "x-channel": ApiInfo.APICHANNEL
      },
      data: JSON.stringify(apiBody)
    }).then(response => {
      //LegalHold
      ApiInfo.DEBUGER && console.log("applyLabelsOnSearchArchiveDocs Response", response);
      if(!legalHold)dispatch(clearSearchedResults({}));
      if (legalHold)

        displayMessageAndDispatchAction(
          ApiInfo.ApiResponseMessages.applyLabel.replace('Applied', removeOrApply),
          response,
          dispatch,
          clearOnholdDocuments,
          getOnholdDocuments,
          undefined,
          apiBodyLegalHold,
          prevHistory
        )
      //Simple Search
      else if (searchType === 1 || (searchType === 4 && searchTypeTree === "S"))
        displayMessageAndDispatchAction(
          ApiInfo.ApiResponseMessages.applyLabel.replace('Applied', removeOrApply),
          response,
          dispatch,
          postSearchData,
          undefined,
          searchCriteria,
        )

      //Query Builder
      else if (searchType === 3 || (searchType === 4 && searchTypeTree === "Q"))
        displayMessageAndDispatchAction(
          ApiInfo.ApiResponseMessages.applyLabel.replace('Applied', removeOrApply),
          response,
          dispatch,
          queryBuilderSearchData,
          undefined,
          searchCriteria,
        )

      //Advance Search
      else if (searchType === 2 || (searchType === 4 && searchTypeTree === "A"))
        displayMessageAndDispatchAction(
          ApiInfo.ApiResponseMessages.applyLabel.replace('Applied', removeOrApply),
          response,
          dispatch,
          postAdvancedSearch,
          undefined,
          searchCriteria
        )

      //Smart Search
      else if (searchType === 5 || (searchType === 4 && searchTypeTree === "SS")) {
        displayMessageAndDispatchAction(
          ApiInfo.ApiResponseMessages.applyLabel.replace('Applied', removeOrApply),
          response,
          dispatch,
          // smartSearch,
          // undefined,
          // searchCriteria
        )
        if (response.data.status === 200) {
          dispatch(smartSearch(searchCriteria, false, smartSearchAccessToken))
        }
      }
    })
      .catch(error => {
        ApiInfo.DEBUGER && console.log("applyLabelsOnSearchArchiveDocs error", error);
        message.error(ApiInfo.ApiResponseMessages.error);
      });
  };
