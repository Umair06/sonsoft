import Statistic from "./Statistic/Statistic";
// import Scheduler from "./Scheduler/Scheduler";
import React from 'react'
// import SystemTask from "./Scheduler/SystemTask/SystemTask";
// import UserTask from "./Scheduler/UserTask/UserTask";
import TaskLog from "./TaskLog/TaskLog";
import { version } from "../../APIConfig/Config";


export const routes = [
  {
    path: '/homescreen',
    exact: true,
    breadCrums: "Home",
    redirect: '/homescreen',
  },
  {
    path: '/controlcenter',
    exact: true,
    breadCrums: "Control Center",
    redirect: '/controlcenter'
  },
  {
    path: "/controlcenter/statistic",
    breadCrums: "Statistics",
    iconName: "Email Statistics_Blue",
    redirect: "/controlcenter/statistic",

    main: () => <Statistic />
  },
  // {
  //   path: "/controlcenter/scheduler",
  //   breadCrums: "schedular",
  //   iconName: "Scheduler_Blue",
  //   main: () => <Scheduler />,
  //   children: [
  //     {
  //       path: '/controlcenter/scheduler/systemtasks',
  //       breadCrums: 'System Tasks',
  //       iconName: "SystemTask_Blue",
  //       main: () => <SystemTask formatMessage={this.props.formatMessage} />
  //     },
  //     {
  //       path: '/controlcenter/scheduler/usertasks',
  //       breadCrums: 'User Tasks',
  //       iconName: "UserTask_Blue",
  //       main: () => <UserTask formatMessage={this.props.formatMessage} />
  //     },
  //   ],
  // },
  version > 7.2 && {
    path: "/controlcenter/tasklog",
    breadCrums: "TaskLog",
    iconName: "Task Log",
    redirect: "/controlcenter/tasklog",

    main: () => <TaskLog formatMessage={this.props.formatMessage} />
  },
];