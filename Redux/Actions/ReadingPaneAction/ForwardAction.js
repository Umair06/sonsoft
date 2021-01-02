import { GET_FORWARD } from '../../Types/ReadingPaneTypes/ReadingPaneTypes'
import axios from 'axios';
import React from 'react';
import * as ApiInfo from "../../../APIConfig/ApiParameters"
import { message, Icon } from "antd"
import { getAuthenticUserInfo } from '../LoginAction/LoginAction'
import GetUserRole  from '../GetUserRoleAction/GetUserRoleAction'
message.config({
    top: 10,
    duration: 5,
    maxCount: 1
});


export const getForwardData = (forwardData) => {
    return {
        type: GET_FORWARD,
        payload: {
            forwardData: forwardData
        }
    }
}

// export const fetchForwardData = () => dispatch => {
//     axios({
//         method: 'get',
//         url: ApiInfo.APIPORT + '/api/v2/policies/userslist',
//         headers: { "api-token": ApiInfo.APITOKEN, 'Content-Type': 'application/json', 'x-channel': ApiInfo.APICHANNEL },

//     })
//         .then(response => {
//            ApiInfo.DEBUGER && console.log("fetchForwardData response", response)
//             if (response.data.status === 200) {
//                 dispatch(getForwardData(response.data.data.output))
//             } else {
//                 dispatch(getForwardData([]))
//                 message.error(<span>{response.data.message}<Icon type="close" className="closebtn" onClick={() => message.destroy && message.destroy()} /></span>, 0)
//             }
//         })
//         .catch(error => {
//             message.error(ApiInfo.ApiResponseMessages.error)
//             dispatch(getForwardData([]))
//           ApiInfo.DEBUGER &&  console.log("fetchForwardData error", error)
//         })
// }

export const postEmailsForworder = (data) => dispatch => {
    ApiInfo.DEBUGER && console.log("post data to forwardEmail", JSON.stringify(data))
    message.loading(ApiInfo.ApiResponseMessages.postData, 100).then(
        () =>
            message.error(
                <span>
                    Network is slow
              <Icon
                        type='close'
                        className="closebtn"
                        onClick={() => message.destroy && message.destroy()}
                        style={{ marginLeft: 10, color: 'red' }}
                    />
                </span>
            ),
        0
    );
    axios({
        method: 'post',
        url: ApiInfo.APIPORT + '/api/v2/search-exports/email-forwarder',
        headers: { "api-token": ApiInfo.APITOKEN, 'Content-Type': 'application/json', 'x-channel': ApiInfo.APICHANNEL },
        data: JSON.stringify(data),

    })
        .then(async response => {
            ApiInfo.DEBUGER && console.log("forwardEmail response", response)
            message.destroy && message.destroy();
            if (response.data.status === 200) {
                message.success(ApiInfo.ApiResponseMessages.forwardedEmail)
            } else {
                if(response.data && response.data.status === 401){
                    await dispatch(getAuthenticUserInfo(null))
                    await dispatch(GetUserRole(null))
                    if(!JSON.stringify(localStorage.getItem("userInfo")))
                    window.location.pathname = '/'
                  }
                message.error(<span>{response.data.message}<Icon type="close" className="closebtn" onClick={() => message.destroy && message.destroy()} /></span>, 0);
            }

        })
        .catch(error => {
            message.error(ApiInfo.ApiResponseMessages.error)
            ApiInfo.DEBUGER && console.log("forwardEmail error", error)
        })
}

export const postInlineEmailsForworder = (data) => dispatch => {
    ApiInfo.DEBUGER && console.log("post data to postInlineEmailsForworder", JSON.stringify(data))
    message.loading(ApiInfo.ApiResponseMessages.postData, 100).then(
        () => message.error(
        <span>Network is slow
            <Icon
                        type='close'
                        className="closebtn"
                        onClick={() => message.destroy && message.destroy()}
                        style={{ marginLeft: 10, color: 'red' }}
                    />
        </span>
            ),
        0
    );
    axios({
        method: 'post',
        url: ApiInfo.APIPORT + '/api/v2/search-exports/email-forwarder-inline',
        headers: { "api-token": ApiInfo.APITOKEN, 'Content-Type': 'application/json', 'x-channel': ApiInfo.APICHANNEL },
        data: JSON.stringify(data),
    })
        .then(async response => {
            ApiInfo.DEBUGER && console.log("postInlineEmailsForworder response", response)
            message.destroy && message.destroy();
            if (response.data.status === 200) {
                message.success(ApiInfo.ApiResponseMessages.forwardedEmail)
            } else {
                if(response.data && response.data.status === 401){
                    await dispatch(getAuthenticUserInfo(null))
                    await dispatch(GetUserRole(null))
                    if(!JSON.stringify(localStorage.getItem("userInfo")))
                    window.location.pathname = '/'
                  }
                message.error(<span>{response.data.message}<Icon type="close" className="closebtn" onClick={() => message.destroy && message.destroy()} /></span>, 0);
            }
        })
        .catch(error => {
            message.error(ApiInfo.ApiResponseMessages.error)
            ApiInfo.DEBUGER && console.log("postInlineEmailsForworder error", error)
        })
}
