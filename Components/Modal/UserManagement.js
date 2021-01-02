import React, { Component } from 'react';
import { Drawer, Form, Input, Select, Typography, Spin, Skeleton } from 'antd';
import { PrimaryButton, SecondryButton } from '../Button/Button';
// import { SecondryButton } from "../Button/Button";
// import Theme from "../../Assets/Theme/Theme";
import Clear_Gray from '../../Assets/icons/SV_ICONS/Clear_Gray.png';
import { connect } from 'react-redux';
import {
  postUserData,
  updateUserData
} from '../../Redux/Actions/SecurityAction/UserManagementAction';
import { fetchRole } from '../../Redux/Actions/SecurityAction/RoleManagementAction';
import { defineMessages } from 'react-intl';
import UserManagementIcon from '../../Assets/icons/SV_ICONS/User Management_Blue35.png';
import style from '../../styles';
import * as ApiInfo from "../../APIConfig/ApiParameters";


const { Text } = Typography;
const messages = defineMessages({
  'CouldNot Save SomeThing Went Wrong': {
    id: 'UserManagement.CouldNotSaveSomeThingWentWrong',
    defaultMessage: 'CouldNot Save SomeThing Went Wrong'
  },
  'Edit User': {
    id: 'UserManagement.EditUser',
    defaultMessage: 'Edit User'
  },
  'Add User': {
    id: 'UserManagement.AddUser',
    defaultMessage: 'Add User'
  },
  'User Type:': {
    id: 'UserManagement.UserType',
    defaultMessage: 'User Type:'
  },
  'Please Enter User Type': {
    id: 'UserManagement.PleaseEnterUserType',
    defaultMessage: 'Please Enter User Type'
  },
  'User Name:': {
    id: 'UserManagement.UserName',
    defaultMessage: 'User Name:'
  },
  'Please Enter User Name': {
    id: 'UserManagement.PleaseEnterUserName',
    defaultMessage: 'Please Enter User Name'
  },
  'Display Name:': {
    id: 'UserManagement.DisplayName',
    defaultMessage: 'Display Name:'
  },
  'Please Enter Display Name': {
    id: 'UserManagement.PleaseEnterDisplayName',
    defaultMessage: 'Please Enter Display Name'
  },
  'Email Address': {
    id: 'UserManagement.EmailAddress',
    defaultMessage: 'Email Address'
  },
  'The input is not valid E-mail!': {
    id: 'UserManagement.TheInputIsNotValidEmail',
    defaultMessage: 'The input is not valid E-mail!'
  },
  'Please input your E-mail!': {
    id: 'UserManagement.PleaseInputYourEmail',
    defaultMessage: 'Please input your E-mail!'
  },
  Role: {
    id: 'UserManagement.Role',
    defaultMessage: 'Role'
  },
  'Select a role': {
    id: 'UserManagement.SelectRole',
    defaultMessage: 'Select a role'
  },
  'Server ': {
    id: 'UserManagement.Server',
    defaultMessage: 'Server '
  },
  'Please Enter Server Name ': {
    id: 'UserManagement.PleaseEnterServerName',
    defaultMessage: 'Please Enter Server Name '
  },
  'Storage Group ': {
    id: 'UserManagement.StorageGroup',
    defaultMessage: 'Storage Group '
  },
  'Mailbox Store ': {
    id: 'UserManagement.MailboxStore',
    defaultMessage: 'Mailbox Store '
  },
  'LDAP Path ': {
    id: 'UserManagement.LDAP_Path',
    defaultMessage: 'LDAP Path '
  },
  Save: {
    id: 'UserManagement.Save',
    defaultMessage: 'Save'
  }
});

const { Title } = Typography;
const { Option } = Select;

class UserManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkValue: [],

      roleId: this.props.values && this.props.values.Role_ID,
      userId: this.props.values && this.props.values.USER_ID
    };
  }
  static getDerivedStateFromProps(nextProps, state) {
    if (
      nextProps.userManagement &&
      !nextProps.userType &&
      !nextProps.role &&
      !nextProps.roleId
    ) {
      nextProps.fetchRole();
    }
    return null;
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, data) => {
      if (err) {
        //ApiInfo.DEBUGER && console.log("error", err)
      } else {
        if (this.props.values) {
          try {
            if (this.props.role === undefined) {
              data.Role = this.props.values && this.props.values.ROLE_ID;
            }
            else {
              this.props.role.forEach(role => {
                if (data.Role === role.ROLE_NAME) {
                  return data.Role = role.ROLE_ID;
                }
              });
            }
          } catch (error) {
            ApiInfo.DEBUGER && console.log("error", error)
          }
          // data.roleId = this.props.values && this.props.values.ROLE_ID;
          data.userId = this.props.values && this.props.values.USER_ID;
          this.props.updateUserData(data);
        } else {
          this.props.postUserData(data);
        }
        this.Close();
      }
      // data.User_Type = '';
    });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  Close = () => {
    this.props.close();
    this.props.form.resetFields();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { values, userManagement, formatMessage } = this.props;
    return (
      <div>
        <Drawer
          width={400}
          onClose={() => this.Close()}
          visible={userManagement}
          closable={false}
          maskStyle={{ backgroundColor: 'transparent' }}>
          <div style={{ ...style.setting.drawerMain }}>
            <div style={{ ...style.setting.drawerIconTitleWrapper }}>
              <img
                title='User Management'
                src={UserManagementIcon}
                alt=""
                style={{ ...style.setting.drawerIcons }}></img>
              <Title style={{ ...style.setting.drawerTitles }}>
                {values
                  ? formatMessage(messages['Edit User'])
                  : formatMessage(messages['Add User'])}
              </Title>
            </div>
            <div
              onClick={() => this.props.close()}
              style={{ paddingTop: 10, cursor: 'pointer' }}>
              <img
                src={Clear_Gray}
                title='Close'
                alt=''
                onClick={() => this.Close()}
                width={28}
                height={28}
              />
            </div>
          </div>

          <Skeleton active loading={!(this.props.userType && this.props.userType.length > 0)}>
          <Form layout='vertical' onSubmit={this.handleSubmit}>
            <Form.Item label={formatMessage(messages['User Type:'])}>
              {getFieldDecorator('User_Type', {
                initialValue: values ? values.USER_TYPE : this.props.userType && this.props.userType,
                rules: [
                  {
                    required: true,
                    message: formatMessage(messages['Please Enter User Type'])
                  }
                ]
              })(<Input disabled />)}
            </Form.Item>

            <Form.Item
              style={{ ...style.formItemBetweenGap }}
              label={formatMessage(messages['User Name:'])}>
              {getFieldDecorator('User_Name', {
                initialValue: values && values.USER_NAME,
                rules: [
                  {
                    required: true,
                    message: formatMessage(messages['Please Enter User Name'])
                  }
                ]
              })(
                <Input
                  disabled={
                    values &&
                    values.USER_NAME &&
                    (values.USER_TYPE === 'A' || values.USER_TYPE === 'S') &&
                    true
                  }
                />
              )}
            </Form.Item>

            {((values && values.USER_TYPE === 'S') || (this.props.userType === 'A' || this.props.userType === 'L')) && (
              <div>
              <Form.Item
                style={{ ...style.formItemBetweenGap }}
                label={formatMessage(messages['Display Name:'])}>
                {getFieldDecorator('Display_Name', {
                  initialValue: values && values.DISPLAY_NAME,
                  rules: [
                    {
                      required: true,
                      message: formatMessage(
                        messages['Please Enter Display Name']
                      )
                    }
                  ]
                })(
                  <Input
                    disabled={
                      values &&
                      values.DISPLAY_NAME &&
                      (values.USER_TYPE === 'A')
                    }
                  />
                )}
              </Form.Item>

              <Form.Item
                style={{ ...style.formItemBetweenGap }}
                label={formatMessage(messages['Email Address'])}>
                {getFieldDecorator('Email_Address', {
                  initialValue: values && values.MAILBOX_NAME,
                  rules: [
                    {
                      type: 'email',
                      required: true,
                      message: formatMessage(
                        messages['The input is not valid E-mail!']
                      )
                    },
                    {
                      required: true,
                      message: formatMessage(
                        messages['Please input your E-mail!']
                      )
                    }
                  ]
                })(
                  <Input
                    disabled={
                      values &&
                      values.MAILBOX_NAME &&
                      (values.USER_TYPE === 'A')
                    }
                  />
                )}
              </Form.Item>
              </div>
            )}
            <Form.Item
              style={{ ...style.formItemBetweenGap }}
              label={formatMessage(messages['Role'])}>
              {
                getFieldDecorator('Role', {
                initialValue: values && values.ROLE_NAME,
              rules: [
                    {
                      required: true,
                      message: 'The input is not valid, Please Select a Role!'
                    },
                    ]
              })(
                <Select
                  disabled={
                    values &&
                    values.ROLE_NAME &&
                    values.USER_TYPE === 'S'
                  }
                  showSearch
                  style={{ width: 350, height: 40 }}
                  placeholder={formatMessage(messages['Select a role'])}
                  optionFilterProp='children'
                  onFocus={() =>
                    (!this.props.role || !this.props.role.length <= 0) &&
                    this.props.fetchRole()
                  }
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  notFoundContent={
                    (!this.props.role) && (
                      <Text>
                        <Spin size='small' style={{ marginRight: 15 }} />
                        {'Fetching Roles'}
                      </Text>
                    )
                  }>
                  {this.props.role &&
                    this.props.role.map((val, index) => (
                      <Option key={index} value={val.ROLE_ID}>{val.ROLE_NAME}</Option>
                    ))}
                </Select>
              )}
            </Form.Item>

            {values && values.USER_TYPE === 'A' && (
              <div>
                <Form.Item
                  style={{ ...style.formItemBetweenGap }}
                  label={formatMessage(messages['Server '])}>
                  {getFieldDecorator('Server ', {
                    initialValue: values && values.EXCHANGE_SERVER_NAME,
                    rules: [
                      {
                        required: true,
                        message: formatMessage(
                          messages['Please Enter Server Name ']
                        )
                      }
                    ]
                  })(
                    <Input
                      disabled={values && values.USER_TYPE === 'A'}
                    />
                  )}
                </Form.Item>

                <Form.Item
                  style={{ ...style.formItemBetweenGap }}
                  label={formatMessage(messages['Storage Group '])}>
                  {getFieldDecorator('Storage_Group ', {
                    initialValue: values && values.STORAGE_GROUP_NAME
                  })(
                    <Input
                      disabled={values && values.USER_TYPE === 'A'}
                    />
                  )}
                </Form.Item>

                <Form.Item
                  style={{ ...style.formItemBetweenGap }}
                  label={formatMessage(messages['Mailbox Store '])}>
                  {getFieldDecorator('Mailbox_Store ', {
                    initialValue: values && values.MAILBOX_STORE_NAME
                  })(
                    <Input
                      disabled={values && values.USER_TYPE === 'A'}
                    />
                  )}
                </Form.Item>

                <Form.Item
                  style={{ ...style.formItemBetweenGap }}
                  label={formatMessage(messages['LDAP Path '])}>
                  {getFieldDecorator('LDAP_Path  :', {
                    initialValue: values && values.LDAP_PATH
                  })(
                    <Input
                      disabled={values && values.USER_TYPE === 'A'}
                    />
                  )}
                </Form.Item>
              </div>
            )}

            <Form.Item style={{ ...style.formItemBetweenGap }}>
              <div style={{ ...style.drawerButtons }}>
                <PrimaryButton
                  disabled={values && values.USER_TYPE === 'S'}
                  text={formatMessage(messages['Save'])}
                  htmlType='submit'
                />
                <SecondryButton
                  text='Cancel'
                  onClick={() => this.Close()}
                  style={{ marginRight: 8 }}
                />
                {values && values.USER_TYPE === '' && (
                  <SecondryButton
                    text='Reset Password'
                    style={{ marginRight: 8 }}
                  />
                )}
              </div>
            </Form.Item>
          </Form>
          </Skeleton>
        </Drawer>
      </div>
    );
  }
}

const UserManagementDrawerForm = Form.create('UserManagement')(UserManagement);

const mapStateToProps = state => {
  return {
    roleId: state.RoleManagementReducer.roleId,
    role: state.RoleManagementReducer.role,
    userType: state.UserManagementReducer.userType
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchRole: () => dispatch(fetchRole()),
    updateUserData: data => dispatch(updateUserData(data)),
    postUserData: data => dispatch(postUserData(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserManagementDrawerForm);
