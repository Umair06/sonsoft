import React, { Component } from 'react'
import { Drawer, Typography, Form, Input, message, Icon } from "antd";
import { PrimaryButton } from "../Button/Button";
import { SecondryButton } from "../Button/Button";
import Clear_Gray from '../../Assets/icons/SV_ICONS/Clear_Gray.png';
import Theme from "../../Assets/Theme/Theme";
import ChangePassword_Blue from '../../Assets/icons/SV_ICONS/ChangePassword_Blue.png';
import style from "../../styles"
import { defineMessages } from 'react-intl';
import axios from 'axios';
import * as ApiInfo from "../../APIConfig/ApiParameters";
import { EnCrypt } from "../../PasswordEncryption/PasswordEncryption";
import { getAuthenticUserInfo } from '../../Redux/Actions/LoginAction/LoginAction'
import GetUserRole from '../../Redux/Actions/GetUserRoleAction/GetUserRoleAction';
import { connect } from "react-redux";

// import { logout } from "../Modal/ProfileDrawer";

const messages = defineMessages({
    'Change Password': {
        id: "ChangePasswordDrawer.ChangePassword",
        defaultMessage: "Change Password",
    },
    'Enter Old Password': {
        id: "ChangePasswordDrawer.EnterOldPassword",
        defaultMessage: "Enter Old Password"
    },
    'Enter New Password': {
        id: "ChangePasswordDrawer.EnterNewPassword",
        defaultMessage: "Enter New Password"
    },
    'Enter Confirm Password': {
        id: "ChangePasswordDrawer.EnterConfirmPassword",
        defaultMessage: "Enter Confirm Password"
    },
    'Save': {
        id: "ChangePasswordDrawer.Save",
        defaultMessage: "Save"
    },
    'Cancel': {
        id: "ChangePasswordDrawer.Cancel",
        defaultMessage: "Cancel"
    },
})

const { color } = Theme;
const { Title, } = Typography;


class ChangePasswordDrawer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 1,
            errorMessage: ""
        }
    }
    logout = async () => {
        const { logoutCurrentUser, GetUserRole } = this.props
        await logoutCurrentUser(null)
        await GetUserRole(null)
        if (!JSON.stringify(localStorage.getItem("userInfo")))
            window.location.pathname = '/'
    }
    // onChange = e => {
    //     this.setState({
    //         value: e.target.value,
    //     });
    // };
    handleSubmit = () => {
        this.props.form.validateFieldsAndScroll((err, data) => {
            if (err) {
                ApiInfo.DEBUGER && console.log("error", err)
            }
            else if (data.Old_Password === data.New_Password) {
                this.setState({ errorMessage: "New password should be different from the old password!" })
            }
            else if (data.New_Password !== data.Confirm_Password) {
                this.setState({ errorMessage: "New password and confirmed password should be same." })
            }
            else {
                message
                    .loading(ApiInfo.ApiResponseMessages.postData, 100)
                    .then(() => message.error(ApiInfo.ApiResponseMessages.error));

                var encrytpedNewPass = EnCrypt(data.New_Password);
                var encrytpedOldPass = EnCrypt(data.Old_Password);

                axios({
                    method: "POST",
                    url: ApiInfo.APIPORT + "/api/v2/security/change-password",
                    headers: {
                        "api-token": ApiInfo.APITOKEN,
                        "Content-Type": "application/json",
                        "x-channel": ApiInfo.APICHANNEL
                    },
                    data: {
                        "oldPassword": encrytpedOldPass,
                        "newPassword": encrytpedNewPass
                    }
                })
                    .then(response => {
                        if (response.data.status === 200) {
                            this.props.close();
                            this.logout();
                            message.success("Password updated successfully. Please login again to continue", 5);
                        }
                        else {
                            if (response.data && response.data.status === 401) this.logout()
                            message.error(
                                <span>
                                    {response.data.message}
                                    <Icon
                                        type="close"
                                        className="closebtn"
                                        onClick={() => message.destroy && message.destroy()}
                                    />
                                </span>,
                                0
                            );
                        }
                    })
                    .catch(err => {
                        ApiInfo.DEBUGER && console.log("Change passowrd API Error", err)
                    })
            }
        })
    }
    Close = () => {
        this.props.close()
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { errorMessage } = this.state;
        const { formatMessage } = this.props;
        return (
            <Drawer
                style={{ marginTop: "61px", padding: "0px 24px", overflow: "auto" }}
                bodyStyle={{ height: 'calc(100vh - 61px)', overflowY: "auto" }}
                maskStyle={{ backgroundColor: "transparent" }}
                width={400}
                onClose={() => this.Close()}
                closable={false}
                visible={this.props.changePassDrawer}
            >
                <div style={{  display: "flex", flexDirection: "column" }}>
                    <div style={{ ...style.setting.drawerMain }}>
                        <div style={{ display: "flex", alignItems: "center", }}>
                            <img src={ChangePassword_Blue} width="50px" style={{ ...style.cursorPointer }} alt="change Password" />
                            <Title style={{ color: `${color.Orange}`, padding: "14px 0 0 18px", fontSize: 24, }}>{formatMessage(messages["Change Password"])}</Title>
                        </div>
                        <div style={{ paddingTop: 10, cursor: "pointer" }}>
                            <img src={Clear_Gray} title="Close" alt="" onClick={() => this.Close()} width={28} height={28} />
                        </div>
                    </div>
                    <Form layout="vertical" onSubmit={this.handleSubmit} style={{ marginTop: 20 }}>

                        <Form.Item label="">
                            {getFieldDecorator('Old_Password', {
                                rules: [{ required: true, message: 'Please enter old password' }],
                            })(<Input.Password placeholder={formatMessage(messages["Enter Old Password"])} />)}
                        </Form.Item>

                        <Form.Item label="">
                            {getFieldDecorator('New_Password', {
                                rules: [{ required: true, message: 'Please enter new password' }],
                            })(
                                <Input.Password placeholder={formatMessage(messages["Enter New Password"])} />,
                            )}
                        </Form.Item>

                        <Form.Item label="">
                            {getFieldDecorator('Confirm_Password', {
                                rules: [{ required: true, message: 'Please enter confirm password' }],
                            })(
                                <Input.Password placeholder={formatMessage(messages["Enter Confirm Password"])} />,
                            )}
                        </Form.Item>

                        <Form.Item style={style.formItemBetweenGap}>
                            <p style={{ color: 'red' }}>{errorMessage}</p>

                            <div style={{ ...style.drawerButtons }}>
                                <PrimaryButton text={formatMessage(messages["Save"])} onClick={() => this.handleSubmit()} />
                                <SecondryButton text={formatMessage(messages["Cancel"])} onClick={() => this.props.close()} style={{ marginRight: 8 }} />
                            </div>
                        </Form.Item>

                    </Form>
                </div>
            </Drawer>
        )
    }
};

const ChangePasswordDrawerForm = Form.create('Archive')(ChangePasswordDrawer);
const mapStateToProps = state => {

    return {
        authenticUserInfo: state.LoginReducer.authenticUserInfo
    }
};

const mapDispatchToProps = dispatch => ({
    logoutCurrentUser: data => dispatch(getAuthenticUserInfo(data)),
    GetUserRole: item => dispatch(GetUserRole(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordDrawerForm);
