import {
  GET_USERLIST,
  GET_SELECTEDUSERLIST,
  GET_EXTERNALUSERLIST,
  ADD_EXTERNALUSER,
  DELETE_EXTERNALUSER,
  GET_ARCHIVALUSERTYPE
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

export const User = users => {
  return {
    type: GET_USERLIST,
    payload: {
      users: users
    }
  };
};
export const selectedUser = selectedusers => {
  return {
    type: GET_SELECTEDUSERLIST,
    payload: {
      selectedusers: selectedusers
    }
  };
};
export const ExternalUser = externalusers => {
  return {
    type: GET_EXTERNALUSERLIST,
    payload: {
      externalusers: externalusers
    }
  };
};
export const getArchivalType = archivalusertype => {
  return {
    type: GET_ARCHIVALUSERTYPE,
    payload: {
      archivalusertype: archivalusertype
    }
  };
};
export const AddExternalUser = addexternalusers => {
  return {
    type: ADD_EXTERNALUSER,
    payload: {
      addexternalusers: addexternalusers
    }
  };
};
export const DeleteExternalUser = filteredUsers => {
  resetSelectedRecords && resetSelectedRecords();
  return {
    type: DELETE_EXTERNALUSER,
    payload: {
      deleteexternaluser: filteredUsers
    }
  };
};

export const fetchUserList = () => dispatch => {
  // !noMessage && message.loading("Fetching Policy", 100)
  // .then(() => message.error(ApiInfo.ApiResponseMessages.error))
  const prevHistory = window.location.pathname;

  axios({
    method: "get",
    url: ApiInfo.APIPORT + "/api/v2/policies/userslist",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    }
  })
    .then(response => {
      ApiInfo.DEBUGER && console.log("fetchUserList response", response);
      // !noMessage && message.destroy && message.destroy();

      displayMessageAndDispatchAction(
        undefined,
        response,
        dispatch,
        User,
        undefined,
        response && response.data && response.data.data && response.data.data.output,
        undefined,
        prevHistory
      );

      //   if (response.data.status === 200) {
      //     dispatch(User(response.data.data.output));
      //   } else {
      //     dispatch(User([]));
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
      message.error(ApiInfo.ApiResponseMessages.error);
      dispatch(User([]));
      ApiInfo.DEBUGER && console.log("fetchUserList error", error);
    });
};

export const fetchSelectedUserList = noMessage => dispatch => {
  // !noMessage && message.loading("Fetching Policy", 100)
  // .then(() => message.error(ApiInfo.ApiResponseMessages.error))
  const prevHistory = window.location.pathname;

  axios({
    method: "get",
    url: ApiInfo.APIPORT + "/api/v2/policies/selecteduserslist",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    }
  })
    .then(response => {
      ApiInfo.DEBUGER &&  console.log("fetchSelectedUserList response", response);
      // !noMessage && message.destroy && message.destroy();
      ApiInfo.DEBUGER &&  console.log(prevHistory)
      displayMessageAndDispatchAction(
        undefined,
        response,
        dispatch,
        selectedUser,
        undefined,
        response && response.data && response.data.data && response.data.data.output,
        undefined,
        prevHistory
      );

      //   if (response.data.status === 200) {
      //     dispatch(selectedUser(response.data.data.output));
      //   } else {
      //     dispatch(selectedUser([]));
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
      message.error(ApiInfo.ApiResponseMessages.error);
      dispatch(selectedUser([]));
      ApiInfo.DEBUGER &&  console.log("fetchSelectedUserList error", error);
    });

};
export const fetchExternalUserList = () => dispatch => {
  const prevHistory = window.location.pathname;

  axios({
    method: "get",
    url: ApiInfo.APIPORT + "/api/v2/policies/externaluserslist",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    }
  })
    .then(response => {
      ApiInfo.DEBUGER &&
        ApiInfo.DEBUGER &&  console.log("fetchExternalUserList response", response);

      displayMessageAndDispatchAction(
        undefined,
        response,
        dispatch,
        ExternalUser,
        undefined,
        response && response.data && response.data.data && response.data.data.output,
        undefined,
        prevHistory
      );

      //   if (response.data.status === 200) {
      //     dispatch(ExternalUser(response.data.data.output));
      //   } else {
      //     dispatch(ExternalUser([]));
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
      message.error(ApiInfo.ApiResponseMessages.error);
      dispatch(ExternalUser([]));
      ApiInfo.DEBUGER &&  console.log("fetchExternalUserList error", error);
    });
};
export const fetchArchivalType = () => dispatch => {
  // if(!loading){
  //     loading = true
  //     loader("Loading...")
  // }
  message
    .loading(ApiInfo.ApiResponseMessages.getData, 20)
    .then(() => message.error(ApiInfo.ApiResponseMessages.error));
  const prevHistory = window.location.pathname;

  axios({
    method: "get",
    url: ApiInfo.APIPORT + "/api/v2/policies/archiveType",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    }
  })
    .then(response => {
      ApiInfo.DEBUGER && console.log("fetchArchivalType response", response);
      message.destroy && message.destroy();

      displayMessageAndDispatchAction(
        undefined,
        response,
        dispatch,
        getArchivalType,
        undefined,
        response && response.data && response.data.data && response.data.data.output,
        undefined,
        prevHistory
      );

      //   if (response.data.status === 200) {
      //     dispatch(getArchivalType(response.data.data.output));
      //   } else {
      //     dispatch(getArchivalType([]));
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
      message.destroy && message.destroy();
      message.error(ApiInfo.ApiResponseMessages.error);
      dispatch(getArchivalType([]));
      ApiInfo.DEBUGER &&  console.log("fetchArchivalType error", error);
    });
};
export const PostExternalUserList = data => dispatch => {
  message
    .loading(ApiInfo.ApiResponseMessages.postData, 20)
    .then(() => message.error(ApiInfo.ApiResponseMessages.error));
  ApiInfo.DEBUGER && console.log("data got to PostExternalUserList", data);
  const prevHistory = window.location.pathname;

  axios({
    method: "post",
    url: ApiInfo.APIPORT + "/api/v2/policies/insertexternalusers",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: {
      externalUsers:
        data && data.length > 0 ? data.map(val => val.EMAIL_ID) : []
    }
  })
    .then(response => {
      ApiInfo.DEBUGER &&  console.log("PostExternalUserList response", response);
      message.destroy && message.destroy();

      displayMessageAndDispatchAction(
        ApiInfo.ApiResponseMessages.updated,
        response,
        dispatch,
        fetchUserList,
        fetchSelectedUserList,
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
      //   dispatch(fetchUserList());
      //   dispatch(fetchSelectedUserList());
    })
    .catch(error => {
      message.destroy && message.destroy();
      message.error(ApiInfo.ApiResponseMessages.error);
      ApiInfo.DEBUGER &&  console.log("PostExternalUserList error", error);
    });
};
export const insertNewArchivalUser = data => dispatch => {
  message
    .loading(ApiInfo.ApiResponseMessages.postData, 20)
    .then(() => message.error(ApiInfo.ApiResponseMessages.error));
  ApiInfo.DEBUGER && console.log("archival Action data", data);
  const prevHistory = window.location.pathname;

  axios({
    method: "post",
    url: ApiInfo.APIPORT + "/api/v2/policies/insertarchivalusers",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: {
      userIds: data && data.userlist === undefined ? [] : data.userlist,
      archiveType: data.userOption
    }
  })
    .then(response => {
      ApiInfo.DEBUGER &&  console.log("insertNewArchivalUser response", response);
      message.destroy();

      displayMessageAndDispatchAction(
        ApiInfo.ApiResponseMessages.updated,
        response,
        dispatch,
        fetchSelectedUserList,
        fetchUserList,
        undefined,
        undefined,
        prevHistory
      );

      //   if (response.data.status === 200) {
      //     message.success(ApiInfo.ApiResponseMessages.updated);
      //     dispatch(fetchSelectedUserList());
      //     dispatch(fetchUserList());
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
      message.error(ApiInfo.ApiResponseMessages.error);
      ApiInfo.DEBUGER &&  console.log("insertNewArchivalUser error", error);
    });
};
