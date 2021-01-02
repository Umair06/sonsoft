import React, { Component } from "react";
import { Typography, Icon, Form, Input, DatePicker, Select, Tree, TreeSelect, Avatar } from 'antd';
import style from "../../styles"
import CollapseableHeader from '../CollapseAbleHeader/CollapseAbleHeader';
import rightArrow from "../../Assets/icons/Side Column Arrow Expand.png";
import leftArrow from "../../Assets/icons/Side Column Arrow compressed.png";
import searchIconOrange from '../../Assets/icons/Identification_Orange.png';
import { PrimaryButton, SecondryButton } from "../Button/Button";
import filterTree from '../../Redux/TreeData/LegalHoldTree.json';
import searchIcon from '../../Assets/icons/SV_ICONS/Search_White.png';
import filterIcon from '../../Assets/icons/SV_ICONS/Filter_White.png';
import Theme from "../../Assets/Theme/Theme"
import Bloomberg from '../../Assets/icons/data_sources/Bloomburg72x72.png';
import Symphony from '../../Assets/icons/data_sources/Symphony72x72.png';
import Reuters from '../../Assets/icons/data_sources/Reuters-72x72.png';
import MSTeams from '../../Assets/icons/data_sources/MSTeams72x72.png';
import Yammer from '../../Assets/icons/data_sources/Yammer72x72.png'
import SharePoint from '../../Assets/icons/data_sources/SharePoint-72x72.png';
import OneDrive from '../../Assets/icons/data_sources/OneDrive72x72.png';
import Exchange from '../../Assets/icons/data_sources/Exchange72x72.png';
import Slack from '../../Assets/icons/data_sources/Slack72x72.png';
import { version } from "../../APIConfig/Config";
import { defineMessages } from 'react-intl';
import moment from 'moment';

const messages = defineMessages({
    'FILTERS': {
        id: "PreservationSideBar.FILTERS",
        defaultMessage: "FILTERS",
    },
    'Global Label': {
        id: "PreservationSideBar.GlobalLabel",
        defaultMessage: "Global Label"
    },
    'Employees': {
        id: "PreservationSideBar.Employees",
        defaultMessage: "Employees"
    },
    'Types': {
        id: "PreservationSideBar.Types",
        defaultMessage: "Types"
    },
    'Legal Hold': {
        id: "PreservationSideBar.LegalHold",
        defaultMessage: "Legal Hold"
    },
    'Status: ': {
        id: "PreservationSideBar.Status",
        defaultMessage: "Status: "
    },
    'Name: ': {
        id: "PreservationSideBar.Name",
        defaultMessage: "Name: ",
    },
    'Type: ': {
        id: "PreservationSideBar.Type",
        defaultMessage: "Type: "
    },
    'Primary Attorney: ': {
        id: "PreservationSideBar.PrimaryAttorney",
        defaultMessage: "Primary Attorney: "
    },
    'Team: ': {
        id: "PreservationSideBar.Team",
        defaultMessage: "Team: "
    },
    'Created Date: ': {
        id: "PreservationSideBar.CreatedDate",
        defaultMessage: "Created Date: "
    },
    'Released Date: ': {
        id: "PreservationSideBar.ReleasedDate",
        defaultMessage: "Released Date: "
    },
    'SEARCH': {
        id: "PreservationSideBar.SEARCH",
        defaultMessage: "SEARCH",
    },
    'Please enter something': {
        id: "PreservationSideBar.PleaseEnterSomething",
        defaultMessage: "Please enter something"
    },
    'Search Name': {
        id: "PreservationSideBar.SearchName",
        defaultMessage: "Search Name"
    },
    'Legal Hold Type': {
        id: "PreservationSideBar.LegalHoldType",
        defaultMessage: "Legal Hold Type"
    },
    'Primary_Attorney': {
        id: "PreservationSideBar.Primary_Attorney",
        defaultMessage: "Primary Attorney"
    },
    'Select Legal Hold Team': {
        id: "PreservationSideBar.SelectLegalHoldTeam",
        defaultMessage: "Select Legal Hold Team"
    },
    'Please select created by': {
        id: "PreservationSideBar.PleaseSelectCreatedBy",
        defaultMessage: "Please select created by",
    },
    'Created between': {
        id: "PreservationSideBar.CreatedBetween",
        defaultMessage: "Created between"
    },
    'Created from': {
        id: "PreservationSideBar.CreatedFrom",
        defaultMessage: "Created from"
    },
    'Created to': {
        id: "PreservationSideBar.CreatedTo",
        defaultMessage: "Created to"
    },
    'Created on': {
        id: "PreservationSideBar.CreatedOn",
        defaultMessage: "Created on"
    },
    'Closed from': {
        id: "PreservationSideBar.ClosedFrom",
        defaultMessage: "Closed from"
    },
    'Closed to': {
        id: "PreservationSideBar.ClosedTo",
        defaultMessage: "Closed to"
    },
    'Closed on': {
        id: "PreservationSideBar.ClosedOn",
        defaultMessage: "Closed on"
    },
    'Search': {
        id: "PreservationSideBar.Search",
        defaultMessage: "Search"
    },
    '_Apply': {
        id: "PreservationSideBar.Apply",
        defaultMessage: "Apply"
    },
    '_Clear': {
        id: "PreservationSideBar.Clear",
        defaultMessage: "Clear"
    },
})


const { color } = Theme
const { Text } = Typography;
const { Option } = Select;
const { TreeNode } = Tree;
const employeesData = [{ EmployeesSelect: 'David Hartmann' }];
const sourcesData = [{ SourceSelect: 'David Hartmann - Employment' }];
const typesData = [{ TypeSelect: 'Employment Litigation' }];

// const globalLabelFilterData = [{ FilterGlobalLabelName: 'Attorney Client Privilege', Color: "#a349a4" }, { FilterGlobalLabelName: 'PII/PHI', Color: "#3f48cc" }, { FilterGlobalLabelName: 'Trade Secret', Color: "#008000" }]


const globalLabelFilterData = [{ FilterGlobalLabelName: 'Attorney Client Privilege' }, { FilterGlobalLabelName: 'PII/PHI' }, { FilterGlobalLabelName: 'Trade Secret' }, { FilterGlobalLabelName: 'Privilege' }, { FilterGlobalLabelName: 'Attorney Client' }, { FilterGlobalLabelName: 'PII' }, { FilterGlobalLabelName: 'Secret' }, { FilterGlobalLabelName: 'Client' },]
const employeesFilterData = [{ FilterEmployeesName: 'Natasha' }, { FilterEmployeesName: "Bobby Jahanbani" }, { FilterEmployeesName: "Bilal Ahmed" }, { FilterEmployeesName: "Mohtashim" }, { FilterEmployeesName: "Faizan" }, { FilterEmployeesName: "Asrar" }, { FilterEmployeesName: "Osama" }, { FilterEmployeesName: "Hamza" }, { FilterEmployeesName: "Azeem" }, { FilterEmployeesName: "Mike" }]
const typesFilterData = [{ FilterTypeName: "bloomberg" }, { FilterTypeName: "yammer" }, { FilterTypeName: 'msteams' }, { FilterTypeName: 'slack' }, { FilterTypeName: 'onedrive' }, { FilterTypeName: 'exchange' }, { FilterTypeName: 'eml' }, { FilterTypeName: 'ews' }, { FilterTypeName: 'sharepoint' }, { FilterTypeName: 'symphony' }]

const createdBetweenOptionsList = ['Created on', 'Created between', 'Closed on', 'Closed between'];
const createdBetweenOptions = [];
for (let i = 0; i < createdBetweenOptionsList.length; i++) {
    createdBetweenOptions.push(<Option key={i} value={createdBetweenOptionsList[i]}>{createdBetweenOptionsList[i]}</Option>);
}
const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

class PreservationSideBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filter: false,
            caseSearch: !props.onHold && true,
            size: 'default',
            data: filterTree.treeData,
            checkValue: [],
            dateRange: this.props.formatMessage(messages["Created between"]),
            info: props.onHold && true
        }
    }

    onCheck = (checkValue, info) => {
        this.setState({ checkValue });
    }
    moveToFilter = () => {
        this.setState({ filter: true, caseSearch: false, info: false })
    }
    moveToCaseSearch = () => {
        this.setState({ filter: false, caseSearch: true })
    }
    handleChange = (value) => {
        this.setState({ dateRange: value })
    }
    renderTreeNodes = data => data.map((item, index) => {
        if (item.children) {
            return (
                <TreeNode selectable={false} key={item.key} title={item.title} icon={item.icon ? <Icon type={item.icon} /> : false} checkable={false} isLeaf={false} disabled={item.disabled || false} dataRef={item}>
                    {this.renderTreeNodes(item.children)}
                </TreeNode>
            );
        }
        return <TreeNode selectable={false} title={<div style={{ backgroundColor: item.color, color: item.color ? "#fff" : color.Black75 }} > {item.title}</div>} key={item.key} dataRef={item} />;
    })
    openAbout = () => {
        this.setState({
            info: true,
            filter: false
        })
    }

    handleNewSearchChange = (value, label) => {
        const { searchedValues } = this.state
        if (value.target) {
            searchedValues[value.target.id] = value.target.value
        } else {
            if (label) {
                searchedValues[label] = value
            }
        }
        // this.genrateTreeData(searchedValues, true)

        // this.props.updateSearchCriteria(values)
        // this.setState({
        //     searchedValues: values
        // })
    }

    generateFilterTypesTreeData = (data, variable) => {
        let treeData = []
        data && data.length > 0 && data.forEach((val, ind) => {
            let icon = val.FilterTypeName === "bloomberg" ? Bloomberg : val.FilterTypeName === "symphony" ? Symphony : val.FilterTypeName === "reuters" ? Reuters : val.FilterTypeName === "msteams" ? MSTeams : val.FilterTypeName === "yammer" ? Yammer : val.FilterTypeName === "sharepoint" ? SharePoint : val.FilterTypeName === "ews" || val.FilterTypeName === "eml" || val.FilterTypeName === "exchange" ? Exchange : val.FilterTypeName === "onedrive" ? OneDrive : val.FilterTypeName === "slack" ? Slack : null
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
    generateFilterEmployeeTreeData = (data, variable) => {
        let treeData = []
        data && data.length > 0 && data.forEach((val, ind) => {
            let name = val.FilterEmployeesName.split(' ')
            let nameInitials = name && name.length !== 1 ? name.map(val => val[0]) : name.map(val => val[0] + val[1])

            treeData.push({
                title: val.FilterEmployeesName,
                value: val.FilterEmployeesName,
                key: ind,
                icon: <Avatar style={{
                    backgroundColor: color.Orange, width: 20, height: 20, fontSize: 13,
                    display: 'flex', justifyContent: "center", alignItems: "center"
                }}>{nameInitials && nameInitials.map(val => val && val.toUpperCase())}</Avatar>
            })
        })
        this.setState({
            [variable]: treeData
        })
    }
    generateFilterGlobalLabelTreeData = (data, variable) => {
        let treeData = []
        data && data.length > 0 && data.forEach((val, ind) => {
            treeData.push({
                title: val.FilterGlobalLabelName,
                value: val.FilterGlobalLabelName,
                key: ind,
                // style: {backgroundColor:val.Color},
            })
        })
        this.setState({
            [variable]: treeData
        })
    }

    generateEmployeesSelectData = (data, variable) => {
        let treeData = []
        data && data.length > 0 && data.forEach((val, ind) => {
            treeData.push({
                title: val.EmployeesSelect,
                value: val.EmployeesSelect,
                key: ind,
            })
        })
        this.setState({
            [variable]: treeData
        })
    }
    generateTypeSelectData = (data, variable) => {
        let treeData = []
        data && data.length > 0 && data.forEach((val, ind) => {
            treeData.push({
                title: val.TypeSelect,
                value: val.TypeSelect,
                key: ind,
            })
        })
        this.setState({
            [variable]: treeData
        })
    }
    generateSourceSelectData = (data, variable) => {
        let treeData = []
        data && data.length > 0 && data.forEach((val, ind) => {
            treeData.push({
                title: val.SourceSelect,
                value: val.SourceSelect,
                key: ind,
            })
        })
        this.setState({
            [variable]: treeData
        })
    }
    onChange = (value, label) => {
        this.setState({ [label]: value });
    };
    componentDidMount() {
        this.generateEmployeesSelectData(employeesData, "employeesData")
        this.generateTypeSelectData(typesData, "typesData")
        this.generateSourceSelectData(sourcesData, "sourcesData")
        this.generateFilterGlobalLabelTreeData(globalLabelFilterData, "globalLabelFilterData")
        this.generateFilterEmployeeTreeData(employeesFilterData, "employeesFilterData")
        this.generateFilterTypesTreeData(typesFilterData, "typesFilterData")
    }
    render() {
        const { collapsed, collapseSideMenu, onHold, formatMessage, caseInfo } = this.props
        const { getFieldDecorator } = this.props.form;
        const { filter, caseSearch, size, info, sourcesData, typesData, employeesData, SelectEmployees, SelectSources, SelectTypes,
            globalLabelFilterData, employeesFilterData, typesFilterData, typesFilter, globalFilter, employeesFilter } = this.state;
        return (
            <div style={{ ...style.sideMenuHeight }}>
                <div style={collapsed ? style.emailsCollapsedSideMenuIcon : style.emailsSideMenuIcon} >
                    {collapsed ?
                        <div onClick={collapseSideMenu} style={{ cursor: "pointer", width: "100%", display: "flex", justifyContent: "center" }} ><img src={rightArrow} title="Open Menu" alt={"button"} width={20} height={20} /></div>
                        :
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '90%', alignItems: "center" }}>
                            {!onHold ?
                                <img src={searchIcon} style={caseSearch ? { cursor: "pointer" } : { opacity: 0.5, cursor: "pointer" }} title="Search" alt={"button"} width={35} height={35} onClick={this.moveToCaseSearch} />
                                :
                                <img title="Case_info" alt="" src={require(`../../Assets/icons/SV_ICONS/Info_White.png`)} width={42} style={info ? { cursor: "pointer", } : { opacity: 0.5, cursor: "pointer", }} onClick={() => this.openAbout()} />}
                            {version > 7.2 && <img src={filterIcon} alt="" style={filter ? { cursor: "pointer" } : { opacity: 0.5, cursor: "pointer" }} title="Filter" width={35} height={35} onClick={this.moveToFilter} />}
                            <img src={leftArrow} alt="" style={{ cursor: "pointer" }} title="Close Menu" width={20} height={20} onClick={collapseSideMenu} />
                        </div>}
                </div>

                {!collapsed &&
                    <div style={{ ...style.paddingOnSideBar }}>
                        {filter && version > 7.2 &&
                            <CollapseableHeader bgColor="#F5F7FA" heading={formatMessage(messages["FILTERS"])}>
                                <div style={{ padding: "0px 15px" }}>
                                    <TreeSelect
                                        style={{ width: '100%', marginBottom: 30 }}
                                        value={globalFilter}
                                        dropdownStyle={{ maxHeight: 280, overflow: 'auto', }}
                                        treeData={globalLabelFilterData}
                                        placeholder={formatMessage(messages["Global Label"])}
                                        // onFocus={() => (!this.props.simpleSearch || !this.props.simpleSearch.EmployeeList || !this.props.simpleSearch.EmployeeList.length > 0) && this.props.fetchSimpleSearch()}
                                        onChange={(e) => this.onChange(e, "globalFilter")}
                                        treeCheckable={true}
                                        showSearch
                                        filterTreeNode={(input, treeNode) =>
                                            treeNode.props.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    />
                                    <TreeSelect
                                        style={{ width: '100%', marginBottom: 30 }}
                                        value={employeesFilter}
                                        dropdownStyle={{ maxHeight: 305, overflow: 'auto', }}
                                        treeData={employeesFilterData}
                                        placeholder={formatMessage(messages["Employees"])}
                                        // onFocus={() => (!this.props.simpleSearch || !this.props.simpleSearch.EmployeeList || !this.props.simpleSearch.EmployeeList.length > 0) && this.props.fetchSimpleSearch()}
                                        onChange={(e) => this.onChange(e, "employeesFilter")}
                                        treeCheckable={true}
                                        showSearch
                                        treeIcon={true}
                                        filterTreeNode={(input, treeNode) =>
                                            treeNode.props.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    />
                                    <TreeSelect
                                        style={{ width: '100%', marginBottom: 20 }}
                                        value={typesFilter}
                                        dropdownStyle={{ maxHeight: 305, overflow: 'auto', }}
                                        treeData={typesFilterData}
                                        placeholder={formatMessage(messages["Types"])}
                                        // onFocus={() => (!this.props.simpleSearch || !this.props.simpleSearch.EmployeeList || !this.props.simpleSearch.EmployeeList.length > 0) && this.props.fetchSimpleSearch()}
                                        onChange={(e) => this.onChange(e, "typesFilter")}
                                        treeCheckable={true}
                                        treeIcon={true}
                                        showSearch
                                        filterTreeNode={(input, treeNode) =>
                                            treeNode.props.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    />
                                    <br />
                                    <br />
                                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                        <PrimaryButton text={formatMessage(messages["_Apply"])} onClick={this.handleSubmit} />
                                        <SecondryButton text={formatMessage(messages["_Clear"])} onClick={this.handleSimpleSearchReset} />
                                    </div>
                                </div>

                            </CollapseableHeader>
                        }

                        {info &&
                            <CollapseableHeader bgColor="#F5F7FA" heading={formatMessage(messages["Legal Hold"])}>
                                <div style={{ padding: 3 }}>
                                    <Text strong>{formatMessage(messages["Status: "])}</Text>
                                    <Text>&nbsp;{caseInfo ? (caseInfo.STATUS === 1 ? "Active" : caseInfo.STATUS === 2 ? "Released" : "") : ""}</Text>
                                </div>
                                <div style={{ padding: 3 }}> <Text strong>{formatMessage(messages["Name: "])}</Text>
                                    <Text>&nbsp;{caseInfo && caseInfo.CASE_NAME}</Text>
                                </div>
                                <div style={{ padding: 3 }}> <Text strong>Description: </Text>
                                    <Text>&nbsp;{caseInfo && caseInfo.CASE_DESC}</Text>
                                </div>
                                {version > 7.2 && <div style={{ padding: 3 }}> <Text strong>{formatMessage(messages["Type: "])}</Text>
                                    <Text>&nbsp;{caseInfo && caseInfo.TYPE}</Text>
                                </div>}
                                {version > 7.2 && <div style={{ padding: 3 }}> <Text strong>{formatMessage(messages["Primary Attorney: "])}</Text>
                                    <Text>&nbsp;{caseInfo && caseInfo.PRIMARY_ATTORNEY}</Text>
                                </div>}
                                {version > 7.2 && <div style={{ padding: 3 }}> <Text strong>{formatMessage(messages["Team: "])}</Text>
                                    <Text>&nbsp;{caseInfo && caseInfo.TEAM}</Text>
                                </div>}
                                <div style={{ padding: 3 }}> <Text strong>{formatMessage(messages["Created Date: "])}</Text>
                                    <Text>&nbsp;{caseInfo && caseInfo.CREATED_ON ? (moment(new Date(caseInfo.CREATED_ON)).format('DD-MMM-YYYY') === "Invalid date" ? caseInfo.CREATED_ON : moment(new Date(caseInfo.CREATED_ON)).format('DD-MMM-YYYY')) : ""}</Text>
                                </div>
                                {caseInfo && caseInfo.LEGAL_HOLD_CLOSE_DATE &&
                                    <div style={{ padding: 3 }}> <Text strong>{formatMessage(messages["Released Date: "])}</Text>
                                        <Text>&nbsp;{(moment(new Date(caseInfo.LEGAL_HOLD_CLOSE_DATE)).format('DD-MMM-YYYY') === "Invalid date" ? caseInfo.LEGAL_HOLD_CLOSE_DATE : moment(new Date(caseInfo.LEGAL_HOLD_CLOSE_DATE)).format('DD-MMM-YYYY'))}</Text>
                                    </div>}
                            </CollapseableHeader>
                        }

                        {caseSearch && !onHold &&
                            <div>
                                <CollapseableHeader bgColor="#F5F7FA" style={{ margin: 0 }} heading={formatMessage(messages["SEARCH"])}>
                                    <Form layout="vertical" onSubmit={this.handleSubmit}>
                                        <Form.Item label="" style={{ ...style.marginBottom0 }}>
                                            {getFieldDecorator('New Search', {
                                                rules: [{
                                                    required: true, message: formatMessage(messages["Please enter something"])
                                                }],
                                            })(<Input placeholder={formatMessage(messages["Search Name"])} width={100} suffix={<img style={{ cursor: "pointer" }} src={searchIconOrange} width={30} height={30} alt="Add" title="Add" />} />)}
                                        </Form.Item>
                                        <Form.Item label="" style={{ marginBottom: 0, marginTop: 0 }}>
                                            {getFieldDecorator('legalHoldType', {
                                                // rules: [{
                                                //     required: true, message: 'Please enter Primary Attorney'
                                                // }],
                                            })(
                                                <TreeSelect
                                                    style={{ width: '100%' }}
                                                    value={SelectTypes}
                                                    dropdownStyle={{ maxHeight: 200, overflow: 'auto', }}
                                                    treeData={typesData}
                                                    placeholder={formatMessage(messages["Legal Hold Type"])}
                                                    // onFocus={() => (!this.props.simpleSearch || !this.props.simpleSearch.EmployeeList || !this.props.simpleSearch.EmployeeList.length > 0) && this.props.fetchSimpleSearch()}
                                                    onChange={(e) => this.onChange(e, "SelectTypes")}
                                                    treeCheckable={true}
                                                    showSearch
                                                    filterTreeNode={(input, treeNode) =>
                                                        treeNode.props.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                    }
                                                // notFoundContent={(!this.props.simpleSearch || !this.props.simpleSearch.EmployeeList || !this.props.simpleSearch.EmployeeList.length > 0) && <Text>
                                                //     <Spin size="small" style={{ marginRight: 15 }} />Fetching Source
                                                // </Text>
                                                // }
                                                />
                                            )}
                                        </Form.Item>
                                        <Form.Item label="" style={{ marginBottom: 0, marginTop: 0 }}>
                                            {getFieldDecorator('primaryAttorney', {
                                                // rules: [{
                                                //     required: true, message: 'Please select Type'
                                                // }],
                                            })(
                                                <TreeSelect
                                                    style={{ width: '100%' }}
                                                    value={SelectEmployees}
                                                    dropdownStyle={{ maxHeight: 200, overflow: 'auto', }}
                                                    treeData={employeesData}
                                                    placeholder={formatMessage(messages["Primary_Attorney"])}
                                                    // onFocus={() => (!this.props.simpleSearch || !this.props.simpleSearch.EmployeeList || !this.props.simpleSearch.EmployeeList.length > 0) && this.props.fetchSimpleSearch()}
                                                    onChange={(e) => this.onChange(e, "SelectEmployees")}
                                                    treeCheckable={true}
                                                    showSearch
                                                    filterTreeNode={(input, treeNode) =>
                                                        treeNode.props.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                    }
                                                // notFoundContent={(!this.props.simpleSearch || !this.props.simpleSearch.EmployeeList || !this.props.simpleSearch.EmployeeList.length > 0) && <Text>
                                                //     <Spin size="small" style={{ marginRight: 15 }} />Fetching Source
                                                // </Text>
                                                // }
                                                />
                                            )}
                                        </Form.Item>
                                        <Form.Item label="" style={{ ...style.marginBottom0 }}>
                                            {getFieldDecorator('LegalHoldTeam', {
                                                // rules: [{
                                                //     required: true, message: 'Please select Team'
                                                // }],
                                            })(
                                                <TreeSelect
                                                    style={{ width: '100%' }}
                                                    value={SelectSources}
                                                    dropdownStyle={{ maxHeight: 200, overflow: 'auto', }}
                                                    treeData={sourcesData}
                                                    placeholder={formatMessage(messages["Select Legal Hold Team"])}
                                                    // onFocus={() => (!this.props.simpleSearch || !this.props.simpleSearch.EmployeeList || !this.props.simpleSearch.EmployeeList.length > 0) && this.props.fetchSimpleSearch()}
                                                    onChange={(e) => this.onChange(e, "SelectSources")}
                                                    treeCheckable={true}
                                                    showSearch
                                                    filterTreeNode={(input, treeNode) =>
                                                        treeNode.props.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                    }
                                                // notFoundContent={(!this.props.simpleSearch || !this.props.simpleSearch.EmployeeList || !this.props.simpleSearch.EmployeeList.length > 0) && <Text>
                                                //     <Spin size="small" style={{ marginRight: 15 }} />Fetching Source
                                                // </Text>
                                                // }
                                                />
                                            )}
                                        </Form.Item>
                                        <Form.Item label="" style={{ ...style.marginBottom0 }}>
                                            {getFieldDecorator('created between', {
                                                rules: [{
                                                    required: true, message: formatMessage(messages["Please select created by"])
                                                }],
                                            })(
                                                <Select
                                                    placeholder={formatMessage(messages["Created between"])}
                                                    size={size}
                                                    defaultValue={this.state.dateRange}
                                                    onChange={this.handleChange}
                                                    style={{ width: "100%", height: 40 }}>
                                                    {createdBetweenOptions}
                                                </Select>)}
                                        </Form.Item>
                                        {this.state.dateRange === "Created between" && <Form.Item style={{ ...style.marginBottom0 }}>
                                            <Form.Item
                                                // validateStatus="error"
                                                // help="Please select the correct date"
                                                style={{ ...style.marginBottom0 }}
                                            >
                                                <DatePicker width={100} placeholder={formatMessage(messages["Created from"])} />
                                            </Form.Item>
                                            <Form.Item style={{ ...style.marginBottom0 }}>
                                                <DatePicker width={100} placeholder={formatMessage(messages["Created to"])} />
                                            </Form.Item>
                                        </Form.Item>}
                                        {this.state.dateRange === "Created on" &&
                                            <Form.Item
                                                // validateStatus="error"
                                                // help="Please select the correct date"
                                                style={{ marginBottom: 8 }}
                                            >
                                                <DatePicker width={100} placeholder={formatMessage(messages["Created on"])} />
                                            </Form.Item>}
                                        {this.state.dateRange === "Closed on" &&
                                            <Form.Item
                                                // validateStatus="error"
                                                // help="Please select the correct date"
                                                style={{ marginBottom: 8 }}
                                            >
                                                <DatePicker width={100} placeholder={formatMessage(messages["Closed on"])} />
                                            </Form.Item>}
                                        {this.state.dateRange === "Closed between" && <Form.Item style={{ ...style.marginBottom0 }}>
                                            <Form.Item
                                                // validateStatus="error"
                                                // help="Please select the correct date"
                                                style={{ ...style.marginBottom0 }}
                                            >
                                                <DatePicker width={100} placeholder={formatMessage(messages["Closed from"])} />
                                            </Form.Item>
                                            <Form.Item style={{ ...style.marginBottom0 }}>
                                                <DatePicker width={100} placeholder={formatMessage(messages["Closed to"])} />
                                            </Form.Item>
                                        </Form.Item>}

                                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <PrimaryButton text={formatMessage(messages["Search"])} />
                                        </div>
                                    </Form>
                                </CollapseableHeader></div>}

                    </div>}

            </div>

        )
    }
}

const PreservationSideBarForm = Form.create('DeploymentForm')(PreservationSideBar);

export default PreservationSideBarForm;