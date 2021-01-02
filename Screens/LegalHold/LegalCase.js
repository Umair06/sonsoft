import React, { Component } from "react";
import { Layout, Typography, Icon, Tabs, Popover, message } from "antd";
import NavHeader from "../../Components/Navbar/Header/Header";
import styles from "../../styles";
import GridViewPageHeader from "../../Components/PageHeader/GridViewPageHeader";
import DataTable from "../../Components/DataTable/DataTable";
import Themes from "../../Assets/Theme/Theme";
import LegalHoldSideBar from "../../Components/PreservationSideBar/PreservationSideBar";
import SearchArchiveSideBar from "../../Components/SearchArchive/SearchArchive";
import ReadingPane from "../../Components/ReadingPane/ReadingPane";
import AdvanceSearch from "../../Components/AdvanceSearch/AdvanceSearch";
import QueryBuilder from "../../Components/Modal/QueryBuilderDrawer.js";
import { defineMessages } from "react-intl";
import { connect } from "react-redux";
import {
  getSimpleSearchAttachment,
  EmptySearchAttachment
} from "../../Redux/Actions/SimpleSearchAction/SimpleSearchAction";
import { updateDataTablePageSize } from "../../Redux/Actions/UpdateDataTablePageSize/UpdateDataTablePageSize";
import {
  queryBuilderSearchData,
  errorMessage,
  clearSearchedResults,
  totalSimpeSearchedDocs,
  postSearchData,
  smartSearch,

} from "../../Redux/Actions/SimpleSearchAction/SimpleSearchAction";
import { getEmail } from "../../Redux/Actions/ReadingPaneAction/DownloadAction";
import { postAdvancedSearch } from "../../Redux/Actions/AdvancedSearchAction/AdvancedSearchAction";
import { fetchExportDropDown } from "../../Redux/Actions/ExportAction/ExportAction";
import { updateSearchCriteria } from "../../Redux/Actions/UpdateSearchCriteriaAction/UpdateSearchCriteriaAction";
import { updateHistory } from "../../Redux/Actions/UpdateHistory/UpdateHistory";
import {
  applyLegalHold,
  getOnholdDocuments,
  applyLegalHoldToAllDocs,
  applyLegalQueryBuildHoldToAllDocs,
  applyLegalAdvanceSearchHoldToAllDocs,
  clearOnholdDocuments,
  onHoldApiBodyData,
  removeAllFromOnHold,
  ApplyLegalHoldToAllSmartSearchDocs
} from "../../Redux/Actions/LegalHoldsActions/LegalHoldsActions";
// import testData from "../../testData";
import OnHold from "./LegalCase/OnHold";
import moment from "moment";
import DataTableHeader from "../../Components/DataTable/Component/DataTableHeader"
import { HtmlToText } from "../../GeneralFunctions/HtmlToText";
import LabelDrawer from "../../Components/ReadingPane/Components/LabelDrawer";
import { getPoliciesData } from "../SearchArchive/utils";
// import * as ApiInfo from "../../APIConfig/ApiParameters";



const messages = defineMessages({
  Type: {
    id: "legalCase.type",
    defaultMessage: "Type"
  },
  Information: {
    id: "legalCase.information",
    defaultMessage: "Information"
  },
  Snippet: {
    id: "legalCase.snippet",
    defaultMessage: "Snippet"
  },
  Labels: {
    id: "legalCase.labels",
    defaultMessage: "Labels"
  },
  "Legal Holds": {
    id: "legalCase.LegalHolds",
    defaultMessage: "Legal Holds"
  },
  "On Hold": {
    id: "legalCase.OnHold",
    defaultMessage: "On Hold"
  },
  "Search Archive": {
    id: "legalCase.SearchArchive",
    defaultMessage: "Search Archive"
  },
  _Home: {
    id: "legalCase._Home",
    defaultMessage: "Home"
  },
  "_Legal Holds": {
    id: "legalCase._LegalHolds",
    defaultMessage: "Legal Holds"
  }
});

const { color } = Themes;
const { Header, Sider, Content } = Layout;
const { Text, Paragraph } = Typography;
const { TabPane } = Tabs;

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
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "start",
//               paddingRight: 15
//             }}
//           >
//             {recordDate}
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
class LegalCase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      caseFilter: "on hold",
      applyOrRemove: 'apply',
      sideMenuSearch: true,
      sideMenuDropdown: true,
      selectedSearchArchiveDocs: [],
      selectedOnHoldDocs: [],
      currentPage: 1,
      onHoldcurrentPage: 1,
      routes: [
        {
          path: "/homescreen",
          exact: true,
          breadCrums: props.formatMessage(messages["_Home"]),
          redirect: "/homescreen"
        },
        {
          path: "/legalholds",
          exact: true,
          breadCrums: props.formatMessage(messages["_Legal Holds"]),
          redirect: "/legalholds"
        },
        {
          // path: '/legalhold/case',
          breadCrums:
            props.location &&
            props.location.state &&
            props.location.state.navigationState &&
            props.location.state.navigationState.CASE_NAME,
          redirect: "/legalholds"
        }
      ]
    };
    message.destroy();
  }

  toggleApplyAndRemoveLabel = applyOrRemove => this.setState({ applyOrRemove: applyOrRemove })

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
            {/* <Text>{val.slice(0, val.indexOf("@"))}<span  title={formatMessage(messages["see all recipents"])}>>></span></Text> */}
            {/* <Popover content={<div>{record._source && record._source.case_site_name.length > 0 && record._source.case_site_name.map((val, ind) => <p style={{ ...styles.noMargin, ...styles.noPadding }} key={ind}>{val}</p>)}</div>} title="Legal Hold(s)" trigger="hover"><p  ={() => this.openCaseNameDrawer(record._source.case_site_name)} style={{ fontSize: 12, cursor: "pointer", color: "blue" }}>{record._source && record._source.case_site_name.length > 0 && record._source.case_site_name.length}</p></Popover></div> */}
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
        //ApiInfo.DEBUGER && console.log("record._source && record._source.header && record._source.header.date", record._source && record._source.header && record._source.header.date)
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
                    <Text key={index} style={{ color: `${color.Dark}`, fontSize: 16, fontFamily: 'Segoe Ui', fontWeight: 500 }} >{val}</Text>
                  ))}
              </Text>
              <Text style={{ display: "flex", flexDirection: "column" }}>
                {record._source &&
                  record._source.to &&
                  record._source.to.length > 0 &&
                  record._source.to
                    .slice(0, 2)
                    .map((val, index) => (
                      <Text key={index}>{index === 0 ? "To: " + val : val}</Text>
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
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                paddingRight: 15
              }}
            >
              {recordDate}
            </div>
          </div>
        );
      },
      disabled: true
    },
    // <Text >{record._source && record._source.from && record._source.from.length > 0 && record._source.from.map((val, index) => !(index > 1) && <Text style={{ color: `${color.Black75}` }}>{val.slice(0, 30)}</Text>)}</Text>
    // <Text style={{ display: "flex", flexDirection: "column" }}>{record._source && record._source.to && record._source.to.length > 0 && record._source.to.map((val, index) => !(index > 1) && <div>{index === 0 ? (val.length > 30 ? "To: " + val.slice(0, 30) + "..." : "To: " + val) : (val.length > 30 ? val.slice(0, 30) + "..." : val)}</div>)}</Text>
    // <Text>{record._source && record._source.attachment_count > 0 && <Icon type="paper-clip" />} <span dangerouslySetInnerHTML={{ __html: subject }}></span></Text>
    {
      title: "Snippet",
      width: "550px",
      render: record => {
        let message_body;
        if (record.highlight && record.highlight.message_body && record.highlight.message_body[0]) {
          message_body = {
            content: HtmlToText(record.highlight.message_body[0]),
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
            content: HtmlToText(record._source && record._source.html_body),
            content_type: "text/html"
          }
        }
        message_body = message_body.content
        // && message_body.content.slice(0, 200)
        return (

          // <Text style={{ overflowWrap: "break-word" }}>{message_body}</Text>
          <Paragraph ellipsis={{ rows: 3 }}>
            <span dangerouslySetInnerHTML={{ __html: message_body }} />
          </Paragraph>

        );
      },
      disabled: true
    },
    {
      title: "Label",
      width: "200px",
      render: record => getPoliciesData(
        record && record._source && record._source.label_policy,
        this.openLabelDrawer,
        this.props && this.props.simpleSearch && this.props.simpleSearch.LabelType,
        null,
        null,
        this.notOnRowClick
      ),
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

  componentDidMount() {
    message.destroy && message.destroy();
  }

  static getDerivedStateFromProps(props, state) {
    let caseInfo = state.caseInfo;
    let attachment = state.attachment;
    // let selectedRows = []
    // let data = props.simplesearchresult
    let openedEmail = state.openedEmail
    if (!caseInfo) {
      caseInfo =
        props.location &&
        props.location.state &&
        props.location.state.navigationState;
    }
    if (
      props.attachment &&
      Array.isArray(props.attachment) &&
      props.attachment.length > 0
    ) {
      attachment = props.attachment[0]._source.attachment;
      // has_attachment = props.attachment[0]._source.has_attachment
    }
    // if (props.selectedRowKeys && Array.isArray(props.selectedRowKeys) && props.selectedRowKeys.length && data && Array.isArray(data) && data.length) {
    //   data.forEach(record => {
    //     if (props.selectedRowKeys.includes(record.key)) {
    //       selectedRows.push(record)
    //     }
    //   })
    // }
    let clickedCase =
      props.location &&
      props.location.state &&
      props.location.state.navigationState &&
      props.location.state.navigationState.CASE_NAME;
    if (!clickedCase) {
      props.updateHistory(props.history, "/legalholds");
    }
    if ((!props.simplesearchresult || !props.simplesearchresult.length) && state.readingPane && state.openedEmail) {
      openedEmail = undefined;
    }
    if (state.caseFilter === "on hold") {
      return {
        caseInfo,
        attachment,
        // selectedOnHoldDocs: selectedRows
        // has_attachment
      }
    } else {
      return {
        caseInfo,
        attachment,
        selectedSearchArchiveDocsKey: props.selectedRowKeys,
        openedEmail
        // selectedSearchArchiveDocs: selectedRows
        // has_attachment
      }
    }
    // return null;
  }

  fetchOnHoldDocuments = () => {
    const { searchDatatablePageSize } = this.props;
    const { caseInfo, currentPage } = this.state;
    let fromCount = (!isNaN(currentPage) && !isNaN(this.props.searchDatatablePageSize)
      && (currentPage - 1) * this.props.searchDatatablePageSize) || 0;
    let toCount = searchDatatablePageSize;
    let APIbody = {
      caseId: caseInfo && +caseInfo.CASE_ID,
      fromCount: fromCount,
      toCount: toCount
    };
    this.props.getOnholdDocuments(APIbody);
  };
  collapseSideMenu = () => {
    const toggleCollapsed = !this.state.collapsed;
    this.setState({
      collapsed: toggleCollapsed
    });
  };
  changeFilter = filter => {
    this.closeReadingPane();
    // filter === "on hold" && this.fetchOnHoldDocuments()
    this.setState({
      caseFilter: filter
    });
  };
  openAdvanceSearchDrawer = (edit) => {
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
  closeAdvanceSearch = (notClearCriteria, tempUpdatedSearchCriteria) => {
    this.closeDrawer("advanceSearch");
    // if (!notClearCriteria && !this.state.editAdvanceSearch) {
    //   this.props.updateSearchCriteria({}, 2);
    //   this.props.totalSimpeSearchedDocs();
    //   this.props.clearSearchedResults();
    // } else {
    //   if (this.state.editAdvanceSearch && tempUpdatedSearchCriteria) {
    tempUpdatedSearchCriteria && this.props.updateSearchCriteria(tempUpdatedSearchCriteria, 2);
    // }
    // }
  };
  openonHoldReadingPane = email => {
    this.props.getEmail(email);
    if (!notOnRowClick) {
      if (
        !this.state.onHoldOpenedEmail ||
        !Array.isArray(this.state.onHoldOpenedEmail) ||
        !this.state.onHoldOpenedEmail[0] ||
        !email ||
        email._id !== this.state.onHoldOpenedEmail[0]._id
      ) {
        this.props.EmptySearchAttachment();
        this.props.getSimpleSearchAttachment(); // here it cancels the previous APIcall
        this.setState({
          onHoldReadingPane: true,
          onHoldHas_attachment: email && email._source && email._source.has_attachment,
          attachment: [],
          onHoldOpenedEmail: email && [email]
        });
        email && email._source && email._source.has_attachment &&
          this.props.getSimpleSearchAttachment(email);
        return false
      }
    } else {
      notOnRowClick = notOnRowClick && false;
      return true
    }
  };

  closeonHoldReadingPane = () => {
    const { currentNode } = this.state;
    if (currentNode !== undefined) {
      currentNode.style.borderLeft = "none";
    }
    this.setState({
      onHoldReadingPane: false,
      onHoldOpenedEmail: undefined
    });
  };

  toggleOnHoldReadingPane = () => {
    const toggleReadingPane = !this.state.onHoldReadingPane;
    const { currentNode } = this.state;
    if (currentNode) {
      currentNode.style.borderLeft = "12px solid transparent";
    }
    this.setState({
      onHoldReadingPane: toggleReadingPane,
      onHoldOpenedEmail: undefined
    });
  };

  toggleReadingPane = () => {
    const toggleReadingPane = !this.state.readingPane;
    const { currentNode } = this.state;
    if (currentNode) {
      currentNode.style.borderLeft = "12px solid transparent";
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
    this.props.getEmail(email);
    if (!notOnRowClick) {
      if (
        !this.state.openedEmail ||
        !Array.isArray(this.state.openedEmail) ||
        !this.state.openedEmail[0] ||
        !email ||
        email._id !== this.state.openedEmail[0]._id
      ) {
        this.props.EmptySearchAttachment();
        this.props.getSimpleSearchAttachment(); // here it cancels the previous APIcall
        this.setState({
          readingPane: true,
          has_attachment: email && email._source && email._source.has_attachment,
          attachment: [],
          openedEmail: email && [email]
        });
        email && email._source && email._source.has_attachment &&
          this.props.getSimpleSearchAttachment(email);
        return false
      }
    } else {
      notOnRowClick = notOnRowClick && false;
      return true
    }
  };

  // openReadingPane = email => {
  //   if (!notOnRowClick) {
  //     this.setState({
  //       readingPane: true,
  //       openedEmail: email
  //     })
  //     this.props.getSimpleSearchAttachment(email)
  //   }
  //   notOnRowClick = notOnRowClick && false
  // }
  closeReadingPane = () => {
    const { currentNode } = this.state;
    if (currentNode !== undefined) {
      currentNode.style.borderLeft = "none";
    }
    this.setState({
      readingPane: false
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
  submitCriteria = () => {
    this.closeAdvanceSearchDrawer();
    this.setState({ criteriaExist: true });
  };

  clearCirteria = () => {
    this.setState({ criteriaExist: false });
  };
  navigateToSavedSearch = () => {
    this.props.history.push({
      pathname: "/savedsearch"
    });
  };
  disappearMark = currentNode => this.setState({ currentNode })

  openDrawer = (drawer, values) => {
    const { prevDrawer } = this.state;
    const toggleDrawer = !this.state[drawer];
    this.setState({
      [drawer]: toggleDrawer,
      [prevDrawer]: prevDrawer !== drawer ? false : toggleDrawer,
      prevDrawer: drawer,
      values
    });
  };

  closeDrawer = drawer => this.setState({ [drawer]: false });


  getSearchCriteriaData = (searchCritearea, advSearch) => {
    let typeCritearea = {
      critearea: searchCritearea,
      advSearch: advSearch
    };
    this.setState({
      searchCritearea: typeCritearea
    });
  };
  openQueryBuilderDrawer = () => {
    this.setState({
      queryBuilder: true
    });
  };
  closeQueryBuilderDrawer = () => {
    this.setState({
      queryBuilder: false
    });
  };

  moveToFilter = clearResults => {
    if (!this.state.sideMenuFilter) {
      this.props.updateSearchCriteria({}, this.props.searchType);
      this.closeAdvanceSearchDrawer();
      // this.props.dataLoaded(false)
      this.closeQueryBuilderDrawer();
      clearResults &&
        this.props.clearSearchedResults({}) &&
        this.props.totalSimpeSearchedDocs(null) &&
        this.closeReadingPane();
      this.setState({
        sideMenuFilter: true,
        sideMenuAdvSearch: false,
        sideMenuSearch: false,
        sideMenuSaveSearch: false,
        sideMenuDropdown: false,
        queryBuilder: false,
        advanceSearch: false
      });
    }
  };

  moveToAdvanceSearch = clearResults => {
    if (!this.state.sideMenuAdvSearch) {
      clearResults && this.closeReadingPane();
      this.props.updateSearchCriteria({});
      this.closeQueryBuilderDrawer();
      this.props.resetSelectedRecords && this.props.resetSelectedRecords();
      clearResults &&
        this.props.clearSearchedResults({}) &&
        this.props.totalSimpeSearchedDocs(null) &&
        this.props.postSearchData({}, true) &&
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
        currentPage: 1
      });
    }
  };
  moveToQueryBuilder = clearResults => {
    if (!this.state.queryBuilder) {
      clearResults && this.closeReadingPane();
      this.props.updateSearchCriteria({});
      this.closeAdvanceSearchDrawer();
      this.props.resetSelectedRecords && this.props.resetSelectedRecords();
      clearResults &&
        this.props.clearSearchedResults({}) &&
        this.props.totalSimpeSearchedDocs(null) &&
        this.props.postSearchData({}, true) &&
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
    if (!this.state.sideMenuSearch) {
      clearResults && this.closeReadingPane();
      this.props.updateSearchCriteria({}, true);
      this.closeAdvanceSearchDrawer();
      this.closeQueryBuilderDrawer();
      this.props.resetSelectedRecords && this.props.resetSelectedRecords();
      clearResults &&
        this.props.clearSearchedResults({}) &&
        this.props.totalSimpeSearchedDocs(null) &&
        this.props.postSearchData({}, true) &&
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
        currentPage: 1
      });
    }
  };
  moveToSaveSearch = clearResults => {
    if (!this.state.sideMenuSaveSearch) {
      clearResults && this.closeReadingPane();
      // this.props.updateSearchCriteria({})
      this.closeAdvanceSearchDrawer();
      this.closeQueryBuilderDrawer();
      this.props.resetSelectedRecords && this.props.resetSelectedRecords();
      clearResults &&
        this.props.clearSearchedResults({}) &&
        this.props.updateSearchCriteria({}) &&
        this.props.totalSimpeSearchedDocs(null) &&
        this.props.postSearchData({}, true) &&
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

  moveToSmartSearch = clearResults => {
    if (!this.state.sideMenuSmartSearch) {
      clearResults && this.closeReadingPane();
      // this.props.updateSearchCriteria({})
      this.closeAdvanceSearchDrawer();
      this.closeQueryBuilderDrawer();
      this.props.resetSelectedRecords && this.props.resetSelectedRecords();
      clearResults &&
        this.props.clearSearchedResults({}) &&
        this.props.updateSearchCriteria({}) &&
        this.props.totalSimpeSearchedDocs(null) &&
        this.props.postSearchData({}, true) &&
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
      openedEmail: undefined
    });
    this.setState({
      currentPage: page
    });
  };

  hideOpenedEmail = () => {
    this.setState({
      onHoldOpenedEmail: undefined
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
        contentValue: customValues.New_Search || customValues.contentValue || "",
        labelName: customValues.Select_LabelsName || customValues.labelName || []
      };
      this.props.clearSearchedResults({});
      this.props.postSearchData(APIbody, false, this.closeReadingPane);
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
          contentValue: customValues.New_Search || customValues.contentValue || "",
          labelName: customValues.Select_LabelsName || customValues.labelName || []
        };
        this.props.clearSearchedResults({});
        this.props.postSearchData(APIbody, false, this.closeReadingPane);
      } else {
        if (searchType === 3 || (searchType === 4 && searchTypeTree === "Q")) {
          let customizedQuery = queryBuilderQuery || updatedSearchCriteria.body;
          customizedQuery = JSON.parse(customizedQuery && customizedQuery);
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
    const { searchDatatablePageSize } = this.props;
    let selectedIndex = [];
    index && index.map(ind => selectedIndex.push(ind));
    let highlightedQuery = JSON.parse(query);
    if (
      highlightedQuery &&
      !highlightedQuery.highlight &&
      highlightedQuery.query
    ) {
      let highlightedQueryqueryfield = Object.keys(highlightedQuery.query);
      let fields = {};
      highlightedQueryqueryfield.forEach(queryType => {
        Object.keys(highlightedQuery.query[queryType]).map(
          criteria => (fields[criteria] = {})
        );
      });
      highlightedQuery.highlight = {
        fields: fields
      };
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
    this.props.queryBuilderSearchData(customizedQuery);
    this.props.updateSearchCriteria(customizedQuery, 3);
    this.props.totalSimpeSearchedDocs();
    this.closeQueryBuilderDrawer();
  };

  getSearchArchiveRowSelection = (selectedRows, selectedRowsKey) => {
    this.setState({
      selectedSearchArchiveDocs: selectedRows,
      selectedSearchArchiveDocsKey: selectedRowsKey
    });
  };


  getOnHoldRowSelection = (selectedRows, selectedRowsKey) => {
    this.setState({
      selectedOnHoldDocs: selectedRowsKey
    });
  };


  onApplyGlobalLabel = () => {
    try {
      const { selectedSearchArchiveDocsKey, caseInfo, currentPage } = this.state;
      const { updatedSearchCriteria, searchDatatablePageSize, smartSearchAccessToken, searchType, searchTypeTree } = this.props;
      if (!isNaN(caseInfo.STATUS) && Number(caseInfo.STATUS) === 1) {
        if (selectedSearchArchiveDocsKey && selectedSearchArchiveDocsKey.length && caseInfo && this.props.updatedSearchCriteria) {
          const APIbody = {
            caseId: caseInfo && caseInfo.CASE_ID,
            caseName: caseInfo && caseInfo.CASE_NAME,
            siteName: caseInfo && caseInfo.SiteName,
            filterType: selectedSearchArchiveDocsKey.map(docs => docs.split("=") && docs.split("=")[2]),
            labelType: ["_doc"],
            docIds: selectedSearchArchiveDocsKey.map(docs => docs.split("=") && docs.split("=")[1])
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
        } else if (!this.props.updatedSearchCriteria) {
          message.warn("No Search Criteria Found")
        }
      } else {
        message.error("cannot apply legal hold, case is already released");
      }
    } catch (e) {
      // console.log("e", e)
    }
  };

  removeAllDocFromOnHold = () => {
    const { updatedSearchCriteria, onHoldDatatablePageSize } = this.props;
    const { caseInfo } = this.state;
    if (caseInfo) {
      const APIbody = {
        "caseId": caseInfo && caseInfo.CASE_ID,
        "caseName": caseInfo && caseInfo.CASE_NAME,
        "siteName": caseInfo && caseInfo.SiteName,
        "searchType": "1",
        "filterType": [],
        "labelType": ["_doc"]
      }
      this.props.removeAllFromOnHold(APIbody, caseInfo, updatedSearchCriteria, onHoldDatatablePageSize)
      this.props.closeReadingPane && this.props.closeReadingPane();
      this.updateCurrentPage(1)
      // closeDrawer && closeDrawer('removeDocument')
      this.props.resetSelectedRecords && this.props.resetSelectedRecords();
      this.closeDrawer('removeDocument')
      this.setState({
        selectedOnHoldDocs: []
      })
    }
  }
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
              // fromDate: (updatedSearchCriteria.from && (moment(updatedSearchCriteria.from).format("YYYY-MM-DD") === "Invalid date" ? updatedSearchCriteria.from : moment(updatedSearchCriteria.from).format("YYYY-MM-DD"))) || "",
              // toDate: (updatedSearchCriteria.to && (moment(updatedSearchCriteria.to).format("YYYY-MM-DD") === "Invalid date" ? updatedSearchCriteria.to : moment(updatedSearchCriteria.to).format("YYYY-MM-DD"))) || "",
              // employee: updatedSearchCriteria.Select_Employees || [],
              // filterType: updatedSearchCriteria.Select_Type || [],
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
              filterType: this.props.simplesearchresult.map(docs => docs._index),
              labelType: ["_doc"],
              docIds: this.props.simplesearchresult.map(docs => docs._id)
            };
            updatedSearchCriteria.fromCount = (!isNaN(currentPage) && !isNaN(this.props.searchDatatablePageSize) && (currentPage - 1) * this.props.searchDatatablePageSize) || 0;
            updatedSearchCriteria.toCount = this.props.searchDatatablePageSize;
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

  returnGridViewPageHeader = caseFilter => {
    const {
      globalLabel,
      createLegalHold,
      saveSearch,
      exportEmail,
      reportEmail,
      routes,
      applyGlobalLabel,
      selectedSearchArchiveDocs
    } = this.state;

    const { formatMessage } = this.props;
    if (caseFilter === "on hold") {
      // return (
      //   // <GridViewPageHeader
      //   //   reportHeading="On Holds Report"
      //   //   openReadingPane={() => this.toggleOnHoldReadingPane()}
      //   //   onHoldTab={true}
      //   //   selectedDocs={this.state.selectedOnHoldDocs}
      //   //   onCase={
      //   //     this.props.location &&
      //   //     this.props.location.state &&
      //   //     this.props.location.state.navigationState &&
      //   //     this.props.location.state.navigationState
      //   //   }
      //   //   historyProp={this.props.history}
      //   //   formatMessage={formatMessage}
      //   //   emailSize={{ totalEmails: this.props.onHoldDataLength }}
      //   //   routes={routes}
      //   //   actions={{ label: true, export: true, remove: true }}
      //   //   globalLabel={globalLabel}
      //   //   exportEmail={exportEmail}
      //   //   reportEmail={reportEmail}
      //   //   iconName="LegalHolds_Blue"
      //   //   title={formatMessage(messages["Legal Holds"])}
      //   //   openDrawer={drawer => this.openDrawer(drawer)}
      //   //   closeDrawer={drawer => this.closeDrawer(drawer)}
      //   // />
      // );
    } else {
      if (caseFilter === "search archive") {
        return (
          <GridViewPageHeader

            selectedDocs={selectedSearchArchiveDocs}
            onApplyGlobalLabel={() => this.onApplyGlobalLabel()}
            selected={
              (selectedSearchArchiveDocs &&
                selectedSearchArchiveDocs.length &&
                selectedSearchArchiveDocs) ||
              this.props.searchedDataLength
            }
            applyLegalHoldToAllDocs={() => this.applyLegalHoldToAllDocs()}
            onCase={
              this.props.location &&
              this.props.location.state &&
              this.props.location.state.navigationState &&
              this.props.location.state.navigationState
            }
            historyProp={this.props.history}
            formatMessage={formatMessage}
            routes={routes}
            openReadingPane={() => this.toggleReadingPane()}
            emailSize={{
              totalEmails: this.props.searchedDataLength
                ? this.props.searchedDataLength
                : this.props.simplesearchresult &&
                this.props.simplesearchresult.length
            }}
            actions={
              caseFilter === "on hold"
                ? { label: true, export: true, }
                : {
                  noSavedSearches: true,
                  saveSearch: true,
                  label: true,
                  lock: true,
                  export: true,
                  readingPane: true
                }
            }
            applyGlobalLabel={applyGlobalLabel}
            saveSearch={saveSearch}
            globalLabel={globalLabel}
            exportEmail={exportEmail}
            reportEmail={reportEmail}
            createLegalHold={createLegalHold}
            iconName="LegalHolds_Blue"
            title={formatMessage(messages["Legal Holds"])}
            openDrawer={drawer => this.openDrawer(drawer)}
            closeDrawer={drawer => this.closeDrawer(drawer)}
            navigateToSavedSearch={() => this.navigateToSavedSearch()
            }
            reportHeading="Search Archive Report"
          />
        );
      }
    }
  };
  openColumConfigDrawer = () => {
    const { caseFilter } = this.state;
    if (caseFilter === "on hold") {
      this.setState({
        OnHoldColumnConfig: true
      })
    } else {
      this.setState({
        SearchArchivedColumnConfig: true
      })
    }
  };

  closeColumConfigDrawer = () => {
    const { caseFilter } = this.state;
    if (caseFilter === "on hold") {
      this.setState({
        OnHoldColumnConfig: false
      })
    } else {
      this.setState({
        SearchArchivedColumnConfig: false
      })
    }
  };

  updateDatatablePageSizeOnHold = (selectedSize, prevPageSize) => {
    // const { caseInfo } = this.props;
    const { currentPage, caseInfo } = this.state;
    this.props.updateDataTablePageSize(+selectedSize, "onHoldDatatablePageSize")
    if (+prevPageSize < +selectedSize) {
      let fromCount = 0
      let toCount = +selectedSize
      this.props.clearOnholdDocuments();
      this.updateCurrentPage(1)
      let APIbody = { "caseId": caseInfo && +caseInfo.CASE_ID, "fromCount": fromCount, "toCount": toCount }
      this.props.getOnholdDocuments(APIbody)
      this.props.onHoldApiBodyData(APIbody)
      // this.props.closeReadingPane && this.props.closeReadingPane()
      this.closeReadingPane()
    } else {
      let from = (currentPage - 1) * prevPageSize
      let pageNo = Math.ceil(from / selectedSize) + 1
      // this.props.closeReadingPane && this.props.closeReadingPane()
      this.closeReadingPane()
      this.updateCurrentPage(pageNo)
    }
  }

  updateOnHoldCurrentPage = (page, pageSize) => {
    const { currentNode } = this.state
    if (currentNode !== undefined) {
      currentNode.style.borderLeft = "none"
    }
    this.hideOpenedEmail && this.hideOpenedEmail()
    page && this.setState({
      onHoldcurrentPage: page
    })
  }
  render() {
    const {
      metadatAcive,
      openedEmail,
      readingPane,
      advanceSearch,
      collapsed,
      caseFilter,
      aboutUsDrawer,
      criteriaExist,
      helpDrawer,
      menuDrawer,
      changePassDrawer,
      profileDrawer,
      notificationDrawer,
      queryBuilder,
      sideMenuDropdown,
      sideMenuSaveSearch,
      sideMenuSearch,
      sideMenuAdvSearch,
      sideMenuSmartSearch,
      sideMenuFilter,
      currentPage,
      queryBuilderSearch,
      // queryDataSize,
      // queryFrom,
      // values,
      selectedSearchArchiveDocs,
      caseInfo,
      currentNode,
      removeDocument,
      onHoldReadingPane,
      onHoldOpenedEmail,
      attachment,
      onHoldHas_attachment,
      has_attachment,
      // APIbody,
      //GridViewData
      globalLabel,
      createLegalHold,
      saveSearch,
      exportEmail,
      reportEmail,
      routes,
      applyGlobalLabel,
      selectedOnHoldDocs,
      editAdvanceSearch,
      SearchArchivedColumnConfig,
      OnHoldColumnConfig,
      selectedSearchArchiveDocsKey,
      APIBody
    } = this.state;
    if (sideMenuSmartSearch && this.columns[2].title !== "%") {
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
        title: <Icon type="like" style={{ fontSize: 25 }} />,
        width: "35px",
        render: record => (
          <div onClick={() => this.notOnRowClick()}>
            <Icon type="like" style={{ fontSize: 25 }} theme={record.liked ? "filled" : "outlined"} onClick={() => {
              record.liked = !record.liked
              record.disliked = false
              this.setState({ liked: record.liked })
            }} />
          </div>
        )
      },
        {
          title: <Icon type="dislike" style={{ fontSize: 25 }} />,
          width: "35px",
          render: record => (
            <div onClick={() => this.notOnRowClick()}>
              <Icon type="dislike" style={{ fontSize: 25 }} theme={record.disliked ? "filled" : "outlined"} onClick={() => {
                record.disliked = !record.disliked
                record.liked = false
                this.setState({ liked: record.liked })
              }} />
            </div>
          )
        })
    } else if (this.columns[2].title === "%" && !sideMenuSmartSearch) {
      this.columns[3].width = "550px"
      this.columns.splice(2, 3)
    }
    const { formatMessage } = this.props;
    const messagesKeys = Object.keys(messages);
    const messagesValues = Object.values(messages);
    this.columns.forEach(c => {
      messagesKeys.forEach((mK, index) => {
        if (c.key === mK) {
          //ApiInfo.DEBUGER && console.log(messagesValues[index]);
          c.title = formatMessage(messagesValues[index]);
        }
      });
    });
    //ApiInfo.DEBUGER && console.log(this.columns);

    // readingPaneColumns.forEach(rpc => {
    //   messagesKeys.forEach((mK, index) => {
    //     if (rpc.key === mK) {
    //       //ApiInfo.DEBUGER && console.log(messagesValues[index]);
    //       rpc.title = formatMessage(messagesValues[index]);
    //     }
    //   });
    // });
    // { this.props.simplesearchresult && this.props.moveToFilter && this.moveToFilter() }
    return (
      <div style={styles.page}>
        <AdvanceSearch
          formatMessage={formatMessage}
          advanceSearch={advanceSearch}
          editAdvanceSearch={editAdvanceSearch}
          close={(norClearCriteria, tempUpdatedSearchCriteria) =>
            this.closeAdvanceSearch(norClearCriteria, tempUpdatedSearchCriteria)
          }
          // close={() => this.closeAdvanceSearchDrawer()}
          submitCriteria={() => this.submitCriteria()}
          updateCurrentPage={currentPage => this.updateCurrentPage(currentPage)}
        />
        <QueryBuilder
          formatMessage={formatMessage}
          handleQueryBuilderSubmit={(query, index) =>
            this.handleQueryBuilderSubmit(query, index)
          }
          queryBuilder={queryBuilder}
          isSideMenuQueryBuilderOpen={!advanceSearch && !sideMenuSmartSearch && !sideMenuSaveSearch && !sideMenuSearch && !sideMenuAdvSearch && !sideMenuFilter}
          close={() => this.closeQueryBuilderDrawer()}
        />
        <Layout style={{ height: "100vh", maxHeight: "100vh", overflowY: "hidden" }}>
          {caseFilter === "on hold" && (
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
                reportHeading="On Holds Report"
                openReadingPane={() => this.toggleOnHoldReadingPane()}
                onHoldTab={true}
                selectedDocs={selectedOnHoldDocs}
                onCase={
                  this.props.location &&
                  this.props.location.state &&
                  this.props.location.state.navigationState &&
                  this.props.location.state.navigationState
                }
                emailSize={{ totalEmails: this.props.onHoldDataLength }}
                routes={routes}
                globalLabel={globalLabel}
                exportEmail={exportEmail}
                reportEmail={reportEmail}
                iconName="LegalHolds_Blue"
                title={formatMessage(messages["Legal Holds"])}
                removeDocument={removeDocument}
                imageFlag
                legalHold="legalHold"
                apiBodyLegalHold={APIBody}
                applyOrRemove={this.state.applyOrRemove}
              />
            </Header>

          )}

          {caseFilter === "search archive" && (
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
                //gridView Data I shifted to header
                selectedDocs={selectedSearchArchiveDocsKey}
                applySelected={selectedSearchArchiveDocsKey && selectedSearchArchiveDocsKey.length}
                onApplyGlobalLabel={() => this.onApplyGlobalLabel()}
                selected={this.props.searchedDataLength}
                applyLegalHoldToAllDocs={() => this.applyLegalHoldToAllDocs()}
                onCase={
                  this.props.location &&
                  this.props.location.state &&
                  this.props.location.state.navigationState &&
                  this.props.location.state.navigationState
                }
                routes={routes}
                openReadingPane={() => this.toggleReadingPane()}
                emailSize={{
                  totalEmails: this.props.searchedDataLength
                    ? this.props.searchedDataLength
                    : this.props.simplesearchresult &&
                    this.props.simplesearchresult.length
                }}
                applyGlobalLabel={applyGlobalLabel}
                saveSearch={saveSearch}
                globalLabel={globalLabel}
                exportEmail={exportEmail}
                reportEmail={reportEmail}
                createLegalHold={createLegalHold}
                iconName="LegalHolds_Blue"
                title={formatMessage(messages["Legal Holds"])}
                navigateToSavedSearch={() => this.navigateToSavedSearch()}
                reportHeading="Search Archive Report"
                imageFlag
                legalHolds='L'
                applyOrRemove={this.state.applyOrRemove}
              />
            </Header>
          )}
          <Layout style={{ overflowY: "hidden" }}>
            {/* {!collapsed && ( */}
            <Sider
              style={{
                backgroundColor: "#F5F7FA",
                // MozBoxShadow: "4px 4px 8px -3px #777",
                // WebkitBoxShadow: "`4px 4px 8px -3px #777",
                // boxShadow: "4px 4px 8px -3px #777 ",
                overflowX: "inherit"
                // overflowY: 'scroll',
              }}
              width={!collapsed ? 260 : 80}
            >
              {caseFilter === "on hold" && (
                <LegalHoldSideBar
                  formatMessage={formatMessage}
                  caseInfo={
                    this.props.location &&
                    this.props.location.state &&
                    this.props.location.state.navigationState
                  }
                  onHold
                  collapsed={collapsed}
                  collapseSideMenu={() => this.collapseSideMenu()}
                />
              )}

              {caseFilter === 'search archive' &&
                <LabelDrawer
                  formatMessage={formatMessage}
                  close={() => this.closeLabelDrawer()}
                  labelDrawer={this.state.labelDrawer}
                  openedEmail={this.state.email}
                // onHold={onHold}
                />}

              {caseFilter === "search archive" && (
                <SearchArchiveSideBar
                  formatMessage={formatMessage}
                  caseInfo={
                    this.props.location &&
                    this.props.location.state &&
                    this.props.location.state.navigationState
                  }
                  setSearchTypeSimple={() => this.setSearchTypeSimple()}
                  currentPageNo={currentPage}
                  updateCurrentPage={(page) => this.updateCurrentPage(page)}
                  moveToFilter={clearResults =>
                    this.moveToFilter(clearResults)
                  }
                  moveToSmartSearch={clearResults =>
                    this.moveToSmartSearch(clearResults)
                  }
                  moveToSaveSearch={clearResults =>
                    this.moveToSaveSearch(clearResults)
                  }
                  moveToSearch={clearResults =>
                    this.moveToSearch(clearResults)
                  }
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
                    smartSearch: sideMenuSmartSearch
                  }}
                  closeReadingPane={() => this.closeReadingPane()}
                  criteriaExist={criteriaExist}
                  openAdvanceSearchDrawer={(edit) =>
                    this.openAdvanceSearchDrawer(edit)
                  }
                  clearCirteria={() => this.clearCirteria()}
                  close={() => this.closeAdvanceSearchDrawer()}
                  closeQueryBuilder={() => this.closeQueryBuilderDrawer()}
                  openQueryBuilderDrawer={this.openQueryBuilderDrawer}
                  collapsed={collapsed}
                  collapseSideMenu={() => this.collapseSideMenu()}

                />
              )}
            </Sider>

            <Content
              style={{
                backgroundColor: "#fff",
                height: "100%",
                overflowY: "hidden"
              }}
            >
              <div style={{ display: "flex", width: "100%" }}>
                {/* {caseFilter === "on hold" && collapsed && (
                  <div style={{ width: 80 }}>
                    <LegalHoldSideBar
                      formatMessage={formatMessage}
                      collapsed={collapsed}
                      collapseSideMenu={() =>
                        this.collapseSideMenu("collapsed")
                      }
                    />
                  </div>
                )}
                {caseFilter === "search archive" && collapsed && (
                  <div style={{ width: 80 }}>
                    <SearchArchiveSideBar
                      formatMessage={formatMessage}
                      collapsed={collapsed}
                      collapseSideMenu={() => this.collapseSideMenu()}
                    />
                  </div>
                )} */}
                {/* {this.returnGridViewPageHeader(caseFilter)} */}
              </div>
              {caseFilter === "search archive"
                &&
                <DataTableHeader openColumConfigDrawer={() => this.openColumConfigDrawer()} formatMessage={formatMessage}
                  noDelete
                  currentPage={currentPage}

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
                    )
                  }
                  totalData={
                    this.props.searchedDataLength
                  }
                  getDataWithPagination={true}

                  data={this.props.simplesearchresult}
                  actions={
                    {
                      syncStatus: false,
                      status: false,
                      archivePublicFolder: false,
                      stubEnable: false,
                      stubPeriod: false,
                      enabled: false,
                      activate: false,
                      //
                      saveSearch: true,
                      report: true,
                      export: true,
                      applyLegalHold: true,
                      lock: true,
                      removeLabel: true,
                      applyLabel: true,
                    }
                  }
                  needRowSelection
                  actionDropdown={true}
                  separator='SearchArchive'
                  openDrawer={drawer => this.openDrawer(drawer)}
                  closeDrawer={drawer => this.closeDrawer(drawer)}
                  toggleApplyAndRemoveLabel={applyOrRemove => this.toggleApplyAndRemoveLabel(applyOrRemove)}
                />}

              {caseFilter === "on hold"
                &&
                <DataTableHeader
                  openColumConfigDrawer={() => this.openColumConfigDrawer()} formatMessage={formatMessage}
                  getDataWithPagination={true}
                  currentPage={this.state.onHoldcurrentPage}
                  removeAllDocFromOnHold={() => this.removeAllDocFromOnHold()}
                  pageSize={this.props.onHoldDatatablePageSize}
                  onPageSizeChange={(selectedSize, prevPageSize, datasearched) =>
                    this.updateDatatablePageSizeOnHold(selectedSize, prevPageSize, datasearched)}
                  totalData={this.props.onHoldDataLength}
                  noDelete
                  data={this.props.onHoldDocuments}
                  needRowSelection
                  actionDropdown={true}
                  separator='SearchArchive'
                  actions={{
                    release: true,
                    export: true,
                    applyTag: true,
                    removeLabel: true,
                    applyLabel: true,
                  }}
                  toggleApplyAndRemoveLabel={applyOrRemove => this.toggleApplyAndRemoveLabel(applyOrRemove)}

                  openDrawer={drawer => this.openDrawer(drawer)}
                  closeDrawer={drawer => this.closeDrawer(drawer)}
                />
              }
              <div className="card-container" style={{ width: "100%", }}>
                <Tabs
                  type="card"
                  tabBarStyle={{ width: "100%", position: "fixed" }}
                  onChange={key => this.changeFilter(key)}
                >
                  <TabPane
                    tab={formatMessage(messages["On Hold"])}
                    key="on hold"
                  ></TabPane>
                  <TabPane
                    tab={formatMessage(messages["Search Archive"])}
                    key="search archive"
                  ></TabPane>
                </Tabs>
              </div>
              {caseFilter === "on hold" && (
                <OnHold
                  getRowSelection={(selectedRows, selectedRowsKey) => this.getOnHoldRowSelection(selectedRows, selectedRowsKey)}
                  notOnRowClick={() => this.notOnRowClick()}
                  caseInfo={caseInfo}
                  currentNode={currentNode}
                  disappearMark={currentNode => this.disappearMark(currentNode)}
                  metadatAcive={metadatAcive}
                  formatMessage={formatMessage}
                  updateCurrentPage={(page, pageSize) => this.updateOnHoldCurrentPage(page, pageSize)}
                  currentPage={this.state.onHoldcurrentPage}
                  openMetadata={() => this.openMetadata()}
                  closeReadingPane={() => this.closeonHoldReadingPane()}
                  openedEmail={onHoldOpenedEmail}
                  has_attachment={onHoldHas_attachment}
                  attachment={this.state.attachment}
                  openReadingPane={email => this.openonHoldReadingPane(email)}
                  closeMetadata={() => this.closeMetadata()}
                  removeDocument={removeDocument}
                  readingPane={onHoldReadingPane}
                  openDrawer={drawer => this.openDrawer(drawer)}
                  closeDrawer={drawer => this.closeDrawer(drawer)}
                  hideOpenedEmail={() => this.hideOpenedEmail()}
                  columnConfig={OnHoldColumnConfig}
                  closeColumConfigDrawer={() => this.closeColumConfigDrawer()}
                  removeAllDocFromOnHold={() => this.removeAllDocFromOnHold()}
                  updateDatatablePageSize={(selectedSize, prevPageSize, datasearched) =>
                    this.updateDatatablePageSizeOnHold(selectedSize, prevPageSize, datasearched)}

                />

              )}
              {caseFilter === "search archive" && (
                <div
                  id="dataTable"
                  style={{
                    display: "flex",
                    width: "100%",
                    height: "inherit",
                    overflowY: "hidden",
                    flexDirection: "column"
                  }}
                >

                  <div style={{
                    display: "flex",
                    width: "100%",
                    overflowY: "hidden",
                  }}>
                    <div
                      style={{
                        height: "inherit",
                        width: readingPane ? "45%" : "100%"
                      }}
                    >
                      <DataTable
                        closeColumConfigDrawer={() => this.closeColumConfigDrawer()}
                        columnConfig={SearchArchivedColumnConfig}
                        noDelete
                        searchPage
                        currentPage={currentPage}
                        totalSelectedRows={selectedSearchArchiveDocs}
                        keyID="_id"
                        keyID_2="_index"
                        seperator="legalCase"
                        getRowSelection={(selectedRows, selectedRowsKey) =>
                          this.getSearchArchiveRowSelection(selectedRows, selectedRowsKey)
                        }
                        queryBuilderSearched={queryBuilderSearch}
                        updateCurrentPage={(page, pageSize) =>
                          this.updateCurrentPage(page, pageSize)
                        }
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
                          )
                        }
                        totalData={
                          this.props.searchedDataLength
                        }
                        pageChanged={this.pageChanged}
                        getDataWithPagination={true}
                        formatMessage={formatMessage}
                        noLoading={true}
                        coveredHeight={240}
                        indicateRow
                        disappearMark={currentNode =>
                          this.disappearMark(currentNode)
                        }
                        onRowClick={email => this.openReadingPane(email)}
                        rowSelection={true}
                        columns={this.columns}
                        data={this.props.simplesearchresult}

                        actions={
                          {
                            syncStatus: false,
                            status: false,
                            archivePublicFolder: false,
                            stubEnable: false,
                            stubPeriod: false,
                            enabled: false,
                            activate: false,
                            //
                            saveSearch: true,
                            report: true,
                            export: true,
                            applyTag: true,
                            applyLegalHold: true,
                            lock: true,
                          }
                        }
                        needRowSelection
                        notOnRowClick={() => this.notOnRowClick()}
                        actionDropdown={true}
                        separator='SearchArchive'
                        openDrawer={drawer => this.openDrawer(drawer)}
                        closeDrawer={drawer => this.closeDrawer(drawer)}
                      />
                    </div>
                    {readingPane && (
                      <div
                        style={{
                          width: "55%",
                          overflow: "auto",
                          height: "inherit",
                          zIndex: 10,
                        }}
                      >
                        <ReadingPane
                          formatMessage={formatMessage}
                          openMetadata={() => this.openMetadata()}
                          closeMetadata={() => this.closeMetadata()}
                          forwardAction
                          closeReadingPane={() => this.closeReadingPane()}
                          metadatAcive={metadatAcive}
                          openedEmail={openedEmail}
                          attachment={attachment}
                          has_attachment={has_attachment}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </Content>
          </Layout>
        </Layout>
      </div >
    );
  }
}
const mapStateToProps = state => {
  return {
    simplesearchresult: state.SimpleSearchReducer.simplesearchresult,
    simpleSearch: state.SimpleSearchReducer.simpleSearch,
    legalHoldAutoLabels: state.AutoLabelingReducer.legalHoldAutoLabels,
    globalAutoLabels: state.AutoLabelingReducer.globalAutoLabels,
    searchArchiveGETError: state.SimpleSearchReducer.searchArchiveGETError,
    searchedDataLength: state.SimpleSearchReducer.searchedDataLength,
    searchDatatablePageSize: state.UpdateDataTablePageSizeTypes.searchDatatablePageSize,
    loaded: state.SimpleSearchReducer.loaded,
    updatedSearchCriteria: state.UpdateSearchCriteriaReducer.updatedSearchCriteria,
    onHoldDocuments: state.LegalHoldsReducer.onHoldDocuments,
    onHoldDataLength: state.LegalHoldsReducer.onHoldDataLength,
    moveToFilter: state.SimpleSearchReducer.moveToFilter,
    attachment: state.SimpleSearchReducer.attachmentid,
    selectedRowKeys: state.updateSelectedRecordsReducer.selectedRowKeys,
    smartSearchAccessToken: state.SimpleSearchReducer.smartSearchAccessToken,
    searchType: state.UpdateSearchCriteriaReducer.searchType,
    searchTypeTree: state.UpdateSearchCriteriaReducer.searchTypeTree,
    onHoldDatatablePageSize: state.UpdateDataTablePageSizeTypes.onHoldDatatablePageSize,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateHistory: (history, pathname) => dispatch(updateHistory(history, pathname)),
    clearSearchedResults: () => dispatch(clearSearchedResults()),
    errorMessage: () => dispatch(errorMessage("searchArchiveGETError", true)),
    postSearchData: (data, cancelRequest, closeReadingPane) => dispatch(postSearchData(data, cancelRequest, closeReadingPane)),
    smartSearch: (data, cancelRequest, smartSearchAccessToken) => dispatch(smartSearch(data, cancelRequest, smartSearchAccessToken)),
    updateDataTablePageSize: (pageLabel, pageSize) => dispatch(updateDataTablePageSize(pageLabel, pageSize)),
    queryBuilderSearchData: (data, cancelRequest) => dispatch(queryBuilderSearchData(data, cancelRequest)),
    totalSimpeSearchedDocs: searchedDataLength => dispatch(totalSimpeSearchedDocs(searchedDataLength)),
    updateSearchCriteria: (searchedData, searchType) => dispatch(updateSearchCriteria(searchedData, searchType)),
    fetchExportDropDown: () => dispatch(fetchExportDropDown()),
    applyLegalHold: (APIbody, updatedSearchCriteria, case_info, pageSize, searchType, smartSearchAccessToken, searchTypeTree, closeReadingPane) => dispatch(applyLegalHold(APIbody, updatedSearchCriteria, case_info, pageSize, searchType, smartSearchAccessToken, searchTypeTree, closeReadingPane)),
    applyLegalHoldToAllDocs: (APIbody, updatedSearchCriteria, case_info, pageSize, searchType, cancelRequest, closeReadingPane) => dispatch(applyLegalHoldToAllDocs(APIbody, updatedSearchCriteria, case_info, pageSize, searchType, cancelRequest, closeReadingPane)),
    applyLegalQueryBuildHoldToAllDocs: (APIbody, updatedSearchCriteria, case_info, pageSize) => dispatch(applyLegalQueryBuildHoldToAllDocs(APIbody, updatedSearchCriteria, case_info, pageSize)),
    ApplyLegalHoldToAllSmartSearchDocs: (totalResultSetSize, APIbody, updatedSearchCriteria, case_info, pageSize, searchType, smartSearchAccessToken, searchTypeTree, closeReadingPane) => dispatch(ApplyLegalHoldToAllSmartSearchDocs(totalResultSetSize, APIbody, updatedSearchCriteria, case_info, pageSize, searchType, smartSearchAccessToken, searchTypeTree, closeReadingPane)),
    applyLegalAdvanceSearchHoldToAllDocs: (APIbody, updatedSearchCriteria, case_info, pageSize) => dispatch(applyLegalAdvanceSearchHoldToAllDocs(APIbody, updatedSearchCriteria, case_info, pageSize)),
    getOnholdDocuments: case_id => dispatch(getOnholdDocuments(case_id)),
    getSimpleSearchAttachment: data => dispatch(getSimpleSearchAttachment(data)),
    EmptySearchAttachment: () => dispatch(EmptySearchAttachment()),
    postAdvancedSearch: data => dispatch(postAdvancedSearch(data)),
    getEmail: data => dispatch(getEmail(data)),
    clearOnholdDocuments: () => dispatch(clearOnholdDocuments()),
    onHoldApiBodyData: apiData => dispatch(onHoldApiBodyData(apiData)),
    removeAllFromOnHold: (APIbody, case_info, updatedSearchCriteria, pageSize) => dispatch(removeAllFromOnHold(APIbody, case_info, updatedSearchCriteria, pageSize))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LegalCase);
//             {/* <OnHold
//                   readingPane={readingPane}
//                   getRowSelection={selectedRows => this.getOnHoldRowSelection(selectedRows)}
//                   notOnRowClick={() => this.notOnRowClick()}
//                   caseInfo={caseInfo}
//                   currentNode={currentNode}
//                   disappearMark={currentNode => this.disappearMark(currentNode)}
//                   metadatAcive={metadatAcive}
//                   formatMessage={formatMessage}
//                   openMetadata={() => this.openMetadata()}
//                   closeReadingPane={() => this.closeonHoldReadingPane()}
//                   openedEmail={onHoldOpenedEmail}
//                   has_attachment={onHoldHas_attachment}
//                   attachment={this.state.attachment}
//                   openReadingPane={email => this.openonHoldReadingPane(email)}
//                   closeMetadata={() => this.closeMetadata()}
//                   removeDocument={removeDocument}
//                   openDrawer={drawer => this.openDrawer(drawer)}
//                   closeDrawer={drawer => this.closeDrawer(drawer)}
//                   hideOpenedEmail={() => this.hideOpenedEmail()}
//                 /> */}
