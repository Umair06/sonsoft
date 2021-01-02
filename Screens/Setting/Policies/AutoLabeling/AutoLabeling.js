import React, { Component } from 'react';
import { Tabs, message } from 'antd';
import GlobalLabels from "./GlobalLabels/GlobalLabels";
import CaseLabels from "./CaseLabels/CaseLabels";
import { connect } from "react-redux";
import { updateDataTableActions } from "../../../../Redux/Actions/pageHeader/pageHeader";
import { fetchAutoLabels, postAutoLabels, deleteAutoLabel, editAutoLabels } from "../../../../Redux/Actions/Policies/AutoLabelingAction"
import { resetSelectedRecords } from "../../../../Redux/Actions/updateSelectedRecordsAction/updateSelectedRecordsAction";
import { defineMessages } from 'react-intl';
import style from '../../../../styles';
// import * as ApiInfo from "../../../../APIConfig/ApiParameters"



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
    this.state = {};
    message.destroy()
  };

  componentDidMount() {
    this.props.updateDataTableActions({})
  }

  changeTab = () => {
    this.props.resetSelectedRecords && this.props.resetSelectedRecords();
  }

  render() {
    const { formatMessage } = this.props;

    return (
      <div className="card-container">
        <Tabs type="card" tabBarStyle={{ ...style.tabs.tabBar }} onChange={this.changeTab} >
          {/* <Tabs defaultActiveKey="1" onChange={callback}> */}
          <TabPane tab={formatMessage(messages["Global Labels"])} key="1">
            <GlobalLabels formatMessage={formatMessage} editAutoLabels={APIBody => this.props.editAutoLabels(APIBody)} deleteAutoLabel={(filterId, labelType) => this.props.deleteAutoLabel(filterId, labelType)} fetchAutoLabels={labelType => this.props.fetchAutoLabels(labelType)} postAutoLabels={APIBody => this.props.postAutoLabels(APIBody)} />
          </TabPane>
          <TabPane tab={"Legal Hold Labels"} key="2">
            <CaseLabels formatMessage={formatMessage} editAutoLabels={APIBody => this.props.editAutoLabels(APIBody)} deleteAutoLabel={(filterId, labelType) => this.props.deleteAutoLabel(filterId, labelType)} fetchAutoLabels={labelType => this.props.fetchAutoLabels(labelType)} postAutoLabels={APIBody => this.props.postAutoLabels(APIBody)} />
          </TabPane>

        </Tabs>
      </div>
    )
  }
};

const mapStateToProps = state => {
  return {
    // legalHoldAutoLabels: state.AutoLabelingReducer.legalHoldAutoLabels
  }
};

const mapDispatchToProps = dispatch => {
  return {
    updateDataTableActions: actions => dispatch(updateDataTableActions(actions)),
    fetchAutoLabels: labelType => dispatch(fetchAutoLabels(labelType)),
    postAutoLabels: APIBody => dispatch(postAutoLabels(APIBody)),
    deleteAutoLabel: (filterId, labelType) => dispatch(deleteAutoLabel(filterId, labelType)),
    editAutoLabels: APIBody => dispatch(editAutoLabels(APIBody)),
    resetSelectedRecords: () => dispatch(resetSelectedRecords())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AutoLabeling);