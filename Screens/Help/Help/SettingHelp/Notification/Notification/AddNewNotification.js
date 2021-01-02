import React from 'react';
import { Typography} from 'antd';
import theme from "../../../../../../Assets/Theme/Theme"
// import SMTP from "../../../../../../../src/Assets/ScreenShots/SMTP.PNG"
// import myArchived1 from "../../../../Assets/images/myArchived1.PNG";
// import myArchived2 from "../../../../Assets/images/myArchived2.PNG";

const { Text, Title } = Typography;
const { color } = theme;

const  AddNewNotification=()=> {
   
   
    return (
        <div>
           <div style={{  paddingLeft:40,paddingTop:3,display: "flex", justifyContent: "center", flexDirection: "column" }}>
           <Title style={{ color: `${color.Orange}`, padding: "15px 0 0 0px", fontSize: 50 }}>{"Add New Notification (Version 6.5)"}</Title>
           <br/>
           <Text type="danger">Insert ScreenShot</Text>
           <br/>
            <Text >SonaVault application has predefined notification types. This interface allows you to specify recipients for all the notifications. For example, any changes in the archival policy are notified only to the management of the organization. In such a case, the EAS administrator selects the Archival Policy notification type and enters the email IDs of the people in the management group in the <Text strong>To</Text> and <Text strong> Cc </Text>boxes.  </Text>
            
            <br />
            <Text>
            Notification types are configured as part of the initial deployment of SonaVault. 
            </Text>
            <Text strong>
            Note: It is not mandatory to specify recipients for all the notification types. The recipients can be changed if required. 
            </Text>
            <br/>
            <Text>For example, at the beginning, the SonaVault administrator may not have a clear plan for the roles. Therefore, you need not specify the recipients for Role Management.  </Text>
            <br />
            
            <Text > To add a notification, click Add Notification in the Notification page and enter the details as described below: </Text>
            <br/>
            
            
            <Text >
                <Text strong>
            Notification Type:</Text> Select a notification type from the drop-down list. The notification types for which the recipients are already specified are not displayed in this list. Select All if you want the same people to receive all the notifications displayed in the list.
            </Text>
            <br/>
            
            <Text strong>
            Note: When All is selected as the notification type, the notifications for which the recipients had already been specified do not get affected. 
            </Text>
            <br/>
            <Text>
            Enter the email IDs in the To and Cc boxes.  
            </Text>
            <br/>
            <Text>
            Click Save to add the notification or click Cancel to exit without adding. 
            </Text>
            </div>
            </div>
    )

}

export default AddNewNotification;

