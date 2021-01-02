import React from 'react';
import { Typography, Transfer, Select, Form, Input, Radio, Button, message, Tabs, Spin, ConfigProvider } from 'antd';
import DataTable from "../../../Components/DataTable/DataTable"
import style from "../../../styles";
import { connect } from "react-redux";
import { updateDataTableActions } from "../../../Redux/Actions/pageHeader/pageHeader";
import { fetchUserList, fetchExternalUserList, PostExternalUserList, fetchSelectedUserList, AddExternalUser, DeleteExternalUser, insertNewArchivalUser, fetchArchivalType, ExternalUser } from "../../../Redux/Actions/Policies/ArchivalPolicyAction"
import FormItem from 'antd/lib/form/FormItem';
import { defineMessages } from 'react-intl';
import { resetSelectedRecords } from "../../../Redux/Actions/updateSelectedRecordsAction/updateSelectedRecordsAction";
// import * as ApiInfo from "../../../APIConfig/ApiParameters";
import DataTableHeader from "../../../Components/DataTable/Component/DataTableHeader"


const messages = defineMessages({
  'Email ID': {
    id: "archivalPolicy.emailID",
    defaultMessage: "Email ID",
  },
  'Reset': {
    id: "archivalPolicy.Reset",
    defaultMessage: "Reset",
  },
  'Users': {
    id: "archivalPolicy.Users",
    defaultMessage: "Users",
  },
  'All Users': {
    id: "archivalPolicy.AllUsers",
    defaultMessage: "All"
  },
  'Selected Users': {
    id: "archivalPolicy.SelectedUsers",
    defaultMessage: "Selected"
  },
  'Include': {
    id: "archivalPolicy.Include",
    defaultMessage: "Include"
  },
  'Exclude': {
    id: "archivalPolicy.Exclude",
    defaultMessage: "Exclude"
  },
  'Note : New user mailboxes will be added automatically to Archival Policy. Use Exclude option.': {
    id: "archivalPolicy.Note_NewusermailboxeswillbeaddedautomaticallytoArchivalPolicy.UseExcludeoption.",
    defaultMessage: "Note : New user mailboxes will be added automatically to 'Archival Policy'. Use Exclude option."
  },
  'Note : New user mailboxes will be added automatically to Archival Policy.': {
    id: "archivalPolicy.Note_NewusermailboxeswillbeaddedautomaticallytoArchivalPolicy.",
    defaultMessage: "Note : New user mailboxes will be added automatically to 'Archival Policy'.",
  },
  'Server:': {
    id: "archivalPolicy.Server",
    defaultMessage: "Server:"
  },
  'Select Server': {
    id: "archivalPolicy.SelectServer",
    defaultMessage: "Select Server"
  },
  'Fetching...': {
    id: "archivalPolicy.Fetching...",
    defaultMessage: "Fetching..."
  },
  'Storage Group:': {
    id: "archivalPolicy.StorageGroup",
    defaultMessage: "Storage Group:"
  },
  'Select Storage Group': {
    id: "archivalPolicy.SelectStorageGroup",
    defaultMessage: "Select Storage Group"
  },
  'Mailbox Store:': {
    id: "archivalPolicy.MailboxStore",
    defaultMessage: "Mailbox Store:",
  },
  'MailBox_Store': {
    id: "archivalPolicy.MailBox_Store",
    defaultMessage: "MailBox_Store"
  },
  'Included': {
    id: "archivalPolicy.Included",
    defaultMessage: "Included"
  },
  'Excluded': {
    id: "archivalPolicy.Excluded",
    defaultMessage: "Excluded"
  },
  'Mailbox': {
    id: "archivalPolicy.Mailbox",
    defaultMessage: "Mailbox"
  },
  'Mailbox(es)': {
    id: "archivalPolicy.Mailbox(es)",
    defaultMessage: "Mailbox(es)"
  },
  'External Users': {
    id: "archivalPolicy.ExternalUsers",
    defaultMessage: "External Users"
  },
  // 'Note : New user mailboxes will be added automatically to Archival Policy.': {
  //   id: "archivalPolicy.Note_NewusermailboxeswillbeaddedautomaticallytoArchivalPolicy.",
  //   defaultMessage: "Note : New user mailboxes will be added automatically to 'Archival Policy'."
  // },
  'EmailID': {
    id: "archivalPolicy.EmailID",
    defaultMessage: "EmailID"
  },
})

const { TabPane } = Tabs;
const { Text } = Typography;
const { Option } = Select;

const columns = [
  {
    title: 'Email ID',
    dataIndex: 'EMAIL_ID',
    render: EMAIL_ID => <span style={{ wordBreak: "break-all" }} >{EMAIL_ID}</span>,
    key: 'EMAIL_ID',

  },
]


const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

class ArchivalPolicy extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
      // userOption: "A",
      mockData: [],
      targetKeys: [],
      // includeExclude: "I",
      columns: columns,
      data: []
    };
    message.destroy()
  }
  static getDerivedStateFromProps(nextProps, state) {
    if (nextProps.archivalusertype && (!state.userOption || !state.includeExclude)) {
      nextProps.fetchUserList()
      nextProps.fetchSelectedUserList()
      return {
        userOption: nextProps.archivalusertype && Array.isArray(nextProps.archivalusertype) && nextProps.archivalusertype[0] && nextProps.archivalusertype[0].APPPARAM_VALUE && nextProps.archivalusertype[0].APPPARAM_VALUE === "A" ? "A" : "S",
        includeExclude: nextProps.archivalusertype && Array.isArray(nextProps.archivalusertype) && nextProps.archivalusertype[0] && nextProps.archivalusertype[0].APPPARAM_VALUE && nextProps.archivalusertype[0].APPPARAM_VALUE !== "A" ? nextProps.archivalusertype[0].APPPARAM_VALUE : " "
      }
    }
    else if (!nextProps.archivalusertype) {
      nextProps.fetchArchivalType()
      return {}
    }
    return null;
  }
  componentDidMount() {
    this.callBack('1')
    // this.props.fetchArchivalType()
  }
  callBack = key => {
    if (key === '1') {
      this.props.fetchSelectedUserList()
      this.props.updateDataTableActions({ save: true, saveValues: () => this.handleSubmit(), cancel: true, cancelFunction: () => this.handleReset() })
    }
    if (key === '2') {
      this.props.fetchExternalUserList()
      this.props.updateDataTableActions({ save: true, saveValues: () => this.props.PostExternalUserList(this.props.externalusers), cancel: true, cancelFunction: () => this.handleExternalTabReset() })
    }
  }
  onChangeServer = (val) => {
    this.setState({
      selectedServer: val
    })
  }
  onChangeStorageGroup = (val) => {
    if (val === "All") {
      this.setState({
        selectedStorageGroup: undefined
      })
    } else {
      this.setState({
        selectedStorageGroup: val
      })
    }
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
      <Button size="small" style={{ ...style.transfer.transferResetBtn }} onClick={this.getMock}>
        {formatMessage(messages["Reset"])}
      </Button>
    )
  }

  handleSubmit = () => {
    const { userOption, usersTargetKeys, includeExclude } = this.state;
    let selectedUserOption = userOption;
    if (this.state.userOption === "S") {
      selectedUserOption = includeExclude
    }
    if (usersTargetKeys && usersTargetKeys.length) {
      let data = {
        userOption: selectedUserOption,
        userlist: usersTargetKeys
      }
      this.props.insertNewArchivalUser(data)
    } else {
      message.warn("No mailbox selected")
    }
  };

  selectSitePrefix = (option) => {
    this.setState({
      sitePrefix: option
    })
  }
  UserOptionSelect = e => {
    this.setState({
      userOption: e.target.value,
      ArchivalOption: e.target.value
    });

  };

  authenthicationChecked = () => {
    let newAuthenthication = this.state.authenthication;
    this.setState({
      authenthication: !newAuthenthication
    })
  }
  includeExcludeOption = (e) => {
    this.setState({
      includeExclude: e.target.value,

    });
  }
  add = () => {
    const { value, key } = this.state

    if (value) {
      let obj = {
        key: key,
        EMAIL_ID: value,
      }
      this.props.AddExternalUser(obj)
    }
    else {

    }

  }
  onChange = e => {
    e.preventDefault();
    this.setState({
      key: Math.random(),
      value: e.target.value
    })
  }
  remove = (selectedUsers, externalUsers) => {
    if (selectedUsers && Array.isArray(selectedUsers)) {
      let allUsers = externalUsers
      // let usersToBeDeleted = selectedUsers
      let usersToBeDeletedKeys = selectedUsers.map(user => user.key)
      allUsers = allUsers.filter(user => !(usersToBeDeletedKeys.includes(user.key)))
      this.props.DeleteExternalUser(allUsers)
      this.props.resetSelectedRecords();
    } else {
      if (selectedUsers) {
        let allUsers = externalUsers
        allUsers = allUsers.filter(user => user.key !== selectedUsers.key)
        this.props.resetSelectedRecords();
        this.props.DeleteExternalUser(allUsers)
      }
    }
  }
  search = (nameKey, myArray) => {
    for (var i = 0; i < myArray.length; i++) {
      if (nameKey && myArray[i].EMAIL_ID.toLowerCase() === (nameKey.toLowerCase())) {
        return myArray[i];
      }
    }
  }
  handleEmailID = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, data) => {
      if (err) {
        //ApiInfo.DEBUGER && console.log("error", err)
      }
      else {
        var matchvalue = this.search(this.state.value, this.props.externalusers)
        if (matchvalue) {
          message.error("Email ID already exist")
        }
        else {
          this.add()
          this.props.form.resetFields();
        }
      }
    });
  }
  renderServerOptions = (data) => {
    try {
      if (data) {
        let serverNames = data.map(val => val.EXCHANGE_SERVER_NAME)
        serverNames = new Set(serverNames)
        serverNames = [...serverNames]
        serverNames = serverNames.filter(server => server.length > 0)
        return serverNames.map((val, ind) => <Option key={ind} value={val}>{val}</Option>)
      }
    } catch (e) {

    }
  }
  renderStorageGroupOptions = (data) => {
    const { selectedServer } = this.state
    try {
      if (data) {
        let storageOptions = data.map(val => val.EXCHANGE_SERVER_NAME === selectedServer && val.STORAGE_GROUP_NAME)
        storageOptions = new Set(storageOptions)
        storageOptions = [...storageOptions]
        storageOptions = ["All", ...storageOptions]
        storageOptions = storageOptions.filter(storageopt => storageopt.length > 0)
        storageOptions = storageOptions.map((val, ind) => <Option key={ind} value={val}>{val}</Option>)
        return storageOptions
      }
    } catch (e) {

    }
  }
  renderMailboxStoreOptions = (data) => {
    const { selectedServer, selectedStorageGroup } = this.state
    try {
      if (data) {
        let mailboxeStores = data.map(val => val.EXCHANGE_SERVER_NAME === selectedServer && val.STORAGE_GROUP_NAME === selectedStorageGroup && val.MAILBOX_STORE_NAME)
        mailboxeStores = new Set(mailboxeStores)
        mailboxeStores = [...mailboxeStores]
        mailboxeStores = ["All", ...mailboxeStores]
        mailboxeStores = mailboxeStores.filter(mailbox => mailbox.length > 0)
        mailboxeStores = mailboxeStores.map((val, ind) => <Option key={ind} value={val}>{val}</Option>)
        return mailboxeStores
      }
    } catch (e) {

    }
  }

  getData = (users) => {
    const { selectedServer, selectedStorageGroup, selectedMailboxStoreName } = this.state;
    const data = [];
    let selectedIds = []
    try {
      this.props.selectedusers && this.props.selectedusers.forEach(user => selectedIds.push(user.USER_ID))
      for (let i = 0; i < users.length; i++) {
        if (selectedServer && selectedStorageGroup && selectedMailboxStoreName) {
          if ((selectedIds.includes(users[i].USER_ID)) || (selectedServer === users[i].EXCHANGE_SERVER_NAME && selectedStorageGroup === users[i].STORAGE_GROUP_NAME && selectedMailboxStoreName === users[i].MAILBOX_STORE_NAME)) {
            data.push({
              key: users[i].USER_ID,
              title: users[i].MAILBOX_NAME,
            })
          }
        } else {
          if (selectedServer && selectedStorageGroup) {
            if ((selectedIds.includes(users[i].USER_ID)) || (selectedServer === users[i].EXCHANGE_SERVER_NAME && selectedStorageGroup === users[i].STORAGE_GROUP_NAME)) {
              data.push({
                key: users[i].USER_ID,
                title: users[i].MAILBOX_NAME,
              })
            }
          } else {
            if (selectedServer) {
              if ((selectedIds.includes(users[i].USER_ID)) || (selectedServer === users[i].EXCHANGE_SERVER_NAME)) {
                data.push({
                  key: users[i].USER_ID,
                  title: users[i].MAILBOX_NAME,
                })
              }
            }
          }
        }
      }
      if (!selectedServer && !selectedStorageGroup && !selectedMailboxStoreName && this.props.selectedusers) {
        for (let i = 0; i < this.props.selectedusers.length; i++) {
          data.push({
            key: this.props.selectedusers[i].USER_ID,
            title: this.props.selectedusers[i].MAILBOX_NAME,
          })
        }
      }
    } catch (e) { }
    return data
  };
  getTargetKeys = (users) => {
    try {
      const targetKeys = [];
      for (let i = 0; i < users.length; i++) {
        targetKeys.push(users[i].USER_ID);
      }
      this.setState({ usersTargetKeys: targetKeys });
    } catch (e) {

    }
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
  handleTransferChange = (targetKeys) => {
    // const { usersTargetKeys } = this.state;
    let newUsersTargetKeys = [...targetKeys]
    this.setState({ usersTargetKeys: newUsersTargetKeys });
  };
  customizeRenderEmpty = () => {
    // const { formatMessage } = this.props;
    return (
      <div style={{ textAlign: 'center' }}>
        <Spin />
        <p>{"Fetching"}</p>
      </div>
    )
  }

  openColumConfigDrawer = () => {
    this.setState({
      columnConfig: true
    })
  };

  closeColumConfigDrawer = () => {
    this.setState({
      columnConfig: false
    })
  };
  openDeleteDrawer = record => {
    this.setState({
      deleteDrawer: true,
      deleteRecord: record
    })
  }
  closeDeleteDrawer = () => {
    this.setState({
      deleteDrawer: false,
      deleteRecord: undefined
    })
  }

  handleReset = () => {
    const { archivalusertype } = this.props;

    // const { form } = this.props;
    // form.setFieldsValue({
    //   Server: '',
    //   Storage_Group: '',
    //   selectedMaleboxStoreName: '',
    //   MailBox_Store:'',
    //   userOption: this.props.archivalusertype && Array.isArray(this.props.archivalusertype) && this.props.archivalusertype[0] && this.props.archivalusertype[0].APPPARAM_VALUE && this.props.archivalusertype[0].APPPARAM_VALUE === "S",
    // })
    if (archivalusertype && Array.isArray(archivalusertype) && archivalusertype[0] && archivalusertype[0].APPPARAM_VALUE) {
      this.setState({
        userOption: archivalusertype[0].APPPARAM_VALUE === "A" ? "A" : "S",
        includeExclude: archivalusertype[0].APPPARAM_VALUE !== "A" ? archivalusertype[0].APPPARAM_VALUE : " ",
        usersTargetKeys: undefined
      })
    }
    this.props.fetchUserList()
    this.props.fetchSelectedUserList()
    this.props.form.resetFields();
  }

  handleExternalTabReset = () => {
    this.props.ExternalUser()
    this.props.fetchExternalUserList()
    this.props.form.resetFields();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { userOption, includeExclude, columns, selectedServer, selectedStorageGroup, usersTargetKeys, columnConfig, deleteRecord, deleteDrawer } = this.state

    const { formatMessage } = this.props;
    const messagesKeys = Object.keys(messages);
    const messagesValues = Object.values(messages);
    columns.forEach((c) => {
      messagesKeys.forEach((mK, index) => {
        if (c.key === mK) {
          c.title = formatMessage(messagesValues[index]);
        }
      })
    })
    const formItemLayout = {
      labelCol: {
        xs: { span: 12 },
        sm: { span: 8, push: 1 },
      },
      wrapperCol: {
        xs: { span: 12 },
        sm: { span: 12, pull: 4 },
      },
    };

    return (
      <div className="card-container" >
        <Tabs type="card" tabBarStyle={{ ...style.tabs.tabBar }} onChange={this.callBack} >
          <TabPane tab={formatMessage(messages["Users"])} key="1">
            <Form layout="horizontal" labelAlign="left" {...formItemLayout} onSubmit={this.handleSubmit}>
              <Form.Item style={{ ...style.marginBottom }} label={<Text >{formatMessage(messages["Users"])}</Text>} >
                {getFieldDecorator('Users', {
                })(<div> <Radio.Group onChange={this.UserOptionSelect} value={userOption}>
                  <Radio value={"A"}>{formatMessage(messages["All Users"])}</Radio>
                  <Radio value={"S"}>{formatMessage(messages["Selected Users"])}</Radio>
                </Radio.Group>
                </div>)}
              </Form.Item>
              {userOption === "S" ? (
                <div>
                  <Form.Item style={{ ...style.formItemBetweenGap }} label={<Text></Text>} colon={false}>
                    {getFieldDecorator('Include', {

                    })(
                      <div >
                        <Radio.Group onChange={this.includeExcludeOption} value={includeExclude} >
                          <Radio value={"I"}>{formatMessage(messages["Include"])} </Radio>
                          <Radio style={{ marginLeft: 8 }} value={"E"}>{formatMessage(messages["Exclude"])}</Radio>
                        </Radio.Group>
                      </div>
                    )}
                  </Form.Item>
                  <FormItem colon={false} >
                    {getFieldDecorator('Storage Group', {

                    })(<div style={{ ...style.setting.policies.archivalPolicy.noteMainDiv }}>
                      <div style={{ ...style.setting.policies.archivalPolicy.includeExcludeDiv }}  >
                        {includeExclude === "I" && (
                          <Text type="warning" > {formatMessage(messages["Note : New user mailboxes will be added automatically to Archival Policy. Use Exclude option."])}</Text>
                        )}
                        {includeExclude === "E" && (
                          <Text type="warning" >{formatMessage(messages["Note : New user mailboxes will be added automatically to Archival Policy."])}</Text>
                        )}
                      </div>
                      <Form.Item style={{ ...style.marginTop15 }} label={formatMessage(messages["Server:"])}>
                        {getFieldDecorator('Server', {

                        })(<Select placeholder={formatMessage(messages["Select Server"])} onFocus={() => (!this.props.users || !this.props.users.length > 0) && this.props.fetchUserList()}
                          notFoundContent={(!this.props.users) && <Text>
                            <Spin size="small" style={{ ...style.marginTop15 }} />{formatMessage(messages["Fetching..."])}
                          </Text>}
                          initialValue="Select Value"
                          onChange={(val) => this.onChangeServer(val)}
                          style={{ ...style.height40 }}
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
                        {getFieldDecorator('Storage_Group', {

                        })(<Select placeholder={"All"} onFocus={() => (!this.props.users || !this.props.users.length > 0) && this.props.fetchUserList()}
                          onChange={(val) => this.onChangeStorageGroup(val)}
                          initialValue="ALL"
                          onBlur={this.onBlur}
                          disabled={!selectedServer}
                          onSearch={this.onSearch}
                          style={{ ...style.height40 }}
                          filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          }
                          showSearch
                          notFoundContent={(!this.props.users) && selectedServer && <Text>
                            <Spin size="small" style={{ ...style.marginTop15 }} />{formatMessage(messages["Fetching..."])}
                          </Text>}
                        >
                          {this.props.users && selectedServer && this.renderStorageGroupOptions(this.props.users)}
                        </Select>)}
                      </Form.Item>
                      <Form.Item style={{ ...style.formItemBetweenGap }} label={formatMessage(messages["Mailbox Store:"])}>
                        {getFieldDecorator('MailBox_Store', {

                        })(<Select placeholder={"All"} onFocus={() => (!this.props.users || !this.props.users.length > 0) && this.props.fetchUserList()}
                          onChange={(val) => this.onChangeMailBoxStore(val)}
                          initialValue="ALL"
                          onBlur={this.onBlur}
                          disabled={!selectedStorageGroup}
                          onSearch={this.onSearch}
                          filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          }
                          showSearch
                          style={{ ...style.height40 }}
                          notFoundContent={(!this.props.users) && selectedServer && selectedStorageGroup && <Text>
                            <Spin size="small" style={{ ...style.marginTop15 }} />{formatMessage(messages["Fetching..."])}
                          </Text>}
                        >
                          {this.props.users && selectedServer && selectedStorageGroup && this.renderMailboxStoreOptions(this.props.users)}
                        </Select>)}
                      </Form.Item>
                      <ConfigProvider renderEmpty={(!this.props.selectedusers || !this.props.users) && this.customizeRenderEmpty}>
                        <Form.Item colon={false} label=" ">
                          {getFieldDecorator('Transfer', {
                          })(

                            <Transfer
                              titles={['', includeExclude === "I" ? formatMessage(messages["Included"]) : formatMessage(messages["Excluded"])]}
                              initialValue="All"
                              showSearch
                              locale={{ itemUnit: formatMessage(messages["Mailbox"]), itemsUnit: formatMessage(messages["Mailbox(es)"]) }}
                              listStyle={{ ...style.transfer.transferListStyle }}
                              filterOption={this.filterOption}
                              dataSource={this.props.users && this.getData(this.props.users)}
                              targetKeys={usersTargetKeys || (this.props.selectedusers && this.getTargetKeys(this.props.selectedusers))}
                              onChange={(nextTargetKeys, direction, moveKeys) => this.handleTransferChange(nextTargetKeys, direction, moveKeys)}
                              onSearch={this.handleSearch}
                              render={item => this.renderItem(item)}
                            // footer={this.renderFooter}
                            />

                          )}
                        </Form.Item>
                      </ConfigProvider>

                    </div>)}

                  </FormItem>
                </div>
              ) :
                <div style={{ ...style.setting.policies.archivalPolicy.note }}  >
                  <Text type="warning"> {formatMessage(messages["Note : New user mailboxes will be added automatically to Archival Policy."])}</Text>
                </div>}
            </Form>
          </TabPane>

          <TabPane tab={formatMessage(messages["External Users"])} key="2">
            <Form layout="horizontal" labelAlign="left" {...formItemLayout} onSubmit={this.handleEmailID}>

              {/* <CollapseAbleHeader heading="External Users(Only)"> */}
              <Form.Item label={<Text> {formatMessage(messages["EmailID"])}</Text>} >
                <div style={{ ...style.paddingTop10 }}>
                  {getFieldDecorator('EmailID', {
                    rules: [
                      {
                        type: 'email',
                        message: "The input is not valid E-mail!",
                      },
                      {
                        required: true,
                        message: "Please input your E-mail!",
                      },
                    ]
                  })(
                    <Input style={{ ...style.setting.policies.archivalPolicy.inputEmailId }} onPressEnter={(e) => this.handleEmailID(e)} onChange={e => this.onChange(e)} suffix={<img style={{ marginLeft: "5px", cursor: "pointer" }} onClick={(e) => this.handleEmailID(e)} src={require(`../../../Assets/icons/SV_ICONS/Orange-Add.png`)} title="Add" alt={"Orange"} width={35} height={35} />} />
                  )}
                </div>
              </Form.Item>

              <div >
                <DataTableHeader
                  openDeleteDrawer={(record) => this.openDeleteDrawer(record)}
                  openColumConfigDrawer={() => this.openColumConfigDrawer()}
                  formatMessage={formatMessage} actionDropdown data={this.props.externalusers}
                />
                <DataTable
                  openDeleteDrawer={(record) => this.openDeleteDrawer(record)}
                  deleteRecord={deleteRecord}
                  deleteDrawer={deleteDrawer}
                  closeDeleteDrawer={() => this.closeDeleteDrawer()}
                  closeColumConfigDrawer={() => this.closeColumConfigDrawer()}
                  columnConfig={columnConfig}
                  seperator="archivalPolicy"
                  formatMessage={formatMessage}
                  columns={columns}
                  actionDropdown
                  data={this.props.externalusers}
                  noEditIcon
                  addEditColumn
                  Delete={(value) => this.remove(value, this.props.externalusers)} coveredHeight={380} />
              </div>
            </Form>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

const WrappedArchivalPolicy = Form.create({ name: 'ArchivalPolicy' })(ArchivalPolicy);
const mapStateToProps = state => {
  return {
    addexternalusers: state.ArchivalPolicyReducer.addexternalusers,
    users: state.ArchivalPolicyReducer.users,
    externalusers: state.ArchivalPolicyReducer && state.ArchivalPolicyReducer.externalusers,
    selectedusers: state.ArchivalPolicyReducer.selectedusers,
    archivalusertype: state.ArchivalPolicyReducer.archivalusertype
  }
};
const mapDispatchToProps = dispatch => {
  return {
    updateDataTableActions: actions => dispatch(updateDataTableActions(actions)),
    fetchUserList: () => dispatch(fetchUserList()),
    fetchExternalUserList: () => dispatch(fetchExternalUserList()),
    ExternalUser: data => dispatch(ExternalUser(data)),
    PostExternalUserList: (data) => dispatch(PostExternalUserList(data)),
    AddExternalUser: (data) => dispatch(AddExternalUser(data)),
    fetchSelectedUserList: () => dispatch(fetchSelectedUserList()),
    DeleteExternalUser: (data, externalUsers) => dispatch(DeleteExternalUser(data, externalUsers)),
    insertNewArchivalUser: data => dispatch(insertNewArchivalUser(data)),
    fetchArchivalType: () => dispatch(fetchArchivalType()),
    resetSelectedRecords: () => dispatch(resetSelectedRecords())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedArchivalPolicy);