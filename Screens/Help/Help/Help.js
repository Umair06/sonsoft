import React, { Component } from 'react';
import ControlCenterHelp from './SettingHelp/ControlCenter/ControlCenter';
import MainControlCenterHelp from './ControlCenterHelp/ControlCenterHelp';
import MyArchivedEmailHelp from './MyArchivedEmailHelp/MyArchivedEmailHelp';
import SearchArchiveHelp from './SearchArchiveHelp/SearchArchiveHelp';
import LegalHoldHelp from './LegalHoldHelp/LegalHoldHelp';
import ExportsHelp from './ExportsHelp/ExportsHelp';
import PoliciesHelp from './PoliciesHelp/PoliciesHelp';
import Security from './SettingHelp/Security/Security';
// import Scheduler from './ControlCenterHelp/Scheduler';
import Notification from './SettingHelp/Notification/Notification';
// import TaskLog from './ControlCenterHelp/TaskLog';
// import Statistics from './ControlCenterHelp/Statistics';
// import Tasks from './ExportsHelp/Tasks';
import HelpTemplate from '../../../Container/HelpTemplate/HelpTemplate';
import { defineMessages } from 'react-intl';
import { connect } from 'react-redux';
import { updateDataTableActions } from '../../../Redux/Actions/pageHeader/pageHeader';
import Configuration from './SettingHelp/Configuration/Configuration';
// import RedactionList from './ExportsHelp/RedactionList';
// import ExclusionList from './ExportsHelp/ExclusionList';

// import version from "../../../APIConfig/Config"

const messages = defineMessages({
  Home: {
    id: 'Help_Template.Home',
    defaultMessage: 'Home'
  },
  Help: {
    id: 'Help_Template.Help',
    defaultMessage: 'Help'
  },
  'Control Center': {
    id: 'Help_Template.ControlCenterHelp',
    defaultMessage: 'Control Center'
  },
  'My Archived Email': {
    id: 'Help_Template.MyArchivedEmailHelp',
    defaultMessage: 'My Archived Email'
  },
  'Search Archive': {
    id: 'Help_Template.SearchArchiveHelp',
    defaultMessage: 'Search Archive'
  },
  'Legal Hold': {
    id: 'Help_Template.LegalHoldHelp',
    defaultMessage: 'Legal Hold'
  },
  Exports: {
    id: 'Help_Template.ExportsHelp',
    defaultMessage: 'Exports'
  },
  Policies: {
    id: 'Help_Template.PoliciesHelp',
    defaultMessage: 'Policies'
  },
  Scheduler: {
    id: 'Help_Template.SchedulerHelp',
    defaultMessage: 'Scheduler'
  },
  Statistics: {
    id: 'Help_Template.StatisticsHelp',
    defaultMessage: 'Statistics'
  },
  Schedular: {
    id: 'Help_Template.SchedularHelp',
    defaultMessage: 'Schedular'
  },
  'System Task': {
    id: 'Help_Template.SystemTaskHelp',
    defaultMessage: 'System Task'
  },
  'User Task': {
    id: 'Help_Template.UserTaskHelp',
    defaultMessage: 'User Task'
  },
  TaskLog: {
    id: 'Help_Template.TaskLogHelp',
    defaultMessage: 'TaskLog'
  },
  Exports_Help: {
    id: 'Help_Template.ExportsHelp',
    defaultMessage: 'Exports'
  },
  'Redaction List': {
    id: 'Help_Template.RedactionListHelp',
    defaultMessage: 'Redaction List'
  },
  'Exclusion List': {
    id: 'Help_Template.ExclusionListHelp',
    defaultMessage: 'Exclusion List'
  },
  Setting: {
    id: 'Help_Template.SettingHelp',
    defaultMessage: 'Setting'
  },
  Control_Center_Help: {
    id: 'Help_Template.Control_Center_Help',
    defaultMessage: 'Control Center'
  },
  Status: {
    id: 'Help_Template.StatusHelp',
    defaultMessage: 'Status'
  },
  License: {
    id: 'Help_Template.LicenseHelp',
    defaultMessage: 'License'
  },
  'Activate Product': {
    id: 'Help_Template.ActivateProductHelp',
    defaultMessage: 'Activate Product'
  },
  Configuration: {
    id: 'Help_Template.ConfigurationHelp',
    defaultMessage: 'Configuration'
  },
  Configuration_Help: {
    id: 'Help_Template.Configuration_Help',
    defaultMessage: 'Configuration_Help'
  },
  General: {
    id: 'Help_Template.GeneralHelp',
    defaultMessage: 'General'
  },
  Deployment: {
    id: 'Help_Template.DeploymentHelp',
    defaultMessage: 'Deployment'
  },
  'Active Directory': {
    id: 'Help_Template.ActiveDirectoryHelp',
    defaultMessage: 'Active Directory'
  },
  'Email Server': {
    id: 'Help_Template.EmailServerHelp',
    defaultMessage: 'Email Server'
  },
  'Historic Domain': {
    id: 'Help_Template.HistoricDomainHelp',
    defaultMessage: 'Historic Domain'
  },
  Security: {
    id: 'Help_Template.SecurityHelp',
    defaultMessage: 'Security'
  },
  SSO: {
    id: 'Help_Template.SSOHelp',
    defaultMessage: 'SSO'
  },
  'Mailbox Access': {
    id: 'Help_Template.MailboxAccessHelp',
    defaultMessage: 'Mailbox Access'
  },
  'Role Management': {
    id: 'Help_Template.RoleManagementHelp',
    defaultMessage: 'Role Management'
  },
  'User Management': {
    id: 'Help_Template.UserManagementHelp',
    defaultMessage: 'User Management'
  },
  Notification: {
    id: 'Help_Template.NotificationHelp',
    defaultMessage: 'Notification'
  },
  'SMTP Settings': {
    id: 'Help_Template.SMTPSettingsHelp',
    defaultMessage: 'SMTP Settings'
  },
  Notification_Help: {
    id: 'Help_Template.Notification_Help',
    defaultMessage: 'Notification'
  },
  'Archival Policy': {
    id: 'Help_Template.ArchivalPolicyHelp',
    defaultMessage: 'Archival Policy'
  },
  'Stub Policy': {
    id: 'Help_Template.StubPolicyHelp',
    defaultMessage: 'Stub Policy'
  },
  'Folder Sync Policy': {
    id: 'Help_Template.FolderSyncPolicyHelp',
    defaultMessage: 'Folder Sync Policy'
  },
  'Retention Policy': {
    id: 'Help_Template.RetentionPolicyHelp',
    defaultMessage: 'Retention Policy'
  },
  'Auto Label': {
    id: 'Help_Template.AutoLabelHelp',
    defaultMessage: 'Auto Label'
  }
});

class Help extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aboutUsDrawer: false
    };
  }

  
  componentDidMount() {
    this.props.updateDataTableActions({}); 
  } 

  render() {
    const { formatMessage } = this.props;

    const routes = [
      {
        path: '/homescreen',
        exact: true,
        breadCrums: formatMessage(messages['Home']),
        redirect: '/homescreen'
      },
      {
        path: '/help',
        exact: true,
        breadCrums: formatMessage(messages['Help']),
        redirect: '/help/controlcenter',
      },
      {
        path: '/help/controlcenter',
        breadCrums: 'CONTROL CENTER',
        iconName: 'ControlCenter_Blue',
        redirect: '/help/controlcenter',
        main: () => <MainControlCenterHelp />

        // children: [
        //   {
        //     path: '/help/controlcenter/statistic',
        //     breadCrums: formatMessage(messages['Statistics']),
        //     iconName: 'Email Statistics_Blue',
        //     redirect: '/help/controlcenter/statistic',
        //     main: () => <Statistics />
        //   },
        //   {
        //     path: '/help/controlcenter/scheduler',
        //     breadCrums: 'Scheduler',
        //     iconName: 'Scheduler_Blue',
        //     redirect: '/help/controlcenter/scheduler',
        //     main: () => <Scheduler />
        //   },
        //   {
        //     path: '/help/controlcenter/tasklog',
        //     breadCrums: formatMessage(messages['TaskLog']),
        //     iconName: 'Task Log',
        //     redirect: '/help/controlcenter/tasklog',
        //     main: () => <TaskLog />
        //   }
        // ]
      },
      {
        path: '/help/myarchivedemail',
        breadCrums: 'MY ARCHIVED EMAIL',
        iconName: 'MyArchivedEmails_Bule',
        redirect: '/help/myarchivedemail',
        main: () => (
          <MyArchivedEmailHelp formatMessage={this.props.formatMessage} />
        )
      },
      {
        path: '/help/searcharchive',
        breadCrums: 'SEARCH ARCHIVE',
        iconName: 'Search Archive_Blue',
        redirect: '/help/searcharchive',
        main: () => (
          <SearchArchiveHelp formatMessage={this.props.formatMessage} />
        )
      },
      {
        path: '/help/legalhold',
        breadCrums: 'LEGAL HOLD',
        iconName: 'LegalHolds_Blue',
        redirect: '/help/legalhold',
        main: () => <LegalHoldHelp formatMessage={this.props.formatMessage} />
      },

      {
        path: '/help/exports',
        breadCrums: 'EXPORTS',
        exact: true,
        iconName: 'Exports_Blue',
        redirect: '/help/exports',
        main: () => <ExportsHelp formatMessage={this.props.formatMessage} />,
        // children: [
        //   {
        //     path: '/help/exports/tasks',
        //     breadCrums: formatMessage(messages['Exports_Help']),
        //     iconName: 'Exports_Blue',
        //     redirect: '/help/exports/tasks',
        //     main: () => <ExportsHelp formatMessage={this.props.formatMessage} />
        //   },

        //   // {
        //   //   path: '/help/exports/redactionlist',
        //   //   breadCrums: formatMessage(messages['Redaction List']),
        //   //   iconName: 'Task Log',
        //   //   redirect: '/help/exports/redactionlist',
        //   //   main: () => <RedactionList />
        //   // },
        //   // {
        //   //   path: '/help/exports/exclusionlist',
        //   //   breadCrums: formatMessage(messages['Exclusion List']),
        //   //   iconName: 'Task Log',
        //   //   redirect: '/help/exports/exclusionlist',
        //   //   main: () => <ExclusionList />
        //   // }

        // ]
      },

      {
        path: '/help/policies',
        breadCrums: formatMessage(messages['Policies']),
        iconName: 'Policies_Blue',
        redirect: '/help/policies',
        main: () => <PoliciesHelp />
      }
      ,
      {
        path: '/help/setting',
        exact: true,
        iconName: 'Settings_Blue',
        breadCrums: 'SETTINGS',
        redirect: '/help/setting/controlcenter',
        children: [
          {
            path: '/help/setting/controlcenter',
            breadCrums: formatMessage(messages['Control_Center_Help']),
            iconName: 'ControlCenter_Blue',
            redirect: '/help/setting/controlcenter',
            main: () => <ControlCenterHelp />
          },
          {
            path: '/help/setting/configuration',
            breadCrums: formatMessage(messages['Configuration']),
            iconName: 'Configuration_Blue',
            redirect: '/help/setting/configuration',
            main: () => <Configuration />
          },
          {
            path: '/help/setting/security',
            breadCrums: formatMessage(messages['Security']),
            iconName: 'Security_Blue',
            redirect: '/help/setting/security',
            main: () => <Security />
          },
          {
            path: '/help/setting/notification',
            breadCrums: formatMessage(messages['Notification']),
            iconName: 'Notification_Blue',
            redirect: '/help/setting/notification',
            main: () => <Notification />
          }
        ]
      }
    ];

    return (
      <div>
        <HelpTemplate
          imageFlag={true}
          formatMessage={formatMessage}
          openKeys={['2']}
          helpScreen
          historyProp={this.props.history}
          routes={routes}
          iconName='Help_Blue'
          heading={formatMessage(messages['Help'])}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateDataTableActions: actions => dispatch(updateDataTableActions(actions))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Help);
