import React from 'react';
import { Form } from 'antd';
import moment from 'moment';
import { Typography, Input, Radio, DatePicker, Select, Row, Col } from 'antd';
import style from "../../../styles";
import { connect } from "react-redux";
import { updateDataTableActions } from "../../../Redux/Actions/pageHeader/pageHeader";
import DataTable from "../../../Components/DataTable/DataTable"
import { defineMessages } from 'react-intl';
import { message } from 'antd'
// import * as ApiInfo from "../../../APIConfig/ApiParameters";
import DataTableHeader from "../../../Components/DataTable/Component/DataTableHeader"

const { Text } = Typography;
const { Option } = Select;

const Time = [];
let x = 1;
let times = [];
let tt = 0;
const dateFormat = 'YYYY/MM/DD';

for (let i = 0; tt < 60; i++) {
  // let hh = Math.floor(tt / 60);
  let mm = (tt % 60);
  times[i] = ("0" + mm).slice(-2)
  tt = tt + x;
  Time.push(<Option value={times[i]}> {times[i]}</Option>);
}

const messages = defineMessages({
  'Date': {
    id: "taskLog.date",
    defaultMessage: "Task Description",
  },
  'Level': {
    id: "taskLog.level",
    defaultMessage: "Level"
  },
  'Message': {
    id: "taskLog.message",
    defaultMessage: "Message"
  },
  'occurance': {
    id: "taskLog.occurance",
    defaultMessage: "No.of Occurance"
  },
  'Select': {
    id: "taskLog.Select",
    defaultMessage: "Select"
  },
  'Starts With': {
    id: "taskLog.StartsWith",
    defaultMessage: "Starts With"
  },
  'End With': {
    id: "taskLog.EndWith",
    defaultMessage: "End With"
  },
  'Contains': {
    id: "taskLog.Contains",
    defaultMessage: "Contains"
  },
  'Date Range :': {
    id: "taskLog.DateRange",
    defaultMessage: "Date Range :"
  },
  '(yyyy-mm-dd hh:mi)': {
    id: "taskLog.(yyyy-mm-dd hh:mi)",
    defaultMessage: "(yyyy-mm-dd hh:mi)",
  },
  '00_From': {
    id: "taskLog.00_From",
    defaultMessage: "00"
  },
  '00_To': {
    id: "taskLog.00_To",
    defaultMessage: "00"
  },
  'To': {
    id: "taskLog.To",
    defaultMessage: "To"
  },
  'Log Level': {
    id: "taskLog.LogLevel",
    defaultMessage: "Log Level"
  },
  '_Select': {
    id: "taskLog._Select",
    defaultMessage: "Select"
  },
  'ALL': {
    id: "taskLog.ALL",
    defaultMessage: "ALL",
  },
  'WARN': {
    id: "taskLog.WARN",
    defaultMessage: "WARN"
  },
  'ERROR': {
    id: "taskLog.ERROR",
    defaultMessage: "ERROR"
  },
  'FATAL': {
    id: "taskLog.FATAL",
    defaultMessage: "FATAL"
  },
  'Show All Columns': {
    id: "taskLog.ShowAllColumns",
    defaultMessage: "Show All Columns"
  },
  'Auto Refresh (in seconds)': {
    id: "taskLog.AutoRefreshInSeconds",
    defaultMessage: "Auto Refresh (in seconds)"
  },
  '00_autoRefresh': {
    id: "taskLog.00_autoRefresh",
    defaultMessage: "00_autoRefresh",
  },
  '(Seconds)': {
    id: "taskLog.Seconds",
    defaultMessage: "(Seconds)"
  },
  'OFF': {
    id: "taskLog.OFF",
    defaultMessage: "OFF"
  },
  'ON': {
    id: "taskLog.ON",
    defaultMessage: "ON"
  },
})

const columns = [
  {
    title: 'Date',
    dataIndex: 'date',
    render: date => <span style={{ wordBreak: "break-all" }} >{date}</span>,
    key: 'date',
  },
  {
    title: 'Level',
    dataIndex: 'level',
    render: level => <span style={{ wordBreak: "break-all" }} >{level}</span>,
    key: 'level',
    disabled: true
  },
  {
    title: 'Message',
    dataIndex: 'message',
    render: message => <span style={{ wordBreak: "break-all" }} >{message}</span>,
    key: 'message',
    disabled: true
  },
  {
    title: 'No.of Occurance',
    dataIndex: 'occurance',
    render: occurance => <span style={{ wordBreak: "break-all" }} >{occurance}</span>,
    key: 'occurance',
    disabled: true
  },
];
const data = [
  {
    key: '2',
    date: '2017-Aug-21 12:02',
    level: 'ERROR',
    message: "DiscoverAllActiveDirectory 5 error_job_server_1006 The Server is Not Operational.at EAS.ServiceImpl.Master.TasksJobMaster.DiscoverAllActiveDirectory() at EAS.ServiceImpl.Master.TasksJobMaster.Execute()",
    occurance: "695"
  },
];

class TaskLog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
      onAndOffOption: 1
    };
    message.destroy()
  }

  componentDidMount() {
    this.props.updateDataTableActions({ refresh: true })
  }

  openDrawer = Drawer => {
    this.setState({
      [Drawer]: true
    })
  }
  onClose = Drawer => {
    this.setState({
      [Drawer]: false
    })
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
  selectSitePrefix = (option) => {
    this.setState({
      sitePrefix: option

    })
  }
  onAndOffOptionSelect = e => {
    this.setState({
      onAndOffOption: e.target.value,
    });
  };

  authenthicationChecked = () => {
    let newAuthenthication = this.state.authenthication
    this.setState({
      authenthication: !newAuthenthication
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
    const { /*sitePrefix,*/ onAndOffOption, columnConfig, currentPage, pageSize } = this.state
    const { getFieldDecorator } = this.props.form;

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
    //ApiInfo.DEBUGER && console.log(columns);

    const formItemLayout = {
      labelCol: {
        xs: { span: 12 },
        sm: { span: 8, push: 1 },
      },
      wrapperCol: {
        xs: { span: 14 },
        sm: { span: 13, pull: 3 },
      },
    };

    return (

      <div>
        <div style={{ ...style.padding10 }}>

          <Form layout="horizontal" labelAlign="left" {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label={<Text>{formatMessage(messages["Message"])}</Text>}>
              {getFieldDecorator('Message', {
                // rules: [
                //   {
                //     required: true,
                //     message: 'Please Write Message',
                //   },
                // ],
              })(<Row > <Col xs={{ span: 5, offset: 0 }} lg={{ span: 6, offset: 1 }}>
                <Select style={{ ...style.height40 }}
                  options={['All']} placeholder={formatMessage(messages["Select"])} onFocus={this.onFocus}
                  onBlur={this.onBlur} onSearch={this.onSearch} onChange={(option) => this.selectSitePrefix(option)}
                  filterOption={(input, option) =>
                    option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  showSearch
                >
                  <Option value="Starts With">{formatMessage(messages["Starts With"])}</Option>
                  <Option value="End With">{formatMessage(messages["End With"])}</Option>
                  <Option value="Contains">{formatMessage(messages["Contains"])}</Option>

                </Select></Col><Col style={{ ...style.controlCenter.tasklog.inputTopPadding, ...style.height40 }} xs={{ span: 5, offset: 0 }} lg={{ span: 16, offset: 1 }}> <Input /></Col></Row>)}
            </Form.Item>

            <Form.Item style={{ ...style.formItemBetweenGap }} colon={false} label={
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Text style={{ marginTop: -5 }}>{formatMessage(messages["Date Range :"])}</Text>
                <Text style={{ marginTop: -25 }}>{formatMessage(messages["(yyyy-mm-dd hh:mi)"])}</Text>
              </div>} >

              <Row >
                <Col xs={{ span: 3, offset: 0 }} lg={{ span: 5, offset: 1 }}><DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} /></Col>
                <Col xs={{ span: 3, offset: 0 }} lg={{ span: 4, offset: 1, }}><Input placeholder={formatMessage(messages["00_From"])} type="time" /></Col>
                <Col xs={{ span: 3, offset: 0 }} lg={{ span: 1, offset: 1, }}><Text>{formatMessage(messages["To"])}</Text></Col>
                <Col xs={{ span: 3, offset: 0 }} lg={{ span: 5, offset: 1 }}><DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} /></Col>
                <Col xs={{ span: 3, offset: 0 }} lg={{ span: 4, offset: 1 }}> <Input placeholder={formatMessage(messages["00_To"])} type="time" /></Col></Row>
            </Form.Item>

            <Form.Item style={{ ...style.formItemBetweenGap }} label={<Text>{formatMessage(messages["Log Level"])}</Text>}>
              {getFieldDecorator('Log Level ', {
                // rules: [
                //   {
                //     required: true,
                //     message: 'Please Write Log Level',
                //   },
                // ],
              })(<Row >  <Col xs={{ span: 5, offset: 0 }} lg={{ span: 23, offset: 1 }}><Select style={{ ...style.height40 }}
                options={['All']} placeholder={formatMessage(messages["_Select"])} onFocus={this.onFocus}
                onBlur={this.onBlur} onSearch={this.onSearch} onChange={(option) => this.selectSitePrefix(option)}
                filterOption={(input, option) =>
                  option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                showSearch>
                <Option value="ALL">{formatMessage(messages["ALL"])}</Option>
                <Option value="WARN">{formatMessage(messages["WARN"])}</Option>
                <Option value="ERROR">{formatMessage(messages["ERROR"])}</Option>
                <Option value="FATAL">{formatMessage(messages["FATAL"])}</Option>

              </Select></Col></Row>)}
            </Form.Item>



            <Form.Item style={{ ...style.formItemBetweenGap }} label={<Text>{formatMessage(messages["Auto Refresh (in seconds)"])}</Text>}>
              {getFieldDecorator('Auto Refresh  ', {

              })(<Row><Col xs={{ span: 3, offset: 0 }} lg={{ span: 4, offset: 1 }}><Input placeholder={formatMessage(messages["00_autoRefresh"])} type="number" /></Col><Col xs={{ span: 1, offset: 0 }} lg={{ span: 2, offset: 1 }}><Text >{formatMessage(messages["(Seconds)"])}</Text></Col><Col xs={{ span: 3, offset: 0 }} lg={{ span: 4, offset: 1 }}><Radio.Group onChange={this.onAndOffOptionSelect} value={onAndOffOption} style={{ display: "flex", paddingTop: "10px" }}><Radio value={1}>{formatMessage(messages["OFF"])}</Radio><Radio value={2}>{formatMessage(messages["ON"])}</Radio></Radio.Group></Col></Row>)}
            </Form.Item></Form>
        </div>

        <div >
          <DataTableHeader openColumConfigDrawer={() => this.openColumConfigDrawer()} formatMessage={formatMessage} data={data} currentPageSize={this.currentPageSize} />
          <DataTable closeColumConfigDrawer={() => this.closeColumConfigDrawer()}
            columnConfig={columnConfig} formatMessage={formatMessage} columns={columns} data={data} pageSize={pageSize || 20}
            currentPage={currentPage}
            currentPaginationSize={this.currentPaginationSize} />
        </div>
      </div>

    );
  }
}

const WrappedTaskLog = Form.create({ name: 'TaskLog' })(TaskLog);
const mapDispatchToProps = dispatch => {
  return {
    updateDataTableActions: actions => dispatch(updateDataTableActions(actions)),
  }
}

export default connect(null, mapDispatchToProps)(WrappedTaskLog);
