import React from "react";
import * as ApiInfo from "../../../APIConfig/ApiParameters";
import axios from 'axios';
import { message, Icon } from "antd";
message.config({
    top: 10,
    duration: 5,
    maxCount: 1
})

export const postLogout = () => {
    message.loading(ApiInfo.ApiResponseMessages.getData, 30)
        .then(() => message.error("Network Error"))
    axios({
        method: 'Post',
        url: ApiInfo.APIPORT + '/api/v2/logout',
        headers: { "api-token": ApiInfo.APITOKEN, 'Content-Type': 'application/json' },
    }).then(response => {
        ApiInfo.DEBUGER && console.log("postLogout response", response)
        message.destroy && message.destroy()
        if (response.data.status === 200) {
            message.success(ApiInfo.ApiResponseMessages.loggedOut, 2)
        } else {
            message.error(<span>{response.data.message}<Icon className="closebtn" type="close" onClick={() => message.destroy && message.destroy()} /></span>, 0)
        }
    }
    ).catch(error => {
        ApiInfo.DEBUGER && console.log("postLogout error", error)
        message.error(<span>Something went wrong. Please try again. If the problem persist then please contact the admin. Thanks<Icon type="close" className="closebtn" onClick={() => message.destroy && message.destroy()} /></span>, 0)
    })
}