import React, { Component } from 'react';
import { connect } from 'react-redux'
import Template from "../../Container/Template/Template";
// import Configuration from "./Configuration/Configuration";
// import ControlCenter from "./ControlCenter/ControlCenter";
// import Notification from "./Notification/Notification";
import Security from "./Security/Security";
// import Policies from "./../Policies/Policies";
import License from "./ControlCenter/License/License";
import Status from "./ControlCenter/Status/Status";
import ActivateProduct from "./ControlCenter/ActivateProduct/ActivateProduct";
import ControlCenterConfiguration from "./ControlCenter/Configuration/Configuration";
import Deployment from "./Configuration/Deployment/Deployment";
import ActiveDirectory from "./Configuration/ActiveDirectory/ActiveDirectory";
import EmailServer from "./Configuration/EmailServer/EmailServer";
// import ArchiveStore from "./Configuration/ArchiveStore/ArchiveStore";
import HistoricDomain from "./Configuration/HistoryDomain/HistoryDomain";
import SSO from "./Security/SSO/SSO";
import MailBoxAccess from "./Security/MailBoxAccess/MailBoxAccess";
import RoleManagement from "./Security/RoleManagement/RoleManagement";
import UserManagement from "./Security/UserManagement/UserManagement";
import Smtp from "./Notification/SMTP/SMTP";
import Notification from "./Notification/Notification/Notification";
// import Stub from "./../Policies/Stub/Stub";
// import Archival from "./../Policies/ArchivalPolicy/ArchivalPolicy";
// import Folder from "./../Policies/FolderSync/FolderSync";
// import Retention from "./../Policies/Retention/Retention";
// import AutoLabel from "./../Policies/AutoLabeling/AutoLabeling";
import General from "./Configuration/General/General";
import AboutUsDrawer from "../../Components/Modal/AboutUsDrawer"
import HelpDrawer from "../../Components/Modal/HelpSideDrawer"
import ChangePasswordDrawer from "../../Components/Modal/ChangePasswordDrawer"
import ProfileDrawer from "../../Components/Modal/ProfileDrawer";
//import NoMenuSelected from "./NoMenuSelected";
import { version } from "../../APIConfig/Config";
import { defineMessages } from 'react-intl';

export const messages = defineMessages({
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

class Setting extends Component {
  constructor(props) {
    super(props)
    this.state = {
      actions: {},
      openKeys: window.location.pathname === "/setting/policies/archival" ? ["6"] : ["2"],
      addedActionRow:false
    }
  }
  uid = this.props.authenticUserInfo && this.props.authenticUserInfo.data && this.props.authenticUserInfo.data.data && this.props.authenticUserInfo.data.data.output && Array.isArray(this.props.authenticUserInfo.data.data.output) && this.props.authenticUserInfo.data.data.output[0] && this.props.authenticUserInfo.data.data.output[0].uid
 
  render() {
    const { aboutUsDrawer, changePassDrawer, helpDrawer, profileDrawer, openKeys } = this.state
    const { formatMessage } = this.props
    const routes = [
      {
        path: `/homescreen`,
        exact: true,
        redirect: `/homescreen`,
        breadCrums: formatMessage(messages["Home"]),
      },
      {
        path: `/setting`,
        exact: false,
        breadCrums: "Setting",
        redirect: `/setting/controlcenter/status`
        //component: () => <Status />
      },
      {
        path: `/setting/controlcenter`,
        breadCrums: formatMessage(messages["Control Center"]),
        iconName: "ControlCenter_Blue",
        redirect: `/setting/controlcenter/status`,
        // main: () => <ControlCenter formatMessage={this.props.formatMessage}/>,
        children: version > 7.1 ? [
          {
            path: `/setting/controlcenter/status`,
            iconName: "Status_Blue",
            breadCrums: formatMessage(messages["Status"]),
            redirect: `/setting/controlcenter/status`,
            main: () => <Status formatMessage={this.props.formatMessage} />,
            actionRow: true
          },

          {
            path: `/setting/controlcenter/license`,
            breadCrums: formatMessage(messages["License"]),
            iconName: "License_Blue",
            redirect: `/setting/controlcenter/license`,
            main: () => <License formatMessage={this.props.formatMessage} />,
            actionRow: true

          },
          {
            path: `/setting/controlcenter/activateproduct`,
            breadCrums: formatMessage(messages["Activate Product"]),
            iconName: "ActivateProduct_Blue",
            redirect: `/setting/controlcenter/activateproduct`,
            main: () => <ActivateProduct formatMessage={this.props.formatMessage} />,
            actionRow: true

          },

          {
            path: `/setting/controlcenter/configuration`,
            breadCrums: formatMessage(messages["Configuration_SubMenu"]),
            iconName: "Configuration_Blue",
            redirect: `/setting/controlcenter/configuration`,
            main: () => <ControlCenterConfiguration formatMessage={this.props.formatMessage} />,
            actionRow: true

          },
        ] :
          [
            {
              path: `/setting/controlcenter/status`,
              iconName: "Status_Blue",
              breadCrums: formatMessage(messages["Status"]),
              redirect: `/setting/controlcenter/status`,
              main: () => <Status formatMessage={this.props.formatMessage} />

            },

            {
              path: `/setting/controlcenter/license`,
              breadCrums: formatMessage(messages["License"]),
              iconName: "License_Blue",
              redirect: `/setting/controlcenter/license`,
              // main: () => <License formatMessage={this.props.formatMessage} />
            },
            {
              path: `/setting/controlcenter/configuration`,
              breadCrums: formatMessage(messages["Configuration_SubMenu"]),
              iconName: "Configuration_Blue",
              redirect: `/setting/controlcenter/configuration`,
              main: () => <ControlCenterConfiguration formatMessage={this.props.formatMessage} />
            },
          ]
      },
      {
        path: `/setting/configuration`,
        breadCrums: formatMessage(messages["Configuration"]),
        iconName: "Configuration_Blue",
        redirect: `/setting/configuration/general`,
        // main: () => <Configuration formatMessage={this.props.formatMessage} />,
        children: [
          {
            path: `/setting/configuration/general`,
            breadCrums: formatMessage(messages["General"]),
            iconName: "General Email Statistics_Blue",
            redirect: `/setting/configuration/general`,
            main: () => <General formatMessage={this.props.formatMessage} />,
            actionRow: true

          },
          {
            path: `/setting/configuration/deployment`,
            breadCrums: formatMessage(messages["Deployment"]),
            iconName: "Deployment Settings_Blue",
            redirect: `/setting/configuration/deployment`,
            main: () => <Deployment formatMessage={this.props.formatMessage} />,
            actionRow: true

          },
          {
            path: `/setting/configuration/activedirectory`,
            breadCrums: formatMessage(messages["Active Directory"]),
            iconName: "ActiveDirectory_Blue",
            redirect: `/setting/configuration/activedirectory`,
            main: () => <ActiveDirectory formatMessage={this.props.formatMessage} />
          },
          {
            path: `/setting/configuration/emailserver`,
            breadCrums: formatMessage(messages["Email Server"]),
            iconName: "Email Archive_Blue7",
            redirect: `/setting/configuration/emailserver`,
            main: () => <EmailServer formatMessage={this.props.formatMessage} />
          },

          {
            path: `/setting/configuration/historicdomain`,
            breadCrums: formatMessage(messages["Historic Domain"]),
            iconName: "Old Domain Settings_Blue",
            redirect: `/setting/configuration/historicdomain`,
            main: () => <HistoricDomain formatMessage={this.props.formatMessage} />
          },
        ],
      },
      {
        path: `/setting/security`,
        breadCrums: formatMessage(messages["Security"]),
        iconName: "Security_Blue",
        redirect: `/setting/security/sso`,
        main: () => <Security formatMessage={this.props.formatMessage} />,
        children: [
          {
            path: `/setting/security/sso`,
            breadCrums: formatMessage(messages["SSO"]),
            iconName: "SSO_Blue",
            redirect: `/setting/security/sso`,
            main: () => <SSO formatMessage={this.props.formatMessage} />,
            actionRow: true

          },
          {
            path: `/setting/security/mailboxaccess`,
            breadCrums: formatMessage(messages["Mailbox Access"]),
            iconName: "Mailbox Access_Blue",
            redirect: `/setting/security/mailboxaccess`,
            main: () => <MailBoxAccess formatMessage={this.props.formatMessage} />,
            actionRow: false
          },
          {
            path: `/setting/security/rolemanagement`,
            breadCrums: formatMessage(messages["Role Management"]),
            iconName: "Role Management_Blue",
            redirect: `/setting/security/rolemanagement`,
            main: () => <RoleManagement formatMessage={this.props.formatMessage} />,
            actionRow: true
          },
          {
            path: `/setting/security/usermanagement`,
            breadCrums: formatMessage(messages["User Management"]),
            iconName: "User Management_Blue35",
            redirect: `/setting/security/usermanagement`,
            main: () => <UserManagement formatMessage={this.props.formatMessage} />,
            actionRow: false

          },
        ],
      },
      {
        path: `/setting/notification`,
        breadCrums: formatMessage(messages["NotificationCaps"]),
        iconName: "Notification_Blue",
        redirect: `/setting/notification/smtp`,
        // main: () => <Notification formatMessage={this.props.formatMessage}/>,
        
        children: [
          {
            path: `/setting/notification/smtp`,
            breadCrums: formatMessage(messages["SMTP Settings"]),
            iconName: "Smtp_Blue",
            redirect: `/setting/notification/smtp`,
            main: () => <Smtp formatMessage={this.props.formatMessage} />,
            actionRow: true
          },
          {
            path: `/setting/notification/notification`,
            breadCrums: formatMessage(messages["Notification"]),
            iconName: "Notification_Blue",
            redirect: `/setting/notification/notification`,
            main: () => <Notification formatMessage={this.props.formatMessage} />,
            
          },
        ],
      },
      // {
      //   path: "/setting/policies",
      //   breadCrums: formatMessage(messages["Policies"]),
      //   iconName: "Policies_Blue",
      //   redirect: '/setting/policies/archival',
      //   //main: () => <Policies formatMessage={this.props.formatMessage} />,
      //   children: version > 7.1 ? [
      //     {
      //       breadCrums: formatMessage(messages["Archival Policy"]),
      //       path: '/setting/policies/archival',
      //       iconName: "Archive_Policy_Blue",
      //       redirect: '/setting/policies/archival',
      //       // main: () => <Archival formatMessage={this.props.formatMessage} />
      //     },
      //     {
      //       path: '/setting/policies/stub',
      //       breadCrums: formatMessage(messages["Stub Policy"]),
      //       iconName: "Stub Policy_Blue",
      //       redirect: '/setting/policies/stub',
      //       main: () => <Stub formatMessage={this.props.formatMessage} />
      //     },
      //     {
      //       path: '/setting/policies/folder',
      //       breadCrums: formatMessage(messages["Folder Sync Policy"]),
      //       iconName: "Folder Sync_Blue",
      //       redirect: '/setting/policies/folder',
      //       main: () => <Folder formatMessage={this.props.formatMessage} />
      //     },
      //     {
      //       path: '/setting/policies/retention',
      //       breadCrums: formatMessage(messages["Retention Policy"]),
      //       iconName: "Retention Policy_Blue",
      //       redirect: '/setting/policies/retention',
      //       main: () => <Retention formatMessage={this.props.formatMessage} />
      //     },
      //     {
      //       path: '/setting/policies/autolabel',
      //       breadCrums: formatMessage(messages["Auto Label"]),
      //       iconName: "Labelling_Blue",
      //       redirect: '/setting/policies/autolabel',
      //       main: () => <AutoLabel formatMessage={this.props.formatMessage} />
      //     },
      //   ]
      //     : [
      //       {
      //         path: '/setting/policies/archival',
      //         breadCrums: formatMessage(messages["Archival Policy"]),
      //         iconName: "Archive_Policy_Blue",
      //         redirect: '/setting/policies/archival',
      //         // main: () => <Archival formatMessage={this.props.formatMessage} />
      //       },
      //       {
      //         path: '/setting/policies/stub',
      //         breadCrums: formatMessage(messages["Stub Policy"]),
      //         iconName: "Stub Policy_Blue",
      //         redirect: '/setting/policies/stub',
      //         main: () => <Stub formatMessage={this.props.formatMessage} />
      //       },
      //       {
      //         path: '/setting/policies/folder',
      //         breadCrums: formatMessage(messages["Folder Sync Policy"]),
      //         iconName: "Folder Sync_Blue",
      //         redirect: '/setting/policies/folder',
      //         main: () => <Folder formatMessage={this.props.formatMessage} />
      //       },
      //       {
      //         path: '/setting/policies/retention',
      //         breadCrums: formatMessage(messages["Retention Policy"]),
      //         iconName: "Retention Policy_Blue",
      //         redirect: '/setting/policies/retention',
      //         main: () => <Retention formatMessage={this.props.formatMessage} />
      //       }
      //     ]
      // }

    ]

    // const routeForPolicyTile = [
    //   {
    //     path: "/setting/policies",
    //     breadCrums: formatMessage(messages["Policies"]),
    //     iconName: "Policies_Blue",
    //     redirect: '/setting/policies/archival',
    //     //main: () => <Policies formatMessage={this.props.formatMessage} />,
    //     children: version > 7.1 ? [
    //       {
    //         breadCrums: formatMessage(messages["Archival Policy"]),
    //         path: '/setting/policies/archival',
    //         iconName: "Archive_Policy_Blue",
    //         redirect: '/setting/policies/archival',
    //         main: () => <Archival formatMessage={this.props.formatMessage} />
    //       },
    //       {
    //         path: '/setting/policies/stub',
    //         breadCrums: formatMessage(messages["Stub Policy"]),
    //         iconName: "Stub Policy_Blue",
    //         redirect: '/setting/policies/stub',
    //         main: () => <Stub formatMessage={this.props.formatMessage} />
    //       },
    //       {
    //         path: '/setting/policies/folder',
    //         breadCrums: formatMessage(messages["Folder Sync Policy"]),
    //         iconName: "Folder Sync_Blue",
    //         redirect: '/setting/policies/folder',
    //         main: () => <Folder formatMessage={this.props.formatMessage} />
    //       },
    //       {
    //         path: '/setting/policies/retention',
    //         breadCrums: formatMessage(messages["Retention Policy"]),
    //         iconName: "Retention Policy_Blue",
    //         redirect: '/setting/policies/retention',
    //         main: () => <Retention formatMessage={this.props.formatMessage} />
    //       },
    //       {
    //         path: '/setting/policies/autolabel',
    //         breadCrums: formatMessage(messages["Auto Label"]),
    //         iconName: "Labelling_Blue",
    //         redirect: '/setting/policies/autolabel',
    //         main: () => <AutoLabel formatMessage={this.props.formatMessage} />
    //       },
    //     ]
    //       : [
    //         {
    //           path: '/setting/policies/archival',
    //           breadCrums: formatMessage(messages["Archival Policy"]),
    //           iconName: "Archive_Policy_Blue",
    //           redirect: '/setting/policies/archival',
    //           main: () => <Archival formatMessage={this.props.formatMessage} />
    //         },
    //         {
    //           path: '/setting/policies/stub',
    //           breadCrums: formatMessage(messages["Stub Policy"]),
    //           iconName: "Stub Policy_Blue",
    //           redirect: '/setting/policies/stub',
    //           main: () => <Stub formatMessage={this.props.formatMessage} />
    //         },
    //         {
    //           path: '/setting/policies/folder',
    //           breadCrums: formatMessage(messages["Folder Sync Policy"]),
    //           iconName: "Folder Sync_Blue",
    //           redirect: '/setting/policies/folder',
    //           main: () => <Folder formatMessage={this.props.formatMessage} />
    //         },
    //         {
    //           path: '/setting/policies/retention',
    //           breadCrums: formatMessage(messages["Retention Policy"]),
    //           iconName: "Retention Policy_Blue",
    //           redirect: '/setting/policies/retention',
    //           main: () => <Retention formatMessage={this.props.formatMessage} />
    //         }
    //       ]
    //   }]
   
    return (
      <div>
        {/* {console.log('this.props', this.props.history.action)} */}
        {aboutUsDrawer &&
          <AboutUsDrawer formatMessage={formatMessage}
            close={() => this.closeAboutUsDrawer()}
          />}

        {changePassDrawer &&
          <ChangePasswordDrawer
            formatMessage={formatMessage}
            close={() => this.closeChangePassDrawer()}
          />}

        {helpDrawer &&
          <HelpDrawer
            formatMessage={formatMessage}
            close={() => this.closeHelpDrawer()}
            openAboutUsDrawer={() => this.openAboutUsDrawer()}
          />}

        {profileDrawer &&
          <ProfileDrawer
            formatMessage={formatMessage}
            close={() => this.closeProfileDrawer()}
            openChangePassDrawer={() => this.openChangePassDrawer()}
          />}

        <Template
          imageFlag={true}
          formatMessage={formatMessage}
          historyProp={this.props.history}
          MoveToTemplate={(cardTitle, children) =>
            this.props.moveToTemplate(this.props.history, cardTitle, children)}
          routes={routes}
          openKeys={openKeys}
          iconName="Configuration Management_Blue" heading="Setting" />
      </div>
    )
  }
};
const mapStateToProps = state => {
  return {
    authenticUserInfo: state.LoginReducer.authenticUserInfo
  };
};

export default connect(mapStateToProps)(Setting);

