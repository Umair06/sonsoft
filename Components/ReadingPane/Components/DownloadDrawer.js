import React, { Component } from "react";
import { Drawer, Typography, Form, Select, message, Icon } from "antd";
import Theme from "../../../Assets/Theme/Theme";
import style from "../../../styles";
import { PrimaryButton, SecondryButton } from "../../Button/Button";
import { connect } from "react-redux";
import { downloadEmail } from "../../../Redux/Actions/ReadingPaneAction/DownloadAction";
import { B64toBlob } from '../../../GeneralFunctions/B64toBlob'
import { getAuthenticUserInfo } from '../../../Redux/Actions/LoginAction/LoginAction'
import GetUserRole from '../../../Redux/Actions/GetUserRoleAction/GetUserRoleAction';
import Clear_Gray from "../../../Assets/icons/SV_ICONS/Clear_Gray.png";
import { defineMessages } from "react-intl";
import * as ApiInfo from "../../../APIConfig/ApiParameters";
import axios from 'axios';

const messages = defineMessages({
  Download: {
    id: "DownloadDrawer.Download",
    defaultMessage: "Download"
  },
  Submit: {
    id: "DownloadDrawer.Submit",
    defaultMessage: "Submit"
  },
  Cancel: {
    id: "DownloadDrawer.Cancel",
    defaultMessage: "Cancel"
  }
});

const { Option } = Select;
const { color } = Theme;
const { Title } = Typography;

class DownloadDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DropDownList: ['eml', 'msg', 'pdf']
    };
  }

  closeAndResetDropDownValue = () => {
    this.props.form.resetFields()
    this.props.close();
  }

  onChangeDropdown = e => {
    this.setState({
      value: e
    });
  };

  logout = async () => {
    const { logoutCurrentUser, GetUserRole } = this.props
    await logoutCurrentUser(null)
    await GetUserRole(null)
    if (!JSON.stringify(localStorage.getItem("userInfo")))
      window.location.pathname = '/'
  }

  downloadMail = async (data, file_ext) => {
    const { openedEmail } = this.props
    try {
      message.loading("Downloading", 100)
      let response = await axios({
        method: "POST",
        url: ApiInfo.APIPORT + "/api/v2/search-exports/single-file-convert",
        headers: {
          "api-token": ApiInfo.APITOKEN,
          "Content-Type": "application/json",
          "x-channel": ApiInfo.APICHANNEL
        },
        data: {
          "fileType": `${data.downloadFormat}`,
          "filePath": `${data.filePath}`,
          "encrypted": `${openedEmail[0]._source.encrypted}`
        }
      })
      ApiInfo.DEBUGER && console.log("Download Email API response", response)
      if (response.data.status === 200) {
        var base64Data = response.data.data.output[0];
        if (base64Data !== "") {
          try {
            B64toBlob(base64Data, file_ext, '', data.fileName)
            message.destroy()
          } catch (e) {
            message.error("Cannot download document: " + response.data.message, 10)
          }
        }
        else {
          message.error("Downloading failed. Try Again", 10)
        }
      } else {
        if (response.data && response.data.status === 401) {
          this.logout();
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
    } catch (e) { }
  }


  handleSubmit = e => {
    this.props.form.validateFieldsAndScroll((err, data) => {
      if (!err) {
        if (
          (data.downloadFormat === "eml" ||
            data.downloadFormat === "msg" ||
            data.downloadFormat === "html" ||
            data.downloadFormat === "pdf")
        ) {
          var fileExt = [data.downloadFormat];
          if (this.props.openedEmail[0]._source && this.props.openedEmail[0]._source.file_properties && this.props.openedEmail[0]._source.file_properties.file_name) {
            data.fileName = this.props.openedEmail[0]._source.file_properties.file_name;
          } else {
            try {
              let fileName = this.props.openedEmail[0]._source.file_path.split("/")
              fileName = fileName[fileName.length - 1]
              data.fileName = fileName
            } catch (e) {
              data.fileName = this.props.openedEmail[0]._source._id
            }
          }
          if (data.fileName) {
            try {
              let fileName = data.fileName.split(".")
              if (fileName.length > 1) {
                data.fileName = fileName[0]
              }
            } catch (e) { }
          }
          data.filePath = this.props.openedEmail[0]._source.source_folder + this.props.openedEmail[0]._source.file_path;
          this.downloadMail(data, fileExt[0]);
          this.closeAndResetDropDownValue()
        } else {
          message.warn("please enter Download Format");
        }
      }
    });
  };


  render() {
    const { getFieldDecorator } = this.props.form;
    const { formatMessage, ReadingPaneViewModal } = this.props;
    return (
      <div>
        <Drawer
          style={!ReadingPaneViewModal ? { marginTop: 162 } : {}}
          bodyStyle={{ height: "calc(100vh - 162px)", overflowY: "auto" }}
          maskStyle={{ backgroundColor: "transparent" }}
          width={400}
          closable={false}
          onClose={() => this.closeAndResetDropDownValue()}
          visible={this.props.download}
        >
          <div style={{ ...style.setting.drawerMain }}>
            <div style={{ ...style.setting.drawerIconTitleWrapper }}>
              <img
                src={require("../../../Assets/icons/SV_ICONS/Download_Orange.png")}
                alt=""
                title="Download"
                width='40px'
              />
              <Title
                style={{ color: `${color.Blue}`, padding: "15px 0 0 18px", fontSize: 24 }}
              >
                {formatMessage(messages["Download"])}
              </Title>
            </div>
            <div
              onClick={() => this.closeAndResetDropDownValue()}
              style={{ paddingTop: 10, cursor: "pointer" }}
            >
              <img
                src={Clear_Gray}
                title="Close"
                alt=""
                onClick={() => this.closeAndResetDropDownValue()}
                width={28}
                height={28}
              />
            </div>
          </div>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item label="">
              <div style={{ paddingTop: 20, width: "inherit" }}>
                {getFieldDecorator("downloadFormat", {
                  initialValue: "eml"
                  // rules: [{ required: true, message: 'Please input Email Address' }],
                })(
                  <Select
                    showSearch
                    style={{ width: "inherit", height: 40 }}
                    defaultValue={this.state.DropDownList[0]}
                    optionFilterProp="children"
                    onChange={this.onChangeDropdown}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      // console.log('input', input, 'input', option)
                    }
                  >
                    {this.state.DropDownList.map((el, ind) => <Option key={ind} value={el}>{el.toUpperCase()}</Option>)}
                  </Select>
                )}

              </div>
            </Form.Item>
            <Form.Item>
              <div style={{ ...style.drawerButtons }}>
                <PrimaryButton
                  text={formatMessage(messages["Submit"])}
                  onClick={() => this.handleSubmit()}
                />
                <SecondryButton
                  text={formatMessage(messages["Cancel"])}
                  onClick={() => this.closeAndResetDropDownValue()}
                />
              </div>
            </Form.Item>
          </Form>
        </Drawer>
      </div>
    );
  }
}

const WrappedDownloadDrawer = Form.create({ name: "forward_Controls" })(
  DownloadDrawer
);

const mapStateToProps = state => {
  return {
    email: state.SimpleSearchReducer.email
  };
};
const mapDispatchToProps = dispatch => {
  return {
    downloadEmail: data => dispatch(downloadEmail(data)),
    logoutCurrentUser: data => dispatch(getAuthenticUserInfo(data)),
    GetUserRole: item => dispatch(GetUserRole(item))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedDownloadDrawer);
