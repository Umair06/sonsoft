import React, { Component } from 'react';
import Datatable from "../../../../Components/DataTable/DataTable";
import { Checkbox, Icon, Typography, Select, Form, Tabs, Spin, TreeSelect, message } from 'antd';
//import RoleSetting from "../../../../Components/Modal/Setting";
// import axios from 'axios'
import RoleManagementSideDrawer from "../../../../Components/Modal/RoleManagement"
import { connect } from "react-redux";
import { updateDataTableActions } from "../../../../Redux/Actions/pageHeader/pageHeader";
import { fetchRole, fetchRoleId, fetchAssignRole, changeStatusRoleManagementData, fetchUserPerRole, getUserPerRole, postAssignRole, deleteRole } from "../../../../Redux/Actions/SecurityAction/RoleManagementAction";
import { fetchUsers } from "../../../../Redux/Actions/SecurityAction/UserManagementAction";
// import CollapsibleHeader from "../../../../Components/CollapseAbleHeader/CollapseAbleHeader";
import { defineMessages } from 'react-intl';
//import theme from '../../../../Assets/Theme/Theme'
import style from "../../../../styles";
import DataTableHeader from "../../../../Components/DataTable/Component/DataTableHeader"
import { updateRowActions } from "../../../../Redux/Actions/ActionRowAction/ActionRowAction";



//const { color } = theme;
const messages = defineMessages({
	'Email ID': {
		id: "roleManagement.emailID",
		defaultMessage: "Email ID",
	},
	'User Logon': {
		id: "roleManagement.userLogon",
		defaultMessage: "User Logon"
	},
	'Role': {
		id: "roleManagement.role",
		defaultMessage: "Role"
	},
	'Description': {
		id: "roleManagement.description",
		defaultMessage: "Description"
	},
	'Status': {
		id: "roleManagement.status",
		defaultMessage: "Status"
	},
	// 'Fetching Roles': {
	// 	id: "roleManagement.FetchingSavedSearches",
	// 	defaultMessage: "Fetching "
	// },
	'Access All Mailboxes': {
		id: "roleManagement.AccessAllMailboxes",
		defaultMessage: "Access All Mailboxes"
	},
	'Assign To (User Logon)': {
		id: "roleManagement.AssignTo(UserLogon)",
		defaultMessage: "Assign To (User Logon)"
	},
})

// const data = [
// 	{
// 		key: '1',
// 		Edit: '',
// 		User_Logon: "Bilal Ahmad",
// 		Email_ID: "asrara@sonasoft.com",
// 	},
// 	{
// 		key: '2',
// 		Edit: '',
// 		User_Logon: "Asrar Alam",
// 		Email_ID: "bilala@sonasoft.com",
// 	},
// ];
const column = [
	{
		title: 'Email ID',
		dataIndex: 'Email_ID',
		key: 'Email ID',
		width: 600
	},
	{
		title: 'User Logon',
		dataIndex: 'userLogon',
		key: 'userLogon',
		width: 450
	},
];
const columns = [
	{
		width: 300,
		title: 'Role',
		dataIndex: 'ROLE_NAME',
		render: ROLE_NAME => <span style={{ wordBreak: "break-all" }} >{ROLE_NAME}</span>,
		key: 'Role',
	},
	{
		width: 400,
		title: 'Description',
		dataIndex: 'ROLE_DESCRIPTION',
		render: ROLE_DESCRIPTION => <span style={{ wordBreak: "break-all" }} >{ROLE_DESCRIPTION}</span>,
		key: 'Description',
	},
	{
		width: 200,
		title: 'Status',
		dataIndex: 'STATUS',
		key: 'Status',
		render: text => (
			text === 1 ?
				<Icon type="check" />
				:
				<Icon type="close" />
		)
	},
];

const { TabPane } = Tabs;
const { Text } = Typography
const { Option } = Select;
let user = []
let searchUser = [{ name: 'Bilala@sonasoft.com', Role: 'Eas' }, { name: "Asrara@sonasoft.com", Role: "sasss" }, { name: 'FaizanK@sonasoft.com', Role: 'Eas' }]
for (let i = 0; i < searchUser.length; i++) {
	user.push(<Option value={searchUser[i].name}>{searchUser[i].name}<Text style={{ display: "flex", alignSelf: "right" }}>{searchUser[i].Role}</Text></Option>)
}

class RoleManagement extends Component {
	constructor(props) {
		super(props)
		this.state = {
			confirmDirty: false,
			autoCompleteResult: [],
			values: {},
		}
	}
	openDrawer = (Drawer, values) => {
		this.setState({
			[Drawer]: true,
			values
		})
	}
	onClose = Drawer => {
		this.setState({
			[Drawer]: false
		})
	}
	callBack = key => {
		if (key === '2') {
			this.props.updateDataTableActions({ assign: true, saveAssign: () => this.handleSubmit(), cancel: true, cancelFunction: () => this.handleReset() })
			this.props.updateRowActions(false);
		}
		if (key === '1') {
			this.props.updateDataTableActions({})
			this.props.updateRowActions(true);
		}
		this.setState({
			tabActive: key
		})
	}
	fetchData = () => {
		this.props.fetchRole()
	}
	componentDidMount() {
		this.callBack('1')
		this.fetchData()
	}
	filter = (input, option) => {
		return (
			option.props.children[0].toLowerCase()
				.indexOf(input.toLowerCase()) >= 0
		)
	}
	filterRoles = (input, option) => {
		return (
			option.props.children.toLowerCase()
				.indexOf(input.toLowerCase()) >= 0
		)
	}
	handleSubmit = () => {
		const { roleChange } = this.state;
		// const { form } = this.props;
		this.props.form.validateFieldsAndScroll((err, data) => {
			if (!err) {
				if (roleChange) {
					data.roleid = roleChange
					this.props.postAssignRole(data)
					this.props.form.setFieldsValue({
						users: []
					})
				} else {
					message.warn("Please Select a Role")
				}
			}
		});
	};

	handleReset = () => {
		this.props.form.resetFields();
		const { form } = this.props;
		form.setFieldsValue({
			role: '',
			assignRole: ''
		})
		this.setState({
			role: ''
		})
	}

	changeStatus = (value, IS_Enable) => {
		value.Enable_Sync = IS_Enable
		this.props.changeStatusRoleManagementData(value)
	}
	changeRole = (e) => {
		this.setState({
			roleChange: e,
		})
		this.props.getUserPerRole(undefined)
		if (e) {
			this.props.fetchUserPerRole(e)
		} else {
			this.props.getUserPerRole()
		}

	}

	handleNewSearchChange = (value, label) => {
		const { searchedValues } = this.state
		if (value.target) {
			searchedValues[value.target.id] = value.target.value
		} else {
			if (label) {
				searchedValues[label] = value
			}
		}
		// this.genrateTreeData(searchedValues, true)

		// this.props.updateSearchCriteria(values)
		// this.setState({
		//     searchedValues: values
		// })
	}
	generateAssignRoleList = (data) => {
		let treeData = []
		data && data.length > 0 && data.forEach(val => {
			// let name = val.DISPLAY_NAME ? val.DISPLAY_NAME.split(' ') : val.USER_NAME.split(' ')
			// let nameInitials = name && name.length !== 1 ? name.map((val, ind) => ind < 2 && val[0]) : name.map(val => val[0] + val[1])
			// nameInitials = nameInitials.filter(val => val !== false)
			if (val.USER_NAME) {
				treeData.push({
					title: <div style={{ display: "flex", flexDirection: "column" }}><Text>{val.USER_NAME}</Text><Text>{val.ROLE_NAME}</Text></div>,
					value: val.USER_ID,
					key: val.USER_ID,
					// icon: <Avatar style={{
					//     backgroundColor: color.Orange, width: 20, height: 20, fontSize: 13,
					//     display: 'flex', justifyContent: "center", alignItems: "center"
					// }}>{nameInitials && nameInitials.map(val => val.toUpperCase())}</Avatar>
				})
			}
		})
		return treeData
		// this.setState({
		//     [variable]: treeData
		// })
	}
	onChangeAssignRole = (value, label) => {
		this.setState({ [label]: value });
	};
	Delete = (text) => {
		this.props.deleteRole(text)
	}
	openColumConfigDrawer = () => {
		const { tabActive } = this.state;
		if (tabActive === "1") {
			this.setState({
				RoleColumnConfig: true
			})
		} else {
			this.setState({
				AssignRoleColumnConfig: true
			})
		}
	};

	closeColumConfigDrawer = () => {
		const { tabActive } = this.state;
		if (tabActive === "1") {
			this.setState({
				RoleColumnConfig: false
			})
		} else {
			this.setState({
				AssignRoleColumnConfig: false
			})
		}
	};
	componentWillUnmount() {
		this.props.updateRowActions(false);
	}
	currentPaginationSize = (page) => {
		this.setState({ currentPage: page })
	}
	currentPageSize = (value) => {
		this.setState({ pageSize: value })
	}
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

	render() {
		const { getFieldDecorator } = this.props.form;
		const { roleManagement, values, selectAssignRole, roleChange, tabActive, currentPage, pageSize, RoleColumnConfig, AssignRoleColumnConfig, deleteRecord, deleteDrawer } = this.state;

		const { role, assignRole, formatMessage } = this.props
		const messagesKeys = Object.keys(messages);
		const messagesValues = Object.values(messages);
		columns.forEach((c) => {
			messagesKeys.forEach((mK, index) => {
				if (c.key === mK) {
					c.title = formatMessage(messagesValues[index]);
				}
			})
		})
		column.forEach((c) => {
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
				sm: { span: 10, pull: 3 },
			},
		};
		return (
			<div className="card-container">
				{(<RoleManagementSideDrawer formatMessage={formatMessage} roleManagement={roleManagement} close={() => this.onClose('roleManagement')} values={values} update={() => this.fetchData()} />)}
				{/* <div > */}
				{tabActive === "1" && <DataTableHeader openDeleteDrawer={(record) => this.openDeleteDrawer(record)} openColumConfigDrawer={() => this.openColumConfigDrawer()} deleteMessage={"Cannot delete default role!"} screenName="Role_Management" formatMessage={formatMessage} coveredHeight={245} openDrawer={(values) => this.openDrawer('roleManagement', values)} Delete={(text) => this.Delete(text)} changeStatus={(data, IS_Enable) => this.changeStatus(data, IS_Enable)} actionDropdown enbDis columns={columns} data={role && role} addEditColumn actions={{ syncStatus: false, status: false, archivePublicFolder: false, stubEnable: false, stubPeriod: false }} />}
				<Tabs type="card" tabBarStyle={{ ...style.tabs.tabBar }} onChange={(e) => this.callBack(e)} >
					<TabPane tab={formatMessage(messages["Role"])} key="1">
						<div >

							<Datatable
								openDeleteDrawer={(record) => this.openDeleteDrawer(record)}
								deleteRecord={deleteRecord}
								deleteDrawer={deleteDrawer}
								closeDeleteDrawer={() => this.closeDeleteDrawer()} closeColumConfigDrawer={() => this.closeColumConfigDrawer()}
								columnConfig={RoleColumnConfig} deleteMessage={"Cannot delete default role!"} screenName="Role_Management" formatMessage={formatMessage} coveredHeight={240} openDrawer={(values) => this.openDrawer('roleManagement', values)} Delete={(text) => this.Delete(text)} changeStatus={(data, IS_Enable) => this.changeStatus(data, IS_Enable)} actionDropdown enbDis columns={columns} data={role && role} addEditColumn actions={{ syncStatus: false, status: false, archivePublicFolder: false, stubEnable: false, stubPeriod: false }} />
						</div>
					</TabPane>

					<TabPane tab="Assign Role" key="2">
						<div>
							<div style={{ paddingTop: 5 }} >
								<Form {...formItemLayout} labelAlign="left" layout="horizontal" onSubmit={this.handleSubmit}>
									<Form.Item label={<Text>{formatMessage(messages["Role"])}</Text>}>
										{getFieldDecorator('role', {
											initialValue: ' '
										})(
											<div>
												<Select defaultValue={assignRole && Array.isArray(assignRole) && assignRole.length > 0 && assignRole[0].ROLE_NAME}
													showSearch
													onFocus={!assignRole ? (() => this.props.fetchAssignRole()) : null}
													initialValue="SELECT"
													onBlur={this.onBlur}
													style={{ ...style.height40 }}
													onChange={(e) => this.changeRole(e)}
													onSearch={this.onSearch}
													notFoundContent={(!assignRole) && <Text>
														<Spin size="small" style={{ marginRight: 15 }} />{"Fetching Roles"}</Text>}

													filterOption={(input, option) => this.filterRoles(input, option)} >
													{assignRole && assignRole.map((val) =>
														<Option key={val.ROLE_ID} value={val.ROLE_ID}>{val.ROLE_NAME}</Option>
													)}
												</Select>
											</div>
										)}
									</Form.Item>
									{(roleChange > 3) && <Form.Item style={{ ...style.formItemBetweenGap }} label={<Text> {formatMessage(messages["Access All Mailboxes"])}</Text>}>
										{getFieldDecorator('Site Prefix', {


										})(<div><Checkbox onChange={this.onChange}></Checkbox> </div>)}

									</Form.Item>}
									<Form.Item style={{ ...style.formItemBetweenGap }} label={<Text> {formatMessage(messages["Assign To (User Logon)"])}</Text>}>
										{getFieldDecorator('users', {
											rules: [
												{
													required: true,
													message: 'Please Select User(s)'
												}
											]
										})(
											<TreeSelect
												style={{ width: '100%' }}
												initialValue={selectAssignRole}
												dropdownStyle={{ maxHeight: 305, overflow: 'auto', }}
												treeData={this.props.users && this.generateAssignRoleList(this.props.users)}
												placeholder={formatMessage(messages["Assign To (User Logon)"])}
												onFocus={() => this.props.fetchUsers()}
												allowClear={true}
												// onFocus={() => (!this.props.simpleSearch || !this.props.simpleSearch.EmployeeList || !this.props.simpleSearch.EmployeeList.length > 0) && this.props.fetchSimpleSearch()}
												onChange={(selectedOpt) => this.onChangeAssignRole(selectedOpt, "selectAssignRole")}
												treeCheckable={true}
												showSearch
												// treeIcon={true}
												filterTreeNode={(input, treeNode) =>

													// treeNode.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
													treeNode.props.title.props.children[0].props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
												}
												notFoundContent={(!this.props.users) && <Text>
													<Spin size="small" style={{ marginRight: 15 }} />{"Fetching Roles"}
												</Text>
												}
											/>

										)}

									</Form.Item>
								</Form>
							</div>

							<div /*style={{ ...style.marginTop10 }}*/>
								<DataTableHeader openColumConfigDrawer={() => this.openColumConfigDrawer()} formatMessage={formatMessage} data={this.props.userperrole === undefined ? [] : this.props.userperrole} currentPageSize={this.currentPageSize} />
								<Datatable closeColumConfigDrawer={() => this.closeColumConfigDrawer()}
									columnConfig={AssignRoleColumnConfig} formatMessage={formatMessage} columns={column} data={this.props.userperrole === undefined ? [] : this.props.userperrole} coveredHeight={430} pageSize={pageSize || 20}
									currentPage={currentPage}
									currentPaginationSize={this.currentPaginationSize} />
							</div>
						</div>
					</TabPane>
				</Tabs>

			</div>
			// </div>
		)
	}
}
const WrappedRoleManagement = Form.create({ name: '' })(RoleManagement);
const mapStateToProps = state => {
	return {
		role: state.RoleManagementReducer.role,
		assignRole: state.RoleManagementReducer.assignRole,
		error: state.RoleManagementReducer.error,
		users: state.UserManagementReducer.users,
		userperrole: state.RoleManagementReducer.userperrole

	}
};

const mapDispatchToProps = dispatch => {
	return {
		changeStatusRoleManagementData: (data) => dispatch(changeStatusRoleManagementData(data)),
		updateRowActions: actions => dispatch(updateRowActions(actions)),
		fetchRole: () => dispatch(fetchRole()),
		fetchRoleId: (data) => dispatch(fetchRoleId(data)),
		fetchAssignRole: () => dispatch(fetchAssignRole()),
		updateDataTableActions: actions => dispatch(updateDataTableActions(actions)),
		fetchUsers: () => dispatch(fetchUsers()),
		fetchUserPerRole: id => dispatch(fetchUserPerRole(id)),
		getUserPerRole: () => dispatch(getUserPerRole()),
		postAssignRole: data => dispatch(postAssignRole(data)),
		deleteRole: data => dispatch(deleteRole(data))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedRoleManagement);