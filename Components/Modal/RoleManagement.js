import React from 'react';
import { Drawer, Form, Input, Switch, Tree, Typography } from 'antd';
import { PrimaryButton, SecondryButton } from '../Button/Button';
import { version } from '../../APIConfig/Config';
import { connect } from 'react-redux';
import {
  postRoleManagementData,
  editRoleManagementData
} from '../../Redux/Actions/SecurityAction/RoleManagementAction';

import datatree from '../../Redux/TreeData/datatree.json';
import Clear_Gray from '../../Assets/icons/SV_ICONS/Clear_Gray.png';
// import Theme from "../../Assets/Theme/Theme";
import { defineMessages } from 'react-intl';
import RoleManagementIcon from '../../Assets/icons/SV_ICONS/Role Management_Blue.png';
import style from '../../styles';
// import * as ApiInfo from "../../APIConfig/ApiParameters";


const messages = defineMessages({
  'Price must greater than zero!': {
    id: 'RoleManagement.PriceMustGreaterThanZero',
    defaultMessage: 'Price must greater than zero!'
  },
  'Edit Role Management Setting': {
    id: 'RoleManagement.EditRoleManagementSetting',
    defaultMessage: 'Edit Role Management Setting'
  },
  'Add Role Management Setting': {
    id: 'RoleManagement.AddRoleManagementSetting',
    defaultMessage: 'Add Role Management Setting'
  },
  'Close Now': {
    id: 'RoleManagement.CloseNow',
    defaultMessage: 'Close Now'
  },
  'Role:': {
    id: 'RoleManagement.Role',
    defaultMessage: 'Role:'
  },
  'please Enter role Name': {
    id: 'RoleManagement.PleaseEnterRoleName',
    defaultMessage: 'please Enter role Name'
  },
  'Description:': {
    id: 'RoleManagement.Description',
    defaultMessage: 'Description:'
  },
  'Please enter description': {
    id: 'RoleManagement.PleaseEnterDescription',
    defaultMessage: 'Please enter description'
  },
  'Enable Sync:': {
    id: 'RoleManagement.EnableSync',
    defaultMessage: 'Enable Sync:'
  },
  'Assign Permission:': {
    id: 'RoleManagement.AssignPermission',
    defaultMessage: 'Assign Permission:'
  },
  Save: {
    id: 'RoleManagement.Save',
    defaultMessage: 'Save'
  }
});

const { Title } = Typography;
// const { Option } = Select
const { TreeNode } = Tree;
// const { Text } = Typography

class RoleManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkValue: [],
      data: datatree.treeData
    };
  }

  switchChanged = e => {
    this.setState({
      Enable_Sync: e
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { values } = this.props;
    this.props.form.validateFieldsAndScroll((err, data) => {
      if (err) {
        //ApiInfo.DEBUGER && console.log("error", err)
      } else {
        data.id = values && values.ROLE_ID;
        if (this.props.values) {
          this.props.editRoleManagementData(data);
        } else {
          this.props.postRoleManagementData(data);
        }
        this.props.close();
        this.props.form.resetFields();
      }
    });
  };

  renderTreeNodes = data =>
    data.map((item, index) => {
      if (item.children) {
        return (
          <TreeNode
            disabled={
              this.props.values && this.props.values.ROLE_TYPE === 'S' && true
            }
            selectable={false}
            key={item.key}
            title={item.title}
            isLeaf={false}
            // disabled={item.disabled || false}
            dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return (
        <TreeNode
          disabled={
            this.props.values && this.props.values.ROLE_TYPE === 'S' && true
          }
          selectable={false}
          {...item}
          dataRef={item}
        />
      );
    });

  checkPrice = (value, callback) => {
    const { formatMessage } = this.props;
    if (value.number > 0) {
      callback();
      return;
    }
    callback(formatMessage(messages['Price must greater than zero!']));
  };
  Close = () => {
    this.props.close();
    this.props.form.resetFields();
  };
  // onCheck = (checkedKeys, e) => {
  //   this.setState({ permissionAssignValues: checkedKeys });
  // };
  // renderTreeNodes = (data) => {
  //   try {
  //     return data && data.map((item, index) => {
  //       if (item.children) {
  //         return (
  //           <TreeNode
  //             selectable={false}
  //             key={item.path}
  //             title={item.name}
  //             isLeaf={false}
  //             disabled={item.disabled || false}
  //             dataRef={item}>
  //             {this.renderTreeNodes(item.children)}
  //           </TreeNode>
  //         );
  //       }
  //       return <TreeNode selectable={false} {...item} dataRef={item} />;
  //     });
  //   } catch (e) {
  //     console.log('err', e)
  //   }
  // }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { data } = this.state;
    const { roleManagement, values, formatMessage } = this.props;
    return (
      <div>
        <Drawer
          width={400}
          onClose={() => this.Close()}
          closable={false}
          visible={roleManagement}
          maskStyle={{ backgroundColor: 'transparent' }}>
          <div style={{ ...style.setting.drawerMain }}>
            <div style={{ ...style.setting.drawerIconTitleWrapper }}>
              <img
                alt=''
                title='Role Management'
                src={RoleManagementIcon}
                style={{ ...style.setting.drawerIcons }}></img>
              <Title style={{ ...style.setting.drawerTitles }}>
                {values
                  ? formatMessage(messages['Edit Role Management Setting'])
                  : formatMessage(messages['Add Role Management Setting'])}
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

          <Form layout='vertical' onSubmit={this.handleSubmit}>
            <Form.Item label={formatMessage(messages['Role:'])}>
              {getFieldDecorator('roleName', {
                initialValue: values && values.ROLE_NAME,
                rules: [
                  {
                    required: true,
                    message: formatMessage(messages['please Enter role Name'])
                  }
                ]
              })(
                <Input disabled={values && values.ROLE_TYPE === 'S' && true} />
              )}
            </Form.Item>

            <Form.Item
              style={{ ...style.formItemBetweenGap }}
              label={formatMessage(messages['Description:'])}>
              {getFieldDecorator('roleDesc', {
                initialValue: values && values.ROLE_DESCRIPTION
                // rules: [
                //   {
                //     required: true,
                //     message: formatMessage(messages['Please enter description'])
                //   }
                // ]
              })(
                <Input disabled={values && values.ROLE_TYPE === 'S' && true} />
              )}
            </Form.Item>

            <Form.Item
              style={{ ...style.formItemBetweenGap }}
              label={formatMessage(messages['Enable Sync:'])}>
              {getFieldDecorator('Enable_Sync', {
                valuePropName: 'checked',
                initialValue: values && values.STATUS === 1 ? true : false
              })(
                <Switch disabled={values && values.ROLE_TYPE === 'S' && true} />
              )}
            </Form.Item>
            {version > 7.1 && values && values.ROLE_ID === 3 && <Form.Item
              style={{ ...style.formItemBetweenGap }}
              label={formatMessage(messages['Assign Permission:'])}>
              <div>
                <Tree
                  disabled={values && values.ROLE_TYPE === 'S' && true}
                  showLine
                  defaultExpandedKeys={['0-0-0-0']}
                  onSelect={this.onSelect}
                  onCheck={this.onCheck}
                  checkable={true}>
                  {this.renderTreeNodes(data)}
                </Tree>
              </div>
            </Form.Item>}
            {/* {values && values.ROLE_NAME === "EAS GENERAL USER" &&  <Form.Item label='Assign Permission' style={{ ...style.formItemBetweenGap, marginBottom: 40 }}>
              {
                getFieldDecorator('Assign Permission', {})(
                  <Tree
                    disabled={values && values.ROLE_TYPE === 'S' && true}
                    showLine
                    checkedKeys={["My Archived Email"]}
                    // defaultCheckedKeys={ ["CN=Users,DC=e2016,DC=com", "CN=Computers,DC=e2016,DC=com", "CN=User,CN={31B2F340-016D-11D2-945F-00C04FB984F9},CN=Policies,CN=System,DC=e2016,DC=com", "CN=PolicyType,CN=WMIPolicy,CN=System,DC=e2016,DC=com", "CN=f3dd09dd-25e8-4f9c-85df-12d6d2f2f2f5,CN=Operations,CN=DomainUpdates,CN=System,DC=e2016,DC=com"]}
                    // defaultExpandedKeys={['0-0-0-0']}
                    onSelect={this.onSelect}
                    onCheck={this.onCheck}
                    checkable={true}

                  >
                    {
                      this.renderTreeNodes([
                        {
                          "name": "My Archived Email",
                          "path": "My Archived Email",
                          "children": []
                        }])
                    }
                  </Tree>
                )}
            </Form.Item>} */}

            <Form.Item style={{ ...style.formItemBetweenGap }}>
              <div style={{ ...style.drawerButtons }}>
                <PrimaryButton
                  disabled={values && values.ROLE_TYPE === 'S' && true}
                  text={formatMessage(messages['Save'])}
                  htmlType='submit' />
                <SecondryButton
                  text='Cancel'
                  onClick={() => this.Close()}
                  style={{ marginRight: 8 }} />
              </div>
            </Form.Item>
          </Form>
        </Drawer>
      </div>
    );
  }
}

const RoleManagementDrawerForm = Form.create('')(RoleManagement);

const mapStateToProps = state => {
  return {
    roleId: state.RoleManagementReducer.roleId
    // success: state.RoleManagementReducer.success,
    // error: state.RoleManagementReducer.error
  };
};
const mapDispatchToProps = dispatch => {
  return {
    postRoleManagementData: data => dispatch(postRoleManagementData(data)),
    editRoleManagementData: data => dispatch(editRoleManagementData(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoleManagementDrawerForm);
