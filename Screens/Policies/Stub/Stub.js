import React, { Component } from 'react';
import DataTable from "../../../Components/DataTable/DataTable";
import { Icon, message } from "antd";
import StubSideDrawer from "../../../Components/Modal/StubPolicy";
import StubPolicySettingSideDrawer from "../../../Components/Modal/StubPolicySetting"
import { connect } from "react-redux";
import { updateDataTableActions } from "../../../Redux/Actions/pageHeader/pageHeader";
import { fetchStubPolicy, DeleteStubPolicy, EnableDisableStubStatus, UpdateStubPriority } from "../../../Redux/Actions/Policies/StubPolicyAction"
// import styles from '../../../../styles';
// import CollapseAbleHeader from "../../../../Components/CollapseAbleHeader/CollapseAbleHeader";
// import { PrimaryButton, SecondryButton } from "../../../../Components/Button/Button";
import { defineMessages } from 'react-intl';
import DataTableHeader from "../../../Components/DataTable/Component/DataTableHeader"


const messages = defineMessages({
  'Name': {
    id: "stub.name",
    defaultMessage: "Name",
  },
  'Description': {
    id: "stub.description",
    defaultMessage: "Description"
  },
  'Priority': {
    id: "stub.priority",
    defaultMessage: "Priority"
  },
  'Stub Period': {
    id: "stub.stubPeriod",
    defaultMessage: "Stub Period"
  },
  'Enabled': {
    id: "stub.enabled",
    defaultMessage: "Enabled"
  },
})


const columns = [
  {
    title: 'Name',
    dataIndex: 'STUB_POLICY_NAME',
    render: STUB_POLICY_NAME => <span style={{ wordBreak: "break-all" }} >{STUB_POLICY_NAME}</span>,
    width: 150
  },
  {
    title: 'Description',
    dataIndex: 'STUB_POLICY_DESC',
    render: STUB_POLICY_DESC => <span style={{ wordBreak: "break-all" }} >{STUB_POLICY_DESC}</span>,
    disabled: true,
    width: 350
  },
  {
    title: 'Priority',
    dataIndex: 'STUB_PRIORITY',
    render: STUB_PRIORITY => <span style={{ wordBreak: "break-all" }} >{STUB_PRIORITY}</span>,
    disabled: true,
    width: 150

  },
  {
    title: 'Stub Period',
    dataIndex: 'STUB_PERIOD',
    render: STUB_PERIOD => <span style={{ wordBreak: "break-all" }} >{STUB_PERIOD}</span>,
    disabled: true,
    width: 200
  },
  {
    title: 'Enabled',
    dataIndex: 'IS_ACTIVE',
    render: (record) => record ? <Icon type="check" /> : <Icon type="close" />,
    disabled: true,
    width: 150
  },
];

class Stub extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 1,
    };
    message.destroy()
  }

  onChange = e => {
    this.setState({
      value: e.target.value,
    });
  };
  openDrawer = (Drawer, values) => {
    this.setState({
      stubSideDrawer: false,
      stubPolicySetting: false,
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
    if (key === '1') {
      this.props.updateDataTableActions({ setting: true, settingOpenDrawer: () => this.openDrawer('stubPolicySetting') })
    }
  }
  Delete = (values) => {
    this.props.DeleteStubPolicy(values)
  }
  componentDidMount() {
    this.callBack('1')
    this.props.fetchStubPolicy()
  }
  stubStatus = (value, IS_Enable) => {
    value.Enable = IS_Enable
    this.props.EnableDisableStubStatus(value)
  }
  applyPriority = (draggedRow, hoveredRow) => {
    let APIBody = { "stubInfo": [{ "priority": draggedRow.record.STUB_PRIORITY, "stubId": hoveredRow.record.STUB_POLICY_ID }, { "priority": hoveredRow.record.STUB_PRIORITY, "stubId": draggedRow.record.STUB_POLICY_ID }] }
    this.props.UpdateStubPriority(APIBody)
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
    this.props.updateDataTableActions({ setting: false })
  }
  render() {
    const { stubSideDrawer, stubPolicySetting, values, columnConfig, deleteRecord, deleteDrawer } = this.state
    // this.props.updateDataTableActions({setting:true,settingOpenDrawer: () => this.openDrawer('stubPolicySetting')})
    const { formatMessage } = this.props;
    const messagesKeys = Object.keys(messages);
    const messagesValues = Object.values(messages);
    columns.forEach((c) => {
      messagesKeys.forEach((mK, index) => {
        if (c.key === mK) {
          //ApiInfo.DEBUGER && console.log(messagesValues[index]);
          c.title = formatMessage(messagesValues[index]);
        }
      })
    })

    return (
      <div>
        {(<StubPolicySettingSideDrawer formatMessage={formatMessage} stubPolicySetting={stubPolicySetting} close={() => this.onClose('stubPolicySetting')} />)}
        {(<StubSideDrawer formatMessage={formatMessage} stubSideDrawer={stubSideDrawer} close={() => this.onClose('stubSideDrawer')} values={values} />)}

        <div /*style={{ paddingTop: 10 }}*/>
          <DataTableHeader
            openDeleteDrawer={(record) => this.openDeleteDrawer(record)}
            openColumConfigDrawer={() => this.openColumConfigDrawer()}
            formatMessage={formatMessage} openDrawer={(values) => this.openDrawer('stubSideDrawer', values)} changeStatus={(value, IS_Active) => this.stubStatus(value, IS_Active)} data={this.props.stubpolicy} add={true} actionDropdown actions={{ syncStatus: false, status: true, archivePublicFolder: false, stubEnable: false, stubPeriod: false, enabled: false, activate: false }}
          />
          <DataTable openDeleteDrawer={(record) => this.openDeleteDrawer(record)}
            deleteRecord={deleteRecord}
            deleteDrawer={deleteDrawer}
            closeDeleteDrawer={() => this.closeDeleteDrawer()}
            closeColumConfigDrawer={() => this.closeColumConfigDrawer()}
            columnConfig={columnConfig}
            keyID="STUB_POLICY_ID" formatMessage={formatMessage} openDrawer={(values) => this.openDrawer('stubSideDrawer', values)} dragging={true} Delete={(values) => this.Delete(values)} changeStatus={(value, IS_Active) => this.stubStatus(value, IS_Active)} applyPriority={(draggedRow, hoveredRow) => this.applyPriority(draggedRow, hoveredRow)} columns={columns} data={this.props.stubpolicy} addEditColumn add={true} enbDis={true} actionDropdown actions={{ syncStatus: false, status: true, archivePublicFolder: false, stubEnable: false, stubPeriod: false, enabled: false, activate: false }} coveredHeight={200} />
        </div>

      </div>
    )
  }
};

const mapStateToProps = state => {
  return {
    stubpolicy: state.StubPolicyReducer.stubpolicy
  }
};

const mapDispatchToProps = dispatch => {
  return {
    updateDataTableActions: actions => dispatch(updateDataTableActions(actions)),
    fetchStubPolicy: () => dispatch(fetchStubPolicy()),
    DeleteStubPolicy: (data) => dispatch(DeleteStubPolicy(data)),
    EnableDisableStubStatus: (data) => dispatch(EnableDisableStubStatus(data)),
    UpdateStubPriority: data => dispatch(UpdateStubPriority(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stub);
