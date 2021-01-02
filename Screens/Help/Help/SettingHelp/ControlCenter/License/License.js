import React from 'react';
import { Typography } from 'antd';
import Theme from "../../../../../../Assets/Theme/Theme"
const { Text, Title } = Typography;
const { color } = Theme
function License() {
    return (
        <div style={{ paddingLeft: 40, paddingTop: 3, display: "flex", justifyContent: "center", flexDirection: "column" }}>
            <Title style={{ color: `${color.Orange}`, padding: "15px 0 0 0px", fontSize: 50 }}>{"License (Version 6.5)"}</Title>
            <br />
            <Text>
                The <Text strong>License</Text>pane displays the following details:
            </Text>
            <br />
            <table border="2" style={{ width: "50%" }}>
                <tbody>
                    <tr><td>Mailboxes (Total/Licensed/Archived) </td><td>The total number of mailboxes in the system, number of mailboxes licensed, and number of mailboxes archived  </td></tr>
                    <tr><td>License  </td><td>TThe expiry date of license for SonaVault (If SonaVault is purchased with a life-time license, it displays LifeTime) </td></tr>
                </tbody>
            </table>

        </div>
    )

}

export default License;
