import React from 'react';
import { Form } from 'antd';
import { Radio } from 'antd';
import { Typography, Input, message } from 'antd';
import { connect } from "react-redux";
import { updateDataTableActions } from "../../../../Redux/Actions/pageHeader/pageHeader";
import { fetchConfigurationDeployemnt, postConfigurationDeployment, fetchConfigurationDeployemntSites, deleteConfigurationDeploymentSites } from "../../../../Redux/Actions/ConfigurationAction/DeploymentAction"
import DataTable from "../../../../Components/DataTable/DataTable"
// import { PrimaryButton, SecondryButton } from "../../../../Components//Button/Button";
import DeploymentDrawerForm from '../../../../Components/Modal/Deployment';
import { defineMessages } from 'react-intl';
import { version } from "../../../../APIConfig/Config";
import style from "../../../../styles";
// import PageHeader from "../../../../Components/PageHeader/PageHeader";
import DataTableHeader from "../../../../Components/DataTable/Component/DataTableHeader"

// import * as ApiInfo from "../../../../APIConfig/ApiParameters";

const messages = defineMessages({
  'Site Name': {
    id: "deployment.siteName",
    defaultMessage: "Site Name",
  },
  'Site Url': {
    id: "deployment.SiteUrl",
    defaultMessage: "Site Url"
  },
  'Site Prefix': {
    id: "deployment.SitePrefix",
    defaultMessage: "Site Prefix",
  },
  'Please Write Site Prefix': {
    id: "deployment.PleaseWriteSitePrefix",
    defaultMessage: "Please Write Site Prefix"
  },
  'Archival Topology': {
    id: "deployment.ArchivalTopology",
    defaultMessage: "Archival Topology"
  },
  'Central Archive': {
    id: "deployment.CentralArchive",
    defaultMessage: "Central Archive"
  },
  'Multi Archive': {
    id: "deployment.MultiArchive",
    defaultMessage: "Multi Archive"
  },
})

const { Text } = Typography;
const columns = [
  {
    title: 'Site Name',
    dataIndex: 'SITE_NAME',
    render: SITE_NAME => <span style={{ wordBreak: "break-all" }} >{SITE_NAME}</span>,

  },
  {
    title: 'Site Url',
    dataIndex: 'SITE_URL',
    render: SITE_URL => <span style={{ wordBreak: "break-all" }} >{SITE_URL}</span>,
  },
];

class DeploymentForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
      // archivalOption: props.deployment && props.deployment.Topology,
      values: {}
    }
    message.destroy()
  }
  componentDidMount() {
    this.props.fetchConfigurationDeployemnt(!!this.props.deployment)
    // version > 7.1 && this.props.fetchConfigurationDeployemntSites()
    this.props.updateDataTableActions({ save: true, saveValues: () => this.handleSubmit(), cancel: true, cancelFunction: () => this.cancelFunc() })
  }
  static getDerivedStateFromProps(props, state) {
    if (props.deployment && props.deployment.Topology && !state.archivalOption) {
      return {
        archivalOption: props.deployment.Topology,
        sitePrefix: props.deployment && props.deployment.Site_Prefix
      }
    }
    return {}
  }
  openDrawer = (Drawer, values) => {
    this.setState({
      [Drawer]: true,
      values
    })
  }
  onClose = Drawer => {
    this.setState({
      [Drawer]: false
    })
  }

  handleSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, data) => {
      if (err) {
        //ApiInfo.DEBUGER && console.log("error", err)
      }
      else {
        this.props.postConfigurationDeployment(data)
      }
    });

  };

  ArchivalOptionSelect = e => {
    this.setState({
      archivalOption: e.target.value,
    });
  };

  authenthicationChecked = () => {
    let newAuthenthication = this.state.authenthication
    this.setState({
      authenthication: !newAuthenthication
    })
  }
  handleChangeInput = event => {
    const { value, maxLength } = event.target;
    const message = value.slice(0, maxLength);

    this.setState({
      sitePrefix: message
    });
  };

  Delete = (value) => {
    this.props.deleteConfigurationDeploymentSites(value)
  }

  cancelFunc = () => {
    const { form } = this.props;
    form.setFieldsValue({
      Site_Prefix: this.props.deployment.Site_Prefix
    })
  }

  openColumConfigDrawer = () => {
    this.setState({
      columnConfig: true
    })
  };

  closeColumConfigDrawer = () => {
    this.setState({
      columnConfig: false
    })
  };
  currentPaginationSize = (page) => {
    this.setState({ currentPage: page })
  }
  currentPageSize = (value) => {
    this.setState({ pageSize: value })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { archivalOption, deploymentSideDrawer, values, columnConfig, currentPage, pageSize } = this.state;
    const { formatMessage } = this.props;
    const messagesKeys = Object.keys(messages);
    const messagesValues = Object.values(messages);
    columns.forEach((c) => {
      messagesKeys.forEach((mK, index) => {
        if (c.key === mK) {
          //ApiInfo.DEBUGER && console.log(messagesValues[index]);
          c.title = formatMessage(messagesValues[index]);
        }
      })
    })

    const formItemLayout = {
      labelCol: {
        xs: { span: 12 },
        sm: { span: 8, push: 1 },
      },
      wrapperCol: {
        xs: { span: 12 },
        sm: { span: 10, pull: 3 },
      },
    };
    return (
      <div>
        {/* <PageHeader
          formatMessage={formatMessage}
        /> */}
        <div style={style.padding10}>
          {(<DeploymentDrawerForm formatMessage={formatMessage} deploymentSideDrawer={deploymentSideDrawer} Site_Prefix={this.state.sitePrefix} close={() => this.onClose('deploymentSideDrawer')} values={values} />)}
          <Form layout="horizontal" labelAlign="left" {...formItemLayout} onSubmit={this.handleSubmit}>

            <Form.Item label={<Text>{formatMessage(messages["Site Prefix"])}</Text>}>
              {getFieldDecorator('Site_Prefix', {
                initialValue: this.state.sitePrefix,
                rules: [{
                  required: true,
                  message: "Please Enter Site Prefix",
                }],
              })(<Input allowClear={true} onChange={this.handleChangeInput}
                maxLength={3} />)}
            </Form.Item>

            <Form.Item label={formatMessage(messages["Archival Topology"])} style={style.formItemBetweenGap} >
              {getFieldDecorator('Topology', {
                initialValue: this.props.deployment && this.props.deployment.Topology,
              })(<Radio.Group onChange={this.ArchivalOptionSelect} >
                <Radio value={"C"}>{formatMessage(messages["Central Archive"])}</Radio>

                <Radio value={"M"} disabled={version <= 7.1 && true}>{formatMessage(messages["Multi Archive"])}</Radio>
              </Radio.Group>)}
            </Form.Item>
          </Form>

        </div>
        {(archivalOption === "M") && (
          <div>

            <div style={{ ...style.formItemBetweenGap }}>
              <DataTableHeader openColumConfigDrawer={() => this.openColumConfigDrawer()} formatMessage={formatMessage} openDrawer={(values) => this.openDrawer('deploymentSideDrawer', values)} data={this.props.deploymentsites} add={true} actions={{ syncStatus: false, status: false, archivePublicFolder: false, stubEnable: false, stubPeriod: false, enabled: false, activate: false }} currentPageSize={this.currentPageSize} />
              <DataTable closeColumConfigDrawer={() => this.closeColumConfigDrawer()}
                columnConfig={columnConfig} formatMessage={formatMessage} openDrawer={(values) => this.openDrawer('deploymentSideDrawer', values)} Delete={(value) => this.Delete(value)} columns={columns} data={this.props.deploymentsites} add={true} noEditIcon addEditColumn actions={{ syncStatus: false, status: false, archivePublicFolder: false, stubEnable: false, stubPeriod: false, enabled: false, activate: false }} pageSize={pageSize || 20}
                currentPage={currentPage}
                currentPaginationSize={this.currentPaginationSize} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

const WrappedDeploymentForm = Form.create({ name: 'Deployment' })(DeploymentForm);
const mapStateToProps = state => {
  return {
    deployment: state.ConfigurationReducer.deployment,
    deploymentsites: state.ConfigurationReducer.deploymentsites
  }
};

const mapDispatchToProps = dispatch => {
  return {
    updateDataTableActions: actions => dispatch(updateDataTableActions(actions)),
    fetchConfigurationDeployemnt: noMessage => dispatch(fetchConfigurationDeployemnt(noMessage)),
    postConfigurationDeployment: data => dispatch(postConfigurationDeployment(data)),
    fetchConfigurationDeployemntSites: () => dispatch(fetchConfigurationDeployemntSites()),
    deleteConfigurationDeploymentSites: data => dispatch(deleteConfigurationDeploymentSites(data))
    // updateConfiguration:(data)=>dispatch(updateConfiguration(data))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(WrappedDeploymentForm);
