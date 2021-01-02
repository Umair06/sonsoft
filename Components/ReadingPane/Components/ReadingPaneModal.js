import React, { Component } from "react";
// import NewWindow from "react-new-window";
import ReadingPane from "../ReadingPane";
import * as ApiInfo from "../../../APIConfig/ApiParameters";

// import MyWindowPopOut from "../../../Components/Modal/MyWindowPopOut";
// import Clear_Gray from '../../../Assets/icons/SV_ICONS/Clear_Gray.png';

class ReadingPaneModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    // window.moveTo(0, 0);
    // window.resizeTo(window.screen.width, window.screen.height)
  }

  getImageSrc() {
    let imgSrc;
    const attachment = window.attachment;
    try {
      let imageArray = document.getElementsByTagName("img");
      // let attachmentsArray = imageArray &&
      //     Array.isArray(imageArray) && [...attachment];
      for (let index = 0; index < imageArray.length; index++) {
        const img = imageArray[index];
        if (img.src && img.src.includes("cid")) {
          for (
            let attachIndex = 0;
            attachIndex < attachment.length;
            attachIndex++
          ) {
            const attach = attachment[attachIndex];
            if (
              attach.content_header["content-id"][0].slice(
                1,
                attach.content_header["content-id"][0].length - 1
              ) === imageArray[index].src.slice(4)
            ) {
              imgSrc = img.src = `data:image/${attach.extension};base64,${attach.raw}`;
            }
          }
          // for (let j = 0; j < document.images.length; j++) {
          //   return console.log(
          //     "Ollooooooo",
          //     document.images[j].src.replace(imgSrc)
          // );
          // }
        }
      }
      return imgSrc;
    } catch (e) {
      ApiInfo.DEBUGER && console.log(e.message);
      return null;
    }
  }

  // getImageSrc = (document, attachment) => {
  //   try {
  //     let imageArray = document.getElementsByTagName("img");
  //     let imageTags = [...imageArray];
  //     let attachmentsArray = [...attachment];
  //     imageTags &&
  //       imageTags.forEach((img, index) => {
  //         if (img.src && img.src.includes("cid")) {
  //           attachmentsArray.forEach((attach, attchIndex) => {
  //             if (
  //               attach.content_header["content-id"][0].slice(
  //                 1,
  //                 attach.content_header["content-id"][0].length - 1
  //               ) === imageArray[index].src.slice(4)
  //             ) {
  //               return (imageArray[
  //                 index
  //               ].src = `data:image/${attach.extension};base64,${attach.raw}`);
  //             }
  //           });
  //         }
  //       });
  //     return null;
  //   } catch (e) {
  //  ApiInfo.DEBUGER && console.log(e.message);
  //     return null;
  //   }
  // };

  componentDidMount() {
    this.getImageSrc();
  }

  render() {
    const {
      // openedEmail,
      formatMessage,
      // close,
      // open,
      // message_body,
      // attachment,
      // has_attachment
    } = this.props;
    //ApiInfo.DEBUGER && console.log("1+++", this.props.attachment);

    return (
      <div>
        <div
          style={{
            width: "100%",
            overflowY: "auto",
            overflowX: "hidden",
            height: "95%"
          }}
        >
          <ReadingPane
            message_body={window.message_body}
            formatMessage={formatMessage}
            attachment={window.attachment}
            has_attachment={window.has_attachment}
            forwardAction
            ReadingPaneViewModal
            openedEmail={window.openedEmail}
            smartSearch={window.smartSearch}
            labelDataFromModal={window.legalHoldAutoLabels}
            onHold={window.onHold}
            legalHoldId={window.legalHoldId}
            modal
          />
        </div>
      </div>
    );
  }
}


export default ReadingPaneModal;
