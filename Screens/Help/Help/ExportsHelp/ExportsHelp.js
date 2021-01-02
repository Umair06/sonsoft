import React from 'react';
import {Typography } from 'antd';
import Theme from "../../../../Assets/Theme/Theme"
import Export1 from "../../../../Assets/ScreenShots/export1.PNG"
import Export2 from "../../../../Assets/ScreenShots/export2.PNG"
import Export3 from "../../../../Assets/ScreenShots/export3.PNG"
import Export4 from "../../../../Assets/ScreenShots/export4.PNG"
import Export5 from "../../../../Assets/ScreenShots/export5.PNG"
import Export6 from "../../../../Assets/ScreenShots/export6.PNG"
import refreshIcon from "../../../../Assets/icons/SV_ICONS/Refresh_Blue.png"
import exportBlueIcon from "../../../../Assets/icons/SV_ICONS/Exports_Blue.png"
import updown from "../../../../Assets/images/updown.PNG"
const { color } = Theme
const {Title,Text} = Typography;

function Exports() {
        return (
            <div>
            <div style={{ paddingLeft: 40, paddingTop: 3, display: "flex", justifyContent: "center", flexDirection: "column" }}>
                <Title style={{ color: `${color.Orange}`, padding: "15px 0 0 0px", fontSize: 50 }}>{"Exports"}</Title>

                <Text>
                You can view the exported files at the <Text strong>Exports</Text> module of SonaVault. The emails retrieved from the search operation in <Text strong>Search Archive</Text> can be exported as HTML, EML, MSG, or PST files. 
               </Text>
                <br />
                <Text>To access the <Text strong>Exports page: </Text> </Text>
                <ol>
                    <li>
                    Select <Text strong>Exports</Text> from SonaVault homepage. 
                    <br />
                        <br />
                        <img alt='' src={Export1} />
                        <br />
                        <br />
                    </li>
                    <li>
                    This navigates you to the <Text strong>Exports</Text>homepage. 
                    <br />
                        <br />
                        <img alt='' src={Export2} />
                        <br />
                        <br />
                    </li>
                    <li>
                    Before you start exploring the page, select the Refresh icon <img alt='' src={refreshIcon} width="50px" height="auto"/> located at the top right corner to get updated information about the page
                    <br />
                        <br />
                        <img alt='' src={Export3} />
                        <br />
                        <br />
                    </li>
                    <li>
                    On the left pane, you can view the Exports section. Select the Exports icon <img alt='' src={exportBlueIcon} width="50px" height="auto"/>
                    <br />
                        <br />
                        <img alt='' src={Export4} />
                        <br />
                        <br />
                    </li>
                    <li>
                    This navigates you to the Exports list. You can view the name of the export, date until the document is available, and the link to download the document.
                    <br />
                        <br />
                        <img alt='' src={Export5} />
                        <br />
                        <br />
                        <ul>
                            <li>
                            <Text strong>Name</Text> indicates the name of the exported file.
                            </li>
                            <li>
                            <Text strong>Available Until </Text>indicates the date until which the file will be there in the repository.
                            </li>
                            <li>
                            <Text strong>Downloadable Link  </Text>provides a link of the document.
                            </li>
                        </ul>
                    </li>
                </ol>
                <Text>Note: Select on the sorting icon <img alt='' src={updown} width="50px" height="auto"/>  next to <Text strong>Name</Text> and <Text strong>Available Until </Text> to sort the name and date in ascending or descending order.</Text>

                 <ol><br />
                        <br />
                        <img alt='' src={Export6}/>
                        <br />
                        <br />
                        </ol>

                

            </div>
            
           
        </div>
        )
    
}

export default Exports;
