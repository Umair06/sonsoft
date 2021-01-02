import {
    GET_ACTIVEDIRECTORYLIST,
    GET_OULIST,
    GET_OULISTBYID
} from "../../Types/ConfigurationTypes/ConfigurationTypes";
import axios from "axios";
import * as ApiInfo from "../../../APIConfig/ApiParameters";
// import { Bearer } from "../../../APIConfig/ApiParameters";
import { message, Icon } from "antd";
import React from "react";
// import { displayMessageAndDispatchAction } from "../utils";
// import OUlist from "../../TreeData/OUList.json"
import { resetSelectedRecords } from "../updateSelectedRecordsAction/updateSelectedRecordsAction";
import { getAuthenticUserInfo } from '../LoginAction/LoginAction'
import GetUserRole from '../GetUserRoleAction/GetUserRoleAction'
message.config({
    top: 10,
    duration: 5,
    maxCount: 1
});

export const getActiveDirectory = activeDirectoryList => {
    try {
        return {
            type: GET_ACTIVEDIRECTORYLIST,
            payload: {
                activeDirectory: activeDirectoryList
            }
        };
    } catch (error) {
        ApiInfo.DEBUGER && console.log("error", error);
    }
};


export const savedOUListById = OUListById => {
    try {
        return {
            type: GET_OULISTBYID,
            payload: {
                OUListById: OUListById
            }
        };
    } catch (error) {
        ApiInfo.DEBUGER && console.log("error", error);
    }
};
export const savedOUList = (OUlist) => {
    try {
        return {
            type: GET_OULIST,
            payload: {
                OUlist: OUlist
            }
        }
    } catch (error) {
        ApiInfo.DEBUGER && console.log("error", error)
    }
}

// export const fetchActiveDirectoryList = noMessage => (dispatch, getState) => {
//   try {
//     const { authenticUserInfo } = getState().LoginReducer;
//     // ApiInfo.DEBUGER && console.log(`${Bearer} ${authenticUserInfo.data.data.output[0].token}`);
//     axios
//       .get(ApiInfo.APIPORT + "/api/v2/configuration/ad", {
//         headers: {
//           "api-token": ApiInfo.APITOKEN,
//           // `${Bearer}${authenticUserInfo.data.data.output[0].token}`,
//           "Content-Type": "application/json",
//           "x-channel": ApiInfo.APICHANNEL
//         }
//     } catch (error) {
//         ApiInfo.DEBUGER && console.log("error", error)
//     }
// }


// export const savedOUListById = (OUListById) => {
//     try {
//         return {
//             type: GET_OULISTBYID,
//             payload: {
//                 OUListById: OUListById
//             }
//         }
//     } catch (error) {
//         ApiInfo.DEBUGER && console.log("error", error)
//     }
// }

export const fetchActiveDirectoryList = (noMessage) => dispatch => {
    try {
        axios.get(ApiInfo.APIPORT + "/api/v2/configuration/ad", {
            headers: { "api-token": ApiInfo.APITOKEN, 'Content-Type': 'application/json', 'x-channel': ApiInfo.APICHANNEL },

        })
            .then(async response => {
                ApiInfo.DEBUGER && console.log("fetchActiveDirectoryList response", response)

                if (response.status === 200) {
                    dispatch(getActiveDirectory(response.data.data.output))
                } else {
                    if (response.data && response.data.status === 401) {
                        await dispatch(getAuthenticUserInfo(null))
                        await dispatch(GetUserRole(null))
                        if (!JSON.stringify(localStorage.getItem("userInfo")))
                            window.location.pathname = '/'
                    }
                    if (response.data && response.data.status !== 204) {
                        message.error(<span>{response.data.message}<Icon type="close" className="closebtn" onClick={() => message.destroy && message.destroy()} /></span>, 0)
                    }
                    dispatch(getActiveDirectory([]))
                }
            })
            .catch(error => {
                message.destroy && message.destroy()
                message.error(ApiInfo.ApiResponseMessages.error)
                dispatch(getActiveDirectory([]))
                ApiInfo.DEBUGER && console.log("fetchActiveDirectoryList error", error)
            })
    } catch (error) {
        ApiInfo.DEBUGER && console.log("error", error)
    }
}
export const postActiveDirectoryUser = (data) => dispatch => {
    try {
        message.loading(ApiInfo.ApiResponseMessages.postData, 100)
            .then(() => message.error(ApiInfo.ApiResponseMessages.error))
        // ApiInfo.DEBUGER && console.log("data got to postActiveDirectoryUser", data, data.selectedOUList)
        let addADUser = { "adDomainName": data.data.Domain_Name || "", "netBiosName": data.data.netBios || "", "adUserName": data.data.User_Name || "", "adPassword": data.data.Password || "", "isActive": data.data.Enable_Sync ? 1 : 0, "oUList": data.selectedOUList || [], "isAzure": data.data.isAzure ? 1 : 0, "clientId": data.data.Application_Client_ID || "" }
        ApiInfo.DEBUGER && console.log("data got to postActiveDirectoryUser", JSON.stringify(addADUser))

        axios({
            method: 'POST',
            url: ApiInfo.APIPORT + '/api/v2/configuration/ad_add',
            headers: { "api-token": ApiInfo.APITOKEN, 'Content-Type': 'application/json', 'x-channel': ApiInfo.APICHANNEL },
            data: addADUser,
        })
            .then(async response => {
                ApiInfo.DEBUGER && console.log("postActiveDirectoryUser response", response)
                message.destroy && message.destroy()
                if (response.data.status === 200) {
                    message.success(ApiInfo.ApiResponseMessages.updated)
                } else {
                    if (response.data && response.data.status === 401) {
                        await dispatch(getAuthenticUserInfo(null))
                        await dispatch(GetUserRole(null))
                        if (!JSON.stringify(localStorage.getItem("userInfo")))
                            window.location.pathname = '/'
                    }
                    message.error(<span>{response.data.message}<Icon type="close" className="closebtn" onClick={() => message.destroy && message.destroy()} /></span>, 0)
                }
                dispatch(fetchActiveDirectoryList())
            })
            .catch(error => {
                ApiInfo.DEBUGER && console.log("postActiveDirectoryUser error", error)
                message.destroy && message.destroy()
                message.error(ApiInfo.ApiResponseMessages.error)
            })
    } catch (error) {
        ApiInfo.DEBUGER && console.log("error", error)
    }

}


export const updateActiveDirectoryUser = (data) => dispatch => {
    try {
        message.loading(ApiInfo.ApiResponseMessages.postData, 100)
            .then(() => message.error(ApiInfo.ApiResponseMessages.error))
        let updatedData = { "adID": data.data.adId || "", "adDomainName": data.data.Domain_Name || "", "netBiosName": data.data.netBios || "", "adUserName": data.data.User_Name || "", "adPassword": data.data.Password || "", "isActive": data.data.Enable_Sync || false, "oUList": data.selectedOUList || [], "isAzure": data.data.isAzure || false, "clientId": data.data.Application_Client_ID || "" }
        ApiInfo.DEBUGER && console.log("data got to updateActiveDirectoryUser", updatedData)
        axios({
            method: 'POST',
            url: ApiInfo.APIPORT + '/api/v2/configuration/ad_update',
            headers: { "api-token": ApiInfo.APITOKEN, 'Content-Type': 'application/json', 'x-channel': ApiInfo.APICHANNEL },
            data: updatedData,
        })
            .then(async response => {
                ApiInfo.DEBUGER && console.log("updateActiveDirectoryUser response", response)
                message.destroy && message.destroy()
                if (response.data.status === 200) {
                    message.success(ApiInfo.ApiResponseMessages.updated)
                } else {
                    if (response.data && response.data.status === 401) {
                        await dispatch(getAuthenticUserInfo(null))
                        await dispatch(GetUserRole(null))
                        if (!JSON.stringify(localStorage.getItem("userInfo")))
                            window.location.pathname = '/'
                    }
                    message.error(<span>{response.data.message}<Icon type="close" className="closebtn" onClick={() => message.destroy && message.destroy()} /></span>, 0)
                }
                dispatch(fetchActiveDirectoryList())
            })
            .catch(error => {
                ApiInfo.DEBUGER && console.log("updateActiveDirectoryUser error", error)
                message.destroy && message.destroy()
                message.error(ApiInfo.ApiResponseMessages.error)
            })
    }
    catch (error) {
        ApiInfo.DEBUGER && console.log("error", error)
    }
}

export const updateActiveDirectoryUserStatus = (APIBody) => dispatch => {
    try {
        message.loading(ApiInfo.ApiResponseMessages.postData, 100)
            .then(() => message.error(ApiInfo.ApiResponseMessages.error))

        ApiInfo.DEBUGER && console.log("data got to updateActiveDirectoryUserStatus", APIBody);
        axios({
            method: 'POST',
            url: ApiInfo.APIPORT + '/api/v2/configuration/ad/update_status',
            headers: { "api-token": ApiInfo.APITOKEN, 'Content-Type': 'application/json', 'x-channel': ApiInfo.APICHANNEL },
            data: JSON.stringify(APIBody),

        })
            .then(async response => {
                ApiInfo.DEBUGER && console.log("updateActiveDirectoryUserStatus response", response)
                message.destroy && message.destroy()
                if (response.data.status === 200) {
                    message.success(ApiInfo.ApiResponseMessages.updated)
                    dispatch(fetchActiveDirectoryList())
                    resetSelectedRecords && dispatch(resetSelectedRecords())
                }
                else {
                    if (response.data && response.data.status === 401) {
                        await dispatch(getAuthenticUserInfo(null))
                        await dispatch(GetUserRole(null))
                        if (!JSON.stringify(localStorage.getItem("userInfo")))
                            window.location.pathname = '/'
                    }
                    message.error(<span>{response.data.message}<Icon type="close" className="closebtn" onClick={() => message.destroy && message.destroy()} /></span>, 0)
                }


            })
            .catch(error => {
                ApiInfo.DEBUGER && console.log("updateActiveDirectoryUserStatus error", error)
                message.destroy && message.destroy()
                message.error(ApiInfo.ApiResponseMessages.error)
            })
    } catch (error) {
        ApiInfo.DEBUGER && console.log("error", error)
    }
}
export const deleteActiveDirectory = (APIBody) => dispatch => {
    try {
        message.loading(ApiInfo.ApiResponseMessages.deletingData, 100)
            .then(() => message.error(ApiInfo.ApiResponseMessages.error))
        ApiInfo.DEBUGER && console.log("data got to dataToDeleted", APIBody)
        axios({
            method: 'DELETE',
            url: ApiInfo.APIPORT + '/api/v2/configuration/ad',
            headers: { "api-token": ApiInfo.APITOKEN, 'Content-Type': 'application/json', 'x-channel': ApiInfo.APICHANNEL },
            data: JSON.stringify(APIBody)
        })
            .then(async response => {
                ApiInfo.DEBUGER && console.log("deleteActiveDirectory response", response)
                message.destroy && message.destroy()
                if (response.data.status === 200) {
                    message.success(ApiInfo.ApiResponseMessages.deleted)
                    dispatch(fetchActiveDirectoryList(true))
                    resetSelectedRecords && dispatch(resetSelectedRecords())
                }
                else {
                    if (response.data && response.data.status === 401) {
                        await dispatch(getAuthenticUserInfo(null))
                        await dispatch(GetUserRole(null))
                        if (!JSON.stringify(localStorage.getItem("userInfo")))
                            window.location.pathname = '/'
                    }
                    message.error(<span>{response.data.message}<Icon type="close" className="closebtn" onClick={() => message.destroy && message.destroy()} /></span>, 0)
                }
            })
            .catch(error => {
                ApiInfo.DEBUGER && console.log("deleteActiveDirectory error", error)
                message.destroy && message.destroy()
                message.error(ApiInfo.ApiResponseMessages.error)
            })
    } catch (error) {
        ApiInfo.DEBUGER && console.log("error", error)
    }
}

export const fetchOUListByID = (data) => dispatch => {
    try {
        // dispatch(savedOUListById(OUlist))
        ApiInfo.DEBUGER && console.log("data got to fetchOUListByID", JSON.stringify(data))
        axios({
            method: 'get',
            url: ApiInfo.APIPORT + `/api/v2/configuration/ad/OUs/${data}`,
            headers: { "api-token": ApiInfo.APITOKEN, 'Content-Type': 'application/json', 'x-channel': ApiInfo.APICHANNEL },

        })
            .then(async response => {
                ApiInfo.DEBUGER && console.log("fetchOUListByID response", response)
                if (response.data.status === 200) {
                    dispatch(savedOUListById(response))
                } else {
                    if (response.data && response.data.status === 401) {
                        await dispatch(getAuthenticUserInfo(null))
                        await dispatch(GetUserRole(null))
                        if (!JSON.stringify(localStorage.getItem("userInfo")))
                            window.location.pathname = '/'
                    }
                    if (response.data && response.data.status !== 204) {
                        message.error(<span>{response.data.message}<Icon type="close" className="closebtn" onClick={() => message.destroy && message.destroy()} /></span>, 0)
                    }
                    dispatch(savedOUListById())
                }

            })
            .catch(error => {
                ApiInfo.DEBUGER && console.log("fetchOU error", error)
                message.destroy && message.destroy()
                message.error(ApiInfo.ApiResponseMessages.error)
            })
    } catch (err) {
        ApiInfo.DEBUGER && console.log("error", err)
    }
}


export const fetchOUUserList = (data) => dispatch => {
    try {
        let addNewADUser = { "domain": data.domain || "", "username": data.username || "", "password": data.password || "" }
        ApiInfo.DEBUGER && console.log("data got to fetchOUUserList", JSON.stringify(addNewADUser))
        // dispatch(savedOUList(OUlist))
        axios({
            method: 'post',
            url: ApiInfo.APIPORT + '/api/v2/configuration/ad/OUs',
            headers: { "api-token": ApiInfo.APITOKEN, 'Content-Type': 'application/json', 'x-channel': ApiInfo.APICHANNEL },
            data: addNewADUser,

        })
            .then(async response => {
                ApiInfo.DEBUGER && console.log("fetchOUUserList response", response)
                if (response.data.status === 200) {
                    dispatch(savedOUList(response))
                } else {
                    if (response.data && response.data.status === 401) {
                        await dispatch(getAuthenticUserInfo(null))
                        await dispatch(GetUserRole(null))
                        if (!JSON.stringify(localStorage.getItem("userInfo")))
                            window.location.pathname = '/'
                    }
                    if (response.data && response.data.status !== 204) {
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
                        )
                    }
                    dispatch(savedOUList())
                }
            })
            .catch(error => {
                ApiInfo.DEBUGER && console.log("fetchOUUser error", error)
                message.destroy && message.destroy()
                message.error(ApiInfo.ApiResponseMessages.error)
            })
    } catch (error) {
        ApiInfo.DEBUGER && console.log("error", error)
    }
}








