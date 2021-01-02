import React, { Component } from 'react';
import Template from "../../Container/Template/Template";
// import Scheduler from "./Scheduler/Scheduler";
import Statistic from "./Statistic/Statistic";
import TaskLog from "./TaskLog/TaskLog";
// import SystemTask from "./Scheduler/SystemTask/SystemTask";
// import UserTask from "./Scheduler/UserTask/UserTask";
import { version } from "../../APIConfig/Config";
import { message } from 'antd';
import { connect } from "react-redux";


class ControlCenter extends Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   openKeys: window.location.pathname === "/controlcenter/scheduler/systemtasks" || window.location.pathname === "/controlcenter/scheduler/usertasks" ? ["3"] : []
    // }
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
      path: `/controlcenter`,
      exact: false,
      breadCrums: "Control Center",
      redirect: `/controlcenter/statistic`,
      // main: () => <Statistic formatMessage={this.props.formatMessage} />
    },

    {
      path: `/controlcenter/statistic`,
      breadCrums: "Statistics",
      iconName: "Email Statistics_Blue",
      redirect: `/controlcenter/statistic`,

      main: () => <Statistic formatMessage={this.props.formatMessage} />,
      actionRow: true
    },

    // {
    //   path: `/controlcenter/scheduler`,
    //   breadCrums: "Schedular",
    //   iconName: "Scheduler_Blue",
    //   redirect: `/controlcenter/scheduler/systemtasks`,

    //   main: () => <Scheduler formatMessage={this.props.formatMessage} />,
      
    //   children: [

    //     {
    //       path: `/controlcenter/scheduler/systemtasks`,
    //       breadCrums: 'System Tasks',
    //       iconName: "SystemTask_Blue",
    //       redirect: `/controlcenter/scheduler/systemtasks`,
    //       main: () => <SystemTask formatMessage={this.props.formatMessage} />,
    //       actionRow: false
    //     },

    //     {
    //       path: `/controlcenter/scheduler/usertasks`,
    //       breadCrums: 'User Tasks',
    //       iconName: "UserTask_Blue",
    //       redirect: `/controlcenter/scheduler/usertasks`,

    //       main: () => <UserTask formatMessage={this.props.formatMessage} />,
    //       actionRow: false
    //     },

    //   ],
    // },
    version > 7.2 && {
      path: `/controlcenter/tasklog`,
      breadCrums: "TaskLog",
      iconName: "TaskLog_Blue",
      redirect: `/controlcenter/tasklog`,

      main: () => <TaskLog formatMessage={this.props.formatMessage} />,
      actionRow: false
    },
  ];

  navigateToHomeScreen = () => {
    this.props.history.push(`/homescreen`)
  }

  render() {
    const { formatMessage } = this.props;
    return (
      <Template formatMessage={formatMessage} historyProp={this.props.history} navigateToHomeScreen={() => this.navigateToHomeScreen()} routes={this.routes} /*openKeys={this.state.openKeys}*/ iconName="Configuration Management_Blue" title="Control Center" imageFlag={true} />
    )
  }
};

const mapStateToProps = state => {
  return {
    authenticUserInfo: state.LoginReducer.authenticUserInfo
  };
};
export default connect(mapStateToProps)(ControlCenter);
