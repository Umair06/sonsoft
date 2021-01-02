import React, { Component } from 'react';
import { Statistic, Row, Col, Card, Typography, Skeleton, message } from 'antd';
import { connect } from "react-redux";
import { updateDataTableActions } from "../../../Redux/Actions/pageHeader/pageHeader";
import { fetchStatistic, getStatistic } from "../../../Redux/Actions/ControlCenterAction/StatisticsAction"
import style from "../../../styles";
import { defineMessages } from 'react-intl';
import moment from 'moment';


const messages = defineMessages({
  'Statistics Summary': {
    id: "Statistics.StatisticsSummary",
    defaultMessage: "Statistics Summary",
  },
  'Active Directory (Total/Sync-Enabled/Sync-Disabled) :': {
    id: "Statistics.Total/Sync-Enabled/Sync-Disabled",
    defaultMessage: "Active Directory (Total/Sync-Enabled/Sync-Disabled) :"
  },
  'Email Server (Enabled/Stub-Enabled) :': {
    id: "Statistics.Enabled/Stub-Enabled",
    defaultMessage: "Email Server (Enabled/Stub-Enabled) :"
  },
  'No_of_Archive_Stores': {
    id: "Statistics.No.OfArchiveStores",
    defaultMessage: "No. of Archive Stores :"
  },
  'Last Message Archived at : ': {
    id: "Statistics.LastMessageArchivedAt",
    defaultMessage: "Last Message Archived at :"
  },
  'Total Messages Archived/Total Message Size(MB) :': {
    id: "Statistics.TotalMessagesArchived/TotalMessageSize(MB)",
    defaultMessage: "Total Messages Archived/Total Message Size(MB) :"
  },
  'Mailbox Access Count :': {
    id: "Statistics.MailboxAccessCount",
    defaultMessage: "Mailbox Access Count :"
  },
  'Total Notifications Configured ': {
    id: "Statistics.TotalNotificationsConfigured",
    defaultMessage: "Total Notifications Configured :"
  },
})

const { Title } = Typography

class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount() {
    message.destroy()
    this.props.fetchStatistic()
    this.props.updateDataTableActions({ refresh: true, onRefresh: () => this.fetchStatisticsInformation() })
  }

  fetchStatisticsInformation() {
    this.props.getStatistic()
    this.props.fetchStatistic()
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      active_directory: nextProps.active_directory,
    }
  }
  componentWillUnmount() {
    this.props.updateDataTableActions({ refresh: false })
}
  render() {
    const { formatMessage } = this.props;
    let archiveDirectoryTotal = (this.props.statistic && this.props.statistic.statistics && this.props.statistic.statistics.active_directory && this.props.statistic.statistics.active_directory.total) || "";
    let activeDirectorySync_Enabled = this.props.statistic && this.props.statistic.statistics && this.props.statistic.statistics.active_directory && this.props.statistic.statistics.active_directory.enabled ? this.props.statistic.statistics.active_directory.enabled : undefined
    let activeDirectorySync_Disabled = this.props.statistic && this.props.statistic.statistics && this.props.statistic.statistics.active_directory && this.props.statistic.statistics.active_directory.disabled ? this.props.statistic.statistics.active_directory.disabled : undefined


    let emailServer_Enabled = this.props.statistic && this.props.statistic.statistics && this.props.statistic.statistics.email_server && this.props.statistic.statistics.email_server.enabled ? this.props.statistic.statistics.email_server.enabled : undefined
    let emailServer_Stub_Enabled = this.props.statistic && this.props.statistic.statistics && this.props.statistic.statistics.email_server && this.props.statistic.statistics.email_server.stubEnabled ? this.props.statistic.statistics.email_server.stubEnabled : undefined

    let total_message_size = this.props.statistic && this.props.statistic.statistics && this.props.statistic.statistics.total_Message && this.props.statistic.statistics.total_Message.total_message_size
    return (
      <div /*style={{ ...style.padding10 }}*/>
        <Row gutter={16}>
          <Col span={24}>
            <Card >

              <div>
                <Title level={3}>{formatMessage(messages["Statistics Summary"])}</Title>
              </div>
              <Skeleton loading={!this.props.statistic} active={!this.props.statistic} >

                <div style={{ ...style.controlCenter.statistic.contentMainDiv }}>
                  <Row gutter={16}>
                    <Col span={8} >
                      <Card bordered={false}>
                        <Statistic title={formatMessage(messages["Email Server (Enabled/Stub-Enabled) :"])} value={`${emailServer_Enabled + " / "} ${emailServer_Stub_Enabled} `} />
                      </Card>
                    </Col>

                    <Col span={9} style={{ ...style.controlCenter.statistic.borderLeft }}>
                      <Card bordered={false}>
                        <Statistic title={formatMessage(messages["Active Directory (Total/Sync-Enabled/Sync-Disabled) :"])} value={`${(archiveDirectoryTotal)} ${(" / " + activeDirectorySync_Enabled)} ${(" / " + activeDirectorySync_Disabled)} `} />
                      </Card>
                    </Col>

                    <Col span={7} style={{ ...style.controlCenter.statistic.borderLeft, ...style.controlCenter.statistic.marginBottom }}>
                      <Card bordered={false}>
                        <Statistic title={formatMessage(messages["No_of_Archive_Stores"])} value={`${(this.props.statistic && this.props.statistic.statistics && this.props.statistic.statistics.number_of_archived_store && this.props.statistic.statistics.number_of_archived_store.total) || "0"}`} />
                      </Card>
                    </Col>
                    
                    <Col span={8} style={{ ...style.controlCenter.statistic.marginBottom }}>
                      <Card bordered={false}>
                        <Statistic title={formatMessage(messages["Last Message Archived at : "])} value={`${(this.props.statistic && this.props.statistic.statistics && this.props.statistic.statistics.last_message_archived_at && this.props.statistic.statistics.last_message_archived_at.date && typeof (this.props.statistic.statistics.last_message_archived_at.date) === "string" && (moment(this.props.statistic.statistics.last_message_archived_at.date).format("DD-MMM-YYYY") === 'Invalid date' ? this.props.statistic.statistics.last_message_archived_at.date : moment(this.props.statistic.statistics.last_message_archived_at.date).format("DD-MMM-YYYY"))) || " -"}`} />
                      </Card>
                    </Col>

                    <Col span={9} style={{ ...style.controlCenter.statistic.borderLeft, ...style.controlCenter.statistic.marginBottom }}>
                      <Card bordered={false}>
                        <Statistic title={formatMessage(messages["Total Messages Archived/Total Message Size(MB) :"])} value={`${(this.props.statistic && this.props.statistic.statistics && this.props.statistic.statistics.total_Message && this.props.statistic.statistics.total_Message.Archived) || "0"}${total_message_size ? " / " + total_message_size : " / 0"} `} />
                      </Card>
                    </Col>

                    <Col span={7} style={{ ...style.controlCenter.statistic.borderLeft, ...style.controlCenter.statistic.marginBottom }}>
                      <Card bordered={false}>
                        <Statistic title={formatMessage(messages["Mailbox Access Count :"])} value={`${(this.props.statistic && this.props.statistic.statistics && this.props.statistic.statistics.mailbox_access_count && this.props.statistic.statistics.mailbox_access_count.total) || "0"}`} />
                      </Card>
                    </Col>

                    <Col span={8} style={{ ...style.controlCenter.statistic.marginBottom }}>
                      <Card bordered={false}>
                        <Statistic title={formatMessage(messages["Total Notifications Configured "])} value={`${(this.props.statistic && this.props.statistic.statistics && this.props.statistic.statistics.total_notifications_configured && this.props.statistic.statistics.total_notifications_configured.total) || "0"}`} />
                      </Card>
                    </Col>

                  </Row>
                </div>
              </Skeleton>
            </Card>
          </Col>
        </Row>
      </div>

    )
  }


}
const mapStateToProps = state => {
  return {
    statistic: state.ControlCenterReducer.statistic
  }
}
const mapDispatchToProps = dispatch => {
  return {
    updateDataTableActions: actions => dispatch(updateDataTableActions(actions)),
    fetchStatistic: noMessage => dispatch(fetchStatistic(noMessage)),
    getStatistic: () => dispatch(getStatistic())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Statistics);