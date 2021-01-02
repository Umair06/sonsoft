import React from 'react';
import { Typography } from 'antd';
//import styles from "../../../../../../styles"
import Theme from "../../../../../../Assets/Theme/Theme"
const { Text, Title } = Typography;
const {color} =Theme

function Deployment() {
    return (
        <div style={{  paddingLeft:40,paddingTop:3,display: "flex", justifyContent: "center", flexDirection: "column" }}>
        <Title style={{ color: `${color.Orange}`, padding: "15px 0 0 0px", fontSize: 50 }}>{"Deployment Setting  (Version 6.5)"}</Title>
        <br/>
        <Text type="danger">Insert ScreenShot</Text>
        <br/>
         <Text >To configure the SonaVault deployment, select the Configuration menu and select the Deployment Setting tab.   </Text>
         
         <br />
         <Title  style={{ color: `${color.Blue}`, fontSize: 25 }}>{"Central Archive (Version 6.5)"}</Title>
         <br/>
         <Text type="danger">Insert ScreenShot</Text>
         <br/>
         <Title  style={{ color: `${color.Blue}`, fontSize: 25 }}>{"Multi Archive  (Version 6.5)"}</Title>
         <br/>
         <Text type="danger">Insert ScreenShot</Text>
         <br/>
         <Text>
         If your company has offices in multiple sites or locations, you have a choice to archive the emails at different locations separately or archive them centrally. SonaVault is deployed based on this choice. 
         </Text>
         <br/>
         <Text strong>
         Note: If you have a setup for Central Archiving of emails, do not change any configuration setting. By default, the application is configured for Central Archiving deployment. 
         </Text>
         <br/>
         <Title  style={{ color: `${color.Blue}`, fontSize: 25 }}>{"Central Archiving  (Version 6.5)"}</Title>

         <Text >
         In a central archiving deployment, the archiving server is deployed at a single site and the archiving agents are deployed at all the locations. All the emails are collected and are archived at one site. This central location has an archive database and a master database. The configuration information is stored in the master database and archived emails are stored in the archive database. The agents in multiple locations access the central archive for search and archival operations.You can opt for central archiving if the volume of the emails is not very large and the people whose emails are archived access their emails from a single site. Search can be faster if emails are stored locally.  

         </Text>
         
         <br/>
         <Text type="danger">Insert ScreenShot</Text>
         <br/>
         <Title  style={{ color: `${color.Blue}`, fontSize: 25 }}>{"Multi Archiving   (Version 6.5)"}</Title>
         <Text>
         In a multi-archiving deployment, the archiving servers as well as archiving agents, are deployed in each site. Archiving happens at all the sites. All the archiving servers are connected with one another so that emails can be searched across all the databases. The general users need not know whether the archiving is done centrally or locally; they need not specify the location during any search operation.You can deploy a multisite archival system in a single geographical site. The SonaVault servers should be installed on different hosts. You can opt for multiple-site archiving if people access their emails from more than one location. Emails can be archived, searched, and retrieved from all the locations. If the number of mailboxes and the number of emails is large, multisite archival can be more efficient.  
         </Text>
         <br/>
         <Text type="danger">Insert ScreenShot</Text>
         <br/>
         <Text>
             <Text strong>Site Prefix:</Text>
             
             Enter a three-letter code (or name) to identify the site. This code is used as a prefix while naming the archive databases to identify the site. The name should be unique. Only letters are allowed. For example, SNS.  

         </Text>
        <br/>
        <Text>
             <Text strong>Archival Topology: </Text>
             
             Check Central Archive or Multi Archive. The default archiving is central archiving. 

         </Text>
         <br/>
         <Title style={{ color: `${color.Blue}`, fontSize: 25 }}>{"To add sites:(Version 6.5)"}</Title>

        <ol>
            <li>Enter the site URL. Site URL is the identification of the server on which the SonaVault server is installed in that site.  </li>
            <li>If authentication is required to access the specified URL, check the Authentication Required box. This helps in preventing unauthorized access to the site.  It is recommended to enable Windows authentication for SonaVault on the IIS.  </li>
             <li>Enter the username including the domain name. For example, CAL\easadmin.  </li>
             <li>Enter the password. <br/> Click Add.  </li>
        </ol>
        <br/>
        <Text strong>
        Notes:  Prefix for each site where SonaVault is installed should be unique.Apart from the specified users, local users with Admin powers on the system where SonaVault is installed are also authorized to access the specified URL.  For login, enter  and the password. 

        </Text>
        <Text>
        he software verifies the connectivity to the specified site before adding the site.  The added site gets displayed in the site list.<br/>If you choose Multi Archive as the archival topology, add the other sites by following the same steps.<br/>Click Save to save the deployment setting or click Cancel to exit without saving. <br/>Click the Remove icon present next to a site name to delete it from the archival plan. 
        </Text>
     
         </div>
    )

}

export default Deployment;
