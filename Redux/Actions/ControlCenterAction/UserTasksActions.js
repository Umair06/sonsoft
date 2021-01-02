import * as ApiInfo from "../../../APIConfig/ApiParameters";
import axios from "axios";
import { GET_USER_TASKS } from "../../Types/UserTasksTypes/UserTasksTypes";
import { message } from "antd";
import { displayMessageAndDispatchAction } from "../utils";
import { resetSelectedRecords } from "../updateSelectedRecordsAction/updateSelectedRecordsAction";
message.config({
  top: 10,
  duration: 5,
  maxCount: 1
});

export const getUserTasks = userTasks => {
  return {
    type: GET_USER_TASKS,
    payload: {
      userTasks
    }
  };
};

export const fetchUserTasks = () => dispatch => {
  const prevHistory = window.location.pathname;

  axios({
    method: "GET",
    url: ApiInfo.APIPORT + "/api/v2/scheduler/usertask",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    }
  })
    .then(response => {
      ApiInfo.DEBUGER && console.log("fetchUserTasks response ", response);

      displayMessageAndDispatchAction(
        undefined,
        response,
        dispatch,
        getUserTasks,
        undefined,
        response.data.data.output || [],
        undefined,
        prevHistory
      );

      // if (response.data.status === 200) {
      //   dispatch(getUserTasks(response.data.data.output || []));
      // } else {
      //   dispatch(getUserTasks([]));
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
      ApiInfo.DEBUGER && console.log("fetchUserTasks error", error);
      dispatch(getUserTasks([]));
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};

export const deleteUserTasks = jobId => dispatch => {
  ApiInfo.DEBUGER && console.log("jobId got to deleteUserTasks", jobId);
  message
    .loading(ApiInfo.ApiResponseMessages.deletingData, 100)
    .then(() => message.error(ApiInfo.ApiResponseMessages.error));
  const prevHistory = window.location.pathname;

  axios({
    method: "DELETE",
    url: ApiInfo.APIPORT + "/api/v2/scheduler/usertask/" + jobId,
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    }
  })
    .then(response => {
      message.destroy && message.destroy();
      ApiInfo.DEBUGER && console.log("deleteUserTasks response ", response);

      displayMessageAndDispatchAction(
        ApiInfo.ApiResponseMessages.deleted,
        response,
        dispatch,
        fetchUserTasks,
        undefined,
        undefined,
        undefined,
        prevHistory
      );

      // if (response.data.status === 200) {
      //   message.success(ApiInfo.ApiResponseMessages.deleted);
      //   dispatch(fetchUserTasks());
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
      ApiInfo.DEBUGER && console.log("deleteUserTasks error", error);
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};

export const updateUserTasks = jobId => dispatch => {
  ApiInfo.DEBUGER && console.log("jobId got to updateUserTasks", jobId);
  message
    .loading(ApiInfo.ApiResponseMessages.postData, 100)
    .then(() => message.error(ApiInfo.ApiResponseMessages.error));
    const prevHistory = window.location.pathname;

  axios({
    method: "POST",
    url: ApiInfo.APIPORT + "/api/v2/scheduler/usertask/" + jobId,
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    }
  })
    .then(response => {
      message.destroy && message.destroy();
      ApiInfo.DEBUGER && console.log("updateUserTasks response ", response);
      if (response.data && response.data.status === 200) {
        resetSelectedRecords && dispatch(resetSelectedRecords())
      }
      displayMessageAndDispatchAction(
        ApiInfo.ApiResponseMessages.updated,
        response,
        dispatch,
        fetchUserTasks,
        undefined,
        undefined,
        undefined,
        prevHistory
      );

      // if (response.data.status === 200) {
      //   message.success(ApiInfo.ApiResponseMessages.updated);
      //   dispatch(fetchUserTasks());
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
      ApiInfo.DEBUGER &&  console.log("updateUserTasks error", error);
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};
