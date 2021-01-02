import React from 'react';
import { Typography } from 'antd';
//import styles from "../../../../../../styles"
import Theme from '../../../../../../Assets/Theme/Theme';
const { Text, Title } = Typography;
const { color } = Theme;
function HistoricDomain() {
  return (
    <div>
      <div
        style={{
          paddingLeft: 40,
          paddingTop: 3,
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column'
        }}>
        <Title
          style={{
            color: `${color.Orange}`,
            padding: '15px 0 0 0px',
            fontSize: 50
          }}>
          {'Old Domain Settings  '}
        </Title>
        <br />
        <Text type='danger'>Insert ScreenShot</Text>
        <br />
        <Title style={{ color: `${color.Blue}`, fontSize: 25 }}>
          {'Old Domain Settings '}
        </Title>
        <br />
        <Text>
          Old Domain Settings allows the administrator to add the names of all
          the current and previous domains the organization may have used. This
          will ensure that emails being sent and received for those domains get
          archived. This is very import relating to eDiscovery when searching
          for emails.  If the Old Domains are specified, the system will
          discover them. Using this setting is important especially if the
          company had multiple domains previously and now has one. The
          administrator may have imported all historical emails. If the Old
          Domains are not specified, then the emails from the Old Domains will
          not be displayed in the search results.  Click the{' '}
          <Text strong>ADD </Text>button to add your domains.
        </Text>
      </div>
      <AddHistoricDomain />
    </div>
  );
}

export default HistoricDomain;
function AddHistoricDomain() {
  return (
    <div>
      <div
        style={{
          paddingLeft: 40,
          paddingTop: 3,
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column'
        }}>
        <Title
          style={{
            color: `${color.Orange}`,
            padding: '15px 0 0 0px',
            fontSize: 50
          }}>
          {'Add Old Domain Settings  '}
        </Title>
        <br />
        <Text type='danger'>Insert ScreenShot</Text>
        <br />
        <Text strong> ADD Old Domain Settings </Text>
        <br />
        <ol>
          <li>
            Enter the name in the <Text strong>Old Domain Name</Text> section.
          </li>
          <li>
            Provide a description for that domain name in the{' '}
            <Text strong>Old Domain Desc</Text>.
          </li>
          <li>Select the mailboxes from the list provided.</li>
          <li>
            Click <Text strong>Save</Text> when done.
          </li>
        </ol>
      </div>
    </div>
  );
}
