import {
  GET_USERS,
  ERROR,
  GET_USERTYPE
} from "../../Types/UserManagementTypes/UserManagementTypes";
import * as ApiInfo from "../../../APIConfig/ApiParameters";
import axios from "axios";
import { message, Icon } from "antd";
import { displayMessageAndDispatchAction } from "../utils";
import { resetSelectedRecords } from "../updateSelectedRecordsAction/updateSelectedRecordsAction";
import { getAuthenticUserInfo } from '../LoginAction/LoginAction'
import GetUserRole  from '../GetUserRoleAction/GetUserRoleAction'
import React from "react";
message.config({
  top: 10,
  duration: 5,
  maxCount: 1
});
export const getUserType = type => {
  return {
    type: GET_USERTYPE,
    payload: {
      userType: type
    }
  };
};
export const getUsers = users => {
  return {
    type: GET_USERS,
    payload: {
      users: users
    }
  };
};
export const errorMessage = () => {
  return {
    type: ERROR,
    payload: {
      error: "Network Issue"
    }
  };
};

export const fetchUsers = noMessage => dispatch => {
  // !noMessage && message.loading("Fetching Mailboxes", 40)
  //     .then(() => message.error(ApiInfo.ApiResponseMessages.error))
  const prevHistory = window.location.pathname;

  axios
    .get(ApiInfo.APIPORT + "/api/v2/security/userlist", {
      headers: {
        "api-token": ApiInfo.APITOKEN,
        "Content-Type": "application/json",
        "x-channel": ApiInfo.APICHANNEL
      }
    })
    .then(response => {
      ApiInfo.DEBUGER &&  console.log("fetchUsers reponse", response);
      message.destroy();

      displayMessageAndDispatchAction(
        undefined,
        response,
        dispatch,
        getUsers,
        undefined,
        response.data.data.output,
        undefined,
        prevHistory
      );
      dispatch(fetchUserType())

      //   if (response.data.status === 200) {
      //     dispatch(getUsers(response.data.data.output));
      //   } else {
      //     dispatch(getUsers([]));
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
       ApiInfo.DEBUGER &&  console.log("fetchUsers error", error);
      dispatch(errorMessage());
      dispatch(getUsers([]));
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};

export const fetchUserCount = () => dispatch => {
  axios
    .get(ApiInfo.APIPORT + "/api/v2/security/usercount", {
      headers: {
        "api-token": ApiInfo.APITOKEN,
        "Content-Type": "application/json",
        "x-channel": ApiInfo.APICHANNEL
      }
    })
    .then(response => {
       ApiInfo.DEBUGER && console.log("fetch User Count response", response.data);
      // dispatch(getRoles(response.data.data.output))
      // dispatch(fetchAssignRole())
    })
    .catch(error => {
       ApiInfo.DEBUGER &&  console.log("fetch User Count errror", error);
      dispatch(errorMessage());
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};

export const fetchWithNoPassword = () => dispatch => {
  axios
    .get(ApiInfo.APIPORT + "/api/v2/security/userListWithNoPassword", {
      headers: {
        "api-token": ApiInfo.APITOKEN,
        "Content-Type": "application/json",
        "x-channel": ApiInfo.APICHANNEL
      }
    })

    .then(response => {
       ApiInfo.DEBUGER &&  console.log("fetchWithNoPassword response", response);
      message.destroy && message.destroy();

      // dispatch(getUsers(response.data.data.output))
    })
    .catch(error => {
       ApiInfo.DEBUGER &&  console.log("fetchWithNoPassword error", error);
      dispatch(errorMessage());
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};
export const postUserData = data => dispatch => {
  message
    .loading(ApiInfo.ApiResponseMessages.postData, 20)
    .then(() => message.error(ApiInfo.ApiResponseMessages.error));
   ApiInfo.DEBUGER &&  console.log("data got to postUserData", data);
  const prevHistory = window.location.pathname;

  axios({
    method: "post",
    url: ApiInfo.APIPORT + "/api/v2/security/insertlocaluser",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: {
      roleId: (data.Role) || (data.Role === 0 ? 0 : ""),
      userName: data.User_Name || "",
      userType: data.User_Type || "",
      // userPassword: "12345",
      displayName: data.Display_Name || "",
      mailboxName: data.Email_Address || ""
    }
    // data: {"roleId": 1,"userName": "azeem",  "userType": "S", "userPassword": "12345", "displayName": "azeem Ahmed", "mailboxName": "azeem"}
  })
    .then(response => {
       ApiInfo.DEBUGER &&  console.log("postUserData resposne ", response);
      message.destroy && message.destroy();

      displayMessageAndDispatchAction(
        ApiInfo.ApiResponseMessages.updated,
        response,
        dispatch,
        fetchUsers,
        undefined,
        true,
        undefined,
        prevHistory
      );

      //   if (response.data.status === 200) {
      //     message.success(ApiInfo.ApiResponseMessages.updated);
      //     dispatch(fetchUsers(true));
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
       ApiInfo.DEBUGER &&  console.log("postUserData error", error);
      dispatch(errorMessage());
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};
export const updateUserData = data => dispatch => {
  message
    .loading(ApiInfo.ApiResponseMessages.postData, 20)
    .then(() => message.error(ApiInfo.ApiResponseMessages.error));
  ApiInfo.DEBUGER &&
     ApiInfo.DEBUGER &&  console.log(
      "data got to updateUserData",
      data,
      JSON.stringify({
        userId: data.userId,
        roleId: data.Role,
        userName: data.User_Name,
        displayName: data.Display_Name,
        mailboxName: data.Email_Address,
        isDeleted: 0
      })
    );
  const prevHistory = window.location.pathname;

  axios({
    method: "post",
    url: ApiInfo.APIPORT + "/api/v2/security/updatelocaluser",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: {
      userId: data.userId,
      roleId: data.Role,
      userName: data.User_Name,
      displayName: data.Display_Name,
      mailboxName: data.Email_Address,
      isDeleted: 0
    }
  })
    .then(response => {
       ApiInfo.DEBUGER &&  console.log("updateUserData resposne ", response);
      message.destroy && message.destroy();

      displayMessageAndDispatchAction(
        ApiInfo.ApiResponseMessages.updated,
        response,
        dispatch,
        fetchUsers,
        undefined,
        true,
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
      //   dispatch(fetchUsers(true));
    })
    .catch(error => {
       ApiInfo.DEBUGER &&  console.log("updateUserData error", error);
      dispatch(errorMessage());
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};
export const deleteUserData = data => dispatch => {
   ApiInfo.DEBUGER &&  console.log("deleteUSer Data", data);
  const prevHistory = window.location.pathname;

  if (data && Array.isArray(data)) {
    message
      .loading(ApiInfo.ApiResponseMessages.deletingData, 20)
      .then(() => message.error(ApiInfo.ApiResponseMessages.error));
    axios({
      method: "delete",
      url: ApiInfo.APIPORT + "/api/v2/security/deletelocaluser",
      headers: {
        "api-token": ApiInfo.APITOKEN,
        "Content-Type": "application/json",
        "x-channel": ApiInfo.APICHANNEL
      },
      data: { userIds: [data.map(val => val.USER_ID)] }
    })
      .then(response => {
         ApiInfo.DEBUGER &&  console.log("delete user resposne", response);
        message.destroy && message.destroy();
        if (response.data && response.data.status === 200) {
          resetSelectedRecords && dispatch(resetSelectedRecords())
        }
        displayMessageAndDispatchAction(
          ApiInfo.ApiResponseMessages.deleted,
          response,
          dispatch,
          fetchUsers,
          undefined,
          true,
          undefined,
          prevHistory
        );

        // if (response.data.status === 200) {
        //   message.success(ApiInfo.ApiResponseMessages.deleted);
        //   dispatch(fetchUsers(true));
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
         ApiInfo.DEBUGER &&  console.log("fetchUsersName error", error);
      });
  } else {
    message
      .loading(ApiInfo.ApiResponseMessages.deletingData, 20)
      .then(() => message.error(ApiInfo.ApiResponseMessages.error));
    axios({
      method: "delete",
      url: ApiInfo.APIPORT + "/api/v2/security/deletelocaluser",
      headers: {
        "api-token": ApiInfo.APITOKEN,
        "Content-Type": "application/json",
        "x-channel": ApiInfo.APICHANNEL
      },
      data: { userIds: [data.USER_ID] }
    })
      .then(response => {
         ApiInfo.DEBUGER &&  console.log("delete user resposne", response);
        message.destroy && message.destroy();

        displayMessageAndDispatchAction(
          ApiInfo.ApiResponseMessages.deleted,
          response,
          dispatch,
          fetchUsers,
          undefined,
          true,
          undefined,
          prevHistory
        );

        // if (response.data.status === 200) {
        //   message.success(ApiInfo.ApiResponseMessages.deleted);
        //   dispatch(fetchUsers(true));
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
         ApiInfo.DEBUGER &&  console.log("fetchUsersName error", error);
      });
  }
};
export const userDataExist = () => dispatch => {
  axios({
    method: "get",
    url: ApiInfo.APIPORT + "/api/v2/security/usernameexist/faizan",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    }
    // data: {"userId": data.userId, "roleId": data.roleId, "userName": data.User_Name, "displayName": data.Display_Name, "mailboxName": data.Email_Address, "isDeleted": 0}
  })
    .then(response => {
       ApiInfo.DEBUGER &&  console.log("userDataExist? response", response);
      dispatch(fetchUsers(true));
    })
    .catch(error => {
       ApiInfo.DEBUGER &&  console.log("userDataExist? error", error);
      dispatch(errorMessage());
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};
export const fetchUserType = () => dispatch => {
  getUserType(null);

  axios({
    method: "get",
    url: ApiInfo.APIPORT + "/api/v2/security/authtype",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    }
  })
    .then(async response => {
       ApiInfo.DEBUGER &&  console.log("fetchUserType response", response);
      dispatch(getUserType(response.data.data.output[0].APPPARAM_VALUE));
      if(response.data && response.data.status === 401){
        await dispatch(getAuthenticUserInfo(null))
        await dispatch(GetUserRole(null))
        if(!JSON.stringify(localStorage.getItem("userInfo")))
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
    })
    .catch(error => {
       ApiInfo.DEBUGER &&  console.log("fetchUserType error", error);
      dispatch(errorMessage());
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};

export const postUserType = data => dispatch => {
  message
    .loading(ApiInfo.ApiResponseMessages.postData, 20)
    .then(() => message.error(ApiInfo.ApiResponseMessages.error));
   ApiInfo.DEBUGER &&  console.log("data got to postUserType", data);
  const prevHistory = window.location.pathname;
  dispatch(getUserType(null));

  axios({
    method: "post",
    url: ApiInfo.APIPORT + "/api/v2/security/authtype ",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: { authType: data.userType }
  })
    .then(response => {
       ApiInfo.DEBUGER &&  console.log("postUserType resposne ", response);
      message.destroy && message.destroy();
      displayMessageAndDispatchAction(
        ApiInfo.ApiResponseMessages.updated,
        response,
        dispatch,
        fetchUserType,
        undefined,
        undefined,
        undefined,
        prevHistory
      );
      dispatch(fetchUserType());

      //   if (response.data.status === 200) {
      //     message.success(ApiInfo.ApiResponseMessages.updated);
      //     dispatch(fetchUserType());
      //   } else {
      //     message.error(`${response.data.message}`);
      //   }
    })
    .catch(error => {
       ApiInfo.DEBUGER &&  console.log("postUserType error", error);
      fetchUserType();
      dispatch(errorMessage());
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};
