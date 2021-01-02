import React from 'react';
import {Form, DatePicker, Typography,Select} from 'antd';
import { connect } from "react-redux";
import { updateDataTableActions } from "../../../Redux/Actions/pageHeader/pageHeader";


const { Option } = Select;
const { Text } = Typography;
const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}> {i.toString(36) + i}</Option>);
}

class ContentReview extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };
  
  componentDidMount() {
     this.props.updateDataTableActions({search:true})
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        //ApiInfo.DEBUGER && console.log("error", err)
      }
      else {
        //ApiInfo.DEBUGER && console.log("values", values)
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    
    const formItemLayout = {
      labelCol: {
        xs: { span: 5, },
        sm: { span: 5, },
      },
      wrapperCol: {
        xs: { span: 12 },
        sm: { span: 12 },
      },
    };
    
    return (
      <div style={{ marginTop: 20 }}>
        <Form layout="horizontal" {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label={<Text>Sender/Received</Text>}>
            {getFieldDecorator('Sender/Received', {
              rules: [
                {
                  required: true,
                  message: 'Please Write Some Thing on Archive Store Field',
                },
              ],
            })(<div><Select optionFilterProp="children" style={{ width: '100%' ,height:40}} placeholder="Select All" >
              {children}
            </Select></div>)}
          </Form.Item>
          <Form.Item label={<Text >Email Date</Text>} >
            {getFieldDecorator('Email Date', {
              rules: [
                {
                  required: true,
                  message: 'please write some thing on Archive Email Field',
                },
                // {
                // validator: this.validateToNextPassword,
                // },
              ],
            })(<div style={{ display: "flex", flexDirection: "row", width: "100%" }}><DatePicker style={{ marginRight: "10px" }} width={50} placeholder='From' />:<DatePicker style={{ marginLeft: "10px" }} width={50} placeholder='To' /></div>)}
          </Form.Item>
          <Form.Item label={<Text >Content Identification Type</Text>} >
            {getFieldDecorator('Content Identification Type', {
              rules: [
                {
                  required: true,
                  message: 'Please Write something on search field',
                },

              ],
            })(<div><Select optionFilterProp="children" style={{ width: "100%",height:40 }} placeholder="Select All" >
              {children}
            </Select></div>)}
          </Form.Item>
          <Form.Item label={<Text>Content Identififcation Flag</Text>} >
            {getFieldDecorator('Content Identififcation Flag', {
              rules: [
                {
                  required: true,
                  message: 'Please Write something on search field',
                },

              ],
            })(<div><div><Select optionFilterProp="children" style={{ width: "100%",height:40 }} placeholder="Select All" >
              {children}
            </Select></div></div>)}
          </Form.Item>
         
        </Form>
      </div>
    );
  }
}

const WrappedContentReview = Form.create({ name: 'SSO' })(ContentReview);
const mapDispatchToProps = dispatch => {
	return {
		updateDataTableActions: actions => dispatch(updateDataTableActions(actions)),
	}
}


export default connect(null, mapDispatchToProps)(WrappedContentReview);
