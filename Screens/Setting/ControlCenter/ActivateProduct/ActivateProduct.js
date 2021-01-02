import React, { Component } from 'react';
import { Typography, message, Button, Statistic, Row, Col, Card, Divider, Skeleton } from 'antd';
import { connect } from "react-redux";
import { updateDataTableActions } from "../../../../Redux/Actions/pageHeader/pageHeader";
import { uploadLicense, applyLicense, uploadedLicense } from "../../../../Redux/Actions/ControlCenterAction/LicenseAction";
import style from "../../../../styles";
import { defineMessages } from 'react-intl';

const messages = defineMessages({
  'choose your file': {
    id: "ActivateProduct.chooseyourfile",
    defaultMessage: "choose your file",
  },
  'Activate Product Summary': {
    id: "ActivateProduct.ActivateProductSummary",
    defaultMessage: "Activate Product Summary"
  },
  'License Information': {
    id: "ActivateProduct.LicenseInformation",
    defaultMessage: "License Information"
  },
  'Licensed To': {
    id: "ActivateProduct.LicensedTo",
    defaultMessage: "Licensed To"
  },
  'Expiry Date': {
    id: "ActivateProduct.ExpiryDate",
    defaultMessage: "Expiry Date"
  },
  'Mailbox(es)': {
    id: "ActivateProduct.Mailbox(es)",
    defaultMessage: "Mailbox(es)"
  },
  'Active Directories': {
    id: "ActivateProduct.ActiveDirectories",
    defaultMessage: "Active Directories",
  },
  'Email Server(es)': {
    id: "ActivateProduct.EmailServer(es)",
    defaultMessage: "Email Server(es)"
  },
  'Warning :': {
    id: "ActivateProduct.Warning",
    defaultMessage: "Warning :"
  },
  'Authorization Key :': {
    id: "ActivateProduct.AuthorizationKey",
    defaultMessage: "Authorization Key :"
  },
  'Smart Search Email :': {
    id: "ActivateProduct.SmartSearchEmail",
    defaultMessage: "Smart Search Email :"
  },
  'License Configured': {
    id: "ActivateProduct.LicenseConfigured",
    defaultMessage: "License Configured"
  },
  'Email Server (Licensed) :': {
    id: "ActivateProduct.EmailServer(Licensed)",
    defaultMessage: "Email Server (Licensed) :"
  },
  'Mailboxes (Licensed) :': {
    id: "ActivateProduct.Mailboxes(Licensed)",
    defaultMessage: "Mailboxes (Licensed) :",
  },
  'License:': {
    id: "ActivateProduct.License",
    defaultMessage: "License:"
  },
  'Upload File': {
    id: "ActivateProduct.UploadFile",
    defaultMessage: "Upload File"
  },
  'Choose file': {
    id: "ActivateProduct.ChooseFile",
    defaultMessage: "Choose file"
  },
  'Upload Key': {
    id: "ActivateProduct.UploadKey",
    defaultMessage: "Upload Key"
  },
})

const { Title } = Typography;
let file_input = {};

class ActivateProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fileName: [`${this.props.formatMessage(messages["choose your file"])}`],
      upload: false,
      type: [''],
      license_file: null
    }
    message.destroy()
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if ((!nextProps.uploadedlicense && prevState.data) || (nextProps.uploadedlicense && !prevState.data) || (JSON.stringify(nextProps.uploadedlicense) !== JSON.stringify(prevState.data))) {
      return {
        data: nextProps.uploadedlicense
      }
    }
    return {}
  }

  handleFileSelect = (e) => {
    e.preventDefault()
    file_input = document.createElement('input');
    file_input.setAttribute("accept", ".licx");
    file_input.addEventListener("change", this.uploadFile, false);
    file_input.type = 'file';
    file_input.click();
  }
  uploadFile = () => {
    if (file_input && file_input.files && file_input.files[0] && file_input.files[0].name && file_input.files[0].name.substring(file_input.files[0].name.length - 5) === '.licx' && file_input.files[0].name.length > 5) {
      let dataArray = new FormData();
      dataArray.append('file', file_input.files[0]);
      this.setState({
        fileName: [file_input.files[0].name],
        type: [file_input.files[0].type],
        license_file: file_input.files[0]
      }, () => this.props.updateDataTableActions({ cancel: true, cancelFunction: () => this.cancelAndReset() }))
    }
  }

  uploadKey = () => {
    const { license_file, data } = this.state;
    this.props.updateDataTableActions({ apply: (data && data.license_information) ? true : false, applyFunction: () => this.applyKey(), cancel: true, cancelFunction: () => this.cancelAndReset() })
    this.props.uploadLicense(license_file)
    this.setState({
      upload: true
    })
  }

  applyKey = () => {
    this.props.updateDataTableActions({})
    this.props.uploadedLicense(undefined)
    this.props.applyLicense();
    this.setInitialState();
  }

  cancelAndReset = () => {
    this.props.updateDataTableActions({})
    this.props.uploadedLicense(undefined)
    this.setInitialState();
  }

  setInitialState = () => {
    this.setState({
      fileName: [`${this.props.formatMessage(messages["choose your file"])}`],
      upload: false,
      type: [''],
      license_file: null
    })
  }

  truncate = (input) => {
    const { type } = this.state
    if (input.length > 100) {
      return input.substring(0, 100) + '...' + type[0];
    }
    else
      return input;
  };

  render() {
    const { fileName, license_file, data } = this.state
    const { formatMessage } = this.props;
    this.props.updateDataTableActions({ apply: (data && data.license_information) ? true : false, applyFunction: () => this.applyKey(), cancel: data ? true : false, cancelFunction: () => this.cancelAndReset() })


    return (
      <div /*style={{ ...style.padding10 }}*/>
        <Row gutter={16}>
          <Col span={24}>
            {this.state.upload ?
              <Card>
                <div>
                  <Title level={3}>{formatMessage(messages["Activate Product Summary"])}</Title>
                </div>
                <div style={{ ...style.setting.controlCenter.activeProduct.contentDiv }}>
                  <Card bordered={false} style={{ ...style.setting.controlCenter.activeProduct.card }}>
                    <div>
                      <Title level={3}>{formatMessage(messages["License Information"])}</Title>
                    </div>
                    <br />

                    {/* <Card bordered={false}> */}
                    {/* <Skeleton loading={data && !data.license_information && !data.smart_search_information}> */}
                    <Skeleton loading={!data}>
                      <Statistic valuestyle={{ ...style.setting.controlCenter.activeProduct.statisticValueFont }} title={formatMessage(messages["Licensed To"])} value={(data && data.license_information && data.license_information.Licensed_To) || ' -'} />
                      <Statistic valuestyle={{ ...style.setting.controlCenter.activeProduct.statisticValueFont }} title={formatMessage(messages["Expiry Date"])} value={(data && data.license_information && data.license_information.Expiry_Date) || ' -'} />
                      <Statistic valuestyle={{ ...style.setting.controlCenter.activeProduct.statisticValueFont }} title={formatMessage(messages["Mailbox(es)"])} value={(data && data.license_information && data.license_information.Mailboxes) || ' -'} />
                      <Statistic valuestyle={{ ...style.setting.controlCenter.activeProduct.statisticValueFont }} title={formatMessage(messages["Active Directories"])} value={(data && data.license_information && data.license_information.Active_Directories) || ' -'} />
                      {/* </Card>
                  <Divider type="vertical" style={{ height: "inherit" }} /> */}
                      {/* <Card bordered={false}> */}
                      <Statistic valuestyle={{ ...style.setting.controlCenter.activeProduct.statisticValueFont }} title={formatMessage(messages["Email Server(es)"])} value={(data && data.license_information && data.license_information.Email_Servers) || ' -'} />
                      <Statistic valuestyle={{ ...style.setting.controlCenter.activeProduct.statisticValueFont }} title={formatMessage(messages["Warning :"])} value={(data && data.license_information && `License will Expire On: ${(data && data.license_information && data.license_information.Expiry_Date)}`) || ' -'} />
                      <Statistic valuestyle={{ ...style.setting.controlCenter.activeProduct.statisticValueFont }} title={formatMessage(messages["Authorization Key :"])} value={(data && data.license_information && data.license_information.Authorization_Key) || ' -'} />
                      <Statistic valuestyle={{ ...style.setting.controlCenter.activeProduct.statisticValueFont }} title={formatMessage(messages["Smart Search Email :"])} value={(data && data.smart_search_information && data.smart_search_information.Smart_Email_Address) || ' -'} />
                    </Skeleton>
                    {/* </Card> */}
                  </Card>
                  <Divider type="vertical" style={{ ...style.heightInherit }} />

                  <Card bordered={false} style={{ ...style.setting.controlCenter.activeProduct.cardWidth }}>
                    <div>
                      <Title level={3}>{formatMessage(messages["License Configured"])}</Title>
                    </div>
                    <br />
                    <Statistic title={formatMessage(messages["Email Server (Licensed) :"])} value='5' />
                    <Statistic title={formatMessage(messages["Mailboxes (Licensed) :"])} value='5500' />
                    <Statistic title={formatMessage(messages["License:"])} value="06/30/2019" />
                  </Card>
                </div>
              </Card>
              :
              // <div>
              <Card title={formatMessage(messages["Upload File"])} size="small" style={{ ...style.setting.controlCenter.activeProduct.uploadFileCard }}>
                <Statistic value={this.truncate(fileName[0])}></Statistic>

                <form method="post" encType="multipart/form-data">
                  <div style={{ ...style.setting.controlCenter.activeProduct.uploadFileDiv }}>
                    <Button style={{ ...style.setting.controlCenter.activeProduct.buttons }} onClick={this.handleFileSelect}>
                      {formatMessage(messages["Choose file"]) || fileName[0]}
                    </Button>

                    <Button disabled={!license_file} style={license_file ? { ...style.setting.controlCenter.activeProduct.buttons } : { ...style.setting.controlCenter.activeProduct.Disablebutton }} onClick={this.uploadKey}>
                      {formatMessage(messages["Upload Key"])}
                    </Button>
                  </div>
                </form>
              </Card>
              // </div>
            }
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  uploadedlicense: state.ControlCenterReducer.uploadedlicense,
});

const mapDispatchToProps = dispatch => {
  return {
    updateDataTableActions: actions => dispatch(updateDataTableActions(actions)),
    uploadLicense: actions => dispatch(uploadLicense(actions)),
    applyLicense: () => dispatch(applyLicense()),
    uploadedLicense: action => dispatch(uploadedLicense(action))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivateProduct);
