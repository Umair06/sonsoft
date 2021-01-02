import React, { Component } from 'react';
import { Typography} from 'antd';

import Theme from "../../../../../Assets/Theme/Theme"
import settingcontrolcenter1 from "../../../../../Assets/ScreenShots/settingcontrolcenter1.PNG"
import settingcontrolcenter2 from "../../../../../Assets/ScreenShots/settingcontrolcenter2.PNG"
import settingcontrolcenter3 from "../../../../../Assets/ScreenShots/settingcontrolcenter3.PNG"
import settingcontrolcenter4 from "../../../../../Assets/ScreenShots/settingcontrolcenter4.PNG"
import settingcontrolcenter5 from "../../../../../Assets/ScreenShots/settingcontrolcenter5.PNG"
import settingcontrolcenter6 from "../../../../../Assets/ScreenShots/settingcontrolcenter6.PNG"
import settingcontrolcenter7 from "../../../../../Assets/ScreenShots/settingcontrolcenter7.PNG"
import settingcontrolcenter8 from "../../../../../Assets/ScreenShots/settingcontrolcenter8.PNG"
import controlcenterIcon from "../../../../../Assets/icons/SV_ICONS/ControlCenter_Blue.png"
import statusIcon from "../../../../../Assets/icons/SV_ICONS/Status_Blue.png"
import licenseIcon from "../../../../../Assets/icons/SV_ICONS/License_Blue.png"
import configurationIcon from "../../../../../Assets/icons/SV_ICONS/Configuration_Blue.png"
const { Text, Title } = Typography;
const { color } = Theme

// const { SubMenu } = Menu;

// const { Text, Title } = Typography;
// const { TabPane } = Tabs;
// const {color} = Theme

class ControlCenter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Edit: false,
            addnew: false,
            notification:true
        }
    }
    // componentDidMount() {
    //     this.callBack('1')
    // }
    
    
    render() {
     
        return (
            <div>
            <div style={{ paddingLeft: 40, paddingTop: 3, display: "flex", justifyContent: "center", flexDirection: "column" }}>
                <Title style={{ color: `${color.Orange}`, padding: "15px 0 0 0px", fontSize: 50 }}>{"Control Center"}</Title>

                <Text>
				Control Center presents a dashboard view with the details of status, license, and configuration of the system.  
               </Text>
                <ol>
                    <li>Select the <Text strong>Control Center</Text> icon <img alt='' src={controlcenterIcon} width="50px" height="auto"/>from the left pane. It presents a dashboard view with the details of <Text strong>Status</Text>, <Text strong>License</Text>, and <Text strong>Configuration</Text> of the system. 
                       <br/>
                       <br/>
                       <img alt='' src={settingcontrolcenter1}/>
                       <br/>
                       <br/>
                    </li>
                    </ol> 
				 
            </div>
           <Status1/>
           <License1/>
           <Configuration1/>
        </div>
        )
    }

}

export default ControlCenter;

function Status1(){
    return(
        <div>
            <div style={{ paddingLeft: 40, paddingTop: 3, display: "flex", justifyContent: "center", flexDirection: "column" }}>
                <Title style={{ color: `${color.Blue}`, fontSize: 25 }}>{"Status"}</Title>
                
                <Text><Text strong>Status</Text> indicates the status of the task.  The status of the task that is being currently executed is shown as <Text strong>Running</Text> and the status of a task that is waiting to be executed is shown as <Text strong>Waiting</Text>.   </Text>
				<ol>
                    <li>
                    Select the <Text strong>Status</Text> icon <img alt='' src={statusIcon} width="50px" height="auto"/> from the Control Center menu. The page displays the following status summary: 
                    <br/>
                       <br/>
                       <img alt='' src={settingcontrolcenter2}/>
                       <br/>
                       <br/>
                      
                    </li>
                </ol>
                <Text strong>Status Summary </Text>
                <br/>
                <Text>The Status pane displays the status summary details about purge policy, retention expired, and retention grace expired.  </Text>
				
                <ol><br/>
                       <br/>
                       <img alt='' src={settingcontrolcenter3}  />
            </ol>
                       <br/>
                       <br/>
                       <ul>
                           <li><Text strong>Purge Policy: </Text>Whether the purge policy is currently running or in a waiting state to be executed. This runs as a background task. </li>
                           <li><Text strong>Retention Expired: </Text>Whether the retention period is currently being applied or in a waiting state to be executed. This runs as a background task.  </li>
                           <li><Text strong>Retention Grace Expired: </Text>Whether the retention grace period is currently being applied or in a waiting state to be executed. This runs as a background task.   </li>
                       </ul>
                
            </div>
           
        </div>
    );
}
function License1(){
    return(
        <div>
            <div style={{ paddingLeft: 40, paddingTop: 3, display: "flex", justifyContent: "center", flexDirection: "column" }}>
                <Title style={{ color: `${color.Blue}`, fontSize: 25 }}>{"License"}</Title>
                
                
				<ol>
                    <li>
                    Select the License icon  <img alt='' src={licenseIcon} width="50px" height="auto"/> from the Control Center menu. The page displays the following license summary: 
                    <br/>
                       <br/>
                       <img alt='' src={settingcontrolcenter4}/>
                       <br/>
                       <br/>
                      
                    </li>
                </ol>
                <Text strong>License Information </Text>
                
                       <ul>
                           <li>To activate the product select the <Text strong>Browse</Text> button and locate the license key file (license.licx), and select the <Text strong>Upload License Key</Text> option.  </li>
                           
                       </ul>
                       <Text>
                       Explicit activation of the product is necessary in case of license upgrades and modifications in mailboxes or email servers. License can be for lifetime or for a limited period. After the license key is uploaded and the product activated, the <Text strong>Activate Product</Text> page displays the following details: 
                       </Text>
                       <ol><br/>
                       <br/>
                       <img alt='' src={settingcontrolcenter5}  />
            </ol>
                       <br/>
                       <br/>
                       <ul>
                           <li><Text strong>Licensed To:  </Text>Name of the company to which the product is licensed   </li>
                           <li><Text strong>Expiry Date:  </Text>This date indicates the date on which the license of the product will expire. To continue to use the product, you will have to renew the license before the expiry date.    </li>
                           <li><Text strong>Mailbox(es): </Text>It is the maximum number of mailboxes that can be archived using this product.     </li>
                           <li><Text strong>Active Directories:</Text>Indicates the number of active directories for which the license is granted.      </li>
                           <li><Text strong>Email Server(s): </Text> It is the maximum number of email servers that can be accessed for archiving sent/received emails.     </li>
                           <li><Text strong>Warning:</Text> This shows the date on which the license will expire.      </li>
                           <li><Text strong>Authorization Key:</Text> An authorization key is given to every customer whose emails are archived through the application. Authorization key is visible only to the super user, sonasoftarc.       </li>
                       </ul>
                       <Text strong>License Information </Text>
                       <ol>
                       <br/>
                       <br/>
                       <img alt='' src={settingcontrolcenter6}  />
            </ol>
                       <br/>
                       <br/>
                       <ul>
                           <li><Text strong>Email Server:   </Text>The total number of email servers licensed   </li>
                           <li><Text strong>Mailboxes:  </Text>The total number of mailboxes in the system     </li>
                           <li><Text strong>License:  </Text>The expiry date of license for SonaVault (If SonaVault is purchased with a life-time license, it displays LifeTime)     </li>
                          
                       </ul>
                       
                
            </div>
           
        </div>
    );
}

function Configuration1(){
    return(
        <div>
            <div style={{ paddingLeft: 40, paddingTop: 3, display: "flex", justifyContent: "center", flexDirection: "column" }}>
                <Title style={{ color: `${color.Blue}`, fontSize: 25 }}>{"Configuration "}</Title>
                
                
				<ol>
                    <li>
                    Select the Configuration icon <img alt='' src={configurationIcon} width="50px" height="auto"/> from the Control Center menu.
                    <br/>
                       <br/>
                       <img alt='' src={settingcontrolcenter7}/>
                       <br/>
                       <br/>
                      <Text>The page displays the following summary:</Text>
                      <br/>
                       <br/>
                       <img alt='' src={settingcontrolcenter8}/>
                       <br/>
                       <br/>
                    </li>
                </ol>
                <ul>
                           <li><Text strong>Deployment Type    </Text> – The Deployment Type of SonaVault (Central/Multi site)   </li>
                           <li><Text strong>SMTP Configured?  </Text>– Whether SMTP is configured (Yes if configured, No if not configured)     </li>
                           <li><Text strong>Default Password Changed?</Text>– Whether the default password is changed (Yes if configured, <Text strong>No</Text> if not configured). It is recommended to change the default password.      </li>
                           <li><Text strong>User-Defined Retention Policy Configured?</Text>– Whether a user-defined retention policy is configured (<Text strong>Yes</Text> if configured, <Text strong>No</Text> if not configured). If no retention policy is configured, the default policy will be applied.       </li>
                           <li><Text strong>Default Retention Policy Configured?</Text>– Whether a default retention policy is configured (<Text strong>Yes</Text> if configured,<Text strong> No</Text> if not configured)       </li>
                           <li><Text strong>Purge Policy Configured?</Text>– Whether a purge policy is configured (<Text strong>Yes</Text>  if configured,<Text strong> No</Text>if not configured)        </li>
                           <li><Text strong>Archival Type </Text> –  (All/Selected-Include/Selected-Exclude)       
                           <ul>
                               <li>All indicates that all the mailboxes are included for archival </li>
                               <li>Selected – Include indicates that the selected mailboxes are included for archival  </li>
                               <li>Selected – Exclude indicates that the selected mailboxes are excluded for archival  </li>
                           </ul>
                           </li>
                          
                       </ul>
                
                       
                
            </div>
           
        </div>
    );
}