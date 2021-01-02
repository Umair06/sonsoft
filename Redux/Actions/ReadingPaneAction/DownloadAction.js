import {
  GET_DOWNLOAD,
  GET_EMAIL
} from "../../Types/ReadingPaneTypes/ReadingPaneTypes";
import axios from "axios";
import * as ApiInfo from "../../../APIConfig/ApiParameters";
import { message } from "antd";
import { displayMessageAndDispatchAction } from "../utils";
message.config({
  top: 10,
  duration: 5,
  maxCount: 1
});

export const getEmail = email => {
  return {
    type: GET_EMAIL,
    payload: {
      email: email
    }
  };
};
export const getDownloadData = downloadData => {
  return {
    type: GET_DOWNLOAD,
    payload: {
      downloadData: downloadData
    }
  };
};
// export const b64toBlob = (b64Data, contentType, sliceSize, filename) => {
//     contentType = contentType || '';
//     sliceSize = sliceSize || 512;

//     var byteCharacters = atob(b64Data);
//     var byteArrays = [];

//     for (var offset = 0; offset < byteCharacters && byteCharacters.length; offset += sliceSize) {
//       var slice = byteCharacters && byteCharacters.slice(offset, offset + sliceSize);

//       var byteNumbers = new Array(slice.length);
//       for (var i = 0; i < slice.length; i++) {
//         byteNumbers[i] = slice.charCodeAt(i);
//       }

//       var byteArray = new Uint8Array(byteNumbers);
//       byteArrays && byteArray.push(byteArray);
//     }

//     var blob = new Blob(byteArrays, { type: contentType });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.setAttribute('hidden', '');
//     a.setAttribute('href', url);
//     a.setAttribute('download', filename + '.' + contentType);
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a)
//     return blob;

//   }

export const fetchDownloadData = () => dispatch => {
  const prevHistory = window.location.pathname;
  
  axios({
    method: "get",
    url: ApiInfo.APIPORT + "/api/v2/policies/userslist",
    headers: {
      "api-token": ApiInfo.APITOKEN,
      "Content-Type": "application/json",
      "x-channel": ApiInfo.APICHANNEL
    }
  })
    .then(response => {
      ApiInfo.DEBUGER && console.log("fetchDownloadData response", response);

      displayMessageAndDispatchAction(
        undefined,
        response,
        dispatch,
        getDownloadData,
        undefined,
        response.data.data.output,
        undefined,
        prevHistory
      );

    //   if (response.data.status === 200) {
    //     dispatch(getDownloadData(response.data.data.output));
    //   } else {
    //     dispatch(getDownloadData([]));
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
      dispatch(getDownloadData([]));
      ApiInfo.DEBUGER && console.log("fetchDownloadData error", error);
    });
};

export const downloadEmail = data => dispatch => {
  window.location.href =
    ApiInfo.DEBUGER && ApiInfo.APIPORT + "/api/v2/downloads/single-file?filePath=" + data.filePath;
  // axios({
  //     method: 'post',
  //     url: ApiInfo.APIPORT + '/api/v2/downloads/single-file?filePath='+data.filePath,
  //     headers: { "api-token": ApiInfo.APITOKEN, 'Content-Type': 'application/json', 'x-channel': ApiInfo.APICHANNEL },
  //     data: {"filePath":data.filePath}

  // }).then(response => {
  //        ApiInfo.DEBUGER && console.log("downloadEmail response", response)
  //         dispatch(b64toBlob(response.data,data.downloadForm,500,data.fileName.slice(0, -4)))

  //     })
  //     .catch(error => {
  //         message.error(ApiInfo.ApiResponseMessages.error)

  //       ApiInfo.DEBUGER &&  console.log("fdownloadEmail error", error)
  //     })
};
