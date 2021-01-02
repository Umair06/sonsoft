import React from 'react';
import { Typography } from 'antd';
//import styles from "../../../../../../styles"
import Theme from "../../../../../../Assets/Theme/Theme"
// import whatsNewIcon from "../../../../Assets/icons/SV_ICONS/WhatsNew_Blue.png"
// import myArchived1 from "../../../../Assets/images/myArchived1.PNG";
// import myArchived2 from "../../../../Assets/images/myArchived2.PNG";

const { Text, Title } = Typography;
const { color } = Theme

function FolderSyncPolicy() {
    return (
        <div>
        <div style={{ paddingLeft: 40, paddingTop: 3, display: "flex", justifyContent: "center", flexDirection: "column" }}>
            <Title style={{ color: `${color.Orange}`, padding: "15px 0 0 0px", fontSize: 50 }}>{"Folder Sync Policy (Version 6.5)"}</Title>
            <br />
            <Text type="danger">Insert ScreenShot</Text>
            <br />
            <Text >The Folder Sync Policy allows for the administrator to choose the users to sync archived messages from within the databases to a copy the folder structure based upon the users Microsoft Outlook Client in SonaVault using My Archive Emails.<br/>To sync the folder structure of their mailbox along with the mails: </Text>

            <br />
            
            
          
                <ol>
                    <li>Select the <Text strong> Server</Text>.   </li>
                    <li>Select <Text strong>Users</Text> for FolderSync.  </li>
                    <li>Role of the senders and recipients of emails.    </li>
                <li> Click <Text strong>Save</Text>.  </li>
               
                </ol>
                <br/>
                <Text>
                The FolderSync process gathers all the archived emails for all the users selected and the users can view their archived emails from <Text strong>My Archived Emails</Text> feature. 
                </Text>
                <br/>
          <Text strong>
            Note: FolderSync is process intensive. Recommended to Sync few users at a time. 
            </Text>
            <br/>
            <Text>
            The SonaVault Application displays a copy of all their folders as seen in their Outlook client as depicted in the image below.   
            </Text>
            <br/>
            <Text type="danger">Insert ScreenShot</Text>
           
            </div>
            
            </div>
    )

}


export default FolderSyncPolicy;

