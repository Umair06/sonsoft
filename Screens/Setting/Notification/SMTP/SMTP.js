import React from 'react';
import { Typography, Form, Input, Checkbox, message } from 'antd';
import {
  EnCrypt,
  DeCrypt
} from '../../../../PasswordEncryption/PasswordEncryption';
import { connect } from 'react-redux';
import { updateDataTableActions } from '../../../../Redux/Actions/pageHeader/pageHeader';
import {
  fetchSMTPSetting,
  postSMTPSetting
} from '../../../../Redux/Actions/NotificationAction/SMTPAction';
import style from '../../../../styles';
// import theme from '../../../../Assets/Theme/Theme';
import { defineMessages } from 'react-intl';
import * as ApiInfo from "../../../../APIConfig/ApiParameters";

const messages = defineMessages({
  'Sender Email': {
    id: 'SmtpForm.SenderEmail',
    defaultMessage: 'Sender Email'
  },
  'Please Write Sender Email': {
    id: 'SmtpForm.PleaseWriteSenderEmail',
    defaultMessage: 'Please Write Sender Email'
  },
  'SMTP Host': {
    id: 'SmtpForm.SMTPHost',
    defaultMessage: 'SMTP Host'
  },
  'please write SMTP Host': {
    id: 'SmtpForm.PleaseWriteSMTPHost',
    defaultMessage: 'Please write SMTP Host'
  },
  Port: {
    id: 'SmtpForm.Port',
    defaultMessage: 'Port'
  },
  'Please Write Port': {
    id: 'SmtpForm.PleaseWritePort',
    defaultMessage: 'Please Write Port'
  },
  'Authentication Required': {
    id: 'SmtpForm.AuthenticationRequired',
    defaultMessage: 'Authentication Required'
  },
  Crendentials: {
    id: 'SmtpForm.Crendentials',
    defaultMessage: 'Crendentials'
  },
  'User Name': {
    id: 'SmtpForm.UserName',
    defaultMessage: 'User Name'
  },
  Password: {
    id: 'SmtpForm.Password',
    defaultMessage: 'Password'
  }
});

const { Text, Title } = Typography;
// const { color } = theme;
// const { Link } = Anchor;
let value = ['bilala@sonasoft.com', 'smtp.office365.com'];
class SmtpForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
      archivalOption: 1,
      // password: "Asrar",
      passwordFlag: true,
      senderEmail: value[0],
      smtpHost: value[1]
    };
    message.destroy()
  };

  componentDidMount() {
    this.props.fetchSMTPSetting();
    this.props.updateDataTableActions({
      save: true,
      saveValues: () => this.handleSubmit(),
      cancel: true,
      cancelFunction: () => this.handleReset()
    });
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (
      nextProps.SMTPdata &&
      nextProps.SMTPdata.SMTP_Setting &&
      !state.SMTPpassword &&
      !state.authenthication &&
      nextProps.SMTPdata) {
      return {
        SMTPpassword: nextProps.SMTPdata.SMTP_Setting.SMTP_USER_PASSWORD,
        authenthication:
          nextProps.SMTPdata.SMTP_Setting.SMTP_IS_AUTH_REQUIRED === 'Y'
            ? true
            : false
      };
    }
    return {};
  }
  onCancel = () => {
    this.setState({
      SMTPpassword: this.state.SMTPpassword,
      cancel: false,
      passwordFlag: true
    });
  };
  changePassword = (e) => {
    console.log("object", e.target.value)
    // this.setState({
    //   SMTPpassword: '',
    //   cancel: false,
    //   passwordFlag: true
    // });
  };
  handleSubmit = () => {
    // e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, data) => {
      if (err) {
        //ApiInfo.DEBUGER && console.log("error", err)
      } else {
        let SmtpData = {
          SMTP_Setting: {
            SMTP_SENDER_EMAIL: data.SMTP_SENDER_EMAIL,
            SMTP_SERVER_NAME: data.SMTP_SERVER_NAME,
            SMTP_PORT_NO: data.SMTP_PORT_NO && data.SMTP_PORT_NO.toString(),
            SMTP_USER_NAME: data.SMTP_USER_NAME || '',
            SMTP_USER_PASSWORD:
              (data.SMTP_USER_PASSWORD && EnCrypt(data.SMTP_USER_PASSWORD)) ||
              '',
            SMTP_IS_AUTH_REQUIRED:
              this.state.authenthication === true ? 'Y' : 'N'
          }
        };

        this.props.postSMTPSetting(SmtpData);
      }
    });
    this.setState({
      passwordFlag: false
    });
  };

  handleReset = () => {
    try {
      const { form } = this.props;
      if (this.props.SMTPdata.SMTP_Setting) {
        form.setFieldsValue({
          SMTP_SENDER_EMAIL: this.props.SMTPdata.SMTP_Setting.SMTP_SENDER_EMAIL,
          SMTP_SERVER_NAME: this.props.SMTPdata.SMTP_Setting.SMTP_SERVER_NAME,
          SMTP_PORT_NO: this.props.SMTPdata.SMTP_Setting.SMTP_PORT_NO,
          SMTP_USER_NAME: this.props.SMTPdata.SMTP_Setting.SMTP_USER_NAME,
          SMTP_USER_PASSWORD: this.props.SMTPdata.SMTP_Setting.SMTP_USER_PASSWORD && DeCrypt(this.props.SMTPdata.SMTP_Setting.SMTP_USER_PASSWORD),
          SMTP_IS_AUTH_REQUIRED:
            this.setState({
              authenthication:
                this.props.SMTPdata.SMTP_Setting.SMTP_IS_AUTH_REQUIRED === 'Y'
                  ? true
                  : false
            }) && !this.state.authenthication,
          // SMTP_IS_AUTH_REQUIRED: true
        });
      }
    } catch (e) {
      ApiInfo.DEBUGER && console.log("issue in SMTP reset function")
    }
  };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  selectSitePrefix = option => {
    this.setState({
      sitePrefix: option
    });
  };
  ArchivalOptionSelect = e => {
    this.setState({
      archivalOption: e.target.value
    });
  };
  changeHandler = e => {
    e.preventDefault();
    this.setState({
      passwordFlag: false,
      [e.target.name]: [e.target.value]
    });
  };

  authenthicationChecked = () => {
    let newAuthenthication = this.state.authenthication;
    this.setState({
      authenthication: !newAuthenthication
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { authenthication, /*cancel, passwordFlag, SMTPpassword*/ } = this.state;
    const { formatMessage } = this.props;
    
    const formItemLayout = {
      labelCol: {
        xs: { span: 12 },
        sm: { span: 8, push: 1 }
      },
      wrapperCol: {
        xs: { span: 12 },
        sm: { span: 10, pull: 3 }
      }
    };
    let password;
    try {
      password = this.props && this.props.SMTPdata && this.props.SMTPdata.SMTP_Setting && this.props.SMTPdata.SMTP_Setting.SMTP_IS_AUTH_REQUIRED === "Y" && this.props.SMTPdata.SMTP_Setting.SMTP_USER_PASSWORD ? DeCrypt(this.props.SMTPdata.SMTP_Setting.SMTP_USER_PASSWORD) : ""
    } catch (e) { }
    return (

      <div style={{ ...style.padding10 }}>
        <Form
          layout='horizontal'
          labelAlign='left'
          {...formItemLayout}
          onSubmit={this.handleSubmit}>
          <Form.Item
            label={<Text>{formatMessage(messages['Sender Email'])}</Text>}>
            {getFieldDecorator('SMTP_SENDER_EMAIL', {
              initialValue:
                this.props &&
                this.props.SMTPdata &&
                this.props.SMTPdata.SMTP_Setting &&
                this.props.SMTPdata.SMTP_Setting.SMTP_SENDER_EMAIL,
              rules: [
                {
                  required: true,
                  message: formatMessage(messages['Please Write Sender Email'])
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item
            style={{ ...style.formItemBetweenGap }}
            label={<Text>{formatMessage(messages['SMTP Host'])}</Text>}>
            {getFieldDecorator('SMTP_SERVER_NAME', {
              initialValue:
                this.props &&
                this.props.SMTPdata &&
                this.props.SMTPdata.SMTP_Setting &&
                this.props.SMTPdata.SMTP_Setting.SMTP_SERVER_NAME,
              rules: [
                {
                  required: true,
                  message: formatMessage(messages['please write SMTP Host'])
                }
                // {
                // validator: this.validateToNextPassword,
                // },
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item
            style={{ ...style.formItemBetweenGap }}
            label={<Text>{formatMessage(messages['Port'])}</Text>}>
            {getFieldDecorator('SMTP_PORT_NO', {
              initialValue:
                this.props &&
                  this.props.SMTPdata &&
                  this.props.SMTPdata.SMTP_Setting
                  ? this.props.SMTPdata.SMTP_Setting.SMTP_PORT_NO
                  : 587
            })(<Input type='number' />)}
          </Form.Item>
          <Form.Item
            style={{ ...style.formItemBetweenGap }}
            label={
              <Text>{formatMessage(messages['Authentication Required'])}</Text>
            }>
            {getFieldDecorator('SMTP_IS_AUTH_REQUIRED', {
              valuePropName: 'checked',
              initialValue: authenthication
            })(
              <Checkbox
                checked={this.state.test}
                onChange={() => this.authenthicationChecked()}></Checkbox>
            )}
          </Form.Item>

          {authenthication && (
            <div>
              <Form.Item
                style={{ ...style.formItemBetweenGap, ...style.marginPadding0 }}
                label={
                  <Title
                    style={{ ...style.setting.notification.smtp.title }}
                    level={3}>
                    {formatMessage(messages['Crendentials'])}
                  </Title>
                }
                colon={false}
                // style={new Object({ ...style.marginPadding0 })}
                ></Form.Item>
              <Form.Item
                label={<Text>{formatMessage(messages['User Name'])}</Text>}>
                {getFieldDecorator('SMTP_USER_NAME', {
                  initialValue:
                    this.props &&
                    this.props.SMTPdata &&
                    this.props.SMTPdata.SMTP_Setting &&
                    this.props.SMTPdata.SMTP_Setting.SMTP_USER_NAME,
                  rules: [
                    {
                      required: authenthication,
                      message: 'Please Enter User Name'
                    }
                  ]
                })(<Input />)}
              </Form.Item>
              <Form.Item
                style={{ ...style.formItemBetweenGap }}
                label={<Text>{formatMessage(messages['Password'])}</Text>}>
                {getFieldDecorator('SMTP_USER_PASSWORD', {
                  initialValue: password || "",
                  rules: [
                    {
                      required: authenthication,
                      message: 'Please Enter Password'
                    }
                  ]
                })(
                  <Input type='password' onChange={this.changePassword} />
                  //      :
                  //      <Input name="SMTPpassword"  disabled={true} type="password" value={SMTPpassword} />
                  // }

                  /* </div>
                  {passwordFlag ?
                       <div onClick={() => this.changePassword()}><Button  type="link" >Change</Button></div>
                      :
                      null
                  }
                  {cancel ?
                       <div onClick={() => this.onCancel()}><Button   type="link"> Cancel</Button></div>: null
                  }
              </div>, */
                )}
              </Form.Item>
            </div>
          )}
        </Form>
      </div>
    );
  }
}

const WrappedSmtpForm = Form.create({ name: 'Smtp' })(SmtpForm);
const mapStateToProps = state => {
  return {
    SMTPdata: state.NotificationReducer.SMTPdata
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateDataTableActions: actions =>
      dispatch(updateDataTableActions(actions)),
    fetchSMTPSetting: () => dispatch(fetchSMTPSetting()),
    postSMTPSetting: data => dispatch(postSMTPSetting(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedSmtpForm);
