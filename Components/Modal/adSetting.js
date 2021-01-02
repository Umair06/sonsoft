import React from 'react';
import {
  Drawer,
  Form,
  Input,
  Radio,
  Checkbox,
  Tree,
  Typography,
  Switch,
  Skeleton
} from 'antd';
import { defineMessages } from 'react-intl';
import { connect } from 'react-redux';
import style from '../../styles';
import Clear_Gray from '../../Assets/icons/SV_ICONS/Clear_Gray.png';
import AdSettingIcon from '../../Assets/icons/SV_ICONS/SonaVault Icon31.png';
import { PrimaryButton, SecondryButton } from '../Button/Button';
import { EnCrypt, DeCrypt } from '../../PasswordEncryption/PasswordEncryption';
import {
  postActiveDirectoryUser,
  updateActiveDirectoryUser,
  fetchOUListByID,
  fetchOUUserList,
  savedOUListById,
  savedOUList
} from '../../Redux/Actions/ConfigurationAction/ActiveDirectoryAction';
import { fetchUserType } from '../../Redux/Actions/SecurityAction/UserManagementAction';
import * as ApiInfo from "../../APIConfig/ApiParameters";


const messages = defineMessages({
  'Couldnot save something went wrong': {
    id: 'AdSetting.CouldnotSaveSomethingWentWrong',
    defaultMessage: 'Couldnot save something went wrong'
  },
  'Edit AD Setting': {
    id: 'AdSetting.EditADSetting',
    defaultMessage: 'Edit AD Setting'
  },
  'Add AD Setting': {
    id: 'AdSetting.AddADSetting',
    defaultMessage: 'Add AD Setting'
  },
  Domain: {
    id: 'AdSetting.DomainName',
    defaultMessage: 'Domain'
  },
  'Please Enter Domain': {
    id: 'AdSetting.PleaseEnterDomainName',
    defaultMessage: 'Please Enter Domain'
  },
  'User Name': {
    id: 'AdSetting.UserName',
    defaultMessage: 'User Name'
  },
  NetBIOS: {
    id: 'AdSetting.NetBIOS',
    defaultMessage: 'NetBIOS'
  },
  'Please Enter User Name': {
    id: 'AdSetting.PleaseEnterUserName',
    defaultMessage: 'Please Enter User Name'
  },
  'Please Enter NetBIOS': {
    id: 'AdSetting.PleaseEnterNetBIOS',
    defaultMessage: 'Please Enter NetBIOS'
  },
  Password: {
    id: 'AdSetting.Password',
    defaultMessage: 'Password'
  },
  'Please Enter Password': {
    id: 'AdSetting.PleaseEnterPassword',
    defaultMessage: 'Please Enter Password'
  },
  'Enabled Sync : ': {
    id: 'AdSetting.EnabledSync',
    defaultMessage: 'Enabled Sync : '
  },
  'Azure Users? : ': {
    id: 'AdSetting.AzureUsers',
    defaultMessage: 'Azure Users? : '
  },
  'Application Client ID :': {
    id: 'AdSetting.ApplicationClientID',
    defaultMessage: 'Application Client ID :'
  },
  'Please write Application Client ID': {
    id: 'AdSetting.PleaseWriteApplicationClientID',
    defaultMessage: 'Please write Application Client ID'
  },
  'Discover Organizational Unit : ': {
    id: 'AdSetting.DiscoverOrganizationalUnit',
    defaultMessage: 'Discover Organizational Unit : '
  },
  'Please Enter Discover Organization Unit': {
    id: 'AdSetting.PleaseEnterDiscoverOrganizationUnit',
    defaultMessage: 'Please Enter Discover Organization Unit'
  },
  All: {
    id: 'AdSetting.All',
    defaultMessage: 'All'
  },
  Selected: {
    id: 'AdSetting.Selected',
    defaultMessage: 'Selected'
  },
  Save: {
    id: 'AdSetting.Save',
    defaultMessage: 'Save'
  }
});

const { Title, Text } = Typography;
const { TreeNode } = Tree;

class AdSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkValue: [],
      DomainName: this.props.values ? this.props.values.AD_DOMAIN_NAME : '',
      UserName: this.props.values ? this.props.values.AD_USER_NAME : '',
      AdSettingOption: 1,
      azure:
        props.values ?
          props.values.IS_AZURE &&
            (props.values.IS_AZURE === null || props.values.IS_AZURE === 'null')
            ? false
            : props.values && props.values.IS_AZURE : false,
      OUUserList: false,
      OUListNewUsers: true
    };
  }
  static getDerivedStateFromProps(props, state) {
    props.activeDirectoryDrawer && props.values && props.userType === 'A' && !props.values.IS_AZURE && !props.OUListById && props.fetchOUListByID(props.values.AD_ID);
    !props.userType && props.fetchUserType();

    if (props.activeDirectoryDrawer && props.values && !state.fetchAzure) {
      return {
        checkedKeys: props.values.OU_LIST,
        Enable_Sync: props.values.IS_ACTIVE,
        AdSettingOption:props.values &&  props.values.OU_LIST !== "" ? 2 : 1,
        OUListKeyValues: props.values ? props.values.OU_LIST && typeof(props.values.OU_LIST) === "object" && props.values.OU_LIST.split(";") : "",
        azure:
          props.values !== undefined ? props.values.IS_AZURE === null || props.values.IS_AZURE === 'null'
            ? false
            : props.values.IS_AZURE : false,
        fetchAzure: true,

      };
    }
    return {

    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const { values } = this.props;
    // e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, data) => {
      if (err) {
        //ApiInfo.DEBUGER && console.log("error", err)

      } else {
        data.discoverOU = this.state.AdSettingOption;
        data.adId = values && values.AD_ID;
        data.Enable_Sync = this.state.Enable_Sync;
        data.isAzure = this.state.azure;
        let password = EnCrypt(data.Password);
        data.Password = password;

        let object = {
          data: data,
          selectedOUList: this.state.OUListKeyValues || []
        }
        if (values) {
          this.props.updateActiveDirectoryUser(object);
        } else {
          this.props.postActiveDirectoryUser(object);
        }
        this.Close();
      }
    });

  };



  changeHandler = (e) => {
    e.preventDefault();
    // const { values } = this.props;
    let fields = ['Password', 'User_Name', 'Domain_Name']
    fields.splice(fields.indexOf(e.target.id), 1)
    this.props.form.validateFieldsAndScroll((err, data) => {
      if (!data[fields[0]] || !data[fields[1]] || !e.target.value) {
        this.setState({ OUListNewUsers: true })
        this.props.savedOUList()
      } else {
        if (data[fields[0]] && data[fields[1]] && e.target.value) {
          let obj = {
            domain: data.Domain_Name,
            username: data.User_Name,
            password: EnCrypt(data.Password)
          }
          this.setState({ OUListNewUsers: false })
          this.props.fetchOUUserList(obj);
        }
      }
    });
  };

  AdSettingSelect = e => {
    this.setState({
      AdSettingOption: e.target.value
    });
  };
  selectAzure = () => {
    this.setState({
      azure: !this.state.azure
    });
  };
  renderTreeNodes = (data) => {
    try {
      return data && data.map((item, index) => {
        if (item.children) {
          return (
            <TreeNode
              selectable={false}
              key={item.path}
              title={item.name}
              isLeaf={false}
              disabled={item.disabled || false}
              dataRef={item}>
              {this.renderTreeNodes(item.children)}
            </TreeNode>
          );
        }
        return <TreeNode selectable={false} {...item} dataRef={item} />;
      });
    } catch (e) {
      ApiInfo.DEBUGER && console.log('err', e)
    }
  }

  EnableSync = checked => {
    this.setState({
      Enable_Sync: checked
    });
  };
  onCheck = (checkedKeys, e) => {
    const { OUListKeyValues } = this.state;
    let checkedKeyValues = [...OUListKeyValues]
    if (e.checked) {
      checkedKeyValues.push(...checkedKeys)
    } else {
      checkedKeyValues = checkedKeyValues.filter(key => checkedKeys.includes(key))
    }
    this.setState({ OUListKeyValues: checkedKeyValues });
  };
  Close = () => {
    this.setState({
      Enable_Sync: false,
      azure: false,
      fetchAzure: false,
      checkedKeys: "",
      AdSettingOption: 1,
      OUUserList: false,
      OUListNewUsers: true
    });
    this.props.close();
    this.props.savedOUListById();
    this.props.savedOUList();
    this.props.form.resetFields();

  };
  resetOUList = () => {
    this.setState({ checkedKeys: [] });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { AdSettingOption, azure } = this.state;
    const { values, activeDirectoryDrawer, formatMessage } = this.props;
    let password = values && values.AD_PASSWORD && DeCrypt(values.AD_PASSWORD);

    return (
      <div>
        <Drawer
          width={400}
          onClose={() => this.Close()}
          visible={activeDirectoryDrawer}
          closable={false}
          maskStyle={{ backgroundColor: 'transparent' }}
        >
          <div style={{ ...style.setting.drawerMain }}>
            <div style={{ ...style.setting.drawerIconTitleWrapper }}>
              <img
                alt=''
                title='AdSetting'
                src={AdSettingIcon}
                style={{ ...style.setting.drawerIcons }}></img>
              <Title style={{ ...style.setting.drawerTitles }}>
                {values
                  ? formatMessage(messages['Edit AD Setting'])
                  : formatMessage(messages['Add AD Setting'])}
              </Title>
            </div>
            <div
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
            <Form.Item label={formatMessage(messages['Domain'])}>
              {getFieldDecorator('Domain_Name', {
                initialValue: values && values.AD_DOMAIN_PATH,
                rules: [
                  {
                    required: true,
                    message: 'Please Enter Domain'
                  }
                ]
              })(<Input onChange={!this.props.values && this.changeHandler} />)}
            </Form.Item>
            {this.props.userType !== 'A' && (
              <Form.Item
                label={formatMessage(messages['NetBIOS'])}
                style={style.formItemBetweenGap}>
                {getFieldDecorator('netBios', {
                  initialValue: values && values.AD_DOMAIN_NAME,
                  rules: [
                    {
                      required: true,
                      message: formatMessage(messages['Please Enter NetBIOS'])
                    }
                  ]
                })(<Input />)}
              </Form.Item>
            )}
            <Form.Item
              label={formatMessage(messages['User Name'])}
              style={{ ...style.formItemBetweenGap }}>
              {getFieldDecorator('User_Name', {
                initialValue: values && values.AD_USER_NAME,
                rules: [
                  {
                    required: true,
                    message: formatMessage(messages['Please Enter User Name'])
                  }
                ]
              })(<Input onChange={!this.props.values && this.changeHandler} />)}
            </Form.Item>

            <Form.Item
              label={formatMessage(messages['Password'])}
              style={{ ...style.formItemBetweenGap }}>
              {getFieldDecorator('Password', {
                initialValue: password,
                rules: [
                  {
                    required: true,
                    message: formatMessage(messages['Please Enter Password'])
                  }
                ]
              })(<Input onChange={!this.props.values && this.changeHandler} type='password' />)}
            </Form.Item>

            <Form.Item style={style.formItemBetweenGap} label=''>
              <div style={{ display: 'flex' }}>
                <Text style={{ marginRight: '5px' }}>Enable : </Text>
                {getFieldDecorator('enable', {
                  valuePropName: 'checked',
                  initialValue: values && values.IS_ACTIVE
                })(<Switch onChange={e => this.EnableSync(e)}></Switch>)}
              </div>
            </Form.Item>

            <Form.Item style={{ ...style.formItemBetweenGap }}>
              <div style={{ display: 'flex' }}>
                <Text style={{ marginRight: '5px' }}>Azure : </Text>
                {getFieldDecorator('Azure_Users', {
                  valuePropName: 'checked',
                  initialValue: values && values.IS_AZURE
                })(
                  <Checkbox
                    checked={azure}
                    onChange={() => this.selectAzure()}
                  />
                )}
              </div>
            </Form.Item>
            {azure && (
              <Form.Item
                label={formatMessage(messages['Application Client ID :'])}
                style={{ ...style.formItemBetweenGap }}>
                {getFieldDecorator('Application_Client_ID', {
                  initialValue: values && values.APP_CLIENT_ID,
                  rules: [
                    {
                      required: true,
                      message: formatMessage(
                        messages['Please write Application Client ID']
                      )
                    }
                  ]
                })(<Input />)}
              </Form.Item>
            )}


            <Form.Item
              label='Discover Organizational Unit:'
              style={{ ...style.formItemBetweenGap }}>
              <div>

                <Radio.Group
                  disabled={azure || this.props.userType !== 'A' || (!this.props.values && this.state.OUListNewUsers)}
                  onChange={this.AdSettingSelect}
                  value={AdSettingOption}>
                  <Radio onClick={this.resetOUList} value={1}>{formatMessage(messages['All'])}</Radio>
                  <Radio
                    // onClick={this.fetchOUList}
                    disabled={azure || this.props.userType !== 'A'}
                    value={2}>
                    {formatMessage(messages['Selected'])}
                  </Radio>
                </Radio.Group>
              </div>
            </Form.Item>
            <Form.Item label='' style={{ ...style.formItemBetweenGap, marginBottom: 0 }}>
              {AdSettingOption === 2 &&
                getFieldDecorator('Assign Permission', {})(
                  <Tree
                    showLine
                    checkedKeys={this.props.values && this.state.OUListKeyValues}
                    // defaultCheckedKeys={ ["CN=Users,DC=e2016,DC=com", "CN=Computers,DC=e2016,DC=com", "CN=User,CN={31B2F340-016D-11D2-945F-00C04FB984F9},CN=Policies,CN=System,DC=e2016,DC=com", "CN=PolicyType,CN=WMIPolicy,CN=System,DC=e2016,DC=com", "CN=f3dd09dd-25e8-4f9c-85df-12d6d2f2f2f5,CN=Operations,CN=DomainUpdates,CN=System,DC=e2016,DC=com"]}
                    // defaultExpandedKeys={['0-0-0-0']}
                    onSelect={this.onSelect}
                    onCheck={this.onCheck}
                    checkable={true}
                  >
                    {this.props.activeDirectoryDrawer && this.props.userType === "A" && this.props.values
                      ?
                      this.renderTreeNodes(this.props.OUListById && this.props.OUListById.data && this.props.OUListById.data.data && Array.isArray(this.props.OUListById.data.data.output) && this.props.OUListById.data.data.output[0] && this.props.OUListById.data.data.output[0].OUs)
                      :
                      !this.props.values && this.renderTreeNodes(this.props.OUlist && this.props.OUlist.data && this.props.OUlist.data.data && Array.isArray(this.props.OUlist.data.data.output) && this.props.OUlist.data.data.output[0] && this.props.OUlist.data.data.output[0].OUs)}
                  </Tree>
                )}
            </Form.Item>
            {values && values.IS_AZURE && <Form.Item
              style={{ ...style.formItemBetweenGap }}>
              {getFieldDecorator('notify', {
                initialValue: values && values.APP_CLIENT_ID,
                rules: [
                  {
                    required: true,
                    message: formatMessage(
                      messages['Please write Application Client ID']
                    )
                  }
                ]
              })(<Text style={{ fontSize: 12, color: "red" }} >No Organizational Units found with the provided details.</Text>)}
            </Form.Item>}
            <Form.Item >
              <div style={{ ...style.drawerButtons }}>
                <PrimaryButton text={formatMessage(messages['Save'])} htmlType='submit'/>
                <SecondryButton text='Cancel' onClick={() => this.Close()} style={{ marginRight: 8 }}/>
              </div>
            </Form.Item>
          </Form>
          </Skeleton>
        </Drawer>
      </div>
    );
  }
}

const AdSettingDrawerForm = Form.create('AdSetting')(AdSetting);

const mapStateToProps = state => {
  return {
    userType: state.UserManagementReducer.userType,
    OUlist: state.ConfigurationReducer.OUlist,
    OUListById: state.ConfigurationReducer.OUListById
  };
};
const mapDispatchToProps = dispatch => {
  return {
    postActiveDirectoryUser: data => dispatch(postActiveDirectoryUser(data)),
    updateActiveDirectoryUser: data => dispatch(updateActiveDirectoryUser(data)),
    fetchUserType: () => dispatch(fetchUserType()),
    fetchOUListByID: (data) => dispatch(fetchOUListByID(data)),
    fetchOUUserList: (data) => dispatch(fetchOUUserList(data)),
    savedOUListById: () => dispatch(savedOUListById()),
    savedOUList: () => dispatch(savedOUList())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdSettingDrawerForm);
