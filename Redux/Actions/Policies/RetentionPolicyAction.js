import {
  GET_RETENTIONPOLICYLIST,
  GET_RETENTIONPOLICYSETTINGLIST,
  GET_DEFAULTRETENTION,
  GET_DELETEDDOCUMENTPOLICY,
  GET_DELETEDDOCUMENTPOLICYRUNNINGSTATUS,
  GET_RETENTIONPOLICYBYID,
  GET_DELETEDDOCUMENTDATA
} from "../../Types/PoliciesTypes/PoliciesTypes";
import axios from "axios";
import * as ApiInfo from "../../../APIConfig/ApiParameters";
import { message } from "antd";
import { displayMessageAndDispatchAction } from "../utils";
import { resetSelectedRecords } from "../updateSelectedRecordsAction/updateSelectedRecordsAction";
message.config({
  top: 10,
  duration: 5,
  maxCount: 1
});


export const getDeletedDocumentData = (deletedData) => {
  return {
    type: GET_DELETEDDOCUMENTDATA,
    payload: {
      deleteddocumentdata: deletedData
    }
  }
};
export const getRetentionPolicy = retention => {
  return {
    type: GET_RETENTIONPOLICYLIST,
    payload: {
      retention: retention
    }
  };
};
export const getRetentionPolicySetting = retentionsetting => {
  return {
    type: GET_RETENTIONPOLICYSETTINGLIST,
    payload: {
      retentionsetting: retentionsetting
    }
  };
};
export const getDefaultRetentionPolicy = defaultretention => {
  return {
    type: GET_DEFAULTRETENTION,
    payload: {
      defaultretention: defaultretention
    }
  };
};
export const getRetentionPolicyById = retentionbyid => {
  return {
    type: GET_RETENTIONPOLICYBYID,
    payload: {
      retentionbyid: retentionbyid
    }
  };
};
export const getDeletedDocumentRunning = deleteddocumentrunning => {
  return {
    type: GET_DELETEDDOCUMENTPOLICYRUNNINGSTATUS,
    payload: {
      deleteddocumentrunning: deleteddocumentrunning
    }
  };
};
export const getDeletedDocument = deleteddocument => {
  return {
    type: GET_DELETEDDOCUMENTPOLICY,
    payload: {
      deleteddocument: deleteddocument
    }
  };
};

export const fetchRetentionPolicyList = () => dispatch => {
  const prevHistory = window.location.pathname;

  axios({
    method: "get",
    url: ApiInfo.APIPORT + "/api/v2/policies/retentionList",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    }
  })
    .then(response => {
      ApiInfo.DEBUGER &&
        console.log("fetchRetentionPolicyList response", response);

      displayMessageAndDispatchAction(
        undefined,
        response,
        dispatch,
        getRetentionPolicy,
        undefined,
        response && response.data && response.data.data && response.data.data.output,
        undefined,
        prevHistory
      );
    })
    .catch(error => {
      dispatch(getRetentionPolicy([]))
      ApiInfo.DEBUGER && console.log("fetchRetentionPolicyList error", error)
      message.error(ApiInfo.ApiResponseMessages.error)
    })
}
export const fetchRetentionPolicySettingList = () => dispatch => {
  const prevHistory = window.location.pathname;

  axios({
    method: "get",
    url: ApiInfo.APIPORT + "/api/v2/policies/retentionSetting",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    }
  })
    .then(response => {
      ApiInfo.DEBUGER &&
        console.log("fetchRetentionPolicySettingList reponse", response);

      displayMessageAndDispatchAction(
        undefined,
        response,
        dispatch,
        getRetentionPolicySetting,
        undefined,
        response && response.data && response.data.data && response.data.data.output,
        undefined,
        prevHistory
      );
    })
    .catch(error => {
      ApiInfo.DEBUGER && console.log("fetchRetentionPolicySettingList error", error);
      dispatch(getRetentionPolicySetting([]));
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};

export const fetchDefaultRetentionPolicyList = () => dispatch => {
  const prevHistory = window.location.pathname;

  axios({
    method: "get",
    url: ApiInfo.APIPORT + "/api/v2/policies/defaultRetention",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    }
  })
    .then(response => {
      ApiInfo.DEBUGER && console.log("fetchDefaultRetentionPolicyList response", response);
      displayMessageAndDispatchAction(
        undefined,
        response,
        dispatch,
        getDefaultRetentionPolicy,
        fetchRetentionPolicyList,
        response && response.data && response.data.data && response.data.data.output,
        undefined,
        prevHistory
      );
    })
    .catch(error => {
      ApiInfo.DEBUGER && console.log("fetchDefaultRetentionPolicyList error", error);
      dispatch(getDefaultRetentionPolicy([]));
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};
export const fetchRetentionPolicyById = () => dispatch => {
  const prevHistory = window.location.pathname;

  axios({
    method: "get",
    url: ApiInfo.APIPORT + "/api/v2/policies/retentionPolicy/1",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    }
  })
    .then(response => {
      ApiInfo.DEBUGER && console.log("fetchRetentionPolicyById response ", response);
      displayMessageAndDispatchAction(
        undefined,
        response,
        dispatch,
        getRetentionPolicyById,
        undefined,
        response && response.data && response.data.data && response.data.data.output && Array.isArray(response.data.data.output) && response.data.data.output.length > 0 && response.data.data.output[0],
        undefined,
        prevHistory
      );
    })
    // .then(response => {
    //   console.log("fetchRetentionPolicyById response ", response);
    //   if (response.data.status === 200) {
    //     dispatch(getRetentionPolicyById(response.data.data.output[0]));
    //   } else {
    //     dispatch(getRetentionPolicyById([]));
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
    // })
    .catch(error => {
      ApiInfo.DEBUGER && console.log("fetchRetentionPolicyById error", error);
      dispatch(getRetentionPolicyById([]));
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};
export const updateRetentionPolicySetting = data => dispatch => {
  ApiInfo.DEBUGER &&
    console.log("data got to updateRetentionPolicySetting", data);
  message
    .loading(ApiInfo.ApiResponseMessages.postData, 20)
    .then(() => message.error(ApiInfo.ApiResponseMessages.error));
  const prevHistory = window.location.pathname;

  axios({
    method: "post",
    url: ApiInfo.APIPORT + "/api/v2/policies/updateRetentionSetting",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: { priority: data.retention_Based, expiry: data.calculate_Expiry }
  })
    .then(response => {
      ApiInfo.DEBUGER &&
        console.log("updateRetentionPolicySetting response", response);
      displayMessageAndDispatchAction(
        ApiInfo.ApiResponseMessages.updated,
        response,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        prevHistory
      );
      // response.data.status === 200 ? message.success(ApiInfo.ApiResponseMessages.updated) :  message.error(<span>{response.data.message}<Icon type="close" className="closebtn" onClick={() => message.destroy && message.destroy()} /></span>, 0)
    })
    .catch(error => {
      ApiInfo.DEBUGER && console.log("updateRetentionPolicySetting error", error);
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};
export const updateRetentionPolicyStatus = data => dispatch => {
  ApiInfo.DEBUGER && console.log("retention status", data);
  message
    .loading(ApiInfo.ApiResponseMessages.postData, 20)
    .then(() => message.error(ApiInfo.ApiResponseMessages.error));
  const prevHistory = window.location.pathname;

  axios({
    method: "post",
    url: ApiInfo.APIPORT + "/api/v2/policies/retentionStatus",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: {
      retentionIDs: data && Array.isArray(data) && data.map(val => val.FILTER_ID),
      isEnable: `${data.Enable}`
    }
  })
    .then(response => {
      ApiInfo.DEBUGER &&
        console.log("updateRetentionPolicyStatus response", response);
      if (response.data && response.data.status === 200) {
        resetSelectedRecords && dispatch(resetSelectedRecords())
        dispatch(fetchDefaultRetentionPolicyList())
        dispatch(fetchRetentionPolicyList())
      }
      displayMessageAndDispatchAction(
        ApiInfo.ApiResponseMessages.updated,
        response,
        dispatch,
        fetchRetentionPolicyList,
        undefined,
        undefined,
        undefined,
        prevHistory
      );
      // response.data.status === 200 ? message.success(ApiInfo.ApiResponseMessages.updated) :  message.error(<span>{response.data.message}<Icon type="close" className="closebtn" onClick={() => message.destroy && message.destroy()} /></span>, 0)
    })
    .catch(error => {
      ApiInfo.DEBUGER && console.log("updateRetentionPolicyStatus error", error);
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};

export const deleteRetentionPolicy = data => dispatch => {
  ApiInfo.DEBUGER && console.log("data got to deleteRetentionPolicy", data);
  message
    .loading(ApiInfo.ApiResponseMessages.deletingData, 20)
    .then(() => message.error(ApiInfo.ApiResponseMessages.error));
  const prevHistory = window.location.pathname;

  axios({
    method: "post",
    url: ApiInfo.APIPORT + "/api/v2/policies/deleteRetention",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: {
      retentionIDs:
        data && Array.isArray(data) && data.map(val => val.FILTER_ID)
    }
  })
    .then(response => {
      ApiInfo.DEBUGER && console.log("deleteRetentionPolicy reponse", response);
      if (response.data && response.data.status === 200) {
        resetSelectedRecords && dispatch(resetSelectedRecords())
      }
      displayMessageAndDispatchAction(
        ApiInfo.ApiResponseMessages.deleted,
        response,
        dispatch,
        fetchRetentionPolicyList,
        undefined,
        undefined,
        undefined,
        prevHistory
      );
    })
    .catch(error => {
      ApiInfo.DEBUGER && console.log("deleteRetentionPolicy error", error);
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};
export const updateRetentionPolicyPriority = APIBody => dispatch => {
  message
    .loading(ApiInfo.ApiResponseMessages.applyingPriority, 20)
    .then(() => message.error(ApiInfo.ApiResponseMessages.error));
  const prevHistory = window.location.pathname;

  axios({
    method: "post",
    url: ApiInfo.APIPORT + "/api/v2/policies/updateRetentionPriority",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: APIBody
  })
    .then(response => {
      ApiInfo.DEBUGER && console.log("updateRetentionPolicyPriority response", response);
      message.destroy();

      displayMessageAndDispatchAction(
        ApiInfo.ApiResponseMessages.updated,
        response,
        dispatch,
        fetchRetentionPolicyList,
        undefined,
        undefined,
        undefined,
        prevHistory
      );
    })
    // .then(response => {
    //   console.log("updateRetentionPolicyPriority response", response)
    //   message.destroy()
    //   if (response && response.data && response.data.status === 200) {
    //     message.success(ApiInfo.ApiResponseMessages.updated)
    //     dispatch(fetchRetentionPolicyList())
    //   } else if (response && response.data && response.data.message) {
    //     message.error(<span>{response.data.message}<Icon type="close" className="closebtn" onClick={() => message.destroy && message.destroy()} /></span>, 0)
    //   }
    // })
    .catch(error => {
      ApiInfo.DEBUGER && console.log("updateRetentionPolicyPriority error", error)
      message.error(ApiInfo.ApiResponseMessages.error)
    })
}
export const updateDefaultRetention = (data) => dispatch => {
  message.loading(ApiInfo.ApiResponseMessages.postData, 100)
    .then(() => message.error(ApiInfo.ApiResponseMessages.error))
  let apiBody = { period: data.Retention_Period, gracePeriod: data.Retention_Grace_Period, enable: (data.Active || data.Active === 0) && String(data.Active) }
  ApiInfo.DEBUGER && console.log("data got to updateDefaultRetention", JSON.stringify(apiBody))
  const prevHistory = window.location.pathname;

  axios({
    method: 'post',
    url: ApiInfo.APIPORT + '/api/v2/policies/updateDefaultRetention',
    headers: { "api-token": ApiInfo.APITOKEN, 'Content-Type': 'application/json', 'x-channel': ApiInfo.APICHANNEL },
    data: JSON.stringify(apiBody)
  })
    .then(response => {
      message.destroy()
      ApiInfo.DEBUGER && console.log("updateDefaultRetention response", response)
      displayMessageAndDispatchAction(
        ApiInfo.ApiResponseMessages.updated,
        response,
        dispatch,
        fetchDefaultRetentionPolicyList,
        undefined,
        undefined,
        undefined,
        prevHistory
      );
    })
    .catch(error => {
      ApiInfo.DEBUGER &&  console.log("updateDefaultRetention error", error)
      message.error(ApiInfo.ApiResponseMessages.error)
    })
}
export const insertRetention = data => dispatch => {
  message
    .loading(ApiInfo.ApiResponseMessages.postData, 20)
    .then(() => message.error(ApiInfo.ApiResponseMessages.error));
  ApiInfo.DEBUGER &&
    console.log("data got to insertRetention", {
      name: data.Policy_Name,
      query: data.query,
      period: data.Retention_Period,
      grace: data.Retention_Grace_Period,
      enable: data.Active ? "1" : "0"
    });
  const prevHistory = window.location.pathname;

  axios({
    method: "post",
    url: ApiInfo.APIPORT + "/api/v2/policies/insertRetention",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: {
      name: data.Policy_Name,
      query: JSON.stringify(data.query),
      period: data.Retention_Period,
      grace: data.Retention_Grace_Period,
      enable: data.Active ? "1" : "0"
    }
  })
    .then(response => {
      ApiInfo.DEBUGER &&  console.log("insertRetention response", response);
      displayMessageAndDispatchAction(
        ApiInfo.ApiResponseMessages.updated,
        response,
        dispatch,
        fetchRetentionPolicyList,
        undefined,
        undefined,
        undefined,
        prevHistory
      );
    }).catch(error => {
      ApiInfo.DEBUGER &&  console.log("insertRetention error", error);
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};
export const updateRetention = data => dispatch => {
  message
    .loading(ApiInfo.ApiResponseMessages.postData, 20)
    .then(() => message.error(ApiInfo.ApiResponseMessages.error));
  ApiInfo.DEBUGER && console.log(
    "data got to updateRetention",
    JSON.stringify({
      policyId: [data.policyId],
      name: data.Policy_Name,
      query: data.query,
      period: data.Retention_Period && data.Retention_Period.toString(),
      grace:
        data.Retention_Grace_Period && data.Retention_Grace_Period.toString(),
      enable: data.Active.toString()
    })
  );
  const prevHistory = window.location.pathname;

  axios({
    method: "post",
    url: ApiInfo.APIPORT + "/api/v2/policies/updateRetention",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: JSON.stringify({
      policyId: [data.policyId],
      name: data.Policy_Name,
      query: data.query,
      period: data.Retention_Period && data.Retention_Period.toString(),
      grace:
        data.Retention_Grace_Period && data.Retention_Grace_Period.toString(),
      enable: data.Active.toString()
    })
  })
    .then(response => {
      ApiInfo.DEBUGER && console.log("updateRetention response", response);

      displayMessageAndDispatchAction(
        ApiInfo.ApiResponseMessages.updated,
        response,
        dispatch,
        fetchRetentionPolicyList,
        undefined,
        undefined,
        undefined,
        prevHistory
      );
    })
    .catch(error => {
      ApiInfo.DEBUGER && console.log("updateRetention error", error);
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};
export const fetchDeletedDocuments = noMessage => dispatch => {
  !noMessage &&
    message
      .loading(ApiInfo.ApiResponseMessages.getData, 100)
      .then(() => message.error(ApiInfo.ApiResponseMessages.error));
  const prevHistory = window.location.pathname;

  axios({
    method: "get",
    url: ApiInfo.APIPORT + "/api/v2/policies/purgePolicy",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    }
  })
    .then(response => {
      ApiInfo.DEBUGER && console.log("fetchDeletedDocuments response", response);
      !noMessage && message.destroy && message.destroy();

      displayMessageAndDispatchAction(
        undefined,
        response,
        dispatch,
        getDeletedDocument,
        undefined,
        response && response.data && response.data.data && response.data.data.output,
        undefined,
        prevHistory
      );
    })
    .catch(error => {
      ApiInfo.DEBUGER &&  console.log("fetchDeletedDocuments error", error);
      dispatch(getDeletedDocument([]));
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};
export const fetchDeletedDocumentRunningStatus = () => dispatch => {
  const prevHistory = window.location.pathname;

  axios({
    method: "get",
    url: ApiInfo.APIPORT + "/api/v2/policies/runningStatus",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    }
  })
    .then(response => {
      ApiInfo.DEBUGER && console.log("fetchDeletedDocumentRunningStatus response", response);

      displayMessageAndDispatchAction(
        undefined,
        response,
        dispatch,
        getDeletedDocumentRunning,
        undefined,
        response && response.data && response.data.data && response.data.data.output,
        undefined,
        prevHistory
      );
    })
    .catch(error => {
      ApiInfo.DEBUGER && console.log("fetchDeletedDocumentRunningStatus error", error);
      dispatch(getDeletedDocumentRunning([]));
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};
export const DeletedDocument = data => dispatch => {
  ApiInfo.DEBUGER &&  console.log("data got to DeletedDocument", data);
  const prevHistory = window.location.pathname;

  axios({
    method: "post",
    url: ApiInfo.APIPORT + "/api/v2/policies/runPurge",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: { query: data }
  })
    .then(response => {
      ApiInfo.DEBUGER && console.log("DeletedDocument response", response);
      displayMessageAndDispatchAction(
        ApiInfo.ApiResponseMessages.updated,
        response,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        prevHistory
      );
    })
    .catch(error => {
      ApiInfo.DEBUGER && console.log("DeletedDocument error", error);
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};
export const SaveDeletedDocument = data => dispatch => {
  message
    .loading(ApiInfo.ApiResponseMessages.postData, 20)
    .then(() => message.error(ApiInfo.ApiResponseMessages.error));
  ApiInfo.DEBUGER && console.log(
    "saveDeleted",
    JSON.stringify({
      query: {
        TimeZone: data.TimeZone,
        changePeriodValue: data.changePeriodValue,
        Enable: data.check ? "true" : "false",
        gracePeriod: data.gracePeriod ? "true" : "false",
        gracePeriodValue: data.gracePeriodValue,
        hours: data.hours,
        minutes: data.minutes
      }
    })
  );
  const prevHistory = window.location.pathname;

  // let SavePurgeData={
  //           time:data.hours +":"+ data.minutes + data.TimeZone,
  //           gracePeriod:data.gracePeriod,
  //           gracePeriodValue:data.gracePeriodValue,
  //           enable:data.check,
  //           changePeriodValue:data.changePeriodValue,
  //           Days:data.undefined
  //         }
  axios({
    method: "post",
    url: ApiInfo.APIPORT + "/api/v2/policies/savePurge",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: {
      query: {
        TimeZone: data.TimeZone,
        changePeriodValue: data.changePeriodValue,
        Enable: data.check ? "true" : "false",
        gracePeriod: data.gracePeriod ? "true" : "false",
        gracePeriodValue: data.gracePeriodValue,
        hours: data.hours,
        minutes: data.minutes,
        day: data.Days
      }
    }
  })
    .then(response => {
      ApiInfo.DEBUGER &&  console.log("SaveDeletedDocument response", response);
      message.destroy && message.destroy();

      displayMessageAndDispatchAction(
        ApiInfo.ApiResponseMessages.updated,
        response,
        dispatch,
        fetchDeletedDocuments,
        undefined,
        true,
        undefined,
        prevHistory
      );
    })
    .catch(error => {
      ApiInfo.DEBUGER &&  console.log("SaveDeletedDocument error", error);
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};
