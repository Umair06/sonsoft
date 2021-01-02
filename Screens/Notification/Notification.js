import React, { Component } from "react";
import { Layout, Tabs, message } from 'antd';
import NavHeader from "../../Components/Navbar/Header/Header";
import DataTable from "../../Components/DataTable/DataTable";
import styles from "../../styles";
// import GridViewPageHeader from "../../Components/PageHeader/GridViewPageHeader";
import NotificationSideBar from '../../Components/Notifications/Notifications';
// import RunIcon from '../../Assets/icons/SV_ICONS/Run_Orange.png';
// import DismissIcon from '../../Assets/icons/SV_ICONS/Close_Orange.png';
import ReadingPane from "../../Components/ReadingPane/ReadingPane";
// import DismissDrawer from "../../Components/Modal/DismissDrawer";
import DataTableHeader from "../../Components/DataTable/Component/DataTableHeader"

import { defineMessages } from 'react-intl';

const messages = defineMessages({
  'Notification Type': {
    id: "notification.notificationType",
    defaultMessage: "Notification Type",
  },
  'Name': {
    id: "notification.name",
    defaultMessage: "Name"
  },
  'Snippet': {
    id: "notification.snippet",
    defaultMessage: "Snippet"
  },
  'Sent': {
    id: "notification.sent",
    defaultMessage: "Sent"
  },
  'Dismissed': {
    id: "notification.dismissed",
    defaultMessage: "Dismissed"
  },
  'Action': {
    id: "notification.action",
    defaultMessage: "Action"
  },
  'Report': {
    id: "notification.Report",
    defaultMessage: "Report"
  },
  'Notifications': {
    id: "notification.Notifications",
    defaultMessage: "Notifications",
  },
  'Notifications Report': {
    id: "notification.NotificationsReport",
    defaultMessage: "Notifications Report"
  },
  'All': {
    id: "notification.All",
    defaultMessage: "All"
  },
  'Active': {
    id: "notification.Active",
    defaultMessage: "Active"
  },
  // 'Dismissed': {
  //   id: "notification.Dismissed",
  //   defaultMessage: "Dismissed"
  // },
  '_Home': {
    id: "notification._Home",
    defaultMessage: "Home"
  },
  '_Notifications': {
    id: "notification._Notifications",
    defaultMessage: "Notifications"
  },
})

const { TabPane } = Tabs;
const { Header, Sider, Content } = Layout;

let notOnRowClick = false;

class NotificationTemplate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      aboutUsDrawer: false,
      advanceSearch: false,
      criteriaExist: false,
      menuDrawer: false,
      profileDrawer: false,
      helpDrawer: false,
      filterType: "active",
      openedEmail: props.location && props.location.state && props.location.state.navigationState,
      readingPane: props.location && props.location.state && props.location.state.navigationState && true
    }
  }

  componentDidMount() {
    message.destroy && message.destroy()
  }

  collapseSideMenu = () => {
    const toggleCollapsed = !this.state.collapsed
    this.setState({
      collapsed: toggleCollapsed
    })
  };

  toggleReadingPane = () => {
    const { currentNode } = this.state;
    const toggleReadingPane = !this.state.readingPane
    if (currentNode) {
      currentNode.style.borderLeft = "12px solid transparent"
    }
    this.setState({
      currentNode: currentNode,
      readingPane: toggleReadingPane,
      openedEmail: undefined
    })
  };

  openReadingPane = email => {
    if (!notOnRowClick) {
      this.setState({
        readingPane: true,
        openedEmail: email
      })
    }
    notOnRowClick = notOnRowClick && false
  };
  closeReadingPane = () => {
    const { currentNode } = this.state;
    if (currentNode !== undefined) {
      currentNode.style.borderLeft = "12px solid transparent"
    }
    this.setState({
      currentNode: currentNode,
      readingPane: false
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
  columns = [
    {
      title: 'Notification Type',
      dataIndex: 'notificationType',
      disabled: true,
      render: notificationType => <div style={{ width: "inherit !important", height: "inherit !important" }} ><div style={{ wordBreak: "break-all" }}>{notificationType}</div></div>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      // disabled: false,
      render: name => <div style={{ width: "inherit !important", height: "inherit !important" }} ><div style={{ wordBreak: "break-all" }} >{name}</div></div>,
    }
    ,
    {
      title: 'Snippet',
      dataIndex: 'snippet',
      disabled: true,
      render: snippet => <div style={{ width: "inherit !important", height: "inherit !important" }} ><div style={{ wordBreak: "break-all" }}>{snippet}</div></div>,
    }
    ,
    {
      title: 'Sent',
      dataIndex: 'sent',
      disabled: true,
      render: sent => <div style={{ width: "inherit !important", height: "inherit !important" }} ><div style={{ wordBreak: "break-all" }}>{sent}</div></div>,
    }
    , {
      title: "Dismissed",
      dataIndex: "dismissed",
      disabled: true
    }
    // , {
    //   title: "Action",
    //   render: () => <img src={RunIcon} height={30} alt="" />
    // }
    // , {
    //   title: "Dismiss",
    //   render: () => <div onClick={() => this.notOnRowClick()}>
    //     <img onClick={() => this.openDrawer('dismissDrawer')} src={DismissIcon} height={30} alt="" />
    //   </div>,
    //   // onClick: ()=> this.openDrawer('dismissDrawer')
    // }
  ];

  notOnRowClick() {
    notOnRowClick = true
  };


  data = [
    {
      key: '1',
      notificationType: 'Export Completed',
      name: "Shreddin' Steezy v. Timberline",
      snippet: "Shreddin' Steezy v. Timberline export completed.",
      sent: "12-Sept.-2019",
      dismissed: ""
    },
    {
      key: '2',
      notificationType: 'Email Archive Failed',
      name: "Daily archive 13-Oct.-2019",
      snippet: "The email archive failed. Had 40 million emails. Used to grab 200 emails and mes",
      sent: "13-Oct.-2019",
      dismissed: ""
    },
    {
      key: '3',
      notificationType: 'Export Completed',
      name: "Daily archive 14-Sept.-2019",
      snippet: "The email archive failed. Had 40 million emails. Used to grab 200 emails and mes",
      sent: "14-Sept.-2019",
      dismissed: ""
    }

  ];

  readingPaneColumns = [
    {
      title: 'Notification Type',
      dataIndex: 'notificationType',
      render: notificationType => <span style={{ wordBreak: "break-all" }} >{notificationType}</span>,
      disabled: true
    },
    {
      title: 'Name',
      dataIndex: 'name',
      render: name => <span style={{ wordBreak: "break-all" }} >{name}</span>,
      disabled: true
    }
  ];

  filterData = filterType => {
    this.setState({
      filterType
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
  openColumConfigDrawer = () => {
    const { filterType } = this.state
    if (filterType === "dismissed") {
      this.setState({
        columnConfigDismissed: true
      })
    } else if (filterType === "active") {
      this.setState({
        columnConfigActive: true
      })
    } else {
      this.setState({
        columnConfigAll: true
      })
    }

  };

  closeColumConfigDrawer = () => {
    const { filterType } = this.state
    if (filterType === "dismissed") {
      this.setState({
        columnConfigDismissed: false
      })
    } else if (filterType === "active") {
      this.setState({
        columnConfigActive: false
      })
    } else {
      this.setState({
        columnConfigAll: false
      })
    }
  };
  openDismissDrawer = record => {
    console.log("record",record)
    this.setState({
      dismissDrawer: true,
      dismissRecord: record
    })
  }
  closeDismissDrawer = () => {
    this.setState({
      dismissDrawer: false,
      dismissRecord: undefined
    })
  }
  Delete = val => {
    console.log("Dismiss values", val)
    // this.props.deleteNotification(val);
  };
  render() {
    const { collapsed, aboutUsDrawer, reportEmail, customizedColum, changePassDrawer, criteriaExist, menuDrawer, helpDrawer, dismissDrawer, profileDrawer, notificationDrawer, filterType, readingPane, openedEmail, metadatAcive, columnConfigAll, columnConfigActive, columnConfigDismissed, dismissRecord} = this.state;
    let columns = filterType === "dismissed" ? this.columns.slice(0, 4) : filterType === "active" ? this.columns.slice(0, 4) : this.columns

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
    this.readingPaneColumns.forEach((rpc) => {
      messagesKeys.forEach((mK, index) => {
        if (rpc.key === mK) {
          rpc.title = formatMessage(messagesValues[index]);
        }
      })
    });

    const routes = [
      {
        path: '/homescreen',
        exact: true,
        breadCrums: formatMessage(messages["_Home"]),
        redirect: '/homescreen',
      },
      {
        path: "/notifications",
        breadCrums: "Notifications",
        exact: true,
        redirect: "/notifications"
      },
    ];

    return (
      <div style={styles.page}>
        {/* <DismissDrawer
          formatMessage={formatMessage}
          dismissDrawer={dismissDrawer}
          close={() => this.closeDrawer("dismissDrawer")}
        /> */}
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

              routes={routes}
              openReadingPane={() => this.toggleReadingPane()}
              iconName="Notification_Blue"
              title="Notifications"
              openCustomizedColumn={customizedColum}
              customizedColums={columns}
              customizeColumn={val => this.customizeColumn(val)}
              reportEmail={reportEmail}
              dismissDrawer={dismissDrawer}
              reportHeading="Notifications Report"
              imageFlag={true}  
            />
          </Header>

          <Layout style={{ overflowY: "hidden" }}>
            {!collapsed && (
              <Sider
                style={{
                  backgroundColor: "#efeff7",
                  overflow: "auto"
                }}
                width={!collapsed ? 260 : 80}
              >
                <NotificationSideBar
                  formatMessage={formatMessage}
                  criteriaExist={criteriaExist}
                  clearCirteria={() => this.clearCirteria()}
                  close={() => this.closeAdvanceSearchDrawer()}
                  openAdvanceSearchDrawer={this.openAdvanceSearchDrawer}
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
                {collapsed && (
                  <div style={{ width: 80, height: "1vh" }}>
                    <NotificationSideBar
                      formatMessage={formatMessage}
                      collapsed={collapsed}
                      collapseSideMenu={() => this.collapseSideMenu()}
                    />
                  </div>
                )}
                {/* <GridViewPageHeader
                  historyProp={this.props.history}
                  formatMessage={formatMessage}
                  routes={routes}
                  openReadingPane={() => this.toggleReadingPane()}
                  iconName="Notification_Blue"
                  title="Alerts"
                  openDrawer={drawer => this.openDrawer(drawer)}
                  closeDrawer={drawer => this.closeDrawer(drawer)}
                  openCustomizedColumn={customizedColum}
                  customizedColums={columns}
                  customizeColumn={val => this.customizeColumn(val)}
                  reportEmail={reportEmail}
                  dismissDrawer={dismissDrawer}
                  reportHeading="Alerts"
                /> */}
                <DataTableHeader
                  openDismissDrawer={(record) => this.openDismissDrawer(record)}
                  openColumConfigDrawer={() => this.openColumConfigDrawer()}
                  formatMessage={formatMessage}
                  // openDrawer={values =>
                  //   this.openDrawer('notificationSideDrawer', values)
                  // }

                  openDrawer={drawer => this.openDrawer(drawer)}
                  actionDropdown
                  data={this.props.notificationlist}
                  currentPageSize={this.currentPageSize}
                  actions={filterType === "dismissed" ? { report: true } : { dismiss: true, report: true }}
                  noDelete={true}
                  readingPane={readingPane}

                />
              </div>

              <div
                style={{ display: "flex", height: "100%", overflowY: "hidden" }}
              >
                <div style={{ width: "100%" }}>
                  <div
                    className="card-container"
                    style={{ padding: 0, margin: 0 }}
                  >
                    <Tabs
                      type="card"
                      defaultActiveKey="active"
                      tabBarStyle={{
                        width: "100%",
                        position: "fixed",
                      }}
                      onChange={this.filterData}
                    >
                      <TabPane
                        tab={formatMessage(messages["All"])}
                        key="all"
                      ></TabPane>
                      <TabPane
                        tab={formatMessage(messages["Active"])}
                        key="active"
                      ></TabPane>
                      <TabPane
                        tab={formatMessage(messages["Dismissed"])}
                        key="dismissed"
                      ></TabPane>
                    </Tabs>
                  </div>
                  <div
                    style={{ padding: 0, cursor: "pointer", display: "flex" }}
                  >
                    <div style={{ width: readingPane ? "50%" : "100%" }}>
                      <DataTable
                        actionDropdown
                        formatMessage={formatMessage}
                        indicateRow
                        dismissIcon={(filterType === "all" || filterType === "active" )? true : false}
                        addEditColumn={(filterType === "all" || filterType === "active" )? true : false}
                        dissmiss={true}
                        action={{}}
                        openDrawer={drawer => this.openDrawer(drawer)}
                        notOnRowClick={() => this.notOnRowClick()}
                        disappearMark={currentNode =>
                          this.disappearMark(currentNode)
                        }
                        onRowClick={rec => this.openReadingPane(rec)}
                        data={this.data}
                        columns={
                          readingPane ? this.readingPaneColumns : columns
                        }
                        columnConfig={filterType === "dismissed" ? columnConfigDismissed : filterType === "active" ? columnConfigActive : columnConfigAll}
                        closeColumConfigDrawer={() => this.closeColumConfigDrawer()}
                        pagination
                        dismissRecord={dismissRecord}
                        dismissDrawer={dismissDrawer}
                        closeDismissDrawer={() => this.closeDismissDrawer()}
                        openDismissDrawer={(record) => this.openDismissDrawer(record)}
                        Delete={text => this.Delete(text)}
                      />
                    </div>
                    {readingPane && (
                      <div style={{ width: "50%" }}>
                        <ReadingPane
                          formatMessage={formatMessage}
                          openMetadata={() => this.openMetadata()}
                          closeMetadata={() => this.closeMetadata()}
                          closeReadingPane={() => this.closeReadingPane()}
                          metadatAcive={metadatAcive}
                          openedEmail={openedEmail}
                          notificationReadingPane
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
};

export default (NotificationTemplate);
