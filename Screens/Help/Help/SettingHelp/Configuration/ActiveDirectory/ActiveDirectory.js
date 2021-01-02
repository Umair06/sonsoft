import React from 'react';
import { Typography } from 'antd';
//import styles from "../../../../../../styles"
import Theme from "../../../../../../Assets/Theme/Theme"
const { Text, Title } = Typography;
const {color} =Theme

function ActiveDirectory() {
    return (
        <div>
        <div style={{  paddingLeft:40,paddingTop:3,display: "flex", justifyContent: "center", flexDirection: "column" }}>
        <Title style={{ color: `${color.Orange}`, padding: "15px 0 0 0px", fontSize: 50 }}>{"Active Directory Setting  (Version 6.5)"}</Title>
        <br/>
        <Text type="danger">Insert ScreenShot</Text>
        <br/>
         <Text >To configure the Active Directory settings: </Text>
         
         <br />
         <ol>
             <li>Select the Configuration menu and select the AD Setting tab.  </li>
             <li>Enter the details as described below:<br/>
             <Text strong>Domain:  </Text>
             <br/>
             <Text>
             Domain in which SonaVault is installed: You can provide the domain name, IP address or host name of the system.Domain in which SonaVault is not installed:  You can provide the IP address or host name of the system. Specify the user name and password to log into the AD server. User authentication is done at the AD server. 
             </Text>
             <br/>
             <Text strong>
             User Name:  
             </Text>
             <br/>
             <Text>
             Enter the user name having administrative privileges to access the Active Directory Password: Enter the password of the above user 
             </Text>
              </li>
              <li>
              Click Save to save the AD settings or click Cancel to exit without saving.  
              </li>
         </ol>
        
         <br/>
         <Text strong>The AD Setting tab displays the configured ADs and their status.  </Text>
        
         <br/>
            <ul>
                <li>Click Add to add a new AD. See  <a href="/#">Add an Active Directory</a>.  </li>
                <li>Click on the edit icon insert  to edit the user name or password. See <a href="/#"> Edit an Active Directory.</a>.  </li>
                <li>Click Delete to delete an AD from the archival system. If you delete an AD, the domain does not get disabled.   </li>
            </ul>
         <br/>
         <Text strong>
         Note: If you delete an AD it gets permanently deleted, and all the users on the AD get deleted.   

         </Text>
         <br/>
         <Text strong>
         If an AD is associated with an email server, the AD cannot be deleted.  
         </Text>
         <br/>

         <ul>
             <li>Check the box next to an existing AD and click Enable Sync to enable synchronization on the AD or click Disable Sync to disable synchronization on the AD.   A tick mark indicates that sync is enabled and a cross mark indicates that sync is disabled.   </li>
             </ul>
             <Text strong> Note: Synchronization takes place immediately when sync is enabled on an AD on which sync was previously disabled or an AD is added or edited with synchronization enabled. </Text>
    
        
         </div>
         <AddActiveDirectory/>
         <EditActiveDirectory/>
         </div>
        
    )

}

export default ActiveDirectory;

function AddActiveDirectory(){
    return(
        <div style={{  paddingLeft:40,paddingTop:3,display: "flex", justifyContent: "center", flexDirection: "column" }}>
        <Title style={{ color: `${color.Orange}`, padding: "15px 0 0 0px", fontSize: 50 }}>{"Add an Active Directory  (Version 6.5)"}</Title>
        <br/>
        <Text type="danger">Insert ScreenShot</Text>
        <br/>
         <Text >To add an Active Directory:  </Text>
         
         <br />
         <ol>
             <li>Select Settings from the Configuration menu.    </li>
             <li>Select the AD Setting tab.  
              </li>
              <li>
              Click Add. The following window is displayed.  
              </li>
              <li>
              Enter the domain name, username, and password.  
              </li>
              <li>
              Synchronization is enabled by default.  If you want to disable it, uncheck the box.  
              </li>
              <li>
              When you enable synchronization, it is not necessary to synchronize all the OUs. If you want to synchronize all the OUs, check All in Discover Organizational Unit. If you want to synchronize only a few OUs, check Selected in Discover Organizational Unit. When you check Selected, the OUs in the specified AD are displayed in a tree structure.  Check the OUs that should be synchronized. The AD setting also synchronizes the users from the container.  
              </li>
              <li>Click Save to save the settings or click Cancel to exit without saving.  </li>
         </ol>
        
         <br/>
         <Text strong>Notes: <br/>
         <ul>
                <li>If the Archive Server is installed in an MSP model, the ALL option for Discover Organizational Unit is disabled.  </li>
                <li>The synchronization is done daily.  If you do not require a daily synchronization on an AD, you can disable synchronization on the AD and synchronize manually, whenever required, by enabling sync on the AD.   </li>
               
            </ul>
            </Text>
        
        
         </div>
        
    )
}
function EditActiveDirectory(){
    return(
        <div style={{  paddingLeft:40,paddingTop:3,display: "flex", justifyContent: "center", flexDirection: "column" }}>
        <Title style={{ color: `${color.Orange}`, padding: "15px 0 0 0px", fontSize: 50 }}>{"Edit an Active Directory   (Version 6.5)"}</Title>
        <br/>
        <Text type="danger">Insert ScreenShot</Text>
        <br/>
   
      
         <ol>
             <li>To edit the details of an Active Directory:    </li>
             <li>Select the AD Setting tab.  
              </li>
              <li>
              Select Settings from the Configuration menu.  
              </li>
              <li>
              Select the AD Setting tab.  
              </li>
              <li>
              Click the edit icon <Text type="danger">Insert ScreenShot</Text>. The current setting details are displayed.    
              </li>
              <li>
              Make the required changes. Click Change to change the password.  
              </li>
              <li>Click Save to save the changes or click Cancel to exit without saving.    </li>
         </ol>
        
         <br/>
         <Text strong>Notes: <br/>
         The synchronization is done daily.  If you do not require a daily synchronization on an AD, you can disable synchronization on the AD and synchronize manually, whenever required, by enabling sync on the AD. 
            </Text>
        
        
         </div>
        
    )
}