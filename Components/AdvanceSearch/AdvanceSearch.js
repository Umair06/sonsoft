import React, { Component } from "react";
import { Typography, Form, Select, Checkbox, Drawer, Row, Col, TreeSelect, Spin, message } from 'antd';
import style from "../../styles";
import theme from "../../Assets/Theme/Theme"
import CollapseableHeader from '../CollapseAbleHeader/CollapseAbleHeader';
import searchIconOrange from '../../Assets/icons/SV_ICONS/AdvancedSearch_Orange.png';
import addIconOrange from '../../Assets/icons/SV_ICONS/Orange-Add.png';
import deleteIconOrange from '../../Assets/icons/SV_ICONS/Orange Delete.png';
import { PrimaryButton, SecondryButton } from "../Button/Button"
import { connect } from "react-redux";
import { postAdvancedSearch, AdvancedSearchQueryBuilder, fetchAdvanceSearchTypeList } from "../../Redux/Actions/AdvancedSearchAction/AdvancedSearchAction"
import { fetchSimpleSearch, clearSearchedResults, totalSimpeSearchedDocs } from "../../Redux/Actions/SimpleSearchAction/SimpleSearchAction";
import { updateSearchCriteria, updateSearchCriteria_MYARCHIVEDEMAILS } from "../../Redux/Actions/UpdateSearchCriteriaAction/UpdateSearchCriteriaAction";
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
// import { DropTarget } from "react-dnd";
import * as ApiInfo from "../../APIConfig/ApiParameters";
import moment from "moment";



const messages = defineMessages({
    'Please Write field': {
        id: "AdvanceSearch.PleaseWritefield",
        defaultMessage: "Please Write field",
    },
    'Field': {
        id: "AdvanceSearch.Field",
        defaultMessage: "Field"
    },
    'Recently Used': {
        id: "AdvanceSearch.RecentlyUsed",
        defaultMessage: "Recently Used"
    },
    'to': {
        id: "AdvanceSearch.To",
        defaultMessage: "to"
    },
    'from': {
        id: "AdvanceSearch.EmailFrom",
        defaultMessage: "from"
    },
    'Documents': {
        id: "AdvanceSearch.Documents",
        defaultMessage: "Documents"
    },
    'Author': {
        id: "AdvanceSearch.Author",
        defaultMessage: "Author",
    },
    'Comment/Description': {
        id: "AdvanceSearch.CommentOrDescription",
        defaultMessage: "Comment/Description"
    },
    'Content type': {
        id: "AdvanceSearch.ContentType",
        defaultMessage: "Content type"
    },
    'Date created': {
        id: "AdvanceSearch.DateCreated",
        defaultMessage: "Date created"
    },
    'Document ID': {
        id: "AdvanceSearch.DocumentID",
        defaultMessage: "Document ID"
    },
    'File Name': {
        id: "AdvanceSearch.FileName",
        defaultMessage: "File Name"
    },
    'File Size': {
        id: "AdvanceSearch.FileSize",
        defaultMessage: "File Size"
    },
    'Please Write condition': {
        id: "AdvanceSearch.PleaseWriteCondition",
        defaultMessage: "Please Write condition",
    },
    'Condition': {
        id: "AdvanceSearch.Condition",
        defaultMessage: "Condition",
    },
    'Does Not Contain': {
        id: "AdvanceSearch.DoesNotContain",
        defaultMessage: "Does Not Contain",
    },
    'Must Contain': {
        id: "AdvanceSearch.Contains",
        defaultMessage: "Must Contain",
    },
    'May Contain': {
        id: "AdvanceSearch.May/maynotcontains",
        defaultMessage: "May Contain",
    },
    'Please enter new search': {
        id: "AdvanceSearch.PleaseEnterNewSearch",
        defaultMessage: "Please enter new search",
    },
    'Value': {
        id: "AdvanceSearch.Value",
        defaultMessage: "Value",
    },
    'AND': {
        id: "AdvanceSearch.AND",
        defaultMessage: "AND",
    },
    'OR': {
        id: "AdvanceSearch.OR",
        defaultMessage: "OR",
    },
    'Advanced Search': {
        id: "AdvanceSearch.AdvancedSearch",
        defaultMessage: "Advanced Search",
    },
    'Submit': {
        id: "AdvanceSearch.Submit",
        defaultMessage: "Submit"
    },
    'Cancel': {
        id: "AdvanceSearch.Cancel",
        defaultMessage: "Cancel"
    },
    'Required Search': {
        id: "AdvanceSearch.RequiredSearch",
        defaultMessage: "Required Search"
    },
    'Please Write date': {
        id: "AdvanceSearch.PleaseWriteDate",
        defaultMessage: "Please Write date"
    },
    'Date:': {
        id: "AdvanceSearch.Date",
        defaultMessage: "Date:"
    },
    'Email Sent / File Last Modified': {
        id: "AdvanceSearch.EmailSentOrFileLastModified",
        defaultMessage: "Email Sent / File Last Modified",
    },
    'Select any date': {
        id: "AdvanceSearch.SelectAnyDate",
        defaultMessage: "Select any date"
    },
    'Please enter the values of all fields': {
        id: "AdvanceSearch.PleaseEnterTheValuesOfAllFields",
        defaultMessage: "Please enter the values of all fields"
    },
    'MM': {
        id: "AdvanceSearch.MM",
        defaultMessage: "MM"
    },
    'DD': {
        id: "AdvanceSearch.DD",
        defaultMessage: "DD"
    },
    'YYYY': {
        id: "AdvanceSearch.YYYY",
        defaultMessage: "YYYY"
    },
    'and': {
        id: "AdvanceSearch.and",
        defaultMessage: "and",
    },
    'Please Select data types': {
        id: "AdvanceSearch.PleaseSelectDataTypes",
        defaultMessage: "Please Select data types"
    },


    'Type:': {
        id: "AdvanceSearch.Type:",
        defaultMessage: "Type:"
    },
    'Select data types': {
        id: "AdvanceSearch.SelectDataTypes",
        defaultMessage: "Select data types"
    },
    'Please Select the Labels': {
        id: "AdvanceSearch.PleaseSelecttheLabels",
        defaultMessage: "Please Select the Labels"
    },
    'Labels:': {
        id: "AdvanceSearch.Labels:",
        defaultMessage: "Labels:"
    },
    'Content Search': {
        id: "AdvanceSearch.ContentSearch",
        defaultMessage: "Content Search"
    },
    'Any of these terms': {
        id: "AdvanceSearch.AnyOfTheseTerms",
        defaultMessage: "Contains any of these terms"
    },
    'Example: contract, SOW, "statement of work"': {
        id: "AdvanceSearch.Example: contract, SOW, 'statement of work'",
        defaultMessage: 'Example: contract, SOW, statement of work',
    },
    'Body': {
        id: "AdvanceSearch.Body",
        defaultMessage: "Body"
    },
    'Subject': {
        id: "AdvanceSearch.Subject",
        defaultMessage: "Subject"
    },
    'Attachment': {
        id: "AdvanceSearch.Attachment",
        defaultMessage: "Attachment"
    },
    'All of these terms': {
        id: "AdvanceSearch.AllOfTheseTerms",
        defaultMessage: "Contains all of these terms"
    },
    'Example: "executed contract"~10': {
        id: "AdvanceSearch.Example: 'executed contract'~10",
        defaultMessage: 'Example: executed contract'
    },
    'None of these terms': {
        id: "AdvanceSearch.NoneOfTheseTerms",
        defaultMessage: "Contains none of these terms",
    },
    'Example: "Weekly news letter"': {
        id: 'AdvanceSearch.Example: "Weekly news letter"',
        defaultMessage: 'Example: Weekly news letter'
    },
    'Metadata Search': {
        id: "AdvanceSearch.MetadataSearch",
        defaultMessage: "Metadata Search"
    },

})

const { Text, Title } = Typography;
const { Option } = Select;
const { color } = theme;
const date = [], startMonth = [], startDay = [], startYear = []
const dateSearch = ['Any date', 'Date before', 'Date after', 'Date between', 'Date equals'];
const monthSearch = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
const yearSearch = ['2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009', '2008', '2007', '2006', '2005', '2004', '2003', '2002', '2001', '2000', '1999', '1998', '1997', '1996'];

for (let i = 0; i < dateSearch.length; i++) {
    date.push(<Option key={i} value={i}>{dateSearch[i]}</Option>);
}
for (let i = 1; i <= 31; i++) {
    startDay.push(<Option key={i < 10 ? "0" + i : i} value={i < 10 ? "0" + i : i}>{i < 10 ? "0" + i : i}</Option>);
}
for (let i = 0; i < monthSearch.length; i++) {
    startMonth.push(<Option key={i < 9 ? "0" + (i + 1) : i + 1} value={i < 9 ? "0" + (i + 1) : i + 1}>{monthSearch[i]}</Option>);
}
for (let i = 0; i < yearSearch.length; i++) {
    startYear.push(<Option key={i} value={yearSearch[i]}>{yearSearch[i]}</Option>);
}

const searchOptions = [
    { label: 'Body', value: 'message_body' },
    { label: 'Subject', value: 'subject' },
    { label: 'Attachment', value: 'attachment.data.content' }
];

class AdvanceSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dateRange: 0,
            metadataRows: [{}],
            validation: true,
            validationContent: true,
            counter: 0,
            anyOfThese: ['message_body', 'subject', 'attachment.data.content'],
            noneOfThese: ['message_body', 'subject', 'attachment.data.content'],
            allOfThese: ['message_body', 'subject', 'attachment.data.content']
        }
    }

    static getDerivedStateFromProps(props, state) {
        (props.advanceSearch || props.searchCriteria) && !props.advancedtypelist && props.fetchAdvanceSearchTypeList();
        let updatedSearchCriteria;
        if (props.myArchiveEmail) {
            updatedSearchCriteria = props.updatedSearchCriteriaInMyArchivedEmails
        } else {
            updatedSearchCriteria = props.updatedSearchCriteria
        }
        if (!props.editAdvanceSearch && props.advanceSearch && !state.resetForm) {
            return {
                dateRange: 0,
                allSearch: undefined,
                anySearch: undefined,
                noneSearch: undefined,
                allTerm: undefined,
                anyTerm: undefined,
                noneTerm: undefined,
                allTermsType: undefined,
                anyTermsType: undefined,
                noneTermsType: undefined,
                type: undefined,
                label: undefined,
                yearToRange: undefined,
                dayToRange: undefined,
                monthToRange: undefined,
                yearFromRange: undefined,
                dayFromRange: undefined,
                monthFromRange: undefined,
                anyOfThese: ['message_body', 'subject', 'attachment.data.content'],
                noneOfThese: ['message_body', 'subject', 'attachment.data.content'],
                allOfThese: ['message_body', 'subject', 'attachment.data.content'],
                metadataRows: [{}],
                resetForm: true,
                tempUpdatedSearchCriteria: { ...updatedSearchCriteria }
            }
        } else if (props.editAdvanceSearch && props.advanceSearch && (!state.tempUpdatedSearchCriteria || !Object.keys(state.tempUpdatedSearchCriteria).length)) {
            return {
                dateRange: (updatedSearchCriteria && updatedSearchCriteria.dateFilter) || 0,
                allSearch: (updatedSearchCriteria && updatedSearchCriteria.allTerms) || undefined,
                anySearch: (updatedSearchCriteria && updatedSearchCriteria.anyTerms) || undefined,
                noneSearch: (updatedSearchCriteria && updatedSearchCriteria.noneTerms) || undefined,
                type: (updatedSearchCriteria && updatedSearchCriteria.filterType) || undefined,
                label: (updatedSearchCriteria && updatedSearchCriteria.labelName) || undefined,
                yearToRange: (updatedSearchCriteria && updatedSearchCriteria.yearToRange) || "",
                dayToRange: (updatedSearchCriteria && updatedSearchCriteria.dayToRange) || "",
                monthToRange: (updatedSearchCriteria && updatedSearchCriteria.monthToRange) || "",
                yearFromRange: (updatedSearchCriteria && updatedSearchCriteria.yearFromRange) || "",
                dayFromRange: (updatedSearchCriteria && updatedSearchCriteria.dayFromRange) || "",
                monthFromRange: (updatedSearchCriteria && updatedSearchCriteria.monthFromRange) || "",
                allOfThese: (updatedSearchCriteria && updatedSearchCriteria.allTermsType),
                anyOfThese: updatedSearchCriteria && updatedSearchCriteria.anyTermsType,
                noneOfThese: updatedSearchCriteria && updatedSearchCriteria.noneTermsType,
                metadataRows: (updatedSearchCriteria && updatedSearchCriteria.metadataRows) || [{}],
                tempUpdatedSearchCriteria: { ...updatedSearchCriteria }
            }
        }
        return null
    }
    
    handleChangeDate = (value) => {
        this.setState({ dateRange: value }, () => this.handleSubmit(true))
    }
    allValidationCheck = (changed, validation, validationContent, counter, excludeLastOperator, invalidDateRange) => {
        if (!changed && !validation && !invalidDateRange) {
            message.warning("please select a proper Required Search")
            return false;
        }
        else if (!changed && !validationContent) {
            message.warning("please select a proper Content Search")
            return false;
        }
        else if (!changed && counter > 0) {
            message.warning("please select a proper metadata Search")
            return false;
        }
        else if (!changed && excludeLastOperator) {
            message.warning("please exclude last operator from metadata qurey")
            return false;
        } else if (!changed && invalidDateRange && !validation) {
            message.warn("Invalid Date Range")
        }
        return true;
    }

    callHandleSubmitAndClearTempStateData = () => {
        const { validation, validationContent, excludeLastOperator, counter } = this.state
        this.setState({ tempUpdatedSearchCriteria: null })
        this.handleSubmit(false)
        validation && validationContent && !excludeLastOperator && counter === 0 && this.setState({
            doesItsTrue: false,
            dateRange: 0,
            allSearch: undefined,
            anySearch: undefined,
            noneSearch: undefined,
            allTerm: undefined,
            anyTerm: undefined,
            noneTerm: undefined,
            anyOfThese: ['message_body', 'subject', 'attachment.data.content'],
            noneOfThese: ['message_body', 'subject', 'attachment.data.content'],
            allOfThese: ['message_body', 'subject', 'attachment.data.content'],
            allTermsType: undefined,
            anyTermsType: undefined,
            noneTermsType: undefined,
            type: undefined,
            label: undefined,
            yearToRange: undefined,
            dayToRange: undefined,
            monthToRange: undefined,
            yearFromRange: undefined,
            dayFromRange: undefined,
            monthFromRange: undefined,
            metadataRows: [{}],
        })
    }


    componentDidUpdate() {
        try {
            this.props.simpleSearch && this.props.simpleSearch.FilterType && this.props.simpleSearch.FilterType.length > 0 && !this.state.typesSelectTreeData && this.generateSelectTypesTreeData(this.props.simpleSearch.FilterType, "typesSelectTreeData")
            if (!this.state.doesItsTrue && this.props.searchCriteria) {
                const {
                    dateFilter, allTerms,
                    anyTerms, noneTerms,
                    filterType, yearToRange,
                    dayToRange, monthToRange,
                    yearFromRange, dayFromRange,
                    monthFromRange,
                    anyTermsType,
                    noneTermsType,
                    allTermsType,
                    toDate,
                    metadataRows,
                    resetForm,
                    displaymetadataQuary,
                    Metadata,
                    labelName,
                    // labelType
                } = this.props.updatedSearchCriteria;

                this.setState({
                    dateRange: dateFilter,
                    allSearch: allTerms || undefined,
                    anySearch: anyTerms || undefined,
                    noneSearch: noneTerms || undefined,
                    type: filterType || [],
                    label: labelName || [],
                    yearToRange: yearToRange || undefined,
                    dayToRange: dayToRange || undefined,
                    monthToRange: monthToRange || undefined,
                    yearFromRange: yearFromRange || undefined,
                    dayFromRange: dayFromRange || undefined,
                    monthFromRange: monthFromRange || undefined,
                    anyOfThese: anyTermsType || ['message_body', 'subject', 'attachment.data.content'],
                    noneOfThese: noneTermsType || ['message_body', 'subject', 'attachment.data.content'],
                    allOfThese: allTermsType || ['message_body', 'subject', 'attachment.data.content'],
                    toDate: toDate,
                    metadataRows: (metadataRows && metadataRows) || [{}],
                    resetForm: resetForm,
                    displaymetadataQuary: displaymetadataQuary,
                    Metadata: Metadata,
                    doesItsTrue: true
                })
            }
        } catch (e) { ApiInfo.DEBUGER && console.log(e.message) }
    }

    closeAdvanceSearch = (notClearCriterea, tempUpdatedSearchCriteria) => {
        if (this.state.doesItsTrue) {
            this.setState({
                doesItsTrue: false,
                dateRange: 0,
                allSearch: undefined,
                anySearch: undefined,
                noneSearch: undefined,
                allTerm: undefined,
                anyTerm: undefined,
                noneTerm: undefined,
                anyOfThese: ['message_body', 'subject', 'attachment.data.content'],
                noneOfThese: ['message_body', 'subject', 'attachment.data.content'],
                allOfThese: ['message_body', 'subject', 'attachment.data.content'],

                type: undefined,
                label: undefined,
                labelType: undefined,
                yearToRange: undefined,
                dayToRange: undefined,
                monthToRange: undefined,
                yearFromRange: undefined,
                dayFromRange: undefined,
                monthFromRange: undefined,
                metadataRows: [{}],
            })
        }
        tempUpdatedSearchCriteria && this.setState({
            dateRange: tempUpdatedSearchCriteria.dateFilter,
            allSearch: tempUpdatedSearchCriteria.allTerms,
            anySearch: tempUpdatedSearchCriteria.anyTerms,
            noneSearch: tempUpdatedSearchCriteria.noneTerms,
            type: tempUpdatedSearchCriteria.filterType,
            label: tempUpdatedSearchCriteria.labelName,
            yearToRange: tempUpdatedSearchCriteria.yearToRange,
            dayToRange: tempUpdatedSearchCriteria.dayToRange,
            monthToRange: tempUpdatedSearchCriteria.monthToRange,
            yearFromRange: tempUpdatedSearchCriteria.yearFromRange,
            dayFromRange: tempUpdatedSearchCriteria.dayFromRange,
            monthFromRange: tempUpdatedSearchCriteria.monthFromRange,
            anyOfThese: tempUpdatedSearchCriteria.anyTermsType,
            noneOfThese: tempUpdatedSearchCriteria.noneTermsType,
            allOfThese: tempUpdatedSearchCriteria.allTermsType,
            toDate: tempUpdatedSearchCriteria.toDate,
            metadataRows: tempUpdatedSearchCriteria.metadataRows,
            resetForm: tempUpdatedSearchCriteria.resetForm,
            displaymetadataQuary: tempUpdatedSearchCriteria.displaymetadataQuary,
            Metadata: tempUpdatedSearchCriteria.Metadata
        })
        this.props.close(notClearCriterea, tempUpdatedSearchCriteria)
    }

    handleSubmit = (changed) => {
        const { advanceSearch, searchCriteria } = this.props
        const { dateRange, allSearch, anySearch, noneSearch, type, yearToRange, dayToRange, monthToRange, yearFromRange, dayFromRange, monthFromRange, /*anyOfThese, noneOfThese, allOfThese,*/ metadataRows, validation, validationContent, label, invalidDateRange } = this.state
        var counter = 0, excludeLastOperator = false;
        let metadataArray = [], advanceData;
        let displayMetaData = [];
        // let displayAdvanceData;
        !searchCriteria && this.props.updateCurrentPage(1)
        !changed && metadataRows && metadataRows.forEach((val, ind) => {
            if ((Array.isArray(metadataRows[0].metaDataValues) && metadataRows[0].metaDataValues.length > 0) || metadataRows[0].condition || metadataRows[0].field || metadataRows[0].openParanthesis || metadataRows[0].closeParanthesis || metadataRows[0].operator) {
                if (!val.metaDataValues || !val.condition || !val.field) {
                    counter++;
                } else {
                    if (val.openParanthesis === true) {
                        counter++;
                    }
                    if (val.closeParanthesis === true) {
                        if (counter > 0) {
                            counter--;
                        }

                    }
                }
                if (ind === metadataRows.length - 1) {
                    if (val.operator) {
                        excludeLastOperator = true
                    }
                }
            }
        })
        metadataRows && metadataRows.forEach(element => {
            if (element.field === "recipient") {
                if (element.openParanthesis) { metadataArray.push("(") }
                for (let i = 0; i < 3; i++) {
                    if (element.field) { metadataArray.push((i === 0 ? "to" : i === 1 ? "cc" : "bcc") + ":"); metadataArray.push("(") }
                    if (element.metaDataValues && element.condition) {
                        if (Array.isArray(element.metaDataValues) && element.metaDataValues.length > 0) {
                            element.metaDataValues.forEach((ele, ind) => {
                                element.condition === "Must Contain" ? metadataArray.push("+") : element.condition === "Does Not Contain" ? metadataArray.push("-") : metadataArray.push("");
                                metadataArray.push('"' + ele + '"')
                                ind <= (element.metaDataValues.length - 2) && metadataArray.push(" ")
                            })
                        } else {
                            element.condition === "Must Contain" ? metadataArray.push("+") : element.condition === "Does Not Contain" ? metadataArray.push("-") : metadataArray.push("");
                            metadataArray.push('"' + element.metaDataValues + '"');
                        }
                        metadataArray.push(")")
                    }
                    i <= 1 && metadataArray.push(" ")
                }
                if (element.closeParanthesis) { metadataArray.push(")") }
                if (element.operator) { metadataArray.push(" " + element.operator + " ") }
            } else {
                if (element.openParanthesis) { metadataArray.push("(") }
                if (element.field) { metadataArray.push(element.field + ":"); metadataArray.push("(") }
                // if (element.openParanthesis) {  }
                // if (element.condition) {
                //     element.condition === "Must Contain" ? metadataArray.push("+") : element.condition === "Does Not Contain" ? metadataArray.push("-") : metadataArray.push("");

                // }
                if (element.metaDataValues && element.condition) {
                    if (Array.isArray(element.metaDataValues) && element.metaDataValues.length > 0) {
                        element.metaDataValues.forEach((ele, ind) => {
                            element.condition === "Must Contain" ? metadataArray.push("+") : element.condition === "Does Not Contain" ? metadataArray.push("-") : metadataArray.push("");
                            metadataArray.push('"' + ele + '"')
                            ind <= (element.metaDataValues.length - 2) && metadataArray.push(" ")
                        })
                    } else {
                        element.condition === "Must Contain" ? metadataArray.push("+") : element.condition === "Does Not Contain" ? metadataArray.push("-") : metadataArray.push("");
                        metadataArray.push('"' + element.metaDataValues + '"');
                    }
                    metadataArray.push(")")
                }
                if (element.closeParanthesis) { metadataArray.push(")") }
                if (element.operator) { metadataArray.push(" " + element.operator + " ") }
            }
            return metadataArray;
        });
        metadataRows && metadataRows.forEach(element => {

            if (element.openParanthesis) { displayMetaData.push("(") }
            if (element.field) { displayMetaData.push(element.fieldDisplayName) }
            if (element.condition) { displayMetaData.push(" " + element.condition + " ") }
            if (element.metaDataValues) {
                if (Array.isArray(element.metaDataValues) && element.metaDataValues.length > 0) {
                    element.metaDataValues.forEach((ele, ind) => {
                        displayMetaData.push(ele)
                        ind <= (element.metaDataValues.length - 2) && displayMetaData.push(" ")
                    })
                } else {
                    displayMetaData.push(element.metaDataValues)
                }
            }
            if (element.closeParanthesis) { displayMetaData.push(")") }
            if (element.operator) { displayMetaData.push(" " + element.operator + " ") }
            return displayMetaData;
        });

        let metadataQuary = metadataArray.join(",")
        metadataQuary = metadataQuary.split(',').join('')
        let displaymetadataQuary = displayMetaData.join(",")
        displaymetadataQuary = displaymetadataQuary.split(',').join('')
        let obj = {
            dateRange,
            allSearch,
            anySearch,
            noneSearch,
            type,
            label,
            yearToRange,
            dayToRange,
            monthToRange,
            yearFromRange,
            dayFromRange,
            monthFromRange,
            anyOfThese: this.state.anyOfThese,
            noneOfThese: this.state.noneOfThese,
            allOfThese: this.state.allOfThese,
            metadataQuary,
            displaymetadataQuary,
            metadataRows
        }
        advanceData = this.advanceSearchAPIBody(obj);
        if (advanceSearch) {
            if (!changed && validation && validationContent && !excludeLastOperator && counter === 0 && !invalidDateRange) {
                this.props.postAdvancedSearch(advanceData, false, this.props.myArchiveEmail)
            }
            else {
                this.allValidationCheck(changed, validation, validationContent, counter, excludeLastOperator, invalidDateRange)
            }
            !changed && validation && validationContent && !excludeLastOperator && !invalidDateRange && counter === 0 && this.props.AdvancedSearchQueryBuilder(advanceData)
            var AdvanceDataCriteria = { ...advanceData };

            var toDateCorrectFormat = AdvanceDataCriteria && AdvanceDataCriteria.toDate ? AdvanceDataCriteria.toDate.split("-").reverse() : ""
            if (toDateCorrectFormat && toDateCorrectFormat[1] !== 'MM') {
                toDateCorrectFormat[1] = monthSearch[parseInt(toDateCorrectFormat[1]) - 1].replace('.', '')
            }
            var fromDateCorrectFormat = AdvanceDataCriteria && AdvanceDataCriteria.fromDate ? AdvanceDataCriteria.fromDate.split("-").reverse() : ""
            if (fromDateCorrectFormat && fromDateCorrectFormat[1] !== 'MM') {
                fromDateCorrectFormat[1] = monthSearch[parseInt(fromDateCorrectFormat[1]) - 1].replace('.', '')
            }
            AdvanceDataCriteria.toDate_UI = toDateCorrectFormat && toDateCorrectFormat.join("-");
            AdvanceDataCriteria.fromDate_UI = fromDateCorrectFormat && fromDateCorrectFormat.join("-");
            if (this.props.myArchiveEmail) {
                this.props.updateSearchCriteria_MYARCHIVEDEMAILS(AdvanceDataCriteria, 'A2')
            } else {
                this.props.updateSearchCriteria(AdvanceDataCriteria, 2)
            }
            !changed && validation && validationContent && !excludeLastOperator && counter === 0 && !invalidDateRange && this.closeAdvanceSearch(true)
            if (!changed && validation && validationContent && !excludeLastOperator && counter === 0 && !invalidDateRange) {
                this.setState({
                    resetForm: false
                })
            }
            !changed && this.props.clearSearchedResults({})
            !changed && this.props.updateCurrentPage(1)
            !changed && this.props.totalSimpeSearchedDocs()
        } else {
            if (this.allValidationCheck(changed, validation, validationContent, counter, excludeLastOperator, invalidDateRange) === true) {
                this.props.getSearchCriteriaQuery && this.props.getSearchCriteriaQuery(advanceData, obj)
                !changed && this.closeAdvanceSearch()
            }

        }
    }
    advanceSearchAPIBody(data) {
        let fromDate, toDate;
        let comingFromDate = `${data.yearFromRange || "YYYY"}-${data.monthFromRange || "MM"}-${data.dayFromRange || "DD"}`
        let comingToDate = `${data.yearToRange || "YYYY"}-${data.monthToRange || "MM"}-${data.dayToRange || "DD"}`;
        switch (data.dateRange) {
            case 0:
                this.setState({ validation: true })
                fromDate = ""
                toDate = "";
                break;
            case 1:
                if (!data.yearFromRange || !data.monthFromRange || !data.dayFromRange) { this.setState({ validation: false }) } else { this.setState({ validation: true }) }
                fromDate = ""
                toDate = comingFromDate;
                break;
            case 2:
                if (!data.yearFromRange || !data.monthFromRange || !data.dayFromRange) { this.setState({ validation: false }) } else { this.setState({ validation: true }) }
                fromDate = comingFromDate
                toDate = ""
                break;
            case 3:
                if (!data.yearFromRange || !data.monthFromRange || !data.dayFromRange || !data.yearToRange || !data.monthToRange || !data.dayToRange) { this.setState({ validation: false }) } else { this.setState({ validation: true }) }
                fromDate = comingFromDate
                toDate = comingToDate
                if (!toDate || !fromDate || moment(toDate).diff(moment(fromDate), 'days') >= 0) {
                    this.setState({
                        invalidDateRange: false,
                        validation: true
                    })
                } else {
                    this.setState({
                        invalidDateRange: true,
                        validation: false
                    })
                }
                break;
            case 4:
                if (!data.yearFromRange || !data.monthFromRange || !data.dayFromRange) { this.setState({ validation: false }) } else { this.setState({ validation: true }) }
                fromDate = comingFromDate;
                toDate = comingFromDate;
                break;
            default:
                fromDate = ""
                toDate = ""
                break;
        }

        // console.log({data})
        if (((data.anySearch && data.anySearch.length === 0) && (data.anyOfThese && data.anyOfThese.length === 0)) && ((data.allSearch && data.allSearch.length === 0) && (data.allOfThese && data.allOfThese.length === 0)) && ((data.noneSearch && data.noneSearch.length === 0) && data.noneOfThese && data.noneOfThese.length === 0)) { this.setState({ validationContent: true }) }

        else if (((data.anySearch && data.anySearch.length === 0) && (data.anyOfThese && data.anyOfThese.length === 0)) && ((((data.allSearch && data.allSearch.length === 0) && (data.allOfThese && data.allOfThese.length > 0)) || ((data.allSearch && data.allSearch.length !== 0) && (data.allOfThese && data.allOfThese.length > 0)) || ((data.allSearch && data.allSearch.length === 0) && (data.allOfThese && data.allOfThese.length === 0))) && (((data.noneSearch && data.noneSearch.length === 0) && (data.noneOfThese && data.noneOfThese.length > 0)) || ((data.noneSearch && data.noneSearch.length === 0) && (data.noneOfThese && data.noneOfThese.length === 0)) || ((data.noneSearch && data.noneSearch.length !== 0) && (data.noneOfThese && data.noneOfThese.length > 0))))) { this.setState({ validationContent: true }) }

        else if (((data.allSearch && data.allSearch.length === 0) && (data.allOfThese && data.allOfThese.length === 0)) && ((((data.anySearch && data.anySearch.length === 0) && (data.anyOfThese && data.anyOfThese.length > 0)) || ((data.anySearch && data.anySearch.length > 0) && (data.anyOfThese && data.anyOfThese.length > 0)) || ((data.anySearch && data.anySearch.length === 0) && (data.anyOfThese && data.anyOfThese.length === 0))) && (((data.noneSearch && data.noneSearch.length === 0) && (data.noneOfThese && data.noneOfThese.length > 0)) || ((data.noneSearch && data.noneSearch.length === 0) && (data.noneOfThese && data.noneOfThese.length === 0)) || ((data.noneSearch && data.noneSearch.length > 0) && (data.noneOfThese && data.noneOfThese.length > 0))))) { this.setState({ validationContent: true }) }

        else if (((data.noneSearch && data.noneSearch.length === 0) && (data.noneOfThese && data.noneOfThese.length === 0)) && ((((data.anySearch && data.anySearch.length === 0) && (!data.anyOfThese || data.anyOfThese.length > 0)) || ((data.anySearch && data.anySearch.length === 0) && (!data.anyOfThese || data.anyOfThese.length === 0)) || ((data.anySearch && data.anySearch.length !== 0) && (!data.anyOfThese || data.anyOfThese.length > 0))) && (((data.allSearch && data.allSearch.length === 0) && (!data.allOfThese || data.allOfThese.length > 0)) || ((data.allSearch && data.allSearch.length === 0) && (!data.allOfThese || data.allOfThese.length === 0)) || ((data.allSearch && data.allSearch.length !== 0) && (!data.allOfThese || data.allOfThese.length > 0))))) { this.setState({ validationContent: true }) }

        else if (((data.anySearch && data.anySearch === 0) || (!data.anyOfThese || data.anyOfThese.length !== 0)) && ((data.allSearch && data.allSearch === 0) || (!data.allOfThese || data.allOfThese.length !== 0)) && ((data.noneSearch && data.noneSearch === 0) || (!data.noneOfThese || data.noneOfThese.length !== 0))) { this.setState({ validationContent: true }) }

        else { this.setState({ validationContent: false }) }
        return {
            "fromCount": 0, "toCount": this.props.searchDatatablePageSize || 20,
            "dateFilter": data.dateRange,
            "fromDate": fromDate || "",
            "toDate": toDate || "",
            "filterType": data.type ? data.type : [],
            "labelType": ["_doc"],
            "labelName": data.label ? this.getLabelName(data.label) : [],
            "anyTerms": data.anySearch ? data.anySearch : [],
            "anyTermsType": this.state.anyOfThese === undefined ?
                ['message_body', 'subject', 'attachment.data.content'] : this.state.anyOfThese,
            "allTerms": data.allSearch || [],
            "allTermsType": this.state.allOfThese === undefined ?
                ['message_body', 'subject', 'attachment.data.content'] : this.state.allOfThese,
            "noneTerms": data.noneSearch ? data.noneSearch : [],
            "noneTermsType": this.state.noneOfThese === undefined ? ['message_body', 'subject', 'attachment.data.content'] : this.state.noneOfThese,
            "Metadata": data.metadataQuary, "displaymetadataQuary": data.displaymetadataQuary, metadataRows: data.metadataRows, dayFromRange: data.dayFromRange, monthFromRange: data.monthFromRange,
            yearFromRange: data.yearFromRange, yearToRange: data.yearToRange, monthToRange: data.monthToRange, dayToRange: data.dayToRange
        }
    }

    getLabelName = (LabelNameWithId) => {
        let labelNames = []
        LabelNameWithId.forEach(el => labelNames.push(el.split('%')[0]))
        return labelNames
    }


    handleChangeMonth = (value) => {
        this.setState({ monthFromRange: value }, () => this.handleSubmit(true))
    }
    handleChangeDay = (value) => {
        this.setState({ dayFromRange: value }, () => this.handleSubmit(true))
    }
    handleChangeYear = (value) => {
        this.setState({ yearFromRange: value }, () => this.handleSubmit(true))
    }
    handleChangeAfterMonth = (value) => {
        this.setState({ monthToRange: value }, () => this.handleSubmit(true))
    }
    handleChangeAfterDay = (value) => {
        this.setState({ dayToRange: value }, () => this.handleSubmit(true))
    }
    handleChangeAfterYear = (value) => {
        this.setState({ yearToRange: value }, () => this.handleSubmit(true))
    }
    handleChangeType = (value, label) => {
        this.setState({ [label]: value }, () => this.handleSubmit(true))
    }
    handleChangeEmployees = (value) => {
        this.setState({ employees: value }, () => this.handleSubmit(true))
    }
    onSearch = (val) => {
        this.setState({ search: val }, () => this.handleSubmit(true))
    }
    onChangeAnyOfThese = (checkedValues) => {
        this.setState({ anyOfThese: checkedValues }, () => this.handleSubmit(true))
    }
    onChangeAllOfThese = (checkedValues) => {
        this.setState({ allOfThese: checkedValues }, () => this.handleSubmit(true))
    }
    onChangeNoneOfThese = (checkedValues) => {
        this.setState({ noneOfThese: checkedValues }, () => this.handleSubmit(true))
    }
    handleClose = removedTag => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        this.setState({ tags }, () => this.handleSubmit(true));
    };
    handleAnyChange(value) {
        this.setState({ anySearch: value }, () => this.handleSubmit(true))
    }
    handleAllChange(value) {
        this.setState({ allSearch: value }, () => this.handleSubmit(true))
    }
    handleNoneChange(value) {
        this.setState({ noneSearch: value }, () => this.handleSubmit(true))
    }

    contentSearchChildHandler(e) {
    }

    addMetaRow(index) {
        const { metadataRows } = this.state;
        let data = metadataRows[index]
        // len=  Object.values(metadataRows[index]).length;
        if (!data.operator || ((Array.isArray(data.metaDataValues) && data.metaDataValues.length === 0) || !data.metaDataValues) || !data.condition || !data.field) {
            message.warning("please make a proper metadata query")
        } else {
            metadataRows.splice(index + 1, 0, {})
            this.setState({
                metadataRows
            }, () => this.handleSubmit(true))
        }
    };
    deleteMetaRow(index) {
        const { metadataRows } = this.state;
        if (metadataRows.length <= 1) {
            return
        }
        metadataRows.splice(index, 1)
        this.setState({
            metadataRows
        }, () => this.handleSubmit(true))
    }

    onChangeLeftParenthesis = (index) => {
        const { metadataRows } = this.state;
        metadataRows[index]["openParanthesis"] = !(metadataRows[index]["openParanthesis"])
        this.setState({
            metadataRows
        }, () => this.handleSubmit(true))
    }
    onChangeRightParenthesis = (index) => {
        const { metadataRows } = this.state;
        metadataRows[index]["closeParanthesis"] = !(metadataRows[index]["closeParanthesis"])
        this.setState({
            metadataRows
        }, () => this.handleSubmit(true))
    }

    handleMetaDataValue = (e, index) => {
        const { metadataRows } = this.state;
        metadataRows[index]["metaDataValues"] = e
        this.setState({
            metadataRows
        }, () => this.handleSubmit(true))
    }
    handleChangeField = (value, index, opt) => {
        const { metadataRows } = this.state;
        metadataRows[index]["field"] = value
        if (opt && opt.props && opt.props.children) {
            metadataRows[index]["fieldDisplayName"] = opt.props.children
        }
        this.setState({ metadataRows }, () => this.handleSubmit(true))
    }
    handleChangeCondition = (value, index) => {
        const { metadataRows } = this.state;
        metadataRows[index]["condition"] = value
        this.setState({ metadataRows }, () => this.handleSubmit(true))
    }
    handleChangeOperator = (value, index) => {
        const { metadataRows } = this.state;
        metadataRows[index]["operator"] = value
        this.setState({ metadataRows }, () => this.handleSubmit(true))
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

    generateMetaDataSearch = (values, index) => {
        // const { getFieldDecorator } = this.props.form;
        const { formatMessage } = this.props;
        return (
            <Form key={index} layout="horizontal" style={{ padding: '0px', display: 'flex', justifyContent: 'space-around', width: "inherit" }} labelAlign="left">
                <div style={{ padding: '0px 5px', backgroundColor: values.openParanthesis && color.Orange, border: '2px solid #d9d9d9', color: '#d9d9d9', fontSize: 20, cursor: 'pointer', height: '40px', marginTop: 3 }} onClick={() => this.onChangeLeftParenthesis(index)} >
                    (
                </div>
                <Select
                    showSearch
                    placeholder={formatMessage(messages["Field"])}
                    style={{ height: 40, width: '20%', marginTop: 3 }}
                    onChange={(e, opt) => this.handleChangeField(e, index, opt)}
                    onBlur={this.onBlur}
                    value={values.field}
                    allowClear={true}
                    onSearch={this.onSearch}
                    filterOption={(input, option) =>
                        option.props.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }>
                    {
                        this.props.advancedtypelist && this.props.advancedtypelist.data && this.props.advancedtypelist.data.output && this.props.advancedtypelist.data.output.length > 0 && this.props.advancedtypelist.data.output.map((val) =>
                            <Option key={val.FIELDELASTIC_ID} value={val.FIELDELASTIC_NAME}>{val.FIELDELASTIC_DISPLAY}</Option>
                        )
                    }
                </Select>
                <Select
                    placeholder={formatMessage(messages["Condition"])}
                    onChange={e => this.handleChangeCondition(e, index)}
                    style={{ height: 40, width: '20%', marginTop: 3 }}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    value={values.condition}
                    allowClear={true}
                    onSearch={this.onSearch}
                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <Option value="Does Not Contain">{formatMessage(messages["Does Not Contain"])}</Option>
                    <Option value="Must Contain">{formatMessage(messages["Must Contain"])}</Option>
                    <Option value="May Contain">{formatMessage(messages["May Contain"])}</Option>
                </Select>

                <Select
                    placeholder={formatMessage(messages["Value"])}
                    value={values.metaDataValues}
                    id="metadataValue"
                    mode="tags"
                    dropdownStyle={{ display: 'none' }}
                    style={{ marginTop: 3, width: '30%' }}

                    onChange={(e) => this.handleMetaDataValue(e, index)}
                    allowClear={true}
                    tokenSeparators={[";"]}
                >
                </Select>
                {/* <Input style={{ marginTop: 3, width: "30%" }} value={values.metaDataValues} allowClear={true} onChange={(e) => this.handleMetaDataValue(e, index)} placeholder={formatMessage(messages["Value"])} /> */}
                <div style={{ backgroundColor: values.closeParanthesis && color.Orange, padding: '0px 5px', border: '2px solid #d9d9d9', color: '#d9d9d9', fontSize: 20, cursor: 'pointer', height: '40px', marginTop: 3 }} onClick={() => this.onChangeRightParenthesis(index)} >)</div>
                <Select
                    placeholder=''
                    style={{ width: '8%', marginTop: 3, height: 40, }}
                    onChange={e => this.handleChangeOperator(e, index)}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    value={values.operator}
                    allowClear={true}
                    onSearch={this.onSearch}

                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <Option value="AND">{formatMessage(messages["AND"])}</Option>
                    <Option value="OR">{formatMessage(messages["OR"])}</Option>
                </Select>
                <div style={{ width: "auto", display: "flex" }}>
                    <img style={{ cursor: "pointer" }} src={addIconOrange} onClick={() => this.addMetaRow(index)} width={40} height={40} alt="Add" title="Add" />
                    <img style={{ cursor: "pointer" }} src={deleteIconOrange} onClick={() => this.deleteMetaRow(index)} width={40} height={40} alt="Delete" title="Delete" />
                </div>
            </Form>
        )
    }

    render() {
        const { collapsed, advanceSearch, formatMessage, searchCriteria } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { metadataRows, typesSelectTreeData, tempUpdatedSearchCriteria } = this.state;

        return (

            <div style={{ ...style.sideMenuHeight }}>

                <Drawer
                    closable={false}
                    width={'calc(100% - 260px)'}
                    maskStyle={{ backgroundColor: "transparent" }}
                    visible={advanceSearch || searchCriteria}
                    onClose={() => this.closeAdvanceSearch(false, tempUpdatedSearchCriteria)}
                >
                    {!collapsed &&
                        <div style={{ padding: "10px 0px 10px 0px" }}>
                            {/* <div style={{ position: "fixed", zIndex: '99' }}> */}
                            <div style={{ position: 'static', zIndex: '99', display: 'flex', flexDirection: 'row' }}>
                                <div style={{ width: '50%' }} >
                                    <div style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                                        <img title="Add" style={{ cursor: "pointer" }} src={searchIconOrange} width={40} height={40} alt="Add" />
                                        {/* <Icon type="info-circle" style={{ cursor: "pointer", fontSize: 24, color: `${color.Blue}` }} /> */}
                                        {advanceSearch && <Title style={{ color: `${color.Orange}`, padding: "15px 0 0 18px", fontSize: 18, }}>{formatMessage(messages["Advanced Search"])}</Title>}
                                        {searchCriteria && <Title style={{ color: `${color.Orange}`, padding: "15px 0 0 18px", fontSize: 18, }}>Search Criteria</Title>}
                                    </div>
                                </div>
                                <div style={{ width: '50%' }}>
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", marginTop: 10 }}>
                                        <PrimaryButton text={formatMessage(messages["Submit"])} htmlType="submit" onClick={() => this.callHandleSubmitAndClearTempStateData()} />
                                        <SecondryButton text={formatMessage(messages["Cancel"])} onClick={() => this.closeAdvanceSearch(false, tempUpdatedSearchCriteria)} />
                                    </div>
                                </div>
                            </div>
                            {/* </div> */}
                            {<CollapseableHeader bgColor="inherit" heading={formatMessage(messages["Required Search"])}>
                                <Form layout="horizontal" style={{ padding: '0px 40px' }} labelAlign="left" onSubmit={() => this.handleSubmit(false)}>

                                    <Form.Item>
                                        {getFieldDecorator('Date', {
                                            rules: [
                                                {
                                                    message: formatMessage(messages["Please Write date"]),
                                                },
                                            ],
                                        })(<Row style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                            <Col span={3} style={{ display: 'flex', flexDirection: 'column' }}><Text style={{ marginTop: -10 }}>{formatMessage(messages["Date:"])}</Text><Text style={{ fontSize: 10, marginTop: -20, color: 'grey' }} >{formatMessage(messages["Email Sent / File Last Modified"])}</Text></Col>
                                            <Col span={21}>
                                                <Select
                                                    placeholder={formatMessage(messages["Select any date"])}
                                                    showSearch
                                                    value={this.state.dateRange}
                                                    style={{ height: 40 }}
                                                    onChange={e => this.handleChangeDate(e)}
                                                    onFocus={this.onFocus}
                                                    onBlur={this.onBlur}
                                                    onSearch={this.onSearch}
                                                    filterOption={(input, option) =>
                                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                    }>
                                                    {date}
                                                </Select>
                                            </Col>
                                        </Row>)}
                                    </Form.Item>
                                    <Form.Item style={{ marginTop: -25 }}>
                                        {getFieldDecorator('Date Range ', {
                                            rules: [
                                                {
                                                    message: formatMessage(messages["Please enter the values of all fields"]),
                                                },
                                            ],
                                        })(<Row >
                                            <Col span={3}></Col>
                                            {(this.state.dateRange === 3 && this.state.dateRange !== 0) && <Col span={21} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Select
                                                    placeholder={formatMessage(messages["DD"])}
                                                    style={{ width: "13%", height: 40 }}
                                                    onChange={e => this.handleChangeDay(e)}
                                                    onFocus={this.onFocus}
                                                    onBlur={this.onBlur}
                                                    onSearch={this.onSearch}
                                                    value={this.state.dayFromRange}
                                                    filterOption={(input, option) =>
                                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                    }
                                                >
                                                    {startDay}
                                                </Select>
                                                <Select
                                                    placeholder={formatMessage(messages["MM"])}
                                                    style={{ width: "13%", height: 40 }}
                                                    onChange={e => this.handleChangeMonth(e)}
                                                    onFocus={this.onFocus}
                                                    onBlur={this.onBlur}
                                                    onSearch={this.onSearch}
                                                    value={this.state.monthFromRange}
                                                    filterOption={(input, option) =>
                                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                    }
                                                >
                                                    {startMonth}
                                                </Select>
                                                <Select
                                                    placeholder={formatMessage(messages["YYYY"])}
                                                    style={{ width: "13%", height: 40 }}
                                                    onChange={e => this.handleChangeYear(e)}
                                                    onFocus={this.onFocus}
                                                    onBlur={this.onBlur}
                                                    onSearch={this.onSearch}
                                                    value={this.state.yearFromRange}
                                                    filterOption={(input, option) =>
                                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                    }
                                                >
                                                    {startYear}
                                                </Select>
                                                <Text>{formatMessage(messages["and"])}</Text>
                                                <Select
                                                    placeholder={formatMessage(messages["DD"])}
                                                    style={{ width: "13%", height: 40 }}
                                                    onChange={e => this.handleChangeAfterDay(e)}
                                                    onFocus={this.onFocus}
                                                    onBlur={this.onBlur}
                                                    value={this.state.dayToRange}
                                                    onSearch={this.onSearch}
                                                    filterOption={(input, option) =>
                                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                    }
                                                >
                                                    {startDay}
                                                </Select>
                                                <Select
                                                    placeholder={formatMessage(messages["MM"])}
                                                    style={{ width: "13%", height: 40 }}
                                                    onChange={e => this.handleChangeAfterMonth(e)}
                                                    onFocus={this.onFocus}
                                                    onBlur={this.onBlur}
                                                    onSearch={this.onSearch}
                                                    value={this.state.monthToRange}
                                                    filterOption={(input, option) =>
                                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                    }>
                                                    {startMonth}
                                                </Select>
                                                <Select
                                                    placeholder={formatMessage(messages["YYYY"])}
                                                    style={{ width: "13%", height: 40 }}
                                                    onChange={e => this.handleChangeAfterYear(e)}
                                                    onFocus={this.onFocus}
                                                    onBlur={this.onBlur}
                                                    value={this.state.yearToRange}
                                                    onSearch={this.onSearch}
                                                    filterOption={(input, option) =>
                                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                    }
                                                >
                                                    {startYear}
                                                </Select>
                                            </Col>}
                                            {(this.state.dateRange !== 3 && this.state.dateRange !== 0) && <Col span={20} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Select
                                                    placeholder={formatMessage(messages["DD"])}
                                                    style={{ width: "30%", height: 40 }}
                                                    onChange={e => this.handleChangeDay(e)}
                                                    onFocus={this.onFocus}
                                                    value={this.state.dayFromRange}
                                                    onBlur={this.onBlur}
                                                    onSearch={this.onSearch}
                                                    filterOption={(input, option) =>
                                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                    }
                                                >
                                                    {startDay}
                                                </Select>
                                                <Select
                                                    placeholder={formatMessage(messages["MM"])}
                                                    style={{ width: "30%", height: 40 }}
                                                    onChange={e => this.handleChangeMonth(e)}
                                                    onFocus={this.onFocus}
                                                    onBlur={this.onBlur}
                                                    value={this.state.monthFromRange}
                                                    onSearch={this.onSearch}
                                                    filterOption={(input, option) =>
                                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                    }
                                                >
                                                    {startMonth}
                                                </Select>
                                                <Select
                                                    placeholder={formatMessage(messages["YYYY"])}
                                                    style={{ width: "30%", height: 40 }}
                                                    onChange={e => this.handleChangeYear(e)}
                                                    onFocus={this.onFocus}
                                                    onBlur={this.onBlur}
                                                    value={this.state.yearFromRange}
                                                    onSearch={this.onSearch}
                                                    filterOption={(input, option) =>
                                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                    }
                                                >
                                                    {startYear}
                                                </Select>

                                            </Col>}

                                            {/* <img style={{ cursor: "pointer" }} src={addIconOrange} width={40} height={40} alt="Add" /> */}
                                        </Row>)}

                                    </Form.Item>
                                    <Form.Item style={{ marginTop: -20 }}>
                                        {getFieldDecorator('Select data types ', {
                                            rules: [
                                                {

                                                    message: formatMessage(messages["Please Select data types"]),
                                                },
                                            ],
                                        })(<Row style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                            <Col span={3} style={{ display: 'flex', flexDirection: 'column' }}><Text style={{}}>{formatMessage(messages["Type:"])}</Text></Col>
                                            <Col span={21}>
                                                <TreeSelect
                                                    style={{ width: '100%' }}
                                                    value={this.state.type}
                                                    dropdownStyle={{ maxHeight: 200, overflow: 'auto' }}
                                                    treeData={typesSelectTreeData}
                                                    placeholder="All"
                                                    allowClear={true}
                                                    onFocus={() => (!this.props.simpleSearch || !this.props.simpleSearch.FilterType || !this.props.simpleSearch.FilterType.length > 0) && this.props.fetchSimpleSearch()}
                                                    onChange={(selectedOpt) => this.handleChangeType(selectedOpt, "type")}
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
                                            </Col></Row>)}
                                    </Form.Item>


                                    {!this.props.myArchiveEmail && <Form.Item style={{ marginTop: -20 }}   >
                                        {getFieldDecorator('Select data types ', {
                                            rules: [
                                                { message: formatMessage(messages["Please Select the Labels"]) },
                                            ],
                                        })(<Row style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                            <Col span={3} style={{ display: 'flex', flexDirection: 'column' }}><Text style={{}}>{formatMessage(messages["Labels:"])}</Text></Col>
                                            <Col span={21}>
                                                <TreeSelect
                                                    style={{ width: '100%' }}
                                                    value={this.state.label}
                                                    dropdownStyle={{ maxHeight: 200, overflow: 'auto' }}
                                                    treeData={this.props.treeDataOfGlobalLabel}
                                                    placeholder="All"
                                                    allowClear={true}
                                                    onFocus={() => (!this.props.simpleSearch || !this.props.simpleSearch.LabelType || !this.props.simpleSearch.LabelType.length > 0) && this.props.fetchSimpleSearch()}
                                                    onChange={(selectedOpt) => this.handleChangeType(selectedOpt, "label")}
                                                    treeCheckable={true}
                                                    treeIcon={false}
                                                    showSearch
                                                    filterTreeNode={(input, treeNode) =>
                                                        treeNode.props.filter.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                    }
                                                    notFoundContent={(!this.props.simpleSearch) && <Text>
                                                        <Spin size="small" style={{ marginRight: 15 }} />Fetching Labels
                                                </Text>
                                                    }
                                                />
                                            </Col></Row>)}
                                    </Form.Item>}

                                </Form>
                            </CollapseableHeader>}

                            {
                                <div>
                                    <CollapseableHeader bgColor="inherit" heading={formatMessage(messages["Content Search"])}>
                                        {/* <Form layout="vertical" onSubmit={this.handleSubmit}> */}
                                        <Form layout="horizontal" style={{ padding: '0px 40px' }} labelAlign="left" onSubmit={() => this.handleSubmit(false)}>
                                            <Form.Item>
                                                {getFieldDecorator('Example: contract, SOW, "statement of work"')(<Row style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                                    <Col span={3} style={{ display: 'flex', flexDirection: 'column' }}><Text >{formatMessage(messages["May Contain"])}</Text></Col>
                                                    <Col span={21} style={{ display: 'flex', flexDirection: 'column', }}>
                                                        <Select
                                                            placeholder={'Example: statement of work'}
                                                            value={this.state.anySearch}
                                                            mode="tags"
                                                            dropdownStyle={{ display: 'none' }}
                                                            style={{ width: '100%' }}
                                                            onChange={(e) => this.handleAnyChange(e)}
                                                            allowClear={true}
                                                            tokenSeparators={[";"]}

                                                        >
                                                        </Select>
                                                        <div style={{ display: 'flex', flexDirection: 'row', marginTop: 5 }}>
                                                            <Checkbox.Group
                                                                options={searchOptions}
                                                                style={{ width: '100%' }}
                                                                value={this.state.anyOfThese}
                                                                onChange={this.onChangeAnyOfThese}
                                                            />
                                                        </div>
                                                    </Col>
                                                </Row>)}
                                            </Form.Item>
                                            <Form.Item style={{ marginTop: -5 }}>
                                                {getFieldDecorator('Example: "executed contract"~10 ')(<Row style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: 'inherit' }}>

                                                    <Col span={3} ><Text >{formatMessage(messages["Must Contain"])}</Text></Col>
                                                    <Col span={21} style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <Select
                                                            placeholder={'Example: execute contract~10'}
                                                            mode="tags" dropdownStyle={{ display: 'none' }}
                                                            allowClear={true}
                                                            value={this.state.allSearch}
                                                            onChange={(e) => this.handleAllChange(e)}
                                                            tokenSeparators={[";"]}
                                                        >
                                                        </Select>
                                                        <div style={{ display: 'flex', flexDirection: 'row', marginTop: 5 }}>
                                                            <Checkbox.Group options={searchOptions} defaultValue={['message_body', 'subject', 'attachment.data.content']} value={this.state.allOfThese} style={{ width: '100%' }} onChange={this.onChangeAllOfThese} />
                                                        </div>
                                                    </Col>
                                                </Row>)}
                                            </Form.Item>
                                            <Form.Item style={{ marginTop: -5 }}>
                                                {getFieldDecorator('Example: "Weekly news letter" ')(
                                                    <Row style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>

                                                        <Col span={3}><Text >{formatMessage(messages["Does Not Contain"])}</Text></Col>
                                                        <Col span={21} style={{ display: 'flex', flexDirection: 'column' }}>
                                                            <Select
                                                                placeholder={'Example: Week*'}
                                                                mode="tags" option dropdownStyle={{ display: 'none' }} style={{ width: '100%' }} onChange={(e) => this.handleNoneChange(e)}
                                                                allowClear={true}
                                                                value={this.state.noneSearch}
                                                                tokenSeparators={[";"]}

                                                            >
                                                            </Select>
                                                            <div style={{ display: 'flex', flexDirection: 'row', marginTop: 5 }}>
                                                                <Checkbox.Group options={searchOptions} defaultValue={['message_body', 'subject', 'attachment.data.content']} value={this.state.noneOfThese} style={{ width: '100%' }} onChange={this.onChangeNoneOfThese} />
                                                            </div>
                                                        </Col>
                                                    </Row>)}
                                            </Form.Item>

                                        </Form>
                                    </CollapseableHeader>
                                </div>
                            }

                            {
                                <div id="metadata">
                                    <CollapseableHeader bgColor="inherit" heading={formatMessage(messages["Metadata Search"])}>
                                        {metadataRows && metadataRows.map((val, index) => {
                                            return this.generateMetaDataSearch(val, index)
                                        })}
                                    </CollapseableHeader>
                                </div>
                            }

                        </div>
                    }
                </Drawer>
            </div>

        )
    }
}

const AdvanceSearchForm = Form.create('DeploymentForm')(AdvanceSearch);

const mapStateToProps = state => {
    return {
        simpleSearch: state.SimpleSearchReducer.simpleSearch,
        advancedtypelist: state.AdvancedSearchReducer.advancedtypelist,
        searchDatatablePageSize: state.UpdateDataTablePageSizeTypes.searchDatatablePageSize,
        updatedSearchCriteria: state.UpdateSearchCriteriaReducer.updatedSearchCriteria,
        updatedSearchCriteriaInMyArchivedEmails: state.UpdateSearchCriteriaReducer.updatedSearchCriteriaInMyArchivedEmails,
        treeDataOfGlobalLabel: state.AutoLabelingReducer.treeDataOfGlobalLabel

    }
};
const mapDispatchToProps = dispatch => {
    return {
        fetchAdvanceSearchTypeList: () => dispatch(fetchAdvanceSearchTypeList()),
        fetchSimpleSearch: () => dispatch(fetchSimpleSearch()),
        postAdvancedSearch: (data, cancelRequest, isMyarchivedEmail) => dispatch(postAdvancedSearch(data, cancelRequest, isMyarchivedEmail)),
        AdvancedSearchQueryBuilder: (data) => dispatch(AdvancedSearchQueryBuilder(data)),
        updateSearchCriteria: (searchedData, searchType) => dispatch(updateSearchCriteria(searchedData, searchType)),
        clearSearchedResults: () => dispatch(clearSearchedResults()),
        totalSimpeSearchedDocs: () => dispatch(totalSimpeSearchedDocs()),
        updateSearchCriteria_MYARCHIVEDEMAILS: (searchedData, searchType) => dispatch(updateSearchCriteria_MYARCHIVEDEMAILS(searchedData, searchType)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdvanceSearchForm);
