import React, { Component, } from 'react';
import { Descriptions } from 'antd';
import Theme from "../../../Assets/Theme/Theme";
// import * as ApiInfo from "../../../APIConfig/ApiParameters";

const { color } = Theme;

class MetaData extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { data } = this.props
    let openedEmail = data && Array.isArray(data) && data.length > 0 ? data[0] : data
    return (
      <div style={{ padding: "15px 0", borderTop: `1px solid ${color.Black10}`, width: "100%" }}>
        <Descriptions size="small" bordered column={1} style={{ overflow: "auto", width: "100%" }}>
          {openedEmail._source && openedEmail._source.header && openedEmail._source.header.header && Object.keys(openedEmail._source.header.header).sort().map((headerKey, ind) => {
            let headerValue = openedEmail._source.header.header[headerKey]
            return(
              <Descriptions.Item key={ind} label={headerKey} style={{ overflowX: "auto", width: "100%" }}>{
                Array.isArray(headerValue) ? headerValue.map((val, index) => <p key={index} style={{ overflowX: "auto", width: "100%", wordBreak: "break-all",overflowWrap: 'break-word'  }}>{val}</p>)
                :
                  <p style={{ overflowX: "auto", width: "100%", wordBreak: "break-all",  overflowWrap: 'break-word' }}>{headerValue}</p>
                }
              </Descriptions.Item>
            )
          })}
          {/*  <Descriptions.Item style={{ width: "100%" }} label="From">{openedEmail._source && openedEmail._source.from.length > 0 &&
            <p style={{ overflowX: "auto", width: "100%" }} title={openedEmail._source.from[0]} style={{ margin: 0, padding: 0, marginLeft: 4 }}>{openedEmail._source.from[0].slice(0, openedEmail._source.from[0].indexOf("@")) + " <" + openedEmail._source.from[0] + ">"}
            </p>
            // </Popover>
          }</Descriptions.Item>
          <Descriptions.Item label="To" style={{ overflowX: "auto", width: "100%" }}>{openedEmail._source && openedEmail._source.to.map((val, index) => <p key={ind} style={{ overflowX: "auto", width: "100%" }}>{val.slice(0, val.indexOf("@")) + " <" + val + "> "}<br /></p>)}</Descriptions.Item>
          <Descriptions.Item label="CC" style={{ overflowX: "auto", width: "100%" }}>{openedEmail._source && openedEmail._source.cc && openedEmail._source.cc.length > 0 && openedEmail._source.cc.map((val, ind) => <p key={ind} style={{ overflowX: "auto", width: "100%" }}>{val}<br /></p>)}</Descriptions.Item>
          <Descriptions.Item label="Bcc" style={{ overflowX: "auto" }}>{openedEmail._source && openedEmail._source.bcc && openedEmail._source.bcc.length > 0 && openedEmail._source.bcc.map((val, ind) => <p key={ind} style={{ overflowX: "auto", width: "100%" }}>{val}<br /></p>)}</Descriptions.Item>
          <Descriptions.Item label="Subject" style={{ overflowX: "auto", width: "100%" }}><p style={{ overflowX: "auto", width: "100%" }}>{openedEmail._source && openedEmail._source.subject}</p></Descriptions.Item>
          <Descriptions.Item label="Thread-Topic" style={{ overflowX: "auto", width: "100%" }}></Descriptions.Item>
          <Descriptions.Item label="Theead-Index" style={{ overflowX: "auto", width: "100%" }}></Descriptions.Item>
          <Descriptions.Item label="Date" style={{ overflowX: "auto", width: "100%" }}><p style={{ overflowX: "auto", width: "100%" }}>{recordDate}</p></Descriptions.Item>
          <Descriptions.Item label="Message-ID" style={{ overflowX: "auto", width: "100%" }}><p style={{ overflowX: "auto", width: "100%" }}>{openedEmail._source && openedEmail._source.header && openedEmail._source.header.header && openedEmail._source.header.header["message-id"]}</p></Descriptions.Item>
          <Descriptions.Item label="mime-version" style={{ overflowX: "auto", width: "100%" }}><p style={{ overflowX: "auto", width: "100%" }}>{openedEmail._source && openedEmail._source.header && openedEmail._source.header.header && openedEmail._source.header.header["mime-version"]}</p></Descriptions.Item>
          <Descriptions.Item label="content-type" style={{ overflowX: "auto", width: "100%" }}><p style={{ overflowX: "auto", width: "100%" }}>{openedEmail._source && openedEmail._source.header && openedEmail._source.header.header && openedEmail._source.header.header["content-type"]}</p></Descriptions.Item>
          <Descriptions.Item label="Content-Transfer-Encoding" style={{ overflowX: "auto", width: "100%" }}><p style={{ overflowX: "auto", width: "100%" }}>{openedEmail._source && openedEmail._source.header && openedEmail._source.header.header && openedEmail._source.header.header["content-transfer-encoding"]}</p></Descriptions.Item>
          <Descriptions.Item label="X-To" style={{ overflowX: "auto", width: "100%", whiteSpace: "unset" }}><p style={{ overflowX: "auto", width: "100%" }}>{openedEmail._source && openedEmail._source.header && openedEmail._source.header.header && openedEmail._source.header.header["x-to"]}</p></Descriptions.Item>
          <Descriptions.Item label="X-From" style={{ overflowX: "auto", width: "100%" }}><p style={{ overflowX: "auto", width: "100%" }}>{openedEmail._source && openedEmail._source.header && openedEmail._source.header.header && openedEmail._source.header.header["x-from"]}</p></Descriptions.Item>
          <Descriptions.Item label="X-cc" style={{ overflowX: "auto", width: "100%" }}><p style={{ overflowX: "auto", width: "100%" }}>{openedEmail._source && openedEmail._source.header && openedEmail._source.header.header && openedEmail._source.header.header['X-cc']}</p></Descriptions.Item>
          <Descriptions.Item label="X-bcc" style={{ overflowX: "auto", width: "100%" }}><p style={{ overflowX: "auto", width: "100%" }}>{openedEmail._source && openedEmail._source.header && openedEmail._source.header.header && openedEmail._source.header.header['X-bcc']}</p></Descriptions.Item>
          <Descriptions.Item label="X-Folder" style={{ overflowX: "auto", width: "100%" }}><p style={{ overflowX: "auto", width: "100%" }}>{openedEmail._source && openedEmail._source.header && openedEmail._source.header.header && openedEmail._source.header.header["x-folder"]}</p></Descriptions.Item>
          <Descriptions.Item label="X-Origin" style={{ overflowX: "auto", width: "100%" }}><p style={{ overflowX: "auto", width: "100%" }}>{openedEmail._source && openedEmail._source.header && openedEmail._source.header.header && openedEmail._source.header.header["x-origin"]}</p></Descriptions.Item>
          <Descriptions.Item label="X-FileName" style={{ overflowX: "auto", width: "100%" }}><p style={{ overflowX: "auto", width: "100%" }}>{openedEmail._source && openedEmail._source.header && openedEmail._source.header.header && openedEmail._source.header.header["x-filename"]}</p></Descriptions.Item>
          <Descriptions.Item label="Accept-Language" style={{ overflowX: "auto", width: "100%" }}><p style={{ overflowX: "auto", width: "100%" }}>en-US</p></Descriptions.Item>
          <Descriptions.Item label="Content-Language" style={{ overflowX: "auto", width: "100%" }}><p style={{ overflowX: "auto", width: "100%" }}>en-US</p></Descriptions.Item> */}
        </Descriptions>
      </div >
    )
  }
};

export default MetaData;
