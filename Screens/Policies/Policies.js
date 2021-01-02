import React, { Component } from 'react';
import ArchivalPolicy from "./ArchivalPolicy/ArchivalPolicy";
import FolderSync from "./FolderSync/FolderSync";
import AutoLabel from "./AutoLabeling/AutoLabeling";
import Retention from "./Retention/Retention";
import Stub from "./Stub/Stub";
import StubPolicyForm from "../../Components/Modal/StubPolicy"
import { connect } from "react-redux";
import { updateDataTableActions } from "../../Redux/Actions/pageHeader/pageHeader";
import { Tabs, message } from 'antd';
import { defineMessages } from 'react-intl';

const messages = defineMessages({
  'Archival': {
    id: "Policies.Archival",
    defaultMessage: "Archival",
  },
  'Folder': {
    id: "Policies.Folder",
    defaultMessage: "Folder"
  },
  'Stub': {
    id: "Policies.Stub",
    defaultMessage: "Stub"
  },
  'Auto Label': {
    id: "Policies.AutoLabel",
    defaultMessage: "Auto Label"
  },
  'Retention': {
    id: "Policies.Retention",
    defaultMessage: "Retention"
  },
})

const { TabPane } = Tabs;

class Policies extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stubPolicy: false
    }
    message.destroy()
  }

  componentDidMount() {
    this.callback(1)
  }

  callback = key => {
    if (key === 5) {
      this.props.updateDataTableActions({ add: true, addForm: () => this.openHistoricDomainForm(), enableDelete: true, fullScreen: true })
    } else {
      if (key === 1) {
        this.props.updateDataTableActions({ save: true, refresh: true, add: true, addForm: () => this.openStubPolicyForm(), enable: true, disable: true, deleteEnable: true, fullScreen: true })
      } else {
        if (key === 3) {
          this.props.updateDataTableActions({ add: true, addForm: () => this.openEmailServerForm(), enable: true, disable: true, fullScreen: true })
        } else {
          if (key === 4) {
            this.props.updateDataTableActions({ fullScreen: true })
          } else {
            this.props.updateDataTableActions({ save: true, refresh: true, add: true, addForm: () => this.openAdSettingForm(), enable: true, disable: true, deleteEnable: true, fullScreen: true })
          }
        }
      }
    }
  }
  openStubPolicyForm = () => {
    this.setState({
      stubPolicy: true
    })
  }
  onClose = () => {
    this.setState({
      stubPolicy: false
    })
  }

  render() {
    const { stubPolicy } = this.state
    const { formatMessage } = this.props;
    return (
      <div>
        {stubPolicy && (<StubPolicyForm close={() => this.onClose()} />)}
        <Tabs defaultActiveKey="1" onChange={this.callback}>
          <TabPane tab={formatMessage(messages["Archival"])} key="1">
            <ArchivalPolicy formatMessage={formatMessage} />
          </TabPane>
          <TabPane tab={formatMessage(messages["Folder"])} key="2">
            <FolderSync formatMessage={formatMessage} />
          </TabPane>
          <TabPane tab={formatMessage(messages["Stub"])} key="3">
            <Stub formatMessage={formatMessage} />
          </TabPane>
          <TabPane tab={formatMessage(messages["Auto Label"])} key="4">
            <AutoLabel formatMessage={formatMessage} />
          </TabPane>
          <TabPane tab={formatMessage(messages["Retention"])} key="5">
            <Retention formatMessage={formatMessage} />
          </TabPane>
        </Tabs>

      </div>
    )
  }
};

const mapDispatchToProps = dispatch => {
  return {
    updateDataTableActions: actions => dispatch(updateDataTableActions(actions)),
  }
}


export default connect(null, mapDispatchToProps)(Policies);

