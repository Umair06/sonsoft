import React from 'react';

import { Typography } from 'antd';
//import style from "../../../../../../styles";

import Theme from "../../../../../../Assets/Theme/Theme"





const { Text, Title } = Typography;
const { color } = Theme



function RoleManagement() {
    return (
        <div>
            <div style={{ paddingLeft: 40, paddingTop: 3, display: "flex", justifyContent: "center", flexDirection: "column" }}>
                <Title style={{ color: `${color.Orange}`, padding: "15px 0 0 0px", fontSize: 50 }}>{"Role Management (Version 6.5)"}</Title>
                <br />
                <Text>Insert ScreenShot</Text>
                <br />
                <Text >SonaVault provides user management in the following steps: </Text>
                <br />
                <ul>
                    <li>Define roles. SonaVault defines seven roles. You can add more roles as per your requirement.Some users need certain special permissions. For example, if a role named <Text strong>Section Head </Text> is added, the role can be permitted to define retention policy, labeling policy and add privileged users for the section. This role can be configured for each section head.</li>
                </ul>
                <Text>The super user is sonasoftarc. This cannot be edited or deleted. </Text>
                <ul>
                    <li>Assign roles to all the SonaVault users. All the users of all the configured Active Directories who are registered with the SonaVault application are assigned a role.   </li>
                    <li>To add a new role, click <Text strong>Add</Text>. See <a href="/#"> Add Role</a>.    </li>
                    <li>To edit a role, click the edit icon <Text type="danger">Insert Screenshot</Text> next to the role. See <a href="/#">Edit Role</a>.    </li>
                    <li>To assign roles to users, enter the data in the <Text strong>Assign Role </Text>pane. </li>
                    <li>To remove a user from a role, click <Text strong>Remove User</Text>. </li>
                    <li>The up and down arrow options show or hide the user list for the selected role. The up and down arrow options can also be used for showing or hiding the <Text strong>Assign Role</Text> pane.   </li>
                </ul>
                <Title style={{ color: `${color.Blue}`, fontSize: 25 }}>{"Assign Role (Version 6.5)"}</Title>
                <br />
                <ul>
                    <li>Select a role from  <Text strong>Role</Text> list. </li>

                    <li>Enter a user name in <Text strong> Assign To (User Logon)</Text> and click <Text strong>Add User</Text>. The added user name gets displayed in the <Text strong> User Logon: Current Role </Text>box.   </li>
                    <li>Add more users if you want to assign more people to the selected role. Use the <Text strong>Remove User </Text>option to remove selected users.   </li>
                    <li>Click <Text strong>Assign Role</Text>. You can see the list of currently assigned users to the selected role.Sample screen: List of users with EAS Administrator role   </li>
                </ul>
                <br />
                <Text type="danger">Insert Screenshot</Text>

                <br />
                <Text strong>
                    Notes:
         </Text>
                <br />
                <Text strong>
                    <ul>
                        <li>A user cannot have multiple roles.    </li>
                        <li>Users cannot be assigned to a disabled role.    </li>
                        <li>The system-defined roles cannot be edited, disabled or deleted.   </li>
                        <li>Using the General tab of the Configuration menu, one of the roles is set as a default role.  New users are assigned the default role till an administrator assigns another role through the Role Management menu.   </li>
                        <li>The user roles can be changed when necessary. When a new role is defined for a user, the old rule gets overwritten.    </li>
                        <li>If a role is deleted, the users of that role become general users.   </li>
                        <li>By default, a new role is enabled.   </li>
                    </ul>

                </Text>
                <br />
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

                <Text>
                    The Assigned Role and User List panes can be expanded or collapsed as required. Click  <Text type="danger">Insert Screenshot</Text> to expand and  <Text type="danger">Insert Screenshot</Text> to collapse The number of roles and their related information is displayed on one page. The page size can be specified as required. The default page size is 10.In the Role Management page, for each role, the details such as description and status are displayed. If you want to hide any one of the columns, click on the  <Text type="danger">Insert Screenshot</Text> icon present at the top of the column and uncheck the unwanted column.
                </Text>
            </div>
            <RoleManagementAdd />
            <RoleManagementEdit />

        </div>
    )

}

export default RoleManagement;

function RoleManagementAdd() {
    return (
        <div style={{ paddingLeft: 40, paddingTop: 3, display: "flex", justifyContent: "center", flexDirection: "column" }}>
            <Title style={{ color: `${color.Orange}`, padding: "15px 0 0 0px", fontSize: 50 }}>{"Add Role Management(Version 6.5)"}</Title>
            <br />
            <Text>Insert ScreenShot</Text>
            <br />
            <Text >To add a role, click <Text strong>Add</Text> in the <Text strong>Role Management page</Text>. In the <Text strong> Add Role page</Text> displayed, enter the details as described below:  </Text>

            <br />

            <ol>
                <li>In the  <Text strong>  Role </Text>box, enter the role name.   </li>
                <li>In the <Text strong>  Description </Text> box, enter the role description. Write the primary function of the role in a few words.     </li>
                <li>By default, a new role is enabled. If you do not want the role to be used immediately, uncheck the <Text strong>Enabled</Text> box.  </li>
                <li>Permissions for a role are given in terms of operations allowed to be performed in the SonaVault application.The Add Role window displays the menus, sub menus, and operations in a three-level tree structure. Click on a menu to see its sub menus and click on a sub menu to see the operations in the menu. You can expand or collapse the menus. Some operations might appear gray if they are not enabled as per the license you purchased. For example, in the screenshot shown above, viewing a report of email statistics and viewing a report of attachments are excluded as per the license.Check the boxes of the operations for which the access should be granted.  If a menu or sub menu is checked, all the operations in the menu or sub menu are automatically selected. If you check an operation, the sub menu and its parent menu appear checked.  However, the other operations in the checked menu or sub menu will not be automatically allowed; only the operations you checked are allowed.      </li>
                <li>Click <Text strong>Save</Text> role or click <Text strong>Cancel</Text> to exit without adding.<Text>
                    The complete list of operations available for access depends on the SonaVault license purchased.  The same set of operations is available to all the users including administrators and the super user as per the license.  Unavailable operations appear gray (disabled).  From this set of operations, the administrators can choose the allowed operations for each role.   </Text> </li>
            </ol>
            <br />
            <Text strong>
                Note: If an operation you want to avail is disabled (appears in gray), upgrade your license.  Contact the Sonasoft support team to upgrade your license. </Text>


        </div>
    )

}
function RoleManagementEdit() {
    return (
        <div style={{ paddingLeft: 40, paddingTop: 3, display: "flex", justifyContent: "center", flexDirection: "column" }}>
            <Title style={{ color: `${color.Orange}`, padding: "15px 0 0 0px", fontSize: 50 }}>{"Edit Role Management(Version 6.5)"}</Title>
            <br />
            <Text type="danger">Insert ScreenShot</Text>
            <br />
            <Text >To edit a role, click the edit icon  <Text type="danger">Insert ScreenShot</Text> next to the role in the <Text strong> Role Management</Text> page. Make the necessary changes and click <Text strong>Save</Text>. </Text>

            <br />

            <ul>
                <li>You can change the <Text strong>  Role </Text> and <Text strong>  Description </Text>.   </li>
                <li>You can enable or disable the role.       </li>
                <li>You can make changes in the menu options permitted for the role.  Refer to <a href="/#">Add Role </a> for details on specifying operations to be allowed.   </li>
                <li>Permissions for a role are given in terms of operations allowed to be performed in the SonaVault application.The Add Role window displays the menus, sub menus, and operations in a three-level tree structure. Click on a menu to see its sub menus and click on a sub menu to see the operations in the menu. You can expand or collapse the menus. Some operations might appear gray if they are not enabled as per the license you purchased. For example, in the screenshot shown above, viewing a report of email statistics and viewing a report of attachments are excluded as per the license.Check the boxes of the operations for which the access should be granted.  If a menu or sub menu is checked, all the operations in the menu or sub menu are automatically selected. If you check an operation, the sub menu and its parent menu appear checked.  However, the other operations in the checked menu or sub menu will not be automatically allowed; only the operations you checked are allowed.      </li>
                <li>Click <Text strong>Save</Text> role or click <Text strong>Cancel</Text> to exit without adding.<Text>
                    The complete list of operations available for access depends on the SonaVault license purchased.  The same set of operations is available to all the users including administrators and the super user as per the license.  Unavailable operations appear gray (disabled).  From this set of operations, the administrators can choose the allowed operations for each role.   </Text> </li>
            </ul>
            <br />
            <Text>
                To change the users assigned to the role, go to the main page of <a href="/#">Role Management</a>.
            </Text>
            <Text strong>
                Notes: Disabled operations cannot be allowed for any role including administrators and auditors. In the screenshot above, locking or unlocking of emails and searching across all the sites in a multisite deployment is disabled as per the license.Contact the Sonasoft support team to get the license upgraded.  </Text>


        </div>
    )

}