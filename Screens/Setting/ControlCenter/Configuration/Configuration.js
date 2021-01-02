import React, { Component } from 'react';
import { Statistic, Row, Col, Card, Typography, Skeleton, message } from 'antd';
import { connect } from "react-redux";
import { updateDataTableActions } from "../../../../Redux/Actions/pageHeader/pageHeader";
import { fetchConfiguration, getConfiguration } from "../../../../Redux/Actions/ControlCenterAction/ConfigurationAction"
import style from "../../../../styles";
import { defineMessages } from 'react-intl';
// import PageHeader from "../../../../Components/PageHeader/PageHeader";


const messages = defineMessages({
  'Configuration Summary': {
    id: "Settings_ControlCenter_Configuration.ConfigurationSummary",
    defaultMessage: "Configuration Summary",
  },
  'Deployment Type :': {
    id: "Settings_ControlCenter_Configuration.DeploymentType",
    defaultMessage: "Deployment Type :"
  },
  'SMTP Configured? :': {
    id: "Settings_ControlCenter_Configuration.SMTPConfigured?",
    defaultMessage: "SMTP Configured?"
  },
  'Default Password Changed? :': {
    id: "Settings_ControlCenter_Configuration.DefaultPasswordChanged?",
    defaultMessage: "Default Password Changed?"
  },
  'User-Defined Retention Policy Configured?:': {
    id: "Settings_ControlCenter_Configuration.UserDefinedRetentionPolicyConfigured?",
    defaultMessage: "User-Defined Retention Policy Configured?"
  },
  'Default Retention Policy Configured?:': {
    id: "Settings_ControlCenter_Configuration.DefaultRetentionPolicyConfigured?",
    defaultMessage: "Default Retention Policy Configured?"
  },
  'Purge Policy Configured?:': {
    id: "Settings_ControlCenter_Configuration.PurgePolicyConfigured?",
    defaultMessage: "Purge Policy Configured?",
  },
  'Archival Type :': {
    id: "Settings_ControlCenter_Configuration.ArchivalType",
    defaultMessage: "Archival Type :"
  },
})

const { Title } = Typography

class Configuration extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    message.destroy()
  }
  componentDidMount() {
    this.props.fetchConfiguration(!!this.props.configuration)
    this.props.updateDataTableActions({ refresh: true, onRefresh: () => this.fetchConfigurationSettings() })
  }
  componentWillUnmount() {
    this.props.updateDataTableActions({ refresh: false })
  }

  fetchConfigurationSettings = () => {
    this.props.getConfiguration()
    this.props.fetchConfiguration()
  }

  render() {
    const { formatMessage } = this.props;
    return (
      <div>
        {/* <PageHeader
          formatMessage={formatMessage}
        /> */}
        <div /*style={{ ...style.padding10 }}*/>
          <Row gutter={16}>
            <Col span={30}>
              <Card >
                <div>
                  <Title level={3}>{formatMessage(messages["Configuration Summary"])}</Title>
                </div>
                <Skeleton loading={!this.props.configuration} active>

                  <div style={{ ...style.setting.controlCenter.configuration.contentMainDiv }}>
                    <Row gutter={16}>

                      <Col span={8}>
                        <Card bordered={false}>
                          <Statistic title={formatMessage(messages["Deployment Type :"])} value={(this.props && this.props.configuration && this.props.configuration.configuration && this.props.configuration.configuration.Deployment_Type) || " -"} />
                        </Card>
                      </Col>

                      <Col span={8} style={{ ...style.controlCenter.statistic.borderLeft, ...style.controlCenter.statistic.marginBottom }}>
                        <Card bordered={false}>
                          <Statistic title={formatMessage(messages["SMTP Configured? :"])} value={(this.props && this.props.configuration && this.props.configuration.configuration && this.props.configuration.configuration.SMTP_Configured) || " -"} />
                        </Card>
                      </Col>

                      <Col span={8} style={{ ...style.controlCenter.statistic.borderLeft, ...style.controlCenter.statistic.marginBottom }}>
                        <Card bordered={false}>
                          <Statistic title={formatMessage(messages["Default Password Changed? :"])} value={(this.props && this.props.configuration && this.props.configuration.configuration && this.props.configuration.configuration.Default_Password_Changed) || " -"} />
                        </Card>
                      </Col>

                      {/*  */}
                      <Col span={8} style={{ ...style.controlCenter.statistic.marginBottom }}>
                        <Card bordered={false}>
                          <Statistic title={formatMessage(messages["User-Defined Retention Policy Configured?:"])} value={(this.props && this.props.configuration && this.props.configuration.configuration && this.props.configuration.configuration.User_Defined_Retention_Policy_Configured) || " -"} />
                        </Card>
                      </Col>

                      <Col span={8} style={{ ...style.controlCenter.statistic.borderLeft, ...style.controlCenter.statistic.marginBottom }}>
                        <Card bordered={false}>
                          <Statistic title={formatMessage(messages["Default Retention Policy Configured?:"])} value={(this.props && this.props.configuration && this.props.configuration.configuration && this.props.configuration.configuration.Default_Retention_Policy_Configured) || " -"} />
                        </Card>

                      </Col>


                      <Col span={8} style={{ ...style.controlCenter.statistic.borderLeft, ...style.controlCenter.statistic.marginBottom }}>
                        <Card bordered={false}>
                          <Statistic title={formatMessage(messages["Purge Policy Configured?:"])} value={(this.props && this.props.configuration && this.props.configuration.configuration && this.props.configuration.configuration.Purge_Policy_Configured) || " -"} />
                        </Card>

                      </Col>


                      <Col span={6}>
                        <Card bordered={false} style={{ ...style.controlCenter.statistic.marginBottom }}>
                          <Statistic title={formatMessage(messages["Archival Type :"])} value={(this.props && this.props.configuration && this.props.configuration.configuration && this.props.configuration.configuration.Archival_Type) || " -"} />
                        </Card>

                      </Col>

                    </Row>
                  </div>
                </Skeleton>
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
    configuration: state.ControlCenterReducer.configuration
  }
}
const mapDispatchToProps = dispatch => {
  return {
    updateDataTableActions: actions => dispatch(updateDataTableActions(actions)),
    fetchConfiguration: noMessage => dispatch(fetchConfiguration(noMessage)),
    getConfiguration: () => dispatch(getConfiguration())
  }
}


export default connect(mapStateToprops, mapDispatchToProps)(Configuration);