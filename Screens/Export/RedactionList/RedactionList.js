
import React, { Component } from 'react';
import DataTable from "../../../Components/DataTable/DataTable";
import RedactionListSideDrawer from '../../../Components/Modal/RedactionList'
import { Icon, message } from 'antd'
import { defineMessages } from 'react-intl';
// import * as ApiInfo from "../../../APIConfig/ApiParameters";
import DataTableHeader from "../../../Components/DataTable/Component/DataTableHeader"



const messages = defineMessages({
  'Title': {
    id: "reductionList.title",
    defaultMessage: "Title",
  },
  'Regular Expression': {
    id: "reductionList.regularExpression",
    defaultMessage: "Regular Expression"
  },
  'Enabled': {
    id: "reductionList.enabled",
    defaultMessage: "Enabled"
  },
})

const data = [
  {
    key: '1',
    title: 'Credit Card',
    regularExpression: "^/(d{3}-{3}",
  },
];
const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    render: title => <span style={{ wordBreak: "break-all" }} >{title}</span>,
  },
  {
    title: 'Regular Expression',
    dataIndex: 'regularExpression',
    render: regularExpression => <span style={{ wordBreak: "break-all" }} >{regularExpression}</span>,
  },
  {
    title: 'Enabled',
    dataIndex: 'Enabled',
    render: (text) =>
      text === 1 ?
        <Icon type="check" />
        :
        <Icon type="close" />
  },
];

class RedactionList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      columns: columns
    }
    message.destroy()
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
    const { columns, redactionList, columnConfig, deleteRecord, deleteDrawer, currentPage, pageSize } = this.state

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
    // ApiInfo.DEBUGER && console.log(columns);

    return (
      <div>
        {<RedactionListSideDrawer formatMessage={formatMessage} redactionList={redactionList} close={() => this.onClose('redactionList')} />}

        <div>
          <DataTableHeader openDeleteDrawer={(record) => this.openDeleteDrawer(record)} openColumConfigDrawer={() => this.openColumConfigDrawer()} formatMessage={formatMessage} openDrawer={(values) => this.openDrawer('redactionList', values)} actionDropdown data={data} add actions={{ syncStatus: false, status: false, archivePublicFolder: false, stubEnable: false, stubPeriod: false, enabled: false, activate: false }} currentPageSize={this.currentPageSize} />
          <DataTable
            openDeleteDrawer={(record) => this.openDeleteDrawer(record)}
            deleteRecord={deleteRecord}
            deleteDrawer={deleteDrawer}
            closeDeleteDrawer={() => this.closeDeleteDrawer()}
            closeColumConfigDrawer={() => this.closeColumConfigDrawer()}
            columnConfig={columnConfig} formatMessage={formatMessage} openDrawer={(values) => this.openDrawer('redactionList', values)} actionDropdown data={data} columns={columns} pagination addEditColumn add actions={{ syncStatus: false, status: false, archivePublicFolder: false, stubEnable: false, stubPeriod: false, enabled: false, activate: false }} pageSize={pageSize || 20}
            currentPage={currentPage}
            currentPaginationSize={this.currentPaginationSize} ></DataTable>
        </div>
      </div>
    )
  }
};

export default RedactionList; 
