import React, { Component } from 'react';
import { Layout, Typography, Icon, message } from 'antd';
import NavHeader from "../../Components/Navbar/Header/Header";
import DataTable from "../../Components/DataTable/DataTable";
import styles from "../../styles";
import Theme from "../../Assets/Theme/Theme";
// import GridViewPageHeader from "../../Components/PageHeader/GridViewPageHeader";
import ReadingPane from "../../Components/ReadingPane/ReadingPane";
import MyArchiveEmailSideBar from '../../Components/MyArchivedEmail/MyArchivedEmail';
import AdvanceSearch from "../../Components/AdvanceSearch/AdvanceSearch";
import { defineMessages } from 'react-intl';
import { getMailboxFolderStructure, getAllMailboxes, fetchFolderRelatedDocs, setFolderRelatedDocuments, totalFolderDocs, postSearchData, mailboxes, mailboxFolderStructure } from "../../Redux/Actions/MyArchivedEmailActions/MyArchivedEmailsActions";
import { updateDataTablePageSize } from "../../Redux/Actions/UpdateDataTablePageSize/UpdateDataTablePageSize";
import { getSimpleSearchAttachment, EmptySearchAttachment } from "../../Redux/Actions/SimpleSearchAction/SimpleSearchAction";
import { updateSearchCriteria_MYARCHIVEDEMAILS } from "../../Redux/Actions/UpdateSearchCriteriaAction/UpdateSearchCriteriaAction";
import { getEmail } from "../../Redux/Actions/ReadingPaneAction/DownloadAction";
import { fetchSimpleSearch } from "../../Redux/Actions/SimpleSearchAction/SimpleSearchAction";
import { postAdvancedSearch } from "../../Redux/Actions/AdvancedSearchAction/AdvancedSearchAction";
import { connect } from "react-redux";
import DataTableHeader from "../../Components/DataTable/Component/DataTableHeader"
import { HtmlToText } from "../../GeneralFunctions/HtmlToText";
// import * as ApiInfo from "../../APIConfig/ApiParameters"

// import data from "../../testData";

import moment from "moment";

const messages = defineMessages({
  'Information': {
    id: "myArchivedEmail.information",
    defaultMessage: "Information",
  },
  'Snippet': {
    id: "myArchivedEmail.snippet",
    defaultMessage: "Snippet"
  },
  'My Archived Email': {
    id: "myArchivedEmail.MyArchivedEmail",
    defaultMessage: "My Archived Email"
  },
  '_Home': {
    id: "myArchivedEmail._Home",
    defaultMessage: "Home"
  },
  '_My Archived Email': {
    id: "myArchivedEmail._MyArchivedEmail",
    defaultMessage: "My Archived Email"
  },
})

const { Header, Sider, Content } = Layout;
const { Text } = Typography;
const { color } = Theme;

let notOnRowClick = false;

const columns = [
  {
    title: 'Type',
    width: '50px',
    render: record => (
      renderDataSourceTypeColumn(record)
    ),
    disabled: true
  },
  {
    title: 'Information',
    width: "370px",
    render: record => {
      let recordDate = record._source && record._source.header && record._source.header.date ? (moment(new Date(record._source.header.date)).format('DD-MMM-YYYY') === "Invalid date" ? record._source.header.date : moment.utc(new Date(record._source.header.date)).format("DD-MMM-YYYY")) : ""
      let higlightedSubject = (record && record.highlight && record.highlight.subject) || (record && record.highlight && record.highlight && record.highlight["subject.keyword"])
      let subject = higlightedSubject ? higlightedSubject[0] : record && record._source && record._source.subject
      subject = subject && subject.slice(0, 25)
      return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", width: "350px" }}>
          <div style={{ display: 'flex', flexDirection: 'column', width: "60%", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            <Text >{record._source && record._source.from && record._source.from.length > 0 && record._source.from.map((val, index) => <Text key={index} style={{ color: `${color.Black75}` }}>{val}</Text>)}</Text>
            <Text style={{ display: "flex", flexDirection: "column" }}>{record._source && record._source.to && record._source.to.length > 0 && record._source.to.slice(0, 2).map((val, index) => <Text key={index}>{index === 0 ? ("To: " + val) : (val)}</Text>)}</Text>
            <Text>{record._source && record._source.attachment_count > 0 && <Icon type="paper-clip" />} <span dangerouslySetInnerHTML={{ __html: subject }}></span></Text>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', paddingRight: 15 }}>{recordDate}
          </div>
        </div>
      )
    },
    disabled: true
  },
  // <Text >{record._source && record._source.from && record._source.from.length > 0 && record._source.from.map((val, index) => !(index > 1) && <Text key={index} style={{ color: `${color.Black75}` }}>{val.slice(0, 30)}</Text>)}</Text>
  // <Text style={{ display: "flex", flexDirection: "column" }}>{record._source && record._source.to && record._source.to.length > 0 && record._source.to.map((val, index) => !(index > 1) && <div key={index}>{index === 0 ? (val.length > 30 ? "To: " + val.slice(0, 30) + "..." : "To: " + val) : (val.length > 30 ? val.slice(0, 30) + "..." : val)}</div>)}</Text>
  // <Text>{record._source && record._source.attachment_count > 0 && <Icon type="paper-clip" />} <span dangerouslySetInnerHTML={{ __html: subject }}></span></Text>
  {
    title: 'Snippet',
    render: record => {
      let message_body;
      if (record.highlight && record.highlight.message_body && record.highlight.message_body[0]) {
        message_body = {
          content: HtmlToText(record.highlight.message_body[0]),
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
      message_body = message_body.content && message_body.content.slice(0, 200);
      return (
        <Text>
          <span dangerouslySetInnerHTML={{ __html: message_body }}></span>
        </Text>
      );
    },
    disabled: true
  },
  // {
  //   title: "Labels",
  //   width: "200px",
  //   render: record => <div>{record._source && record._source.label_policy.map((el, ind) => {
  //     let label = el.split("-")
  //     let labelName = label.slice(3).join()
  //     let color = label[2]
  //     return (
  //       label[0] === "G" && <div key={ind} style={{ backgroundColor: `#${color}`, ...styles.labelDropdownStyle }}>
  //         <Icon type="global" style={{ ...styles.labelDropdownStyle }} />{labelName}</div>
  //     )
  //   })}</div>,
  //   disabled: true
  // },
]
// const readingPaneColumns = [
//   {
//     title: 'Type',
//     width: '55px',
//     render: record => (
//       renderDataSourceTypeColumn(record)
//     ),
//     disabled: true
//   },
//   {
//     title: 'Information',
//     width: "400px",
//     render: record => {
//       var recordDate = record._source && record._source.header && record._source.header.date ? (moment(new Date(record._source.header.date)).format('DD-MMM-YYYY') === "Invalid date" ? record._source.header.date : moment.utc(new Date(record._source.header.date)).format("DD-MMM-YYYY")) : ""
//       let higlightedSubject = (record && record.highlight && record.highlight.subject) || (record && record.highlight && record.highlight && record.highlight["subject.keyword"])
//       let subject = higlightedSubject ? higlightedSubject[0] : record && record._source && record._source.subject
//       subject = subject && subject.slice(0, 25)
//       return (
//         <div style={{ display: 'flex', flexDirection: 'row', width: "inherit" }}>
//           <div style={{ display: 'flex', flexDirection: 'column', width: "70%", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
//             <Text >{record._source && record._source.from && record._source.from.length > 0 && record._source.from.map((val, index) => !(index > 1) && <Text key={index} style={{ color: `${color.Black75}` }}>{val.slice(0, 30)}</Text>)}</Text>
//             <Text style={{ display: "flex", flexDirection: "column" }}>{record._source && record._source.to && record._source.to.length > 0 && record._source.to.map((val, index) => !(index > 1) && <div key={index}>{index === 0 ? (val.length > 30 ? "To: " + val.slice(0, 30) + "..." : "To: " + val) : (val.length > 30 ? val.slice(0, 30) + "..." : val)}</div>)}</Text>
//             <Text>{record._source && record._source.attachment_count > 0 && <Icon type="paper-clip" />} <span dangerouslySetInnerHTML={{ __html: subject }}></span></Text>
//           </div>
//           <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', paddingRight: 15 }}>{recordDate}
//           </div>
//         </div>
//       )
//     },
//     disabled: true
//   },
//   {
//     title: '',
//     disabled: true
//   },
// ];

function renderDataSourceTypeColumn(record) {

  let DataSourceIcons = { msteams: 'MSTeams72x72.png', symphony: 'Symphony72x72.png', yammer: 'Yammer72x72.png', reuters: 'Reuters-72x72.png', bloomberg: 'Bloomburg72x72.png', slack: 'Slack72x72.png', eml: 'Exchange72x72.png', onedrive: 'OneDrive72x72.png', mssharepoint: 'SharePoint-72x72.png', ews: 'Exchange72x72.png', exchange: 'Exchange72x72.png' }

  let dataSource = record && record._source && record._source ? (record._source.header && record._source.header.header && record._source.header.header && record._source.header.header['x-application'] ? record._source.header.header['x-application'] : record._source.datasource) : null

  let icon = (dataSource && Array.isArray(dataSource)) ? dataSource.length > 0 && DataSourceIcons[dataSource[0].replace(" ", "").toLowerCase()] : dataSource && DataSourceIcons[dataSource.replace(" ", "").toLowerCase()]
  if (icon) {
    return <img title={dataSource} alt={dataSource} width={32} src={require(`../../Assets/icons/data_sources/${icon}`)} />
  }
  return
}
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


class MyArchiveEmail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      aboutUsDrawer: false,
      menuDrawer: false,
      helpDrawer: false,
      profileDrawer: false,
      sideMenuFilter: true,
      currentPage: 1,

    }
    this.props.setFolderRelatedDocuments([])
    this.props.totalFolderDocs()
  }

  uid = this.props.authenticUserInfo && this.props.authenticUserInfo.data && this.props.authenticUserInfo.data.data && this.props.authenticUserInfo.data.data.output && Array.isArray(this.props.authenticUserInfo.data.data.output) && this.props.authenticUserInfo.data.data.output[0] && this.props.authenticUserInfo.data.data.output[0].uid

  routes = [
    {
      path: `/homescreen/${this.routes}`,
      exact: true,
      breadCrums: this.props.formatMessage(messages["_Home"]),
      redirect: '/homescreen',
    },
    {
      path: '/myarchivedemail',
      exact: true,
      breadCrums: this.props.formatMessage(messages["_My Archived Email"]),
      redirect: '/myarchivedemail'
    }
  ]
  moveToAdvanceSearch = clearResults => {
    const { searchType } = this.props;
    if (!this.state.sideMenuAdvSearch) {
      // clearResults && this.closeReadingPane();
      // this.props.updateSearchCriteria({});
      // clearResults &&
      //   this.props.clearSearchedResults({}) &&
      //   this.props.totalSimpeSearchedDocs(null) &&
      if (searchType !== 'A2') {
        this.props.postSearchData({}, true)
        //   this.props.postAdvancedSearch({}, true);
        this.props.totalFolderDocs()
        this.props.setFolderRelatedDocuments([])
        this.props.updateSearchCriteria({})
        this.closeReadingPane()
      }
      message.destroy()
      this.setState({
        advanceSearch: true,
        sideMenuFilter: false,
        sideMenuAdvSearch: true,
        sideMenuSearch: false,
        sideMenuDropdown: true,
        currentPage: 1
      });
    }
  };
  moveToSearch = clearResults => {
    if (!this.state.sideMenuSearch) {
      // clearResults && this.closeReadingPane();
      // this.props.updateSearchCriteria({}, true);
      // this.closeAdvanceSearchDrawer();
      // clearResults &&
      //   this.props.clearSearchedResults({}) &&
      //   this.props.totalSimpeSearchedDocs(null) &&
      this.props.postSearchData({}, true)
      this.props.totalFolderDocs()
      this.props.setFolderRelatedDocuments([])
      this.props.updateSearchCriteria({})
      this.props.fetchSimpleSearch()
      this.closeReadingPane()
      message.destroy()
      this.setState({
        sideMenuFilter: false,
        sideMenuAdvSearch: false,
        sideMenuSearch: true,
        sideMenuDropdown: true,
        advanceSearch: false,
        currentPage: 1
      });
    }
  };
  moveToFilter = clearResults => {
    const { inboxFolerKey } = this.state;
    if (!this.state.sideMenuFilter) {
      // this.props.updateSearchCriteria({})
      this.closeAdvanceSearchDrawer();
      // this.props.dataLoaded(false)
      // this.closeReadingPane()
      this.props.totalFolderDocs()
      this.props.setFolderRelatedDocuments([])
      this.props.updateSearchCriteria({})
      this.getSelectedFolderKey(inboxFolerKey)
      this.closeReadingPane()
      message.destroy()
      this.setState({
        sideMenuFilter: true,
        sideMenuAdvSearch: false,
        sideMenuSearch: false,
        sideMenuDropdown: false,
        advanceSearch: false
      });
    }
  };
  componentDidMount() {
    message.destroy && message.destroy()
    // this.props.setFolderRelatedDocuments()
    // this.props.totalFolderDocs()
    !this.props.myArchivedEmailsPageSize && this.props.updateDataTablePageSize(20, "myArchivedEmailsPageSize")
    let userInfo = this.props.authenticUserInfo;
    let userId;
    let mailbox = {}
    try {
      userId = userInfo.data.data.output[0].uid;
      mailbox = { MAILBOX_NAME: userInfo.data.data.output[0].mailbox, USER_ID: userId }
      if (!mailbox.MAILBOX_NAME) {
        message.warn("No Mailbox Found", 3)
        this.props.setFolderRelatedDocuments([])
      }
    } catch (e) {
      message.error(<span>Something went wrong. Please try again. If the problem persist then please contact the admin. Thanks<Icon className="closebtn" onClick={() => message.destroy && message.destroy()} type="close" /></span>, 0)
    }
    if (userId && mailbox) {
      // this.props.getAllMailboxes(userId, mailbox, true)
      this.props.getAllMailboxes(userId, mailbox)
    }
    this.setState({ userId, mailbox })
  }

  componentWillUnmount() {
    this.props.setMailboxes(undefined)
    this.props.setMailboxFolderStructure(undefined)

  }

  static getDerivedStateFromProps(props, state) {
    const { attachment } = props;
    let fetchedAttachment;
    let fetchingMailboxFolderStructure = state.fetchingMailboxFolderStructure;
    let openedEmail = state.openedEmail
    // if (props.mailboxes && Array.isArray(props.mailboxes) && props.mailboxes.length > 0 && !props.mailboxFolderStructure && !state.fetchingMailboxFolderStructure) {
    //   // props.getMailboxFolderStructure(props.mailboxes[0].USER_ID)
    //   fetchingMailboxFolderStructure = true
    // }
    if (attachment && Array.isArray(attachment) && attachment.length > 0) {
      fetchedAttachment = attachment[0]._source.attachment
    }
    // if (props.mailboxFolderStructure && Array.isArray(props.mailboxFolderStructure) && props.mailboxFolderStructure.length > 0 && !(props.folderRelatedDocuments)) {
    //   props.fetchFolderRelatedDocs(props.mailboxFolderStructure[0].children && Array.isArray(props.mailboxFolderStructure[0].children) && props.mailboxFolderStructure[0].children.length > 0 ? props.mailboxFolderStructure.children[0].key : props.mailboxFolderStructure[0].key)
    // }
    if((!props.folderRelatedDocuments || !props.folderRelatedDocuments.length) && state.readingPane && state.openedEmail){
      openedEmail = undefined;
    }
    if (fetchedAttachment) {
      return {
        attachment: fetchedAttachment,
        fetchingMailboxFolderStructure,
        openedEmail
      }
    } else {
      return {
        fetchingMailboxFolderStructure,
        openedEmail
      }
    }

    // return null;
  }

  updateCurrentPage = (page, pageSize) => {
    const { currentNode } = this.state
    if (currentNode !== undefined) {
      currentNode.style.borderLeft = "none"
    }
    this.setState({
      currentPage: page,
      openedEmail: undefined
    })
  }

  getSelectedFolderKey = key => {
    if (key) {
      let APIbody = { "selectedFolderKey": (key && String(key)), "fromCount": 0, "toCount": this.props.myArchivedEmailsPageSize || 20 }
      this.props.fetchFolderRelatedDocs("", true)
      this.props.fetchFolderRelatedDocs(APIbody)
      this.props.updateSearchCriteria({}, "folderRelatedDocuments")
      this.setState({
        folderKey: key,
        currentPage: 1
      })
      message.destroy && message.destroy()
    }
    this.closeReadingPane()
  }

  updateDatatablePageSize = (selectedSize) => {
    const { folderKey } = this.state;
    const { folderRelatedDocuments, searchType, updatedSearchCriteria } = this.props;
    if (searchType === "folderRelatedDocuments") {
      if (folderRelatedDocuments && folderRelatedDocuments.length) {
        this.updateCurrentPage(1)
        this.props.updateDataTablePageSize(selectedSize, "myArchivedEmailsPageSize")
        let APIbody = { "selectedFolderKey": (folderKey && folderKey.toString()), "fromCount": 0, "toCount": selectedSize || 20 }
        this.props.fetchFolderRelatedDocs("", true)
        message.destroy && message.destroy()
        this.props.fetchFolderRelatedDocs(APIbody)
        this.closeReadingPane()
      }
    } else if (searchType === 'A1') {
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
        labelName: customValues.Select_LabelsName || customValues.labelName || [],
        contentValue: customValues.New_Search || customValues.contentValue || ""
      };
      this.props.updateDataTablePageSize(selectedSize, "myArchivedEmailsPageSize")
      this.props.fetchFolderRelatedDocs("", true)
      this.props.postSearchData(APIbody, false, this.closeReadingPane);
    } else if (searchType === 'A2') {
      let fromCount = 0;
      let toCount = selectedSize;
      this.updateCurrentPage(1);
      let customValues = { ...updatedSearchCriteria };
      customValues.fromCount = fromCount;
      customValues.toCount = toCount;
      this.props.updateDataTablePageSize(selectedSize, "myArchivedEmailsPageSize")
      this.props.fetchFolderRelatedDocs("", true)
      this.props.postAdvancedSearch(customValues, false, true);
    }
  }

  pageChanged = (page, pageSize) => {
    const { folderKey } = this.state;
    const { searchType, updatedSearchCriteria } = this.props;
    if (searchType === "folderRelatedDocuments") {
      this.updateCurrentPage(page)
      let APIbody = { "selectedFolderKey": (folderKey && folderKey.toString()), "fromCount": (page - 1) * pageSize, "toCount": pageSize }
      // this.props.fetchFolderRelatedDocs("", true)
      message.destroy && message.destroy()
      this.props.fetchFolderRelatedDocs(APIbody)
    } else if (searchType === 'A1') {
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
      this.props.postSearchData(APIbody, false, this.closeReadingPane);
    } else if (searchType === 'A2') {
      let fromCount = (page - 1) * pageSize;
      let toCount = pageSize;
      this.updateCurrentPage(page);
      let customValues = { ...updatedSearchCriteria };
      customValues.fromCount = fromCount;
      customValues.toCount = toCount;
      this.props.setFolderRelatedDocuments();
      this.props.postAdvancedSearch(customValues, false, true);
    }
  }

  getSelectedMailboxFolders = userId => {
    if (userId) {
      this.props.getMailboxFolderStructure(userId)
    }
    this.closeReadingPane()
  }

  toggleReadingPane = () => {
    const toggleReadingPane = !this.state.readingPane
    const { currentNode } = this.state
    if (currentNode !== undefined) {
      currentNode.style.borderLeft = "none"
    }
    this.setState({
      readingPane: toggleReadingPane,
      openedEmail: undefined
    })
  };

  notOnRowClick() {
    notOnRowClick = true
  };

  openReadingPane = email => {
    this.props.getEmail(email)
    if (!notOnRowClick) {
      if (!this.state.openedEmail || !Array.isArray(this.state.openedEmail) || !this.state.openedEmail[0] || !email || email._id !== this.state.openedEmail[0]._id) {
        this.props.EmptySearchAttachment()
        this.props.getSimpleSearchAttachment() // here it cancels the previous APIcall
        this.setState({
          readingPane: true,
          has_attachment: email._source.has_attachment,
          attachment: [],
          openedEmail: [email]
        })

        email._source.has_attachment && this.props.getSimpleSearchAttachment(email)
      }
    }
    notOnRowClick = notOnRowClick && false
  };

  closeReadingPane = () => {
    const { currentNode } = this.state
    if (currentNode !== undefined) {
      currentNode.style.borderLeft = "none"
    }
    this.setState({
      readingPane: false,
      openedEmail: undefined
    })
  };

  collapseSideMenu = () => {
    const toggleCollapsed = !this.state.collapsed
    this.setState({
      collapsed: toggleCollapsed
    })
  };

  openMetadata = () => {
    this.setState({
      metadatAcive: true
    })
  };
  closeMetadata = () => {
    this.setState({
      metadatAcive: false
    })
  }
  openColumConfigrationDrawer = () => {
    this.setState({
      columConfig: true
    })
  }
  closeColumCofigurationDrawer = () => {
    this.setState({
      columConfig: false
    })
  }

  closeChangePassDrawer = () => {
    this.setState({
      changePassDrawer: false
    })
  };

  disappearMark = currentNode => {
    this.setState({
      currentNode
    })
  }

  openDrawer = drawer => {
    const { prevDrawer } = this.state
    const toggleDrawer = !(this.state[drawer])
    this.setState({
      [drawer]: toggleDrawer,
      [prevDrawer]: prevDrawer !== drawer ? false : toggleDrawer,
      prevDrawer: drawer
    })
  }
  closeDrawer = drawer => {
    this.setState({
      [drawer]: false
    })
  }
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
  closeAdvanceSearch = (notClearCriteria, tempUpdatedSearchCriteria) => {
    this.closeDrawer("advanceSearch");
    // if (!notClearCriteria && !this.state.editAdvanceSearch) {
    // this.props.updateSearchCriteria({}, 2);
    // this.props.totalSimpeSearchedDocs();
    // this.props.clearSearchedResults();
    // } else {
    // if (this.state.editAdvanceSearch && tempUpdatedSearchCriteria) {
    tempUpdatedSearchCriteria && this.props.updateSearchCriteria(tempUpdatedSearchCriteria, 'A2');
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
 getInboxFolerKey = (key) => {
    this.setState({ inboxFolerKey: key });
  }
  render() {
    const { readingPane, metadatAcive, collapsed, openedEmail, reportEmail, aboutUsDrawer, dataTableHeight, customizedColum, changePassDrawer, notificationDrawer, menuDrawer, helpDrawer, profileDrawer, currentPage,columnConfig,inboxFolerKey,
      sideMenuDropdown,
      sideMenuSearch,
      sideMenuAdvSearch,
      sideMenuFilter,
      editAdvanceSearch,
      advanceSearch,
    } = this.state;
    const { formatMessage, /*folderRelatedDocuments, mailboxFolderStructure */ } = this.props;
    const messagesKeys = Object.keys(messages);
    const messagesValues = Object.values(messages);
    columns.forEach((c) => {
      messagesKeys.forEach((mK, index) => {
        if (c.key === mK) {
          c.title = formatMessage(messagesValues[index]);
        }
      })
    })
    // readingPaneColumns.forEach((rpc) => {
    //   messagesKeys.forEach((mK, index) => {
    //     if (rpc.key === mK) {
    //       rpc.title = formatMessage(messagesValues[index]);
    //     }
    //   })
    // })

    return (
      <div style={styles.page}>
        <AdvanceSearch
          formatMessage={formatMessage}
          editAdvanceSearch={editAdvanceSearch}
          myArchiveEmail={true}
          advanceSearch={advanceSearch}
          updateCurrentPage={currentPage => this.updateCurrentPage(currentPage)}
          close={(norClearCriteria, tempUpdatedSearchCriteria) =>
            this.closeAdvanceSearch(norClearCriteria, tempUpdatedSearchCriteria)
          }
          submitCriteria={() => this.submitCriteria()}
        />
        <Layout style={{ height: "100vh", maxHeight: "100vh", overflowY: "hidden" }}>
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
              //
              routes={this.routes}
              openColumConfigrationDrawer={() => this.openColumConfigrationDrawer()}
              openReadingPane={() => this.toggleReadingPane()}
              actions={{ readingPane: !readingPane }}
              openCustomizedColumn={customizedColum}
              customizedColums={columns}
              customizeColumn={(val) => this.customizeColumn(val)}
              reportEmail={reportEmail}
              iconName="My Archived Emails_Blue"
              title={formatMessage(messages["My Archived Email"])}
              reportHeading={"My Archived Email Report"}
              emailSize={{ totalEmails: this.props.totalNoofFolderDocs }}
              imageFlag={true}
            />
          </Header>

          <Layout style={{ overflowY: "hidden" }}>
            {
              <Sider style={{
                backgroundColor: "#F5F7FA",
                overflowX: 'inherit',
                // overflowY: 'scroll',
              }} width={!collapsed ? 260 : 80}>
                <MyArchiveEmailSideBar getInboxFolerKey={key => this.getInboxFolerKey(key)} inboxFolerKey={inboxFolerKey} closeReadingPane={() => this.closeReadingPane()} formatMessage={formatMessage} collapsed={collapsed} collapseSideMenu={() => this.collapseSideMenu()} mailboxFolderStructure={this.props.mailboxFolderStructure} mailboxes={this.props.mailboxes} getSelectedFolderKey={key => this.getSelectedFolderKey(key)} getSelectedMailboxFolders={userId => this.getSelectedMailboxFolders(userId)}
                  moveToFilter={() => this.moveToFilter()}
                  moveToSearch={() => this.moveToSearch()}
                  moveToAdvanceSearch={() =>
                    this.moveToAdvanceSearch()
                  }
                  openAdvanceSearchDrawer={edit => this.openAdvanceSearchDrawer(edit)}
                  sideMenuOptions={{
                    search: sideMenuSearch,
                    advSearch: sideMenuAdvSearch,
                    dropdown: sideMenuDropdown,
                    filter: sideMenuFilter,
                  }} />
              </Sider>}

            <Content style={{ backgroundColor: "#fff", height: "100%", overflowY: "hidden" }}>
              <div style={{ display: "flex", width: "100%" }}>
                <DataTableHeader 
                   formatMessage={formatMessage} currentPage={currentPage} pageSize={this.props.myArchivedEmailsPageSize} onPageSizeChange={(selectedSize) => this.updateDatatablePageSize(selectedSize)} totalData={this.props.totalNoofFolderDocs} height={dataTableHeight} data={this.props.folderRelatedDocuments} getDataWithPagination={true} 
                   openColumConfigDrawer={() => this.openColumConfigDrawer()}
                
                />
                {/* {collapsed && <div style={{ width: 80 }}><MyArchiveEmailSideBar collapsed={collapsed} collapseSideMenu={() => this.collapseSideMenu()} /></div>} */}
                {/* <GridViewPageHeader
                  historyProp={this.props.history}
                  formatMessage={formatMessage}
                  routes={routes}
                  openColumConfigrationDrawer={() => this.openColumConfigrationDrawer()}
                  openReadingPane={() => this.toggleReadingPane()}
                  actions={{ readingPane: !readingPane }}
                  openCustomizedColumn={customizedColum}
                  openDrawer={drawer => this.openDrawer(drawer)}
                  closeDrawer={drawer => this.closeDrawer(drawer)}
                  customizedColums={columns}
                  customizeColumn={(val) => this.customizeColumn(val)}
                  reportEmail={reportEmail}
                  iconName="My Archived Emails_Blue"
                  title={formatMessage(messages["My Archived Email"])}
                  reportHeading={"My Archived Email Report"}
                  emailSize={{ totalEmails: this.props.totalNoofFolderDocs }}
                />  */}
              </div>

              <div id="dataTable" style={{ display: "flex", height: "95%", overflowY: "hidden", width: "100%" }}>
                <div style={{ width: readingPane ? "45%" : "100%", height: "100%", }}>
                  <DataTable keyID="_id" seperator="MyArchivedEmail" datatableMsg={sideMenuFilter ? "Select a Folder to View Records" : "“Please perform NEW SEARCH to see data.”"} formatMessage={formatMessage} currentPage={currentPage} pageSize={this.props.myArchivedEmailsPageSize} onPageSizeChange={(selectedSize) => this.updateDatatablePageSize(selectedSize)} totalData={this.props.totalNoofFolderDocs} coveredHeight={200} indicateRow disappearMark={currentNode => this.disappearMark(currentNode)} height={dataTableHeight} onRowClick={email => this.openReadingPane(email)} rowSelection columns={columns} data={this.props.folderRelatedDocuments} notOnRowClick={() => this.notOnRowClick()} getDataWithPagination={true} pageChanged={this.pageChanged}
                    closeColumConfigDrawer={() => this.closeColumConfigDrawer()}
                    columnConfig={columnConfig} />
                </div>
                {
                  readingPane &&
                  <div style={{
                    width: "55%", overflow: "auto", height: "inherit"
                  }}>
                    <ReadingPane formatMessage={formatMessage} forwardAction={true} openMetadata={() => this.openMetadata()} closeMetadata={() => this.closeMetadata()} closeReadingPane={() => this.closeReadingPane()} attachment={this.state.attachment} has_attachment={this.state.has_attachment} metadatAcive={metadatAcive} openedEmail={openedEmail} />
                  </div>
                }
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    )
  }
};

const mapStateToProps = state => {
  return {
    mailboxFolderStructure: state.MyArchivedEmailReducer.mailboxFolderStructure,
    mailboxes: state.MyArchivedEmailReducer.mailboxes,
    folderRelatedDocuments: state.MyArchivedEmailReducer.folderRelatedDocuments,
    attachment: state.SimpleSearchReducer.attachmentid,
    totalNoofFolderDocs: state.MyArchivedEmailReducer.totalFolderDocs,
    myArchivedEmailsPageSize: state.UpdateDataTablePageSizeTypes.myArchivedEmailsPageSize,
    authenticUserInfo: state.LoginReducer.authenticUserInfo,
    searchType: state.UpdateSearchCriteriaReducer.searchTypeInMyArchivedEmails,
    updatedSearchCriteria: state.UpdateSearchCriteriaReducer.updatedSearchCriteriaInMyArchivedEmails,
    licenseInformation: state.ControlCenterReducer.licenseInformation,

  }
};
const mapDispatchToProps = dispatch => {
  return {
    fetchSimpleSearch: () => dispatch(fetchSimpleSearch()),
    getMailboxFolderStructure: mailboxId => dispatch(getMailboxFolderStructure(mailboxId)),
    getAllMailboxes: (userId, mailbox, cancelRequest) => dispatch(getAllMailboxes(userId, mailbox, cancelRequest)),
    fetchFolderRelatedDocs: (selectedFolderKey, cancelRequest) => dispatch(fetchFolderRelatedDocs(selectedFolderKey, cancelRequest)),
    getSimpleSearchAttachment: data => dispatch(getSimpleSearchAttachment(data)),
    getEmail: data => dispatch(getEmail(data)),
    EmptySearchAttachment: () => dispatch(EmptySearchAttachment()),
    updateDataTablePageSize: (pageLabel, pageSize) => dispatch(updateDataTablePageSize(pageLabel, pageSize)),
    setFolderRelatedDocuments: docs => dispatch(setFolderRelatedDocuments(docs)),
    totalFolderDocs: totalDocs => dispatch(totalFolderDocs(totalDocs)),
    updateSearchCriteria: (searchedData, searchType) => dispatch(updateSearchCriteria_MYARCHIVEDEMAILS(searchedData, searchType)),
    postSearchData: (data, cancelRequest, closeReadingPane) => dispatch(postSearchData(data, cancelRequest, closeReadingPane)),
    postAdvancedSearch: (data, cancelRequest, isMyarchivedEmail) => dispatch(postAdvancedSearch(data, cancelRequest, isMyarchivedEmail)),
    setMailboxes: (data) => dispatch(mailboxes(data)),
    setMailboxFolderStructure: (data) => dispatch(mailboxFolderStructure(data))

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyArchiveEmail);
