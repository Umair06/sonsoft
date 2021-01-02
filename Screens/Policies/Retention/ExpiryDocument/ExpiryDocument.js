import React, { Component, Fragment } from 'react';
import DataTable from "../../../../Components/DataTable/DataTable";
import ReadingPane from "../../../../Components/ReadingPane/ReadingPane";
import theme from "../../../../Assets/Theme/Theme";
import { Typography, Icon, message } from "antd";
import { defineMessages } from 'react-intl';
// import DataTableHeader from "../../../../Components/DataTable/Component/DataTableHeader"


const { color } = theme;

const messages = defineMessages({
  'Policy Name': {
    id: "expiryDocument.policyName",
    defaultMessage: "Policy Name",
  },
  'Information': {
    id: "expiryDocument.information",
    defaultMessage: "Information",
  },
})

const { Text } = Typography;
const policyColumns = [
  {
    title: 'Policy Name',
    dataIndex: 'FILTER_NAME',
    render: FILTER_NAME => <span style={{ wordBreak: "break-all" }} >{FILTER_NAME}</span>,
  },
];
const policyDataColumns = [
  {
    title: 'Information',
    render: record => {
      // var recordDate = record._source && record._source.header && record._source.header.date ? moment(new Date(record._source.header.date)).format('DD-MMM-YYYY') : ""
      return (

        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ display: 'flex', flexDirection: 'column', width: 250 }}>
            <Text >{record._source && record._source.from.map((val, index) => !(index > 1) && <Text key={index} style={{ color: `${color.Black75}` }}>{val.slice(0, 30)}</Text>)}</Text>
            <Text>To: {record._source && record._source.to.map((val, index) => !(index > 1) && <Fragment key={index}><Text key={index}>{val.slice(0, 30)}</Text>,<br /></Fragment>)}</Text>
            <Text>{record.attachment && <Icon type="paper-clip" />} {record._source.subject.slice(0, 30)}</Text>
          </div>
          {/* <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: 80 }}>{recordDate}</div> */}
        </div>
      )
    },
    disabled: true
  },
];

class ExpiryDocument extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // policyData: defaultPolicyData
    }
    message.destroy()
  }
  selectPolicy = rec => {
    this.setState({
      // policyData: policiesData[rec.policyName],
      openedEmail: undefined
    })
  }
  openReadingPane = email => {
    this.setState({
      readingPane: true,
      openedEmail: email
    })
  }
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

  render() {
    const { metadatAcive, openedEmail, columnConfig, deleteRecord, deleteDrawer } = this.state;

    const { formatMessage } = this.props;
    const messagesKeys = Object.keys(messages);
    const messagesValues = Object.values(messages);
    policyColumns.forEach((pc) => {
      messagesKeys.forEach((mK, index) => {
        if (pc.key === mK) {
          pc.title = formatMessage(messagesValues[index]);
        }
      })
    })

    policyDataColumns.forEach((pdc) => {
      messagesKeys.forEach((mK, index) => {
        if (pdc.key === mK) {
          pdc.title = formatMessage(messagesValues[index]);
        }
      })
    })

    return (
      <div style={{ display: "flex", width: "100%", overflow: "hidden" }}>
        <div style={{ width: "40%" }}>
          <DataTable openDeleteDrawer={(record) => this.openDeleteDrawer(record)}
            deleteRecord={deleteRecord}
            deleteDrawer={deleteDrawer}
            closeDeleteDrawer={() => this.closeDeleteDrawer()}
            closeColumConfigDrawer={() => this.closeColumConfigDrawer()}
            columnConfig={columnConfig}
            formatMessage={formatMessage} height={"50vh"} columns={policyColumns} data={this.props.policyData} onRowClick={rec => this.selectPolicy(rec)} noCustomizeColumn={true} actions={{ syncStatus: false, status: false, archivePublicFolder: false, stubEnable: false, stubPeriod: false, enabled: false, activate: false }} />
        </div>
        {/* <div style={{ width: "30%" }}>
          <DataTableHeader
            openDeleteDrawer={(record) => this.openDeleteDrawer(record)}
            openColumConfigDrawer={() => this.openColumConfigDrawer()}
            formatMessage={formatMessage} height="50vh" columns={policyDataColumns} data={[]} onRowClick={email => this.openReadingPane(email)} noCustomizeColumn={true} actions={{ syncStatus: false, status: false, archivePublicFolder: false, stubEnable: false, stubPeriod: false, enabled: false, activate: false }}
          />
          <DataTable
            deleteRecord={deleteRecord}
            deleteDrawer={deleteDrawer}
            closeDeleteDrawer={() => this.closeDeleteDrawer()}
            closeColumConfigDrawer={() => this.closeColumConfigDrawer()}
            columnConfig={columnConfig}
            formatMessage={formatMessage} height="50vh" columns={policyDataColumns} data={[]} onRowClick={email => this.openReadingPane(email)} noCustomizeColumn={true} actions={{ syncStatus: false, status: false, archivePublicFolder: false, stubEnable: false, stubPeriod: false, enabled: false, activate: false }} />
        </div> */}
        <div style={{ display: "flex", width: "60%", overflow: "auto", height: "60vh" }}>
          <ReadingPane noFixed formatMessage={formatMessage} openMetadata={() => this.openMetadata()} closeMetadata={() => this.closeMetadata()}
            metadatAcive={metadatAcive} openedEmail={openedEmail} />
        </div>
      </div>
    )
  }
};

export default ExpiryDocument;
