import React, { Component } from 'react'
import { Form, Input, Typography } from 'antd';
import DataTable from '../../../Components/DataTable/DataTable'
import { defineMessages } from 'react-intl';
import style from "../../../styles";
import { message } from 'antd'
// import * as ApiInfo from "../../../APIConfig/ApiParameters";
import DataTableHeader from "../../../Components/DataTable/Component/DataTableHeader"





const messages = defineMessages({
  'Mail ID': {
    id: "exclusionList.MailID",
    defaultMessage: "Mail ID",
  },
})

const { Text } = Typography
const columns = [
  {
    title: 'Mail ID',
    dataIndex: 'Email_ID',
    render: Email_ID => <span style={{ wordBreak: "break-all" }} >{Email_ID}</span>,
    key: 'Email ID',
  },
]
const data = [
  {
    key: '1',
    Email_ID: "asrara@sonasoft.com",
  },
  {
    key: '2',
    Email_ID: "bilala@sonasoft.com",
  },
]

class ExclusionList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      columns: columns
    }
    message.destroy()
  }

  add = () => {
    const { data, value, key } = this.state
    let obj = {
      key: key,
      Email_ID: value,
    }

    data.push(obj)
    this.setState({ data })
  }
  onChange = e => {
    e.preventDefault();
    this.setState({
      key: Math.random(),
      value: e.target.value
    })
  }
  remove = (value) => {
    const { data } = this.state
    let index = 0

    index = [...data].indexOf(value);

    if (index > -1) {
      data.splice(index, 1);
    }
    this.setState({
      data
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
  openDeleteDrawer = record => {
    this.setState({
      deleteDrawer: true,
      deleteRecord: record
    })
  }
  closeDeleteDrawer = () => {
    this.setState({
      deleteDrawer: false,
      deleteRecord: undefined
    })
  }
  currentPaginationSize = (page) => {
    this.setState({ currentPage: page })
  }
  currentPageSize = (value) => {
    this.setState({ pageSize: value })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { columns, columnConfig, deleteRecord, deleteDrawer, currentPage, pageSize } = this.state

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
        xs: { span: 12 },
        sm: { span: 10, pull: 4 },
      },
    };

    return (
      <div>
        <div style={{ ...style.padding10 }}>
          <Form layout="horizontal" labelAlign="left" {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label={<Text>{formatMessage(messages["Mail ID"])}</Text>} >
              {getFieldDecorator('EmailID', {

              })(
                <div style={{ display: "flex" }}> <Input onChange={e => this.onChange(e)} suffix={<img style={{ marginLeft: "5px" }} src={require(`../../../Assets/icons/SV_ICONS/Orange-Add.png`)} title="Add" alt={"Orange"} width={35} height={35} />} /></div>
              )}
            </Form.Item>
          </Form>

        </div>
        <div >
          <DataTableHeader openDeleteDrawer={(record) => this.openDeleteDrawer(record)} openColumConfigDrawer={() => this.openColumConfigDrawer()} formatMessage={formatMessage} actionDropdown data={data} delete={(value) => this.remove(value)} actions={{ syncStatus: false, status: false, archivePublicFolder: false, stubEnable: false, stubPeriod: false, enabled: false, activate: false }} currentPageSize={this.currentPageSize} />
          <DataTable openDeleteDrawer={(record) => this.openDeleteDrawer(record)}
            deleteRecord={deleteRecord}
            deleteDrawer={deleteDrawer}
            closeDeleteDrawer={() => this.closeDeleteDrawer()}

            closeColumConfigDrawer={() => this.closeColumConfigDrawer()}
            columnConfig={columnConfig} formatMessage={formatMessage} columns={columns} actionDropdown data={data} noEditIcon addEditColumn delete={(value) => this.remove(value)} actions={{ syncStatus: false, status: false, archivePublicFolder: false, stubEnable: false, stubPeriod: false, enabled: false, activate: false }} pageSize={pageSize || 20}
            currentPage={currentPage}
            currentPaginationSize={this.currentPaginationSize} />
        </div>
      </div>
    )
  }
}

const ExclusionListDrawerForm = Form.create('ExclusionList')(ExclusionList);

export default ExclusionListDrawerForm
