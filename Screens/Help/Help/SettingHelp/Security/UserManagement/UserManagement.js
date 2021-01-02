import React from 'react';

import { Typography, /*Tabs,*/  } from 'antd';
//import style from "../../../../../../styles";

import Theme from "../../../../../../Assets/Theme/Theme"





const { Text, Title } = Typography;
//const { TabPane } = Tabs;
const { color } = Theme



function UserManagement() {
    return (
        <div>
        <div style={{ paddingLeft: 40, paddingTop: 3, display: "flex", justifyContent: "center", flexDirection: "column" }}>
            <Title style={{ color: `${color.Orange}`, padding: "15px 0 0 0px", fontSize: 50 }}>{"User Management   (Version 6.5)"}</Title>
            <br />
            <Text type="danger">Insert ScreenShot</Text>
            <br />
            <Text>Users are added to the SonaVault application by integrating the Active Directories associated with the email servers.  However, there might be some situations in which users not available in any Active Directory (AD) need access to the archival system.  For example, external users such as third-party auditors and system reviewers may need to access the system temporarily, or when an AD is inaccessible, users may not be able to log into SonaVault to do any operation including searching for an email. To address such needs, SonaVault provides an option to create users, referred to as Local users, in addition to the AD users.  </Text>
            
            <br />
            <Text>The Email Archival System recognizes the following three types of users: </Text>
            <ul>
                <li>The default system users provided during the installation of the system (e.g. sonasoftarc, the Super user) The system user details cannot be edited.  </li>

                <li>Active Directory users AD users are authenticated at the specified domain.  Role of an AD user can be set or changed by any user with administrative permissions to manage roles.     </li>
                <li>Local users (authenticated locally)A user with administrative permissions to manage users can add a local user.When a local user is added, apart from the username, a mailbox must be specified. SonaVault automatically generates login credentials for the local user and sends an email to the user at the specified mailbox.  If the mailbox is specified incorrectly while adding the user, the user will not be created.The role for a local user can be selected from the list of roles. Any of the existing roles including the system-defined roles can be assigned.  If necessary, a role can be created particularly for the user and the role may be deleted when the user is deleted. Generally, local users are external users and temporary users.   </li>
                
            </ul>
            <br />
            <Text >Local users can change their password after the initial login.  The Change Password <Text type="danger">Insert ScreenShot</Text> icon is available for local users in the home page. </Text>

            <br />
            <Text>
            In the User Management page:  
         </Text>
            <br />
            <Text >
                <ul>
                    <li>To add a user, click  <Text strong>Add</Text>. See <a href="/#">Add User</a>.     </li>
                    <li>To edit a user, click the edit icon <Text type="danger">Insert ScreenShot</Text> next to the username. See <a href="/#">Edit User</a>.   </li>
                   
                </ul>
                <br/>
                <Title  style={{ color: `${color.Blue}`, fontSize: 25 }}>{"User Management Settings (Setting authentication type) "}</Title>
                <br/>
            </Text>
            <br />
            <Text>
            Authentication type can be set only for an AD user.  By default, the authentication type is set as AD and all AD users are authenticated at the AD they belong to.  However, in the deployment scenario, if an AD is inaccessible or unavailable the authentication type setting can be changed to <Text strong>Local</Text>.  In such cases, the AD user is populated offline and then local authentication is used. 
         </Text>
            <br />
         
            <Text strong>
            Notes: <br/>
             System users and local users (external users) are always authenticated locally irrespective of the authentication type set. AD users are authenticated at the AD by default and locally if the Authentication Type is set as Local. <br/>The authentication type should not be changed to Local if the AD is accessible. 

            </Text>
            <br/>
            <Title  style={{ color: `${color.Blue}`, fontSize: 25 }}>{"Searching for a user "}</Title>
            <Text>
            The User Management page displays the entire list of SonaVault users.  Generally, this is a long list and spans across several pages of display. To search for user easily, you can do any of the following: 
                </Text>
                <br/>
                <ul>
                    <li>In the <Text strong>User Name</Text> box, enter the name of the user and click <Text strong>Search</Text>.  You need not enter the complete name; you can enter the first few letters of the name and search.  </li>
                    <li>
                    By default, the user list is shown with the details (columns) of username, display name, and mailbox name.  If you think you can spot the user more easily when you see the user type or role, click on the list icon <Text type="danger">Insert Screenshot</Text> and select the columns you want to see.  
                    </li>
                    <li>
                    Use the page navigation options, <Text strong>Next, Last, Previous</Text> or <Text strong>First</Text>, to move across the pages.
                    </li>
                </ul>
            </div>
                <UserManagementAdd/>
                <UserManagementEdit/>

                </div>
    )

}

export default UserManagement;

function UserManagementAdd() {
    return (
        <div style={{  paddingLeft:40,paddingTop:3,display: "flex", justifyContent: "center", flexDirection: "column" }}>
        <Title style={{ color: `${color.Orange}`, padding: "15px 0 0 0px", fontSize: 50 }}>{"Add User (Version 6.5)"}</Title>
        <br/>
        <Text type="danger">Insert ScreenShot</Text>
        <br/>
         <Text >To add a local user: </Text>
         
         <br />
       
         <ol>
             <li>Select <Text strong>User Management</Text> from the <Text strong>Setup</Text> menu.     </li>
             <li>Click <Text strong>Add</Text>. The Add User page is displayed.      </li>
             <li>By default, a new role is enabled. If you do not want the role to be used immediately, uncheck the <Text strong>Enabled</Text> box.  </li>
             <li>In the <Text strong>User Name</Text> box, enter a name. This name should be used by the user for logging into the application.  </li>
             <li>In the <Text strong>Display Name </Text>box, enter a name. This is the name by which the user will be known to SonaVault and to the other users. Specify a name that makes it easy to recognize the user and the purpose of adding the user.   </li>
             <li>In the <Text strong>Email Address</Text> box, enter a correct email address. Ensure that the email address exists on the specified server and is active. If there is an error in this name, the user will not be created.  </li>
             <li>Select a role for the user. The <Text strong>Role </Text>box lists all the roles currently configured in the system. If you want to assign a role that does not exist in the list, you can add the role using the <Text strong>Role Management</Text> menu before adding the user or select the default role and change the role later using the Edit option.  </li>
             <li>Click <Text strong>Save</Text>.  </li>
            </ol>
            
    
         </div>
    )

}
function UserManagementEdit() {
    return (
        <div style={{  paddingLeft:40,paddingTop:3,display: "flex", justifyContent: "center", flexDirection: "column" }}>
        <Title style={{ color: `${color.Orange}`, padding: "15px 0 0 0px", fontSize: 50 }}>{"Edit User (Version 6.5)"}</Title>
        <br/>
        <Text type="danger">Insert ScreenShot</Text>
        <br/>
        <Title  style={{ color: `${color.Blue}`, fontSize: 25 }}>{"To edit user details   "}</Title>
         
         <br />
       
         <ol>
             <li>In the <Text strong>User Management</Text> page, find the user and click on the edit icon <Text type="danger">Insert ScreenShot</Text> next to the username. The <Text strong>Edit User</Text> page is displayed with the details of username, display name, role, and email address. <br/>If the user is an AD user, the details of email server, storage group, mailbox store and LDAP path are also displayed.  </li>
             <li>Make the necessary changes.<br/>For a local user, you can change any detail. For an AD user, you can change only the role. </li>
             <li>Click <Text strong>Save</Text>.   </li>
           
            </ol>
            <br/>
          <Text strong>
          Note: System users cannot be edited.   </Text>
          <br/>
          <Title  style={{ color: `${color.Blue}`, fontSize: 25 }}>{"To delete a user  "}</Title>
          <br/>
          <ol>
              <li>In the <Text strong>User Management</Text> page, find the user and click on the edit icon <Text type="danger">Insert ScreenShot</Text> next to the user name.</li>
              <li>
              The <Text strong>Edit User</Text> page is displayed with the details of the user.  Ensure that you selected the right user.  
              </li>
              <li>
              Click <Text strong> Delete</Text>.  
              </li>
          </ol>
          <br/>
          <Text strong>
          Note: Only local users can be deleted; AD users and system users cannot be deleted. </Text>
          <br/>
          <Title  style={{ color: `${color.Blue}`, fontSize: 25 }}>{"To reset the password of a user   "}</Title>
          <br/>
          <ol>
              <li>In the <Text strong>User Management</Text> page, find the user and click on the edit icon <Text type="danger">Insert ScreenShot</Text> next to the user name.</li>
              <li>
              The <Text strong>Edit User</Text>page is displayed with the details of the user.  
              </li>
              <li>
              Click  <Text strong>Reset Password </Text>. An email is sent to the specified mailbox with the new password generated by the system.    
              </li>
          </ol>
          <br/>
          <Text strong>
          Note: Password can be reset only for local users.  AD users can reset the password only when their authentication type is set as Local. However, the original or reset local password of an AD user does not affect the password on the AD; the password on AD is not changed because of any change made in the SonaVault application. 
          </Text>
       
    
         </div>
    )

}