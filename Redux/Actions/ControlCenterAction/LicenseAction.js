import * as ApiInfo from "../../../APIConfig/ApiParameters";
import axios from "axios";
import {
  GET_LICENSE,
  GET_LICENSE_INFORMATION,
  LICENSE_UPLOAD
} from "../../Types/ControlCenterTypes/ControlCenterTypes";
import { message } from "antd";
import { displayMessageAndDispatchAction } from "../utils";
import { smartSearch, saveSmartSearchAccessToken } from "../SimpleSearchAction/SimpleSearchAction";
import { updateSearchCriteria } from "../UpdateSearchCriteriaAction/UpdateSearchCriteriaAction";

message.config({
  top: 10,
  duration: 5,
  maxCount: 1
});

var CancelToken = axios.CancelToken;
let cancelLicenseFetchRequest;

export const getLicense = license => {
  return {
    type: GET_LICENSE,
    payload: {
      license: license
    }
  };
};

export const getLicenseInformation = license => {
  return {
    type: GET_LICENSE_INFORMATION,
    payload: {
      licenseInformation: license
    }
  };
};

export const uploadedLicense = license => {
  return {
    type: LICENSE_UPLOAD,
    payload: {
      uploadedlicense: license
    }
  };
};




export const fetchLicense = noMessage => dispatch => {
  // !noMessage && message.loading("Fetching License", 100)
  //     .then(() => message.error(ApiInfo.ApiResponseMessages.error))
  const prevHistory = window.location.pathname;

  axios({
    method: "GET",
    url: ApiInfo.APIPORT + "/api/v2/control/licenseConfigured",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    }
  })
    .then(response => {
      ApiInfo.DEBUGER && console.log("fetchLicense Response", response);
      // message.destroy && message.destroy();

      displayMessageAndDispatchAction(
        undefined,
        response,
        dispatch,
        getLicense,
        undefined,
        response.data.data.output[0],
        undefined,
        prevHistory
      );
    })
    .catch(error => {
      message.error(ApiInfo.ApiResponseMessages.error);
      ApiInfo.DEBUGER &&  console.log("fetchLicense error", error);
    });
};

export const fetchLicenseInformation = (noMessage, fetchLicenseforSmartSearch, APIbody, notUpdateCriteria, smartSearchAccessToken, cancelRequest) => dispatch => {
  !noMessage && fetchLicenseforSmartSearch && message.loading("Validating License", 100)
    .then(() => message.error(ApiInfo.ApiResponseMessages.error))
  const prevHistory = window.location.pathname;
  cancelLicenseFetchRequest && cancelLicenseFetchRequest();
  if (!cancelRequest) {
    axios({
      method: "GET",
      url: ApiInfo.APIPORT + "/api/v2/control/licenceInfo",
      headers: {
        "api-token": ApiInfo.APITOKEN,
        "Content-Type": "application/json",
        "x-channel": ApiInfo.APICHANNEL
      },
      cancelToken: new CancelToken(function executor(c) {
        // An executor function receives a cancel function as a parameter
        cancelLicenseFetchRequest = c;
      })
    })
      .then(response => {
        ApiInfo.DEBUGER && console.log("control center fetchLicenseInformation ", response);
        // message.destroy && message.destroy();
        if (response.data.status === 200 && fetchLicenseforSmartSearch && APIbody) {
          let licenseInformation = response.data.data.output[0];
          let Smart_Access_Token = (licenseInformation && licenseInformation.smart_search_information && licenseInformation.smart_search_information.Smart_Access_Token) || ""          
          APIbody.emailID = (licenseInformation && licenseInformation.smart_search_information && licenseInformation.smart_search_information.Smart_Email_Address) || ""
          APIbody.customer = (licenseInformation && licenseInformation.smart_search_information && licenseInformation.smart_search_information.Smart_Customer) || ""
          APIbody.source = licenseInformation.smart_search_information && licenseInformation.smart_search_information.Smart_Source
          !notUpdateCriteria && dispatch(updateSearchCriteria({ ...APIbody }, 5))
          dispatch(smartSearch(APIbody, false, Smart_Access_Token || smartSearchAccessToken))
          dispatch(saveSmartSearchAccessToken(Smart_Access_Token))
        }
        message.destroy()
        displayMessageAndDispatchAction(
          undefined,
          response,
          dispatch,
          getLicenseInformation,
          undefined,
          response && response.data && response.data.data && response.data.data.output && Array.isArray(response.data.data.output) && response.data.data.output.length > 0 ? response.data.data.output[0] : undefined,
          undefined,
          prevHistory
        );
        dispatch(fetchLicense(true))
        if (response.data.status !== 200 && fetchLicenseforSmartSearch) {
          message.warn("Unable to Read License File, Make sure that the License file is configured")
          //here we need to stop the spinner of datable and also in catch
        }
      })
      .catch(error => {
        !axios.isCancel(error) && message.error(ApiInfo.ApiResponseMessages.error);
        ApiInfo.DEBUGER && console.log("fetchLicenseInformation error", error);
        message.destroy()
      });
  }
};

export const uploadLicense = (licenseFile, removeSkeleton) => dispatch => {
  // message
  //   .loading(ApiInfo.ApiResponseMessages.postData, 100)
  //   .then(() => message.error(ApiInfo.ApiResponseMessages.error));
    const prevHistory = window.location.pathname;

    const LicensebodyFormData = new FormData();
    LicensebodyFormData.append('lic-file', licenseFile);
    
    axios({
      method: "POST",
      url: ApiInfo.APIPORT + "/api/v2/control/upload-license",
      headers: {
        "api-token": ApiInfo.APITOKEN,
        "Content-Type":'multipart/form-data',
        "x-channel": ApiInfo.APICHANNEL
      },
      data: LicensebodyFormData
    })
    .then(response => {
      message.destroy && message.destroy();
      ApiInfo.DEBUGER && console.log("uploadLicense response ", response);
      if (response.data && response.data.status === 200) {
        message.destroy && message.destroy();

        displayMessageAndDispatchAction(
          undefined,
          response,
          dispatch,
          uploadedLicense,
          undefined,
          response.data.data.output[0],
          undefined,
          prevHistory
        );
      }
      else{
        message.error(response.data.message)
        dispatch(uploadedLicense({}))
      }


  })
  .catch(error => {
    ApiInfo.DEBUGER && console.log("updateUserTasks error", error);
    message.error(ApiInfo.ApiResponseMessages.error);
  });

};

export const applyLicense = () => dispatch => {
  ApiInfo.DEBUGER && console.log("applyLicense")
  message
    .loading(ApiInfo.ApiResponseMessages.applyingLicense, 20)
    .then(() => message.error(ApiInfo.ApiResponseMessages.error));
  const prevHistory = window.location.pathname;

  axios({
    method: "PUT",
    url: ApiInfo.APIPORT + "/api/v2/control/apply-license",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: {"action":1}
  })
    .then(response => {
       ApiInfo.DEBUGER && console.log("applyLicense response", response);
      message.destroy && message.destroy();

      displayMessageAndDispatchAction(
        ApiInfo.ApiResponseMessages.licenseAppliedSuccessfully,
        response,
        dispatch,
        undefined,
        undefined,
        undefined,
        undefined,
        prevHistory
      );
      if(response.data.status === 200){
        fetchLicenseInformation(true, false, '', '', false)
      }

    })
    .catch(error => {
       ApiInfo.DEBUGER &&  console.log("applyLicense error", error);
      message.error(ApiInfo.ApiResponseMessages.error);
    });
};