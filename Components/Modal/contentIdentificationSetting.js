import React from "react"
import { Drawer, Form, Radio, Typography } from 'antd';
import { PrimaryButton } from "../Button/Button";
import { SecondryButton } from "../Button/Button"
import { defineMessages } from 'react-intl';

const messages = defineMessages({
	'ContentIdentification': {
		id: "ContentIdentificationSetting.ContentIdentification",
		defaultMessage: "ContentIdentification",
	},
	'Type:': {
		id: "ContentIdentificationSetting.Type",
		defaultMessage: "Type:"
	},
	'Active Store Only': {
		id: "ContentIdentificationSetting.ActiveStoreOnly",
		defaultMessage: "Active Store Only"
	},
	'All Stores': {
		id: "ContentIdentificationSetting.AllStores",
		defaultMessage: "All Stores"
	},
	'Save': {
		id: "ContentIdentificationSetting.Save",
		defaultMessage: "Save"
	},
	'Cancel': {
		id: "ContentIdentificationSetting.Cancel",
		defaultMessage: "Cancel"
	},
})

const { Text } = Typography

class ContentIdentification extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checkValue: [],
      //   data: datatree.treeData,
      value: 1
    };
  }
  onChange = e => {
    this.setState({
      value: e.target.value
    })
  }

  render() {
    const {formatMessage} = this.props;
    return (
      <div>
        <Drawer
          title={formatMessage(messages["ContentIdentification"])}
          style={{ marginTop: 125 }}
          bodyStyle={{ height: 'calc(100vh - 125px)', overflowY: "auto" }}
          maskStyle={{ backgroundColor: "transparent" }}
          width={400}
          onClose={() => this.props.close()}
          visible={true}
        >
          <Form layout="vertical">
            <Form.Item>
              <div style={{ marginTop: 20, display: "flex", justifyContent: 'flex-start' }}>
                <Text>{formatMessage(messages["Type:"])}</Text>
                <Radio.Group style={{ width: "100%", display: "flex", justifyContent: "space-around", alignItems: "end" }} onChange={this.onChange} value={this.state.value}>
                  <Radio value={1}>{formatMessage(messages["Active Store Only"])}</Radio>
                  <Radio value={2}>{formatMessage(messages["All Stores"])}</Radio>
                </Radio.Group>
              </div>
            </Form.Item>
            <Form.Item>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                <PrimaryButton text={formatMessage(messages["Save"])} htmlType="submit">

                </PrimaryButton>
                <SecondryButton text={formatMessage(messages["Cancel"])} onClick={() => this.props.close()} style={{ marginRight: 8 }}>

                </SecondryButton>
              </div>
            </Form.Item>
          </Form>
        </Drawer>
      </div>
    );
  }
}

const ContentIdentificationDrawerForm = Form.create('ContentIdentification')(ContentIdentification);

export default ContentIdentificationDrawerForm