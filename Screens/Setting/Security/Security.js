import React, { Component } from 'react';
import SSO from "./SSO/SSO";
import UserManagement from './UserManagement/UserManagement';
import MailBoxAccess from "./MailBoxAccess/MailBoxAccess";
import RoleManagement from "./RoleManagement/RoleManagement";
import MailBoxAccessForm from "../../../Components/Modal/mailBoxAccess"
import RoleManagementForm from "../../../Components/Modal/RoleManagement";
import UserManagementForm from "../../../Components/Modal/UserManagement"
import { connect } from "react-redux";
import { updateDataTableActions } from "../../../Redux/Actions/pageHeader/pageHeader";
import { Tabs } from 'antd';
import { defineMessages } from 'react-intl';

const messages = defineMessages({
	'SSO': {
		id: "Security.SSO",
		defaultMessage: "SSO",
	},
	'Mailbox Access': {
		id: "Security.MailboxAccess",
		defaultMessage: "Mailbox Access"
	},
	'Role Management': {
		id: "Security.RoleManagement",
		defaultMessage: "Role Management"
	},
	'User Management': {
		id: "Security.UserManagement",
		defaultMessage: "User Management"
	},
})

const { TabPane } = Tabs;

class Security extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mailBoxAccess: false,
      roleManagement: false,
      userManagement:false
    }
  }
  callback = key => {
    if (key === 5) {
      this.props.updateDataTableActions({ add: true, addForm: () => this.openHistoricDomainForm(), enableDelete: true, fullScreen: true })
    } else {
      if (key === 1) {
        this.props.updateDataTableActions({})
      } else {
        if (key === 3) {
          this.props.updateDataTableActions({ add: true, addForm: () => this.openRoleManagementForm(), enable: true, disable: true, fullScreen: true })
        } else {
          if (key === 4) {
            this.props.updateDataTableActions({ save: true, refresh: true, add: true, addForm: () => this.openUserManagementForm(), enable: true, disable: true, deleteEnable: true, fullScreen: true })
          } else {
            this.props.updateDataTableActions({ save: true, refresh: true, add: true, addForm: () => this.openMailBoxAccessForm(), enable: true, disable: true, deleteEnable: true, fullScreen: true })
          }
        }
      }
    }
  }
  openUserManagementForm = () =>{
    this.setState({
      userManagement:true
    })
  }
  openMailBoxAccessForm = () => {
    this.setState({
      mailBoxAccess: true
    })
  }
  openRoleManagementForm = () => {
    this.setState({
      roleManagement: true
    })
  }
  onClose = () =>{
    this.setState({
      mailBoxAccess:false,
      roleManagement:false,
      userManagement:false
    })  
  }
  render() {
    const { mailBoxAccess, roleManagement,userManagement, formatMessage } = this.state;
    return (
      <div>
        {mailBoxAccess && (<MailBoxAccessForm formatMessage={formatMessage} close={() => this.onClose()} />)}
        {roleManagement && (<RoleManagementForm formatMessage={formatMessage} close={() => this.onClose()} />)}
        {userManagement && (<UserManagementForm formatMessage={formatMessage} close={() => this.onClose()} />)}

        <Tabs defaultActiveKey="1" onChange={this.callback}>
          <TabPane tab={formatMessage(messages["SSO"])} key="1">
            <SSO formatMessage={formatMessage}/>
          </TabPane>
          <TabPane tab={formatMessage(messages["Mailbox Access"])} key="2">
            <MailBoxAccess formatMessage={formatMessage}/>
          </TabPane>
          <TabPane tab={formatMessage(messages["Role Management"])} key="3">
            <RoleManagement formatMessage={formatMessage}/>
          </TabPane>
          <TabPane tab={formatMessage(messages["User Management"])} key="4">
            <UserManagement formatMessage={formatMessage}/>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateDataTableActions: actions => dispatch(updateDataTableActions(actions)),
  }
}


export default connect(null, mapDispatchToProps)(Security);