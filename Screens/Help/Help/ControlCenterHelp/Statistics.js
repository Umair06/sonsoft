import React from 'react';
import { Typography } from 'antd';
// import styles from "../../../../../../styles"
import Theme from "../../../../Assets/Theme/Theme"
const { Text, Title } = Typography;
const { color } = Theme
function Statistics() {
    return (
        <div>
            <div style={{ paddingLeft: 40, paddingTop: 3, display: "flex", justifyContent: "center", flexDirection: "column" }}>
                <Title style={{ color: `${color.Orange}`, padding: "15px 0 0 0px", fontSize: 50 }}>{"Statistics Version(6.5)  "}</Title>
                <br />
                <Text>
                    The <Text strong>Statistics </Text>pane displays the following details:
            </Text>
                <br />
                <table border="2" style={{ width: "50%" }}>
                    <tbody>
                        <tr><td>Email Server (Licensed/Enabled/Stub-Enabled)</td><td>The total number of email servers licensed, number of servers on which archiving is enabled and email servers on which stubbing is enabled </td></tr>
                        <tr><td>Active Directory (Total/Sync-Enabled/Sync-Disabled) </td><td>The total number of Active Directories (Ads), number of Ads enabled for synchronization, and number of Ads disabled for synchronization  </td></tr>
                        <tr><td>No. of Archive Stores </td><td>The number of archive stores currently available </td></tr>
                        <tr><td>Last Message Archived at </td><td>The date on which the last message (email) was archived </td></tr>
                        <tr><td>Total Messages Archived/Total Message Size (MB)  </td><td>The total number of messages archived till date and the total size of all the emails archived (in MB)  </td></tr>
                        <tr><td>Resend Message Count </td><td>The count of messages resent due to archival failure </td></tr>
                        <tr><td>Mailboxes (Total/Licensed/Archived) </td><td>The total number of mailboxes in the system, number of mailboxes licensed, and number of mailboxes archived  </td></tr>
                        <tr><td>Mailbox Access Count  </td><td>The number of users who can access the mailboxes of other users  </td></tr>
                        <tr><td>Total Notifications Configured   </td><td>The total number of notifications configured </td></tr>
                        <tr><td>License  </td><td>TThe expiry date of license for SonaVault (If SonaVault is purchased with a life-time license, it displays LifeTime) </td></tr>
                    </tbody>
                </table>
                <br />
            </div>

        </div>
    )

}
export default Statistics;