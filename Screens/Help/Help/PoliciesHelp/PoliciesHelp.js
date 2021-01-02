import React from "react";
import { NavLink } from "react-router-dom";
import { Typography } from "antd";
// import styles from "../../../../styles";
import policies1 from "../../../../Assets/ScreenShots/Policies/Policies1.jpg";
import policies2 from "../../../../Assets/ScreenShots/Policies/Policies2.jpg";
import policies3 from "../../../../Assets/ScreenShots/Policies/Policies3.jpg";
import policiesdetail1 from "../../../../Assets/ScreenShots/PoliciesDetail/PoliciesDetail1.jpg";
import policiesdetail2 from "../../../../Assets/ScreenShots/PoliciesDetail/PoliciesDetail2.jpg";
import archivalpolicy1 from "../../../../Assets/ScreenShots/ArchivalPolicy/ArchivalPolicy1.jpg";
import archivalpolicy2 from "../../../../Assets/ScreenShots/ArchivalPolicy/ArchivalPolicy2.jpg";
import archivalpolicy3 from "../../../../Assets/ScreenShots/ArchivalPolicy/ArchivalPolicy3.jpg";
import archivalpolicy4 from "../../../../Assets/ScreenShots/ArchivalPolicy/ArchivalPolicy4.jpg";
import archivalpolicy5 from "../../../../Assets/ScreenShots/ArchivalPolicy/ArchivalPolicy5.jpg";
import archivalpolicy6 from "../../../../Assets/ScreenShots/ArchivalPolicy/ArchivalPolicy6.jpg";
import archivalpolicy7 from "../../../../Assets/ScreenShots/ArchivalPolicy/ArchivalPolicy7.jpg";
import archivalpolicy8 from "../../../../Assets/ScreenShots/ArchivalPolicy/ArchivalPolicy8.jpg";
import archivalpolicy9 from "../../../../Assets/ScreenShots/ArchivalPolicy/ArchivalPolicy9.jpg";
import archivalpolicy10 from "../../../../Assets/ScreenShots/ArchivalPolicy/ArchivalPolicy10.jpg";
import archivalpolicy11 from "../../../../Assets/ScreenShots/ArchivalPolicy/ArchivalPolicy11.jpg";
import archivalpolicy12 from "../../../../Assets/ScreenShots/ArchivalPolicy/ArchivalPolicy12.jpg";
import archivalpolicy13 from "../../../../Assets/ScreenShots/ArchivalPolicy/ArchivalPolicy13.jpg";
import archivalpolicy14 from "../../../../Assets/ScreenShots/ArchivalPolicy/ArchivalPolicy14.jpg";
import archivalpolicy15 from "../../../../Assets/ScreenShots/ArchivalPolicy/ArchivalPolicy15.jpg";
import archivalpolicy16 from "../../../../Assets/ScreenShots/ArchivalPolicy/ArchivalPolicy16.jpg";
import archivalpolicy17 from "../../../../Assets/ScreenShots/ArchivalPolicy/ArchivalPolicy17.jpg";
import archivalpolicy18 from "../../../../Assets/ScreenShots/ArchivalPolicy/ArchivalPolicy18.jpg";
import stubpolicy1 from "../../../../Assets/ScreenShots/StubPolicy/StubPolicy1.jpg";
import stubpolicy2 from "../../../../Assets/ScreenShots/StubPolicy/StubPolicy2.jpg";
import stubpolicy3 from "../../../../Assets/ScreenShots/StubPolicy/StubPolicy3.jpg";
import stubpolicy4 from "../../../../Assets/ScreenShots/StubPolicy/StubPolicy4.jpg";
import stubpolicy5 from "../../../../Assets/ScreenShots/StubPolicy/StubPolicy5.jpg";
import stubpolicy6 from "../../../../Assets/ScreenShots/StubPolicy/StubPolicy6.jpg";
import stubpolicy7 from "../../../../Assets/ScreenShots/StubPolicy/StubPolicy7.jpg";
import stubpolicy8 from "../../../../Assets/ScreenShots/StubPolicy/StubPolicy8.jpg";
import stubpolicy9 from "../../../../Assets/ScreenShots/StubPolicy/StubPolicy9.jpg";
import stubpolicy10 from "../../../../Assets/ScreenShots/StubPolicy/StubPolicy10.jpg";
import stubpolicy11 from "../../../../Assets/ScreenShots/StubPolicy/StubPolicy11.jpg";
import stubpolicy12 from "../../../../Assets/ScreenShots/StubPolicy/StubPolicy12.jpg";
import stubpolicy13 from "../../../../Assets/ScreenShots/StubPolicy/StubPolicy13.jpg";
import stubpolicy14 from "../../../../Assets/ScreenShots/StubPolicy/StubPolicy14.jpg";
import stubpolicy15 from "../../../../Assets/ScreenShots/StubPolicy/StubPolicy15.jpg";
import stubpolicy16 from "../../../../Assets/ScreenShots/StubPolicy/StubPolicy16.jpg";
import foldersyncpolicy1 from "../../../../Assets/ScreenShots/FolderSyncPolicy/FolderSyncPolicy1.jpg";
import foldersyncpolicy2 from "../../../../Assets/ScreenShots/FolderSyncPolicy/FolderSyncPolicy2.jpg";
import foldersyncpolicy3 from "../../../../Assets/ScreenShots/FolderSyncPolicy/FolderSyncPolicy3.jpg";
import foldersyncpolicy4 from "../../../../Assets/ScreenShots/FolderSyncPolicy/FolderSyncPolicy4.jpg";
import foldersyncpolicy5 from "../../../../Assets/ScreenShots/FolderSyncPolicy/FolderSyncPolicy5.jpg";
import foldersyncpolicy6 from "../../../../Assets/ScreenShots/FolderSyncPolicy/FolderSyncPolicy6.jpg";
import foldersyncpolicy7 from "../../../../Assets/ScreenShots/FolderSyncPolicy/FolderSyncPolicy7.jpg";
import retentionpolicy1 from "../../../../Assets/ScreenShots/RetentionPolicy/RetentionPolicy1.jpg";
import retentionpolicy2 from "../../../../Assets/ScreenShots/RetentionPolicy/RetentionPolicy2.jpg";
import retentionpolicy3 from "../../../../Assets/ScreenShots/RetentionPolicy/RetentionPolicy3.jpg";
import retentionpolicy4 from "../../../../Assets/ScreenShots/RetentionPolicy/RetentionPolicy4.jpg";
import retentionpolicy5 from "../../../../Assets/ScreenShots/RetentionPolicy/RetentionPolicy5.jpg";
import retentionpolicy6 from "../../../../Assets/ScreenShots/RetentionPolicy/RetentionPolicy6.jpg";
import retentionpolicy7 from "../../../../Assets/ScreenShots/RetentionPolicy/RetentionPolicy7.jpg";
import retentionpolicy8 from "../../../../Assets/ScreenShots/RetentionPolicy/RetentionPolicy8.jpg";
import retentionpolicy9 from "../../../../Assets/ScreenShots/RetentionPolicy/RetentionPolicy9.jpg";
import retentionpolicy10 from "../../../../Assets/ScreenShots/RetentionPolicy/RetentionPolicy10.jpg";
import retentionpolicy11 from "../../../../Assets/ScreenShots/RetentionPolicy/RetentionPolicy11.jpg";
import retentionpolicy12 from "../../../../Assets/ScreenShots/RetentionPolicy/RetentionPolicy12.jpg";
import retentionpolicy13 from "../../../../Assets/ScreenShots/RetentionPolicy/RetentionPolicy13.jpg";
import retentionpolicy14 from "../../../../Assets/ScreenShots/RetentionPolicy/RetentionPolicy14.jpg";
import retentionpolicy15 from "../../../../Assets/ScreenShots/RetentionPolicy/RetentionPolicy15.jpg";
import retentionpolicy16 from "../../../../Assets/ScreenShots/RetentionPolicy/RetentionPolicy16.jpg";
import retentionpolicy17 from "../../../../Assets/ScreenShots/RetentionPolicy/RetentionPolicy17.jpg";
import retentionpolicy18 from "../../../../Assets/ScreenShots/RetentionPolicy/RetentionPolicy18.jpg";
import retentionpolicy19 from "../../../../Assets/ScreenShots/RetentionPolicy/RetentionPolicy19.jpg";
import retentionpolicy20 from "../../../../Assets/ScreenShots/RetentionPolicy/RetentionPolicy20.jpg";
import retentionpolicy21 from "../../../../Assets/ScreenShots/RetentionPolicy/RetentionPolicy21.jpg";
import retentionpolicy22 from "../../../../Assets/ScreenShots/RetentionPolicy/RetentionPolicy22.jpg";
import retentionpolicy23 from "../../../../Assets/ScreenShots/RetentionPolicy/RetentionPolicy23.jpg";
import retentionpolicy24 from "../../../../Assets/ScreenShots/RetentionPolicy/RetentionPolicy24.jpg";
import retentionpolicy25 from "../../../../Assets/ScreenShots/RetentionPolicy/RetentionPolicy25.jpg";
import retentionpolicy26 from "../../../../Assets/ScreenShots/RetentionPolicy/RetentionPolicy26.jpg";
import retentionpolicy27 from "../../../../Assets/ScreenShots/RetentionPolicy/RetentionPolicy27.jpg";
import retentionpolicy28 from "../../../../Assets/ScreenShots/RetentionPolicy/RetentionPolicy28.jpg";
import retentionpolicy29 from "../../../../Assets/ScreenShots/RetentionPolicy/RetentionPolicy29.jpg";
import retentionpolicy30 from "../../../../Assets/ScreenShots/RetentionPolicy/RetentionPolicy30.jpg";
import retentionpolicy31 from "../../../../Assets/ScreenShots/RetentionPolicy/RetentionPolicy31.jpg";
import retentionpolicy32 from "../../../../Assets/ScreenShots/RetentionPolicy/RetentionPolicy32.jpg";
import retentionpolicy33 from "../../../../Assets/ScreenShots/RetentionPolicy/RetentionPolicy33.jpg";

const { Text, Title } = Typography;

// function policiesDetail()  {
//     return (
//       <div>
//         <div
//           style={{
//             paddingLeft: 40,
//             paddingTop: 3,
//             display: "flex",
//             justifyContent: "center",
//             flexDirection: "column"
//           }}
//         >
//           <Title style={{ color: `#446BA8`, fontSize: "25px" }}>Policies</Title>
//           <Text>
//             Policies presents a dashboard view with the details of{" "}
//             <strong>Archival Policy, Stub Policy, Folder Sync Policy</strong>, and{" "}
//             <strong>Retention Policy</strong>.<br></br>
//             <br></br>
//           </Text>
  
//           <ol>
//             <li>
//               Select the Policies icon{" "}
//               <span>
//                 {" "}
//                 <img alt=''
//                   src={policiesdetail1}
//                   style={{ height: "41px", width: "37px", marginBottom: "40px" }}
//                 ></img>
//               </span>{" "}
//               from the left pane. It presents a dashboard view with the details of{" "}
//               <strong>Archival Policy, Stub Policy, Folder Sync Policy</strong>,
//               and <strong>Retention Policy</strong>.<br></br>
//               <br></br>
//               <img alt=''
//                 src={policiesdetail2}
//                 style={{ height: "306px", width: "651px" }}
//               ></img>
//               <br></br>
//               <br></br>
//             </li>
//           </ol>
//         </div>
//       </div>
//     );
//   };
  
//   const archivalPolicy = () =>{
//     return (
//       <div>
//         <div
//           style={{
//             paddingLeft: 40,
//             paddingTop: 3,
//             display: "flex",
//             justifyContent: "center",
//             flexDirection: "column"
//           }}
//         >
//           <Title style={{ color: `#446BA8`, fontSize: "25px" }}>
//             Archival Policy
//           </Title>
  
//           <ol>
//             <li>
//               <Text>
//                 Select <strong>Archival Policy</strong> icon{" "}
//                 <span>
//                   {" "}
//                   <img alt=''
//                     src={archivalpolicy1}
//                     style={{
//                       height: "41px",
//                       width: "37px",
//                       marginBottom: "40px"
//                     }}
//                   ></img>
//                 </span>{" "}
//                 from the <strong>Policies</strong> menu.
//               </Text>
  
//               <br></br>
//               <img alt=''
//                 src={archivalpolicy2}
//                 style={{ height: "306px", width: "651px" }}
//               ></img>
//               <br></br>
//               <br></br>
//             </li>
//           </ol>
  
//           <Text>
//             Email archiving is implemented to manage large volumes of email
//             messages efficiently, reducing the server storage space used by
//             emails, and enhancing the search and indexing capabilities.
//           </Text>
//           <Text>
//             <br></br>
//             While an organization plans and implements a suitable email archival
//             policy, a following few parameters might be considered:{" "}
//           </Text>
//           <ul>
//             <li>The importance and possible future use of the content. </li>
//             <li>The statutory regulations on preserving the information. </li>
//           </ul>
//           <Text>
//             An archival policy is defined in terms of the users of the email. It
//             may depend on the following:{" "}
//           </Text>
//           <ul>
//             <li>Role of the senders and recipients of emails. </li>
//             <li>The functional group to which the emails belong. </li>
//             <li>
//               The legal requirement on the period of time the information is
//               expected to be preserved.{" "}
//             </li>
//           </ul>
//           <Text>
//             The archiving of emails is mandatory for a certain period of time as
//             emails are also used in litigations. Email archiving is implemented to
//             better manage the large volume of email messages. Archiving reduces
//             the amount of server storage space used by email and enhances the
//             user's email search and indexing capabilities.
//             <br></br>
//             <br></br>
//             It is imperative that a suitable archival policy for an organization
//             be implemented keeping in mind the adherence to the laws and
//             mitigating risks involved in litigations faced by the organization.
//             <br></br>
//             <br></br>
//           </Text>
  
//           <img alt=''
//             src={archivalpolicy3}
//             style={{ height: "242px", width: "313px", margin: "auto" }}
//           ></img>
//           <Text style={{ margin: "auto", fontSize: "18px" }}>
//             <strong>Archival Process</strong>
//           </Text>
//           <br></br>
//           <Text>
//             With SonaVault, emails are archived at the mailbox level. That is, for
//             each mailbox, either all the emails are archived or none. The license
//             mentions the number of mailboxes and the email servers archived.{" "}
//             <br></br>
//             <br></br>
//             SonaVault can archive external emails too. For example, if an
//             organization wants to archive all the emails from customers whether or
//             not the recipient's mailbox is included for archiving, the email IDs
//             of the customers can be specified for archiving. The external
//             mailboxes are also counted for licensing. <br></br>
//             <br></br>
//             The archival policy refers to the specification of the mailboxes to be
//             archived as per the license purchased. For example, if the license is
//             purchased for 100 mailboxes and 5 email servers, you can select 5
//             email servers and 100 mailboxes for archiving. For example, if
//             technical information is handled by a team leader, the team leader's
//             mailbox can be archived instead of the project manager, who handles
//             the management activities of the project. The formulation of an
//             archival policy is based on protecting an organization's sensitive
//             data.
//             <br></br>
//             <br></br>
//           </Text>
  
//           <Text style={{ fontSize: "18px" }}>
//             <strong>Archive All Users </strong>
//           </Text>
//           <ol>
//             <li>
//               Select <strong>Users</strong>.<br></br>
//               <br></br>
//               <img alt=''
//                 src={archivalpolicy4}
//                 style={{ height: "306px", width: "651px" }}
//               ></img>
//               <br></br>
//               <br></br>
//             </li>
//             <li>
//               <Text>
//                 Select the <strong>All Users</strong> option and click{" "}
//                 <strong>Save</strong>. This includes the mailboxes of all the
//                 users, instead of specifying all the names. The mailboxes of all
//                 the users listed in the <strong>Active</strong> Directory having
//                 mailboxes are archived.{" "}
//               </Text>
//               <br></br>
//               <br></br>
//               <img alt=''
//                 src={archivalpolicy5}
//                 style={{ height: "306px", width: "651px" }}
//               ></img>
//               <br></br>
//               <br></br>
//             </li>
//           </ol>
  
//           <Text style={{ fontSize: "18px" }}>
//             <strong>Archive Selected Users - Include/Exclude</strong>
//           </Text>
//           <ol>
//             <li>
//               Select <strong>Users</strong>.<br></br>
//               <br></br>
//               <img alt=''
//                 src={archivalpolicy6}
//                 style={{ height: "306px", width: "651px" }}
//               ></img>
//               <br></br>
//               <br></br>{" "}
//             </li>
//             <li>
//               <Text>
//                 To select a specific set of users, select the{" "}
//                 <strong>Selected</strong> option. <br></br> If you chose to
//                 specify a set of users, there are two options to make the list
//                 easily:{" "}
//               </Text>
//               <ul>
//                 <li>
//                   If you select <strong>Include</strong>, the mailboxes you select
//                   will be added to the list.{" "}
//                 </li>
//                 <li>
//                   If you select <strong>Exclude</strong>, the mailboxes you select
//                   will not be added to the list.
//                 </li>
//                 <li>
//                   If you want to select only a few servers, select the servers
//                   with the <strong>Include</strong> option checked. You can
//                   specify only the few names you want to add.{" "}
//                 </li>
//                 <li>
//                   If you want to select almost all the servers (but not all),
//                   select the servers with the <strong>Exclude</strong> option
//                   checked. Instead of tediously selecting many names, you can
//                   specify only the names you want to exclude.{" "}
//                 </li>
//               </ul>
//               <br></br>
//               <br></br>
//               <img alt=''
//                 src={archivalpolicy7}
//                 style={{ height: "306px", width: "651px" }}
//               ></img>
//               <br></br>
//               <br></br>
//             </li>
  
//             <li>
//               <Text>
//                 Select appropriate <strong>Server, Storage Group</strong>, and{" "}
//                 <strong>Mailbox Store</strong> to filter out the mailboxes. A list
//                 of users is displayed in the <strong>Mailbox (es)</strong> List.
//                 The domain name is included in identifying the mailbox.
//               </Text>
//               <br></br>
//               <br></br>
//               <img alt=''
//                 src={archivalpolicy8}
//                 style={{ height: "306px", width: "651px" }}
//               ></img>
//               <br></br>
//               <br></br>
//               <Text>
//                 <strong>Server</strong> name is the name of the email server from
//                 which the emails are sent or received. The list of servers
//                 includes two more entries, distribution groups, and security
//                 groups along with individual servers. Functional groups of an
//                 organization such as Finance and HR can be considered as
//                 distribution groups. User groups such as Administrators and Guests
//                 can be considered as security groups. 
//                 <br></br>
//                 <br></br>
//                 <strong>Storage Group</strong> is the name of the storage group to
//                 which the mailbox belongs. Select a storage group. 
//                 <br></br>
//                 <br></br>
//                 <strong>
//                   Note: The list of storage groups is displayed based on the
//                   server you selected.{" "}
//                 </strong>
//                 <br></br>
//                 <br></br>A storage group can refer to a functional entity such as
//                 Finance, R&D, Services, Business Development, and BOD. Storage
//                 groups are created on the Exchange Server.
//                 <br></br>
//                 <br></br>
//                 In an organization located in multiple sites, members of the same
//                 functional group might be physically located in multiple sites and
//                 might be using more than one email server. Similarly, a single
//                 email server can handle emails of multiple functional groups.
//                 Therefore, different mailbox stores can be created for each
//                 storage group.
//                 <br></br>
//                 <br></br>
//                 <strong>Mailbox Store:</strong> Each storage group can contain one
//                 or more mailbox stores. For example, if a company has a storage
//                 group called Department, it can have one email store as Server
//                 Group and another as Browser Group.
//                 <br></br>
//                 <br></br>
//                 <strong>
//                   Note: The list of mailbox stores is displayed based on the
//                   storage group you selected.{" "}
//                 </strong>
//               </Text>
//             </li>
//             <br></br>
//             <li>
//               <Text>
//                 Select the mailboxes to be included for archiving. The selected
//                 mailboxes are displayed in the Selected{" "}
//                 <strong>Mailbox (es)</strong> list.{" "}
//               </Text>
  
//               <br></br>
//               <br></br>
//               <img alt=''
//                 src={archivalpolicy9}
//                 style={{ height: "306px", width: "651px" }}
//               ></img>
//               <br></br>
//               <br></br>
//             </li>
//             <li>
//               To include only the selected mailboxes, select the items in the list
//               and click <strong>Add</strong> after checking Include box. If you
//               uncheck the Include box, all mailboxes except the selected mailboxes
//               get added.
//               <br></br>
//               <br></br>
//               <Text>
//                 For example, suppose there are four mailboxes, A, B, C, and D,
//                 displayed in the list. If you select B and C, and click{" "}
//                 <strong>Add</strong> without checking the <strong>Include</strong>{" "}
//                 box, A and D will be added to the{" "}
//                 <strong>Selected Mailbox (es)</strong> list. If you select B and
//                 C, and click <strong>Add</strong> after checking the{" "}
//                 <strong>Include</strong> box, B and C will be added to the{" "}
//                 <strong>Selected Mailbox (es)</strong> list.
//               </Text>
//               <br></br>
//               <br></br>
//               <img alt=''
//                 src={archivalpolicy10}
//                 style={{ height: "306px", width: "651px" }}
//               ></img>
//               <br></br>
//               <br></br>
//             </li>
//             <li>
//               <Text>
//                 Click <strong>Save</strong> to add the selected mailboxes (or
//                 click <strong>Cancel</strong> to exit without adding).
//               </Text>
//               <br></br>
//               <br></br>
//               <img alt=''
//                 src={archivalpolicy11}
//                 style={{ height: "306px", width: "651px" }}
//               ></img>
//               <br></br>
//               <br></br>
//             </li>
//             <li>
//               <Text>
//                 To remove the mailboxes from the{" "}
//                 <strong>Selected Mailbox (es)</strong> list, select the mailbox
//                 and click <strong>Remove</strong>.{" "}
//               </Text>
//               <br></br>
//               <br></br>
//               <img alt=''
//                 src={archivalpolicy12}
//                 style={{ height: "306px", width: "651px" }}
//               ></img>
//               <br></br>
//               <br></br>
//             </li>
//           </ol>
//           <Text>
//             <strong>
//               Notes:<br></br>
//               <br></br>
//               At each stage, the drop-down lists are displayed based on the
//               selection made at the previous selection. <br></br>
//               <br></br>
//               After the mailboxes are selected through this menu, the SonaVault
//               application does not filter the emails of any box. Even spam emails
//               get archived unless the email servers have spam filters.
//             </strong>
//             <br></br>
//             <br></br>
//           </Text>
  
//           <Text style={{ fontSize: "18px" }}>
//             <strong>Archive External Users </strong>
//           </Text>
//           <ol>
//             <li>
//               <Text>
//                 Select <strong>External Users</strong>.
//               </Text>
//               <br></br>
//               <br></br>
//               <img alt=''
//                 src={archivalpolicy13}
//                 style={{ height: "306px", width: "651px" }}
//               ></img>
//               <br></br>
//               <br></br>
//             </li>
//             <li>
//               <Text>
//                 To archive external mailboxes, enter only the email ID of the
//                 external user and click <strong>Add</strong>.
//               </Text>
//               <br></br>
//               <br></br>
//               <img alt=''
//                 src={archivalpolicy14}
//                 style={{ height: "306px", width: "651px" }}
//               ></img>
//               <br></br>
//               <br></br>
//             </li>
//             <li>
//               <Text>
//                 The mailboxes of the specified external users can be seen in the{" "}
//                 <strong>Selected email ID</strong> box.{" "}
//               </Text>
//               <br></br>
//               <br></br>
//               <img alt=''
//                 src={archivalpolicy15}
//                 style={{ height: "306px", width: "651px" }}
//               ></img>
//               <br></br>
//               <br></br>
//             </li>
//             <li>
//               <Text>
//                 Click <strong>Save</strong> to add the external mailboxes or click{" "}
//                 <strong>Cancel</strong> to exit without adding.{" "}
//               </Text>
//               <br></br>
//               <br></br>
//               <img alt=''
//                 src={archivalpolicy16}
//                 style={{ height: "306px", width: "651px" }}
//               ></img>
//               <br></br>
//               <br></br>
//             </li>
//             <Text>
//               The External Users (Include Only) pane can be expanded or collapsed
//               as required. Click{" "}
//               <span>
//                 <img alt=''
//                   src={archivalpolicy17}
//                   style={{ height: "15px", width: "23px", marginBottom: "10px" }}
//                 ></img>
//               </span>{" "}
//               to expand and{" "}
//               <span>
//                 {" "}
//                 <img alt=''
//                   src={archivalpolicy18}
//                   style={{ height: "15px", width: "23px", marginBottom: "10px" }}
//                 ></img>
//               </span>{" "}
//               to collapse.
//               <br></br>
//               <br></br>
//               <strong>
//                 {" "}
//                 Notes: For selecting the external users, the Exclude option is not
//                 available. You need to specify the email IDs of all the external
//                 users.
//                 <br></br>
//                 <br></br>
//                 The archival policy must be defined based on the number of
//                 mailboxes and email servers specified in the license of the
//                 product. The number includes the external users too.{" "}
//               </strong>
//             </Text>
//           </ol>
//         </div>
//       </div>
//     );
//   };
  
  const stubPolicy =
    
      <div>
        <div
          style={{
            paddingLeft: 40,
            paddingTop: 3,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column"
          }}
        >
          <Title style={{ color: `#446BA8`, fontSize: "25px" }}>Policies</Title>
          <ol>
            <li>
              <Text>
                Select <strong>Stub Policy</strong> icon{" "}
                <span>
                  <img alt=''
                    src={stubpolicy1}
                    style={{
                      height: "37px",
                      width: "53px",
                      marginBottom: "30px"
                    }}
                  ></img>
                </span>{" "}
                from the <strong>Policies</strong> menu.
              </Text>
              <br></br>
              <br></br>
              <img alt=''
                src={stubpolicy2}
                style={{ height: "306px", width: "651px" }}
              ></img>
              <br></br>
              <br></br>
              <Text>
                An email server is used by users of different roles and types.
                When emails on an email server are stubbed, the same stubbing
                policy may not be suitable to all the users since emails of some
                users may have to be retained longer than emails of some other
                users. For example, the stub period for emails of a product
                development manager may have to be longer than for those of a
                project manager or a sales executive.<br></br>
                <br></br> The application helps in specifying different stub
                periods for different mailboxes. A stub policy can be defined with
                a specified stub period and the mailboxes to which the stub period
                is applicable. A priority is set for each stub policy. By default,
                the priority is assigned in the order the policy is added. The
                order can be changed as necessary using the{" "}
                <strong>Change Priority</strong> option. A stub policy can be
                enabled or disabled as necessary.
              </Text>
  
              <br></br>
              <br></br>
              <img alt=''
                src={stubpolicy3}
                style={{ height: "306px", width: "651px" }}
              ></img>
              <br></br>
              <br></br>
              <Text>
                <strong>Notes</strong>
              </Text>
              <ul>
                <li>
                  <Text>
                    <strong>
                      For a stub policy to be applied, stubbing must have been
                      enabled on the email server.{" "}
                    </strong>
                  </Text>
                </li>
                <li>
                  <Text>
                    <strong>
                      For users to whom no stub policy is applicable, the stub
                      period specified for the corresponding email server is
                      applied.{" "}
                    </strong>
                  </Text>
                </li>
                <li>
                  <Text>
                    <strong>
                      Only enabled stub policies are applied.  A policy that is
                      not enabled is not given any priority and not considered
                      while stubbing the emails.{" "}
                    </strong>
                  </Text>
                </li>
              </ul>
              <Text>
                <br></br>
                Often, a mailbox may belong to more than one group and, hence,
                more than one stub policy may be applicable to the mailbox. In
                such cases, the stub period may be decided based on the priority
                of the stub policy or the length of the stub period as configured
                in the stub policy settings.  
                <br></br>
                <br></br>
                For example, if there are two stub policies:<br></br>
                <br></br>
              </Text>
              <ol type="i">
                <li>
                  <Text>
                    <strong>PDM</strong> with a stub priority of{" "}
                    <strong>2</strong> and stub period of <strong>500</strong>{" "}
                    days, and{" "}
                  </Text>
                </li>
                <li>
                  <Text>
                    <strong>BDM</strong> with a stub priority of{" "}
                    <strong>3</strong> and stub period of <strong>900</strong>{" "}
                    days applicable to the user John Smith, the stub period can be
                    decided in the following manner:
                  </Text>
                  <ul>
                    <li>
                      <Text>
                        If <strong>Priority</strong> is checked, John Smith's
                        emails older than 500 days from the current date are
                        stubbed{" "}
                      </Text>
                    </li>
                    <li>
                      <Text>
                        If <strong>Maximum Stub Period</strong> is checked, John
                        Smith's emails older than 900 days from the current date
                        are stubbed{" "}
                      </Text>
                    </li>
                  </ul>
                </li>
              </ol>
              <Text>
                <br></br>
                When a stub policy is enabled and is applicable to a user, only
                the stub period changes as per the policy; the other stub settings
                such as whether to stub or delete an email after the stub period,
                and whether an email is selected as per its size or as per it
                having an attachment are applied as per the options set on the
                corresponding email server. <br></br>
                <br></br>
                In the Stub Policy page:
                <br></br>
                <ul>
                  <li>
                    <Text>
                      To add a stub policy, select <strong>Add</strong>. See{" "}
                      <NavLink to="/setting/policies/stub">
                        Add Stub Policy
                      </NavLink>
                    </Text>
                  </li>
                  <li>
                    <Text>
                      To edit a stub policy, select the edit icon{" "}
                      <span>
                        <img alt=''
                          src={stubpolicy4}
                          style={{
                            height: "43px",
                            width: "62px",
                            marginBottom: "30px"
                          }}
                        ></img>
                      </span>{" "}
                      next to the policy. See{" "}
                      <NavLink to="/setting/policies/stub">
                        Edit Stub Policy
                      </NavLink>
                    </Text>
                  </li>
                  <li>
                    <Text>
                      To enable a stub policy, select the policy by checking the
                      box of the policy and select <strong>Enable</strong> in{" "}
                      <strong>Actions</strong>.
                    </Text>
                  </li>
                  <li>
                    <Text>
                      To disable a stub policy, select the policy by checking the
                      box of the policy and select <strong>Disable</strong> in{" "}
                      <strong>Actions</strong>.
                    </Text>
                  </li>
                  <li>
                    <Text>
                      Select the <strong>Stub Policy Setting</strong> as{" "}
                      <strong>Priority</strong> or{" "}
                      <strong>Maximum Stub Period</strong> to resolve the conflict
                      in the stub period when more than one policy is applicable
                      to a user.{" "}
                    </Text>
                  </li>
                  <li>
                    <Text>
                      To change the priority of a stub policy, select{" "}
                      <strong>Change Priority</strong> and, in the box that is
                      displayed, move the policies up or down. See a sample
                      screen.{" "}
                    </Text>
                  </li>
                </ul>
              </Text>
            </li>
          </ol>
          <Text>
            <strong>Add Stub Policy</strong>
            <br></br>
            <br></br>
            To add a stub policy, select <strong>Add</strong> in the Stub Policy
            page.
            <br></br>
            <br></br>
            <img alt=''
              src={stubpolicy5}
              style={{ height: "306px", width: "651px" }}
            ></img>
            <br></br>
            <br></br>
            An <strong>Add Stub</strong> Policy side-drawer opens, where enter the
            details as described below:<br></br>
            <br></br>
          </Text>
          <ol>
            <li>
              <Text>
                In the <strong>Stub Policy</strong> Name box, enter a name to
                identify the policy easily.{" "}
              </Text>
              <br></br>
              <br></br>
              <img alt=''
                src={stubpolicy6}
                style={{ height: "306px", width: "651px" }}
              ></img>
              <br></br>
              <br></br>
            </li>
            <li>
              <Text>
                In the <strong>Stub Policy</strong> Description box, enter a brief
                description of the policy.
              </Text>
              <br></br>
              <br></br>
              <img alt=''
                src={stubpolicy7}
                style={{ height: "306px", width: "651px" }}
              ></img>
              <br></br>
              <br></br>
            </li>
            <li>
              <Text>
                Enter the stub period applicable to the policy. Stub policy is set
                in days.
              </Text>
              <br></br>
              <br></br>
              <img alt=''
                src={stubpolicy8}
                style={{ height: "306px", width: "651px" }}
              ></img>
              <br></br>
              <br></br>
            </li>
            <li>
              <Text>
                Check <strong>Enable</strong> to activate the policy. Only enabled
                stubbing policies are applied. Refer to{" "}
                <strong>Email Server</strong> setup.
              </Text>
              <br></br>
              <br></br>
              <img alt=''
                src={stubpolicy9}
                style={{ height: "306px", width: "651px" }}
              ></img>
              <br></br>
              <br></br>
            </li>
            <li>
              From the <strong>Available Mailboxes</strong> list, select the
              mailboxes to which the stub period should be applied.
              <ul>
                <li>
                  <Text>
                    Select a mailbox and select on the right-arrow button to add
                    to the list of <strong>Selected Mailboxes</strong>. You can
                    use the <strong>Shift</strong> or <strong>Control</strong> key
                    in your keyboard to select multiple mailboxes
                  </Text>
                </li>
                <li>
                  <Text>
                    Select a mailbox and select on the left-arrow button to
                    deselect it.
                  </Text>
                </li>
                <li>
                  <Text>
                    Select the double-right-arrow icon to select all the
                    mailboxes.{" "}
                  </Text>
                </li>
                <li>
                  <Text>
                    Select the double-left-arrow icon to deselect all the
                    mailboxes.{" "}
                  </Text>
                </li>
              </ul>
              <br></br>
              <img alt=''
                src={stubpolicy10}
                style={{ height: "306px", width: "651px" }}
              ></img>
              <br></br>
              <br></br>
            </li>
            <li>
              <Text>
                Select <strong>Save</strong>.
              </Text>
              <br></br>
              <br></br>
              <img alt=''
                src={stubpolicy11}
                style={{ height: "306px", width: "651px" }}
              ></img>
              <br></br>
              <br></br>
            </li>
          </ol>
          <Text>
            <strong>Edit Stub Policy</strong>
            <br></br>
            To edit a stub policy, select the edit icon{" "}
            <span>
              <img alt=''
                src={stubpolicy12}
                style={{
                  height: "43px",
                  width: "62px",
                  marginBottom: "30px"
                }}
              ></img>
            </span>{" "}
            next to it in the <strong>Stub Policy</strong> page.
          </Text>
          <br></br>
          <br></br>
          <img alt=''
            src={stubpolicy13}
            style={{ height: "306px", width: "651px" }}
          ></img>
          <br></br>
          <br></br>
  
          <Text>
            <br></br>The Edit Stub Policy page is displayed.
          </Text>
          <ol>
            <li>
              <Text>
                You can change the{" "}
                <strong>Policy Name, Policy Description,</strong> or{" "}
                <strong>Stub Period</strong>.{" "}
              </Text>
              <br></br>
              <br></br>
              <img alt=''
                src={stubpolicy14}
                style={{ height: "306px", width: "651px" }}
              ></img>
              <br></br>
              <br></br>
            </li>
            <li>
              <Text>Check or uncheck Enable to change the policy status.</Text>
              <br></br>
              <br></br>
              <img alt=''
                src={stubpolicy15}
                style={{ height: "306px", width: "651px" }}
              ></img>
              <br></br>
              <br></br>
            </li>
            <li>
              <Text>
                Modify the list of selected mailboxes as necessary.  Use the arrow
                buttons to modify the list. <br></br>
                <br></br>
              </Text>
            </li>
            <li>
              <Text>
                Select <strong>Save</strong> to save the changes.{" "}
              </Text>
              <br></br>
              <br></br>
              <img alt=''
                src={stubpolicy16}
                style={{ height: "306px", width: "651px" }}
              ></img>
              <br></br>
              <br></br>
            </li>
          </ol>
        </div>
      </div>
    

  
  const folderSyncPolicy =
    
      <div>
        {" "}
        <div
          style={{
            paddingLeft: 40,
            paddingTop: 3,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column"
          }}
        >
          <Title style={{ color: `#446BA8`, fontSize: "25px" }}>
            Folder Sync Policy
          </Title>
          <ol>
            <li>
              <Text>
                Select <strong>Folder Sync Policy</strong> icon{" "}
                <span>
                  <img alt=''
                    src={foldersyncpolicy1}
                    style={{
                      height: "43px",
                      width: "62px",
                      marginBottom: "30px"
                    }}
                  ></img>
                </span>{" "}
                from the Policies menu.
              </Text>
  
              <br></br>
              <br></br>
              <img alt=''
                src={foldersyncpolicy2}
                style={{ height: "306px", width: "651px" }}
              ></img>
              <br></br>
              <br></br>
            </li>
            <Text>
              Select <strong>History,</strong> and you can view the server, and
              completed date.{" "}
            </Text>
  
            <br></br>
            <br></br>
            <img alt=''
              src={foldersyncpolicy3}
              style={{ height: "306px", width: "651px" }}
            ></img>
            <br></br>
            <br></br>
          </ol>
          <Text>
            To sync the folder structure of their mailbox along with the mails:{" "}
          </Text>
          <ol>
            <li>
              <Text>
                Select <strong>Configuration Policy</strong>.
              </Text>
              <br></br>
              <br></br>
              <img alt=''
                src={foldersyncpolicy4}
                style={{ height: "306px", width: "651px" }}
              ></img>
              <br></br>
              <br></br>
            </li>
            <li>
              <Text>
                Select the <strong>Server</strong>.{" "}
              </Text>
              <br></br>
              <br></br>
              <img alt=''
                src={foldersyncpolicy5}
                style={{ height: "306px", width: "651px" }}
              ></img>
              <br></br>
              <br></br>
            </li>
            <li>
              <Text>
                Select <strong>Users</strong> for FolderSync.
              </Text>
              <br></br>
              <br></br>
              <img alt=''
                src={foldersyncpolicy6}
                style={{ height: "306px", width: "651px" }}
              ></img>
              <br></br>
              <br></br>
            </li>
            <li>
              <Text>
                Select <strong>Save.</strong>
              </Text>
            </li>
            <br></br>
            <br></br>
            <img alt=''
              src={foldersyncpolicy7}
              style={{ height: "306px", width: "651px" }}
            ></img>
            <br></br>
            <br></br>
          </ol>
          <Text>
            The FolderSync process gathers all the archived emails for all the
            users selected and the users can view their archived emails from{" "}
            <strong>My Archived Emails</strong> feature.
            <br></br>
            <br></br>
            <strong>
              Note: Since FolderSync is process intensive, it is recommended to
              Sync few users at a time.{" "}
            </strong>
            <br></br>
            <br></br>
            The SonaVault Application displays a copy of all their folders as seen
            in their Outlook client as depicted in the image below. 
          </Text>
        </div>
      </div>
    
  
  const retentionPolicy=
    
      <div>
        <div
          style={{
            paddingLeft: 40,
            paddingTop: 3,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column"
          }}
        >
          <Title style={{ color: `#446BA8`, fontSize: "25px" }}>
            Folder Sync Policy
          </Title>
          <Text>
            Retention policies determine the lifetime of the emails archived
            through the SonaVault application. A retention policy consists of a
            policy to categorize an email, retention period, and grace period, and
            is associated with a priority. {" "}
          </Text>
          <ol>
            <li>
              <Text>
                To define retention policies, select{" "}
                <strong>Retention Policy</strong> icon{" "}
                <span>
                  <img alt=''
                    src={retentionpolicy1}
                    style={{
                      height: "43px",
                      width: "62px",
                      marginBottom: "30px"
                    }}
                  ></img>
                </span>{" "}
                from the <strong>Policies</strong> menu.{" "}
              </Text>
  
              <br></br>
              <br></br>
              <img alt=''
                src={retentionpolicy2}
                style={{ height: "306px", width: "651px" }}
              ></img>
              <br></br>
              <br></br>
            </li>
          </ol>{" "}
          <Text>
            The policy to categorize an email is defined by policy conditions
            created in terms of sender, recipient, subject, and the content of the
            email. <strong>Retention Grace Period</strong> refers to the period
            added to the lifetime of an email after the expiry of the retention
            period. The retention period and grace period are defined in days. A
            retention policy can be temporarily disabled or enabled. <br></br>
            <br></br>
            Retention policies are named meaningfully to identify the policy
            easily. The status of a disabled retention policy is shown with a
            cross mark. <br></br>
            <br></br>
            SonaVault has a default retention policy with a retention period of 7
            years or 2555 days and a grace period of 31 days. The default
            retention policy ensures legal compliance. To change the default
            retention policy and grace period, select the{" "}
            <span>
              <img alt=''
                src={retentionpolicy3}
                style={{
                  height: "43px",
                  width: "62px",
                  marginBottom: "30px"
                }}
              ></img>
            </span>{" "}
            icon. <br></br>
            <br></br>
            <strong>Retention Period:</strong> Enter the retention period in days.
            <br></br>
            <br></br>
            <strong>Retention Grace Period:</strong> Enter the retention grace
            period in days.<br></br>
            <br></br> If all the retention policies including the default policy
            are disabled, no expiry period is attached to the emails.<br></br>
            <br></br>
            <strong>Notes</strong>
            <br></br>
          </Text>
          <ul>
            <li>
              <Text>
                Emails do not get physically deleted even after the expiry of the
                grace period unless a purge policy is executed.
              </Text>
            </li>
            <li>
              <Text>The retention policy is applied to individual emails. </Text>
            </li>
            <li>
              <Text>An email is associated with only one retention policy.</Text>
            </li>
            <li>
              <Text>
                Policies created or modified after an email is archived and
                associated with one of the retention policies do not affect the
                lifetime of the email.
              </Text>
            </li>
          </ul>
          <Text>
            At the time of archiving, SonaVault checks the content of an email and
            associates it with a suitable active retention policy. SonaVault first
            checks the email against the retention policy with the highest
            priority. If the email matches the conditions specified in the
            retention policy, the policy is associated with the email. If the
            email does not fit the retention policy with the highest priority, the
            application checks against the retention policy with the next level of
            priority. The application repeats this process until the email matches
            a configured retention policy. Once an email is associated with a
            retention policy, it will not be considered for any further
            association with other retention policies.<br></br> <br></br>
            If there is no suitable retention policy for an email, the default
            policy is applied provided the default policy is enabled
            <br></br>
            <br></br>
            The <strong>Retention Policy</strong> page displays the existing
            retention policies. The view displays the{" "}
            <strong>
              Name, Priority, Retention Period, Retention Grace Period,
            </strong>{" "}
            and <strong>Status</strong>. You have the option of adding, enabling,
            disabling, deleting, and changing the priority of an archival policy.
            Based on the requirements, a policy can be edited.
            <br></br>
            <br></br>
          </Text>
          <img alt=''
            src={retentionpolicy4}
            style={{ height: "306px", width: "651px" }}
          ></img>
          <br></br>
          <br></br>
          <Text>
            <br></br>
            The default retention policy can be enabled or disabled. Expand the{" "}
            <strong>Default Retention Policy</strong> pane by selecting the double
            arrows at the top right.<br></br>
            <br></br>
          </Text>
          <ul>
            <li>
              <Text>
                To add a retention policy, select Add. See{" "}
                <NavLink to="setting/policies/retention">Add New Retention Policy</NavLink>.
              </Text>
            </li>
            <li>
              <Text>
                To edit a retention policy, select the edit icon{" "}
                <span>
                  <img alt=''
                    src={retentionpolicy5}
                    style={{
                      height: "43px",
                      width: "62px",
                      marginBottom: "30px"
                    }}
                  ></img>
                </span>{" "}
                next to the policy. See{" "}
                <NavLink to="/setting/policies/retention">Edit Retention Policy</NavLink>.
              </Text>
            </li>
            <li>
              <Text>
                To enable a retention policy, select the policy and select{" "}
                <strong>Enable</strong>.{" "}
              </Text>
            </li>
            <li>
              <Text>
                To disable a retention policy, select the policy and select{" "}
                <strong>Disable</strong>.
              </Text>
            </li>
            <li>
              <Text>
                To delete a retention policy, select the policy and select{" "}
                <strong>Delete</strong>.
              </Text>
            </li>
          </ul>
          <Text>
            <strong>Retention Policy Settings</strong>
          </Text>
          <ul>
            <li>
              <Text>
                To select a retention basis, select{" "}
                <strong>Retention Policy</strong> Settings icon{" "}
                <span>
                  <img alt=''
                    src={retentionpolicy6}
                    style={{
                      height: "38px",
                      width: "38px",
                      marginBottom: "30px"
                    }}
                  ></img>
                </span>{" "}
                , located at top-right corner.{" "}
              </Text>
              <br></br>
              <br></br>
              <img alt=''
                src={retentionpolicy7}
                style={{ height: "306px", width: "651px" }}
              ></img>
              <br></br>
              <br></br>
            </li>
            <li>
              <Text>
                A <strong>Retention Policy Setting</strong> side-drawer opens.
                Select <strong>Priority</strong> or{" "}
                <strong>Maximum Retention Period</strong> in{" "}
                <strong>Retention based on</strong>.
              </Text>
  
              <br></br>
              <br></br>
              <img alt=''
                src={retentionpolicy8}
                style={{ height: "306px", width: "651px" }}
              ></img>
              <br></br>
              <br></br>
              <Text>
                Often, a user may belong to more than one group and, hence, more
                than one retention policy may be applicable to the user. In such
                cases, the retention period may be decided based on the priority
                of the policy or the length of the retention period.   <br></br>
                <br></br>
                For example, if two retention policies (i) <strong>
                  CFO
                </strong>{" "}
                with a retention priority of <strong>2</strong> and retention
                period of <strong>500 days</strong> and (ii) <strong>PAM</strong>{" "}
                with a retention priority of <strong>3</strong> and retention
                period of <strong>900 days</strong> are applicable to the user
                John Smith's emails, the retention period can be decided in the
                following manner:
                <ul>
                  <li>
                    <Text>
                      If <strong>Priority</strong> is checked, John Smith's emails
                      get associated with the retention policy CFO, having a
                      retention period of 500 days.
                    </Text>
                  </li>{" "}
                  <li>
                    <Text>
                      If <strong>Maximum Retention</strong> Period is checked,
                      John Smith's emails get associated with the retention policy
                      CFO, having a retention period of 900 days.
                    </Text>
                  </li>
                </ul>
              </Text>
            </li>
            <li>
              <Text>
                To calculate the expiry date of an email, select{" "}
                <strong>Ingestion Date</strong> or{" "}
                <strong>Message Received Date</strong> in{" "}
                <strong>Calculate expiry date</strong> based on.{" "}
              </Text>
  
              <br></br>
              <br></br>
              <img alt=''
                src={retentionpolicy9}
                style={{ height: "306px", width: "651px" }}
              ></img>
              <br></br>
              <br></br>
              <Text>
                Generally, the expiry date of an email is calculated based on the
                date on which the email is sent (Sent Date) and the retention
                period as per the applicable policy. However, sometimes, Sent Date
                may not be clear if the email application used for sending the
                email does not follow the date standards. In such cases, the
                expiry date cannot be calculated based on Sent Date, and you have
                set a rule to calculate the date.  <br></br>
                <br></br>
                If you select <strong>Ingestion Date</strong>, the date on which
                the email is archived by SonaVault is used to calculate the expiry
                date based on the retention period. <br></br>
                <br></br>
                If you select <strong>Message Received Date</strong>, the date on
                which the email is received by the user is used to calculate the
                expiry date based on the retention period.
              </Text>
            </li>
            <Text>
              <strong>
                <br></br>
                Note: If a policy is not likely to be used at all in the future,
                delete it. If a policy is not likely to be used for some time, but
                you are not sure that it will never be used, disable it so that it
                can be enabled again when required.{" "}
              </strong>
              <br></br>
              <br></br>
            </Text>
            <li>
              <Text>
                To change the priority of a retention policy, select{" "}
                <strong>Change Priority. Update Priority</strong> window is
                displayed with a list of the retention policies in the order of
                the priority.<br></br>
                <br></br>
              </Text>
              <ol>
                <li>
                  <Text>
                    Select the <strong>Policy</strong> and select{" "}
                    <strong>Move Up</strong> or <strong>Move Down</strong>. This
                    action resets the priorities of retention policies. The
                    highest priority is indicated by <strong>1</strong>.{" "}
                  </Text>
                </li>
                <li>
                  <Text>
                    Select <strong>Save</strong> to save the changes or select{" "}
                    <strong>Cancel</strong> to exit without saving.
                  </Text>
                </li>
              </ol>
            </li>
          </ul>
          <Text>
            <strong>Notes</strong> <br></br>
          </Text>
          <ul>
            <li>
              <Text>
                <strong>
                  The default retention policy has the least priority.{" "}
                </strong>
              </Text>
            </li>
            <li>
              <Text>
                <strong>
                  Retention policies get applied to emails as per the selection
                  made in Retention Policy Settings. If an email is attached with
                  a retention policy, it will not be considered for any other
                  retention policy irrespective of its priority.{" "}
                </strong>
              </Text>
            </li>
            <li>
              <Text>
                <strong>
                  If you disable or delete a retention policy, emails present in
                  an archive store are not affected. However, no new emails will
                  be associated with this retention policy.{" "}
                </strong>
              </Text>
            </li>
            <li>
              <Text>
                <strong>
                  At the end of the retention period or grace period, expired
                  emails will not be physically deleted from the system. To delete
                  them physically use the <NavLink to="/setting/policies/retention">Purge Policy</NavLink>{" "}
                  option under the Status section of Control Center menu.{" "}
                </strong>
              </Text>
            </li>
          </ul>
          <Text>
            The Default Retention Policy (Lowest Priority) pane can be expanded or
            collapsed as required. Select{" "}
            <span>
              <img alt=''
                src={retentionpolicy10}
                style={{
                  height: "13px",
                  width: "26px",
                  marginBottom: "30px"
                }}
              ></img>
            </span>{" "}
            to expand and{" "}
            <span>
              <img alt=''
                src={retentionpolicy11}
                style={{
                  height: "13px",
                  width: "26px",
                  marginBottom: "30px"
                }}
              ></img>
            </span>{" "}
            to collapse. <br></br>
            <br></br>
            The number of retention policies displayed on one page and the page
            size can be specified as required. The default page size is 20.
            <br></br>
            <br></br>In the <strong>Retention Policy</strong> page, for each
            retention policy, the details such as priority, retention period and
            so on are displayed. If you want to hide any one of the columns,
            select the <strong>Column Configuration</strong> icon{" "}
            <span>
              <img alt=''
                src={retentionpolicy12}
                style={{
                  height: "45px",
                  width: "43spx",
                  marginBottom: "30px"
                }}
              ></img>
            </span>{" "}
            present at the top of the column and uncheck the unwanted column.
          </Text>
          <Text>
            <br></br>
            <strong>Add New Retention Policy </strong>
            <br></br>
            To add a new retention policy, select <strong></strong>Add{" "}
            <span>
              <img alt=''
                src={retentionpolicy13}
                style={{
                  height: "35px",
                  width: "38spx",
                  marginBottom: "30px"
                }}
              ></img>
            </span>{" "}
            in the Retention Policy page
          </Text>
          <br></br>
          <br></br>
          <img alt=''
            src={retentionpolicy14}
            style={{ height: "306px", width: "651px" }}
          ></img>
          <br></br>
          <br></br>
          <Text>
            <br></br>
            In the <strong>Add New Retention Policy</strong> page, enter the
            details as described below: <br></br>
            <br></br>
          </Text>
          <ol>
            <li>
              <Text>
                Enter the <strong>Policy Name, Retention Period,</strong> and{" "}
                <strong>Retention Grace Period</strong>.
              </Text>
              <br></br>
              <br></br>
              <img alt=''
                src={retentionpolicy15}
                style={{ height: "306px", width: "651px" }}
              ></img>
              <br></br>
              <br></br>
            </li>
            <li>
              <Text>
                Check the <strong>Active</strong> box to make the policy active.
                By default, this box is checked.
              </Text>
              <br></br>
              <br></br>
              <img alt=''
                src={retentionpolicy16}
                style={{ height: "306px", width: "651px" }}
              ></img>
              <br></br>
              <br></br>
            </li>
            <li>
              <Text>
                Specify the <strong>Policy Criteria</strong>. <br></br>
                <br></br>A policy can have one or more criteria. A policy
                criterion is defined as a condition of parameters. The condition
                is expressed as the parameter having a certain value.
                <strong>Condition Field</strong> list indicates the parameters.
                They can be{" "}
                <strong>
                  Sender, Mail Size, Attachment Count, Is Lock, Who Lock, Public
                  Folder Option, To,
                </strong>{" "}
                and <strong>Cc</strong>.
              </Text>
              <br></br>
              <br></br>
              <img alt=''
                src={retentionpolicy17}
                style={{ height: "306px", width: "651px" }}
              ></img>
              <br></br>
              <br></br>
              <Text>
                <strong>Condition Type</strong> can be <strong>Contains</strong>{" "}
                and <strong>Does Not Contain</strong> based on the selection made
                in the <strong>Condition Field</strong> list.
              </Text>
              <br></br>
              <br></br>
              <img alt=''
                src={retentionpolicy18}
                style={{ height: "306px", width: "651px" }}
              ></img>
              <br></br>
              <br></br>
              <Text>
                <strong>Condition Value</strong> is specified by you.{" "}
              </Text>
  
              <br></br>
              <br></br>
              <img alt=''
                src={retentionpolicy19}
                style={{ height: "306px", width: "651px" }}
              ></img>
              <br></br>
              <br></br>
              <Text>
                <strong>
                  Note: If the policy has multiple condition types and condition
                  values for the same Condition Field value, the policy is applied
                  even if one of the condition types or condition values matches.
                  However, if multiple values are specified in Condition Field,
                  the policy is applied only if all the Condition Field values
                  match.{" "}
                </strong>
                <br></br>
                <br></br>
                That is, the policy is applied if all the Condition Field values
                match. However, within a single Condition Field value, it is
                enough if one of the condition types or values matches.
              </Text>
              <br></br>
              <br></br>
              <img alt=''
                src={retentionpolicy20}
                style={{ height: "306px", width: "651px" }}
              ></img>
              <br></br>
              <br></br>
              <Text>
                In the above screen, the policy is applied if the value of{" "}
                <strong>Subject Contains</strong> matches the specified value.
                However, the policy is applied only if the <strong>Sender</strong>
                , and <strong>Body</strong> match the values mentioned in the
                condition value. The above setting has the following
                interpretation:{" "}
              </Text>
              <br></br>
              <br></br>
              <Text>
                <strong>Example 1</strong> <br></br>
                <br></br>
                Select <strong>Condition Field</strong> as{" "}
                <strong>
                  Sender, Condition Type as Contains and Condition Value as
                  Performance Appraisal
                </strong>{" "}
                . The policy can be named as Performance Appraisal. All the emails
                that have the words <strong>Performance Appraisal</strong> in
                their subject line get associated with the Performance Appraisal
                policy. The retention period and grace period for this policy can
                be set based on the HR rules. <br></br>
                <br></br>
                <strong>Example 2</strong> <br></br>
                <br></br>
                Select <strong>Condition Field</strong> as <strong>Sender</strong>
                , <strong>Condition Type</strong> as{" "}
                <strong>Does Not Contain</strong>, and{" "}
                <strong>Condition Value as johnsmith@integramicro.com</strong>.
                The policy can be named as CFO with a retention period of 25
                years.
                <br></br>
                <br></br>
                All the emails sent by John Smith, the CFO of the organization are
                retained for 25 years. <br></br>
                <br></br>
                <strong>Example 3</strong> <br></br>
                <br></br>
                Select{" "}
                <strong>
                  Condition Field as To, Condition Type as Contain
                </strong>{" "}
                and <strong>Condition Value as @sonasoft.com</strong>. The policy
                can be named as Users with a retention period of 90 days.
                <br></br>
                <br></br>
                All the emails sent to the users with the domain name of their IDs
                ending with @sonasoft.com are retained for 90 days. <br></br>
                <br></br>
                <strong>Example 4</strong> <br></br>
                <br></br>
                Select{" "}
                <strong>
                  Condition Field as Cc, Condition Type as Contains
                </strong>{" "}
                and <strong>Condition Value as admin</strong>. The policy can be
                named as EAS Administrator with a retention period of 60 days.
                <br></br>
                <br></br>
                The carbon copies of all the emails starting with admin are
                retained for 60 days.<br></br>
                <br></br>
                <strong>Example 5</strong> <br></br>
                <br></br>
                Select{" "}
                <strong>
                  Condition Field as Attachment Count, Condition Type as Contains
                  and Condition Value as IPR
                </strong>
                . The policy can be named as IPR with a retention period of 600
                days.
                <br></br>
                <br></br>All the emails that have attachments relevant to the
                company's IPRs are retained for 600 days.
              </Text>
            </li>
            <li>
              <Text>
                Select <strong>Add</strong>. The criterion gets displayed in the
                list.{" "}
              </Text>
  
              <br></br>
              <br></br>
              <img alt=''
                src={retentionpolicy21}
                style={{ height: "306px", width: "651px" }}
              ></img>
              <br></br>
              <br></br>
              <Text>
                To add another condition to the policy, select{" "}
                <strong>Condition Field, Condition Type</strong> and{" "}
                <strong>Condition Value</strong>, and select <strong>Add</strong>.{" "}
              </Text>
              <br></br>
              <br></br>
              <img alt=''
                src={retentionpolicy22}
                style={{ height: "306px", width: "651px" }}
              ></img>
              <br></br>
              <br></br>
              <Text>
                The list displayed is a filtered list based on previous
                conditions. <br></br>
                <br></br>
                After adding criteria, before completing the definition of a
                policy, any criterion can be removed by selecting the remove icon{" "}
                <span>
                  {" "}
                  <img alt=''
                    src={retentionpolicy23}
                    style={{
                      height: "48px",
                      width: "43spx",
                      marginBottom: "30px"
                    }}
                  ></img>
                </span>{" "}
                next to it.
                <br></br>
                Select <strong>Submit</strong> to save the entries.
                <br></br>
                <br></br>
                <img alt=''
                  src={retentionpolicy24}
                  style={{ height: "306px", width: "651px" }}
                ></img>
                <br></br>
                <br></br>
              </Text>
            </li>
            <li>
              <Text>
                Select <strong>Save</strong> to add the retention policy or select{" "}
                <strong>Cancel</strong> to exit without adding.
              </Text>
              <br></br>
              <br></br>
              <img alt=''
                src={retentionpolicy25}
                style={{ height: "306px", width: "651px" }}
              ></img>
              <br></br>
              <br></br>
            </li>
          </ol>
          <Text>
            <strong>Edit Retention Policy </strong>
          </Text>
          <Text>
            To edit a retention policy, select the edit icon{" "}
            <span>
              {" "}
              <img alt=''
                src={retentionpolicy26}
                style={{
                  height: "43px",
                  width: "62px",
                  marginBottom: "30px"
                }}
              ></img>
            </span>{" "}
            next to it in the <strong>Retention Policy</strong> page.{" "}
          </Text>
          <br></br>
          <br></br>
          <img alt=''
            src={retentionpolicy27}
            style={{ height: "306px", width: "651px" }}
          ></img>
          <br></br>
          <br></br>
          <Text>
            The <strong>Edit Retention Policy</strong> page is displayed.{" "}
          </Text>
          <ol>
            <li>
              <Text>
                You can change the <strong>Policy Name, Retention Period</strong>,
                and <strong>Retention Grace Period</strong>.
              </Text>
  
              <br></br>
              <br></br>
              <img alt=''
                src={retentionpolicy28}
                style={{ height: "306px", width: "651px" }}
              ></img>
              <br></br>
              <br></br>
            </li>
            <li>
              <Text>
                Check or uncheck <strong>Active</strong> box to change the policy
                status.{" "}
              </Text>
            </li>
            <br></br>
            <br></br>
            <img alt=''
              src={retentionpolicy29}
              style={{ height: "306px", width: "651px" }}
            ></img>
            <br></br>
            <br></br>
            <li>
              <Text>
                You can add a new criterion to the policy or modify or delete
                existing criteria of the policy. Select <strong>Add</strong>. The
                criterion gets displayed in the list.{" "}
              </Text>
            </li>
            <br></br>
            <br></br>
            <img alt=''
              src={retentionpolicy30}
              style={{ height: "306px", width: "651px" }}
            ></img>
            <br></br>
            <br></br>
            <li>
              <Text>
                Select <strong>Submit</strong>.{" "}
              </Text>
              <br></br>
              <br></br>
              <img alt=''
                src={retentionpolicy31}
                style={{ height: "306px", width: "651px" }}
              ></img>
              <br></br>
              <br></br>
            </li>
            <li>
              <Text>
                Select <strong>Save</strong> to edit the retention policy or
                select <strong>Cancel</strong> to exit without editing
              </Text>
              <br></br>
              <br></br>
              <img alt=''
                src={retentionpolicy32}
                style={{ height: "306px", width: "651px" }}
              ></img>
              <br></br>
              <br></br>
            </li>
            <Text>
              <strong>
                Note: If the policy has multiple condition types and condition
                values for the same Condition Field value, the policy is applied
                even if one of the condition types or condition values matches.
                However, if multiple values are specified in Condition Field, the
                policy is applied only if all the Condition Field values match.
                <br></br>
                <br></br>
                That is, the policy is applied if all the Condition Field values
                match. However, within a single Condition Field value, it is
                enough if one of the condition types or values matches.
              </strong>
            </Text>
            <br></br>
            <br></br>
            <img alt=''
              src={retentionpolicy33}
              style={{ height: "306px", width: "651px" }}
            ></img>
            <br></br>
            <br></br>
            <Text>
              In the above screen, the policy is applied if the value{" "}
              <strong>of Subject Contains</strong> or{" "}
              <strong>Subject Starts With</strong> matches the specified value.
              However, the policy is applied only if the{" "}
              <strong>Subject, Sender</strong>, and <strong>Body</strong>
              match the values mentioned in the condition value.
            </Text>
          </ol>
        </div>
      </div>


function Policies() {
  return (
    <div>
      <div
        style={{
          paddingLeft: 40,
          paddingTop: 3,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column"
        }}
      >
        <Title
          style={{ color: `#F05A28`, fontSize: 50, padding: "15px 0 0 0px" }}
        >
          Policies
        </Title>
        <Text>
          Policies section of SonaVault presents a dashboard view of Control
          Center, Configuration, Security, Notification and Policies of the
          system.
          <br></br>
          <br></br>
        </Text>
        <Text>
          To access <strong>Policies:</strong>
        </Text>
        <ol>
          <li>
            <Text>
              Select <strong>Policies</strong> from SonaVault homepage.{" "}
            </Text>
            <br></br>
            <br></br>
            <img alt=''
              src={policies1}
              style={{ height: "306px", width: "651px" }}
            ></img>
            <br></br>
            <br></br>
          </li>
          <li>
            <Text>
              This navigates you to the <strong>Policies</strong> homepage. On
              the left pane, you can view five sections:{" "}
              <strong>
                Control Center, Configuration, Security, Notification, and
                Policies.
              </strong>
            </Text>
          </li>

          <br></br>
          <br></br>
          <img alt=''
            src={policies2}
            style={{ height: "306px", width: "651px" }}
          ></img>
          <br></br>
          <br></br>
        </ol>
        <Text>
          <strong>
            {" "}
            Note: Select the Refresh icon{" "}
            <span>
              <img alt=''
                src={policies3}
                style={{ height: "41px", width: "49px", marginBottom: "40px" }}
              ></img>
            </span>{" "}
            to view the updated information.
          </strong>
        </Text>
      </div>
      {policiesDetail}
      {archivalPolicy}
      {stubPolicy}
      {folderSyncPolicy}
      {retentionPolicy}
       {/* <archivalPolicy></archivalPolicy>
       <stubPolicy></stubPolicy>
       <folderSyncPolicy></folderSyncPolicy>
       <retentionPolicy></retentionPolicy> */}
    
    </div>
    
  );
}



export default Policies;
const policiesDetail = <div>
        <div
          style={{
            paddingLeft: 40,
            paddingTop: 3,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column"
          }}
        >
          <Title style={{ color: `#446BA8`, fontSize: "25px" }}>Policies</Title>
          <Text>
            Policies presents a dashboard view with the details of{" "}
            <strong>Archival Policy, Stub Policy, Folder Sync Policy</strong>, and{" "}
            <strong>Retention Policy</strong>.<br></br>
            <br></br>
          </Text>
  
          <ol>
            <li>
              Select the Policies icon{" "}
              <span>
                {" "}
                <img alt=''
                  src={policiesdetail1}
                  style={{ height: "41px", width: "37px", marginBottom: "40px" }}
                ></img>
              </span>{" "}
              from the left pane. It presents a dashboard view with the details of{" "}
              <strong>Archival Policy, Stub Policy, Folder Sync Policy</strong>,
              and <strong>Retention Policy</strong>.<br></br>
              <br></br>
              <img alt=''
                src={policiesdetail2}
                style={{ height: "306px", width: "651px" }}
              ></img>
              <br></br>
              <br></br>
            </li>
          </ol>
        </div>
      </div>

  
const archivalPolicy =
    
      <div>
        <div
          style={{
            paddingLeft: 40,
            paddingTop: 3,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column"
          }}
        >
          <Title style={{ color: `#446BA8`, fontSize: "25px" }}>
            Archival Policy
          </Title>
  
          <ol>
            <li>
              <Text>
                Select <strong>Archival Policy</strong> icon{" "}
                <span>
                  {" "}
                  <img alt=''
                    src={archivalpolicy1}
                    style={{
                      height: "41px",
                      width: "37px",
                      marginBottom: "40px"
                    }}
                  ></img>
                </span>{" "}
                from the <strong>Policies</strong> menu.
              </Text>
  
              <br></br>
              <img alt=''
                src={archivalpolicy2}
                style={{ height: "306px", width: "651px" }}
              ></img>
              <br></br>
              <br></br>
            </li>
          </ol>
  
          <Text>
            Email archiving is implemented to manage large volumes of email
            messages efficiently, reducing the server storage space used by
            emails, and enhancing the search and indexing capabilities.
          </Text>
          <Text>
            <br></br>
            While an organization plans and implements a suitable email archival
            policy, a following few parameters might be considered:{" "}
          </Text>
          <ul>
            <li>The importance and possible future use of the content. </li>
            <li>The statutory regulations on preserving the information. </li>
          </ul>
          <Text>
            An archival policy is defined in terms of the users of the email. It
            may depend on the following:{" "}
          </Text>
          <ul>
            <li>Role of the senders and recipients of emails. </li>
            <li>The functional group to which the emails belong. </li>
            <li>
              The legal requirement on the period of time the information is
              expected to be preserved.{" "}
            </li>
          </ul>
          <Text>
            The archiving of emails is mandatory for a certain period of time as
            emails are also used in litigations. Email archiving is implemented to
            better manage the large volume of email messages. Archiving reduces
            the amount of server storage space used by email and enhances the
            user's email search and indexing capabilities.
            <br></br>
            <br></br>
            It is imperative that a suitable archival policy for an organization
            be implemented keeping in mind the adherence to the laws and
            mitigating risks involved in litigations faced by the organization.
            <br></br>
            <br></br>
          </Text>
  
          <img alt=''
            src={archivalpolicy3}
            style={{ height: "242px", width: "313px", margin: "auto" }}
          ></img>
          <Text style={{ margin: "auto", fontSize: "18px" }}>
            <strong>Archival Process</strong>
          </Text>
          <br></br>
          <Text>
            With SonaVault, emails are archived at the mailbox level. That is, for
            each mailbox, either all the emails are archived or none. The license
            mentions the number of mailboxes and the email servers archived.{" "}
            <br></br>
            <br></br>
            SonaVault can archive external emails too. For example, if an
            organization wants to archive all the emails from customers whether or
            not the recipient's mailbox is included for archiving, the email IDs
            of the customers can be specified for archiving. The external
            mailboxes are also counted for licensing. <br></br>
            <br></br>
            The archival policy refers to the specification of the mailboxes to be
            archived as per the license purchased. For example, if the license is
            purchased for 100 mailboxes and 5 email servers, you can select 5
            email servers and 100 mailboxes for archiving. For example, if
            technical information is handled by a team leader, the team leader's
            mailbox can be archived instead of the project manager, who handles
            the management activities of the project. The formulation of an
            archival policy is based on protecting an organization's sensitive
            data.
            <br></br>
            <br></br>
          </Text>
  
          <Text style={{ fontSize: "18px" }}>
            <strong>Archive All Users </strong>
          </Text>
          <ol>
            <li>
              Select <strong>Users</strong>.<br></br>
              <br></br>
              <img alt=''
                src={archivalpolicy4}
                style={{ height: "306px", width: "651px" }}
              ></img>
              <br></br>
              <br></br>
            </li>
            <li>
              <Text>
                Select the <strong>All Users</strong> option and click{" "}
                <strong>Save</strong>. This includes the mailboxes of all the
                users, instead of specifying all the names. The mailboxes of all
                the users listed in the <strong>Active</strong> Directory having
                mailboxes are archived.{" "}
              </Text>
              <br></br>
              <br></br>
              <img alt=''
                src={archivalpolicy5}
                style={{ height: "306px", width: "651px" }}
              ></img>
              <br></br>
              <br></br>
            </li>
          </ol>
  
          <Text style={{ fontSize: "18px" }}>
            <strong>Archive Selected Users - Include/Exclude</strong>
          </Text>
          <ol>
            <li>
              Select <strong>Users</strong>.<br></br>
              <br></br>
              <img alt=''
                src={archivalpolicy6}
                style={{ height: "306px", width: "651px" }}
              ></img>
              <br></br>
              <br></br>{" "}
            </li>
            <li>
              <Text>
                To select a specific set of users, select the{" "}
                <strong>Selected</strong> option. <br></br> If you chose to
                specify a set of users, there are two options to make the list
                easily:{" "}
              </Text>
              <ul>
                <li>
                  If you select <strong>Include</strong>, the mailboxes you select
                  will be added to the list.{" "}
                </li>
                <li>
                  If you select <strong>Exclude</strong>, the mailboxes you select
                  will not be added to the list.
                </li>
                <li>
                  If you want to select only a few servers, select the servers
                  with the <strong>Include</strong> option checked. You can
                  specify only the few names you want to add.{" "}
                </li>
                <li>
                  If you want to select almost all the servers (but not all),
                  select the servers with the <strong>Exclude</strong> option
                  checked. Instead of tediously selecting many names, you can
                  specify only the names you want to exclude.{" "}
                </li>
              </ul>
              <br></br>
              <br></br>
              <img alt=''
                src={archivalpolicy7}
                style={{ height: "306px", width: "651px" }}
              ></img>
              <br></br>
              <br></br>
            </li>
  
            <li>
              <Text>
                Select appropriate <strong>Server, Storage Group</strong>, and{" "}
                <strong>Mailbox Store</strong> to filter out the mailboxes. A list
                of users is displayed in the <strong>Mailbox (es)</strong> List.
                The domain name is included in identifying the mailbox.
              </Text>
              <br></br>
              <br></br>
              <img alt=''
                src={archivalpolicy8}
                style={{ height: "306px", width: "651px" }}
              ></img>
              <br></br>
              <br></br>
              <Text>
                <strong>Server</strong> name is the name of the email server from
                which the emails are sent or received. The list of servers
                includes two more entries, distribution groups, and security
                groups along with individual servers. Functional groups of an
                organization such as Finance and HR can be considered as
                distribution groups. User groups such as Administrators and Guests
                can be considered as security groups. 
                <br></br>
                <br></br>
                <strong>Storage Group</strong> is the name of the storage group to
                which the mailbox belongs. Select a storage group. 
                <br></br>
                <br></br>
                <strong>
                  Note: The list of storage groups is displayed based on the
                  server you selected.{" "}
                </strong>
                <br></br>
                <br></br>A storage group can refer to a functional entity such as
                Finance, R&D, Services, Business Development, and BOD. Storage
                groups are created on the Exchange Server.
                <br></br>
                <br></br>
                In an organization located in multiple sites, members of the same
                functional group might be physically located in multiple sites and
                might be using more than one email server. Similarly, a single
                email server can handle emails of multiple functional groups.
                Therefore, different mailbox stores can be created for each
                storage group.
                <br></br>
                <br></br>
                <strong>Mailbox Store:</strong> Each storage group can contain one
                or more mailbox stores. For example, if a company has a storage
                group called Department, it can have one email store as Server
                Group and another as Browser Group.
                <br></br>
                <br></br>
                <strong>
                  Note: The list of mailbox stores is displayed based on the
                  storage group you selected.{" "}
                </strong>
              </Text>
            </li>
            <br></br>
            <li>
              <Text>
                Select the mailboxes to be included for archiving. The selected
                mailboxes are displayed in the Selected{" "}
                <strong>Mailbox (es)</strong> list.{" "}
              </Text>
  
              <br></br>
              <br></br>
              <img alt=''
                src={archivalpolicy9}
                style={{ height: "306px", width: "651px" }}
              ></img>
              <br></br>
              <br></br>
            </li>
            <li>
              To include only the selected mailboxes, select the items in the list
              and click <strong>Add</strong> after checking Include box. If you
              uncheck the Include box, all mailboxes except the selected mailboxes
              get added.
              <br></br>
              <br></br>
              <Text>
                For example, suppose there are four mailboxes, A, B, C, and D,
                displayed in the list. If you select B and C, and click{" "}
                <strong>Add</strong> without checking the <strong>Include</strong>{" "}
                box, A and D will be added to the{" "}
                <strong>Selected Mailbox (es)</strong> list. If you select B and
                C, and click <strong>Add</strong> after checking the{" "}
                <strong>Include</strong> box, B and C will be added to the{" "}
                <strong>Selected Mailbox (es)</strong> list.
              </Text>
              <br></br>
              <br></br>
              <img alt=''
                src={archivalpolicy10}
                style={{ height: "306px", width: "651px" }}
              ></img>
              <br></br>
              <br></br>
            </li>
            <li>
              <Text>
                Click <strong>Save</strong> to add the selected mailboxes (or
                click <strong>Cancel</strong> to exit without adding).
              </Text>
              <br></br>
              <br></br>
              <img alt=''
                src={archivalpolicy11}
                style={{ height: "306px", width: "651px" }}
              ></img>
              <br></br>
              <br></br>
            </li>
            <li>
              <Text>
                To remove the mailboxes from the{" "}
                <strong>Selected Mailbox (es)</strong> list, select the mailbox
                and click <strong>Remove</strong>.{" "}
              </Text>
              <br></br>
              <br></br>
              <img alt=''
                src={archivalpolicy12}
                style={{ height: "306px", width: "651px" }}
              ></img>
              <br></br>
              <br></br>
            </li>
          </ol>
          <Text>
            <strong>
              Notes:<br></br>
              <br></br>
              At each stage, the drop-down lists are displayed based on the
              selection made at the previous selection. <br></br>
              <br></br>
              After the mailboxes are selected through this menu, the SonaVault
              application does not filter the emails of any box. Even spam emails
              get archived unless the email servers have spam filters.
            </strong>
            <br></br>
            <br></br>
          </Text>
  
          <Text style={{ fontSize: "18px" }}>
            <strong>Archive External Users </strong>
          </Text>
          <ol>
            <li>
              <Text>
                Select <strong>External Users</strong>.
              </Text>
              <br></br>
              <br></br>
              <img alt=''
                src={archivalpolicy13}
                style={{ height: "306px", width: "651px" }}
              ></img>
              <br></br>
              <br></br>
            </li>
            <li>
              <Text>
                To archive external mailboxes, enter only the email ID of the
                external user and click <strong>Add</strong>.
              </Text>
              <br></br>
              <br></br>
              <img alt=''
                src={archivalpolicy14}
                style={{ height: "306px", width: "651px" }}
              ></img>
              <br></br>
              <br></br>
            </li>
            <li>
              <Text>
                The mailboxes of the specified external users can be seen in the{" "}
                <strong>Selected email ID</strong> box.{" "}
              </Text>
              <br></br>
              <br></br>
              <img alt=''
                src={archivalpolicy15}
                style={{ height: "306px", width: "651px" }}
              ></img>
              <br></br>
              <br></br>
            </li>
            <li>
              <Text>
                Click <strong>Save</strong> to add the external mailboxes or click{" "}
                <strong>Cancel</strong> to exit without adding.{" "}
              </Text>
              <br></br>
              <br></br>
              <img alt=''
                src={archivalpolicy16}
                style={{ height: "306px", width: "651px" }}
              ></img>
              <br></br>
              <br></br>
            </li>
            <Text>
              The External Users (Include Only) pane can be expanded or collapsed
              as required. Click{" "}
              <span>
                <img alt=''
                  src={archivalpolicy17}
                  style={{ height: "15px", width: "23px", marginBottom: "10px" }}
                ></img>
              </span>{" "}
              to expand and{" "}
              <span>
                {" "}
                <img alt=''
                  src={archivalpolicy18}
                  style={{ height: "15px", width: "23px", marginBottom: "10px" }}
                ></img>
              </span>{" "}
              to collapse.
              <br></br>
              <br></br>
              <strong>
                {" "}
                Notes: For selecting the external users, the Exclude option is not
                available. You need to specify the email IDs of all the external
                users.
                <br></br>
                <br></br>
                The archival policy must be defined based on the number of
                mailboxes and email servers specified in the license of the
                product. The number includes the external users too.{" "}
              </strong>
            </Text>
          </ol>
        </div>
      </div>
    
  