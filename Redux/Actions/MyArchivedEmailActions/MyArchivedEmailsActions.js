import React from "react";
import * as ApiInfo from "../../../APIConfig/ApiParameters";
import axios from "axios";
import {
  GET_FOLDER_STRUCTURE,
  GET_ALL_MAILBOXES,
  GET_FOLDER_RELATED_DOCUMENTS,
  TOTAL_FOLDER_DOCS
} from "../../Types/MyArchivedEmailsTypes/MyArchivedEmailsTypes";
import { message, Icon } from "antd";
import { getAuthenticUserInfo } from '../LoginAction/LoginAction'
import GetUserRole from '../GetUserRoleAction/GetUserRoleAction'

message.config({
  top: 10,
  duration: 5,
  maxCount: 1
});

var CancelToken = axios.CancelToken;
let cancelGetMyArchivedEmailRequest;
let cancelGetAllMailboxes;
let cancelPostSearchData;

export const mailboxFolderStructure = mailboxFolderStructure => {
  return {
    type: GET_FOLDER_STRUCTURE,
    payload: {
      mailboxFolderStructure
    }
  };
};

export const mailboxes = mailboxes => {
  return {
    type: GET_ALL_MAILBOXES,
    payload: {
      mailboxes
    }
  };
};

export const setFolderRelatedDocuments = folderRelatedDocuments => {
  return {
    type: GET_FOLDER_RELATED_DOCUMENTS,
    payload: {
      folderRelatedDocuments
    }
  };
};

export const totalFolderDocs = totalFolderDocs => {
  return {
    type: TOTAL_FOLDER_DOCS,
    payload: {
      totalFolderDocs
    }
  };
};




export const getAllMailboxes = (userId, mailbox, cancelRequest) => dispatch => {
  ApiInfo.DEBUGER && console.log(
    "mailboxId got to getAllMailboxes",
    JSON.stringify({ userId: userId }),
    mailbox, cancelRequest
  );
  cancelGetAllMailboxes && cancelRequest && cancelGetAllMailboxes();
  message.loading("Fetching Mailboxe(s)", 100).then(() =>
    message.error(
      <span>
        Something went wrong. Please try again. If the problem persist then please contact the admin. Thanks
        <Icon
          className="closebtn"
          onClick={() => message.destroy && message.destroy()}
          type="close"
        />
      </span>,
      0
    )
  );
  if (!cancelRequest) {
    // mailboxes && mailboxes[0] && mailboxes[0].USER_ID && getMailboxFolderStructure(mailboxes[0].USER_ID)
    axios({
      method: "POST",
      url: ApiInfo.APIPORT + "/api/v2/myemails/accessMailbox",
      headers: {
        "api-token": ApiInfo.APITOKEN,
        "Content-Type": "application/json",
        "x-channel": ApiInfo.APICHANNEL
      },
      data: { userId: userId }
    })
      .then(async response => {
        ApiInfo.DEBUGER && console.log("getAllMailboxes Response", response);
        message.destroy()
        if (response.data.status === 200) {
          dispatch(
            mailboxes(
              response.data.data.output[0].mailboxes
                ? [
                  mailbox,
                  ...response.data.data.output[0].mailboxes.filter(
                    mail => mail.USER_ID !== mailbox.USER_ID
                  )
                ]
                : (mailbox && mailbox.MAILBOX_NAME && mailbox.USER_ID ? [mailbox] : [])
            )
          );
        } else {
          dispatch(mailboxes(mailbox && mailbox.MAILBOX_NAME && mailbox.USER_ID ? [mailbox] : []));
          if (response.data.status === 204 && (!mailbox || !mailbox.MAILBOX_NAME || !mailbox.USER_ID)) message.info("No Mailbox Found")
          if (response.data && response.data.status === 401) {
            await dispatch(getAuthenticUserInfo(null))
            await dispatch(GetUserRole(null))
            if (!JSON.stringify(localStorage.getItem("userInfo")))
              window.location.pathname = '/'
            if (response.data && response.data.status === !204) {
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
            };
          }
          // if (response.data.status !== 204) {
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
        }
        // message.destroy && message.destroy()
      })
      .catch(error => {
        ApiInfo.DEBUGER && console.log("getAllMailboxes error", error);
        dispatch(mailboxes(mailbox && mailbox.MAILBOX_NAME && mailbox.USER_ID ? [mailbox] : []));
      });
  }
};

export const getMailboxFolderStructure = mailboxId => dispatch => {
  ApiInfo.DEBUGER && console.log(
    "mailboxId got to getMailboxFolderStructure",
    JSON.stringify({ mailboxId: mailboxId })
  );
  dispatch(mailboxFolderStructure());
  message.loading("Fetching Mailbox Folders", 100).then(() =>
    message.error(
      <span>
        Something went wrong. Please try again. If the problem persist then please contact the admin. Thanks
        <Icon
          className="closebtn"
          onClick={() => message.destroy && message.destroy()}
          type="close"
        />
      </span>,
      0
    )
  );
  axios({
    method: "POST",
    url: ApiInfo.APIPORT + "/api/v2/myemails/folders",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    },
    data: JSON.stringify({ mailboxId: mailboxId })
  })
    .then(async response => {
      ApiInfo.DEBUGER &&
        console.log("getMailboxFolderStructure Response", response);
      if (response.data.status === 200) {
        if (response.data.data.output[0].folders && Array.isArray(response.data.data.output[0].folders)) {
          response.data.data.output[0].folders.some((folder, index) => {
            if (folder.title && folder.title.toLowerCase() === "inbox") {
              response.data.data.output[0].folders[index].folderType = "default"
              return true
            }
            return false
          })
        }
        dispatch(mailboxFolderStructure(response.data.data.output[0].folders));
        message.destroy && message.destroy();
      } else {
        dispatch(mailboxFolderStructure([]));
        message.destroy && message.destroy();
        if (response.data && response.data.status === 401) {
          await dispatch(getAuthenticUserInfo(null))
          await dispatch(GetUserRole(null))
          if (!JSON.stringify(localStorage.getItem("userInfo")))
            window.location.pathname = '/'
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
        // if (response.data.status !== 204) {
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
      }
    })
    .catch(error => {
      ApiInfo.DEBUGER && console.log("getMailboxFolderStructure error", error);
      dispatch(mailboxFolderStructure([]));
    });
};

export const fetchFolderRelatedDocs = (APIbody, cancelRequest) => dispatch => {
  ApiInfo.DEBUGER &&
    console.log("selectedFolderKey got to fetchFolderRelatedDocs", APIbody);
  dispatch(setFolderRelatedDocuments());
  dispatch(totalFolderDocs());
  cancelGetMyArchivedEmailRequest &&
    cancelRequest &&
    cancelGetMyArchivedEmailRequest();
  // dispatch(setFolderRelatedDocuments())
  if (!cancelRequest) {
    axios({
      method: "POST",
      url: ApiInfo.APIPORT + "/api/v2/myemails/folder",
      headers: {
        "api-token": ApiInfo.APITOKEN,
        "Content-Type": "application/json",
        "x-channel": ApiInfo.APICHANNEL
      },
      data: APIbody,
      cancelToken: new CancelToken(function executor(c) {
        // An executor function receives a cancel function as a parameter
        cancelGetMyArchivedEmailRequest = c;
      })
    })
      .then(async response => {
        ApiInfo.DEBUGER &&
          console.log("fetchFolderRelatedDocs Response", response);
        // response.data.status === 200 ? message.success(ApiInfo.ApiResponseMessages.updated) :  message.error(<span>{response.data.message}<Icon type="close" className="closebtn" onClick={() => message.destroy && message.destroy()} /></span>, 0)
        if (response.data.status === 200) {
          dispatch(
            setFolderRelatedDocuments(response.data.data.output[0].hits.hits)
          );
          dispatch(
            totalFolderDocs(response.data.data.output[0].hits.total.value)
          );
          message.success(
            `took ${response.data.data.output[0].took}ms to fetch ${response.data.data.output[0].hits.hits.length} Documents`
          );
        } else {
          dispatch(setFolderRelatedDocuments([]));
          dispatch(totalFolderDocs());
          if (response.data && response.data.status === 401) {
            await dispatch(getAuthenticUserInfo(null))
            await dispatch(GetUserRole(null))
            if (!JSON.stringify(localStorage.getItem("userInfo")))
              window.location.pathname = '/'
            if (response.data && response.data.status === !204) {
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
            };
          }
          // if (response.data.status !== 204) {
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
        }
      })
      .catch(error => {
        ApiInfo.DEBUGER && console.log("fetchFolderRelatedDocs error", error);
        if (axios.isCancel(error)) {
          // message.warn("Request Cancelled")
          // dispatch(setFolderRelatedDocuments())
        } else {
          message.error(ApiInfo.ApiResponseMessages.error);
          dispatch(setFolderRelatedDocuments());
          dispatch(totalFolderDocs());
        }
      });
  }
};

export const postSearchData = (APIbody, cancelRequest, closeReadingPane) => dispatch => {
  closeReadingPane && typeof(closeReadingPane) === "function" && closeReadingPane()
  cancelPostSearchData && cancelRequest && cancelPostSearchData();
  if (!cancelRequest) {
    dispatch(setFolderRelatedDocuments());
    dispatch(totalFolderDocs());
    axios({
      method: "POST",
      url: ApiInfo.APIPORT + "/api/v2/search/simple",
      headers: {
        "api-token": ApiInfo.APITOKEN,
        "Content-Type": "application/json",
        "x-channel": ApiInfo.APICHANNEL
      },
      data: APIbody,
      cancelToken: new CancelToken(function executor(c) {
        cancelPostSearchData = c;
      })
    })
      .then(async response => {
        ApiInfo.DEBUGER && console.log("Simple searched response", response);
        if (response.data.status === 200) {
          dispatch(
            setFolderRelatedDocuments(response.data.data.output[0].hits.hits)
          );
          dispatch(totalFolderDocs(response.data.data.output[0].hits.total.value));
          // response.data.data.output[0].hits.hits.length === 0 ? message.info(`No Records Found`)
          message.success(
            `took ${response.data.data.output[0].took}ms to find ${response.data.data.output[0].hits.hits.length} Documents`
          );
        } else {
          dispatch(setFolderRelatedDocuments([]));
          dispatch(totalFolderDocs());
          if (response.data && response.data.status === 401) {
            await dispatch(getAuthenticUserInfo(null))
            await dispatch(GetUserRole(null))
            if (!JSON.stringify(localStorage.getItem("userInfo")))
              window.location.pathname = '/'
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
          if (response.data.status !== 204) {
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
        }
        // message.destroy && message.destroy()
        // message.success("Success")
        // }
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          dispatch(setFolderRelatedDocuments([]));
          // message.destroy && message.destroy()
          // message.warn("Request Cancelled")
        } else {
          // message.destroy && message.destroy()
          message.error(ApiInfo.ApiResponseMessages.error);
          dispatch(setFolderRelatedDocuments([]));
          dispatch(totalFolderDocs());
        }
        ApiInfo.DEBUGER && console.log("simple searched get API error", error);
      });
  } else {
    dispatch(setFolderRelatedDocuments([]));
    dispatch(totalFolderDocs());
  }
};