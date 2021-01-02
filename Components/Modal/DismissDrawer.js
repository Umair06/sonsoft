import React, { Component } from 'react'
import { Drawer, Typography } from "antd";
import Theme from "../../Assets/Theme/Theme";
import { PrimaryButton, SecondryButton } from "../Button/Button";
import Clear_Gray from '../../Assets/icons/SV_ICONS/Clear_Gray.png';
import { defineMessages } from 'react-intl';
import style from "../../styles" 

const messages = defineMessages({
	'Dismiss Notification': {
		id: "DismissDrawer.DismissNotification",
		defaultMessage: "Dismiss Notification",
	},
	'Are you sure you want to dismiss the selected notifications?': {
		id: "DismissDrawer.Areyousureyouwanttodismisstheselectednotifications?",
		defaultMessage: "Are you sure you want to dismiss the selected notifications?"
	},
    'Submit': {
        id: "DismissDrawer.Submit",
        defaultMessage: "Submit"
    },
    'Cancel': {
        id: "DismissDrawer.Cancel",
        defaultMessage: "Cancel"
    },
})
const { color } = Theme;
const { Title, Text } = Typography;

class DismissDrawer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 1
        }
    }
    onChange = e => {
        this.setState({
            value: e.target.value,
        });
    };
    render() {
        const { dismissDrawer, formatMessage } = this.props
        return (
            <Drawer
                style={{ marginTop: 125 }}
                bodyStyle={{ height: 'calc(100vh - 125px)', overflowY: "auto" }}
                maskStyle={{ backgroundColor: "transparent" }}
                width={400}
                closable={false}
                visible={dismissDrawer}
                onClose={() => this.props.close()}
            >

                <div style={{...style.setting.drawerMain}}>
                    <div style={{...style.setting.drawerIconTitleWrapper}}>
                        <img src={require("../../Assets/icons/SV_ICONS/Close_Orange.png")} onClick={() => this.openDownloadDrawer()} alt='' style={{ cursor: "pointer" }} title="Dismiss" width={40} height={40} />
                        {/* <Title level={2} style={{ color: `${color.Blue}`, padding: "15px 0 0 18px", fontSize: 34 }}>{value ? "Dismiss this Notification" : "Dismiss All"}</Title> */}
                        <Title level={2} style={{ color: `${color.Blue}`, padding: "15px 0 8px 5px", fontSize: 24 }}>{formatMessage(messages["Dismiss Notification"])}</Title>
                    </div>
                    <div onClick={() => this.props.close()} style={{ cursor: "pointer" }}>
                        <img src={Clear_Gray} title="Close" alt="" onClick={() => this.props.close()} width={28} height={28} />
                    </div>
                </div>
                {/* <Text style={{ display: "flex", justifyContent: 'center', padding: 10, marginTop: 60 }}>{value ? "Are you Sure you want to dismiss this notificaton" : "Are you sure you want to dismiss all notifications?"}</Text> */}
                <div style={{ margin: '10px 0px 20px 0px' }}>
                <Text>{formatMessage(messages["Are you sure you want to dismiss the selected notifications?"])}</Text>
                </div>

                <div style={{ ...style.drawerButtons }}>
                    <PrimaryButton text={formatMessage(messages["Submit"])} />
                    <SecondryButton text={formatMessage(messages["Cancel"])} onClick={() => this.props.close()} />
                </div>

            </Drawer>
        )
    }
};



export default DismissDrawer;
