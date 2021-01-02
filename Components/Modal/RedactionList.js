  import React from 'react';
import { Drawer, Form, Input, Checkbox, Typography } from 'antd';
import { PrimaryButton } from '../Button/Button';
import { SecondryButton } from '../Button/Button';
//import Theme from '../../Assets/Theme/Theme';
import Clear_Gray from '../../Assets/icons/SV_ICONS/Clear_Gray.png';
import { defineMessages } from 'react-intl';
import style from '../../styles';
import RedactionIcon from '../../Assets/icons/SV_ICONS/SonaVault Icon31.png';
// import * as ApiInfo from "../../APIConfig/ApiParameters";


const messages = defineMessages({
  'Edit Redaction List': {
    id: 'RedactionList.EditRedactionList',
    defaultMessage: 'Edit Redaction List'
  },
  'Add Redaction List': {
    id: 'RedactionList.AddRedactionList',
    defaultMessage: 'Add Redaction List'
  },
  'Redaction Title:': {
    id: 'RedactionList.RedactionTitle',
    defaultMessage: 'Redaction Title:'
  },
  'Please Enter Redaction Title': {
    id: 'RedactionList.PleaseEnterRedactionTitle',
    defaultMessage: 'Please Enter Redaction Title'
  },
  'Regular Expression:': {
    id: 'RedactionList.RegularExpression',
    defaultMessage: 'Regular Expression:'
  },
  'Please Enter Regular Expression': {
    id: 'RedactionList.PleaseEnterRegularExpression',
    defaultMessage: 'Please Enter Regular Expression'
  },
  'Please Enter Enabled': {
    id: 'RedactionList.PleaseEnterEnabled',
    defaultMessage: 'Please Enter Enabled'
  },
  Enabled: {
    id: 'RedactionList.Enabled',
    defaultMessage: 'Enabled'
  },
  Save: {
    id: 'RedactionList.Save',
    defaultMessage: 'Save'
  }
});

//const { color } = Theme;
const { Title } = Typography;
const { TextArea } = Input;

class RedactionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = () => {
    // e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        //ApiInfo.DEBUGER && console.log("error", err)
      } else {
        this.Close();
      }
    });
  };
  Close = () => {
    this.props.close();
    this.props.form.resetFields();
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { values, redactionList, formatMessage } = this.props;

    return (
      <div>
        <Drawer
          // title={values ? formatMessage(messages["Edit Redaction List"]) : formatMessage(messages["Add Redaction List"])}
          width={400}
          onClose={() => this.Close()}
          visible={redactionList}
          closable={false}
          maskStyle={{ backgroundColor: 'transparent' }}>
          <div style={{ ...style.setting.drawerMain }}>
            <div style={{ ...style.setting.drawerIconTitleWrapper }}>
              <img
                title='Redaction'
                alt=''
                src={RedactionIcon}
                style={{ ...style.setting.drawerIcons }}></img>
              <Title style={{ ...style.setting.drawerTitles }}>
                {values
                  ? formatMessage(messages['Edit Redaction List'])
                  : formatMessage(messages['Add Redaction List'])}
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
            <Form.Item label={formatMessage(messages['Redaction Title:'])}>
              {getFieldDecorator('Redaction_Title', {
                rules: [
                  {
                    required: true,
                    message: formatMessage(
                      messages['Please Enter Redaction Title']
                    )
                  }
                ]
              })(<Input />)}
            </Form.Item>

            <Form.Item
              style={{ ...style.formItemBetweenGap }}
              label={formatMessage(messages['Regular Expression:'])}>
              {getFieldDecorator('Regular_Expression', {
                rules: [
                  {
                    required: true,
                    message: formatMessage(
                      messages['Please Enter Regular Expression']
                    )
                  }
                ]
              })(<TextArea rows={4} />)}
            </Form.Item>

            <Form.Item style={{ ...style.formItemBetweenGap }} label=''>
              {getFieldDecorator('Enabled', {
                rules: [
                  {
                    required: true,
                    message: formatMessage(messages['Please Enter Enabled'])
                  }
                ]
              })(
                <div>
                  <Checkbox>{formatMessage(messages['Enabled'])}</Checkbox>
                </div>
              )}
            </Form.Item>

            <Form.Item>
              <div style={{ ...style.drawerButtons }}>
                <PrimaryButton text={formatMessage(messages['Save'])} onClick={() => this.handleSubmit()} htmlType='submit' />
                <SecondryButton text='Cancel' onClick={() => this.Close()} style={{ marginRight: 8 }} />
              </div>
            </Form.Item>
          </Form>
        </Drawer>
      </div>
    );
  }
}

const RedactionListDrawerForm = Form.create('RedactionList')(RedactionList);

export default RedactionListDrawerForm;
