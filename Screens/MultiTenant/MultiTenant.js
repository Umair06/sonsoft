import React, { Component } from 'react';
import { Layout, Typography, Icon, message } from 'antd';
import NavHeader from "../../Components/Navbar/Header/Header";
import DataTable from "../../Components/DataTable/DataTable";
import styles from "../../styles";
import Theme from "../../Assets/Theme/Theme";
import MyArchiveEmailSideBar from '../../Components/MultiTenantSideBar/MultiTenantSideBar';
import { defineMessages } from 'react-intl';
import { getMultiTenantCustomerInfo } from "../../Redux/Actions/MultiTenantAction/MultiTenantAction";
import { connect } from "react-redux";
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

// let notOnRowClick = false;
const dataSource = [
    {
        key: '1',
        CustomerName: 'exchange2007',
        Phone: 1292201022,
        Email: 'mohtashimm@sonasoft.com',
    },
    {
        key: '2',
        CustomerName: 'exchange2010',
        Phone: 1292201022,
        Email: 'mohtashimm@sonasoft.com',
    },
    {
        key: '3',
        CustomerName: 'exchange2013',
        Phone: 1292201022,
        Email: 'mohtashimm@sonasoft.com',
    },
    {
        key: '4',
        CustomerName: 'exchange2016',
        Phone: 1292201022,
        Email: 'mohtashimm@sonasoft.com',
    },
    {
        key: '5',
        CustomerName: 'exchange2019',
        Phone: 1292201022,
        Email: 'mohtashimm@sonasoft.com',
    },
];
const columns = [
    {
        title: 'Customer Name',
        dataIndex: "CustomerName",
        width: '400px',
        // render: record => (
        //     renderDataSourceTypeColumn(record)
        // ),
        disabled: true
    },
    {
        title: 'Phone',
        width: "370px",
        dataIndex: "Phone",
        disabled: true
    },
    {
        title: 'Email',
        dataIndex: "Email",
        disabled: true,


        render: text => (
            <button style={{
                backgroundColor: "transparent",
                border: "none",
                wordBreak: "break-all",
                cursor: "pointer",
                textDecoration: "underline",
                display: "inline",
                margin: 0,
                padding: 0
            }} title={text}>
                {text}
            </button>
        )
    },
]
const readingPaneColumns = [
    {
        title: 'Type',
        width: '55px',
        render: record => (
            renderDataSourceTypeColumn(record)
        ),
        disabled: true
    },
    {
        title: 'Information',
        width: "400px",
        render: record => {
            var recordDate = record._source && record._source.header && record._source.header.date ? moment.utc(new Date(record._source.header.date)).format("DD-MMM-YYYY") : ""
            let higlightedSubject = (record && record.highlight && record.highlight.subject) || (record && record.highlight && record.highlight && record.highlight["subject.keyword"])
            let subject = higlightedSubject ? higlightedSubject[0] : record && record._source && record._source.subject
            subject = subject && subject.slice(0, 25)
            return (
                <div style={{ display: 'flex', flexDirection: 'row', width: "inherit" }}>
                    <div style={{ display: 'flex', flexDirection: 'column', width: "70%", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        <Text >{record._source && record._source.from && record._source.from.length > 0 && record._source.from.map((val, index) => !(index > 1) && <Text key={index} style={{ color: `${color.Black75}` }}>{val.slice(0, 30)}</Text>)}</Text>
                        <Text style={{ display: "flex", flexDirection: "column" }}>{record._source && record._source.to && record._source.to.length > 0 && record._source.to.map((val, index) => !(index > 1) && <div key={index}>{index === 0 ? (val.length > 30 ? "To: " + val.slice(0, 30) + "..." : "To: " + val) : (val.length > 30 ? val.slice(0, 30) + "..." : val)}</div>)}</Text>
                        <Text>{record._source && record._source.attachment_count > 0 && <Icon type="paper-clip" />} <span dangerouslySetInnerHTML={{ __html: subject }}></span></Text>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', paddingRight: 15 }}>{recordDate}
                    </div>
                </div>
            )
        },
        disabled: true
    },
    {
        title: '',
        disabled: true
    },
];

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


class MultiTenant extends Component {
    constructor(props) {
        super(props)
        this.state = {
            aboutUsDrawer: false,
            menuDrawer: false,
            helpDrawer: false,
            profileDrawer: false,
            sideMenuFilter: true,
            currentPage: 1,
            routes: [
                {
                    path: '/homescreen',
                    exact: true,
                    breadCrums: this.props.formatMessage(messages["_Home"]),
                    redirect: '/homescreen'
                },
                {
                    path: '/myarchivedemail',
                    exact: true,
                    breadCrums: this.props.formatMessage(messages["_My Archived Email"]),
                    redirect: '/myarchivedemail'
                }
            ]
        }
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
        } else if (searchType === 1) {
            let fromCount = 0;
            let toCount = selectedSize;
            this.updateCurrentPage(1);
            let customValues = updatedSearchCriteria;
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
            this.props.updateDataTablePageSize(selectedSize, "myArchivedEmailsPageSize")
            this.props.fetchFolderRelatedDocs("", true)
            this.props.postSearchData(APIbody);
        } else if (searchType === 2) {
            let fromCount = 0;
            let toCount = selectedSize;
            this.updateCurrentPage(1);
            let customValues = updatedSearchCriteria;
            customValues.fromCount = fromCount;
            customValues.toCount = toCount;
            this.props.updateDataTablePageSize(selectedSize, "myArchivedEmailsPageSize")
            this.props.fetchFolderRelatedDocs("", true)
            this.props.postAdvancedSearch(customValues);
        }
    }

    // pageChanged = (page, pageSize) => {
    //     const { folderKey } = this.state;
    //     const { searchType, updatedSearchCriteria } = this.props;
    //     if (searchType === "folderRelatedDocuments") {
    //         this.updateCurrentPage(page)
    //         let APIbody = { "selectedFolderKey": (folderKey && folderKey.toString()), "fromCount": (page - 1) * pageSize, "toCount": pageSize }
    //         // this.props.fetchFolderRelatedDocs("", true)
    //         message.destroy && message.destroy()
    //         this.props.fetchFolderRelatedDocs(APIbody)
    //     } else if (searchType === 1) {
    //         let fromCount = (page - 1) * pageSize;
    //         let toCount = pageSize;
    //         this.updateCurrentPage(page);
    //         let customValues = updatedSearchCriteria;
    //         customValues.from = customValues.from ? customValues.from.format("YYYY-MM-DD") : ""
    //         customValues.to = customValues.to ? customValues.to.format("YYYY-MM-DD") : ""
    //         let APIbody = {
    //             fromCount: fromCount || 0,
    //             toCount: toCount || 100,
    //             fromDate: customValues.from || "",
    //             toDate: customValues.to || "",
    //             employee: customValues.Select_Employees || customValues.employee || [],
    //             filterType: customValues.Select_Type || customValues.filterType || [],
    //             labelType: customValues.Select_Labels || customValues.labelType || [],
    //             contentValue: customValues.New_Search || customValues.contentValue || ""
    //         };
    //         this.props.postSearchData(APIbody);
    //     } else if (searchType === 2) {
    //         let fromCount = (page - 1) * pageSize;
    //         let toCount = pageSize;
    //         this.updateCurrentPage(page);
    //         let customValues = updatedSearchCriteria;
    //         customValues.fromCount = fromCount;
    //         customValues.toCount = toCount;
    //         this.props.setFolderRelatedDocuments();
    //         this.props.postAdvancedSearch(customValues);
    //     }
    // }


    // notOnRowClick() {
    //     notOnRowClick = true
    // };

    collapseSideMenu = () => {
        const toggleCollapsed = !this.state.collapsed
        this.setState({
            collapsed: toggleCollapsed
        })
    };

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
    movedLoginScreen = email => {
        this.props.getMultiTenantCustomerInfo(email.CustomerName)
        var newurl = window.location.protocol + "//" + window.location.host + "/" + email.CustomerName + "homescreen";
        window.open(newurl, '_blank');
        // window.location.href=newurl;
        // window.location.origin.append(email.CustomerName)
        // window.location.pathname="/"
    }

    render() {
        const { readingPane, collapsed, aboutUsDrawer, dataTableHeight, changePassDrawer, menuDrawer, helpDrawer, profileDrawer, /*routes,*/ currentPage,
        } = this.state;
        const { formatMessage, /*mailboxFolderStructure*/ } = this.props;

        return (

            <div style={styles.page}>
                <Layout style={{ height: "100vh", maxHeight: "100vh", overflowY: "hidden" }}>
                    <Header style={styles.header}>
                        <NavHeader MultiTenant={true} formatMessage={formatMessage} historyProp={this.props.history} aboutUsDrawer={aboutUsDrawer} changePassDrawer={changePassDrawer} helpDrawer={helpDrawer}
                            profileDrawer={profileDrawer} menuDrawer={menuDrawer}
                            openDrawer={drawer => this.openDrawer(drawer)} closeDrawer={drawer => this.closeDrawer(drawer)}
                        />
                    </Header>

                    <Layout style={{ overflowY: "hidden" }}>
                        {<Sider style={{
                            backgroundColor: "#F5F7FA",
                            MozBoxShadow: "4px 4px 8px -3px #777",
                            WebkitBoxShadow: "`4px 4px 8px -3px #777",
                            boxShadow: "4px 4px 8px -3px #777 ",
                            overflowX: 'inherit',
                            // overflowY: 'scroll',
                        }} width={!collapsed ? 260 : 0}>
                            <MyArchiveEmailSideBar closeReadingPane={() => this.closeReadingPane()} formatMessage={formatMessage} collapsed={collapsed} collapseSideMenu={() => this.collapseSideMenu()}
                            />
                        </Sider>}

                        <Content style={{ backgroundColor: "#fff", height: "100%", overflowY: "hidden" }}>
                            <div style={{ display: "flex", width: "100%" }}>
                                {collapsed && <div style={{ width: 80 }}><MyArchiveEmailSideBar collapsed={collapsed} collapseSideMenu={() => this.collapseSideMenu()} /></div>}

                            </div>

                            <div id="dataTable" style={{ display: "flex", height: "95%", overflowY: "hidden", width: "100%" }}>
                                <div style={{ width: readingPane ? "45%" : "100%", height: "100%", paddingTop: 10 }}>
                                    <DataTable formatMessage={formatMessage} currentPage={currentPage} onPageSizeChange={(selectedSize) => this.updateDatatablePageSize(selectedSize)} coveredHeight={280} disappearMark={currentNode => this.disappearMark(currentNode)} height={dataTableHeight} rowSelection columns={readingPane ? readingPaneColumns : columns} data={dataSource} getDataWithPagination={true} pageChanged={this.pageChanged} onRowClick={email => this.movedLoginScreen(email)} />
                                </div>
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
        authenticUserInfo: state.LoginReducer.authenticUserInfo,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        getMultiTenantCustomerInfo: data => dispatch(getMultiTenantCustomerInfo(data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MultiTenant);
