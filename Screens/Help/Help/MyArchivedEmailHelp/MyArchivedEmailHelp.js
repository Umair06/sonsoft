import React from 'react';
import {Typography } from 'antd';
import Theme from "../../../../Assets/Theme/Theme"
import myArchiveEmailScreen1 from "../../../../Assets/ScreenShots/myarchivedemail1.PNG"
import myArchiveEmailScreen2 from "../../../../Assets/ScreenShots/myarchivedemail2.PNG"
import myArchiveEmailScreen3 from "../../../../Assets/ScreenShots/myarchivedemail3.PNG"
import myArchiveEmailScreen4 from "../../../../Assets/ScreenShots/myarchivedemail4.PNG"
import myArchiveEmailScreen5 from "../../../../Assets/ScreenShots/myarchivedemail5.PNG"
import myArchiveEmailScreen6 from "../../../../Assets/ScreenShots/myarchivedemail6.PNG"
import myArchiveEmailScreenForward1 from "../../../../Assets/ScreenShots/myarchivedemailforward1.PNG"
import myArchiveEmailScreenForward2 from "../../../../Assets/ScreenShots/myarchivedemailforward2.PNG"
import myArchiveEmailScreenForward3 from "../../../../Assets/ScreenShots/myarchivedemailforward3.PNG"
import myArchiveEmailScreenDownload1 from "../../../../Assets/ScreenShots/myarchivedemaildownload1.PNG"
import myArchiveEmailScreenDownload2 from "../../../../Assets/ScreenShots/myarchivedemaildownload2.PNG"
import myArchiveEmailScreenDownload3 from "../../../../Assets/ScreenShots/myarchivedemaildownload3.PNG"
import forwardIcon from "../../../../Assets/icons/SV_ICONS/Forward_Orange.png"
import downloadIcon from "../../../../Assets/icons/SV_ICONS/Download_Orange.png"
const { color } = Theme
const {Title,Text} = Typography;

function MyArchivedEmail() {
        return (
            <div>
            <div style={{ paddingLeft: 40, paddingTop: 3, display: "flex", justifyContent: "center", flexDirection: "column" }}>
                <Title style={{ color: `${color.Orange}`, padding: "15px 0 0 0px", fontSize: 50 }}>{"My Archived Email "}</Title>

                <Text>
                Archiving your professional emails helps you to prevent data loss. With an email archiving system in place, you can retrieve your archived emails in advance during downtime or can procure the document in the event of litigation. It allows you to be equipped for any potential eDiscovery requests. The database also helps you to keep up with the regulatory compliance standard. With the assistance of an email archiving system, you can store your email in an authentic, tamper-proof manner for a long time.
               </Text>
                <br />
                <Text>“My Archived Email” feature of SonaVault enables you to search your archived mailboxes. It allows you to search archived email, access the document and attachments, and download and forward them to intended recipients.  </Text>
                <br/>
                <br/>
                <Text>To access archived emails: </Text>
                <ol>
                    <li>Select <Text strong> My Archived Email</Text> from SonaVault homepage.
                    <br />
                        <br />
                        <img alt='' src={myArchiveEmailScreen1} />
                        <br />
                        <br />
                        </li>
                        <li>This navigates you to My Archived Email homepage. On the left pane, you can see a list of information like Calendar, Contacts, Conversation History etc. Scroll down and select <Text strong>Inbox</Text>. 
                    <br />
                        <br />
                        <img alt='' src={myArchiveEmailScreen2} />
                        <br />
                        <br />
                        </li>
                        <li>This navigates you to your archived emails, where you can view the email type, sender and recipient addresses, and a snippet of the message.  
                    <br />
                        <br />
                        <img alt='' src={myArchiveEmailScreen3} />
                        <br />
                        <br />
                        </li>
                        <li>Select the bar that contains the email that you need to access.   
                    <br />
                        <br />
                        <img alt='' src={myArchiveEmailScreen4} />
                        <br />
                        <br />
                        </li>
                        <li>This automatically navigates you to the <Text strong>Message</Text> side-drawer. There are two sections:  Message and Metadata. Selecting the Message section gives you access to the complete email, along with headers including sender and recipient addresses, subject line, and the date and time received.   
                    <br />
                        <br />
                        <img alt='' src={myArchiveEmailScreen5} />
                        <br />
                        <br />
                        </li>
                        <li>Select the <Text strong>Metadata </Text>bar, and you can access specific file information including company name, content type, message-id and recipient addresses   
                    <br />
                        <br />
                        <img alt='' src={myArchiveEmailScreen6} />
                        <br />
                        <br />
                        </li>
                </ol>

                

            </div>
            <MyArchivedForwardArchivedEmail/>
            <MyArchivedDownloadArchivedEmail/>
           
        </div>
        )
    
}

export default MyArchivedEmail;
function MyArchivedForwardArchivedEmail() {
    return (
        <div>
            <div style={{ paddingLeft: 40, paddingTop: 3, display: "flex", justifyContent: "center", flexDirection: "column" }}>
                <Title style={{ color: `${color.Blue}`, fontSize: 25 }}>{"Forward My Archived Email  "}</Title>
                
                <Text>Once you access the email, you can forward it to the intended recipient. </Text>
                
                <br />
                <Text strong>To Forward an Email  </Text>
                <ol>
                    <li>
                    Select the <Text strong>Forward</Text> icon <img alt='' src={forwardIcon} width="50px" height="auto"/> located at the right side of the message bar. 
                    <br />
                        <br />
                        <img alt='' src={myArchiveEmailScreenForward1} />
                        <br />
                        <br />
                    </li>
                    <li>
                    A <Text strong>Forward</Text> side-drawer appears. In the <Text strong>Enter Email Address</Text> box, enter the sender’s email. 
                    <br />
                        <br />
                        <img alt='' src={myArchiveEmailScreenForward2} />
                        <br />
                        <br />
                    </li>
                    <li>
                    Select the <Text strong>Submit</Text> button. 
                    <br />
                        <br />
                        <img alt='' src={myArchiveEmailScreenForward3} />
                        <br />
                        <br />
                    </li>
                </ol>
                
            </div>
        </div>
    )
}
function MyArchivedDownloadArchivedEmail() {
    return (
        <div>
            <div style={{ paddingLeft: 40, paddingTop: 3, display: "flex", justifyContent: "center", flexDirection: "column" }}>
                <Title style={{ color: `${color.Blue}`, fontSize: 25 }}>{"Download My Archived Email   "}</Title>
                
                <Text>Alternatively, you can also download and save your document. </Text>
                
                <br />
                <Text strong>To Download an Email  </Text>
                <ol>
                    <li>
                    Select the Download icon  <img alt='' src={downloadIcon} width="50px" height="auto"/>located at top of the message side-drawer. 
                    <br />
                        <br />
                        <img alt='' src={myArchiveEmailScreenDownload1} />
                        <br />
                        <br />
                    </li>
                    <li>
                    A <Text strong>Download</Text> side-drawer appears.  
                    <br />
                        <br />
                        <img alt='' src={myArchiveEmailScreenDownload2} />
                        <br />
                        <br />
                    </li>
                    <li>
                    Select the <Text strong>Submit</Text> button. 
                    <br />
                        <br />
                        <img alt='' src={myArchiveEmailScreenDownload3} />
                        <br />
                        <br />
                    </li>
                </ol>
                
            </div>
        </div>
    )
}