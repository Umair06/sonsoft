import { GET_FACTOID_ANSWER } from '../../Types/ReadingPaneTypes/ReadingPaneTypes'
import axios from 'axios';
import React from 'react';
import * as ApiInfo from "../../../APIConfig/ApiParameters"
import { message, Icon } from "antd"

message.config({
    top: 10,
    duration: 5,
    maxCount: 1
});


var CancelToken = axios.CancelToken;
let cancelfetchFactoidAnswer;

export const getFactoidAnswer = (factoidAnswer) => {
    return {
        type: GET_FACTOID_ANSWER,
        payload: { factoidAnswer }
    }
}

export const fetchFactoidAnswer = (APIbody, cancelRequest, accessToken) => dispatch => {
    ApiInfo.DEBUGER && console.log("data got to fetchFactoidAnswer", APIbody);
    cancelfetchFactoidAnswer && cancelfetchFactoidAnswer();
    if (!cancelRequest) {
        axios({
            method: "POST",
            url: "https://auraapi.nugene.ai/aura/factoidAnswer",
            headers: {
                "Authorization": accessToken,
                "Content-Type": "application/json"
            },
            data: APIbody && JSON.stringify(APIbody),
            cancelToken: new CancelToken(function executor(c) {
                // An executor function receives a cancel function as a parameter
                cancelfetchFactoidAnswer = c;
            })
        })
            .then(response => {
                ApiInfo.DEBUGER && console.log("fetchFactoidAnswer response", response);
                if (response.data.messageCode === 1287) {
                    dispatch(getFactoidAnswer(response.data.factoidAnswer.factoidAnswer))
                } else {
                    dispatch(getFactoidAnswer("No Factoid Answer Found"))
                }
            })
            .catch(error => {
                ApiInfo.DEBUGER && console.log("fetchFactoidAnswer API error", error);
                if (axios.isCancel(error)) {
                    return
                }
                if (error.response && error.response.status === 401) {
                    message.error(<span>{"Access Token Expired"}<Icon type="close" className="closebtn" onClick={() => message.destroy && message.destroy()} /></span>, 0)
                } else {
                    dispatch(getFactoidAnswer("No Factoid Answer Found"))
                }
            });
    } else {

    }
};

