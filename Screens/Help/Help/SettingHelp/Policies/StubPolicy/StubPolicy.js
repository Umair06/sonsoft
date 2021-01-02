
import React, { Component } from 'react';
import { Typography, Menu } from 'antd';
//import style from "../../../../../../styles";

import Theme from "../../../../../../Assets/Theme/Theme"



const { Text, Title } = Typography;
const { color } = Theme

class StubPolicy extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Edit: false,
            addnew: false,
            notification: true
        }
    }
    componentDidMount() {
        this.callBack('1')
    }
    callBack = key => {
        if (key === "1") {

        }
        if (key === "2") {
            this.setState({
                notification: true,
                addNotification: false
            })
        }
        if (key === "3") {

        }
        if (key === "4") {

        }
    }
    TabClick = (key) => {
        if (key === "3") {
            this.setState({
                addnew: false
            })
        }
        if (key === "4") {
            this.setState({
                addnew: false
            })
        }
    }
    change = key => {
        if (key === "1") {
            this.setState({
                flag: false
            })
        }
    }
    openComponent = val => {
        this.setState({
            [val]: true,

        })
        this.callBack("2")
    }

    menu = (
        <Menu onChange={this.change} style={{ marginTop: "8px" }}>
            <Menu.Item key="0" >
                ADD New Notification
          </Menu.Item>
            <Menu.Item key="1"  >
                Edit Notification
          </Menu.Item>
        </Menu>
    );

    render() {

        return (
            <div className="card-container">
                <Stub />
                <StubAdd />
                <StubEdit />

            </div>
        )
    }

}

export default StubPolicy;





function Stub() {
    return (
        <div style={{ paddingLeft: 40, paddingTop: 3, display: "flex", justifyContent: "center", flexDirection: "column" }}>
            <Title style={{ color: `${color.Orange}`, padding: "15px 0 0 0px", fontSize: 50 }}>{"Stub (Version 6.5)"}</Title>
            <br />
            <Text>Insert ScreenShot</Text>
            <br />
            <Text >An email server is used by users of different roles and types. When emails on an email server are stubbed, the same stubbing policy may not be suitable to all the users since emails of some users may have to be retained longer than emails of some other users. For example, the stub period for emails of a product development manager may have to be longer than for those of a project manager or a sales executive.

        The application helps in specifying different stub periods for different mailboxes. A stub policy can be defined with a specified stub period and the mailboxes to which the stub period is applicable.  A priority is set for each stub policy.  By default, the priority is assigned in the order the policy is added. The order can be changed as necessary using the <Text strong> Change Priority</Text> option. A stub policy can be enabled or disabled as necessary.   </Text>

            <br />
            <Text strong>
                Notes:
         </Text>
            <br />
            <Text strong>
                <ul>
                    <li>For a stub policy to be applied, stubbing must have been enabled on the email server.    </li>
                    <li>For users to whom no stub policy is applicable, the stub period specified for the corresponding email server is applied.  </li>
                    <li>To delete a notification, select the notification by checking its box and click <Text strong>Delete</Text>. In the <Text strong>Confirmation</Text> dialog, click <Text strong>Yes</Text>. </li>
                    <li>Only enabled stub policies are applied.  A policy that is not enabled is not given any priority and not considered while stubbing the emails.    </li>
                </ul>

            </Text>
            <Text > Often, a mailbox may belong to more than one group and, hence, more than one stub policy may be applicable to the mailbox. In such cases, the stub period may be decided based on the priority of the stub policy or the length of the stub period as configured in the stub policy settings.    </Text>
            <br />

            <Text >For example, if there are two stub policies: </Text>
            <br />
            <ul>
                <li><Text strong>PDM</Text> with a stub priority of <Text strong> 2 </Text>and stub period of <Text strong>500</Text> days, and  </li>
                <li> <Text strong>BDM</Text> with a stub priority of <Text strng>3</Text> and stub period of  <Text strng>900</Text>days applicable to the user John Smith, the stub period can be decided in the following manner: </li>
                <ol>
                    <li>If <Text strong>Priority</Text> is checked, John Smith's emails older than 500 days from the current date are stubbed   </li>
                    <li>If <Text strong>Maximum Stub Period </Text> is checked, John Smith's emails older than 900 days from the current date are stubbed     </li>
                </ol>
            </ul>
            <br />

            <Text >
                When a stub policy is enabled and is applicable to a user, only the stub period changes as per the policy; the other stub settings such as whether to stub or delete an email after the stub period, and whether an email is selected as per its size or as per it having an attachment are applied as per the options set on the corresponding email server.
         </Text>
            <br />
            <Text> the Stub Policy page: </Text>
            <ol>
                <li>To add a stub policy, click <Text strong>Add</Text>. See <a href="/#">Add Stub Policy</a>.    </li>
                <li>To edit a stub policy, click the edit icon <Text type="danger">Insert Screenshot</Text> next to the policy. See  <a href="/#">Edit Stub Policy</a>.  </li>
                <li>To enable a stub policy, select the policy by checking the box of the policy and click <Text strong>Enable</Text>.</li>
                <li>To disable a stub policy, select the policy by checking the box of the policy and click <Text strong>Disable</Text>.    </li>
                <li>Select the <Text strong>Stub Policy Setting</Text> as <Text strong>Priority</Text> or <Text strong>Maximum Stub Period</Text> to resolve the conflict in the stub period when more than one policy is applicable to a user.      </li>
                <li>Email Server: Changes in the email server name, journal information, poll frequency, and enabling or disabling of an email server    </li>
                <li>To change the priority of a stub policy, click <Text strong>Change Priority</Text> and, in the box that is displayed, move the policies up or down. See a sample screen. </li>
            </ol>

        </div>
    )

}

function StubAdd() {
    return (
        <div style={{ paddingLeft: 40, paddingTop: 3, display: "flex", justifyContent: "center", flexDirection: "column" }}>
            <Title style={{ color: `${color.Orange}`, padding: "15px 0 0 0px", fontSize: 50 }}>{"Stub Add (Version 6.5)"}</Title>
            <br />
            <Text>Insert ScreenShot</Text>
            <br />
            <Text >To add a stub policy, click Add in the Stub Policy page. In the Add New Stub Policy page, enter the details as described below:  </Text>

            <br />

            <ol>
                <li>In the <Text strong> Stub Policy Name </Text> box, enter a name to identify the policy easily.    </li>
                <li>In the <Text strong> Stub Policy Description  </Text> box, enter a brief description of the policy.    </li>
                <li>Enter the stub period applicable to the policy. Stub policy is set in days.  </li>
                <li>Check <Text strong> Enable  </Text> to activate the policy. Only enabled stubbing policies are applied. Refer to<Text strong> Email Server  </Text> setup.     </li>
                <li>From the <Text strong>Available Mailboxes</Text>  list, select the mailboxes to which the stub period should be applied.</li>
                <ul>
                    <li>Select a mailbox and click on the right-arrow button to add to the list of <Text strong>Selected Mailboxes</Text>. You can use the <Text strong>Shift</Text> or <Text strong>Control</Text> key in your keyboard to select multiple mailboxes.   </li>
                    <li> Select a mailbox and click on the left-arrow button to deselect it. </li>

                    <li>Click on the double-right-arrow icon to select all the mailboxes.  </li>
                    <li>Click on the double-left-arrow icon to deselect all the mailboxes.  </li>

                </ul>
                <li>Click <Text strong>Save</Text>   </li>

            </ol>


        </div>
    )

}

function StubEdit() {
    return (
        <div style={{ paddingLeft: 40, paddingTop: 3, display: "flex", justifyContent: "center", flexDirection: "column" }}>
            <Title style={{ color: `${color.Orange}`, padding: "15px 0 0 0px", fontSize: 50 }}>{"Stub Edit(Version 6.5)"}</Title>
            <br />
            <Text>Insert ScreenShot</Text>
            <br />
            <Text >To edit a stub policy, click the edit icon<Text type="danger">Insert Screenshot</Text>  next to it in the <Text strong>Stub Policy</Text> page. The <Text strong>Edit Stub Policy page</Text> is displayed.   </Text>

            <br />
            <Text>To edit a stub policy: </Text>
            <ol>
                <li>You can change the <Text strong>Policy Name</Text>, <Text strong>Policy Description</Text>, or <Text strong>Stub Period</Text>       </li>
                <li>In the <Text strong> Stub Policy Description  </Text> box, enter a brief description of the policy.    </li>
                <li>Check or uncheck <Text strong>Enable</Text> to change the policy status.    </li>
                <li>Modify the list of selected mailboxes as necessary.  Use the arrow buttons to modify the list.     </li>
                <li>Click <Text strong>Save</Text> to save the changes. </li>
            </ol>


        </div>
    )

}


