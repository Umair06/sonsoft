import * as ApiInfo from "../../../APIConfig/ApiParameters";
import axios from "axios";

import { GET_CONFIGURATION } from "../../Types/ControlCenterTypes/ControlCenterTypes";
import { message } from "antd";
import { displayMessageAndDispatchAction } from "../utils";
message.config({
  top: 10,
  duration: 5,
  maxCount: 1
});
export const getConfiguration = configuration => {
  return {
    type: GET_CONFIGURATION,
    payload: {
      configuration: configuration
    }
  };
};
export const fetchConfiguration = () => dispatch => {
  // !noMessage && message.loading("Fetching Configuration", 100)
  // .then(() => message.error(ApiInfo.ApiResponseMessages.error))
  const prevHistory = window.location.pathname;

  axios({
    method: "GET",
    url: ApiInfo.APIPORT + "/api/v2/control/configuration",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    }
  })
    .then(response => {
      ApiInfo.DEBUGER && console.log("control center fetchConfiguration ", response);
      // message.destroy && message.destroy()
      displayMessageAndDispatchAction(
        undefined,
        response,
        dispatch,
        getConfiguration,
        undefined,
        response.data.data.output[0],
        undefined,
        prevHistory
      );

      //   if (response.data.status === 200) {
      //     dispatch(getConfiguration(response.data.data.output[0]));
      //   } else {
      //     dispatch(getConfiguration([]));
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
      ApiInfo.DEBUGER && console.log("fetchConfiguration error", fetchConfiguration);
    });
};
