import React from 'react';
import { Typography } from 'antd';
//import styles from "../../../../../../styles"
import Theme from "../../../../../../Assets/Theme/Theme"
// import whatsNewIcon from "../../../../Assets/icons/SV_ICONS/WhatsNew_Blue.png"
// import myArchived1 from "../../../../Assets/images/myArchived1.PNG";
// import myArchived2 from "../../../../Assets/images/myArchived2.PNG";

const { Text, Title } = Typography;
const { color } = Theme

function Status() {
    return (
        <div>
            <div style={{ paddingLeft: 40, paddingTop: 3, display: "flex", justifyContent: "center", flexDirection: "column" }}>
                <Title style={{ color: `${color.Orange}`, padding: "15px 0 0 0px", fontSize: 50 }}>{"Control Center  (Version 6.5)"}</Title>

                <Text >When a SonaVault administrator logs into the SonaVault Console, the Control Center page is displayed. It presents a dashboard view with the details of status, statistics, and configuration of the system.  </Text>

                <br />
                <Text type="danger">Insert ScreenShot</Text>
                <br />
                <Text>Click on <Text strong>Refresh</Text> to see the latest information. </Text>

                <Text>
                    Click on the arrow buttons to expand or collapse the individual panes.
            </Text>
                <Text>
                    The <Text strong>Status </Text>pane displays the following details:
            </Text>
                <br />
                <table border="2" style={{ width: "50%" }}>
                    <tbody>
                        <tr><td>Purge Policy  </td><td>Whether the purge policy is currently running or in a waiting state. This runs as a background task. </td></tr>
                        <tr><td>Retention Expired</td><td>Whether the retention period is currently being applied or in a waiting state. This runs as a background task.  </td></tr>
                        <tr><td>Retention Grace Expired </td><td>Whether the retention grace period is currently being applied or in a waiting state. This runs as a background task </td></tr>
                    </tbody>
                </table>
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
                <Text>
                    The <Text strong> Configuration </Text>pane displays the following details:
            </Text>
                <br />
                <table border="2" style={{ width: "50%" }}>
                    <tbody>
                        <tr><td>Deployment Type  </td><td>The Deployment Type of SonaVault (Central/Multi site) </td></tr>
                        <tr><td>SMTP Configured? </td><td>Whether SMTP is configured (Yes if configured, No if not configured)  </td></tr>
                        <tr><td>Default Password Changed?  </td><td>Whether the default password is changed (Yes if configured, No if not configured). It is recommended to change the default password  </td></tr>
                        <tr><td>User-Defined Retention Policy Configured?  </td><td>Whether a user-defined retention policy is configured (Yes if configured, No if not configured). If no retention policy is configured, the default policy will be applied </td></tr>
                        <tr><td>Default Retention Policy Configured?   </td><td>Whether a default retention policy is configured (Yes if configured, No if not configured) </td></tr>
                        <tr><td>Purge Policy Configured?   </td><td>Whether a purge policy is configured (Yes if configured, No if not configured) </td></tr>
                        <tr><td>Archival Type   </td><td>The archival type (All/Selected-Include/Selected-Exclude) <br />All indicates that all the mailboxes are included for archival <br />Selected–Include indicates that the selected mailboxes are included for archival <br />Selected–Exclude indicates that the selected mailboxes are excluded for archival  </td></tr>
                    </tbody>
                </table>

            </div>

        </div>
    )

}

export default Status;
