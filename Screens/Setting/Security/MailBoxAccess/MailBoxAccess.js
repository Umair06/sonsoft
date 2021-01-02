import React, { Component } from 'react';
import Datatable from "../../../../Components/DataTable/DataTable";
import { Button } from 'antd';
import AssignAccess from "../../../../Components/Modal/AssignAccess";
import { connect } from "react-redux";
import { updateDataTableActions } from "../../../../Redux/Actions/pageHeader/pageHeader";
import { fetchMailboxAccess, deleteMailboxAccess } from "../../../../Redux/Actions/SecurityAction/MailboxAccessAction"
import EmailModal from '../../../../Components/EmailModal/EmailModal'
import { defineMessages } from 'react-intl';
import style from "../../../../styles";
import * as ApiInfo from "../../../../APIConfig/ApiParameters";
import DataTableHeader from "../../../../Components/DataTable/Component/DataTableHeader"


const messages = defineMessages({
  'User Logon': {
    id: "mailBoxAccess.userLogon",
    defaultMessage: "User Logon",
  },
  'Email ID': {
    id: "mailBoxAccess.emailID",
    defaultMessage: "Email ID"
  },
  'Granted Mailboxes': {
    id: "mailBoxAccess.grantedMailboxes",
    defaultMessage: "Granted Mailboxes"
  },
})

class MailBoxAccess extends Component {
  constructor(props) {
    super(props)
    this.state = {
      result: [],
      values: {},
      more: false,
      columns: this.columns,
    }
  };
  columns = [
    {
      title: 'User Logon',
      dataIndex: 'User_Logon',
      render: User_Logon => <span style={{ wordBreak: "break-all" }} >{User_Logon}</span>,
      key: 'User Logon',
      width: 150
    },
    {
      title: 'Email ID',
      dataIndex: 'Email_ID',
      key: 'Email ID',
      render: Email_ID => <span style={{ wordBreak: "break-all" }} >{Email_ID}</span>,
      width: 250
    },
    {
      title: 'Granted MailBoxes',
      dataIndex: 'Granted_MailBoxes',
      key: 'Granted_MailBoxes',
      width: 250,
      render: Granted_MailBoxes => {
        let arrays;
        try {
          arrays = JSON.parse(Granted_MailBoxes && Granted_MailBoxes.replace(/'/g, '"'));
        } catch (e) {
          ApiInfo.DEBUGER && console.log("error", e)
        }
        // if (arrays && arrays.length === 1) {
        //   return (
        //     <div>
        //       {arrays && arrays.map((val, ind) => <p key={ind}>{val.userLogon}; {val.Email_ID}</p>)}
        //     </div>
        //   )
        // }
        if (arrays && Array.isArray(arrays) && arrays.length > 0) {
          return (
            <div style={{ ...style.setting.configuration.historyDomain.maicDiv }}>
              <div> {arrays && arrays.slice(0, 3).map((val, ind) => {
                return (
                  <p key={ind} style={{ ...style.marginPadding0, wordBreak: "break-all" }}>{val.userLogon}</p>
                )
              })}
                <Button type="link" onClick={() => this.openModal('emailModal', arrays)} style={{ ...style.setting.configuration.historyDomain.maicDiv, ...style.marginPadding0, ...style.borderNone }}>>>></Button></div>
            </div >
          )
        }
      },
      disabled: true,

    },
  ];

  componentDidMount() {
    this.props.updateDataTableActions({})
  }

  openModal = (modal, Data) => {
    this.setState({
      [modal]: true,
      Data
    })
  }

  MailBoxAccessSelect = e => {
    this.setState({
      MailBoxAccessOption: e.target.value,
    });
  };
  onChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

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
  filter = (input, option) => {
    return (
      option.props.children.toLowerCase()
        .indexOf(input.toLowerCase())
    )
  }
  Delete = (val) => {
    this.props.deleteMailboxAccess(val)
  }
  static getDerivedStateFromProps(nextProps) {
    !nextProps.mailboxaccess && nextProps.fetchMailboxAccess()
    return {}
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
    const { assignAccess, values, Data, columns, emailModal, columnConfig, deleteRecord, deleteDrawer, currentPage, pageSize } = this.state;

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
        {(<AssignAccess formatMessage={formatMessage} assignAccess={assignAccess} close={() => this.onClose('assignAccess')} values={values} />)}
        <DataTableHeader openDeleteDrawer={(record) => this.openDeleteDrawer(record)} openColumConfigDrawer={() => this.openColumConfigDrawer()} formatMessage={formatMessage} openDrawer={(values) => this.openDrawer('assignAccess', values)} actionDropdown data={this.props.mailboxaccess} add actions={{ syncStatus: false, status: false, archivePublicFolder: false, stubEnable: false, stubPeriod: false, enabled: false, activate: false }}
          currentPageSize={this.currentPageSize} />
        <div /*style={{ paddingTop: 10 }}*/>
          <Datatable openDeleteDrawer={(record) => this.openDeleteDrawer(record)}
            deleteRecord={deleteRecord}
            deleteDrawer={deleteDrawer}
            closeDeleteDrawer={() => this.closeDeleteDrawer()} closeColumConfigDrawer={() => this.closeColumConfigDrawer()}
            columnConfig={columnConfig} formatMessage={formatMessage} Delete={(text) => this.Delete(text)} openDrawer={(values) => this.openDrawer('assignAccess', values)} actionDropdown columns={columns} data={this.props.mailboxaccess} addEditColumn add actions={{ syncStatus: false, status: false, archivePublicFolder: false, stubEnable: false, stubPeriod: false, enabled: false, activate: false }} coveredHeight={200} pageSize={pageSize || 20}
            currentPage={currentPage}
            currentPaginationSize={this.currentPaginationSize} />
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    mailboxaccess: state.SecurityReducer.mailboxaccess
  }
};


const mapDispatchToProps = dispatch => {
  return {
    updateDataTableActions: actions => dispatch(updateDataTableActions(actions)),
    fetchMailboxAccess: () => dispatch(fetchMailboxAccess()),
    deleteMailboxAccess: data => dispatch(deleteMailboxAccess(data))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MailBoxAccess);


