import React from 'react';
import { Typography } from 'antd';
// import styles from "../../../../../../styles"
import Theme from "../../../../Assets/Theme/Theme"
const { Text, Title } = Typography;
const {color} =Theme
function TaskLog() {
    return (
        <div>
        <div style={{  paddingLeft:40,paddingTop:3,display: "flex", justifyContent: "center", flexDirection: "column" }}>
        <Title style={{ color: `${color.Orange}`, padding: "15px 0 0 0px", fontSize: 50 }}>{"Task Log  Version(6.5)  "}</Title>
        <br/>
        <Text type="danger">Insert ScreenShot</Text><br/>
        <Text>
        SonaVault logs all the error and warning conditions. This information can be used for troubleshooting. If there is an error in executing a task, the error is listed once and the number of times the task failed is shown as the number of occurrences.  
        </Text>
        <br/>
        <Text>
        Select the options so that you can see the status of only the tasks you want to monitor.  
        </Text>
        <br/>
        <Text>
            <Text strong>Message:</Text>Specify a condition to filter the messages. The conditions can be <Text strong>Starts With, Ends With </Text>and <Text strong>Contains</Text>. Enter text to complete the condition.  
        </Text>
        <br/>
        <Text>
        <Text strong>Date Range:</Text> Specify the period by selecting the <Text strong>From</Text> and <Text strong> To </Text>dates. To specify a date, you can click the arrow and use the calendar. The date includes time. Specify the time in the 24-hour clock.  
        </Text>
        <br/>
        <Text>
        <Text strong>Log Level:</Text> Logging of the execution of the tasks is done at three levels: Warn, Error and Fatal.  
        </Text>
        <Text>
            <ul>
                <li>If you select <Text strong> ALL </Text>as the level, the logs at all the levels are displayed. </li>
                <li>If you select <Text strong>Warn</Text>, only the tasks which were executed with a warning are shown. </li>
                <li>If you select <Text strong> Error</Text>, only the tasks which were executed with an error are shown. </li>
                <li>If you select <Text strong>Fatal</Text>, only the tasks which were aborted with a fatal notice are shown.  </li>
            </ul>
        </Text>
        <br/>
        <Text>
        By default, the log shows the details of the date of the task, logging level and message given by the system after the task is executed. If you check <Text strong>Show All Columns</Text> the logger of the task and the exception are shown along with the other details.  
        </Text>
        <br/>
        <Text>
        In the <Text strong>Auto-Refresh</Text> option, if you check <Text strong>ON</Text>, and specify time in seconds in the box, the data is automatically updated periodically, and the screen is refreshed. If you check <Text strong>OFF</Text>, the data is updated only when you click <Text strong>Refresh</Text>. 
        </Text>
        <Text>
        In the lower part of the screen, the task log is displayed as per the options selected. 
        </Text>
        <br/>
        <Text>
        The number of task logs to be displayed on one page and the page size can be specified as required. The default page size is 10. 
        </Text>
        </div>
       
         </div>
    )

}
export default TaskLog;