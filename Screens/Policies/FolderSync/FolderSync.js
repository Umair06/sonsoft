import React from 'react';
import DataTable from "../../../Components/DataTable/DataTable"
import { ConfigProvider, Typography, Select, Transfer, Tabs, Form, Spin, message } from 'antd';
import { connect } from "react-redux";
import { updateDataTableActions } from "../../../Redux/Actions/pageHeader/pageHeader";
import {  updateRowActions } from "../../../Redux/Actions/ActionRowAction/ActionRowAction";

import { fetchArchivedUserList, fetchFolderSyncUserList, fetchFolderSyncHistory, postFolderSyncHistoryUpdate, FolderSyncUser, ArchivedUser, FolderSyncHistory } from "../../../Redux/Actions/Policies/FolderSyncAction";
import { fetchUserList, User } from "../../../Redux/Actions/Policies/ArchivalPolicyAction"
import { defineMessages } from 'react-intl';
import style from '../../../styles';
import moment from "moment";
import DataTableHeader from "../../../Components/DataTable/Component/DataTableHeader"

const messages = defineMessages({
    'Server': {
        id: "folderSync.server",
        defaultMessage: "Server",
    },
    'Completed On': {
        id: "folderSync.completedOn",
        defaultMessage: "Completed On"
    },
    'Fetching': {
        id: "folderSync.Fetching",
        defaultMessage: "Fetching",
    },
    'Reset': {
        id: "folderSync.Reset",
        defaultMessage: "Reset"
    },
    'History': {
        id: "folderSync.History",
        defaultMessage: "History"
    },
    'Configuration policy': {
        id: "folderSync.ConfigurationPolicy",
        defaultMessage: "Configuration policy"
    },
    'Select One': {
        id: "folderSync.SelectOne",
        defaultMessage: "Select One"
    },
    'ALL': {
        id: "folderSync.ALL",
        defaultMessage: "ALL",
    },
    'Please Write Server': {
        id: "folderSync.PleaseWriteServer",
        defaultMessage: "Please Write Server"
    },
    'Available': {
        id: "folderSync.Available",
        defaultMessage: "Available"
    },
    'Selected': {
        id: "folderSync.Selected",
        defaultMessage: "Selected"
    },
    'Mailbox': {
        id: "folderSync.Mailbox",
        defaultMessage: "Mailbox"
    },
    'Mailbox(es)': {
        id: "folderSync.Mailbox(es)",
        defaultMessage: "Mailbox(es)"
    },
})

const { Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;
const columns = [
    {
        title: 'Server',
        dataIndex: 'Server',
        render: Server => <span style={{ wordBreak: "break-all" }} >{Server}</span>,
        width: 550
    },
    {
        title: 'Completed On',
        dataIndex: 'CompletedOn',
        render: CompletedOn => {
            let date = CompletedOn ? (moment(new Date(CompletedOn)).format('DD-MMM-YYYY') === "Invalid date" ? CompletedOn : moment(new Date(CompletedOn)).format('DD-MMM-YYYY')) : ""
            return (
                <Text style={{ wordBreak: "break-all" }}>{date}</Text>
            )
        },
        width: 550

    },
];

class FolderSync extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
            userOption: 1,
            mockData: [],
            tab: 1
        };
        message.destroy()
    }

    // getFolderSyncUserList = () => {
    //     this.props.fetchFolderSyncUserList()
    // };

    filterOption = (inputValue, option) => {
        try {
            return option.title.toLowerCase().toString().indexOf(inputValue.toLowerCase()) > -1;
        } catch (e) { }
    }

    handleChange = (targetKeys) => {
        this.setState({ foldersyncusers: targetKeys });
    };

    customizeRenderEmpty = () => {
        const { formatMessage } = this.props;
        return (
            <div style={{ textAlign: 'center' }}>
                <Spin />
                <p>{formatMessage(messages["Fetching"])}</p>
            </div>
        )
    }
    // renderFooter = () => {
    //     const { formatMessage } = this.props;
    //     return (
    //         <Button size="small" style={{ float: 'right', margin: 5 }} onClick={this.getFolderSyncUserList}>
    //             {formatMessage(messages["Reset"])}
    //         </Button>
    //     )
    // }



    saveData = () => {
        const { foldersyncusers } = this.state
        this.props.postFolderSyncHistoryUpdate(foldersyncusers);
    }
    RefreshConfigurationPolicy = () => {
        this.props.ArchivedUser();
        this.props.FolderSyncUser();
        this.props.fetchArchivedUserList();
        this.props.fetchUserList();
        this.props.User();
        this.props.fetchFolderSyncUserList();
    }
    RefreshForHistory = () => {
        this.props.FolderSyncHistory();
        this.props.fetchFolderSyncHistory();
    }
    callBack = key => {
        if (key === '1') {
            this.props.updateDataTableActions({ refresh: false, onRefresh: () => this.RefreshForHistory() })
            this.props.updateRowActions(true);
        }
        if (key === '2') {
            this.props.updateDataTableActions({ save: true, saveValues: () => this.saveData(), refresh: true, onRefresh: () => this.RefreshConfigurationPolicy() })
            this.props.updateRowActions(false);

        }
    }
    static getDerivedStateFromProps(props, state) {
        if ((state.tab === "1" || state.tab === 1) && !props.foldersynchistory) {
            props.fetchFolderSyncHistory()
        }
        if ((state.tab === "2" || state.tab === 2) && (!props.archivedusers)) {
            props.fetchArchivedUserList();
        }
        if ((state.tab === "2" || state.tab === 2) && (!props.foldersyncusers)) {
            props.fetchFolderSyncUserList()
        }
        if ((state.tab === "2" || state.tab === 2) && (!props.users)) {
            props.fetchUserList()
        }
        return null
    }
    componentDidMount() {
        this.callBack('1')
    }
    getData = (users, foldersyncusers) => {
        const { selectedServer } = this.state;
        const Data = [];
        if (selectedServer) {
            for (let i = 0; i < users.length; i++) {
                if (selectedServer && selectedServer === users[i].EXCHANGE_SERVER_NAME) {
                    Data.push({
                        key: users[i].USER_ID,
                        title: users[i].MAILBOX_NAME,
                    })
                }
            }
        } else {
            for (let i = 0; i < foldersyncusers.length; i++) {
                Data.push({
                    key: foldersyncusers[i].USER_ID,
                    title: foldersyncusers[i].MAILBOX_NAME,
                })
            }
        }
        return Data;
    }
    getTargetKeys = (foldersyncusers) => {
        const targetKeys = this.state.foldersyncusers || []
        for (let i = 0; i < foldersyncusers.length; i++) {
            targetKeys.push(foldersyncusers[i].USER_ID);
        }
        this.setState({ foldersyncusers: targetKeys });
    };
    renderItem = item => {
        const customLabel = (
            <span className="custom-item">
                {item.title}
            </span>
        );
        return {
            label: customLabel, // for displayed item
            value: item.title, // for title and filter matching
        };
    }

    fetchUserList = key => {
        this.setState({
            tab: key
        })
    }

    onChangeServer = (val) => {
        this.setState({
            selectedServer: val
        })
    }

    renderServerOptions = (data) => {
        if (data) {
            let serverNames = data.map(val => val.EXCHANGE_SERVER_NAME)
            serverNames = new Set(serverNames)
            serverNames = [...serverNames]
            serverNames = serverNames.filter(server => server.length > 0)
            return serverNames.map((val, ind) => <Option key={ind} value={val}>{val}</Option>)
        }
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

    componentWillUnmount() {
        this.props.updateDataTableActions({ refresh: false })
        this.props.updateRowActions(false);

    }
    render() {
        const { columnConfig, deleteRecord, deleteDrawer } = this.state
        const { getFieldDecorator } = this.props.form;
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
        
        const formItemLayout = {
            labelCol: {
                xs: { span: 12 },
                sm: { span: 8, push: 1 },
            },
            wrapperCol: {
                xs: { span: 12 },
                sm: { span: 12, pull: 4 },
            },
        };

        return (
            <div className="card-container" >
                {(this.state.tab === "1" || this.state.tab === 1)
                    &&
                    <DataTableHeader
                        needRefreshIcon={true}
                        openDeleteDrawer={(record) => this.openDeleteDrawer(record)}
                        openColumConfigDrawer={() => this.openColumConfigDrawer()}
                        formatMessage={formatMessage} data={this.props.foldersynchistory}
                    />}
                <Tabs type="card" onChange={this.callBack} tabBarStyle={{ ...style.tabs.tabBar }} onTabClick={(key, e) => this.fetchUserList(key)} >

                    <TabPane tab={formatMessage(messages["History"])} key="1">
                        <div >

                            <DataTable openDeleteDrawer={(record) => this.openDeleteDrawer(record)}
                                deleteRecord={deleteRecord}
                                deleteDrawer={deleteDrawer}
                                closeDeleteDrawer={() => this.closeDeleteDrawer()}
                                closeColumConfigDrawer={() => this.closeColumConfigDrawer()}
                                columnConfig={columnConfig}
                                seperator="FolderSyncPolicy" formatMessage={formatMessage} rowSelection columns={columns} data={this.props.foldersynchistory} coveredHeight={240} />
                        </div>
                    </TabPane>
                    <TabPane tab={formatMessage(messages["Configuration policy"])} key="2" >
                        <div style={{ paddingTop: 5 }} >
                            <Form labelAlign="left" layout="horizontal" {...formItemLayout} onSubmit={this.handleSubmit}>
                                <Form.Item label={<Text >{formatMessage(messages["Server"])}</Text>}>
                                    {getFieldDecorator('Server', {
                                        rules: [
                                            {
                                                required: true,
                                                message: formatMessage(messages["Please Write Server"]),
                                            },
                                        ],
                                    })(<div><Select
                                        name="siteprefix" placeholder={formatMessage(messages["Select One"])}
                                        onBlur={this.onBlur}
                                        onChange={(val) => this.onChangeServer(val)}
                                        onSearch={this.onSearch}
                                        style={{ height: 40 }}
                                        allowClear={true}
                                        filterOption={(input, option) => {
                                            try {
                                                return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            } catch (e) { }
                                        }
                                        }
                                        notFoundContent={
                                            !this.props.archivedusers && (
                                                <Text>
                                                    <Spin size='small' style={{ marginRight: 15 }} />
                                                    {'Fetching'}
                                                </Text>
                                            )
                                        }
                                        showSearch>
                                        {this.props.archivedusers && this.renderServerOptions(this.props.archivedusers)}
                                    </Select> </div>)}
                                </Form.Item>

                                {/* <div style={{ display: "flex", paddingLeft: 90 }}> */}
                                <ConfigProvider renderEmpty={(!this.props.archivedusers || !this.props.users) && this.customizeRenderEmpty}>

                                    <Form.Item colon={false} label=" ">
                                        {getFieldDecorator('Transfer', {
                                        })(
                                            <Transfer
                                                titles={[formatMessage(messages["Available"]), formatMessage(messages["Selected"])]}
                                                dataSource={this.props.foldersyncusers && this.props.users && this.getData(this.props.users, this.props.foldersyncusers)}
                                                showSearch
                                                locale={{ itemUnit: formatMessage(messages["Mailbox"]), itemsUnit: formatMessage(messages["Mailbox(es)"]) }}
                                                listStyle={{
                                                    width: 220,
                                                    height: 300,
                                                }}
                                                filterOption={this.filterOption}
                                                targetKeys={this.state.foldersyncusers ? this.state.foldersyncusers : this.props.foldersyncusers && this.getTargetKeys(this.props.foldersyncusers)}
                                                onChange={(nextTargetKeys, direction, moveKeys) => this.handleChange(nextTargetKeys, direction, moveKeys)}
                                                onSearch={this.handleSearch}
                                                render={(records) => this.renderItem(records)}
                                            // footer={this.renderFooter}
                                            />
                                        )}


                                    </Form.Item>
                                </ConfigProvider>
                            </Form>
                        </div>

                    </TabPane>

                </Tabs >
            </div >
        );
    }
}

const WrappedFolderSync = Form.create({ name: 'FolderSync' })(FolderSync);
const mapStateToProps = state => {
    return {
        archivedusers: state.FolderSyncReducer.archivedusers,
        users: state.ArchivalPolicyReducer.users,
        foldersyncusers: state.FolderSyncReducer.foldersyncusers,
        foldersynchistory: state.FolderSyncReducer.foldersynchistory
    }
};
const mapDispatchToProps = dispatch => {
    return {
        updateDataTableActions: actions => dispatch(updateDataTableActions(actions)),
        updateRowActions: actions => dispatch(updateRowActions(actions)),
        fetchFolderSyncHistory: () => dispatch(fetchFolderSyncHistory()),
        FolderSyncHistory: () => dispatch(FolderSyncHistory()),

        fetchArchivedUserList: () => dispatch(fetchArchivedUserList()),
        fetchFolderSyncUserList: () => dispatch(fetchFolderSyncUserList()),
        postFolderSyncHistoryUpdate: (data) => dispatch(postFolderSyncHistoryUpdate(data)),
        fetchUserList: () => dispatch(fetchUserList()),
        User: () => dispatch(User()),

        ArchivedUser: () => dispatch(ArchivedUser()),
        FolderSyncUser: () => dispatch(FolderSyncUser()),

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(WrappedFolderSync);

