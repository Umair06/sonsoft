import React, { Component } from 'react';
import { Statistic, Row, Col, Card, Divider, Typography, Skeleton, message } from 'antd';
import { connect } from "react-redux";
import { updateDataTableActions } from "../../../../Redux/Actions/pageHeader/pageHeader";
import { getLicense, getLicenseInformation, fetchLicenseInformation } from "../../../../Redux/Actions/ControlCenterAction/LicenseAction"
import style from "../../../../styles";
import { defineMessages } from 'react-intl';
import moment from 'moment';
// import PageHeader from "../../../../Components/PageHeader/PageHeader";


const messages = defineMessages({
  'License Summary': {
    id: "License.LicenseSummary",
    defaultMessage: "License Summary",
  },
  'License Information': {
    id: "License.LicenseInformation",
    defaultMessage: "License Information :"
  },
  'Licensed To': {
    id: "License.LicensedTo",
    defaultMessage: "Licensed To:"
  },
  'Expiry Date': {
    id: "License.ExpiryDate",
    defaultMessage: "Expiry Date"
  },
  'Mailbox(es)': {
    id: "License.Mailbox(es)",
    defaultMessage: "Mailbox(es)"
  },
  'Active Directories': {
    id: "License.ActiveDirectories",
    defaultMessage: "Active Directories"
  },
  'Email Server(es)': {
    id: "License.EmailServer(es)",
    defaultMessage: "Email Server(es)"
  },
  'Warning :': {
    id: "License.Warning",
    defaultMessage: "Warning :"
  },
  'Authorization Key :': {
    id: "License.AuthorizationKey",
    defaultMessage: "Authorization Key :"
  },
  'License Configured': {
    id: "License.LicenseConfigured",
    defaultMessage: "License Configured"
  },
  'Email Server (Licensed) :': {
    id: "License.EmailServer(Licensed)",
    defaultMessage: "Email Server (Licensed) :"
  },
  'Mailboxes (Licensed) :': {
    id: "License.Mailboxes(Licensed)",
    defaultMessage: "Mailboxes (Licensed) :"
  },
  'License:': {
    id: "License.License",
    defaultMessage: "License:"
  },
})

const { Title } = Typography

class License extends Component {
  constructor(props) {
    super(props)
    message.destroy()
  }
  componentDidMount() {
    this.props.fetchLicenseInformation(!!this.props.licenseInformation)
    this.props.updateDataTableActions({ refresh: true, onRefresh: () => this.fetchLicenseConfigured() })
  }

  fetchLicenseConfigured = () => {
    this.props.getLicense()
    this.props.getLicenseInformation()
    this.props.fetchLicenseInformation()
  }
  componentWillUnmount() {
    this.props.updateDataTableActions({ refresh: false })
}

  render() {
    const { formatMessage, licenseInformation } = this.props;
    let configuredLicenseDate = this.props && this.props.license && this.props.license.License_Configured && this.props.license.License_Configured.License.split("/")
    // const updateDateWithDateObject = new Date(configuredLicenseDate);
    // const formatedDateForLicence = moment(updateDateWithDateObject).formate("DD-MMM-YYYY")
    if (configuredLicenseDate && Array.isArray(configuredLicenseDate) && configuredLicenseDate.length > 2) {
      [configuredLicenseDate[0], configuredLicenseDate[1]] = [configuredLicenseDate[1], configuredLicenseDate[0]]
      configuredLicenseDate = configuredLicenseDate.join("-")
    } else {
      configuredLicenseDate = (this.props && this.props.license && this.props.license.License_Configured && this.props.license.License_Configured.License) || ""
    }
    let smartSearchCredentials = licenseInformation && licenseInformation.smart_search_information
    let licenseInfo = licenseInformation && licenseInformation.license_information
    let expiryDate = (licenseInfo && licenseInfo.Expiry_Date) || " - "
    const formatedDate = (moment(expiryDate).format("DD-MMM-YYYY") === "Invalid date" ? expiryDate : moment(expiryDate).format("DD-MMM-YYYY"))
    if (licenseInfo && licenseInfo.Expiry_Date) {
      try {
        let splittedDate = licenseInfo.Expiry_Date.split("-").reverse()
        expiryDate = splittedDate.join("-")
      } catch (e) {

      }
    }
    return (
      <div>
         {/* <PageHeader
          formatMessage={formatMessage}
        /> */}
        <div /*style={{ ...style.padding10 }}*/>
          <Row gutter={16}>
            <Col span={24}>
              <Card
              //  title={
              // <Row style={{ display: "flex", flexDirection: "row" }}>

              //   <Col span={8}>
              //     <Card bordered={false}>
              //       <Statistic title="" value={""} prefix={<Icon style={{ fontSize: 80 }} type="mail" theme="twoTone" twoToneColor="#446BA8" height={200} width={200} />} />
              //     </Card>
              //   </Col>
              //   <Col span={8} style={{ display: "flex", justifyContent: "center" }}>
              //     <Divider type="vertical" style={{ height: "inherit" }} />
              //   </Col>
              //   <Col span={8}>
              //     <Card bordered={false}>
              //       <Statistic title="" value={""} prefix={<Icon style={{ fontSize: 80 }} type="check-circle" theme="twoTone" twoToneColor="#52c41a" height={200} width={200} />} />
              //     </Card>
              //   </Col>
              // </Row>}
              >

                <div>
                  <Title level={3}>{formatMessage(messages["License Summary"])}</Title>
                </div>
                <div style={{ ...style.setting.controlCenter.activeProduct.contentDiv }}>
                  <Card bordered={false} style={{ ...style.setting.controlCenter.activeProduct.cardWidth }}>
                    <div>
                      <Title level={3}>{formatMessage(messages["License Information"])}</Title>
                    </div>
                    <br />
                    {/* <Card bordered={false}> */}
                    <Skeleton loading={!licenseInfo}>
                      <Statistic valuestyle={{ ...style.setting.controlCenter.activeProduct.statisticValueFont }} title={"Licensed To :"} value={(licenseInfo && licenseInfo.Licensed_To) || " -"} />
                      <Statistic valuestyle={{ ...style.setting.controlCenter.activeProduct.statisticValueFont }} title={"Expiry Date :"} value={formatedDate || " -"} />
                      <Statistic valuestyle={{ ...style.setting.controlCenter.activeProduct.statisticValueFont }} title={"Mailbox(es) :"} value={(licenseInfo && licenseInfo.Mailboxes) || " -"} />
                      <Statistic valuestyle={{ ...style.setting.controlCenter.activeProduct.statisticValueFont }} title={"Active Directories :"} value={(licenseInfo && licenseInfo.Active_Directories) || " -"} />
                      {/* </Card>
                  <Divider type="vertical" style={{ height: "inherit" }} /> */}
                      {/* <Card bordered={false}> */}
                      <Statistic valuestyle={{ textAlign: "center" }} title={"Email Server(es):"} value={(licenseInfo && licenseInfo.Email_Servers) || " -"} />
                      {/* we need to use this one when we have data from API */}
                      <Statistic valuestyle={{ ...style.setting.controlCenter.activeProduct.statisticValueFont }} title={formatMessage(messages["Warning :"])} value={`License will Expire On ${formatedDate}`} />
                      {/* not this one */}
                      {/* <Statistic valuestyle={{ ...style.setting.controlCenter.activeProduct.statisticValueFont }} title={formatMessage(messages["Warning :"])} value={` - `} /> */}

                      <Statistic valuestyle={{ ...style.setting.controlCenter.activeProduct.statisticValueFont }} title={formatMessage(messages["Authorization Key :"])} value={(licenseInfo && licenseInfo.Authorization_Key) || " -"} />
                      <Statistic valuestyle={{ ...style.setting.controlCenter.activeProduct.statisticValueFont }} title="Smart Search Email :" value={smartSearchCredentials && smartSearchCredentials.Smart_Email_Address} />
                      <Statistic valuestyle={{ ...style.setting.controlCenter.activeProduct.statisticValueFont }} title="Smart Smart Knowledge Id :" value={smartSearchCredentials && smartSearchCredentials.Smart_Knowledge_Id} />
                      <Statistic valuestyle={{ ...style.setting.controlCenter.activeProduct.statisticValueFont }} title="Smart Smart Source :" value={smartSearchCredentials && smartSearchCredentials.Smart_Source} />

                      {/* </Card> */}
                    </Skeleton>
                  </Card>
                  <Divider type="vertical" style={{ ...style.heightInherit }} />

                  <Card bordered={false} style={{ ...style.setting.controlCenter.activeProduct.cardWidth }}>
                    <div>
                      <Title level={3}>{"License Configured :"}</Title>
                    </div>
                    <br />
                    <Skeleton loading={!this.props.license}>
                      <Statistic valuestyle={{ textAlign: "center" }} title={formatMessage(messages["Email Server (Licensed) :"])} value={`${(this.props.license && this.props.license.License_Configured && this.props.license.License_Configured.Email_Server_Licensed) || " -"}`} />
                      <Statistic title={formatMessage(messages["Mailboxes (Licensed) :"])} value={`${(this.props.license && this.props.license.License_Configured && this.props.license.License_Configured.Mailboxes_Licensed) || " -"}`} />
                      <Statistic title={"License :"} value={formatedDate || " -"} />
                    </Skeleton>
                  </Card>

                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    )
  }


}
const mapStateToprops = state => {
  return {
    license: state.ControlCenterReducer.license,
    licenseInformation: state.ControlCenterReducer.licenseInformation,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    updateDataTableActions: actions => dispatch(updateDataTableActions(actions)),
    fetchLicenseInformation: noMessage => dispatch(fetchLicenseInformation(noMessage)),
    getLicense: () => dispatch(getLicense()),
    getLicenseInformation: () => dispatch(getLicenseInformation())
  }
}


export default connect(mapStateToprops, mapDispatchToProps)(License);