import React from 'react';
import { Typography, Form, Input, Icon, Checkbox } from 'antd';
import style from '../../../../styles';
import { connect } from 'react-redux';
import { updateDataTableActions } from '../../../../Redux/Actions/pageHeader/pageHeader';
import {
  postSSOSetting,
  fetchSSOSetting,
  // uploadcertificate
} from '../../../../Redux/Actions/SecurityAction/SSOAction';
import { defineMessages } from 'react-intl';
import { version } from '../../../../APIConfig/Config';

const messages = defineMessages({
  'Identity Provider URL': {
    id: 'SSOForm.IdentityProviderURL',
    defaultMessage: 'Identity Provider URL'
  },
  'Service Provider URL': {
    id: 'SSOForm.ServiceProviderURL',
    defaultMessage: 'Service Provider URL'
  },
  Issuer: {
    id: 'SSOForm.Issuer',
    defaultMessage: 'Issuer'
  },
  'Public Certificate': {
    id: 'SSOForm.PublicCertificate',
    defaultMessage: 'Public Certificate'
  },
  'Choose a file': {
    id: 'SSOForm.ChooseAfile',
    defaultMessage: 'Choose a file'
  },
  'Enabled:': {
    id: 'SSOForm.Enabled',
    defaultMessage: 'Enabled:'
  }
});

const { Text } = Typography;
// let formValue = [
//   'https://login.microsoftonline.com/0003c9bd-ec7b-4a8e-a54d-6504a278ab8f/saml2',
//   'https://backups/ssarcui/easlogin.aspx',
//   'c0ba84cb-b2cb-43f3-a24b-e253a126ca93'
// ];
let file_input = [];

class SSOForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmDirty: false,
      autoCompleteResult: []
      // fileName: ['choose your file'],
    };
    // this.props.updateDataTableActions({
    //   save: true,
    //   saveValues: this.handleSubmit,
    //   cancel: true,
    //   cancelFunction: () => this.handleReset()
    // });
  }
  componentDidMount() {
    this.props.updateDataTableActions({ save: true, saveValues: () => this.handleSubmit(), cancel: true, cancelFunction: () => this.handleReset()})
  }
  static getDerivedStateFromProps(nextProps) {
    !nextProps.SSOdata && !nextProps.SSO_Setting && nextProps.fetchSSOSetting();
    return {};
    // Id: nextProps.roleId && nextProps.roleId[0].ROLE_ID,
    // Description: nextProps.roleId && nextProps.roleId[0].ROLE_DESCRIPTION,
    // Role: nextProps.roleId && nextProps.roleId[0].ROLE_NAME
  }
  handleFileSelect = e => {
    e.preventDefault();
    file_input = document.createElement('input');
    file_input.setAttribute("accept", [".cer", ".crt", ".pem"]);
    file_input.addEventListener('change', this.uploadFile, false);
    file_input.type = 'file';
    file_input.click();
  };
  uploadFile = () => {
    let dataArray = new FormData();
    dataArray.append('file', file_input.files[0]);
    this.setState({
      fileName: [file_input.files[0].name],
      CertificateFile: file_input.files[0]
    });
  };

  handleSubmit = () => {
    // e.preventDefault();
    const {CertificateFile} = this.state;
    console.log(CertificateFile)
    this.props.form.validateFieldsAndScroll((err, data) => {
      if (err) {
       } else {
        let SSOData = {
          SSO_IDP_URL: data.SSO_IDP_URL,
          SSO_CONS_URL: data.SSO_CONS_URL,
          SSO_ISSUER: data.SSO_ISSUER,
          SSO_ENABLE: data.SSO_ENABLE ? 'TRUE' : 'FALSE'
        };
        this.props.postSSOSetting(SSOData, CertificateFile);
   }
    });
  };

  handleReset = () => {
    const { form } = this.props;
    form.setFieldsValue({
      SSO_IDP_URL: this.props.SSOdata.SSO_Setting.SSO_IDP_URL,
      SSO_CONS_URL: this.props.SSOdata.SSO_Setting.SSO_CONS_URL,
      SSO_ISSUER: this.props.SSOdata.SSO_Setting.SSO_ISSUER,
      SSO_PUBLIC_CERTIFICATE: false,
      SSO_ENABLE:
        this.props &&
          this.props.SSOdata &&
          this.props.SSOdata.SSO_Setting &&
          this.props.SSOdata.SSO_Setting.SSO_ENABLE === "FALSE"
          ? false
          : true
    });
    this.setState({
      fileName: null,
      CertificateFile: null
    })
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      fileName,
      /*SSO_CONS_URL,
      SSO_ENABLE,
      SSO_IDP_URL,
      SSO_ISSUER*/
    } = this.state;
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

    return (
      <div style={{ ...style.padding10 }}>
        <Form
          layout='horizontal'
          labelAlign='left'
          {...formItemLayout}
          onSubmit={this.handleSubmit}>
          <Form.Item
            label={
              <Text>{formatMessage(messages['Identity Provider URL'])}</Text>
            }>
            {getFieldDecorator('SSO_IDP_URL', {
              initialValue:
                this.props &&
                this.props.SSOdata &&
                this.props.SSOdata.SSO_Setting &&
                this.props.SSOdata.SSO_Setting.SSO_IDP_URL,
              rules: [
                {
                  required: true,
                  message: 'Please Enter identity Provider URL'
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item
            style={{ ...style.formItemBetweenGap }}
            label={
              <Text>{formatMessage(messages['Service Provider URL'])}</Text>
            }>
            {getFieldDecorator('SSO_CONS_URL', {
              initialValue:
                this.props &&
                this.props.SSOdata &&
                this.props.SSOdata.SSO_Setting &&
                this.props.SSOdata.SSO_Setting.SSO_CONS_URL
            })(<Input />)}
          </Form.Item>
          <Form.Item
            style={{ ...style.formItemBetweenGap }}
            label={<Text>{formatMessage(messages['Issuer'])}</Text>}>
            {getFieldDecorator('SSO_ISSUER', {
              initialValue:
                this.props &&
                this.props.SSOdata &&
                this.props.SSOdata.SSO_Setting &&
                this.props.SSOdata.SSO_Setting.SSO_ISSUER,
              rules: [
                {
                  required: true,
                  message: 'Please Enter Single signon issuer name/app id'
                }
              ]
            })(<Input />)}
          </Form.Item>
          {version > 7.1 && (
            <Form.Item
              style={{ ...style.formItemBetweenGap }}
              label={
                <Text>{formatMessage(messages['Public Certificate'])}</Text>
              }>
              {getFieldDecorator('SSO_PUBLIC_CERTIFICATE', {
                // rules: [
                //   {
                //     // required: true,
                //     message: 'Please provide Public Certificate',
                //   },
                // ],
              })(
                <div style={{ cursor: 'pointer' }}>
                  <Input
                    style={{ cursor: 'pointer' }}
                    placeholder={formatMessage(messages['Choose a file'])}
                    value={fileName && fileName[0]}
                    onClick={this.handleFileSelect}
                    suffix={
                      <Icon
                        style={{
                          cursor: 'pointer',
                          fontSize: 24,
                          color: '#F05A28'
                        }}
                        onClick={this.handleFileSelect}
                        type='upload'></Icon>
                    }
                  />
                </div>
              )}
            </Form.Item>
          )}

          <Form.Item
            style={{ ...style.formItemBetweenGap }}
            label={<Text> {formatMessage(messages['Enabled:'])}</Text>}
            colon={false}>
            {getFieldDecorator('SSO_ENABLE', {
              valuePropName: 'checked',
              initialValue:
                this.props &&
                  this.props.SSOdata &&
                  this.props.SSOdata.SSO_Setting &&
                  this.props.SSOdata.SSO_Setting.SSO_ENABLE === 'TRUE'
                  ? true
                  : false
            })(<Checkbox />)}
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedSSOForm = Form.create({ name: 'SSO' })(SSOForm);
const mapStateToProps = state => {
  return {
    SSOdata: state.SecurityReducer.SSOdata
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateDataTableActions: actions =>
      dispatch(updateDataTableActions(actions)),
    fetchSSOSetting: () => dispatch(fetchSSOSetting()),
    postSSOSetting: (data, certFile) => dispatch(postSSOSetting(data, certFile)),
    // uploadcertificate: certFile => dispatch(uploadcertificate(certFile))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedSSOForm);
