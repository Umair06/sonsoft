import React, { Component } from 'react';
import { Typography, message } from 'antd';
import Theme from "../../../../Assets/Theme/Theme"
import controlcenter1 from "../../../../Assets/ScreenShots/controlcenter1.PNG"
import controlcenter2 from "../../../../Assets/ScreenShots/controlcenter2.PNG"
import controlcenter3 from "../../../../Assets/ScreenShots/controlcenter3.PNG"
import controlcenter4 from "../../../../Assets/ScreenShots/controlcenter4.PNG"
import controlcenter5 from "../../../../Assets/ScreenShots/controlcenter5.PNG"
import controlcenter6 from "../../../../Assets/ScreenShots/controlcenter6.PNG"
import controlcenter7 from "../../../../Assets/ScreenShots/controlcenter7.PNG"
import controlcenter8 from "../../../../Assets/ScreenShots/controlcenter8.PNG"
import controlcenter9 from "../../../../Assets/ScreenShots/controlcenter9.PNG"
import controlcenter10 from "../../../../Assets/ScreenShots/controlcenter10.PNG"
import controlcenter11 from "../../../../Assets/ScreenShots/controlcenter11.PNG"
import controlcenter12 from "../../../../Assets/ScreenShots/controlcenter12.PNG"
import controlcenter13 from "../../../../Assets/ScreenShots/controlcenter13.PNG"
import controlcenter14 from "../../../../Assets/ScreenShots/controlcenter14.PNG"
import controlcenter15 from "../../../../Assets/ScreenShots/controlcenter15.PNG"
import controlcenter16 from "../../../../Assets/ScreenShots/controlcenter16.PNG"
import controlcenter17 from "../../../../Assets/ScreenShots/controlcenter17.PNG"
import refreshIcon from "../../../../Assets/icons/SV_ICONS/Refresh_Blue.png"
import statsIcon from "../../../../Assets/icons/SV_ICONS/Email Statistics_Blue.png"
import schedulerIcon from "../../../../Assets/icons/SV_ICONS/Scheduler_Blue.png"
import systemIcon from "../../../../Assets/icons/SV_ICONS/SystemTask_Blue.png"
import userIcon from "../../../../Assets/icons/SV_ICONS/UserTask_Blue.png"
import updown from "../../../../Assets/images/updown.PNG"
import binIcon from "../../../../Assets/icons/SV_ICONS/Delete_Orange.png"
// import { defineMessages } from 'react-intl';


// const messages = defineMessages({
// 	'Control Center Help': {
// 		id: "ControlCenter.ControlCenterHelp",
// 		defaultMessage: "Control Center Help",
// 	},
// 	'Left Navigation Pane added to My Archived Emails': {
// 		id: "ControlCenter.LeftNavigationPaneaddedtoMyArchivedEmails",
// 		defaultMessage: "Left Navigation Pane added to My Archived Emails"
// 	},
// 	'Left Navigation Pane': {
// 		id: "ControlCenter.LeftNavigationPane",
// 		defaultMessage: "Left Navigation Pane"
// 	},
// 	'The Left Navigation Pane allow user to browse and seach their archived emails': {
// 		id: "ControlCenter.TheLeftNavigationPaneallowusertobrowseandseachtheirarchivedemails",
// 		defaultMessage: "The Left Navigation Pane allow user to browse and seach their archived emails."
// 	},
// 	'By default, the Filter icon will be selected. This allows you to browse your email folders': {
// 		id: "ControlCenter.BydefaulttheFiltericonwillbeselectedThisallowsyoutobrowseyouremailfolders",
// 		defaultMessage: "By default, the Filter icon will be selected. This allows you to browse your email folders."
// 	},
// 	'To search your emails, click the Search icon': {
// 		id: "ControlCenter.TosearchyouremailsclicktheSearchicon",
// 		defaultMessage: "To search your emails, click the Search icon."
// 	},
// })

const { Text, Title } = Typography;
const { color } = Theme

class ControlCenter extends Component {
	constructor(props) {
		super(props)
		this.state = {
		}
		message.destroy()

	}

	render() {
		// const { formatMessage } = this.props;
		return (
			<div>
            <div style={{ paddingLeft: 40, paddingTop: 3, display: "flex", justifyContent: "center", flexDirection: "column" }}>
                <Title style={{ color: `${color.Orange}`, padding: "15px 0 0 0px", fontSize: 50 }}>{"Control Center"}</Title>

                <Text>
				Control Center presents a dashboard view of SonaVault 7 with details about the statistics and schedule of the system. 
               </Text>
                <br />
                 <Text strong>To Access Control Center  </Text> 
				 <ol>
					 <li>
					 Select <Text strong>Control Center</Text> from SonaVault homepage. 
					 <br />
                        <br />
                        <img alt='' src={controlcenter1} />
                        <br />
                        <br />
					 </li>
					 <li>
					 This is Control Center homepage. You can view two sections in the left pane: <Text strong>Statistics</Text> and <Text strong>Scheduler</Text>.  
					 <br />
                        <br />
                        <img alt='' src={controlcenter2} />
                        <br />
                        <br />
					 </li>
					 <li>
					 Before exploring the two sections, let’s select the Refresh icon <img alt='' src={refreshIcon} width="50px" height="auto"/> located at the top right corner to view the updated version of the page. 
					 <br />
                        <br />
                        <img alt='' src={controlcenter3} />
                        <br />
                        <br />
					 </li>
				 </ol>
            </div>
            <ControlCenterStatistics/>
			<ControlCenterScheduler/>
			<ControlCenterSystemTask/>
			<ControlCenterUserTask/>
           
        </div>
		)
	}

}

export default ControlCenter;

function ControlCenterStatistics() {
    return (
        <div>
            <div style={{ paddingLeft: 40, paddingTop: 3, display: "flex", justifyContent: "center", flexDirection: "column" }}>
                <Title style={{ color: `${color.Blue}`, fontSize: 25 }}>{"Statistics "}</Title>
                
                <Text>The Statistics pane displays the statistics summary of the system. Once you navigate to the Control Center homepage, you are automatically in the Statistics pane. If you are at other sections,   </Text>
                
                <br />
                <Text strong>To Download an Email  </Text>
                <ol>
					<li>
					Select the Statistics icon <img alt='' src={statsIcon} width="50px" height="auto"/> located at the left pane. Some of the information available at this section are as follows: 
					<ul>
						<li>
						<Text strong>Active Directory</Text> – This is the total number of Active Directories (ADs), number of ADs enabled for synchronization, and the number of ADs disabled for synchronization.
						<br />
                        <br />
                        <img alt='' src={controlcenter4} />
                        <br />
                        <br />  
						</li>
						<li>
						<Text strong>No. of Archive Stores </Text> – This is the number of archive stores currently available.
						<br />
                        <br />
                        <img alt='' src={controlcenter5} />
                        <br />
                        <br />  
						</li>
						<li>
						<Text strong>Last Message Archived at </Text> – This is the date on which the last message (email) was archived. 
						<br />
                        <br />
                        <img alt='' src={controlcenter6} />
                        <br />
                        <br />  
						</li>
						<li>
						<Text strong>Total Messages Archived/Total Message Size (MB) </Text>  – This is the total number of messages archived till date and the total size of all the emails archived (in MB).
						<br />
                        <br />
                        <img alt='' src={controlcenter7} />
                        <br />
                        <br />  
						</li>
						<li>
						<Text strong>Mailbox Access Count  </Text>  – This is the number of users who can access the mailboxes of other users.
						<br />
                        <br />
                        <img alt='' src={controlcenter8} />
                        <br />
                        <br />  
						</li>
						<li>
						<Text strong>Total Notifications Configured   </Text> – This is the total number of notifications configured. <br />
                        <br />
                        <img alt='' src={controlcenter9} />
                        <br />
                        <br />  
						</li>
					</ul>
					</li>
				</ol>
                
            </div>
        </div>
    )
}
function ControlCenterScheduler() {
    return (
        <div>
            <div style={{ paddingLeft: 40, paddingTop: 3, display: "flex", justifyContent: "center", flexDirection: "column" }}>
                <Title style={{ color: `${color.Blue}`, fontSize: 25 }}>{"Scheduler   "}</Title>
                
                <Text>The scheduling of tasks can be viewed by an administrator.   </Text>
				<ol>
					<li>
					Select the Scheduler icon  <img alt='' src={schedulerIcon} width="50px" height="auto"/>located at the left pane.
					<br />
                        <br />
                        <img alt='' src={controlcenter10} />
                        <br />
                        <br />  
					</li>
					<li>
					This navigates you to the two scheduling tasks, System Tasks and User Tasks. 
					<br />
                        <br />
                        <img alt='' src={controlcenter11} />
                        <br />
                        <br />  
					</li>
				</ol>
                
                
            </div>
        </div>
    )
}
function ControlCenterSystemTask() {
    return (
        <div>
            <div style={{ paddingLeft: 40, paddingTop: 3, display: "flex", justifyContent: "center", flexDirection: "column" }}>
                <Title style={{ color: `${color.Blue}`, fontSize: 25 }}>{"System Tasks   "}</Title>
                
                <Text>System tasks are the tasks essential for the successful functioning of the SonaVault application. System tasks run in the background.    </Text>
				<br/>
				<br/>
				<Text strong> To View the Status of System Tasks: </Text>
				<ol>
					<li>
					Select the System Tasks icon <img alt='' src={systemIcon} width="50px" height="auto"/>
					<br />
                        <br />
                        <img alt='' src={controlcenter12} />
                        <br />
                        <br />  
					</li>
					<li>
					This navigates you to a page with detailed list of scheduled task descriptions, date of next run, status and repeat frequency.  
					<br />
                        <br />
                        <img alt='' src={controlcenter13} />
                        <br />
                        <br /> 
						<ol type="a">
							<li><Text strong>Task Description</Text> gives a description of the task.  </li>
							<li><Text strong>Next Run</Text>indicates the date and time when the task is scheduled to run next.    </li>
							<li><Text strong>Status </Text>indicates the status of the task. The status of the task that is being currently executed is shown as <Text strong>Running</Text> and the status of a task that is waiting to be executed is shown as <Text strong> Waiting</Text>.      </li>
							<li><Text strong>Repeat Frequency</Text> indicates the intervals on which the task should be repeated.        </li>
							</ol> 
					</li>
					<li>
					Select on the sorting icon <img alt='' src={updown} width="50px" height="auto"/>  next to Task Description to sort the tasks in ascending or descending order
					<br />
                        <br />
                        <img alt='' src={controlcenter14} />
                        <br />
                        <br />
					</li>
				</ol>
                
                
            </div>
        </div>
    )
}
function ControlCenterUserTask() {
    return (
        <div>
            <div style={{ paddingLeft: 40, paddingTop: 3, display: "flex", justifyContent: "center", flexDirection: "column" }}>
                <Title style={{ color: `${color.Blue}`, fontSize: 25 }}>{"User Tasks "}</Title>
                
                <Text>User Tasks are the tasks specified by the users of SonaVault.   </Text>
				<br/>
				<br/>
				<Text strong> To View the Status of System Tasks: </Text>
				<ol>
					<li>
					Select the User Tasks icon <img alt='' src={userIcon} width="50px" height="auto"/>located at the left pane.
					<br />
                        <br />
                        <img alt='' src={controlcenter15} />
                        <br />
                        <br /> 
					</li>
					<li>
					This navigates you to a page with a detailed list of the scheduled task descriptions, next run, status, owner, enable/disable task and delete options.
					<br />
                        <br />
                        <img alt='' src={controlcenter16} />
                        <br />
                        <br />
						<ol type="a">
							<li><Text strong>Task Description </Text>gives a description of the task. </li>
							<li><Text strong>Next Run  </Text>indicates the date and time when the task is scheduled to run next.  </li>
							<li><Text strong>Status  </Text>indicates the status of the task.  The status of the task that is being currently executed is shown as Running and the status of a task that is waiting to be executed is shown as Waiting.   </li>
							<li><Text strong>Owner   </Text>is the administrator who runs the task.   </li>
							<li><Text strong>Enable/Disable Task  </Text> - If the current run fails for any reason, the task will be <Text strong>disabled</Text>. You can try to run them again by clicking <Text strong>Enable </Text> Task. </li>
							<li><Text strong>Delete </Text> - If the current run is successful, the task is deleted from the list of pending tasks. You can select the Delete icon  <img alt='' src={binIcon} width="50px" height="auto"/>for that.  </li>
							</ol> 
					</li>
					<li>
					Select on the sorting icon  <img alt='' src={updown} width="50px" height="auto"/>  next to Task Description to sort the tasks in ascending or descending order. 
					<br />
                        <br />
                        <img alt='' src={controlcenter17} />
                        <br />
                        <br />
					</li>
				</ol>
				
                
            </div>
        </div>
    )
}



// import React, { Component } from 'react';
// import { Typography, Tabs, message } from 'antd';
// import style from "../../../../styles"
// import TaskLog from "./TaskLog"
// import { defineMessages } from 'react-intl';


// const messages = defineMessages({
// 	'Control Center Help': {
// 		id: "ControlCenter.ControlCenterHelp",
// 		defaultMessage: "Control Center Help",
// 	},
// 	'Left Navigation Pane added to My Archived Emails': {
// 		id: "ControlCenter.LeftNavigationPaneaddedtoMyArchivedEmails",
// 		defaultMessage: "Left Navigation Pane added to My Archived Emails"
// 	},
// 	'Left Navigation Pane': {
// 		id: "ControlCenter.LeftNavigationPane",
// 		defaultMessage: "Left Navigation Pane"
// 	},
// 	'The Left Navigation Pane allow user to browse and seach their archived emails': {
// 		id: "ControlCenter.TheLeftNavigationPaneallowusertobrowseandseachtheirarchivedemails",
// 		defaultMessage: "The Left Navigation Pane allow user to browse and seach their archived emails."
// 	},
// 	'By default, the Filter icon will be selected. This allows you to browse your email folders': {
// 		id: "ControlCenter.BydefaulttheFiltericonwillbeselectedThisallowsyoutobrowseyouremailfolders",
// 		defaultMessage: "By default, the Filter icon will be selected. This allows you to browse your email folders."
// 	},
// 	'To search your emails, click the Search icon': {
// 		id: "ControlCenter.TosearchyouremailsclicktheSearchicon",
// 		defaultMessage: "To search your emails, click the Search icon."
// 	},
// })

// const { Text, Title } = Typography;
// const { TabPane } = Tabs;

// class ControlCenter extends Component {
// 	constructor(props) {
// 		super(props)
// 		this.state = {
// 		}
// 		message.destroy()

// 	}

// 	render() {
// 		const { formatMessage } = this.props;
// 		return (
// 			<div className="card-container">

// 				<Tabs type="card" tabBarStyle={{ ...style.tabs.tabBar }} onChange={this.callBack} >

// 					<TabPane tab={"Statistics"} key="1">

// 					</TabPane>
// 					<TabPane tab="Schedular" key="2">

// 					</TabPane>
// 					<TabPane tab={"TaskLog"} key="3">

// 					</TabPane>

// 				</Tabs>
// 			</div>
// 		)
// 	}

// }

// export default ControlCenter;
