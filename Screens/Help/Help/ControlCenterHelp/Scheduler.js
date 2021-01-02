import React from 'react';
import { Typography } from 'antd';
// import styles from "../../../../../../styles"
import Theme from "../../../../Assets/Theme/Theme"
const { Text, Title } = Typography;
const { color } = Theme
function Scheduler() {
    return (
        <div>
            <div style={{ paddingLeft: 40, paddingTop: 3, display: "flex", justifyContent: "center", flexDirection: "column" }}>
                <Title style={{ color: `${color.Orange}`, padding: "15px 0 0 0px", fontSize: 50 }}>{"Scheduler  Version(6.5)  "}</Title>
                <br />
                <Text>The scheduling of tasks can only be viewed by an administrator. </Text>

            </div>
            <SystemTask />
            <UserTask />

        </div>
    )

}
export default Scheduler;


function SystemTask() {
    return (
        <div>
            <div style={{ paddingLeft: 40, paddingTop: 3, display: "flex", justifyContent: "center", flexDirection: "column" }}>
                <Title style={{ color: `${color.Blue}`, fontSize: 25 }}>{"System Task (Version 6.5)"}</Title>
                <br />
                <Text type="danger">Insert ScreenShot</Text><br />
                <Text>
                    Tasks essential for the successful functioning of the SonaVault application, referred to as system tasks, run in the background.
            </Text>
                <br />
                <Text>
                    To view the status and schedule of the system tasks:
            </Text>
                <br />
                <ol>
                    <li>
                        Select <Text strong>Task List</Text> from the Monitor menu.
                </li>
                    <li>
                        Select the <Text strong>System Tasks</Text> tab.
                </li>
                    <li>
                        Click <Text strong>Refresh </Text>to see the latest information. You cannot modify the information displayed.<br />Some of these tasks should occur repeatedly. Other tasks need to run only once.
                </li>
                </ol>
                <Text>
                    <Text strong>Task Description</Text> gives a description of the task.
            </Text>
                <br />
                <Text>
                    <Text strong>Next Run </Text>indicates the date and time when the task is scheduled to run next.
            </Text>
                <br />
                <Text>
                    <br />
                    <Text strong>Schedule Type: </Text>indicates whether a task is scheduled to run repeatedly or just once. <Text strong>Always</Text> indicates repeatedly run tasks and <Text strong>Once </Text>indicates one-time tasks.
            </Text>
                <br />
                <Text>
                    <Text strong>Status:</Text> indicates the status of the task. The status of a task that is being currently executed is shown as <Text strong>Running</Text> and the status of a task that is waiting to be executed is shown as <Text strong> Waiting</Text>.
            </Text>
                <br />
                <Text>
                    Select the number of system tasks to be displayed on one page from Page Size. The default <Text strong>page size</Text> is 10.
            </Text>
                <br />
                <Text>
                    In the Scheduler page, for each task, the schedule, schedule type, and status are displayed.  If you want to hide the schedule type column or the schedule column, click on the <Text type="danger">Insert ScreenShot</Text> icon present at the top of the column and uncheck the unwanted column.
            </Text>
                <br />
                <Text>
                    <Text>Note:</Text>Click on the icon next to <Text strong>Task Description</Text> to sort the tasks in ascending or descending order.
            </Text>
            </div>
        </div>
    )
}

function UserTask() {
    return (
        <div>
            <div style={{ paddingLeft: 40, paddingTop: 3, display: "flex", justifyContent: "center", flexDirection: "column" }}>
                <Title style={{ color: `${color.Blue}`, fontSize: 25 }}>{"User Task (Version 6.5)"}</Title>
                <br />
                <Text type="danger">Insert ScreenShot</Text><br />
                <Text>
                    The <Text strong>User Task </Text>tab displays tasks specified by the users of SonaVault.
            </Text>
                <br />
                <Text>
                    <Text strong>Task Description </Text>gives a description of the task.
            </Text>
                <br />
                <Text>
                    <Text strong>Next Run</Text>  indicates the date and time when the task is scheduled to run next.
            </Text>
                <br />
                <Text>
                    <Text strong>Status:</Text> indicates the status of the task. The interpretation is as follows:
            </Text>
                <br />

                <table border="2" style={{ width: "50%" }}>
                    <tbody>
                        <tr><td>Status </td><td>Description </td></tr> <tr><td>Waiting </td><td>Task waiting to be executed Waiting tasks can be enabled to run or disabled to prevent the execution </td></tr>
                        <tr><td>Running  </td><td>Task currently being executed Running tasks can be disabled to stop the execution </td></tr>
                        <tr><td>Disabled  </td><td>Task that is temporarily stopped Disabled tasks can be enabled to run   </td></tr>
                        <tr><td>Disabled/Running    </td><td>A currently running task that is disabled by a user If the current run is successful,task is deleted from the list of pending tasks If the current run fails for any reason, the task will be disabled  </td></tr>
                    </tbody>
                </table>

            </div>
        </div>
    )
}