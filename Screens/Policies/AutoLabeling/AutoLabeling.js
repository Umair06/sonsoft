import React, { Component } from 'react';
import { Tabs, message } from 'antd';
import GlobalLabels from "./GlobalLabels/GlobalLabels";
import CaseLabels from "./CaseLabels/CaseLabels";
import { connect } from "react-redux";
import { updateDataTableActions } from "../../../Redux/Actions/pageHeader/pageHeader";
import { fetchAutoLabels, postAutoLabels, deleteAutoLabel, editAutoLabels } from "../../../Redux/Actions/Policies/AutoLabelingAction"
import { resetSelectedRecords } from "../../../Redux/Actions/updateSelectedRecordsAction/updateSelectedRecordsAction";
import { defineMessages } from 'react-intl';
import style from '../../../styles';
// import * as ApiInfo from "../../../../APIConfig/ApiParameters"
import DataTableHeader from "../../../Components/DataTable/Component/DataTableHeader"
import { activeOrDeActiveDocs } from '../../../Redux/Actions/Policies/AutoLabelingAction';

const messages = defineMessages({
  'Global Labels': {
    id: "AutoLabeling.GlobalLabels",
    defaultMessage: "Global Labels",
  },
  'Case Labels': {
    id: "AutoLabeling.CaseLabels",
    defaultMessage: "Case Labels"
  },
})
const { TabPane } = Tabs;

class AutoLabeling extends Component {
  constructor(props) {
    super(props)
    this.state = {
      labelTab: "1",
      labelType: 'G'
    };
    message.destroy()
  };

  componentDidMount() {
    this.props.updateDataTableActions({})
  }

  changeTab = (labelTab) => {
    this.props.resetSelectedRecords && this.props.resetSelectedRecords();
    this.setState({
      labelTab,
      labelType: labelTab.includes(1) ? "G" : "L"
    })
  }
  openDrawer = (Drawer, values) => {
    this.setState({
      [Drawer]: true,
      values
    })
  }
  onClose = (Drawer) => {
    this.setState({
      [Drawer]: false
    })
  }
  openColumConfigDrawer = () => {
    const { labelTab } = this.state;
    if (labelTab === "1") {
      this.setState({
        GlobalLabelColumnConfig: true
      })
    } else {
      this.setState({
        LegalLabelColumnConfig: true
      })
    }
  };

  closeColumConfigDrawer = () => {
    const { labelTab } = this.state;
    if (labelTab === "1") {
      this.setState({
        GlobalLabelColumnConfig: false
      })
    } else {
      this.setState({
        LegalLabelColumnConfig: false
      })
    }
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
  getDocumentFromDataTable = (selectedRows, documentStatusInBool, labelType) => {
    const idsArray = []
    const getStatus = documentStatusInBool ? 1 : 0
    selectedRows.map(el => idsArray.push(el.FILTER_ID))
    this.props.activeOrDeActiveDocs(idsArray, getStatus, labelType)
    this.props.resetSelectedRecords && this.props.resetSelectedRecords();
  }
  currentPaginationSize = (page) => {
    const { labelTab } = this.state
    if (labelTab === "2") {
      this.setState({ currentPageLegal: page })
    } else {
      this.setState({ currentPageGlobal: page })
    }
  }
  currentPageSize = (value) => {
    const { labelTab } = this.state
    if (labelTab === "2") {
      this.setState({ pageSizeLegal: value })
    } else {
      this.setState({ pageSizeGlobal: value })
    }
  }
  render() {
    const { formatMessage } = this.props;
    const { labelTab, LegalLabelColumnConfig, GlobalLabelColumnConfig, deleteRecord, deleteDrawer, LabelModal, values, currentPageLegal, currentPageGlobal, pageSizeLegal, pageSizeGlobal } = this.state;

    return (
      <div className="card-container">
        {/* {labelTab === "1" && <DataTableHeader
          openDeleteDrawer={(record) => this.openDeleteDrawer(record)}
          openColumConfigDrawer={() => this.openColumConfigDrawer()}
          formatMessage={formatMessage}
          actionDropdown 
          enbDis
          data={this.props.globalAutoLabels}
          openDrawer={(values) => this.openDrawer('LabelModal', values)}
          add
          actions={{ syncStatus: false, status: false, archivePublicFolder: false, stubEnable: false, stubPeriod: false, enabled: false, activate: true }}
        />} */}
        {<DataTableHeader
          openDeleteDrawer={(record) => this.openDeleteDrawer(record)}
          openColumConfigDrawer={() => this.openColumConfigDrawer()}
          formatMessage={formatMessage}
          actionDropdown
          data={labelTab === "2" ? this.props.legalHoldAutoLabels : this.props.globalAutoLabels}
          onActive={(selectedRows, booleanValue) => this.getDocumentFromDataTable(selectedRows, booleanValue, labelTab === "2" ? "L" : "G")}
          openDrawer={(values) => this.openDrawer('LabelModal', values)}
          add
          actions={{ activate: true }}
          currentPageSize={this.currentPageSize}

        />}
        <Tabs type="card" tabBarStyle={{ ...style.tabs.tabBar }} onChange={this.changeTab} >
          {/* <Tabs defaultActiveKey="1" onChange={callback}> */}
          <TabPane tab={formatMessage(messages["Global Labels"])} key="1">
            <GlobalLabels LabelModal={LabelModal} onClose={() => this.onClose('LabelModal')}
              openDrawer={(values) => this.openDrawer('LabelModal', values)} closeColumConfigDrawer={() => this.closeColumConfigDrawer()} deleteDrawer={deleteDrawer} deleteRecord={deleteRecord} columnConfig={GlobalLabelColumnConfig} formatMessage={formatMessage} editAutoLabels={APIBody => this.props.editAutoLabels(APIBody)} deleteAutoLabel={(filterId, labelType) => this.props.deleteAutoLabel(filterId, labelType)} fetchAutoLabels={labelType => this.props.fetchAutoLabels(labelType)} postAutoLabels={APIBody => this.props.postAutoLabels(APIBody)} values={values}
              closeDeleteDrawer={() => this.closeDeleteDrawer()} openDeleteDrawer={(record) => this.openDeleteDrawer(record)}
              pageSize={pageSizeGlobal || 20}
              currentPage={currentPageGlobal}
              currentPaginationSize={this.currentPaginationSize}
              labelType={this.state.labelType}
            />
          </TabPane>

          <TabPane tab={"Legal Hold Labels"} key="2">
            <CaseLabels
              LabelModal={LabelModal}
              onClose={() => this.onClose('LabelModal')}
              openDrawer={(values) => this.openDrawer('LabelModal', values)}
              closeColumConfigDrawer={() => this.closeColumConfigDrawer()} deleteDrawer={deleteDrawer} deleteRecord={deleteRecord} columnConfig={LegalLabelColumnConfig} formatMessage={formatMessage} editAutoLabels={APIBody => this.props.editAutoLabels(APIBody)} deleteAutoLabel={(filterId, labelType) => this.props.deleteAutoLabel(filterId, labelType)} fetchAutoLabels={labelType => this.props.fetchAutoLabels(labelType)} postAutoLabels={APIBody => this.props.postAutoLabels(APIBody)} values={values} closeDeleteDrawer={() => this.closeDeleteDrawer()} openDeleteDrawer={(record) => this.openDeleteDrawer(record)}
              pageSize={pageSizeLegal || 20}
              currentPage={currentPageLegal}
              currentPaginationSize={this.currentPaginationSize}
              labelType={this.state.labelType}
            />
          </TabPane>

        </Tabs>
      </div>
    )
  }
};

const mapStateToProps = state => {
  return {
    legalHoldAutoLabels: state.AutoLabelingReducer.legalHoldAutoLabels,
    globalAutoLabels: state.AutoLabelingReducer.globalAutoLabels

  }
};

const mapDispatchToProps = dispatch => {
  return {
    updateDataTableActions: actions => dispatch(updateDataTableActions(actions)),
    fetchAutoLabels: labelType => dispatch(fetchAutoLabels(labelType)),
    postAutoLabels: APIBody => dispatch(postAutoLabels(APIBody)),
    deleteAutoLabel: (filterId, labelType) => dispatch(deleteAutoLabel(filterId, labelType)),
    editAutoLabels: APIBody => dispatch(editAutoLabels(APIBody)),
    activeOrDeActiveDocs: (arrayIds, status, filterType) => dispatch(activeOrDeActiveDocs(arrayIds, status, filterType)),
    resetSelectedRecords: () => dispatch(resetSelectedRecords())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AutoLabeling);