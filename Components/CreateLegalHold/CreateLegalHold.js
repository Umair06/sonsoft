import React, { Component } from 'react';
import { Drawer, Typography, Select, Form, Input, Spin } from 'antd';
import { PrimaryButton, SecondryButton } from '../Button/Button';
import Clear_Gray from '../../Assets/icons/SV_ICONS/Clear_Gray.png';
import Theme from '../../Assets/Theme/Theme';
import style from '../../styles';
import { connect } from 'react-redux';
import {
  postLegalHolds,
  editLegalHolds
} from '../../Redux/Actions/LegalHoldsActions/LegalHoldsActions';
import {
  ApplyLegalHoldData
} from '../../Redux/Actions/ApplyLegalHoldAction/ApplyLegalHoldAction';
import { defineMessages } from 'react-intl';
import { version } from '../../APIConfig/Config';

const { TextArea } = Input;
const messages = defineMessages({
  'Create Legal Hold': {
    id: 'CreateLegalHold.CreateLegalHold',
    defaultMessage: 'Create Legal Hold'
  },
  'Enter Legal Hold Name': {
    id: 'CreateLegalHold.EnterLegalHoldName',
    defaultMessage: 'Enter Legal Hold Name'
  },
  'Enter Primary Attorney': {
    id: 'CreateLegalHold.EnterPrimaryAttorney',
    defaultMessage: 'Enter Primary Attorney'
  },
  'Select Legal Hold Type': {
    id: 'CreateLegalHold.SelectLegalHoldType',
    defaultMessage: 'Select Legal Hold Type'
  },
  'Select Legal Hold Team': {
    id: 'CreateLegalHold.SelectLegalHoldTeam',
    defaultMessage: 'Select Legal Hold Team'
  },
  Submit: {
    id: 'CreateLegalHold.Submit',
    defaultMessage: 'Submit'
  },
  Cancel: {
    id: 'CreateLegalHold.Cancel',
    defaultMessage: 'Cancel'
  }
});

const { Option } = Select;
const { color } = Theme;
const { Title, Text } = Typography;

class CreateLegalHold extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: true
    };
  }
  filter = (input, option) => {
    return (
      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    );
  };
  handleChange = e => {
    return {
      e
    };
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, data) => {
      if (err) {
      } else {
        this.props.ApplyLegalHoldData(data);
        if (this.props.values) {
          data.CASE_ID = this.props.values.CASE_ID;
          this.props.editLegalHolds(data);
        } else {
          this.props.postLegalHolds(data);
        }

        this.Close();
      }
    });
    // this.props.close();    
    // this.props.form.resetFields();
  };
  Close = () => {
    this.props.close();
    this.props.form.resetFields();
  };
  render() {
    const { labels } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { createLegalHold, formatMessage, values } = this.props;
    return (
      <Drawer
        style={{ marginTop: 125, overflow: 'auto' }}
        bodyStyle={{ height: 'calc(100vh - 125px)', overflowY: 'auto' }}
        width={400}
        visible={createLegalHold}
        maskStyle={{ backgroundColor: 'transparent' }}
        closable={false}
        onClose={() => this.Close()}>
        <div style={{ ...style.setting.drawerMain }}>
          <div style={{ ...style.setting.drawerIconTitleWrapper }}>
            <img
              alt='Add'
              id='addImage'
              src={require('../../Assets/icons/SV_ICONS/CreateLH_Orange.png')}
              width='40px'
            />
            <Title
              style={{
                color: color.Blue,
                padding: '15px 0 0 5px',
                fontSize: 24
              }}
              level={2}>
              {formatMessage(messages['Create Legal Hold'])}
            </Title>
          </div>
          <div
            onClick={() => this.props.close()}
            style={{ cursor: 'pointer' }}>
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
        <Form onSubmit={this.handleSubmit}>
          <Form.Item label=''>
            {getFieldDecorator('caseName', {
              initialValue: values && values.CASE_NAME,
              rules: [
                {
                  required: true,
                  message: formatMessage(messages['Enter Legal Hold Name'])
                }
              ]
            })(
              <Input
                placeholder={formatMessage(messages['Enter Legal Hold Name'])}
              />
            )}
          </Form.Item>
          {version > 7.1 && (
            <Form.Item label=''>
              {getFieldDecorator('Description', {
                initialValue: values && values.CASE_DESC
              })(
                <TextArea
                  row={3}
                  autoSize={{ minRows: 3 }}
                  placeholder={'Enter Legal Hold Description'}
                />
              )}
            </Form.Item>
          )}
          {version > 7.2 && (
            <Form.Item label=''>
              {getFieldDecorator('Primary_Attorney', {
                // rules: [{ required: true, message: formatMessage(messages["Enter Primary Attorney"]) }],
              })(
                <Input
                  placeholder={formatMessage(
                    messages['Enter Primary Attorney']
                  )}
                />
              )}
            </Form.Item>
          )}
          {version > 7.2 && (
            <Form.Item>
              <Select
                defaultValue={labels}
                style={{ width: '100%', height: 40 }}
                onChange={e => this.handleChange(e)}
                placeholder={formatMessage(messages['Select Legal Hold Type'])}
                onBlur={this.onBlur}
                onSearch={this.onSearch}
                filterOption={(input, option) => this.filter(input, option)}
                showSearch>
                <Option value='1'>
                  Employment Litigation Financial Restructuring & Creditors’
                  Rights
                </Option>
              </Select>
            </Form.Item>
          )}
          {version > 7.2 && (
            <Form.Item>
              <Select
                defaultValue={labels}
                style={{ width: '100%', height: 40 }}
                onChange={e => this.handleChange(e)}
                placeholder={formatMessage(messages['Select Legal Hold Team'])}
                notFoundContent={
                  !this.props.legalHoldDropDown && (
                    <Text>
                      <Spin size='small' style={{ marginRight: 15 }} />
                      Fetching Legal Holds
                    </Text>
                  )
                }
                onBlur={this.onBlur}
                onSearch={this.onSearch}
                filterOption={(input, option) => this.filter(input, option)}
                showSearch>
                <Option value='1'>
                  David Hartmann - Employment Corporate Legal{' '}
                </Option>
              </Select>
            </Form.Item>
          )}
          <div
            style={{...style.drawerButtons}}>
            <PrimaryButton
              text={formatMessage(messages['Submit'])}
              htmlType='submit'
            />
            <SecondryButton
              text={formatMessage(messages['Cancel'])}
              onClick={() => this.Close()}
            />
          </div>
        </Form>
      </Drawer>
    );
  }
}
const WrappedCreateLegalHold = Form.create({ name: '' })(CreateLegalHold);

const mapStateToProps = state => {
  return {
    legalHoldDropDown: state.LegalHoldsReducer.legalHolds,
    
  };
};
const mapDispatchToProps = dispatch => {
  return {
    postLegalHolds: data => dispatch(postLegalHolds(data)),
    editLegalHolds: data => dispatch(editLegalHolds(data)),
    ApplyLegalHoldData: data => dispatch(ApplyLegalHoldData(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedCreateLegalHold);
