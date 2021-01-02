
import React, { Component } from 'react';
import { Tabs, message } from 'antd';
import Deletion from './Deletion/Deletion';
import Policy from './Policy/Policy';
import ExpiryDocument from './ExpiryDocument/ExpiryDocument';
import RetentionPolicySettingSideDrawer from '../../../Components/Modal/RetentionPolicySetting';
import { connect } from 'react-redux';
import { updateDataTableActions } from '../../../Redux/Actions/pageHeader/pageHeader';
import {  updateRowActions } from "../../../Redux/Actions/ActionRowAction/ActionRowAction";

import {
  fetchRetentionPolicyList,
  fetchDefaultRetentionPolicyList,
  SaveDeletedDocument,
  DeletedDocument
} from "../../../Redux/Actions/Policies/RetentionPolicyAction";
import { version } from "../../../APIConfig/Config";
import { defineMessages } from "react-intl";
import style from "../../../styles";
import DataTableHeader from "../../../Components/DataTable/Component/DataTableHeader"


const messages = defineMessages({
  Policy: {
    id: "Retention.Policy",
    defaultMessage: "Policy"
  },
  "Expiring Document": {
    id: "Retention.ExpiringDocument",
    defaultMessage: "Expiring Document"
  },
  Deletion: {
    id: "Retention.Deletion",
    defaultMessage: "Deletion"
  }
});

const { TabPane } = Tabs;

class Retention extends Component {
  constructor(props) {
    super(props);
    this.state = { 
    };
    message.destroy();
  }
  callBack = key => {
    if (key === "1") {
      this.props.updateDataTableActions({
        setting: false,
        settingOpenDrawer: () => this.openDrawer("retentionPolicySetting")
       
      });
      this.props.updateRowActions(true);

    }
    if (key === "2") {
      this.props.updateDataTableActions({});
      this.props.updateRowActions(true);
    }
    if (key === "3") {
      this.props.updateDataTableActions({
        save: true,
        saveValues: () => this.onSave(),
        cancel: true
        // cancelFunction: () => this.handleReset()
      });
      this.props.updateRowActions(false);
    }
    this.setState({
      tabActive:key
    })
  };
  componentDidMount() {
    this.callBack("1");
    this.props.fetchDefaultRetentionPolicyList();
  }
  onSave = () => {
    this.props.SaveDeletedDocument(this.state.deletionData);
  };

  // onDelete = () => {
  //   this.props.DeletedDocument(this.props.deleteddocumentdata)
  // }
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
  openColumConfigDrawer = () => {
    console.log('openColumConfigDrawer Chala')
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
  getDeletionData = deletionData => {
    this.setState({ deletionData });
  };
  componentWillUnmount() {
    this.props.updateRowActions(false);

}
  render() {
    const { retentionPolicySetting, openAddForm, values, columnConfig, deleteRecord, deleteDrawer, tabActive} = this.state;
    const { formatMessage } = this.props;
    return (
      <div className='card-container'>
        {<RetentionPolicySettingSideDrawer formatMessage={formatMessage} retentionPolicySetting={retentionPolicySetting} close={() => this.onClose('retentionPolicySetting')} />}
        {tabActive === "1" && <DataTableHeader
          needSettingIcon={true}
          openDeleteDrawer={(record) => this.openDeleteDrawer(record)}
          openColumConfigDrawer={() => this.openColumConfigDrawer()}
          formatMessage={formatMessage} actionDropdown={true} data={this.props.defaultretention} add={true} openDrawer={(values) => this.openDrawer('openAddForm', values)} changeStatus={(data, IS_ACTIVE) => this.changeStatus && this.changeStatus(data, IS_ACTIVE)} actions={{ syncStatus: false, status: true, archivePublicFolder: false, stubEnable: false, stubPeriod: false, enabled: false, activate: false }}
        />}
          {tabActive === "2" &&  <DataTableHeader
            openDeleteDrawer={(record) => this.openDeleteDrawer(record)}
            openColumConfigDrawer={() => this.openColumConfigDrawer()}
            formatMessage={formatMessage} height={"50vh"} data={this.props.policyData} noCustomizeColumn={true} actions={{ syncStatus: false, status: false, archivePublicFolder: false, stubEnable: false, stubPeriod: false, enabled: false, activate: false }}
          />}
        {/* <Tabs defaultActiveKey="1" onChange={this.callBack}> */}
        <Tabs
          type="card"
          tabBarStyle={{ ...style.tabs.tabBar }}
          onChange={this.callBack}
        >
          <TabPane tab={formatMessage(messages["Policy"])} key="1">
            <Policy
            onClose={() => this.onClose('openAddForm')}
              openAddForm={openAddForm} values={values} columnConfig={columnConfig} deleteRecord={deleteRecord} deleteDrawer={deleteDrawer}
              closeDeleteDrawer={() => this.closeDeleteDrawer()}
              closeColumConfigDrawer={() => this.closeColumConfigDrawer()}
              openDeleteDrawer={(record) => this.openDeleteDrawer(record)}
              openDrawer={(values) => this.openDrawer('openAddForm', values)}
              formatMessage={formatMessage}
              retentiondata={this.props.defaultretention}
            />
          </TabPane>
          {version > 7.2 && (
            <TabPane tab="Expiring Documents" key="2">
              <ExpiryDocument
                formatMessage={formatMessage}
                policyData={this.props.retention}
              />
            </TabPane>
          )}
          <TabPane tab={formatMessage(messages["Deletion"])} key="3">
            <Deletion
              getDeletionData={this.getDeletionData}
              formatMessage={formatMessage}
            />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    retention:
      state.RetentionPolicyReducer && state.RetentionPolicyReducer.retention,
    defaultretention: state.RetentionPolicyReducer && state.RetentionPolicyReducer.defaultretention &&
      state.RetentionPolicyReducer &&
      state.RetentionPolicyReducer.retention &&
      state.RetentionPolicyReducer.defaultretention.concat(
        state.RetentionPolicyReducer.retention
      ),
    // retention: state.RetentionPolicyReducer.retention,
    deleteddocumentdata: state.RetentionPolicyReducer.deleteddocumentdata
    // success: state.RoleManagementReducer.success,
    // error: state.RoleManagementReducer.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateDataTableActions: actions =>
      dispatch(updateDataTableActions(actions)),
      updateRowActions: actions => dispatch(updateRowActions(actions)),
    fetchRetentionPolicyList: () => dispatch(fetchRetentionPolicyList()),
    fetchDefaultRetentionPolicyList: () =>
      dispatch(fetchDefaultRetentionPolicyList()),
    SaveDeletedDocument: data => dispatch(SaveDeletedDocument(data)),
    DeletedDocument: data => dispatch(DeletedDocument(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Retention);
