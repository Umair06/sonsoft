import React, { Component } from 'react'
import { Drawer, Typography, Avatar, Icon } from "antd";
// import { SecondryButton } from "../Button/Button"
import Theme from "../../Assets/Theme/Theme";
import EditProfile from '../../Assets/icons/SV_ICONS/EditProfile_Blue.png'
import Logout_Blue from '../../Assets/icons/SV_ICONS/Logout_Blue.png';
// import ProfilePicture from "../../Assets/images/profile2.jpg"
import ChangePassword_Blue from '../../Assets/icons/SV_ICONS/ChangePassword_Blue.png';
import Clear_Gray from '../../Assets/icons/SV_ICONS/Clear_Gray.png';
import { getAuthenticUserInfo } from '../../Redux/Actions/LoginAction/LoginAction'
import { postLogout } from '../../Redux/Actions/LogoutAction/LogoutAction'
import GetUserRole, { removeAllRoles } from '../../Redux/Actions/GetUserRoleAction/GetUserRoleAction';
import style from "../../styles";
import { defineMessages } from 'react-intl';
import { connect } from "react-redux";
import { message } from 'antd'



const messages = defineMessages({
    'CHANGE PASSWORD': {
        id: "ProfileDrawer.CHANGEPASSWORD",
        defaultMessage: "CHANGE PASSWORD",
    },
    'LOG OUT': {
        id: "ProfileDrawer.LOGOUT",
        defaultMessage: "LOG OUT"
    },
})

const { color } = Theme;
const { Title, Paragraph, Text } = Typography;

class ProfileDrawer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userInfo: this.props.authenticUserInfo
            // userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : false
        }
        message.destroy()
    }
    onHover = (id) => {
        document.getElementById(id).style.display = "flex";
    }
    onLeave = (id) => {
        document.getElementById(id).style.display = "none";
    }

    logout = async () => {
        const { logoutCurrentUser, GetUserRole, /*removeAllRoles,authenticUserInfo*/ } = this.props

        // authenticUserInfo.data.data.output[0].name !== "sonasoftarc" && this.props.postLogout();
        await logoutCurrentUser(null)
        await localStorage.setItem("userInfo", 0)
        await GetUserRole(null)
        // await removeAllRoles()
        window.location.pathname = '/'
    }
    render() {
        const { formatMessage, authenticUserInfo } = this.props;
        let displayName;
        try {
            displayName = authenticUserInfo && authenticUserInfo.data && authenticUserInfo.data.data && authenticUserInfo.data.data.output && authenticUserInfo.data.data.output[0].displayName ? authenticUserInfo.data.data.output[0].displayName.split(" ") : authenticUserInfo.data.data.output[0].name.split(" ")
        } catch (e) {
            displayName = ""
        }
        return (
            <Drawer
                style={{ marginTop: "61px", padding: "0px 24px", overflowY: "auto" }}
                bodyStyle={{ height: 'calc(100vh - 61px)', overflowY: "auto" }}
                maskStyle={{ backgroundColor: "transparent" }}
                width={400}
                onClose={() => this.props.close()}
                closable={false}
                visible={this.props.profileDrawer}
            >
                <div style={{ padding: "10px 10px", display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div style={{ ...style.setting.drawerIconTitleWrapper }}>
                            <img title="Edit Profile" src={EditProfile} width="50px" style={{ ...style.cursorPointer }} alt="Help" />
                            <div title={authenticUserInfo && authenticUserInfo.data && authenticUserInfo.data.data && authenticUserInfo.data.data.output && authenticUserInfo.data.data.output[0] && authenticUserInfo.data.data.output[0].name} style={{ cursor: "default" }}>
                                {/* <Avatar style={{
                                    backgroundColor: color.Orange, width: 60, height: 60, fontSize: 25,
                                    display: 'flex', justifyContent: "center", alignItems: "center"
                                }}>SB</Avatar> */}
                                {/* <img title="Profile Picture" src={ProfilePicture} style={{borderRadius: '100%', height: 30, border: `1px solid ${color.Orange}`, backgroundImage: `url(${ProfilePicture})` }} /> */}

                            </div>
                            <Title style={{ color: `${color.Orange}`, padding: "15px 0 0 18px", fontSize: 24 }}> Profile</Title>
                            {/* <Title style={{ color: color.Blue, padding: 0, marginLeft: 15 }} level={3}>Shankar Bindhumadhavan</Title> */}
                        </div>
                        <div onClick={() => this.props.close()} style={{ padding: 22, cursor: "pointer" }}>
                            <img src={Clear_Gray} title="Close" alt="" onClick={() => this.props.close()} width={28} height={28} />
                        </div>
                    </div>

                    <div>
                        {/* <div title="Profile Picture"  onMouseOver={(e) => this.onOverEditProfile(e)}
                            onMouseLeave={(e) => this.onLeaveEditProfile(e)}
                            style={{ margin: '40px 100px', borderRadius: '100%', height: 120, border: `2px solid ${color.Orange}`, backgroundColor: color.Orange ,fontSize: 72,textAlign: "center", display: "flex", alignItems: "center"}} >SB</div> */}
                        <Avatar 
                            // onMouseOver={() => { this.onHover("EditProfile") }} onMouseLeave={() => { this.onLeave("EditProfile") }}
                            style={{ backgroundColor: color.Orange, margin: '40px auto', width: 100, height: 100, fontSize: 40, textAlign: "center", display: "flex", alignItems: "center", cursor: "pointer" }}>{displayName && displayName.map(name => name[0] && name[0].toUpperCase())}
                            <div  id="EditProfile" style={{ display: "none", flexDirection: "column", alignItems: "center" }}>
                                <Icon type="camera" style={{ fontSize: 10, padding: 0, marginBottom: -14 }} />
                                <Text style={{ fontSize: 10, cursor: "pointer", color: '#fff', textAlign: "center" }}>Update</Text></div>
                        </Avatar>
                        {/* <Avatar id="EditProfile" onMouseOver={() => { this.onHover("EditProfile") }} onMouseLeave={() => { this.onLeave("EditProfile") }} style={{ display: "none", alignItems: "center", borderRadius: "0 0 90px 90px", margin: '40px auto', height: 50, width: 100, marginTop: -90, backgroundColor: "#3a39398f" }}>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <Icon type="camera" style={{ fontSize: 10, padding: 0, marginBottom: -14 }} />
                                <Text style={{ fontSize: 10, cursor: "pointer", color: '#fff', textAlign: "center" }}>Update</Text></div>
                        </Avatar> */}

                    </div>
                    <div style={{ paddingBottom: 10, display: 'flex', justifyContent: 'flex-start', flexDirection: "column" }}>
                        <Title style={{ color: color.Blue, padding: 0, textAlign: "center" }} level={4}>{displayName}</Title>
                        <Text style={{ color: color.Blue, textAlign: "center", marginTop: -10 }}>{authenticUserInfo && authenticUserInfo.data && authenticUserInfo.data.data && authenticUserInfo.data.data.output && authenticUserInfo.data.data.output[0] && authenticUserInfo.data.data.output[0].mailbox}</Text>
                    </div>
                    <div style={{ width: "inherit", backgroundColor: "#fff", marginTop: 20 }}>
                        <div style={{ display: "flex", justifyContent: "space-around", flexDirection: 'row', padding: 10 }}>
                            {authenticUserInfo && authenticUserInfo.data && authenticUserInfo.data.data && authenticUserInfo.data.data.output && Array.isArray(authenticUserInfo.data.data.output) && authenticUserInfo.data.data.output[0] && authenticUserInfo.data.data.output[0].usertype && authenticUserInfo.data.data.output[0].usertype === 'L' ?
                                <div style={{ display: "flex", flexDirection: "column", cursor: "pointer" }} onClick={() => this.props.openChangePassDrawer && this.props.openChangePassDrawer()}>
                                    <div style={{ textAlign: "center", height: 32, display: "flex", alignItems: "flex-end", justifyContent: "center" }}><img title="Change Password" src={ChangePassword_Blue} width="32px" style={{ ...style.cursorPointer }} alt="change Password" /></div>
                                    <Paragraph style={{ color: color.Orange, textAlign: "center", width: 100, fontSize: "13px" }}>{formatMessage(messages["CHANGE PASSWORD"])}</Paragraph>
                                </div> : null}
                            <div style={{ display: "flex", flexDirection: "column", cursor: "pointer" }} onClick={() => this.logout()}>
                                <div style={{ textAlign: "center" }}><img src={Logout_Blue} width="32px" style={{ ...style.cursorPointer }} title="Logout" alt="logout" /></div>
                                <Paragraph style={{ color: color.Orange, fontSize: "13px" }}>{formatMessage(messages["LOG OUT"])}</Paragraph>
                            </div>
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


const mapStateToProps = state => {

    return {
        authenticUserInfo: state.LoginReducer.authenticUserInfo
        // loaded: state.SimpleSearchReducer.loaded,
        // savedSearch: state.SimpleSearchReducer.savedSearch
    }
};

const mapDispatchToProps = dispatch => ({
    logoutCurrentUser: data => dispatch(getAuthenticUserInfo(data)),
    GetUserRole: item => dispatch(GetUserRole(item)),
    removeAllRoles: () => dispatch(removeAllRoles()),
    postLogout: () => dispatch(postLogout())
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDrawer);
