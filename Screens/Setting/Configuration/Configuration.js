import React, { Component } from 'react';
import Deployment from "./Deployment/Deployment"
import EmailServer from "./EmailServer/EmailServer";
import HistoryDomain from './HistoryDomain/HistoryDomain';
import ArchiveStore from "./ArchiveStore/ArchiveStore";
import ActiveDirectory from "./ActiveDirectory/ActiveDirectory";
import { connect } from "react-redux";
import { updateDataTableActions } from "../../../Redux/Actions/pageHeader/pageHeader";
import AdSettingSideDrawer from "../../../Components/Modal/adSetting";
import EmailServerSideDrawer from "../../../Components/Modal/emailServer";
import HistoricDomainSideDrawer from "../../../Components/Modal/HistoricDomain";
import ArchiveStoreSideDrawer from "../../../Components/Modal/ArchiveStore";
import DepolymentSideDrawer from "../../../Components/Modal/Deployment";
import { Tabs, message } from 'antd';
import { defineMessages } from 'react-intl';

const messages = defineMessages({
  'Deployment': {
    id: "Configuration.Deployment",
    defaultMessage: "Deployment",
  },
  'Active Directory': {
    id: "Configuration.ActiveDirectory",
    defaultMessage: "Active Directory"
  },
  'Email Server': {
    id: "Configuration.EmailServer",
    defaultMessage: "Email Server"
  },
  'Archive Stores': {
    id: "Configuration.ArchiveStores",
    defaultMessage: "Archive Stores"
  },
  'Historic Domains': {
    id: "Configuration.HistoricDomains",
    defaultMessage: "Historic Domains"
  },
})

const { TabPane } = Tabs;

class Configuration extends Component {
  constructor(props) {
    super(props)
    this.state = {}    
    message.destroy()
  }

  componentDidMount() {
    this.callback(1)
  }

  callback = key => {
    this.props.updateDataTableActions({})
  }

  openArchiveStoreForm = (edit) => {
    this.setState({
      archiveStoreDrawer: true,
      edit
    })
  }

  openSideDrawer = drawer => {
    this.setState({
      [drawer]: true
    })
  }

  onClose = () => {
    this.setState({
      adDrawer: false,
      emailServerDrawer: false,
      historicDomainDrawer: false,
      archiveStoreDrawer: false,
      deploymentDrawer: false,
    })
  }

  render() {
    const { adDrawer, emailServerDrawer, historicDomainDrawer, archiveStoreDrawer, deploymentDrawer } = this.state
    const { formatMessage } = this.props;
    return (
      <div>
        {adDrawer && (<AdSettingSideDrawer formatMessage={formatMessage} close={() => this.onClose()} />)}
        {emailServerDrawer && (<EmailServerSideDrawer formatMessage={formatMessage} close={() => this.onClose()} />)}
        {historicDomainDrawer && (<HistoricDomainSideDrawer formatMessage={formatMessage} close={() => this.onClose()} />)}
        {archiveStoreDrawer && (<ArchiveStoreSideDrawer formatMessage={formatMessage} close={() => this.onClose()} edit={this.state.edit} />)}
        {deploymentDrawer && (<DepolymentSideDrawer formatMessage={formatMessage} close={() => this.onClose()} />)}

        <Tabs defaultActiveKey="1" onChange={this.callback}>
          <TabPane tab={formatMessage(messages["Deployment"])} key="1">
            <Deployment formatMessage={formatMessage} openDrawer={() => this.openSideDrawer("deploymentDrawer")} />
          </TabPane>

          <TabPane tab={formatMessage(messages["Active Directory"])} key="2">
            <ActiveDirectory formatMessage={formatMessage} openDrawer={() => this.openSideDrawer("adDrawer")} />
          </TabPane>

          <TabPane tab={formatMessage(messages["Email Server"])} key="3">
            <EmailServer formatMessage={formatMessage} openDrawer={() => this.openSideDrawer("emailServerDrawer")} />
          </TabPane>

          <TabPane tab={formatMessage(messages["Archive Stores"])} key="4">
            <ArchiveStore formatMessage={formatMessage} openDrawer={(edit) => this.openArchiveStoreForm(edit)} />
          </TabPane>

          <TabPane tab={formatMessage(messages["Historic Domains"])} key="5">
            <HistoryDomain formatMessage={formatMessage} open={() => this.openSideDrawer("historicDomainDrawer")} />
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

export default connect(null, mapDispatchToProps)(Configuration);
