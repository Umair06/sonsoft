import React from 'react';
import { Typography } from 'antd';
//import styles from "../../../../../../styles"
import Theme from "../../../../../../Assets/Theme/Theme"



const { Text, Title } = Typography;

const { color } = Theme



function AutoLabel() {
    return (
        <div>
        <div style={{ paddingLeft: 40, paddingTop: 3, display: "flex", justifyContent: "center", flexDirection: "column" }}>
            <Title style={{ color: `${color.Orange}`, padding: "15px 0 0 0px", fontSize: 50 }}>{"Labeling Policy  (Version 6.5)"}</Title>
            <br />
            <Text type="danger">Insert ScreenShot</Text>
            <br />
            <Text >Labels are attached to individual emails for grouping the emails. A labeling policy is defined as a set of conditions in terms of senders and recipients of the emails, subject, body or attachments of the emails. A labeling policy helps in identifying an email easily whereas a retention policy helps in setting a time limit for the email to be in the archival storage. For example, all emails sent by the finance department can be labeled  <Text strong>Finance</Text>.   </Text>

            <br />
            <Text>Labels are useful in identifying the emails during a search operation. A label name can be given as a keyword for a complete search result, or part of a search result.  </Text>
            <br />
            <Text strong>
                Note: An email can be associated with more than one label.
         </Text>
            <br />
            <Text>
                To define labeling policies, select the <Text strong>Setup</Text> menu and select <Text strong> Labeling Policy</Text>.
         </Text>
            <br />
            <Title  style={{ color: `${color.Blue}`, fontSize: 25 }}>{"System Labels (Version 6.5)"}</Title>
            <br />
            <Text>
                Labels created through <Text strong>the Labeling Policy </Text>menu by the SonaVault administrator are called System Labels. The system labels are visible to all the users.
         </Text>
            <br />
            <Title  style={{ color: `${color.Blue}`, fontSize: 25 }}>{"User Labels (Version 6.5)"}</Title>
            <br />
            <Text>
                When users search for emails, in the search results window, users can create labels for emails. These labels can help in categorizing the emails based on personal relevance.
         </Text>
            <br />
            <Text>
                For example, a SonaVault administrator may label all the emails sent to the quality assurance group as <Text strong>SQA</Text> whereas an individual member of the SQA team can label them as <Text strong>Metrics, Status Reviews,</Text> and so on.
         </Text>
            <br />
            <Text>
                User labels are personal; a user can see one's own labels apart from the system labels, but not the labels of any other user.
         </Text>
            <br />
            <Text>
                To add a labeling policy, click <Text strong>Add</Text>. See <a href="/#">Add New Labeling Policy</a>.
         </Text>
            <br />
            <Text>
                To edit a labeling policy, click the edit icon  <Text type="danger">Insert ScreenShot</Text> next to the labeling policy.  See <a href="/#">Edit Labeling Policy</a>.
         </Text>
            <br />
            <Text>
                Depending on the usability of a labeling policy, do the following:
         </Text>
            <ul>
                <li>To enable a labeling policy, select the policy and click <Text strong>Enable</Text>.    </li>
                <li>To disable a labeling policy, select the policy and click <Text strong> Disable</Text>.    </li>
                <li>To delete a labeling policy, select the policy and click  <Text strong>Delete</Text>.  </li>
                <li>Modify the list of selected mailboxes as necessary.  Use the arrow buttons to modify the list.     </li>
                <li>Click <Text strong>Save</Text> to save the changes. </li>
            </ul>
            <br />
            <Text>
                The number of labeling policies and related information displayed on one page and the page size can be specified as required. The default page size is 10.
            </Text>
            <br />
            <Text>
                In the Labeling Policy page, for each labeling policy, the details such as label name, status, and so on are displayed. If you want to hide any one of the columns, click on the  <Text type="danger">Insert ScreenShot</Text> icon present at the top of the column and uncheck the unwanted column.
            </Text>
            <br/>
        </div>
        <AutoLabelingAdd/>
    <AutoLabelingEdit/>
        </div>
    )

}

export default AutoLabel;
function AutoLabelingAdd() {
    return (
        <div style={{ paddingLeft: 40, paddingTop: 3, display: "flex", justifyContent: "center", flexDirection: "column" }}>
            <Title style={{ color: `${color.Orange}`, padding: "15px 0 0 0px", fontSize: 50 }}>{"Add  Labeling Policy(Version 6.5)"}</Title>
            <br />
            <Text type="danger">Insert ScreenShot</Text>
            <br />
            <Text >To add a new labeling policy, click <Text strong>Add</Text> in the <Text strong>Labeling Policy page</Text>. The <Text strong> Add New Labeling Policy</Text> page is displayed.  </Text>

            <br />

            <ol>
                <li>Enter the <Text strong>Policy Name</Text>.     </li>
                <li>In the Label list select <Text strong>Add New</Text>. In the <Text strong>Enter New Label</Text> window displayed, enter a new label name and click <Text strong>Save</Text>.   </li>

                <br />
                <Text type="danger">Insert ScreenShot</Text>
                <br />
                <Text>
                    The labels created earlier are displayed in the <Text strong>Label</Text> list. You can select a name from the list.
             </Text>
                <li>By default, the <Text strong>Active</Text> box is checked, and the new policy becomes active when it is created. If you want to create a policy, but not make it active immediately, you can uncheck this box.   </li>
               
                <li><Text>
                    In the Policy Criteria pane, specify the parameter, condition type, and the condition value, and click <Text strong>Add</Text>.</Text><br /><Text>
                        A policy can have one or more criteria. A policy criterion is defined as a condition of parameters. The condition is expressed as the parameter having a certain value.
                 </Text><br />
                    <Text>
                        The parameter can be Subject, Sender, <Text strong>To</Text>,<Text strong> Cc</Text>, <Text strong>Bcc</Text>, <Text strong>Sender/To/Cc/Bcc</Text> and <Text strong>Body</Text>. These are available in the Where list.
                 </Text>
                    <br />
                    <Text strong>

                        Condition Type can be Is, Is Not, Contains, Does Not Contain, Starts With and Ends With.
                 </Text>
                    <br />
                    <Text>
                        Condition Value is specified by you.
                 </Text>
                    <br />
                    <Text strong>
                        Note: If the policy has multiple condition types and condition values for the same Where value, the policy is applied even if one of the condition types or condition values matches. However, if multiple values are specified in Where, the policy is applied only if all the Where values match.That is, the policy is applied if all the Where values match. However, within a single Where value, it is enough if one of the condition types or values matches.
       
                 </Text>
                    <br />
                    <Text strong>
                        Note: If an operation you want to avail is disabled (appears in gray), upgrade your license.  Contact the Sonasoft support team to upgrade your license. </Text>
                    <br />
                    <Text type="danger">Insert ScreenShot</Text>
                    <br />
                    <Text>
                        In the above screen, the policy is applied if the value of Subject Contains or Subject Starts With matches the specified value. However, the policy is applied only if the Subject, Sender, and Body match the values mentioned in the condition value.  The above setting has the following interpretation:
                          </Text>
                    <br />
                    <Text strong>
                        Example 1
                          </Text>
                    <br />
                    <Text>
                        Select Where as Sender, Condition Type as Is and Condition Value as johnsmith@integramicro.com. The policy can be named as Performance Appraisal.
                 
                 All the emails sent by johnsmith@integramicro.com will be labeled with this label policy (Performance Appraisal).
                      </Text>
                    <br />
                    <Text strong>
                        Example 2
                         </Text>
                    <br />
                    <Text>
                        Select Where as To, Condition Type as Starts With, and Condition Value as sysadmin@.All the emails with to address starting with sysadmin@ will be labeled with this label policy.
                       </Text>
                    <br />
                    <Text strong>
                        Example 3
                        </Text>
                    <br />
                    <Text>
                        Select Where as Subject, Condition Type as Is Not and Condition Value as reminder.All the emails with subject other than reminder will be labeled with this label policy.
                       </Text>
                    <br />
                    <Text strong>
                        Example 4
                          </Text>
                    <br />
                    <Text>
                        Select Where as Cc, Condition Type as Ends With and Condition Value as @sonasoft.com.
                      </Text>
                    <br />
                    <Text>
                        All the emails with Cc ending with @sonasoft.com will be labeled with this label policy.
                 
                   </Text>
                    <br />
                    <Text>
                        The policy entered is displayed in the policy criteria list. Multiple criteria can be entered for a single policy. If you want to enter another criterion, enter the criterion values and click Add. After adding criteria, if a criterion is not required, you can remove it by clicking the remove icon <Text type="danger">Insert ScreenShot</Text> next to it.
                    </Text>


                </li>
                <li>
                    Click <Text strong>Save</Text> to add the labeling policy or <Text strong>Cancel</Text> to exit without adding.
                 </li>
            </ol>
            <br />



        </div>
    )

}

function AutoLabelingEdit() {
    return (
        <div style={{ paddingLeft: 40, paddingTop: 3, display: "flex", justifyContent: "center", flexDirection: "column" }}>
            <Title style={{ color: `${color.Orange}`, padding: "15px 0 0 0px", fontSize: 50 }}>{"Edit Labeling Policy(Version 6.5)"}</Title>
            <br />
            <Text type="danger">Insert ScreenShot</Text>
            <br />
            <Text >To edit a labeling policy, click the edit icon <Text type="danger">Insert ScreenShot</Text> next to it in <Text strong>Labeling Policy</Text> page. The <Text strong>Edit Labeling Policy</Text> page is displayed. </Text>

            <br />

            <ol>
                <li>You can change the <Text strong>Policy Name</Text>, <Text strong>Label</Text>, or the <Text strong>Active</Text> status of the policy.    </li>
                <li>You can change the policy criteria by adding new criteria or modifying or deleting existing criteria.     </li>

               
                <li>Click <Text strong>Add</Text>. The criterion gets displayed in the list.    </li>
               
                <li><Text>
                Click <Text strong>Save</Text> to save the information or click <Text strong> Cancel </Text>to exit without saving.</Text><br /><Text strong>
                Note: If the policy has multiple condition types and condition values for the same Where value, the policy is applied even if one of the condition types or condition values matches. However, if multiple values are specified in Where, the policy is applied only if all the Where values match.  
                 </Text><br />
                    <Text strong>
                    That is, the policy is applied if all the Where values match. However, within a single Where value, it is enough if one of the condition types or values matches.  
                 </Text>
                 <br/>
                    
                    <Text type="danger">Insert ScreenShot</Text>
                    <br />
                    <Text>
                    In the above screen, the policy is applied if the value of <Text strong>Subject Contains </Text>or <Text strong>Subject Starts With</Text> matches the specified value. However, the policy is applied only if <Text strong>Subject, Sender,</Text> and <Text strong>Body</Text> match the values mentioned in the condition value. </Text>
               
                </li>
                
            </ol>
        



        </div>
    )

}