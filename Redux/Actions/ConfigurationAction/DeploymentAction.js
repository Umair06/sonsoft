import {
  GET_DEPLOYMENT,
  GET_DEPLOYMENT_SITES
} from "../../Types/ConfigurationTypes/ConfigurationTypes";
import axios from "axios";
import * as ApiInfo from "../../../APIConfig/ApiParameters";
import { dataLoading } from "../SimpleSearchAction/SimpleSearchAction";
import { message, Icon } from "antd";
import React from "react";
import { displayMessageAndDispatchAction } from "../utils";

//all apis related to deployment sites do not have loading and success status(will do in 7.1)

message.config({
  top: 10,
  duration: 5,
  maxCount: 1
});
var CancelToken = axios.CancelToken;
// let cancelfetchConfigurationDeployemnt;
let cancelfetchConfigurationDeployemntSites;

export const getDeployment = deployment => {
  return {
    type: GET_DEPLOYMENT,
    payload: {
      deployment: deployment
    }
  };
};

export const getDeploymentSites = deploymentsites => {
  return {
    type: GET_DEPLOYMENT_SITES,
    payload: {
      deploymentsites: deploymentsites
    }
  };
};
export const fetchConfigurationDeployemnt = noMessage => dispatch => {
  !noMessage &&
    message
      .loading(ApiInfo.ApiResponseMessages.getData, 100)
      .then(() => message.error(ApiInfo.ApiResponseMessages.error));
  const prevHistory = window.location.pathname;

  axios
    .get(ApiInfo.APIPORT + "/api/v2/configuration/deployment", {
      headers: {
        "api-token": ApiInfo.APITOKEN,
        "Content-Type": "application/json",
        "x-channel": ApiInfo.APICHANNEL
      },
      cancelToken: new CancelToken(function executor(c) {
        // An executor function receives a cancel function as a parameter
        // cancelfetchConfigurationDeployemnt = c;
      })
    })
    .then(response => {
      ApiInfo.DEBUGER && console.log("fetchConfigurationDeployemnt Response", response);
      message.destroy();

      displayMessageAndDispatchAction(
        undefined,
        response,
        dispatch,
        getDeployment,
        undefined,
        response.data.data.output[0],
        undefined,
        prevHistory
      );

      //   if (response.data.status === 200) {
      //     dispatch(getDeployment(response.data.data.output[0]));
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
      //     dispatch(getDeployment([]));
      //   }
    })
    .catch(error => {
      message.destroy && message.destroy();
      message.error(ApiInfo.ApiResponseMessages.error);
       ApiInfo.DEBUGER &&  console.log("fetchConfigurationDeployemnt", error);
    });
};
// in 7.1
export const fetchConfigurationDeployemntSites = () => dispatch => {
  cancelfetchConfigurationDeployemntSites &&
    cancelfetchConfigurationDeployemntSites();

  axios
    .get(ApiInfo.APIPORT + "/api/v2/configuration/deployment/sites", {
      headers: {
        "api-token": ApiInfo.APITOKEN,
        "Content-Type": "application/json",
        "x-channel": ApiInfo.APICHANNEL
      },
      cancelToken: new CancelToken(function executor(c) {
        // An executor function receives a cancel function as a parameter
        cancelfetchConfigurationDeployemntSites = c;
      })
    })
    .then(response => {
      message.destroy && message.destroy();
      ApiInfo.DEBUGER && console.log("fetchConfigurationDeployemntSites", response);
      response.data.status !== 200 && response.data.status === !204 &&
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
      dispatch(
        getDeploymentSites(
          response.data &&
            response.data.data &&
            Array.isArray(response.data.data.output) &&
            response.data.data.output.length === 0
            ? []
            : response.data.data.output
        )
      );
    })
    .catch(error => {
      dispatch(getDeploymentSites([]));
      message.destroy && message.destroy();
      message.error(ApiInfo.ApiResponseMessages.error);
       ApiInfo.DEBUGER &&  console.log("fetchConfigurationDeployemntSites error", error);
    });
};

export const postConfigurationDeployment = data => dispatch => {
  message
    .loading(ApiInfo.ApiResponseMessages.postData, 100)
    .then(() => message.error(ApiInfo.ApiResponseMessages.error));
  ApiInfo.DEBUGER &&
    console.log(
      "data got to postConfigurationDeployment ",
      JSON.stringify(data)
    );
  const prevHistory = window.location.pathname;

  axios({
    method: "post",
    url: ApiInfo.APIPORT + "/api/v2/configuration/deployment",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: { deployment: data }
  })
    .then(response => {
       ApiInfo.DEBUGER &&  console.log("postConfigurationDeployment response", response);
      message.destroy && message.destroy();

      displayMessageAndDispatchAction(
        ApiInfo.ApiResponseMessages.updated,
        response,
        dispatch,
        fetchConfigurationDeployemnt,
        undefined,
        true,
        undefined,
        prevHistory
      );

      //   if (response.data.status === 200) {
      //     message.success(ApiInfo.ApiResponseMessages.updated);
      //     dispatch(fetchConfigurationDeployemnt(true));
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
       ApiInfo.DEBUGER &&  console.log("postConfigurationDeployment error", error);
    });
};
export const postConfigurationDeploymentSites = data => dispatch => {
  message
    .loading(ApiInfo.ApiResponseMessages.postData, 20)
    .then(() => message.error(ApiInfo.ApiResponseMessages.error));
  ApiInfo.DEBUGER &&
    console.log(
      "data got to postConfigurationDeploymentSites",
      JSON.stringify(data)
    );
  dispatch(dataLoading(true));
  const prevHistory = window.location.pathname;
  
  axios({
    method: "post",
    url: ApiInfo.APIPORT + "/api/v2/configuration/deployment/add_site",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: { site: data }
  })
    .then(response => {
       ApiInfo.DEBUGER &&  console.log("postConfigurationDeploymentSites response", response);
      message.destroy && message.destroy();
      displayMessageAndDispatchAction(
        ApiInfo.ApiResponseMessages.updated,
        response,
        dispatch,
        fetchConfigurationDeployemntSites,
        dataLoading,
        undefined,
        false,
        prevHistory
      );

      //   if (response.data.status === 200) {
      //     message.success(ApiInfo.ApiResponseMessages.updated);
      //     dispatch(fetchConfigurationDeployemntSites());
      //     dispatch(dataLoading(false));
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
      message.destroy && message.destroy();
      message.error(ApiInfo.ApiResponseMessages.error);
       ApiInfo.DEBUGER &&  console.log("postConfigurationDeploymentSites error", error);
    });
};
export const deleteConfigurationDeploymentSites = data => dispatch => {
  message
    .loading(ApiInfo.ApiResponseMessages.deletingData, 20)
    .then(() => message.error(ApiInfo.ApiResponseMessages.error));
  ApiInfo.DEBUGER &&
    console.log("data got to deleteConfigurationDeploymentSites", data);
  const prevHistory = window.location.pathname;

  axios({
    method: "post",
    url:
      ApiInfo.APIPORT +
      "/api/v2/configuration/deployment/delete_site/" +
      data.SITE_ID,
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    }
  })
    .then(response => {
       ApiInfo.DEBUGER &&  console.log("deleteConfigurationDeploymentSites response", response);
      message.destroy && message.destroy();

      displayMessageAndDispatchAction(
        ApiInfo.ApiResponseMessages.deleted,
        response,
        dispatch,
        fetchConfigurationDeployemntSites,
        undefined,
        undefined,
        undefined,
        prevHistory
      );

      //   if (response.data.status === 200) {
      //     message.success(ApiInfo.ApiResponseMessages.deleted);
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
      //   dispatch(fetchConfigurationDeployemntSites());
    })
    .catch(error => {
      message.destroy && message.destroy();
      message.error(ApiInfo.ApiResponseMessages.error);
       ApiInfo.DEBUGER &&  console.log("deleteConfigurationDeploymentSites error", error);
    });
};
