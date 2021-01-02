import React, { Component } from 'react'
// import style from "../../../styles"
import Datatable from "../../../Components/DataTable/DataTable";
import { connect } from "react-redux";
import { Typography } from "antd";
import { updateDataTableActions } from "../../../Redux/Actions/pageHeader/pageHeader";
import { fetchUserTasks, getUserTasks, deleteUserTasks, updateUserTasks } from "../../../Redux/Actions/ControlCenterAction/UserTasksActions";
import moment from "moment"
import DataTableHeader from "../../../Components/DataTable/Component/DataTableHeader"

// import * as ApiInfo from "../../../../APIConfig/ApiParameters";


import { defineMessages } from 'react-intl';
import { message } from 'antd'

const messages = defineMessages({
	'Task Description': {
		id: "userTask.taskDescription",
		defaultMessage: "Task Description",
	},
	'Next Run': {
		id: "userTask.nextRun",
		defaultMessage: "Next Run"
	},
	'Schedule Type': {
		id: "userTask.shedType",
		defaultMessage: "Schedule Type"
	},
	'Owner': {
		id: "userTask.Owner",
		defaultMessage: "Owner"
	},
	'Enable': {
		id: "userTask.enable",
		defaultMessage: "Enable"
	},
})
const { Text } = Typography;

class UserTask extends Component {
	constructor(props) {
		super(props)
		this.state = {}
		message.destroy()
	}
	columns = [
		{
			title: 'Task Description',
			dataIndex: 'Task_Description',
			key: 'Task Description',
			width: 230,
			render: Task_Description => <Text style={{ wordBreak: "break-all" }}>{Task_Description}</Text>
		},
		{
			title: 'Next Run',
			dataIndex: 'Next_Run',
			key: 'Next Run',
			disabled: true,
			width: 120,
			render: Next_Run => {
				let date = Next_Run ? (moment(new Date(Next_Run)).format('DD-MMM-YYYY') === "Invalid date" ? Next_Run : moment(new Date(Next_Run)).format('DD-MMM-YYYY')) : ""
				return (
					<Text style={{ wordBreak: "break-all" }}>{date}</Text>
				)
			}
		},
		{
			title: 'Status',
			dataIndex: 'Status',
			key: 'Status',
			width: 100,
			disabled: true,
			// render: Status => (
			// Status ? <Icon type='check' /> : <Icon type='close' />
			// ),
		},
		{
			title: 'Schedule Type',
			dataIndex: 'Schedule_Type',
			render: Schedule_Type => <span style={{ wordBreak: "break-all" }} >{Schedule_Type}</span>,
			key: 'Schedule Type',
			width: 150,
			disabled: true,
			hide: true
		},
		{
			title: 'Owner',
			dataIndex: 'Owner',
			key: 'Owner',
			width: 120,
			render: Owner => {
				return (
					<Text style={{ wordBreak: "break-all" }}>{Owner}</Text>
				)
			},
			disabled: true
		},
		{
			title: 'Enable/Disable Task',
			// dataIndex: 'Enable',
			key: 'Enable/Disable Task',
			width: 150,
			render: rec => !rec.Enable ? <Text onClick={() => this.updateUserTasks(rec)} type="link" style={{ border: "none", color: "#1890ff", wordBreak: "break-all" }} >Enable</Text> : <Text style={{ border: "none", color: "#1890ff", wordBreak: "break-all" }} onClick={() => this.updateUserTasks(rec)} type="link" >Disable</Text>,
			disabled: true
		}
	];
	componentDidMount() {
		this.props.updateDataTableActions({ refresh: true, onRefresh: () => this.onRefresh() })
		this.props.fetchUserTasks()
	}

	onRefresh = () => {
		this.props.getUserTasks()
		this.props.fetchUserTasks()
	}

	deleteUserTasks = records => {
		if (records) {
			if (!Array.isArray(records)) {
				this.props.deleteUserTasks(records.jobId)
			}
		}
	}

	updateUserTasks = (record, enable_disable) => {
		if (record) {
			this.props.updateUserTasks(record.jobId)
		}
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
		this.props.updateDataTableActions({ refresh: false })
	}
	currentPaginationSize = (page) => {
		this.setState({ currentPage: page })
	}
	currentPageSize = (value) => {
		this.setState({ pageSize: value })
	}
	render() {
		const { columnConfig, deleteRecord, deleteDrawer, currentPage, pageSize } = this.state
		const { formatMessage } = this.props;
		const messagesKeys = Object.keys(messages);
		const messagesValues = Object.values(messages);
		this.columns.forEach((c) => {
			messagesKeys.forEach((mK, index) => {
				if (c.key === mK) {
					//ApiInfo.DEBUGER && console.log(messagesValues[index]);
					c.title = formatMessage(messagesValues[index]);
				}
			})
		})

		return (
			<div >
				<div /*style={{ ...style.paddingTop10 }}*/>
					<DataTableHeader
						openDeleteDrawer={(record) => this.openDeleteDrawer(record)}
						openColumConfigDrawer={() => this.openColumConfigDrawer()} formatMessage={formatMessage} data={this.props.userTasks} changeStatus={(records, enable_disable) => this.updateUserTasks(records, enable_disable)}
						currentPageSize={this.currentPageSize} />
					<Datatable closeColumConfigDrawer={() => this.closeColumConfigDrawer()}
						columnConfig={columnConfig}
						openDeleteDrawer={(record) => this.openDeleteDrawer(record)}
						deleteRecord={deleteRecord}
						deleteDrawer={deleteDrawer}
						closeDeleteDrawer={() => this.closeDeleteDrawer()}
						keyID="jobId" formatMessage={formatMessage} enbDis addEditColumn columns={this.columns} data={this.props.userTasks} noEditIcon changeStatus={(records, enable_disable) => this.updateUserTasks(records, enable_disable)} Delete={deleteRecords => this.deleteUserTasks(deleteRecords)} coveredHeight={200}
						pageSize={pageSize || 20}
						currentPage={currentPage}
						currentPaginationSize={this.currentPaginationSize} />
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		userTasks: state.UserTasksReducer.userTasks
	}
}

const mapDispatchToProps = dispatch => {
	return {
		updateDataTableActions: actions => dispatch(updateDataTableActions(actions)),
		fetchUserTasks: () => dispatch(fetchUserTasks()),
		deleteUserTasks: jobId => dispatch(deleteUserTasks(jobId)),
		updateUserTasks: jobId => dispatch(updateUserTasks(jobId)),
		getUserTasks: () => dispatch(getUserTasks())
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(UserTask);
