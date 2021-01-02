import React, { Component } from 'react';
import { Button } from 'antd';
import style from '../../styles';
// import myTheme from "../../Assets/Theme/Theme" ;
// const {color} = myTheme;

class PrimaryButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Button
          style={{ ...style.primaryButton }}
          onClick={this.props.onClick}
          disabled={this.props.disabled}
          htmlType={this.props.htmlType}>
          {this.props.text}
        </Button>
      </div>
    );
  }
}

class SecondryButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Button
          style={{ ...style.secondaryButton }}
          disabled={this.props.disabled && this.props.disabled}
          onClick={this.props.onClick}>
          {this.props.text}
        </Button>
      </div>
    );
  }
}

export { PrimaryButton, SecondryButton };
