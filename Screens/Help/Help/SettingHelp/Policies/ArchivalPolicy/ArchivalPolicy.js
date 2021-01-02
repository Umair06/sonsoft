import React from 'react';
import { Typography } from 'antd';
//import styles from "../../../../../../styles"
import Theme from "../../../../../../Assets/Theme/Theme"
// import whatsNewIcon from "../../../../Assets/icons/SV_ICONS/WhatsNew_Blue.png"
// import myArchived1 from "../../../../Assets/images/myArchived1.PNG";
// import myArchived2 from "../../../../Assets/images/myArchived2.PNG";

const { Text, Title } = Typography;
const { color } = Theme

function ArchivalPolicy() {
    return (
        <div>
            <div style={{ paddingLeft: 40, paddingTop: 3, display: "flex", justifyContent: "center", flexDirection: "column" }}>
                <Title style={{ color: `${color.Orange}`, padding: "15px 0 0 0px", fontSize: 50 }}>{"Archival Policy (Version 6.5)"}</Title>
                <br />
                <Text type="danger">Insert ScreenShot</Text>
                <br />
                <Text >Email archiving is implemented to manage large volumes of email messages efficiently, reducing the server storage space used by emails, and enhancing the search and indexing capabilities.While an organization plans and implements a suitable email archival policy, a few parameters that might be considered are the following: </Text>

                <br />


                <Text>
                    <ul>
                        <li>The importance and possible future use of the content.   </li>
                        <li>The statutory regulations on preserving the information.  </li>
                    </ul>
                    <br />
                    <Text>An archival policy may depend on the following: </Text>
                    <br />
                    <ul>
                        <li>Role of the senders and recipients of emails.    </li>
                        <li> The functional group to which the emails belong </li>
                        <li>The legal requirement on the period of time the information is expected to be preserved.    </li>
                    </ul>
                </Text>

                <Text>
                    The policy is defined in terms of the users of the email.The archiving of emails is mandatory for a certain period of time as emails are also used in litigations. Email archiving is implemented to better manage the large volume of email messages. Archiving reduces the amount of server storage space used by email and enhances the user's email search and indexing capabilities.It is imperative that a suitable archival policy for an organization be implemented keeping in mind the adherence to the laws and mitigating risks involved in litigations faced by the organization.<br /><Text type="danger">Insert Screenshot (Caption: Archival Process)</Text><br /> With SonaVault, emails are archived at the mailbox level. That is, for each mailbox, either all the emails are archived or none. The license mentions the number of mailboxes and the email servers archived. SonaVault can archive external emails too. For example, if an organization wants to archive all the emails from customers whether or not the recipient's mailbox is included for archiving, the email IDs of the customers can be specified for archiving. The external mailboxes are also counted for licensing. The archival policy refers to the specification of the mailboxes to be archived as per the license purchased. For example, if the license is purchased for 100 mailboxes and 5 email servers, you can select 5 email servers and 100 mailboxes for archiving. For example, if technical information is handled by a team leader, the team leader's mailbox can be archived instead of the project manager, who handles the management activities of the project. The formulation of an archival policy is based on protecting an organization's sensitive data.
            </Text>

            </div>
            <ArchivalAllUsers />
            <ArchivalSelectedUsers />
            <ArchivalExternalUsers />
        </div>
    )

}


export default ArchivalPolicy;
function ArchivalAllUsers() {
    return (
        <div style={{ paddingLeft: 40, paddingTop: 3, display: "flex", justifyContent: "center", flexDirection: "column" }}>
            <Title style={{ color: `${color.Orange}`, padding: "15px 0 0 0px", fontSize: 50 }}>{"Archive All Users (Version 6.5)"}</Title>
            <br />
            <Text>Insert ScreenShot</Text>
            <br />
            <Text >Select the Setup menu and select Archival Policy to specify the users whose mailboxes are to be archived.  </Text>

            <br />
            <Title style={{ color: `${color.Blue}`, fontSize: 25 }}>{"Archive All Users  (Version 6.5)"}</Title>

            <ol>
                <li>Select the All Users option and click Save. This includes the mailboxes of all the users, instead of specifying all the names.</li>
                <li>The mailboxes of all the users listed in the Active Directory having mailboxes are archived.  </li>

            </ol>


        </div>
    )

}

function ArchivalSelectedUsers() {
    return (
        <div style={{ paddingLeft: 40, paddingTop: 3, display: "flex", justifyContent: "center", flexDirection: "column" }}>
            <Title style={{ color: `${color.Orange}`, padding: "15px 0 0 0px", fontSize: 50 }}>{"Archive Selected Users - Include/Exclude   (Version 6.5)"}</Title>
            <br />
            <Text>Insert ScreenShot</Text>
            <br />
            <Text >Select the Setup menu and select Archival Policy to specify the users whose mailboxes are to be archived.  </Text>

            <br />
            <Title style={{ color: `${color.Blue}`, fontSize: 25 }}>{"Archive Selected Users - Include/Exclude   (Version 6.5)"}</Title>

            <ol>
                <li>To select a specific set of users, select the Selected option.  </li>

                <br />
                <Text>
                    If you chose to specify a set of users, there are two options to make the list easily:
            </Text>
                <br />
                <ul>
                    <li> If you select Include, the mailboxes you select will be added to the list.  </li>
                    <li>If you select Exclude, the mailboxes you select will not be added to the list.  </li>
                    <li>If you want to select only a few servers, select the servers with the Include option checked. You can specify only the few names you want to add.  </li>
                    <li>If you want to select almost all the servers (but not all), select the servers with the Exclude option checked. Instead of tediously selecting many names, you can specify only the names you want to exclude.  </li>
                </ul>
                <br />
                <li>Select appropriate Server, Storage Group, and Mailbox Store to filter out the mailboxes. A list of users is displayed in the Mailbox (es) List. The domain name is included in identifying the mailbox.
             <br />
                    Server name is the name of the email server from which the emails are sent or received. The list of servers includes two more entries, distribution groups, and security groups along with individual servers. Functional groups of an organization such as Finance and HR can be considered as distribution groups. User groups such as Administrators and Guests can be considered as security groups.Storage Group is the name of the storage group to which the mailbox belongs. Select a storage group.<Text strong>Note: The list of storage groups is displayed based on the server you selected.</Text>  A storage group can refer to a functional entity such as Finance, R&D, Services, Business Development, and BOD. Storage groups are created on the Exchange Server.  In an organization located in multiple sites, members of the same functional group might be physically located in multiple sites and might be using more than one email server. Similarly, a single email server can handle emails of multiple functional groups. Therefore, different mailbox stores can be created for each storage group.  Mailbox Store: Each storage group can contain one or more mailbox stores. For example, if a company has a storage group called Department, it can have one email store as Server Group and another as Browser Group.
              <br />
                    <Text strong>Note: The list of mailbox stores is displayed based on the storage group you selected.  </Text>
                </li>
                <li>Select the mailboxes to be included for archiving. The selected mailboxes are displayed in the Selected Mailbox (es) list.  </li>

                <li>
                    To include only the selected mailboxes, select the items in the list and click Add after checking Include box. If you uncheck the Include box, all mailboxes except the selected mailboxes get added.For example, suppose there are four mailboxes, A, B, C, and D, displayed in the list. If you select B and C, and click Add without checking the Include box, A and D will be added to the Selected Mailbox (es) list. If you select B and C, and click Add after checking the Include box, B and C will be added to the Selected Mailbox (es) list.
            </li>
                <li>
                    Click Save to add the selected mailboxes (or click Cancel to exit without adding).
            </li>
                <li>
                    o remove the mailboxes from the Selected Mailbox (es) list, select the mailbox and click Remove.
            </li>

            </ol>
            <Text strong>
                Notes: <br />
                <ul>
                    <li>At each stage, the drop-down lists are displayed based on the selection made at the previous selection.  </li>
                    <li>After the mailboxes are selected through this menu, the SonaVault application does not filter the emails of any box. Even spam emails get archived unless the email servers have spam filters</li>
                </ul>
            </Text>


        </div>
    )

}
function ArchivalExternalUsers() {
    return (
        <div style={{ paddingLeft: 40, paddingTop: 3, display: "flex", justifyContent: "center", flexDirection: "column" }}>
            <Title style={{ color: `${color.Orange}`, padding: "15px 0 0 0px", fontSize: 50 }}>{"Archive External Users   (Version 6.5)"}</Title>
            <br />
            <Text type="danger">Insert ScreenShot</Text>
            <br />
            <Text >Select the Setup menu and select Archival Policy to specify the users whose mailboxes are to be archived. </Text>

            <br />
            <Title style={{ color: `${color.Blue}`, fontSize: 25 }}>{"Archive External Users    (Version 6.5)"}</Title>

            <Text >
                To archive external mailboxes, enter only the email ID of the external user and click Add. The mailboxes of the specified external users can be seen in the Selected email ID box. Click Save to add the external mailboxes or click Cancel to exit without adding. The External Users (Include Only) pane can be expanded or collapsed as required. Click <Text type="danger">Insert ScreenShot</Text> to expand and <Text type="danger">Insert ScreenShot</Text> to collapse.
            </Text>
            <br />
            <Text strong>
                Notes: <br />
                <ul>
                    <li>For selecting the external users, the Exclude option is not available. You need to specify the email IDs of all the external users.  </li>
                    <li>The archival policy has to be defined based on the number of mailboxes and email servers specified in the license of the product. The number includes the external users too.  </li>
                </ul>

            </Text>


        </div>
    )

}

