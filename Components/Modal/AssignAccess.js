import React from "react"
import { Drawer, Form, Radio, Checkbox, Transfer, Button, Select, message, Spin, Typography } from 'antd';
import { PrimaryButton, SecondryButton } from "../Button/Button";
// import { SecondryButton } from "../Button/Button";
import Clear_Gray from '../../Assets/icons/SV_ICONS/Clear_Gray.png';
import { defineMessages } from 'react-intl';
import style from "../../styles";
import { connect } from "react-redux";
import { fetchUsers } from "../../Redux/Actions/SecurityAction/UserManagementAction"
import { postMailboxAccess, getDeleltedMailboxAccess, getDeletedMailboxAccessOnReceived } from "../../Redux/Actions/SecurityAction/MailboxAccessAction"
import MailboxAccess from '../../Assets/icons/SV_ICONS/Mailbox Access_Blue.png';
import * as ApiInfo from "../../APIConfig/ApiParameters";


const { Text } = Typography
const messages = defineMessages({
    'content': {
        id: "AssignAccess.content",
        defaultMessage: "content",
    },
    'description of content': {
        id: "AssignAccess.descriptionOfContent",
        defaultMessage: "description of content"
    },
    'Couldnot Save Something Went Wrong': {
        id: "AssignAccess.CouldnotSaveSomethingWentWrong",
        defaultMessage: "Couldnot Save Something Went Wrong"
    },
    'Reset': {
        id: "AssignAccess.Reset",
        defaultMessage: "Reset"
    },
    'Edit Mailbox Access Setting': {
        id: "AssignAccess.EditMailboxAccessSetting",
        defaultMessage: "Edit Mailbox Access Setting",
    },
    'Add Mailbox Access Setting': {
        id: "AssignAccess.AddMailboxAccessSetting",
        defaultMessage: "Add Mailbox Access Setting"
    },
    'User': {
        id: "AssignAccess.User",
        defaultMessage: "User"
    },
    'Apply': {
        id: "AssignAccess.Apply",
        defaultMessage: "Apply"
    },
    'Clear': {
        id: "AssignAccess.Clear",
        defaultMessage: "Clear"
    },
    'Assign Access to: ': {
        id: "AssignAccess.AssignAccessTo",
        defaultMessage: "Assign Access to: "
    },
    'All Users': {
        id: "AssignAccess.AllUsers",
        defaultMessage: "All Users",
    },
    'Selected Users': {
        id: "AssignAccess.SelectedUsers",
        defaultMessage: "Selected Users"
    },
    'Server:': {
        id: "AssignAccess.Server:",
        defaultMessage: "Server:"
    },
    'Storage Group:': {
        id: "AssignAccess.StorageGroup",
        defaultMessage: "Storage Group:"
    },
    'Mailbox Store:': {
        id: "AssignAccess.MailboxStore",
        defaultMessage: "Mailbox Store:"
    },
    'Show Deleted Mailbox': {
        id: "AssignAccess.ShowDeletedMailbox",
        defaultMessage: "Show Deleted Mailbox"
    },
    'Available': {
        id: "AssignAccess.Available",
        defaultMessage: "Available"
    },
    'Selected': {
        id: "AssignAccess.Selected",
        defaultMessage: "Selected"
    },
    'Mailbox': {
        id: "AssignAccess.Mailbox",
        defaultMessage: "Mailbox"
    },
    'Mailbox(es)': {
        id: "AssignAccess.Mailboxes",
        defaultMessage: "Mailbox(es)"
    },
    'Save': {
        id: "AssignAccess.Save",
        defaultMessage: "Save",
    },
})

const { Title } = Typography
const { Option } = Select
let user = []
let searchUser = ['Bilala@sonasoft.com', 'Asrara@sonasoft.com']
for (let i = 0; i < searchUser.length; i++) {
    user.push(<Option value={searchUser[i]}>{searchUser[i]}</Option>)
}
const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

// function handleChange(value) {
//   ApiInfo.DEBUGER &&  console.log(`selected ${value}`);
// }

class AssignAccess extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mockData: [],
            applyButton: true,
            radioButton: true,
            selectedOption: true,
            AssignAccessOption: "A",
            disableClear: true,
            disableSelectUsers: false,
            checkboxValue: false,
            mailBoxDataSource: []
        };
    }


    static getDerivedStateFromProps(nextProps, state) {
        // if (nextProps.values && nextProps.values.Granted_MailBoxes && nextProps.assignAccess && !nextProps.users && !state.AssignAccessOption) {
        //     nextProps.fetchUsers()
        //     // nextProps.
        !nextProps.users && nextProps.assignAccess && nextProps.fetchUsers(true)
        if (nextProps.values && nextProps.assignAccess && !state.updated) {
            nextProps.form.setFieldsValue({
                Assign_Access_to: nextProps.values.Edit
            })
            return {
                AssignAccessOption: nextProps.values.Edit,
                radioButton: false,
                disableClear: false,
                disableApply: true,
                selectedOption: false,
                disableSelectUsers: true,
                updated: true
            }
        }
        if (state.selectedServer && nextProps.form.getFieldValue("ShowDeletedMailbox") && !nextProps.deletedMailBoxAccessData) {
            nextProps.getDeleltedMailboxAccess(state.selectedServer, nextProps.users);
        }
        return null;
    }

    filterOption = (inputValue, option) => option.description.indexOf(inputValue) > -1;

    renderFooter = () => {
        const { formatMessage } = this.props;
        return (
            <Button size="small" style={{ float: 'right', margin: 5 }} onClick={this.getMock}>
                {formatMessage(messages["Reset"])}
            </Button>
        )
    }

    AssignAccessSelect = e => {
        this.setState({
            AssignAccessOption: e.target.value,
        });
    };
    selectAzure = () => {
        let azureSelected = this.state.azure
        this.setState({
            azure: !azureSelected
        })
    }
    onChangeDropdown = (value) => {
        this.setState({
            selectedOption: false,
            User_Logon: value
        })
    }

    filter = (input, option) => {
        return (
            option.props.children.toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
        )
    }
    applyOnForm = () => {
        if (this.state.User_Logon) {
            this.setState({
                radioButton: false,
                disableClear: false,
                disableApply: true,
                selectedOption: false,
                disableSelectUsers: true,
            })
        }
    }
    clear = () => {
        const { form } = this.props
        this.setState({
            radioButton: true,
            disableApply: false,
            disableClear: true,
            User_Logon: undefined,
            disableSelectUsers: false,
        })
        form.setFieldsValue({
            userid: ""
        })
    }
    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
            selectedOption: false,
        })
    }

    onChangeServer = (val) => {
        const { form } = this.props;
        this.setState({
            allowToRun: false,
            selectedServer: val,
            selectedStorageGroup: "All",
            selectedMailboxStoreName: "All"
        })
        form.setFieldsValue({
            'Storage Group': "All",
            'Mailbox Store': "All"
        })
        this.props.getDeletedMailboxAccessOnReceived(null)
    }
    onChangeStorageGroup = (val) => {
        const { form } = this.props;
        if (val === "All") {
            this.setState({
                selectedStorageGroup: undefined
            })
        } else {
            this.setState({
                selectedStorageGroup: val
            })
        }
        form.setFieldsValue({
            'Mailbox Store': "All"
        })
    }
    onChangeMailBoxStore = (val) => {
        if (val === "All") {
            this.setState({
                selectedMailboxStoreName: undefined
            })
        } else {
            this.setState({

                selectedMailboxStoreName: val
            })
        }
    }

    filterOption = (inputValue, option) => option.title.toLowerCase().toString().indexOf(inputValue.toLowerCase()) > -1;

    renderFooter = () => {
        const { formatMessage } = this.props;
        return (
            <Button size="small" style={Object.create({ ...style.transfer.transferResetBtn })} onClick={this.getMock}>
                {formatMessage(messages["Reset"])}
            </Button>
        )
    }

    handleSubmit = () => {
        const { userKeys, AssignAccessOption, User_Logon } = this.state;
        const { values, postMailboxAccess, users } = this.props;


        this.props.form.validateFieldsAndScroll((err, data) => {
            if (err) {
                // ApiInfo.DEBUGER && console.log("error", err)
            }
            else {
                if ((!data.Granted_Mailboxes || (Array.isArray(data.Granted_Mailboxes) && data.Granted_Mailboxes.length < 1)) && this.state.AssignAccessOption !== "A") {
                    message.warning("No mailbox selected.")
                }
                else {
                    data.Granted_Mailboxes = AssignAccessOption !== "A" ? userKeys : users
                    data.Edit = AssignAccessOption
                    if (User_Logon) {
                        data.userId = User_Logon
                    } else {
                        data.userId = values.mailboxId
                    }
                    postMailboxAccess(data)
                    this.Close()
                    this.setState({
                        AssignAccessOption: "A"
                    })
                }

            }
        });
    };

    renderServerOptions = (data) => {
        if (data) {
            let serverNames = data.map(val => val.EXCHANGE_SERVER_NAME)
            serverNames = new Set(serverNames)
            serverNames = [...serverNames]
            serverNames = serverNames.filter(server => server.length > 0)
            return serverNames.map((val, ind) => <Option key={ind} value={val}>{val}</Option>)
        }
    }
    renderStorageGroupOptions = (data) => {
        const { selectedServer } = this.state
        if (data) {
            let storageOptions = data.map(val => val.EXCHANGE_SERVER_NAME === selectedServer && val.STORAGE_GROUP_NAME)
            storageOptions = new Set(storageOptions)
            storageOptions = ["All", ...storageOptions]
            storageOptions = storageOptions.filter(storageopt => storageopt.length > 0)
            return storageOptions.map((val, ind) => <Option key={ind} value={val}>{val}</Option>)
        }
    }
    renderMailboxStoreOptions = (data) => {
        const { selectedServer, selectedStorageGroup } = this.state
        if (data) {
            let mailboxeStores = data.map(val => val.EXCHANGE_SERVER_NAME === selectedServer && val.STORAGE_GROUP_NAME === selectedStorageGroup && val.MAILBOX_STORE_NAME)
            mailboxeStores = new Set(mailboxeStores)
            mailboxeStores = ["All", ...mailboxeStores]
            mailboxeStores = mailboxeStores.filter(mailbox => mailbox.length > 0)
            return mailboxeStores.map((val, ind) => <Option key={ind} value={val}>{val}</Option>)
        }
    }

    pushDeletedUsers = users => {
        if (this.props.deletedMailBoxAccessData) {
            return this.props.deletedMailBoxAccessData.map(mailBox => users.push(mailBox))
        } else {
            return users
        }
        // return users
    }

    deletedData = () => {
        const deletedData = []
        this.props.deletedMailBoxAccessData.forEach(ele => {
            deletedData.push({ key: ele.USER_ID, title: <Text style={{ color: 'red' }}>{ele.MAILBOX_NAME}</Text> })
        })
        return deletedData
    }

    dataForRender = () => {
        const { users, deletedMailBoxAccessData, } = this.props;
        const { checkboxValue, allowToRun, mailBoxDataSource } = this.state;
        if (users && !checkboxValue && !allowToRun) {
            this.setState({
                allowToRun: true,
                mailBoxDataSource: [...this.getData(users)]
            })
        } else if (users && deletedMailBoxAccessData && checkboxValue && !allowToRun) {
            this.setState({
                allowToRun: true,
                mailBoxDataSource: [...this.getData(users), ...this.deletedData()]
            })
        }
        return mailBoxDataSource
    }


    getData = (users) => {

        const { selectedServer, selectedStorageGroup, selectedMailboxStoreName } = this.state;
        const { values, deletedMailBoxAccessData } = this.props
        // let newData = []

        let data = [];
        let selectedUserKeys = []
        try {
            if (values) {
                let userKeys = values && JSON.parse(values && values.Granted_MailBoxes.replace(/'/g, '"'))
                userKeys.forEach(user => selectedUserKeys.push(user.USER_ID))
                deletedMailBoxAccessData && deletedMailBoxAccessData.map(delMailBox => data.push(delMailBox))

            }
        } catch (e) {
            ApiInfo.DEBUGER && console.log("err", e)
            // userKeys = []
        }
        for (let i = 0; i < users.length; i++) {
            if ((selectedUserKeys.includes(users[i].USER_ID)) || (selectedServer && selectedStorageGroup && selectedMailboxStoreName && selectedServer === users[i].EXCHANGE_SERVER_NAME && selectedStorageGroup === users[i].STORAGE_GROUP_NAME && selectedMailboxStoreName === users[i].MAILBOX_STORE_NAME && users[i].MAILBOX_NAME && users[i].USER_NAME)) {
                data.push({
                    key: users[i].USER_ID,
                    title: users[i].MAILBOX_NAME || users[i].USER_NAME,
                })
                // deletedMailBoxAccessData && deletedMailBoxAccessData.map(delMailBox => data.push(delMailBox))
            }
            else {
                if ((selectedUserKeys.includes(users[i].USER_ID)) || (selectedServer && selectedStorageGroup && selectedServer === users[i].EXCHANGE_SERVER_NAME && selectedStorageGroup === users[i].STORAGE_GROUP_NAME && users[i].MAILBOX_NAME && users[i].USER_NAME)) {
                    data.push({
                        key: users[i].USER_ID,
                        title: users[i].MAILBOX_NAME || users[i].USER_NAME,
                    })
                } else {
                    if ((selectedUserKeys.includes(users[i].USER_ID)) || (selectedServer && selectedServer === users[i].EXCHANGE_SERVER_NAME && users[i].MAILBOX_NAME && users[i].USER_NAME)) {
                        data.push({
                            key: users[i].USER_ID,
                            title: users[i].MAILBOX_NAME || users[i].USER_NAME,
                        })
                        // deletedMailBoxAccessData && deletedMailBoxAccessData.map(delMailBox => data.push(delMailBox))
                    }
                }
            }
        }

        if (!selectedServer && !selectedStorageGroup && !selectedMailboxStoreName && values) {
            let userKeys;
            try {
                userKeys = values && JSON.parse(values && values.Granted_MailBoxes.replace(/'/g, '"'))
            } catch (e) {
                userKeys = []
            }
            for (let i = 0; i < userKeys.length; i++) {
                if (userKeys[i].Email_ID) {
                    data.push({
                        key: userKeys[i].key,
                        title: userKeys[i].Email_ID,
                    })
                }
            }
        }

        //  this.setState(() => ({ mailBoxDataSource: data }), console.log(this.state.mailBoxDataSource));
        return data;
    };

    renderItem = item => {
        const customLabel = (
            <span className="custom-item">
                {item.title}
            </span>
        );

        return {
            label: customLabel, // for displayed item
            value: item.title, // for title and filter matching
        };

    }

    getTargetKeys = (values) => {
        if (!this.state.userKeys) {
            let userKeys;
            try {
                userKeys = values && JSON.parse(values && values.replace(/'/g, '"'))
            } catch (e) {
                ApiInfo.DEBUGER && console.log("error", e)
                userKeys = []
            }
            let targetKeys = userKeys && userKeys.map(val => val.key)
            userKeys && this.setState({
                userKeys: targetKeys
            })
        }
    };


    handleChange = targetKeys => {
        this.setState({ userKeys: targetKeys });
    };

    handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
        this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });
    };

    Close = () => {
        this.clear()
        this.props.close()
        this.props.form.resetFields()
        this.setState({
            userKeys: undefined,
            disableClear: false,
            radioButton: true,
            selectedOption: false,
            AssignAccessOption: "A",
            updated: false,
            checkboxValue: false,
            mailBoxDataSource: []
        })
    }
    getAssignAccessOption = (value) => {
        const { AssignAccessOption } = this.state
        if (!AssignAccessOption) {
            this.setState({
                AssignAccessOption: value && value.Edit
            })
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { AssignAccessOption, selectedServer, selectedStorageGroup, includeExclude, radioButton, selectedOption, userKeys } = this.state;
        const { values, assignAccess, formatMessage } = this.props;
        values && assignAccess && this.getAssignAccessOption(values)
        return (
            <div>
                <Drawer
                    width={600}
                    onClose={() => this.Close()}
                    closable={false}
                    visible={assignAccess}
                    maskStyle={{ backgroundColor: "transparent" }}
                >
                    <div style={{ ...style.setting.drawerMain }}>
                        <div style={{ ...style.setting.drawerIconTitleWrapper }}>
                            <img title="Mailbox Access" src={MailboxAccess} style={{ ...style.setting.drawerIcons }} alt='' ></img>
                            <Title style={{ ...style.setting.drawerTitles }}>{values ? formatMessage(messages["Edit Mailbox Access Setting"]) : formatMessage(messages["Add Mailbox Access Setting"])}</Title>
                        </div>
                        <div style={{ paddingTop: 10, cursor: "pointer" }}>
                            <img src={Clear_Gray} title="Close" alt="" onClick={() => this.Close()} width={28} height={28} />
                        </div>
                    </div>

                    <Form layout="vertical" onSubmit={this.handleSubmit}>
                        <Form.Item label={formatMessage(messages["User"])}>
                            {getFieldDecorator('userid', {
                                initialValue: values && values.Email_ID
                            })(
                                <Select
                                    disabled={this.state.disableSelectUsers}
                                    showSearch
                                    showArrow={false}
                                    style={{ width: "100%", height: 40 }}
                                    onChange={(val) => this.onChangeDropdown(val)}
                                    onFocus={() => !this.props.users && this.props.fetchUsers()}
                                    onBlur={this.onBlur}
                                    onSearch={this.onSearch}
                                    filterOption={(input, option) => this.filter(input, option)}
                                    notFoundContent={(!this.props.users) && <Text>
                                        <Spin size="small" style={{ marginRight: 15 }} />Fetching...
                                    </Text>}
                                >
                                    {this.props.users && this.props.users.map((val, ind) => <Option key={ind} value={val.USER_ID}>{val.MAILBOX_NAME}</Option>)}
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item style={{ ...style.formItemBetweenGap }}>
                            <div style={{ ...style.drawerButtons }}>
                                <PrimaryButton text={formatMessage(messages["Apply"])} onClick={() => this.applyOnForm()} disabled={values || this.state.disableApply} />
                                <SecondryButton text={formatMessage(messages["Clear"])} onClick={() => this.clear()} style={{ marginRight: 8 }} disabled={values || this.state.disableClear} />
                            </div>
                        </Form.Item>

                        <Form.Item style={{ ...style.formItemBetweenGap }} label={formatMessage(messages["Assign Access to: "])}>
                            {getFieldDecorator('Assign_Access_to: ', {
                                initialValue: AssignAccessOption
                            })(
                                <Radio.Group onChange={this.AssignAccessSelect} disabled={radioButton} >
                                    <Radio value={"A"}>{formatMessage(messages["All Users"])}</Radio>
                                    <Radio value={"S"}>{formatMessage(messages["Selected"])}</Radio>
                                </Radio.Group>
                            )}
                        </Form.Item>

                        {AssignAccessOption === "S" && (
                            <Form.Item >
                                <Form.Item style={{ ...style.formItemBetweenGap }} label={formatMessage(messages["Server:"])}>
                                    {getFieldDecorator('Server', {
                                    })(<Select onFocus={() => (!this.props.users || !this.props.users.length > 0) && this.props.fetchUsers()}
                                        notFoundContent={(!this.props.users) && <Text>
                                            <Spin size="small" style={Object.create({ ...style.marginTop15 })} />Fetching...
                                        </Text>}
                                        defaultValue="Select Value"
                                        onChange={(val) => this.onChangeServer(val)}
                                        style={Object.create({ ...style.height40 })}
                                        onBlur={this.onBlur}
                                        onSearch={this.onSearch}
                                        filterOption={(input, option) =>
                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        showSearch
                                    >
                                        {this.props.users && this.renderServerOptions(this.props.users)}
                                    </Select>)}
                                </Form.Item>
                                <Form.Item style={{ ...style.formItemBetweenGap }} label={formatMessage(messages["Storage Group:"])}>
                                    {getFieldDecorator('Storage Group', {

                                    })(<Select placeholder="All" onFocus={() => (!this.props.users || !this.props.users.length > 0) && this.props.fetchUsers()}
                                        onChange={(val) => this.onChangeStorageGroup(val)}

                                        onBlur={this.onBlur}
                                        onSearch={this.onSearch}
                                        style={Object.create({ ...style.height40 })}
                                        filterOption={(input, option) =>
                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        disabled={!this.state.selectedServer}
                                        showSearch
                                        notFoundContent={(!this.props.users) && selectedServer && <Text>
                                            <Spin size="small" style={Object.create({ ...style.marginTop15 })} />"Fetching..."
                                        </Text>}
                                    >
                                        {this.props.users && selectedServer && this.renderStorageGroupOptions(this.props.users)}
                                    </Select>)}
                                </Form.Item>
                                <Form.Item style={{ ...style.formItemBetweenGap }} label={formatMessage(messages["Mailbox Store:"])}>
                                    {getFieldDecorator('Mailbox Store', {

                                    })(<Select placeholder="All" onFocus={() => (!this.props.users || !this.props.users.length > 0) && this.props.fetchUsers()}
                                        onChange={(val) => this.onChangeMailBoxStore(val)}
                                        onBlur={this.onBlur}
                                        onSearch={this.onSearch}
                                        filterOption={(input, option) =>
                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        showSearch
                                        disabled={!this.state.selectedStorageGroup}
                                        style={Object.create({ ...style.height40 })}
                                        notFoundContent={(!this.props.users) && selectedServer && selectedStorageGroup && <Text>
                                            <Spin size="small" style={Object.create({ ...style.marginTop15 })} />"Fetching..."
                                        </Text>}
                                    >
                                        {this.props.users && selectedServer && selectedStorageGroup && this.renderMailboxStoreOptions(this.props.users)}
                                    </Select>)}
                                </Form.Item>
                                <Form.Item style={{ ...style.formItemBetweenGap }} label="">
                                    {getFieldDecorator('ShowDeletedMailbox')(<div>
                                        <Checkbox disabled={selectedOption} checked={this.state.checkboxValue}
                                            onClick={() =>
                                                this.setState({ checkboxValue: !this.state.checkboxValue, allowToRun: false })}
                                        >
                                            {formatMessage(messages["Show Deleted Mailbox"])}
                                        </Checkbox>
                                    </div>)}
                                </Form.Item>
                                <Form.Item
                                    label=""
                                    style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", marginTop: -20 }}
                                >
                                    {getFieldDecorator('Granted_Mailboxes', {
                                    })(
                                        <Transfer
                                            titles={['', includeExclude === 1 ? "Included" : "Excluded"]}
                                            dataSource={this.dataForRender()}
                                            showSearch
                                            locale={{ itemUnit: "Mailbox", iFtemsUnit: "Mailbox(es)" }}
                                            listStyle={{ ...style.transfer.transferListStyle }}
                                            filterOption={this.filterOption}
                                            targetKeys={userKeys || (values && assignAccess && this.getTargetKeys(values.Granted_MailBoxes))}
                                            // selectedKeys={selectedKeys}
                                            onChange={(nextTargetKeys, direction, moveKeys) => this.handleChange(nextTargetKeys, direction, moveKeys)}
                                            onSearch={this.handleSearch}
                                            render={item => this.renderItem(item)}
                                            // footer={this.renderFooter}
                                            // style={{ color: 'red' }}
                                            disabled={selectedOption}
                                        />
                                    )}
                                </Form.Item>
                            </Form.Item>
                        )}

                        <Form.Item style={{ ...style.formItemBetweenGap }}>
                            <div style={{ ...style.drawerButtons }}>
                                <PrimaryButton text={formatMessage(messages["Save"])} onClick={() => this.handleSubmit()} />
                                <SecondryButton text="Cancel" onClick={() => this.Close()} style={{ marginRight: 8 }} />
                            </div>
                        </Form.Item>

                    </Form>
                </Drawer>
            </div >
        )
    }
}

const AssignAccessDrawerForm = Form.create('AssignAccess')(AssignAccess);

const mapStateToProps = state => {
    return {

        users: state.UserManagementReducer.users,
        deletedMailBoxAccessData: state.UserManagementReducer.deletedMailBoxAccessData
    }
};
const mapDispatchToProps = dispatch => {
    return {
        fetchUsers: noMessage => dispatch(fetchUsers(noMessage)),
        postMailboxAccess: data => dispatch(postMailboxAccess(data)),
        getDeleltedMailboxAccess: (data, users) => dispatch(getDeleltedMailboxAccess(data, users)),
        getDeletedMailboxAccessOnReceived: (data) => dispatch(getDeletedMailboxAccessOnReceived(data))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AssignAccessDrawerForm);