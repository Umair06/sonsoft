
import React, { Component } from "react";
import NavHeader from "../../Components/Navbar/Header/Header";
import { Layout, Typography, Tabs, message } from "antd";
import styles from "../../styles";
// import GridViewPageHeader from "../../Components/PageHeader/GridViewPageHeader";
import DataTable from "../../Components/DataTable/DataTable";
import Themes from "../../Assets/Theme/Theme";
import PreservationSideBar from "../../Components/PreservationSideBar/PreservationSideBar";
import CreateLegalHold from "../../Components/CreateLegalHold/CreateLegalHold";
import ReleasesLegalHold from "../../Components/Modal/ReleasesLegalHold";
import ActiveLegalHold from "../../Components/Modal/ActiveLegalHold";
import Favorite_Gray from "../../Assets//icons/SV_ICONS/Favorite_Gray.png";
import Favorite_Yellow from "../../Assets/icons/SV_ICONS/Favorite_Yellow.png";
import { version } from "../../APIConfig/Config";
import { defineMessages } from "react-intl";
import { updateHistory } from "../../Redux/Actions/UpdateHistory/UpdateHistory";
import {
  fetchLegalHolds,
  clearOnholdDocuments,
  updateLegalHoldStatus,
} from "../../Redux/Actions/LegalHoldsActions/LegalHoldsActions";
import { clearSearchedResults, totalSimpeSearchedDocs, postSearchData, smartSearch, queryBuilderSearchData } from "../../Redux/Actions/SimpleSearchAction/SimpleSearchAction";
import { postAdvancedSearch } from "../../Redux/Actions/AdvancedSearchAction/AdvancedSearchAction";
import { updateSearchCriteria } from "../../Redux/Actions/UpdateSearchCriteriaAction/UpdateSearchCriteriaAction";
import { connect } from "react-redux";
import { resetSelectedRecords } from "../../Redux/Actions/updateSelectedRecordsAction/updateSelectedRecordsAction";
import EditOrange from "../../Assets/icons/SV_ICONS/Edit_Orange.png";
import moment from "moment";
import DataTableHeader from "../../Components/DataTable/Component/DataTableHeader"

// import * as ApiInfo from "../../APIConfig/ApiParameters";


const messages = defineMessages({
  Name: {
    id: "legalHold.name",
    defaultMessage: "Name"
  },
  Type: {
    id: "legalHold.type",
    defaultMessage: "Type"
  },
  Edit: {
    id: "DataTable.Edit",
    defaultMessage: "Edit"
  },
  "Primary Attorney": {
    id: "legalHold.primaryAttorney",
    defaultMessage: "Primary Attorney"
  },
  Team: {
    id: "legalHold.team",
    defaultMessage: "Team"
  },
  Created: {
    id: "legalHold.created",
    defaultMessage: "Created"
  },
  Closed: {
    id: "legalHold.closed",
    defaultMessage: "Closed"
  },
  "Legal Holds": {
    id: "legalHold.LegalHolds",
    defaultMessage: "Legal Holds"
  },
  All: {
    id: "legalHold.All",
    defaultMessage: "All"
  },
  Active: {
    id: "legalHold.Active",
    defaultMessage: "Active"
  },
  Released: {
    id: "legalHold.Released",
    defaultMessage: "Released"
  },
  _Home: {
    id: "legalHold._Home",
    defaultMessage: "Home"
  },
  "_Legal Holds": {
    id: "legalHold._LegalHolds",
    defaultMessage: "Legal Holds"
  }
});

const { color } = Themes;
const { Header, Sider, Content } = Layout;
const { Text } = Typography;
const { TabPane } = Tabs;

let notOnRowClick = false;

class LegalHold extends Component {
  constructor(props) {
    super(props);
    this.state = {
      caseFilter: "active",
      aboutUsDrawer: false,
      menuDrawer: false,
      helpDrawer: false,
      profileDrawer: false,
      selectedDocs: [],
      routes: [
        {
          path: "/homescreen",
          exact: true,
          breadCrums: this.props.formatMessage(messages["_Home"]),
          redirect: "/homescreen"
        },
        {
          path: "/legalholds",
          exact: true,
          breadCrums: this.props.formatMessage(messages["_Legal Holds"]),
          redirect: "/legalholds"
        }
      ],
      columns:
        version > 7.2
          ? [{
            title: "",
            width: 50,
            render: record => {
              return record.star && record.star.star === "yellow" ? (
                <div onClick={() => this.notOnRowClick()}>
                  <img
                    src={Favorite_Yellow}
                    alt=""
                    width={35}
                    height={35}
                    onClick={() => this.unFavourite(record)}
                  />
                </div>
              ) : (
                  <div onClick={() => this.notOnRowClick()}>
                    <img
                      src={Favorite_Gray}
                      alt=""
                      width={35}
                      height={35}
                      onClick={() => this.favourite(record)}
                    />
                  </div>
                );
            },
            disabled: true
          },
          {
            title: "Name",
            dataIndex: "CASE_NAME",
            width: 100,
            render: CASE_NAME => (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Text style={{ fontSize: 13, color: `${color.Dark}` }}>
                  {CASE_NAME}
                </Text>
                {/* <div>
              <Text>V. </Text>
              <Text>{name.from}</Text>
            </div> */}
              </div>
            ),
            disabled: true
          },
          // {
          //   title: 'Description',
          //   dataIndex: "CASE_DESC",
          //   width: "40%",
          //   render: CASE_DESC =>
          //     <div style={{ display: "flex", flexDirection: 'column' }}>
          //       {/* <Text style={{ fontSize: 13, color: `${color.Dark}` }}>{CASE_NAME}</Text> */}
          //       {/* <div>
          //       <Text>V. </Text>
          //       <Text>{name.from}</Text>
          //     </div> */}
          //     </div>,
          //   // disabled: true
          // },
          {
            title: "Type",
            width: 100,
            render: record => (
              <div style={{}}>
                {/* {record.types.map((type, index) => {
              return (
                <div key={index} style={{ }}>
                  <Text>{type}</Text>
                </div>
              )
            })} */}
              </div>
            ),
            disabled: true
          },
          {
            title: "Primary Attorney",
            width: 120,
            render: record => (
              <div>
                {/* {record.primaryAttorney.map((attorney, index) => {
              return (
                <div key={index} style={{ }}>
                  <Text>{attorney}</Text>
                </div>
              )
            })} */}
              </div>
            ),
            disabled: true
          },
          {
            title: "Team",
            width: 100,
            render: record => (
              <div>
                {/* {record.teams.map((team, index) => {
              return (
                <div key={index} style={{}}>
                  <Text>{team}</Text>
                </div>
              )
            })} */}
              </div>
            ),
            disabled: true
          },
          {
            title: "Created",
            width: 100,
            dataIndex: "CREATED_ON",
            render: CREATED_ON => {
              let createdDate = CREATED_ON
                ? (moment(CREATED_ON).format('DD-MMM-YYYY') === "Invalid date" ? CREATED_ON : moment(CREATED_ON).format('DD-MMM-YYYY'))
                : "";
              return (
                <div>
                  <Text>{createdDate}</Text>
                </div>
              );
            },
            disabled: true
          },
          {
            title: "Released",
            width: 100,
            dataIndex: "LEGAL_HOLD_CLOSE_DATE",
            render: LEGAL_HOLD_CLOSE_DATE => {
              let releasedDate = LEGAL_HOLD_CLOSE_DATE
                ? (moment(LEGAL_HOLD_CLOSE_DATE).format('DD-MMM-YYYY') === "Invalid date" ? LEGAL_HOLD_CLOSE_DATE : moment(LEGAL_HOLD_CLOSE_DATE).format('DD-MMM-YYYY'))
                : "";
              return (
                <div style={{}}>
                  <Text>{releasedDate}</Text>
                </div>
              );
            },
            disabled: true
          }
            ,
          {
            width: 50,
            title: "Edit",
            // <div style={{ color: "inherit" }}>
            //   <Text style={{ color: "inherit" }}>{this.props.formatMessage(messages["Edit"])}</Text>
            // </div>,
            render: text => (
              <div onClick={() => this.notOnRowClick()}>
                <img
                  src={EditOrange}
                  alt=""
                  width={25}
                  title={this.props.formatMessage(messages["Edit"])}
                  onClick={() =>
                    this.openDrawer &&
                    this.openDrawer("createLegalHold", text)
                  }
                  style={{ zIndex: "1000" }}
                />
              </div>
            )
          }
            // {
            //   width: 50,
            //   notCustomizable: true,
            //   title: () => (
            //     <div style={{ color: "inherit" }}>
            //       {props.noDelete && (
            //         <Text style={{ color: "inherit" }}>
            //           {this.props.formatMessage(messages["Edit"])}
            //         </Text>
            //       )}
            //     </div>
            //   ),
            //   render: text => (
            //     <div onClick={() => this.notOnRowClick()}>
            //       <img
            //         src={EditOrange}
            //         alt=""
            //         width={25}
            //         title={this.props.formatMessage(messages["Edit"])}
            //         onClick={() =>
            //           this.openDrawer &&
            //           this.openDrawer("createLegalHold", text)
            //         }
            //         style={{
            //           position: "relative !important",
            //           zIndex: "1000 !important"
            //         }}
            //       />
            //     </div>
            //   )
            // }
          ]
          : [
            {
              title: "Name",
              dataIndex: "CASE_NAME",
              width: "20%",
              render: CASE_NAME => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Text style={{ fontSize: 13, color: `${color.Dark}` }}>
                    {CASE_NAME}
                  </Text>
                  {/* <div>
              <Text>V. </Text>
              <Text>{name.from}</Text>
            </div> */}
                </div>
              )
              // disabled: true
            },
            {
              title: "Description",
              dataIndex: "CASE_DESC",
              width: "40%",
              render: CASE_DESC => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Text style={{ fontSize: 13, color: `${color.Dark}` }}>
                    {CASE_DESC}
                  </Text>
                  {/* <div>
              <Text>V. </Text>
              <Text>{name.from}</Text>
            </div> */}
                </div>
              ),
              disabled: true
            },
            {
              title: "Created",
              width: "15%",
              dataIndex: "CREATED_ON",
              render: CREATED_ON => {
                let createdDate = CREATED_ON
                  ? (moment(CREATED_ON).format('DD-MMM-YYYY') === "Invalid date" ? CREATED_ON : moment(CREATED_ON).format('DD-MMM-YYYY'))
                  : "";
                return (
                  <div>
                    <Text>{createdDate}</Text>
                  </div>
                );
              },
              disabled: true
            },
            {
              title: "Released",
              width: "15%",
              dataIndex: "LEGAL_HOLD_CLOSE_DATE",
              render: LEGAL_HOLD_CLOSE_DATE => {
                let releasedDate = LEGAL_HOLD_CLOSE_DATE
                  ? (moment(LEGAL_HOLD_CLOSE_DATE).format('DD-MMM-YYYY') === "Invalid date" ? LEGAL_HOLD_CLOSE_DATE : moment(LEGAL_HOLD_CLOSE_DATE).format('DD-MMM-YYYY'))
                  : "";
                return (
                  <div style={{}}>
                    <Text>{releasedDate}</Text>
                  </div>
                );
              },
              disabled: true
            },
            {
              width: "10%",
              title: "Edit",
              // <div style={{ color: "inherit" }}>
              // </div>,
              render: text => (
                <div onClick={() => this.notOnRowClick()}>
                  <img
                    src={EditOrange}
                    alt=""
                    width={25}
                    title={this.props.formatMessage(messages["Edit"])}
                    onClick={() =>
                      this.openDrawer &&
                      this.openDrawer("createLegalHold", text)
                    }
                    style={{
                      position: "relative !important",
                      zIndex: "1000 !important"
                    }}
                  />
                </div>
              )
            }
          ],
      activeColumns:
        version > 7.2
          ? [
            {
              title: "",
              width: 50,
              render: record => {
                return record.star && record.star.star === "yellow" ? (
                  <div onClick={() => this.notOnRowClick()}>
                    <img
                      src={Favorite_Yellow}
                      alt=""
                      width={35}
                      height={35}
                      onClick={() => this.unFavourite(record)}
                      style={{
                        position: "relative !important",
                        zIndex: "1000 !important"
                      }}
                    />
                  </div>
                ) : (
                    <div onClick={() => this.notOnRowClick()}>
                      <img
                        src={Favorite_Gray}
                        alt=""
                        width={35}
                        height={35}
                        onClick={() => this.favourite(record)}
                        style={{
                          position: "relative !important",
                          zIndex: "1000 !important"
                        }}
                      />
                    </div>
                  );
              },
              disabled: true
            },
            {
              title: "Name",
              dataIndex: "CASE_NAME",
              width: 100,
              render: CASE_NAME => (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    height: "100%"
                  }}
                >
                  <Text style={{ fontSize: 13, color: `${color.Dark}` }}>
                    {CASE_NAME}
                  </Text>
                  {/* <div>
              <Text>V. </Text>
              <Text>{name.from}</Text>
            </div> */}
                </div>
              )
              // disabled: true
            },
            {
              title: "Description",
              dataIndex: "CASE_DESC",
              width: 150,
              render: CASE_DESC => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Text style={{ fontSize: 13, color: `${color.Dark}` }}>
                    {CASE_DESC}
                  </Text>
                  {/* <div>
              <Text>V. </Text>
              <Text>{name.from}</Text>
            </div> */}
                </div>
              ),
              disabled: true
            },
            version > 7.2 && {
              title: "Type",
              width: 100,
              render: record => (
                <div style={{ width: "100%", height: "100%" }}>
                  {/* {record.types.map((type, index) => {
              return (
                <div key={index} style={{ }}>
                  <Text>{type}</Text>
                </div>
              )
            })} */}
                </div>
              ),
              disabled: true
            },
            version > 7.2 && {
              title: "Primary Attorney",
              width: 150,
              render: record => (
                <div>
                  {/* {record.primaryAttorney.map((attorney, index) => {
              return (
                <div key={index} style={{ }}>
                  <Text>{attorney}</Text>
                </div>
              )
            })} */}
                </div>
              ),
              disabled: true
            },
            version > 7.2 && {
              title: "Team",
              width: 100,
              render: record => (
                <div>
                  {/* {record.teams.map((team, index) => {
              return (
                <div key={index} style={{}}>
                  <Text>{team}</Text>
                </div>
              )
            })} */}
                </div>
              ),
              disabled: true
            },
            {
              title: "Created",
              width: 100,
              dataIndex: "CREATED_ON",
              render: CREATED_ON => {
                let createdDate = CREATED_ON
                  ? (moment(CREATED_ON).format('DD-MMM-YYYY') === "Invalid date" ? CREATED_ON : moment(CREATED_ON).format('DD-MMM-YYYY'))
                  : "";
                return (
                  <div>
                    <Text>{createdDate}</Text>
                  </div>
                );
              },
              disabled: true
            },
            {
              width: 50,
              title: "Edit",
              // <div style={{ color: "inherit" }}>
              //   <Text style={{ color: "inherit" }}>{this.props.formatMessage(messages["Edit"])}</Text>
              // </div>,
              render: text => (
                <div onClick={() => this.notOnRowClick()}>
                  <img
                    src={EditOrange}
                    alt=""
                    width={25}
                    title={this.props.formatMessage(messages["Edit"])}
                    onClick={() =>
                      this.openDrawer &&
                      this.openDrawer("createLegalHold", text)
                    }
                    style={{ zIndex: "1000" }}
                  />
                </div>
              )
            }
          ]
          : [
            {
              title: "Name",
              dataIndex: "CASE_NAME",
              width: "20%",
              render: CASE_NAME => (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    height: "100%"
                  }}
                >
                  <Text style={{ fontSize: 13, color: `${color.Dark}` }}>
                    {CASE_NAME}
                  </Text>
                  {/* <div>
              <Text>V. </Text>
              <Text>{name.from}</Text>
            </div> */}
                </div>
              )
              // disabled: true
            },
            {
              title: "Description",
              dataIndex: "CASE_DESC",
              width: "40%",
              render: CASE_DESC => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Text style={{ fontSize: 13, color: `${color.Dark}` }}>
                    {CASE_DESC}
                  </Text>
                  {/* <div>
              <Text>V. </Text>
              <Text>{name.from}</Text>
            </div> */}
                </div>
              ),
              disabled: true
            },
            {
              title: "Created",
              width: "30%",
              dataIndex: "CREATED_ON",
              render: CREATED_ON => {
                let createdDate = CREATED_ON
                  ? (moment(CREATED_ON).format('DD-MMM-YYYY') === "Invalid date" ? CREATED_ON : moment(CREATED_ON).format('DD-MMM-YYYY'))
                  : "";
                return (
                  <div>
                    <Text>{createdDate}</Text>
                  </div>
                );
              },
              disabled: true
            },
            {
              width: "10%",
              title: "Edit",
              // <div style={{ color: "inherit" }}>
              //   <Text style={{ color: "inherit" }}>{this.props.formatMessage(messages["Edit"])}</Text>
              // </div>,
              render: text => (
                <div onClick={() => this.notOnRowClick()}>
                  <img
                    src={EditOrange}
                    alt=""
                    width={25}
                    title={this.props.formatMessage(messages["Edit"])}
                    onClick={() =>
                      this.openDrawer &&
                      this.openDrawer("createLegalHold", text)
                    }
                    style={{ zIndex: "1000" }}
                  />
                </div>
              )
            }
          ]
    };
    message.destroy();
    this.props.clearSearchedResults({})
    this.props.totalSimpeSearchedDocs(null)
    this.props.postSearchData({}, true)
    this.props.smartSearch({}, true)
    this.props.queryBuilderSearchData({}, true)
    this.props.postAdvancedSearch({}, true);
    this.props.updateSearchCriteria({})
  }
  uid = this.props.authenticUserInfo && this.props.authenticUserInfo.data && this.props.authenticUserInfo.data.data && this.props.authenticUserInfo.data.data.output && Array.isArray(this.props.authenticUserInfo.data.data.output) && this.props.authenticUserInfo.data.data.output[0] && this.props.authenticUserInfo.data.data.output[0].uid

  notOnRowClick() {
    notOnRowClick = true;
  }

  LegalCase = value => {
    if (!notOnRowClick) {
      const {
        updateHistory,
        clearOnholdDocuments,
        clearSearchedResults
      } = this.props;
      updateHistory(this.props.history, `/case`, value);
      clearOnholdDocuments();
      clearSearchedResults();
      this.props.resetSelectedRecords && this.props.resetSelectedRecords();
    }
    notOnRowClick = notOnRowClick && false;
  };

  componentDidMount() {
    message.destroy && message.destroy();
    this.props.fetchLegalHolds();
  }

  static getDerivedStateFromProps(props, state) {
    const { legalHolds } = props;
    let filteredData;
    let pageHeaderActions = {};
    let selectedRows = [];
    if (legalHolds) {
      if (state.caseFilter === "active") {
        filteredData = legalHolds.filter(val => val.STATUS === 1);
        pageHeaderActions = { release: true };
      } else {
        if (state.caseFilter === "released") {
          filteredData = legalHolds.filter(val => val.STATUS === 2);
          pageHeaderActions = { active: true };
        } else {
          filteredData = [...legalHolds];
          pageHeaderActions = { active: true, release: true };
        }
      }
    }
    if (props.selectedRowKeys && Array.isArray(props.selectedRowKeys) && props.selectedRowKeys.length && filteredData && Array.isArray(filteredData) && filteredData.length) {
      filteredData.forEach(record => {
        if (props.selectedRowKeys.includes(record.key)) {
          selectedRows.push(record)
        }
      })
    }
    return {
      filteredData,
      pageHeaderActions,
      selectedDocs: selectedRows
    };
  }

  favourite = record => {
    // const { data } = this.state
    const data = this.props.legalHolds;
    let index = 0;
    index = [...data].indexOf(record);
    if (index > -1) {
      data.splice(index, 1);
    }
    record.star = {};
    record.star.star = "yellow";
    let newArray = data.splice(0, 0, record);
    newArray = data;
    this.setState({
      data: newArray
    });
  };
  unFavourite = record => {
    // const { data } = this.state
    const data = this.props.legalHolds;
    let index = 0;
    index = [...data].indexOf(record);
    if (index > -1) {
      data.splice(index, 1);
    }

    record.star = {};
    record.star.star = "white";
    let newArray = data.splice(index, 0, record);
    newArray = data;
    this.setState({
      data: newArray
    });
  };
  collapseSideMenu = () => {
    const toggleCollapsed = !this.state.collapsed;
    this.setState({
      collapsed: toggleCollapsed
    });
  };

  changeFilter = filter => {
    this.setState({
      caseFilter: filter
    });
  };
  disappearMark = currentNode => {
    this.setState({
      currentNode
    });
  };
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
  closeDrawer = drawer => {
    this.setState({
      [drawer]: false
    });
  };

  getSelectedDocuments = selectedRows => {
    this.setState({
      selectedDocs: selectedRows
    });
  };

  releaseLegalHolds = () => {
    const { selectedDocs, caseFilter } = this.state;
    const caseId = selectedDocs.map(doc => +doc.CASE_ID);
    this.props.updateLegalHoldStatus(caseId, 2);
    this.closeDrawer("legalHoldReleases");
    caseFilter !== "all" &&
      this.setState({
        selectedDocs: []
      });
  };

  legalHoldsActive = () => {
    const { selectedDocs, caseFilter } = this.state;
    const caseId = selectedDocs.map(doc => doc.CASE_ID);
    this.props.updateLegalHoldStatus(caseId, 1);
    this.closeDrawer("activeLegalHold");
    caseFilter !== "all" &&
      this.setState({
        selectedDocs: []
      });
  };
  openColumConfigDrawer = () => {
    const { caseFilter } = this.state;
    if (caseFilter === "all") {
      this.setState({
        AllColumnConfig: true
      })
    } else if (caseFilter === "active") {
      this.setState({
        ActiveColumnConfig: true
      })
    } else {
      this.setState({
        ReleasedColumnConfig: true
      })
    }
  };

  closeColumConfigDrawer = () => {
    const { caseFilter } = this.state;
    if (caseFilter === "all") {
      this.setState({
        AllColumnConfig: false
      })
    } else if (caseFilter === "active") {
      this.setState({
        ActiveColumnConfig: false
      })
    } else {
      this.setState({
        ReleasedColumnConfig: false
      })
    }
  };
  currentPaginationSize = (page) => {
    const { caseFilter } = this.state;
    console.log("page", page)
    if (caseFilter === "all") {
      this.setState({
        currentPageAll: page
      })
    } else if (caseFilter === "active") {
      this.setState({
        currentPageActive: page
      })
    } else {
      this.setState({
        currentPageReleased: page
      })
    }
  }
  currentPageSize = (value) => {
    const { caseFilter } = this.state;
    console.log("value", value)
    if (caseFilter === "all") {
      this.setState({
        pageSizeAll: value
      })
    } else if (caseFilter === "active") {
      this.setState({
        pageSizeActive: value
      })
    } else {
      this.setState({
        pageSizeReleased: value
      })
    }
  }
  openLegalDrawer = (drawer, values) => {
    const { prevDrawer } = this.state;
    const toggleDrawer = !this.state[drawer];
    this.setState({
      [drawer]: toggleDrawer,
      [prevDrawer]: prevDrawer !== drawer ? false : toggleDrawer,
      prevDrawer: drawer,
      values
    });
  };
  render() {
    const {
      collapsed,
      aboutUsDrawer,
      columns,
      activeColumns,
      createLegalHold,
      reportEmail,
      changePassDrawer,
      customizedColum,
      helpDrawer,
      caseFilter,
      menuDrawer,
      profileDrawer,
      notificationDrawer,
      values,
      legalHoldReleases,
      routes,
      selectedDocs,
      filteredData,
      activeLegalHold,
      pageHeaderActions,
      ReleasedColumnConfig,
      ActiveColumnConfig,
      AllColumnConfig,
      currentPageAll, pageSizeAll, currentPageActive, pageSizeActive, currentPageReleased, pageSizeReleased
    } = this.state;
    const { formatMessage } = this.props;
    const messagesKeys = Object.keys(messages);
    const messagesValues = Object.values(messages);
    columns &&
      columns.forEach(c => {
        messagesKeys.forEach((mK, index) => {
          if (c.key === mK) {
            //ApiInfo.DEBUGER && console.log(messagesValues[index]);
            c.title = formatMessage(messagesValues[index]);
          }
        });
      });
    return (
      <div style={styles.page}>
        <ReleasesLegalHold
          formatMessage={formatMessage}
          releaseLegalHolds={() => this.releaseLegalHolds()}
          legalHoldReleases={legalHoldReleases}
          selectedDocs={selectedDocs}
          close={() => this.closeDrawer("legalHoldReleases")}
        />
        <ActiveLegalHold
          activeLegalHold={activeLegalHold}
          selectedDocs={selectedDocs}
          legalHoldsActive={() => this.legalHoldsActive()}
          formatMessage={formatMessage}
          close={() => this.closeDrawer("activeLegalHold")}
        />
        <CreateLegalHold
          formatMessage={formatMessage}
          createLegalHold={createLegalHold}
          close={() => this.closeDrawer("createLegalHold")}
          values={values}
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
              //
              noReadingPane
              routes={routes}
              actions={pageHeaderActions}
              iconName="LegalHolds_Blue"
              title={formatMessage(messages["Legal Holds"])}
              openCustomizedColumn={customizedColum}
              customizedColums={columns}
              customizeColumn={val => this.customizeColumn(val)}
              reportEmail={reportEmail}
              reportHeading="Legal Holds Report"
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
                  overflowX: "inherit"
                  // overflowY: 'scroll',
                }}
                width={!collapsed ? 260 : 80}
              >
                <PreservationSideBar
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
                {/* {collapsed && (
                  <div style={{ width: 80 }}>
                    <PreservationSideBar
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
                  actions={pageHeaderActions}
                  iconName="LegalHolds_Blue"
                  title={formatMessage(messages["Legal Holds"])}
                  openDrawer={drawer => this.openDrawer(drawer)}
                  closeDrawer={drawer => this.closeDrawer(drawer)}
                  openCustomizedColumn={customizedColum}
                  customizedColums={columns}
                  customizeColumn={val => this.customizeColumn(val)}
                  reportEmail={reportEmail}
                  reportHeading="Legal Holds Report"
                /> */}
              </div>

              <div
                id="dataTable"
                style={{
                  display: "flex",
                  height: "inherit",
                  overflowY: "hidden",
                  flexDirection: "column"
                }}
              >
                {(caseFilter === "all") && <DataTableHeader openColumConfigDrawer={() => this.openColumConfigDrawer()} formatMessage={formatMessage}
                  selectedDocs={selectedDocs}
                  notOnRowClick={() => this.notOnRowClick()}
                  getRowSelection={selectedRows =>
                    this.getSelectedDocuments(selectedRows)
                  }
                  keyID="CASE_ID"
                  openDrawer={value =>
                    this.openDrawer("createLegalHold", value)
                  }
                  openLegalDrawer={(drawer, value) => this.openLegalDrawer(drawer, value)}
                  onRowClick={value => this.LegalCase(value)}
                  columns={columns}
                  data={filteredData}
                  needRowSelection
                  add
                  noDelete
                  currentPageSize={this.currentPageSize}
                  pageSize={pageSizeAll || 20}
                  active
                  release
                />}
                {(caseFilter === "active") &&
                  <DataTableHeader openColumConfigDrawer={() => this.openColumConfigDrawer()}
                    formatMessage={formatMessage}
                    openDrawer={value =>
                      this.openDrawer("createLegalHold", value)
                    }
                    openLegalDrawer={(drawer, value) => this.openLegalDrawer(drawer, value)}

                    data={filteredData}
                    needRowSelection
                    add
                    noDelete
                    currentPageSize={this.currentPageSize}
                    pageSize={pageSizeActive || 20}

                    release
                  />}
                {(caseFilter === "released") && <DataTableHeader openColumConfigDrawer={() => this.openColumConfigDrawer()}
                  formatMessage={formatMessage}
                  selectedDocs={selectedDocs}
                  getRowSelection={selectedRows =>
                    this.getSelectedDocuments(selectedRows)
                  }
                  notOnRowClick={() => this.notOnRowClick()}
                  openDrawer={value =>
                    this.openDrawer("createLegalHold", value)
                  }
                  openLegalDrawer={(drawer, value) => this.openLegalDrawer(drawer, value)}

                  keyID="CASE_ID"
                  onRowClick={value => this.LegalCase(value)}
                  columns={columns}
                  data={filteredData}
                  needRowSelection
                  add
                  noDelete
                  currentPageSize={this.currentPageSize}
                  pageSize={pageSizeReleased || 20}
                  active
                />}

                <div className="card-container" style={{ height: 40 }}>

                  <Tabs
                    type="card"
                    defaultActiveKey="active"
                    tabBarStyle={{ width: "100%", position: "fixed" }}
                    onChange={key => this.changeFilter(key)}
                  >
                    <TabPane tab={formatMessage(messages["All"])} key="all">

                      <div style={{ height: "100%" }}>
                        {caseFilter && (
                          <DataTable
                            closeColumConfigDrawer={() => this.closeColumConfigDrawer()}
                            columnConfig={AllColumnConfig}
                            formatMessage={formatMessage}
                            selectedDocs={selectedDocs}
                            notOnRowClick={() => this.notOnRowClick()}
                            getRowSelection={selectedRows =>
                              this.getSelectedDocuments(selectedRows)
                            }
                            keyID="CASE_ID"
                            coveredHeight={245}
                            openDrawer={value =>
                              this.openDrawer("createLegalHold", value)
                            }
                            onRowClick={value => this.LegalCase(value)}
                            columns={columns}
                            data={filteredData}
                            needRowSelection
                            add
                            noDelete
                            pageSize={pageSizeAll || 20}
                            currentPage={currentPageAll}
                            currentPaginationSize={this.currentPaginationSize}
                          />
                        )}
                      </div>
                    </TabPane>
                    <TabPane
                      tab={formatMessage(messages["Active"])}
                      key="active"
                    >
                      <div style={{ height: "100%" }}>
                        {caseFilter && (
                          <DataTable
                            closeColumConfigDrawer={() => this.closeColumConfigDrawer()}
                            columnConfig={ActiveColumnConfig}
                            formatMessage={formatMessage}
                            selectedDocs={selectedDocs}
                            notOnRowClick={() => this.notOnRowClick()}
                            getRowSelection={selectedRows =>
                              this.getSelectedDocuments(selectedRows)
                            }
                            coveredHeight={245}
                            openDrawer={value =>
                              this.openDrawer("createLegalHold", value)
                            }
                            keyID="CASE_ID"
                            onRowClick={value => this.LegalCase(value)}
                            columns={activeColumns}
                            data={filteredData}
                            needRowSelection
                            add
                            noDelete
                            pageSize={pageSizeActive || 20}
                            currentPage={currentPageActive}
                            currentPaginationSize={this.currentPaginationSize}
                          />
                        )}
                      </div>
                    </TabPane>
                    <TabPane
                      tab={formatMessage(messages["Released"])}
                      key="released"
                    >

                      <div style={{ height: "100%" }}>
                        {caseFilter && (
                          <DataTable
                            closeColumConfigDrawer={() => this.closeColumConfigDrawer()}
                            columnConfig={ReleasedColumnConfig}
                            noReadingPane
                            formatMessage={formatMessage}
                            selectedDocs={selectedDocs}
                            getRowSelection={selectedRows =>
                              this.getSelectedDocuments(selectedRows)
                            }
                            notOnRowClick={() => this.notOnRowClick()}
                            coveredHeight={245}
                            openDrawer={value =>
                              this.openDrawer("createLegalHold", value)
                            }
                            keyID="CASE_ID"
                            onRowClick={value => this.LegalCase(value)}
                            columns={columns}
                            data={filteredData}
                            needRowSelection
                            add
                            noDelete
                            pageSize={pageSizeReleased || 20}
                            currentPage={currentPageReleased}
                            currentPaginationSize={this.currentPaginationSize}
                          />
                        )}
                      </div>
                    </TabPane>
                  </Tabs>
                </div>

                {/* <div style={{ height: "100%" }}>
                  {caseFilter && <DataTable formatMessage={formatMessage} getRowSelection={(selectedRowKeys, selectedRows) => this.getSelectedDocuments(selectedRowKeys, selectedRows)} coveredHeight={320} openDrawer={(value) => this.openDrawer('createLegalHold', value)} onRowClick={value => this.LegalCase(value)} actions={{ releaseLegalHold: caseFilter !== "released" && true, active: caseFilter !== "active" && true, noDelete: true }} columns={filteredColumns} data={filteredData} actionDropdown needRowSelection add noDelete addEditColumn openReleaseDrawer={text => this.openDrawer('legalHoldReleases', text)} openActiveLegalHoldDrawer={() => this.openDrawer('activeLegalHold')} />}
                </div> */}
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
    legalHolds: state.LegalHoldsReducer.legalHolds,
    selectedRowKeys: state.updateSelectedRecordsReducer.selectedRowKeys,
    authenticUserInfo: state.LoginReducer.authenticUserInfo

  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateHistory: (history, pathname, state) => dispatch(updateHistory(history, pathname, state)),
    clearSearchedResults: () => dispatch(clearSearchedResults()),
    fetchLegalHolds: () => dispatch(fetchLegalHolds()),
    totalSimpeSearchedDocs: searchedDataLength => dispatch(totalSimpeSearchedDocs(searchedDataLength)),
    clearOnholdDocuments: () => dispatch(clearOnholdDocuments()),
    updateLegalHoldStatus: (caseId, status) => dispatch(updateLegalHoldStatus(caseId, status)),
    resetSelectedRecords: () => dispatch(resetSelectedRecords()),
    postSearchData: (data, cancelRequest) => dispatch(postSearchData(data, cancelRequest)),
    smartSearch: (data, cancelRequest) => dispatch(smartSearch(data, cancelRequest)),
    queryBuilderSearchData: (data, cancelRequest) => dispatch(queryBuilderSearchData(data, cancelRequest)),
    postAdvancedSearch: (data, cancelRequest) => dispatch(postAdvancedSearch(data, cancelRequest)),
    updateSearchCriteria: (searchedData, searchType) => dispatch(updateSearchCriteria(searchedData, searchType)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LegalHold);
