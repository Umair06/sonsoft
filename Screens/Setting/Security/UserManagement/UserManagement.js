import React, { Component } from 'react';
import DataTable from "../../../../Components/DataTable/DataTable";
import UserManagementSettingSideDrawer from "../../../../Components/Modal/UserManagementSetting"
import { Icon, Input, Button } from "antd";
import UserManagementSideDrawer from "../../../../Components/Modal/UserManagement"
// import style from '../../../../styles'
import { connect } from "react-redux";
import { updateDataTableActions } from "../../../../Redux/Actions/pageHeader/pageHeader";
import { fetchUserType, fetchUsers, fetchWithNoPassword, userDataExist, getUserType, deleteUserData } from "../../../../Redux/Actions/SecurityAction/UserManagementAction";
import { defineMessages } from 'react-intl';
import DataTableHeader from "../../../../Components/DataTable/Component/DataTableHeader"
import { updateRowActions } from "../../../../Redux/Actions/ActionRowAction/ActionRowAction";


const messages = defineMessages({
	'User Name': {
		id: "userManagement.userName",
		defaultMessage: "User Name",
	},
	'Display Name': {
		id: "userManagement.displayName",
		defaultMessage: "Display Name"
	},
	'Mailbox': {
		id: "userManagement.mailbox",
		defaultMessage: "Mailbox"
	},
	'User Type': {
		id: "userManagement.userType",
		defaultMessage: "User Type"
	},
	'Role': {
		id: "userManagement.role",
		defaultMessage: "Role"
	},
	'Search': {
		id: "userManagement.Search",
		defaultMessage: "Se"
	},
	'Reset': {
		id: "userManagement.Reset",
		defaultMessage: "Re"
	},
})

class UserManagement extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 1,
			// data:this.props.users 
		};
	}

	getColumnSearchProps = dataIndex => ({
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
			// const {formatMessage} = this.props;
			return (
				<div>
					<Input
						ref={node => {
							this.searchInput = node;
						}}
						// placeholder={`Search ${dataIndex}`}
						value={selectedKeys[0]}
						onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
						onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
					// style={{...style.table.ColumnSearchInput}
					/>
					<Button
						type="primary"
						onClick={() => this.handleSearch(selectedKeys, confirm)}
						icon="search"
						size="small"
					>
						Search
				</Button>
					<Button onClick={() => this.handleReset(clearFilters)} size="small">
						Reset
				</Button>
				</div>
			)
		},
		filterIcon: filtered => (
			<Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
		),
		onFilter: (value, record) =>
			record[dataIndex]
				.toString()
				.toLowerCase()
				.includes(value.toLowerCase()),
		onFilterDropdownVisibleChange: visible => {
			if (visible) {
				setTimeout(() => this.searchInput.select());
			}
		}
	});

	handleSearch = (selectedKeys, confirm) => {
		confirm();
		this.setState({ searchText: selectedKeys[0] });
	};
	handleReset = clearFilters => {
		clearFilters();
		this.setState({ searchText: '' });
	};
	onChange = e => {
		this.setState({
			value: e.target.value,
		});
	};
	openDrawer = (Drawer, values) => {
		this.setState({
			userManagement: false,
			userManagementSetting: false,
			[Drawer]: true,
			values
		})
		// if (values) {
		// 	this.props.getUserType(values.USER_TYPE)
		// }
	}
	onClose = Drawer => {
		this.setState({
			[Drawer]: false
		})
	}
	callBack = key => {
		if (key === 1) {
			this.props.updateDataTableActions({ setting: true, settingOpenDrawer: () => this.openDrawer('userManagementSetting') })
		}
		else {
			this.props.updateDataTableActions({ setting: true })
		}
	}
	componentDidMount() {
		this.callBack(1)
		this.fetchData()
	}
	fetchData = () => {
		this.props.fetchUsers(true);
		// this.props.getUserType("AD")
		// this.props.fetchWithNoPassword()
		// this.props.userDataExist() 
	}
	Delete = value => {
		this.props.deleteUserData(value)
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
	componentWillUnmount() {
		this.props.updateRowActions(false);
	}
	currentPaginationSize = (page) => {
		this.setState({ currentPage: page })
	}
	currentPageSize = (value) => {
		this.setState({ pageSize: value })
	}
	render() {
		const { userManagement, userManagementSetting, values, columnConfig, deleteRecord, deleteDrawer, currentPage, pageSize } = this.state;
		const { users } = this.props

		const columns = [
			{
				width: 170,
				title: 'User Name',
				dataIndex: 'USER_NAME',
				render: USER_NAME => <span style={{ wordBreak: "break-all" }} >{USER_NAME}</span>,
				...this.getColumnSearchProps('userName'),
				sorter: (a, b) => a.userName.length - b.userName.length,
				sortDirections: ['descend', 'ascend'],
			},
			{
				width: 160,
				title: 'Display Name',
				dataIndex: 'DISPLAY_NAME',
				render: DISPLAY_NAME => <span style={{ wordBreak: "break-all" }} >{DISPLAY_NAME}</span>,

				...this.getColumnSearchProps('displayName'),
				sorter: (a, b) => a.displayName.length - b.displayName.length,
				sortDirections: ['descend', 'ascend'],
			},
			{
				width: 310,
				title: 'Mailbox',
				dataIndex: 'MAILBOX_NAME',

				...this.getColumnSearchProps('mailbox'),
				sorter: (a, b) => a.mailbox.length - b.mailbox.length,
				sortDirections: ['descend', 'ascend'],
				render: (MAILBOX_NAME) => <div><p style={{ width: 300, display: "flex", flexWrap: "wrap", whiteSpace: "pre-wrap", wordBreak: "break-all" }}>{MAILBOX_NAME}</p></div>
			},
			{
				width: 130,
				title: 'User Type',
				dataIndex: 'USER_TYPE',
				render: USER_TYPE => <span style={{ wordBreak: "break-all" }} >{USER_TYPE}</span>,

				...this.getColumnSearchProps('userType'),
				sorter: (a, b) => a.userType.length - b.userType.length,
				sortDirections: ['descend', 'ascend'],
			},
			{
				width: 150,
				title: 'Role',
				dataIndex: 'ROLE_NAME',
				render: ROLE_NAME => <span style={{ wordBreak: "break-all" }} >{ROLE_NAME}</span>,
				...this.getColumnSearchProps('role'),
				sorter: (a, b) => a.role.length - b.role.length,
				sortDirections: ['descend', 'ascend'],
			},
		];

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

		return (
			<div>
				{(<UserManagementSideDrawer formatMessage={formatMessage} userManagement={userManagement} close={() => this.onClose('userManagement')} values={values} />)}
				{(<UserManagementSettingSideDrawer formatMessage={formatMessage} userManagementSetting={userManagementSetting} close={() => this.onClose('userManagementSetting')} />)}
				<div /*style={{ ...style.paddingTop10 }}*/ >
					<DataTableHeader
						openDeleteDrawer={(record) => this.openDeleteDrawer(record)}
						openColumConfigDrawer={() => this.openColumConfigDrawer()}
						formatMessage={formatMessage}
						openDrawer={(values) => this.openDrawer('userManagement', values)}
						data={users}
						add
						actions={{ syncStatus: false, status: false, archivePublicFolder: false, stubEnable: false, stubPeriod: false, enabled: false, activate: false }}
						actionDropdown
						currentPageSize={this.currentPageSize}
					/>
					<DataTable
						openDeleteDrawer={(record) => this.openDeleteDrawer(record)}
						deleteRecord={deleteRecord}
						deleteDrawer={deleteDrawer}
						closeDeleteDrawer={() => this.closeDeleteDrawer()}
						closeColumConfigDrawer={() => this.closeColumConfigDrawer()}
						columnConfig={columnConfig}
						keyID="USER_ID"
						screenName="User_Management"
						deleteMessage={"Cannot delete AD/System user!"}
						formatMessage={formatMessage}
						openDrawer={(values) => this.openDrawer('userManagement', values)} Delete={value => this.Delete(value)}
						columns={columns}
						coveredHeight={200}
						data={users}
						add
						addEditColumn
						actions={{ syncStatus: false, status: false, archivePublicFolder: false, stubEnable: false, stubPeriod: false, enabled: false, activate: false }}
						actionDropdown
						pageSize={pageSize || 20}
						currentPage={currentPage}
						currentPaginationSize={this.currentPaginationSize} />
				</div>
			</div>
		)
	}
};

const mapStateToProps = state => {
	return {
		users: state.UserManagementReducer.users,
		userType: state.UserManagementReducer.userType
	}
};

const mapDispatchToProps = dispatch => {
	return {
		fetchUsers: noMessage => dispatch(fetchUsers(noMessage)),
		updateDataTableActions: actions => dispatch(updateDataTableActions(actions)),
		fetchWithNoPassword: () => dispatch(fetchWithNoPassword()),
		userDataExist: () => dispatch(userDataExist()),
		getUserType: (data) => dispatch(getUserType(data)),
		deleteUserData: (data) => dispatch(deleteUserData(data)),
		fetchUserType: (data) => dispatch(fetchUserType()),
		updateRowActions: actions => dispatch(updateRowActions(actions)),

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);