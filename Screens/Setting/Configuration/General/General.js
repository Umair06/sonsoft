import React from 'react';
import { Form, Input, Typography, Select, Checkbox, TimePicker, message } from 'antd';
import { connect } from "react-redux";
import { updateDataTableActions } from "../../../../Redux/Actions/pageHeader/pageHeader";
import { fetchConfigurationGeneral, postConfigurationGeneral } from "../../../../Redux/Actions/ConfigurationAction/GeneralAction"
// import { PrimaryButton, SecondryButton } from "../../../../Components//Button/Button";
import { Tabs } from 'antd';
import style from "../../../../styles";
import { defineMessages } from 'react-intl';
import moment from "moment"
import * as ApiInfo from "../../../../APIConfig/ApiParameters";
// import PageHeader from "../../../../Components/PageHeader/PageHeader";

const messages = defineMessages({
    'Temporary Storage Path': {
        id: "General.TemporaryStoragePath",
        defaultMessage: "Temporary Storage Path",
    },
    'Archive': {
        id: "General.Archive",
        defaultMessage: "Archive"
    },
    'Export': {
        id: "General.Export",
        defaultMessage: "Export"
    },
    'Default Role Settings': {
        id: "General.DefaultRoleSettings",
        defaultMessage: "Default Role Settings"
    },
    'Role': {
        id: "General.Role",
        defaultMessage: "Role"
    },
    'Select Role': {
        id: "General.SelectRole",
        defaultMessage: "Select Role"
    },
    'Apply To Existing Users': {
        id: "General.ApplyToExistingUsers",
        defaultMessage: "Apply To Existing Users",
    },
    'Delete Task Logs older than': {
        id: "General.DeleteTaskLogsOlderThan",
        defaultMessage: "Delete Task Logs older than"
    },
    'Days': {
        id: "General.Days",
        defaultMessage: "Days"
    },
    'Number of Emails per Export file': {
        id: "General.NumberOfEmailsPerExportFile",
        defaultMessage: "Number of Emails per Export file"
    },
    'Count': {
        id: "General.Count",
        defaultMessage: "Count"
    },
    'Export/Forward Folder Size': {
        id: "General.ExportORForwardFolderSize",
        defaultMessage: "Export/Forward Folder Size"
    },
    'MB': {
        id: "General.MB",
        defaultMessage: "MB"
    },
    'Number of Parallel Export Tasks': {
        id: "General.NumberOfParallelExportTasks",
        defaultMessage: "Number of Parallel Export Tasks",
    },
    'Keep Export File for': {
        id: "General.KeepExportFileFor",
        defaultMessage: "Keep Export File for"
    },
    'Notify Retention Expiry before': {
        id: "General.NotifyRetentionExpiryBefore",
        defaultMessage: "Notify Retention Expiry before"
    },
    'Notify if emails are not archived for more than': {
        id: "General.NotifyIfEmailsAreNotArchivedForMoreThan",
        defaultMessage: "Notify if emails are not archived for more than"
    },
    'Minutes': {
        id: "General.Minutes",
        defaultMessage: "Minutes"
    },
    'Notify if public folder items are not archived for more than': {
        id: "General.NotifyIfPublicFolderItemsAreNotArchivedForMoreThan",
        defaultMessage: "Notify if public folder items are not archived for more than"
    },
    'Report Error at': {
        id: "General.ReportErrorat",
        defaultMessage: "Report Error at",
    },
    'Enable WORM Journaling': {
        id: "General.EnableWORMJournaling",
        defaultMessage: "Enable WORM Journaling"
    },

    '(HH:mm)': {
        id: "General.HH:mm",
        defaultMessage: "(HH:mm)",
    },

})

const { TabPane } = Tabs;
const { Option } = Select;
const { Text } = Typography;

class General extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
            RoleSettingDropdownSelectedvalue: "3",
            Show2ndTabCheckBox: true
        }

        message.destroy()
    };

    // static getDerivedStateFromProps(nextProps) {
    //     return {
    //         Archive: nextProps.applicationParameter && nextProps.applicationParameter.output1.length > 4 && nextProps.applicationParameter.output1[4] && nextProps.applicationParameter.output1[4].APPPARAM_VALUE,
    //         Exports_Path: nextProps.applicationParameter && nextProps.applicationParameter.output1  && nextProps.applicationParameter.output1[32] && nextProps.applicationParameter.output1[32].APPPARAM_VALUE,
    //         DeleteTask: nextProps.applicationParameter && nextProps.applicationParameter.output1.length > 28 && nextProps.applicationParameter.output1[28] && nextProps.applicationParameter.output1[28].APPPARAM_VALUE,
    //         NumberofEmail: nextProps.applicationParameter && nextProps.applicationParameter.output1 > 52 && nextProps.applicationParameter.output1[52] && nextProps.applicationParameter.output1[52].APPPARAM_VALUE,
    //         Size: nextProps.applicationParameter && nextProps.applicationParameter.output1 > 53 && nextProps.applicationParameter.output1[52] && nextProps.applicationParameter.output1[52].APPPARAM_VALUE,
    //         NotifyExpiryBefore: nextProps.applicationParameter && nextProps.applicationParameter.output1.length > 45 && nextProps.applicationParameter.output1[52] && nextProps.applicationParameter.output1[52].APPPARAM_VALUE,
    //         NumberofFileExport: nextProps.applicationParameter && nextProps.applicationParameter.output1.length > 54 && nextProps.applicationParameter.output1[54] && nextProps.applicationParameter.output1[54].APPPARAM_VALUE,
    //         KeepExportFileFor: nextProps.applicationParameter && nextProps.applicationParameter.output1 && nextProps.applicationParameter.output1[24] && nextProps.applicationParameter.output1[24].APPPARAM_VALUE,
    //         NotifyRetentionPolicyForMoreThan: nextProps.applicationParameter && nextProps.applicationParameter.output1.length > 22 && nextProps.applicationParameter.output1[22] && nextProps.applicationParameter.output1[22].APPPARAM_VALUE,
    //         NotifyRetentionPolicyNotForMoreThan: nextProps.applicationParameter && nextProps.applicationParameter.output1.length > 19 && nextProps.applicationParameter.output1[19] && nextProps.applicationParameter.output1[19].APPPARAM_VALUE,
    //         Worm: nextProps.applicationParameter && nextProps.applicationParameter.output1.length > 51 && nextProps.applicationParameter.output1[51] && nextProps.applicationParameter.output1[51].APPPARAM_VALUE == 1 ? true : false,
    //         ReportError: nextProps.applicationParameter && nextProps.applicationParameter.output1.length > 47 && nextProps.applicationParameter.output1[47] && nextProps.applicationParameter.output1[47].APPPARAM_VALUE
    //         // Id: nextProps.roleId && nextProps.roleId[0].ROLE_ID,
    //         // Description: nextProps.roleId && nextProps.roleId[0].ROLE_DESCRIPTION,
    //         // Role: nextProps.roleId && nextProps.roleId[0].ROLE_NAME
    //     }

    // }

    static getDerivedStateFromProps(nextProps, state) {
        if (nextProps.general && nextProps.general.other_setting && nextProps.general.other_setting.Default_Role && !state.fetchedDefaulRole) {
            if (nextProps.general.other_setting.Default_Role !== state.RoleSettingDropdownSelectedvalue) {
                return {
                    Show2ndTabCheckBox: nextProps.general.other_setting.Default_Role.toString() === "0" ? false : true,
                    fetchedDefaulRole: true
                }
            }
        }
        return {}
    }

    handleSubmit = () => {
        // e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, data) => {
            if (err) {
                message.error(`Please enter valid information in Temporary Storage Path`, 1.5)
            }
            else {
                let generalData = { "general": { "temporary_storage_path": { "Archive": data.Archive, "Export": data.Exports }, "default_role_setting": [], "other_setting": { "Delete_Task_Logs_older_than": !isNaN(data.Delete_Task_Log) ? data.Delete_Task_Log : "", "Number_of_Emails_per_Export_file": !isNaN(data.Number_of_Emails_per_Export_file) ? data.Number_of_Emails_per_Export_file : "", "Export_Forward_Folder_Size": !isNaN(data.Export_Forward_Folder_Size) ? data.Export_Forward_Folder_Size : "", "Number_of_Parallel_Export_Tasks": !isNaN(data.Number_of_Parallel_Export_Tasks) ? data.Number_of_Parallel_Export_Tasks : "", "Keep_Export_file_for": !isNaN(data.Keep_Export_File_for) ? data.Keep_Export_File_for : "", "Notify_Retention_Expiry_Before": !isNaN(data.Notify_Retention_Expiry_before) ? data.Notify_Retention_Expiry_before : "", "Notify_if_emails_are_not_archived_for_more_than": !isNaN(data.Notify_if_emails_are_not_archived_for_more_than) ? data.Notify_if_emails_are_not_archived_for_more_than : "", "Notify_if_public_folder_items_are_not_archived_for_more_than": !isNaN(data.Notify_if_public_folder_items_are_not_archived_for_more_than) ? data.Notify_if_public_folder_items_are_not_archived_for_more_than : "", "Report_Error_at": data.Report_Error_at ? data.Report_Error_at.format("HHmm") : "", "Default_Role": (data.role || data.role === 0) && data.role.toString(), "Enable_WORM_Journaling": data.Enable_WORM_Journaling ? "1" : "0", "Apply_Role": data.Apply_Role ? "1" : "0" } } }
                this.props.postConfigurationGeneral(generalData)
            }
        });
    };

    handleReset = () => {
        try {
            let defaultRole = this.props.general && this.props.general.other_setting && this.props.general.default_role_setting.filter(roles => roles.ROLE_ID === +this.props.general.other_setting.Default_Role)

            const { form } = this.props;
            form.setFieldsValue({
                Archive: this.props.general.temporary_storage_path.Archive,
                Exports: this.props.general.temporary_storage_path.Export,
                Delete_Task_Log: this.props.general.other_setting.Delete_Task_Logs_older_than,
                Number_of_Emails_per_Export_file: this.props.general.other_setting.Number_of_Emails_per_Export_file,
                Export_Forward_Folder_Size: this.props.general.other_setting.Export_Forward_Folder_Size,
                Number_of_Parallel_Export_Tasks: this.props.general.other_setting.Number_of_Parallel_Export_Tasks,
                Keep_Export_File_for: this.props.general.other_setting.Keep_Export_file_for,
                Notify_Retention_Expiry_before:
                    this.props.general.other_setting.Notify_Retention_Expiry_Before, Notify_if_emails_are_not_archived_for_more_than: this.props.general.other_setting.Notify_if_emails_are_not_archived_for_more_than, Notify_if_public_folder_items_are_not_archived_for_more_than: this.props.general.other_setting.Notify_if_public_folder_items_are_not_archived_for_more_than,
                Report_Error_at: this.props.general && this.props.general.other_setting.Report_Error_at && (moment(this.props.general.other_setting.Report_Error_at, "HH:mm") === "Invalid date" ? this.props.general.other_setting.Report_Error_at : moment(this.props.general.other_setting.Report_Error_at, "HH:mm")),
                Enable_WORM_Journaling:
                    this.props.general && this.props.general.other_setting.Enable_WORM_Journaling === "0" ? false : true,
                // role:this.props.general.default_role_setting[0].ROLE_NAME ,
                role: defaultRole && defaultRole.length > 0 && defaultRole[0].ROLE_ID,
            });
            this.setState({
                Show2ndTabCheckBox: this.props.general.other_setting.Default_Role.toString() === "0" ? false : true,
            });
        } catch (error) {
            ApiInfo.DEBUGER && console.log("error", error);
        }
    };

    //    warning = () => {
    //     message.warning('This is a warning message');
    //   };
    callBack = key => {
        if (key === '1') {
            this.props.updateDataTableActions({
                save: true, saveValues: this.handleSubmit, cancel: true,
                cancelFunction: () => this.handleReset()
            })
        }
        if (key === '2') {
            this.props.updateDataTableActions({
                save: true, saveValues: this.handleSubmit, cancel: true,
                cancelFunction: () => this.handleReset()
            })
        }
        if (key === '3') {
            this.props.updateDataTableActions({
                save: true, saveValues: this.handleSubmit, cancel: true,
                cancelFunction: () => this.handleReset()
            })
        }
    }
    componentDidMount() {
        this.callBack('1')
        this.props.fetchConfigurationGeneral(!!this.props.general)
    }

    handleChange = (roleID) => {
        this.setState({ RoleSettingDropdownSelectedvalue: roleID }, () => {
            this.state.RoleSettingDropdownSelectedvalue === 0 ? this.setState({ Show2ndTabCheckBox: false }) : this.setState({ Show2ndTabCheckBox: true })
        })
    }
    filter = (input, option) => {
        return (
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        )
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { Show2ndTabCheckBox, /* Archive, Exports_Path, DeleteTask, NumberofEmail, Size, NumberofFileExport, KeepExportFileFor, NotifyRetentionPolicyForMoreThan, NotifyRetentionPolicyNotForMoreThan, Worm, ReportError, NotifyExpiryBefore */ } = this.state;
        const { formatMessage } = this.props;
        const formItemLayout = {
            labelCol: {
                xs: { span: 12 },
                sm: { span: 8, push: 1 },
            },
            wrapperCol: {
                xs: { span: 12 },
                sm: { span: 10, push: 2 },
            },
        };
        const defaultItemLayout = {
            labelCol: {
                xs: { span: 12 },
                sm: { span: 8, push: 1 },
            },
            wrapperCol: {
                xs: { span: 12 },
                sm: { span: 10, pull: 3 },
            },
        };
        let defaultRole = this.props.general && this.props.general.other_setting && this.props.general.default_role_setting.filter(roles => roles.ROLE_ID === +this.props.general.other_setting.Default_Role)

        return (
            // <div style={{ padding: '0px 150px' }}>
            // <Tabs defaultActiveKey="1" e="card" tabBarStyle={{ ...style.tabs.tabBar }} onChange={(e) => this.callBack(e)}>
            <div>
                 {/* <PageHeader
          formatMessage={formatMessage}
        /> */}
                <div className="card-container">
                    <Tabs type="card" tabBarStyle={{ ...style.tabs.tabBar }} onChange={(e) => this.callBack(e)}>

                        <TabPane tab={formatMessage(messages["Temporary Storage Path"])} key="1">
                            <div style={{...style.paddingTop10}}>
                                <Form layout="horizontal" {...defaultItemLayout} labelAlign="left" onSubmit={this.handleSubmit}>
                                    <Form.Item label={<Text>Archive</Text>}>
                                        {getFieldDecorator('Archive', {
                                            initialValue: this.props.general && this.props.general.temporary_storage_path && this.props.general.temporary_storage_path.Archive,
                                            rules: [
                                                {
                                                    required: true,
                                                    message: "Please Enter Archive Path",
                                                },
                                            ],
                                        })(<Input allowClear={true} />)}
                                    </Form.Item>

                                    <Form.Item style={style.formItemBetweenGap} label={<Text >{formatMessage(messages["Export"])}</Text>} >
                                        {getFieldDecorator('Exports', {
                                            initialValue: this.props.general && this.props.general.temporary_storage_path && this.props.general.temporary_storage_path.Export,
                                            rules: [
                                                {
                                                    required: true,
                                                    message: "Please Enter Exports Path",
                                                },
                                            ],
                                        }, {

                                        })(<Input allowClear={true} />)}
                                    </Form.Item>
                                </Form>
                            </div>
                        </TabPane>

                        <TabPane tab={formatMessage(messages["Default Role Settings"])} key="2">
                            <div  style={{...style.paddingTop10}}>
                                <Form {...defaultItemLayout} labelAlign="left" layout="horizontal" onSubmit={this.handleSubmit}>

                                    <Form.Item label={<Text >{formatMessage(messages["Role"])}</Text>} >
                                        <div>
                                            {getFieldDecorator('role', {
                                                initialValue: defaultRole && defaultRole.length > 0 && defaultRole[0].ROLE_ID

                                            })(
                                                <Select placeholder={formatMessage(messages["Select Role"])} style={{ height: 40 }} onChange={e => this.handleChange(e)}
                                                    onSearch={this.onSearch}
                                                    onFocus={this.props.general ? this.props.general.default_role_setting ? Array.isArray(this.props.general.default_role_setting) ? this.props.general.default_role_setting.length <= 0 ? this.props.fetchConfigurationGeneral(!!this.props.general) : null : null : null : null}
                                                    filterOption={(input, option) => this.filter(input, option)} showSearch >
                                                    {this.props.general && this.props.general.default_role_setting && Array.isArray(this.props.general.default_role_setting) && this.props.general.default_role_setting.map((val, index) =>
                                                        <Option key={val.ROLE_ID} value={val.ROLE_ID}>{val.ROLE_NAME}</Option>
                                                    )}

                                                </Select>)}
                                        </div>
                                    </Form.Item>

                                    {Show2ndTabCheckBox &&
                                        <Form.Item style={{ ...style.formItemBetweenGap }} label={<Text >{formatMessage(messages["Apply To Existing Users"])}</Text>} >

                                            {getFieldDecorator('Apply_Role', {
                                                valuePropName: 'checked', initialValue: this.props.general && this.props.general.other_setting && this.props.general.other_setting.Apply_Role === "0" ? false : true

                                            })(<Checkbox ></Checkbox>)}
                                        </Form.Item>
                                    }
                                </Form>
                            </div>
                        </TabPane>

                        <TabPane tab="Other Settings" key="3">
                            {/* <div> */}
                            <div >
                                <div style={{...style.paddingTop10}}>
                                    <Form {...formItemLayout} labelAlign="left" layout="horizontal" onSubmit={this.handleOtherSetting}>

                                        {/* <Form.Item label={<Text style={{ width: "100%" }}>Archive Store Rollover period for PSTUtility </Text>} >
                                        {getFieldDecorator('Archive Store Rollover period for PSTUtility ', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Please Write Archive Store Rollover period for PSTUtility ',
                                                },
                                            ],
                                        })(<div><Select placeholder="Select Month" style={{...style.setting.configuration.generalScreen.inputNumberWidth}}  onChange={e => this.handleChange(e)} onBlur={this.onBlur}
                                        onSearch={this.onSearch}
                                        filterOption={(input, option) => this.filter(input, option)} showSearch >
                                        {this.props. applicationParameter && this.props. applicationParameter.output2.map((val, index) =>
                                            <Option key={index} value={val.ROLE_NAME}>{val.ROLE_NAME}</Option>)}

                                    </Select><span style={{...style.setting.configuration.generalScreen.inputNumberUnitText    }}><Text>Months</Text></span></div>)}
                                    </Form.Item> */}


                                        <Form.Item label={<Text>{formatMessage(messages["Delete Task Logs older than"])}</Text>}>
                                            {getFieldDecorator('Delete_Task_Log', {
                                                initialValue: this.props.general && this.props.general.other_setting && this.props.general.other_setting.Delete_Task_Logs_older_than
                                            })(<Input type="number" /*allowClear={true}*/ onBlur={e => {
                                                const { form } = this.props;
                                                if (e.target.value < 1 || e.target.value === "" || e.target.value === null) {
                                                    form.setFieldsValue({
                                                        Delete_Task_Log: 1
                                                    })
                                                } else {
                                                    if (e.target.value > 90) {
                                                        form.setFieldsValue({
                                                            Delete_Task_Log: 90
                                                        })
                                                    }
                                                }
                                            }} min={1} max={90} style={{ ...style.setting.configuration.generalScreen.inputNumberWidth }} />)}
                                            <span style={{ ...style.setting.configuration.generalScreen.inputNumberUnitText }}><Text>{formatMessage(messages["Days"])}</Text></span>
                                        </Form.Item>


                                        <Form.Item style={style.formItemBetweenGap} label={<Text>{formatMessage(messages["Number of Emails per Export file"])}</Text>} >
                                            {getFieldDecorator('Number_of_Emails_per_Export_file', {
                                                initialValue: this.props.general && this.props.general.other_setting && this.props.general.other_setting.Number_of_Emails_per_Export_file,
                                            })(<Input /*allowClear={true}*/ onBlur={e => {
                                                const { form } = this.props;
                                                if (e.target.value < 5000 || e.target.value === "" || e.target.value === null) {
                                                    form.setFieldsValue({
                                                        Number_of_Emails_per_Export_file: 5000
                                                    })
                                                } else {
                                                    if (e.target.value > 1000000) {
                                                        form.setFieldsValue({
                                                            Number_of_Emails_per_Export_file: 1000000
                                                        })
                                                    }
                                                }
                                            }} min={5000} max={1000000} style={{ ...style.setting.configuration.generalScreen.inputNumberWidth }} type="number" />)}
                                            <span style={{ ...style.setting.configuration.generalScreen.inputNumberUnitText }}><Text>{formatMessage(messages["Count"])}</Text></span>
                                        </Form.Item>




                                        <Form.Item style={{ ...style.formItemBetweenGap }} label={<Text>{formatMessage(messages["Export/Forward Folder Size"])}</Text>} >
                                            {getFieldDecorator('Export_Forward_Folder_Size', {
                                                initialValue: this.props.general && this.props.general.other_setting && this.props.general.other_setting.Export_Forward_Folder_Size,
                                            })(<Input /*allowClear={true}*/ onBlur={e => {
                                                const { form } = this.props;
                                                if (e.target.value < 1024 || e.target.value === "" || e.target.value === null) {
                                                    form.setFieldsValue({
                                                        Export_Forward_Folder_Size: 1024
                                                    })
                                                } else {
                                                    if (e.target.value > 20400) {
                                                        form.setFieldsValue({
                                                            Export_Forward_Folder_Size: 20400
                                                        })
                                                    }
                                                }
                                            }} min={1024} max={20400} style={{ ...style.setting.configuration.generalScreen.inputNumberWidth }} type="number" />)}
                                            <span style={{ ...style.setting.configuration.generalScreen.inputNumberUnitText }}><Text>{formatMessage(messages["MB"])}</Text></span>
                                        </Form.Item>




                                        <Form.Item style={{ ...style.formItemBetweenGap }} label={<Text>{formatMessage(messages["Number of Parallel Export Tasks"])}</Text>} >
                                            {getFieldDecorator('Number_of_Parallel_Export_Tasks', {
                                                initialValue: this.props.general && this.props.general.other_setting && this.props.general.other_setting.Number_of_Parallel_Export_Tasks
                                            })(<Input /*allowClear={true}*/ onBlur={e => {
                                                const { form } = this.props;
                                                if (e.target.value < 1 || e.target.value === "" || e.target.value === null) {
                                                    form.setFieldsValue({
                                                        Number_of_Parallel_Export_Tasks: 1
                                                    })
                                                } else {
                                                    if (e.target.value > 5) {
                                                        form.setFieldsValue({
                                                            Number_of_Parallel_Export_Tasks: 5
                                                        })
                                                    }
                                                }
                                            }} min={1} max={5} style={{ ...style.setting.configuration.generalScreen.inputNumberWidth }} type="number" />)}
                                            <span style={{ ...style.setting.configuration.generalScreen.inputNumberUnitText }}><Text>{formatMessage(messages["Count"])}</Text></span>
                                        </Form.Item>


                                        <Form.Item style={{ ...style.formItemBetweenGap }} label={<Text>{formatMessage(messages["Keep Export File for"])}</Text>} >
                                            {getFieldDecorator('Keep_Export_File_for', {
                                                initialValue: this.props.general && this.props.general.other_setting && this.props.general.other_setting.Keep_Export_file_for
                                            })(<Input /*allowClear={true}*/ min={1} max={60} onBlur={e => {
                                                const { form } = this.props;
                                                if (e.target.value < 1 || e.target.value === "" || e.target.value === null) {
                                                    form.setFieldsValue({
                                                        Keep_Export_File_for: 1
                                                    })
                                                } else {
                                                    if (e.target.value > 60) {
                                                        form.setFieldsValue({
                                                            Keep_Export_File_for: 60
                                                        })
                                                    }
                                                }
                                            }} style={{ ...style.setting.configuration.generalScreen.inputNumberWidth }} type="number" />)}
                                            <span style={{ ...style.setting.configuration.generalScreen.inputNumberUnitText }}><Text>{formatMessage(messages["Days"])}</Text></span>
                                        </Form.Item>


                                        <Form.Item style={style.formItemBetweenGap} label={<Text>{formatMessage(messages["Notify Retention Expiry before"])}</Text>} >
                                            {getFieldDecorator('Notify_Retention_Expiry_before', {
                                                initialValue: this.props.general && this.props.general.other_setting && this.props.general.other_setting.Notify_Retention_Expiry_Before
                                            })(<Input /*allowClear={true}*/ min={1} max={90} onBlur={e => {
                                                const { form } = this.props;
                                                if (e.target.value < 1 || e.target.value === "" || e.target.value === null) {
                                                    form.setFieldsValue({
                                                        Notify_Retention_Expiry_before: 1
                                                    })
                                                } else {
                                                    if (e.target.value > 90) {
                                                        form.setFieldsValue({
                                                            Notify_Retention_Expiry_before: 90
                                                        })
                                                    }
                                                }
                                            }} style={{ ...style.setting.configuration.generalScreen.inputNumberWidth }} type="number" />)}
                                            <span style={{ ...style.setting.configuration.generalScreen.inputNumberUnitText }}><Text>{formatMessage(messages["Days"])}</Text></span>
                                        </Form.Item>




                                        <Form.Item style={{ ...style.formItemBetweenGap }} label={<Text>{formatMessage(messages["Notify if emails are not archived for more than"])} </Text>} >
                                            {getFieldDecorator('Notify_if_emails_are_not_archived_for_more_than', {
                                                initialValue: this.props.general && this.props.general.other_setting && this.props.general.other_setting.Notify_if_emails_are_not_archived_for_more_than
                                            })(<Input /*allowClear={true}*/ min={1} max={1440} onBlur={e => {
                                                const { form } = this.props;
                                                if (e.target.value < 1 || e.target.value === "" || e.target.value === null) {
                                                    form.setFieldsValue({
                                                        Notify_if_emails_are_not_archived_for_more_than: 1
                                                    })
                                                } else {
                                                    if (e.target.value > 1440) {
                                                        form.setFieldsValue({
                                                            Notify_if_emails_are_not_archived_for_more_than: 1440
                                                        })
                                                    }
                                                }
                                            }} style={{ ...style.setting.configuration.generalScreen.inputNumberWidth }} type="number" />)}
                                            <span style={{ ...style.setting.configuration.generalScreen.inputNumberUnitText }}><Text>{formatMessage(messages["Minutes"])}</Text></span>
                                        </Form.Item>




                                        <Form.Item style={{ ...style.formItemBetweenGap }} label={<Text>{formatMessage(messages["Notify if public folder items are not archived for more than"])} </Text>} >
                                            {getFieldDecorator('Notify_if_public_folder_items_are_not_archived_for_more_than', {
                                                initialValue: this.props.general && this.props.general.other_setting && this.props.general.other_setting.Notify_if_public_folder_items_are_not_archived_for_more_than
                                            })(<Input /*allowClear={true}*/ min={1} max={10} onBlur={e => {
                                                const { form } = this.props;
                                                if (e.target.value < 1 || e.target.value === "" || e.target.value === null) {
                                                    form.setFieldsValue({
                                                        Notify_if_public_folder_items_are_not_archived_for_more_than: 1
                                                    })
                                                } else {
                                                    if (e.target.value > 10) {
                                                        form.setFieldsValue({
                                                            Notify_if_public_folder_items_are_not_archived_for_more_than: 10
                                                        })
                                                    }
                                                }

                                            }} style={{ ...style.setting.configuration.generalScreen.inputNumberWidth }} type="number" />)}
                                            <span style={{ ...style.setting.configuration.generalScreen.inputNumberUnitText }}><Text>{formatMessage(messages["Days"])}</Text></span>
                                        </Form.Item>


                                        {/* <Form.Item  label={<Text>Maximum number of resend trials </Text>} >
                                    {getFieldDecorator('Maximum number of resend trials ', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please Write something on Period(Days)',
                                            },
                                        ],
                                    })(<div><Input type="" value={3} style={{...style.setting.configuration.generalScreen.inputNumberWidth}} /><span style={{marginLeft:'15px'}}><Text>Count</Text></span></div>)}
                                </Form.Item> */}


                                        {/* <Form.Item  label={<Text>Child DB Size </Text>} >
                                    {getFieldDecorator('Child DB Size ', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please Write something on Period(Days)',
                                            },
                                        ],
                                    })(<div><Input  value={10240} style={{...style.setting.configuration.generalScreen.inputNumberWidth}} /><span style={{marginLeft:'15px'}}><Text>MB</Text></span></div>)}
                                </Form.Item> */}



                                    <Form.Item style={{ ...style.formItemBetweenGap }} label={<Text>{formatMessage(messages["Report Error at"])} </Text>} >
                                        {getFieldDecorator('Report_Error_at', {
                                            initialValue: this.props.general && this.props.general.other_setting && this.props.general.other_setting.Report_Error_at &&( moment(this.props.general.other_setting.Report_Error_at, "HH:mm") === "Invalid date" ? this.props.general.other_setting.Report_Error_at : moment(this.props.general.other_setting.Report_Error_at, "HH:mm"))

                                            })(<TimePicker allowClear={false} style={{ ...style.setting.configuration.generalScreen.inputNumberWidth }} format={"HH:mm"} />)}
                                            <span style={{ ...style.setting.configuration.generalScreen.inputNumberUnitText }}><Text>{formatMessage(messages["(HH:mm)"])}</Text></span>
                                        </Form.Item>

                                        <Form.Item style={style.formItemBetweenGap} label={<Text>{formatMessage(messages["Enable WORM Journaling"])} </Text>} >
                                            {getFieldDecorator('Enable_WORM_Journaling', {
                                                valuePropName: 'checked', initialValue: this.props.general && this.props.general.other_setting && this.props.general.other_setting.Enable_WORM_Journaling === "0" ? false : true

                                            })(<Checkbox />)}
                                        </Form.Item>

                                    </Form>
                                </div>
                            </div>
                            {/* </div> */}
                        </TabPane>

                    </Tabs >
                </div >
            </div>
        );
    }
}

const WrappedSSOForm = Form.create({ name: 'general' })(General);
const mapStateToProps = state => {
    return {
        general: state.ConfigurationReducer.general
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updateDataTableActions: actions => dispatch(updateDataTableActions(actions)),
        fetchConfigurationGeneral: NoMessage => dispatch(fetchConfigurationGeneral(NoMessage)),
        postConfigurationGeneral: (data) => dispatch(postConfigurationGeneral(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedSSOForm);
