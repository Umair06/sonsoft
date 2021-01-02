import React, { Component } from 'react'
import DataTable from "../../../../Components/DataTable/DataTable";
import RetentionDrawer from "../../../../Components/Modal/Retention";
import { Icon, message } from "antd";
import { defineMessages } from 'react-intl';
import { connect } from "react-redux";

import { deleteRetentionPolicy, fetchRetentionPolicyById, updateRetentionPolicyStatus, updateRetentionPolicyPriority } from "../../../../Redux/Actions/Policies/RetentionPolicyAction"
// import DataTableHeader from "../../../../Components/DataTable/Component/DataTableHeader"

const messages = defineMessages({
  'Name': {
    id: "policy.name",
    defaultMessage: "Name",
  },
  'Priority': {
    id: "policy.priority",
    defaultMessage: "Priority"
  },
  'Retention Period (Days)': {
    id: "policy.retentionPeriod",
    defaultMessage: "Retention Period (Days)"
  },
  'Retention Grace Period (Days)': {
    id: "policy.retentionGracePeriod",
    defaultMessage: "Retention Grace Period (Days)"
  },
  'Status': {
    id: "policy.status",
    defaultMessage: "Status"
  },
})

const columns = [
  {
    title: 'Name',
    dataIndex: 'FILTER_NAME',
    render: FILTER_NAME => <span style={{ wordBreak: "break-all" }} >{FILTER_NAME}</span>,
    width: 200
  },
  {
    title: 'Priority',
    dataIndex: 'PRIORITY',
    render: PRIORITY => <span style={{ wordBreak: "break-all" }} >{PRIORITY}</span>,
    disabled: true,
    width: 100
  },
  {
    title: 'Retention Period (Days)',
    dataIndex: 'RETENTION_PERIOD',
    render: RETENTION_PERIOD => <span style={{ wordBreak: "break-all" }} >{RETENTION_PERIOD}</span>,
    disabled: true,
    width: 150
  },
  {
    title: 'Retention Grace Period (Days)',
    dataIndex: 'RETENTION_GRACE_PERIOD',
    render: RETENTION_GRACE_PERIOD => <span style={{ wordBreak: "break-all" }} >{RETENTION_GRACE_PERIOD}</span>,
    disabled: true,
    width: 150
  },
  {
    title: 'Status',
    render: rec => <Icon type={rec.IS_ACTIVE ? 'check' : 'close'} />,
    disabled: true,
    width: 100
  }
]

class Policy extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    message.destroy()
  }
  // openDrawer = (Drawer, values) => {
  //   this.setState({
  //     [Drawer]: true,
  //     values
  //   })
  // }
  // onClose = Drawer => {
  //   this.setState({
  //     [Drawer]: false
  //   })
  // }
  Delete = (values) => {
    if (Array.isArray(values)) {
      this.props.deleteRetentionPolicy(values)
    } else {
      let selectedRecord = [values]
      this.props.deleteRetentionPolicy(selectedRecord)
    }
  }
  changeStatus = (data, IS_ACTIVE) => {
    data.Enable = IS_ACTIVE && String(IS_ACTIVE);
    this.props.updateRetentionPolicyStatus(data)
  }
  applyPriority = (draggedRow, hoveredRow) => {
    let APIBody = { "retentionInfo": [{ "priority": draggedRow.record.PRIORITY, "filterSiteID": hoveredRow.record.FILTER_ID }, { "priority": hoveredRow.record.PRIORITY, "filterSiteID": draggedRow.record.FILTER_ID }] }
    this.props.updateRetentionPolicyPriority(APIBody)
  }
  // openColumConfigDrawer = () => {
  //   console.log('openColumConfigDrawer Chala')
  //   this.setState({
  //     columnConfig: true
  //   })
  // };

  // closeColumConfigDrawer = () => {
  //   this.setState({
  //     columnConfig: false
  //   })
  // };
  // openDeleteDrawer = record => {
  //   this.setState({
  //     deleteDrawer: true,
  //     deleteRecord: record
  //   })
  // }
  // closeDeleteDrawer = () => {
  //   this.setState({
  //     deleteDrawer: false,
  //     deleteRecord: undefined
  //   })
  // }

  render() {
    // const { } = this.state;
    const { openAddForm, formatMessage, values, columnConfig, deleteRecord, deleteDrawer } = this.props;
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
      <div >
        <RetentionDrawer formatMessage={formatMessage} openAddForm={openAddForm} close={this.props.onClose} values={values} />
        {/* <DataTableHeader
          openDeleteDrawer={(record) => this.openDeleteDrawer(record)}
          openColumConfigDrawer={() => this.openColumConfigDrawer()}
         formatMessage={formatMessage} actionDropdown={true} data={this.props.retentiondata} add={true} openDrawer={(values) => this.openDrawer('openAddForm', values)} changeStatus={(data, IS_ACTIVE) => this.changeStatus(data, IS_ACTIVE)} actions={{ syncStatus: false, status: true, archivePublicFolder: false, stubEnable: false, stubPeriod: false, enabled: false, activate: false }} 
        /> */}

        <DataTable
          openDeleteDrawer={this.props.openDeleteDrawer}
          deleteRecord={deleteRecord}
          deleteDrawer={deleteDrawer}
          closeDeleteDrawer={this.props.closeDeleteDrawer}
          closeColumConfigDrawer={this.props.closeColumConfigDrawer}
          columnConfig={columnConfig}
          keyID="FILTER_ID"
          seperator="retention"
          formatMessage={formatMessage}
          actionDropdown={true}
          enbDis={true}
          columns={columns}
          dragging={true}
          data={this.props.retentiondata}
          add={true}
          addEditColumn={true}
          openDrawer={this.props.openDrawer}
          applyPriority={(draggedRow, hoveredRow) => this.applyPriority(draggedRow, hoveredRow)}
          Delete={(values) => this.Delete(values)}
          changeStatus={(data, IS_ACTIVE) => this.changeStatus(data, IS_ACTIVE)}
          actions={{ status: true }}
          coveredHeight={260}
        />
      </div>
    )
  }
};
const mapStateToProps = state => {
  return {

  }
};

const mapDispatchToProps = dispatch => {
  return {
    deleteRetentionPolicy: (data) => dispatch(deleteRetentionPolicy(data)),
    fetchRetentionPolicyById: (data) => dispatch(fetchRetentionPolicyById(data)),
    updateRetentionPolicyStatus: (data) => dispatch(updateRetentionPolicyStatus(data)),
    updateRetentionPolicyPriority: (data) => dispatch(updateRetentionPolicyPriority(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Policy);
