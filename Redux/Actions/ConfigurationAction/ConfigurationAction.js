// import { GET_APPLICATIONPARAMETERS, ERROR, GET_ACTIVEDIRECTORYLIST, GET_OULIST, GET_GENERAL, GET_DEPLOYMENT, GET_DEPLOYMENT_SITES } from '../../Types/ConfigurationTypes/ConfigurationTypes'
// import axios from 'axios';
// import * as ApiInfo from "../../../APIConfig/ApiParameters"
// import { message } from "antd"
// message.config({
//     top: 10,
//     duration: 5,
// });

// export const getApplicationParameters = (applicationParameterData) => {
//     return {
//         type: GET_APPLICATIONPARAMETERS,
//         payload: {
//             applicationParameter: applicationParameterData
//         }
//     }
// }
// export const getActiveDirectory = (activeDirectoryList) => {
//     return {
//         type: GET_ACTIVEDIRECTORYLIST,
//         payload: {
//             activeDirectory: activeDirectoryList
//         }

//     }
// }
// export const savedOUList = (OUList) => {
//     return {
//         type: GET_OULIST,
//         payload: {
//             Ou: OUList
//         }

//     }
// }
// export const errorMessage = () => {

//     return {
//         type: ERROR,
//         payload: {
//             error: "Network Issue"
//         }


//     }
// }
// export const getGeneral = (general) => {
//     return {
//         type: GET_GENERAL,
//         payload: {
//             general: general
//         }
//     }
// }
// export const getDeployment = (deployment) => {
//     return {
//         type: GET_DEPLOYMENT,
//         payload: {
//             deployment: deployment
//         }
//     }
// }
// export const getDeploymentSites = (deploymentsites) => {
//     return {
//         type: GET_DEPLOYMENT_SITES,
//         payload: {
//             deploymentsites: deploymentsites
//         }
//     }
// }
// export const fetchConfigurationDeployemnt = () => dispatch => {
//     axios.get(ApiInfo.APIPORT + "/api/v2/configuration/deployment", {
//         headers: { "api-token": ApiInfo.APITOKEN, 'Content-Type': 'application/json; charset=utf-8', 'Accept': 'application/json', 'x-channel': ApiInfo.APICHANNEL }
//     })
//         .then(response => {
//             ApiInfo.DEBUGER && console.log("fetchConfigurationDeployemnt Response", response)

//             dispatch(getDeployment(response.data.data))
//         })
//         .catch(error => {
//             dispatch(errorMessage())
//             message.error(ApiInfo.ApiResponseMessages.error)
//             console.log("fetchConfigurationDeployemnt", error)
//         })
// }
// export const fetchConfigurationDeployemntSites = () => dispatch => {
//     axios.get(ApiInfo.APIPORT + "/api/v2/configuration/deployment/sites", {
//         headers: { "api-token": ApiInfo.APITOKEN, 'Content-Type': 'application/json; charset=utf-8', 'Accept': 'application/json', 'x-channel': ApiInfo.APICHANNEL }
//     })
//         .then(response => {
//             ApiInfo.DEBUGER && console.log("fetchConfigurationDeployemntSites", response)

//             dispatch(getDeploymentSites(response.data.data.output))
//         })
//         .catch(error => {
//             dispatch(errorMessage())
//             dispatch(getDeploymentSites([]))
//             message.error(ApiInfo.ApiResponseMessages.error)
//             console.log("fetchConfigurationDeployemntSites error", error)
//         })
// }

// export const postConfigurationDeployment = (data) => dispatch => {
//     ApiInfo.DEBUGER && console.log("data got to postConfigurationDeployment ", JSON.stringify(data))

//     axios({
//         method: 'post',
//         url: ApiInfo.APIPORT + '/api/v2/configuration/deployment',
//         headers: { "api-token": ApiInfo.APITOKEN, 'Content-Type': 'application/json', 'x-channel': ApiInfo.APICHANNEL },
//         data: { "deployment": data && JSON.stringify(data) }

//     }).then(response => {
//         console.log("postConfigurationDeployment response", response)
//         response.data.status === 200 ? message.success("updated ") : message.error(ApiInfo.ApiResponseMessages.error)
//         dispatch(fetchConfigurationDeployemnt())
//     })
//         .catch(error => {
//             dispatch(errorMessage())
//             message.error(ApiInfo.ApiResponseMessages.error)
//             console.log("postConfigurationDeployment error", error)
//         })

// }
// export const postConfigurationDeploymentSites = (data) => dispatch => {
//     ApiInfo.DEBUGER && console.log("data got to postConfigurationDeploymentSites", data)

//     axios({
//         method: 'post',
//         url: ApiInfo.APIPORT + '/api/v2/configuration/deployment/add_site',
//         headers: { "api-token": ApiInfo.APITOKEN, 'Content-Type': 'application/json', 'x-channel': ApiInfo.APICHANNEL },
//         data: { "site": data }

//     }).then(response => {
//         console.log("postConfigurationDeploymentSites response", response)
//         response.data.status === 200 ? message.success("updated ") : message.error(ApiInfo.ApiResponseMessages.error)
//         dispatch(fetchConfigurationDeployemntSites())
//     })
//         .catch(error => {
//             dispatch(errorMessage())
//             message.error(ApiInfo.ApiResponseMessages.error)
//             console.log("postConfigurationDeploymentSites error", error)
//         })

// }
// export const deleteConfigurationDeploymentSites = (data) => dispatch => {
//     ApiInfo.DEBUGER && console.log("data got to deleteConfigurationDeploymentSites", data)

//     axios({
//         method: 'post',
//         url: ApiInfo.APIPORT + '/api/v2/configuration/deployment/delete_site/' + data.SITE_ID,
//         headers: { "api-token": ApiInfo.APITOKEN, 'Content-Type': 'application/json', 'x-channel': ApiInfo.APICHANNEL },


//     }).then(response => {
//         console.log("deleteConfigurationDeploymentSites response", response)
//         response.data.status === 200 ? message.success("Deleted ") : message.error(ApiInfo.ApiResponseMessages.error)
//         dispatch(fetchConfigurationDeployemntSites())
//     })
//         .catch(error => {
//             dispatch(errorMessage())
//             message.error(ApiInfo.ApiResponseMessages.error)
//             console.log("deleteConfigurationDeploymentSites error", error)
//         })

// }
// export const fetchConfigurationGeneral = () => dispatch => {
//     axios.get(ApiInfo.APIPORT + "/api/v2/configuration/general", {
//         headers: { "api-token": ApiInfo.APITOKEN, 'Content-Type': 'application/json; charset=utf-8', 'Accept': 'application/json', 'x-channel': ApiInfo.APICHANNEL }
//     })
//         .then(response => {
//             ApiInfo.DEBUGER && console.log("fetchConfigurationGeneral Response", response)

//             dispatch(getGeneral(response.data.data))
//         })
//         .catch(error => {
//             dispatch(errorMessage())
//             message.error(ApiInfo.ApiResponseMessages.error)
//             console.log("fetchConfigurationGeneral", error)
//         })
// }
// export const fetchActiveDirectoryList = () => dispatch => {
//     axios.get(ApiInfo.APIPORT + "/api/v2/configuration/ad", {
//         headers: { "api-token": ApiInfo.APITOKEN, 'Content-Type': 'application/json', 'x-channel': ApiInfo.APICHANNEL },
//     })
//         .then(response => {
//             console.log("fetchActiveDirectoryList response", response)
//             dispatch(getActiveDirectory(response.data.data.output))
//         })
//         .catch(error => {
//             dispatch(errorMessage())
//             message.error(ApiInfo.ApiResponseMessages.error)
//             dispatch(getActiveDirectory([]))
//             console.log("fetchActiveDirectoryList error", error)
//         })
// }
// export const postActiveDirectoryUser = (data) => dispatch => {
//     console.log("data got to postActiveDirectoryUser", data)
//     axios({
//         method: 'POST',
//         url: ApiInfo.APIPORT + '/api/v2/configuration/ad_add',
//         headers: { "api-token": ApiInfo.APITOKEN, 'Content-Type': 'application/json','x-channel': ApiInfo.APICHANNEL },
//         data: { "adDomainName": data.Domain_Name, "netBiosName": data.netBios, "adUserName": data.User_Name, "adPassword": data.Password, "isActive": data.Enable_Sync, "oUList": data.discoverOU, "isAzure": data.isAzure, "clientId": data.Application_Client_ID }
//     })
//         .then(response => {
//             console.log("postActiveDirectoryUser response", response)
//             response.data.status === 200 ? message.success("data Entered") : message.error(ApiInfo.ApiResponseMessages.error)
//             dispatch(fetchActiveDirectoryList())
//         })
//         .catch(error => {
//             dispatch(errorMessage())
//             message.error(ApiInfo.ApiResponseMessages.error)
//             console.log("postActiveDirectoryUser error", error)
//         })
// }


// export const updateActiveDirectoryUser = (data) => dispatch => {
//     console.log("data got to updateActiveDirectoryUser", data)
//     axios({
//         method: 'POST',
//         url: ApiInfo.APIPORT + '/api/v2/configuration/ad_update',
//         headers: { "api-token": ApiInfo.APITOKEN, 'Content-Type': 'application/json','x-channel': ApiInfo.APICHANNEL },
//         data: { "adID": data.adId, "adDomainName": data.Domain_Name, "netBiosName": data.netBios, "adUserName": data.User_Name, "adPassword": data.Password, "isActive": data.Enable_Sync, "oUList": data.discoverOU, "isAzure": data.isAzure, "clientId": data.Application_Client_ID }
//     })
//         .then(response => {
//             console.log("updateActiveDirectoryUser response", response)
//             response.data.status === 200 ? message.success("data Updated") : message.error(ApiInfo.ApiResponseMessages.error)
//             dispatch(fetchActiveDirectoryList())
//         })
//         .catch(error => {
//             dispatch(errorMessage())
//             message.error(ApiInfo.ApiResponseMessages.error)
//             console.log("updateActiveDirectoryUser error", error)
//         })
// }

// export const updateActiveDirectoryUserStatus = (data) => dispatch => {
//     console.log("data got to updateActiveDirectoryUserStatus", data)
//     axios({
//         method: 'POST',
//         url: ApiInfo.APIPORT + '/api/v2/configuration/ad/update_status',
//         headers: { "api-token": ApiInfo.APITOKEN, 'Content-Type': 'application/json','x-channel': ApiInfo.APICHANNEL },
//         data: { "adId": [data.map(val => val.AD_ID)], "status": data.Enable }
//     })


//         .then(response => {
//             console.log("updateActiveDirectoryUserStatus response", response)
//             response.data.status === 200 ? message.success("data Updated") : message.error(ApiInfo.ApiResponseMessages.error)
//             dispatch(fetchActiveDirectoryList())
//         })
//         .catch(error => {
//             dispatch(errorMessage())
//             message.error(ApiInfo.ApiResponseMessages.error)
//             console.log("updateActiveDirectoryUserStatus error", error)
//         })
// }
// export const deleteActiveDirectory = (data) => dispatch => {
//     // console.log("data got to deleteActiveDirectory", data)
//     axios({
//         method: 'delete',
//         url: ApiInfo.APIPORT + '/api/v2/configuration/ad',
//         headers: { "api-token": ApiInfo.APITOKEN, 'Content-Type': 'application/json','x-channel': ApiInfo.APICHANNEL },
//         data: { "adId": [data.map(val => val.AD_ID)] }
//     })
//         .then(response => {
//             console.log("deleteActiveDirectory response", response)
//             response.data.status === 200 ? message.success("data Deleted") : message.error(ApiInfo.ApiResponseMessages.error)
//             dispatch(fetchActiveDirectoryList())
//         })
//         .catch(error => {
//             dispatch(errorMessage())
//             message.error(ApiInfo.ApiResponseMessages.error)
//             console.log("deleteActiveDirectory error", error)
//         })
// }

// export const fetchOU = () => dispatch => {

//     axios({
//         method: 'get',
//         url: ApiInfo.APIPORT + '/api/v2/configuration/ou',
//         headers: { "api-token": ApiInfo.APITOKEN, 'Content-Type': 'application/json','x-channel': ApiInfo.APICHANNEL },
//     })
//         .then(response => {
//             console.log("fetchOU response", response)
//             dispatch(fetchActiveDirectoryList())
//         })
//         .catch(error => {
//             dispatch(errorMessage())
//             message.error(ApiInfo.ApiResponseMessages.error)
//             console.log("fetchOU error", error)
//         })
// }


// export const fetchOUUser = () => dispatch => {
//     axios({
//         method: 'get',
//         url: ApiInfo.APIPORT + '/api/v2/configuration/ou/1',
//         headers: { "api-token": ApiInfo.APITOKEN, 'Content-Type': 'application/json','x-channel': ApiInfo.APICHANNEL },

//     })
//         .then(response => {
//             console.log("fetchOUUser response", response)
//             dispatch(fetchActiveDirectoryList())
//         })
//         .catch(error => {
//             dispatch(errorMessage())
//             message.error(ApiInfo.ApiResponseMessages.error)
//             console.log("fetchOUUser error", error)
//         })
// }

// export const updateConfiguration = (data) => dispatch => {
//     console.log("Data got to updateConfiguration", data)

//     axios({
//         method: 'put',
//         url: ApiInfo.APIPORT + '/api/v2/configuration',
//         headers: { "api-token": ApiInfo.APITOKEN, 'Content-Type': 'application/json', 'x-channel': ApiInfo.APICHANNEL },
//         data: { "appParam": data }

//     }).then(response => {
//         console.log("updateConfiguration response", response)
//         response.data.status === 200 ? message.success("updated Entererd") : message.error(ApiInfo.ApiResponseMessages.error)
//         dispatch(fetchActiveDirectoryList())
//     })
//         .catch(error => {
//             dispatch(errorMessage())
//             message.error(ApiInfo.ApiResponseMessages.error)
//             console.log("updateConfiguration error", error)
//         })
// }
// export const postConfigurationGeneral = (data) => dispatch => {
//     ApiInfo.DEBUGER && console.log("data got to postConfigurationGeneral ", data)

//     axios({
//         method: 'Post',
//         url: ApiInfo.APIPORT + '/api/v2/configuration/general',
//         headers: { "api-token": ApiInfo.APITOKEN, 'Content-Type': 'application/json', 'x-channel': ApiInfo.APICHANNEL },
//         data: data

//     }).then(response => {
//         console.log("postConfigurationGeneral response", response)
//         response.data.status === 200 ? message.success("updated ") : message.error(ApiInfo.ApiResponseMessages.error)
//         dispatch(fetchConfigurationGeneral())

//     })
//         .catch(error => {
//             dispatch(errorMessage())
//             message.error(ApiInfo.ApiResponseMessages.error)
//             console.log("postConfigurationGeneral error", error)
//         })
// }












