import React from 'react';
import { Typography} from 'antd';
import theme from "../../../../../../Assets/Theme/Theme"
import AddNewNotification  from "./AddNewNotification";
import EditNotification from "./EditNotification"
// import SMTP from "../../../../../../../src/Assets/ScreenShots/SMTP.PNG"
// import myArchived1 from "../../../../Assets/images/myArchived1.PNG";
// import myArchived2 from "../../../../Assets/images/myArchived2.PNG";

const { Text, Title } = Typography;
const { color } = theme;

const Notification=()=> {
   
   
    return (
        <div>
           <div style={{  paddingLeft:40,paddingTop:3,display: "flex", justifyContent: "center", flexDirection: "column" }}>
           <Title style={{ color: `${color.Orange}`, padding: "15px 0 0 0px", fontSize: 50 }}>{"Notification (Version 6.5)"}</Title>
           <br/>
           <Text type="danger">Insert ScreenShot</Text>
           <br/>
            <Text >The SonaVault application can undergo configuration (settings) changes such as configuration, archival policies, retention policies, and user roles, and a certain set of users of the system must be notified of the changes. However, not all users need to know about all the changes. The EAS administrator decides the changes that need to be notified and the people who need to be notified for each notification. Through the <Text strong>Notification</Text> menu, the notifications and the recipients can be specified.   </Text>
            
            <br />
            <Text strong>
            Note: SonaVault has a predefined set of notification types. You cannot add new types. For the default notifications, you can specify the recipients.  
            </Text>
            <Text > To configure the notifications, select the<Text strong>Configuration</Text> menu and select the <Text strong>SMTP Notification</Text> tab.</Text>
            <br />
            
            <Text >  To select a notification, check its box. To select all the notifications, check the box in the header row of the notifications table.</Text>
            <br/>
            <ul>
                <li>To specify the recipients of a notification, click <Text strong>Add Notification</Text>. See <a href="/#"> Add New Notification. </a> </li>
                <li>To edit a notification, click on the edit icon <Text type="danger">insert screenshot</Text>. See <a href="/#">Edit Notification.</a></li>
                <li>To delete a notification, select the notification by checking its box and click <Text strong>Delete</Text>. In the <Text strong>Confirmation</Text> dialog, click <Text strong>Yes</Text>. </li>
                <li>To restore a deleted notification, click <Text strong> Add Notification</Text>. In the <Text strong>Add New Notification </Text>page, select the deleted notification type from the drop-down list, enter the recipients’ names and click <Text strong>Save </Text>. You can check the list of notifications in the <Text strong> Notification </Text> master page to ensure that the notification is restored.   </li>
            </ul>
           <br/>
            
            <Text >
            The following notification types are defined by the system:  
            </Text>
            <br/>
            <ol>
                <li>Activate Product: Changes in the licenses and activation of SonaVault   </li>
                <li>Archival policy: Changes in archival policy, and addition of removal of mailboxes or external email IDs etc</li>
                <li>Archive Store: Changes in the store name and location information  </li>
                <li>Configurations: Changes in General, SMTP, deployment, and AD settings   </li>
                <li>Content Identification Policy: Changes in content identification policies    </li>
                <li>Email Server: Changes in the email server name, journal information, poll frequency, and enabling or disabling of an email server    </li>
                <li>Labeling policy: Changes in the system labels such as the policy name, priority, label name, and so on  </li>
                <li>Mailbox Access: Changes in the privileges for a user, addition or deletion of privileged user, and email IDs    </li>
                <li>Purge Policy: Changes in the purging rules    </li>
                <li>Retention Policy: Changes in the policy name, priority, retention period, grace period, and policy criteria    </li>
                <li>Role Management: Changes in the role names, description, and permissions, or changes in the role of people    </li>
                <li>Rollover Policy:  Changes in rollover policies  </li>
                <li>Stub Policy: Changes in stub periods, stub criterion, or users of a stub policy   </li>
               
            </ol>
            <Text>
            The number of notifications displayed on one page and the page size can be specified as required. The default page size is 10. 
            </Text>
            <Text>
            In the <Text strong>Notifications</Text> page, for each notification type, the email IDs specified in the <Text strong>  To</Text> and <Text strong>Cc</Text> addresses are displayed.  If you want to hide the<Text strong>  To</Text>  address column or the <Text strong>Cc</Text>address column, click on the <Text type="danger">insert screenshot</Text>icon present at the top of the column and uncheck the unwanted column. 
            </Text>
            
            </div>
            <AddNewNotification/>
            <EditNotification/>
            </div>
    )

}

export default Notification;

