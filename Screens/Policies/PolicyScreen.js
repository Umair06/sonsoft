import React, { Component } from 'react'
// import messages from '../Setting/Setting'
import Retention from './Retention/Retention'
import Stub from './Stub/Stub'
import Archival from './ArchivalPolicy/ArchivalPolicy'
import Folder from './FolderSync/FolderSync'
import AutoLabel from './AutoLabeling/AutoLabeling'
// import { version } from "../../APIConfig/Config";
import Template from '../../Container/Template/Template'
import { defineMessages } from 'react-intl';
// import Policies from './Policies'
import { connect } from "react-redux";




const messages = defineMessages({
  'Home': {
    id: "Setting_Routes_breadcrumbs.Home",
    defaultMessage: "Home",
  },
  'Setting': {
    id: "Setting_Routes_breadcrumbs.Setting",
    defaultMessage: "Setting"
  },
  'Control Center': {
    id: "Setting_Routes_breadcrumbs.ControlCenter",
    defaultMessage: "CONTROL CENTER"
  },
  'Status': {
    id: "Setting_Routes_breadcrumbs.Status",
    defaultMessage: "Status"
  },
  'License': {
    id: "Setting_Routes_breadcrumbs.License",
    defaultMessage: "License"
  },
  'Activate Product': {
    id: "Setting_Routes_breadcrumbs.Activate Product",
    defaultMessage: "Activate Product"
  },
  'Configuration_SubMenu': {
    id: "Setting_Routes_breadcrumbs.Configuration_ControlCenter",
    defaultMessage: "Configuration",
  },
  'Configuration': {
    id: "Setting_Routes_breadcrumbs.Configuration_Setting",
    defaultMessage: "CONFIGURATION"
  },
  'General': {
    id: "Setting_Routes_breadcrumbs.General",
    defaultMessage: "General"
  },
  'Deployment': {
    id: "Setting_Routes_breadcrumbs.Deployment",
    defaultMessage: "Deployment"
  },
  'Active Directory': {
    id: "Setting_Routes_breadcrumbs.ActiveDirectory",
    defaultMessage: "Active Directory"
  },
  'Email Server': {
    id: "Setting_Routes_breadcrumbs.EmailServer",
    defaultMessage: "Email Server",
  },
  'Historic Domain': {
    id: "Setting_Routes_breadcrumbs.HistoricDomain",
    defaultMessage: "Historic Domain"
  },
  'Security': {
    id: "Setting_Routes_breadcrumbs.Security",
    defaultMessage: "SECURITY"
  },
  'SSO': {
    id: "Setting_Routes_breadcrumbs.SSO",
    defaultMessage: "SSO"
  },
  'Mailbox Access': {
    id: "Setting_Routes_breadcrumbs.MailboxAccess",
    defaultMessage: "Mailbox Access"
  },
  'Role Management': {
    id: "Setting_Routes_breadcrumbs.RoleManagement",
    defaultMessage: "Role Management"
  },
  'User Management': {
    id: "Setting_Routes_breadcrumbs.UserManagement",
    defaultMessage: "User Management",
  },
  'NotificationCaps': {
    id: "Setting_Routes_breadcrumbs.NotificationCaps",
    defaultMessage: "NOTIFICATION"
  },
  'SMTP Settings': {
    id: "Setting_Routes_breadcrumbs.SMTPSettings",
    defaultMessage: "SMTP Settings"
  },
  'Notification': {
    id: "Setting_Routes_breadcrumbs.Notification",
    defaultMessage: "Notification"
  },
  'Policies': {
    id: "Setting_Routes_breadcrumbs.Policies",
    defaultMessage: "POLICIES"
  },
  'Archival Policy': {
    id: "Setting_Routes_breadcrumbs.ArchivalPolicy",
    defaultMessage: "Archival Policy"
  },
  'Stub Policy': {
    id: "Setting_Routes_breadcrumbs.StubPolicy",
    defaultMessage: "Stub Policy",
  },
  'Folder Sync Policy': {
    id: "Setting_Routes_breadcrumbs.FolderSyncPolicy",
    defaultMessage: "Folder Sync Policy"
  },
  'Retention Policy': {
    id: "Setting_Routes_breadcrumbs.RetentionPolicy",
    defaultMessage: "Retention Policy"
  },
  'Auto Label': {
    id: "Setting_Routes_breadcrumbs.AutoLabel",
    defaultMessage: "Auto Label"
  },
})

class PolicyScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      actions: {},
      openKeys: window.location.pathname === "/policies/archival" ? ["6"] : ["2"]
    }
  }

  uid = this.props.authenticUserInfo && this.props.authenticUserInfo.data && this.props.authenticUserInfo.data.data && this.props.authenticUserInfo.data.data.output && Array.isArray(this.props.authenticUserInfo.data.data.output) && this.props.authenticUserInfo.data.data.output[0] && this.props.authenticUserInfo.data.data.output[0].uid
  render() {
    const { formatMessage } = this.props
    const routes = [
      // {
      //   path: "/policyscreen/policies",
      //   breadCrums: formatMessage(messages["Policies"]),
      //   iconName: "Policies_Blue",
      //   redirect: '/policyscreen/policies/archival',
      //   main: () => <Policies formatMessage={this.props.formatMessage} />,
      //   children: version > 7.1 ? [
      // {
      {
        path: `/homescreen`,
        exact: true,
        redirect: `/homescreen`,
        breadCrums: formatMessage(messages["Home"]),
      },
      {
        path: `/policies`,
        redirect: `/policies/archival`,
        breadCrums: "Policies",

        //component: () => <Status />
      },
      {
        path: `/policies/archival`,
        breadCrums: formatMessage(messages["Archival Policy"]),
        iconName: "Archive_Policy_Blue",
        redirect: `/policies/archival`,
        main: () => <Archival formatMessage={this.props.formatMessage} />,
        actionRow: true
      },
      {
        path: `/policies/stub`,
        breadCrums: formatMessage(messages["Stub Policy"]),
        iconName: "StubPolicy_Blue",
        redirect: `/policies/stub`,
        main: () => <Stub formatMessage={this.props.formatMessage} />,
        actionRow: false
      },
      {
        path: `/policies/folder`,
        breadCrums: formatMessage(messages["Folder Sync Policy"]),
        iconName: "Folder Sync_Blue",
        redirect: `/policies/folder`,
        main: () => <Folder formatMessage={this.props.formatMessage} />,
        actionRow: true
      },
      {
        path: `/policies/retention`,
        breadCrums: formatMessage(messages["Retention Policy"]),
        iconName: "Retention Policy_Blue",
        redirect: `/policies/retention`,
        main: () => <Retention formatMessage={this.props.formatMessage} />,
        actionRow: true
      },
      {
        path: `/policies/autolabel`,
        breadCrums: formatMessage(messages["Auto Label"]),
        iconName: "Labelling_Blue",
        redirect: `/policies/autolabel`,
        main: () => <AutoLabel formatMessage={this.props.formatMessage} />
      },
    ]
    // : [
    //   {
    //     path: "/policyscreen/policies",
    //     breadCrums: formatMessage(messages["Policies"]),
    //     iconName: "Policies_Blue",
    //     redirect: '/policyscreen/policies/archival',
    //     main: () => <Archival formatMessage={this.props.formatMessage} />
    //   },
    //   {
    //     path: '/policies/stub',
    //     breadCrums: formatMessage(messages["Stub Policy"]),
    //     iconName: "Stub Policy_Blue",
    //     redirect: '/policies/stub',
    //     main: () => <Stub formatMessage={this.props.formatMessage} />
    //   },
    //   {
    //     path: 'policies/folder',
    //     breadCrums: formatMessage(messages["Folder Sync Policy"]),
    //     iconName: "Folder Sync_Blue",
    //     redirect: '/policies/folder',
    //     main: () => <Folder formatMessage={this.props.formatMessage} />
    //   },
    //   {
    //     path: '/policies/retention',
    //     breadCrums: formatMessage(messages["Retention Policy"]),
    //     iconName: "Retention Policy_Blue",
    //     redirect: '/policies/retention',
    //     main: () => <Retention formatMessage={this.props.formatMessage} />
    //   }
    // ]
    // }
    // ]

    return (
      <div>
        <Template
          formatMessage={formatMessage}
          historyProp={this.props.history}
          imageFlag={true}
          MoveToTemplate={(cardTitle, children) =>
            this.props.moveToTemplate(this.props.history, cardTitle, children)}
          routes={routes}
          openKeys={['2']}
          iconName="Configuration Management_Blue" heading="Policy" />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    authenticUserInfo: state.LoginReducer.authenticUserInfo,
    // updatedRowActions: state.pageHeaderReducer.updatedRowActions,

  };
};
export default connect(mapStateToProps)(PolicyScreen);