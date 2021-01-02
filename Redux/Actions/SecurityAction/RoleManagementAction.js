import {
  GET_ROLE,
  GET_ASSIGNROLE,
  GET_ROLEID,
  SUCCESS,
  GET_USER_PER_ROLE
} from "../../Types/RoleManagementTypes/RoleManagementTypes";
import * as ApiInfo from "../../../APIConfig/ApiParameters";

import axios from "axios";
import { message } from "antd";
import { displayMessageAndDispatchAction } from "../utils";
import { resetSelectedRecords } from "../updateSelectedRecordsAction/updateSelectedRecordsAction";
message.config({
  top: 10,
  duration: 5,
  maxCount: 1
});
export const getRoles = role => {
  return {
    type: GET_ROLE,
    payload: {
      role
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
export const getUserPerRole = userperrole => {
  return {
    type: GET_USER_PER_ROLE,
    payload: {
      userperrole: userperrole
    }
  };
};
export const assignRole = assignRole => {
  return {
    type: GET_ASSIGNROLE,
    payload: {
      assignRole: assignRole
    }
  };
};
export const getRoleId = id => {
  return {
    type: GET_ROLEID,
    payload: {
      roleId: id
    }
  };
};

export const fetchRoleName = () => dispatch => {
  axios
    .get(ApiInfo.APIPORT + "/api/v2/security/rolenameexist/EAS READ ONLY", {
      headers: {
        "api-token": ApiInfo.APITOKEN,
        "Content-Type": "application/json",
        "x-channel": ApiInfo.APICHANNEL
      }
    })
    .then(response => {
       ApiInfo.DEBUGER &&  console.log("fetchRoleName reponse", response);

      // dispatch(getRoles(response.data.data.output))
      // dispatch(fetchAssignRole())
    })
    .catch(error => {
       ApiInfo.DEBUGER &&  console.log("fetchRoleName error", error);

      message.error(ApiInfo.ApiResponseMessages.error);
    });
};
export const fetchRole = noMessage => dispatch => {
  const prevHistory = window.location.pathname;

  axios
    .get(ApiInfo.APIPORT + "/api/v2/security/rolelist", {
      headers: {
        "api-token": ApiInfo.APITOKEN,
        "Content-Type": "application/json",
        "x-channel": ApiInfo.APICHANNEL
      }
    })
    .then(response => {
       ApiInfo.DEBUGER &&  console.log("fetchRole response", response);
      // response.data.status === 200 ? message.success(response.data.message) :  message.error(<span>{response.data.message}<Icon type="close" className="closebtn" onClick={() => message.destroy && message.destroy()} /></span>, 0)
      // dispatch(fetchRoleName())
      displayMessageAndDispatchAction(
        undefined,
        response,
        dispatch,
        getRoles,
        undefined,
        response.data.data.output,
        undefined,
        prevHistory
      );
      //   if (response.data.status === 200) {
      //     dispatch(getRoles(response.data.data.output));
      //   } else {
      //     dispatch(getRoles([]));
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
      // dispatch(fetchAssignRole())
    })
    .catch(error => {
       ApiInfo.DEBUGER &&  console.log("fetchRole error", error);
      dispatch(getRoles([]));
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};

export const fetchAssignRole = noMessage => dispatch => {
  // !noMessage && message.loading("Fetching Assign Role", 20)
  // .then(() => message.error(ApiInfo.ApiResponseMessages.error))
  const prevHistory = window.location.pathname;

  axios
    .get(ApiInfo.APIPORT + "/api/v2/security/getUserRoleCombo/1", {
      headers: {
        "api-token": ApiInfo.APITOKEN,
        "Content-Type": "application/json",
        "x-channel": ApiInfo.APICHANNEL
      }
    })
    .then(response => {
       ApiInfo.DEBUGER &&  console.log("fetchAssignRole response", response);
      // message.destroy && message.destroy();

      displayMessageAndDispatchAction(
        undefined,
        response,
        dispatch,
        assignRole,
        undefined,
        response.data.data.output,
        undefined,
        prevHistory
      );

      //   if (response.data.status === 200) {
      //     dispatch(assignRole(response.data.data.output));
      //   } else {
      //     dispatch(assignRole([]));
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
       ApiInfo.DEBUGER &&  console.log("fetchAssignRole error", error);

      dispatch(assignRole([]));
    });
};

export const fetchRoleId = value => dispatch => {
   ApiInfo.DEBUGER &&  console.log("data got to fetchRoleId", value);
  const prevHistory = window.location.pathname;

  if (value) {
    return axios
      .get(ApiInfo.APIPORT + "/api/v2/security/role/" + value.ROLE_ID, {
        headers: {
          "api-token": ApiInfo.APITOKEN,
          "Content-Type": "application/json",
          "x-channel": ApiInfo.APICHANNEL
        }
      })
      .then(response => {
         ApiInfo.DEBUGER &&  console.log("fetchRoleId response", response);

        displayMessageAndDispatchAction(
          undefined,
          response,
          dispatch,
          getRoleId,
          undefined,
          response.data.data.output,
          undefined,
          prevHistory
        );

        // if (response.data.status === 200) {
        //   dispatch(getRoleId(response.data.data.output));
        // } else {
        //   dispatch(getRoleId([]));
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
         ApiInfo.DEBUGER &&  console.log("fetchRoleId error", error);
        message.error(ApiInfo.ApiResponseMessages.error);
        dispatch(getRoleId([]));
      });
  } else {
    dispatch(getRoleId(""));
  }
};
export const postRoleManagementData = data => dispatch => {
  message
    .loading(ApiInfo.ApiResponseMessages.postData, 20)
    .then(() => message.error(ApiInfo.ApiResponseMessages.error));
   ApiInfo.DEBUGER &&  console.log("data got to postRoleManagementData", data);
  const prevHistory = window.location.pathname;

  axios({
    method: "POST",
    url: ApiInfo.APIPORT + "/api/v2/security/insertuserrole",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: {
      roleName: data.roleName,
      roleDesc: data.roleDesc || "",
      roleType: "U",
      status: data.Enable_Sync ? 1 : 2
    }
  })
    .then(response => {
       ApiInfo.DEBUGER &&  console.log("postRoleManagementData response", response);
      message.destroy && message.destroy();

      displayMessageAndDispatchAction(
        ApiInfo.ApiResponseMessages.updated,
        response,
        dispatch,
        fetchRole,
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

      //   dispatch(fetchRole());
    })
    .catch(error => {
       ApiInfo.DEBUGER &&  console.log("postRoleManagementData error", error);

      message.error(ApiInfo.ApiResponseMessages.error);
    });
};
export const editRoleManagementData = data => dispatch => {
  message
    .loading(ApiInfo.ApiResponseMessages.postData, 20)
    .then(() => message.error(ApiInfo.ApiResponseMessages.error));
  ApiInfo.DEBUGER && console.log("data got to editRoleManagementData", data);
  const prevHistory = window.location.pathname;

  axios({
    method: "POST",
    url: ApiInfo.APIPORT + "/api/v2/security/updateuserrole",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: {
      roleId: data.id,
      roleName: data.roleName,
      roleDesc: data.roleDesc || "",
      roleType: "U",
      status: data.Enable_Sync ? 1 : 2
    }
  })
    .then(response => {
       ApiInfo.DEBUGER &&  console.log("edit RoleManagement Data response", response);
      message.destroy && message.destroy();

      displayMessageAndDispatchAction(
        ApiInfo.ApiResponseMessages.updated,
        response,
        dispatch,
        fetchRole,
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
      //   dispatch(fetchRole());
    })
    .catch(error => {
       ApiInfo.DEBUGER &&  console.log("editRoleManagementData", error);
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};
export const changeStatusRoleManagementData = data => dispatch => {
  message
    .loading(ApiInfo.ApiResponseMessages.postData, 20)
    .then(() => message.error(ApiInfo.ApiResponseMessages.error));
  // message.loading('Loading..', 20)
  ApiInfo.DEBUGER &&
    console.log(
      "data got to changeStatusRoleManagementData",
      JSON.stringify({
        roleIds: data.map(val => val.ROLE_ID),
        status: data.Enable_Sync ? 1 : 2
      })
    );
  const prevHistory = window.location.pathname;

  axios({
    method: "PUT",
    url: ApiInfo.APIPORT + "/api/v2/security/activeuserrole",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: {
      roleIds: data.map(val => val.ROLE_ID),
      status: data.Enable_Sync ? 1 : 2
    }
  })
    .then(response => {
       ApiInfo.DEBUGER &&  console.log("changeStatusRoleManagementData response", response);
      message.destroy && message.destroy();
      if (response.data && response.data.status === 200) {
        resetSelectedRecords && dispatch(resetSelectedRecords())
      }
      displayMessageAndDispatchAction(
        ApiInfo.ApiResponseMessages.updated,
        response,
        dispatch,
        fetchRole,
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
      //   dispatch(fetchRole());
    })
    .catch(error => {
       ApiInfo.DEBUGER &&  console.log("changeStatusRoleManagementData error", error);
      // message.destroy && message.destroy()
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};

export const fetchUserPerRole = data => dispatch => {
  const prevHistory = window.location.pathname;

  axios
    .get(ApiInfo.APIPORT + "/api/v2/security/roleusers/" + data, {
      headers: {
        "api-token": ApiInfo.APITOKEN,
        "Content-Type": "application/json",
        "x-channel": ApiInfo.APICHANNEL
      }
    })
    .then(response => {
       ApiInfo.DEBUGER &&  console.log("fetchUserPerRole resposne", response);

      displayMessageAndDispatchAction(
        undefined,
        response,
        dispatch,
        getUserPerRole,
        undefined,
        response.data.data.output,
        undefined,
        prevHistory
      );

      //   if (response.data.status === 200) {
      //     dispatch(getUserPerRole(response.data.data.output));
      //   } else {
      //     dispatch(getUserPerRole([]));
      //     if (response.data.status !== 204) {
      //       message.error(
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
      //     }
      //   }
    })
    .catch(error => {
       ApiInfo.DEBUGER &&  console.log("fetchUserPerRole error", error);
    });
};
export const postAssignRole = data => dispatch => {
  message
    .loading(ApiInfo.ApiResponseMessages.postData, 20)
    .then(() => message.error(ApiInfo.ApiResponseMessages.error));
   ApiInfo.DEBUGER &&  console.log("post Asssign Role", {
    roleID: data.roleid || "",
    accessAll: "0",
    users: data.users || []
  });
  const prevHistory = window.location.pathname;

  axios({
    method: "POST",
    url: ApiInfo.APIPORT + "/api/v2/security/assignrole",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: { roleID: data.roleid || "", accessAll: "0", users: data.users || [] }
  })
    .then(response => {
       ApiInfo.DEBUGER &&  console.log("Assign Role resposne", response);
      message.destroy && message.destroy();

      displayMessageAndDispatchAction(
        ApiInfo.ApiResponseMessages.updated,
        response,
        dispatch,
        fetchUserPerRole,
        undefined,
        data.roleid,
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

      //   dispatch(fetchUserPerRole(data.roleid));
    })
    .catch(error => {
       ApiInfo.DEBUGER &&  console.log("fetchRoleName error", error);
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};

export const updateLocalUser = data => dispatch => {
  message
    .loading(ApiInfo.ApiResponseMessages.postData, 20)
    .then(() => message.error(ApiInfo.ApiResponseMessages.error));
   ApiInfo.DEBUGER &&  console.log("post Asssign Role", data);
  const prevHistory = window.location.pathname;

  axios({
    method: "POST",
    url: ApiInfo.APIPORT + "/api/v2/security/assignrole",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: { roleID: [data.roleid], accessAll: "0", users: data.users }
  })
    .then(response => {
       ApiInfo.DEBUGER &&  console.log("Assign Role resposne", response);
      message.destroy && message.destroy();

      displayMessageAndDispatchAction(
        ApiInfo.ApiResponseMessages.updated,
        response,
        dispatch,
        fetchUserPerRole,
        undefined,
        data.roleid,
        undefined,
        prevHistory
      );

      //   if (response.data.status === 200) {
      //     message.success(ApiInfo.ApiResponseMessages.updated);
      //     dispatch(fetchUserPerRole(data.roleid));
      //   } else {
      //     dispatch(fetchUserPerRole(data.roleid));
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
       ApiInfo.DEBUGER &&  console.log("fetchRoleName error", error);
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};
export const deleteRole = data => dispatch => {
  const prevHistory = window.location.pathname;

  if (data && Array.isArray(data)) {
    message
      .loading(ApiInfo.ApiResponseMessages.deletingData, 20)
      .then(() => message.error(ApiInfo.ApiResponseMessages.error));
     ApiInfo.DEBUGER &&  console.log(
      "deleteRole",
      JSON.stringify({ roleIds: data.map(val => val.ROLE_ID) })
    );

    axios({
      method: "DELETE",
      url: ApiInfo.APIPORT + "/api/v2/security/deleteUserRole",
      headers: {
        "api-token": ApiInfo.APITOKEN,
        "Content-Type": "application/json",
        "x-channel": ApiInfo.APICHANNEL
      },
      data: JSON.stringify({ roleIds: data.map(val => val.ROLE_ID) })
    })
      .then(response => {
         ApiInfo.DEBUGER &&  console.log("deleteRole resposne", response);
        message.destroy && message.destroy();

        displayMessageAndDispatchAction(
          ApiInfo.ApiResponseMessages.deleted,
          response,
          dispatch,
          fetchRole,
          undefined,
          undefined,
          undefined,
          prevHistory
        );

        // if (response.data.status === 200) {
        //   message.success(ApiInfo.ApiResponseMessages.deleted);
        //   dispatch(fetchRole());
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
         ApiInfo.DEBUGER &&  console.log("fetchRoleName error", error);
      });
  } else {
    message
      .loading(ApiInfo.ApiResponseMessages.deletingData, 20)
      .then(() => message.error(ApiInfo.ApiResponseMessages.error));
     ApiInfo.DEBUGER &&  console.log("deleteRole", { roleIds: [data.ROLE_ID] });
    axios({
      method: "delete",
      url: ApiInfo.APIPORT + "/api/v2/security/deleteUserRole",
      headers: {
        "api-token": ApiInfo.APITOKEN,
        "Content-Type": "application/json",
        "x-channel": ApiInfo.APICHANNEL
      },
      data: { roleIds: [data.ROLE_ID] }
    })
      .then(response => {
         ApiInfo.DEBUGER &&  console.log("deleteRole resposne", response);
        message.destroy && message.destroy();

        displayMessageAndDispatchAction(
          ApiInfo.ApiResponseMessages.deleted,
          response,
          dispatch,
          fetchRole,
          undefined,
          undefined,
          undefined,
          prevHistory
        );

        // if (response.data.status === 200) {
        //   message.success(ApiInfo.ApiResponseMessages.deleted);
        //   dispatch(fetchRole());
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
         ApiInfo.DEBUGER &&  console.log("fetchRoleName error", error);
        message.error(ApiInfo.ApiResponseMessages.error);
      });
  }
};
