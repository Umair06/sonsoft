import { GET_GENERAL } from "../../Types/ConfigurationTypes/ConfigurationTypes";
import axios from "axios";
import * as ApiInfo from "../../../APIConfig/ApiParameters";
import { message } from "antd";
import { displayMessageAndDispatchAction } from "../utils";
message.config({
  top: 10,
  duration: 5,
  maxCount: 1
});
export const getGeneral = general => {
  return {
    type: GET_GENERAL,
    payload: {
      general: general
    }
  };
};

export const fetchConfigurationGeneral = noMessage => dispatch => {
  !noMessage &&
    message
      .loading(ApiInfo.ApiResponseMessages.getData, 100)
      .then(() => message.error(ApiInfo.ApiResponseMessages.error));
  const prevHistory = window.location.pathname;

  axios
    .get(ApiInfo.APIPORT + "/api/v2/configuration/general", {
      headers: {
        "api-token": ApiInfo.APITOKEN,
        "Content-Type": "application/json",
        "x-channel": ApiInfo.APICHANNEL
      }
    })
    .then(response => {
      ApiInfo.DEBUGER &&
        console.log("fetchConfigurationGeneral Response", response);
      !noMessage && message.destroy && message.destroy();

      displayMessageAndDispatchAction(
        undefined,
        response,
        dispatch,
        getGeneral,
        undefined,
        response.data.data.output[0],
        undefined,
        prevHistory
      );

      // if (response.data.status === 200) {
      //   dispatch(getGeneral(response.data.data.output[0]));
      // } else {
      //   dispatch(getGeneral([]));
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
      message.error(ApiInfo.ApiResponseMessages.error);
      ApiInfo.DEBUGER && console.log("fetchConfigurationGeneral", error);
    });
};
export const postConfigurationGeneral = data => dispatch => {
  ApiInfo.DEBUGER && console.log("data got to postConfigurationGeneral ", data);
  message
    .loading(ApiInfo.ApiResponseMessages.postData, 100)
    .then(() => message.error(ApiInfo.ApiResponseMessages.error));
  const prevHistory = window.location.pathname;

  axios({
    method: "Post",
    url: ApiInfo.APIPORT + "/api/v2/configuration/general",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: data
  })
    .then(response => {
      ApiInfo.DEBUGER && console.log("postConfigurationGeneral response", response);
      message.destroy && message.destroy();

      displayMessageAndDispatchAction(
        ApiInfo.ApiResponseMessages.updated,
        response,
        dispatch,
        fetchConfigurationGeneral,
        undefined,
        true,
        undefined,
        prevHistory
      );

      // if (response.data.status === 200) {
      //   message.success(ApiInfo.ApiResponseMessages.updated);
      //   dispatch(fetchConfigurationGeneral(true));
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
      message.error(ApiInfo.ApiResponseMessages.error);
      ApiInfo.DEBUGER && console.log("postConfigurationGeneral error", error);
    });
};
