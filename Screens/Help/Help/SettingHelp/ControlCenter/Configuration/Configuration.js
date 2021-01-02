import React from 'react';
import { Typography } from 'antd';
import Theme from "../../../../../../Assets/Theme/Theme"
const { Text, Title } = Typography;
const { color } = Theme
function Configuration() {
    return (
        <div style={{ paddingLeft: 40, paddingTop: 3, display: "flex", justifyContent: "center", flexDirection: "column" }}>
            <Title style={{ color: `${color.Orange}`, padding: "15px 0 0 0px", fontSize: 50 }}>{"Configuration (Version 6.5)"}</Title>
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
    )

}

export default Configuration;
