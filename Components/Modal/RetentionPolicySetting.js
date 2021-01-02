import React from "react"
import { Drawer, Form, Radio, Typography, Skeleton } from 'antd';
import { PrimaryButton } from "../Button/Button";
import { SecondryButton } from "../Button/Button"
import Theme from "../../Assets/Theme/Theme";
import Clear_Gray from '../../Assets/icons/SV_ICONS/Clear_Gray.png';
import { defineMessages } from 'react-intl';
import { connect } from "react-redux";
import style from "../../styles"
// import { updateDataTableActions } from "../../Redux/Actions/pageHeader/pageHeader";
import { fetchRetentionPolicySettingList, updateRetentionPolicySetting } from "../../Redux/Actions/Policies/RetentionPolicyAction"
// import * as ApiInfo from "../../APIConfig/ApiParameters";


const messages = defineMessages({
  'couldNot Save SomeThing Went Wrong': {
    id: "RetentionPolicySetting.couldNotSaveSomeThingWentWrong",
    defaultMessage: "couldNot Save SomeThing Went Wrong",
  },
  'Retention Policy Setting': {
    id: "RetentionPolicySetting.RetentionPolicySetting",
    defaultMessage: "Retention Policy Setting"
  },
  'Calculate expiry date based on: ': {
    id: "RetentionPolicySetting.CalculateExpiryDateBasedOn",
    defaultMessage: "Calculate expiry date based on: "
  },
  'Ingestion Date': {
    id: "RetentionPolicySetting.IngestionDate",
    defaultMessage: "Ingestion Date"
  },
  'Message Received Date': {
    id: "RetentionPolicySetting.MessageReceivedDate",
    defaultMessage: "Message Received Date"
  },
  'Retention based on: ': {
    id: "RetentionPolicySetting.RetentionBasedOn",
    defaultMessage: "Retention based on: "
  },
  'Priority': {
    id: "RetentionPolicySetting.Priority",
    defaultMessage: "Priority"
  },
  'Maximum Retention Period': {
    id: "RetentionPolicySetting.MaximumRetentionPeriod",
    defaultMessage: "Maximum Retention Period"
  },
  'Save': {
    id: "RetentionPolicySetting.Save",
    defaultMessage: "Save"
  },
})

const { color } = Theme;
const { Text, Title } = Typography

class RetentionPolicySetting extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checkValue: [],
      //   data: datatree.treeData,
      retentionBased: "PRI",
      calculateExpiry: "A"
    };

  }
  calculateExpiryDate = e => {
    this.setState({
      calculateExpiry: e.target.value
    })
  }
  retentionBasedOn = e => {
    this.setState({
      retentionBased: e.target.value
    })
  }
  handleSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, data) => {
      if (err) {
        //ApiInfo.DEBUGER && console.log("error", err)
      }
      else {
        this.props.updateRetentionPolicySetting(data)
        this.props.close()
      }
    });



  }
  static getDerivedStateFromProps(props, state) {
    if (!props.retentionsetting && props.retentionPolicySetting) {
      props.fetchRetentionPolicySettingList()
    }
    return {}
  }

  render() {
    const { retentionPolicySetting, formatMessage } = this.props
    const { getFieldDecorator } = this.props.form;
  // const { retentionBased, calculateExpiry } = this.state

    // const tailFormItemLayout = {
    //   wrapperCol: {
    //     xs: {
    //       span: 24,
    //       offset: 0,
    //     },
    //     sm: {
    //       span: 16,
    //       offset: 8,
    //     },
    //   },
    // };

    return (
      <div>

        <Drawer
          // title={formatMessage(messages["Retention Policy Setting"])}
          // style={{marginTop : 125}}
          // bodyStyle={{ height: 'calc(100vh - 125px)', overflowY: "auto" }}
          width={400}
          onClose={() => this.props.close()}
          visible={retentionPolicySetting}
          closable={false}
          maskStyle={{ backgroundColor: "transparent" }}
        >
          <div style={{ ...style.setting.drawerMain }}>
            <div style={{ ...style.setting.drawerIconTitleWrapper }}>

              <Title style={{ color: `${color.Blue}`, padding: "20px 0 5px 1px", fontSize: 24, }}>{formatMessage(messages["Retention Policy Setting"])}</Title>
            </div>
            <div onClick={() => this.props.close()} style={{ paddingTop: 10, cursor: "pointer" }}>
              <img src={Clear_Gray} title="Close" alt="" onClick={() => this.props.close()} width={28} height={28} />
            </div>
          </div>

          <Skeleton active loading={!(this.props.retentionsetting && Array.isArray(this.props.retentionsetting) && this.props.retentionsetting.length > 0)}>
            <Form layout="vertical" labelAlign="left" onSubmit={this.handleSubmit}>
              <Form.Item label={<Text >{formatMessage(messages["Calculate expiry date based on: "])}</Text>} colon={false}>
                {getFieldDecorator('calculate_Expiry', {
                  initialValue: this.props.retentionsetting && Array.isArray(this.props.retentionsetting) && this.props.retentionsetting.length > 1 && this.props.retentionsetting[1].APPPARAM_VALUE,
                  // rules: [{ required: true, message: 'Please Enter Stub Policy Name ' }],
                })(
                  <Radio.Group  >
                    <Radio value={"A"}>{formatMessage(messages["Ingestion Date"])}</Radio>
                    <br />
                    <Radio value={"E"}>{formatMessage(messages["Message Received Date"])}</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
              <Form.Item label={<Text >{formatMessage(messages["Retention based on: "])}</Text>} colon={false}>
                {/* <CollapseAbleHeader heading="User Management RetentionPolicySettings"> */}
                {getFieldDecorator('retention_Based', {
                  initialValue: this.props.retentionsetting && Array.isArray(this.props.retentionsetting) && this.props.retentionsetting.length > 0 && this.props.retentionsetting[0].APPPARAM_VALUE,
                  // rules: [{ required: true, message: 'Please Enter Stub Policy Name ' }],
                })(
                  <Radio.Group  >
                    <Radio value={"PRI"}>{formatMessage(messages["Priority"])}</Radio>
                    <br />
                    <Radio value={"PER"}>{formatMessage(messages["Maximum Retention Period"])}</Radio>
                  </Radio.Group>)}
              </Form.Item>
              <Form.Item >
                <div style={{ display: "flex", justifyContent: "center", flexDirection: "center" }}>
                  <PrimaryButton text={formatMessage(messages["Save"])} onClick={() => this.handleSubmit()}>

                  </PrimaryButton>
                  <SecondryButton text="Cancel" onClick={() => this.props.close()} style={{ marginRight: 8 }}>

                  </SecondryButton>
                </div>
              </Form.Item>
            </Form>
          </Skeleton>
        </Drawer>
      </div>
    );
  }
}

const RetentionPolicySettingDrawerForm = Form.create('RetentionPolicySetting')(RetentionPolicySetting);

const mapStateToProps = state => {
  return {
    retentionsetting: state.RetentionPolicyReducer && state.RetentionPolicyReducer.retentionsetting
  }
};

const mapDispatchToProps = dispatch => {
  return {
    // updateDataTableActions: actions => dispatch(updateDataTableActions(actions)),
    fetchRetentionPolicySettingList: () => dispatch(fetchRetentionPolicySettingList()),
    updateRetentionPolicySetting: (data) => dispatch(updateRetentionPolicySetting(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RetentionPolicySettingDrawerForm);
