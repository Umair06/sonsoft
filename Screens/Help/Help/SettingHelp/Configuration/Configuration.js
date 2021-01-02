import React, { Component } from 'react';
import { Typography } from 'antd';
// import style from "../../../../../styles";
// import EmailServer from "./EmailServer/EmailServer";
// import ActiveDirectory from "./ActiveDirectory/ActiveDirectory"
// import Deployment from "./Deployment/Deployment";
// import General from "./General/General";
// import OldDomain from "./HistoricDomain/HistoricDomain"

import Theme from "../../../../../Assets/Theme/Theme"
import settingconfiguration1 from "../../../../../Assets/ScreenShots/settingconfiguration1.PNG"
import settingconfiguration2 from "../../../../../Assets/ScreenShots/settingconfiguration2.PNG"
import settingconfiguration3 from "../../../../../Assets/ScreenShots/settingconfiguration3.PNG"
import settingconfiguration4 from "../../../../../Assets/ScreenShots/settingconfiguration4.PNG"
import settingconfiguration5 from "../../../../../Assets/ScreenShots/settingconfiguration5.PNG"
import settingconfiguration6 from "../../../../../Assets/ScreenShots/settingconfiguration6.PNG"
import settingconfiguration7 from "../../../../../Assets/ScreenShots/settingconfiguration7.PNG"
import settingconfiguration8 from "../../../../../Assets/ScreenShots/settingconfiguration8.PNG"
import settingconfiguration9 from "../../../../../Assets/ScreenShots/settingconfiguration9.PNG"
import settingconfiguration10 from "../../../../../Assets/ScreenShots/settingconfiguration10.PNG"
import settingconfiguration11 from "../../../../../Assets/ScreenShots/settingconfiguration11.PNG"
import settingconfiguration12 from "../../../../../Assets/ScreenShots/settingconfiguration12.PNG"
import settingconfiguration13 from "../../../../../Assets/ScreenShots/settingconfiguration13.PNG"
import settingconfiguration14 from "../../../../../Assets/ScreenShots/settingconfiguration14.PNG"
import settingconfiguration15 from "../../../../../Assets/ScreenShots/settingconfiguration15.PNG"
import settingconfiguration16 from "../../../../../Assets/ScreenShots/settingconfiguration16.PNG"
import settingconfiguration17 from "../../../../../Assets/ScreenShots/settingconfiguration17.PNG"
import settingconfiguration18 from "../../../../../Assets/ScreenShots/settingconfiguration18.PNG"
import settingconfiguration19 from "../../../../../Assets/ScreenShots/settingconfiguration19.PNG"
import settingconfiguration20 from "../../../../../Assets/ScreenShots/settingconfiguration20.PNG"
import settingconfiguration21 from "../../../../../Assets/ScreenShots/settingconfiguration21.PNG"
import settingconfiguration22 from "../../../../../Assets/ScreenShots/settingconfiguration22.PNG"
import settingconfiguration23 from "../../../../../Assets/ScreenShots/settingconfiguration23.PNG"
import settingconfiguration24 from "../../../../../Assets/ScreenShots/settingconfiguration24.PNG"
import settingconfiguration25 from "../../../../../Assets/ScreenShots/settingconfiguration25.PNG"
import settingconfiguration26 from "../../../../../Assets/ScreenShots/settingconfiguration26.PNG"
import settingconfiguration27 from "../../../../../Assets/ScreenShots/settingconfiguration27.PNG"
import settingconfiguration28 from "../../../../../Assets/ScreenShots/settingconfiguration28.PNG"
import settingconfiguration29 from "../../../../../Assets/ScreenShots/settingconfiguration29.PNG"
import settingconfiguration30 from "../../../../../Assets/ScreenShots/settingconfiguration30.PNG"
import settingconfiguration31 from "../../../../../Assets/ScreenShots/settingconfiguration31.PNG"
import settingconfiguration32 from "../../../../../Assets/ScreenShots/settingconfiguration32.PNG"
import settingconfiguration33 from "../../../../../Assets/ScreenShots/settingconfiguration33.PNG"
import settingconfiguration34 from "../../../../../Assets/ScreenShots/settingconfiguration34.PNG"
import settingconfiguration35 from "../../../../../Assets/ScreenShots/settingconfiguration35.PNG"
import settingconfiguration36 from "../../../../../Assets/ScreenShots/settingconfiguration36.PNG"
import settingconfiguration37 from "../../../../../Assets/ScreenShots/settingconfiguration37.PNG"
import settingconfiguration38 from "../../../../../Assets/ScreenShots/settingconfiguration38.PNG"
import settingconfiguration39 from "../../../../../Assets/ScreenShots/settingconfiguration39.PNG"
import settingconfiguration40 from "../../../../../Assets/ScreenShots/settingconfiguration40.PNG"
import settingconfiguration41 from "../../../../../Assets/ScreenShots/settingconfiguration41.PNG"
import settingconfiguration42 from "../../../../../Assets/ScreenShots/settingconfiguration42.PNG"
import settingconfiguration43 from "../../../../../Assets/ScreenShots/settingconfiguration43.PNG"
import settingconfiguration44 from "../../../../../Assets/ScreenShots/settingconfiguration44.PNG"
import settingconfiguration45 from "../../../../../Assets/ScreenShots/settingconfiguration45.PNG"
import settingconfiguration46 from "../../../../../Assets/ScreenShots/settingconfiguration46.PNG"
import settingconfiguration47 from "../../../../../Assets/ScreenShots/settingconfiguration47.PNG"
import settingconfiguration48 from "../../../../../Assets/ScreenShots/settingconfiguration48.PNG"
import settingconfiguration49 from "../../../../../Assets/ScreenShots/settingconfiguration49.PNG"
import settingconfiguration50 from "../../../../../Assets/ScreenShots/settingconfiguration50.PNG"
import settingconfiguration51 from "../../../../../Assets/ScreenShots/settingconfiguration51.PNG"
import settingconfiguration52 from "../../../../../Assets/ScreenShots/settingconfiguration52.PNG"
import settingconfiguration53 from "../../../../../Assets/ScreenShots/settingconfiguration53.PNG"
import settingconfiguration54 from "../../../../../Assets/ScreenShots/settingconfiguration54.PNG"
import settingconfiguration55 from "../../../../../Assets/ScreenShots/settingconfiguration55.PNG"
import settingconfiguration56 from "../../../../../Assets/ScreenShots/settingconfiguration56.PNG"
import settingconfiguration57 from "../../../../../Assets/ScreenShots/settingconfiguration57.PNG"
import settingconfiguration58 from "../../../../../Assets/ScreenShots/settingconfiguration58.PNG"
import settingconfiguration59 from "../../../../../Assets/ScreenShots/settingconfiguration59.PNG"
import settingconfiguration60 from "../../../../../Assets/ScreenShots/settingconfiguration60.PNG"
import settingconfiguration61 from "../../../../../Assets/ScreenShots/settingconfiguration61.PNG"

import configurationIcon from "../../../../../Assets/icons/SV_ICONS/Configuration_Blue.png"
import deploymentIcon from "../../../../../Assets/icons/SV_ICONS/Deployment Settings_Blue.png"
import activeDirectoryIcon from "../../../../../Assets/icons/SV_ICONS/ActiveDirectory_Blue.png"
import editIcon from "../../../../../Assets/icons/SV_ICONS/Edit_Orange.png"
import addIcon from "../../../../../Assets/icons/SV_ICONS/Add_Orange.png"
import emailServerIcon from "../../../../../Assets/icons/SV_ICONS/Email Archive_Blue7.png"
import binIcon from "../../../../../Assets/icons/SV_ICONS/Orange Delete.png"
import columnIcon from "../../../../../Assets/icons/SV_ICONS/Columns_Blue.png"
// const { SubMenu } = Menu;
const { Text, Title } = Typography;
const { color } = Theme
// const { TabPane } = Tabs;
// const {color} = Theme

class Configuration extends Component {
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
                <Title style={{ color: `${color.Orange}`, padding: "15px 0 0 0px", fontSize: 50 }}>{"Configuration "}</Title>

                <Text>
				Configuration presents a dashboard view with the details of General, Deployment, Active Directory, Emails Server and Historic Domain of the system.
               </Text>
              <ol>
                  <li>Select the Configuration icon <img alt='' src={configurationIcon} width="50px" height="auto"/>  from the left pane. It presents a dashboard view with the details of General, Deployment, Active Directory, Emails Server and Historic Domain of the system.
                  <br/>
                  <br/>
                  <img alt='' src={settingconfiguration1}/>
                  <br/>
                  <br/>
                   </li>
              </ol>
				 
            </div>
           <General/>
           <Deployment/>
           <ActiveDirectory/>
           <EmailServer/>
           <HistoricDomain/>
        </div>
        )
    }

}

export default Configuration;
function General(){
    return(
        <div>
            <div style={{ paddingLeft: 40, paddingTop: 3, display: "flex", justifyContent: "center", flexDirection: "column" }}>
                <Title style={{ color: `${color.Blue}`, fontSize: 25 }}>{"General "}</Title>
                
               <ol>
                   <li>
                   Select the General icon <img alt='' src={configurationIcon} width="50px" height="auto"/>  from the Configuration menu. 
                   <br/>
                  <br/>
                  <img alt='' src={settingconfiguration2}/>
                  <br/>
                  <br/>
                  <Text>The page displays the following summary: </Text>
                  <br/>
                  <br/>
                  <img alt='' src={settingconfiguration3}/>
                  <br/>
                  <br/>
                  <Text><Text strong>Temporary Storage Path:</Text> The SonaVault application stores some temporary files generated by the system in some location and deletes them when they are not required. The temporary files are stored on the system where SonaVault is installed. </Text>
				<ul>
                    <li><Text strong>Archive:</Text> Under Temporary Storage Path, specify folders to store the temporary files generated during archiving in the Archive box. </li>
                    <li><Text strong>Export:</Text> Under Temporary Storage Path, specify folders to store the temporary files generated during exporting in the Export box.  It is recommended to specify two different folders though you can specify the same for both.  </li>
                </ul>
                   </li>
                   <li>
                   Select <Text strong>Save </Text>to save the settings or select <Text strong>Cancel</Text> to exit without saving. 
                   <br/>
                  <br/>
                  <img alt='' src={settingconfiguration4}/>
                  <br/>
                  <br/>
                  

                   </li>
               </ol>
               <strong>Note: The specified folders must be present on the disk. The SonaVault application does not create the folders. </strong>
                  <Text><strong>Default Role Settings: </strong>Whenever an Active Directory is synchronized and new users are found to be registered with SonaVault, the new users get the role specified as the default role in the General tab of the Configuration menu.  When the SonaVault Administrator assigns a role through the Role Management option, the user's role may get changed.</Text>
                  <ol>
                  <br/>
                  <br/>
                  <img alt='' src={settingconfiguration5} />
                  <br/>
                  <br/>
                  </ol>
            <ol>
                <li>
                <Text strong>EAS General User</Text> is set as the default role.  To change the default role, select a role from the <Text strong>Role </Text>list.  
                <br/>
                  <br/>
                  <img alt='' src={settingconfiguration6}/>
                  <br/>
                  <br/>  
                </li>
                <li>
                The check box <Text strong>Apply to Existing Users</Text> appears.
                <br/>
                  <br/>
                  <img alt='' src={settingconfiguration7}/>
                  <br/>
                  <br/>  
                </li>
                <li>
                Check the box if you want all the users currently having the default role to be reassigned to the new default role.  Uncheck if you want only the new users to have the new default role.  
                <br/>
                  <br/>
                  <img alt='' src={settingconfiguration8}/>
                  <br/>
                  <br/>  
                </li>
                <li>
                Select <Text strong>Save</Text> to save the settings.  
                <br/>
                  <br/>
                  <img alt='' src={settingconfiguration9}/>
                  <br/>
                  <br/>  
                </li>
            </ol>
            <Text strong>Other Settings</Text>
            <ol>
            <br/>
            <br/>
            <img alt='' src={settingconfiguration10}  />
            <br/>
            <br/>
            </ol>
            <Text>The page displays the following summary: </Text>
            <ul style={{listStyle: "none"}}>
              <li><Text strong>Delete Task Logs older than:</Text> Since logs of the tasks performed through the SonaVault application need not be maintained forever, the task logs can be deleted after some time. Specify the period for deletion.   
              <br/>
              For example, if you specify the period as 10 days, all the task logs that are more than 10 days old are deleted.  You can specify the period up to 90 days.
              <br/>
              <br/>
              <img alt='' src={settingconfiguration11}/>
              <br/>
              <br/>
              </li>
              <li><Text strong>Number of Emails per Export file:</Text> When emails are exported, several emails are exported as a single file.  To keep the export files manageable, you can set a limit to their size by specifying the maximum number of emails a file can contain.     
              <br/>
              For example, if you specify 9000, an export file contains up to 9000 emails.  If the emails to be exported are more than 9000, additional export files are created to accommodate all the emails.  You can have up to 10,000 emails per file. 
              <br/>
              <br/>
              <img alt='' src={settingconfiguration12}/>
              <br/>
              <br/>
              </li>
              <li><Text strong>Export/Forward Folder Size:</Text> You can limit the folder size of exported or forwarded emails. The file size can be up to 1024 MB.   
              
              <br/>
              <br/>
              <img alt='' src={settingconfiguration13}/>
              <br/>
              <br/>
              </li>
              <li><Text strong>Number of Parallel Export Tasks:</Text> You can limit the number of export tasks that run in parallel.  Up to 5 export tasks can run in parallel.  Emails can be exported in EML, HTML, PST or MSG formats. 
              
              <br/>
              <br/>
              <img alt='' src={settingconfiguration14}/>
              <br/>
              <br/>
              </li>
              <li><Text strong>Keep Export File for:</Text> The export files created with the emails to be exported are stored in an archive server for some time.  Specify the time period (days) for which the file needs to be stored in the Archive Server.  When the time elapses, the file is deleted from the archive server and the download link is removed.  You can keep the export file for a maximum of 60 days.  
              <br/>
              <Text>Check if Message already exists before Archiving from Journal Mailbox?:  If you want the system to check if a message to be archived from journal mailbox is already archived, check this box.  This check helps to avoid duplication of archiving.  </Text> 
              
              <br/>
              <br/>
              <img alt='' src={settingconfiguration15}/>
              <br/>
              <br/>
              </li>
              <li><Text strong>Notify Retention Expiry before:</Text> Emails are deleted after the expiry date set in the retention policy.  If you want to receive a notification before the expiry date, specify the period for advance notification.   
              <br/>
              <Text>For example, if you specify 10 days as the notification period, you get a notification which shows the list of messages that are going to be deleted in the next 10 days as per the retention policy.   </Text> 
              
              <br/>
              <br/>
              <img alt='' src={settingconfiguration16}/>
              <br/>
              <br/>
              </li>
              <li><Text strong>Notify if emails are not archived for more than:</Text> If the Archiving Agent service does not communicate with the Archiving Server or emails are not being archived for a significant amount of time, it could indicate a dysfunctional Archiving Agent service.  In such cases, you can be notified if there is no archival activity for the specified time period.  Specify the period in minutes based on the density of email traffic in your system.  It can be from one minute up to 1440 minutes (one day). 
             
              <br/>
              <br/>
              <img alt='' src={settingconfiguration17}/>
              <br/>
              <br/>
              </li>
              <li><Text strong>Notify if public folder items are not archived for more than: </Text>  Items in public folder are also archived if public folder archiving is enabled on an email server.  See help on public folder archiving.  The Archival System can notify the administrator if there is no archival activity in the public folder for the specified time period.  Specify the period in days.  
             
              <br/>
              <br/>
              <img alt='' src={settingconfiguration18}/>
              <br/>
              <br/>
              <strong>Note: When the retention period expires, the emails get purged if the purge policy is enforced. To override this purge policy emails can be locked.  </strong>
              </li>
              <li><Text strong>Report Error at (HH:MM):  </Text>  For events of resending emails in case of archival failure, the application generates separate resend log files. These resend log files help to trace the cause and troubleshoot it.  Every day, at the hour specified in this box, a compressed file of resend log files and the number of emails that could not be archived are sent to the server.  On a certain day, if there are no errors in archiving no report is sent.  
              <br/>
              <Text>Use a 24-hour clock to specify the time. The default time is 6 p.m.  </Text>
             
              <br/>
              <br/>
              <img alt='' src={settingconfiguration19}/>
              <br/>
              <br/>
              
              </li>
              <li><Text strong>Enable WORM Journaling:  </Text> Enable this feature to export all emails to a write-once-read-many (WORM) drive. 
              
             
              <br/>
              <br/>
              <img alt='' src={settingconfiguration20}/>
              <br/>
              <br/>
              
              </li>

            </ul>
               
            </div>
           
        </div>
    );
}
function Deployment(){
    return(
        <div>
            <div style={{ paddingLeft: 40, paddingTop: 3, display: "flex", justifyContent: "center", flexDirection: "column" }}>
                <Title style={{ color: `${color.Blue}`, fontSize: 25 }}>{"Deployment"}</Title>
                <ol>
                    
                    <li>To configure the SonaVault deployment, select the Deployment icon <img alt='' src={deploymentIcon} width="50px" height="auto"/> from the Configuration menu.
                    <br/>
              <br/>
              <img alt='' src={settingconfiguration21}/>
              <br/>
              <br/>
              <Text>
              If your company has offices in multiple sites or locations, you have a choice to archive the emails at different locations separately or archive them centrally. SonaVault is deployed based on this choice.  
              </Text>
              <br/>
              <strong>Note: If you have a setup for Central Archiving of emails, do not change any configuration setting. By default, the application is configured for Central Archiving deployment.  </strong>
                    </li>
                </ol>
                <Text strong> Central Archiving  </Text>
                <br/>
                <br/>
                <Text>In a central archiving deployment, the archiving server is deployed at a single site and the archiving agents are deployed at all the locations. All the emails are collected and are archived at one site. This central location has an archive database and a master database. The configuration information is stored in the master database and archived emails are stored in the archive database. The agents in multiple locations access the central archive for search and archival operations.   </Text>
                <br/>
                <br/>
                <Text>You can opt for central archiving if the volume of the emails is not very large and the people whose emails are archived access their emails from a single site. Search can be faster if emails are stored locally.   </Text>
                <ol>
                <br/>
                <br/>
                <img alt='' src={settingconfiguration22} style={{marginLeft:"450px"}}/>
                <br/>
                <br/>
                </ol>
                <Text strong>Multi Archiving   </Text>
                <br/>
                <br/>
                <Text>In a multi-archiving deployment, the archiving servers as well as archiving agents, are deployed in each site. Archiving happens at all the sites. All the archiving servers are connected with one another so that emails can be searched across all the databases. The general users need not know whether the archiving is done centrally or locally; they need not specify the location during any search operation.     </Text>
                <br/>
                <br/>
                <Text>You can deploy a multisite archival system in a single geographical site. The SonaVault servers should be installed on different hosts.  </Text>
                <br/>
                <Text>You can opt for multiple-site archiving if people access their emails from more than one location. Emails can be archived, searched, and retrieved from all the locations. If the number of mailboxes and the number of emails is large, multisite archival can be more efficient.   </Text>
              <ol>
                <br/>
                <br/>
                <img alt='' src={settingconfiguration23} style={{marginLeft:"450px"}}/>
                <br/>
                <br/>
                </ol>
                <ol style={{listStyle:"none"}}>
                <li><Text><Text strong>Site Prefix:</Text>Enter a three-letter code (or name) to identify the site. This code is used as a prefix while naming the archive databases to identify the site. The name should be unique. Only letters are allowed. For example, SNS.   </Text>  </li>
                <li><Text strong>Archival Topology:</Text> Check Central Archive or Multi Archive. The default archiving is central archiving. 
                <br/>
                <br/>
                <img alt='' src={settingconfiguration24}/>
                <br/>
                <br/>
                 </li>
                </ol>             
               <Text strong>Add Sites   </Text>
               <ol>
                   <li>Enter the site URL. Site URL is the identification of the server on which the SonaVault server is installed in that site.</li>
                   <li>If authentication is required to access the specified URL, check the <Text strong>Authentication Required</Text> box. This helps in preventing unauthorized access to the site.  It is recommended to enable Windows authentication for SonaVault on the IIS.   </li>
                   <li>Enter the username including the domain name. For example, <Text strong>CAL\easadmin</Text>.      </li>
                   <li>Enter the password.         </li>
                   <li>Select  <Text strong>Add</Text>.            </li>
               </ol>
               <Text strong>
               Notes  
               </Text>
               <ul>
                   <li><Text strong>Prefix for each site where SonaVault is installed should be unique.  </Text> </li>
                   <li><Text strong>Apart from the specified users, local users with Admin powers on the system where SonaVault is installed are also authorized to access the specified URL.  For login, enter </Text>hostname\username <Text strong>or</Text> IPaddress\username <Text strong>and the password</Text>.  </li>
                   <Text>The software verifies the connectivity to the specified site before adding the site.  The added site gets displayed in the site list.   </Text>
                   <br/>
                   <Text>If you choose Multi Archive as the archival topology, add the other sites by following the same steps.   </Text>
               </ul>
               <ol>
                   <li>Select <Text strong>Save</Text> to save the deployment setting or select <Text strong>Cancel</Text> to exit without saving.
                   <br/>
                <br/>
                <img alt='' src={settingconfiguration25}/>
                <br/>
                <br/>
                   
                    </li>
                   <li>Select the <Text strong> Remove</Text>  icon present next to a site name to delete it from the archival plan.
                  
                   
                    </li>
               </ol>
            </div>
           
        </div>
    );
}
function ActiveDirectory(){
    return(
        <div>
            <div style={{ paddingLeft: 40, paddingTop: 3, display: "flex", justifyContent: "center", flexDirection: "column" }}>
                <Title style={{ color: `${color.Blue}`, fontSize: 25 }}>{"Active Directory "}</Title>
                <br/>
                <Text>SonaVault supports the Windows Active Directory (AD).    </Text>
                <br/>
                <Text>SonaVault supports multiple domains and multiple Active Directories. The integration with the Active Directory is used for authenticating the users. All the users who have an account in the Active Directory automatically get added as the users of the SonaVault application with the default role and can sign in with their domain login ID and password.    </Text>
                <br/>
                <Text>The security groups and distribution groups defined in the Ads are recognized by SonaVault.  When SonaVault synchronizes with an AD, data about these groups is also synchronized.   </Text>
                <br/>
                <Text>To configure the Active Directory (AD) settings: </Text>
                <ol>
                    <li>Select the Active Directory icon <img alt='' src={activeDirectoryIcon} width="50px" height="auto"/> from the Configuration menu. 
                    <br/>
                <br/>
                <img alt='' src={settingconfiguration26}/>
                <br/>
                <br/>
                <Text>The AD page displays the configured ADs and their status.  </Text>

                     </li>
                     <li>Enter the details as described as below: 
                    <br/>
                <br/>
                <img alt='' src={settingconfiguration27}/>
                <br/>
                <br/>
                <Text>The AD page displays the configured ADs and their status.  </Text>
                <br/>
                <br/>
                <Text strong>Domain:</Text>
                <br/>
                <br/>
                <Text>
                Domain in which SonaVault is installed: You can provide the domain name, IP address or host name of the system. 
                <br/>
                Domain in which SonaVault is not installed:  You can provide IP address or host name of the system. 
                <br/>
                Specify the username and password to log into the AD server. User authentication is done at the AD server. 
                </Text>
                <br/>
                <br/>
                <Text strong>User Name:  </Text>
                <br/>
                <br/>
                <Text>
                Enter the user name having administrative privileges to access the Active Directory. 
                
                </Text>
                <br/>
                <br/>
                <Text strong>Password:   </Text>
                <br/>
                <br/>
                <Text>
                Enter the password of the above user. 
                
                </Text>
                <br/>
                <br/>
                <Text strong>Sync Status:    </Text>
                <br/>
                <br/>
                <Text>
                Check the box next to an existing AD and select <Text strong>Enable Sync</Text> to enable synchronization on the AD or select <Text strong>Disable Sync </Text>to disable synchronization on the AD.  A tick mark indicates that sync is enabled, and a cross mark indicates that sync is disabled. Synchronization takes place immediately when sync is enabled on an AD on which sync was previously disabled or an AD is added or edited with synchronization enabled.  
                
                </Text>
                <br/>
                <br/>
        </li>
                     <li>
                     Select <Text strong>Save</Text> to save the AD settings or select <Text strong>Cancel</Text> to exit without saving. 
                     </li>
                </ol>
                <Text>The AD Setting tab displays the configured ADs and their status.  </Text>
                <ul>
                    <li>Select <Text strong>Add</Text> to add a new AD. See <Text strong>Add an Active Directory</Text> </li>
                    <li>Select the edit icon <img alt='' src={editIcon} width="50px" height="auto"/> to edit the user name or password. See Edit an Active Directory.   </li>
                    <li>Select <Text strong>Delete</Text> to delete an AD from the archival system. If you delete an AD, the domain does not get disabled.  </li>
                </ul>
                <Text strong>Note:  If you delete an AD it gets permanently deleted, and all the users on the AD get deleted. If an AD is associated with an email server, the AD cannot be deleted. </Text>
                <ul>
                    <li>Check the box next to an existing AD and select <Text strong>Enable Sync</Text> to enable synchronization on the AD or select <Text strong>Disable Sync</Text> to disable synchronization on the AD. A tick mark indicates that sync is enabled, and a cross mark indicates that sync is disabled.</li>
                </ul>
                <Text strong>Note: Synchronization takes place immediately when sync is enabled on an AD on which sync was previously disabled or an AD is added or edited with synchronization enabled.  </Text>
                <br/>
                <br/>
                <Text strong>Add an Active Directory   </Text>
                <ol>
                    <li>Select Add icon <img alt='' src={addIcon} width="50px" height="auto"/> located at the top right corner of the Active Directory page.
                    <br/>
                    <br/>
                    <img alt='' src={settingconfiguration28}/>
                    <br/>
                    <br/>
                    <Text>An <Text strong>Add AD Setting</Text> side-drawer is opened.</Text>
                    <br/>
                    <br/>
                    <img alt='' src={settingconfiguration29}/>
                    <br/>
                    <br/>
                    <Text>Enter the domain name, username, and password.</Text>
                    <br/>
                    <br/>
                    <img alt='' src={settingconfiguration30}/>
                    <br/>
                    <br/>
                    <Text>Enable synchronization.  If you want to disable it, uncheck the box.</Text>
                    <br/>
                    <br/>
                    <img alt='' src={settingconfiguration31}/>
                    <br/>
                    <br/>
                    <Text>When you enable synchronization, it is not necessary to synchronize all the OUs. If you want to synchronize all the OUs, check <Text strong>All</Text> in <Text strong>Discover Organizational Unit</Text>. </Text>
                    <br/>
                    <br/>
                    <img alt='' src={settingconfiguration32}/>
                    <br/>
                    <br/>
                    <Text>If you want to synchronize only a few OUs, check <Text strong>Selected</Text> in<Text strong>Discover Organizational Unit</Text>. When you check <Text strong>Selected</Text>, the OUs in the specified AD are displayed in a tree structure.  Check the OUs that should be synchronized. The AD setting also synchronizes the users from the container.    </Text>
                    <br/>
                    <br/>
                    <img alt='' src={settingconfiguration33}/>
                    <br/>
                    <br/>
                    <Text>Check <Text strong>Azure</Text>. A new <Text strong>Application Client ID</Text> box will appear. Fill the box.  </Text>
                    <br/>
                    <br/>
                    <img alt='' src={settingconfiguration34}/>
                    <br/>
                    <br/>
                    <Text>Select <Text strong>Save</Text> to save the settings or select <Text strong>Cancel</Text> to exit without saving.     </Text>
                    <br/>
                    <br/>
                    <img alt='' src={settingconfiguration35}/>
                    <br/>
                    <br/>
                    <Text strong> Notes</Text>
                    <ul>
                        <li><Text strong>If the Archive Server is installed in an MSP model, the ALL option for Discover Organizational Unit is disabled.</Text></li>
                        <li><Text strong>The synchronization is done daily.  If you do not require a daily synchronization on an AD, you can disable synchronization on the AD and synchronize manually, whenever required, by enabling sync on the AD.</Text></li>
                    </ul>
                    </li>
                    
                </ol>
                <Text strong>Edit an Active Directory </Text>
                <ol>
                    <li>Select the <Text strong>Edit</Text> icon <img alt='' src={editIcon} width="50px" height="auto"/> located along with the Domain and User Name.
                    <br/>
                    <br/>
                    <img alt='' src={settingconfiguration36}/>
                    <br/>
                    <br/> 
                    </li>
                    <li>The current setting details are displayed. 
                        <br/>
                    <br/>
                    <img alt='' src={settingconfiguration37}/>
                    <br/>
                    <br/> 
                    </li>
                    <li>Make the required changes.   
                      
                    </li>
                    <li>Select <Text strong>Save</Text> to save the changes or select<Text strong> Cancel </Text>to exit without saving. 
                    <br/>
                    <br/>
                    <img alt='' src={settingconfiguration38}/>
                    <br/>
                    <br/> 
                    <Text strong>Note: The synchronization is done daily.  If you do not require a daily synchronization on an AD, you can disable synchronization on the AD and synchronize manually, whenever required, by enabling sync on the AD.  </Text>
                    </li>
                </ol>
                <Text strong>Delete an Active Directory </Text>
                <ol>
                    <li>Select the Delete icon <img alt='' src={binIcon} width="50px" height="auto"/> to delete an AD from the archival system. If you delete an AD, the domain does not get disabled.  
                    <br/>
                    <br/>
                    <img alt='' src={settingconfiguration39}/>
                    <br/>
                    <br/> 
                    <Text strong> Notes  </Text>
                    <ul>
                        <li>
                            <Text strong>If you delete an AD it gets permanently deleted, and all the users on the AD get deleted.  </Text>
                        </li>
                        <li>
                            <Text strong>If an AD is associated with an email server, the AD cannot be deleted.   </Text>
                        </li>
                    </ul>
                    </li>
                </ol>
                
                
            </div>
           
        </div>
    );
}
function EmailServer(){
    return(
        <div>
            <div style={{ paddingLeft: 40, paddingTop: 3, display: "flex", justifyContent: "center", flexDirection: "column" }}>
                <Title style={{ color: `${color.Blue}`, fontSize: 25 }}>{"Email Server "}</Title>
                <Text>In an organization with many people, generally, it may not be necessary to archive the emails of all the people. Careful planning is required to decide the emails to be archived.  </Text>
                <br/>
                <Text strong>Journaling </Text>
                <br/>
                <Text>Journaling refers to recording the communication (emails) whereas archiving refers to storing the emails without having to back up. The Exchange Server's journaling feature uses the journal mailbox to store a copy of each email that passes through the server. When an email is sent, a copy is sent to the journal mailbox before it is sent to the recipient. This prevents loss of email and ensures authenticity. </Text>
                <br/>
                <Text strong>SonaVault Agent </Text>
                <br/>
                <Text>The SonaVault agent copies the emails from journal mailbox and saves them to a temporary folder called 'EMLFolder' on the SonaVault Server. A SonaVault process archives those emails from the EMLFolder and deletes them from the folder. The emails on the Journal Mailbox are deleted after they have been archived.</Text>
                <br/>
                <Text>Each email server has a single journal mailbox. Access to the journal is granted after an authorized login. A user name is given to authorized users. Each mailbox is associated with a journal. The SonaVault Agent periodically checks (polls) the journal mailbox for new emails. Each email server should have a SonaVault Agent installed on it. </Text>
                <br/>
                <Text>Journals and SonaVault Agents should have unique, easily identifiable names. The names help in identifying the emails easily. </Text>
                <br/>
                <Text strong>Note: SonaVault supports only Microsoft Exchange Servers</Text>
                <br/>
                <Text>Archival can be stopped when a backup process is running on the exchange server. During the period specified through the Exclude Hours Start Time and Exclude Hours End Time, the agent stops archiving. </Text>
                <br/>
                <Text>The period after which the contents of an email are deleted from the Exchange Server and the email is linked to the archive server to fetch the email is called the stub period. </Text>
                <br/>
                <Text strong>Configure Email Servers: </Text>
                <ol>
                    <li>Select the Email Server icon  <img alt='' src={emailServerIcon} width="50px" height="auto"/> from the Configuration menu.
                    <br/>
                    <br/>
                    <img alt='' src={settingconfiguration40}/>
                    <br/>
                    <br/> 
                    <Text>Now you can see the list of the email servers that are being monitored for email archival. You can add new servers for archiving and enable or disable archiving on any server.  </Text>
                    <br/>
                    <br/>
                    <img alt='' src={settingconfiguration41}/>
                    <br/>
                    <br/> 
                    </li>
                </ol>
                <Text strong>Add New Email Servers</Text>
                <ol>
                    <li>
                    To add a server, select Add Server icon <img alt='' src={addIcon} width="50px" height="auto"/>  in the Email Server page.
                    <br/>
                    <br/>
                    <img alt='' src={settingconfiguration42}/>
                    <br/>
                    <br/>
                    </li>
                    <li>
                    An <Text strong>Add Email Server </Text>side-drawer appears, where you should enter the details as described below:  
                    <br/>
                    <br/>
                    <img alt='' src={settingconfiguration43}/>
                    <br/>
                    <br/>
                    <ol type="i">
                        <li><Text strong>Domain Name:</Text> Select the domain name to which the server belongs. The list of domain names is shown as per the Active Directories configured. For details, see Configuring the Active Directories.  </li>
                        <li><Text strong>Email Server: </Text> Enter the domain name and name of the email server from which the emails are sent or received in the organization.   </li>
                        <li><Text strong>Exchange Version: </Text> The version of the Exchange Server currently installed.     </li>
                        <li><Text strong>Exchange ServicePack:  </Text> The version of the ServicePack currently installed.     </li>
                        <li><Text strong>Journal Mailbox:   </Text>  Enter the name of the journal mailbox in the Exchange Server. This was created during the initial setup of SonaVault.       </li>
                        <li><Text strong>Journal Logon:   </Text>  Enter the user name to access the journal mailbox.         </li>
                        <li><Text strong>Journal Password:   </Text>   Enter the journal logon password to access the journal mailbox.   
The journal logon and password are used by the archiving agent service to archive the emails from journal mailbox. The archiving agent service runs on the local service account. It requires the credentials to acquire full privileges to access the journal mailbox for archiving.          </li>
<li><Text strong>Frequency:   </Text>   Enter the poll frequency in seconds. The SonaVault application keeps checking the journal mailbox for new email at regular intervals. This interval is referred to as poll frequency. For example, if the poll frequency is 30 seconds, the application checks the journal mailbox every 30 seconds.   
Even though an email server is configured in the SonaVault application for archiving, archiving of the emails from a server can be stopped or resumed as per the need. When an email server is disabled, the corresponding journal mailbox is not polled for emails and those emails are not archived. By default, when a server is added, it is in the enabled status. You can enable or disable a server by checking or unchecking the <Text strong>Enable </Text>option.          </li>
<li><Text strong>Archive Public Folder:   </Text>   A public folder is maintained on the Exchange Server to share information across all the users.  Users can access the emails in this folder and post to the public folder. The public folder may contain items such as posts, notes or general emails, which do not belong to any specific user.  Unlike other folders of the Exchange Server, the original emails or posts and their different versions available in the public folder get archived. Check this option if you want to archive the public folder.
<Text strong>Public Folder Poll Frequency:  </Text>
<br/>
                    <br/>
                    <img alt='' src={settingconfiguration44}/>
                    <br/>
                    <br/>
                    <Text>The SonaVault application checks at regular intervals the folders to be archived.  Since the email traffic is less dense in the public folder compared to the journal mailboxes, the polling is done less frequently. <Text strong>Public Folder Poll Frequency</Text> refers to the polling frequency used for the public folder.   
</Text>
<br/>
<Text>Enter the frequency in minutes. Polling frequency for the public folder is specified in minutes whereas that for the journal mailboxes is specified in seconds.  </Text>

</li>
<li>Check <Text strong>Enable Stub</Text> enable email stubbing on the Exchange Server. Refer to Stub Policy for more details.   
<br/>
                    <br/>
                    <img alt='' src={settingconfiguration45}/>
                    <br/>
                    <br/>

</li>
<li>
    <Text strong>Stub Period:</Text>The period after which the contents of an email are removed from the Exchange Server and linked to the archive server to fetch an email is called the stub period. Stub period is set in days. The maximum is 9999 days, the minimum is 0, and the default value is 0 days. Refer to Stub Policy for more details.
    <br/>
                    <br/>
                    <img alt='' src={settingconfiguration46}/>
                    <br/>
                    <br/>
                    <Text>If you do not want to give stub facility to any user, do not enable stub.  </Text>
                    <br/>
                    <Text>If you want to give stub facility only to a select few, enable stubbing, specify the stub period as zero, and define stub policies such that the few selected users get stub facility.  Define stub policies to set the necessary stub period for the selected user or mailbox.   </Text>
                    <br/>
                    <Text>If you want to give stub facility to all users, enable stubbing, specify a stub period that works for all the users, and define stub policies for those users who need different stub periods.   </Text>
                    <br/>
                    <Text>If you want to give the same stub facility to all the mailboxes or users, enable stubbing and specify a stub period; do not define any stub policies.   </Text>
                    <br/>

                    <Text strong>Stub/Delete Email:</Text>
                    <br/>
                    <br/>
                    <img alt='' src={settingconfiguration47}/>
                    <br/>
                    <br/>
                    <ul>
                        <li>Check <Text strong>Stub</Text> to stub the emails. </li>
                        <li>Check <Text strong>Delete </Text>  to permanently delete the emails from the Exchange Server.</li>
                        <li>Check <Text strong> Stub Only Attachment  </Text>  to stub only the attachments of an email. The body of the email remains on the Exchange Server. If <Text strong>Stub Only Attachment</Text> is checked, emails without attachment do not get stubbed. Stub or delete options related to mail size are disabled. </li>
                    </ul>
                    <br/>
                    <Text><Text strong>Stub/Delete Options: </Text> Emails are selected for stubbing or deleting as per the option selected in the Stub/Delete Options section.  </Text>
                    <br/>
                    <br/>
                    <img alt='' src={settingconfiguration48}/>
                    <br/>
                    <br/>
                    <ul>
                        <li>Check <Text strong>Normal </Text>to stub or delete all the emails.  </li>
                        <li>Check <Text strong>Mail Size Greater Than </Text>to stub or delete those emails which are larger than the specified size. If you check this option, the <Text strong>Email Size</Text> box gets enabled.  Specify the size in KB.      </li>
                        <li>Check <Text strong> Email Has Attachment  </Text> to stub or delete all the emails that have an attachment.     </li>
                        <li>For example, if you want to delete all the emails larger than 1000 KB:   
                            <ul>
                                <li>Check <Text strong>Delete</Text> in <Text strong>Stub/Delete Email</Text>.   </li>
                                <li>Check <Text strong>Email Size Greater Than in Stub/Delete Options</Text> .   </li>
                                <li>Enter 1000 in <Text strong>mail Size</Text> .   </li>
                            </ul>
                              </li>
                    </ul>
                    </li>
                    </ol>
                    </li>
                </ol>
                <Text> Check <Text strong>Enable Offline </Text>Access to enable offline access to archived mails.    </Text>
                <ol>
                    <li>
                    <Text strong>Offline Access Period:</Text> This feature is deprecated.  
                    </li>
                    <li>
                    <Text strong>Exclude Hours </Text>
                       <br/>
                    <br/>
                    <img alt='' src={settingconfiguration49}/>
                    <br/>
                    <br/>
                    <Text>
                    Check this box if you want to stop archiving when a backup process is running on the exchange server.   During the period specified through the Exclude Hours Start Time and Exclude Hours End Time, the agent stops archiving.  Use a 24-hour clock to specify the time.
                    </Text>
                    <br/>
                    <Text><Text strong>Exclude Hours Start Time (HH:MM): </Text>Start time for the exclusion period </Text>
                    <br/>
                    <Text><Text strong>Exclude Hours End Time (HH:MM): </Text>End time for the exclusion period   </Text>
                    </li>
                    <li>
                    Select <Text strong>Save</Text> to add the server or select <Text strong>Cancel </Text>to exit without adding. You can check the list of servers in the <Text strong>Email Server</Text> master page to ensure that the server is added.  
 
                    </li>
                    <li>
                    <br/>
                    <br/>
                    <img alt='' src={settingconfiguration50}/>
                    <br/>
                    <br/>
                    <Text strong>Note: SonaVault licenses are issued based on the number of email servers and its mailboxes that are archived. The number of journal mailboxes does not matter for counting the licenses.  </Text>
                    </li>
                </ol>
                <Text strong>Disable Archiving a Server </Text>
                <br/>
                <Text>
                To disable archiving on a server, select the server by checking its box and select <Text strong>Disable Server</Text>. If archival is disabled on a server, the status is shown with a cross mark. Archival can be disabled when the server is down due to a breakdown or for maintenance. Currently an Email Server cannot be deleted from the UI but can only be just disabled.
                </Text>
                <br/>
                <Text strong >Enable Archiving a Server</Text>
                <br/>
                <ol style={{listStyle:"none"}}>
                  <li>
                  <br/>
                    <br/>
                    <img alt='' src={settingconfiguration51}/>
                    <br/>
                    <br/>
                  </li>
                </ol>
                <Text>To enable archiving on a server, select the server by checking its’ box and select <Text strong>Enable Server</Text>. If archival is enabled on a server, the status is shown with a tick mark.  </Text>
                <br/>
                <Text strong>Edit Email Server </Text>
                <ol>
                    <li>
                    Select the edit icon <img alt='' src={editIcon} width="50px" height="auto"/> in the Email Server page.
                    <br/>
                    <br/>
                    <img alt='' src={settingconfiguration52}/>
                    <br/>
                    <br/>
                    </li>
                    >
                    <li>
                    A side-drawer opens, and the <Text strong>Edit Email Server</Text> page is displayed.   
                    <br/>
                    <br/>
                    <img alt='' src={settingconfiguration53}/>
                    <br/>
                    <br/>
                    </li>
                    <li>
                    A side-drawer opens, and the <Text strong>Edit Email Server</Text> page is displayed.   
                    <br/>
                    <br/>
                    <img alt='' src={settingconfiguration53}/>
                    <br/>
                    <br/>
                    </li>
                    <li>
                    You can change the <Text strong>Domain Name, Email Server Name, Exchange Version, Exchange ServicePack, Journal mailbox name, Journal Logon, Journal Password </Text>or the <Text strong>Frequency</Text>. You can enable or disable a server by checking or unchecking the<Text strong> Enable</Text> option.  
                    </li>
                    <li>
                    Check <Text strong>DomEnable Stub</Text>to enable the email stubbing on the Exchange Server.    
                    </li>
                    <li>
                    Check <Text strong> Enable Offline</Text>Access to enable offline access of stubbed emails.    
                    </li>
                    <li>
                    <Text strong> Exclude Hours: </Text>Check this box if you want to stop archiving when a backup process is running on the exchange server. During the period specified through the Exclude Hours Start Time and Exclude Hours End Time, the agent stops archiving.  If you do not want to interrupt the archival during backup processes on the exchange server, uncheck this box.  
                    <br/>
                    <Text>Use a 24-hour clock to specify the time</Text>
                    <br/>
                    <Text ><Text strong>Exclude Hours Start Time (HH:MM):</Text> Start time for the exclusion period  </Text>
                    <Text ><Text strong>Exclude Hours End Time (HH:MM): </Text> End time for the exclusion period.  </Text>
    
                    </li>
                    <li>
                    Select <Text strong>Save </Text>to edit the server or select <Text strong>Cancel</Text> to exit without editing.
                    <br/>
                    <br/>
                    <img alt='' src={settingconfiguration54}/>
                    <br/>
                    <br/>  
                    <Text> Notes</Text>
                    <Text strong>
                    <ul>
                        <li>A server may be disabled when it is shut down for maintenance or if it is decided that the emails on the server need not be archived.   </li>
                        <li>Select a convenient page size to view the list of email servers configured for archiving.     </li>
                        <li>In the Email Server page, for each email servers configured, the details such as Journal mailbox, Journal logon and so on is displayed. If you want to hide any one of the columns, select the Column Configuration icon <img alt='' src={columnIcon} width="50px" height="auto"/> present at the top of the column and uncheck the unwanted column.      </li>
                        </ul> 
                        </Text>

                    </li>
                </ol>
            </div>
           
        </div>
    );
}
function HistoricDomain(){
    return(
        <div>
            <div style={{ paddingLeft: 40, paddingTop: 3, display: "flex", justifyContent: "center", flexDirection: "column" }}>
                <Title style={{ color: `${color.Blue}`, fontSize: 25 }}>{"Historic Domain  "}</Title>
                <ol>
                    <li>Select the Historic Domain icon <img alt='' src={emailServerIcon} width="50px" height="auto"/> from the Configuration menu.
                    <br/>
                    <br/>
                    <img alt='' src={settingconfiguration55}/>
                    <br/>
                    <br/>  
                    <Text>
                    Old Domain Settings allows the administrator to add the names of all the current and previous domains the organization may have used. This will ensure that emails being sent and received for those domains get archived.  This is very import relating to eDiscovery when searching for emails.  If the Old Domains are specified, the system will discover them.  Using this setting is important especially if the company had multiple domains previously and now has one. The administrator may have imported all historical emails.  If the Old Domains are not specified, then the emails from the Old Domains will not be displayed in the search results.  Select the Add icon <img alt='' src={addIcon} width="50px" height="auto"/>  to add your domains. 
                    </Text>
                    </li>
                   
                </ol>
                <Text strong>Add Historic Domain </Text>
                <ol>
                    <li>Select the Add icon <img alt='' src={addIcon} width="50px" height="auto"/>.
                    <br/>
                    <br/>
                    <img alt='' src={settingconfiguration56}/>
                    <br/>
                    <br/> 
                    </li>
                    <li>This opens an <Text strong>Add Historic Domain</Text> side-drawer. 
                        <br/>
                    <br/>
                    <img alt='' src={settingconfiguration57}/>
                    <br/>
                    <br/> 
                    </li>
                    <li>Enter <Text strong>Old Domain Name</Text>. 
                        <br/>
                    <br/>
                    <img alt='' src={settingconfiguration58}/>
                    <br/>
                    <br/> 
                    </li>
                    <li>Enter <Text strong>Old Domain Name Description</Text>.  
                        <br/>
                    <br/>
                    <img alt='' src={settingconfiguration59}/>
                    <br/>
                    <br/> 
                    </li>
                    <li>Select the<Text strong>Mailbox</Text>.  
                        <br/>
                    <br/>
                    <img alt='' src={settingconfiguration60}/>
                    <br/>
                    <br/> 
                    </li>
                    <li>Select <Text strong>Save</Text>.  
                        <br/>
                    <br/>
                    <img alt='' src={settingconfiguration61}/>
                    <br/>
                    <br/> 
                    </li>
                </ol>
                
            </div>
           
        </div>
    );
}