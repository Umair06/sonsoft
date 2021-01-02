import React, { Component } from "react";
import { Tree, Typography, Form, Input, DatePicker, Menu, Select, Dropdown, Icon, Spin, TreeSelect, Avatar, message } from 'antd';
import style from "../../styles"
import CollapseableHeader from '../CollapseAbleHeader/CollapseAbleHeader';
import rightArrow from "../../Assets/icons/Side Column Arrow Expand.png";
import leftArrow from "../../Assets/icons/Side Column Arrow compressed.png";
// import searchIconOrange from '../../Assets/icons/Identification_Orange.png'
import advanceSearchIcon from '../../Assets/icons/SV_ICONS/AdvancedSearch_Orange.png';
import searchOrangeIcon from '../../Assets/icons/SV_ICONS/Search_Orange.png';
import { PrimaryButton, SecondryButton } from "../Button/Button";
import searchIcon from '../../Assets/icons/SV_ICONS/Search_White.png';
import BrowseEmail from '../../Assets/icons/SV_ICONS/BrowseEmail_White.png';
import Bloomberg from '../../Assets/icons/data_sources/Bloomburg72x72.png';
import Symphony from '../../Assets/icons/data_sources/Symphony72x72.png';
import Reuters from '../../Assets/icons/data_sources/Reuters-72x72.png';
import MSTeams from '../../Assets/icons/data_sources/MSTeams72x72.png';
import Yammer from '../../Assets/icons/data_sources/Yammer72x72.png';
import SharePoint from '../../Assets/icons/data_sources/SharePoint-72x72.png';
import OneDrive from '../../Assets/icons/data_sources/OneDrive72x72.png';
import Exchange from '../../Assets/icons/data_sources/Exchange72x72.png';
import Slack from '../../Assets/icons/data_sources/Slack72x72.png';
import Theme from "../../Assets/Theme/Theme";
// import { version } from "../../APIConfig/Config";
import { postSearchData, totalFolderDocs, setFolderRelatedDocuments, fetchFolderRelatedDocs } from "../../Redux/Actions/MyArchivedEmailActions/MyArchivedEmailsActions";
import { updateSearchCriteria_MYARCHIVEDEMAILS } from "../../Redux/Actions/UpdateSearchCriteriaAction/UpdateSearchCriteriaAction";
// import Search from "antd/lib/input/Search";
import { defineMessages } from 'react-intl';
import { connect } from "react-redux";
import * as ApiInfo from "../../APIConfig/ApiParameters";
import { moment } from "moment";

const messages = defineMessages({
    'Open Menu': {
        id: "MyArchiveEmailSideBar.OpenMenu",
        defaultMessage: "Open Menu",
    },
    'SEARCH': {
        id: "MyArchiveEmailSideBar.SEARCH",
        defaultMessage: "SEARCH"
    },
    'Please enter search Item': {
        id: "MyArchiveEmailSideBar.Please enter search Item",
        defaultMessage: "Please enter search Item"
    },
    'Search': {
        id: "MyArchiveEmailSideBar.Search",
        defaultMessage: "Search"
    },
    'From': {
        id: "MyArchiveEmailSideBar.From",
        defaultMessage: "From"
    },
    'To': {
        id: "MyArchiveEmailSideBar.To",
        defaultMessage: "To"
    },
    'Keyword': {
        id: "SearchArchive.Keyword",
        defaultMessage: "Keyword",
    },
    'Date Range': {
        id: "SearchArchive.DateRange",
        defaultMessage: "Date Range"
    },
    'Employees': {
        id: "SearchArchive.Employees",
        defaultMessage: "Employees"
    },
    'Types': {
        id: "SearchArchive.Types",
        defaultMessage: "Types"
    },
    'Labels': {
        id: "SearchArchive.Labels",
        defaultMessage: "Labels"
    },
    'Any of these terms': {
        id: "SearchArchive.AnyOfTheseTerms",
        defaultMessage: "Any of these terms"
    },
    'All of these terms': {
        id: "SearchArchive.AllOfTheseTerms",
        defaultMessage: "All of these terms"
    },
    'Metadata Search': {
        id: "SearchArchive.MetadataSearch",
        defaultMessage: "Metadata Search",
    },
    'From:': {
        id: "SearchArchive.From:",
        defaultMessage: "From:"
    },
    'To:': {
        id: "SearchArchive.To:",
        defaultMessage: "To:"
    },
    'Any Date': {
        id: "SearchArchive.AnyDate",
        defaultMessage: "Any Date"
    },
    'Simple Search': {
        id: "SearchArchive.SimpleSearch",
        defaultMessage: "Simple Search"
    },
    'Advanced Search': {
        id: "SearchArchive.AdvancedSearch",
        defaultMessage: "Advanced Search"
    },
    'Click on menu item.': {
        id: "SearchArchive.ClickOnMenuItem",
        defaultMessage: "Click on menu item."
    },
    '_Employees': {
        id: "SearchArchive._Employees",
        defaultMessage: "Employees"
    },
    '_Clear': {
        id: "SearchArchive._Clear",
        defaultMessage: "Clear"
    },
    'SEARCH CRITERIA': {
        id: "SearchArchive.SEARCH_CRITERIA",
        defaultMessage: "SEARCH CRITERIA"
    },
    'Edit': {
        id: "SearchArchive.Edit",
        defaultMessage: "Edit"
    },
    // 'SEARCH': {
    //     id: "SearchArchive.SEARCH",
    //     defaultMessage: "SEARCH"
    // },
    'Please enter new search': {
        id: "SearchArchive.PleaseEnterNewSearch",
        defaultMessage: "Please enter new search"
    },
    // 'Search': {
    //     id: "SearchArchive.Search",
    //     defaultMessage: "Search"
    // },
    '_From': {
        id: "SearchArchive._From",
        defaultMessage: "From"
    },
    '_To': {
        id: "SearchArchive._To",
        defaultMessage: "To"
    },
    'Select Employees': {
        id: "SearchArchive.SelectEmployees",
        defaultMessage: "Select Employees",
    },
    'Fetching Employees': {
        id: "SearchArchive.FetchingEmployees",
        defaultMessage: "Fetching Employees"
    },
    'Select Types': {
        id: "SearchArchive.SelectTypes",
        defaultMessage: "Select Types"
    },
    'Fetching Types': {
        id: "SearchArchive.FetchingTypes",
        defaultMessage: "Fetching Types"
    },
    'Select Labels': {
        id: "SearchArchive.SelectLabels",
        defaultMessage: "Select Labels"
    },
    '_Search': {
        id: "SearchArchive._Search",
        defaultMessage: "Search"
    },
    '_Reset': {
        id: "SearchArchive._Reset",
        defaultMessage: "Reset"
    },
    'ADVANCED SEARCH CRITERIA': {
        id: "SearchArchive.ADVANCED_SEARCH_CRITERIA",
        defaultMessage: "ADVANCED SEARCH CRITERIA"
    },
    '_Edit': {
        id: "SearchArchive._Edit",
        defaultMessage: "Edit"
    },
    '_Clear+': {
        id: "SearchArchive._Clear+",
        defaultMessage: "Clear"
    },
    'No Criteria': {
        id: "SearchArchive.NoCriteria",
        defaultMessage: "No Criteria"
    },
})

const dateFormatList = ['DD-MMM-YYYY'];
const { TreeNode } = Tree;
const { Option } = Select;
const { Text, Paragraph } = Typography;
const { color } = Theme


class MyArchiveEmailSideBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filter: true,
            search: false,
            searchDropdownOpen: false,
            searchedValues: {
                New_Search: "",
                Select_Employees: [],
                Select_Labels: [],
                Select_Type: [],
                from: null,
                to: null
            },
            dataSimpleSearchCriteria: [
                { title: "Keyword", key: "0", children: [] },
                { title: "Date Range", key: "1", children: [] },
                { title: "Employees", key: "2", children: [] },
                { title: "Types", key: "3", children: [] },
                // { title: "Labels", key: 'Labels', children: [] }
            ],
            advanceSearchCriteria: [
                { title: "Date", key: "0", children: [] },
                { title: "Types", key: "1", children: [] },
                // { title: "labels", key: "2", children: [] },
                { title: "May Contain", key: "2", children: [] },
                { title: "Must Contain", key: "3", children: [] },
                { title: "Dose Not Contain", key: "4", children: [] },
                { title: "Metadata Search", key: "5", children: [] },
            ],
        }
    }

    static getDerivedStateFromProps(props, state) {
        const { sideMenuOptions } = props;
        let selectedMailbox = state.selectedMailbox
        let tempCriteriaChanged = false
        let updateSimpleSearchCriteria = state.updateSimpleSearchCriteria
        let updateAdvanceSearchCriteria = state.updateAdvanceSearchCriteria
        let updatedSearchCriteria = state.updatedSearchCriteria
        const filter = sideMenuOptions && sideMenuOptions.filter
        let selectedFolderKey = state.selectedFolderKey
        if (!selectedMailbox && props.mailboxes && Array.isArray(props.mailboxes) && props.mailboxes.length) {
            props.getSelectedMailboxFolders(props.mailboxes[0].USER_ID)
            selectedMailbox = props.mailboxes[0].USER_ID
        }
        if (!filter) {
            if (props.searchType === 'A1') {
                if (JSON.stringify(props.updatedSearchCriteria) !== JSON.stringify(state.updatedSearchCriteria) || !state.updateSimpleSearchCriteria) {
                    tempCriteriaChanged = true
                    updatedSearchCriteria = props.updatedSearchCriteria
                    updateSimpleSearchCriteria = true
                } else {
                    tempCriteriaChanged = false
                }
            } else {
                if (props.searchType === 'A2') {
                    if (JSON.stringify(props.updatedSearchCriteria) !== JSON.stringify(state.updatedSearchCriteria) || !state.updateAdvanceSearchCriteria) {
                        updatedSearchCriteria = props.updatedSearchCriteria
                        updateAdvanceSearchCriteria = true
                        tempCriteriaChanged = true
                    } else {
                        tempCriteriaChanged = false
                    }
                }
            }
        } else if (!state.filter && props.inboxFolerKey) {
            selectedFolderKey = props.inboxFolerKey
        }
        return {
            filter,
            selectedFolderKey,
            selectedMailbox,
            updatedSearchCriteria,
            criteriaChanged: tempCriteriaChanged,
            updateSimpleSearchCriteria,
            updateAdvanceSearchCriteria,
        }
    }

    searchMailbox = () => {

    }

    handleMailboxChange = selectedMailbox => {
        this.props.totalFolderDocs()
        this.props.fetchFolderRelatedDocs({}, true)
        this.props.setFolderRelatedDocuments([])
        if (selectedMailbox) {
            this.setState({
                selectedMailbox,
                selectedFolderKey: undefined
            })
        }
        this.props.getSelectedMailboxFolders(selectedMailbox)
    }
    onFolderSelect = (selectedKeys, info) => {
        if (selectedKeys && Array.isArray(selectedKeys) && selectedKeys[0]) {
            this.props.getSelectedFolderKey(selectedKeys[0])
            this.setState({
                selectedFolderKey: selectedKeys[0]
            })
        }
    };

    componentDidUpdate() {
        this.state.criteriaChanged && this.props.updatedSearchCriteria && this.genrateTreeData(this.props.updatedSearchCriteria)
        this.props.simpleSearch && this.props.simpleSearch.EmployeeList && this.props.simpleSearch.EmployeeList.length > 0 && !this.state.emplyeesSelectTreeData && this.generateSelectEmployeesTreeData(this.props.simpleSearch.EmployeeList, "emplyeesSelectTreeData")
        this.props.simpleSearch && this.props.simpleSearch.FilterType && this.props.simpleSearch.FilterType.length > 0 && !this.state.typesSelectTreeData && this.generateSelectTypesTreeData(this.props.simpleSearch.FilterType, "typesSelectTreeData")
    }

    renderTreeNodes = data => data && data.map((item, index) => {
        const { selectedFolderKey } = this.state;
        if (item.folderType === "default" && !selectedFolderKey) {
            this.onFolderSelect([item.key])
            this.props.getInboxFolerKey && this.props.getInboxFolerKey(item.key)
        }
        if (item.children && Array.isArray(item.children) && item.children.length) {
            return (
                // <TreeNode selectable={false} key={item.key} title={<Paragraph ><Text style={{ whiteSpace: "pre-wrap" }}>{item.title}</Text></Paragraph>} icon={item.icon ? <Icon type={item.icon} /> : false} checkable={false} isLeaf={false} disabled={item.disabled || false} dataRef={item}>
                //     {this.renderTreeNodes(item.children)}
                // </TreeNode>
                <TreeNode
                    // onClick={() => this.props.getSelectedFolderKey && this.props.getSelectedFolderKey(item.key)}
                    title={<Text title={item.title}>{item.title.length > 25 ? item.title.slice(0, 25) + "..." : item.title}</Text>} key={item.key} checkable={false} dataRef={item}>
                    {this.renderTreeNodes(item.children)}
                </TreeNode>
            )
        }
        return <TreeNode title={<Text title={item.title}>{item.title && item.title.length > 25 ? item.title.slice(0, 25) + "..." : item.title}</Text>} onClick={() => this.props.getSelectedFolderKey && this.props.getSelectedFolderKey(item.key)} checkable={false} key={item.key} dataRef={item} />;
    })



    genrateTreeData = (data) => {
        const { formatMessage, searchType } = this.props;
        if (searchType === 'A1') {
            try {
                if (data.filterType && data.employee && data.toDate && data.fromDate) {
                    data.Select_Type = data.filterType
                    data.Select_Employees = data.employee
                    data.to = (moment(data.toDate) === "Invalid date" ? data.toDate : moment(data.toDate))
                    data.from = (moment(data.from) === "Invalid date" ? data.from : moment(data.from))
                }
            } catch (e) {
                // console.log("error", e)
            }
            let dataSimpleSearchCriteria = [
                { title: formatMessage(messages["Keyword"]), key: '0', children: [] },
                { title: formatMessage(messages["Date Range"]), key: '1', children: [] },
                { title: formatMessage(messages["Employees"]), key: '2', children: [] },
                { title: formatMessage(messages["Types"]), key: '3', children: [] },
                // { title: formatMessage(messages["Labels"]), key: '4', children: [] }
            ]
            if (data.contentValue || data.New_Search) {
                let newSearch = {
                    title: data.New_Search || data.contentValue,
                    key: data.contentValue
                }
                try {
                    dataSimpleSearchCriteria[0].children.push(newSearch)
                }
                catch (e) {
                    // console.log("error", e)
                }
            } else {
                let newSearch = {
                    title: "---",
                    key: "0"
                }
                dataSimpleSearchCriteria[0].children.push(newSearch)
            }
            let from = data.from ? (data.from.format ? data.from.format("DD-MMM-YYYY") : data.from) : undefined
            let to = data.to ? (data.to.format ? data.to.format("DD-MMM-YYYY") : data.to) : undefined

            let dateRangeFrom = {
                title: `${formatMessage(messages["From:"])} ${from ? from : formatMessage(messages["Any Date"])}`,
            }

            let dateRangeTo = {
                title: `${formatMessage(messages["To:"])} ${to ? to : formatMessage(messages["Any Date"])}`,
            }

            dataSimpleSearchCriteria[1].children.push(dateRangeFrom)
            dataSimpleSearchCriteria[1].children.push(dateRangeTo)

            if (data.Select_Employees && data.Select_Employees.length > 0 && Array.isArray(data.Select_Employees)) {
                data.Select_Employees.forEach((employ, index) => {
                    let emp = employ && employ.split(",")
                    let empName = emp && emp[1]
                    let empMail = emp && emp[0]
                    let child = {
                        title: empName,
                        desc: empMail
                    }
                    try {
                        dataSimpleSearchCriteria[2].children.push(child)
                    } catch (e) {
                        ApiInfo.DEBUGER && console.log(e)
                    }
                })
            } else {
                let child = {
                    title: "Any Employee",
                    key: "2"
                }
                try {
                    dataSimpleSearchCriteria[2].children.push(child)
                } catch (e) {
                    ApiInfo.DEBUGER && console.log(e)
                }
            }

            if (data.Select_Type && data.Select_Type.length > 0 && Array.isArray(data.Select_Type)) {
                data.Select_Type.forEach((labelType, index) => {
                    let child = {
                        title: labelType,
                    }
                    try {
                        dataSimpleSearchCriteria[3].children.push(child)
                    } catch (e) {
                        ApiInfo.DEBUGER && console.log(e)
                    }
                })
            } else {
                let child = {
                    title: "Any Type",
                    key: "2"
                }
                try {
                    dataSimpleSearchCriteria[3].children.push(child)
                } catch (e) {
                    ApiInfo.DEBUGER && console.log("error", e)
                }
            }

            // data.Select_Labels && data.Select_Labels.length > 0 && Array.isArray(data.Select_Labels) && data.Select_Labels.forEach((type, index) => {
            //     let child = {
            //         title: type,
            //     }
            //     try {
            //         dataSimpleSearchCriteria[4].children.push(child)
            //     } catch (e) {
            //       ApiInfo.DEBUGER &&  console.log(e)
            //     }
            // })

            this.setState({
                dataSimpleSearchCriteria
            })
        } else {
            if (searchType === 'A2') {
                let advanceSearchCriteria = [
                    { title: "Date", key: "0", children: [] },
                    { title: "Types", key: "1", children: [] },
                    // { title: "labels", key: "2", children: [] },
                    { title: "May Contain", key: "2", children: [] },
                    { title: "Must Contain", key: "3", children: [] },
                    { title: "Dose Not Contain", key: "4", children: [] },
                    { title: "Metadata Search", key: "5", children: [] },
                ]
                let dateLabel;
                let toDate_UI;
                let fromDate_UI;
                let date;
                if ((data.toDate_UI && data.fromDate_UI && data.fromDate_UI !== data.toDate_UI) || (data.toDate && data.fromDate && data.fromDate !== data.toDate)) {
                    dateLabel = []
                    toDate_UI = data.toDate_UI || data.toDate
                    fromDate_UI = data.fromDate_UI || data.fromDate
                }
                else {
                    if ((data.toDate_UI && data.fromDate_UI && data.fromDate_UI === data.toDate_UI && data.fromDate_UI !== "DD-MM-YYYY" && data.toDate_UI !== "DD-MM-YYYY") || (data.toDate && data.fromDate && data.fromDate === data.toDate && data.fromDate !== "DD-MM-YYYY" && data.toDate !== "DD-MM-YYYY")) {
                        dateLabel = "Equals: "
                        date = data.toDate_UI || data.toDate
                    } else {
                        if ((data.toDate_UI && !data.fromDate_UI) || (data.toDate && !data.fromDate)) {
                            dateLabel = "Before: "
                            date = data.toDate_UI || data.toDate
                        } else {
                            if ((!data.toDate_UI && data.fromDate_UI) || (!data.toDate_UI && data.fromDate_UI)) {
                                dateLabel = "After: "
                                date = data.fromDate_UI || data.fromDate
                            } else {
                                if ((!data.toDate_UI && !data.fromDate_UI) || (!data.toDate_UI && !data.fromDate_UI)) {
                                    dateLabel = "Any Date"
                                    date = ""
                                }
                            }
                        }
                    }
                }
                if (dateLabel && Array.isArray(dateLabel)) {
                    let dateRangeFrom = {
                        title: `From: ${fromDate_UI}`,
                        key: `From: ${fromDate_UI}`
                    }
                    let dateRangeTo = {
                        title: `To: ${toDate_UI}`,
                        key: `To: ${toDate_UI}`
                    }
                    try {
                        advanceSearchCriteria[0].children.push(dateRangeFrom)
                        advanceSearchCriteria[0].children.push(dateRangeTo)
                    } catch (e) {
                        // console.log(e) 
                    }

                } else {
                    let dateType = {
                        title: `${dateLabel}${date}`,
                        key: `${dateLabel}${date}`
                    }
                    try {
                        advanceSearchCriteria[0].children.push(dateType)
                    } catch (e) {
                        // console.log(e) 
                    }
                }

                if (data.filterType && Array.isArray(data.filterType) && data.filterType.length > 0) {
                    data.filterType.forEach((labelType, index) => {
                        let child = {
                            title: labelType,
                            key: index
                        }
                        try {
                            advanceSearchCriteria[1].children.push(child)
                        } catch (e) {
                            // console.log(e)
                        }
                    })
                }
                else {
                    let child = {
                        title: "Any Type",
                        key: "1"
                    }
                    try {
                        advanceSearchCriteria[1].children.push(child)
                    } catch (e) {
                        ApiInfo.DEBUGER && console.log(e)
                    }
                }
                // if (data.labelName && data.labelName.length > 0) {
                //     try {
                //         let child
                //         data.labelName.map((title, i) => {
                //             //I'm getting the title like this "G-270-cf559b-Powerfull" I just want its name last Index so I do this.
                //             const length = title.split('-').length
                //             child = { title: title.split('-')[length - 1] }
                //             advanceSearchCriteria[2].children.push(child)
                //         })
                //     } catch (e) {
                //         ApiInfo.DEBUGER && console.log(e)
                //     }
                // } else {
                //     try {
                //         let child = {
                //             title: "Any label",
                //             key: "4"
                //         }
                //         advanceSearchCriteria[2].children.push(child)
                //     } catch (e) {
                //         ApiInfo.DEBUGER && console.log("error", e)
                //     }
                // }
                if (data.anyTerms && Array.isArray(data.anyTerms) && data.anyTerms.length > 0) {
                    let anyTargetedFields = ""
                    data.anyTermsType && Array.isArray(data.anyTermsType) && data.anyTermsType.length > 0 && data.anyTermsType.map(field => {
                        return (
                            anyTargetedFields = anyTargetedFields + "," + (field === "message_body" ? "body" : field === "attachment.data.content" ? "attachment" : field)
                            // anyTargetedFields = anyTargetedFields + "," + (field.length === 12 ? field.slice(8) : field)
                        )
                    })
                    let anyFieldCriteria = {
                        title: `(${anyTargetedFields.slice(1)})`,
                        key: anyTargetedFields
                    }
                    try {
                        advanceSearchCriteria[2].children.push(anyFieldCriteria)
                    } catch (e) {
                        ApiInfo.DEBUGER && console.log(e)
                    }
                }
                if (data.anyTerms && Array.isArray(data.anyTerms) && data.anyTerms.length > 0) {
                    data.anyTerms.forEach((term, index) => {
                        let child = {
                            title: term,
                            key: index
                        }
                        try {
                            advanceSearchCriteria[2].children.push(child)
                        } catch (e) {
                            // console.log(e)
                        }
                    })
                }
                else {
                    let child = {
                        title: "Any Terms",
                        key: "2"
                    }
                    try {
                        advanceSearchCriteria[2].children.push(child)
                    } catch (e) {
                        ApiInfo.DEBUGER && console.log(e)
                    }
                }


                if (data.allTerms && Array.isArray(data.allTerms) && data.allTerms.length > 0) {
                    let allTargetedFields = ""
                    data.allTermsType && Array.isArray(data.allTermsType) && data.allTermsType.length > 0 && data.allTermsType.forEach(field => {
                        // allTargetedFields = allTargetedFields + "," + (field.length === 12 ? field.slice(8) : field)
                        allTargetedFields = allTargetedFields + "," + (field === "message_body" ? "body" : field === "attachment.data.content" ? "attachment" : field)
                    })
                    let allFieldCriteria = {
                        title: `(${allTargetedFields.slice(1)})`,
                        key: allTargetedFields
                    }
                    try {
                        advanceSearchCriteria[3].children.push(allFieldCriteria)
                    } catch (e) {
                        ApiInfo.DEBUGER && console.log(e)
                    }
                }
                if (data.allTerms && Array.isArray(data.allTerms) && data.allTerms.length > 0) {
                    data.allTerms.forEach((term, index) => {
                        let child = {
                            title: term,
                            key: index
                        }
                        try {
                            advanceSearchCriteria[3].children.push(child)
                        } catch (e) {
                            // console.log(e)
                        }
                    })
                }
                else {
                    let child = {
                        title: "All Terms",
                        key: "3"
                    }
                    try {
                        advanceSearchCriteria[3].children.push(child)
                    } catch (e) {
                        ApiInfo.DEBUGER && console.log(e)
                    }
                }
                if (data.noneTerms && Array.isArray(data.noneTerms) && data.noneTerms.length > 0) {
                    let noneTargetedFields = ""
                    data.noneTermsType && Array.isArray(data.noneTermsType) && data.noneTermsType.length > 0 && data.noneTermsType.forEach(field => {
                        // noneTargetedFields = noneTargetedFields + "," + (field.length === 12 ? field.slice(8) : field)
                        noneTargetedFields = noneTargetedFields + "," + (field === "message_body" ? "body" : field === "attachment.data.content" ? "attachment" : field)
                    })
                    let noneFieldCriteria = {
                        title: `(${noneTargetedFields.slice(1)})`,
                        key: noneTargetedFields
                    }
                    advanceSearchCriteria[4].children.push(noneFieldCriteria)
                }
                if (data.noneTerms && Array.isArray(data.noneTerms) && data.noneTerms.length > 0) {
                    data.noneTerms.forEach((term, index) => {
                        let child = {
                            title: term,
                            key: index
                        }
                        try {
                            advanceSearchCriteria[4].children.push(child)
                        } catch (e) {
                            // console.log(e)
                        }
                    })
                }
                else {
                    let child = {
                        title: "None Terms",
                        key: "4"
                    }
                    try {
                        advanceSearchCriteria[4].children.push(child)
                    } catch (e) {
                        ApiInfo.DEBUGER && console.log(e)
                    }
                }


                if (data.displaymetadataQuary) {
                    let metaData = data.displaymetadataQuary.replace("+", " Contains ")
                    metaData = metaData.replace("-", " Does not Contain ")
                    let child = {
                        title: metaData,
                        key: "Metadata"
                    }
                    try {
                        advanceSearchCriteria[5].children.push(child)
                    } catch (e) {
                        ApiInfo.DEBUGER && console.log(e)
                    }
                }
                else {
                    let child = {
                        title: "---",
                        key: "5"
                    }
                    try {
                        advanceSearchCriteria[5].children.push(child)
                    } catch (e) {
                        // console.log(e)
                    }
                }
                this.setState({
                    advanceSearchCriteria
                })
            }
        }
    }

    openAvancedSearch = () => {
        this.props.moveToAdvanceSearch && this.props.moveToAdvanceSearch(true)
        this.props.openAdvanceSearchDrawer && this.props.openAdvanceSearchDrawer()
    }
    menu = () => (
        <Menu >
            <Menu.Item key="1" onClick={() => this.props.moveToSearch && this.props.moveToSearch()}>
                <img src={searchOrangeIcon} title="Simple Search" style={{ cursor: "pointer", opacity: 1, marginRight: 5 }} alt={"button"} width={26} height={26} />
                Simple Search
          </Menu.Item>

            <Menu.Item key="2" onClick={() => this.openAvancedSearch()}>
                <img src={advanceSearchIcon} title="Advance Search" style={{ cursor: "pointer", opacity: 1, marginRight: 5 }} alt={"button"} width={26} height={26} />
                Advanced Search
          </Menu.Item>
        </Menu>
    );


    renderTreeNodesAdvanceSearch = data => data && data.map((item, index) => {
        if (item.children) {
            return (
                <TreeNode selectable={false} key={item.key} title={<Paragraph ><Text style={{ textOverflow: "scroll" }}>{item.title}</Text></Paragraph>} icon={item.icon ? <Icon type={item.icon} /> : false} checkable={false} isLeaf={false} disabled={item.disabled || false} dataRef={item}>
                    {this.renderTreeNodesAdvanceSearch(item.children)}
                </TreeNode>
            );
        }
        return <TreeNode selectable={false} title={<Paragraph title={item.title} ><Text style={item.color ? { backgroundColor: item.color, color: "#fff" } : {
            color: "inherit", display: "flex", whiteSpace: "pre-wrap", overflowY: 'auto', maxHeight: ' 150px', wordBreak: 'break-word'
        }} >{item.title}</Text></Paragraph>} checkable={false} key={item.key} dataRef={item} />;
    })
    renderTreeNodesSearchCriteria = data => data && data.map((item, index) => {
        if (item.children) {
            return (
                <TreeNode selectable={false} key={item.key} title={<Paragraph style={{ overflowY: "auto", width: "inherit" }} ><Text style={{ fontSize: 12, wordBreak: 'break-all' }}>{item.title}</Text></Paragraph>} icon={item.icon ? <Icon type={item.icon} /> : false} checkable={false} isLeaf={false} disabled={item.disabled || false} dataRef={item}>
                    {this.renderTreeNodesSearchCriteria(item.children)}
                </TreeNode>
            );
        }
        if (item.desc) {
            return <TreeNode selectable={false} title={
                <div style={{ overflowY: "auto" }} title={item.desc !== "null" ? `${item.title} (${item.desc})` : item.title} >
                    <p style={item.color ? { backgroundColor: item.color, color: "#fff", fontSize: 12, marginBottom: 0, paddingBottom: 0 } : { color: "inherit", display: "flex", flexDirection: "row", wordBreak: 'break-all', fontSize: 14, marginBottom: 0, paddingBottom: 0 }}>
                        {item.desc === "null" ? (item.title && item.title.length > 23 ? item.title.slice(0, 23) + "..." : item.title) : (`${item.title} (${item.desc})`.length > 23 ? `${item.title} (${item.desc})`.slice(0, 23) + "..." : `${item.title} (${item.desc})`)}
                    </p>
                    {/* {item.desc !== "null" && <span style={{ marginTop: 0, paddingTop: 0, marginBottom: 10 }}>{item.desc}</span>} */}
                </div>}
                checkable={false}
                key={item.key}
                dataRef={item}
            />;
        }
        return <TreeNode selectable={false} title={<Paragraph style={{ overflowY: "auto" }} title={item.title} ><Text style={item.color ? { backgroundColor: item.color, color: "#fff", fontSize: 12, } : { color: "inherit", display: "flex", flexDirection: "row", wordBreak: 'break-all', fontSize: 12, }} >{item.title && item.title.length > 23 ? item.title.slice(0, 23) + "..." : item.title}</Text></Paragraph>} checkable={false} key={item.key} dataRef={item} />;
    })

    generateSelectEmployeesTreeData = (data, variable) => {
        let treeData = []
        data && data.length > 0 && data.forEach(val => {
            let name = val.DISPLAY_NAME ? val.DISPLAY_NAME.split(' ') : val.USER_NAME.split(' ')
            let nameInitials = name && name.length !== 1 ? name.map((val, ind) => ind < 2 && val[0]) : name.map(val => val[0] + val[1])
            nameInitials = nameInitials.filter(val => val !== false)
            treeData.push({
                title: val.DISPLAY_NAME === "" ? val.USER_NAME : val.DISPLAY_NAME,
                value: val.DISPLAY_NAME ? `${val.MAILBOX_NAME},${val.DISPLAY_NAME}` : (val.USER_NAME ? `${val.MAILBOX_NAME},${val.USER_NAME}` : val.MAILBOX_NAME),
                key: val.USER_ID,
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
    generateSelectTypesTreeData = (data, variable) => {
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
    generateSelectLabelTypesTreeData = (data, variable) => {
        let treeData = []
        data && data.length > 0 && data.forEach((val, ind) => {
            treeData.push({
                title: val.labelTypeData,
                value: val.labelTypeData,
                key: ind,
            })
        })
        this.setState({
            [variable]: treeData
        })
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
            })
        })
        this.setState({
            [variable]: treeData
        })
    }
    filterOption = (input, option) => {
        try {
            return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        catch (err) {
            ApiInfo.DEBUGER && console.log("error", err)
        }
    }


    handleSimpleSearchReset = () => {
        this.props.updateSearchCriteria({})
        this.props.form.resetFields();
        this.genrateTreeData({})
        this.props.setFolderRelatedDocuments([])
        // this.props.postSearchData(null, true)
        // this.props.totalSimpeSearchedDocs()
    };

    handleNewSearchChange = (value, label, dateEvent) => {
        const { searchedValues } = this.state
        if (value.target) {
            searchedValues[value.target.id] = value.target.value
        } else if (label) {
            if (dateEvent) {
                searchedValues[label] = dateEvent.format("DD-MMM-YYYY")
            } else {
                searchedValues[label] = value
            }
        }
        this.genrateTreeData(searchedValues, true)
        // this.props.updateSearchCriteria(searchedValues, 1)
    }
    handleSubmit = e => {
        e && e.preventDefault()
        message.destroy()
        let error;
        const { searchDatatablePageSize } = this.props;
        this.props.closeReadingPane();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                if (values.from && values.to) {
                    if ((values.to.diff(values.from, 'days') < 0)) {
                        message.warn(<span>Invalid Date Range<Icon type="close" className="closebtn" style={{ marginLeft: 10, color: "red" }} onClick={() => message.destroy && message.destroy()} /></span>, 0)
                        error = true;
                    }
                }
                if (!error && (values.New_Search || (values.Select_Employees && values.Select_Employees.length > 0) || ((values.Select_Type && values.Select_Type.length > 0) || values.to || values.from))) {
                    let customValues = { ...values }
                    customValues.from = customValues.from ? customValues.from.format("YYYY-MM-DD") : ""
                    customValues.to = customValues.to ? customValues.to.format("YYYY-MM-DD") : ""
                    if (searchDatatablePageSize) {
                        customValues.fromCount = 0
                        customValues.toCount = searchDatatablePageSize
                    }
                    let APIbody;
                    if (customValues) {
                        APIbody = {
                            fromCount: customValues.fromCount || 0,
                            toCount: customValues.toCount || 100,
                            fromDate: customValues.from || "",
                            toDate: customValues.to || "",
                            employee: customValues.Select_Employees || customValues.employee || [],
                            filterType: customValues.Select_Type || customValues.filterType || [],
                            labelType: customValues.Select_Labels || customValues.labelType || [],
                            labelName: customValues.Select_LabelsName || customValues.labelName || [],
                            contentValue: customValues.New_Search || customValues.contentValue || ""
                        };
                    }
                    this.props.postSearchData(APIbody, false, this.props.closeReadingPane)
                    this.props.updateSearchCriteria({ ...values }, 'A1')

                    this.props.resetSelectedRecords && this.props.resetSelectedRecords();
                    this.setState({
                        searchedValues: { ...values },
                    })
                }
                //we need this in 7.1
                else if (!error) {
                    message.error(<span>Cannot Search Without Any Criteria<Icon type="close" className="closebtn" style={{ marginLeft: 10, color: "red" }} onClick={() => message.destroy && message.destroy()} /></span>, 0)
                }
            }
        });
    };

    clearAdvanceSearch = () => {
        this.props.updateSearchCriteria({}, 'A2')
        this.props.closeReadingPane()
        message.destroy()
        this.props.setFolderRelatedDocuments([])
        this.props.totalFolderDocs(null)
        // this.props.postSearchData({}, true)
        this.props.resetSelectedRecords && this.props.resetSelectedRecords();
    }

    render() {
        const { collapsed, collapseSideMenu, formatMessage, mailboxFolderStructure, sideMenuOptions, updatedSearchCriteria } = this.props
        const { getFieldDecorator } = this.props.form;
        const { selectedMailbox, selectedFolderKey, searchDropdownOpen, emplyeesSelectTreeData, typesSelectTreeData, dataSimpleSearchCriteria, advanceSearchCriteria } = this.state;
        const filter = sideMenuOptions && sideMenuOptions.filter
        const search = sideMenuOptions && sideMenuOptions.search
        const advSearch = sideMenuOptions && sideMenuOptions.advSearch

        return (
            <div style={!collapsed ? style.sideMenuHeight : { height: "10vh" }}>
                <div style={collapsed ? style.emailsCollapsedSideMenuIcon : style.emailsSideMenuIcon} >
                    {collapsed ?
                        <div onClick={collapseSideMenu} title="Open Menu" style={{ cursor: "pointer", width: "100%", display: "flex", justifyContent: "center", }}>
                            <img src={rightArrow} style={{ cursor: "pointer" }} alt={"button"} width={20} height={20} title="Open Menu" />
                        </div>
                        :
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '90%', alignItems: "center", WebkitTransition: 'webkitTransition .5s linears' }}>
                            <Dropdown overlay={this.menu()} trigger={["click"]} onVisibleChange={() => this.setState({ searchDropdownOpen: !searchDropdownOpen })}
                                onClick={() => this.setState({ searchDropdownOpen: !searchDropdownOpen, search: true, filter: false })} >
                                <div style={{ padding: '5px 10px 5px 10px' }}>
                                    <img src={searchIcon} style={(search || advSearch) ? { cursor: "pointer", opacity: 1 } : { cursor: "pointer", opacity: 0.5 }} alt={"button"} width={32} height={32} />
                                    <Icon type={"down"} style={(search || advSearch) ? { fontSize: 12, color: "#fff", cursor: "pointer", opacity: 1, paddingTop: '5px' } : { fontSize: 12, color: "#fff", cursor: "pointer", opacity: 0.5, paddingTop: '5px' }} />
                                </div>
                            </Dropdown>

                            <img src={BrowseEmail} title="Filter" alt="" style={filter ? { cursor: "pointer", opacity: 1 } : { opacity: 0.5, cursor: "pointer" }} width={35} height={35} onClick={this.props.moveToFilter} />
                            <img src={leftArrow} title="Close Menu" alt={"button"} style={{ cursor: "pointer" }} width={20} height={20} onClick={collapseSideMenu} />
                        </div>
                    }
                </div>
                {!collapsed &&
                    <div style={{ padding: "70px 0px" }}>
                        {filter &&
                            <div>
                                <Select
                                    placeholder={this.props.mailboxes && this.props.mailboxes.length ? "Select Mailbox" : "No Mailboxes Available"}
                                    style={{ height: 40, width: "97%", margin: "0 1.5%" }}
                                    onChange={selectedMailbox => this.handleMailboxChange(selectedMailbox)}
                                    value={selectedMailbox}
                                    onSearch={this.searchMailbox}
                                    filterOption={(input, option) => this.filterOption(input, option)}
                                    showSearch
                                >
                                    {this.props.mailboxes && Array.isArray(this.props.mailboxes) && this.props.mailboxes.map((mail, index) =>
                                        <Option key={mail.USER_ID} title={mail.MAILBOX_NAME} value={mail.USER_ID}>{mail.MAILBOX_NAME}</Option>
                                    )}
                                </Select>

                                {mailboxFolderStructure && Array.isArray(mailboxFolderStructure) && mailboxFolderStructure.length > 0 ?
                                    <Tree
                                        defaultExpandedKeys={mailboxFolderStructure && Array.isArray(mailboxFolderStructure) && mailboxFolderStructure.map(folder => folder.key)}
                                        selectedKeys={[selectedFolderKey]}
                                        onSelect={(selectedKeys, info) => (!selectedFolderKey || selectedFolderKey !== selectedKeys[0]) && this.onFolderSelect(selectedKeys, info)}
                                        // autoExpandParent={true}
                                        defaultExpandAll={true}
                                    >
                                        {this.renderTreeNodes(mailboxFolderStructure)}
                                    </Tree> :
                                    mailboxFolderStructure && Array.isArray(mailboxFolderStructure) && mailboxFolderStructure.length === 0 &&
                                    <div style={{ padding: 15 }}>
                                        <Text>No Folders Found</Text>
                                    </div>
                                }
                            </div>
                        }

                        {search &&
                            <div style={{ ...style.sideMenuHeight }}>
                                <CollapseableHeader bgColor="#F5F7FA" heading={"SEARCH"}>
                                    <Form layout="vertical" onSubmit={this.handleSubmit}>
                                        <Form.Item label="" style={{ ...style.marginBottom0 }}>
                                            {getFieldDecorator('New_Search', {
                                                initialValue: null,
                                                rules: [{
                                                    // required: true, message: formatMessage(messages["Please enter new search"])
                                                }],
                                                setFieldsValue: this.state.New_Search
                                            })(<Input onChange={(e) => this.handleNewSearchChange(e)} onPressEnter={this.handleSubmit} placeholder={"Search"} width={100} allowClear={true}
                                            // suffix={<img src={searchIconOrange} width={30} height={30} alt="search" />}
                                            />)}
                                        </Form.Item>
                                        <Form.Item label="" style={{ ...style.marginBottom0 }}>
                                            <Form.Item
                                                // validateStatus="error"
                                                // help="Please select the correct date"
                                                style={{ ...style.marginBottom0 }}
                                            >
                                                {getFieldDecorator('from', {
                                                    initialValue: null,
                                                    // rules: [{
                                                    //     required: !!this.state.searchedValues.to, message: "Invalid Date Range"
                                                    // }],
                                                    setFieldsValue: this.state.from

                                                })(<DatePicker
                                                    // value={from}
                                                    //placeholder="from"
                                                    onChange={(e, Datestring) => this.handleNewSearchChange(Datestring, "from", e)}
                                                    width={100}
                                                    placeholder={"From"}
                                                    format={dateFormatList}
                                                />
                                                )}

                                            </Form.Item>
                                            <Form.Item style={{ ...style.marginBottom0 }}>
                                                {getFieldDecorator('to', {
                                                    initialValue: null,
                                                })(<DatePicker
                                                    // value={to}
                                                    //placeholder="to"
                                                    onChange={(e, Datestring) => this.handleNewSearchChange(Datestring, "to", e)}
                                                    width={100}
                                                    placeholder={"To"}
                                                    format={dateFormatList}
                                                />)}

                                            </Form.Item>
                                        </Form.Item>

                                        <Form.Item label="" style={{ marginBottom: 0, marginTop: -8 }}>
                                            {getFieldDecorator('Select_Employees', {
                                                initialValue: [],

                                            })(
                                                <TreeSelect
                                                    style={{ width: '100%' }}
                                                    setFieldsValue={this.state.Select_Employees}
                                                    dropdownStyle={{ maxHeight: 305, overflow: 'auto', }}
                                                    treeData={emplyeesSelectTreeData}
                                                    placeholder={"Select Employees"}
                                                    // onFocus={() => (!this.props.simpleSearch || !this.props.simpleSearch.EmployeeList || !this.props.simpleSearch.EmployeeList.length > 0) && this.props.fetchSimpleSearch()}
                                                    onChange={(selectedOpt) => this.handleNewSearchChange(selectedOpt, "Select_Employees")}
                                                    treeCheckable={true}
                                                    showSearch
                                                    // onSearch={(input) => this.addEmployee(input)}
                                                    allowClear={true}
                                                    treeIcon={true}
                                                    filterTreeNode={(input, treeNode) => treeNode.props.title.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                    notFoundContent={(!this.props.simpleSearch) && <Text>
                                                        <Spin size="small" style={{ marginRight: 15 }} />{"Fetching Employees"}
                                                    </Text>
                                                    }
                                                />
                                            )}
                                        </Form.Item>
                                        <Form.Item label="" style={{ ...style.marginBottom0 }}>
                                            {getFieldDecorator('Select_Type', {
                                                initialValue: [],

                                            })(
                                                <TreeSelect
                                                    style={{ width: '100%' }}
                                                    setFieldsValue={this.state.Select_Type}
                                                    dropdownStyle={{ maxHeight: 305, overflow: 'auto' }}
                                                    treeData={typesSelectTreeData}
                                                    placeholder={"Select Types"}
                                                    // onFocus={() => (!this.props.simpleSearch || !this.props.simpleSearch.FilterType || !this.props.simpleSearch.FilterType.length > 0) && this.props.fetchSimpleSearch()}
                                                    onChange={(selectedOpt) => this.handleNewSearchChange(selectedOpt, "Select_Type")}
                                                    treeCheckable={true}
                                                    allowClear={true}
                                                    treeIcon
                                                    showSearch
                                                    filterTreeNode={(input, treeNode) =>
                                                        treeNode.props.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                    }
                                                    notFoundContent={(!this.props.simpleSearch) && <Text>
                                                        <Spin size="small" style={{ marginRight: 15 }} />{"Fetching Types"}
                                                    </Text>
                                                    }
                                                />
                                            )}
                                        </Form.Item>
                                        {/* {version > 7.1 && <Form.Item label="" style={{ ...style.marginBottom0 }}>
                                            {getFieldDecorator('Select_Labels', {
                                                initialValue: []
                                            })(

                                                <TreeSelect
                                                    style={{ width: '100%' }}
                                                    initialValue={[]}
                                                    dropdownStyle={{ maxHeight: 305, overflow: 'auto' }}
                                                    treeData={[]}
                                                    placeholder={"Select Labels"}
                                                    allowClear={true}
                                                    // onFocus={() => (!this.props.simpleSearch || !this.props.simpleSearch.FilterType || !this.props.simpleSearch.FilterType.length > 0) && this.props.fetchSimpleSearch()}
                                                    onChange={(selectedOpt) => this.handleNewSearchChange(selectedOpt, "Select_Labels")}
                                                    treeCheckable={true}
                                                    showSearch
                                                />
                                            )}
                                        </Form.Item>} */}

                                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                            <PrimaryButton text={"Search"} htmlType="submit" />
                                            <SecondryButton text={"Reset"} onClick={this.handleSimpleSearchReset} />
                                        </div>
                                    </Form>
                                </CollapseableHeader>

                                <CollapseableHeader bgColor="#F5F7FA" heading={"SEARCH CRITERIA"}>
                                    {Object.keys(updatedSearchCriteria).length && dataSimpleSearchCriteria && Array.isArray(dataSimpleSearchCriteria) && dataSimpleSearchCriteria.length > 0 && this.props.searchType === 'A1' ?
                                        <div style={{ padding: "0px 15px" }}>
                                            <div>
                                                <Tree
                                                    defaultExpandedKeys={["0", "1", "2", "3"]}
                                                    // expandedKeys={['Keyword','Date Range','Employees','Types','Labels']}     
                                                    // defaultExpandAll={true}
                                                    autoExpandParent={true}
                                                // checkable={true}
                                                >
                                                    {this.renderTreeNodesSearchCriteria(dataSimpleSearchCriteria)}
                                                </Tree>
                                            </div>
                                        </div>
                                        :
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <center><Text>{"No Criteria"}</Text></center>
                                            <br />
                                            <br />
                                        </div>}

                                </CollapseableHeader>
                            </div>}
                        {advSearch &&
                            <div style={{ ...style.sideMenuHeight }}>
                                <CollapseableHeader bgColor="#F5F7FA" heading={"ADVANCED SEARCH CRITERIA"}>
                                    <div style={{ padding: "0px 15px" }}>
                                        {Object.keys(updatedSearchCriteria).length && this.props.searchType === 'A2' ? <div>
                                            <div>
                                                <Tree
                                                    defaultExpandAll={true}
                                                    onSelect={this.onSelect}
                                                    onCheck={this.onCheck}
                                                    checkable={true}
                                                    style={{ width: "100%" }}
                                                >
                                                    {this.renderTreeNodesAdvanceSearch(advanceSearchCriteria)}
                                                </Tree>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: "150px" }}>
                                                <PrimaryButton text={formatMessage(messages["_Edit"])} onClick={() => this.props.openAdvanceSearchDrawer(true)} />
                                                <SecondryButton text={formatMessage(messages["_Clear+"])} onClick={() => this.clearAdvanceSearch()} />
                                            </div>
                                        </div>
                                            :
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <center><Text>{formatMessage(messages["No Criteria"])}</Text></center>
                                                <br />
                                                <br />
                                            </div>}
                                    </div>
                                </CollapseableHeader></div>}


                    </div>}
            </div>
        )
    }
}


const MyArchiveEmailSideBarForm = Form.create('DeploymentForm')(MyArchiveEmailSideBar);

const mapStateToProps = state => {
    return {
        simpleSearch: state.SimpleSearchReducer.simpleSearch,
        updatedSearchCriteria: state.UpdateSearchCriteriaReducer.updatedSearchCriteriaInMyArchivedEmails,
        searchType: state.UpdateSearchCriteriaReducer.searchTypeInMyArchivedEmails,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        postSearchData: (data, cancelRequest, closeReadingPane) => dispatch(postSearchData(data, cancelRequest, closeReadingPane)),
        totalFolderDocs: totalDocs => dispatch(totalFolderDocs(totalDocs)),
        updateSearchCriteria: (searchedData, searchType) => dispatch(updateSearchCriteria_MYARCHIVEDEMAILS(searchedData, searchType)),
        setFolderRelatedDocuments: (data) => dispatch(setFolderRelatedDocuments(data)),
        fetchFolderRelatedDocs: (data, cancelRequest) => dispatch(fetchFolderRelatedDocs(data, cancelRequest)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyArchiveEmailSideBarForm);
