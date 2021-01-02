import React from 'react';
import { Typography } from 'antd';
//import styles from "../../../../../../styles"
import Theme from "../../../../../../Assets/Theme/Theme"
// import whatsNewIcon from "../../../../Assets/icons/SV_ICONS/WhatsNew_Blue.png"
// import myArchived1 from "../../../../Assets/images/myArchived1.PNG";
// import myArchived2 from "../../../../Assets/images/myArchived2.PNG";

const { Text, Title } = Typography;
const { color } = Theme

function ActivateProduct() {
    return (
        <div>
        <div style={{ paddingLeft: 40, paddingTop: 3, display: "flex", justifyContent: "center", flexDirection: "column" }}>
            <Title style={{ color: `${color.Orange}`, padding: "15px 0 0 0px", fontSize: 50 }}>{"Activate Product    (Version 6.5)"}</Title>
            
         

            <br />
            <Text type="danger">Insert ScreenShot</Text>
            <br />
            <Text>To activate the product, click the <Text strong>Browse </Text>button and locate the license key file (license.licx), and click the <Text strong>Upload License Key</Text> option.  </Text>
            <br/>
            <Text>
            Explicit activation of the product is necessary in case of license upgrades and modifications in mailboxes or email servers. A license can be for a lifetime or for a limited period. After the license key is uploaded and the product activated, the <Text strong>Activate Product</Text> page displays the following details: 
            </Text>
            <br/>
            <Title  style={{ color: `${color.Blue}`, fontSize: 25 }}>{"Authorization Key"}</Title>
            <Text>
            An authorization key is given to every customer whose emails are archived through the application.<br/>Authorization key is visible only to the super user, sonasoftarc. 
            </Text>
            <br/>
            <Title  style={{ color: `${color.Blue}`, fontSize: 25 }}>{"License Information "}</Title>
            <ol>
                <li>
                <Text strong>Licensed To:</Text> Name of the company to which the product is licensed  
                </li>
                <li>
                <Text strong>Expiry Date: </Text> This date indicates the date on which the license of the product expires. To continue to use the product, you must renew the license before the expiry date.  
                </li>
                <li>
                <Text strong>Mailbox(es): </Text>  It is the maximum number of mailboxes that can be archived using this product.  
                </li>
                <li>
                <Text strong>Active Directory: </Text>Indicates the number of active directories for which the license is granted.   
                </li>
                <li>
                <Text strong>Email Server(s): </Text>It is the maximum number of email servers that can be accessed for archiving sent/received emails.     
                </li>
            </ol>
            <br/>
            <Text strong>
            Note: License keys limit how many mailboxes and email servers you can register to the SonaVault Application Server. A filename is accepted for the license file as long as the extension is .licx. This helps in distributing license key files in bulk. </Text>
           


           
            </div>
         
            </div>
    )

}

export default ActivateProduct;
