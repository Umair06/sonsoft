import React, { Component } from 'react'
import { Drawer, Typography, } from "antd";
import Theme from "../../Assets/Theme/Theme";
import Notificaitons_DBlue from "../../Assets/icons/alarm_bell.png";
import Clear_Gray from '../../Assets/icons/SV_ICONS/Clear_Gray.png';
import style from "../../styles";
import { defineMessages } from 'react-intl';

const messages = defineMessages({
    'Notifications': {
        id: "NotificationDrawer.Notifications",
        defaultMessage: "Notifications",
    },
    'See All': {
        id: "NotificationDrawer.SeeAll",
        defaultMessage: "See All",
    },
})


const { color } = Theme;
const { Title, Text } = Typography;

let data = [
    {
        key: '1',
        notificationType: 'Export Complete',
        name: "Shreddin' Steezy v. Timberline",
        snippet: "Shreddin' Steezy v. Timberline export completed.",
        sent: "12-Sept.-2019",
        dismissed: ""
    },
    {
        key: '2',
        notificationType: 'Email Archive Failed',
        name: "Daily aechive 13-Oct.-2019",
        snippet: "The email archive failed. Had 40 million emails. Used to grab 200 emails and mes",
        sent: "13-Oct.-2019",
        dismissed: ""
    },
    {
        key: '3',
        notificationType: 'Export Complete',
        name: "Daily aechive 14-Sept.-2019",
        snippet: "The email archive failed. Had 40 million emails. Used to grab 200 emails and mes",
        sent: "14-Sept.-2019",
        dismissed: ""
    }

];


class NotificationDrawer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    render() {
        const { formatMessage, navigateToNotification } = this.props;
        return (
            <Drawer
                style={{ marginTop: "61px", overflow: "auto" }}
                bodyStyle={{ height: 'calc(100vh - 61px)', overflowY: "auto" }}
                maskStyle={{ backgroundColor: "transparent" }}
                width={400}
                onClose={() => this.props.close()}
                closable={false}
                visible={this.props.notificationDrawer}
            >
                    <div style={{...style.setting.drawerMain}}>
                        <div style={{...style.setting.drawerIconTitleWrapper}}>
                            <img title="Notifications" src={Notificaitons_DBlue} width="45px" style={{...style.cursorPointer}} alt="" />
                            <Title style={{ color: color.Blue, paddingBottom: 10, padding: "15px 0 0 18px", fontSize: 24 }} level={2}>Notifications</Title>
                        </div>
                        <div onClick={() => this.props.close()} style={{ padding: 8, cursor: "pointer" }}>
                            <img src={Clear_Gray} title="Close" alt="" onClick={() => this.props.close()} width={28} height={28} />
                        </div>
                    </div>
                    <div style={{ width: 'inherits', backgroundColor: "#fff", padding: 0 }}>
                        <div style={{ justifyContent: "center", alignItems: "center" }}>
                            <div style={{ display: "flex", flexDirection: "column", padding: 10 }}>
                                {data.map((notification,ind) => {
                                    return (
                                        <div key={ind} onClick={() => navigateToNotification(notification)} style={{ display: "flex", flexDirection: "column", color: "blue", borderBottom: `1px solid ${color.Black10}`, margin: 10, padding: 10, cursor: "pointer" }}>
                                            <Text style={{ color: color.Blue }}>{notification.name}</Text>
                                            <Text style={{ fontSize: 12, maxHeight: 15, overflowY: "hidden" }}>{notification.snippet}</Text>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div style={{ padding: 5, cursor: "default", textAlign: "end" }}>
                            <div onClick={() => navigateToNotification()} style={{ textDecoration: "underline", color: `${color.Orange}`, cursor: 'pointer' }}>
                                {formatMessage(messages["See All"])}
                            </div>
                        </div>
                    </div>
            </Drawer>
        )
    }
};

export default NotificationDrawer;

