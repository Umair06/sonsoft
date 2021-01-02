import React from "react"
import { Drawer, Form, Radio, Typography, Skeleton } from 'antd';
import { PrimaryButton } from "../Button/Button";
import { SecondryButton } from "../Button/Button"
import Theme from "../../Assets/Theme/Theme";
import { connect } from "react-redux";
import { fetchUserType, postUserType } from "../../Redux/Actions/SecurityAction/UserManagementAction"
import Clear_Gray from '../../Assets/icons/SV_ICONS/Clear_Gray.png';
import { defineMessages } from 'react-intl';
import style from '../../styles'
// import * as ApiInfo from "../../APIConfig/ApiParameters";


const messages = defineMessages({
  'Could Not Save SomeThing Went Wrong': {
    id: "UserManagementSetting.CouldNotSaveSomeThingWentWrong",
    defaultMessage: "Could Not Save SomeThing Went Wrong"
  },
  'User Management Setting': {
    id: "UserManagementSetting.UserManagementSetting",
    defaultMessage: "User Management Setting",
  },
  'Type:': {
    id: "UserManagementSetting.Type",
    defaultMessage: "Type:"
  },
  'AD': {
    id: "UserManagementSetting.AD",
    defaultMessage: "AD"
  },
  'Local': {
    id: "UserManagementSetting.Local",
    defaultMessage: "Local"
  },
  'Save': {
    id: "UserManagementSetting.Save",
    defaultMessage: "Save"
  },
  'Cancel': {
    id: "UserManagementSetting.Cancel",
    defaultMessage: "Cancel"
  },
})

const { color } = Theme;
const { Text, Title } = Typography;

class UserManagementSetting extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    };
  }
  onChange = e => {
    this.setState({
      value: e.target.value
    })
  }

  static getDerivedStateFromProps(props, state) {
    !props.userType && props.userManagementSetting && props.fetchUserType();
    return null;
  }
  // componentDidMount(){
  //   this.props.fetchUserType()
  // }

  handleSubmit = () => {

    this.props.close()
    this.props.form.validateFieldsAndScroll((err, data) => {
      if (err) {
        //ApiInfo.DEBUGER && console.log("error", err)
      }
      else {
        this.props.postUserType(data)
      }

    });
    this.props.close()
  }

  render() {
    const { userManagementSetting, formatMessage } = this.props
    const { getFieldDecorator } = this.props.form;
  
    return (
      <div>
        <Drawer
          width={400}
          onClose={() => this.props.close()}
          visible={userManagementSetting}
          closable={false}
          maskStyle={{ backgroundColor: "transparent" }}
        >
          <div style={{ ...style.setting.drawerMain }}>
            <div style={{ ...style.setting.drawerIconTitleWrapper }}>

              <Title style={{ color: `${color.Blue}`, padding: "20px 0 5px 1px", fontSize: 24, }}>{formatMessage(messages["User Management Setting"])}</Title>
            </div>
            <div onClick={() => this.props.close()} style={{ cursor: "pointer", paddingTop: 10 }}>
              <img src={Clear_Gray} title="Close" alt="" onClick={() => this.props.close()} width={28} height={28} />
            </div>
          </div>

          <Skeleton active loading={!(this.props.userType && this.props.userType.length > 0)}>
            <Form layout="vertical" onSubmit={this.handleSubmit}>
              <Form.Item>
                <div style={{ marginTop: 20, display: "flex", justifyContent: 'flex-start' }}>
                  <Text >{formatMessage(messages["Type:"])}</Text>
                  {getFieldDecorator('userType', {
                    initialValue: this.props && this.props.userType,
                    // rules: [{ required: true, message: 'Please Enter Stub Policy Name ' }],
                  })(
                    <Radio.Group style={{ width: "100%", display: "flex", justifyContent: "space-around", alignItems: "end" }} onChange={this.onChange} >
                      <Radio value={"A"}>{formatMessage(messages["AD"])}</Radio>
                      <Radio value={"L"}>{formatMessage(messages["Local"])}</Radio>
                    </Radio.Group>
                  )}
                </div>
              </Form.Item>
              <Form.Item>
                <div style={{ ...style.drawerButtons }}>
                  <PrimaryButton text={formatMessage(messages["Save"])} onClick={() => this.handleSubmit()} />
                  <SecondryButton text={formatMessage(messages["Cancel"])} onClick={() => this.props.close()} style={{ marginRight: 8 }} />
                </div>
              </Form.Item>
            </Form>
          </Skeleton>
        </Drawer>
      </div>
    );
  }
}

const UserManagementSettingDrawerForm = Form.create('UserManagementSetting')(UserManagementSetting);
const mapStateToProps = state => {
  return {
    userType: state.UserManagementReducer.userType,
  }
};
const mapDispatchToProps = dispatch => {
  return {
    postUserType: (data) => dispatch(postUserType(data)),
    fetchUserType: () => dispatch(fetchUserType())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserManagementSettingDrawerForm);