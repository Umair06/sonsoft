import React, { Component } from 'react';
import { connect } from "react-redux";
import { defineMessages } from 'react-intl';
import { Icon, message } from "antd";
import EmailServerSideDrawer from "../../../../Components/Modal/emailServer";
import DataTable from "../../../../Components/DataTable/DataTable"
import { updateDataTableActions } from "../../../../Redux/Actions/pageHeader/pageHeader";
import { fetchEmailServer, fetchEmailServerDetails, updateEmailServerStatus } from "../../../../Redux/Actions/ConfigurationAction/EmailServerAction"
import style from '../../../../styles';
import DataTableHeader from "../../../../Components/DataTable/Component/DataTableHeader"


const messages = defineMessages({
    'Email Server': {
        id: "emailServer.emailServer",
        defaultMessage: "Email Server",
    },
    'Journal Mailbox': {
        id: "emailServer.journalMailbox",
        defaultMessage: "Journal Mailbox"
    },
    'Journal Logon': {
        id: "emailServer.journalLogon",
        defaultMessage: "Journal Logon"
    },
    'Frequency': {
        id: "emailServer.frequency",
        defaultMessage: "Frequency"
    },
    'Status': {
        id: "emailServer.status",
        defaultMessage: "Status"
    },
    'Archive Public Folder?': {
        id: "emailServer.archivePublicFolder",
        defaultMessage: "Archive Public Folder?"
    },
    'Public Folder Poll Frequency (Minutes)': {
        id: "emailServer.publicFolderPollFrequency",
        defaultMessage: "Public Folder Poll Frequency (Minutes)"
    },
    'Stub Enabled': {
        id: "emailServer.stubEnabled",
        defaultMessage: "Stub Enabled"
    },
    'Stub Period (Days)': {
        id: "emailServer.stubPeriod",
        defaultMessage: "Stub Period (Days)"
    },
    'Exclude Hours?': {
        id: "emailServer.excludeHours",
        defaultMessage: "Exclude Hours?"
    },
    'Exclude Hours Start Time (HH:mm)': {
        id: "emailServer.excludeHoursStartTime",
        defaultMessage: "Exclude Hours Start Time (HH:mm)"
    },
    'Exclude Hours End Time (HH:mm)': {
        id: "emailServer.excludeHoursEndTime",
        defaultMessage: "Exclude Hours End Time (HH:mm)"
    },
    'Domain Name': {
        id: "emailServer.domainName",
        defaultMessage: "Domain Name"
    },
    'Agent Version': {
        id: "emailServer.agentVersion",
        defaultMessage: "Agent Version"
    },
})

const columns = [
    {
        title: 'Email Server',
        dataIndex: 'emailSever',
        width: 200,
        render: emailSever => {
            return (
                <span style={{ wordBreak: "break-all" }}>{emailSever}</span>
            )
        },
    },
    {
        title: 'Journal Mailbox',
        dataIndex: 'journalMailbox',
        hide: true,
        disabled: true,
        width: 100,
        render: journalMailbox => {
            return (
                <span style={{ wordBreak: "break-all" }}>{journalMailbox}</span>
            )
        },
    },
    {
        title: 'Journal Logon',
        dataIndex: 'journalLogon',
        disabled: true,
        width: 200,
        render: journalLogon => {
            return (
                <span style={{ wordBreak: "break-all" }}>{journalLogon}</span>
            )
        },
    },
    {
        title: 'Frequency',
        dataIndex: 'pollFrequency',
        hide: true,
        disabled: true,
        width: 200,
        render: pollFrequency => {
            return (
                <span style={{ wordBreak: "break-all" }}>{pollFrequency}</span>
            )
        },
    },
    {
        title: 'Status',
        render: (Status) => Status.active ? <Icon type="check"></Icon> : <Icon type="close"></Icon>,
        disabled: true,
        width: 100
    },
    {
        title: 'Archive Public Folder?',
        render: (Status) => Status.archivePublicFolder ? <Icon type="check"></Icon> : <Icon type="close"></Icon>,
        disabled: true,
        width: 100
    },
    {
        title: 'Public Folder Poll Frequency (Minutes)',
        dataIndex: 'publicFolderPollFrequency',
        hide: true,
        disabled: true,
        width: 100,
        render: publicFolderPollFrequency => {
            return (
                <span style={{ wordBreak: "break-all" }}>{publicFolderPollFrequency || "-"}</span>
            )
        },
    },
    {
        title: 'Stub Enabled',
        dataIndex: "stubEnabled",
        render: stubEnabled => stubEnabled ? <Icon type="check"></Icon> : <Icon type="close"></Icon>,
        disabled: true,
        width: 100
    },
    {
        title: 'Stub Period (Days)',
        dataIndex: "stubPeriod",
        hide: true,
        disabled: true,
        width: 150,
        render: stubPeriod => {
            return (
                <span style={{ wordBreak: "break-all" }}>{stubPeriod || "-"}</span>
            )
        },
    },
    {
        title: 'Exclude Hours?',
        render: (Status) => Status.exludeHours ? <Icon type="check"></Icon> : <Icon type="close"></Icon>,
        disabled: true,
        width: 100
    },
    {
        title: 'Exclude Hours Start Time (HH:mm)',
        dataIndex: 'excludeHourStartTime',
        hide: true,
        disabled: true,
        width: 100,
        render: excludeHourStartTime => {
            return (
                <span style={{ wordBreak: "break-all" }}>{excludeHourStartTime || "-"}</span>
            )
        },
    },
    {
        title: 'Exclude Hours End Time (HH:mm)',
        dataIndex: 'excludeHourEndTime',
        hide: true,
        disabled: true,
        width: 100,
        render: excludeHourEndTime => {
            return (
                <span style={{ wordBreak: "break-all" }}>{excludeHourEndTime || "-"}</span>
            )
        },
    },
    {
        title: 'Domain Name',
        dataIndex: 'domainName',
        disabled: true,
        width: 150,
        render: domainName => {
            return (
                <span style={{ wordBreak: "break-all" }}>{domainName}</span>
            )
        },
    },
    {
        title: 'Agent Version',
        dataIndex: 'agentVersion',
        hide: true,
        disabled: true,
        width: 100,
        render: agentVersion => {
            return (
                <span style={{ wordBreak: "break-all", display: "flex", justifyContent: "center" }}>{agentVersion || "-"}</span>
            )
        },
    },
];
class EmailServer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: {}
        }
        message.destroy()
    }

    componentDidMount() {
        this.props.fetchEmailServer()
        this.props.updateDataTableActions({})
    }

    openDrawer = (Drawer, values) => {
        if (values) {
            this.props.fetchEmailServerDetails(values)
        }
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
    changeStatus = (val, Is_Active) => {
        val.status = Is_Active ? 1 : 0
        this.props.updateEmailServerStatus(val)
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
        const { emailServerSideDrawer, values, columnConfig, currentPage, pageSize } = this.state;
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
            <div style={{ ...style.cursorPointer }}>
                {(<EmailServerSideDrawer formatMessage={formatMessage} emailServerSideDrawer={emailServerSideDrawer} close={() => this.onClose('emailServerSideDrawer')} values={values} />)}

                <DataTableHeader formatMessage={formatMessage}
                    openColumConfigDrawer={() => this.openColumConfigDrawer()}
                    actionDropdown noDelete
                    openDrawer={(values) => this.openDrawer('emailServerSideDrawer', values)}
                    changeStatus={(text, Is_Active) => this.changeStatus(text, Is_Active)}
                    data={this.props.emailserver}
                    add
                    actions={{ syncStatus: false, status: true, archivePublicFolder: true, stubEnable: true, stubPeriod: true, enabled: false, activate: false }}
                    currentPageSize={this.currentPageSize}
                />
                <DataTable
                    closeColumConfigDrawer={() => this.closeColumConfigDrawer()}
                    columnConfig={columnConfig}
                    formatMessage={formatMessage}
                    keyID="emailServerId"
                    xscroll={2050}
                    enbDis actionDropdown noDelete
                    openDrawer={(values) => this.openDrawer('emailServerSideDrawer', values)}
                    coveredHeight={240}
                    changeStatus={(text, Is_Active) => this.changeStatus(text, Is_Active)}
                    data={this.props.emailserver}
                    columns={columns} pagination addEditColumn add
                    actions={{ syncStatus: false, status: true, archivePublicFolder: true, stubEnable: true, stubPeriod: true, enabled: false, activate: false }}
                    pageSize={pageSize || 20}
                    currentPage={currentPage}
                    currentPaginationSize={this.currentPaginationSize}
                >
                </DataTable>
            </div>
        );
    }
};
const mapStateToProps = state => {
    return {
        emailserver: state.EmailServerReducer.emailserver
    }
};
const mapDispatchToProps = dispatch => {
    return {
        updateDataTableActions: actions => dispatch(updateDataTableActions(actions)),
        fetchEmailServer: () => dispatch(fetchEmailServer()),
        fetchEmailServerDetails: data => dispatch(fetchEmailServerDetails(data)),
        updateEmailServerStatus: (data) => dispatch(updateEmailServerStatus(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailServer);
