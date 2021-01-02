import React, { Component } from 'react';
import DataTable from "../../../../Components/DataTable/DataTable";
import HistoricDomainSideDrawer from "../../../../Components/Modal/HistoricDomain"
import { Button, message } from 'antd'
import { connect } from "react-redux";
import { updateDataTableActions } from "../../../../Redux/Actions/pageHeader/pageHeader";
import { fetchHistoricDomain, deleteHistoricDomain } from "../../../../Redux/Actions/ConfigurationAction/HistoricDomainAction"
import EmailModal from '../../../../Components/EmailModal/EmailModal'
import { defineMessages } from 'react-intl';
import style from '../../../../styles';
import DataTableHeader from "../../../../Components/DataTable/Component/DataTableHeader"


const messages = defineMessages({
  'Old Domain Name': {
    id: "historyDomain.oldDomainName",
    defaultMessage: "Old Domain Name",
  },
  'Description': {
    id: "historyDomain.description",
    defaultMessage: "Description"
  },
  'Granted MailBoxes': {
    id: "historyDomain.grantedMailBoxes",
    defaultMessage: "Granted Mailboxes"
  },
})

class HistoryDomain extends Component {
  constructor(props) {
    super(props)
    this.state = {
      columns: this.columns,
      values: {}
    }
    message.destroy()
  }

  columns = [
    {
      title: 'Old Domain Name',
      dataIndex: 'oldDomainName',
      render: oldDomainName => <div style={{ wordBreak: "break-all" }} >{oldDomainName}</div>,
      width: 250,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      disabled: true,
      render: description => <div style={{ wordBreak: "break-all" }} >{description}</div>,
      width: 250,
    },
    {
      title: 'Granted MailBoxes',
      dataIndex: 'Granted_MailBoxes',
      key: 'Granted_MailBoxes',
      // children: [
      //   {
      //     key: 11,
      //     name: 'John Brown',
      //     age: 42,
      //     address: 'New York No. 2 Lake Park',
      //   }],
      render: text => {
        var arrays = JSON.parse(text && text.replace(/'/g, '"'));

        // if (arrays && arrays.length === 1) {
        //   return (
        //     <div>
        //       {arrays && arrays.map((val, ind) => <p key={ind}>{val.userLogon} </p>)}
        //     </div>
        //   )
        // }
        if (arrays && arrays.length > 0) {
          return (

            <div style={{ ...style.setting.configuration.historyDomain.maicDiv }}>
              <div> {arrays && arrays.slice(0, 3).map((val, ind) => {
                return (
                  <p key={ind} style={{ ...style.marginPadding0, wordBreak: "break-all" }}>{val.userLogon}</p>
                )
              })}
                <Button type="link" onClick={() => this.openModal('emailModal', arrays)} style={{ ...style.setting.configuration.historyDomain.maicDiv, ...style.marginPadding0, ...style.borderNone }}>>>></Button>
              </div>

            </div >
          )

        }
      },
      width: 300,
      disabled: true

    },
  ];
  data = [
    {
      key: '1',
      oldDomainName: 'sonasoft.com',
      description: 'Sonasoft',
      Granted_MailBoxes: [{ userLogon: 'faizan', Email_ID: '<faizank@sonasoft.com>' }, { userLogon: 'mohtashim', Email_ID: '<mohtashim@sonasoft.com>' }],
    },
    {
      key: '2',
      oldDomainName: 'sonasoft.com',
      description: 'Sonasoft',
      Granted_MailBoxes: [{ userLogon: 'faizan', Email_ID: '<faizank@sonasoft.com>' }, { userLogon: 'mohtashim', Email_ID: '<mohtashim@sonasoft.com>' }],

    },
    {
      key: '3',
      oldDomainName: 'sonasoft.com',
      description: 'Sonasoft',
      Granted_MailBoxes: [{ userLogon: 'faizan', Email_ID: '<faizank@sonasoft.com>' }, { userLogon: 'mohtashim', Email_ID: '<mohtashim@sonasoft.com>' }],
    },
    {
      key: '4',
      oldDomainName: 'sonasoft.com',
      description: 'Sonasoft',
      Granted_MailBoxes: [{ userLogon: 'faizan', Email_ID: '<faizank@sonasoft.com>' }, { userLogon: 'mohtashim', Email_ID: '<mohtashim@sonasoft.com>' }, { userLogon: 'Hamza', Email_ID: '<Hamza@sonasoft.com>' }],
    },
  ];

  openModal = (modal, Data) => {
    this.setState({
      [modal]: true,
      Data
    })
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
  Delete = val => {
    let ids;
    if (val && Array.isArray(val)) {
      ids = val.map(oldDomain => oldDomain.oldDomainId)
    } else {
      ids = [val.oldDomainId]
    }
    this.props.deleteHistoricDomain(ids)
  }
  componentDidMount() {
    this.props.fetchHistoricDomain()
    this.props.updateDataTableActions({})
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
    const { historicDomainSideDrawer, values, columns, emailModal, Data, columnConfig, deleteRecord, deleteDrawer, currentPage, pageSize } = this.state;
    const { formatMessage } = this.props;
    const messagesKeys = Object.keys(messages);
    const messagesValues = Object.values(messages);
    columns.forEach((c) => {
      messagesKeys.forEach((mK, index) => {
        if (c.key === mK) {
          c.title = formatMessage(messagesValues[index]);
        }
      })
    })

    return (
      <div>
        {(<EmailModal formatMessage={formatMessage} emailModal={emailModal} data={Data} close={() => this.onClose('emailModal')} />)}
        {(<HistoricDomainSideDrawer formatMessage={formatMessage} historicDomainSideDrawer={historicDomainSideDrawer} close={() => this.onClose("historicDomainSideDrawer")} values={values} />)}
        <DataTableHeader
          openDeleteDrawer={(record) => this.openDeleteDrawer(record)}
          openColumConfigDrawer={() => this.openColumConfigDrawer()}
          formatMessage={formatMessage} needRowSelection actionDropdown actions={{}} openDrawer={(values) => this.openDrawer('historicDomainSideDrawer', values)} data={this.props.historicdomain} add
          currentPageSize={this.currentPageSize}
        />
        <div /*style={{ paddingTop: 10 }}*/>

          <DataTable
            openDeleteDrawer={(record) => this.openDeleteDrawer(record)}
            deleteRecord={deleteRecord}
            deleteDrawer={deleteDrawer}
            closeDeleteDrawer={() => this.closeDeleteDrawer()}
            closeColumConfigDrawer={() => this.closeColumConfigDrawer()}
            columnConfig={columnConfig} formatMessage={formatMessage} keyID="oldDomainId" needRowSelection actionDropdown actions={{}} openDrawer={(values) => this.openDrawer('historicDomainSideDrawer', values)} Delete={text => this.Delete(text)} columns={columns} data={this.props.historicdomain} add addEditColumn coveredHeight={200}
            pageSize={pageSize || 20}
            currentPage={currentPage}
            currentPaginationSize={this.currentPaginationSize}
          />
        </div>
      </div>
    )
  }
};
const mapStateToProps = state => {
  return {
    historicdomain: state.HistoricDomainReducer.historicdomain
  }
};

const mapDispatchToProps = dispatch => {
  return {
    updateDataTableActions: actions => dispatch(updateDataTableActions(actions)),
    fetchHistoricDomain: () => dispatch(fetchHistoricDomain()),
    deleteHistoricDomain: data => dispatch(deleteHistoricDomain(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryDomain);
