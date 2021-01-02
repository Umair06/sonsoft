import React from "react"
import { Drawer, Form, Radio, Typography, Skeleton } from 'antd';
import { PrimaryButton } from "../Button/Button";
import { SecondryButton } from "../Button/Button"
// import Theme from "../../Assets/Theme/Theme";
import Clear_Gray from '../../Assets/icons/SV_ICONS/Clear_Gray.png';
import { connect } from "react-redux";
import { fetchStubPolicySetting, UpdateStubPolicySetting } from "../../Redux/Actions/Policies/StubPolicyAction"
import { defineMessages } from 'react-intl';
import style from "../../styles"
import StubIcon from '../../Assets/icons/SV_ICONS/Scheduler_Blue.png'
// import * as ApiInfo from "../../APIConfig/ApiParameters";


const messages = defineMessages({
  'could Not Save SomeThing Went Wrong': {
    id: "StubPolicySetting.couldNotSaveSomeThingWentWrong",
    defaultMessage: "couldNot Save SomeThing Went Wrong"
  },
  'Stub Policy Setting': {
    id: "StubPolicySetting.StubPolicySetting",
    defaultMessage: "Stub Policy Setting",
  },
  'Type:': {
    id: "StubPolicySetting.Type",
    defaultMessage: "Type:"
  },
  'AD': {
    id: "StubPolicySetting.AD",
    defaultMessage: "AD"
  },
  'Local': {
    id: "StubPolicySetting.Local",
    defaultMessage: "Local"
  },
  'Priority': {
    id: "StubPolicySetting.Priority",
    defaultMessage: "Priority"
  },
  'Maximum Stub Period': {
    id: "StubPolicySetting.MaximumStubPeriod",
    defaultMessage: "Maximum Stub Period"
  },
  'Save': {
    id: "StubPolicySetting.Save",
    defaultMessage: "Save"
  },
})

//const { color } = Theme;
const { Text, Title } = Typography

class StubPolicySetting extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checkValue: [],

      value: 1,
    };

  }
  onChange = e => {
    this.setState({
      value: e.target.value,
    });
  };
  handleSubmit = () => {

    this.props.form.validateFieldsAndScroll((err, data) => {
      if (err) {
        //ApiInfo.DEBUGER && console.log("error", err)
      }
      else {
        this.props.UpdateStubPolicySetting(data)
        this.props.close()
      }
    });
  }
  static getDerivedStateFromProps(props, state) {
    if (!props.stubsetting && props.stubPolicySetting) {
      props.fetchStubPolicySetting()
    }
    return null;
  }
  render() {
    const { stubPolicySetting, formatMessage } = this.props
    const { getFieldDecorator } = this.props.form;
    
    return (
      <div>

        <Drawer
          // style={{ marginTop: 125 }}
          // bodyStyle={{ height: 'calc(100vh - 125px)', overflowY: "auto" }}
          // title={formatMessage(messages["StubPolicySetting"])}
          width={400}
          onClose={() => this.props.close()}
          visible={stubPolicySetting}
          closable={false}
          maskStyle={{ backgroundColor: "transparent" }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ ...style.setting.drawerIconTitleWrapper }}>
              <img title="Stub" alt="" src={StubIcon} style={{ ...style.setting.drawerIcons }}></img>

              <Title style={{ ...style.setting.drawerTitles }}>{formatMessage(messages["Stub Policy Setting"])}</Title>
            </div>
            <div onClick={() => this.props.close()} style={{ paddingTop: 10, cursor: "pointer" }}>
              <img src={Clear_Gray} title="Close" alt="" onClick={() => this.props.close()} width={28} height={28} />
            </div>
          </div>

          <Skeleton active loading={!(this.props.stubsetting && Array.isArray(this.props.stubsetting) && this.props.stubsetting.length > 0)}>
            <Form layout="vertical" onSubmit={this.handleSubmit}>
              <Form.Item >
                <div style={{ marginTop: 20, display: "flex", justifyContent: 'flex-start' }}>
                  {/* <CollapseAbleHeader heading="User Management UserManagementSettings"> */}
                  <Text>{formatMessage(messages["Type:"])}</Text>
                  {getFieldDecorator('Stub_Policy_Setting', {
                    initialValue: this.props.stubsetting && Array.isArray(this.props.stubsetting) && this.props.stubsetting.length > 0 && this.props.stubsetting[0].APPPARAM_VALUE,
                    // rules: [{ required: true, message: 'Please Enter Stub Policy Name ' }],
                  })(
                    <Radio.Group style={{ width: "100%", display: "flex", justifyContent: "space-around", alignItems: "end" }}>
                      <Radio value={"PRI"}>{formatMessage(messages["Priority"])}</Radio>
                      <Radio value={"PER"}>{formatMessage(messages["Maximum Stub Period"])}</Radio>
                    </Radio.Group>)}
                </div>
              </Form.Item>
              <Form.Item>
                <div style={{ ...style.drawerButtons }}>
                  <PrimaryButton text={formatMessage(messages["Save"])} onClick={() => this.handleSubmit()} />
                  <SecondryButton text="Cancel" onClick={() => this.props.close()} style={{ marginRight: 8 }} />
                </div>
              </Form.Item>
            </Form>
          </Skeleton>

        </Drawer>
      </div>
    );
  }
}

const StubPolicySettingDrawerForm = Form.create('StubPolicySetting')(StubPolicySetting);

const mapStateToProps = state => {
  return {
    stubsetting: state.StubPolicyReducer && state.StubPolicyReducer.stubsetting
    // success: state.RoleManagementReducer.success,
    // error: state.RoleManagementReducer.error

  }
};
const mapDispatchToProps = dispatch => {
  return {
    fetchStubPolicySetting: () => dispatch(fetchStubPolicySetting()),
    UpdateStubPolicySetting: (data) => dispatch(UpdateStubPolicySetting(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StubPolicySettingDrawerForm)