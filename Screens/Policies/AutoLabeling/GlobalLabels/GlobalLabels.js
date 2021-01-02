import React, { Component } from 'react';
import DataTable from "../../../../Components/DataTable/DataTable"
import { Icon, Typography, message } from "antd"
import GlobalLabelModal from "../../../../Components/Modal/AutoLabel"
import { defineMessages } from 'react-intl';
import { connect } from 'react-redux';
import { /*fetchAutoLabels,*/ activeOrDeActiveDocs } from '../../../../Redux/Actions/Policies/AutoLabelingAction';
// import DataTableHeader from "../../../../Components/DataTable/Component/DataTableHeader"
import { resetSelectedRecords } from "../../../../Redux/Actions/updateSelectedRecordsAction/updateSelectedRecordsAction";
import style from "../../../../styles";

const messages = defineMessages({
    'Policy Name': {
        id: "globalLabels.policyName",
        defaultMessage: "Policy Name"
    },
    'Label Name': {
        id: "globalLabels.labelName",
        defaultMessage: "Label Name"
    },
    'Activate': {
        id: "globalLabels.activate",
        defaultMessage: "Activate"
    },
})

// const columns = [
//     {
//         title: '',
//         // dataIndex: 'tag',
//         render: text => <Icon type="tag" />
//     },
//     {
//         title: 'Policy Name',
//         dataIndex: 'policyName',
//         render: policyName => <span style={{ wordBreak: "break-all" }} >{policyName}</span>,
//     },
//     {
//         title: 'Label Name',
//         render: record => (
//             <div style={{ display: 'flex', flexDirection: 'column', width: 250, wordBreak: "break-all" }}>
//                 {/* <Text>{record.labelName[0]}</Text>
//                 <Text>{record.labelName[1]}</Text>
//                     <Text >{record.labelNa me[2]}</Text> */}
//             </div>
//         ),
//         disabled: true
//     },
//     {
//         title: 'Activate',
//         render: text => <Icon type='check' />,
//         disabled: true
//     }
// ];



// const data = [
//     {
//         key: '1',
//         policyName: 'Group One',
//         labelName: ['Responsive', 'Non-Responsive', 'Privilaged'],
//     },
//     {
//         key: '2',
//         policyName: 'Group One',
//         labelName: ['Responsive', 'Non-Responsive', 'Privilaged'],
//     }
// ];
const { Text } = Typography;

class GlobaLabels extends Component {
    constructor(props) {
        super(props)
        this.state = {
            values: {},
            status: undefined
        }
        message.destroy()
    }


    componentDidMount() {
        this.props.fetchAutoLabels("G")
    }

    openDrawer = (Drawer, values) => {
        this.setState({
            [Drawer]: true,
            values
        })
    }
    onClose = (Drawer) => {
        this.setState({
            [Drawer]: false
        })
    }

    Delete = (values) => {
        let arrayForDeletedIds = [];
        if (Array.isArray(values)) {
            values.forEach(el => arrayForDeletedIds.push(el.FILTER_ID))
            this.props.deleteAutoLabel(arrayForDeletedIds, "G")
        } else {
            arrayForDeletedIds.push(values.FILTER_ID)
            this.props.deleteAutoLabel(arrayForDeletedIds, "G")
        }
        this.props.closeDeleteDrawer && this.props.closeDeleteDrawer()
    }
    columns = [
        {
            title: '',
            // dataIndex: 'tag',
            render: record =>
                <Icon style={{ color: record.COLOR_CODE.split(',')[0] }} type="tag" />,
            width: 58

        },

        {
            title: 'Policy Name',
            dataIndex: 'FILTER_NAME',
            render: FILTER_NAME => <span style={{ wordBreak: "break-all" }} >{FILTER_NAME}</span>,
            width: 350
        },
        {
            title: 'Label Name',
            // dataIndex: 'LABEL_NAME',
            render: record => (
                <div style={{ display: 'flex', flexDirection: 'column', width: 250, wordBreak: "break-all" }}>
                    {record.LABEL_NAME.split(',').map((el, i) =>
                        <Text key={i}
                            style={{
                                ...style.labelDropdownStyle,
                                backgroundColor: record.COLOR_CODE.split(',')[0]
                            }}>
                            {el}
                        </Text>
                    )}
                </div>
            ),
            width: 350,
            disabled: true
        },
        {
            title: 'Activate',
            dataIndex: 'IS_ACTIVE',
            render: IS_ACTIVE => IS_ACTIVE ? <Icon type='check' /> : <Icon type="close" />,
            disabled: true,
            width: 170
        }
    ];

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

        const { globalAutoLabels, columnConfig, deleteRecord, deleteDrawer, LabelModal, values, currentPaginationSize, currentPage, pageSize } = this.props

        // const { values, } = this.state;

        const { formatMessage } = this.props;
        const messagesKeys = Object.keys(messages);
        const messagesValues = Object.values(messages);
        this.columns.forEach((c) => {
            messagesKeys.forEach((mK, index) => {
                if (c.key === mK) {
                    c.title = formatMessage(messagesValues[index]);
                }
            })
        })


        return (
            <div>
                {<GlobalLabelModal
                    formatMessage={formatMessage}
                    LabelModal={LabelModal}
                    labelType={this.props.labelType}
                    editAutoLabels={APIBody => this.props.editAutoLabels(APIBody)}
                    postAutoLabels={APIBody => this.props.postAutoLabels(APIBody)}
                    close={this.props.onClose}
                    values={values}
                />}
                <div>

                    <DataTable
                        openDeleteDrawer={(record) => this.props.openDeleteDrawer(record)}
                        deleteRecord={deleteRecord}
                        deleteDrawer={deleteDrawer}
                        closeDeleteDrawer={() => this.props.closeDeleteDrawer()}
                        closeColumConfigDrawer={this.props.closeColumConfigDrawer}
                        columnConfig={columnConfig}
                        keyID="FILTER_ID"
                        formatMessage={formatMessage}
                        actionDropdown enbDis
                        data={globalAutoLabels}
                        columns={this.columns}
                        pagination
                        addEditColumn
                        openDrawer={this.props.openDrawer}
                        Delete={(values) => this.Delete(values)}
                        add
                        actions={{
                            activate: true
                        }}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        currentPaginationSize={currentPaginationSize}
                        coveredHeight={240}
                        deleteMessage="Are you sure you want to delete this policy?"
                        deleteLabels
                    >
                    </DataTable>
                </div>
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        globalAutoLabels: state.AutoLabelingReducer.globalAutoLabels
    }
}

const mapDispatchTopProps = dispatch => {
    return {
        activeOrDeActiveDocs: (arrayIds, status, filterType) =>
            dispatch(activeOrDeActiveDocs(arrayIds, status, filterType)),
        resetSelectedRecords: () => dispatch(resetSelectedRecords())
    }
}

export default connect(mapStateToProps, mapDispatchTopProps)(GlobaLabels);
