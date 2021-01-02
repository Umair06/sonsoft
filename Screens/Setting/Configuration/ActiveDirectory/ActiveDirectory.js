import React, { Component } from "react";
import { Icon, message } from "antd";
import { connect } from "react-redux";
import { defineMessages } from "react-intl";
// import style from "../../../../styles";
import DataTable from "../../../../Components/DataTable/DataTable";
import ActiveDirectoryDrawer from "../../../../Components/Modal/adSetting";
import { updateDataTableActions } from "../../../../Redux/Actions/pageHeader/pageHeader";
import {
  fetchActiveDirectoryList,
  updateActiveDirectoryUserStatus,
  deleteActiveDirectory,
} from "../../../../Redux/Actions/ConfigurationAction/ActiveDirectoryAction";

import DataTableHeader from "../../../../Components/DataTable/Component/DataTableHeader"


const messages = defineMessages({
  Domain: {
    id: "activeDirectory.domain",
    defaultMessage: "Domain"
  },
  "User Name": {
    id: "activeDirectory.userName",
    defaultMessage: "Last"
  },
  "Sync Status": {
    id: "activeDirectory.syncStatus",
    defaultMessage: "Sync Status"
  }
});

const columns = [
  {
    title: "Domain",
    dataIndex: "AD_DOMAIN_PATH",
    render: AD_DOMAIN_PATH => <span style={{ wordBreak: "break-all" }} >{AD_DOMAIN_PATH}</span>,
    width: 250,
  },
  {
    title: "User Name",
    dataIndex: "AD_USER_NAME",
    render: AD_USER_NAME => <span style={{ wordBreak: "break-all" }} >{AD_USER_NAME}</span>,
    width: 350
  },
  {
    title: "Sync Status",
    dataIndex: "IS_ACTIVE",
    render: IS_ACTIVE =>
      IS_ACTIVE ? <Icon type="check"></Icon> : <Icon type="close"></Icon>,
    width: 150
  },
];


class ActiveDirectory extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    message.destroy() // remove last appeared message box
  }

  componentDidMount() {
    this.props.fetchActiveDirectoryList()// whenever user re-navigates to AD screen they experienced updated data
    this.props.updateDataTableActions({}); // to remove all the previous action button on page-header
  }

  static getDerivedStateFromProps(props) {
    !props.activeDirectory && props.fetchActiveDirectoryList(); //if no Active-Directory list in redux then call the API
    return null;
  }
  openDrawer = (isDrawerOpen, record) => {
    this.setState({
      [isDrawerOpen]: true,
      record
    });
  };
  closeDrawer = isDrawerClose => {
    this.setState({
      [isDrawerClose]: false
    });
  };
  changeADStatus = (records, isActive) => {
    try {
      let toBeChangeRecords = [];
      if (records && Array.isArray(records) && records.length) {
        records.forEach(rec => toBeChangeRecords.push(rec.AD_ID))
        let APIBody = {
          adId: toBeChangeRecords,
          status: isActive
        }
        this.props.updateActiveDirectoryUserStatus(APIBody);
      }
    } catch (e) { }
  };
  deleteADRecords = (records) => {
    let dataToBeDeleted = [];
    if (records) {
      if (Array.isArray(records)) {
        records.forEach(rec => rec.AD_ID && dataToBeDeleted.push(rec.AD_ID))
      } else {
        if (records.AD_ID) dataToBeDeleted.push(records.AD_ID);
      }
    }
    dataToBeDeleted = { adId: dataToBeDeleted };
    this.props.deleteActiveDirectory(dataToBeDeleted);
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
    const { activeDirectoryDrawer, record, columnConfig, deleteRecord, deleteDrawer, currentPage, pageSize } = this.state;
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
      <div>
        <ActiveDirectoryDrawer
          formatMessage={formatMessage}
          activeDirectoryDrawer={activeDirectoryDrawer}
          close={() => this.closeDrawer("activeDirectoryDrawer")}
          values={record}
        />
        <DataTableHeader
          openDeleteDrawer={(record) => this.openDeleteDrawer(record)}
          openColumConfigDrawer={() => this.openColumConfigDrawer()}
          formatMessage={formatMessage}
          openDrawer={record =>
            this.openDrawer("activeDirectoryDrawer", record)
          }
          data={this.props.activeDirectory}
          add={true}
          actionDropdown
          actions={{ status: true }}
          changeStatus={(records, isActive) =>
            this.changeADStatus(records, isActive)
          }
          currentPageSize={this.currentPageSize}
        />
        <div /*style={{ ...style.paddingTop10 }}*/>
          <DataTable
            openDeleteDrawer={(record) => this.openDeleteDrawer(record)}
            deleteRecord={deleteRecord}
            deleteDrawer={deleteDrawer}
            closeDeleteDrawer={() => this.closeDeleteDrawer()}
            closeColumConfigDrawer={() => this.closeColumConfigDrawer()}
            columnConfig={columnConfig}
            formatMessage={formatMessage}
            enbDis
            openDrawer={record =>
              this.openDrawer("activeDirectoryDrawer", record)
            }
            keyID="AD_ID"
            Delete={(records) => this.deleteADRecords(records)}
            columns={columns}
            data={this.props.activeDirectory}
            addEditColumn={true}
            add={true}
            actionDropdown
            coveredHeight={200}
            actions={{ status: true }}
            changeStatus={(records, isActive) =>
              this.changeADStatus(records, isActive)
            }
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
    activeDirectory: state.ConfigurationReducer.activeDirectory
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updateDataTableActions: actions => dispatch(updateDataTableActions(actions)),
    fetchActiveDirectoryList: () => dispatch(fetchActiveDirectoryList()),
    updateActiveDirectoryUserStatus: data => dispatch(updateActiveDirectoryUserStatus(data)),
    deleteActiveDirectory: data => dispatch(deleteActiveDirectory(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveDirectory);