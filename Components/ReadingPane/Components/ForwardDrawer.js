import React, { Component } from 'react'
import { Drawer, Typography, Radio, Form, Select } from "antd";
import Theme from "../../../Assets/Theme/Theme";
import { PrimaryButton, SecondryButton } from "../../Button/Button";
import Clear_Gray from '../../../Assets/icons/SV_ICONS/Clear_Gray.png';
import { defineMessages } from 'react-intl';
import { connect } from "react-redux";
import { postEmailsForworder, postInlineEmailsForworder } from "../../../Redux/Actions/ReadingPaneAction/ForwardAction"
import style from '../../../styles'

const messages = defineMessages({
  'Forward': {
    id: "ForwardDrawer.Forward",
    defaultMessage: "Forward",
  },
  'Please input Email Address': {
    id: "ForwardDrawer.PleaseInputEmailAddress",
    defaultMessage: "Please input Email Address"
  },
  'Enter Email Address': {
    id: "ForwardDrawer.EnterEmailAddress",
    defaultMessage: "Enter Email Address"
  },
  'Submit': {
    id: "ForwardDrawer.Submit",
    defaultMessage: "Submit"
  },
  'Cancel': {
    id: "ForwardDrawer.Cancel",
    defaultMessage: "Cancel"
  },
})

const { color } = Theme;
const { Title } = Typography;

class ForwardDrawer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "e"
    }
  }


  static getDerivedStateFromProps(props, state) {
    let message_body;
    const { openedEmail } = props;
    if (props.openedEmail && props.forward && !state.fetchedOpenedEmail) {
      try {
        if (openedEmail[0]._source.html_body) {
          message_body = {
            content: openedEmail[0]._source.html_body,
            content_type: "text/html"
          }
        } else {
          message_body = {
            content: openedEmail[0]._source.message_body,
            content_type: "text/plain"
          }
        }
      } catch (e) { }
      return {
        openedEmail,
        message_body,
        fetchedOpenedEmail: true
      }
    }
    return null;
  }


  resetDrawerAndClose = () => {
    this.setState({
      openedEmail: undefined,
      fetchedOpenedEmail: false,
      allEmailAddress: undefined
    })
    this.props.form.resetFields()
    this.props.close()
  }

  handleSubmit = e => {
    const { message_body, openedEmail, allEmailAddress } = this.state;
    try {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          if (values.type && values.type !== "inline") {
            let object = {
              toEmail: allEmailAddress,
              "fileType": values.type,
              docPath: this.props.openedEmail[0]._source.source_folder + this.props.openedEmail[0]._source.file_path,
              "encrypted": openedEmail[0]._source.encrypted
            }
            this.props.postEmailsForworder(object)
          } else if (openedEmail && message_body) {
            let object = {
              "toEmail": allEmailAddress,
              "innerHtml": message_body.content
            }
            this.props.postInlineEmailsForworder(object)
          }
          this.resetDrawerAndClose()
        }
      });
    } catch (e) { }
  };

  onChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  handleEmailAddress(value) {
    this.setState({ allEmailAddress: value })
  }

  // close = () => {
  //   this.props.close()
  //   this.setState({
  //     openedEmail: undefined,
  //     fetchedOpenedEmail: false
  //   })
  // }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { formatMessage, ReadingPaneViewModal } = this.props;
    return (
      <div>
        <Drawer
          style={!ReadingPaneViewModal ? { marginTop: 162 } : {}}
          bodyStyle={{ height: 'calc(100vh - 162px)', overflowY: "auto" }}
          maskStyle={{ backgroundColor: "transparent" }}
          width={400}
          closable={false}
          visible={this.props.forward}
          onClose={() => this.resetDrawerAndClose()}
        >
          <div style={{ ...style.setting.drawerMain }}>
            <div style={{ ...style.setting.drawerIconTitleWrapper }}>
              <img src={require("../../../Assets/icons/SV_ICONS/Forward_Orange.png")} title="Forward" alt='' width='40px' />
              <Title style={{ color: `${color.Blue}`,padding: '15px 0 0 5px', fontSize: 24 }}>{formatMessage(messages["Forward"])}</Title>
            </div>
            <div onClick={() => this.resetDrawerAndClose()} style={{ paddingTop: 10, cursor: "pointer" }}>
              <img src={Clear_Gray} title="Close" alt="" onClick={() => this.resetDrawerAndClose()} width={28} height={28} />
            </div>
          </div>
          <Form onSubmit={this.handleSubmit} className="login-form">

            <Form.Item onSubmit={this.handleSubmit}>
              <div style={{ paddingTop: 20 }}>
                {getFieldDecorator('type', {
                  initialValue: "eml",
                  rules: [{ required: false, }],
                })(

                  <Radio.Group style={{ display: "flex", justifyContent: "space-between" }}>
                    <Radio value={"eml"}>EML</Radio>
                    <Radio value={"msg"} >MSG</Radio>
                    <Radio value={"pdf"} >PDF</Radio>
                    {/* <Radio value={"inline"}>Inline</Radio> */}
                  </Radio.Group>

                )}
              </div>
            </Form.Item>
            <Form.Item label="" style={style.formItemBetweenGap}>
              {getFieldDecorator('to', {
                rules: [{ required: true, message: formatMessage(messages["Please input Email Address"]) }, {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                }],
              })(
                <div style={{ paddingTop: 20 }}>

                  <Select
                    value={this.state.allEmailAddress}
                    placeholder={formatMessage(messages["Enter Email Address"])}
                    mode="tags"
                    tokenSeparators={[';', ',']}
                    dropdownStyle={{ display: 'none' }}
                    allowClear={true}
                    onChange={(e) => this.handleEmailAddress(e)}
                  >
                  </Select>
                </div>
              )}
            </Form.Item>
            <Form.Item>
              <div style={{ ...style.drawerButtons }}>
                <PrimaryButton text={formatMessage(messages["Submit"])} htmlType="submit" />
                <SecondryButton text={formatMessage(messages["Cancel"])} onClick={() => this.resetDrawerAndClose()} />
              </div>
            </Form.Item>
          </Form>
        </Drawer>
      </div>
    )
  }
};

const WrappedForwardDrawer = Form.create({ name: 'forward_Controls' })(ForwardDrawer);

const mapStateToProps = state => {
  return {

    forwardData: state.ForwardReducer.forwardData

  }
};
const mapDispatchToProps = dispatch => {
  return {
    postEmailsForworder: data => dispatch(postEmailsForworder(data)),
    postInlineEmailsForworder: data => dispatch(postInlineEmailsForworder(data))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(WrappedForwardDrawer);
