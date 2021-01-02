import React, { Component } from 'react'
import { NavLink } from "react-router-dom";
import { Typography } from 'antd';
import settingsecurity1 from "../../../../../Assets/ScreenShots/settingsecurity1.PNG"
import settingsecurity2 from "../../../../../Assets/ScreenShots/settingsecurity2.PNG"
import settingsecurity3 from "../../../../../Assets/ScreenShots/settingsecurity3.PNG"
import settingsecurity4 from "../../../../../Assets/ScreenShots/settingsecurity4.PNG"
import settingsecurity5 from "../../../../../Assets/ScreenShots/settingsecurity5.PNG"
import settingsecurity6 from "../../../../../Assets/ScreenShots/settingsecurity6.PNG"
import settingsecurity7 from "../../../../../Assets/ScreenShots/settingsecurity7.PNG"
import settingsecurity8 from "../../../../../Assets/ScreenShots/settingsecurity8.PNG"
import settingsecurity9 from "../../../../../Assets/ScreenShots/settingsecurity9.PNG"
import settingsecurity10 from "../../../../../Assets/ScreenShots/settingsecurity10.PNG"
import settingsecurity11 from "../../../../../Assets/ScreenShots/settingsecurity11.PNG"
import settingsecurity12 from "../../../../../Assets/ScreenShots/settingsecurity12.PNG"
import settingsecurity13 from "../../../../../Assets/ScreenShots/settingsecurity13.PNG"
import settingsecurity14 from "../../../../../Assets/ScreenShots/settingsecurity14.PNG"
import settingsecurity15 from "../../../../../Assets/ScreenShots/settingsecurity15.PNG"
import settingsecurity16 from "../../../../../Assets/ScreenShots/settingsecurity16.PNG"
import settingsecurity17 from "../../../../../Assets/ScreenShots/settingsecurity17.PNG"
import settingsecurity18 from "../../../../../Assets/ScreenShots/settingsecurity18.PNG"
import settingsecurity19 from "../../../../../Assets/ScreenShots/settingsecurity19.PNG"
import settingsecurity20 from "../../../../../Assets/ScreenShots/settingsecurity20.PNG"
import settingsecurity21 from "../../../../../Assets/ScreenShots/settingsecurity21.PNG"
import settingsecurity22 from "../../../../../Assets/ScreenShots/settingsecurity22.PNG"
import settingsecurity23 from "../../../../../Assets/ScreenShots/settingsecurity23.PNG"
import settingsecurity24 from "../../../../../Assets/ScreenShots/settingsecurity24.PNG"
import settingsecurity25 from "../../../../../Assets/ScreenShots/settingsecurity25.PNG"
import settingsecurity26 from "../../../../../Assets/ScreenShots/settingsecurity26.PNG"
import settingsecurity27 from "../../../../../Assets/ScreenShots/settingsecurity27.PNG"
import settingsecurity28 from "../../../../../Assets/ScreenShots/settingsecurity28.PNG"
import settingsecurity29 from "../../../../../Assets/ScreenShots/settingsecurity29.PNG"
import settingsecurity30 from "../../../../../Assets/ScreenShots/settingsecurity30.PNG"
import settingsecurity31 from "../../../../../Assets/ScreenShots/settingsecurity31.PNG"
import settingsecurity32 from "../../../../../Assets/ScreenShots/settingsecurity32.PNG"
import settingsecurity33 from "../../../../../Assets/ScreenShots/settingsecurity33.PNG"
import settingsecurity34 from "../../../../../Assets/ScreenShots/settingsecurity34.PNG"
import settingsecurity35 from "../../../../../Assets/ScreenShots/settingsecurity35.PNG"
import settingsecurity36 from "../../../../../Assets/ScreenShots/settingsecurity36.PNG"
import settingsecurity37 from "../../../../../Assets/ScreenShots/settingsecurity37.PNG"
import settingsecurity38 from "../../../../../Assets/ScreenShots/settingsecurity38.PNG"
import settingsecurity39 from "../../../../../Assets/ScreenShots/settingsecurity39.PNG"
import settingsecurity40 from "../../../../../Assets/ScreenShots/settingsecurity40.PNG"
import settingsecurity41 from "../../../../../Assets/ScreenShots/settingsecurity41.PNG"

import Theme from "../../../../../Assets/Theme/Theme"
import securityIcon from "../../../../../Assets/icons/SV_ICONS/Security_Blue.png"
import ssoIcon from "../../../../../Assets/icons/SV_ICONS/SSO_Blue.png"
import mailIcon from "../../../../../Assets/icons/SV_ICONS/Mailbox Access_Blue.png"
import editIcon from "../../../../../Assets/icons/SV_ICONS/Edit_Orange.png"
import addIcon from "../../../../../Assets/icons/SV_ICONS/Add_Orange.png"
import columnIcon from "../../../../../Assets/icons/SV_ICONS/Columns_Blue.png"
import roleIcon from "../../../../../Assets/icons/SV_ICONS/Role Management_Blue.png"
import userIcon from "../../../../../Assets/icons/SV_ICONS/User Management_Blue35.png"
import up from "../../../../../Assets/ScreenShots/up.PNG"
import down from "../../../../../Assets/ScreenShots/down.PNG"

const { color } = Theme
const { Text, Title } = Typography;
// const { TabPane } = Tabs;
// const {color} = Theme

class Security extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Edit: false,
            addnew: false,
            notification:true
        }
    }
    // componentDidMount() {
    //     this.callBack('1')
    // }
    
    
    render() {
     
        return (
            <div>
            <div style={{ paddingLeft: 40, paddingTop: 3, display: "flex", justifyContent: "center", flexDirection: "column" }}>
                <Title style={{ color: `${color.Orange}`, padding: "15px 0 0 0px", fontSize: 50 }}>{"Security "}</Title>
                <Text>Security presents a dashboard view with the details of SSO, Mailbox Access, Role Management and User Management of the system.  </Text>
                <ol>
                    <li>Select the Security icon <img alt='' src={securityIcon } width="50px" height="auto"/>  from the left pane. It presents a dashboard view with the details of SSO, Mailbox Access, Role Management and User Management of the system.
                    <br/>
                  <br/>
                  <img alt='' src={settingsecurity1}/>
                  <br/>
                  <br/> </li>
                </ol>

                
				 
            </div>
           <SecuritySSO/>
           <SecurityMailboxAccess/>
           <SecurityRoleManagement/>
           <SecurityUserManagement/>
        </div>
        )
    }

}

export default Security;
function SecuritySSO(){
    return(
        <div>
            <div style={{ paddingLeft: 40, paddingTop: 3, display: "flex", justifyContent: "center", flexDirection: "column" }}>
                <Title style={{ color: `${color.Blue}`, fontSize: 25 }}>{"SSO"}</Title>
                
               <Text>Single sign-on (SSO) is a session and user authentication service that permits a user to use one set of login credentials (e.g., name and password) to access multiple applications.   </Text>
               <br/>
               <Text>The service authenticates the end user for all the applications the user has been given rights to and eliminates further prompts when the user switches applications during the same session.</Text>
               <br/>
               <Text>On the back end, SSO is helpful for logging user activities as well as monitoring user accounts.  </Text>
               <br/>
               <Text strong>SSO configuration  </Text>
               <ol>
                   <li>
                   Select the SSO icon <img alt='' src={ssoIcon } width="50px" height="auto"/>  from the Security menu.
                   <br/>
                  <br/>
                  <img alt='' src={settingsecurity2}/>
                  <br/>
                  <br/>  
                  <ul>
                      <li>
                      <Text strong>Identity Provider URL:</Text> (end point) IDP URL where the domain is registered for authentication. (IDP Server URL)   
                      </li>
                      <li>
                      <Text strong>Service Provider URL: </Text>  (optional) This field can be optional if the SonaVault login URL is configured at the IDP server. If not, enter SonaVault login screen URL (<NavLink to="https://domain/ssarcui/easlogin.aspx">https://domain/ssarcui/easlogin.aspx</NavLink>)  
                      </li>
                      <li>
                      <Text strong>Issuer:</Text>   Application name (ADFS NAME) or Application id (AZURE)     
                      </li>
                      <li>
                      <Text strong>Public Certificate: </Text>  Upload SSL certificate if you have an IDP server provided for authentication.    
                      </li>
                      <li>
                      <Text strong>Enable:  </Text>  Check if you want to verify credential with the IDP server. If not, authenticate by application. 
                      </li>
                      <li>
                      Select <Text strong>Save</Text> or <Text strong>Cancel</Text>.  
                      </li>
                  </ul>
                  <br/>
                  <br/>
                  <img alt='' src={settingsecurity3}/>
                  <br/>
                  <br/>
                  <Text>
                  The user must use <NavLink to="https://domain/ssarcui/loginpage.aspx">https://domain/ssarcui/loginpage.aspx</NavLink> link to connect IDP server for SSO authentication, if SSO is enabled. If the user has already logged in with the IDP server credentials in any of the applications, then SonaVault application is accessed by Windows applications/web applications caches/cookies, if not IDP server prompt for credentials. Once these credentials are verified, the user gets a call back response with SAML Response code in base64 string format. We are validating SAML Response and getting the logged in user attributes.   
                  </Text>
                  <br/>
                  <Text>
                  The user can send request along with SAML Response file to <NavLink to="https://domain/ssarcui.easlogin.aspx">https://domain/ssarcui.easlogin.aspx</NavLink>.  For this, we need to enable SSO authentication with/without IDP URL, Service Provider URL, Issuer, and public key.  
                  </Text>
                   </li>
               </ol>
               
            </div>
           
        </div>
    );
}
function SecurityMailboxAccess(){
    return(
        <div>
            <div style={{ paddingLeft: 40, paddingTop: 3, display: "flex", justifyContent: "center", flexDirection: "column" }}>
                <Title style={{ color: `${color.Blue}`, fontSize: 25 }}>{"Mailbox Access "}</Title>
                <Text>In the SonaVault application, users can see their own emails and search and a user with EAS Auditor role can view the emails of all the users. </Text>
                <ol>
                    <li>
                    To specify mailbox access to the users, select the Mailbox Access icon  <img alt='' src={ mailIcon } width="50px" height="auto"/> from the Security menu. 
                    <br/>
                  <br/>
                  <img alt='' src={settingsecurity4}/>
                  <br/>
                  <br/>
                  <Text>
                  In an organization, often some users may need to see the emails of a few others. For example, a project manager may need to see the communication between the technical leaders and the customer, or a sales manager may need to see all the emails of the sales team. To address such situations, special privileges can be given to these users to view the necessary emails.  
                  </Text>
                  <br/>
                  <Text>
                  You can specify the users to have the viewing privilege and the mailboxes they can access. The privilege is for only viewing or searching the emails.  
                  </Text>
                  <br/>
                  <Text strong>
                  Note: An EAS Auditor can see all the mailboxes archived by the system; a privileged user can see only the specified mailboxes.  

                  </Text>
                  <br/>
                  <br/>
                  <Text>
                  The page displays a list of privileged users and their email IDs.
                   </Text>
                   <br/>
                  <br/>
                  <img alt='' src={settingsecurity5}/>
                  <br/>
                  <br/>
                  <ul>
                      <li>
                      To add a user to whom access to mailboxes should be given, select<Text strong> Add User</Text>. The user must be an existing user of SonaVault. 
                      </li>
                      <li>
                      To view the mailboxes accessible to the privileged user, select the Insert Screenshot sign next to the user name. The list of users whose emails are allowed to be viewed is displayed. The names and the email IDs are displayed.   
                      </li>
                      <li>
                      To modify mailbox access of a user, select the edit icon   <img alt='' src={ editIcon } width="50px" height="auto"/>.
                      </li>
                  </ul>
                    </li>
                </ol>
                <Text strong>Add Mailbox User </Text>
                <ol>
                    <li>
                    In the Mailbox Access window, select <Text strong>Add User</Text>  <img alt='' src={ addIcon } width="50px" height="auto"/>.
                    <br/>
                  <br/>
                  <img alt='' src={settingsecurity6}/>
                  <br/>
                  <br/>
                    </li>
                    <li>
                    An <Text strong>Add Mailbox Access Setting</Text> side-drawer appears. In the <Text strong>User</Text> window, enter a user name and select Apply. This is the user to whom access to some mailboxes is given, and this should be a SonaVault user. Ensure that the user name here matches the user name in the SonaVault user list including spaces and cases. 



                    <br/>
                  <br/>
                  <img alt='' src={settingsecurity7}/>
                  <br/>
                  <br/>
                    </li>
                    <li>
                    If you checked <Text strong>Selected</Text>, fill the <Text strong>Server</Text>, <Text strong>Storage Group</Text> and <Text strong>Mailbox Store</Text> to specify the mailboxes.  
                    <br/>
                  <br/>
                  <img alt='' src={settingsecurity8}/>
                  <br/>
                  <br/>
                    </li>
                    <li>
                    Based on the previous selections, the mailboxes present will be shown. Select the mailboxes from the list and select<Text strong> Add</Text>. Multiple boxes can be selected using the Shift or Control key. The selected mailboxes are shown in the <Text strong>Selected Mailbox(es)</Text> list. You can use the <Text strong>Remove</Text> option to remove a mailbox from this list. If many of the mailboxes shown in the available list are to be added, select all and remove those that are not required.   
                    <br/>
                  <br/>
                  <img alt='' src={settingsecurity9}/>
                  <br/>
                  <br/>
                    </li>
                    <li>
                    Select <Text strong>Save</Text>.   
                    <br/>
                  <br/>
                  <img alt='' src={settingsecurity10}/>
                  <br/>
                  <br/>
                  <Text>The specified user can see all the emails of the mailboxes selected in this window.   </Text>
                  <br/>
                  <Text strong>Note: If access to a group is added, apart from the emails sent to the group ID emails sent to the individual members of the group also become accessible. If a member of the group is another group, emails of members of the group also become accessible, and so on.</Text>
                    </li>
                </ol>
                <Text strong>Edit Mailbox User </Text>
                <ol>
                    <li>In the Access Allowed User window, select the edit icon  next to the user name.
                    Select <Text strong>Save</Text>.   
                    <br/>
                  <br/>
                  <img alt='' src={settingsecurity11}/>
                  <br/>
                  <br/> </li>
                  <li>
                  The user name cannot be edited.
                  </li>
                  <li>Make the necessary changes to the <Text strong>User</Text> and <Text strong>Accessible User Mailbox</Text> information.   </li>
                  <li>
                  Select <Text strong>Clear</Text>. In the box, enter the name and select  <Text strong>Apply</Text>. The privileges granted to the current user get transferred to the newly selected user.   
                  </li>
                  <li>
                  Make the necessary changes in the selection of Server, Storage Group, and Mailbox Store.
                  <br/>
                  <br/>
                  <img alt='' src={settingsecurity12}/>
                  <br/>
                  <br/> </li>
                  <li>
                  Select on the check box <Text strong>Show Deleted Mailbox(es)</Text> to include all of the mailboxes previously discovered by SonaVault via Active Directory highlighted in red. This way the administrator can grant the user access to search specific deleted mailbox(es) for emails rather than providing that user access to all mailboxes to accomplish an eDiscovery request.   
                  <br/>
                  <br/>
                  <img alt='' src={settingsecurity13}/>
                  <br/>
                  <br/> </li>
                  <li>
                  Make the necessary changes in the selection of mailboxes and select <Text strong>Add</Text>. Use the <Text strong>Remove</Text> option to delete the selected mailbox.   
                  <br/>
                  <br/>
                  <img alt='' src={settingsecurity14}/>
                  <br/>
                  <br/> </li>
                  <li>
                  Select <Text strong>Save</Text> to save the changes or select <Text strong>Cancel</Text> to exit without saving.   
                  <br/>
                  <br/>
                  <img alt='' src={settingsecurity15}/>
                  <br/>
                  <br/> 
                  <Text>The number of mailbox and related information is displayed in one page, the page size, can be specified as required. The default page size is 10. </Text>
                  <br/>
                  <Text>
                  In the Mailbox page, for each mailbox, the details such as user logon, email id, and so on are displayed. If you want to hide any one of the columns, select the Column Configuration icon <img alt='' src={columnIcon} width="50px" height="auto"/>present at the top of the column and uncheck the unwanted column. 
                  </Text>
                  
                  </li>
                </ol>
                
               
            </div>
           
        </div>
    );
}
function SecurityRoleManagement(){
    return(
        <div>
            <div style={{ paddingLeft: 40, paddingTop: 3, display: "flex", justifyContent: "center", flexDirection: "column" }}>
                <Title style={{ color: `${color.Blue}`, fontSize: 25 }}>{"Role Management  "}</Title>
                <Text>Select the <Text strong>Role Management</Text> icon <img alt='' src={roleIcon} width="50px" height="auto"/> from the <Text strong>Security</Text> menu.  </Text>
                <ol style={{listStyle:"none"}}>
                    <li>
                    <br/>
                  <br/>
                  <img alt='' src={settingsecurity16}/>
                  <br/>
                  <br/> 
                  <Text>SonaVault provides user management in the following steps:  </Text>
                  <ul>
                      <li>Define roles. SonaVault defines seven roles. You can add more roles as per your requirement.    
Some users need certain special permissions. For example, if a role named <Text strong>Section Head</Text> is added, the role can be permitted to define retention policy, labeling policy and add privileged users for the section. This role can be configured for each section head.  
<br/>
                  <br/>
                  <img alt='' src={settingsecurity17}/>
                  <br/>
                  <br/> 
                  <Text>The super user is sonasoftarc. This cannot be edited or deleted.  </Text>
                  <ul>
                      <li>
                      Define access permissions to each role. Access to the SonaVault application may vary with the role.  For each role, the operations that are allowed to be performed by the users of the role are defined while adding a role. See Add Role.    
                      </li>
                      <li>
                      Assign roles to all the SonaVault users. All the users of all the configured Active Directories who are registered with the SonaVault application are assigned a role. 
                      </li>
                      <li>
                      To add a new role, select <Text strong>Add</Text>. See Add Role. 
                      </li>
                      <li>
                      To edit a role, select the edit icon <img alt='' src={editIcon} width="50px" height="auto"/> next to the role. See Edit Role.   
                      </li>
                      <li>
                      To assign roles to users, enter the data in the <Text strong>Assign Role</Text> pane.   
                      </li>
                      <li>
                      To remove a user from a role, select <Text strong>Remove User</Text>.     
                      </li>
                      <li>
                      The up and down arrow options show or hide the user list for the selected role. The up and down arrow options can also be used for showing or hiding the <Text strong>Assign Role</Text> pane.      
                      </li>
                  </ul>
                  </li>
                  </ul>
                    </li>
                </ol>
                <Text strong>Assign a Role  </Text>
                <ol>
                    <li>Select <Text strong>Assign Role </Text>box.
                    <br/>
                  <br/>
                  <img alt='' src={settingsecurity18}/>
                  <br/>
                  <br/> </li>
                  <li>Select a role from <Text strong>Role</Text> list.  
                    <br/>
                  <br/>
                  <img alt='' src={settingsecurity19}/>
                  <br/>
                  <br/> </li>
                  <li>Enter a user name in <Text strong>Assign To (User Logon)</Text> and select <Text strong>Add User</Text>. The added user name gets displayed in the <Text strong>User Logon: Current Role</Text> box.   

                    <br/>
                  <br/>
                  <img alt='' src={settingsecurity20}/>
                  <br/>
                  <br/> </li>
                  <li>Add more users if you want to assign more people to the selected role. Use the <Text strong>Remove User </Text>option to remove selected users.   
                       <br/>
                  <br/>
                  <img alt='' src={settingsecurity21}/>
                  <br/>
                  <br/> </li>
                  <li> Select <Text strong>Assign</Text>. You can see the list of currently assigned users to the selected role.  
                       <br/>
                  <br/>
                  <img alt='' src={settingsecurity22}/>
                  <br/>
                  <br/> 
                  <Text>Sample screen: List of users with EAS Administrator role </Text>
                  <br/>
                  <br/>
                  <img alt='' src={settingsecurity23}/>
                  <br/>
                  <br/> 
                  </li>
                  
                </ol>
                <Text strong>Notes</Text>
                <Text strong>               
                     <ul>
                    <li>A user cannot have multiple roles. </li>
                    <li>Users cannot be assigned to a disabled role.   </li>
                    <li>The system-defined roles cannot be edited, disabled or deleted.   </li>
                    <li>Using the General tab of the Configuration menu, one of the roles is set as a default role.  New users are assigned the default role till an administrator assigns another role through the Role Management menu.   </li>
                    <li>
                    The user roles can be changed when necessary. When a new role is defined for a user, the old rule gets overwritten.   
                    </li>
                    <li>
                    If a role is deleted, the users of that role become general users.   
                    </li>
                    <li>
                    By default, a new role is enabled.   
                    </li>
                </ul>

                </Text>
                <Text>
                    SonaVault defines some default roles. The table below shows the default roles and permitted operations for each role.
         </Text>
                <br />

                <table border="2" style={{ width: "50%" }}>
                    <tbody>
                        <tr><td>Role</td><td>Function</td><td>Menu</td></tr> <tr><td>EAS ADMINISTRATOR</td><td>Has complete control on all the features of EAS</td><td><ul>
                            <li>Configuration    </li>
                            <li>Setup      </li>
                            <li>Maintenance  </li>
                            <li>Monitor    </li>
                            <li>Search     </li>
                            <li>Reports     </li>
                            <li>E-Suite  </li>
                        </ul></td></tr>
                        <tr><td>EAS AUDITOR </td><td>Can view or search all the mailboxes and can view all the reports </td><td><ul>

                            <li>Monitor    </li>
                            <li>Search     </li>
                            <li>Reports     </li>
                            <li>E-Suite  </li>
                        </ul></td></tr>
                        <tr><td>EAS SUPER REVIEWER  </td><td>Can resolve the escalations made by reviewers.  Apart from this, a super reviewer can add, edit or delete content identification policies, add, edit or delete a case, monitor the task list, and make a simple or advanced search.  </td><td><ul>
                            <li>Content Identification Policy  </li>
                            <li>Monitor    </li>
                            <li>Search     </li>
                            <li>Reports     </li>
                            <li>E-Suite  </li>
                        </ul></td></tr>
                        <tr><td>EAS REVIEWER   </td><td>Can review emails for compliance with email communication rules set by the organization.  Apart from this, a reviewer can add, edit or delete content identification policies, add, edit or delete a case, monitor the task list, and make a simple or advanced search.   </td><td><ul>
                            <li>Content Identification Policy  </li>
                            <li>Monitor    </li>
                            <li>Search     </li>
                            <li>Reports     </li>
                            <li>E-Suite  </li>
                        </ul></td></tr>
                        <tr><td>EAS NO-UI ACCESS   </td><td>Has no access to SonaVault Console   </td><td>No Menu options</td></tr>
                        <tr><td>EAS READ-ONLY ACCESS    </td><td>Has permission to view the entire system in the Read-Only mode.  Can make a simple search for one's own emails.  </td><td>All menu options</td></tr>
                        <tr><td>EAS GENERAL USER    </td><td>A general user can search only one's own mailboxes  </td><td> <ul> <li>Monitor    </li>
                            <li>Search     </li></ul></td></tr>
                    </tbody>
                </table>
                <Text>The Assigned Role and User List panes can be expanded or collapsed as required. Select <img alt='' src={down} width="50px" height="auto"/>  to expand and  <img alt='' src={up} width="50px" height="auto"/> to collapse</Text>
                <br/>
                <Text>The number of roles and their related information is displayed on one page. The page size can be specified as required. The default page size is 10. </Text>
                <br/>
                <Text>In the Role Management page, for each role, the details such as description and status are displayed. If you want to hide any one of the columns, select on the Column Configuration icon <img alt='' src={columnIcon} width="50px" height="auto"/>  present at the top of the column and uncheck the unwanted column.  </Text>

                <Text strong>Add Role </Text>
                <ol>
                    <li>
                    To add a role, select Add <img alt='' src={addIcon} width="50px" height="auto"/> in the Role Management page.
                    <br/>
                  <br/>
                  <img alt='' src={settingsecurity24}/>
                  <br/>
                  <br/>   
                    </li>
                    <li>
                    An <Text strong>Add Role Management Setting </Text>side-drawer appears. In the <Text strong>Add Role</Text> page displayed, enter the details as described below:  
                  
                    </li>
                    <li>
                    In the <Text strong>Role</Text> box, enter the role name.   
                    <br/>
                  <br/>
                  <img alt='' src={settingsecurity25}/>
                  <br/>
                  <br/>   

                    </li>
                    <li>
                    In the <Text strong>Description</Text> box, enter the role description. Write the primary function of the role in a few words.   


 
                    <br/>
                  <br/>
                  <img alt='' src={settingsecurity26}/>
                  <br/>
                  <br/>   
                    </li>
                    <li>
                    By default, a new role is enabled. If you do not want the role to be used immediately, uncheck the  <Text strong>Enabled</Text> box.   
                    <br/>
                  <br/>
                  <img alt='' src={settingsecurity27}/>
                  <br/>
                  <br/>   
                    </li>
                    <li>
                   <Text>Permissions for a role are given in terms of operations allowed to be performed in the SonaVault application.    </Text>  
                   <br/>
                   <Text>
                   The Add Role window displays the menus, sub menus, and operations in a three-level tree structure. Select menu to see its sub menus and select sub menu to see the operations in the menu. You can expand or collapse the menus.  
                   </Text>
                   <br/>
                   <Text>Some operations might appear gray if they are not enabled as per the license you purchased. For example, viewing a report of email statistics and viewing a report of attachments are excluded as per the license.   </Text>
                   <br/>
                   <Text>Check the boxes of the operations for which the access should be granted.  If a menu or sub menu is checked, all the operations in the menu or sub menu are automatically selected. If you check an operation, the sub menu and its parent menu appear checked.  However, the other operations in the checked menu or sub menu will not be automatically allowed; only the operations you checked are allowed.   </Text>
                   
                    </li>
                    <li>Select <Text strong>Save</Text> to add a role or select <Text strong>Cancel</Text> to exit without adding.
                    <br/>
                  <br/>
                  <img alt='' src={settingsecurity28}/>
                  <br/>
                  <br/>   
                  <Text>The complete list of operations available for access depends on the SonaVault license purchased.  The same set of operations is available to all the users including administrators and the super user as per the license.  Unavailable operations appear gray (disabled).  From this set of operations, the administrators can choose the allowed operations for each role.    </Text>
                  <Text strong>Note: If an operation you want to avail is disabled (appears in gray), upgrade your license.  Contact the Sonasoft support team to upgrade your license.</Text>
                     </li>
                </ol>
                <Text strong>Edit Role </Text>
                <ol>
                    <li>To edit a role, select the edit icon <img alt='' src={editIcon} width="50px" height="auto"/> next to the role in the <Text strong>Role Management</Text> page.
                    <br/>
                  <br/>
                  <img alt='' src={settingsecurity29}/>
                  <br/>
                  <br/>   
                    
                     </li>
                     <li>Make the necessary changes and select <Text strong>Save</Text>.  

                    <br/>
                  <br/>
                  <img alt='' src={settingsecurity30}/>
                  <br/>
                  <br/>   
                  <ul>
                      <li>You can change the <Text strong>Role and Description</Text>.  </li>
                      <li>You can enable or disable the role.     </li>
                      <li>You can make changes in the menu options permitted for the role.  Refer to <Text strong>Add Role</Text>for details on specifying operations to be allowed.     </li>
                  </ul>
                  <br/>
                  <Text>To change the users assigned to the role, go to the main page of <Text strong> Role Management</Text>.   </Text>
                    
                     </li>
                </ol>
                <Text strong> Notes</Text>
                <Text strong>
                    <ul>
                        <li>Disabled operations cannot be allowed for any role including administrators and auditors. Locking or unlocking of emails and searching across all the sites in a multisite deployment is disabled as per the license.   </li>
                        <li>Contact the Sonasoft support team to get the license upgraded.  </li>
                    </ul>
                </Text>
               
            </div>
           
        </div>
    );
}
function SecurityUserManagement(){
    return(
        <div>
            <div style={{ paddingLeft: 40, paddingTop: 3, display: "flex", justifyContent: "center", flexDirection: "column" }}>
                <Title style={{ color: `${color.Blue}`, fontSize: 25 }}>{"User Management   "}</Title>
                <ol>
                    <li>
                    Select the<Text strong>User Management </Text> icon <img alt='' src={userIcon} width="50px" height="auto"/> from the <Text strong>Security</Text> menu. 
                    <br/>
                  <br/>
                  <img alt='' src={settingsecurity31}/>
                  <br/>
                  <br/> 
                  <Text>Users are added to the SonaVault application by integrating the Active Directories associated with the email servers.  However, there might be some situations in which users not available in any Active Directory (AD) need access to the archival system.  For example, external users such as third-party auditors and system reviewers may need to access the system temporarily, or when an AD is inaccessible, users may not be able to log into SonaVault to do any operation including searching for an email. To address such needs, SonaVault provides an option to create users, referred to as Local users, in addition to the AD users.   </Text> 
                  <br/>
                  <Text>The Email Archival System recognizes the following three types of users:  </Text> 
                  <ul>
                      <li>
                      The <Text strong>default system users</Text> provided during the installation of the system (e.g. sonasoftarc, the Super user). 
The system user details cannot be edited.   
                      </li>
                      <li>
                      <Text strong>Active Directory users <br/>   
</Text>AD users are authenticated at the specified domain.  Role of an AD user can be set or changed by any user with administrative permissions to manage roles.  
                      </li>
                      <li>
                      <Text strong>Local users    
</Text> (authenticated locally) <br/>A user with administrative permissions to manage users can add a local user.    
When a local user is added, apart from the username, a mailbox must be specified. SonaVault automatically generates login credentials for the local user and sends an email to the user at the specified mailbox.  If the mailbox is specified incorrectly while adding the user, the user will not be created.  
The role for a local user can be selected from the list of roles. Any of the existing roles including the system-defined roles can be assigned.  If necessary, a role can be created particularly for the user and the role may be deleted when the user is deleted. Generally, local users are external users and temporary users.   
                      </li>
                  </ul>
                    </li>
                </ol>
                <Text>Local users can change their password after the initial login.  The Change Password Insert Screenshot icon is available for local users in the home page.   </Text>
                <br/>
                <Text>In the <Text>User Management</Text> page:   </Text>
                <ul>
                    <li>To add a user, select <Text strong>Add</Text>. See Add User.  </li>
                    <li>To edit a user, select the edit icon <img alt='' src={editIcon} width="50px" height="auto"/> next to the username. See Edit User.    </li>
                </ul>

                <Text strong>Add User </Text><br/>
                <Text>To add a local user:  </Text>
                <ol>
                    <li>Select <Text strong>Add</Text>.
                    
                    <br/>
                  <br/>
                  <img alt='' src={settingsecurity32}/>
                  <br/>
                  <br/> 
                    </li>
                    <li>The <Text strong>Add User</Text> side-drawer is displayed.    
                    
                    <br/>
                  <br/>
                  <img alt='' src={settingsecurity33}/>
                  <br/>
                  <br/> 
                    </li>
                    <li>In the <Text strong>User Name</Text> box, enter a name. This name should be used by the user for logging into the application.    
                    
                    <br/>
                  <br/>
                  <img alt='' src={settingsecurity34}/>
                  <br/>
                  <br/> 
                    </li>
                    <li>In the <Text strong>Display Name </Text>box, enter a name. This is the name by which the user will be known to SonaVault and to the other users. Specify a name that makes it easy to recognize the user and the purpose of adding the user.    
                        <br/>
                  <br/>
                  <img alt='' src={settingsecurity35}/>
                  <br/>
                  <br/> 
                    </li>
                    <li>In the <Text strong> Email Address </Text>box, enter a correct email address. Ensure that the email address exists on the specified server and is active. If there is an error in this name, the user will not be created.   
                    <br/>
                  <br/>
                  <img alt='' src={settingsecurity36}/>
                  <br/>
                  <br/> 
                    </li>
                    <li>Select a role for the user. The <Text strong>Role</Text> box lists all the roles currently configured in the system. If you want to assign a role that does not exist in the list, you can add the role using the <Text strong>Role Management </Text>menu before adding the user or select the default role and change the role later <NavLink to="/setting/security/rolemanagement">using the Edit</NavLink> option. 
                    <br/>
                  <br/>
                  <img alt='' src={settingsecurity37}/>
                  <br/>
                  <br/> 
                    </li>
                    <li>Select <Text strong>Save</Text>.   
                        <br/>
                  <br/>
                  <img alt='' src={settingsecurity38}/>
                  <br/>
                  <br/> 
                    </li>
                </ol>
                <Text strong>Edit User </Text>
                <ol>
                    <li>In the <Text strong>User Management</Text> page, find the user and select the edit icon <img alt='' src={editIcon} width="50px" height="auto"/> next to the username. 
                    <br/>
                  <br/>
                  <img alt='' src={settingsecurity39}/>
                  <br/>
                  <br/> 

                    </li>
                    <li>The <Text strong>Edit User</Text> page is displayed with the details of username, display name, role, and email address.<br/>   
If the user is an AD user, the details of email server, storage group, mailbox store and LDAP path are also displayed. 
                    <br/>
                  <br/>
                  <img alt='' src={settingsecurity40}/>
                  <br/>
                  <br/> 

                    </li>
                    <li>Make the necessary changes.   
For a local user, you can change any detail. For an AD user, you can change only the role.   
                    </li>
                    <li>Select <Text strong>Save</Text>.   
                        <br/>
                  <br/>
                  <img alt='' src={settingsecurity41}/>
                  <br/>
                  <br/> 

                    </li>
                </ol>
                <Text strong>Note: System users cannot be edited.  </Text>
                <br/>
                <Text strong>Delete a User  </Text>
                <ol>
                    <li>In the <Text strong>User Management</Text> page, find the user and select the edit icon <img alt='' src={editIcon} width="50px" height="auto"/> next to the user name.     </li>
                    <li>The <Text strong>Edit User</Text> page is displayed with the details of the user.  Ensure that you selected the right user.     </li>
                    <li>Select <Text strong>Delete</Text>.      </li>
                </ol>
                <Text strong>Note: Only local users can be deleted; AD users and system users cannot be deleted.</Text>
                <br/>
                <Text strong>Reset the Password of a User  </Text>
                <ol>
                    <li>In the User Management page, find the user and select the edit icon  <img alt='' src={editIcon} width="50px" height="auto"/> next to the user name.     </li>
                    <li>The <Text strong>Edit User</Text> page is displayed with the details of the user.    </li>
                    <li>
                    Select <Text strong>Reset </Text>Password. An email is sent to the specified mailbox with the new password generated by the system.  
                    </li>
                </ol>
                <Text strong>Note: Password can be reset only for local users.  AD users can reset the password only when their authentication type is set as Local. However, the original or reset local password of an AD user does not affect the password on the AD; the password on AD is not changed because of any change made in the SonaVault application. </Text>
                <br/>
                <br/>
                <Text strong>User Management Settings (Setting authentication type)  </Text>
                <br/>
                <Text>
                Authentication type can be set only for an AD user.  By default, the authentication type is set as AD and all AD users are authenticated at the AD they belong to.  However, in the deployment scenario, if an AD is inaccessible or unavailable the authentication type setting can be changed to <Text strong>Local</Text>.  In such cases, the AD user is populated offline and then local authentication is used.  
                </Text>
                <br/>
                <Text strong>Notes</Text>
                <Text strong>
                <ul>
                    <li>System users and local users (external users) are always authenticated locally irrespective of the authentication type set. AD users are authenticated at the AD by default and locally if the Authentication Type is set as Local.  </li>
                    <li>The authentication type should not be changed to Local if the AD is accessible.  </li>
                </ul>
                </Text>
                <br/>
                <Text strong> Search for a user  </Text>
                <br/>
                <Text>The <Text strong>User Management</Text> page displays the entire list of SonaVault users.  Generally, this is a long list and spans across several pages of display. To search for user easily, you can do any of the following:  </Text>
                <ol>
                    <li>In the <Text strong>User Name</Text> box, enter the name of the user and select <Text strong>Search</Text>.  You need not enter the complete name; you can enter the first few letters of the name and search.</li>
                    <li>By default, the user list is shown with the details (columns) of username, display name, and mailbox name.  If you think you can spot the user more easily when you see the user type or role, select the list icon Insert Screenshot and select the columns you want to see.   </li>
                    <li>Use the page navigation options, <Text strong>Next, Last, Previous</Text> or <Text strong>First</Text>, to move across the pages.   </li>

                </ol>

                
               
            </div>
           
        </div>
    );
}