import React, { Component } from "react";
import { Layout, Typography, Icon, Popover, message } from "antd";
import NavHeader from "../../Components/Navbar/Header/Header";
import DataTable from "../../Components/DataTable/DataTable";
import styles from "../../styles";
import SearchArchiveSideBar from "../../Components/SearchArchive/SearchArchive";
import ReadingPane from "../../Components/ReadingPane/ReadingPane";
import AdvanceSearch from "../../Components/AdvanceSearch/AdvanceSearch";
import QueryBuilder from "../../Components/Modal/QueryBuilderDrawer.js";
import DataTableHeader from "../../Components/DataTable/Component/DataTableHeader"
import { connect } from "react-redux";
import { updateHistory } from "../../Redux/Actions/UpdateHistory/UpdateHistory";
import { updateDataTablePageSize } from "../../Redux/Actions/UpdateDataTablePageSize/UpdateDataTablePageSize";
import {
  queryBuilderSearchData,
  errorMessage,
  clearSearchedResults,
  postSearchData,
  smartSearch,
  totalSimpeSearchedDocs,
  getSimpleSearchAttachment,
  EmptySearchAttachment
} from "../../Redux/Actions/SimpleSearchAction/SimpleSearchAction";
import { getEmail } from "../../Redux/Actions/ReadingPaneAction/DownloadAction";
import { postAdvancedSearch } from "../../Redux/Actions/AdvancedSearchAction/AdvancedSearchAction";
import { updateSearchCriteria } from "../../Redux/Actions/UpdateSearchCriteriaAction/UpdateSearchCriteriaAction";
import { fetchExportDropDown } from "../../Redux/Actions/ExportAction/ExportAction";
import { fetchSavedSearchData } from "../../Redux/Actions/SavedSearchActions/SavedSearchActions"
import {
  applyLegalHold,
  applyLegalHoldToAllDocs,
  applyLegalQueryBuildHoldToAllDocs,
  applyLegalAdvanceSearchHoldToAllDocs,
  ApplyLegalHoldToAllSmartSearchDocs
} from "../../Redux/Actions/LegalHoldsActions/LegalHoldsActions";
import { getFactoidAnswer } from "../../Redux/Actions/ReadingPaneAction/FactoidAction";
import {
  ApplyLegalHoldData
} from '../../Redux/Actions/ApplyLegalHoldAction/ApplyLegalHoldAction';
import { resetSelectedRecords } from "../../Redux/Actions/updateSelectedRecordsAction/updateSelectedRecordsAction";

import { defineMessages } from "react-intl";
import { version } from "../../APIConfig/Config";
import Theme from "../../Assets/Theme/Theme";
import moment from "moment";
import * as ApiInfo from "../../APIConfig/ApiParameters";
import { HtmlToText } from "../../GeneralFunctions/HtmlToText";
import likeStrokeIcon from '../../Assets/icons/Icon Library/Icon Library/RelevantOrange.png'
import dislikeStrokeIcon from '../../Assets/icons/Icon Library/Icon Library/NotRelevantOrange.png'
import LabelDrawer from "../../Components/ReadingPane/Components/LabelDrawer";
import { getPoliciesData } from "./utils";

const { color } = Theme;
const messages = defineMessages({
  Type: {
    id: "searchArchive.type",
    defaultMessage: "Type"
  },
  Information: {
    id: "searchArchive.information",
    defaultMessage: "Information"
  },
  Snippet: {
    id: "searchArchive.snippet",
    defaultMessage: "Snippet"
  },
  Labels: {
    id: "searchArchive.labels",
    defaultMessage: "Labels"
  },
  "Search Archive": {
    id: "searchArchive.SearchArchive",
    defaultMessage: "Search Archive"
  },
  _Home: {
    id: "searchArchive._Home",
    defaultMessage: "Home"
  },
  "_Search Archive": {
    id: "searchArchive._Search Archive",
    defaultMessage: "Search Archive"
  },
  "Search Archive Report": {
    id: "searchArchive.SearchArchiveReport",
    defaultMessage: "Search Archive Report"
  }
});

const { Header, Sider, Content } = Layout;
const { Text, Paragraph } = Typography;
// const readingPaneColumns = [
//   {
//     title: "Type",
//     width: "55px",
//     render: record => renderDataSourceTypeColumn(record),
//     disabled: true
//   },
//   {
//     title: "Information",
//     width: "400px",
//     render: record => {
//       var recordDate =
//         record._source && record._source.header && record._source.header.date
//           ? (moment(new Date(record._source.header.date)).format("DD-MMM-YYYY") === "Invalid date" ? record._source.header.date : moment(new Date(record._source.header.date)).format("DD-MMM-YYYY"))
//           : "";
//       let higlightedSubject =
//         (record && record.highlight && record.highlight.subject) ||
//         (record &&
//           record.highlight &&
//           record.highlight &&
//           record.highlight["subject.keyword"]);
//       let subject = higlightedSubject
//         ? higlightedSubject[0]
//         : record && record._source && record._source.subject;
//       subject = subject && subject.slice(0, 25);
//       return (
//         <div
//           style={{ display: "flex", flexDirection: "row", width: "inherit" }}
//         >
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               width: "70%",
//               whiteSpace: "nowrap",
//               overflow: "hidden",
//               textOverflow: "ellipsis"
//             }}
//           >
//             <Text>
//               {record._source &&
//                 record._source.from &&
//                 record._source.from.length > 0 &&
//                 record._source.from.map(
//                   (val, index) =>
//                     !(index > 1) && (
//                       <Text key={index} style={{ color: `${color.Dark}`, fontSize: 16, fontFamily: 'Segoe Ui', fontWeight: 500 }}>
//                         {val.slice(0, 30)}
//                       </Text>
//                     )
//                 )}
//             </Text>
//             <Text style={{ display: "flex", flexDirection: "column" }}>
//               {record._source &&
//                 record._source.to &&
//                 record._source.to.length > 0 &&
//                 record._source.to.map(
//                   (val, index) =>
//                     !(index > 1) && (
//                       <div key={index}>
//                         {index === 0
//                           ? val.length > 30
//                             ? "To: " + val.slice(0, 30) + "..."
//                             : "To: " + val
//                           : val.length > 30
//                             ? val.slice(0, 30) + "..."
//                             : val}
//                       </div>
//                     )
//                 )}
//             </Text>
//             <Text>
//               {record._source && record._source.attachment_count > 0 && (
//                 <Icon type="paper-clip" />
//               )}{" "}
//               <span style={{ color: color.Dark, fontFamily: 'Segoe UI' }} dangerouslySetInnerHTML={{ __html: subject }}></span>
//             </Text>
//           </div>
//           <div
//             id="dateOfEmail"
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "start",
//               paddingRight: 15,
//             }}
//           >
//             <span> {recordDate}</span>
//           </div>
//         </div>
//       );
//     },
//     disabled: true
//   },
//   {
//     title: "",
//     disabled: true
//   }
// ];


// needed in 7.1
// function styleLabels(labels) {
//   return (
//     labels.slice(0, 2).map((label, index) =>
//       <Popover key={index} content={<div>{labels.map((label, index) => <div key={index}><Text style={{ color: '#fff', margin: "8px 0", backgroundColor: `${label.type === "global" ? 'purple' : 'blue'}` }}>{label.label}</Text></div>)}</div>} title="More Labels">
//         <div key={index} style={{ width: 170 }}>
//           <Text style={{ color: '#fff', padding: 1, backgroundColor: `${label.type === "global" ? 'purple' : 'blue'}` }}>{label.label}</Text>
//         </div>
//       </Popover>
//     )
//   )
// }

function renderDataSourceTypeColumn(record) {
  let DataSourceIcons = { msteams: 'MSTeams72x72.png', symphony: 'Symphony72x72.png', yammer: 'Yammer72x72.png', reuters: 'Reuters-72x72.png', bloomberg: 'Bloomburg72x72.png', slack: 'Slack72x72.png', emls: 'Exchange72x72.png', onedrive: 'OneDrive72x72.png', mssharepoint: 'SharePoint-72x72.png', ews: 'Exchange72x72.png', exchange: 'Exchange72x72.png' }
  let dataSource = record && record._source && record._source ? (record._source.header && record._source.header.header && record._source.header.header && record._source.header.header['x-application'] ? record._source.header.header['x-application'] : record._source.datasource) : null
  let icon = (dataSource && Array.isArray(dataSource)) ? dataSource.length > 0 && DataSourceIcons[dataSource[0].replace(" ", "").toLowerCase()] : dataSource && DataSourceIcons[dataSource.replace(" ", "").toLowerCase()]
  if (icon) {
    return <img alt={dataSource} width={32} src={require(`../../Assets/icons/data_sources/${icon}`)} />
  }
  return
}

let notOnRowClick = false;



class SearchArchive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aboutUsDrawer: false,
      advanceSearch: false,
      criteriaExist: false,
      menuDrawer: false,
      helpDrawer: false,
      profileDrawer: false,
      // sideMenuSearch: false,
      sideMenuDropdown: true,
      // columns: columns,
      currentPage: 1,
      applyOrRemove: 'apply'
    };
  }
  columns = [
    {
      title: "Type",
      width: "50px",
      render: record => renderDataSourceTypeColumn(record),
      disabled: true
    },
    {
      title: <Icon type="lock" style={{ fontSize: 14 }} />,
      width: "30px",
      render: record => (
        <Popover
          content={
            <div>
              {record._source &&
                record._source.case_site_name &&
                Array.isArray(record._source.case_site_name) &&
                record._source.case_site_name.length > 0 &&
                record._source.case_site_name.map((val, ind) => (
                  <p
                    style={{ ...styles.noMargin, ...styles.noPadding }}
                    key={ind}
                  >
                    {val}
                  </p>
                ))}
            </div>
          }
          title="Legal Hold(s)"
          trigger="hover"
        >
          <div>
            <p style={{ fontSize: 12, cursor: "pointer", color: "blue" }}>
              {record._source &&
                record._source.case_site_name &&
                Array.isArray(record._source.case_site_name) &&
                record._source.case_site_name.length > 0 &&
                record._source.case_site_name.length}
            </p>
          </div>
        </Popover>
      ),
      disabled: true
    },
    {
      title: "Information",
      width: "370px",
      render: record => {
        let recordDate =
          record._source && record._source.header && record._source.header.date
            ? (moment(new Date(record._source.header.date)).format("DD-MMM-YYYY") === "Invalid date" ? record._source.header.date : moment.utc(new Date(record._source.header.date)).format("DD-MMM-YYYY"))
            : "";
        let higlightedSubject =
          (record && record.highlight && record.highlight.subject) ||
          (record &&
            record.highlight &&
            record.highlight &&
            record.highlight["subject.keyword"]);
        let subject = higlightedSubject
          ? higlightedSubject[0]
          : record && record._source && record._source.subject;
        subject = subject && subject.slice(0, 25);
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "350px"
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "70%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
              }}
            >
              <Text>
                {record._source &&
                  record._source.from &&
                  record._source.from.length > 0 &&
                  record._source.from.map((val, index) => (
                    <Text key={index} style={{ color: `${color.Dark}`, fontSize: 16, fontFamily: 'Segoe Ui', fontWeight: 500 }}>{val}</Text>
                  ))}
              </Text>
              <Text style={{ display: "flex", flexDirection: "column" }}>
                {record._source &&
                  record._source.to &&
                  record._source.to.length > 0 &&
                  record._source.to
                    .slice(0, 2)
                    .map((val, index) => (
                      <Text key={index} style={{ color: color.Black75, fontFamily: 'Segoe UI' }}>{index === 0 ? "To: " + val : val}</Text>
                    ))}
              </Text>
              <Text>
                {record._source && record._source.attachment_count > 0 && (
                  <Icon type="paper-clip" />
                )}{" "}
                <span style={{ color: color.Dark, fontFamily: 'Segoe UI' }} dangerouslySetInnerHTML={{ __html: subject }}></span>
              </Text>
            </div>
            <div
              id="dateOfEmail"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                padding: '2px 12px 0 0',
                color: color.Black75,
                fontFamily: 'Segoe UI'
              }}
            >
              {recordDate}
            </div>
          </div>
        );
      },
      disabled: true
    },
    // <Text >{record._source && record._source.from && record._source.from.length > 0 && record._source.from.map((val, index) => !(index > 1) && <Text key={index} style={{ color: `${color.Black75}` }}>{val.slice(0, 30)}</Text>)}</Text>
    // <Text style={{ display: "flex", flexDirection: "column" }}>{record._source && record._source.to && record._source.to.length > 0 && record._source.to.map((val, index) => !(index > 1) && <div key={index}>{index === 0 ? (val.length > 30 ? "To: " + val.slice(0, 30) + "..." : "To: " + val) : (val.length > 30 ? val.slice(0, 30) + "..." : val)}</div>)}</Text>
    // <Text>{record._source && record._source.attac  hment_count > 0 && <Icon type="paper-clip" />} <span dangerouslySetInnerHTML={{ __html: subject }}></span></Text>
    {
      title: "Snippet",
      width: "550px",
      render: record => {
        let message_body;
        if (record.highlight && record.highlight.message_body && record.highlight.message_body[0]) {
          message_body = {
            content: HtmlToText(record.highlight.message_body[0], this.props.updatedSearchCriteria.contentValue),
            content_type: "text/html"
          }
        } else if (record.highlight && record.highlight.html_body && record.highlight.html_body[0]) {
          message_body = {
            content: HtmlToText(record.highlight.html_body[0]),
            content_type: "text/html"
          }
        } else if (record._source && record._source.message_body) {
          message_body = {
            content: HtmlToText(record._source.message_body),
            content_type: "text/plain"
          }
        } else {
          message_body = {
            content: HtmlToText(record._source && record._source.message_body),
            content_type: "text/html"
          }
        }
        message_body = message_body.content;
        return (
          <Paragraph ellipsis={{ rows: 3 }}>
            <span dangerouslySetInnerHTML={{ __html: message_body }} />
          </Paragraph>

        );
      },
      disabled: true
    },
    {
      title: "Labels",
      width: "200px",
      render: record => getPoliciesData(
        record && record._source.label_policy,
        this.openLabelDrawer,
        this.props.simpleSearch && this.props.simpleSearch.LabelType,
        null), 
        disabled: true
    },
  ];

  openLabelDrawer = (email) => {
    this.setState({
      labelDrawer: true,
      email
    });
  };

  closeLabelDrawer = () => {
    this.setState({
      labelDrawer: false,
    });
  };

  openDrawerForRecipientAndLabel(message, openDrawer) {
    return
  }

  static getDerivedStateFromProps(props, state) {
    const { attachment } = props;
    let stateAttachment = state.attachment;
    let has_attachment = state.has_attachment;
    let selectedRows = []
    let data = props.simplesearchresult;
    let sideMenuFilter = state.sideMenuFilter
    let sideMenuAdvSearch = state.sideMenuAdvSearch
    let sideMenuSearch = state.sideMenuSearch
    let sideMenuSaveSearch = state.sideMenuSaveSearch
    let sideMenuSmartSearch = state.sideMenuSmartSearch
    let sideMenuDropdown = state.sideMenuDropdown
    let queryBuilder = state.queryBuilder
    let advanceSearch = state.advanceSearch
    let openedEmail = state.openedEmail
    if (attachment && Array.isArray(attachment) && attachment.length > 0) {
      stateAttachment = attachment[0]._source.attachment
      has_attachment = attachment[0]._source.has_attachment
    }
    if (props.selectedRowKeys && Array.isArray(props.selectedRowKeys) && props.selectedRowKeys.length && data && Array.isArray(data) && data.length) {
      data.forEach(record => {
        if (props.selectedRowKeys.includes(record.key)) {
          selectedRows.push(record)
        }
      })
    }
    if ((!props.simplesearchresult || !props.simplesearchresult.length) && state.readingPane && state.openedEmail) {
      openedEmail = undefined;
    }
    switch (props.searchType) {
      case 1:
        // sideMenuFilter = false
        sideMenuAdvSearch = false
        sideMenuSearch = !sideMenuFilter && true
        sideMenuSaveSearch = false
        sideMenuSmartSearch = false
        sideMenuDropdown = !sideMenuFilter && true
        queryBuilder = false
        advanceSearch = false
        break
      case 2:
        // sideMenuFilter = false
        sideMenuAdvSearch = !sideMenuFilter && true
        sideMenuSearch = false
        sideMenuSaveSearch = false
        sideMenuSmartSearch = false
        sideMenuDropdown = !sideMenuFilter && true
        queryBuilder = false
        // advanceSearch = true
        break
      case 3:
        // sideMenuFilter = false
        sideMenuAdvSearch = false
        sideMenuSearch = false
        sideMenuSaveSearch = false
        sideMenuSmartSearch = false
        sideMenuDropdown = false
        // queryBuilder = false
        advanceSearch = false
        break
      case 4:
        // sideMenuFilter = false
        sideMenuAdvSearch = false
        sideMenuSearch = false
        sideMenuSaveSearch = !sideMenuFilter && true
        sideMenuSmartSearch = false
        sideMenuDropdown = !sideMenuFilter && true
        queryBuilder = false
        advanceSearch = false
        break
      case 5:
        // sideMenuFilter = false
        sideMenuAdvSearch = false
        sideMenuSearch = false
        sideMenuSaveSearch = false
        sideMenuSmartSearch = !sideMenuFilter && true
        sideMenuDropdown = !sideMenuFilter && true
        queryBuilder = false
        advanceSearch = false
        break
      default:
        // sideMenuFilter = false
        sideMenuAdvSearch = false
        sideMenuSearch = !sideMenuFilter && true
        sideMenuSaveSearch = false
        sideMenuSmartSearch = false
        sideMenuDropdown = !sideMenuFilter && true
        queryBuilder = false
        advanceSearch = false
    }
    return {
      attachment: stateAttachment,
      has_attachment,
      selectedDocs: selectedRows,
      selectedDocsKey: props.selectedRowKeys,
      sideMenuFilter,
      sideMenuAdvSearch,
      sideMenuSearch,
      sideMenuSaveSearch,
      sideMenuSmartSearch,
      sideMenuDropdown,
      queryBuilder,
      advanceSearch,
      openedEmail
    };
  }

  componentDidMount() {
    this.props.simplesearchresult && this.props.simplesearchresult.length &&
      version > 7.2 &&
      this.moveToFilter();
  }

  collapseSideMenu = () => {
    const toggleCollapsed = !this.state.collapsed;
    this.setState({
      collapsed: toggleCollapsed
    });
  };

  toggleReadingPane = () => {
    const toggleReadingPane = !this.state.readingPane;
    const { currentNode } = this.state;
    if (currentNode) {
      currentNode.style.borderLeft = "none";
    }
    this.setState({
      readingPane: toggleReadingPane,
      openedEmail: undefined
    });
  };

  notOnRowClick() {
    notOnRowClick = true;
  }

  openReadingPane = email => {
    const { sideMenuSmartSearch } = this.state;
    this.props.getEmail(email);
    sideMenuSmartSearch && this.props.getFactoidAnswer()
    if (!notOnRowClick) {
      if (!this.state.openedEmail || !Array.isArray(this.state.openedEmail) || !this.state.openedEmail[0] || !email || email._id !== this.state.openedEmail[0]._id
      ) {
        this.closeDrawer();
        this.props.EmptySearchAttachment();
        this.props.getSimpleSearchAttachment(); // here it cancels the previous APIcall
        this.setState({
          readingPane: true,
          has_attachment: email._source.has_attachment,
          attachment: [],
          openedEmail: [email]
        });
        email._source.has_attachment &&
          this.props.getSimpleSearchAttachment(email);
        notOnRowClick = notOnRowClick && false;
        return false
      }
    } else {
      notOnRowClick = notOnRowClick && false;
      return true
    }
  };

  closeReadingPane = () => {
    const { currentNode } = this.state;
    if (currentNode !== undefined) {
      currentNode.style.borderLeft = "none";
    }
    this.setState({
      readingPane: false,
      openedEmail: undefined
    });
  };

  openMetadata = () => {
    this.setState({
      metadatAcive: true
    });
  };
  closeMetadata = () => {
    this.setState({
      metadatAcive: false
    });
  };

  openAdvanceSearchDrawer = edit => {
    this.setState({
      advanceSearch: true,
      editAdvanceSearch: edit
    });
  };
  closeAdvanceSearchDrawer = () => {
    this.setState({
      advanceSearch: false
    });
  };
  // openQueryBuilderDrawer = () => {
  //   this.setState({
  //     queryBuilder: true
  //   })
  // }
  closeQueryBuilderDrawer = () => {
    this.setState({
      queryBuilder: false
    });
  };

  submitCriteria = () => {
    this.closeReadingPane();
    this.closeAdvanceSearchDrawer();
    this.setState({ criteriaExist: true });
  };
  clearCirteria = () => {
    this.openAdvanceSearchDrawer();
    this.setState({ criteriaExist: false });
  };
  disappearMark = currentNode => {
    this.setState({
      currentNode
    });
  };
  navigateToSavedSearch = () => {
    this.props.updateHistory(this.props.history, "/savedsearch");
  };

  // openDrawer = drawer => {
  //   const { prevDrawer } = this.state;
  //   const toggleDrawer = !this.state[drawer];
  //   this.setState({
  //     [drawer]: toggleDrawer,
  //     [prevDrawer]: prevDrawer !== drawer ? false : toggleDrawer,
  //     prevDrawer: drawer
  //   });
  // };
  
  openDrawer = (drawer, notCloseDrawer) => {
    const { prevDrawer } = this.state;
    const toggleDrawer = !this.state[drawer];
    if (!notCloseDrawer) {
      this.setState({
        [drawer]: toggleDrawer,
        [prevDrawer]: prevDrawer !== drawer ? false : toggleDrawer,
        prevDrawer: drawer
      });
    } else {
      this.setState({
        [drawer]: toggleDrawer
      });
    }
  };
  closeDrawer = drawer => {

    drawer === "applyGlobalLabel" && this.props.ApplyLegalHoldData()
    this.setState({
      [drawer]: false
    });
  };

  moveToFilter = clearResults => {
    if (!this.state.sideMenuFilter) {
      // this.props.updateSearchCriteria({})
      this.closeAdvanceSearchDrawer();
      // this.props.dataLoaded(false)
      this.closeQueryBuilderDrawer();
      // clearResults && this.props.clearSearchedResults({}) && this.props.totalSimpeSearchedDocs(null) && this.props.postSearchData({}, true) && this.props.queryBuilderSearchData({}, true)
      // this.closeReadingPane()
      this.props.resetSelectedRecords && this.props.resetSelectedRecords();
      this.setState({
        sideMenuFilter: true,
        sideMenuAdvSearch: false,
        sideMenuSearch: false,
        sideMenuSaveSearch: false,
        sideMenuSmartSearch: false,
        sideMenuDropdown: false,
        queryBuilder: false,
        advanceSearch: false
      });
    }
  };

  moveToAdvanceSearch = clearResults => {
    const { currentPage, sideMenuFilter } = this.state;
    const { searchType, updatedSearchCriteria } = this.props;
    if (!this.state.sideMenuAdvSearch) {
      clearResults && this.closeReadingPane();
      clearResults ? this.props.updateSearchCriteria({}, 2) : this.props.updateSearchCriteria(updatedSearchCriteria, 2)
      this.closeQueryBuilderDrawer();
      this.props.resetSelectedRecords && this.props.resetSelectedRecords();
      clearResults && (searchType !== 2 || sideMenuFilter) &&
        this.props.clearSearchedResults({}) &&
        this.props.totalSimpeSearchedDocs(null) &&
        this.props.postSearchData({}, true, this.closeReadingPane) &&
        this.props.smartSearch({}, true) &&
        this.props.queryBuilderSearchData({}, true) &&
        this.props.postAdvancedSearch({}, true);
      this.setState({
        advanceSearch: true,
        sideMenuFilter: false,
        sideMenuAdvSearch: true,
        sideMenuSearch: false,
        sideMenuSaveSearch: false,
        sideMenuSmartSearch: false,
        sideMenuDropdown: true,
        queryBuilder: false,
        currentPage: clearResults ? 1 : currentPage,
        editAdvanceSearch: !clearResults
      });
    }
  };
  moveToQueryBuilder = clearResults => {
    const { searchType } = this.props;
    if (!this.state.queryBuilder) {
      clearResults && this.closeReadingPane();
      this.props.updateSearchCriteria({}, 3);
      this.closeAdvanceSearchDrawer();
      this.props.resetSelectedRecords && this.props.resetSelectedRecords();
      clearResults && searchType !== 3 &&
        this.props.clearSearchedResults({}) &&
        this.props.totalSimpeSearchedDocs(null) &&
        this.props.postSearchData({}, true, this.closeReadingPane) &&
        this.props.smartSearch({}, true) &&
        this.props.queryBuilderSearchData({}, true);
      this.setState({
        queryBuilder: true,
        sideMenuFilter: false,
        sideMenuAdvSearch: false,
        sideMenuSearch: false,
        sideMenuSaveSearch: false,
        sideMenuSmartSearch: false,
        sideMenuDropdown: true,
        advanceSearch: false,
        currentPage: 1
      });
    }
  };
  moveToSearch = clearResults => {
    const { currentPage } = this.state;
    const { updatedSearchCriteria } = this.props;
    if (!this.state.sideMenuSearch) {
      clearResults && this.closeReadingPane();
      clearResults ? this.props.updateSearchCriteria({}, 1, true) : this.props.updateSearchCriteria(updatedSearchCriteria, 1, true);
      this.closeAdvanceSearchDrawer();
      this.closeQueryBuilderDrawer();
      this.props.resetSelectedRecords && this.props.resetSelectedRecords();
      clearResults &&
        this.props.clearSearchedResults({}) &&
        this.props.totalSimpeSearchedDocs(null) &&
        this.props.postSearchData({}, true, this.closeReadingPane) &&
        this.props.smartSearch({}, true) &&
        this.props.queryBuilderSearchData({}, true);
      this.setState({
        sideMenuFilter: false,
        sideMenuAdvSearch: false,
        sideMenuSearch: true,
        sideMenuSaveSearch: false,
        sideMenuSmartSearch: false,
        sideMenuDropdown: true,
        queryBuilder: false,
        advanceSearch: false,
        currentPage: clearResults ? 1 : currentPage
      });
    }
  };
  moveToSaveSearch = clearResults => {
    if (!this.state.sideMenuSaveSearch) {
      clearResults && this.closeReadingPane();
      this.props.fetchSavedSearchData()
      this.props.updateSearchCriteria({}, 4)
      this.closeAdvanceSearchDrawer();
      this.closeQueryBuilderDrawer();
      this.props.resetSelectedRecords && this.props.resetSelectedRecords();
      clearResults &&
        this.props.clearSearchedResults({}) &&
        this.props.totalSimpeSearchedDocs(null) &&
        this.props.postSearchData({}, true, this.closeReadingPane) &&
        this.props.smartSearch({}, true) &&
        this.props.queryBuilderSearchData({}, true);
      this.setState({
        sideMenuFilter: false,
        sideMenuAdvSearch: false,
        sideMenuSearch: false,
        sideMenuSaveSearch: true,
        sideMenuSmartSearch: false,
        sideMenuDropdown: true,
        queryBuilder: false,
        advanceSearch: false,
        currentPage: 1
      });
    }
  };
  moveToSmartSearch = () => {
    if (!this.state.sideMenuSmartSearch) {
      this.closeReadingPane();
      this.props.updateSearchCriteria({}, 5)
      this.closeAdvanceSearchDrawer();
      this.closeQueryBuilderDrawer();
      this.props.resetSelectedRecords && this.props.resetSelectedRecords();
      // clearResults &&
      this.props.clearSearchedResults({})
      this.props.updateSearchCriteria({}, 5)
      this.props.totalSimpeSearchedDocs(null)
      this.props.postSearchData({}, true, this.closeReadingPane)
      this.props.queryBuilderSearchData({}, true);
      this.setState({
        sideMenuFilter: false,
        sideMenuAdvSearch: false,
        sideMenuSearch: false,
        sideMenuSaveSearch: false,
        sideMenuDropdown: true,
        sideMenuSmartSearch: true,
        queryBuilder: false,
        advanceSearch: false,
        currentPage: 1
      });
    }
  };

  toggleApplyAndRemoveLabel = applyOrRemove => this.setState({ applyOrRemove: applyOrRemove })

  setSearchTypeSimple = () => {
    this.setState({
      queryBuilderSearch: false
    });
  };

  updateCurrentPage = (page, pageSize) => {
    const { currentNode } = this.state;
    if (currentNode !== undefined) {
      currentNode.style.borderLeft = "none";
    }
    this.setState({
      currentPage: page,
      openedEmail: undefined
    });
  };

  pageChanged = (page, pageSize) => {
    const { queryBuilderSearch, queryBuilderQuery } = this.state;
    const { updatedSearchCriteria, searchType, searchTypeTree, smartSearchAccessToken } = this.props;
    if (!queryBuilderSearch && ((searchType === 1) || (searchType === 4 && searchTypeTree === "S"))) {
      let fromCount = (page - 1) * pageSize;
      let toCount = pageSize;
      this.updateCurrentPage(page);
      let customValues = { ...updatedSearchCriteria };
      customValues.from = customValues.from ? customValues.from.format("YYYY-MM-DD") : ""
      customValues.to = customValues.to ? customValues.to.format("YYYY-MM-DD") : ""
      let APIbody = {
        fromCount: fromCount || 0,
        toCount: toCount || 100,
        fromDate: customValues.from || "",
        toDate: customValues.to || "",
        employee: customValues.Select_Employees || customValues.employee || [],
        filterType: customValues.Select_Type || customValues.filterType || [],
        labelType: customValues.Select_Labels || customValues.labelType || [],
        labelName: customValues.Select_LabelsName || customValues.labelName || [],
        contentValue: customValues.New_Search || customValues.contentValue || ""
      };
      this.props.postSearchData(APIbody, false, this.closeReadingPane, true);
      this.props.clearSearchedResults({});
    } else {
      if (searchType === 3 || (searchType === 4 && searchTypeTree === "Q")) {
        let customizedQuery = queryBuilderQuery || updatedSearchCriteria.body;
        customizedQuery = JSON.parse(customizedQuery);
        this.props.clearSearchedResults({});
        this.updateCurrentPage(page);
        let queryFrom = customizedQuery.from || 0;
        let fromCount = (page - 1) * pageSize + queryFrom;
        customizedQuery.from = fromCount;
        customizedQuery.size = pageSize;
        customizedQuery = JSON.stringify(customizedQuery);
        customizedQuery = {
          body: customizedQuery,
          index: updatedSearchCriteria && updatedSearchCriteria.index && updatedSearchCriteria.index.length ? updatedSearchCriteria.index : []
        };
        this.props.queryBuilderSearchData(customizedQuery);
      } else {
        if (searchType === 2 || (searchType === 4 && searchTypeTree === "A")) {
          let fromCount = (page - 1) * pageSize;
          let toCount = pageSize;
          this.updateCurrentPage(page);
          let customValues = { ...updatedSearchCriteria };
          customValues.fromCount = fromCount;
          customValues.toCount = toCount;
          this.props.clearSearchedResults({});
          this.props.postAdvancedSearch(customValues);
        } else {
          if (searchType === 5 || (searchType === 4 && searchTypeTree === "SS")) {
            let APIbody = { ...updatedSearchCriteria }
            // APIbody.query = APIbody.query
            APIbody.startIndex = (page - 1) * pageSize
            APIbody.itemsPerPage = pageSize
            // APIbody.topN = pageSize * page
            this.updateCurrentPage(page);
            this.props.clearSearchedResults({});
            this.props.smartSearch(APIbody, false, smartSearchAccessToken)
          }
        }
      }
    }

  };

  updateDatatablePageSize = (selectedSize, prevPageSize, datasearched) => {
    const { queryBuilderSearch, queryBuilderQuery } = this.state;
    const { updatedSearchCriteria, searchType, searchTypeTree, smartSearchAccessToken } = this.props;
    this.props.updateDataTablePageSize(selectedSize, "searchDatatablePageSize");
    // if (datasearched) {
    // if (+prevPageSize < +selectedSize) {
    if (this.props.simplesearchresult && this.props.simplesearchresult.length) {
      if (!queryBuilderSearch && ((searchType === 1) || (searchType === 4 && searchTypeTree === "S"))) {
        let fromCount = 0;
        let toCount = selectedSize;
        this.updateCurrentPage(1);
        let customValues = { ...updatedSearchCriteria };
        customValues.from = customValues.from ? customValues.from.format("YYYY-MM-DD") : ""
        customValues.to = customValues.to ? customValues.to.format("YYYY-MM-DD") : ""
        let APIbody = {
          fromCount: fromCount || 0,
          toCount: toCount || 20,
          fromDate: customValues.from || "",
          toDate: customValues.to || "",
          employee: customValues.Select_Employees || customValues.employee || [],
          filterType: customValues.Select_Type || customValues.filterType || [],
          labelType: customValues.Select_Labels || customValues.labelType || [],
          labelName: customValues.Select_Labels || customValues.labelName || [],

          contentValue: customValues.New_Search || customValues.contentValue || ""
        };
        this.props.postSearchData(APIbody, false, this.closeReadingPane, true);
      } else {
        if (searchType === 3 || (searchType === 4 && searchTypeTree === "Q")) {
          let customizedQuery = queryBuilderQuery || updatedSearchCriteria.body;
          customizedQuery = JSON.parse(customizedQuery);
          this.updateCurrentPage(1);
          this.props.clearSearchedResults({});
          customizedQuery.from = 0;
          customizedQuery.size = selectedSize;
          customizedQuery = JSON.stringify(customizedQuery);
          customizedQuery = {
            body: customizedQuery,
            index: updatedSearchCriteria && updatedSearchCriteria.index && updatedSearchCriteria.index.length ? updatedSearchCriteria.index : []
          };
          this.props.queryBuilderSearchData(customizedQuery);
        } else {
          if (searchType === 2 || (searchType === 4 && searchTypeTree === "A")) {
            let fromCount = 0;
            let toCount = selectedSize;
            this.updateCurrentPage(1);
            let customValues = { ...updatedSearchCriteria };
            customValues.fromCount = fromCount;
            customValues.toCount = toCount;
            this.props.clearSearchedResults({});
            this.props.postAdvancedSearch(customValues);
          } else {
            if (searchType === 5 || (searchType === 4 && searchTypeTree === "SS")) {
              let APIbody = { ...updatedSearchCriteria }
              // APIbody.query = APIbody.query
              APIbody.startIndex = 0
              APIbody.itemsPerPage = (selectedSize && Number(selectedSize)) || 20
              // APIbody.topN = (selectedSize && Number(selectedSize)) || 20
              this.props.clearSearchedResults({});
              this.props.smartSearch(APIbody, false, smartSearchAccessToken)
            }
          }
        }
        this.props.resetSelectedRecords && this.props.resetSelectedRecords();
      }
      // } else {
      //   let from = (currentPage - 1) * prevPageSize
      //   let pageNo = Math.ceil(from / selectedSize) + 1
      //   this.updateCurrentPage(pageNo)
      // }
      // }
      this.setState({
        openedEmail: null
      })
    }
  };

  handleQueryBuilderSubmit = (query, index) => {
    try {
      const { searchDatatablePageSize } = this.props;
      let selectedIndex = [];
      index && index.map(ind => selectedIndex.push(ind));
      let highlightedQuery = JSON.parse(query);
      if (
        highlightedQuery && !highlightedQuery.highlight && highlightedQuery.query
      ) {
        // let highlightedQueryqueryfield = Object.keys(highlightedQuery.query);
        // let fields = {};
        // highlightedQueryqueryfield.map(queryType => {
        //   Object.keys(highlightedQuery.query[queryType]).map(
        //     criteria => (fields[criteria] = {})
        //   );
        //   return null;
        // });
        // if(highlightedQuery._source && Array.isArray(highlightedQuery._source)){
        //   if(highlightedQuery._source.includes("subject")){
        //     fields.subject: { "number_of_fragments": 0 },
        //   }
        // }
        highlightedQuery.highlight = {
          "pre_tags": ["<highlight>"],
          "post_tags": ["</highlight>"],
          "fragment_size": 0,
          "no_match_size": 0,
          "require_field_match": true,
          "fields": {
            "html_body": { "number_of_fragments": 0 },
            "message_body": { "number_of_fragments": 0 },
            "subject": { "number_of_fragments": 0 },
            "attachment.data.content": { "number_of_fragments": 0 }
          }
        }
      }
      if (highlightedQuery && !highlightedQuery.aggs) {
        highlightedQuery.aggs = {
          "datasources": {
            "terms": {
              "field": "datasource.keyword",
              "size": 2147483647
            }
          },
          "labels": {
            "terms": {
              "field": "label_policy.keyword",
              "size": 2147483647
            }
          },
          "employees": {
            "terms": {
              "field": "employees.keyword",
              "size": 2147483647
            }
          }
        }
      }
      if (highlightedQuery && !highlightedQuery.sort) {
        highlightedQuery.sort = [
          { "header.date": { "order": "desc" } },
          { "file_path_hash.keyword": { "order": "desc" } },
          { "_score": { "order": "desc" } }
        ]
      }
      highlightedQuery = JSON.stringify(highlightedQuery);
      this.setState({
        queryBuilderSearch: true,
        queryBuilderQuery: highlightedQuery,
        index: selectedIndex
      });
      // this.moveToFilter()
      this.closeReadingPane();
      let customizedQuery = highlightedQuery;

      customizedQuery = JSON.parse(customizedQuery);
      if (customizedQuery) {
        let queryFrom = customizedQuery.from || 0;
        this.setState({
          queryDataSize: customizedQuery.size || 10,
          queryFrom
        });
        if (
          !customizedQuery.size ||
          customizedQuery.size > searchDatatablePageSize
        ) {
          customizedQuery.size = searchDatatablePageSize;
        }
        customizedQuery.from = queryFrom;
      }
      customizedQuery = JSON.stringify(customizedQuery);
      customizedQuery = {
        body: customizedQuery,
        index: selectedIndex && selectedIndex.length ? selectedIndex : []
      };

      this.props.clearSearchedResults({}) &&
        this.props.totalSimpeSearchedDocs(null);
      this.props.queryBuilderSearchData(customizedQuery);
      this.props.updateSearchCriteria(customizedQuery, 3);
      this.props.totalSimpeSearchedDocs();
      this.props.resetSelectedRecords && this.props.resetSelectedRecords();
      this.closeQueryBuilderDrawer();
    } catch (err) {
      if (err.name === "SyntaxError") {
        message.warn("Invalid Query")
      }
      ApiInfo.DEBUGER && console.log("Error", err.response);
    }
  };

  handleChangeCase = (value, opt) => {
    opt && this.setState({
      caseInfo: opt.props.optionLabelProp
    });
  };

  getSelectedDocuments = (selectedRows, selectedRowsKey) => {
    this.setState({
      selectedDocs: selectedRows,
      selectedDocsKey: selectedRowsKey
    });
  };

  onApplyGlobalLabel = () => {
    try {
      const { selectedDocsKey, caseInfo, currentPage } = this.state;
      const { updatedSearchCriteria, searchDatatablePageSize, smartSearchAccessToken, searchType, searchTypeTree } = this.props;
      if (!isNaN(caseInfo.STATUS) && Number(caseInfo.STATUS) === 1) {
        if (selectedDocsKey && selectedDocsKey.length && caseInfo && this.props.updatedSearchCriteria) {
          const APIbody = {
            caseId: caseInfo && caseInfo.CASE_ID,
            caseName: caseInfo && caseInfo.CASE_NAME,
            siteName: caseInfo && caseInfo.SiteName,
            filterType: selectedDocsKey.map(docs => docs.split("=") && docs.split("=")[2]),
            labelType: ["_doc"],
            docIds: selectedDocsKey.map(docs => docs.split("=") && docs.split("=")[1])
          };
          updatedSearchCriteria.fromCount = (!isNaN(currentPage) && !isNaN(this.props.searchDatatablePageSize) && (currentPage - 1) * this.props.searchDatatablePageSize) || 0;
          updatedSearchCriteria.toCount = this.props.searchDatatablePageSize;
          if (updatedSearchCriteria.body) {
            try {
              updatedSearchCriteria.body = JSON.parse(updatedSearchCriteria.body)
            } catch (e) { }
            updatedSearchCriteria.body.from = (!isNaN(currentPage) && !isNaN(this.props.searchDatatablePageSize) && (currentPage - 1) * this.props.searchDatatablePageSize) || 0;
            updatedSearchCriteria.body.size = this.props.searchDatatablePageSize;
            try {
              updatedSearchCriteria.body = JSON.stringify(updatedSearchCriteria.body)
            } catch (e) { }

          }
          if (searchType === 5 || (searchType === 4 && searchTypeTree === "SS")) {
            updatedSearchCriteria.startIndex = (!isNaN(currentPage) && !isNaN(this.props.searchDatatablePageSize) && (currentPage - 1) * this.props.searchDatatablePageSize) || 0;
            updatedSearchCriteria.itemsPerPage = this.props.searchDatatablePageSize;

          }
          this.props.applyLegalHold(
            APIbody,
            updatedSearchCriteria,
            caseInfo,
            searchDatatablePageSize,
            searchType,
            smartSearchAccessToken,
            searchTypeTree,
            this.closeReadingPane
          );
          this.closeReadingPane();
          this.closeDrawer("applyGlobalLabel");
          // this.updateCurrentPage(1);
        } else if (this.props.updatedSearchCriteria) {
          message.warn("No Search Criteria Found")
        }
      } else {
        message.error("cannot apply legal hold, case is already released");
      }
    } catch (e) {
      ApiInfo.DEBUGER && console.log("e", e)
    }
  };

  applyLegalHoldToAllDocs = () => {
    try {
      const { caseInfo, currentPage } = this.state;
      const { updatedSearchCriteria, searchDatatablePageSize, smartSearchAccessToken } = this.props;
      if (!isNaN(caseInfo.STATUS) && Number(caseInfo.STATUS) === 1) {
        if (caseInfo && this.props.updatedSearchCriteria) {
          if (this.props.searchType === 1 || (this.props.searchType === 4 && this.props.searchTypeTree === "S")) {
            let from = updatedSearchCriteria.from || updatedSearchCriteria.fromDate
            let to = updatedSearchCriteria.to || updatedSearchCriteria.toDate
            const APIbody = {
              caseId: (caseInfo && caseInfo.CASE_ID && Number(caseInfo.CASE_ID)) || "",
              caseName: (caseInfo && caseInfo.CASE_NAME) || "",
              siteName: (caseInfo && caseInfo.SiteName) || "",
              fromDate: (from && (moment(from).format("YYYY-MM-DD") === "Invalid date" ? from : moment(from).format("YYYY-MM-DD"))) || "",
              toDate: (to && (moment(to).format("YYYY-MM-DD") === "Invalid date" ? to : moment(to).format("YYYY-MM-DD"))) || "",
              employee: updatedSearchCriteria.Select_Employees || updatedSearchCriteria.employee || [],
              filterType: updatedSearchCriteria.Select_Type || updatedSearchCriteria.filterType || [],
              labelType: ["_doc"],
              labelName: updatedSearchCriteria.labelName || [],
              contentValue: updatedSearchCriteria.New_Search || updatedSearchCriteria.contentValue || ""
            };
            updatedSearchCriteria.fromCount = (!isNaN(currentPage) && !isNaN(this.props.searchDatatablePageSize) && (currentPage - 1) * this.props.searchDatatablePageSize) || 0;
            updatedSearchCriteria.toCount = this.props.searchDatatablePageSize;
            this.props.applyLegalHoldToAllDocs(APIbody, updatedSearchCriteria, caseInfo, searchDatatablePageSize, this.props.searchType, false, this.closeReadingPane);
            this.closeReadingPane();
            this.closeDrawer("applyGlobalLabel");
            // this.updateCurrentPage(1);
          } else if ((this.props.searchType === 3 || (this.props.searchType === 4 && this.props.searchTypeTree === "Q")) && this.props.updatedSearchCriteria.body) {
            if (updatedSearchCriteria.body) {
              try {
                updatedSearchCriteria.body = JSON.parse(updatedSearchCriteria.body)
              } catch (e) { }
              updatedSearchCriteria.body.from = (!isNaN(currentPage) && !isNaN(this.props.searchDatatablePageSize) && (currentPage - 1) * this.props.searchDatatablePageSize) || 0;
              updatedSearchCriteria.body.size = this.props.searchDatatablePageSize;
              try {
                updatedSearchCriteria.body = JSON.stringify(updatedSearchCriteria.body)
              } catch (e) { }
            }
            const APIbody = {
              caseId: (caseInfo && caseInfo.CASE_ID && Number(caseInfo.CASE_ID)) || "",
              caseName: (caseInfo && caseInfo.CASE_NAME) || "",
              siteName: (caseInfo && caseInfo.SiteName) || "",
              filterType: (updatedSearchCriteria && updatedSearchCriteria.index) || [],
              labelType: ["_doc"],
              body: updatedSearchCriteria.body && JSON.parse(updatedSearchCriteria.body)
            }
            this.props.applyLegalQueryBuildHoldToAllDocs(APIbody, updatedSearchCriteria, caseInfo, searchDatatablePageSize);
            this.closeReadingPane();
            this.closeDrawer("applyGlobalLabel");
            // this.updateCurrentPage(1);
          } else if (this.props.searchType === 2 || (this.props.searchType === 4 && this.props.searchTypeTree === "A")) {
            const APIbody = {
              caseId: (caseInfo && caseInfo.CASE_ID && Number(caseInfo.CASE_ID)) || "",
              caseName: (caseInfo && caseInfo.CASE_NAME) || "",
              siteName: (caseInfo && caseInfo.SiteName) || "",
              fromCount: 0,
              toCount: 10,
              dateFilter: updatedSearchCriteria.dateFilter,
              fromDate: updatedSearchCriteria.fromDate,
              toDate: updatedSearchCriteria.toDate,
              filterType: (updatedSearchCriteria.filterType) || [],
              labelType: ["_doc"],
              anyTerms: updatedSearchCriteria.anyTerms,
              anyTermsType: updatedSearchCriteria.anyTermsType,
              allTerms: updatedSearchCriteria.allTerms,
              allTermsType: updatedSearchCriteria.allTermsType,
              noneTerms: updatedSearchCriteria.noneTerms,
              noneTermsType: updatedSearchCriteria.noneTermsType,
              Metadata: updatedSearchCriteria.Metadata,
              labelName: updatedSearchCriteria.labelName || []
            }
            updatedSearchCriteria.fromCount = (!isNaN(currentPage) && !isNaN(this.props.searchDatatablePageSize) && (currentPage - 1) * this.props.searchDatatablePageSize) || 0;
            updatedSearchCriteria.toCount = this.props.searchDatatablePageSize;
            this.props.applyLegalAdvanceSearchHoldToAllDocs(APIbody, updatedSearchCriteria, caseInfo, searchDatatablePageSize);
            this.closeReadingPane();
            this.closeDrawer("applyGlobalLabel");
            // this.updateCurrentPage(1);
          } else if ((this.props.searchType === 5 || (this.props.searchType === 4 && this.props.searchTypeTree === "SS")) && this.props.simplesearchresult && this.props.simplesearchresult.length) {

            const APIbody = {
              caseId: caseInfo && caseInfo.CASE_ID,
              caseName: caseInfo && caseInfo.CASE_NAME,
              siteName: caseInfo && caseInfo.SiteName,
              filterType: [],
              labelType: ["_doc"],
              docIds: this.props.simplesearchresult.map(docs => docs._id)
            };
            updatedSearchCriteria.startIndex = (!isNaN(currentPage) && !isNaN(this.props.searchDatatablePageSize) && (currentPage - 1) * this.props.searchDatatablePageSize) || 0;
            updatedSearchCriteria.itemsPerPage = this.props.searchDatatablePageSize;
            this.props.ApplyLegalHoldToAllSmartSearchDocs(
              this.props.searchedDataLength,
              APIbody,
              updatedSearchCriteria,
              caseInfo,
              searchDatatablePageSize,
              this.props.searchType,
              smartSearchAccessToken,
              this.props.searchTypeTree
            );
            this.closeReadingPane();
            this.closeDrawer("applyGlobalLabel");
            // this.updateCurrentPage(1);
          }
        }
      } else {
        message.error("Cannot apply legal hold, case is already released");
      }
    } catch (e) { }
  };

  closeAdvanceSearch = (notClearCriteria, tempUpdatedSearchCriteria) => {
    this.closeDrawer("advanceSearch");
    // if (!notClearCriteria && !this.state.editAdvanceSearch) {
    // this.props.updateSearchCriteria({}, 2);
    // this.props.totalSimpeSearchedDocs();
    // this.props.clearSearchedResults();
    // } else {
    // if (this.state.editAdvanceSearch && tempUpdatedSearchCriteria) {
    tempUpdatedSearchCriteria && this.props.updateSearchCriteria(tempUpdatedSearchCriteria, 2);
    // }
    // }
  };
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

  render() {
    const {
      readingPane,
      metadatAcive,
      searchText,
      openedEmail,
      // selectedDocs,
      collapsed,
      aboutUsDrawer,
      advanceSearch,
      // dataTableHeight,
      saveSearch,
      globalLabel,
      exportEmail,
      reportEmail,
      applyGlobalLabel,
      // customizedColum,
      changePassDrawer,
      // criteriaExist,
      menuDrawer,
      helpDrawer,
      profileDrawer,
      notificationDrawer,
      createLegalHold,
      queryBuilder,
      searchCritearea,
      sideMenuDropdown,
      sideMenuSaveSearch,
      sideMenuSearch,
      sideMenuAdvSearch,
      sideMenuFilter,
      sideMenuSmartSearch,
      queryBuilderSearch,
      // queryDataSize,
      // queryFrom,
      currentPage,
      // attachment,
      // has_attachment,
      editAdvanceSearch,
      // selectedSearchArchiveDocs,
      columnConfig,
      selectedDocsKey,
    } = this.state;
    const { formatMessage, moveToFilter, searchTypeTree, searchType } = this.props;
    if ((sideMenuSmartSearch || (searchType === 4 && searchTypeTree === "SS")) && this.columns[2].title !== "%") {
      this.columns[3].width = "450px"
      this.columns.splice(2, 0, {
        title: "%",
        width: "35px",
        render: record => (
          <div>
            <span style={{ fontSize: 11 }}>
              {!isNaN(record.score) && Math.round(Number(record.score) * 1000) / 10}
            </span>
          </div>
        )
      }, {
        title: <img
          src={likeStrokeIcon}
          alt='like'
          style={{ width: 33, height: 'auto' }}
        />,
        // <Icon component={() =>} />,
        width: "35px",
        render: record => (
          <div onClick={() => this.notOnRowClick()}>
            <img
              alt="dislike" style={{ width: 33, height: 'auto' }}
              src={likeStrokeIcon}
            // theme={record.liked ? "filled" : "outlined"}
            // onClick={() => {
            //   record.liked = !record.liked
            //   record.disliked = false
            //   this.setState({ liked: record.liked })
            // }}
            />
          </div>
        )
      }, {
          title: <img
            src={dislikeStrokeIcon}
            alt='dislike'
            style={{ width: 33, height: 'auto' }}
          />,
          // <Icon type="dislike" style={{ fontSize: 25 }} />,
          width: "35px",
          render: record => (
            <div onClick={() => this.notOnRowClick()}>

              <img alt="dislike" style={{ width: 33, height: 'auto' }}
                src={dislikeStrokeIcon}
              // theme={record.disliked ? "filled" : "outlined"}
              // onClick={() => {
              //   debugger
              //   record.disliked = !record.disliked
              //   record.liked = false
              //   this.setState({ liked: record.liked })
              // }} 
              />
            </div>
          )
        })
    } else if (this.columns[2].title === "%" && !sideMenuSmartSearch && (searchType !== 4 || searchTypeTree !== "SS")) {
      this.columns[3].width = "550px"
      this.columns.splice(2, 3)
    }
    const messagesKeys = Object.keys(messages);
    const messagesValues = Object.values(messages);
    this.columns.forEach(c => {
      messagesKeys.forEach((mK, index) => {
        if (c.key === mK) {
          c.title = formatMessage(messagesValues[index]);
        }
      });
    });

    version > 7.2 && this.props.simplesearchresult && moveToFilter && (searchType === 2 || this.props.searchTypeTree === 'A' || sideMenuSaveSearch || searchType === 1 || this.props.searchTypeTree === 'S' || sideMenuSearch
      //  searchType === 3 || this.props.searchTypeTree === 'Q'
    ) && this.moveToFilter();

    const routes = [
      {
        path: "/homescreen",
        exact: true,
        breadCrums: formatMessage(messages["_Home"]),
        redirect: "/homescreen"
      },
      {
        path: "/searcharchive",
        exact: true,
        breadCrums: formatMessage(messages["_Search Archive"]),
        redirect: "/searcharchive"
      }
    ];
    return (
      <div style={styles.page}>
        <AdvanceSearch
          formatMessage={formatMessage}
          editAdvanceSearch={editAdvanceSearch}
          advanceSearch={advanceSearch}
          moveToFilter={clearResults => this.moveToFilter(clearResults)}
          updateCurrentPage={currentPage => this.updateCurrentPage(currentPage)}
          close={(norClearCriteria, tempUpdatedSearchCriteria) =>
            this.closeAdvanceSearch(norClearCriteria, tempUpdatedSearchCriteria)
          }
          submitCriteria={() => this.submitCriteria()}
        />

        <LabelDrawer
          formatMessage={formatMessage}
          close={() => this.closeLabelDrawer()}
          labelDrawer={this.state.labelDrawer}
          openedEmail={this.state.email}
        // onHold={onHold}
        />

        <QueryBuilder
          formatMessage={formatMessage}
          handleQueryBuilderSubmit={(query, index) =>
            this.handleQueryBuilderSubmit(query, index)
          }
          moveToFilter={clearResults => this.moveToFilter(clearResults)}
          closeReadingPane={() => this.closeReadingPane()}
          queryBuilder={queryBuilder}
          isSideMenuQueryBuilderOpen={!advanceSearch && !sideMenuSmartSearch && !sideMenuSaveSearch && !sideMenuSearch && !sideMenuAdvSearch && !sideMenuFilter}
          close={() => this.closeQueryBuilderDrawer()}
        />
        <Layout
          style={{ height: "100vh", maxHeight: "100vh", overflowY: "hidden" }}
        >
          <Header style={styles.header}>
            <NavHeader
              formatMessage={formatMessage}
              historyProp={this.props.history}
              aboutUsDrawer={aboutUsDrawer}
              changePassDrawer={changePassDrawer}
              helpDrawer={helpDrawer}
              profileDrawer={profileDrawer}
              notificationDrawer={notificationDrawer}
              menuDrawer={menuDrawer}
              openDrawer={drawer => this.openDrawer(drawer)}
              closeDrawer={drawer => this.closeDrawer(drawer)}
              currentPage={currentPage}
              pageSize={this.props.searchDatatablePageSize}
              //for breadcrums part
              iconName="Search Archive_Blue"
              title={formatMessage(messages["Search Archive"])}
              routes={routes}
              imageFlag='imageFlag'
              //This work for Action Drawers opening 
              saveSearch={saveSearch}
              globalLabel={globalLabel}
              exportEmail={exportEmail}
              reportEmail={reportEmail}
              selected={this.props.searchedDataLength}
              selectedDocs={selectedDocsKey}
              handleChangeCase={this.handleChangeCase}
              onApplyGlobalLabel={caseInfo =>
                this.onApplyGlobalLabel(caseInfo)
              }
              applySelected={selectedDocsKey && selectedDocsKey.length}
              applyLegalHoldToAllDocs={caseInfo =>
                this.applyLegalHoldToAllDocs(caseInfo)
              }
              applyGlobalLabel={applyGlobalLabel}
              createLegalHold={createLegalHold}
              searchCritearea={searchCritearea}
              reportHeading={formatMessage(
                messages["Search Archive Report"]
              )}
              background='background'
              applyOrRemove={this.state.applyOrRemove}
            />
          </Header>
          <Layout style={{ overflowY: "hidden" }}>
            {<Sider
              style={{
                backgroundColor: "#F5F7FA",
                // MozBoxShadow: "4px 4px 8px -3px #777",
                // WebkitBoxShadow: "`4px 4px 8px -3px #777",
                // boxShadow: "4px 4px 8px -3px #777 ",
                overflow: "auto",
                overflowX: "inherit"
                // overflowY: 'scroll',
              }}
              width={!collapsed ? 260 : 80}
            >
              <SearchArchiveSideBar
                setSearchTypeSimple={() => this.setSearchTypeSimple()}
                currentPageNo={currentPage}
                formatMessage={formatMessage}
                moveToFilter={clearResults => this.moveToFilter(clearResults)}
                moveToSmartSearch={clearResults =>
                  this.moveToSmartSearch(clearResults)
                }
                moveToSaveSearch={clearResults =>
                  this.moveToSaveSearch(clearResults)
                }
                moveToSearch={clearResults => this.moveToSearch(clearResults)}
                moveToQueryBuilder={clearResults =>
                  this.moveToQueryBuilder(clearResults)
                }
                moveToAdvanceSearch={clearResults =>
                  this.moveToAdvanceSearch(clearResults)
                }
                sideMenuOptions={{
                  saveSearch: sideMenuSaveSearch,
                  search: sideMenuSearch,
                  advSearch: sideMenuAdvSearch,
                  dropdown: sideMenuDropdown,
                  filter: sideMenuFilter,
                  queryBuilder: queryBuilder,
                  smartSearch: sideMenuSmartSearch
                }}
                closeReadingPane={() => this.closeReadingPane()}
                openAdvanceSearchDrawer={edit =>
                  this.openAdvanceSearchDrawer(edit)
                }
                close={(norClearCriteria, tempUpdatedSearchCriteria) =>
                  this.closeAdvanceSearch(
                    norClearCriteria,
                    tempUpdatedSearchCriteria
                  )
                }
                updateCurrentPage={currentPage => this.updateCurrentPage(currentPage)}
                closeQueryBuilder={() => this.closeQueryBuilderDrawer()}
                openQueryBuilderDrawer={this.openQueryBuilderDrawer}
                collapsed={collapsed}
                collapseSideMenu={() => this.collapseSideMenu()}
              />
            </Sider>
            }

            <Content
              style={{
                backgroundColor: "#fff",
                height: "100%",
                overflowY: "hidden"
              }}
            >
              <div style={{ display: "flex", width: "100%" }}>


                <DataTableHeader
                  openColumConfigDrawer={() => this.openColumConfigDrawer()}
                  navigateToSavedSearch={() => this.navigateToSavedSearch()}
                  openDrawer={(drawer, notCloseDrawer) => this.openDrawer(drawer, notCloseDrawer)}
                  currentPage={currentPage}
                  separator="SearchArchive"
                  pageSize={this.props.searchDatatablePageSize}
                  onPageSizeChange={(
                    selectedSize,
                    prevPageSize,
                    datasearched
                  ) =>
                    this.updateDatatablePageSize(
                      selectedSize,
                      prevPageSize,
                      datasearched
                    )}

                  // totalData={queryBuilderSearch ? (queryDataSize < (this.props.searchedDataLength - queryFrom) ? queryDataSize : this.props.searchedDataLength - queryFrom) : this.props.searchedDataLength}

                  totalData={this.props.searchedDataLength}
                  getDataWithPagination={true}
                  formatMessage={formatMessage}
                  data={this.props.simplesearchresult}
                  actions={{
                    syncStatus: false,
                    status: false,
                    archivePublicFolder: false,
                    stubEnable: false,
                    stubPeriod: false,
                    enabled: false,
                    activate: false,
                    //
                    savedSearch: true,
                    saveSearch: true,
                    report: true,
                    export: true,
                    applyLegalHold: true,
                    applyTag: true,
                    removeLabel: true,
                    applyLabel: true,
                    lock: true
                  }}
                  needRowSelection
                  actionDropdown={true}
                  noDelete={true}
                  toggleApplyAndRemoveLabel={applyOrRemove => this.toggleApplyAndRemoveLabel(applyOrRemove)}
                />


                {/* {collapsed && (
                  <div style={{ width: 80 }}>
                    <SearchArchiveSideBar
                      openQueryBuilderDrawer={() =>
                        this.openQueryBuilderDrawer()
                      }
                      formatMessage={formatMessage}
                      collapsed={collapsed}
                      collapseSideMenu={() => this.collapseSideMenu()}
                    />
                  </div>
                )} */}
                {/* <GridViewPageHeader
                  selected={
                    (selectedSearchArchiveDocs &&
                      selectedSearchArchiveDocs.length &&
                      selectedSearchArchiveDocs) ||
                    this.props.searchedDataLength
                  }
                  selectedDocs={selectedDocs}
                  handleChangeCase={this.handleChangeCase}
                  onApplyGlobalLabel={caseInfo =>
                    this.onApplyGlobalLabel(caseInfo)
                  }
                  applySelected={selectedDocs && selectedDocs.length}
                  applyLegalHoldToAllDocs={caseInfo =>
                    this.applyLegalHoldToAllDocs(caseInfo)
                  }
                  historyProp={this.props.history}
                  formatMessage={formatMessage}
                  routes={routes}
                  actions={{
                    // noSaveSearches: this.state.sideMenuSmartSearch,
                    saveSearch: true,
                    label: version > 7.1 && true,
                    lock: true,
                    export: true,
                    readingPane: true
                  }}
                  emailSize={{
                    totalEmails: this.props.searchedDataLength
                      ? this.props.searchedDataLength
                      : this.props.simplesearchresult &&
                      this.props.simplesearchresult.length
                  }}
                  openReadingPane={() => this.toggleReadingPane()}
                  iconName="Search Archive_Blue"
                  title={formatMessage(messages["Search Archive"])}
                  applyGlobalLabel={applyGlobalLabel}
                  saveSearch={saveSearch}
                  globalLabel={globalLabel}
                  exportEmail={exportEmail}
                  reportEmail={reportEmail}
                  createLegalHold={createLegalHold}
                  openDrawer={(drawer, notCloseDrawer) => this.openDrawer(drawer, notCloseDrawer)}
                  closeDrawer={drawer => this.closeDrawer(drawer)}
                  navigateToSavedSearch={() => this.navigateToSavedSearch()}
                  reportHeading={formatMessage(
                    messages["Search Archive Report"]
                  )}
                /> */}
              </div>

              <div
                style={{
                  display: "flex",
                  overflowY: "hidden",
                  height: "inherit"
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: readingPane ? "45%" : "100%"
                  }}
                >
                  <DataTable
                    closeColumConfigDrawer={() => this.closeColumConfigDrawer()}
                    columnConfig={columnConfig}
                    navigateToSavedSearch={() => this.navigateToSavedSearch()}
                    openDrawer={(drawer, notCloseDrawer) => this.openDrawer(drawer, notCloseDrawer)}
                    datatableMsg="“Please perform NEW SEARCH to see data.”"
                    currentPage={currentPage}
                    notOnRowClick={() => this.notOnRowClick()}
                    getRowSelection={(selectedRows, selectedRowsKey) => this.getSelectedDocuments(selectedRows, selectedRowsKey)}
                    keyID="_id"
                    keyID_2="_index"
                    seperator="SearchArchive"
                    queryBuilderSearched={queryBuilderSearch}
                    updateCurrentPage={(page, pageSize) => this.updateCurrentPage(page, pageSize)}
                    error={this.props.searchArchiveGETError}
                    pageSize={this.props.searchDatatablePageSize}
                    onPageSizeChange={(
                      selectedSize,
                      prevPageSize,
                      datasearched
                    ) =>
                      this.updateDatatablePageSize(
                        selectedSize,
                        prevPageSize,
                        datasearched
                      )}

                    // totalData={queryBuilderSearch ? (queryDataSize < (this.props.searchedDataLength - queryFrom) ? queryDataSize : this.props.searchedDataLength - queryFrom) : this.props.searchedDataLength}

                    totalData={this.props.searchedDataLength}
                    pageChanged={this.pageChanged}
                    getDataWithPagination={true}
                    formatMessage={formatMessage}
                    searchText={searchText}
                    noLoading={true}
                    coveredHeight={200}
                    indicateRow
                    disappearMark={currentNode =>
                      this.disappearMark(currentNode)
                    }
                    onRowClick={email => this.openReadingPane(email)}
                    rowSelection={true}
                    columns={this.columns}
                    data={this.props.simplesearchresult}
                    xscroll={500}
                    actions={{
                      syncStatus: false,
                      status: false,
                      archivePublicFolder: false,
                      stubEnable: false,
                      stubPeriod: false,
                      enabled: false,
                      activate: false,
                      //
                      savedSearch: true,
                      saveSearch: true,
                      report: true,
                      export: true,
                      applyLegalHold: true,
                      applyTag: true,
                      lock: true
                    }}
                    needRowSelection
                    actionDropdown={true}
                    noDelete={true}
                  />
                </div>
                {readingPane && (
                  <div
                    style={{
                      width: "55%",
                      overflow: "auto",
                      height: "inherit"
                    }}
                  >
                    <ReadingPane
                      formatMessage={formatMessage}
                      attachment={this.state.attachment}
                      has_attachment={this.state.has_attachment}
                      forwardAction
                      openMetadata={() => this.openMetadata()}
                      closeMetadata={() => this.closeMetadata()}
                      closeReadingPane={() => this.closeReadingPane()}
                      metadatAcive={metadatAcive}
                      openedEmail={openedEmail}
                      smartSearch={sideMenuSmartSearch}
                    />
                  </div>
                )}
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // loaded:state.SimpleSearchReducer.loaded,
    simplesearchresult: state.SimpleSearchReducer.simplesearchresult,
    simpleSearch: state.SimpleSearchReducer.simpleSearch,
    legalHoldAutoLabels: state.AutoLabelingReducer.legalHoldAutoLabels,
    globazlAutoLabels: state.AutoLabelingReducer.globalAutoLabels,
    searchArchiveGETError: state.SimpleSearchReducer.searchArchiveGETError,
    attachment: state.SimpleSearchReducer.attachmentid,
    searchedDataLength: state.SimpleSearchReducer.searchedDataLength,
    searchDatatablePageSize: state.UpdateDataTablePageSizeTypes.searchDatatablePageSize,
    loaded: state.SimpleSearchReducer.loaded,
    moveToFilter: state.SimpleSearchReducer.moveToFilter,
    updatedSearchCriteria: state.UpdateSearchCriteriaReducer.updatedSearchCriteria,
    searchType: state.UpdateSearchCriteriaReducer.searchType,
    searchTypeTree: state.UpdateSearchCriteriaReducer.searchTypeTree,
    selectedRowKeys: state.updateSelectedRecordsReducer.selectedRowKeys,
    smartSearchAccessToken: state.SimpleSearchReducer.smartSearchAccessToken,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateHistory: (history, pathname) => dispatch(updateHistory(history, pathname)),
    clearSearchedResults: () => dispatch(clearSearchedResults()),
    errorMessage: () => dispatch(errorMessage("searchArchiveGETError", true)),
    postSearchData: (data, cancelRequest, closeReadingPane, notInitialSearch) => dispatch(postSearchData(data, cancelRequest, closeReadingPane, notInitialSearch)),
    smartSearch: (data, cancelRequest, smartSearchAccessToken) => dispatch(smartSearch(data, cancelRequest, smartSearchAccessToken)),
    updateDataTablePageSize: (pageLabel, pageSize) => dispatch(updateDataTablePageSize(pageLabel, pageSize)),
    // dataLoaded: (isDataLoaded) => dispatch(dataLoaded(isDataLoaded)),
    updateSearchCriteria: (searchedData, searchType) => dispatch(updateSearchCriteria(searchedData, searchType)),
    queryBuilderSearchData: (data, cancelRequest) => dispatch(queryBuilderSearchData(data, cancelRequest)),
    totalSimpeSearchedDocs: searchedDataLength => dispatch(totalSimpeSearchedDocs(searchedDataLength)),
    fetchExportDropDown: () => dispatch(fetchExportDropDown()),
    applyLegalHold: (APIbody, updatedSearchCriteria, case_info, pageSize, searchType, smartSearchAccessToken, searchTypeTree, closeReadingPane) => dispatch(applyLegalHold(APIbody, updatedSearchCriteria, case_info, pageSize, searchType, smartSearchAccessToken, searchTypeTree, closeReadingPane)),
    applyLegalHoldToAllDocs: (APIbody, updatedSearchCriteria, case_info, pageSize, searchType, cancelRequest, closeReadingPane) => dispatch(applyLegalHoldToAllDocs(APIbody, updatedSearchCriteria, case_info, pageSize, searchType, cancelRequest, closeReadingPane)),
    ApplyLegalHoldToAllSmartSearchDocs: (totalResultSetSize, APIbody, updatedSearchCriteria, case_info, pageSize, searchType, smartSearchAccessToken, searchTypeTree, closeReadingPane) => dispatch(ApplyLegalHoldToAllSmartSearchDocs(totalResultSetSize, APIbody, updatedSearchCriteria, case_info, pageSize, searchType, smartSearchAccessToken, searchTypeTree, closeReadingPane)),
    applyLegalQueryBuildHoldToAllDocs: (APIbody, updatedSearchCriteria, case_info, pageSize) => dispatch(applyLegalQueryBuildHoldToAllDocs(APIbody, updatedSearchCriteria, case_info, pageSize)),
    applyLegalAdvanceSearchHoldToAllDocs: (APIbody, updatedSearchCriteria, case_info, pageSize) => dispatch(applyLegalAdvanceSearchHoldToAllDocs(APIbody, updatedSearchCriteria, case_info, pageSize)),
    getSimpleSearchAttachment: data => dispatch(getSimpleSearchAttachment(data)),
    getEmail: data => dispatch(getEmail(data)),
    EmptySearchAttachment: () => dispatch(EmptySearchAttachment()),
    postAdvancedSearch: (data, cancelRequest) => dispatch(postAdvancedSearch(data, cancelRequest)),
    ApplyLegalHoldData: data => dispatch(ApplyLegalHoldData(data)),
    resetSelectedRecords: () => dispatch(resetSelectedRecords()),
    fetchSavedSearchData: () => dispatch(fetchSavedSearchData()),
    getFactoidAnswer: (factoidAnswer) => dispatch(getFactoidAnswer(factoidAnswer))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(SearchArchive);

