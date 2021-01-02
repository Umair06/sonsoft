import React, { Component } from "react";
import moment from "moment"
import { Tree, Typography, Icon, Form, Input, DatePicker, Menu, Select, Spin, Dropdown, message, Avatar, TreeSelect } from 'antd';
import style from "../../styles"
import CollapseableHeader from '../CollapseAbleHeader/CollapseAbleHeader';
import rightArrow from "../../Assets/icons/Side Column Arrow Expand.png";
import leftArrow from "../../Assets/icons/Side Column Arrow compressed.png";
import searchIcon from '../../Assets/icons/SV_ICONS/Search_White.png';
import filterIcon from '../../Assets/icons/SV_ICONS/Filter_White.png';
import smartSearchIcon from '../../Assets/icons/SV_ICONS/SmartSearch_Orange.png';
import advanceSearchIcon from '../../Assets/icons/SV_ICONS/AdvancedSearch_Orange.png';
import queryBuilderIcon from '../../Assets/icons/SV_ICONS/QueryBuilder_Orange.png';
import saveSearchIcon from '../../Assets/icons/SV_ICONS/SaveSearch_Orange.png';
import searchOrangeIcon from '../../Assets/icons/SV_ICONS/Search_Orange.png';
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
import { version } from "../../APIConfig/Config";
import { connect } from "react-redux";
import { fetchSimpleSearch, getSimpleSearchResult, totalSimpeSearchedDocs, clearSearchedResults, postSearchData, errorMessage, filterDocuments, queryBuilderSearchData, smartSearch, getSimpleSearch, getFilterAggeragations, filterSearchResultSet } from "../../Redux/Actions/SimpleSearchAction/SimpleSearchAction";
import { updateSearchCriteria } from "../../Redux/Actions/UpdateSearchCriteriaAction/UpdateSearchCriteriaAction";
import { postAdvancedSearch } from "../../Redux/Actions/AdvancedSearchAction/AdvancedSearchAction";
import { resetSelectedRecords } from "../../Redux/Actions/updateSelectedRecordsAction/updateSelectedRecordsAction";
import { PrimaryButton, SecondryButton } from "../Button/Button"
import { defineMessages } from 'react-intl';
import { fetchSavedSearchData } from "../../Redux/Actions/SavedSearchActions/SavedSearchActions"
import { fetchLicenseInformation } from "../../Redux/Actions/ControlCenterAction/LicenseAction"
import { fetchAutoLabels, getTreeDataGlobalLabel } from "../../Redux/Actions/Policies/AutoLabelingAction"
import * as ApiInfo from "../../APIConfig/ApiParameters";

const messages = defineMessages({
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
    'Query Builder': {
        id: "SearchArchive.QueryBuilder",
        defaultMessage: "Query Builder"
    },
    'Saved Search': {
        id: "SearchArchive.SavedSearch",
        defaultMessage: "Saved Search"
    },
    'Click on menu item.': {
        id: "SearchArchive.ClickOnMenuItem",
        defaultMessage: "Click on menu item."
    },
    'FILTERS': {
        id: "SearchArchive.FILTERS",
        defaultMessage: "FILTERS"
    },
    'Global Label': {
        id: "SearchArchive.GlobalLabel",
        defaultMessage: "Global Label",
    },
    '_Employees': {
        id: "SearchArchive._Employees",
        defaultMessage: "Employees"
    },
    '_Types': {
        id: "SearchArchive._Types",
        defaultMessage: "Types"
    },
    '_Apply': {
        id: "SearchArchive.Apply",
        defaultMessage: "Apply"
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
    'SAVED SEARCH': {
        id: "SearchArchive.SAVED_SEARCH",
        defaultMessage: "SAVED SEARCH"
    },
    'Select a Saved Search': {
        id: "SearchArchive.SelectSavedSearch",
        defaultMessage: "Select a Saved Search",
    },
    'Fetching Saved Searches': {
        id: "SearchArchive.FetchingSavedSearches",
        defaultMessage: "Fetching Saved Searches"
    },
    'SEARCH': {
        id: "SearchArchive.SEARCH",
        defaultMessage: "SEARCH"
    },
    'Please enter new search': {
        id: "SearchArchive.PleaseEnterNewSearch",
        defaultMessage: "Please enter new search"
    },
    'Search': {
        id: "SearchArchive.Search",
        defaultMessage: "Search"
    },
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
const { Text, Paragraph } = Typography;
const { TreeNode } = Tree;
const { Option } = Select;
const { color } = Theme;

const groupLabelsByPolicyID = (array, key) => {
    // Return the end result
    return array.reduce((result, currentValue) => {
        // If an array already present for key, push it to the array. Else create an array and push the object
        (result[currentValue[key].split("-")[0]] = result[currentValue[key].split("-")[0]] || []).push(
            currentValue
        );
        // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
        return result;
    }, {}); // empty object is the initial value for result object
};

class SearchArchive extends Component {
    constructor(props) {
        super(props)
        const { formatMessage } = this.props;
        this.state = {
            from: null,
            to: null,
            endOpen: false,
            filter: false,
            advSearch: false,
            search: true,
            dropdown: true,
            searchDropdownOpen: false,
            size: 'default',
            lowerRelevancy: 80,
            higherRelevancy: 100,
            maxRecordsReturned: 1000,
            employeeFrom: 0,
            employeeTo: 100,
            searchedValues: {
                New_Search: "",
                Saved_Search: null,
                Select_Employees: [],
                Select_Labels: [],
                Select_Labels_Name: [],
                Select_Type: [],
                from: null,
                to: null
            },
            smartSearchedValues: {
                "emailID": "",
                "query": "",
                "source": "",
                "customer": "",
                "topN": ""
            },
            dataSmartSearchCriteria: [
                { title: formatMessage(messages["Keyword"]), key: "0", children: [] },
            ],
            dataSimpleSearchCriteria: [
                { title: formatMessage(messages["Keyword"]), key: "0", children: [] },
                { title: formatMessage(messages["Date Range"]), key: "1", children: [] },
                { title: formatMessage(messages["Employees"]), key: "2", children: [] },
                { title: formatMessage(messages["Types"]), key: "3", children: [] },
                { title: formatMessage(messages["Labels"]), key: "4", children: [] }
            ],
            advanceSearchCriteria: [
                { title: "Date", key: "0", children: [] },
                { title: "Types", key: "1", children: [] },
                { title: "labels", key: "2", children: [] },
                { title: "May Contain", key: "3", children: [] },
                { title: "Must Contain", key: "4", children: [] },
                { title: "Dose Not Contain", key: "5", children: [] },
                { title: "Metadata Search", key: "6", children: [] },
            ],
            dataQueryBuilderSearchCriteria: [
                { title: "Types", key: "0", children: [] },
                { title: "Query", key: '1', children: [] },

            ],
            checkValue: [],
            loading: false
        }
    }

    componentDidMount() {
        // this.props.getSimpleSearch()
        // this.resetSimpleSearchDropdowns()
        this.props.fetchSimpleSearch(undefined, this.resetSimpleSearchDropdowns)
    }

    resetSimpleSearchDropdowns = () => {
        this.setState({
            labelTypesSelectTreeData: null,
            emplyeesSelectTreeData: null,
            typesSelectTreeData: null
        })
    }

    onChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    };

    onChangeSavedSearchDropdown = (value, opt) => {
        const { licenseInformation } = this.props;
        this.props.closeReadingPane();
        let searchType = opt && opt.props && opt.props.optionLabelProp && opt.props.optionLabelProp.SEARCH_TYPE_VALUE;
        let data = opt && opt.props && opt.props.optionLabelProp && JSON.parse(opt.props.optionLabelProp.SEARCH_QUERY)
        this.props.clearSearchedResults({})
        this.props.totalSimpeSearchedDocs(null)
        this.props.postSearchData({}, true, this.props.closeReadingPane)
        this.props.smartSearch({}, true)
        this.props.queryBuilderSearchData({}, true)
        this.props.postAdvancedSearch({}, true);
        this.props.updateSearchCriteria({}, 4)
        this.props.resetSelectedRecords && this.props.resetSelectedRecords();

        if (searchType === "S") {
            this.props.updateSearchCriteria(data, 4, searchType)
            this.props.postSearchData(data, false, this.props.closeReadingPane)
        }
        else if (searchType === "Q") {
            let obj = {
                body: data.body,
                index: data.filterType
            }
            this.props.updateSearchCriteria(obj, 4, searchType)
            this.props.queryBuilderSearchData(obj, false)
        }
        else if (searchType === "SS") {
            this.props.updateSearchCriteria(data, 4, searchType)
            if (licenseInformation && licenseInformation.smart_search_information) {
                let Smart_Access_Token = (licenseInformation && licenseInformation.smart_search_information && licenseInformation.smart_search_information.Smart_Access_Token) || ""
                this.props.smartSearch(data, false, Smart_Access_Token)
            } else {
                this.props.fetchLicenseInformation(false, true, data, true)
            }
            // this.props.updateSearchCriteria(data, 4, searchType)
            // this.props.smartSearch(data, false, this.props.smartSearchAccessToken)
        }
        else {
            if (searchType === "A") {
                this.props.updateSearchCriteria(data, 4, searchType)
                this.props.postAdvancedSearch(data, false)
            }
        }
    }
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
    handleSmartSearchChange = (e) => {
        const { smartSearchedValues } = this.state;
        if (e.target) {
            smartSearchedValues.query = e.target.value
        }
        this.genrateTreeData(smartSearchedValues, true)
    }
    onChange = (value, label) => {
        this.setState({ [label]: value });
    };
    onChangeFilter = (value, label) => {
        this.setState({ [label]: value });
    };

    handleSubmit = e => {
        e && e.preventDefault()
        message.destroy()
        let error;
        const { searchDatatablePageSize } = this.props;
        this.props.closeReadingPane();
        this.props.updateCurrentPage(1)
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                if (values.from && values.to) {
                    if (values.to.diff(values.from, 'days') < 0) {
                        message.warn(<span>Invalid Date Range<Icon type="close" className="closebtn" style={{ marginLeft: 10, color: "red" }} onClick={() => message.destroy && message.destroy()} /></span>, 0)
                        error = true;
                    }
                }
                if (!error && (values.New_Search || (values.Select_Employees && values.Select_Employees.length > 0) || ((values.Select_Type && values.Select_Type.length > 0) || values.to || values.from) || (values.Select_Labels && values.Select_Labels.length))) {
                    this.props.setSearchTypeSimple()
                    let customValues = { ...values }
                    customValues.from = customValues.from ? customValues.from.format("YYYY-MM-DD") : ""
                    customValues.to = customValues.to ? customValues.to.format("YYYY-MM-DD") : ""
                    if (searchDatatablePageSize) {
                        customValues.fromCount = 0
                        customValues.toCount = searchDatatablePageSize
                    }
                    let APIbody;
                    let employees = customValues.Select_Employees || customValues.employee || [];
                    if (employees) {
                        employees = employees.map(el => el.split(",")[0] && el.split(",")[0] !== "null" ? el.split(",")[0] : (el.split(",")[1] && el.split(",")[1] !== "null" ? el.split(",")[1] : ""))
                    }
                    if (customValues) {
                        APIbody = {
                            fromCount: customValues.fromCount || 0,
                            toCount: customValues.toCount || 100,
                            fromDate: customValues.from || "",
                            toDate: customValues.to || "",
                            employee: employees || [],
                            filterType: customValues.Select_Type || customValues.filterType || [],
                            labelType: [],
                            labelName: customValues.Select_Labels || [],
                            contentValue: customValues.New_Search || customValues.contentValue || ""
                        };
                    }
                    this.props.postSearchData(APIbody, false, this.props.closeReadingPane)
                    this.props.updateSearchCriteria(APIbody, 1)
                    this.props.totalSimpeSearchedDocs()
                    this.props.resetSelectedRecords && this.props.resetSelectedRecords();
                    this.setState({
                        searchedValues: { ...values },
                    })
                }
                else if (!error) {
                    message.error(<span>Cannot Search Without Any Criteria<Icon type="close" className="closebtn" style={{ marginLeft: 10, color: "red" }} onClick={() => message.destroy && message.destroy()} /></span>, 0)
                }
            }
        });
    };

    handleFilter = e => {
        const { updatedSearchCriteria, searchType, searchTypeTree } = this.props;
        e && e.preventDefault();
        message.destroy();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                if (updatedSearchCriteria && searchType === 1) {
                    let APIBody = { ...updatedSearchCriteria };
                    APIBody.isFilter = (!values.Filter_Labels || !values.Filter_Labels.length) && (!values.Filter_Employees || !values.Filter_Employees.length) && (!values.Filter_Types || !values.Filter_Types.length) ? 0 : 1;
                    APIBody.filterLabel = values.Filter_Labels || [];
                    APIBody.filterEmployees = values.Filter_Employees || [];
                    APIBody.filterDatasource = values.Filter_Types || [];
                    this.props.filterSearchResultSet(APIBody, false, searchType, searchTypeTree);
                }
            }
        });
    };

    resetAllFilter = () => {
        const { updatedSearchCriteria, searchType, searchTypeTree } = this.props;
        this.props.form.resetFields();
        message.destroy();
        if (updatedSearchCriteria && searchType === 1) {
            let APIBody = { ...updatedSearchCriteria };
            APIBody.isFilter = 0;
            this.props.filterSearchResultSet(APIBody, false, searchType, searchTypeTree);
        }
    }

    handleSmartSearchSubmit = e => {
        e && e.preventDefault()
        const { searchDatatablePageSize, licenseInformation, smartSearchAccessToken } = this.props;
        const { higherRelevancy, lowerRelevancy, maxRecordsReturned } = this.state;
        this.props.closeReadingPane();
        this.props.updateCurrentPage(1)
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let customValues = { ...values }
                if (customValues.to && customValues.from && moment(customValues.to).diff(moment(customValues.from), 'days') < 0) {
                    message.warn("Invalid Date Range")
                    return
                }
                let APIbody = {};
                let Smart_Access_Token;
                if (licenseInformation && licenseInformation.smart_search_information) {
                    if (customValues) {
                        APIbody.emailID = (licenseInformation.smart_search_information && licenseInformation.smart_search_information.Smart_Email_Address) || ""
                        APIbody.query = customValues.Smart_Search
                        APIbody.customer = (licenseInformation.smart_search_information && licenseInformation.smart_search_information.Smart_Customer) || ""
                        APIbody.source = licenseInformation.smart_search_information && licenseInformation.smart_search_information.Smart_Source
                        Smart_Access_Token = (licenseInformation && licenseInformation.smart_search_information && licenseInformation.smart_search_information.Smart_Access_Token) || ""
                        APIbody.resultType = "all"
                        let validatedMaxRecordsReturned = maxRecordsReturned;
                        if (Number(maxRecordsReturned) < 1) {
                            validatedMaxRecordsReturned = 1;
                        } else if (Number(maxRecordsReturned) > 10000) {
                            validatedMaxRecordsReturned = 10000;
                        }
                        if (validatedMaxRecordsReturned && !isNaN(validatedMaxRecordsReturned)) {
                            APIbody.topN = Number(validatedMaxRecordsReturned)
                        }
                        APIbody.startIndex = 0
                        APIbody.itemsPerPage = validatedMaxRecordsReturned ? (searchDatatablePageSize && Number(searchDatatablePageSize) < Number(validatedMaxRecordsReturned) ? Number(searchDatatablePageSize) : validatedMaxRecordsReturned && Number(validatedMaxRecordsReturned)) : Number(searchDatatablePageSize)
                        let validatedLowerRelevancy = lowerRelevancy;
                        let validatedHigherRelevancy = higherRelevancy;
                        if (lowerRelevancy && Number(lowerRelevancy) < 1) {
                            validatedLowerRelevancy = 1;
                        } else if (lowerRelevancy && Number(lowerRelevancy) > 99) {
                            validatedLowerRelevancy = 99;
                        }
                        if (higherRelevancy && Number(higherRelevancy) < 1) {
                            validatedHigherRelevancy = 2;
                        } else if (higherRelevancy && Number(higherRelevancy) > 100) {
                            validatedHigherRelevancy = 100;
                        }
                        APIbody.scoreRange = {
                            "min": validatedLowerRelevancy && !isNaN(validatedLowerRelevancy) && Number(validatedLowerRelevancy) / 100,
                            "max": validatedHigherRelevancy && !isNaN(validatedHigherRelevancy) && Number(validatedHigherRelevancy) / 100
                        }
                        APIbody.context = {}
                        if (customValues.from) {
                            APIbody.context.startDate = (moment.utc(customValues.from)).valueOf()
                        }
                        if (customValues.to) {
                            APIbody.context.endDate = (moment.utc(customValues.to)).valueOf()
                        }
                        if (customValues.Smart_Select_Type && customValues.Smart_Select_Type.length) {
                            APIbody.context.datasource = customValues.Smart_Select_Type
                        }
                        let employees = customValues.Smart_Select_Employees || [];
                        if (employees && employees.length) {
                            employees = employees.map(el => el.split(",")[0] && el.split(",")[0] !== "null" ? el.split(",")[0] : (el.split(",")[1] && el.split(",")[1] !== "null" ? el.split(",")[1] : ""))
                        }
                        if (employees && employees.length) {
                            APIbody.context.To = employees;
                            APIbody.context.From = employees;
                            APIbody.context.CC = employees;
                            APIbody.context.BCC = employees;
                        }

                    }
                    this.genrateTreeData({ ...APIbody }, 5)
                    this.props.totalSimpeSearchedDocs()
                    this.props.smartSearch(APIbody, false, Smart_Access_Token || smartSearchAccessToken)
                    this.props.updateSearchCriteria({ ...APIbody }, 5)
                    this.props.resetSelectedRecords && this.props.resetSelectedRecords();
                } else {
                    APIbody.query = customValues.Smart_Search
                    APIbody.resultType = "all"
                    let validatedMaxRecordsReturned = maxRecordsReturned;
                    if (Number(maxRecordsReturned) < 1) {
                        validatedMaxRecordsReturned = 1;
                    } else if (Number(maxRecordsReturned) > 10000) {
                        validatedMaxRecordsReturned = 10000;
                    }
                    if (validatedMaxRecordsReturned && !isNaN(validatedMaxRecordsReturned)) {
                        APIbody.topN = Number(validatedMaxRecordsReturned)
                    }
                    APIbody.startIndex = 0
                    APIbody.itemsPerPage = validatedMaxRecordsReturned ? (searchDatatablePageSize && Number(searchDatatablePageSize) < Number(validatedMaxRecordsReturned) ? Number(searchDatatablePageSize) : validatedMaxRecordsReturned && Number(validatedMaxRecordsReturned)) : Number(searchDatatablePageSize)
                    let validatedLowerRelevancy = lowerRelevancy;
                    let validatedHigherRelevancy = higherRelevancy;
                    if (lowerRelevancy && Number(lowerRelevancy) < 1) {
                        validatedLowerRelevancy = 1;
                    } else if (lowerRelevancy && Number(lowerRelevancy) > 99) {
                        validatedLowerRelevancy = 99;
                    }
                    if (higherRelevancy && Number(higherRelevancy) < 2) {
                        validatedHigherRelevancy = 2;
                    } else if (higherRelevancy && Number(higherRelevancy) > 100) {
                        validatedHigherRelevancy = 100;
                    }
                    APIbody.scoreRange = {
                        "min": validatedLowerRelevancy && !isNaN(validatedLowerRelevancy) && Number(validatedLowerRelevancy) / 100,
                        "max": validatedHigherRelevancy && !isNaN(validatedHigherRelevancy) && Number(validatedHigherRelevancy) / 100
                    }
                    APIbody.context = {}
                    if (customValues.from) {
                        APIbody.context.startDate = (moment.utc(customValues.from)).valueOf()
                    }
                    if (customValues.to) {
                        APIbody.context.endDate = (moment.utc(customValues.to)).valueOf()
                    }
                    if (customValues.Smart_Select_Type && customValues.Smart_Select_Type.length) {
                        APIbody.context.datasource = customValues.Smart_Select_Type
                    }
                    let employees = customValues.Smart_Select_Employees || [];
                    if (employees && employees.length) {
                        employees = employees.map(el => el.split(",")[0] && el.split(",")[0] !== "null" ? el.split(",")[0] : (el.split(",")[1] && el.split(",")[1] !== "null" ? el.split(",")[1] : ""))
                    }
                    if (employees && employees.length) {
                        APIbody.context.To = employees;
                        APIbody.context.From = employees;
                        APIbody.context.CC = employees;
                        APIbody.context.BCC = employees;
                    }
                    this.genrateTreeData({ ...APIbody }, 5)
                    this.props.totalSimpeSearchedDocs()
                    this.props.resetSelectedRecords && this.props.resetSelectedRecords();
                    this.props.fetchLicenseInformation(false, true, APIbody, false, smartSearchAccessToken)
                }
            }
        });
    }

    handleSimpleSearchReset = () => {
        this.props.updateSearchCriteria({}, 1);
        this.props.form.resetFields();
        this.genrateTreeData({});
        this.props.postSearchData(null, true, this.props.closeReadingPane);
        this.props.totalSimpeSearchedDocs();
        this.props.resetSelectedRecords && this.props.resetSelectedRecords();
        this.props.closeReadingPane();
        this.props.clearSearchedResults();
        message.destroy()
    };
    handleSmartSearchReset = () => {
        this.props.updateSearchCriteria({}, 5);
        this.props.closeReadingPane();
        this.props.form.resetFields();
        message.destroy()
        this.genrateTreeData({});
        this.props.fetchLicenseInformation(null, null, null, null, true)
        this.props.smartSearch(null, true);
        this.props.totalSimpeSearchedDocs();
        this.props.resetSelectedRecords && this.props.resetSelectedRecords();
    }
    static getDerivedStateFromProps(props, state) {
        let tempCriteriaChanged = false;
        let updateSimpleSearchCriteria = state.updateSimpleSearchCriteria;
        let updateAdvanceSearchCriteria = state.updateAdvanceSearchCriteria;
        let updateSavedSearchCriteria = state.updateSavedSearchCriteria;
        let updateSmartSearchCriteria = state.updateSmartSearchCriteria;
        let updatedSearchCriteria = state.updatedSearchCriteria;
        let { employeesFilterData, typeFilterData, labelFilterData } = state;

        if (props.searchType === 1) {
            if (JSON.stringify(props.updatedSearchCriteria) !== JSON.stringify(state.updatedSearchCriteria) || !state.updateSimpleSearchCriteria) {
                tempCriteriaChanged = true
                updatedSearchCriteria = props.updatedSearchCriteria
                updateSimpleSearchCriteria = true
            } else {
                tempCriteriaChanged = false
            }
        } else {
            if (props.searchType === 2) {
                if (JSON.stringify(props.updatedSearchCriteria) !== JSON.stringify(state.updatedSearchCriteria) || !state.updateAdvanceSearchCriteria) {
                    updatedSearchCriteria = props.updatedSearchCriteria
                    updateAdvanceSearchCriteria = true
                    tempCriteriaChanged = true
                } else {
                    tempCriteriaChanged = false
                }
            } else {
                if (props.searchType === 4) {
                    if (JSON.stringify(props.updatedSearchCriteria) !== JSON.stringify(state.updatedSearchCriteria) || !state.updateSavedSearchCriteria) {
                        updatedSearchCriteria = props.updatedSearchCriteria
                        updateSavedSearchCriteria = true
                        tempCriteriaChanged = true
                    } else {
                        tempCriteriaChanged = false
                    }
                } else {
                    if (props.searchType === 5) {
                        if (JSON.stringify(props.updatedSearchCriteria) !== JSON.stringify(state.updatedSearchCriteria) || !state.updateSmartSearchCriteria) {
                            updatedSearchCriteria = props.updatedSearchCriteria
                            updateSmartSearchCriteria = true
                            tempCriteriaChanged = true
                        } else {
                            tempCriteriaChanged = false
                        }
                    }
                }
            }
        }
        if (!props.filterAggregations && (labelFilterData || typeFilterData || employeesFilterData)) {
            labelFilterData = null;
            typeFilterData = null;
            employeesFilterData = null;

        }
        return {
            criteriaChanged: tempCriteriaChanged,
            updatedSearchCriteria,
            updateSimpleSearchCriteria,
            updateAdvanceSearchCriteria,
            updateSavedSearchCriteria,
            updateSmartSearchCriteria,
            labelFilterData,
            typeFilterData,
            employeesFilterData
        }
    }

    insertLabelInsideSearchCriteria = (labels, dataSimpleSearchCriteria, index) => {
        const { simpleSearch, legalHoldAutoLabels, globalAutoLabels } = this.props;
        let policyData = (legalHoldAutoLabels && legalHoldAutoLabels.legnth > 0 ? legalHoldAutoLabels : (simpleSearch && simpleSearch.LabelType && simpleSearch.LabelType.length > 0 ? simpleSearch.LabelType : globalAutoLabels && globalAutoLabels.length > 0 ? globalAutoLabels : []));
        if ((labels || []).length > 0) {
            try {
                let child
                labels.forEach((title, i) => {
                    if (title.split("-") && title.split("-").length >= 2) {
                        const policyId = title.split("-") && title.split("-")[0] && !isNaN(title.split("-")[0]) && Number(title.split("-")[0]);
                        const labelId = title.split("-") && title.split("-")[1] && !isNaN(title.split("-")[1]) && Number(title.split("-")[1]);
                        let policy = String(policyId) && policyData && policyData.length && policyData.filter(policy => !isNaN(policy.FILTER_ID) && Number(policy.FILTER_ID) === policyId);
                        policy = policy && policy.length && policy[0];
                        let labelIndex = policy && policy.LABEL_ID && String(labelId) && policy.LABEL_ID.split(",") && policy.LABEL_ID.split(",").indexOf(String(labelId))
                        let labelName = policy && policy.LABEL_NAME && String(labelIndex) && policy.LABEL_NAME.split(",") && policy.LABEL_NAME.split(",")[labelIndex]
                        let color = policy && policy.COLOR_CODE && policy.COLOR_CODE.split(",") && policy.COLOR_CODE.split(",")[0];
                        child = {
                            title: <div style={{ backgroundColor: `${color}`, ...style.labelDropdownStyle }}>
                                <Icon type="global" style={{ ...style.labelDropdownStyle }} />{labelName}</div>
                        }
                        dataSimpleSearchCriteria[index].children.push(child)
                    }
                })
            } catch (e) {
                ApiInfo.DEBUGER && console.log(e)
            }
        } else {
            try {
                let child = {
                    title: "Any label",
                    key: "4"
                }
                dataSimpleSearchCriteria[index].children.push(child)
            } catch (e) {
                ApiInfo.DEBUGER && console.log("error", e)
            }
        }


    }


    genrateTreeData = (data) => {
        const { formatMessage, searchType, searchTypeTree } = this.props;
        // const { dataSimpleSearchCriteria } = this.state;
        if (searchType === 1 || (searchType === 4 && searchTypeTree === "S")) {
            // try {
            //     if (data.filterType && data.employee && data.toDate && data.fromDate) {
            //         data.Select_Type = data.filterType
            //         data.Select_Employees = data.employee
            //         data.Select_Labels = data.labelType
            //         data.to = (moment(data.to) === "Invalid date" ? data.to : moment(data.to))
            //         data.from = (moment(data.from) === "Invalid date" ? data.from : moment(data.from))
            //     }
            // } catch (e) { ApiInfo.DEBUGER && console.log("error", e) }
            // try {
            //     if (data.filterType && data.employee && data.toDate && data.fromDate) {
            //         data.Select_Type = data.filterType
            //         data.Select_Employees = data.employee
            //         data.to = (moment(data.to) === "Invalid date" ? data.to : moment(data.to))
            //         data.from =  (moment(data.from) === "Invalid date" ? data.from : moment(data.from))
            //     }
            // } catch (e) { ApiInfo.DEBUGER && console.log("error", e) }

            let dataSimpleSearchCriteria = [
                { title: formatMessage(messages["Keyword"]), key: '0', children: [] },
                { title: formatMessage(messages["Date Range"]), key: '1', children: [] },
                { title: formatMessage(messages["Employees"]), key: '2', children: [] },
                { title: formatMessage(messages["Types"]), key: '3', children: [] },
                { title: formatMessage(messages["Labels"]), key: '4', children: [] },
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
                    ApiInfo.DEBUGER && console.log("error", e)
                }
            } else {
                let newSearch = {
                    title: "---",
                    key: "0"
                }
                dataSimpleSearchCriteria[0].children.push(newSearch)
            }
            let from = data.from || data.fromDate
            let to = data.to || data.toDate
            from = from ? (from.format ? from.format("DD-MMM-YYYY") : moment(from).format("DD-MMM-YYYY")) : undefined
            to = to ? (to.format ? to.format("DD-MMM-YYYY") : moment(to).format("DD-MMM-YYYY")) : undefined

            let dateRangeFrom = {
                title: `${formatMessage(messages["From:"])} ${from ? from : formatMessage(messages["Any Date"])}`,
            }

            let dateRangeTo = {
                title: `${formatMessage(messages["To:"])} ${to ? to : formatMessage(messages["Any Date"])}`,
            }

            dataSimpleSearchCriteria && dataSimpleSearchCriteria[1].children.push(dateRangeFrom)
            dataSimpleSearchCriteria && dataSimpleSearchCriteria[1].children.push(dateRangeTo)
            let Select_Employees = data.Select_Employees || data.employee
            if (Select_Employees && Select_Employees.length > 0 && Array.isArray(Select_Employees)) {
                Select_Employees.forEach((employ, index) => {
                    let emp = employ && employ.split(",")
                    let empName = emp[1] || ""
                    let empMail = emp[0] || ""
                    let child = {
                        title: empName,
                        desc: empMail
                    }
                    try {
                        dataSimpleSearchCriteria[2].children.push(child)
                    } catch (e) { ApiInfo.DEBUGER && console.log(e) }
                })
            } else {
                let child = {
                    title: "Any Employee",
                    key: "2"
                }
                try {
                    dataSimpleSearchCriteria[2].children.push(child)
                } catch (e) {
                    ApiInfo.DEBUGER && console.log("error", e)
                }
            }
            let Select_Type = data.Select_Type || data.filterType
            if (Select_Type && Select_Type.length > 0 && Array.isArray(Select_Type)) {
                Select_Type.forEach((labelType, index) => {
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

            //This function Generate the Label Inside the Search Criteria
            this.insertLabelInsideSearchCriteria(data.labelName, dataSimpleSearchCriteria, 4)
            this.setState({ dataSimpleSearchCriteria })
        }
        else if (searchType === 3 || (searchType === 4 && searchTypeTree === "Q")) {
            let queryBody;
            let dataQueryBuilderSearchCriteria = [
                { title: "Types", key: "0", children: [] },
                { title: "Query", key: "1", children: [] },
            ]
            try {
                queryBody = JSON.parse(data.body);
            } catch (e) {
                ApiInfo.DEBUGER && console.log("Error", e)
            }
            if (data.filterType && data.filterType.length) {
                data.filterType.forEach((type, index) => {
                    let child = {
                        title: type,
                        key: type
                    }
                    try {
                        dataQueryBuilderSearchCriteria[0].children.push(child)
                    } catch (e) {
                        ApiInfo.DEBUGER && console.log("error", e)
                    }
                })
            }
            else {
                let child = {
                    title: "Any Type",
                    key: "0"
                }
                try {
                    dataQueryBuilderSearchCriteria[0].children.push(child)
                } catch (e) {
                    ApiInfo.DEBUGER && console.log("error", e)
                }
            }

            if (data.body) {
                // let metaData = data.displaymetadataQuary.replace("+", " Contains ")
                // metaData = metaData.replace("-", " Does not Contain ")

                let child = {
                    title: JSON.stringify(queryBody, undefined, 2),
                    key: data.body
                }
                ApiInfo.DEBUGER && console.log(child)
                try {
                    dataQueryBuilderSearchCriteria[1].children.push(child)
                } catch (e) {
                    ApiInfo.DEBUGER && console.log(e)
                }
            } else {
                let child = {
                    title: "---",
                    key: "1"
                }
                try {
                    dataQueryBuilderSearchCriteria[1].children.push(child)
                } catch (e) {
                    ApiInfo.DEBUGER && console.log(e)
                }
            }

            this.setState({
                dataQueryBuilderSearchCriteria
            })
        }

        else {
            if (searchType === 2 || (searchType === 4 && searchTypeTree === "A")) {
                let advanceSearchCriteria = [
                    { title: "Date", key: "0", children: [] },
                    { title: "Types", key: "1", children: [] },
                    { title: "labels", key: "2", children: [] },
                    { title: "May Contain", key: "3", children: [] },
                    { title: "Must Contain", key: "4", children: [] },
                    { title: "Dose Not Contain", key: "5", children: [] },
                    { title: "Metadata Search", key: "6", children: [] },
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
                    } catch (e) { ApiInfo.DEBUGER && console.log(e) }

                } else {
                    let dateType = {
                        title: `${dateLabel}${date}`,
                        key: `${dateLabel}${date}`
                    }
                    try {
                        advanceSearchCriteria[0].children.push(dateType)
                    } catch (e) { ApiInfo.DEBUGER && console.log(e) }
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
                            ApiInfo.DEBUGER && console.log(e)
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

                //This function make the Label in the Advance Searchx Criteria
                this.insertLabelInsideSearchCriteria(data.labelName, advanceSearchCriteria, 2)

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
                        advanceSearchCriteria[3].children.push(anyFieldCriteria)
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
                            advanceSearchCriteria[3].children.push(child)
                        } catch (e) {
                            ApiInfo.DEBUGER && console.log(e)
                        }
                    })
                }
                else {
                    let child = {
                        title: "Any Terms",
                        key: "3"
                    }
                    try {
                        advanceSearchCriteria[3].children.push(child)
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
                        advanceSearchCriteria[4].children.push(allFieldCriteria)
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
                            advanceSearchCriteria[4].children.push(child)
                        } catch (e) {
                            ApiInfo.DEBUGER && console.log(e)
                        }
                    })
                }
                else {
                    let child = {
                        title: "All Terms",
                        key: "4"
                    }
                    try {
                        advanceSearchCriteria[4].children.push(child)
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
                    advanceSearchCriteria[5].children.push(noneFieldCriteria)
                }
                if (data.noneTerms && Array.isArray(data.noneTerms) && data.noneTerms.length > 0) {
                    data.noneTerms.forEach((term, index) => {
                        let child = {
                            title: term,
                            key: index
                        }
                        try {
                            advanceSearchCriteria[5].children.push(child)
                        } catch (e) {
                            ApiInfo.DEBUGER && console.log(e)
                        }
                    })
                }
                else {
                    let child = {
                        title: "None Terms",
                        key: "5"
                    }
                    try {
                        advanceSearchCriteria[5].children.push(child)
                    } catch (e) {
                        ApiInfo.DEBUGER && console.log(e)
                    }
                }


                if (data.displaymetadataQuary || data.Metadata) {
                    let metaData = (data.displaymetadataQuary && data.displaymetadataQuary.replace("+", " Contains ")) || (data.Metadata && data.Metadata.replace("+", " Contains "))
                    metaData = metaData.replace("-", " Does not Contain ")
                    let child = {
                        title: metaData,
                        key: "Metadata"
                    }
                    try {
                        advanceSearchCriteria[6].children.push(child)
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
                        advanceSearchCriteria[6].children.push(child)
                    } catch (e) {
                        ApiInfo.DEBUGER && console.log(e)
                    }
                }
                this.setState({
                    advanceSearchCriteria
                })
            } else {
                if (searchType === 5 || (searchType === 4 && searchTypeTree === "SS")) {
                    let dataSmartSearchCriteria = [
                        { title: formatMessage(messages["Keyword"]), key: '0', children: [] },
                    ]
                    if (data.query) {
                        let newSearch = {
                            title: data.query,
                            key: "0"
                        }
                        try {
                            dataSmartSearchCriteria[0].children.push(newSearch)
                        }
                        catch (e) {
                            ApiInfo.DEBUGER && console.log("error", e)
                        }
                    } else {
                        let newSearch = {
                            title: "---",
                            key: "0"
                        }
                        dataSmartSearchCriteria[0].children.push(newSearch)
                    }
                    this.setState({
                        dataSmartSearchCriteria
                    })
                }
            }
        }
    }


    openAvancedSearch = () => {
        this.props.moveToAdvanceSearch && this.props.moveToAdvanceSearch(true)
        this.props.openAdvanceSearchDrawer && this.props.openAdvanceSearchDrawer()
    }

    menu = () => (
        <Menu >
            <Menu.Item key="1" onClick={() => this.props.moveToSearch && this.props.moveToSearch(true)}>
                <img src={searchOrangeIcon} title="Simple Search" style={{ cursor: "pointer", opacity: 1, marginRight: 5 }} alt={"button"} width={26} height={26} />
                Simple Search
          </Menu.Item>

            <Menu.Item key="2" onClick={() => this.openAvancedSearch()}>
                <img src={advanceSearchIcon} title="Advance Search" style={{ cursor: "pointer", opacity: 1, marginRight: 5 }} alt={"button"} width={26} height={26} />
                Advanced Search
          </Menu.Item>

            <Menu.Item key="3" onClick={() => this.props.moveToQueryBuilder && this.props.moveToQueryBuilder(true)}>
                <img src={queryBuilderIcon} title="Query Builder" style={{ cursor: "pointer", opacity: 1, marginRight: 5 }} alt={"button"} width={26} height={26} />
                Query Builder
          </Menu.Item>

            <Menu.Item key="4" onClick={() => this.props.moveToSaveSearch && this.props.moveToSaveSearch(true)}>
                <img src={saveSearchIcon} title="Saved Search" style={{ cursor: "pointer", opacity: 1, marginRight: 5 }} alt={"button"} width={26} height={26} />
                Saved Search
          </Menu.Item>
            <Menu.Item key="5" onClick={() => this.props.moveToSmartSearch && this.props.moveToSmartSearch(true)}>
                <img src={smartSearchIcon} title="Saved Search" style={{ cursor: "pointer", opacity: 1, marginRight: 5 }} alt={"button"} width={26} height={26} />
                Smart Search
          </Menu.Item>
        </Menu>
    );
    renderTreeNodesAdvanceSearch = data => data && data.map((item, index) => {
        if (item.children) {
            return (
                <TreeNode
                    selectable={false}
                    key={item.key}
                    title={<Paragraph >
                        <Text style={{ textOverflow: "scroll" }}>{item.title}</Text>
                    </Paragraph>} icon={item.icon ?
                        <Icon type={item.icon} /> : false} checkable={false} isLeaf={false} disabled={item.disabled || false} dataRef={item}>
                    {this.renderTreeNodesAdvanceSearch(item.children)}
                </TreeNode>
            );
        }
        return <TreeNode
            selectable={false}
            key={item.key}
            title={<Paragraph title={item.title} >
                <Text style={item.color ?
                    { backgroundColor: item.color, color: "#fff" } :
                    { color: "inherit", display: "flex", whiteSpace: "pre-wrap", overflowY: 'auto', maxHeight: ' 150px', wordBreak: 'break-word' }} >
                    {item.title}</Text></Paragraph>} checkable={false} dataRef={item} />;
    })
    renderTreeNodesSearchCriteria = data => data && data.map((item, index) => {
        if (item.children) {
            return (
                <TreeNode
                    selectable={false}
                    key={item.key}
                    title={<Paragraph style={{ overflowY: "auto", width: "inherit" }} >
                        <Text style={{ fontSize: 12, wordBreak: 'break-all' }}>{item.title}</Text></Paragraph>} icon={item.icon ? <Icon type={item.icon} /> : false} checkable={false} isLeaf={false} disabled={item.disabled || false} dataRef={item}>
                    {this.renderTreeNodesSearchCriteria(item.children)}
                </TreeNode>
            )
        }
        if (item.desc) {
            return <TreeNode
                key={index}
                selectable={false}
                title={
                    <div style={{ overflowY: "auto" }}
                        title={item.desc !== "null" ?
                            `${item.title} (${item.desc})` : item.title} >
                        <p style={item.color ?
                            { backgroundColor: item.color, color: "#fff", fontSize: 12, marginBottom: 0, paddingBottom: 0 } :
                            { color: "inherit", display: "flex", flexDirection: "row", wordBreak: 'break-all', fontSize: 14, marginBottom: 0, paddingBottom: 0 }}
                        >
                            {item.desc === "null" ?
                                (item.title && item.title.length > 23 ?
                                    item.title.slice(0, 23) + "..." : item.title) :
                                (`${item.title} (${item.desc})`.length > 23 ? `${item.title} (${item.desc})`.slice(0, 23) + "..." : `${item.title} (${item.desc})`)}
                        </p>
                        {/* {item.desc !== "null" && <span style={{ marginTop: 0, paddingTop: 0, marginBottom: 10 }}>{item.desc}</span>} */}
                    </div>}
                checkable={false}
                dataRef={item}
            />;
        }
        return <TreeNode key={index} selectable={false} title={<Paragraph style={{ overflowY: "auto" }} title={item.title} ><Text style={item.color ? { backgroundColor: item.color, color: "#fff", fontSize: 12, } : { color: "inherit", display: "flex", flexDirection: "row", wordBreak: 'break-all', fontSize: 12, }} >{item.title && item.title.length > 23 ? item.title.slice(0, 23) + "..." : item.title}</Text></Paragraph>} checkable={false} dataRef={item} />;
    })

    generateEmployeesFilterTreeData = (data) => {
        const { employeeFrom, employeeTo, employeesFilterData } = this.state;
        let treeData = (employeesFilterData && [...employeesFilterData.slice(0, employeesFilterData.length - 1)]) || [];
        data && data.length > 0 && data.slice(Number(employeeFrom), Number(employeeTo)).forEach(val => {
            let name = val.key && val.key.split(' ');
            let nameInitials = name && name.length !== 1 ? name.map((val, ind) => ind < 2 && val[0]) : name.map(val => val[0] + val[1])
            treeData.push({
                title: `${val.key} (${val.doc_count})`,
                value: val.key,
                key: val.key,
                checkable: false,
                icon: <Avatar style={{
                    backgroundColor: color.Orange, width: 20, height: 20, fontSize: 13,
                    display: 'flex', justifyContent: "center", alignItems: "center"
                }}>
                    {nameInitials && nameInitials.map(val => val && val.toUpperCase())}
                </Avatar>,
                // docCount: val.doc_count
            })
        });
        this.setState({
            employeesFilterData: treeData
        })
    }

    generateSelectEmployeesTreeData = (data, variable) => {
        if (!this.state[variable]) {
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
    }

    generateFilterSelectTypesTreeData = (data, variable) => {
        if (!this.state[variable]) {
            let treeData = []
            data && data.length > 0 && data.forEach((val, ind) => {
                let icon = val.key === "bloomberg" ?
                    Bloomberg : val.key === "symphony" ? Symphony :
                        val.key === "reuters" ?
                            Reuters : val.key === "msteams" ?
                                MSTeams : val.key === "yammer" ? Yammer : val.key === "sharepoint" ? SharePoint : val.key === "ews" || val.key === "eml" || val.key === "exchange" ? Exchange : val.key === "onedrive" ? OneDrive : val.key === "slack" ? Slack : null

                treeData.push({
                    title: `${val.key} (${val.doc_count})`,
                    value: val.key,
                    key: ind,
                    icon: <img src={icon} style={{ marginRight: 10 }} alt="" width="20px" height="20px" />,
                    docCount: val.doc_count
                })
            })
            this.setState({
                [variable]: treeData
            });
        }
    }

    generateSelectTypesTreeData = (data, variable) => {
        if (!this.state[variable]) {
            let treeData = []
            data && data.length > 0 && data.forEach((val, ind) => {
                let icon = val.FilterTypeName === "bloomberg" ?
                    Bloomberg : val.FilterTypeName === "symphony" ? Symphony :
                        val.FilterTypeName === "reuters" ?
                            Reuters : val.FilterTypeName === "msteams" ?
                                MSTeams : val.FilterTypeName === "yammer" ? Yammer : val.FilterTypeName === "sharepoint" ? SharePoint : val.FilterTypeName === "ews" || val.FilterTypeName === "eml" || val.FilterTypeName === "exchange" ? Exchange : val.FilterTypeName === "onedrive" ? OneDrive : val.FilterTypeName === "slack" ? Slack : null

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
        // this.props.getTreeDataGlobalLabel()
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
                docCount: val.doc_count,
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

    setTitleAndValue = (labelsData, treeData) => {
        labelsData.LABEL_NAME && labelsData.LABEL_NAME.split(",").forEach((el, i) => {
            let labelId = labelsData.LABEL_ID.split(",")
            treeData.push({
                title: <span
                    style={{
                        backgroundColor: labelsData.COLOR_CODE.split(',')[0],
                        ...style.labelDropdownStyle
                    }}>
                    <Icon
                        type={`${labelsData.FILTER_TYPE.includes('G') ? "global" : "folder"}`}
                        style={{ marginRight: 10 }} />
                    <Text style={{ color: '#fff' }}>{el}</Text>
                </span>,
                value: `${labelsData.FILTER_ID}-${labelId[i]}`,
                key: labelId[i],
                filter: el,
            })
        })
        return treeData;
    }

    generateTreeForLabel = (data, variable) => {
        let treeData = []
        if (!this.state[variable]) {
            data && data.length > 0 && data.forEach(val => {
                if (!this.props.legalCase) (val.FILTER_TYPE && val.FILTER_TYPE.includes('G')) && this.setTitleAndValue(val, treeData)

                //This will return Legal and global both
                // else if (val.FILTER_TYPE === 'L' || val.FILTER_TYPE === 'G') this.setTitleAndValue(val, treeData)
            })
            this.setState({
                [variable]: treeData
            })

            this.props.getTreeDataGlobalLabel(treeData)
        }
    }

    generateTreeForFilterLabel = (data, variable) => {
        let treeData = []
        if (!this.state[variable]) {
            data && data.length > 0 && data.forEach(el => {
                const { simpleSearch, legalHoldAutoLabels, globalAutoLabels } = this.props;
                let policyData = (legalHoldAutoLabels && legalHoldAutoLabels.legnth > 0 ? legalHoldAutoLabels : (simpleSearch && simpleSearch.LabelType && simpleSearch.LabelType.length > 0 ? simpleSearch.LabelType : globalAutoLabels && globalAutoLabels.length > 0 ? globalAutoLabels : []))
                const policyId = el.key && el.key.split("-") && el.key.split("-")[0] && !isNaN(el.key.split("-")[0]) && Number(el.key.split("-")[0]);
                const labelId = el.key.split("-") && el.key.split("-")[1] && !isNaN(el.key.split("-")[1]) && Number(el.key.split("-")[1]);
                let policy = String(policyId) && policyData && policyData.filter(policy => !isNaN(policy.FILTER_ID) && Number(policy.FILTER_ID) === policyId);
                policy = policy && policy.length && policy[0];
                let labelIndex = policy && policy.LABEL_ID && String(labelId) && policy.LABEL_ID.split(",") && policy.LABEL_ID.split(",").indexOf(String(labelId))
                let labelName = policy && policy.LABEL_NAME && String(labelIndex) && policy.LABEL_NAME.split(",") && policy.LABEL_NAME.split(",")[labelIndex]
                let color = policy && policy.COLOR_CODE && policy.COLOR_CODE.split(",") && policy.COLOR_CODE.split(",")[0];
                let labelType = policy && policy.FILTER_TYPE;
                if (labelType && labelType === "G") {
                    treeData.push({
                        title: <span
                            style={{
                                backgroundColor: color,
                                ...style.labelDropdownStyle
                            }}>
                            <Icon
                                type={"global"}
                                style={{ marginRight: 10 }} />
                            <Text style={{ color: '#fff' }}>{labelName} ({el.doc_count})</Text>
                        </span>,
                        value: `${policyId}-${labelId}`,
                        key: labelId,
                        docCount: el.doc_count
                    })
                }

            })
            let sortedTreeObject = groupLabelsByPolicyID(treeData, 'value') //sending value i.e. policyId-labelId to the function
            let sortedTree = [];
            for (let Id of Object.keys(sortedTreeObject)) {
                sortedTree.push(...sortedTreeObject[Id]);
            }
            this.setState({
                [variable]: [{
                    title: <span
                        style={{
                            backgroundColor: '#000',
                            ...style.labelDropdownStyle
                        }}>
                        {/* <Icon
                    type={`${labelsData.FILTER_TYPE.includes('G') ? "global" : "folder"}`}
                    style={{ marginRight: 10 }} /> */}
                        <Text style={{ color: '#fff' }}>Not Labeled</Text>
                    </span>,
                    value: "-*",
                    key: "Not Labeled"
                }, ...sortedTree]
            })

            variable !== "labelFilterData" && this.props.getTreeDataGlobalLabel(sortedTree)
        }
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

    moveToSearch = () => {
        this.props.moveToSearch(false)
        this.props.filterDocuments(false)
        this.setState({
            updateCriteria: true
        })
    }

    openAdvanceSearchDrawer = () => {
        this.props.moveToAdvanceSearch()
        this.props.filterDocuments(false)
        // this.props.openAdvanceSearchDrawer(true)
    }

    renderEmployeeTypeLabelList = () => {
        const { simpleSearch } = this.props;
        const { emplyeesSelectTreeData, typesSelectTreeData, labelTypesSelectTreeData } = this.state;
        if (simpleSearch && simpleSearch.EmployeeList && simpleSearch.EmployeeList.length > 0 && !emplyeesSelectTreeData)
            this.generateSelectEmployeesTreeData(simpleSearch.EmployeeList, "emplyeesSelectTreeData")

        if (simpleSearch && simpleSearch.FilterType && simpleSearch.FilterType.length > 0 && !typesSelectTreeData) this.generateSelectTypesTreeData(simpleSearch.FilterType, "typesSelectTreeData")

        if (simpleSearch && simpleSearch.LabelType && simpleSearch.LabelType.length > 0 && !labelTypesSelectTreeData) {
            this.generateTreeForLabel(simpleSearch.LabelType, "labelTypesSelectTreeData")
        }

    }

    componentDidUpdate() {
        this.state.criteriaChanged && this.props.updatedSearchCriteria && this.genrateTreeData(this.props.updatedSearchCriteria)
        this.props.simpleSearch && this.renderEmployeeTypeLabelList()
        this.props.filterAggregations && this.renderFilterList();
        (!this.props.simplesearchresult || !this.props.simplesearchresult.length) && this.props.filterAggregations && this.props.getFilterAggeragations();
    }

    renderFilterList = () => {
        const { filterAggregations } = this.props;
        const { employeesFilterData, typeFilterData, labelFilterData } = this.state;
        if (filterAggregations && filterAggregations.employees && filterAggregations.employees.buckets.length > 0 && !employeesFilterData) {
            this.generateEmployeesFilterTreeData(filterAggregations.employees.buckets)
        }
        if (filterAggregations && filterAggregations.datasources && filterAggregations.datasources.buckets.length > 0 && !typeFilterData) this.generateFilterSelectTypesTreeData(filterAggregations.datasources.buckets, "typeFilterData")

        if (filterAggregations && filterAggregations.labels && filterAggregations.labels.buckets.length > 0 && !labelFilterData) {
            this.generateTreeForFilterLabel(filterAggregations.labels.buckets, "labelFilterData")
        }

    }


    //code for adding new employees in dropdown(important please do not remove this code)
    // addEmployee = input => {
    //     if (this.props.simpleSearch && this.props.simpleSearch.EmployeeList && Array.isArray(this.props.simpleSearch.EmployeeList)) {
    //         let found = false
    //         this.props.simpleSearch.EmployeeList.map(emp => {
    //             if (emp.MAILBOX_NAME.includes(input)) {
    //                 found = true
    //             }
    //         })
    //         if (!found) {
    //             let newEmployList = [...this.props.simpleSearch.EmployeeList, {
    //                 USER_ID: this.props.simpleSearch.EmployeeList.length.toString() + input,
    //                 USER_NAME: input,
    //                 MAILBOX_NAME: input,
    //                 DISPLAY_NAME: input
    //             }]
    //             this.props.simpleSearch.EmployeeList = newEmployList
    //             this.setState({
    //                 emplyeesSelectTreeData: undefined
    //             })
    //         }
    //     }
    // }

    clearAdvanceSearch = () => {
        this.props.updateSearchCriteria({}, 2)
        this.props.closeReadingPane()
        message.destroy()
        this.props.clearSearchedResults()
        this.props.totalSimpeSearchedDocs(null)
        this.props.postSearchData({}, true, this.props.closeReadingPane)
        this.props.resetSelectedRecords && this.props.resetSelectedRecords();
    }
    handleSmartSearchRelevancy = (e, label) => {
        this.setState({
            [label]: e.target.value
        })
    }

    onEmployeeSelect = (value, node, extra) => {
        const { employeeFrom, employeeTo } = this.state;
        const { filterAggregations } = this.props;
        if (value === "see other 100") {
            this.setState({
                employeeFrom: employeeFrom + 100,
                employeeTo: employeeTo + 100
            }, () => this.generateEmployeesFilterTreeData(filterAggregations.employees.buckets, []))
        }
    }

    render() {
        const { collapsed,/* searchType, */  collapseSideMenu, /*criteriaExist,*/ updatedSearchCriteria, formatMessage, searchType, savedSearchName } = this.props
        const { getFieldDecorator } = this.props.form;
        const { searchDropdownOpen, /*dataAdvanceSearch, dataSearchCriteria,*/ dataSimpleSearchCriteria, dataSmartSearchCriteria, /*searchedValues,*/ emplyeesSelectTreeData, typesSelectTreeData, labelTypesSelectTreeData, advanceSearchCriteria, dataQueryBuilderSearchCriteria, higherRelevancy, lowerRelevancy, maxRecordsReturned, labelFilterData, typeFilterData, employeesFilterData } = this.state;
        const { sideMenuOptions } = this.props
        const filter = sideMenuOptions && sideMenuOptions.filter
        const search = sideMenuOptions && sideMenuOptions.search
        const advSearch = sideMenuOptions && sideMenuOptions.advSearch
        const smartSearch = sideMenuOptions && sideMenuOptions.smartSearch
        const dropdown = sideMenuOptions && sideMenuOptions.dropdown
        const saveSearch = sideMenuOptions && sideMenuOptions.saveSearch
        // const queryBuilder = sideMenuOptions && sideMenuOptions.queryBuilder

        return (
            <div style={{ zIndex: 1 }}>
                <div style={collapsed ? style.emailsCollapsedSideMenuIcon : style.emailsSideMenuIcon}>
                    {collapsed ?
                        <div onClick={collapseSideMenu} style={{ cursor: "pointer", width: "100%", display: "flex", justifyContent: "center" }}>
                            <img title="Open Menu" src={rightArrow} alt={"button"} width={20} height={20} />
                        </div>
                        :
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '90%', alignItems: "center" }}>
                            <Dropdown overlay={this.menu()} trigger={["click"]} onVisibleChange={() => this.setState({ searchDropdownOpen: !searchDropdownOpen })}
                                onClick={() => this.setState({ searchDropdownOpen: !searchDropdownOpen })}
                            >
                                <div style={{ padding: '5px 10px 5px 10px' }}>
                                    <img src={searchIcon} style={{ cursor: "pointer", opacity: dropdown ? 1 : 0.5 }} alt={"button"} width={32} height={32} />
                                    <Icon type={"down"} style={{ fontSize: 12, color: "#fff", cursor: "pointer", opacity: 1, paddingTop: '5px' }} />
                                </div>
                            </Dropdown>
                            {version > 7.2 && <img src={filterIcon} alt="" title="Filter" style={{ cursor: this.props.simplesearchresult && this.props.simplesearchresult.length ? "pointer" : "not-allowed", opacity: filter ? 1 : 0.5 }} width={32} height={32} onClick={() => this.props.simplesearchresult && this.props.simplesearchresult.length && this.props.moveToFilter()} />}
                            <img src={leftArrow} title="Close Menu" style={{ cursor: "pointer" }} alt={"button"} width={20} height={20} onClick={collapseSideMenu} />
                        </div>}
                </div>
                {!collapsed &&
                    <div style={{ ...style.paddingOnSideBar }}>
                        {filter && version > 7.2 &&
                            <div style={{ ...style.sideMenuHeight }}>
                                <CollapseableHeader bgColor="#F5F7FA" heading={formatMessage(messages["FILTERS"])}>
                                    <Form layout="vertical" onSubmit={this.handleFilter} style={{ padding: "0px 10px" }}>
                                        <Form.Item label="" style={{ ...style.marginBottom0 }}>
                                            {getFieldDecorator('Filter_Labels', {
                                            })(
                                                <TreeSelect
                                                    autoClearSearchValue={false}
                                                    style={{ width: '100%', marginBottom: 30 }}
                                                    dropdownStyle={{ maxHeight: 280, overflow: 'auto', }}
                                                    treeData={labelFilterData || (this.props.simplesearchresult &&
                                                        [{
                                                            title: <span
                                                                style={{
                                                                    backgroundColor: '#000',
                                                                    ...style.labelDropdownStyle
                                                                }}>
                                                                <Text style={{ color: '#fff' }}>Not Labeled</Text>
                                                            </span>,
                                                            value: "-*",
                                                            key: 1
                                                        }]
                                                    )}
                                                    placeholder={formatMessage(messages["Global Label"])}
                                                    allowClear={true}
                                                    treeCheckable={true}
                                                    showSearch
                                                    filterTreeNode={(input, treeNode) =>
                                                        treeNode.props.filter.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                    }
                                                />)}
                                        </Form.Item>
                                        <Form.Item label="" style={{ ...style.marginBottom0 }}>
                                            {getFieldDecorator('Filter_Employees', {
                                            })(
                                                <TreeSelect
                                                    autoClearSearchValue={false}
                                                    style={{ width: '100%', marginBottom: 30 }}
                                                    searchPlaceholder={formatMessage(messages["Employees"])}
                                                    dropdownStyle={{ maxHeight: 305, overflow: 'auto', }}
                                                    treeData={employeesFilterData}
                                                    treeCheckable={true}
                                                    showSearch
                                                    onSelect={this.onEmployeeSelect}
                                                    treeIcon={true}
                                                    allowClear={true}
                                                    filterTreeNode={(input, treeNode) => {
                                                        return (
                                                            treeNode.props.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                        )
                                                    }}
                                                />)}
                                        </Form.Item>
                                        <Form.Item label="" style={{ ...style.marginBottom0 }}>
                                            {getFieldDecorator('Filter_Types', {
                                            })(
                                                <TreeSelect
                                                    style={{ width: '100%', marginBottom: 30 }}
                                                    autoClearSearchValue={false}
                                                    dropdownStyle={{ maxHeight: 305, overflow: 'auto', }}
                                                    treeData={typeFilterData}
                                                    placeholder={formatMessage(messages["Types"])}
                                                    treeCheckable={true}
                                                    showSearch
                                                    treeIcon={true}
                                                    allowClear={true}
                                                    filterTreeNode={(input, treeNode) =>
                                                        treeNode.props.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                    }
                                                />)}
                                        </Form.Item>
                                        {/* <br /> */}
                                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                            <PrimaryButton htmlType="submit" text={formatMessage(messages["_Apply"])} />
                                            <SecondryButton text={formatMessage(messages["_Clear"])} onClick={() => this.resetAllFilter()} />
                                        </div>
                                    </Form>
                                </CollapseableHeader>
                                <CollapseableHeader bgColor="#F5F7FA" heading={formatMessage(messages["SEARCH CRITERIA"])}>
                                    <div style={{ padding: "0px 10px" }}>
                                        <div>
                                            <Tree
                                                defaultExpandAll={true}
                                            >
                                                {this.renderTreeNodesSearchCriteria((searchType === 1 || this.props.searchTypeTree === 'S') ? dataSimpleSearchCriteria : (searchType === 2 || this.props.searchTypeTree === 'A') ? advanceSearchCriteria :
                                                    // (searchType === 3 || this.props.searchTypeTree === 'Q') ? dataQueryBuilderSearchCriteria : (searchType === 5 || this.props.searchTypeTree === 'SS') ? dataSmartSearchCriteria : 
                                                    [])}
                                            </Tree>
                                            {this.props.updatedSearchCriteria && this.props.simplesearchresult && <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                <PrimaryButton text={formatMessage(messages["Edit"])}
                                                    onClick={() => (searchType === 1 || this.props.searchTypeTree === 'S') ? this.moveToSearch() : (searchType === 2 || this.props.searchTypeTree === 'A') && this.openAdvanceSearchDrawer()} />
                                            </div>}
                                        </div>
                                    </div>
                                </CollapseableHeader>
                            </div>}
                        {saveSearch &&
                            <div style={{ ...style.sideMenuHeight }}>
                                <Form layout="vertical" onSubmit={this.handleSubmit}>
                                    <CollapseableHeader bgColor="#F5F7FA" heading={formatMessage(messages["SAVED SEARCH"])}>
                                        <Form.Item label="" style={{ ...style.marginBottom0 }}>
                                            {getFieldDecorator('Saved_Search', {
                                                initialValue: savedSearchName,
                                            })(
                                                <Select
                                                    showSearch
                                                    style={{ width: 'inherit', height: 40 }}
                                                    dropdownStyle={{ maxHeight: 305, overflow: 'auto' }}
                                                    placeholder={formatMessage(messages["Select a Saved Search"])}
                                                    optionFilterProp="children"
                                                    notFoundContent={(!this.props.savedSearch) && <Text>
                                                        <Spin size="small" style={{ marginRight: 15 }} />{formatMessage(messages["Fetching Saved Searches"])}</Text>}
                                                    // onFocus={() => (!this.props.savedSearch || !this.props.savedSearch.length) && this.props.fetchSavedSearchData()}
                                                    onChange={this.onChangeSavedSearchDropdown}
                                                    onBlur={this.onBlur}
                                                    // allowClear={true}
                                                    onSearch={this.onSearch}
                                                    filterOption={(input, option) =>
                                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                    }
                                                >
                                                    {this.props.savedSearch && this.props.savedSearch.map((val, index) =>
                                                        <Option value={val.SEARCH_CRITERIA_NAME} optionLabelProp={val} key={index}>{val.SEARCH_CRITERIA_NAME}</Option>
                                                    )}
                                                </Select>
                                            )}
                                        </Form.Item>
                                    </CollapseableHeader>

                                    <CollapseableHeader bgColor="#F5F7FA" heading={formatMessage(messages["SEARCH CRITERIA"])}>
                                        {Object.keys(updatedSearchCriteria).length && this.props.searchType === 4 ? <div style={{ padding: "0px 15px" }}>
                                            <div>
                                                <Tree
                                                    defaultExpandAll={true}
                                                    onSelect={this.onSelect}
                                                    onCheck={this.onCheck}
                                                    checkable={true}
                                                >
                                                    {this.renderTreeNodesSearchCriteria((searchType === 1 || this.props.searchTypeTree === 'S') ? dataSimpleSearchCriteria : (searchType === 2 || this.props.searchTypeTree === 'A') ? advanceSearchCriteria : (searchType === 3 || this.props.searchTypeTree === 'Q') ? dataQueryBuilderSearchCriteria : (searchType === 5 || this.props.searchTypeTree === 'SS') ? dataSmartSearchCriteria : [])}
                                                </Tree>
                                            </div>
                                        </div>
                                            :
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <center><Text>{formatMessage(messages["No Criteria"])}</Text></center>
                                                <br />
                                                <br />
                                            </div>}
                                    </CollapseableHeader>
                                </Form>
                            </div>}
                        {search &&
                            <div style={{ ...style.sideMenuHeight }}>
                                <CollapseableHeader bgColor="#F5F7FA" heading={formatMessage(messages["SEARCH"])}>
                                    <Form layout="vertical" onSubmit={this.handleSubmit}>
                                        <Form.Item label="" style={{ ...style.marginBottom0 }}>
                                            {getFieldDecorator('New_Search', {
                                                initialValue: updatedSearchCriteria && (updatedSearchCriteria.contentValue || updatedSearchCriteria.New_Search),
                                            })(<Input placeholder={formatMessage(messages["Search"])} width={100} allowClear={true}
                                            />)}
                                        </Form.Item>
                                        <Form.Item label="" style={{ ...style.marginBottom0 }}>
                                            <Form.Item
                                                style={{ ...style.marginBottom0 }}
                                            >
                                                {getFieldDecorator('from', {
                                                    initialValue: updatedSearchCriteria.fromDate ? moment(updatedSearchCriteria.fromDate) : null
                                                })(<DatePicker
                                                    // value={from}
                                                    //placeholder="from"
                                                    // onChange={(e, Datestring) => this.handleNewSearchChange(Datestring, "from", e)}
                                                    width={100}
                                                    placeholder={formatMessage(messages["_From"])}
                                                    format={dateFormatList}
                                                />
                                                )}
                                            </Form.Item>
                                            <Form.Item style={{ ...style.marginBottom0 }}>
                                                {getFieldDecorator('to', {
                                                    initialValue: updatedSearchCriteria.toDate ? moment(updatedSearchCriteria.toDate) : null,
                                                })(<DatePicker
                                                    // value={to}
                                                    //placeholder="to"
                                                    // onChange={(e, Datestring) => this.handleNewSearchChange(Datestring, "to", e)}
                                                    width={100}
                                                    placeholder={formatMessage(messages["_To"])}
                                                    format={dateFormatList}
                                                />)}

                                            </Form.Item>
                                        </Form.Item>

                                        <Form.Item label="" style={{ marginBottom: 0, marginTop: -8 }}>
                                            {getFieldDecorator('Select_Employees', {
                                                initialValue: updatedSearchCriteria.employee,
                                            })(
                                                <TreeSelect
                                                    autoClearSearchValue={false}
                                                    style={{ width: '100%' }}
                                                    dropdownStyle={{ maxHeight: 305, overflow: 'auto', }}
                                                    treeData={emplyeesSelectTreeData}
                                                    placeholder={formatMessage(messages["Select Employees"])}
                                                    treeCheckable={true}
                                                    showSearch
                                                    allowClear={true}
                                                    treeIcon={true}
                                                    filterTreeNode={(input, treeNode) => treeNode.props.title.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                    notFoundContent={(!this.props.simpleSearch) && <Text>
                                                        <Spin size="small" style={{ marginRight: 15 }} />{formatMessage(messages["Fetching Employees"])}
                                                    </Text>
                                                    }
                                                />
                                            )}
                                        </Form.Item>
                                        <Form.Item label="" style={{ ...style.marginBottom0 }}>
                                            {getFieldDecorator('Select_Type', {
                                                initialValue: updatedSearchCriteria.filterType,
                                            })(
                                                <TreeSelect
                                                    autoClearSearchValue={false}
                                                    style={{ width: '100%' }}
                                                    dropdownStyle={{ maxHeight: 305, overflow: 'auto' }}
                                                    treeData={typesSelectTreeData}
                                                    placeholder={formatMessage(messages["Select Types"])}
                                                    treeCheckable={true}
                                                    allowClear={true}
                                                    treeIcon
                                                    showSearch
                                                    filterTreeNode={(input, treeNode) =>
                                                        treeNode.props.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                    }
                                                    notFoundContent={(!this.props.simpleSearch) && <Text>
                                                        <Spin size="small" style={{ marginRight: 15 }} />{formatMessage(messages["Fetching Types"])}
                                                    </Text>
                                                    }
                                                />
                                            )}
                                        </Form.Item>
                                        {<Form.Item label="" style={{ ...style.marginBottom0 }}>
                                            {getFieldDecorator('Select_Labels', {
                                                initialValue: updatedSearchCriteria.labelName
                                            })(
                                                <TreeSelect
                                                    autoClearSearchValue={false}
                                                    style={{ width: '100%' }}
                                                    dropdownStyle={{ maxHeight: 305, overflow: 'auto' }}
                                                    treeData={labelTypesSelectTreeData}
                                                    placeholder={formatMessage(messages["Select Labels"])}
                                                    allowClear={true}
                                                    notFoundContent={(!this.props.simpleSearch) && <Text>
                                                        <Spin size="small" style={{ marginRight: 15 }} />Fetching Labels
                                                    </Text>}
                                                    filterTreeNode={(input, treeNode) =>
                                                        treeNode.props.filter.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                    }
                                                    treeCheckable={true}
                                                    showSearch
                                                />
                                            )}
                                        </Form.Item>}
                                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                            <PrimaryButton text={formatMessage(messages["_Search"])} htmlType="submit" />
                                            <SecondryButton text={formatMessage(messages["_Reset"])} onClick={this.handleSimpleSearchReset} />
                                        </div>
                                    </Form>
                                </CollapseableHeader>
                                <CollapseableHeader bgColor="#F5F7FA" heading={formatMessage(messages["SEARCH CRITERIA"])}>
                                    {Object.keys(updatedSearchCriteria).length && dataSimpleSearchCriteria && Array.isArray(dataSimpleSearchCriteria) && dataSimpleSearchCriteria.length > 0 && this.props.searchType === 1 ? <div style={{ padding: "0px 15px" }}>
                                        <div>
                                            <Tree
                                                defaultExpandedKeys={["0", "1", "2", "3", "4"]}
                                                defaultExpandAll={true}
                                                autoExpandParent={true}
                                            >
                                                {this.renderTreeNodesSearchCriteria(dataSimpleSearchCriteria)}
                                            </Tree>
                                        </div>
                                    </div>
                                        :
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <center><Text>{formatMessage(messages["No Criteria"])}</Text></center>
                                            <br />
                                            <br />
                                        </div>}

                                </CollapseableHeader>
                            </div>}
                        {advSearch &&
                            <div style={{ ...style.sideMenuHeight }}>
                                <CollapseableHeader bgColor="#F5F7FA" heading={formatMessage(messages["ADVANCED SEARCH CRITERIA"])}>
                                    <div style={{ padding: "0px 15px" }}>
                                        {Object.keys(updatedSearchCriteria).length && this.props.searchType === 2 ? <div>
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
                        {smartSearch &&
                            <div style={{ ...style.sideMenuHeight }}>
                                <CollapseableHeader bgColor="#F5F7FA" heading="SMART SEARCH">
                                    <Form layout="vertical" onSubmit={this.handleSmartSearchSubmit}>
                                        <Form.Item label="" style={{ ...style.marginBottom0 }}>
                                            {getFieldDecorator('Smart_Search', {
                                                initialValue: updatedSearchCriteria.query,
                                                rules: [{ required: true, message: "Please Enter Keyword" }],
                                            })(<Input onChange={(e) => this.handleSmartSearchChange(e)} onPressEnter={this.handleSmartSearchSubmit} placeholder={formatMessage(messages["Search"])} width={100} allowClear={true}
                                            // suffix={<img src={searchIconOrange} width={30} height={30} alt="search" />}
                                            />)}
                                        </Form.Item>
                                        <Form.Item style={{ ...style.marginBottom0 }}>
                                            {getFieldDecorator('relevancy')(
                                                <span style={{ display: 'flex', flexDirection: "row", alignItems: 'center' }}>
                                                    <span style={{ fontSize: 13 }}>Relevancy</span>
                                                    <Input
                                                        type="number"
                                                        min={1}
                                                        max={higherRelevancy ? Number(higherRelevancy) - 1 : 99}
                                                        style={{ marginLeft: 5, width: 63 }}
                                                        onChange={(e) => this.handleSmartSearchRelevancy(e, "lowerRelevancy")}
                                                        onPressEnter={this.handleSmartSearchSubmit}
                                                        value={lowerRelevancy}
                                                        onBlur={e => {
                                                            if (e.target.value < 1 || e.target.value === "" || e.target.value === null) {
                                                                this.setState({
                                                                    lowerRelevancy: 1
                                                                })
                                                            } else if (e.target.value > 99 || (higherRelevancy && e.target.value > Number(higherRelevancy))) {
                                                                this.setState({
                                                                    lowerRelevancy: higherRelevancy ? Number(higherRelevancy) - 1 : 99
                                                                })
                                                            }
                                                        }}
                                                    />
                                                    <span style={{ marginLeft: 4, fontSize: 13 }}>%</span>
                                                    <span style={{ marginLeft: 7, fontSize: 13 }}>to</span>
                                                    <Input
                                                        type="number"
                                                        min={lowerRelevancy ? Number(lowerRelevancy) + 1 : 2}
                                                        max={100}
                                                        style={{ marginLeft: 7, width: 63 }}
                                                        onChange={(e) => this.handleSmartSearchRelevancy(e, "higherRelevancy")}
                                                        value={higherRelevancy}
                                                        onBlur={e => {
                                                            if (e.target.value < 1 || e.target.value === "" || e.target.value === null || (lowerRelevancy && e.target.value <= Number(lowerRelevancy))) {
                                                                this.setState({
                                                                    higherRelevancy: lowerRelevancy ? Number(lowerRelevancy) + 1 : 2
                                                                })
                                                            } else if (e.target.value > 100) {
                                                                this.setState({
                                                                    higherRelevancy: 100
                                                                })
                                                            }
                                                        }}
                                                    />
                                                    <span style={{ marginLeft: 3 }}>%</span>
                                                </span>
                                            )}
                                        </Form.Item>
                                        <Form.Item label="" style={{ ...style.marginBottom0 }}>
                                            {getFieldDecorator('topN', {})(
                                                <span style={{ display: 'flex', flexDirection: "row", alignItems: 'center' }}>
                                                    <span style={{ fontSize: 13 }}>Max # of Records Returned</span>
                                                    <Input
                                                        type="number"
                                                        onChange={(e) => this.handleSmartSearchRelevancy(e, "maxRecordsReturned")}
                                                        value={maxRecordsReturned}
                                                        onBlur={e => {
                                                            // const { form } = this.props;
                                                            if (e.target.value) {
                                                                if (e.target.value < 1) {
                                                                    this.setState({
                                                                        maxRecordsReturned: 1
                                                                    })
                                                                } else {
                                                                    if (e.target.value > 10000) {
                                                                        this.setState({
                                                                            maxRecordsReturned: 10000
                                                                        })
                                                                    }
                                                                }
                                                            }
                                                        }}
                                                        min={1}
                                                        max={10000}
                                                        style={{ ...style.marginBottom0, width: 80, marginLeft: 7 }} />
                                                </span>
                                            )}
                                        </Form.Item>
                                        <Form.Item style={{ ...style.marginBottom0 }}>
                                            {getFieldDecorator('from', {
                                                // initialValue: updatedSearchCriteria.from,
                                            })(<DatePicker
                                                // onChange={(e, Datestring) => this.handleNewSearchChange(Datestring, "from", e)}
                                                width={100}
                                                placeholder={formatMessage(messages["_From"])}
                                                format={dateFormatList}
                                            />
                                            )}
                                        </Form.Item>
                                        <Form.Item style={{ ...style.marginBottom0 }}>
                                            {getFieldDecorator('to', {
                                                // initialValue: updatedSearchCriteria.to,
                                            })(<DatePicker
                                                // onChange={(e, Datestring) => this.handleNewSearchChange(Datestring, "to", e)}
                                                width={100}
                                                placeholder={formatMessage(messages["_To"])}
                                                format={dateFormatList}
                                            />)}
                                        </Form.Item>
                                        <Form.Item label="" style={{ ...style.marginBottom0 }}>
                                            {getFieldDecorator('Smart_Select_Employees', {
                                                // initialValue: updatedSearchCriteria.Select_Employees,
                                            })(
                                                <TreeSelect
                                                    autoClearSearchValue={false}
                                                    style={{ width: '100%' }}
                                                    dropdownStyle={{ maxHeight: 305, overflow: 'auto', }}
                                                    treeData={emplyeesSelectTreeData}
                                                    placeholder={formatMessage(messages["Select Employees"])}
                                                    treeCheckable={true}
                                                    showSearch
                                                    allowClear={true}
                                                    treeIcon={true}
                                                    filterTreeNode={(input, treeNode) => treeNode.props.title.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                    notFoundContent={(!this.props.simpleSearch) && <Text>
                                                        <Spin size="small" style={{ marginRight: 15 }} />{formatMessage(messages["Fetching Employees"])}
                                                    </Text>
                                                    }
                                                />
                                            )}
                                        </Form.Item>
                                        <Form.Item label="" style={{ ...style.marginBottom0 }}>
                                            {getFieldDecorator('Smart_Select_Type', {
                                                // initialValue: updatedSearchCriteria.Select_Type,
                                            })(
                                                <TreeSelect
                                                    autoClearSearchValue={false}
                                                    style={{ width: '100%' }}
                                                    dropdownStyle={{ maxHeight: 305, overflow: 'auto' }}
                                                    treeData={typesSelectTreeData}
                                                    placeholder={formatMessage(messages["Select Types"])}
                                                    treeCheckable={true}
                                                    allowClear={true}
                                                    treeIcon
                                                    showSearch
                                                    filterTreeNode={(input, treeNode) =>
                                                        treeNode.props.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                    }
                                                    notFoundContent={(!this.props.simpleSearch) && <Text>
                                                        <Spin size="small" style={{ marginRight: 15 }} />{formatMessage(messages["Fetching Types"])}
                                                    </Text>
                                                    }
                                                />
                                            )}
                                        </Form.Item>
                                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                            <PrimaryButton text={formatMessage(messages["_Search"])} htmlType="submit" />
                                            <SecondryButton text={formatMessage(messages["_Reset"])} onClick={this.handleSmartSearchReset} />
                                        </div>
                                    </Form>
                                </CollapseableHeader>

                                <CollapseableHeader bgColor="#F5F7FA" heading={"SMART SEARCH CRITERIA"}>
                                    {Object.keys(updatedSearchCriteria).length && dataSmartSearchCriteria && Array.isArray(dataSmartSearchCriteria) && dataSmartSearchCriteria.length > 0 && this.props.searchType === 5 ? <div style={{ padding: "0px 15px" }}>
                                        <div>
                                            <Tree
                                                defaultExpandedKeys={["0"]}
                                                // expandedKeys={['Keyword','Date Range','Employees','Types','Labels']}     
                                                // defaultExpandAll={true}
                                                autoExpandParent={true}
                                            // checkable={true}
                                            >
                                                {this.renderTreeNodesSearchCriteria(dataSmartSearchCriteria)}
                                            </Tree>
                                        </div>
                                    </div>
                                        :
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <center><Text>{formatMessage(messages["No Criteria"])}</Text></center>
                                            <br />
                                            <br />
                                        </div>}

                                </CollapseableHeader>
                            </div>}
                    </div>}
            </div>

        )
    }
}

const SearchArchiveSideBarForm = Form.create('SearchArchiveForm')(SearchArchive);

const mapStateToProps = state => {
    return {
        simpleSearch: state.SimpleSearchReducer.simpleSearch,
        legalHoldAutoLabels: state.AutoLabelingReducer.legalHoldAutoLabels,
        globalAutoLabels: state.AutoLabelingReducer.globalAutoLabels,
        loaded: state.SimpleSearchReducer.loaded,
        savedSearch: state.SimpleSearchReducer.savedSearch,
        smartSearchAccessToken: state.SimpleSearchReducer.smartSearchAccessToken,
        updatedSearchCriteria: state.UpdateSearchCriteriaReducer.updatedSearchCriteria,
        searchType: state.UpdateSearchCriteriaReducer.searchType,
        searchTypeTree: state.UpdateSearchCriteriaReducer.searchTypeTree,
        savedSearchName: state.UpdateSearchCriteriaReducer.savedSearchName,
        simplesearchresult: state.SimpleSearchReducer.simplesearchresult,
        filterAggregations: state.SimpleSearchReducer.filterAggregations,
        searchDatatablePageSize: state.UpdateDataTablePageSizeTypes.searchDatatablePageSize,
        licenseInformation: state.ControlCenterReducer.licenseInformation,
        treeDataOfGlobalLabel: state.AutoLabelingReducer.treeDataOfGlobalLabel
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchSimpleSearch: (labelType, funcToDispatch) => dispatch(fetchSimpleSearch(labelType, funcToDispatch)),
        getFilterAggeragations: data => dispatch(getFilterAggeragations(data)),
        getSimpleSearchResult: (data) => dispatch(getSimpleSearchResult(data)),
        postSearchData: (data, cancelRequest, closeReadingPane) => dispatch(postSearchData(data, cancelRequest, closeReadingPane)),
        smartSearch: (data, cancelRequest, accessToken) => dispatch(smartSearch(data, cancelRequest, accessToken)),
        fetchSavedSearchData: () => dispatch(fetchSavedSearchData()),
        updateSearchCriteria: (searchedData, searchType, searchTypeTree) => dispatch(updateSearchCriteria(searchedData, searchType, searchTypeTree)),
        clearSearchedResults: () => dispatch(clearSearchedResults()),
        errorMessage: () => dispatch(errorMessage("searchArchiveGETError", true)),
        filterDocuments: filter => dispatch(filterDocuments(filter)),
        totalSimpeSearchedDocs: searchedDataLength => dispatch(totalSimpeSearchedDocs(searchedDataLength)),
        resetSelectedRecords: () => dispatch(resetSelectedRecords()),
        queryBuilderSearchData: (data, cancelRequest) => dispatch(queryBuilderSearchData(data, cancelRequest)),
        postAdvancedSearch: (data) => dispatch(postAdvancedSearch(data)),
        fetchLicenseInformation: (noMessage, fetchLicenseforSmartSearch, APIbody, smartSearchAccessToken, cancelRequest) => dispatch(fetchLicenseInformation(noMessage, fetchLicenseforSmartSearch, APIbody, smartSearchAccessToken, cancelRequest)),
        getTreeDataGlobalLabel: treeData => dispatch(getTreeDataGlobalLabel(treeData)),
        fetchAutoLabels: labelType => dispatch(fetchAutoLabels(labelType)),
        getSimpleSearch: simpleSearchDropDownData => dispatch(getSimpleSearch(simpleSearchDropDownData)),
        filterSearchResultSet: (APIBody, cancelRequest, searchType, searchTypeTree) => dispatch(filterSearchResultSet(APIBody, cancelRequest, searchType, searchTypeTree))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchArchiveSideBarForm);
