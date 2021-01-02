import React, { Component } from 'react';
import NavHeader from "../../Components/Navbar/Header/Header";
import { Layout, Typography, message } from "antd";
import styles from "../../styles";
import SavedSearch from "../../Components/SaveSearch/SaveSearch";
import SearchCriteria from "../../Components/SearchCriteria/SearchCriteria";
// import DeleteSavedSearch from "../../Components/DeleteSavedSearch/DeleteSavedSearch"
// import GridViewPageHeader from "../../Components/PageHeader/GridViewPageHeader";
import DataTable from "../../Components/DataTable/DataTable";
import Themes from "../../Assets/Theme/Theme";
import SaveSeachSideBar from "../../Components/SaveSearchSideBar/SaveSearchSideBar";
import { defineMessages } from 'react-intl';
import { connect } from "react-redux";
import { version } from "../../APIConfig/Config";
// import moment from "moment";
import { queryBuilderSearchData, clearSearchedResults, totalSimpeSearchedDocs, postSearchData, smartSearch } from "../../Redux/Actions/SimpleSearchAction/SimpleSearchAction";
import { postAdvancedSearch } from "../../Redux/Actions/AdvancedSearchAction/AdvancedSearchAction";
import DataTableHeader from "../../Components/DataTable/Component/DataTableHeader"

import { updateHistory, goBack } from "../../Redux/Actions/UpdateHistory/UpdateHistory";
import { updateSearchCriteria } from "../../Redux/Actions/UpdateSearchCriteriaAction/UpdateSearchCriteriaAction"
import {
  fetchSavedSearchData,
  deleteSimpleSavedSearch,
  deleteAdvancedSavedSearch,
  deleteQueryBuilderSavedSearch,
  deleteSmartSavedSearch,
  deleteBulkSavedSearch
} from '../../Redux/Actions/SavedSearchActions/SavedSearchActions';
import { resetSelectedRecords } from "../../Redux/Actions/updateSelectedRecordsAction/updateSelectedRecordsAction";
import { fetchLicenseInformation } from "../../Redux/Actions/ControlCenterAction/LicenseAction"
import * as ApiInfo from "../../APIConfig/ApiParameters";


const messages = defineMessages({
  'Favourites': {
    id: "saveSearch.favourites",
    defaultMessage: "Favorites",
  },
  'Name': {
    id: "saveSearch.name",
    defaultMessage: "Name"
  },
  'Description': {
    id: "saveSearch.description",
    defaultMessage: "Description"
  },
  'Edit': {
    id: "saveSearch.edit",
    defaultMessage: "Edit"
  },
  'Criteria': {
    id: "saveSearch.criteria",
    defaultMessage: "Criteria"
  },
  'Run': {
    id: "saveSearch.run",
    defaultMessage: "Run"
  },
  'Delete': {
    id: "saveSearch.delete",
    defaultMessage: "Delete"
  },
  'Saved Searches': {
    id: "saveSearch.SavedSearches",
    defaultMessage: "Saved Searches",
  },
  '_Home': {
    id: "saveSearch._Home",
    defaultMessage: "Home"
  },
  '_Search Archive': {
    id: "saveSearch._Search Archive",
    defaultMessage: "Search Archive"
  },
  '_Saved Searches': {
    id: "saveSearch._Saved Searches",
    defaultMessage: "Saved Searches"
  },
  'Saved Searches Report': {
    id: "saveSearch.SavedSearchesReport",
    defaultMessage: "Saved Searches Report"
  },
})


const { color } = Themes;
const { Header, Sider, Content } = Layout;
const { Text } = Typography;

class SavedSearches extends Component {
  constructor(props) {
    super(props)
    this.state = {
      caseFilter: "all",
      aboutUsDrawer: false,
      menuDrawer: false,
      helpDrawer: false,
      profileDrawer: false,
      columns: this.columns,
      data: this.data
    }
    message.destroy()
  }

  static getDerivedStateFromProps(props, state) {
    let selectedRows = []
    let data = props.savedSearch
    if (props.selectedRowKeys && Array.isArray(props.selectedRowKeys) && props.selectedRowKeys.length && data && Array.isArray(data) && data.length) {
      data.forEach(record => {
        if (props.selectedRowKeys.includes(record.key)) {
          selectedRows.push(record)
        }
      })
    }
    return {
      selectedDocs: selectedRows
    }
  }

  columns = [
    // {
    //   title: 'Favourites',
    //   render: record => {
    //     return (
    //       record.star ?
    //         <div>
    //           <Icon type="star" theme="twoTone" style={{ fontSize: 22 }} twoToneColor="#ffcb0c" fill />
    //         </div>
    //         :
    //         <div>
    //           <Icon type="star" style={{ fontSize: 22 }} />
    //         </div>
    //     )

    //   },
    //   disabled: true
    // },
    {
      title: 'Name',
      width: "15%",
      render: record =>
        <div >
          <Text style={{ fontSize: 13, color: `${color.Dark}`, wordBreak: "break-all" }}>{record.SEARCH_CRITERIA_NAME}</Text>
        </div>,
      disabled: true
    },
    {
      title: 'Descripion',
      width: "25%",
      render: record =>
        <Text style={{ wordBreak: "break-all" }}>{record.SEARCH_CRITERIA_DESC}</Text>,
      disabled: true
    },
    {
      title: 'Type',
      width: "20%",
      render: record =>
        <Text style={{ wordBreak: "break-all" }}>{record.SEARCH_TYPE || "-"}</Text>,
      disabled: true
    },
    {
      title: 'Edit',
      width: "10%",
      render: record =>
        <div>
          <div>
            <img src={require("../../Assets/icons/SV_ICONS/Edit_Orange.png")} alt='' style={{ cursor: "pointer" }} title="" width={28} onClick={() => this.openDrawer('saveSearch', record)} />
          </div>
        </div>,
      // disabled: true
    },
    {
      title: 'Criteria',
      width: "10%",
      render: record =>
        <div >
          <div >
            <img src={require("../../Assets/icons/SV_ICONS/Query_Orange.png")} alt='' style={{ cursor: "pointer" }} title="" width={28} onClick={() => this.openDrawer('searchCriteria', record)} />
          </div>


        </div>,
      disabled: true
    },
    {
      title: 'Run',
      width: "10%",
      render: record =>
        <div >
          <div >
            <img onClick={() => this.executeSimpleSearch(record.SEARCH_QUERY, record.SEARCH_TYPE_VALUE, record.SEARCH_CRITERIA_NAME)} src={require("../../Assets/icons/SV_ICONS/Run_Orange.png")} alt='' style={{ cursor: "pointer" }} title="" width={28} />
          </div>
        </div>,
      // disabled: true
    },
    // {, record.SEARCH_QUERY_VALUE
    //   title: 'Delete',
    //   width: "10%",
    //   render: record =>
    //     <div >
    //       <div >
    //         <img src={require("../../Assets/icons/SV_ICONS/Delete_Orange.png")} alt='' style={{ cursor: "pointer" }} title="" width={28} onClick={() => this.openDrawer('deleteSaveSearch', record)} />
    //       </div>


    //     </div>,
    //   // disabled: true
    // },


  ]

  executeSimpleSearch = (jsonData, searchType, savedSearchName) => {
    const { licenseInformation } = this.props;
    try {
      let data = JSON.parse(jsonData)
      // data = { from: data.fromDate || "", to: data.toDate || "", Select_Employees: data.employee, Select_Type: data.filterType, Select_Labels: data.labelType, New_Search: data.contentValue }
      this.props.history.push({
        pathname: '/searcharchive',
      })
      this.props.clearSearchedResults({})
      this.props.totalSimpeSearchedDocs(null)
      this.props.resetSelectedRecords && this.props.resetSelectedRecords();
      // this.props.updateSearchCriteria(data, 4)
      switch (searchType) {
        case "S":
          // this.props.deleteSimpleSavedSearch(Ids);
          this.props.updateSearchCriteria(data, 4, searchType, savedSearchName)
          this.props.postSearchData(data)
          break;
        case "A":
          this.props.updateSearchCriteria(data, 4, searchType, savedSearchName)
          this.props.postAdvancedSearch(data);
          break;
        case "Q":
          let obj = {
            body: data.body,
            index: data.filterType
          }
          this.props.updateSearchCriteria(obj, 4, searchType, savedSearchName)
          this.props.queryBuilderSearchData(obj, false);
          break;
        case "SS":
          this.props.updateSearchCriteria(data, 4, searchType, savedSearchName)
          if (licenseInformation && licenseInformation.smart_search_information) {
            let Smart_Access_Token = (licenseInformation && licenseInformation.smart_search_information && licenseInformation.smart_search_information.Smart_Access_Token) || ""
            this.props.smartSearch(data, false, Smart_Access_Token)
          }else{
            this.props.fetchLicenseInformation(false, true, data, true)
          }
          break;
        default:
          break;
      }
    } catch (err) {
      ApiInfo.DEBUGER && console.error("Error", err);
    }
  }

  favourite = (record) => {
    const { data } = this.state
    let index = 0
    index = [...data].indexOf(record);
    if (index > -1) {
      data.splice(index, 1);
    }
    record.star.star = "yellow"
    let newArray = data.splice(0, 0, record)
    newArray = data
    this.setState({
      data: newArray
    })
  }
  unFavourite = (record) => {
    const { data } = this.state
    let index = 0;
    index = [...data].indexOf(record);
    if (index > -1) {
      data.splice(index, 1);
    }
    record.star.star = "white"
    let newArray = data.splice(index, 0, record)
    newArray = data
    this.setState({
      data: newArray
    })
  }
  customizeColumn = col => {
    const { columns } = this.state
    let matched = false
    let matchedObj;
    for (let obj of columns) {
      if (obj.title === col.title && !matched) {
        matched = true
        matchedObj = obj
      }
    }
    matchedObj.hide = !matchedObj.hide
    this.setState({
      hide: true
    })
  }
  collapseSideMenu = () => {
    const toggleCollapsed = !this.state.collapsed
    this.setState({
      collapsed: toggleCollapsed
    })
  };

  changeFilter = filter => {
    this.setState({
      caseFilter: filter
    })
  }
  navigateToSearchArchive = () => {
    this.props.updateHistory(this.props.history, "/searcharchive")
    // this.props.goBack(this.props.history)
  }
  disappearMark = currentNode => {
    this.setState({
      currentNode
    })
  }
  openDrawer = (drawer, values) => {
    const { prevDrawer } = this.state
    const toggleDrawer = !(this.state[drawer])
    this.setState({
      [drawer]: toggleDrawer,
      [prevDrawer]: prevDrawer !== drawer ? false : toggleDrawer,
      prevDrawer: drawer,
      values
    })
  }

  closeDrawer = drawer => {
    this.setState({
      [drawer]: false
    })
  }
  componentDidMount() {
    message.destroy && message.destroy()
    this.props.fetchSavedSearchData()
  }

  getSelectedDocuments = (selectedRows) => {
    this.setState({
      selectedDocs: selectedRows
    })
  }
  Delete = (data) => {
    const { selectedDocs } = this.state;
    let searchType = data && data.SEARCH_TYPE_VALUE;
    if (data && !Array.isArray(data)) {
      let Ids = [+data.SEARCH_CRITERIA_ID]
      switch (searchType) {
        case "S":
          this.props.deleteSimpleSavedSearch(Ids);
          break;
        case "A":
          this.props.deleteAdvancedSavedSearch(Ids);
          break;
        case "Q":
          this.props.deleteQueryBuilderSavedSearch(Ids);
          break;
        case "SS":
          this.props.deleteSmartSavedSearch(Ids);
          break;
        default:
          break;
      }
    } else {
      if (selectedDocs && selectedDocs.length) {
        let Ids = selectedDocs.map(doc => +doc.SEARCH_CRITERIA_ID)
        this.props.deleteBulkSavedSearch(Ids);

      }
    }
  }
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
  openDeleteDrawer = record => {
    this.setState({
      deleteDrawer: true,
      deleteRecord: record
    })
  }
  closeDeleteDrawer = () => {
    this.setState({
      deleteDrawer: false,
      deleteRecord: undefined
    })
  }
  currentPaginationSize = (page) => {
    this.setState({ currentPage: page })
  }
  currentPageSize = (value) => {
    this.setState({ pageSize: value })
  }
  render() {
    const { collapsed, aboutUsDrawer, columns, reportEmail, changePassDrawer, customizedColum, helpDrawer, menuDrawer, saveSearch, searchCriteria, values, profileDrawer, notificationDrawer, columnConfig, deleteRecord, deleteDrawer,currentPage, pageSize } = this.state

    const { formatMessage } = this.props;
    const messagesKeys = Object.keys(messages);
    const messagesValues = Object.values(messages);
    columns.forEach((c) => {
      messagesKeys.forEach((mK, index) => {
        if (c.key === mK) {
          c.title = formatMessage(messagesValues[index]);
        }
      })
    })

    const routes = [
      {
        path: '/homescreen',
        exact: true,
        breadCrums: formatMessage(messages["_Home"]),
        redirect: '/homescreen',
      },
      {
        path: '/searcharchive',
        exact: true,
        breadCrums: formatMessage(messages["_Search Archive"]),
        redirect: '/searcharchive'
      },
      {
        path: '/savedsearch',
        exact: true,
        breadCrums: formatMessage(messages["_Saved Searches"]),
        redirect: '/savedsearch'
      }
    ]

    return (
      <div style={styles.page}>
        {
          <SavedSearch
            formatMessage={formatMessage}
            saveSearch={saveSearch}
            edit
            close={() => this.closeDrawer("saveSearch")}
            editSaveSearch={values}
          />
        }
        {searchCriteria && (
          <SearchCriteria
            formatMessage={formatMessage}
            searchCriteria={searchCriteria}
            criterea={values}
            close={() => this.closeDrawer("searchCriteria")}
          />
        )}
        {/* {<DeleteSavedSearch selectedDocs={selectedDocs} formatMessage={formatMessage}
          deleteSaveSearch={deleteSaveSearch} close={() => this.closeDrawer('deleteSaveSearch')} searchUser={values} />} */}

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

              //GridViewData
              noReadingPane
              routes={routes}
              actions={{ savedSearches: true }}
              iconName="Search Archive_Blue"
              title={formatMessage(messages["Saved Searches"])}
              openCustomizedColumn={customizedColum}
              navigateToSearchArchive={() => this.navigateToSearchArchive()}
              customizedColums={this.columns}
              customizeColumn={val => this.customizeColumn(val)}
              reportEmail={reportEmail}
              reportHeading={formatMessage(
                messages["Saved Searches Report"]
              )}
              imageFlag
            />
          </Header>

          <Layout style={{ overflowY: "hidden" }}>
            {version > 7.2 && (
              <Sider
                style={{
                  backgroundColor: "#F5F7FA",
                  // MozBoxShadow: "4px 4px 8px -3px #777",
                  // WebkitBoxShadow: "`4px 4px 8px -3px #777",
                  // boxShadow: "4px 4px 8px -3px #777 ",
                  overflow: "auto"
                }}
                width={!collapsed ? 260 : 80}
              >
                <SaveSeachSideBar
                  formatMessage={formatMessage}
                  collapsed={collapsed}
                  collapseSideMenu={() => this.collapseSideMenu()}
                />
              </Sider>
            )}
            <Content
              style={{
                backgroundColor: "#fff",
                height: "100%",
                overflowY: "hidden"
              }}
            >
              <div style={{ display: "flex", width: "100%" }}>
                <DataTableHeader
                  openDeleteDrawer={(record) => this.openDeleteDrawer(record)}
                  openColumConfigDrawer={() => this.openColumConfigDrawer()}
                  noReadingPane
                  needRowSelection
                  separator="SearchArchive"
                  navigateToSearchArchive={() => this.navigateToSearchArchive()}
                  formatMessage={formatMessage}
                  data={this.props.savedSearch}
                  actions={{
                    savedSearches: true,
                    report: true
                  }}
                  actionDropdown={true}
                  openDrawer={drawer => this.openDrawer(drawer)}
                  currentPageSize={this.currentPageSize} 

                />
                {/* {collapsed && version > 7.1 && (
                  <div style={{ width: 80 }}>
                    <SaveSeachSideBar
                      formatMessage={formatMessage}
                      collapsed={collapsed}
                      collapseSideMenu={() => this.collapseSideMenu()}
                    />
                  </div>
                )} */}
                {/* <GridViewPageHeader
                  historyProp={this.props.history}
                  formatMessage={formatMessage}
                  noReadingPane
                  routes={routes}
                  actions={{ savedSearches: true }}
                  iconName="Search Archive_Blue"
                  title={formatMessage(messages["Saved Searches"])}
                  openDrawer={drawer => this.openDrawer(drawer)}
                  closeDrawer={drawer => this.closeDrawer(drawer)}
                  openCustomizedColumn={customizedColum}
                  navigateToSearchArchive={() => this.navigateToSearchArchive()}
                  customizedColums={this.columns}
                  customizeColumn={val => this.customizeColumn(val)}
                  reportEmail={reportEmail}
                  reportHeading={formatMessage(
                    messages["Saved Searches Report"]
                  )}
                /> */}
              </div>

              <div /*style={{ paddingTop: 10 }}*/ >
                <DataTable
                  closeColumConfigDrawer={() => this.closeColumConfigDrawer()}
                  columnConfig={columnConfig}
                  openDeleteDrawer={(record) => this.openDeleteDrawer(record)}
                  deleteRecord={deleteRecord}
                  deleteDrawer={deleteDrawer}
                  closeDeleteDrawer={() => this.closeDeleteDrawer()}
                  noReadingPane
                  needRowSelection
                  separator="SearchArchive"
                  addEditColumn
                  noEditIcon
                  Delete={values => this.Delete(values)}
                  coveredHeight={200}
                  navigateToSearchArchive={() => this.navigateToSearchArchive()}
                  getRowSelection={selectedRows =>
                    this.getSelectedDocuments(selectedRows)
                  }
                  keyID="SEARCH_CRITERIA_ID"
                  formatMessage={formatMessage}
                  columns={this.columns}
                  data={this.props.savedSearch}
                  actions={{
                    savedSearches: true,
                    report: true
                  }}
                  actionDropdown={true}
                  openDrawer={drawer => this.openDrawer(drawer)}
                  closeDrawer={drawer => this.closeDrawer(drawer)}
                  pageSize={pageSize || 20}
                  currentPage={currentPage}
                  currentPaginationSize={this.currentPaginationSize}
                />
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    savedSearch: state.SimpleSearchReducer.savedSearch,
    selectedRowKeys: state.updateSelectedRecordsReducer.selectedRowKeys,
    licenseInformation: state.ControlCenterReducer.licenseInformation,
    smartSearchAccessToken: state.SimpleSearchReducer.smartSearchAccessToken,
  }
};
const mapDispatchToProps = dispatch => {
  return {
    fetchSavedSearchData: () => dispatch(fetchSavedSearchData()),
    postSearchData: (data, cancelRequest) => dispatch(postSearchData(data, cancelRequest)),
    smartSearch: (APIbody, cancelRequest, accessToken) => dispatch(smartSearch(APIbody, cancelRequest, accessToken)),
    updateHistory: (history, pathname) => dispatch(updateHistory(history, pathname)),
    updateSearchCriteria: (searchedData, searchType, searchTypeTree, savedSearchName) => dispatch(updateSearchCriteria(searchedData, searchType, searchTypeTree, savedSearchName)),
    queryBuilderSearchData: (data, cancelRequest) => dispatch(queryBuilderSearchData(data, cancelRequest)),
    totalSimpeSearchedDocs: searchedDataLength => dispatch(totalSimpeSearchedDocs(searchedDataLength)),
    clearSearchedResults: () => dispatch(clearSearchedResults()),
    goBack: history => dispatch(goBack(history)),
    deleteSimpleSavedSearch: (data) => dispatch(deleteSimpleSavedSearch(data)),
    deleteAdvancedSavedSearch: (data) => dispatch(deleteAdvancedSavedSearch(data)),
    deleteQueryBuilderSavedSearch: (data) => dispatch(deleteQueryBuilderSavedSearch(data)),
    deleteSmartSavedSearch: (data) => dispatch(deleteSmartSavedSearch(data)),
    deleteBulkSavedSearch: (data) => dispatch(deleteBulkSavedSearch(data)),
    resetSelectedRecords: () => dispatch(resetSelectedRecords()),
    postAdvancedSearch: (data) => dispatch(postAdvancedSearch(data)),
    fetchLicenseInformation: (noMessage, fetchLicenseforSmartSearch, APIbody, notUpdateCriteria, smartSearchAccessToken, cancelRequest) => dispatch(fetchLicenseInformation(noMessage, fetchLicenseforSmartSearch, APIbody, notUpdateCriteria, smartSearchAccessToken, cancelRequest)),

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SavedSearches);