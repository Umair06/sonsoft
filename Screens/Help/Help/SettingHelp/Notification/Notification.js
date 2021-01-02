import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Typography, Menu } from "antd";
// import style from "../../../../../styles";
// import SMTP from "./SMTPSettings/SMTPSettings";
// import Notification from "./Notification/Notification";
// import AddNewNotification from "./Notification/AddNewNotification";
import Theme from "../../../../../Assets/Theme/Theme";
import notification1 from "../../../../../Assets/ScreenShots/Notification/Notification1.jpg";
import notification2 from "../../../../../Assets/ScreenShots/Notification/Notification2.jpg";
import notification3 from "../../../../../Assets/ScreenShots/Notification/Notification3.jpg";
import notification4 from "../../../../../Assets/ScreenShots/Notification/Notification4.jpg";
import notification5 from "../../../../../Assets/ScreenShots/Notification/Notification5.jpg";
import notification6 from "../../../../../Assets/ScreenShots/Notification/Notification6.jpg";
import notification7 from "../../../../../Assets/ScreenShots/Notification/Notification7.jpg";
import notification8 from "../../../../../Assets/ScreenShots/Notification/Notification8.jpg";
import notification9 from "../../../../../Assets/ScreenShots/Notification/Notification9.jpg";
import notification10 from "../../../../../Assets/ScreenShots/Notification/Notification10.jpg";
import notification11 from "../../../../../Assets/ScreenShots/Notification/Notification11.jpg";
import notification12 from "../../../../../Assets/ScreenShots/Notification/Notification12.jpg";
import notification13 from "../../../../../Assets/ScreenShots/Notification/Notification13.jpg";
import notification14 from "../../../../../Assets/ScreenShots/Notification/Notification14.jpg";
import notification15 from "../../../../../Assets/ScreenShots/Notification/Notification15.jpg";
import notification16 from "../../../../../Assets/ScreenShots/Notification/Notification16.jpg";
import notification17 from "../../../../../Assets/ScreenShots/Notification/Notification17.jpg";
import notification18 from "../../../../../Assets/ScreenShots/Notification/Notification18.jpg";
import notification19 from "../../../../../Assets/ScreenShots/Notification/Notification19.jpg";
import notification20 from "../../../../../Assets/ScreenShots/Notification/Notification20.jpg";
import notification21 from "../../../../../Assets/ScreenShots/Notification/Notification21.jpg";
import notification22 from "../../../../../Assets/ScreenShots/Notification/Notification22.jpg";
import notification23 from "../../../../../Assets/ScreenShots/Notification/Notification23.jpg";

// const { SubMenu } = Menu;
const { Text, Title } = Typography;
// const { TabPane } = Tabs;
const { color } = Theme;

class ControlCenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Edit: false,
      addnew: false,
      notification: true
    };
  }
  componentDidMount() {
    this.callBack("1");
  }
  callBack = key => {
    if (key === "1") {
    }
    if (key === "2") {
      this.setState({
        notification: true,
        addNotification: false
      });
    }
    if (key === "3") {
    }
    if (key === "4") {
    }
  };
  TabClick = key => {
    if (key === "3") {
      this.setState({
        addnew: false
      });
    }
    if (key === "4") {
      this.setState({
        addnew: false
      });
    }
  };
  change = key => {
    if (key === "1") {
      this.setState({
        flag: false
      });
    }
  };
  openComponent = val => {
    this.setState({
      [val]: true
    });
    this.callBack("2");
  };

  menu = (
    <Menu onChange={this.change} style={{ marginTop: "8px" }}>
      <Menu.Item key="0">ADD New Notification</Menu.Item>
      <Menu.Item key="1">Edit Notification</Menu.Item>
    </Menu>
  );

  render() {
    return (
      <div>
       <div style={{ paddingLeft: 40, paddingTop: 3, display: "flex", justifyContent: "center", flexDirection: "column" }}>
                <Title style={{ color: `${color.Orange}`, padding: "15px 0 0 0px", fontSize: 50 }}>{"Notification"}</Title>
          <Text>
            Notification presents a dashboard view with the details of SMTP
            Settings and Notification of the system.{" "}
          </Text>
          <ol>
            <li>
              Select the Notification icon{" "}
              <span>
                <img alt=''
                  src={notification1}
                  style={{
                    height: "41px",
                    width: "36px",
                    marginBottom: "30px"
                  }}
                ></img>
              </span>{" "}
              from the left pane. It presents a dashboard view with the details
              of <strong>SMTP Settings</strong> and{" "}
              <strong>Notification</strong> of the system. <br></br>
              <br></br>
              <img alt=''
                src={notification2}
                style={{ height: "306px", width: "651px" }}
              ></img>
              <br></br>
              <br></br>
            </li>
          </ol>
          <Title style={{ color: `#446BA8`, fontSize: "18px" }}>
            SMTP Settings/SMTP Server
          </Title>
          <Text>
            The SonaVault application system sends notifications through email
            to its users regarding changes in the system such as addition or
            deletion of users, changes in the policies, and archive stores.
            SonaVault system provides a menu to configure the SMTP settings to
            send these notifications.{" "}
          </Text>
          <ol>
            <li>
              <Text>
                To configure SMTP for email notifications, select the{" "}
                <strong>SMTP Setting</strong> icon{" "}
                <span>
                  <img alt=''
                    src={notification3}
                    style={{
                      height: "41px",
                      width: "36px",
                      marginBottom: "30px"
                    }}
                  ></img>
                </span>{" "}
                from the <strong>Notification</strong> menu. Enter the details
                as described below:{" "}
              </Text>
              <br></br>
              <br></br>
              <img alt=''
                src={notification4}
                style={{ height: "306px", width: "651px" }}
              ></img>
              <br></br>
              <br></br>
              <ul>
                <li>
                  <Text>
                    <strong>Sender's Email:</strong> This is the email address
                    used by SonaVault to send notifications. Include the domain
                    name in the email address. Generally, this is a specific ID
                    used by SonaVault, and need not be the email ID of the
                    administrator or the super user. Ensure that this ID exists
                    on the email server.{" "}
                  </Text>
                  <br></br>
                  <br></br>
                  <img alt=''
                    src={notification5}
                    style={{ height: "306px", width: "651px" }}
                  ></img>
                  <br></br>
                  <br></br>
                  <Text>
                    <strong>
                      Note: The email ID is authenticated, and a test email is
                      sent to the sender's address. If the ID does not exist,
                      the system shows an error message and does not accept the
                      email ID.{" "}
                    </strong>
                  </Text>
                </li>
                <br></br>
                <li>
                  <Text>
                    <strong>SMTP Host: </strong>This is the SMTP host. Enter the
                    IP address or host name including the domain name
                    (preferably, IP address).{" "}
                  </Text>
                  <br></br>
                  <br></br>
                  <img alt=''
                    src={notification6}
                    style={{ height: "306px", width: "651px" }}
                  ></img>
                  <br></br>
                  <br></br>
                </li>
                <br></br>
                <li>
                  <Text>
                    <strong>Port: </strong>It is the port number used by SMTP
                    for outgoing email. The port is generally set to 25. Check
                    the port used and change if necessary.
                  </Text>
                  <br></br>
                  <br></br>
                  <img alt=''
                    src={notification7}
                    style={{ height: "306px", width: "651px" }}
                  ></img>
                  <br></br>
                  <br></br>
                </li>
                <li>
                  <Text>
                    <strong>Authentication Required: </strong>Check this box if
                    user authentication is required by SMTP for sending emails.
                    Refer to your SMTP server settings whether authentication is
                    required.{" "}
                  </Text>
                  <br></br>
                  <br></br>
                  <img alt=''
                    src={notification8}
                    style={{ height: "306px", width: "651px" }}
                  ></img>
                  <br></br>
                  <br></br>
                </li>
                <li>
                  <Text>
                    <strong>Credentials: </strong>This refers to the
                    authentication credentials for SMTP. Enter the username and
                    password for SMTP authentication in the corresponding boxes.{" "}
                  </Text>{" "}
                  <br></br>
                  <br></br>
                  <img alt=''
                    src={notification9}
                    style={{ height: "306px", width: "651px" }}
                  ></img>
                  <br></br>
                  <br></br>
                </li>
              </ul>
            </li>

            <li>
              <Text>
                Select <strong>Save</strong> to save the SMTP configuration
                settings or select <strong>Cancel</strong> to exit without
                saving.{" "}
              </Text>
              <br></br>
              <br></br>
              <img alt=''
                src={notification10}
                style={{ height: "306px", width: "651px" }}
              ></img>
              <br></br>
              <br></br>
            </li>
          </ol>
          <Title style={{ color: `#446BA8`, fontSize: "18px" }}>
            Notification
          </Title>
          <Text>
            The SonaVault application can undergo configuration (settings)
            changes such as configuration, archival policies, retention
            policies, and user roles, and a certain set of users of the system
            must be notified of the changes. However, not all users need to know
            about all the changes. The EAS administrator decides the changes
            that need to be notified and the people who need to be notified for
            each notification. Through the <strong>Notification</strong> menu,
            the notifications and the recipients can be specified. <br></br>
            <br></br>
            <strong>
              Note: SonaVault has a predefined set of notification types. You
              cannot add new types. For the default notifications, you can
              specify the recipients.{" "}
            </strong>
          </Text>
          <br></br>
          <ol>
            <li>
              <Text>
                To configure the notifications, select the{" "}
                <strong>Notification</strong> icon{" "}
                <span>
                  <img alt=''
                    src={notification11}
                    style={{
                      height: "41px",
                      width: "36px",
                      marginBottom: "30px"
                    }}
                  ></img>
                </span>{" "}
                from the Notification menu.{" "}
              </Text>
              <br></br>
              <br></br>
              <img alt=''
                src={notification12}
                style={{ height: "306px", width: "651px" }}
              ></img>
              <br></br>
              <br></br>
            </li>
            <li>
              <Text>
                To select a notification, check its box. To select all the
                notifications, check the box in the header row of the
                notifications table.{" "}
              </Text>
              <br></br>
              <br></br>
              <img alt=''
                src={notification13}
                style={{ height: "306px", width: "651px" }}
              ></img>
              <br></br>
              <br></br>
              <ul>
                <li>
                  <Text>
                    To specify the recipients of a notification, select{" "}
                    <strong>Add Notification</strong>. See{" "}
                    <NavLink to="/setting/notification/notification">Add New Notification</NavLink>.{" "}
                  </Text>
                </li>
                <li>
                  <Text>
                    To edit a notification, select on the edit icon{" "}
                    <span>
                      <img alt=''
                        src={notification14}
                        style={{
                          height: "43px",
                          width: "62px",
                          marginBottom: "30px"
                        }}
                      ></img>
                    </span>{" "}
                    . See <NavLink to="/setting/notification/notification">Edit Notification</NavLink>.{" "}
                  </Text>
                </li>
                <li>
                  <Text>
                    To delete a notification, select the notification by
                    checking its box and select <strong>Delete</strong>. In the{" "}
                    <strong>Confirmation</strong> dialog, select{" "}
                    <strong>Yes</strong>.{" "}
                  </Text>
                </li>
                <br></br>
                <li>
                  <Text>
                    To restore a deleted notification, select{" "}
                    <strong>Add Notification</strong>. In the{" "}
                    <strong>Add New Notification</strong> page, select the
                    deleted notification type from the drop-down list, enter the
                    recipients’ names and select
                    <strong>Save</strong>. You can check the list of
                    notifications in the
                    <strong> Notification</strong> master page to ensure that
                    the notification is restored.{" "}
                  </Text>
                </li>
              </ul>
            </li>
          </ol>
          <Text>
            The following notification types are defined by the system:{" "}
            <br></br>
            <br></br>
          </Text>
          <ol>
            <li>
              <Text>
                <strong>Activate Product: </strong>Changes in the licenses and
                activation of SonaVault{" "}
              </Text>
            </li>
            <li>
              <Text>
                <strong>Archival Policy: </strong>Changes in archival policy,
                and addition of removal of mailboxes or external email IDs etc.{" "}
              </Text>
            </li>
            <li>
              <Text>
                <strong>Archive Store: </strong>Changes in the store name and
                location information{" "}
              </Text>
            </li>
            <li>
              <Text>
                <strong>Configurations: </strong>Changes in General, SMTP,
                deployment, and AD settings{" "}
              </Text>
            </li>
            <li>
              <Text>
                <strong>Content Identification Policy: </strong>Changes in
                content identification policies{" "}
              </Text>
            </li>
            <li>
              <Text>
                <strong>Email Server: </strong>Changes in the email server name,
                journal information, poll frequency, and enabling or disabling
                of an email server{" "}
              </Text>
            </li>
            <li>
              <Text>
                <strong>Labeling Policy: </strong>Changes in the system labels
                such as the policy name, priority, label name, and so on{" "}
              </Text>
            </li>
            <li>
              <Text>
                <strong>Mailbox Access: </strong>Changes in the privileges for a
                user, addition or deletion of privileged user, and email IDs {" "}
              </Text>
            </li>
            <li>
              <Text>
                <strong>Purge Policy: </strong>Changes in the purging rules{" "}
              </Text>
            </li>
            <li>
              <Text>
                <strong>Retention Policy: </strong>Changes in the policy name,
                priority, retention period, grace period, and policy criteria{" "}
              </Text>
            </li>
            <li>
              <Text>
                <strong>Role Management: </strong>Changes in the role names,
                description, and permissions, or changes in the role of people{" "}
              </Text>
            </li>
            <li>
              <Text>
                <strong>Rollover Policy:  </strong>Changes in rollover policies{" "}
              </Text>
            </li>
            <li>
              <Text>
                <strong>Stub Policy: </strong>Changes in stub periods, stub
                criterion, or users of a stub policy{" "}
              </Text>
            </li>
          </ol>
          <br></br>
          <Text>
            The number of notifications displayed on one page and the page size
            can be specified as required. The default page size is 20. <br></br>
            <br></br>
            In the
            <strong> Notifications</strong> page, for each notification type,
            the email IDs specified in the <strong>To</strong> and{" "}
            <strong>Cc</strong> addresses are displayed. If you want to hide the{" "}
            <strong>To</strong> address column or the <strong>Cc</strong>{" "}
            address column, select the Column Configuration icon{" "}
            <span>
              <img alt=''
                src={notification15}
                style={{
                  height: "49px",
                  width: "45px",
                  marginBottom: "30px"
                }}
              ></img>
            </span>{" "}
            present at the top of the column and uncheck the unwanted column.
            <br></br>
            <br></br>
          </Text>
          <Text>
            <strong>Add Notification </strong>
            <br></br>
          </Text>
          <ol>
            <li>
              <Text>
                To add a notification, click <strong>Add Notification</strong>{" "}
                in the <strong>Notification</strong> page.{" "}
              </Text>
              <br></br>
              <br></br>
              <img alt=''
                src={notification16}
                style={{ height: "306px", width: "651px" }}
              ></img>
              <br></br>
              <br></br>
            </li>
            <li>
              <Text>
                <strong>An Add Notification Settings</strong> side-drawer
                appears, where enter the details as described below:<br></br>
                <br></br>
                <ul>
                  <li>
                    <Text>
                      <strong>Notification Type: </strong>Select a notification
                      type from the drop-down list. The notification types for
                      which the recipients are already specified are not
                      displayed in this list. Select <strong></strong>All if you
                      want the same people to receive all the notifications
                      displayed in the list.{" "}
                    </Text>
                    <br></br>
                    <br></br>
                    <img alt=''
                      src={notification17}
                      style={{ height: "306px", width: "651px" }}
                    ></img>
                    <br></br>
                    <br></br>
                    <Text>
                      <strong>
                        Note: When All is selected as the notification type, the
                        notifications for which the recipients had already been
                        specified do not get affected.{" "}
                      </strong>
                    </Text>
                  </li>
                  <br></br>

                  <li>
                    <Text>
                      Enter the email IDs in the <strong>To</strong> and{" "}
                      <strong>Cc</strong> boxes.{" "}
                    </Text>
                    <br></br>
                    <br></br>
                    <img alt=''
                      src={notification18}
                      style={{ height: "306px", width: "651px" }}
                    ></img>
                    <br></br>
                    <br></br>
                  </li>
                </ul>
              </Text>
            </li>
            <li>
              <Text>
                Click <strong>Save</strong> to add the notification or click{" "}
                <strong>Cancel</strong> to exit without adding.{" "}
              </Text>
              <br></br>
              <br></br>
              <img alt=''
                src={notification19}
                style={{ height: "306px", width: "651px" }}
              ></img>
              <br></br>
              <br></br>
            </li>
          </ol>
          <Text>
            <strong>Edit Notification </strong>
            <br></br>
            <br></br>The SonaVault administrator can decide to change the
            recipient of a notification. The direct recipient (To address)
            and/or the copy recipient (Cc address) can be changed.
          </Text>
          <ol>
            <li>
              <Text>
                To change the recipients of a notification, click the edit icon{" "}
                <span>
                  <img alt=''
                    src={notification20}
                    style={{
                      height: "43px",
                      width: "62px",
                      marginBottom: "30px"
                    }}
                  ></img>
                </span>{" "}
                next to it in the <strong>Notification</strong> page.
              </Text>
              <br></br>
              <br></br>
              <img alt=''
                src={notification21}
                style={{ height: "306px", width: "651px" }}
              ></img>
              <br></br>
              <br></br>
            </li>
            <li>
              <Text>
                In the <strong>Edit Notification</strong> page, enter the
                changed addresses in the <strong>To</strong> and{" "}
                <strong>Cc</strong> boxes.{" "}
              </Text>
              <br></br>
              <br></br>
              <img alt=''
                src={notification22}
                style={{ height: "306px", width: "651px" }}
              ></img>
              <br></br>
              <br></br>
            </li>
            <li>
              <Text>
                Click <strong>Save</strong> to edit the notification or click{" "}
                <strong>Cancel</strong> to exit without editing.{" "}
              </Text>
              <br></br>
              <br></br>
              <img alt=''
                src={notification23}
                style={{ height: "306px", width: "651px" }}
              ></img>
              <br></br>
              <br></br>
            </li>
          </ol>
        </div>
      </div>
    );
  }
}

export default ControlCenter;
