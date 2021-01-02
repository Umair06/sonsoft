import React, { Component } from 'react';
import { PrimaryButton, SecondryButton } from "../../../Components/Button/Button"
import { defineMessages } from 'react-intl';
import style from "../../../styles"
import { message } from 'antd'


const messages = defineMessages({
  'Save': {
    id: "Scheduler.Save",
    defaultMessage: "Save",
  },
  'Cancel': {
    id: "Scheduler.Cancel",
    defaultMessage: "Cancel"
  },
})

class Scheduler extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    message.destroy()
  }

  render() {
    const { formatMessage } = this.props;
    return (
      <div style={{...style.controlCenter.schedulerDiv}}>
        <PrimaryButton text={formatMessage(messages["Save"])}></PrimaryButton>
        <SecondryButton text={formatMessage(messages["Cancel"])}></SecondryButton>
      </div>
    )
  }
};

export default Scheduler;

