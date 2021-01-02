import React from "react"
import { Drawer, Form, Input, Radio, Switch, InputNumber, Select, Checkbox, Typography, TimePicker, Skeleton } from 'antd';
import { PrimaryButton, SecondryButton } from "../Button/Button";
import { EnCrypt, DeCrypt } from "../../PasswordEncryption/PasswordEncryption"
import Clear_Gray from '../../Assets/icons/SV_ICONS/Clear_Gray.png';
import { defineMessages } from 'react-intl';
import style from "../../styles";
import { connect } from "react-redux";
import { getEmailServerDetails, fetchEmailServerCombo, postEmailServerData, editEmailServerData } from "../../Redux/Actions/ConfigurationAction/EmailServerAction"
import moment from "moment"
import EmailServerIcon from '../../Assets/icons/SV_ICONS/Email Archive_Blue7.png'
import * as ApiInfo from "../../APIConfig/ApiParameters";


const messages = defineMessages({
    'Couldnot Save Something Went Wrong': {
        id: "EmailServer.CouldnotSaveSomethingWentWrong",
        defaultMessage: "Couldnot Save Something Went Wrong",
    },
    'Edit Email Server': {
        id: "EmailServer.EditEmailServer",
        defaultMessage: "Edit Email Server"
    },
    'Add Email Server': {
        id: "EmailServer.AddEmailServer",
        defaultMessage: "Add Email Server"
    },
    'Domain Name': {
        id: "EmailServer.DomainName",
        defaultMessage: "Domain Name"
    },
    'Please enter Domain Name': {
        id: "EmailServer.PleaseEnterDomainName",
        defaultMessage: "Please enter Domain Name"
    },
    'Select': {
        id: "EmailServer.Select",
        defaultMessage: "Select"
    },
    'Email Server': {
        id: "EmailServer.EmailServer",
        defaultMessage: "Email Server",
    },
    'Please Enter Email Server': {
        id: "EmailServer.PleaseEnterEmailServer",
        defaultMessage: "Please Enter Email Server"
    },
    'Exchange Version': {
        id: "EmailServer.ExchangeVersion",
        defaultMessage: "Exchange Version"
    },
    'Please Enter Exchange Version': {
        id: "EmailServer.PleaseEnterExchangeVersion",
        defaultMessage: "Please Enter Exchange Version"
    },
    'Exchange Service Pack': {
        id: "EmailServer.ExchangeServicePack",
        defaultMessage: "Exchange Service Pack"
    },
    'Please Enter Exchange Service Pack': {
        id: "EmailServer.PleaseEnterExchangeServicePack",
        defaultMessage: "Please Enter Exchange Service Pack"
    },
    'Journal MailBox': {
        id: "EmailServer.JournalMailBox",
        defaultMessage: "Journal MailBox",
    },
    'Please Enter Journal MailBox': {
        id: "EmailServer.PleaseEnterJournalMailBox",
        defaultMessage: "Please Enter Journal MailBox"
    },
    'Journal Logon': {
        id: "EmailServer.JournalLogon",
        defaultMessage: "Journal Logon"
    },
    'Please Enter Journal Logon': {
        id: "EmailServer.PleaseEnterJournalLogon",
        defaultMessage: "Please Enter Journal Logon"
    },
    'Journal Password': {
        id: "EmailServer.JournalPassword",
        defaultMessage: "Journal Password"
    },
    'Please Enter Password': {
        id: "EmailServer.PleaseEnterPassword",
        defaultMessage: "Please Enter Password"
    },
    'Frequency(Seconds)': {
        id: "EmailServer.FrequencyInSeconds",
        defaultMessage: "Frequency (Seconds)",
    },
    'Please Enter Frequency': {
        id: "EmailServer.PleaseEnterFrequency",
        defaultMessage: "Please Enter Frequency"
    },
    'Enable': {
        id: "EmailServer.Enable",
        defaultMessage: "Enable"
    },
    'Archive Public Folder': {
        id: "EmailServer.ArchivePublicFolder",
        defaultMessage: "Archive Public Folder"
    },
    'Public Folder Poll Frequence': {
        id: "EmailServer.PublicFolderPollFrequency",
        defaultMessage: "Public Folder Poll Frequence "
    },
    'Enable Stub': {
        id: "EmailServer.EnableStub",
        defaultMessage: "Enable Stub"
    },
    'StubPeriod(Days)': {
        id: "EmailServer.StubPeriodInDays",
        defaultMessage: "StubPeriod (Days)"
    },
    'Stub/Delete Email': {
        id: "EmailServer.StubOrDeleteEmail",
        defaultMessage: "Stub/Delete Email",
    },
    'Stub': {
        id: "EmailServer.Stub",
        defaultMessage: "Stub"
    },
    'Delete': {
        id: "EmailServer.Delete",
        defaultMessage: "Delete"
    },
    'Stub Only Attachments': {
        id: "EmailServer.StubOnlyAttachments",
        defaultMessage: "Stub Only Attachments"
    },
    'Stub/Delete Options': {
        id: "EmailServer.StubOrDeleteOptions",
        defaultMessage: "Stub/Delete Options"
    },
    'Normal': {
        id: "EmailServer.Normal",
        defaultMessage: "Normal"
    },
    'Mail Size Greater Than': {
        id: "EmailServer.MailSizeGreaterThan",
        defaultMessage: "Mail Size Greater Than"
    },
    'Mail Has Attachment': {
        id: "EmailServer.MailHasAttachment",
        defaultMessage: "Mail Has Attachment"
    },
    'Email Size (KB)': {
        id: "EmailServer.EmailSizeInKB",
        defaultMessage: "Email Size (KB)"
    },
    'Exclude Hours': {
        id: "EmailServer.ExcludeHours",
        defaultMessage: "Exclude Hours"
    },
    'Exclude Hours Start Time': {
        id: "EmailServer.ExcludeHoursStartTime",
        defaultMessage: "Exclude Hours Start Time"
    },
    'Exclude Hours End Time': {
        id: "EmailServer.ExcludeHoursEndTime",
        defaultMessage: "Exclude Hours End Time"
    },
    'Save': {
        id: "EmailServer.Save",
        defaultMessage: "Save"
    },
})

const { Title, Text } = Typography
const { Option } = Select;

class EmailServer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            excludeHours: false,
            stubPeriodPolicy: false,
            archivePublicFolder: false,
        };
    }
    static getDerivedStateFromProps(props, state) {
        try {
            props.emailServerSideDrawer && !props.emailservercombo && props.fetchEmailServerCombo()
            if (props.emailServerSideDrawer && props.emailserverdetails && !state.fetchemailserverdetails) {
                return {
                    excludeHours: props.emailserverdetails[0].exludeHours,
                    stubPeriodPolicy: props.emailserverdetails[0].stubEnabled,
                    archivePublicFolder: props.emailserverdetails[0].archivePublicFolder,
                    fetchemailserverdetails: true
                }
            }
            return {}
        } catch (error) {
            ApiInfo.DEBUGER && console.log("error", error)
        }
        return null;
    }
    handleSubmit = () => {
        try {
            this.props.form.validateFieldsAndScroll((err, data) => {
                if (err) {
                    //ApiInfo.DEBUGER && console.log("error", err)
                }
                else {
                    data.excludeHours = this.state.excludeHours
                    data.stubPeriodPolicy = this.state.stubPeriodPolicy
                    data.archivePublicFolder = this.state.archivePublicFolder
                    if (data.excludeHours) {
                        data.Exclude_Hours_Start_Time = data.Exclude_Hours_Start_Time.format("HHmm")
                        data.Exclude_Hours_End_Time = data.Exclude_Hours_End_Time.format("HHmm")
                    }
                    let password = EnCrypt(data.Journal_Password)
                    data.Journal_Password = password
                    data.emailServerId = this.props.emailserverdetails && this.props.emailserverdetails[0] && this.props.emailserverdetails[0].emailServerId
                    this.props.emailserverdetails ? this.props.editEmailServerData(data) : this.props.postEmailServerData(data)
                    this.Close()
                }
            });
        } catch (error) {
            ApiInfo.DEBUGER && console.log("error", error)
        }
    }
    openArchiveFolder = () => {
        try {
            this.setState({
                archivePublicFolder: !this.state.archivePublicFolder
            });
        } catch (error) {
            ApiInfo.DEBUGER && console.log("error", error);
        }
    };
    openStubPeriod = () => {
        try {
            this.setState({
                stubPeriodPolicy: !this.state.stubPeriodPolicy
            })
        } catch (error) {
            ApiInfo.DEBUGER && console.log("error", error);
        }
    }
    openExcludeHours = () => {
        try {
            this.setState({
                excludeHours: !this.state.excludeHours
            })
        } catch (error) {
            ApiInfo.DEBUGER && console.log("error", error);
        }
    }
    onChange = e => {
        try {
            this.setState({
                [e.target.name]: e.target.value
            })
        } catch (error) {
            ApiInfo.DEBUGER && console.log("error", error);
        }
    }
    stubDeleteOption = e => {
        try {
            this.setState({
                stubDeleteOptionValue: e.target.value
            })
        } catch (error) {
            ApiInfo.DEBUGER && console.log("error", error);
        }
    }
    Close = () => {
        this.props.close()
        this.props.form.resetFields();
        this.props.getEmailServerDetails("")
        this.setState({
            excludeHours: false,
            stubPeriodPolicy: false,
            archivePublicFolder: false,
            fetchemailserverdetails: false
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { stubDeleteEmailValue, stubDeleteOptionValue, archivePublicFolder, stubPeriodPolicy, excludeHours } = this.state;
        const { values, emailServerSideDrawer, formatMessage } = this.props;
        let password = this.props.emailserverdetails && this.props.emailserverdetails[0] && this.props.emailserverdetails[0].journalPassword && DeCrypt(this.props.emailserverdetails[0].journalPassword)

        return (
            <div>
                <Drawer
                    width={400}
                    onClose={() => this.Close()}
                    visible={emailServerSideDrawer}
                    closable={false}
                    style={{ overflowY: "scroll" }}
                    maskStyle={{ backgroundColor: "transparent" }}
                >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <img title="Email Server" src={EmailServerIcon} alt="" style={style.setting.drawerIcons} ></img>
                            <Title style={style.setting.drawerTitles}>{values ? formatMessage(messages["Edit Email Server"]) : formatMessage(messages["Add Email Server"])}</Title>
                        </div>
                        <div style={{ paddingTop: 10, cursor: "pointer" }}>
                            <img src={Clear_Gray} title="Close" alt="" onClick={() => this.Close()} width={28} height={28} />
                        </div>
                    </div>

                    <Skeleton active loading={!(this.props.emailservercombo)}>
                        <Form layout="vertical" onSubmit={this.handleSubmit}>
                            <Form.Item label={formatMessage(messages["Domain Name"])} colon={false}>
                                {getFieldDecorator('Domain_Id', {
                                    initialValue: this.props && this.props.emailserverdetails && this.props.emailserverdetails[0] && this.props.emailserverdetails[0].domainID,
                                    rules: [{ required: true }]
                                })(<Select
                                    showSearch
                                    style={{ width: "100%", height: 40 }}
                                    placeholder={formatMessage(messages["Select"])}
                                    onChange={this.onChangeDropdown}
                                    onFocus={this.onFocus}
                                    onBlur={this.onBlur}
                                    onSearch={this.onSearch}
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {this.props.emailservercombo && this.props.emailservercombo.Domains && Array.isArray(this.props.emailservercombo.Domains) && this.props.emailservercombo.Domains.map((val, ind) => <Option key={ind} value={val.key}>
                                        {val.domain}
                                    </Option>
                                    )}
                                </Select>
                                )}
                            </Form.Item>
                            <Form.Item style={{ ...style.formItemBetweenGap }} label={formatMessage(messages["Email Server"])}>
                                {getFieldDecorator('Email_Server', {
                                    initialValue: this.props.emailserverdetails && this.props.emailserverdetails[0] && this.props.emailserverdetails[0].emailSever,
                                    rules: [{ required: true, message: formatMessage(messages["Please Enter Email Server"]) }],
                                })(
                                    <Input />,
                                )}
                            </Form.Item>
                            <Form.Item style={{ ...style.formItemBetweenGap }} label={formatMessage(messages["Exchange Version"])}>
                                {getFieldDecorator('Exchange_Version', {
                                    initialValue: this.props.emailserverdetails && this.props.emailserverdetails[0] && this.props.emailserverdetails[0].exchangeVer,
                                    rules: [{ required: true }]
                                })(
                                    <Select
                                        style={{ width: "100%", height: 40 }}
                                        placeholder={formatMessage(messages["Select"])}>
                                        {this.props.emailservercombo && this.props.emailservercombo.ExchVersions && Array.isArray(this.props.emailservercombo.ExchVersions) && this.props.emailservercombo.ExchVersions.map((val, ind) => <Option key={ind} value={val}>
                                            {val}
                                        </Option>
                                        )}
                                    </Select>
                                )}
                            </Form.Item>
                            <Form.Item style={{ ...style.formItemBetweenGap }} label={formatMessage(messages["Exchange Service Pack"])}>
                                {getFieldDecorator('Exchange_Service_Pack', {
                                    initialValue: this.props.emailserverdetails && this.props.emailserverdetails[0] && this.props.emailserverdetails[0].servicePack,
                                    rules: [{ required: true }]
                                })(
                                    <Select
                                        showSearch
                                        style={{ width: "100%", height: 40 }}
                                        placeholder={formatMessage(messages["Select"])}
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {this.props.emailservercombo && this.props.emailservercombo.ServicePack && Array.isArray(this.props.emailservercombo.ServicePack) && this.props.emailservercombo.ServicePack.map((val, ind) => <Option key={ind} value={val}>
                                            {val}
                                        </Option>
                                        )}
                                    </Select>
                                )}
                            </Form.Item>
                            <Form.Item style={style.formItemBetweenGap} label={formatMessage(messages["Journal MailBox"])}>
                                {getFieldDecorator('Journal_Mailbox', {
                                    initialValue: this.props.emailserverdetails && this.props.emailserverdetails[0] && this.props.emailserverdetails[0].journalMailName,
                                    rules: [{ required: true, message: formatMessage(messages["Please Enter Journal MailBox"]) }],
                                })(
                                    <Input />
                                )}
                            </Form.Item>
                            <Form.Item style={style.formItemBetweenGap} label={formatMessage(messages["Journal Logon"])}>
                                {getFieldDecorator('Journal_Logon', {
                                    initialValue: this.props.emailserverdetails && this.props.emailserverdetails[0] && this.props.emailserverdetails[0].journalLogon,
                                    rules: [
                                        {
                                            required: true,
                                            message: formatMessage(messages["Please Enter Journal Logon"]),
                                        },
                                    ],
                                })(
                                    <Input />
                                )}
                            </Form.Item>
                            <Form.Item style={{ ...style.formItemBetweenGap }} label={formatMessage(messages["Journal Password"])}>
                                {getFieldDecorator('Journal_Password', {
                                    initialValue: password,
                                    rules: [
                                        {
                                            required: true,
                                            message: formatMessage(messages["Please Enter Password"]),
                                        },
                                    ],
                                })(
                                    <Input type="password" />
                                )}
                            </Form.Item>
                            <Form.Item style={{ ...style.formItemBetweenGap }} label={formatMessage(messages["Frequency(Seconds)"])}>
                                {getFieldDecorator('Frequency', {
                                    initialValue: this.props.emailserverdetails && this.props.emailserverdetails[0] && this.props.emailserverdetails[0].frequency,
                                    rules: [
                                        {
                                            required: true,
                                            message: formatMessage(messages["Please Enter Frequency"]),
                                        },
                                    ],
                                })(
                                    <InputNumber style={{ width: "20vh" }} />
                                )}
                                <span style={{ marginLeft: '8px' }}></span>
                            </Form.Item>
                            <Form.Item style={style.formItemBetweenGap} label="">
                                <div style={{ display: "flex" }}>
                                    {getFieldDecorator('enable', {
                                        valuePropName: 'checked', 
                                        initialValue: !!this.props.emailserverdetails && !!this.props.emailserverdetails[0] && !!this.props.emailserverdetails[0].active
                                    })(
                                        <Switch></Switch>
                                    )}
                                    <Text style={{ marginLeft: "5px" }}>{formatMessage(messages["Enable"])}</Text>
                                </div>
                            </Form.Item>
                            <div style={style.formItemBetweenGap} >
                                <Checkbox checked={archivePublicFolder} onChange={() => this.openArchiveFolder()} >{formatMessage(messages["Archive Public Folder"])}</Checkbox>
                                {archivePublicFolder &&
                                    <Form.Item label={formatMessage(messages["Public Folder Poll Frequence"])} style={{ ...style.marginPadding0 }}>
                                        {getFieldDecorator('public_folder_poll_Frequency', {
                                            initialValue: this.props.emailserverdetails && this.props.emailserverdetails[0] && this.props.emailserverdetails[0].publicFolderPolicy,
                                        })(
                                            <InputNumber min={1} max={200} style={{ width: "20vh" }} />
                                        )}
                                        <span style={{ marginLeft: '8px', width: "20vh" }}></span>
                                    </Form.Item>
                                }
                                <br />
                                <Checkbox style={{ ...style.marginPadding0 }} checked={stubPeriodPolicy} onChange={() => this.openStubPeriod()}>{formatMessage(messages["Enable Stub"])}</Checkbox>
                                {stubPeriodPolicy && (
                                    <div>
                                        <Form.Item label={formatMessage(messages["StubPeriod(Days)"])} >

                                            {getFieldDecorator('Stub_Period', {
                                                initialValue: this.props.emailserverdetails && this.props.emailserverdetails[0] && this.props.emailserverdetails[0].stubPeriod
                                            })(
                                                <InputNumber style={{ width: "20vh" }} />
                                            )}
                                            <span style={{ marginLeft: '8px', width: "20vh" }}></span>
                                        </Form.Item>
                                        <Form.Item style={style.formItemBetweenGap} label={formatMessage(messages["Stub/Delete Email"])}>
                                            {getFieldDecorator('stub_delete', {
                                                initialValue: this.props.emailserverdetails && this.props.emailserverdetails[0] && this.props.emailserverdetails[0].stubOrDelete
                                            })(
                                                <Radio.Group onChange={this.stubDeleteEmail} value={stubDeleteEmailValue}>
                                                    <Radio value={0}>{formatMessage(messages["Stub"])}</Radio>
                                                    <Radio value={1}>{formatMessage(messages["Delete"])}</Radio>
                                                    <Radio value={2}>{formatMessage(messages["Stub Only Attachments"])}</Radio>
                                                </Radio.Group>)}
                                        </Form.Item>
                                        <Form.Item colon={true} style={{ ...style.marginPadding0, ...style.formItemBetweenGap }} label={formatMessage(messages["Stub/Delete Options"])}>
                                            {getFieldDecorator('stub_delete_option', {
                                                initialValue: this.props.emailserverdetails && this.props.emailserverdetails[0] && this.props.emailserverdetails[0].stubOrDeleteOption
                                            })(
                                                <Radio.Group onChange={this.stubDeleteOption} value={stubDeleteOptionValue}>
                                                    <Radio value={0}>{formatMessage(messages["Normal"])}</Radio>
                                                    <Radio value={1}>{formatMessage(messages["Mail Size Greater Than"])}</Radio>
                                                    <Radio value={2}>{formatMessage(messages["Mail Has Attachment"])}</Radio>
                                                </Radio.Group>
                                            )}
                                        </Form.Item>
                                        <Form.Item style={{ ...style.marginPadding0, ...style.marginTop10 }} label={formatMessage(messages["Email Size (KB)"])}>
                                            {getFieldDecorator('Email_Size', {
                                                initialValue: this.props.emailserverdetails && this.props.emailserverdetails[0] && this.props.emailserverdetails[0].stubSize,
                                            })(
                                                <InputNumber style={{ width: "20vh" }} />
                                            )}
                                            <span style={{ marginLeft: '8px', width: "20vh" }}></span>
                                        </Form.Item>
                                    </div>
                                )}
                                <br />
                                <Checkbox checked={excludeHours} onChange={() => this.openExcludeHours()} >{formatMessage(messages["Exclude Hours"])}</Checkbox>
                                {excludeHours && (
                                    <div>
                                        <Form.Item label={formatMessage(messages["Exclude Hours Start Time"])} >
                                            {getFieldDecorator('Exclude_Hours_Start_Time', {
                                                initialValue: this.props.emailserverdetails && this.props.emailserverdetails[0] && this.props.emailserverdetails[0].excludeStart ? (Math.floor(Math.log10(this.props.emailserverdetails[0].excludeStart)) + 1 === 3 ? moment(("0" + this.props.emailserverdetails[0].excludeStart.toString()), "HH:mm") : moment(this.props.emailserverdetails[0].excludeStart, "HH:mm")) : null,
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: "Please Enter Exclude Start Hours ",
                                                    },
                                                ],
                                            })(<TimePicker style={{ ...style.setting.configuration.generalScreen.inputNumberWidth }} format="HH:mm" />)}
                                            <span style={{ ...style.setting.configuration.generalScreen.inputNumberUnitText }}><Text>(HH:mm)</Text></span>
                                        </Form.Item>
                                        <Form.Item style={style.formItemBetweenGap} label={formatMessage(messages["Exclude Hours End Time"])} >
                                            {getFieldDecorator('Exclude_Hours_End_Time', {
                                                initialValue: this.props.emailserverdetails && this.props.emailserverdetails[0] && this.props.emailserverdetails[0].excludeEnd ? (Math.floor(Math.log10(this.props.emailserverdetails[0].excludeEnd)) + 1 === 3 ? moment(("0" + this.props.emailserverdetails[0].excludeEnd.toString()), "HH:mm") : moment(this.props.emailserverdetails[0].excludeEnd, "HH:mm")) : null,
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: "Please Enter Exclude End Hours ",
                                                    },
                                                ],
                                            })(<TimePicker style={{ ...style.setting.configuration.generalScreen.inputNumberWidth }} format="HH:mm" />)}
                                            <span style={{ ...style.setting.configuration.generalScreen.inputNumberUnitText }}><Text>(HH:mm)</Text></span>
                                        </Form.Item>
                                    </div>
                                )}
                            </div>
                            <Form.Item>
                                <div style={{ ...style.drawerButtons }}>
                                    <PrimaryButton text={formatMessage(messages["Save"])} onClick={() => this.handleSubmit()} />
                                    <SecondryButton text="Cancel" onClick={() => this.Close()} style={{ marginRight: 8 }} />
                                </div>
                            </Form.Item>
                        </Form>
                    </Skeleton>
                </Drawer>
            </div>
        );
    }

}

const EmailServerDrawerForm = Form.create('EmailServer')(EmailServer);

const mapStateToProps = state => {
    return {
        emailserverdetails: state.EmailServerReducer.emailservereditdetails,
        emailservercombo: state.EmailServerReducer.emailservercombo,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        getEmailServerDetails: data => dispatch(getEmailServerDetails(data)),
        fetchEmailServerCombo: () => dispatch(fetchEmailServerCombo()),
        editEmailServerData: data => dispatch(editEmailServerData(data)),
        postEmailServerData: data => dispatch(postEmailServerData(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EmailServerDrawerForm)