import React from 'react';
import { Drawer, Form, Input, Select, Typography, Spin } from 'antd';
import { PrimaryButton } from '../Button/Button';
import { SecondryButton } from '../Button/Button';
import Clear_Gray from '../../Assets/icons/SV_ICONS/Clear_Gray.png';
// import Theme from "../../Assets/Theme/Theme";
import { connect } from 'react-redux';
import {
  fetchNotificationDropDownList,
  postNotification,
  editNotification
} from '../../Redux/Actions/NotificationAction/NotificationAction';
import { defineMessages } from 'react-intl';
import style from '../../styles';
import NotificationIcon from '../../Assets/icons/SV_ICONS/Notification_Blue.png';
import * as ApiInfo from "../../APIConfig/ApiParameters";


const { Text } = Typography;
const messages = defineMessages({
  'Couldnot Save Something Went Wrong': {
    id: 'Notification_SettingDrawer.CouldnotSaveSomethingWentWrong',
    defaultMessage: 'Couldnot Save Something Went Wrong'
  },
  'Edit Notification Settings': {
    id: 'Notification_SettingDrawer.EditNotificationSettings',
    defaultMessage: 'Edit Notification Settings'
  },
  'Add Notification Settings': {
    id: 'Notification_SettingDrawer.AddNotificationSettings',
    defaultMessage: 'Add Notification Settings'
  },
  'Notification Type:': {
    id: 'Notification_SettingDrawer.NotificationType',
    defaultMessage: 'Notification Type:'
  },
  'Please enter Notification Type': {
    id: 'Notification_SettingDrawer.PleaseEnterNotificationType',
    defaultMessage: 'Please enter Notification Type'
  },
  'Select Notification Type': {
    id: 'Notification_SettingDrawer.SelectNotificationType',
    defaultMessage: 'Select Notification Type'
  },
  All: {
    id: 'Notification_SettingDrawer.All',
    defaultMessage: 'All'
  },
  'Activate Product': {
    id: 'Notification_SettingDrawer.ActivateProduct',
    defaultMessage: 'Activate Product'
  },
  'Archival Policy': {
    id: 'Notification_SettingDrawer.ArchivalPolicy',
    defaultMessage: 'Archival Policy'
  },
  'To:': {
    id: 'Notification_SettingDrawer.To',
    defaultMessage: 'To:'
  },
  'Cc:': {
    id: 'Notification_SettingDrawer.Cc',
    defaultMessage: 'Cc:'
  },
  'The input is not valid E-mail!': {
    id: 'Notification_SettingDrawer.TheInputIsNotValidEmail',
    defaultMessage: 'The input is not valid E-mail!'
  },
  'Please input your E-mail!': {
    id: 'Notification_SettingDrawer.PleaseInputYourEmail',
    defaultMessage: 'Please input your E-mail!'
  },
  Save: {
    id: 'Notification_SettingDrawer.Save',
    defaultMessage: 'Save'
  }
});

// const { color } = Theme;
const { Title } = Typography;
const { Option } = Select;

class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkValue: [],
      allEmailAddress: [],
      allCcAddress: []
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { values } = props;
    let allEmailAddress = state.allEmailAddress;
    let allCcAddress = state.allCcAddress;
    let setAllEmailAddress = state.setAllEmailAddress
    let setAllCcAddress = state.setAllCcAddress
    if (values && values.to && typeof (values.to) === 'string' && !state.setAllEmailAddress && values.to !== " ") {
      let to = values.to.split(';');
      allEmailAddress = to
      setAllEmailAddress = true
    }
    if (values && values.cc && typeof (values.cc === 'string') && !state.setAllCcAddress && values.cc !== " ") {
      let cc = values.cc.split(';');
      allCcAddress = cc
      setAllCcAddress = true
    }
    return {
      allEmailAddress,
      allCcAddress,
      setAllCcAddress,
      setAllEmailAddress
    }
  }

  handleSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, data) => {
      if (err) {
        ApiInfo.DEBUGER && console.log('error', err);
      } else {
        if (data.to) data.to = this.state.allEmailAddress;
        if (data.Cc) data.Cc = this.state.allCcAddress === " " ? [] : this.state.allCcAddress;
        //data.id = this.props.values && this.props.values.id;
        if (this.props.values) {
          data.notificationType = this.props.values && this.props.values.id
          this.props.editNotification(data);
        } else {
          if (data.Notification_Type === 0) {
            let value = [];
            this.props.notificationdropdownlist.forEach(val => {
              value.push(val.id);
            });
            data.Notification_Type = value;
            this.props.postNotification(data);
          } else {
            this.props.postNotification(data);
          }
        }
        this.Close();
      }
    });
  };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleCcAddress(value) {
    this.setState({ allCcAddress: value });
  }
  handleEmailAddress(value) {
    this.setState({ allEmailAddress: value });
  }
  Close = () => {
    this.props.close();
    this.props.form.resetFields();
    this.setState({
      allEmailAddress: [],
      allCcAddress: [],
      setAllEmailAddress: false,
      setAllCcAddress: false
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { values, notificationSideDrawer, formatMessage } = this.props;
    return (
      <div>
        <Drawer
          width={400}
          onClose={() => this.Close()}
          closable={false}
          visible={notificationSideDrawer}
          maskStyle={{ backgroundColor: 'transparent' }}>
          <div style={{ ...style.setting.drawerMain }}>
            <div style={{ ...style.setting.drawerIconTitleWrapper }}>
              <img
                alt=''
                title='Notification'
                src={NotificationIcon}
                style={{ ...style.setting.drawerIcons }}></img>
              <Title style={{ ...style.setting.drawerTitles }}>
                {values
                  ? formatMessage(messages['Edit Notification Settings'])
                  : formatMessage(messages['Add Notification Settings'])}
              </Title>
            </div>
            <div
              onClick={() => this.props.close()}
              style={{ cursor: 'pointer', paddingTop: 10 }}>
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
          <Form layout='vertical' onSubmit={this.handleSubmit}>
            <Form.Item label={formatMessage(messages['Notification Type:'])}>
              {getFieldDecorator('Notification_Type', {
                initialValue: values && values.Notification_Type,
                rules: [
                  {
                    required: values ? false : true,
                    message: formatMessage(messages['Select Notification Type'])
                  }
                ]
              })(
                values ? (
                  <div>
                    <Input value={values && values.notificationType} disabled={true} />
                  </div>
                ) : (
                    <Select
                      
                      showSearch
                      style={{ width: '100%', height: 40 }}
                      placeholder={formatMessage(
                        messages['Select Notification Type']
                      )}
                      optionFilterProp='children'
                      onChange={this.onChangeDropdown}
                      onFocus={() => this.props.fetchNotificationDropDownList()}
                      notFoundContent={
                        !this.props.notificationdropdownlist && (
                          <Text>
                            <Spin size='small' style={{ marginRight: 15 }} />
                            {'Fetching'}
                          </Text>
                        )
                      }
                      onSearch={this.onSearch}
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }>
                      {this.props &&
                        this.props.notificationdropdownlist &&
                        this.props.notificationdropdownlist.map(val => (
                          <Option key={val.id} value={val.id}>
                            {val.notificationType}
                          </Option>
                        ))}
                    </Select>
                  )
              )}
            </Form.Item>
            <Form.Item style={{ ...style.formItemBetweenGap }} label={'To:'}>
              {getFieldDecorator('to', {
                initialValue: this.state.allEmailAddress,
                rules: [{
                  required: true
                }
                  //   { type: 'email', message: 'The input is not a valid E-mail' }
                ]
              })(
                <div style={{ paddingTop: 2 }}>
                  <Select
                    value={this.state.allEmailAddress}
                    mode='tags'
                    tokenSeparators={[';']}
                    dropdownStyle={{ display: 'none' }}
                    allowClear={true}
                    onChange={e => this.handleEmailAddress(e)}></Select>
                </div>
              )}
            </Form.Item>

            <Form.Item
              style={{ ...style.formItemBetweenGap }}
              label={formatMessage(messages['Cc:'])}>
              {getFieldDecorator('Cc', {
                initialValue: this.state.allCcAddress,
                // rules: [
                //   { type: 'email', message: 'The input is not a valid E-mail' }
                // ]
              })(
                <div style={{ paddingTop: 2 }}>
                  <Select
                    value={this.state.allCcAddress}
                    mode='tags'
                    tokenSeparators={[';']}
                    dropdownStyle={{ display: 'none' }}
                    allowClear={true}
                    onChange={e => this.handleCcAddress(e)}></Select>
                </div>
              )}
            </Form.Item>
            <Form.Item style={{ ...style.formItemBetweenGap }}>
              <div style={{ ...style.drawerButtons }}>
                <PrimaryButton text={formatMessage(messages['Save'])} onClick={() => this.handleSubmit()} />
                <SecondryButton text={'Cancel'} onClick={() => this.Close()} />
              </div>
            </Form.Item>
          </Form>
        </Drawer>
      </div>
    );
  }
}

const NotificationDrawerForm = Form.create('Notification')(Notification);

const mapStateToProps = state => {
  return {
    notificationdropdownlist: state.NotificationReducer.notificationdropdownlist
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchNotificationDropDownList: () =>
      dispatch(fetchNotificationDropDownList()),
    postNotification: data => dispatch(postNotification(data)),
    editNotification: data => dispatch(editNotification(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationDrawerForm);
