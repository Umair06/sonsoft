import * as ApiInfo from "../../../APIConfig/ApiParameters";
import axios from "axios";
import { GET_SSO } from "../../Types/SecurityTypes/SecurityTypes";
import { message } from "antd";
import { displayMessageAndDispatchAction } from "../utils";

message.config({
  top: 10,
  duration: 5,
  maxCount: 1
});

export const getSSOSetting = SSOSetting => {
  return {
    type: GET_SSO,
    payload: {
      SSOdata: SSOSetting
    }
  };
};



export const fetchSSOSetting = noMessage => dispatch => {
  !noMessage &&
    message
      .loading("Fetching SSO security", 100)
      .then(() => message.error(ApiInfo.ApiResponseMessages.error));
  const prevHistory = window.location.pathname;

  axios({
    method: "Get",
    url: ApiInfo.APIPORT + "/api/v2/security/SSO",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    }
  })
    .then(response => {
      ApiInfo.DEBUGER && console.log("fetchSSOSetting Response", response);
      message.destroy && message.destroy();

      displayMessageAndDispatchAction(
        undefined,
        response,
        dispatch,
        getSSOSetting,
        undefined,
        response.data.data.output[0],
        undefined,
        prevHistory
      );

      //   if (response.data.status === 200) {
      //     dispatch(getSSOSetting(response.data.data.output[0]));
      //   } else {
      //     dispatch(getSSOSetting([]));
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
      ApiInfo.DEBUGER && console.log("fetchSSOSetting error", error);
      dispatch(getSSOSetting([]));
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};
export const postSSOSetting = (data, certificateFile) => dispatch => {
  // console.log(certificateFile)
  ApiInfo.DEBUGER && console.log(" data got to post SSO Data", data);
  message
    .loading(ApiInfo.ApiResponseMessages.postData, 20)
    .then(() => message.error(ApiInfo.ApiResponseMessages.error));
  const prevHistory = window.location.pathname;

  axios({
    method: "post",
    url: ApiInfo.APIPORT + "/api/v2/security/SSO",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: { SSO_Setting: data }
  })
    .then(response => {
      ApiInfo.DEBUGER && console.log("postSSOSetting Response", response);
      message.destroy && message.destroy();

      displayMessageAndDispatchAction(
        ApiInfo.ApiResponseMessages.updated,
        response,
        dispatch,
        fetchSSOSetting,
        uploadcertificate,
        true,
        certificateFile,
        prevHistory
      );

      //   if (response.data.status === 200) {
      //     message.success(ApiInfo.ApiResponseMessages.updated);
      //     dispatch(fetchSSOSetting(true));
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
      ApiInfo.DEBUGER && console.log("postSSOSetting error", error);
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};

export const uploadcertificate = (certificateFile) => dispatch => {
  // console.log(certificateFile)
  // message
  //   .loading(ApiInfo.ApiResponseMessages.postData, 100)
  //   .then(() => message.error(ApiInfo.ApiResponseMessages.error));
    const prevHistory = window.location.pathname;

    const CertificatebodyFormData = new FormData();
    CertificatebodyFormData.append('cert-file', certificateFile);
    
    axios({
      method: "POST",
      url: ApiInfo.APIPORT + "/api/v2/security/cert-file-upload",
      headers: {
        "api-token": ApiInfo.APITOKEN,
        "Content-Type":'multipart/form-data',
        "x-channel": ApiInfo.APICHANNEL
      },
      data: CertificatebodyFormData
    })
    .then(response => {
      message.destroy && message.destroy();
      ApiInfo.DEBUGER && console.log("uploadcertificate response ", response);
      if (response.data && response.data.status === 200) {
        message.destroy && message.destroy();

        displayMessageAndDispatchAction(
          undefined,
          response,
          dispatch,
          undefined,
          undefined,
          undefined,
          undefined,
          prevHistory
        );
      }
      else{
        message.error(response.data.message)
      }


  })
  .catch(error => {
    ApiInfo.DEBUGER && console.log("updateUserTasks error", error);
    message.error(ApiInfo.ApiResponseMessages.error);
  });

};