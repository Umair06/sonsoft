import * as ApiInfo from "../../../APIConfig/ApiParameters";
import axios from "axios";

import { GET_STATUS } from "../../Types/ControlCenterTypes/ControlCenterTypes";
import { message } from "antd";
import { displayMessageAndDispatchAction } from "../utils";
message.config({
  top: 10,
  duration: 5,
  maxCount: 1
});

export const getStatus = status => {
  return {
    type: GET_STATUS,
    payload: {
      status: status
    }
  };
};
export const fetchStatus = () => dispatch => {
  // !noMessage && message.loading("Fetching Status", 100)
  // .then(() => message.error(ApiInfo.ApiResponseMessages.error))
  const prevHistory = window.location.pathname;

  axios({
    method: "GET",
    url: ApiInfo.APIPORT + "/api/v2/control/status",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    }
  })
    .then(response => {
      ApiInfo.DEBUGER && console.log("fetchStatus response", response);
      // message.destroy && message.destroy();

      displayMessageAndDispatchAction(
        undefined,
        response,
        dispatch,
        getStatus,
        undefined,
        response.data.data.output[0],
        undefined,
        prevHistory
      );

    //   if (response.data.status === 200) {
    //     dispatch(getStatus(response.data.data.output[0]));
    //   } else {
    //     dispatch(getStatus([]));
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
      ApiInfo.DEBUGER && console.log("fetchStatus error", error);
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};
