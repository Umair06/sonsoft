import React from 'react';
import { Typography } from 'antd';
//import styles from "../../../../../../styles"
import Theme from "../../../../../../Assets/Theme/Theme"
const { Text, Title } = Typography;
const {color} =Theme


function General() {
    return (
        <div style={{  paddingLeft:40,paddingTop:3,display: "flex", justifyContent: "center", flexDirection: "column" }}>
        <Title style={{ color: `${color.Orange}`, padding: "15px 0 0 0px", fontSize: 50 }}>{"General  (Version 6.5)"}</Title>
        <br/>
        <Text type="danger">Insert ScreenShot</Text>
        <br/>
         <Text >The individual panes can be expanded or collapsed as required. Click <Text type="danger">Insert Logo</Text> to expand and <Text type="danger">Insert Logo</Text> to collapse. </Text>
         
         <br />
         <Title style={{ color: `${color.Blue}`, fontSize: 25 }}>{"Temporary File Paths (Version 6.5)"}</Title>
         <br/>
         <Text>The SonaVault application stores some temporary files generated by the system in some location and deletes them when they are not required. The temporary files are stored on the system where SonaVault is installed.Under <Text strong>Temporary Storage Path</Text>, specify folders to store the temporary files generated during archiving in the <Text strong>Archive box</Text> and for files during exporting in the <Text strong>Export box</Text>.  It is recommended to specify two different folders though you can specify the same for both.Click <Text strong>Save</Text> to save the settings or click  <Text strong>Cancel</Text> to exit without saving.  </Text>
         <br/>
         <Text strong>Note: The specified folders must be present on the disk. The SonaVault application does not create the folders.  

         </Text>
         <br/>
         <Title style={{ color: `${color.Blue}`, fontSize: 25 }}>{"Default Role  (Version 6.5)"}</Title>
       
         <Text>
         Whenever an Active Directory is synchronized and new users are found to be registered with SonaVault, the new users get the role specified as the default role in the <Text strong>General</Text> tab of the <Text strong>Configuration</Text> menu.  When the SonaVault Administrator assigns a role through the <Text strong>Role Management</Text> option, the user's role may get changed.
         </Text>
         <br/>
         <ol>
             <li>EAS General User is set as the default role.  To change the default role, select a role from the <Text strong>Role</Text> list.     </li>
             <li>The check box <Text strong> Apply to Existing Users</Text> appears.  </li>
             <li>Check the box if you want all the users currently having the default role to be reassigned to the new default role.  Uncheck if you want only the new users to have the new default role.</li>
             <li>Click Save to save the settings.  </li>
             </ol>
             <Text strong> Note: The default role cannot be EAS Administrator or EAS Auditor. It can be any other role including user-defined roles. Refer to <a href="/#">Role Management</a>. </Text>
         <br/>
         <Title style={{ color: `${color.Blue}`, fontSize: 25 }}>{"Other Settings  (Version 6.5)"}</Title>
         <br/>
         <Text>
         <Text strong>Archive Store Rollover Period for PST Utility.</Text> Emails received or sent prior to the implementation of SonaVault can be archived through the PST utility. To create an archive store for older emails, only the period is considered; not the size of the archive store. For example, if the rollover period is set as 4 months, an archive store is created for every four months of every calendar year. For example, assume that the SonaVault application is implemented on 1st September 2008 and the rollover period is set as 4 months. Three archive stores are created for each calendar year: January-April, May-August, and September-December.   Every email of all the PST files dated before 1st September 2008 is checked for its Sent Date and put in the corresponding archive store. For any email, if an existing archive store is not present, a new store is created. All the PST files on all the configured email servers are checked for the rollover of older emails. Specify the rollover period (in months) based on the expected number of emails present in a year. The rollover period can be one, two, three, four or six months.If you want to archive older emails of a specific period, refer to <a href="/#">Archive Existing Emails</a>.     
         </Text>
         <Text>
         <Text strong>Delete Task Logs older than:</Text> Since logs of the tasks performed through the SonaVault application need not be maintained eternally, the task logs can be deleted after some time.  Specify the period for deletion.For example, if you specify the period as 10 days, all the task logs that are more than 10 days old are deleted.  You can specify the period up to 90 days.      
         </Text>
         <Text>
         <Text strong>Number of Emails per Export file:</Text>  When emails are exported, several emails are exported as a single file.  To keep the export files manageable, you can set a limit to their size by specifying the maximum number of emails a file can contain.For example, if you specify 9000, an export file contains up to 9000 emails.  If the emails to be exported are more than 9000, additional export files are created to accommodate all the emails.  You can have up to 10,000 emails per file.        
         </Text>
         <Text>
         <Text strong>Number of Parallel Export Tasks: </Text> You can limit the number of export tasks that run in parallel.  Up to 5 export tasks can run in parallel.  Emails can be exported in EML, HTML, PST or MSG formats.      
         </Text>
         <Text>
         <Text strong>Keep Export File for:</Text> The export files created with the emails to be exported are stored in an archive server for some time.  Specify the time period (days) for which the file needs to be stored in the Archive Server.  When the time elapses, the file is deleted from the archive server and the download link is removed.  You can keep the export file for a maximum of 60 days.       
         </Text>
         <Text>
         <Text strong>Check if Message already exists before Archiving from Journal Mailbox?:</Text>  If you want the system to check if a message to be archived from journal mailbox is already archived, check this box.  This check helps to avoid duplication of archiving.        
         </Text>
         <Text>
         <Text strong>Notify Retention Expiry before: </Text> Emails are deleted after the expiry date is set in the retention policy.  If you want to receive a notification before the expiry date, specify the period for advance notification. For example, if you specify 10 days as the notification period, you get a notification which shows the list of messages that are going to be deleted in the next 10 days as per the retention policy.        
         </Text>
         <Text>
         <Text strong>Notify if emails are not archived for more than:</Text>  If the Archiving Agent service does not communicate with the Archiving Server or emails are not being archived for a significant amount of time, it could indicate a dysfunctional Archiving Agent service.  In such cases, you can be notified if there is no archival activity for the specified time period.  Specify the period in minutes based on the density of email traffic in your system.  It can be from one minute up to 1440 minutes (one day).       
         </Text>
         <Text>
         <Text strong>Notify if public folder items are not archived for more than: </Text>  Items in public folder are also archived if public folder archiving is enabled on an email server.  <a href="/#">See help on public folder archiving</a>. The Archival System can notify the administrator if there is no archival activity in the public folder for the specified time period.Specify the period in days.<Text strong>Note:</Text> When the retention period expires, the emails get purged if the purge policy is enforced. To override this, purge policy emails can be locked.  
         </Text>
         <Text>
         <Text strong>Maximum number of resend trials:</Text>  If the Archiving Server fails to archive an email for any reason, the Archiving Agent resends the request to the server to archive the email. However, in some cases, the server may not succeed in archiving the email even after repeated trials, for reasons such as corruption of the message, decryption failure, or overload of the server or database. An upper limit can be set on the number of trials the Agent makes in such cases.The limit can be up to 10.  If an email is not archived after the specified number of trials, it is moved from the Inbox to a folder called "FailedtoArchive".        
         </Text>
         <Text>
         <Text strong>Report Error at (HH:mm): </Text>  For events of resending emails in case of archival failure, the application generates separate resend log files. These resend log files help to trace the cause and troubleshoot it.  Every day, at the hour specified in this box, a compressed file of resend log files and the number of emails that could not be archived are sent to the server.  On a certain day, if there are no errors in archiving, no report is sent.        
         </Text>
         <Text>Use a 24-hour clock to specify the time. The default time is 6 p.m. </Text>
         <Text>
         <Text strong>Enable WORM Journaling:</Text>Enable this feature to export all emails to a write-once-read-many (WORM) drive.      
         </Text>

       
         </div>
    )

}
export default General;
