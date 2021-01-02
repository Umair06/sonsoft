import React, { Component } from 'react';
import SMTP from "./SMTP/SMTP"
import Notifications from "./Notification/Notification";
import NotificationSideDrawer from "../../../Components/Modal/Notification";
import { connect } from "react-redux";
import { updateDataTableActions } from "../../../Redux/Actions/pageHeader/pageHeader";
import { fetchNotification } from "../../../Redux/Actions/NotificationAction/NotificationAction"
import { Tabs, message } from 'antd';
import style from '../../styles'
import { defineMessages } from 'react-intl';

const messages = defineMessages({
  'SMTP': {
    id: "Notification_Setting.SMTP",
    defaultMessage: "SMTP",
  },
  'Notifications': {
    id: "Notification_Setting.Notifications",
    defaultMessage: "Notifications"
  },
})

const { TabPane } = Tabs;

class Notification extends Component {
  constructor(props) {
    super(props)
    this.state = {
      notification: false
    }
    message.destroy()
  }

  // callback = key => {
  //   if (key === 5) {
  //     this.props.updateDataTableActions({ add: true, addForm: () => this.openHistoricDomainForm(), enableDelete: true, fullScreen: true })
  //   }
  //   else {
  //     this.props.updateDataTableActions({ save: true, refresh: true, add: true, addForm: () => this.openNotificationForm(), enable: true, disable: true, deleteEnable: true, fullScreen: true })
  //   }
  // }
  openNotificationForm = () => {
    this.setState({
      notification: true
    })
  }
  onClose = () => {
    this.setState({
      notification: false
    })
  }
  componentDidMount() {
    this.props.fetchNotification()
  }

  render() {
    const { formatMessage } = this.props;
    return (
      <div>

        <Tabs defaultActiveKey="1" onChange={this.callback}>
          <TabPane tab={formatMessage(messages["SMTP"])} key="1">
            <SMTP />
          </TabPane>
          <TabPane tab={formatMessage(messages["Notification"])} key="2">
            <Notifications notificationlist={this.props.notificationlist} />
          </TabPane>

        </Tabs>
      </div>
    )
  }
};
const mapStateToProps = state => {
  return {
    notificationdropdownlist: state.NotificationReducer.notificationdropdownlist,
    selectednotification: state.NotificationReducer.selectednotification,
    notificationlist: state.NotificationReducer.notificationlist
  }
};

const mapDispatchToProps = dispatch => {
  return {
    updateDataTableActions: actions => dispatch(updateDataTableActions(actions)),
    fetchNotification: () => dispatch(fetchNotification()),
    // fetchNotificationDropDownList: () => dispatch(fetchNotificationDropDownList()),
    // fetchSelectedNotification : () => dispatch(fetchSelectedNotification())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Notification);
