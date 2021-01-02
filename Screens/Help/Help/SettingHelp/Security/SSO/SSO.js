import React from 'react';

import { Typography, /*Tabs*/} from 'antd';
//import style from "../../../../../../styles";

import Theme from "../../../../../../Assets/Theme/Theme"





const { Text, Title } = Typography;
//const { TabPane } = Tabs;
const { color } = Theme



function SSO  () {
    return (
        <div style={{ paddingLeft: 40, paddingTop: 3, display: "flex", justifyContent: "center", flexDirection: "column" }}>
        <Title style={{ color: `${color.Orange}`, padding: "15px 0 0 0px", fontSize: 50 }}>{"SSO Single Sign-On Setting  (Version 6.5)"}</Title>
        <br />
        <Text type="danger">Insert ScreenShot</Text>
        <br />
        
        <Title  style={{ color: `${color.Blue}`, fontSize: 25 }}>{"SSO configuration (Version 6.5)"}</Title>
        <br />
        <ul>
            <li>Login into ssarcui (sonavault console) web application, navigate to Configuration menu and select SSO Setting tab item </li>

            <li> <Text strong>Identity Provider URL:</Text> (end point) IDP URL where the domain is registered for authentication. (IDP Server URL)    </li>
            <li><Text strong>Service Provider URL:</Text> (optional) This field can be optional if the SonaVault login URL is configured at the IDP server. If not, enter SonaVault login screen URL (https://domain/ssarcui/easlogin.aspx) </li>
            <li> <Text strong>Issuer:</Text> Application name (ADFS NAME) or Application id (AZURE)</li>
            <li> <Text strong>Public Certificate:</Text> Upload SSL certificate if you have an IDP server provided for authentication  </li>
            <li> <Text strong>Enable:</Text> Check if you want to verify credential with the IDP server. If not, authenticate by application  </li>
        </ul>
        <br />
        <Text >The user must use https://domain/ssarcui/loginpage.aspx link to connect IDP server for SSO authentication, if SSO is enabled. If the user has already logged in with the IDP server credentials in any of the applications, then SonaVault application is accessed by Windows applications/web applications caches/cookies, if not IDP server prompt for credentials. Once these credentials are verified, the user gets a call back response with SAML Response code in base64 string format. We are validating SAML Response and getting the logged in user attributes.</Text>

        <br />
        <Text >
        The user can send request along with SAML Response file to https://domain/ssarcui.easlogin.aspx.  For this, we need to enable SSO authentication with/without IDP URL, Service Provider URL, Issuer, and public key. 
     </Text>
      
           
            </div>
    )

}

export default SSO;
