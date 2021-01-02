import React, { Component } from 'react';
import { Statistic, Row, Col, Card, Divider, Typography, Skeleton, message } from 'antd';
import { connect } from "react-redux";
import { updateDataTableActions } from "../../../../Redux/Actions/pageHeader/pageHeader";
import Cross_Outline_DOrange from "../../../../Assets/icons/SV_ICONS/Cross_Outline_DOrange.png";
import Checkmark_Outline_Green from "../../../../Assets/icons/SV_ICONS/Checkmark_Outline_Green.png"
import Archive_Policy_Blue from "../../../../Assets/icons/SV_ICONS/Archive_Policy_Blue.png";
import { fetchStatus, getStatus } from "../../../../Redux/Actions/ControlCenterAction/StatusAction"
import style from "../../../../styles";
import { version } from "../../../../APIConfig/Config";
import { defineMessages } from 'react-intl';
// import PageHeader from "../../../../Components/PageHeader/PageHeader";



const messages = defineMessages({
  'Created on': {
    id: "Status.CreatedOn",
    defaultMessage: "Created on",
  },
  'Archiving Normally': {
    id: "Status.ArchivingNormally",
    defaultMessage: "Archiving Normally"
  },
  'System is Receving Data Normally.': {
    id: "Status.SystemIsRecevingDataNormally",
    defaultMessage: "System is Receving Data Normally."
  },
  'items have been archived in the last': {
    id: "Status.ItemsHaveBeenArchivedInTheLast",
    defaultMessage: "items have been archived in the last"
  },
  'Not Archiving Normally': {
    id: "Status.NotArchivingNormally",
    defaultMessage: "Not Archiving Normally"
  },
  'Purge Policy :': {
    id: "Status.PurgePolicy",
    defaultMessage: "Purge Policy :"
  },
  'Retention Expired :': {
    id: "Status.RetentionExpired",
    defaultMessage: "Retention Expired :"
  },
  'Retention Grace Expired : ': {
    id: "Status.RetentionGraceExpired",
    defaultMessage: "Retention Grace Expired : "
  },
})

const { Title, Text } = Typography

class Status extends Component {
  constructor(props) {
    super(props)

    this.state = {
      checked: true
    };
    message.destroy()
  };


  componentDidMount() {
    this.props.fetchStatus(!!this.props.status)
    this.props.updateDataTableActions({ refresh: true, onRefresh: () => this.fetchStatusSettings() })
  }

  fetchStatusSettings() {
    this.props.getStatus()
    this.props.fetchStatus()
  }
  componentWillUnmount() {
    this.props.updateDataTableActions({ refresh: false })
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
            <Col span={24}>
              <Card title={version > 7.1 && <Row style={{ ...style.setting.controlCenter.status.cardTitleRow }}>
                <Col span={12}>
                  <Card bordered={false} >
                    <div style={{ ...style.setting.controlCenter.status.cardTitleRow }}>
                      <img src={Archive_Policy_Blue} alt="" />
                      <div style={{ ...style.setting.controlCenter.status.cardContentDiv }}>
                        <Text style={{ ...style.setting.controlCenter.status.textFont28 }}>Sonasoft [20154]</Text>
                        <Text style={{ ...style.setting.controlCenter.status.textFont11 }}>{formatMessage(messages["Created on"])} jun 21, 2017</Text>
                      </div>
                    </div>
                  </Card>
                </Col>

                <Col style={{ ...style.setting.controlCenter.status.dividerMainDiv }}>
                  <Divider type="vertical" style={{ ...style.heightInherit }} />
                </Col>

                <Col span={12}>
                  <Card bordered={false}>
                    <div style={{ ...style.setting.controlCenter.status.cardTitleRow }}>
                      {/* <Icon style={{ fontSize: 80 }} type="check-circle" theme="twoTone" twoToneColor="#52c41a" height={200} width={200} /> */}
                      {this.props.status ? <img src={Checkmark_Outline_Green} alt="" /> : <img src={Cross_Outline_DOrange} alt="" />}
                      {this.props.status ?
                        <div style={{ ...style.setting.controlCenter.status.cardContentDiv }}>
                          <Text style={{ ...style.setting.controlCenter.status.textFont24 }}>{formatMessage(messages["Archiving Normally"])}</Text>
                          <Text style={{ ...style.setting.controlCenter.status.textFont11 }}>{formatMessage(messages["System is Receving Data Normally."])}</Text>
                          <Text style={{ ...style.setting.controlCenter.status.textFont11 }}>1202 {formatMessage(messages["items have been archived in the last"])} 24 hours.</Text>
                        </div>
                        :
                        <div style={{ ...style.setting.controlCenter.status.cardContentDiv }}>
                          <Text style={{ ...style.setting.controlCenter.status.textFont24 }}>{formatMessage(messages["Not Archiving Normally"])}</Text>

                        </div>
                      }
                    </div>
                  </Card>
                </Col>
              </Row>} >
                <div>
                  <Title level={3}>Status Summary</Title>
                </div>
                <Skeleton loading={!this.props.status} active>

                  <div style={{ ...style.setting.controlCenter.activeProduct.contentDiv }}>
                    <Card bordered={false}>
                      <Statistic title={formatMessage(messages["Purge Policy :"])} value={`${(this.props && this.props.status && this.props.status.Status && this.props.status.Status.purge_policy && this.props.status.Status.purge_policy.status) || " -"}`} />
                    </Card>
                    <Divider type="vertical" style={{ ...style.heightInherit }} />
                    <Card bordered={false}>
                      <Statistic title={formatMessage(messages["Retention Expired :"])} value={`${(this.props && this.props.status && this.props.status.Status && this.props.status.Status && this.props.status.Status.retention_expired && this.props.status.Status.retention_expired.status) || " -"}`} />
                    </Card>
                    <Divider type="vertical" style={{ ...style.heightInherit }} />
                    <Card bordered={false}>
                      <Statistic title={formatMessage(messages["Retention Grace Expired : "])} value={`${(this.props && this.props.status && this.props.status.Status && this.props.status.Status && this.props.status.Status.retention_grace_expired.status) || " -"}`} />
                    </Card>
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
    status: state.ControlCenterReducer.status
  }
}
const mapDispatchToProps = dispatch => {
  return {
    updateDataTableActions: actions => dispatch(updateDataTableActions(actions)),
    fetchStatus: noMessage => dispatch(fetchStatus(noMessage)),
    getStatus: () => dispatch(getStatus()),
  }
}


export default connect(mapStateToprops, mapDispatchToProps)(Status);