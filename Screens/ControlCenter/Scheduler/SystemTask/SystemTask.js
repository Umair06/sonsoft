import React, { Component } from 'react';
import { Typography, message } from 'antd';
import Datatable from '../../../../Components/DataTable/DataTable';
import { connect } from 'react-redux';
import { updateDataTableActions } from '../../../../Redux/Actions/pageHeader/pageHeader';
import {
  fetchSystemTasks,
  getSystemTasks
} from '../../../../Redux/Actions/ControlCenterAction/SystemTasksActions';
import { defineMessages } from 'react-intl';
import style from '../../../../styles';
import moment from 'moment';
import * as ApiInfo from "../../../../APIConfig/ApiParameters";
import DataTableHeader from "../../../../Components/DataTable/Component/DataTableHeader"



const messages = defineMessages({
  'Task Description': {
    id: 'systemTask.taskDescription',
    defaultMessage: 'Task Description'
  },
  'Last Run': {
    id: 'systemTask.lastRun',
    defaultMessage: 'Last Run'
  },
  'Next Run': {
    id: 'systemTask.nextRun',
    defaultMessage: 'Next Run'
  },
  'Schedule Type': {
    id: 'systemTask.shedType',
    defaultMessage: 'Schedule Type'
  },
  Status: {
    id: 'systemTask.Status',
    defaultMessage: 'Status'
  },
  'Repeat Frequency': {
    id: 'systemTask.repeatFrequency',
    defaultMessage: 'Repeat Frequency'
  }
});

const { Text } = Typography;

const columns = [
  {
    title: 'Task Description',
    dataIndex: 'Task_Description',
    key: 'Task Description',
    render: Task_Description => <div style={{ wordBreak: "break-all" }} >{Task_Description}</div>,

    width: '300px'
  },
  {
    title: 'Last Run',
    dataIndex: 'Last_Run',
    key: 'Last Run',
    disabled: true,
    hide: true,
    width: '150px',
    render: Last_Run => {
      let date = Last_Run
        ? (moment(new Date(Last_Run)).format('DD-MMM-YYYY') === "Invalid date" ? Last_Run : moment(new Date(Last_Run)).format('DD-MMM-YYYY'))
        : '';
      return <Text style={{ wordBreak: "break-all" }}>{date}</Text>;
    }
  },
  {
    title: 'Next Run',
    dataIndex: 'Next_Run',
    key: 'Next Run',
    width: '150px',
    disabled: true,
    render: Next_Run => {
      let date = Next_Run
        ? (moment(new Date(Next_Run)).format('DD-MMM-YYYY') === "Invalid date" ? Next_Run : moment(new Date(Next_Run)).format('DD-MMM-YYYY'))
        : '';
      return <Text style={{ wordBreak: "break-all" }}>{date}</Text>;
    }
  },
  {
    title: 'Schedule Type',
    dataIndex: 'Schedule_Type',
    render: Schedule_Type => <span style={{ wordBreak: "break-all" }} >{Schedule_Type}</span>,
    key: 'Schedule Type',
    width: '150px',
    hide: true,
    disabled: true
  },
  {
    title: 'Status',
    dataIndex: 'Status',
    key: 'Status',
    width: '100px',
    render: Status => <Text style={{ wordBreak: "break-all" }}>{Status}</Text>,
    disabled: true
  },
  {
    title: 'Repeat Frequency',
    dataIndex: 'Repeat_Frequency',
    render: Repeat_Frequency => <span style={{ wordBreak: "break-all" }} >{Repeat_Frequency}</span>,
    key: 'Repeat Frequency',
    disabled: true,
    width: '200px'
  }
];
class SystemTask extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    message.destroy()
  }
  componentDidMount() {
    message.destroy();
    this.props.updateDataTableActions({
      refresh: true,
      onRefresh: () => this.onRefresh()
    });
    this.props.fetchSystemTasks();
  }

  onRefresh = () => {
    this.props.getSystemTasks();
    this.props.fetchSystemTasks();
  };
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
    const { columnConfig, currentPage, pageSize } = this.state;
    const { formatMessage } = this.props;
    const messagesKeys = Object.keys(messages);
    const messagesValues = Object.values(messages);
    columns.forEach(c => {
      messagesKeys.forEach((mK, index) => {
        if (c.key === mK) {
          //ApiInfo.DEBUGER && console.log(messagesValues[index]);
          c.title = formatMessage(messagesValues[index]);
        }
      });
    });
    //ApiInfo.DEBUGER && console.log(columns);

    return (
      <div>
        <div /*style={{ ...style.paddingTop10 }}*/>
          <DataTableHeader
            openColumConfigDrawer={() => this.openColumConfigDrawer()}
            formatMessage={formatMessage}
            data={this.props.systemTasks}
            actions={{ noDelete: true }}
            noDelete
            currentPageSize={this.currentPageSize}
          />
          <Datatable
            closeColumConfigDrawer={() => this.closeColumConfigDrawer()}
            columnConfig={columnConfig}
            formatMessage={formatMessage}
            columns={columns}
            data={this.props.systemTasks}
            actions={{ noDelete: true }}
            noDelete
            coveredHeight={200}
            pageSize={pageSize || 20}
            currentPage={currentPage}
            currentPaginationSize={this.currentPaginationSize}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    systemTasks: state.SystemTasksReducer.systemTasks
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateDataTableActions: actions =>
      dispatch(updateDataTableActions(actions)),
    fetchSystemTasks: noMessage => dispatch(fetchSystemTasks(noMessage)),
    getSystemTasks: () => dispatch(getSystemTasks())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SystemTask);
