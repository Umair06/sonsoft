import React, { Component } from 'react';
import DataTable from "../../../../Components/DataTable/DataTable"
import CaseLabelModal from "../../../../Components/Modal/AutoLabel"
import { Icon, Typography, message } from "antd"
import { defineMessages } from 'react-intl';
// import * as ApiInfo from "../../../../../APIConfig/ApiParameters";
import { connect } from "react-redux";
import { activeOrDeActiveDocs } from '../../../../Redux/Actions/Policies/AutoLabelingAction';
// import DataTableHeader from "../../../../Components/DataTable/Component/DataTableHeader"
import { resetSelectedRecords } from "../../../../Redux/Actions/updateSelectedRecordsAction/updateSelectedRecordsAction";
import style from './../../../../styles'
const messages = defineMessages({
    'Policy Name': {
        id: "caseLabels.policyName",
        defaultMessage: "Policy Name"
    },
    'Label Name': {
        id: "caseLabels.labelName",
        defaultMessage: "Label Name"
    },
    'Activate': {
        id: "caseLabels.activate",
        defaultMessage: "Activate"
    },
})

const columns = [
    {
        title: '',
        // dataIndex: 'tag',
        render: record => <Icon style={{ color: record.COLOR_CODE && record.COLOR_CODE.split(',') && record.COLOR_CODE.split(',')[0] }} type="tag" />,
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
                {record.LABEL_NAME.split(',').map((el, ind) =>
                    <Text key={ind} style={{
                        backgroundColor: record.COLOR_CODE && record.COLOR_CODE.split(',') && record.COLOR_CODE.split(',')[0],
                        ...style.labelDropdownStyle
                    }}> {el} </Text>)}
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

// const data = [
//     {
//         key: '1',
//         policyName: 'Case Group One',
//         labelName: ['Case Label One', 'Case Label Two', 'Case Label Three'],
//     },
//     {
//         key: '2',
//         policyName: 'Case Group One',
//         labelName: ['Case Label One', 'Case Label Two', 'Case Label Three'],
//     }
// ];
const { Text } = Typography

// function onChange(checked) {
//  ApiInfo.DEBUGER && console.log(`switch to ${checked}`);
// }

class CaseLabels extends Component {
    constructor(props) {
        super(props)
        this.state = {
            values: {}
        }
        message.destroy()
    }
    componentDidMount() {
        this.props.fetchAutoLabels("L")
    }

    // openDrawer = (Drawer, values) => {
    //     this.setState({
    //         [Drawer]: true,
    //         values
    //     })
    // }
    // onClose = (Drawer) => {
    //     this.setState({
    //         [Drawer]: false
    //     })
    // }
    Delete = (values) => {
        let arrayForDeletedIds = [];
        if (Array.isArray(values)) {
            values.forEach(el => arrayForDeletedIds.push(el.FILTER_ID))
            this.props.deleteAutoLabel(arrayForDeletedIds, "L")
        } else {
            arrayForDeletedIds.push(values.FILTER_ID)
            this.props.deleteAutoLabel(arrayForDeletedIds, "L")
        }
        this.props.closeDeleteDrawer && this.props.closeDeleteDrawer()
    }
    getDocumentFromDataTable = (selectedRows, documentStatusInBool) => {
        const idsArray = []
        const getStatus = documentStatusInBool ? 1 : 0
        selectedRows.map(el => idsArray.push(el.FILTER_ID))
        this.props.activeOrDeActiveDocs(idsArray, getStatus, 'L')
        this.props.resetSelectedRecords && this.props.resetSelectedRecords();
    }

    // openColumConfigDrawer = () => {
    //     this.setState({
    //         columnConfig: true
    //     })
    // };

    // closeColumConfigDrawer = () => {
    //     this.setState({
    //         columnConfig: false
    //     })
    // };
    // openDeleteDrawer = record => {
    //     this.setState({
    //         deleteDrawer: true,
    //         deleteRecord: record
    //     })
    // }
    // closeDeleteDrawer = () => {
    //     this.setState({
    //         deleteDrawer: false,
    //         deleteRecord: undefined
    //     })
    // }

    render() {
        // const { values } = this.state;
        const { formatMessage, columnConfig, deleteRecord, deleteDrawer, LabelModal, values, currentPaginationSize, currentPage, pageSize } = this.props;
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
        return (
            <div>
                {
                    <CaseLabelModal
                        formatMessage={formatMessage}
                        LabelModal={LabelModal}
                        labelType={this.props.labelType}
                        editAutoLabels={APIBody => this.props.editAutoLabels(APIBody)}
                        postAutoLabels={APIBody => this.props.postAutoLabels(APIBody)}
                        close={this.props.onClose}
                        values={values}

                    />}
                <div >
                    {/* <DataTableHeader
                        openDeleteDrawer={(record) => this.openDeleteDrawer(record)}
                        openColumConfigDrawer={() => this.openColumConfigDrawer()}
                        formatMessage={formatMessage}
                        actionDropdown 
                        data={this.props.legalHoldAutoLabels}
                        openDrawer={(values) => this.openDrawer('LabelModal', values)}
                        onActive={(selectedRows, booleanValue) => this.getDocumentFromDataTable(selectedRows, booleanValue)}
                        add
                        actions={{ syncStatus: false, status: false, archivePublicFolder: false, stubEnable: false, stubPeriod: false, enabled: false, activate: true }}
                    /> */}
                    {/* actions={{ activate: true }}
                    /> */}
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
                        data={this.props.legalHoldAutoLabels}
                        columns={columns}
                        pagination
                        addEditColumn
                        openDrawer={this.props.openDrawer}
                        Delete={(values) => this.Delete(values)}
                        add
                        actions={{ syncStatus: false, status: false, archivePublicFolder: false, stubEnable: false, stubPeriod: false, enabled: false, activate: true }}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        currentPaginationSize={currentPaginationSize}
                        coveredHeight={240}
                        deleteLabels
                        deleteMessage="Are you sure you want to delete this policy?"
                    />
                </div>
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        legalHoldAutoLabels: state.AutoLabelingReducer.legalHoldAutoLabels
    }
};

const mapDispatchTopProps = dispatch => {
    return {
        activeOrDeActiveDocs: (arrayIds, status, filterType) => dispatch(activeOrDeActiveDocs(arrayIds, status, filterType)),
        resetSelectedRecords: () => dispatch(resetSelectedRecords())
    }
}

export default connect(mapStateToProps, mapDispatchTopProps)(CaseLabels);
