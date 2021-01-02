import * as ApiInfo from "../../../APIConfig/ApiParameters";
import axios from "axios";
import { GET_STATISTIC } from "../../Types/ControlCenterTypes/ControlCenterTypes";
import { message } from "antd";
import { displayMessageAndDispatchAction } from "../utils";
message.config({
  top: 10,
  duration: 5,
  maxCount: 1
});

export const getStatistic = statistic => {
  return {
    type: GET_STATISTIC,
    payload: {
      statistic: statistic
    }
  };
};

export const fetchStatistic = () => dispatch => {
  const prevHistory = window.location.pathname;
  
  axios
    .get(ApiInfo.APIPORT + "/api/v2/control/statistics", {
      headers: {
        "api-token": ApiInfo.APITOKEN,
        "Content-Type": "application/json",
        "x-channel": ApiInfo.APICHANNEL
      }
    })
    .then(response => {
      ApiInfo.DEBUGER &&  console.log("fetchStatistics response ", response);

      displayMessageAndDispatchAction(
        undefined,
        response,
        dispatch,
        getStatistic,
        undefined,
        response.data.data.output[0],
        undefined,
        prevHistory
      );

      // if (response.data.status === 200) {
      //   dispatch(getStatistic(response.data.data.output[0]));
      // } else {
      //   dispatch(getStatistic([]));
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
      ApiInfo.DEBUGER && console.log("fetchStatistic error", error);
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};
