import React, { Component } from 'react'
import { Drawer, Typography, } from "antd";
// import { SecondryButton } from "../Button/Button"
import Theme from "../../Assets/Theme/Theme";
import Help_DBlue from "../../Assets/icons/SV_ICONS/Help_DBlue.png";
import WhatsNew_Blue from '../../Assets/icons/SV_ICONS/WhatsNew_Blue.png';
import Help_Blue from '../../Assets/icons/SV_ICONS/Help_Blue.png';
import About_Blue from '../../Assets/icons/SV_ICONS/About_Blue.png';
import Clear_Gray from '../../Assets/icons/SV_ICONS/Clear_Gray.png';
// import helpIcon from "../../Assets/icons/Help.png";

import style from "../../styles"
import { defineMessages } from 'react-intl';

const messages = defineMessages({
    'Help': {
        id: "HelpDrawer.Help",
        defaultMessage: "Help",
    },
    'WHATS NEW': {
        id: "HelpDrawer.WHATSNEW",
        defaultMessage: "WHAT'S NEW"
    },
    'HELP': {
        id: "HelpDrawer.HELP",
        defaultMessage: "HELP"
    },
    'ABOUT': {
        id: "HelpDrawer.ABOUT",
        defaultMessage: "ABOUT"
    },
})

const { color } = Theme;
const { Title, Paragraph } = Typography;


class HelpDrawer extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    NavigateToWhatsNew = () => {
        window.location.pathname = "/whatsnew/whatsnew"

    }
    NavigateToHelp = () => {
        window.location.pathname = "/help/controlcenter"

    }
    render() {
        const { signIn, formatMessage, NavigateToHelp, NavigateToWhatsNew } = this.props;
        return (

            <Drawer
                style={{ marginTop: !signIn ? "61px" : "0", padding: "0px 24px", overflow: "auto" }}
                bodyStyle={{ height: !signIn ? 'calc(100vh - 61px)' : "100%", overflowY: "auto" }}
                maskStyle={{ backgroundColor: "transparent" }}
                width={400}
                onClose={() => this.props.close()}
                closable={false}
                visible={this.props.helpDrawer}
            >
                <div style={{ padding: "0px 8px", display: "flex", flexDirection: "column" }}>
                    <div style={style.setting.drawerMain}>
                        <div style={style.setting.drawerIconTitleWrapper}>
                            <img title='Help' src={Help_DBlue} width="40px" style={style.cursorPointer} alt="Help" />
                            <Title style={{ color: `${color.Blue}`, padding: "20px 0 5px 18px", fontSize: 24 }}>{formatMessage(messages["Help"])}</Title>
                        </div>
                        <div onClick={() => this.props.close()} style={{ padding: 8, cursor: "pointer" }}>
                            <img src={Clear_Gray} title="Close" alt="" onClick={() => this.props.close()} width={28} height={28} />
                        </div>
                    </div>
                    
                    <div style={{ width: 350, backgroundColor: "#fff" }}>
                        <div style={{ display: "flex", justifyContent: "space-around", flexDirection: 'column', padding: 5 }}>
                            <div style={{ display: "flex", flexDirection: "row", cursor: "pointer", marginTop: 20 }} onClick={() => NavigateToWhatsNew ? NavigateToWhatsNew() : this.NavigateToWhatsNew()} >
                                <img src={WhatsNew_Blue} height="30px" style={style.cursorPointer} alt="What'sNew" title="What'sNew" />
                                <Paragraph style={{ marginLeft: 20, padding: 5, color: color.Orange, alignSelf: "center" }}>{formatMessage(messages["WHATS NEW"])}</Paragraph>
                            </div>
                            <br />
                            <div style={{ display: "flex", flexDirection: "row", cursor: "pointer" }} onClick={() => NavigateToHelp ? NavigateToHelp() : this.NavigateToHelp()}>
                                <img src={Help_Blue} height="30px" style={style.cursorPointer} alt="Help" title="Help" />
                                <Paragraph style={{ marginLeft: 20, padding: 5, color: color.Orange }}>{formatMessage(messages["HELP"])}</Paragraph>
                            </div>
                            <br />

                            <div style={{ display: "flex", flexDirection: "row", cursor: "pointer" }} onClick={() => this.props.openAboutUsDrawer && this.props.openAboutUsDrawer()}>
                                <img src={About_Blue} height="30px" style={style.cursorPointer} alt="About" title="About" />
                                <Paragraph style={{ marginLeft: 20, padding: 5, color: color.Orange }}>{formatMessage(messages["ABOUT"])}</Paragraph>
                            </div>
                            <br />

                        </div>
                    </div>
                    
                    {/* <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                            <SecondryButton text="Cancel" onClick={() => this.props.close()} style={{ marginRight: 8 }}>

                            </SecondryButton>
                        </div> */}
                </div>
            </Drawer>

        )
    }
};

export default HelpDrawer;
