import React from 'react';
import { Typography } from 'antd';
//import styles from "../../../../../../styles"
import Theme from "../../../../../../Assets/Theme/Theme"
const { Text, Title } = Typography;
const {color} =Theme
function EmailServer() {
    return (
        <div>
        <div style={{  paddingLeft:40,paddingTop:3,display: "flex", justifyContent: "center", flexDirection: "column" }}>
        <Title style={{ color: `${color.Orange}`, padding: "15px 0 0 0px", fontSize: 50 }}>{"Email Server (Version 6.5)"}</Title>
        <br/>
        <Text type="danger">Insert ScreenShot</Text>
        <br/>
         <Text >In an organization with many people, generally, it may not be necessary to archive the emails of all the people. Careful planning is required to decide the emails to be archived.  </Text>
         
         <br />
         <Title  style={{ color: `${color.Blue}`, fontSize: 25 }}>{"Journaling  (Version 6.5)"}</Title>
         <br/>
         <Text>Journaling refers to recording the communication (emails) whereas archiving refers to storing the emails without having to back up. The Exchange Server's journaling feature uses the journal mailbox to store a copy of each email that passes through the server. When an email is sent, a copy is sent to the journal mailbox before it is sent to the recipient. This prevents loss of email and ensures authenticity. </Text>
         <br/>
         <Title  style={{ color: `${color.Blue}`, fontSize: 25 }}>{"SonaVault Agent  (Version 6.5)"}</Title>
         <br/>
         <Text>The SonaVault agent copies the emails from journal mailbox and saves them to a temporary folder called 'EMLFolder' on the SonaVault Server. A SonaVault process archives these emails from the EMLFolder and deletes them from the folder. The emails on the Journal Mailbox are deleted after they have been archived. Each email server has a single journal mailbox. Access to the journal is granted after an authorized login. A user name is given to authorized users. Each mailbox is associated with a journal. The SonaVault Agent periodically checks (polls) the journal mailbox for new emails. Each email server should have a SonaVault Agent installed on it.Journals and SonaVault Agents should have unique and easily identifiable names. The names help in identifying the emails easily.  

         </Text>
         <br/>
         <Text strong>
         Note: SonaVault supports only Microsoft Exchange Servers. 

         </Text>
         <br/>
         <Text>
         Archival can be stopped when a backup process is running on the exchange server. During the period specified through the Exclude Hours Start Time and Exclude Hours End Time, the agent stops archiving.The period after which the contents of an email are deleted from the Exchange Server and the email is linked to the archive server to fetch the email is called the stub period. To configure the email servers, select the Setup menu and select Email Server. You can see the list of the email servers that are being monitored for email archival. You can add new servers for archiving and enable or disable archiving on any server.  
         </Text>
         <br/>
         <ul>
             <li>To add a new email server for archiving, click Add Server. See <a href="/#">Add  New Email Server</a>.  </li>
             </ul>
             <Text strong> Note: SonaVault licenses are issued based on the number of email servers and its mailboxes that are archived. The number of journal mailboxes does not matter for counting the licenses.  </Text>
         <br/>
        <ul>
            <li>To disable archiving on a server, select the server by checking its box and click Disable Server. If archival is disabled on a server, the status is shown with a cross mark. Archival can be disabled when the server is down due to a breakdown or for maintenance. Currently, an Email Server cannot be deleted from the UI, just disabled.</li>
           <li>To enable archiving on a server, select the server by checking its box and click Enable Server. If archival is enabled on a server, the status is shown with a tick mark.  </li>
            <li>
            To edit a server, click the edit icon insert screenshot. See <a href="/#">Edit Email Server</a> .  
            </li>
        </ul>
        <br/>
        <Text>
        Select a convenient page size to view the list of email servers configured for archiving.  In the Email Server page, for each email servers configured, the details such as Journal mailbox, Journal logon and so on is displayed. If you want to hide any one of the columns, click on the<Text type="danger">Insert ScreenShot</Text> icon present at the top of the column and uncheck the unwanted column. 
        </Text>
        
         </div>
         <AddEmailServer/>
        <EditEmailServer/>
         </div>
    )

}

export default EmailServer;

function AddEmailServer(){
    return (
        <div style={{  paddingLeft:40,paddingTop:3,display: "flex", justifyContent: "center", flexDirection: "column" }}>
        <Title style={{ color: `${color.Orange}`, padding: "15px 0 0 0px", fontSize: 50 }}>{"Add New Email Server  (Version 6.5)"}</Title>
        <br/>
        <Text type="danger">Insert ScreenShot</Text>
        <br/>
         <Text >To add a server, click <Text strong>Add Server</Text> in the <Text strong> Email Server</Text> page. In the <Text> Add New Email Server</Text> page, enter the details as described below:   </Text>
         
         <br />
        
         <Text><Text strong>Domain Name:</Text> Select the domain name to which the server belongs. The list of domain names is shown as per the Active Directories configured. For details, <a href="/#">see Configuring the Active Directories</a>.  </Text>
         <br/>
        
         <Text><Text strong>Email Server:</Text> Enter the domain name and name of the email server from which the emails are sent or received in the organization.    

         </Text>
         <br/>
         <Text >
             <Text strong>
         Exchange Version:</Text>The version of the Exchange Server currently installed. </Text>
         <br/>
         <Text>
         <Text strong>Exchange ServicePack:</Text> The version of the ServicePack currently installed.  
         </Text>
         <br/>
         <Text>
        <Text strong> Journal Mailbox:</Text> Enter the name of the journal mailbox in the Exchange Server. This was created during the initial setup of SonaVault.  
         </Text>
         <br/>
         <Text>
         <Text strong>Journal Logon:</Text> Enter the user name to access the journal mailbox.  
         </Text>
         <br/>
         <Text>
         <Text strong>Journal Password:</Text> Enter the journal logon password to access the journal mailbox. The journal logon and password are used by the archiving agent service to archive the emails from journal mailbox. The archiving agent service runs on the local service account. It requires the credentials to acquire full privileges to access the journal mailbox for archiving. 
         </Text>
         <br/>
         <Text>
         <Text strong>Frequency:</Text> Enter the poll frequency in seconds. The SonaVault application keeps checking the journal mailbox for new email at regular intervals. This interval is referred to as poll frequency. For example, if the poll frequency is 30 seconds, the application checks the journal mailbox every 30 seconds.Even though an email server is configured in the SonaVault application for archiving, archiving of the emails from a server can be stopped or resumed as per the need. When an email server is disabled, the corresponding journal mailbox is not polled for emails and those emails are not archived. By default, when a server is added, it is in the enabled status. You can enable or disable a server by checking or unchecking the <Text strong> Enable </Text>option.  
         </Text>
         <Text>
         <Text strong>Archive Public Folder: </Text>A public folder is maintained on the Exchange Server to share information across all the users.  Users can access the emails in this folder and post to the public folder. The public folder may contain items such as posts, notes or general emails, which do not belong to any specific user.  Unlike other folders of the Exchange Server, the original emails or posts and their different versions available in the public folder get archived. Check this option if you want to archive the public folder. 
         </Text>
         <br/>
         <Text>
         <Text strong>Public Folder Poll Frequency:</Text> The SonaVault application checks at regular intervals the folders to be archived.  Since the email traffic is less dense in the public folder compared to the journal mailboxes, the polling is done less frequently.<Text strong> Public Folder Poll Frequency</Text> refers to the polling frequency used for the public folder.Enter the frequency in minutes. Polling frequency for the public folder is specified in minutes whereas that for the journal mailboxes is specified in seconds.Check <Text strong>Enable</Text> Stub to enable email stubbing on the Exchange Server. Refer to <a href="/#">Stub Policy </a>for more details.  
         </Text>
         <br/>
         <Text>
         <Text strong>Stub Period:</Text> The period after which the contents of an email are removed from the Exchange Server and linked to the archive server to fetch an email is called the stub period. Stub period is set in days. The maximum is 9999 days, the minimum is 0, and the default value is 0 days. Refer to <a href="/#">Stub Policy</a> for more details.If you do not want to give stub facility to any user, do not enable stub. If you want to give stub facility only to a select few, enable stubbing, specify the stub period as zero, and define stub policies such that the few selected users get stub facility.  Define stub policies to set the necessary stub period for the selected user or mailbox.  If you want to give stub facility to all users, enable stubbing, specify a stub period that works for all the users, and define stub policies for those users who need different stub periods.  If you want to give the same stub facility to all the mailboxes or users, enable stubbing and specify a stub period; do not define any stub policies.  
         </Text>
         <br/>
         <Text>
         <Text strong>Stub/Delete Email:</Text> <br/> Check <Text strong>Stub</Text> to stub the emails. <br/>Check <Text strong>Delete</Text> to permanently delete the emails from the Exchange Server. <br/>Check <Text strong>Stub Only Attachment</Text> to stub only the attachments of an email. The body of the email remains on the Exchange Server. If <Text strong>Stub Only Attachment</Text> is checked, emails without attachment do not get stubbed. Stub or delete options related to mail size are disabled. 
         </Text>
         <br/>
         <Text>
        <Text strong> Stub/Delete Options:</Text> Emails are selected for stubbing or deleting as per the option selected in the <Text strong> Stub/Delete Options</Text> section.<br/>Check <Text strong>Normal</Text> to stub or delete all the emails. <br/>Check <Text>Mail Size Greater Than </Text>to stub or delete those emails which are larger than the specified size. If you check this option, the <Text strong>Email Size</Text> box gets enabled.  Specify the size in KB.   <br/>Check <Text strong>Email Has Attachment</Text> to stub or delete all the emails that have an attachment. 
         </Text>
         <br/>
         <Text>For example, if you want to delete all the emails larger than 1000 KB: </Text>
         <ul>
             <li>Check <Text strong>Delete </Text>in <Text strong> Stub/Delete Email</Text>.  </li>
             <li>Check Email Size Greater Than in Stub/Delete Options.  </li>
             <li>Enter 1000 in <Text strong> Email Size</Text>.  </li>
         </ul>
         <br/>
         <Text>
         Check <Text strong>Enable Offline Access </Text>to enable offline access to archived mails.   
         </Text>
         <br/>
         <Text><Text strong>Offline Access Period:</Text> This feature is deprecated. </Text>
         <Text><Text strong>Exclude Hours: </Text> Check this box if you want to stop archiving when a backup process is running on the exchange server.   During the period specified through the Exclude Hours Start Time and Exclude Hours End Time, the agent stops archiving. Use a 24-hour clock to specify the time.  </Text>
         <Text><Text strong>Exclude Hours Start Time (HH:MM): </Text> Start time for the exclusion period  </Text>
         <Text><Text strong>Exclude Hours End Time (HH:MM):   </Text> End time for the exclusion period Click <Text strong>Save</Text> to add the server or click <Text strong>Cancel</Text> to exit without adding. You can check the list of servers in the <Text strong>Email Server</Text> master page to ensure that the server is added.   </Text>
         </div>
    )

}
function EditEmailServer(){
    return (
        <div style={{  paddingLeft:40,paddingTop:3,display: "flex", justifyContent: "center", flexDirection: "column" }}>
        <Title style={{ color: `${color.Orange}`, padding: "15px 0 0 0px", fontSize: 50 }}>{"Edit Email Server   (Version 6.5)"}</Title>
        <br/>
        <Text type="danger">Insert ScreenShot</Text>
        <br/>
         <Text >To edit a server, click the edit icon  <Text type="danger">Insert ScreenShot</Text> next to it in the <Text strong>Email Server</Text> page. The <Text strong>Edit Email Server </Text>page is displayed.  </Text>
         
         <br />
        
         <Text>You can change the <Text strong>Domain Name, Email Server Name, Exchange Version, Exchange ServicePack, Journal mailbox name, Journal Logon, Journal Password</Text> or the <Text strong>Frequency</Text>. You can enable or disable a server by checking or unchecking the <Text strong>Enable</Text> option. </Text>
         <br/>
        
         <Text>Check <Text strong>Enable</Text> Stub to enable the email stubbing on the Exchange Server.     

         </Text>
         <br/>
         <Text >
         Check <Text strong>Enable Offline</Text> Access to enable offline access of stubbed emails. </Text>
         <br/>
         <Text>
         <Text strong> Exclude Hours:</Text> Check this box if you want to stop archiving when a backup process is running on the exchange server. During the period specified through the Exclude Hours Start Time and Exclude Hours End Time, the agent stops archiving.  If you do not want to interrupt the archival during backup processes on the exchange server, uncheck this box.   
         </Text>
         <br/>
         <Text>
         Use a 24-hour clock to specify the time.   
         </Text>
         <br/>
         <Text>
         <Text strong>Exclude Hours Start Time (HH:MM): </Text>  Start time for the exclusion period   
         </Text>
         <br/>
         <Text>
         <Text strong>Exclude Hours End Time (HH:MM):  </Text> End time for the exclusion period 
         </Text>
         <br/>
         <Text>
         Click Save to edit the server or click Cancel to exit without editing.    
         </Text>
         <br/>
         
         <Text strong>Note: A server may be disabled when it is shut down for maintenance or if it is decided that the emails on the server need not be archived.  </Text>
        
         <br/>
        </div>
    )

}

