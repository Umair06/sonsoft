import React, { Component } from 'react';
import { Drawer, Form, Input, Checkbox, Typography} from "antd";
import { PrimaryButton, SecondryButton } from "../Button/Button";
import Clear_Gray from '../../Assets/icons/SV_ICONS/Clear_Gray.png'
import { defineMessages } from 'react-intl';
import style from "../../styles";
import { EnCrypt } from "../../PasswordEncryption/PasswordEncryption"
import { connect } from "react-redux";
import { postConfigurationDeploymentSites } from "../../Redux/Actions/ConfigurationAction/DeploymentAction";
import DeploymentIcon from "../../Assets/icons/SV_ICONS/Deployment Settings_Blue.png";
// import * as ApiInfo from "../../APIConfig/ApiParameters";


const messages = defineMessages({
  'Edit Other Sites': {
    id: "Deployment.EditOtherSites",
    defaultMessage: "Edit Other Sites",
  },
  'Add Other Sites': {
    id: "Deployment.AddOtherSites",
    defaultMessage: "Add Other Sites"
  },
  'Site URL': {
    id: "Deployment.SiteURL",
    defaultMessage: "Site URL"
  },
  'Please Enter Site URL': {
    id: "Deployment.PleaseEnterSiteURL",
    defaultMessage: "Please Enter Site URL"
  },
  'Authorization Key': {
    id: "Deployment.AuthorizationKey",
    defaultMessage: "Authorization Key"
  },
  'Please Enter Authorization Key': {
    id: "Deployment.PleaseEnterAuthorizationKey",
    defaultMessage: "Please Enter Authorization Key"
  },
  'Authentication Required': {
    id: "Deployment.AuthenticationRequired",
    defaultMessage: "Authentication Required"
  },
  'User Name': {
    id: "Deployment.UserName",
    defaultMessage: "User Name"
  },
  'Password': {
    id: "Deployment.Password",
    defaultMessage: "Password"
  },
  'Save': {
    id: "Deployment.Save",
    defaultMessage: "Save"
  },
})

//const { color } = Theme;
const { Title, } = Typography;

class Deployment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      siteName: this.props.values ? this.props.values.site_name : "",
      siteURL: this.props.values ? this.props.values.search_url : "",
      authentication: props.values && props.values.SITE_IS_AUTH_REQUIRED
    }
  }
  static getDerivedStateFromProps(props, state) {
    if (props.values && props.values.SITE_IS_AUTH_REQUIRED && !state.SITE_IS_AUTH_REQUIRED) {
      return {
        authentication: props.values.SITE_IS_AUTH_REQUIRED,
        SITE_IS_AUTH_REQUIRED: true
      }
    }
    return {}
  }

  handleSubmit = () => {
    // message.error("couldnot Save Something Went Wrong");
    // this.props.close()
    this.props.form.validateFieldsAndScroll((err, data) => {
      if (err) {
        // ApiInfo.DEBUGER && console.log("error", err)
      }
      else {
        let password =data.password && EnCrypt(data.password)
        let deploymentSiteData = [{ "KEY": "Site_Prefix", "VALUE": this.props.Site_Prefix }, { "KEY": "Site_URL", "VALUE": data.Site_URL }, { "KEY": "Auth_Key", "VALUE": data.Auth_Key }, { "KEY": "Auth_Required", "VALUE": this.state.authentication ? 1 : 2 }, { "KEY": "UserName", "VALUE": data.User_Name }, { "KEY": "Password", "VALUE": data.password ? password: "" }]
        this.props.postConfigurationDeploymentSites(deploymentSiteData)
        this.Close()
      }
    });
  }
  authenthicationChange = e => {
    this.setState({
      authentication: e.target.checked,
    });
  };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  Close = () => {
    this.props.close()
    this.props.form.resetFields();
    this.setState({
      authentication:false
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { authentication } = this.state;
    const { values, deploymentSideDrawer, formatMessage } = this.props;

    return (
      <div>
        <Drawer
          // title={values ?formatMessage(messages["Edit Other Sites"]) : formatMessage(messages["Add Other Sites"])}
          width={400}
          visible={deploymentSideDrawer}
          onClose={() => this.Close()}
          style={{ overflowY: "auto" }}
          closable={false}
          maskStyle={{ backgroundColor: "transparent" }}
        >
          <div style={{ ...style.setting.drawerMain }}>
            <div style={{ ...style.setting.drawerIconTitleWrapper }}>
              <img alt='' title="Deployment" width src={DeploymentIcon} style={{ ...style.setting.drawerIcons }}></img>
              <Title style={{ ...style.setting.drawerTitles }}>{values ? formatMessage(messages["Edit Other Sites"]) : formatMessage(messages["Add Other Sites"])}</Title>
            </div>
            <div onClick={() => this.props.close()} style={{ paddingTop: 10, cursor: "pointer" }}>
              <img src={Clear_Gray} title="Close" alt="" onClick={() => this.Close()} width={28} height={28} />
            </div>
          </div>
          <Form layout="vertical" onSubmit={this.handleSubmit}>
            <Form.Item label={formatMessage(messages["Site URL"])}>
              {getFieldDecorator('Site_URL', {
                initialValue: this.props.values && this.props.values.SITE_URL,
                rules: [{ required: true, message: formatMessage(messages["Please Enter Site URL"]) }],
              })(<Input />)}
            </Form.Item>
            <Form.Item colon={false} label={formatMessage(messages["Authorization Key"])} style={{ ...style.formItemBetweenGap }}>
              {getFieldDecorator('Auth_Key', {
                initialValue: this.props.values && this.props.values.AUTH_KEY,
                rules: [{
                  required: true, message: formatMessage(messages["Please Enter Authorization Key"])
                }],
              })(<Input />)}
            </Form.Item>
            <Form.Item style={{ ...style.formItemBetweenGap }}>
              {getFieldDecorator('Authentication_Required', {
                valuePropName: 'checked',
                initialValue: this.props.values && this.props.values.SITE_IS_AUTH_REQUIRED,
                rules: [{ required: false }],
              })(<Checkbox onChange={this.authenthicationChange}>{formatMessage(messages["Authentication Required"])}</Checkbox>)}
            </Form.Item>
            {this.props.values ? (authentication === true || (this.props.values && this.props.values.SITE_IS_AUTH_REQUIRED)) : (authentication || (this.props.values && this.props.values.SITE_IS_AUTH_REQUIRED)) && (
              <div>
                <Form.Item label={formatMessage(messages["User Name"])} style={{ ...style.formItemBetweenGap }}>
                  {getFieldDecorator('User_Name', {

                  })(
                    <Input />
                  )}
                </Form.Item>
                <Form.Item label={formatMessage(messages["Password"])} style={{ ...style.formItemBetweenGap }}>
                  {getFieldDecorator('password', {
                    initialValue: this.props.values && this.props.values.SITE_USER_PASSWORD

                  })(
                    <Input type="password" />
                  )}
                </Form.Item>
              </div>
            )}
            <Form.Item style={{ ...style.formItemBetweenGap }}>
              <div style={{ ...style.drawerButtons }}>
                <PrimaryButton text={formatMessage(messages["Save"])} onClick={() => this.handleSubmit()} />
                <SecondryButton text="Cancel" onClick={() => this.Close()} style={{ marginRight: 8 }} />
              </div>
            </Form.Item>
          </Form>
        </Drawer>
      </div>
    )
  }
};

const DeploymentDrawerForm = Form.create('DeploymentForm')(Deployment);

const mapStateToProps = state => {
  return {


  }
};
const mapDispatchToProps = dispatch => {
  return {

    postConfigurationDeploymentSites: (data) => dispatch(postConfigurationDeploymentSites(data)),

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(DeploymentDrawerForm)