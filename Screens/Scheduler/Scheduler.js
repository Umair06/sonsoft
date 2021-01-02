import React, { Component } from 'react';
import Template from "../../Container/Template/Template";
// import Statistic from "./Statistic/Statistic";
// import TaskLog from "./TaskLog/TaskLog";
import SystemTask from "./SystemTask/SystemTask";
import UserTask from "./UserTask/UserTask";
// import { version } from "../../APIConfig/Config";
import { message } from 'antd';
import { connect } from "react-redux";


class Scheduler extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openKeys: window.location.pathname === "/scheduler/systemtasks" || window.location.pathname === "/scheduler/usertasks" ? ["3"] : []
    }
    message.destroy()
  }
  uid = this.props.authenticUserInfo && this.props.authenticUserInfo.data && this.props.authenticUserInfo.data.data && this.props.authenticUserInfo.data.data.output && Array.isArray(this.props.authenticUserInfo.data.data.output) && this.props.authenticUserInfo.data.data.output[0] && this.props.authenticUserInfo.data.data.output[0].uid
  routes = [
    {
      path: `/homescreen`,
      exact: true,
      breadCrums: "Home",
      redirect: `/homescreen`,
    },
    {
      path: `/scheduler`,
      breadCrums: "Scheduler",
      // iconName: "Scheduler_Blue",
      redirect: `/scheduler/systemtasks`,
      // main: () => <Scheduler formatMessage={this.props.formatMessage} />,
    },
    {
      path: `/scheduler/systemtasks`,
      breadCrums: 'System Tasks',
      iconName: "SystemTask_Blue",
      redirect: `/scheduler/systemtasks`,
      main: () => <SystemTask formatMessage={this.props.formatMessage} />,
      actionRow: false
    },
    {
      path: `/scheduler/usertasks`,
      breadCrums: 'User Tasks',
      iconName: "UserTask_Blue",
      redirect: `/scheduler/usertasks`,

      main: () => <UserTask formatMessage={this.props.formatMessage} />,
      actionRow: false
    }
  ];

  navigateToHomeScreen = () => {
    this.props.history.push(`/homescreen`)
  }

  render() {
    const { formatMessage } = this.props;
    return (
      <Template formatMessage={formatMessage} historyProp={this.props.history} navigateToHomeScreen={() => this.navigateToHomeScreen()} routes={this.routes} openKeys={this.state.openKeys} iconName="Configuration Management_Blue" title="Scheduler" imageFlag={true} />
    )
  }
};

const mapStateToProps = state => {
  return {
    authenticUserInfo: state.LoginReducer.authenticUserInfo
  };
};
export default connect(mapStateToProps)(Scheduler);
