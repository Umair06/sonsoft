import React, { Component } from 'react';
import DataTable from "../../../../Components/DataTable/DataTable";
import { Icon, Typography, Form, Input, Radio, InputNumber, message, } from "antd";
import { Tabs } from 'antd';
import ArchiveStoreSideDrawer from "../../../../Components/Modal/ArchiveStore";
import { connect } from "react-redux";
import { updateDataTableActions } from "../../../../Redux/Actions/pageHeader/pageHeader";
import { defineMessages } from 'react-intl';

const messages = defineMessages({
    'Archive Store': {
        id: "archiveStore.archiveStore",
        defaultMessage: "Archive Store",
    },
    'Database': {
        id: "archiveStore.database",
        defaultMessage: "Database"
    },
    'Status': {
        id: "archiveStore.status",
        defaultMessage: "Status"
    },
    'Type': {
        id: "archiveStore.type",
        defaultMessage: "Type"
    },
    'Size': {
        id: "archiveStore.size",
        defaultMessage: "Size (MB)"
    },
    'Period': {
        id: "archiveStore.period",
        defaultMessage: "Period (Days)"
    },
    'Created On': {
        id: "archiveStore.createdOn",
        defaultMessage: "Created On"
    },
    'Created By': {
        id: "archiveStore.createdBy",
        defaultMessage: "Created By"
    },
})

const { TabPane } = Tabs;
const { Text } = Typography;

const columns = [
    {
        title: 'Archive Store',
        dataIndex: 'archiveStore',
        render: archiveStore => <span style={{wordBreak:"break-all"}} >{archiveStore}</span>,

    },
    {
        title: 'Database',
        dataIndex: 'database',
        render: database => <span style={{wordBreak:"break-all"}} >{database}</span>,

    },
    {
        title: 'Status',
        render: () => <Icon type="close"></Icon>
    }
];
const data = [
    {
        key: '1',
        archiveStore: 'SNS_ARCHDB_00014',
        database: 'SNS_ARCHDB_00014',
    },
    {
        key: '2',
        archiveStore: 'SNS_ARCHDB_00014',
        database: 'SNS_ARCHDB_00014',
    },
    {
        key: '3',
        archiveStore: 'SNS_ARCHDB_00014',
        database: 'SNS_ARCHDB_00014',
    },
    {
        key: '4',
        archiveStore: 'SNS_ARCHDB_00014',
        database: 'SNS_ARCHDB_00014',
    },
    {
        key: '5',
        archiveStore: 'SNS_ARCHDB_00014',
        database: 'SNS_ARCHDB_00014',
    },
    {
        key: '6',
        archiveStore: 'SNS_ARCHDB_00014',
        database: 'SNS_ARCHDB_00014',
    },
    {
        key: '7',
        archiveStore: 'SNS_ARCHDB_00014',
        database: 'SNS_ARCHDB_00014',
    },
];

const columnsForViewHistory = [
    {
        title: 'Type',
        dataIndex: 'type',
    },

    {
        title: 'Size (MB)',
        dataIndex: 'sizeMB',
    },
    {
        title: 'Period (Days)',
        dataIndex: 'periodDays',
    },
    {
        title: 'Created On',
        dataIndex: 'createdOn',
    },
    {
        title: 'Created By',
        dataIndex: 'createdBy',
    }
];
const dataForViewHistory = [
    {
        key: '1',
        type: "size",
        sizeMB: '10240.00',
        periodDays: '0',
        createdOn: '25-May-2018 07:50',
        createdBy: 'sonasoftarc'
    },
    {
        key: '2',
        type: "size",
        sizeMB: '10240.00',
        periodDays: '0',
        createdOn: '25-May-2018 07:50',
        createdBy: 'sonasoftarc'
    },
    {
        key: '3',
        type: "size",
        sizeMB: '10240.00',
        periodDays: '0',
        createdOn: '25-May-2018 07:50',
        createdBy: 'sonasoftarc'
    },
    {
        key: '4',
        type: "period",
        sizeMB: '10240.00',
        periodDays: '0',
        createdOn: '25-May-2018 07:50',
        createdBy: 'sonasoftarc'
    },
    {
        key: '5',
        type: "size",
        sizeMB: '10240.00',
        periodDays: '0',
        createdOn: '25-May-2018 07:50',
        createdBy: 'sonasoftarc'
    },
    {
        key: '6',
        type: "size",
        sizeMB: '10240.00',
        periodDays: '0',
        createdOn: '25-May-2018 07:50',
        createdBy: 'sonasoftarc'
    },
    {
        key: '7',
        type: "size",
        sizeMB: '10240.00',
        periodDays: '0',
        createdOn: '25-May-2018 07:50',
        createdBy: 'sonasoftarc'
    },
];

// const locationInfo = ['E:\Program Files (x86)\Sonasoft\sonaarc\ArchiveStores', 'E:\Program Files (x86)\Sonasoft\sonaarc\ArchiveStores', 'E:\Program Files (x86)\Sonasoft\sonaarc\ArchiveStores']
const value = ""

class ArchiveStore extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 1,
            result: [],
            values: {}
        };
        message.destroy()
    }

    componentDidMount() {
        this.props.updateDataTableActions({})
    }

    handleSearch = value => {
        let result;
        if (!value || value.indexOf('@') >= 0) {
            result = [];
        } else {
            result = ['gmail.com', '163.com', 'qq.com'].map(domain => `${value}@${domain}`);
        }
        this.setState({ result });
    };
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
    onChangeRadio = (e) => {
        this.setState({
            value: e.target.value
        })
    }

    render() {
        const { archiveStoreSideDrawer, values } = this.state;
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
        columnsForViewHistory.forEach((cfvh) => {
            messagesKeys.forEach((mK, index) => {
                if (cfvh.key === mK) {
               cfvh.title = formatMessage(messagesValues[index]);
                }
            })
        })
        
        return (
            <div>
                {archiveStoreSideDrawer && (<ArchiveStoreSideDrawer formatMessage={formatMessage} close={() => this.onClose('archiveStoreSideDrawer')} values={values} />)}
                <Tabs defaultActiveKey="1" onChange={this.callback}>

                    <TabPane tab="Archive Store" key="1">
                        <div style={{ padding: 10, cursor: "pointer" }}>
                            <DataTable formatMessage={formatMessage} openDrawer={(values) => this.openDrawer("archiveStoreSideDrawer", values)} data={data} columns={columns} pagination addEditColumn activeStore ></DataTable>
                        </div>
                    </TabPane>

                    <TabPane tab="Location Info" key="2">
                        <div style={{ padding: "20px 150px" }}>
                            {/* <CollapseAbleHeader style={{ paddingBottom: 40 }} heading="Location Info"> */}
                            <div style={{ padding: "30px 0px" }}><div style={{ width: 'inherit' }}>
                                <Form labelAlign="left" layout="horizontal" onSubmit={this.handleSubmit}>
                                    <Form.Item style={{ margin: "14px 0px" }} label={<Text>Data File Location</Text>} >
                                        {getFieldDecorator('Data File Location', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Please Write something on Data File Location',
                                                },
                                            ],
                                        })(<div><Input style={{ width: "80vh" }} width={30} /></div>)}
                                    </Form.Item>
                                    <Form.Item style={{ margin: "14px 0px" }} label={<Text>Log File Location</Text>} >
                                        {getFieldDecorator('Log File Location', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Please Write something on Log File Location',
                                                },
                                            ],
                                        })(<div><Input style={{ width: "80vh" }} width={30} /></div>)}
                                    </Form.Item>

                                    <Form.Item style={{ margin: "14px 0px" }} label={<Text>Full Text Catalog</Text>} >
                                        {getFieldDecorator('Full Text Catalog', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Please Write something on Full Text Catalog',
                                                },

                                            ],
                                        })(<div><Input style={{ width: "80vh" }} width={30} /></div>)}
                                    </Form.Item>

                                </Form>
                            </div></div>
                            {/* </CollapseAbleHeader> */}
                        </div>
                    </TabPane>

                    <TabPane tab="Rollover Policy" key="3">
                        <div style={{ padding: "30px 150px" }}>
                            {/* <CollapseAbleHeader style={{ paddingBottom: 40 }} heading="Rollover Policy"> */}
                            <div style={{ padding: "30px 0px" }}><div style={{ width: 'inherit' }}>
                                <Form labelAlign="left" layout="horizontal" onSubmit={this.handleSubmit}>
                                    <Form.Item style={{ margin: "14px 0px" }} label={<Text>Type</Text>} >
                                        {getFieldDecorator('Type', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Please Write something on Type',
                                                },
                                            ],
                                        })(<div>
                                            {/* <Input style={{ width: "80vh" }}  width={30}  /> */}
                                            <Radio.Group style={{ display: "flex" }} onChange={this.onChangeRadio} value={this.state.value}>
                                                <Radio value={1}>Size</Radio>
                                                <Radio value={2}>Period</Radio>
                                            </Radio.Group>
                                        </div>)}
                                    </Form.Item>
                                    {value === 2 && (
                                        <Form.Item style={{ margin: "14px 0px" }} label={<Text>Period(Days)</Text>} >
                                            {getFieldDecorator('Period(Days)', {
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: 'Please Write something on Period(Days)',
                                                    },
                                                ],
                                            })(<div><InputNumber type="number" width={30} height={30} /></div>)}
                                        </Form.Item>
                                    )}
                                    {value === 1 && (
                                        <Form.Item style={{ margin: "14px 0px" }} label={<Text>Size</Text>} >
                                            {getFieldDecorator('Period(Days)', {
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: 'Please Write something on Period(Days)',
                                                    },
                                                ],
                                            })(<div><Input type="number" style={{ width: "80px" }} /></div>)}
                                        </Form.Item>
                                    )}

                                </Form>
                            </div></div>
                            {/* </CollapseAbleHeader> */}
                        </div>
                    </TabPane>

                    <TabPane tab="View History" key="4">
                        <div style={{ padding: "0px 150px" }}>
                            {/* <CollapseAbleHeader heading="View History"> */}
                            <div style={{ padding: "30px 0px" }}><div style={{ width: 'inherit' }}>
                                <DataTable formatMessage={formatMessage} data={dataForViewHistory} columns={columnsForViewHistory} pagination={true} ></DataTable>
                            </div></div>
                            {/* </CollapseAbleHeader> */}
                        </div>
                    </TabPane>


                </Tabs>
            </div>
        );
    }

}
const WrappedArchiveStore = Form.create({ name: 'ArchiveStore' })(ArchiveStore);


const mapDispatchToProps = dispatch => {
    return {
        updateDataTableActions: actions => dispatch(updateDataTableActions(actions)),
    }
}

export default connect(null, mapDispatchToProps)(WrappedArchiveStore);
