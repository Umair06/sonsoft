import React from 'react';

import { Typography } from 'antd';
//import style from "../../../../../../styles";

import Theme from '../../../../../../Assets/Theme/Theme';

const { Text, Title } = Typography;
const { color } = Theme;

function MailboxAccess() {
  return (
    <div>
      <div
        style={{
          paddingLeft: 40,
          paddingTop: 3,
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column'
        }}>
        <Title
          style={{
            color: `${color.Orange}`,
            padding: '15px 0 0 0px',
            fontSize: 50
          }}>
          {'Mailbox Access(Version 6.5)'}
        </Title>
        <br />
        <Text type='danger'>Insert ScreenShot</Text>
        <br />
        <Text>
          In the SonaVault application, users can see their own emails and
          search and a user with EAS Auditor role can view the emails of all the
          users{' '}
        </Text>
        <br />
        <Text>
          To specify mailbox access to the users, select the Setup menu and
          select <Text strong> Mailbox Access</Text>.{' '}
        </Text>
        <br />
        <Text>
          In an organization, often some users may need to see the emails of a
          few others. For example, a project manager may need to see the
          communication between the technical leaders and the customer or a
          sales manager may need to see all the emails of the sales team. To
          address such situations, special privileges can be given to these
          users to view the necessary emails.
        </Text>
        <br />
        <Text>
          You can specify the users to have the viewing privilege and the
          mailboxes they can access. The privilege is for only viewing or
          searching the emails.
        </Text>
        <br />
        <Text strong>
          Note: An EAS Auditor can see all the mailboxes archived by the system;
          a privileged user can see only the specified mailboxes.
        </Text>
        <Text>
          The page displays a list of privileged users and their email IDs.
        </Text>
        <ul>
          <li>
            To add a user to whom access to mailboxes should be given, click{' '}
            <Text strong>Add User</Text>. See <a href='/#'>Add Mailbox User</a>.
            The user must be an existing user of SonaVault.{' '}
          </li>

          <li>
            To view the mailboxes accessible to the privileged user, click the{' '}
            <Text type='danger'>Insert ScreenShot</Text> sign next to the user
            name. The list of users whose emails are allowed to be viewed is
            displayed. The names and the email IDs are displayed.{' '}
          </li>
          <li>
            To modify mailbox access of a user, click the edit icon{' '}
            <Text type='danger'>Insert ScreenShot</Text>. See{' '}
            <a href='/#'>Edit Mailbox User</a>.{' '}
          </li>
          <li>
            To edit a role, click the edit icon{' '}
            <Text type='danger'>Insert Screenshot</Text> next to the role. See{' '}
            <a href='/#'>Edit Role</a>.{' '}
          </li>
        </ul>

        <br />
        <Text>
          The number of mailbox and related information is displayed on one
          page. The page size can be specified as required. The default page
          size is 10. In the Mailbox page, for each mailbox, the details such as
          user logon, email id, and so on are displayed. If you want to hide any
          one of the columns, click on the{' '}
          <Text type='danger'>Insert ScreenShot</Text> icon present at the top
          of the column and uncheck the unwanted column.
        </Text>
        <br />
      </div>
      <MailboxAccessAdd />
      <MailboxAccessEdit />
    </div>
  );
}

export default MailboxAccess;

function MailboxAccessAdd() {
  return (
    <div
      style={{
        paddingLeft: 40,
        paddingTop: 3,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
      }}>
      <Title
        style={{
          color: `${color.Orange}`,
          padding: '15px 0 0 0px',
          fontSize: 50
        }}>
        {'Add MailboxAccess(Version 6.5)'}
      </Title>
      <br />
      <Text>Insert ScreenShot</Text>
      <br />
      <Text>
        To add a role, click <Text strong>Add</Text> in the{' '}
        <Text strong>Role Management page</Text>. In the{' '}
        <Text strong> Add Role page</Text> displayed, enter the details as
        described below:{' '}
      </Text>

      <br />

      <ol>
        <li>
          In the Mailbox Access window, click <Text strong>Add User</Text>.{' '}
        </li>
        <li>
          In the Add User window, enter a user name and click
          <Text strong>Apply</Text>. This is the user to whom access to some
          mailboxes is given, and this should be a SonaVault user. Ensure that
          the user name here matches the user name in the SonaVault user list
          including spaces and cases.{' '}
        </li>
        <li>Define the privileges in the Assign Access to section.  </li>
        <li>
          Select the <Text strong>Server, Storage Group and Mailbox Store</Text>{' '}
          to specify the mailboxes.{' '}
        </li>
        <li>
          Based on the previous selections, the mailboxes present will be shown.
          Select the mailboxes from the list and click <Text strong> Add</Text>.
          Multiple boxes can be selected using the Shift or Control key. The
          selected mailboxes are shown in the{' '}
          <Text strong> Selected Mailbox(es)</Text> list. You can use the{' '}
          <Text strong>Remove </Text>option to remove a mailbox from this list.
          If many of the mailboxes shown in the available list are to be added,
          select all and remove those that are not required.{' '}
        </li>
        <li>
          Click <Text strong> Save</Text>
        </li>
      </ol>
      <br />
      <Text>
        The specified user can see all the emails of the mailboxes selected in
        this window.
      </Text>
      <br />
      <Text strong>
        Note: If access to a group is added, apart from the emails sent to the
        group ID emails sent to the individual members of the group also become
        accessible. If a member of the group is another group, emails of members
        of the group also become accessible, and so on. {' '}
      </Text>
    </div>
  );
}
function MailboxAccessEdit() {
  return (
    <div
      style={{
        paddingLeft: 40,
        paddingTop: 3,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
      }}>
      <Title
        style={{
          color: `${color.Orange}`,
          padding: '15px 0 0 0px',
          fontSize: 50
        }}>
        {'Edit MailboxAccess(Version 6.5)'}
      </Title>
      <br />
      <Text type='danger'>Insert ScreenShot</Text>

      <br />
      <ol>
        <li>
          In the Access Allowed User window, click the edit icon{' '}
          <Text type='danger'>Insert ScreenShot</Text> next to the user name.{' '}
        </li>
        <li>The user name cannot be edited. </li>
        <li>
          Make the necessary changes to the <Text strong> User </Text>and{' '}
          <Text strong>Accessible User Mailbox</Text> information.{' '}
        </li>

        <li>
          Click <Text strong>Clear</Text>. In the box, enter the name and click{' '}
          <Text strong>Apply</Text>. The privileges granted to the current user
          get transferred to the newly selected user.{' '}
        </li>
        <li>
          Make the necessary changes in the selection of{' '}
          <Text strong>Server, Storage Group, and Mailbox Store</Text>.{' '}
        </li>
        <li>
          Click on the check box <Text strong> Show Deleted Mailbox(es) </Text>
          to include all of the mailboxes previously discovered by SonaVault via
          Active Directory highlighted in red. This way the administrator can
          grant a user access to search specific deleted mailbox(es) for emails
          rather than providing that user access to all mailboxes to accomplish
          an eDiscovery request.{' '}
        </li>
        <li>
          MMake the necessary changes in the selection of mailboxes and click{' '}
          <Text strong>Add</Text>. Use the <Text strong>Remove </Text>option to
          delete the selected mailbox.{' '}
        </li>
        <li>
          Click <Text strong>Save</Text> to save the changes or click{' '}
          <Text strong>Cancel</Text> to exit without saving.{' '}
        </li>
      </ol>
      <br />
    </div>
  );
}
