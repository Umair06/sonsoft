import * as ApiInfo from "../../../APIConfig/ApiParameters";
import axios from "axios";
import { GET_SYSTEM_TASKS } from "../../Types//SystemTasksTypes/SystemTasks";
import { message, Icon } from "antd";
import React from "react";
import { displayMessageAndDispatchAction } from "../utils";
message.config({
  top: 10,
  duration: 5,
  maxCount: 1
});

export const getSystemTasks = systemTasks => {
  return {
    type: GET_SYSTEM_TASKS,
    payload: {
      systemTasks
    }
  };
};

export const fetchSystemTasks = () => dispatch => {
  const prevHistory = window.location.pathname;

  axios({
    method: "GET",
    url: ApiInfo.APIPORT + "/api/v2/scheduler/systemtask",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    }
  })
    .then(response => {
      ApiInfo.DEBUGER && console.log("fetchSystemTasks response ", response);
      response.data.message !== "Success" &&
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

      displayMessageAndDispatchAction(
        undefined,
        response,
        dispatch,
        getSystemTasks,
        undefined,
        response.data.data.output,
        undefined,
        prevHistory
      );
      // if (response.data.status === 200) {
      //   dispatch(getSystemTasks(response.data.data.output));
      // } else {
      //   dispatch(getSystemTasks([]));
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
      ApiInfo.DEBUGER && console.log("fetchSystemTasks error", error);
      dispatch(getSystemTasks([]));
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};
