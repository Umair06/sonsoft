import React from 'react';
import { Typography} from 'antd';
import theme from "../../../../../../Assets/Theme/Theme"
// import SMTP from "../../../../../../../src/Assets/ScreenShots/SMTP.PNG"
// import myArchived1 from "../../../../Assets/images/myArchived1.PNG";
// import myArchived2 from "../../../../Assets/images/myArchived2.PNG";

const { Text, Title } = Typography;
const { color } = theme;

const  EditNewNotification=()=> {
   
   
    return (
        <div>
           <div style={{  paddingLeft:40,paddingTop:3,display: "flex", justifyContent: "center", flexDirection: "column" }}>
           <Title style={{ color: `${color.Orange}`, padding: "15px 0 0 0px", fontSize: 50 }}>{"Edit Notification  (Version 6.5)"}</Title>
           <br/>
           <Text type="danger">Insert ScreenShot</Text>
           <br/>
            <Text >The SonaVault administrator can decide to change the recipient of a notification. The direct recipient (To address) and/or the copy recipient (Cc address) can be changed. </Text>
            
            <br />
            <Text>
            To change the recipients of a notification, click the edit icon   <Text type="danger">Insert ScreenShot</Text> next to it in the Notification page.  
            </Text>
        
            <br/>
            <Text>In the Edit Notification page, enter the changed addresses in the To and Cc boxes. </Text>
            <br />
            
            <Text > Click Save to edit the notification or click Cancel to exit without editing.  </Text>
            <br/>
            
            
            
            </div>
            </div>
    )

}

export default EditNewNotification;

