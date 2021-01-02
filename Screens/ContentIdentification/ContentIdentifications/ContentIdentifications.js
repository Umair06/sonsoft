import React, { Component } from 'react';
import DataTable from "../../../Components/DataTable/DataTable"
import { connect } from "react-redux";
import { Icon } from 'antd'
import { updateDataTableActions } from "../../../Redux/Actions/pageHeader/pageHeader";
import ContentIdentificationSettingSideDrawer from "../../../Components/Modal/contentIdentificationSetting"
import ContentIdentification from '../../../Components/Modal/ContentIdentification';
import { defineMessages } from 'react-intl';
import { message } from 'antd'
// import * as ApiInfo from "../../../APIConfig/ApiParameters";
import DataTableHeader from "../../../Components/DataTable/Component/DataTableHeader"

const messages = defineMessages({
    'Name': {
        id: "contentIdentification.name",
        defaultMessage: "Name",
    },
    'Notification Type': {
        id: "contentIdentification.notificationType",
        defaultMessage: "Notification Type"
    },
    'Notification Delay (Minutes)': {
        id: "contentIdentification.notificationDelay",
        defaultMessage: "Notification Delay (Minutes)"
    },
    'Enabled': {
        id: "contentIdentification.enabled",
        defaultMessage: "Enabled"
    },
})

class ContentIdentifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: {}
        }
        message.destroy()
    }

    componentDidMount() {
        this.props.updateDataTableActions({ setting: true, settingOpenDrawer: () => this.openDrawer('contentIdentificationSettingSideDrawer') })
    }

    openDrawer = (Drawer, values) => {
        this.setState({
            [Drawer]: true,
            values
        })
    }
    onClose = Drawer =>
        this.setState({
            [Drawer]: false
        })
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

    render() {
        const { contentIdentificationSideDrawer, contentIdentificationSettingSideDrawer, values, columnConfig, deleteRecord, deleteDrawer } = this.state;

        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                render: name => <div style={{ wordBreak: "break-all" }} >{name}</div>,
            },
            {
                title: 'Notification Type',
                dataIndex: 'notificationType',
                render: notificationType => <div style={{ wordBreak: "break-all" }} >{notificationType}</div>,


            },
            {
                title: 'Notification Delay (Minutes)',
                dataIndex: 'notificationDelay',
                render: notificationDelay => <div style={{ wordBreak: "break-all" }} >{notificationDelay}</div>,

            },
            {
                title: 'Enabled',
                render: text => <Icon type='check' />,
                // dataIndex: 'enabled'
            }
        ];
        const data = [
            {
                key: '1',
                name: 'name 001',
                notificationType: 'notitification type',
                notificationDelay: 'notification delay time',
            },
            {
                key: '2',
                name: 'name 001',
                notificationType: 'notitification type',
                notificationDelay: 'notification delay time',
            },
            {
                key: '3',
                name: 'name 001',
                notificationType: 'notitification type',
                notificationDelay: 'notification delay time',

            },
            {
                key: '4',
                name: 'name 001',
                notificationType: 'notitification type',
                notificationDelay: 'notification delay time',
            },
            {
                key: '5',
                name: 'name 001',
                notificationType: 'notitification type',
                notificationDelay: 'notification delay time',

            },
            {
                key: '6',
                name: 'name 001',
                notificationType: 'notitification type',
                notificationDelay: 'notification delay time',
            },
            {
                key: '7',
                name: 'name 001',
                notificationType: 'notitification type',
                notificationDelay: 'notification delay time',
            },
        ];

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
                {contentIdentificationSettingSideDrawer && (<ContentIdentificationSettingSideDrawer formatMessage={formatMessage} close={() => this.onClose('contentIdentificationSettingSideDrawer')} />)}
                {contentIdentificationSideDrawer && (<ContentIdentification formatMessage={formatMessage} close={() => this.onClose("contentIdentificationSideDrawer")} values={values} />)}
                <div >
                    <DataTableHeader
                        openDeleteDrawer={(record) => this.openDeleteDrawer(record)}
                        openColumConfigDrawer={() => this.openColumConfigDrawer()}
                        formatMessage={formatMessage} actionDropdown openDrawer={(values) => this.openDrawer('contentIdentificationSideDrawer', values)} data={data} add
                    />
                    <DataTable openDeleteDrawer={(record) => this.openDeleteDrawer(record)}
                        deleteRecord={deleteRecord}
                        deleteDrawer={deleteDrawer}
                        closeDeleteDrawer={() => this.closeDeleteDrawer()}
                        closeColumConfigDrawer={() => this.closeColumConfigDrawer()}
                        columnConfig={columnConfig}
                        formatMessage={formatMessage} actionDropdown enbDis openDrawer={(values) => this.openDrawer('contentIdentificationSideDrawer', values)} data={data} columns={columns} pagination addEditColumn add></DataTable>
                </div>
            </div >
        );
    }
};


const mapDispatchToProps = dispatch => {
    return {
        updateDataTableActions: actions => dispatch(updateDataTableActions(actions)),
    }
}


export default connect(null, mapDispatchToProps)(ContentIdentifications);