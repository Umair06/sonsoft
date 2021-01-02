import React, { Component } from 'react';
import DataTable from '../../../../Components/DataTable/DataTable';
import { connect } from 'react-redux';
import { updateDataTableActions } from '../../../../Redux/Actions/pageHeader/pageHeader';
import {
  fetchNotification,
  fetchSelectedNotification,
  deleteNotification
} from '../../../../Redux/Actions/NotificationAction/NotificationAction';
// import style from '../../../../styles';
import NotificationSideDrawer from '../../../../Components/Modal/Notification';
import { defineMessages } from 'react-intl';
import { Typography } from 'antd';
import DataTableHeader from "../../../../Components/DataTable/Component/DataTableHeader"


const { Text } = Typography;

const messages = defineMessages({
  'Notification Type': {
    id: 'notification_SeeAll.notificationType',
    defaultMessage: 'Notification Type'
  },
  To: {
    id: 'notification_SeeAll.to',
    defaultMessage: 'To'
  },
  Cc: {
    id: 'notification_SeeAll.cc',
    defaultMessage: 'Cc'
  }
});

const columns = [
  {
    title: 'Notification Type',
    dataIndex: 'notificationType',
    render: notificationType => <span style={{ wordBreak: "break-all" }} >{notificationType}</span>,
    width: 250
  },
  {
    title: 'To',
    dataIndex: 'to',
    render: to => <Text style={{ wordBreak: "break-all" }}>{to}</Text>,
    width: 300
  },
  {
    title: 'Cc',
    dataIndex: 'cc',
    render: cc => <Text style={{ wordBreak: "break-all" }}>{cc}</Text>,

    width: 300
  }
];

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {}
    };
  }

  openDrawer = (Drawer, values) => {
    if (values) {
      this.props.fetchSelectedNotification(values);
    }
    this.setState({
      [Drawer]: true,
      values
    });
  };

  onClose = Drawer => {
    this.setState({
      [Drawer]: false,
      values: undefined
    });
  };
  Delete = val => {
    this.props.deleteNotification(val);
  };
  componentDidMount() {
    this.props.fetchNotification();
    this.props.updateDataTableActions({});
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

  currentPaginationSize = (page) => {
    this.setState({ currentPage: page })
  }
  currentPageSize = (value) => {
    this.setState({ pageSize: value })
  }
  render() {
    const { notificationSideDrawer, values, columnConfig, deleteRecord, deleteDrawer, currentPage, pageSize } = this.state;

    const { formatMessage } = this.props;
    const messagesKeys = Object.keys(messages);
    const messagesValues = Object.values(messages);
    columns.forEach(c => {
      messagesKeys.forEach((mK, index) => {
        if (c.key === mK) {
          c.title = formatMessage(messagesValues[index]);
        }
      });
    });

    return (
      <div /*style={{ ...style.paddingTop10 }}*/>
        {
          <NotificationSideDrawer
            formatMessage={formatMessage}
            notificationSideDrawer={notificationSideDrawer}
            close={() => this.onClose('notificationSideDrawer')}
            values={values}
          />
        }
        <DataTableHeader
          openDeleteDrawer={(record) => this.openDeleteDrawer(record)}
          openColumConfigDrawer={() => this.openColumConfigDrawer()}
          formatMessage={formatMessage}
          openDrawer={values =>
            this.openDrawer('notificationSideDrawer', values)
          }
          actionDropdown
          data={this.props.notificationlist}
          add
          currentPageSize={this.currentPageSize}

        />
        <DataTable
          openDeleteDrawer={(record) => this.openDeleteDrawer(record)}
          deleteRecord={deleteRecord}
          deleteDrawer={deleteDrawer}
          closeDeleteDrawer={() => this.closeDeleteDrawer()}
          closeColumConfigDrawer={() => this.closeColumConfigDrawer()}
          columnConfig={columnConfig}
          formatMessage={formatMessage}
          openDrawer={values =>
            this.openDrawer('notificationSideDrawer', values)
          }
          actionDropdown
          Delete={text => this.Delete(text)}
          data={this.props.notificationlist}
          columns={columns}
          pagination
          addEditColumn
          add
          keyID="id"
          seperator="Notification"
          coveredHeight={200}
          pageSize={pageSize || 20}
          currentPage={currentPage}
          currentPaginationSize={this.currentPaginationSize}
        ></DataTable>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    notificationdropdownlist:
      state.NotificationReducer.notificationdropdownlist,
    selectednotification: state.NotificationReducer.selectednotification,
    notificationlist: state.NotificationReducer.notificationlist
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateDataTableActions: actions => dispatch(updateDataTableActions(actions)),
    fetchNotification: () => dispatch(fetchNotification()),
    fetchSelectedNotification: data => dispatch(fetchSelectedNotification(data)),
    deleteNotification: data => dispatch(deleteNotification(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification);
