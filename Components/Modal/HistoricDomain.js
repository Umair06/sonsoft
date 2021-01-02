import React from 'react';
import {
  Drawer,
  Form,
  Input,
  Transfer,
  Button,
  Typography,
  message,
  Spin,
  // ConfigProvider
} from 'antd';
import { PrimaryButton, SecondryButton } from '../Button/Button';
// import { SecondryButton } from "../Button/Button"
import Clear_Gray from '../../Assets/icons/SV_ICONS/Clear_Gray.png';
//import Theme from '../../Assets/Theme/Theme';
import { defineMessages } from 'react-intl';
import { fetchUsers } from '../../Redux/Actions/SecurityAction/UserManagementAction';
import style from '../../styles';
import { connect } from 'react-redux';
import {
  postHistoricDomain,
  editHistoricDomain
} from '../../Redux/Actions/ConfigurationAction/HistoricDomainAction';
import HistoricDomainIcon from '../../Assets/icons/SV_ICONS/Old Domain Settings_Blue.png';
// import * as ApiInfo from "../../APIConfig/ApiParameters";


const messages = defineMessages({
  content: {
    id: 'HistoricDomain.content',
    defaultMessage: 'content'
  },
  'description of content': {
    id: 'HistoricDomain.descriptionOfContent',
    defaultMessage: 'description of content'
  },
  'Couldnot Save Something Went Wrong': {
    id: 'HistoricDomain.CouldnotSaveSomethingWentWrong',
    defaultMessage: 'Couldnot Save Something Went Wrong'
  },
  Reset: {
    id: 'HistoricDomain.Reset',
    defaultMessage: 'Reset'
  },
  'Edit Historic Domain': {
    id: 'HistoricDomain.EditHistoricDomain',
    defaultMessage: 'Edit Historic Domain'
  },
  'Add Historic Domain': {
    id: 'HistoricDomain.AddHistoricDomain',
    defaultMessage: 'Add Historic Domain'
  },
  'Old Domain Name': {
    id: 'HistoricDomain.OldDomainName',
    defaultMessage: 'Old Domain Name'
  },
  'Please enter Old Domain Name': {
    id: 'HistoricDomain.PleaseEnterOldDomainName',
    defaultMessage: 'Please enter Old Domain Name'
  },
  'Old Domain Description': {
    id: 'HistoricDomain.OldDomainDescription',
    defaultMessage: 'Old Domain Description'
  },
  'Please enter Old Domain Description': {
    id: 'HistoricDomain.PleaseEnterOldDomainDescription',
    defaultMessage: 'Please enter Old Domain Description'
  },
  Available: {
    id: 'HistoricDomain.Available',
    defaultMessage: 'Available'
  },
  Selected: {
    id: 'HistoricDomain.Selected',
    defaultMessage: 'Selected'
  },
  Mailbox: {
    id: 'HistoricDomain.Mailbox',
    defaultMessage: 'Mailbox'
  },
  'Mailbox(es)': {
    id: 'HistoricDomain.Mailboxes',
    defaultMessage: 'Mailbox(es)'
  },
  Save: {
    id: 'HistoricDomain.Save',
    defaultMessage: 'Save'
  }
});

//const { color } = Theme;
const { Title } = Typography;

class HistoricDomain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkValue: [],
      mockData: [],
      targetKeys: [],
      description: this.props.values ? this.props.values.description : '',
      oldDomainName: this.props.values ? this.props.values.oldDomainName : ''
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (props.historicDomainSideDrawer && !props.archiveduserlist) {
      props.fetchUsers();
    }
    return null;
  }

  filterOption = (inputValue, option) =>
    option.title.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;
  handleSubmit = e => {
    e.preventDefault();
    const { userKeys } = this.state;
    if (userKeys && Array.isArray(userKeys) && userKeys.length) {
      this.props.form.validateFieldsAndScroll((err, data) => {
        if (err) {
        } else {
          data.oldDomainId = this.props.values && this.props.values.oldDomainId;
          data.Granted_Mailboxes = this.state.userKeys;
          this.props.values
            ? this.props.editHistoricDomain(data)
            : this.props.postHistoricDomain(data);
          this.Close();
        }
      });
    } else {
      message.warn('Must add atleast one mailbox');
    }
  };
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
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleChange = targetKeys => {
    this.setState({ userKeys: targetKeys });
  };

  handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    this.setState({
      selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys]
    });
  };
  
  getTargetKeys = values => {
    if (!this.state.userKeys) {
      let userKeys = values && JSON.parse(values && values.replace(/'/g, '"'));
      let targetKeys = userKeys && userKeys.map(val => val.key);
      userKeys &&
        this.setState({
          userKeys: targetKeys
        });
    }
  };
  getData = archivedusers => {
    const Data = [];
    for (let i = 0; i < archivedusers.length; i++) {
      let data = {
        key: archivedusers[i].USER_ID,
        title: archivedusers[i].MAILBOX_NAME
          ? archivedusers[i].MAILBOX_NAME
          : archivedusers[i].USER_NAME
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
  // handleSearch = value => {
  //   ApiInfo.DEBUGER && console.log("value",value)
  //   this.setState({
  //     searchValue:value
  //   })
  // }

  Close = () => {
    this.props.close();
    this.props.form.resetFields();

    this.setState({
      userKeys: undefined,
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
    const { values, historicDomainSideDrawer, formatMessage } = this.props;
    const { userKeys } = this.state;
    values &&
      historicDomainSideDrawer &&
      this.getTargetKeys(values.Granted_MailBoxes);
    return (
      <div>
        <Drawer
          // title={values ? formatMessage(messages["Edit Historic Domain"]) : formatMessage(messages["Add Historic Domain"])}
          width={600}
          onClose={() => this.Close()}
          closable={false}
          visible={historicDomainSideDrawer}
          maskStyle={{ backgroundColor: 'transparent' }}>
          <div style={{ ...style.setting.drawerMain }}>
            <div style={{ ...style.setting.drawerIconTitleWrapper }}>
              <img
                title='HistoricDomain'
                alt=''
                src={HistoricDomainIcon}
                style={{ ...style.setting.drawerIcons }}></img>
              <Title style={{ ...style.setting.drawerTitles }}>
                {values
                  ? formatMessage(messages['Edit Historic Domain'])
                  : formatMessage(messages['Add Historic Domain'])}
              </Title>
            </div>
            <div style={{ paddingTop: 10, cursor: 'pointer' }}>
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
            <Form.Item label={formatMessage(messages['Old Domain Name'])}>
              {getFieldDecorator('Old_Domain_Name', {
                initialValue: values && values.oldDomainName,
                rules: [
                  {
                    required: true,
                    message: formatMessage(
                      messages['Please enter Old Domain Name']
                    )
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item
              style={{ ...style.formItemBetweenGap }}
              label={formatMessage(messages['Old Domain Description'])}>
              {getFieldDecorator('Old_Domain_Description', {
                initialValue: values && values.description
              })(<Input />)}
            </Form.Item>
            <Form.Item>
              <div
                style={{
                  ...style.allTrasferStyle
                }}>
                {getFieldDecorator('Granted_Mailboxes', {})(
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
                      this.props.archiveduserlist &&
                      this.getData(this.props.archiveduserlist)
                    }
                    showSearch
                    listStyle={{ ...style.transfer.transferListStyle }}
                    // targetKeys={userKeys}
                    targetKeys={userKeys}
                    filterOption={this.filterOption}
                    // targetKeys={(this.state.archivedusers && this.props.archiveduserlist) ? this.getTargetKeys(this.props.archiveduserlist):(this.props.archiveduserslist && !this.props.archiveduserslist) && this.getTargetKeys(this.props.archiveduserlist) }
                    onChange={(nextTargetKeys, direction, moveKeys) =>
                      this.handleChange(nextTargetKeys, direction, moveKeys)
                    }
                    // onSearch={(direction, value) => this.handleSearch(value)}
                    render={item => this.renderItem(item)}
                    // footer={this.renderFooter}
                  />
                )}
              </div>
            </Form.Item>

            <Form.Item style={{ ...style.formItemBetweenGap }}>
              <div style={{ ...style.drawerButtons }}>
                <PrimaryButton text={formatMessage(messages['Save'])} htmlType='submit' />
                <SecondryButton text='Cancel' onClick={() => this.Close()} style={{ marginRight: 8 }} />
              </div>
            </Form.Item>
          </Form>
        </Drawer>
      </div>
    );
  }
}

const HistoricDomainDrawerForm = Form.create('HistoricDomain')(HistoricDomain);

const mapStateToProps = state => {
  return {
    archiveduserlist: state.UserManagementReducer.users
  };
};
const mapDispatchToProps = dispatch => {
  return {
    editHistoricDomain: data => dispatch(editHistoricDomain(data)),
    postHistoricDomain: data => dispatch(postHistoricDomain(data)),
    fetchUsers: () => dispatch(fetchUsers())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoricDomainDrawerForm);
