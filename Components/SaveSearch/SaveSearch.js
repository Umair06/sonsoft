import React, { Component } from 'react';
import { Drawer, Typography, Form, Input, Tree, Icon, message } from 'antd';
import style from '../../styles';
import Theme from '../../Assets/Theme/Theme';
import { PrimaryButton, SecondryButton } from '../Button/Button';
import CollapseableHeader from '../CollapseAbleHeader/CollapseAbleHeader';
import filterTree from '../../Redux/TreeData/SearchCriteria.json';
import Clear_Gray from '../../Assets/icons/SV_ICONS/Clear_Gray.png';
import { connect } from 'react-redux';
import * as ApiInfo from "../../APIConfig/ApiParameters";
import moment from "moment"
// import {
//   saveSearchData,
//   editSaveSearchAction,
// } from '../../Redux/Actions/SimpleSearchAction/SimpleSearchAction';
import {
  postAdvancedSavedSearch,
  postQueryBuilderSavedSearch,
  saveSearchData,
  postSmartSearch,
  editSimpleSavedSearch,
  editAdvanceSavedSearchAction,
  editQueryBuilderSavedSearchAction,
  editSmartSavedSearch
} from '../../Redux/Actions/SavedSearchActions/SavedSearchActions';

// import moment from "moment";
import { defineMessages } from 'react-intl';

const messages = defineMessages({

  'Keyword': {
    id: "SearchArchive.Keyword",
    defaultMessage: "Keyword",
  },

  'Please Select A Search Criteria': {
    id: 'SaveSearch.PleaseSelectSearchCriteria',
    defaultMessage: 'Please Select A Search Criteria'
  },

  'Edit Saved Search': {
    id: 'SaveSearch.EditSavedSearch',
    defaultMessage: 'Edit Saved Search'
  },

  'Save Search': {
    id: 'SaveSearch.SaveSearch',
    defaultMessage: 'Save Search'
  },

  'Enter Search Name': {
    id: 'SaveSearch.EnterSearchName',
    defaultMessage: 'Enter Search Name'
  },

  'Enter Search Description': {
    id: 'SaveSearch.EnterSearchDescription',
    defaultMessage: 'Enter Search Description'
  },

  'SEARCH CRITERIA': {
    id: 'SaveSearch.SEARCHCRITERIA',
    defaultMessage: 'SEARCH CRITERIA'
  },

  Submit: {
    id: 'SaveSearch.Submit',
    defaultMessage: 'Submit'
  },
  Cancel: {
    id: 'SaveSearch.Cancel',
    defaultMessage: 'Cancel'
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
});

const { TextArea } = Input;
const { color } = Theme;
const { Title, Text, Paragraph } = Typography;
const { TreeNode } = Tree;

class SaveSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      data: filterTree.treeData,
      file: [
        { name: 'file-excel', style: true },
        { name: 'file-pdf', style: false }
      ]
    };
  }

  static getDerivedStateFromProps(props, state) {
    let visible = props.saveSearch;
    // let getCriteria;
    if (state.visible !== visible) {
      // getCriteria = true;
      return {
        visible: visible,
        getCriteria: true,
        updatedSearchCriteria: props.updatedSearchCriteria
      };
    } else {
      return {
        visible,
        getCriteria: false
      };
    }
    // return null;
  }
  renderTreeNodesSearchCriteria = data =>
    data &&
    data.map((item, index) => {
      if (item.children) {
        return (
          <TreeNode
            selectable={false}
            key={item.key}
            title={
              <Paragraph>
                <Text>{item.title.slice(0, 20)}</Text>
              </Paragraph>
            }
            icon={item.icon ? <Icon type={item.icon} /> : false}
            checkable={false}
            isLeaf={false}
            disabled={item.disabled || false}
            dataRef={item}>
            {this.renderTreeNodesSearchCriteria(item.children)}
          </TreeNode>
        );
      }
      return (
        <TreeNode
          selectable={false}
          title={
            <Paragraph title={item.title}>
              <Text
                style={
                  item.color
                    ? { backgroundColor: item.color, color: '#fff' }
                    : {
                      color: 'inherit',
                      display: 'flex',
                      flexDirection: 'row',
                      flexWrap: 'wrap'
                    }
                }>
                {item.title && item.title.length > 23
                  ? item.title.slice(0, 23) + '...'
                  : item.title}
              </Text>
            </Paragraph>
          }
          checkable={false}
          key={item.key}
          dataRef={item}
        />
      );
    });


  genrateTreeData = (data) => {
    const { formatMessage, searchType, searchTypeTree, simpleSearch, legalHoldAutoLabels, globalAutoLabels } = this.props;
    if (searchType === 1 || (searchType === 4 && searchTypeTree === "S")) {
      let dataSimpleSearchCriteria = [
        { title: 'Keyword', key: '0', children: [] },
        { title: 'Date Range', key: '1', children: [] },
        { title: 'Employees', key: '2', children: [] },
        { title: 'Types', key: '3', children: [] },
        { title: "Labels", key: '4', children: [] }
      ];
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
        key: "1"
      }

      let dateRangeTo = {
        title: `${formatMessage(messages["To:"])} ${to ? to : formatMessage(messages["Any Date"])}`,
        key: "1"
      }

      dataSimpleSearchCriteria[1].children.push(dateRangeFrom)
      dataSimpleSearchCriteria[1].children.push(dateRangeTo)
      let Select_Employees = data.Select_Employees || data.employee
      if (Select_Employees && Select_Employees.length > 0 && Array.isArray(Select_Employees)) {
        Select_Employees.forEach((employ, index) => {
          let child = {
            title: employ,
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
          key: "3"
        }
        try {
          dataSimpleSearchCriteria[3].children.push(child)
        } catch (e) {
          ApiInfo.DEBUGER && console.log("error", e)
        }
      }
      if (data.labelName && data.labelName.length > 0 && Array.isArray(data.labelName)) {
        try {
          let policyData = (legalHoldAutoLabels && legalHoldAutoLabels.legnth > 0 ? legalHoldAutoLabels : (simpleSearch && simpleSearch.LabelType && simpleSearch.LabelType.length > 0 ? simpleSearch.LabelType : globalAutoLabels && globalAutoLabels.length > 0 ? globalAutoLabels : []))
          let child;
          data.labelName.forEach((title, i) => {
            if (title.split("-") && title.split("-").length >= 2) {
              const policyId = title.split("-") && title.split("-")[0] && !isNaN(title.split("-")[0]) && Number(title.split("-")[0]);
              const labelId = title.split("-") && title.split("-")[1] && !isNaN(title.split("-")[1]) && Number(title.split("-")[1]);
              let policy = String(policyId) && policyData && policyData.length && policyData.filter(policy => !isNaN(policy.FILTER_ID) && Number(policy.FILTER_ID) === policyId);
              policy = policy && policy.length && policy[0];
              let labelIndex = policy && policy.LABEL_ID && String(labelId) && policy.LABEL_ID.split(",") && policy.LABEL_ID.split(",").indexOf(String(labelId))
              let labelName = policy && policy.LABEL_NAME && String(labelIndex) && policy.LABEL_NAME.split(",") && policy.LABEL_NAME.split(",")[labelIndex]
              let color = policy && policy.COLOR_CODE && policy.COLOR_CODE.split(",") && policy.COLOR_CODE.split(",")[0];
              let labelType = policy && policy.FILTER_TYPE;
              child = {
                  title: <div style={{ backgroundColor: `${color}`, ...style.labelDropdownStyle }}>
                      <Icon type={labelType && labelType === "G" ? "global" : labelType && labelType === "L" && "folder"} style={{ ...style.labelDropdownStyle }} />{labelName}</div>
              }
              dataSimpleSearchCriteria[4].children.push(child)
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
          dataSimpleSearchCriteria[4].children.push(child)
        } catch (e) {
          ApiInfo.DEBUGER && console.log("error", e)
        }
      }

      this.setState({
        dataSimpleSearchCriteria
      })
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
        data.filterType.forEach(type => {
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
          { title: "Contains any of these terms", key: "3", children: [] },
          { title: "Contains all of these terms", key: "4", children: [] },
          { title: "Contains none of these terms", key: "5", children: [] },
          { title: "Metadata Search", key: "6", children: [] },
        ]
        let dateLabel;
        let toDate;
        let fromDate;
        let date;
        if (data.toDate && data.fromDate && data.fromDate !== data.toDate) {
          dateLabel = []
          toDate = data.toDate.split("-").reverse().join("-")
          fromDate = data.fromDate.split("-").reverse().join("-")
        } else {
          if (data.toDate && data.fromDate && data.fromDate === data.toDate) {
            dateLabel = "Equals: "
            date = data.toDate.split("-").reverse().join("-")
          } else {
            if (data.toDate && !data.fromDate) {
              dateLabel = "Before: "
              date = data.toDate.split("-").reverse().join("-")
            } else {
              if (!data.toDate && data.fromDate) {
                dateLabel = "After: "
                date = data.fromDate.split("-").reverse().join("-")
              } else {
                if (!data.toDate && !data.fromDate) {
                  dateLabel = "Any Date"
                  date = ""
                }
              }
            }
          }
        }
        if (dateLabel && Array.isArray(dateLabel)) {
          let dateRangeFrom = {
            title: `From: ${fromDate}`,
            key: `From: ${fromDate}`
          }
          let dateRangeTo = {
            title: `To: ${toDate}`,
            key: `To: ${toDate}`
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
        } else {
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
        if (data.labelName && data.labelName.length > 0) {
          try {
            let child;
            let policyData = (legalHoldAutoLabels && legalHoldAutoLabels.legnth > 0 ? legalHoldAutoLabels : (simpleSearch && simpleSearch.LabelType && simpleSearch.LabelType.length > 0 ? simpleSearch.LabelType : globalAutoLabels && globalAutoLabels.length > 0 ? globalAutoLabels : []))
            data.labelName.forEach((title, i) => {
              if (title.split("-") && title.split("-").length >= 2) {
                const policyId = title.split("-") && title.split("-")[0] && !isNaN(title.split("-")[0]) && Number(title.split("-")[0]);
                const labelId = title.split("-") && title.split("-")[1] && !isNaN(title.split("-")[1]) && Number(title.split("-")[1]);
                let policy = String(policyId) && policyData && policyData.length && policyData.filter(policy => !isNaN(policy.FILTER_ID) && Number(policy.FILTER_ID) === policyId);
                policy = policy && policy.length && policy[0];
                let labelIndex = policy && policy.LABEL_ID && String(labelId) && policy.LABEL_ID.split(",") && policy.LABEL_ID.split(",").indexOf(String(labelId))
                let labelName = policy && policy.LABEL_NAME && String(labelIndex) && policy.LABEL_NAME.split(",") && policy.LABEL_NAME.split(",")[labelIndex]
                let color = policy && policy.COLOR_CODE && policy.COLOR_CODE.split(",") && policy.COLOR_CODE.split(",")[0];
                let labelType = policy && policy.FILTER_TYPE;
                child = {
                    title: <div style={{ backgroundColor: `${color}`, ...style.labelDropdownStyle }}>
                        <Icon type={labelType && labelType === "G" ? "global" : labelType && labelType === "L" && "folder"} style={{ ...style.labelDropdownStyle }} />{labelName}</div>
                }
                advanceSearchCriteria[2].children.push(child)
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
            advanceSearchCriteria[2].children.push(child)
          } catch (e) {
            ApiInfo.DEBUGER && console.log("error", e)
          }
        }
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
            key: "2"
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
            key: "3"
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
            key: "4"
          }
          try {
            advanceSearchCriteria[5].children.push(child)
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
      }
      else {
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

  handleSearchNameChange = value => {
    this.setState({ editsearchname: value });
  };
  handleSearchDescChange = value => {
    this.setState({ editsearchdesc: value });
  };
  Close = () => {
    this.props.close();
    this.props.form.resetFields();
    this.setState({
      requiredPassword: false
    })
  };

  handleSubmit = data => {
    const {
      edit,
      //searchCriteria,
      // formatMessage,
      updatedSearchCriteria,
      // editSaveSearch,
      //saveSearchData,
      editSaveSearchAction,
      searchType
    } = this.props;
    if (!edit) {
      if (updatedSearchCriteria && searchType === 1) {
        let critearea = updatedSearchCriteria;
        if (critearea && (critearea.contentValue || critearea.toDate || critearea.fromDate || critearea.employee || critearea.filterType)) {
          let contentValue = critearea.contentValue;
          let toDate = critearea.toDate
          let fromDate = critearea.fromDate;
          let employee = critearea.employee;
          let filterType = critearea.filterType;
          let labelType = critearea.labelType;
          let labelName = critearea.labelName
          this.props.form.validateFieldsAndScroll((err, values) => {
            const saveSearchVaules = {
              searchCriteriaDesc: values.Description || "",
              searchCriteriaName: values.Name,
              fromDate: fromDate || "",
              toDate: toDate || "",
              employee: employee,
              filterType: filterType,
              labelType: labelType,
              labelName: labelName,
              contentValue: contentValue,
              toCount: this.props.searchDatatablePageSize || 20
            };
            if (!err) {
              this.props.saveSearchData(saveSearchVaules);
              this.props.close();
            }
          });
        } else {
          message.warn("Please Enter A Search Criteria")
        }
      }
      else if (updatedSearchCriteria && searchType === 2) {
        let critearea = updatedSearchCriteria;
        if (critearea) {
          this.props.form.validateFieldsAndScroll((err, values) => {
            let Apibody = {
              "fromCount": 0, "toCount": critearea.toCount || "", "dateFilter": critearea.dateFilter, "fromDate": critearea.fromDate || "", "toDate": critearea.toDate || "", "filterType": critearea.filterType || "", "labelType": ["_doc"], "anyTerms": critearea.anyTerms || [], "anyTermsType": critearea.anyTermsType || [], "allTerms": critearea.allTerms || [], "allTermsType": critearea.allTermsType || [], "noneTerms": critearea.noneTerms || [], "noneTermsType": critearea.noneTermsType || [], "Metadata": critearea.Metadata || "", "searchCriteriaName": values.Name || "", "searchCriteriaDesc": values.Description || "", "searchType": "A", labelName: critearea.labelName || []
            }
            if (!err) {
              this.props.postAdvancedSavedSearch(Apibody);
              this.props.close();
            }
          });
        }
      }
      else if (updatedSearchCriteria && searchType === 3) {
        let critearea = updatedSearchCriteria;
        if (critearea) {
          this.props.form.validateFieldsAndScroll((err, values) => {
            let Apibody = {
              "filterType": critearea.index || [], "labelType": ["_doc"], "searchCriteriaName": values.Name || "", "searchCriteriaDesc": values.Description || "", "searchType": "Q",
              "body": critearea.body
            }

            if (!err) {
              this.props.postQueryBuilderSavedSearch(Apibody);
              this.props.close();
            }
          });
        }
      }
      else if (updatedSearchCriteria && searchType === 5) {
        let critearea = updatedSearchCriteria;
        if (critearea) {
          this.props.form.validateFieldsAndScroll((err, values) => {
            // let Apibody = {
            //   query: critearea.query || "", resultType: critearea.resultType || "", topN: critearea.topN, startIndex: critearea.startIndex || 0, itemsPerPage: critearea.itemsPerPage || 0, source: critearea.source, emailID: critearea.emailID, customer: critearea.customer, "searchCriteriaName": values.Name || "", "searchCriteriaDesc": values.Description || "", "searchType": "SS",
            // }
            let Apibody = {
               "searchCriteriaName": values.Name || "", "searchCriteriaDesc": values.Description || "", "searchType": "SS", "smartSearchCriteria": critearea
            }
            if (!err) {
              this.props.postSmartSearch(Apibody);
              this.props.close();
            }
          });
        }
      }
      else {
        message.warn('Please Enter A Search Criteria');
      }
    } else {
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          const { editSaveSearch } = this.props;
          // ApiInfo.DEBUGER && console.log("saved Search data", this.props.editSaveSearch)
          let searchType = editSaveSearch && editSaveSearch.SEARCH_TYPE_VALUE;
          const Apibody = {
            scIds: editSaveSearch.SEARCH_CRITERIA_ID,
            searchCriteriaName: values.Name,
            searchCriteriaDesc: values.Description
          };
          switch (searchType) {
            case "S":
              this.props.editSimpleSavedSearch(Apibody);
              this.props.close();
              break;
            case "A":
              this.props.editAdvanceSavedSearchAction(Apibody);
              this.props.close();
              break;
            case "Q":
              this.props.editQueryBuilderSavedSearchAction(Apibody);
              this.props.close();
              break;
            case "SS":
              this.props.editSmartSavedSearch(Apibody);
              this.props.close();
              break;
            default:
              break;
          }
          editSaveSearchAction(Apibody);
          this.props.close();
        }
      });
    }
    // this.props.close();
    this.props.form.resetFields();
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { dataSimpleSearchCriteria, getCriteria, advanceSearchCriteria, dataQueryBuilderSearchCriteria, dataSmartSearchCriteria } = this.state;
    const { edit, editSaveSearch, saveSearch, formatMessage, updatedSearchCriteria, searchType } = this.props;
    getCriteria && updatedSearchCriteria && this.genrateTreeData(updatedSearchCriteria);
    return (
      <Drawer
        style={{ marginTop: 125 }}
        bodyStyle={{ height: 'calc(100vh - 125px)', overflowY: 'auto' }}
        onClose={() => this.Close()}
        width={400}
        visible={saveSearch}
        // onClose={() => this.props.close()}
        closable={false}
        maskStyle={{ backgroundColor: 'transparent' }}>
        <div style={{ ...style.setting.drawerMain }}>
          <div style={{ ...style.setting.drawerIconTitleWrapper }}>
            {edit ? (
              <img
                title=''
                alt=''
                width='40px'
                src={require('../../Assets/icons/SV_ICONS/Edit_Orange.png')}
              />
            ) : (
                <img
                  title=''
                  alt=''
                  width='40px'
                  src={require('../../Assets/icons/SV_ICONS/SaveSearch_Orange.png')}
                />
              )}

            {edit ? (
              <Title
                style={{
                  color: `${color.Blue}`,
                  padding: '15px 0 0 5px',
                  fontSize: 24
                }}>
                {formatMessage(messages['Edit Saved Search'])}
              </Title>
            ) : (
                <Title
                  style={{
                    color: `${color.Blue}`,
                    padding: '15px 0 0 5px',
                    fontSize: 24
                  }}>
                  {formatMessage(messages['Save Search'])}
                </Title>
              )}
          </div>
          <div
            onClick={() => this.props.close()}
            style={{ paddingTop: 10, cursor: 'pointer' }}>
            <img
              src={Clear_Gray}
              title='Close'
              alt=''
              onClick={() => this.Close()}
              width={28}
              height={28}
            />
          </div>
        </div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item style={{ marginTop: '10px' }} label=''>
            {getFieldDecorator('Name', {
              initialValue:
                editSaveSearch && editSaveSearch.SEARCH_CRITERIA_NAME,
              rules: [
                {
                  required: true,
                  message: formatMessage(messages['Enter Search Name'])
                }
              ]
            })(
              <Input
                placeholder={formatMessage(messages['Enter Search Name'])}
                allowClear={true}
                autoComplete='off'
              />
            )}
          </Form.Item>
          <Form.Item label=''>
            {getFieldDecorator('Description', {
              initialValue:
                editSaveSearch && editSaveSearch.SEARCH_CRITERIA_DESC,
              rules: [
                {
                  // required: true,
                  // message: formatMessage(messages['Enter Search Description'])
                }
              ]
            })(
              <TextArea
                row={3}
                autoSize={{ minRows: 3 }}
                placeholder={formatMessage(
                  messages['Enter Search Description']
                )}
              />
            )}
          </Form.Item>

          {!edit && (
            <Form.Item label=''>
              {getFieldDecorator('Saved Criteria', {
                initialValue: editSaveSearch && editSaveSearch.description,
                rules: [{ required: false, message: '' }]
              })(
                <CollapseableHeader
                  heading={formatMessage(messages['SEARCH CRITERIA'])}>
                  <div style={{ padding: '0px 15px' }}>
                    <Tree
                      defaultExpandedKeys={["0", "1", "2", "3", "4"]}
                      autoExpandParent={true}
                    >
                      {this.renderTreeNodesSearchCriteria(
                        searchType === 1 ? dataSimpleSearchCriteria : searchType === 2 ? advanceSearchCriteria : searchType === 3 ? dataQueryBuilderSearchCriteria : searchType === 5 ? dataSmartSearchCriteria : []
                      )}
                    </Tree>
                  </div>
                </CollapseableHeader>
              )}
            </Form.Item>
          )}

          <Form.Item>
            <div style={{ ...style.drawerButtons }}>
              <PrimaryButton
                text={formatMessage(messages['Submit'])}
                onClick={() => this.handleSubmit()}
              />
              <SecondryButton
                text={formatMessage(messages['Cancel'])}
                onClick={() => this.Close()}
              />
            </div>
          </Form.Item>
        </Form>
      </Drawer>
    );
  }
}

const WrappedSaveSearch = Form.create({ name: 'forward_Controls' })(SaveSearch);

const mapStateToProps = state => {
  return {
    simpleSearch: state.SimpleSearchReducer.simpleSearch,
    legalHoldAutoLabels: state.AutoLabelingReducer.legalHoldAutoLabels,
    globalAutoLabels: state.AutoLabelingReducer.globalAutoLabels,
    // loaded: state.SimpleSearchReducer.loaded
    updatedSearchCriteria: state.UpdateSearchCriteriaReducer.updatedSearchCriteria,
    searchType: state.UpdateSearchCriteriaReducer.searchType,
    searchDatatablePageSize: state.UpdateDataTablePageSizeTypes.searchDatatablePageSize
  };
};
const mapDispatchToProps = dispatch => {
  return {
    saveSearchData: data => dispatch(saveSearchData(data)),
    editSimpleSavedSearch: data => dispatch(editSimpleSavedSearch(data)),
    editAdvanceSavedSearchAction: data => dispatch(editAdvanceSavedSearchAction(data)),
    editQueryBuilderSavedSearchAction: data => dispatch(editQueryBuilderSavedSearchAction(data)),
    editSmartSavedSearch: data => dispatch(editSmartSavedSearch(data)),
    postAdvancedSavedSearch: data => dispatch(postAdvancedSavedSearch(data)),
    postQueryBuilderSavedSearch: data => dispatch(postQueryBuilderSavedSearch(data)),
    postSmartSearch: data => dispatch(postSmartSearch(data))


  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedSaveSearch);
