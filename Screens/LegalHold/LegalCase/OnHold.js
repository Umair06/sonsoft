import React, { Component } from 'react';
import ReadingPane from "../../../Components/ReadingPane/ReadingPane";
import DataTable from "../../../Components/DataTable/DataTable";
import { Typography, Icon, Popover, message } from "antd";
import themes from "../../../Assets/Theme/Theme";
import styles from "../../../styles";
import { connect } from "react-redux";
import { getSimpleSearchAttachment } from "../../../Redux/Actions/SimpleSearchAction/SimpleSearchAction";
import {
  getOnholdDocuments,
  removeSelectedFromOnHold,
  clearOnholdDocuments,
  removeAllFromOnHold,
  onHoldApiBodyData
} from "../../../Redux/Actions/LegalHoldsActions/LegalHoldsActions";
import { updateDataTablePageSize } from "../../../Redux/Actions/UpdateDataTablePageSize/UpdateDataTablePageSize";
//import CaseNameDrawer from '../../../Components/Modal/CaseName';
import RemoveDocument from "../../../Components/Modal/RemoveDocument"

import moment from "moment";
import LabelDrawer from '../../../Components/ReadingPane/Components/LabelDrawer';
import { getPoliciesData } from '../../SearchArchive/utils';

const { Text, Paragraph } = Typography;
const { color } = themes;

function renderDataSourceTypeColumn(record) {
  let DataSourceIcons = { msteams: 'MSTeams72x72.png', symphony: 'Symphony72x72.png', yammer: 'Yammer72x72.png', reuters: 'Reuters-72x72.png', bloomberg: 'Bloomburg72x72.png', slack: 'Slack72x72.png', emls: 'Exchange72x72.png', onedrive: 'OneDrive72x72.png', mssharepoint: 'SharePoint-72x72.png', ews: 'Exchange72x72.png', exchange: 'Exchange72x72.png' }
  let dataSource = record && record._source && record._source ? (record._source.header && record._source.header.header && record._source.header.header && record._source.header.header['x-application'] ? record._source.header.header['x-application'] : record._source.datasource) : null
  let icon = (dataSource && Array.isArray(dataSource)) ? dataSource.length > 0 && DataSourceIcons[dataSource[0].replace(" ", "").toLowerCase()] : dataSource && DataSourceIcons[dataSource.replace(" ", "").toLowerCase()]
  if (icon) {
    return <img alt={dataSource} width={32} src={require(`../../../Assets/icons/data_sources/${icon}`)} />
  }
  return
}

class OnHold extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPage: 1,
      onHoldDocuments: [],
    }
    message.destroy()
  }
  

  static getDerivedStateFromProps(props, state) {
    let selectedRows = []
    let data = props.onHoldDocuments
    if (props.selectedRowKeys && Array.isArray(props.selectedRowKeys) && props.selectedRowKeys.length && data && Array.isArray(data) && data.length) {
      data.forEach(record => {
        if (props.selectedRowKeys.includes(record.key)) {
          selectedRows.push(record)
        }
      })
    }
    if ((!props.onHoldDocuments || !props.onHoldDocuments.length) && props.readingPane && props.openedEmail) {
      props.openReadingPane && props.openReadingPane(undefined)
    }
    return {
      selectedOnHoldDocs: selectedRows
    }
  }

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

  closeDrawer = drawer => this.setState({ [drawer]: false });


  columns = [
    {
      title: 'Type',
      width: '50px',
      render: record => (
        renderDataSourceTypeColumn(record)
      ),
      disabled: true
    },
    {
      title: <Icon type="lock" style={{ fontSize: 14 }} />,
      width: "30px",
      render: record => (
        <Popover content={<div>{record._source && record._source.case_site_name && Array.isArray(record._source.case_site_name) && record._source.case_site_name.length > 0 && record._source.case_site_name.map((val, ind) => <p style={{ ...styles.noMargin, ...styles.noPadding }} key={ind}>{val}</p>)}</div>} title="Legal Hold(s)" trigger="hover">
          <div>
            <p style={{ fontSize: 12, cursor: "pointer", color: "blue" }}>{record._source && record._source.case_site_name && Array.isArray(record._source.case_site_name) && record._source.case_site_name.length > 0 && record._source.case_site_name.length}</p>
          </div>
        </Popover>
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
              <Text >{record._source && record._source.from && record._source.from.length > 0 && record._source.from.map((val, index) =>
                <Text key={index} style={{ color: `${color.Dark}`, fontSize: 16, fontFamily: 'Segoe Ui', fontWeight: 500 }}>{val}</Text>)}</Text>
              <Text style={{ display: "flex", flexDirection: "column" }}>{record._source && record._source.to && record._source.to.length > 0 && record._source.to.slice(0, 2).map((val, index) => <Text key={index}>{index === 0 ? ("To: " + val) : (val)}</Text>)}</Text>
              <Text>{record._source && record._source.attachment_count > 0 && <Icon type="paper-clip" />}
                <span style={{ color: color.Dark, fontFamily: 'Segoe UI' }} dangerouslySetInnerHTML={{ __html: subject }}></span></Text>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', paddingRight: 15 }}>{recordDate}
            </div>
          </div>
        )
      },
      disabled: true
    },
    {
      title: 'Snippet',
      width: "550px",
      render: record => {
        let message_body;
        if (record._source && record._source.message_body) {
          message_body = {
            content: record._source.message_body,
            content_type: "text/plain"
          }
        } else {
          message_body = {
            content: record._source && record._source.html_body,
            content_type: "text/html"
          }
        }
        message_body = message_body.content && message_body.content.slice(0, 200);
        return (
          // <Text style={{ overflowWrap: "break-word" }}>{message_body}</Text>
          <Paragraph ellipsis={{ rows: 3 }}>
            <span dangerouslySetInnerHTML={{ __html: message_body }}></span>
          </Paragraph>
        );
      },
      disabled: true
    },
    {
      title: "Labels",
      width: "200px",
      render: record => {
        if (this.props.legalHoldAutoLabels) {
          const { legalHoldAutoLabels, simpleSearch } = this.props;
          return getPoliciesData(
            record && record._source && record._source.label_policy,
            this.openLabelDrawer,
            (simpleSearch && simpleSearch.LabelType) ? simpleSearch.LabelType : legalHoldAutoLabels,
            'onHold',
            this.props.caseInfo.CASE_ID,
            this.props.notOnRowClick
          )
        }
      },
      disabled: true
    },
  ]

  // readingPaneColumns = [
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
  //       var recordDate = record._source && record._source.header && record._source.header.date ? (moment(new Date(record._source.header.date)).format('DD-MMM-YYYY') === "Invalid date" ? record._source.header.date : moment(new Date(record._source.header.date)).format('DD-MMM-YYYY')) : ""
  //       let higlightedSubject = (record && record.highlight && record.highlight.subject) || (record && record.highlight && record.highlight && record.highlight["subject.keyword"])
  //       let subject = higlightedSubject ? higlightedSubject[0] : record && record._source && record._source.subject
  //       subject = subject && subject.slice(0, 25)
  //       return (
  //         <div style={{ display: 'flex', flexDirection: 'row', width: "inherit" }}>
  //           <div style={{ display: 'flex', flexDirection: 'column', width: "70%", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
  //             <Text >{record._source && record._source.from && record._source.from.length > 0 && record._source.from.map((val, index) => !(index > 1) && <Text key={index} style={{ color: `${color.Dark}`, fontSize: 16, fontFamily: 'Segoe Ui', fontWeight: 500 }}>
  //               {val.slice(0, 30)}</Text>)}</Text>
  //             <Text style={{ display: "flex", flexDirection: "column" }}>{record._source && record._source.to && record._source.to.length > 0 && record._source.to.map((val, index) => !(index > 1) && <div key={index}>{index === 0 ? (val.length > 30 ? "To: " + val.slice(0, 30) + "..." : "To: " + val) : (val.length > 30 ? val.slice(0, 30) + "..." : val)}</div>)}</Text>
  //             <Text>{record._source && record._source.attachment_count > 0 && <Icon type="paper-clip" />}
  //               <span style={{ color: color.Dark, fontFamily: 'Segoe UI' }} dangerouslySetInnerHTML={{ __html: subject }}></span></Text>
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

  componentDidMount() {
    this.props.caseInfo && this.fetchOnHoldDocuments()
    !this.props.onHoldDatatablePageSize && this.props.updateDataTablePageSize(20, "onHoldDatatablePageSize")
  }

  fetchOnHoldDocuments = () => {
    const { caseInfo, onHoldDatatablePageSize } = this.props;
    let fromCount = 0
    let toCount = onHoldDatatablePageSize || 20
    let APIbody = { "caseId": caseInfo && +caseInfo.CASE_ID, "fromCount": fromCount, "toCount": toCount }
    this.setState({ APIbody })
    this.props.getOnholdDocuments(APIbody)
    this.props.onHoldApiBodyData(APIbody)

  };

  changeOnholdPage = (page, pageSize) => {
    const { caseInfo, hideOpenedEmail } = this.props;
    let fromCount = (page - 1) * pageSize
    let toCount = pageSize
    this.props.updateCurrentPage(page)
    this.props.clearOnholdDocuments();
    let APIbody = { "caseId": caseInfo && +caseInfo.CASE_ID, "fromCount": fromCount, "toCount": toCount }
    this.props.getOnholdDocuments(APIbody)
    this.props.onHoldApiBodyData(APIbody)
    hideOpenedEmail && hideOpenedEmail()
  }

  removeSelectedDocFromOnHold = () => {
    const { updatedSearchCriteria, caseInfo, onHoldDatatablePageSize, closeDrawer } = this.props;
    const { selectedOnHoldDocs } = this.state;
    if (selectedOnHoldDocs && selectedOnHoldDocs.length && caseInfo) {
      const APIbody = {
        "caseId": caseInfo && caseInfo.CASE_ID,
        "caseName": caseInfo && caseInfo.CASE_NAME,
        "siteName": caseInfo && caseInfo.SiteName,
        "filterType": selectedOnHoldDocs.map(docs => docs._index),
        "labelType": ["_doc"],
        "docIds": selectedOnHoldDocs.map(docs => docs._id),
        "searchType": "0"
      }
      this.props.removeSelectedFromOnHold(APIbody, caseInfo, updatedSearchCriteria, onHoldDatatablePageSize)
      this.props.closeReadingPane && this.props.closeReadingPane();
      this.props.updateCurrentPage(1)
      closeDrawer && closeDrawer('removeDocument')
      this.setState({
        selectedOnHoldDocs: []
      })
    }
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
    const { formatMessage, metadatAcive, openMetadata, closeMetadata, currentPage, removeDocument, closeDrawer, openReadingPane, disappearMark, closeReadingPane, readingPane, notOnRowClick, openedEmail, has_attachment, attachment, columnConfig, caseInfo } = this.props;
    const { selectedOnHoldDocs, /*caseNameDrawer, caseName, APIbody*/ } = this.state;
    return (
      <div style={{ display: "flex", width: "100%", height: "inherit", overflow: "hidden" }}>
        <RemoveDocument
          formatMessage={formatMessage}
          removeDocument={removeDocument}
          close={() => closeDrawer && closeDrawer('removeDocument')}
          selected={selectedOnHoldDocs}
          removeSelectedDocFromOnHold={() => this.removeSelectedDocFromOnHold()}
          removeAllDocFromOnHold={this.props.removeAllDocFromOnHold}
        />

        <LabelDrawer
          formatMessage={formatMessage}
          close={this.closeLabelDrawer}
          labelDrawer={this.state.labelDrawer}
          openedEmail={this.state.email}
          currentCaseId={caseInfo && caseInfo.CASE_ID}
          onHold='onHold'
        />

        <div id="dataTable" style={{ display: "flex", width: "100%", overflowY: "hidden", height: "inherit", flexDirection: "column" }}>
          <div style={{
            display: "flex",
            width: "100%",
            overflowY: "hidden",
          }}>
            <div style={{ height: "inherit", width: readingPane ? "45%" : "100%", overflowY: "hidden", flexDirection: 'row' }}>

              <DataTable
                closeColumConfigDrawer={this.props.closeColumConfigDrawer}
                columnConfig={columnConfig}
                formatMessage={formatMessage}
                keyID="_id"
                keyID_2="_index"
                getDataWithPagination={true}
                currentPage={currentPage}
                seperator="onHold"
                removeAllDocFromOnHold={this.props.removeAllDocFromOnHold}
                updateCurrentPage={(page, pageSize) => this.props.updateCurrentPage(page, pageSize)}
                pageChanged={this.changeOnholdPage}
                pageSize={this.props.onHoldDatatablePageSize}
                onPageSizeChange={
                  this.props.updateDatatablePageSize}
                totalData={this.props.onHoldDataLength}
                totalSelectedRows={selectedOnHoldDocs}
                getRowSelection={(selectedRows, selectedRowsKey) => this.props.getRowSelection(selectedRows, selectedRowsKey)}
                coveredHeight={240}
                disappearMark={currentNode => disappearMark && disappearMark(currentNode)}
                indicateRow
                onRowClick={email => openReadingPane && openReadingPane(email)}
                noDelete
                columns={this.columns}
                data={this.props.onHoldDocuments}
                needRowSelection notOnRowClick={() => notOnRowClick && notOnRowClick()}
                actionDropdown={true}
                separator='SearchArchive'
                actions={{
                  release: true,
                  export: true,
                  label: true
                }}
                openDrawer={drawer => this.props.openDrawer(drawer)}
                closeDrawer={drawer => this.props.closeDrawer(drawer)}
              />
            </div>

            {readingPane && < div style={{ width: "55%", overflowY: "auto", height: 'inherit', zIndex: 10 }}>
              <ReadingPane
                formatMessage={formatMessage}
                forwardAction
                openMetadata={() => openMetadata && openMetadata()}
                closeMetadata={() => closeMetadata && closeMetadata()}
                closeReadingPane={() => closeReadingPane && closeReadingPane()}
                metadatAcive={metadatAcive}
                openedEmail={openedEmail}
                has_attachment={has_attachment}
                attachment={attachment}
                onHold="onHold"
                legalHoldId={this.props.caseInfo && this.props.caseInfo.CASE_ID}
              />
            </div>
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    updatedSearchCriteria: state.UpdateSearchCriteriaReducer.updatedSearchCriteria,
    onHoldDocuments: state.LegalHoldsReducer.onHoldDocuments,
    onHoldDataLength: state.LegalHoldsReducer.onHoldDataLength,
    simpleSearch: state.SimpleSearchReducer.simpleSearch,
    legalHoldAutoLabels: state.AutoLabelingReducer.legalHoldAutoLabels,
    onHoldDatatablePageSize: state.UpdateDataTablePageSizeTypes.onHoldDatatablePageSize,
    selectedRowKeys: state.updateSelectedRecordsReducer.selectedRowKeys
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onHoldApiBodyData: apiData => dispatch(onHoldApiBodyData(apiData)),

    getOnholdDocuments: case_id => dispatch(getOnholdDocuments(case_id)),
    removeSelectedFromOnHold: (
      APIbody,
      case_info,
      updatedSearchCriteria,
      pageSize
    ) =>
      dispatch(
        removeSelectedFromOnHold(
          APIbody,
          case_info,
          updatedSearchCriteria,
          pageSize
        )
      ),
    removeAllFromOnHold: (
      APIbody,
      case_info,
      updatedSearchCriteria,
      pageSize
    ) =>
      dispatch(
        removeAllFromOnHold(APIbody, case_info, updatedSearchCriteria, pageSize)
      ),
    updateDataTablePageSize: (pageLabel, pageSize) =>
      dispatch(updateDataTablePageSize(pageLabel, pageSize)),
    clearOnholdDocuments: () => dispatch(clearOnholdDocuments()),
    getSimpleSearchAttachment: data => dispatch(getSimpleSearchAttachment(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OnHold);


// {/* <div>{(record._source.label_policy || []).map((el, ind) => {
//   const { legalHoldAutoLabels, simpleSearch } = this.props;
//   let policyData = legalHoldAutoLabels && legalHoldAutoLabels.length > 0 ? legalHoldAutoLabels : (simpleSearch && simpleSearch.LabelType && simpleSearch.LabelType.length > 0 ? simpleSearch.LabelType : [])
//   const policyId = el.split("-") && el.split("-")[0] && !isNaN(el.split("-")[0]) && Number(el.split("-")[0]);
//   const labelId = el.split("-") && el.split("-")[1] && !isNaN(el.split("-")[1]) && Number(el.split("-")[1]);
//   const caseId = el.split("-") && el.split("-")[2] && !isNaN(el.split("-")[2]) && Number(el.split("-")[2]);
//   let policy = String(policyId) && policyData && policyData && policyData.filter(policy => !isNaN(policy.FILTER_ID) && Number(policy.FILTER_ID) === policyId);
//   policy = policy && policy.length && policy[0];
//   let labelIndex = policy && policy.LABEL_ID && String(labelId) && policy.LABEL_ID.split(",") && policy.LABEL_ID.split(",").indexOf(String(labelId))
//   let labelName = policy && policy.LABEL_NAME && String(labelIndex) && policy.LABEL_NAME.split(",") && policy.LABEL_NAME.split(",")[labelIndex]
//   let labelType = policy && policy.FILTER_TYPE
//   let color = policy && policy.COLOR_CODE && policy.COLOR_CODE.split(",") && policy.COLOR_CODE.split(",")[0];
//   if (labelName && color && (labelType === "G" || (this.props.caseInfo.CASE_ID && String(this.props.caseInfo.CASE_ID) && caseId && String(caseId) && String(caseId) === String(this.props.caseInfo.CASE_ID)))) {
//     return (
//       <div key={ind} style={{ backgroundColor: `${color}`, ...styles.labelDropdownStyle }}>
//         <Icon type={labelType && labelType === "G" ? "global" : labelType && labelType === "L" && "folder"} style={{ ...styles.labelDropdownStyle }} />{labelName}
//       </div>
//     )
//   } else {
//     return null;
//   }
// })}</div> */}