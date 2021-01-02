import React, { Component } from "react";
import { Typography, Form, Input, Drawer, TreeSelect, Spin, } from 'antd';
import style from "../../styles";
import theme from "../../Assets/Theme/Theme"
import searchIconOrange from '../../Assets/icons/SV_ICONS/QueryBuilder_Orange.png';
import { PrimaryButton, SecondryButton } from "../Button/Button";
import { connect } from "react-redux";
import { queryBuilderSearchData, fetchSimpleSearch } from "../../Redux/Actions/SimpleSearchAction/SimpleSearchAction";
import { updateSearchCriteria } from "../../Redux/Actions/UpdateSearchCriteriaAction/UpdateSearchCriteriaAction"
import Clear_Gray from '../../Assets/icons/SV_ICONS/Clear_Gray.png';
import { defineMessages } from 'react-intl';
import Bloomberg from '../../Assets/icons/data_sources/Bloomburg72x72.png';
import Symphony from '../../Assets/icons/data_sources/Symphony72x72.png';
import Reuters from '../../Assets/icons/data_sources/Reuters-72x72.png';
import MSTeams from '../../Assets/icons/data_sources/MSTeams72x72.png';
import Yammer from '../../Assets/icons/data_sources/Yammer72x72.png';
import SharePoint from '../../Assets/icons/data_sources/SharePoint-72x72.png';
import OneDrive from '../../Assets/icons/data_sources/OneDrive72x72.png';
import Exchange from '../../Assets/icons/data_sources/Exchange72x72.png';
import Slack from '../../Assets/icons/data_sources/Slack72x72.png';

const { Text } = Typography;
const messages = defineMessages({
    'Query Builder': {
        id: "QueryBuilder.QueryBuilder",
        defaultMessage: "Query Builder",
    },
    'Please enter a query': {
        id: "QueryBuilder.PleaseEnterQuery",
        defaultMessage: "Please enter a query"
    },
    'Enter Query': {
        id: "QueryBuilder.EnterQuery",
        defaultMessage: "Enter Query"
    },
    'Submit': {
        id: "QueryBuilder.Submit",
        defaultMessage: "Submit"
    },
    'Cancel': {
        id: "QueryBuilder.Cancel",
        defaultMessage: "Cancel"
    },
})


const { Title } = Typography;
const { TextArea } = Input;
const { color } = theme;



class QueryBuilder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dateRange: 'Date between',
            parenthesisLeftColor: '#fff',
            parenthesisRightColor: '#fff',
            metadataRows: ["Form1"],
            value: ""
        }
    }

    componentDidUpdate() {
        this.props.simpleSearch && this.props.simpleSearch.FilterType && this.props.simpleSearch.FilterType.length > 0 && !this.state.typesSelectTreeData && this.generateSelectTypesTreeData(this.props.simpleSearch.FilterType, "typesSelectTreeData")
    }

    handleChangeAnySearch = (e) => {
        this.setState({ query: e.target.value })
    }
    handleIndexChange = (value) => {
        this.setState({
            index: value
        })
    }

    generateSelectTypesTreeData = (data, variable) => {
        let treeData = []
        data && data.length > 0 && data.forEach((val, ind) => {
            let icon = val.FilterTypeName === "bloomberg" ? Bloomberg : val.FilterTypeName === "symphony" ? Symphony : val.FilterTypeName === "reuters" ? Reuters : val.FilterTypeName === "msteams" ? MSTeams : val.FilterTypeName === "yammer" ? Yammer : val.FilterTypeName === "sharepoint" ? SharePoint : val.FilterTypeName === "ews" || val.FilterTypeName === "emls" || val.FilterTypeName === "exchange" ? Exchange : val.FilterTypeName === "onedrive" ? OneDrive : val.FilterTypeName === "slack" ? Slack : null
            treeData.push({
                title: val.FilterTypeName,
                value: val.FilterTypeName,
                key: ind,
                icon: <img src={icon} style={{ marginRight: 10 }} alt="" width="20px" height="20px" />
            })
        })
        this.setState({
            [variable]: treeData
        })
    }

    render() {
        const { collapsed, queryBuilder, formatMessage, isSideMenuQueryBuilderOpen } = this.props
        const { getFieldDecorator } = this.props.form;
        const { query, typesSelectTreeData, index } = this.state;

        return (
            <div style={style.sideMenuHeight}>
                <Drawer
                    closable={false}
                    width={'400'}
                    // visible={true}
                    maskStyle={{ backgroundColor: "transparent" }}
                    visible={queryBuilder}
                    onClose={() => this.props.close()}
                >
                    {!collapsed &&
                        <div style={{ padding: "10px 0px" }}>
                            <div style={{ ...style.setting.drawerMain }}>
                                <div style={{ display: "flex", alignItems: "center", }}>
                                    <img title="Add" style={{ cursor: "pointer" }} src={searchIconOrange} width={40} height={40} alt="Add" />
                                    <Title style={{ color: `${color.Orange}`, padding: "15px 0 0 18px", fontSize: 18, }}>{formatMessage(messages["Query Builder"])}</Title>
                                </div>
                                <div onClick={() => this.props.close()} style={{ padding: 8, cursor: "pointer" }}>
                                    <img src={Clear_Gray} title="Close" alt="" onClick={() => this.props.close()} width={28} height={28} />
                                </div>
                            </div>
                            <div>
                                <Form layout="horizontal" style={{ padding: '0px', marginTop: 20 }} labelAlign="left" onSubmit={() => query && this.handleQueryBuilderSubmit(query, index)}>
                                    <Form.Item label="" style={{ ...style.marginBottom0 }}>
                                        {getFieldDecorator('Select_Index', {
                                            initialValue: []
                                        })(
                                            <TreeSelect
                                                style={{ width: '100%' }}
                                                dropdownStyle={{ maxHeight: 200, overflow: 'auto' }}
                                                treeData={typesSelectTreeData}
                                                allowClear={true}
                                                placeholder="Select Types"
                                                onFocus={() => (!this.props.simpleSearch || !this.props.simpleSearch.FilterType || !this.props.simpleSearch.FilterType.length > 0) && this.props.fetchSimpleSearch()}
                                                onChange={(selectedOpt) => this.handleIndexChange(selectedOpt)}
                                                treeCheckable={true}
                                                treeIcon
                                                showSearch
                                                filterTreeNode={(input, treeNode) =>
                                                    treeNode.props.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                                notFoundContent={(!this.props.simpleSearch) && <Text>
                                                    <Spin size="small" style={{ marginRight: 15 }} />Fetching Types
                                                </Text>
                                                }
                                            />
                                        )}
                                    </Form.Item>
                                    {isSideMenuQueryBuilderOpen && <Form.Item style={{ marginTop: 25 }}>
                                        {getFieldDecorator('query', {
                                            initialValue: `{\n\t"size": ${this.props.searchDatatablePageSize},\n\t"track_total_hits": true,\n\t"query": {\n\t\t\n\t}\n}`,
                                            rules: [{ required: true, message: formatMessage(messages["Please enter a query"]) }],
                                        })(<TextArea
                                            placeholder={`{\n\t"size": ${this.props.searchDatatablePageSize},\n\t"track_total_hits": true,\n\t"query": {\n\t\t\n\t}\n}`}
                                            // autoSize={{ minRows: 15 }}
                                            rows={18}
                                            style={{ width: "100%" }}
                                            onChange={e => this.handleChangeAnySearch(e)}
                                            autoSize={false}
                                        >
                                        </TextArea>)}
                                    </Form.Item>}
                                    <Form.Item>
                                        <div style={{ width: '100%', display: "flex", justifyContent: "center" }}>
                                            <div style={{ ...style.drawerButtons }}>
                                                <PrimaryButton text={formatMessage(messages["Submit"])} onClick={() => query && this.props.handleQueryBuilderSubmit(query, index)} />
                                                <SecondryButton text={formatMessage(messages["Cancel"])} onClick={() => this.props.close()} style={{ marginRight: 20 }} />
                                            </div>
                                        </div>
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>}
                </Drawer>
            </div>

        )
    }
}

const QueryBuilderForm = Form.create('DeploymentForm')(QueryBuilder);

const mapStateToProps = state => {

    return {
        query: state.SimpleSearchReducer.query,
        simpleSearch: state.SimpleSearchReducer.simpleSearch,
        searchDatatablePageSize: state.UpdateDataTablePageSizeTypes.searchDatatablePageSize
        // loaded: state.SimpleSearchReducer.loaded,
        // savedSearch: state.SimpleSearchReducer.savedSearch
    }
};
const mapDispatchToProps = dispatch => {
    return {
        fetchSimpleSearch: () => dispatch(fetchSimpleSearch()),
        queryBuilderSearchData: data => dispatch(queryBuilderSearchData(data)),
        updateSearchCriteria: searchedData => dispatch(updateSearchCriteria(searchedData)),

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(QueryBuilderForm);