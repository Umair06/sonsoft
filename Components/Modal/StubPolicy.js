import React from 'react';
import {
  Drawer,
  Form,
  Input,
  Switch,
  Transfer,
  Button,
  Typography,
  message,
  Spin,
  ConfigProvider
} from 'antd';
import { PrimaryButton } from '../Button/Button';
import { SecondryButton } from '../Button/Button';
// import Theme from '../../Assets/Theme/Theme';
import Clear_Gray from '../../Assets/icons/SV_ICONS/Clear_Gray.png';
import { connect } from 'react-redux';
import {
  PostStubPolicyDetails,
  EditStubPolicyDetails,
  fetchArchivedUserList
} from '../../Redux/Actions/Policies/StubPolicyAction';
import { defineMessages } from 'react-intl';
import style from '../../styles';
import StubIcon from '../../Assets/icons/SV_ICONS/Scheduler_Blue.png';

// const { color } = Theme;

const messages = defineMessages({
  content: {
    id: 'StubPolicy.content',
    defaultMessage: 'content'
  },
  'description of content': {
    id: 'StubPolicy.descriptionOfContent',
    defaultMessage: 'description of content'
  },
  'Couldnot Save Something Went Wrong': {
    id: 'StubPolicy.CouldnotSaveSomethingWentWrong',
    defaultMessage: 'Couldnot Save Something Went Wrong'
  },
  Reset: {
    id: 'StubPolicy.Reset',
    defaultMessage: 'Reset'
  },
  'Edit Stub Policy': {
    id: 'StubPolicy.EditStubPolicy',
    defaultMessage: 'Edit Stub Policy'
  },
  'Add Stub Policy': {
    id: 'StubPolicy.AddStubPolicy',
    defaultMessage: 'Add Stub Policy'
  },
  'Stub Policy Name:': {
    id: 'StubPolicy.StubPolicyName',
    defaultMessage: 'Stub Policy Name:'
  },
  'Please Enter Stub Policy Name': {
    id: 'StubPolicy.PleaseEnterStubPolicyName',
    defaultMessage: 'Please Enter Stub Policy Name'
  },
  'Stub Policy Description:': {
    id: 'StubPolicy.StubPolicyDescription',
    defaultMessage: 'Stub Policy Description:'
  },
  'Please Enter Stub Policy Description': {
    id: 'StubPolicy.PleaseEnterStubPolicyDescription',
    defaultMessage: 'Please Enter Stub Policy Description'
  },
  'Stub Period(Days):': {
    id: 'StubPolicy.StubPeriodInDays',
    defaultMessage: 'Stub Period(Days):'
  },
  'Please Enter Stub Period(Days)': {
    id: 'StubPolicy.PleaseEnterStubPeriod(Days)',
    defaultMessage: 'Please Enter Stub Period(Days)'
  },
  Available: {
    id: 'StubPolicy.Available',
    defaultMessage: 'Available'
  },
  Selected: {
    id: 'StubPolicy.Selected',
    defaultMessage: 'Selected'
  },
  Mailbox: {
    id: 'StubPolicy.Mailbox',
    defaultMessage: 'Mailbox'
  },
  'Mailbox(es)': {
    id: 'StubPolicy.Mailboxes',
    defaultMessage: 'Mailbox(es)'
  },
  Save: {
    id: 'StubPolicy.Save',
    defaultMessage: 'Save'
  }
});

// const { color } = Theme;
const { Title } = Typography;

class StubPolicy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkValue: [],
      // selectedKeys: []
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (props.stubSideDrawer && !props.archivedusers) {
      props.fetchArchivedUserList();
    }
    return null;
  }

  filterOption = (inputValue, option) => {
    try{
      return option.title.indexOf(inputValue) > -1;
    }catch(e){}
  }

  renderFooter = () => {
    const { formatMessage } = this.props;
    return (
      <Button
        size='small'
        style={{ float: 'right', margin: 5 }}
        onClick={this.getMock}>
        {formatMessage(messages['Reset'])}
      </Button>
    );
  };
  handleChange = nextTargetKeys => {
    this.setState({ stubUsers: nextTargetKeys });
  };

  handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    this.setState({
      selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys]
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { values } = this.props;

    this.props.form.validateFieldsAndScroll((err, data) => {
      if (err) {
      } else {
        if ((Array.isArray(this.state.stubUsers) && this.state.stubUsers.length > 0) ) {
          data.userid = values && values.USER_LIST;
          data.policyid = values && values.STUB_POLICY_ID;
          data.users = this.state.stubUsers;
          if (values) {
            this.props.EditStubPolicyDetails(data);
          } else {
            this.props.PostStubPolicyDetails(data);
          }
          this.Close();
        } else {
          message.warn('Must add atleast one mailbox');
        }
      }
    });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  getData = archivedusers => {
    const Data = [];
    for (let i = 0; i < archivedusers.length; i++) {
      let data = {
        key: archivedusers[i].USER_ID,
        title: archivedusers[i].MAILBOX_NAME
      };
      Data.push(data);
    }
    return Data;
  };
  renderItem = item => {
    const customLabel = <span className='custom-item'>{item.title}</span>;

    return {
      label: customLabel, // for displayed item
      value: item.title // for title and filter matching
    };
  };
  getTargetKeys = text => {
    if (!this.state.stubUsers) {
      let stub = text && JSON.parse(text && text.replace(/'/g, '"'));
      let targetKeys = stub && stub.map(val => val);

      stub &&
        this.setState({
          stubUsers: targetKeys
        });
    }
  };
  Close = () => {
    this.props.close();
    this.props.form.resetFields();
    this.setState({
      stubUsers: undefined
    });
  };

  customizeRenderEmpty = () => {
    // const { formatMessage } = this.props;
    return (
      <div style={{ textAlign: 'center' }}>
        <Spin />
        <p>{"Fetching"}</p>
      </div>
    )
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { values, stubSideDrawer, formatMessage } = this.props;
    const { selectedKeys, stubUsers } = this.state;
    values && stubSideDrawer && this.getTargetKeys(values.USER_LIST);
    return (
      <div>
        <Drawer
          width={600}
          onClose={() => this.Close()}
          closable={false}
          visible={stubSideDrawer}
          maskStyle={{ backgroundColor: 'transparent' }}>
          <div style={{ ...style.setting.drawerMain }}>
            <div style={{ ...style.setting.drawerIconTitleWrapper }}>
              <img
                title='Stub'
                src={StubIcon}
                alt=""
                style={{ ...style.setting.drawerIcons }}></img>
              <Title style={{ ...style.setting.drawerTitles }}>
                {values
                  ? formatMessage(messages['Edit Stub Policy'])
                  : formatMessage(messages['Add Stub Policy'])}
              </Title>
            </div>
            <div
              onClick={() => this.Close()}
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
            <Form.Item label='Stub Policy Name:'>
              {getFieldDecorator('Stub_Policy_Name', {
                initialValue: values && values.STUB_POLICY_NAME,
                rules: [
                  { required: true, message: 'Please Enter Stub Policy Name ' }
                ]
              })(<Input />)}
            </Form.Item>

            <Form.Item
              label='Stub Policy  Description:'
              style={{ ...style.formItemBetweenGap }}>
              {getFieldDecorator('Stub_Policy_Description', {
                initialValue: values && values.STUB_POLICY_DESC
              })(<Input />)}
            </Form.Item>
            <Form.Item
              label='Stub Period(Days):'
              style={{ ...style.formItemBetweenGap }}>
              {getFieldDecorator('Stub_Period', {
                initialValue:
                  values && values.STUB_PERIOD ? values.STUB_PERIOD : '365',
                rules: [
                  { required: true, message: 'Please Enter Stub Period(Days)' }
                ]
              })(<Input type='number' />)}
            </Form.Item>

            <Form.Item label='' style={{ ...style.formItemBetweenGap }}>
              {getFieldDecorator('Enable_Sync', {
                valuePropName: 'checked',
                initialValue:
                  values && values.IS_ACTIVE ? values.IS_ACTIVE : false
              })(<Switch />)}
              <span style={{ ...style.paddingLeft }}> Enabled</span>
            </Form.Item>

            <ConfigProvider renderEmpty={!(this.props.archivedusers && this.props.archivedusers.length > 0) && this.customizeRenderEmpty}>
            <div
              style={{ ...style.formItemBetweenGap, ...style.allTrasferStyle }}>
              <Transfer
                titles={[
                  formatMessage(messages['Available']),
                  formatMessage(messages['Selected'])
                ]}
                locale={{
                  itemUnit: formatMessage(messages['Mailbox']),
                  itemsUnit: formatMessage(messages['Mailbox(es)'])
                }}
                dataSource={
                  this.props.archivedusers &&
                  this.getData(this.props.archivedusers)
                }
                showSearch
                targetKeys={stubUsers}
                selectedKeys={selectedKeys}
                listStyle={{ ...style.transfer.transferListStyle }}
                filterOption={this.filterOption}
                onChange={(nextTargetKeys, direction, moveKeys) =>
                  this.handleChange(nextTargetKeys, direction, moveKeys)
                }
                onSearch={this.handleSearch}
                render={item => this.renderItem(item)}
              // footer={this.renderFooter}
              />
            </div>
            </ConfigProvider>
           
            <Form.Item>
              <div style={{ ...style.drawerButtons }}>
                <PrimaryButton
                  text={formatMessage(messages['Save'])}
                  disabled={!this.props.archivedusers}
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

const StubPolicyDrawerForm = Form.create('StubPolicy')(StubPolicy);

const mapStateToProps = state => {
  return {
    stubsetting: state.StubPolicyReducer.stubsetting,
    archivedusers: state.StubPolicyReducer.archivedusers
  };
};
const mapDispatchToProps = dispatch => {
  return {
    PostStubPolicyDetails: data => dispatch(PostStubPolicyDetails(data)),
    EditStubPolicyDetails: data => dispatch(EditStubPolicyDetails(data)),
    fetchArchivedUserList: () => dispatch(fetchArchivedUserList())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StubPolicyDrawerForm);
