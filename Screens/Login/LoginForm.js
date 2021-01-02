import React, { Component } from "react";
import style from "../../styles";
import { Form, Input, Button, message } from "antd";
import signInLogo from "../../Assets/icons/SignIn.png";
import "../../index.css";
import { defineMessages } from "react-intl";
import { connect } from "react-redux";
import { postLogin } from "../../Redux/Actions/LoginAction/LoginAction";
import { EnCrypt, /*DeCrypt*/ } from "../../PasswordEncryption/PasswordEncryption";
import * as ApiInfo from "../../APIConfig/ApiParameters";


const messages = defineMessages({
  "Please input your email!": {
    id: "LoginForm.PleaseInputYourEmail",
    defaultMessage: "Please input your email!"
  },
  Email: {
    id: "LoginForm.Email",
    defaultMessage: "Email"
  },
  "Please input your Password!": {
    id: "LoginForm.PleaseInputYourPassword",
    defaultMessage: "Please input your Password!"
  },
  Password: {
    id: "LoginForm.Password",
    defaultMessage: "Password"
  }
});

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    message.destroy();
  }

  static getDerivedStateFromProps(props, state) {
    try {
      if (
        props.authenticUserInfo &&
        props.authenticUserInfo.data.status === 200
      ) {
        // localStorage.setItem("userInfo", JSON.stringify(props.authenticUserInfo))
        localStorage.setItem(
          "userInfo",
          JSON.stringify(props.authenticUserInfo)
        );
        props.navigateToHomeScreen(props.authenticUserInfo);
      }
    } catch (error) {
      ApiInfo.DEBUGER && console.log(error.message);
    }
    return null;
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let object = {
          username: values.email,
          password: EnCrypt(values.password)
        };
        this.props.postLogin(object);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { formatMessage } = this.props;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item
          style={{
            margin: style.noMargin.margin,
            padding: style.noPadding.padding
          }}
          colon={false}
        >
          {getFieldDecorator("email", {
            rules: [
              {
                required: true,
                message: formatMessage(messages["Please input your email!"])
              }
            ]
          })(<Input placeholder="Email" />)}
        </Form.Item>
        <Form.Item style={{ marginTop: 15 }} colon={false}>
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: formatMessage(messages["Please input your Password!"])
              }
            ]
          })(<Input type="password" placeholder="Password" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator(
            "submit",
            {}
          )(
            <Button style={{ ...style.loginPageFormButton }} htmlType="submit">
              <img src={signInLogo} title="Sign In" width={50} alt="Sign In" />
            </Button>
          )}
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(LoginForm);

const mapStateToProps = state => {
  return {
    authenticUserInfo: state.LoginReducer.authenticUserInfo
    // loaded: state.SimpleSearchReducer.loaded,
    // savedSearch: state.SimpleSearchReducer.savedSearch
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postLogin: data => dispatch(postLogin(data)),

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedNormalLoginForm);
