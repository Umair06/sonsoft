import React, { Component } from "react";
import {connect} from "react-redux";
import Template from '../../Container/Template/Template'
import RedactionList from './RedactionList/RedactionList'
import ExclusionList from './ExclusionList/ExclusionList'
import Tasks from "./Tasks/Tasks";
import { version } from "../../APIConfig/Config";
import { defineMessages } from 'react-intl';
import { message } from 'antd'

const messages = defineMessages({
  'Home': {
    id: "ExportTemplate.Home",
    defaultMessage: "Home",
  },
  'Exports': {
    id: "ExportTemplate.Exports",
    defaultMessage: "Exports"
  },
  'Redaction List': {
    id: "ExportTemplate.RedactionList",
    defaultMessage: "Redaction List"
  },
  'Exclusion List': {
    id: "ExportTemplate.ExclusionList",
    defaultMessage: "Exclusion List"
  },
})

class ExportTemplate extends Component {
  constructor(props) {
    super(props)
    message.destroy()
  }
  // uid = this.props.authenticUserInfo && this.props.authenticUserInfo.data && this.props.authenticUserInfo.data.data && this.props.authenticUserInfo.data.data.output && Array.isArray(this.props.authenticUserInfo.data.data.output) && this.props.authenticUserInfo.data.data.output[0] && this.props.authenticUserInfo.data.data.output[0].uid

  render() {
    const { formatMessage } = this.props;

    const routes = [
      {
        path: '/homescreen',
        exact: true,
        breadCrums: formatMessage(messages["Home"]),
        redirect: '/homescreen',
      },
      {
        path: `/exports`,
        exact: true,
        breadCrums: formatMessage(messages["Exports"]),
        redirect: '/exports/tasks'
      },
      {
        path: `/exports/tasks`,
        breadCrums: formatMessage(messages["Exports"]),
        iconName: "Exports_Blue",
        redirect: '/exports/tasks',
        main: () => <Tasks formatMessage={this.props.formatMessage} />,
        actionRow: false
      },
      
      version > 7.2 && {
        path: `/exports/redactionlist`,
        breadCrums: formatMessage(messages["Redaction List"]),
        iconName: "RedactionList_Blue",
        redirect: '/exports/redactionlist',
        main: () => <RedactionList formatMessage={this.props.formatMessage} />,
        actionRow: false
      },

      version > 7.2 && {
        path: `/exports/exclusionlist`,
        breadCrums: formatMessage(messages["Exclusion List"]),
        iconName: "ExclusionList_Blue",
        redirect: `/exports/exclusionlist`,
        main: () => <ExclusionList formatMessage={this.props.formatMessage} />,
        actionRow: false
      },
    ];

    return (
      <Template imageFlag={true} formatMessage={formatMessage} routes={routes} historyProp={this.props.history} iconName="Configuration Management_Blue" heading="Exports" />
    )
  }
};

const mapStateToProps = state => {
  return {
    authenticUserInfo: state.LoginReducer.authenticUserInfo
  };
};
export default connect(mapStateToProps)(ExportTemplate);
