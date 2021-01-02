import React, { Component } from 'react';
import ActivateProduct from "./ActivateProduct/ActivateProduct";
import License from "./License/License";
import Status from "./Status/Status";
import Configuration from "./Configuration/Configuration"
import { Tabs, message } from 'antd';
import { defineMessages } from 'react-intl';

const messages = defineMessages({
  'Activate Product': {
    id: "ControlCenter_Setting.Activate Product",
    defaultMessage: "Activate Product",
  },
  'License': {
    id: "ControlCenter_Setting.License",
    defaultMessage: "License"
  },
  'Status': {
    id: "ControlCenter_Setting.Status",
    defaultMessage: "Status"
  },
  'Configuration': {
    id: "ControlCenter_Setting.Configuration",
    defaultMessage: "Configuration"
  },
})

const { TabPane } = Tabs;

class ControlCenter extends Component {
  constructor(props) {
    super(props)
    this.state = {};

    message.destroy()
  };

  render() {
    const { formatMessage } = this.props;
    return (
      <div>
        <Tabs defaultActiveKey="1">
          <TabPane tab={formatMessage(messages["Activate Product"])} key="1">
            <ActivateProduct formatMessage={formatMessage} />
          </TabPane>
          <TabPane tab={formatMessage(messages["License"])} key="2">
            <License formatMessage={formatMessage} />
          </TabPane>
          <TabPane tab={formatMessage(messages["Status"])} key="3">
            <Status formatMessage={formatMessage} />
          </TabPane>
          <TabPane tab={formatMessage(messages["Configuration"])} key="4">
            <Configuration formatMessage={formatMessage} />
          </TabPane>
        </Tabs>
      </div>
    )
  }
};

export default ControlCenter;
