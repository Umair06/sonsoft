import React from 'react';
import { Typography } from 'antd';
//import styles from "../../../../../../styles";
import Theme from "../../../../../../Assets/Theme/Theme"

// import whatsNewIcon from "../../../../Assets/icons/SV_ICONS/WhatsNew_Blue.png"
// import myArchived1 from "../../../../Assets/images/myArchived1.PNG";
// import myArchived2 from "../../../../Assets/images/myArchived2.PNG";

const { Text, Title } = Typography;
const { color } = Theme

function RetentionPolicy() {
    return (
        <div>
        <div style={{ paddingLeft: 40, paddingTop: 3, display: "flex", justifyContent: "center", flexDirection: "column" }}>
            <Title style={{ color: `${color.Orange}`, padding: "15px 0 0 0px", fontSize: 50 }}>{"Retention Policy(Version 6.5)"}</Title>
            <br />
            <Text type="danger">Insert ScreenShot</Text>
            <br />
            <Text >Retention policies determine the lifetime of the emails archived through the SonaVault application. A retention policy consists of a policy to categorize an email, retention period, and grace period, and is associated with a priority.     </Text>

            <br />
            <Text>To define retention policies, select the <Text strong>Setup</Text> menu and select <Text strong>Retention Policy</Text>.   </Text>
            <br />
            <Text >
                The policy to categorize an email is defined by policy conditions created in terms of sender, recipient, subject, and the content of the email. <Text strong>Retention Grace Period</Text> refers to the period added to the lifetime of an email after the expiry of the retention period. The retention period and grace period are defined in days. A retention policy can be temporarily disabled or enabled.
         </Text>
            <br />
            <Text>
                Retention policies are named meaningfully to identify the policy easily. The status of a disabled retention policy is shown with a cross mark.
         </Text>
            <br />
            <Text>
                SonaVault has a default retention policy with a retention period of 7 years or 2555 days and a grace period of 31 days. The default retention policy ensures legal compliance.
         </Text>
            <br />
            <Text>
                To change the default retention policy and grace period, click on the  <Text type="danger">Insert ScreenShot</Text> icon.
         </Text>
            <br />
            <Text>
                <Text strong>Retention Period:</Text> Enter the retention period in days.
         </Text>
            <br />
            <Text>
                <Text strong>Retention Grace Period:</Text> Enter the retention grace period in days.
         </Text>
            <br />
            <Text>
                If all the retention policies including the default policy are disabled, no expiry period is attached to the emails.
         </Text>
            <br />
            <Text>
                To edit a labeling policy, click the edit icon  <Text type="danger">Insert ScreenShot</Text> next to the labeling policy.  See <a href="/#">Edit Labeling Policy</a>.
         </Text>
            <br />
            <Text>
                Depending on the usability of a labeling policy, do the following:
         </Text>
            <Text strong>
                Notes.
       
            <br />
            <Text>
                <ul>
                    <li>Emails do not get physically deleted even after the expiry of the grace period unless a purge policy is executed.     </li>
                    <li>The retention policy is applied to individual emails.     </li>
                    <li>An email is associated with only one retention policy.   </li>
                    <li>Policies created or modified after an email is archived and associated with one of the retention policies do not affect the lifetime of the email.   </li>

                </ul>
            </Text>
            </Text>
            <br />
            <Text>
                At the time of archiving, SonaVault checks the content of an email and associates it with a suitable active retention policy. SonaVault first checks the email against the retention policy with the highest priority. If the email matches the conditions specified in the retention policy, the policy is associated with the email. If the email does not fit the retention policy with the highest priority, the application checks against the retention policy with the next level of priority. The application repeats this process until the email matches a configured retention policy. Once an email is associated with a retention policy, it will not be considered for any further association with other retention policies.
            </Text>
            <br />
            <Text>
                If there is no suitable retention policy for an email, the default policy is applied provided the default policy is enabled.
            </Text>
            <br />
            <Text>
                The <Text strong>Retention Policy page</Text> displays the existing retention policies. The view displays the <Text strong> Name, Priority, Retention Period, Retention Grace Period, and Status</Text>. You have the option of adding, enabling, disabling, deleting, and changing the priority of an archival policy. Based on the requirements, a policy can be edited.
            </Text>
            <br />
            <Text>
                The default retention policy can be enabled or disabled. Expand the <Text strong>Default Retention Policy pane</Text> by clicking the double arrows at the top right.
            </Text>
            <br />
            <ul>
                <li>To add a retention policy, click Add. See <a href="/#">Add New Retention Policy</a>.      </li>
                <li>To edit a retention policy, click the edit icon  <Text type="danger">Insert ScreenShot</Text> next to the policy. See <a href="/#"> Edit Retention Policy.</a>       </li>
                <li>To enable a retention policy, select the policy and click <Text strong>Enable</Text>.    </li>
                <li>To disable a retention policy, select the policy and click <Text strong>Disable</Text>.   </li>
                <li>To delete a retention policy, select the policy and click <Text strong> Delete</Text>.</li>

            </ul>
            <br />
            <Title  style={{ color: `${color.Blue}`, fontSize: 25 }}>{"Retention Policy Settings  (Version 6.5)"}</Title>
            <br />
            <ul>
                <li><Text>To select a retention basis, select <Text strong>Priority </Text>or <Text strong>Maximum Retention Period</Text>.Often, a user may belong to more than one group and, hence, more than one retention policy may be applicable to the user. In such cases, the retention period may be decided based on the priority of the policy or the length of the retention period.</Text> <br /><Text>
                    For example, if two retention policies (i) <Text strong> CFO </Text>with a retention priority of <Text strong>2</Text> and retention period of <Text strong>500 days</Text> and (ii)<Text strong> PAM </Text>with a retention priority of <Text strong>3</Text> and retention period of <Text strong> 900 days</Text> are applicable to the user <Text strong>John Smith's </Text>emails, the retention period can be decided in the following manner: </Text>
                    <br />
                    <ul>
                        <li>If <Text strong>Priority</Text> is checked, John Smith's emails get associated with the retention policy CFO, having a retention period of 500 days.  </li>
                        <li>If <Text strong>Maximum Retention Period </Text>is checked, John Smith's emails get associated with the retention policy CFO, having a retention period of 900 days</li>
                    </ul>
                </li>
                <li>To calculate the expiry date of an email, select Ingestion Date or Message Received Date in Calculate expiry date based on.Generally, the expiry date of an email is calculated based on the date on which the email is sent (Sent Date) and the retention period as per the applicable policy. However, sometimes, Sent Date may not be clear if the email application used for sending the email does not follow the date standards. In such cases, the expiry date cannot be calculated based on Sent Date, and you have set a rule to calculate the date.If you select Ingestion Date, the date on which the email is archived by SonaVault is used to calculate the expiry date based on the retention period.If you select Message Received Date, the date on which the email is received by the user is used to calculate the expiry date based on the retention period.  </li>
                <Text strong>
                    Note: If a policy is not likely to be used at all in the future, delete it. If a policy is not likely to be used for some time, but you are not sure that it will never be used, disable it so that it can be enabled again when required.
    
                </Text>

                <li>To change the priority of a retention policy, click Change Priority. Update Priority window is displayed with a list of the retention policies in the order of the priority.  </li>
                <Text type="danger">Insert ScreenShot</Text>
                <ol>
                    <li>Select the policy and click Move Up or Move Down. This action resets the priorities of retention policies. The highest priority is indicated by 1.  </li>
                    <li>Click Save to save the changes or click Cancel to exit without saving.  </li>

                </ol>
                <Text strong>
                    Notes:
                <br />
                    <ul>
                        <li>
                            The default retention policy has the least priority.
                    </li>
                        <li>
                            Retention policies get applied to emails as per the selection made in Retention Policy Settings. If an email is attached with a retention policy, it will not be considered for any other retention policy irrespective of its priority.
                    </li>
                        <li>
                            If you disable or delete a retention policy, emails present in an archive store are not affected. However, no new emails will be associated with this retention policy.
                    </li>
                        <li>
                            At the end of the retention period or grace period, expired emails will not be physically deleted from the system. To delete them physically use the <a href="/#">Purge Policy </a>option under the Maintenance menu.
                    </li>
                    </ul>

                </Text>
            </ul>
            <br />
            <Text>
                The Default Retention Policy (Lowest Priority) pane can be expanded or collapsed as required. Click <Text type="danger">Insert ScreenShot</Text>to expand and <Text type="danger">Insert ScreenShot</Text> to collapse.
            </Text>
            <br />
            <Text>
                The number of retention policies displayed on one page and the page size can be specified as required. The default page size is 10.
            </Text>
            <br />
            <Text>
                In the Retention Policy page, for each retention policy, the details such as priority, retention period and so on are displayed. If you want to hide any one of the columns, click on the Insert Screenshot icon present at the top of the column and uncheck the unwanted column.
    
    
            </Text>
        </div>
        <RetentionAdd />
       <RetentionEdit/>
       <Deletion/>
        </div>
    )

}


export default RetentionPolicy;
function RetentionAdd() {
    return (
        <div style={{ paddingLeft: 40, paddingTop: 3, display: "flex", justifyContent: "center", flexDirection: "column" }}>
            <Title style={{ color: `${color.Orange}`, padding: "15px 0 0 0px", fontSize: 50 }}>{"Add New Retention Policy  (Version 6.5)"}</Title>
            <br />
            <Text type="danger">Insert ScreenShot</Text>
            <br />
            <Text >To add a new retention policy, click <Text strong>Add</Text> in the Retention Policy page. In the <Text strong>Add New </Text>  <Text strong>Retention Policy page</Text>, enter the details as described below:  </Text>

            <br />

            <ol>
                <li>Enter the Policy <Text strong>Name, Retention Period, and Retention Grace Period</Text>.   </li>
                <li>Check the <Text strong>Active</Text> box to make the policy active. By default, this box is checked.</li>
                <li>Specify the Policy Criteria.<br /> A policy can have one or more criteria. A policy criterion is defined as a condition of parameters. The condition is expressed as the parameter having a certain value. <br />
                    The Where list indicates the parameters.  They can be Subject, Sender, To, Cc, Sender/To/Cc/Bcc, Body, and Attachment Name.<br /> Condition Type can be Is, Is Not, Contains, Does Not Contain, Starts With and Ends With based on the selection made in the Where list.<br />Condition Value is specified by you. </li>
                <Text strong>
                    Note: If the policy has multiple condition types and condition values for the same Where value, the policy is applied even if one of the condition types or condition values matches. However, if multiple values are specified in Where, the policy is applied only if all the Where values match.That is, the policy is applied if all the Where values match. However, within a single Where value, it is enough if one of the condition types or values matches.
        
            </Text>
                <br />
                <Text type="danger">Insert ScreenShot</Text>
                <Text>
                    In the above screen, the policy is applied if the value of Subject Contains or Subject Starts With matches the specified value. However, the policy is applied only if the Subject, Sender, and Body match the values mentioned in the condition value. The above setting has the following interpretation:
            </Text>
                <br />
                <Text strong>
                    Example 1
            </Text>
                <br />
                <Text>
                    Select Where as Subject, Condition Type as Contains and Condition Value as Performance Appraisal. The policy can be named as Performance Appraisal.<br />All the emails that have the words Performance Appraisal in their subject line get associated with the Performance Appraisal policy. The retention period and grace period for this policy can be set based on the HR rules.
            </Text>
                <br />
                <Text strong>
                    Example 2
            </Text>
                <br />
                <Text>
                    Select Where as Sender, Condition Type as Is, and Condition Value as johnsmith@integramicro.com. The policy can be named as CFO with a retention period of 25 years. <br />All the emails sent by John Smith, the CFO of the organization are retained for 25 years.
            </Text>
                <br />
                <Text strong>
                    Example 3
            </Text>
                <br />
                <Text>
                    Select Where as To, Condition Type as Ends With and Condition Value as @sonasoft.com. The policy can be named as Users with a retention period of 90 days. <br />All the emails sent to the users with the domain name of their IDs ending with @sonasoft.com are retained for 90 days.
            </Text>
                <br />
                <Text strong>
                    Example 4
            </Text>
                <br />
                <Text>
                    elect Where as Cc, Condition Type as Starts With and Condition Value as admin. The policy can be named as EAS Administrator with a retention period of 60 days.<br />The carbon copies of all the emails starting with admin are retained for 60 days.
            </Text>
                <br />
                <Text strong>
                    Example 5
            </Text>
                <br />
                <Text>
                    Select Where as Attachment Name, Condition Type as Contains and Condition Value as IPR. The policy can be named as IPR with a retention period of 600 days. <br />All the emails that have attachments relevant to the company's IPRs are retained for 600 days. </Text>
                <li>
                    Click Add. The criterion gets displayed in the list.To add another condition to the policy, select Where, Condition Type and Condition Value, and click Add.The list displayed is a filtered list based on previous conditions.
         After adding criteria, before completing the definition of a policy, any criterion can be removed by clicking the remove icon  <Text type="danger">Insert ScreenShot</Text> next to it.
           </li>
                <li>
                    Click Save to add the retention policy or click Cancel to exit without adding.
           </li>

            </ol>
        </div>
    )

}
function RetentionEdit() {
    return (
        <div style={{ paddingLeft: 40, paddingTop: 3, display: "flex", justifyContent: "center", flexDirection: "column" }}>
            <Title style={{ color: `${color.Orange}`, padding: "15px 0 0 0px", fontSize: 50 }}>{"Edit Retention Policy  (Version 6.5)"}</Title>
            <br />
            <Text type="danger">Insert ScreenShot</Text>
            <br />
            <Text >To edit a retention policy, click the edit icon  <Text type="danger">Insert ScreenShot</Text> next to it in the Retention Policy page. The Edit Retention Policy page is displayed.  </Text>

            <br />

            <ol>
                <li>you can change <Text strong>Name, Retention Period, and Retention Grace Period</Text>.   </li>
                <li>Check or uncheck <Text strong>Active</Text> box to make the policy active. By default, this box is checked.</li>
                <li>You can add a new criterion to the policy, or modify or delete existing criteria of the policy.  </li>
                <li>
                    Click Add. The criterion gets displayed in the list.
        </li>
                <li>
                    Click Save to edit the retention policy or click Cancel to exit without adding.
           </li>

            </ol>
            <br />
            <Text strong>
                Note:<br /> If the policy has multiple condition types and condition values for the same Where value, the policy is applied even if one of the condition types or condition values matches. However, if multiple values are specified in Where, the policy is applied only if all the Where values match.That is, the policy is applied if all the Where values match. However, within a single Where value, it is enough if one of the condition types or values matches.
    
            </Text>
            <br />
            <Text type="danger">Insert ScreenShot</Text>
            <br />
            <Text>
                In the above screen, the policy is applied if the value of Subject Contains or Subject Starts With matches the specified value. However, the policy is applied only if the Subject, Sender, and Body match the values mentioned in the condition value.
            </Text>
            </div>
    )

}

function Deletion() {
    return (
        <div style={{ paddingLeft: 40, paddingTop: 3, display: "flex", justifyContent: "center", flexDirection: "column" }}>
            <Title style={{ color: `${color.Orange}`, padding: "15px 0 0 0px", fontSize: 50 }}>{"Purge Policy   (Version 6.5)"}</Title>
            <br />
            <Text type="danger">Insert ScreenShot</Text>
            <br />
            <Text >The physical deletion of emails from the archives is referred to as purging. The EAS administrators define the purge policy so that the disk space is not unnecessarily blocked nor are the important emails deleted. The emails to be deleted are identified as per the retention policy. Purging, usually, takes a long time and, therefore, is executed in the background.</Text>

            <br />

            <ul>
                <li>The purge operation cannot be undone or canceled.  </li>
                <li>Purging deletes the emails permanently from the database. Purged emails can never be retrieved.  </li>
                <li>Locked emails will not be purged. This facility helps in safeguarding the emails which are required beyond retention policy.   </li>
                <li>
                Emails added to any case will not be purged as long as they are associated with any case.  
                   </li>
                <li>
                Emails identified by content identification policies or flagged manually by reviewers will not be purged as long as the review cycle is not complete.  
           </li>
           <li>
           Only the EAS administrator can define a purge policy.  
           </li>
           <li>
           While purging is in progress, SonaVault functions normally.  
           </li>

            </ul>
            <br />
            <Text >
            The purge policy can be defined with respect to the retention period or grace period.</Text>
            <br />
            <ul>
                <li>Check <Text strong>As soon as Retention Period Expired </Text>or <Text strong> Grace Period</Text>.    </li>
              </ul>
              <br/>
              <Text>
              <Text strong>As soon as Retention Period Expired: </Text>When this option is checked all the emails whose retention period is elapsed are purged. The grace period specified while defining the retention policy is not considered.  
              </Text>
              <br/>
              <Text>
              <Text strong>Grace Period: </Text>When this option is checked not all the emails in the grace period are automatically deleted; two options are presented. <br/> <Text strong>In Grace Period:</Text> This is accompanied by a box that indicates the time in grace period.  Enter the number of days. For example, if you check In Grace Period and enter 30 in Days, the emails whose retention period is over 30 days ago are purged.
              </Text>
              <br/>
              <Text>
              <Text strong>Expired:</Text> All emails whose grace period is elapsed are purged. 
              </Text>
               <br/>
               <ul>
                   <li>
                   Enter a time in <Text strong>the Purge Daily At </Text>box.  
                   </li>
                   <li>
                   Check or uncheck the <Text strong> Enabled </Text>box to enable or disable the purge policy.    
                   </li>
                   <li>
                   Click <Text strong>Save </Text>to save the purge policy. The purge happens as per the specified schedule. Click <Text strong> Run Now</Text> to start the purging immediately.  
                   </li>
               </ul>
               <br/>
               <Text strong>
               Note: You can use the Retention Period option if the retention periods are generally long enough to keep the important emails or you want to reclaim disc space. You can use the Grace Period option if the retention periods are tight.</Text>
            </div>
    )

}



