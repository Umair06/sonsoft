import * as ApiInfo from "../../../APIConfig/ApiParameters";
import axios from "axios";
// import {
//     GET_ADVANCEDSAVEDSEARCHQUERY,
//     GET_ADVANCEDSEARCHTYPELIST
// } from "../../Types/SavedSearchTypes/SavedSearchTypes";
import { message, Icon } from "antd";
import React from "react";
import {
    GET_SAVEDSEARCH,
    SUCCESS,
    ERROR,
} from "../../Types/SimpleSearchTypes/SimpleSearchTypes";
import { displayMessageAndDispatchAction } from "../utils";
import { getAuthenticUserInfo } from '../LoginAction/LoginAction'
import GetUserRole from '../GetUserRoleAction/GetUserRoleAction'
message.config({
    top: 10,
    duration: 5,
    maxCount: 1
});



export const getSavedSearchData = data => {
    return {
        type: GET_SAVEDSEARCH,
        payload: {
            savedSearch: data
        }
    };
};


export const successMessage = success => {
    return {
        type: SUCCESS,
        payload: {
            success: success
        }
    };
};

export const errorMessage = (errorVariable = "error", isError) => {
    return {
        type: ERROR,
        payload: {
            errorVariable,
            isError
        }
    };
};



export const fetchSavedSearchData = () => dispatch => {
    axios({
        method: "GET",
        url: ApiInfo.APIPORT + "/api/v2/search/savesearch",
        headers: {
            "api-token": ApiInfo.APITOKEN,
            "Content-Type": "application/json",
            "x-channel": ApiInfo.APICHANNEL
        }
    })
        .then(response => {
            ApiInfo.DEBUGER && console.log("fetchSavedSearchData response", response);
            displayMessageAndDispatchAction(
                undefined,
                response,
                dispatch,
                getSavedSearchData,
                undefined,
                response.data.data.output
            );
        })
        .catch(error => {
            ApiInfo.DEBUGER && console.log("fetchSavedSearchData error", error);
            dispatch(getSavedSearchData([]));
            dispatch(errorMessage());
            message.error(ApiInfo.ApiResponseMessages.error);
        });
};

export const saveSearchData = data => dispatch => {
    message.loading(ApiInfo.ApiResponseMessages.postData, 100)
        .then(() => message.error(ApiInfo.ApiResponseMessages.error));
    ApiInfo.DEBUGER && console.log(
        "saveSearchData", data,
        JSON.stringify({
            fromCount: 0,
            toCount: data.toCount,
            fromDate: data.fromDate,
            toDate: data.toDate,
            employee: data.employee,
            filterType: data.filterType,
            labelType: data.labelType,
            labelName: data.labelName,
            contentValue: data.contentValue,
            searchedBy: 1,
            searchCriteriaName: data.searchCriteriaName,
            searchCriteriaDesc: data.searchCriteriaDesc,
            searchType: "S"
        })
    );
    axios({
        method: "POST",
        url: ApiInfo.APIPORT + "/api/v2/search/simple/add",
        headers: {
            "api-token": ApiInfo.APITOKEN,
            "Content-Type": "application/json",
            "x-channel": ApiInfo.APICHANNEL
        },
        data: {
            fromCount: 0,
            toCount: data.toCount,
            fromDate: data.fromDate,
            toDate: data.toDate,
            employee: data.employee,
            filterType: data.filterType,
            labelType: [],
            labelName: data.labelName,
            contentValue: data.contentValue,
            searchedBy: 1,
            searchCriteriaName: data.searchCriteriaName,
            searchCriteriaDesc: data.searchCriteriaDesc,
            searchType: "S"
        }
    })
        .then(response => {
            ApiInfo.DEBUGER && console.log("saveSearchData response", response);
            
            displayMessageAndDispatchAction(
                ApiInfo.ApiResponseMessages.saved,
                response
            );
        })
        .catch(error => {
            ApiInfo.DEBUGER && console.log("saveSearchData error", error);
            dispatch(errorMessage());
            message.error(ApiInfo.ApiResponseMessages.error);
        });
};

export const editSimpleSavedSearch = Apibody => dispatch => {
    // isme CHAHIYE Loading..
    message.loading(ApiInfo.ApiResponseMessages.postData, 100)
        .then(() => message.error(ApiInfo.ApiResponseMessages.error));
    ApiInfo.DEBUGER && console.log("data  got to editSaveSearchAction", Apibody);
    axios({
        method: "PUT",
        url: ApiInfo.APIPORT + "/api/v2/search/simple/update",
        headers: {
            "api-token": ApiInfo.APITOKEN,
            "Content-Type": "application/json",
            "x-channel": ApiInfo.APICHANNEL
        },
        data: JSON.stringify(Apibody)
    })
        .then(async response => {
            ApiInfo.DEBUGER && console.log("editSaveSearch response", response);
            if (response.data.status === 200) {
                message.success(ApiInfo.ApiResponseMessages.updated);
                dispatch(fetchSavedSearchData());
            } else {
                if (response.data && response.data.status === 401) {
                    await dispatch(getAuthenticUserInfo(null))
                    await dispatch(GetUserRole(null))
                    if (!JSON.stringify(localStorage.getItem("userInfo")))
                        window.location.pathname = '/'
                }
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
            }

            // fetchSavedSearchData()
        })
        .catch(error => {
            ApiInfo.DEBUGER && console.log("editSaveSearch error", error);
            message.error(ApiInfo.ApiResponseMessages.error);
        });
};


export const deleteSimpleSavedSearch = Ids => dispatch => {
    message
        .loading(ApiInfo.ApiResponseMessages.deletingData, 20)
        .then(() => message.error(ApiInfo.ApiResponseMessages.error));
    ApiInfo.DEBUGER && console.log("Ids got to deleteSearchData", Ids);
    axios({
        method: "DELETE",
        url: ApiInfo.APIPORT + "/api/v2/search/simple/delete",
        headers: {
            "api-token": ApiInfo.APITOKEN,
            "Content-Type": "application/json",
            "x-channel": ApiInfo.APICHANNEL
        },
        data: { scIds: Ids, searchType: "S" }
    })
        .then(response => {
            ApiInfo.DEBUGER && console.log("delete saved Search Data response", response);
            message.destroy && message.destroy();

            displayMessageAndDispatchAction(
                ApiInfo.ApiResponseMessages.deletedSearchCriteria,
                response,
                dispatch,
                fetchSavedSearchData,
                successMessage,
                undefined,
                response.data.data.message
            );
        })
        .catch(error => {
            ApiInfo.DEBUGER && console.log("delete saved Search Data  error", error);
            // message.destroy && message.destroy()
            dispatch(errorMessage());
            message.error(ApiInfo.ApiResponseMessages.error);
        });
};


export const postAdvancedSavedSearch = apiBody => dispatch => {
    message.loading(ApiInfo.ApiResponseMessages.postData, 100)
        .then(() => message.error(ApiInfo.ApiResponseMessages.error));
    ApiInfo.DEBUGER && console.log(
        "postAdvancedSavedSearch", JSON.stringify(apiBody)
    );
    axios({
        method: "POST",
        url: ApiInfo.APIPORT + "/api/v2/search/advance/add",
        headers: {
            "api-token": ApiInfo.APITOKEN,
            "Content-Type": "application/json",
            "x-channel": ApiInfo.APICHANNEL
        },
        data: apiBody
    })
        .then(response => {
            ApiInfo.DEBUGER && console.log("postAdvancedSavedSearch response", response);
            displayMessageAndDispatchAction(
                ApiInfo.ApiResponseMessages.saved,
                response
            );
        })
        .catch(error => {
            ApiInfo.DEBUGER && console.log("postAdvancedSavedSearch error", error);
            // dispatch(errorMessage());
            message.error(ApiInfo.ApiResponseMessages.error);
        });
};


export const editAdvanceSavedSearchAction = Apibody => dispatch => {
    message.loading(ApiInfo.ApiResponseMessages.postData, 100)
        .then(() => message.error(ApiInfo.ApiResponseMessages.error));
    ApiInfo.DEBUGER && console.log("data got to editAdvanceSavedSearchAction", Apibody);
    axios({
        method: "PUT",
        url: ApiInfo.APIPORT + "/api/v2/search/advance/update",
        headers: {
            "api-token": ApiInfo.APITOKEN,
            "Content-Type": "application/json",
            "x-channel": ApiInfo.APICHANNEL
        },
        data: JSON.stringify(Apibody)
    })
        .then(async response => {
            ApiInfo.DEBUGER && console.log("editAdvanceSavedSearchAction response", response);
            if (response.data.status === 200) {
                message.success(ApiInfo.ApiResponseMessages.updated);
                dispatch(fetchSavedSearchData());
            } else {
                if (response.data && response.data.status === 401) {
                    await dispatch(getAuthenticUserInfo(null))
                    await dispatch(GetUserRole(null))
                    if (!JSON.stringify(localStorage.getItem("userInfo")))
                        window.location.pathname = '/'
                }
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
            }

            // fetchSavedSearchData()
        })
        .catch(error => {
            ApiInfo.DEBUGER && console.log("editAdvanceSavedSearchAction error", error);
            message.error(ApiInfo.ApiResponseMessages.error);
        });
};


export const deleteAdvancedSavedSearch = Ids => dispatch => {
    message
        .loading(ApiInfo.ApiResponseMessages.deletingData, 20)
        .then(() => message.error(ApiInfo.ApiResponseMessages.error));
    ApiInfo.DEBUGER && console.log("Ids got to  deleteAdvancedSearchData", Ids);
    axios({
        method: "DELETE",
        url: ApiInfo.APIPORT + "/api/v2/search/advance/delete",
        headers: {
            "api-token": ApiInfo.APITOKEN,
            "Content-Type": "application/json",
            "x-channel": ApiInfo.APICHANNEL
        },
        data: { scIds: Ids, searchType: "A" }
    })
        .then(response => {
            ApiInfo.DEBUGER && console.log("deleteAdvancedSearchData response", response);
            message.destroy && message.destroy();

            displayMessageAndDispatchAction(
                ApiInfo.ApiResponseMessages.deletedSearchCriteria,
                response,
                dispatch,
                fetchSavedSearchData,
                successMessage,
                undefined,
                response.data.data.message
            );
        })
        .catch(error => {
            ApiInfo.DEBUGER && console.log("deleteAdvancedSearchData  error", error);
            // message.destroy && message.destroy()
            dispatch(errorMessage());
            message.error(ApiInfo.ApiResponseMessages.error);
        });
};

export const postQueryBuilderSavedSearch = apiBody => dispatch => {
    message.loading(ApiInfo.ApiResponseMessages.postData, 100)
        .then(() => message.error(ApiInfo.ApiResponseMessages.error));
    ApiInfo.DEBUGER && console.log(
        "postQueryBuilderSavedSearch", JSON.stringify(apiBody)
    );
    axios({
        method: "POST",
        url: ApiInfo.APIPORT + "/api/v2/search/querybuilder/add",
        headers: {
            "api-token": ApiInfo.APITOKEN,
            "Content-Type": "application/json",
            "x-channel": ApiInfo.APICHANNEL
        },
        data: apiBody
    })
        .then(response => {
            ApiInfo.DEBUGER && console.log("postQueryBuilderSavedSearch response", response);
            displayMessageAndDispatchAction(
                ApiInfo.ApiResponseMessages.saved,
                response
            );
        })
        .catch(error => {
            ApiInfo.DEBUGER && console.log("postQueryBuilderSavedSearch error", error);
            // dispatch(errorMessage());
            message.error(ApiInfo.ApiResponseMessages.error);
        });
};


export const editQueryBuilderSavedSearchAction = Apibody => dispatch => {
    message.loading(ApiInfo.ApiResponseMessages.postData, 100)
        .then(() => message.error(ApiInfo.ApiResponseMessages.error));
    ApiInfo.DEBUGER && console.log("data  got to editQueryBuilderSavedSearchAction", Apibody);
    axios({
        method: "PUT",
        url: ApiInfo.APIPORT + "/api/v2/search/querybuilder/update",
        headers: {
            "api-token": ApiInfo.APITOKEN,
            "Content-Type": "application/json",
            "x-channel": ApiInfo.APICHANNEL
        },
        data: JSON.stringify(Apibody)
    })
        .then(async response => {
            ApiInfo.DEBUGER && console.log("editQueryBuilderSavedSearchAction response", response);
            if (response.data.status === 200) {
                message.success(ApiInfo.ApiResponseMessages.updated);
                dispatch(fetchSavedSearchData());
            } else {
                if (response.data && response.data.status === 401) {
                    await dispatch(getAuthenticUserInfo(null))
                    await dispatch(GetUserRole(null))
                    if (!JSON.stringify(localStorage.getItem("userInfo")))
                        window.location.pathname = '/'
                }
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
            }

            // fetchSavedSearchData()
        })
        .catch(error => {
            ApiInfo.DEBUGER && console.log("editQueryBuilderSavedSearchAction error", error);
            message.error(ApiInfo.ApiResponseMessages.error);
        });
};

export const deleteQueryBuilderSavedSearch = Ids => dispatch => {
    message
        .loading(ApiInfo.ApiResponseMessages.deletingData, 20)
        .then(() => message.error(ApiInfo.ApiResponseMessages.error));
    ApiInfo.DEBUGER && console.log("Ids got to deleteQueryBuilderSearchData", Ids);
    axios({
        method: "DELETE",
        url: ApiInfo.APIPORT + "/api/v2/search/simple/delete",
        headers: {
            "api-token": ApiInfo.APITOKEN,
            "Content-Type": "application/json",
            "x-channel": ApiInfo.APICHANNEL
        },
        data: { scIds: Ids, searchType: "Q" }
    })
        .then(response => {
            ApiInfo.DEBUGER && console.log("deleteQueryBuilderSearchData response", response);
            message.destroy && message.destroy();

            displayMessageAndDispatchAction(
                ApiInfo.ApiResponseMessages.deletedSearchCriteria,
                response,
                dispatch,
                fetchSavedSearchData,
                successMessage,
                undefined,
                response.data.data.message
            );
        })
        .catch(error => {
            ApiInfo.DEBUGER && console.log("deleteQueryBuilderSearchData  error", error);
            // message.destroy && message.destroy()
            dispatch(errorMessage());
            message.error(ApiInfo.ApiResponseMessages.error);
        });
};

export const postSmartSearch = Apibody => dispatch => {
    message.loading(ApiInfo.ApiResponseMessages.postData, 100)
        .then(() => message.error(ApiInfo.ApiResponseMessages.error));
    ApiInfo.DEBUGER && console.log(
        "postSmartSearch", Apibody,
        JSON.stringify(Apibody)
    );
    axios({
        method: "POST",
        url: ApiInfo.APIPORT + "/api/v2/search/smart/add",
        headers: {
            "api-token": ApiInfo.APITOKEN,
            "Content-Type": "application/json",
            "x-channel": ApiInfo.APICHANNEL
        },
        data: Apibody
    })
        .then(response => {
            ApiInfo.DEBUGER && console.log("postSmartSearch response", response);

            displayMessageAndDispatchAction(
                ApiInfo.ApiResponseMessages.saved,
                response
            );
        })
        .catch(error => {
            ApiInfo.DEBUGER && console.log("postSmartSearch error", error);
            dispatch(errorMessage());
            message.error(ApiInfo.ApiResponseMessages.error);
        });
};

export const editSmartSavedSearch = Apibody => dispatch => {
    // isme CHAHIYE Loading..
    message.loading(ApiInfo.ApiResponseMessages.postData, 100)
        .then(() => message.error(ApiInfo.ApiResponseMessages.error));
    ApiInfo.DEBUGER && console.log("data  got to editSmartSavedSearch", Apibody);
    axios({
        method: "PUT",
        url: ApiInfo.APIPORT + "/api/v2/search/smart/update",
        headers: {
            "api-token": ApiInfo.APITOKEN,
            "Content-Type": "application/json",
            "x-channel": ApiInfo.APICHANNEL
        },
        data: JSON.stringify(Apibody)
    })
        .then(async response => {
            ApiInfo.DEBUGER && console.log("editSmartSavedSearch response", response);
            if (response.data.status === 200) {
                message.success(ApiInfo.ApiResponseMessages.updated);
                dispatch(fetchSavedSearchData());
            } else {
                if (response.data && response.data.status === 401) {
                    await dispatch(getAuthenticUserInfo(null))
                    await dispatch(GetUserRole(null))
                    if (!JSON.stringify(localStorage.getItem("userInfo")))
                        window.location.pathname = '/'
                }
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
            }

            // fetchSavedSearchData()
        })
        .catch(error => {
            ApiInfo.DEBUGER && console.log("editSmartSavedSearch error", error);
            message.error(ApiInfo.ApiResponseMessages.error);
        });
};

export const deleteSmartSavedSearch = Ids => dispatch => {
    message
        .loading(ApiInfo.ApiResponseMessages.deletingData, 20)
        .then(() => message.error(ApiInfo.ApiResponseMessages.error));
    ApiInfo.DEBUGER && console.log("Ids got to deleteSmartSearchData", Ids);
    axios({
        method: "DELETE",
        url: ApiInfo.APIPORT + "/api/v2/search/smart/delete",
        headers: {
            "api-token": ApiInfo.APITOKEN,
            "Content-Type": "application/json",
            "x-channel": ApiInfo.APICHANNEL
        },
        data: { scIds: Ids, searchType: "SS" }
    })
        .then(response => {
            ApiInfo.DEBUGER && console.log("deleteSmartSearchData response", response);
            message.destroy && message.destroy();

            displayMessageAndDispatchAction(
                ApiInfo.ApiResponseMessages.deletedSearchCriteria,
                response,
                dispatch,
                fetchSavedSearchData,
                successMessage,
                undefined,
                response.data.data.message
            );
        })
        .catch(error => {
            ApiInfo.DEBUGER && console.log("deleteSmartSearchData  error", error);
            // message.destroy && message.destroy()
            dispatch(errorMessage());
            message.error(ApiInfo.ApiResponseMessages.error);
        });
};


export const deleteBulkSavedSearch = Ids => dispatch => {
    message
        .loading(ApiInfo.ApiResponseMessages.deletingData, 20)
        .then(() => message.error(ApiInfo.ApiResponseMessages.error));
    ApiInfo.DEBUGER && console.log("Ids got to deleteSearchData", Ids);
    axios({
        method: "DELETE",
        url: ApiInfo.APIPORT + "/api/v2/search/bulk/delete",
        headers: {
            "api-token": ApiInfo.APITOKEN,
            "Content-Type": "application/json",
            "x-channel": ApiInfo.APICHANNEL
        },
        data: { scIds: Ids }
    })
        .then(response => {
            ApiInfo.DEBUGER && console.log("delete saved Search Data response", response);
            message.destroy && message.destroy();

            displayMessageAndDispatchAction(
                ApiInfo.ApiResponseMessages.deletedSearchCriteria,
                response,
                dispatch,
                fetchSavedSearchData,
                successMessage,
                undefined,
                response.data.data.message
            );
        })
        .catch(error => {
            ApiInfo.DEBUGER && console.log("delete saved Search Data  error", error);
            // message.destroy && message.destroy()
            dispatch(errorMessage());
            message.error(ApiInfo.ApiResponseMessages.error);
        });
};