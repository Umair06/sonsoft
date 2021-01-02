import React from 'react';
import { Typography } from 'antd';
import theme from "../../../../../../Assets/Theme/Theme"
// import SMTP from "../../../../../../../src/Assets/ScreenShots/SMTP.PNG"
// import myArchived1 from "../../../../Assets/images/myArchived1.PNG";
// import myArchived2 from "../../../../Assets/images/myArchived2.PNG";

const { Text, Title } = Typography;
const { color } = theme;
function SMTPSettings() {
    return (
        <div style={{ paddingLeft:40,paddingTop:3, display: "flex", justifyContent: "center", flexDirection: "column" }}>
           <Title style={{ color: `${color.Orange}`, padding: "15px 0 0 0px", fontSize: 50 }}>{"SMTP Configuration (Version 6.5)"}</Title>
           <br/>
           <Text>Insert ScreenShot</Text>
           <br/>
            <Text > The SonaVault application system sends notifications through email to its users regarding changes in the system such as addition or deletion of users, changes in the policies, and archive stores. SonaVault system provides a menu to configure the SMTP settings to send these notifications.  </Text>
            
            <br />
            <Text > To configure SMTP for email notifications, select the <Text strong>Configuration</Text> menu and select the <Text strong>SMTP Configuration </Text> Tab. Enter the details as described below: </Text>
            <br />
            
            <Text > <Text strong>Sender's Email:</Text> This is the email address used by SonaVault to send notifications. Include the domain name in the email address. Generally, this is a specific ID used by SonaVault, and need not be the email ID of the administrator or the super user. Ensure that this ID exists on the email server.   </Text>
            <br/>
           
            
            <Text strong>
            Note: The email ID is authenticated, and a test email is sent to the sender's address. If the ID does not exist, the system shows an error message and does not accept the email ID. 
            </Text>
            <br/>
            
            <Text >
            <Text strong>SMTP Host:</Text> This is the SMTP host. Enter the IP address or host name including the domain name (preferably, IP address).  
            </Text>
            <br/>
            
           
            <Text >
            <Text strong>Port:</Text> It is the port number used by SMTP for outgoing email. The port is generally set to 25. Check the port used and change if necessary.  
            </Text>
            <br/>
            
            
            <Text >
            <Text strong>Authentication Required: </Text>  Check this box if user authentication is required by SMTP for sending emails. Refer to your SMTP server settings whether authentication is required. 
            </Text>
            <br/>
            
           
            <Text >
            <Text strong>Credentials: </Text>This refers to the authentication credentials for SMTP. Enter the username and password for SMTP authentication in the corresponding boxes. 
            </Text>
            <br/>
           
            
            <Text >
             Click <Text strong>Save </Text>to save the SMTP configuration settings or click <Text strong> Cancel</Text> to exit without saving. 
            </Text>


          

        </div>
    )

}

export default SMTPSettings;
