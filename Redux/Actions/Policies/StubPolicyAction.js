import {
  GET_STUBPOLICY,
  GET_STUBPOLICYSETTING,
  GET_ARCHIVEDUSERLIST
} from "../../Types/PoliciesTypes/PoliciesTypes";
import axios from "axios";
import * as ApiInfo from "../../../APIConfig/ApiParameters";
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
let loading;
function loader(loadingMessage, successMessage, span) {
  message
    .loading(loadingMessage, span || 2.5)
    .then(() =>
      loading
        ? loader(loadingMessage, successMessage)
        : message.success(successMessage, 2.5)
    );
}

export const StubPolicy = stubpolicy => {
  return {
    type: GET_STUBPOLICY,
    payload: {
      stubpolicy: stubpolicy
    }
  };
};
export const StubPolicySetting = stubsetting => {
  return {
    type: GET_STUBPOLICYSETTING,
    payload: {
      stubsetting: stubsetting
    }
  };
};
export const getArhivedUserList = archivedusers => {
  return {
    type: GET_ARCHIVEDUSERLIST,
    payload: {
      archivedusers: archivedusers
    }
  };
};

export const fetchArchivedUserList = () => dispatch => {
  const prevHistory = window.location.pathname;
  getArhivedUserList(null)

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
      ApiInfo.DEBUGER && console.log("fetchArchivedUserList response", response);

      displayMessageAndDispatchAction(
        undefined,
        response,
        dispatch,
        getArhivedUserList,
        undefined,
        response.data.data.output,
        undefined,
        prevHistory
      );

      //   if (response.data.status === 200) {
      //     dispatch(getArhivedUserList(response.data.data.output));
      //   } else {
      //     dispatch(getArhivedUserList([]));
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
      dispatch(getArhivedUserList([]));
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};

export const fetchStubPolicy = () => dispatch => {
  const prevHistory = window.location.pathname;

  axios({
    method: "get",
    url: ApiInfo.APIPORT + "/api/v2/policies/stubPolicyList",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    }
  })
    .then(response => {
      ApiInfo.DEBUGER && console.log("fetchStubPolicy response", response);
      // response.data.status === 200 ? message.success(response.data.message) :  message.error(<span>{response.data.message}<Icon type="close" className="closebtn" onClick={() => message.destroy && message.destroy()} /></span>, 0)
      loading = false;

      displayMessageAndDispatchAction(
        undefined,
        response,
        dispatch,
        StubPolicy,
        undefined,
        response.data.data.output,
        undefined,
        prevHistory
      );

      //   if (response.data.status === 200) {
      //     dispatch(StubPolicy(response.data.data.output));
      //   } else {
      //     dispatch(StubPolicy([]));
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
      ApiInfo.DEBUGER && console.log("fetchStubPolicy error", error);
      dispatch(StubPolicy([]));
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};
export const fetchStubPolicySetting = () => dispatch => {
  const prevHistory = window.location.pathname;

  axios({
    method: "get",
    url: ApiInfo.APIPORT + "/api/v2/policies/stubsetting",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    }
  })
    .then(response => {
      ApiInfo.DEBUGER && console.log("fetchStubPolicySetting response", response);

      displayMessageAndDispatchAction(
        undefined,
        response,
        dispatch,
        StubPolicySetting,
        undefined,
        response.data.data.output,
        undefined,
        prevHistory
      );

      //   if (response.data.status === 200) {
      //     dispatch(StubPolicySetting(response.data.data.output));
      //   } else {
      //     dispatch(StubPolicySetting([]));
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
      ApiInfo.DEBUGER && console.log("fetchStubPolicySetting error", error);
      dispatch(StubPolicySetting([]));
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};
export const UpdateStubPolicySetting = data => dispatch => {
  message
    .loading(ApiInfo.ApiResponseMessages.postData, 20)
    .then(() => message.error(ApiInfo.ApiResponseMessages.error));
  ApiInfo.DEBUGER && console.log("data got to UpdateStubPolicySetting", data);
  // const prevHistory = window.location.pathname;

  axios({
    method: "post",
    url: ApiInfo.APIPORT + "/api/v2/policies/updateStubSetting",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: { stubSetting: data.Stub_Policy_Setting }
  })
    .then(async response => {
      ApiInfo.DEBUGER && console.log("UpdateStubPolicySetting response", response);
      message.destroy && message.destroy();
      if (response.data.status === 200) {
        message.success(ApiInfo.ApiResponseMessages.updated);
      } else {
        // const currentHistory = window.location.pathname;
        // if (currentHistory === prevHistory) {
          if(response.data && response.data.status === 401){
            await dispatch(getAuthenticUserInfo(null))
            await dispatch(GetUserRole(null))
            if(!JSON.stringify(localStorage.getItem("userInfo")))
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
        // }  
      }

      // dispatch(StubPolicySetting(response.data.data.output))
    })
    .catch(error => {
      message.destroy && message.destroy();
      ApiInfo.DEBUGER && console.log("UpdateStubPolicySetting error", error);
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};
export const StubPolicyDetails = data => dispatch => {
  const prevHistory = window.location.pathname;

  axios({
    method: "get",
    url: ApiInfo.APIPORT + "/api/v2/policies/stubPolicy/sid",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    }
  })
    .then(response => {
      ApiInfo.DEBUGER && console.log("StubPolicyDetails response", response);

      displayMessageAndDispatchAction(
        undefined,
        response,
        dispatch,
        StubPolicySetting,
        undefined,
        response.data.data.output,
        undefined,
        prevHistory
      );

      //   if (response.data.status === 200) {
      //     dispatch(StubPolicySetting(response.data.data.output));
      //   } else {
      //     dispatch(StubPolicySetting([]));
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
      ApiInfo.DEBUGER && console.log("StubPolicyDetails error", error);
      dispatch(StubPolicySetting([]));
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};
export const PostStubPolicyDetails = data => dispatch => {
  message
    .loading(ApiInfo.ApiResponseMessages.postData, 20)
    .then(() => message.error(ApiInfo.ApiResponseMessages.error));
  ApiInfo.DEBUGER && console.log("data got to PostStubPolicyDetails", data);
  const prevHistory = window.location.pathname;

  axios({
    method: "Post",
    url: ApiInfo.APIPORT + "/api/v2/policies/insertStubPolicy",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    // data:{"name": data.Stub_Policy_Name,"desc" : data.Stub_Policy_Description,"period": data.Stub_Period,"users" : data.userid ,"enable" :data.Enable_Sync}
    data: {
      name: data.Stub_Policy_Name,
      desc: data.Stub_Policy_Description || "",
      period: data.Stub_Period,
      users: data.users === undefined ? [] : data.users,
      enable: data.Enable_Sync ? "True" : "False"
    }
  })
    .then(response => {
      ApiInfo.DEBUGER && console.log("PostStubPolicyDetails repsonse", response);
      message.destroy && message.destroy();

      displayMessageAndDispatchAction(
        ApiInfo.ApiResponseMessages.updated,
        response,
        dispatch,
        fetchStubPolicy,
        undefined,
        undefined,
        undefined,
        prevHistory
      );

      //   if (response.data.status === 200) {
      //     message.success(ApiInfo.ApiResponseMessages.updated);
      //     dispatch(fetchStubPolicy());
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
      ApiInfo.DEBUGER && console.log("PostStubPolicyDetails error", error);
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};
export const EditStubPolicyDetails = data => dispatch => {
  message
    .loading(ApiInfo.ApiResponseMessages.postData, 20)
    .then(() => message.error(ApiInfo.ApiResponseMessages.error));
  ApiInfo.DEBUGER && console.log("data got to EditStubPolicyDetails", data);
  const prevHistory = window.location.pathname;

  axios({
    method: "Post",
    url: ApiInfo.APIPORT + "/api/v2/policies/updateStubPolicy",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: {
      policyId: data.policyid,
      name: data.Stub_Policy_Name,
      desc: data.Stub_Policy_Description,
      period: data.Stub_Period,
      users: data.users,
      enable: data.Enable_Sync ? "True" : "False"
    }
  })
    .then(response => {
      ApiInfo.DEBUGER && console.log("EditStubPolicyDetails response", response);
      message.destroy && message.destroy();

      displayMessageAndDispatchAction(
        ApiInfo.ApiResponseMessages.updated,
        response,
        dispatch,
        fetchStubPolicy,
        undefined,
        undefined,
        undefined,
        prevHistory
      );

      //   if (response.data.status === 200) {
      //     message.success(ApiInfo.ApiResponseMessages.updated);
      //     dispatch(fetchStubPolicy());
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
      ApiInfo.DEBUGER && console.log("EditStubPolicyDetails error", error);
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};

export const EnableDisableStubStatus = data => dispatch => {
  message
    .loading(ApiInfo.ApiResponseMessages.postData, 20)
    .then(() => message.error(ApiInfo.ApiResponseMessages.error));
  ApiInfo.DEBUGER && console.log("data got to EnableDisableStubStatus", data);
  const prevHistory = window.location.pathname;

  axios({
    method: "Post",
    url: ApiInfo.APIPORT + "/api/v2/policies/stubStatus",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: {
      stubIDs: [data.map(val => val.STUB_POLICY_ID)],
      isEnable: data.Enable
    }
  })
    .then(response => {
      ApiInfo.DEBUGER && console.log("EnableDisableStubStatus response", response);
      message.destroy && message.destroy();
      if (response.data && response.data.status === 200) {
        resetSelectedRecords && dispatch(resetSelectedRecords())
      }
      displayMessageAndDispatchAction(
        ApiInfo.ApiResponseMessages.updated,
        response,
        dispatch,
        fetchStubPolicy,
        undefined,
        undefined,
        undefined,
        prevHistory
      );

      //   if (response.data.status === 200) {
      //     message.success(ApiInfo.ApiResponseMessages.updated);
      //     dispatch(fetchStubPolicy());
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
      ApiInfo.DEBUGER && console.log("EnableDisableStubStatus error", error);
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};
export const DeleteStubPolicy = data => dispatch => {
  message
    .loading(ApiInfo.ApiResponseMessages.deletingData, 20)
    .then(() => message.error(ApiInfo.ApiResponseMessages.error));
  ApiInfo.DEBUGER && console.log("data got to DeleteStubPolicy", data);
  const prevHistory = window.location.pathname;

  axios({
    method: "Post",
    url: ApiInfo.APIPORT + "/api/v2/policies/deleteStub",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: {
      stubIDs:
        Array.isArray(data) && data
          ? data.map(val => val.STUB_POLICY_ID)
          : [data.STUB_POLICY_ID]
    }
  })
    .then(response => {
      ApiInfo.DEBUGER && console.log("DeleteStubPolicy reponse", response);
      message.destroy && message.destroy();
      if (response.data && response.data.status === 200) {
        resetSelectedRecords && dispatch(resetSelectedRecords())
      }
      displayMessageAndDispatchAction(
        ApiInfo.ApiResponseMessages.deleted,
        response,
        dispatch,
        fetchStubPolicy,
        undefined,
        undefined,
        undefined,
        prevHistory
      );

      //   if (response.data.status === 200) {
      //     message.success(ApiInfo.ApiResponseMessages.deleted);
      //     dispatch(fetchStubPolicy());
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
      ApiInfo.DEBUGER && console.log("DeleteStubPolicy error", error);
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};
export const UpdateStubPriority = APIbody => dispatch => {
  ApiInfo.DEBUGER && console.log("data got to UpdateStubPeriod", APIbody);
  loading = true;
  loader("Applying Priority", "Priority Applied Successfully", 2);
  const prevHistory = window.location.pathname;

  axios({
    method: "Post",
    url: ApiInfo.APIPORT + "/api/v2/policies/updateStubPriority",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: APIbody
  })
    .then(response => {
      ApiInfo.DEBUGER && console.log("UpdateStubPeriod response", response);

      displayMessageAndDispatchAction(
        ApiInfo.ApiResponseMessages.updated,
        response,
        dispatch,
        fetchStubPolicy,
        undefined,
        undefined,
        undefined,
        prevHistory
      );

      //   if (response.data.status === 200) {
      //     message.success(ApiInfo.ApiResponseMessages.updated);
      //     dispatch(fetchStubPolicy());
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
      ApiInfo.DEBUGER && console.log("UpdateStubPeriod error", error);
      dispatch(fetchStubPolicy([]));
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};
