import React from 'react';
import {Typography } from 'antd';
import styles from "../../../../../styles"
import whatsNewIcon from "../../../../../Assets/icons/SV_ICONS/WhatsNew_Blue.png"
import myArchived1 from "../../../../../Assets/images/myArchived1.PNG";
import myArchived2 from "../../../../../Assets/images/myArchived2.PNG";

const {Text ,Title} = Typography;

function Policies() {
        return (
            <div style={{padding:40}}>
                <div style={{display:"flex", flexDirection :'row'}}><img src={whatsNewIcon} title="What's New" alt="What's New"></img><Title  style={styles.helpHeadingTitle} >What's New  in Policies</Title></div>
                <Text style={styles.helpText}> Left Navigation Pane added to My Archived Emails </Text>
                <Title style={styles.helpTitle}> Left Navigation Pane </Title>
                <Text style={styles.helpText}> The Left Navigation Pane allow user to browse and seach their archived emails. </Text>
                <br />
                <Text style={styles.helpText}> By default, the Filter icon will be selected. This allows you to browse your email folders.  </Text>
                <br />
                <br />
                <img src={myArchived1} alt=""/>
                <br />
                <br />
                <Text style={styles.helpText}> To search your emails, click the Search icon.</Text>
                <br />
                <br />
                <img src={myArchived2} alt="" />

            </div>
        )
    
}

export default Policies;
