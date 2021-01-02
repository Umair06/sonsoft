import React, { Component } from 'react';
import Template from "../../Container/Template/Template";
import ArchivedEmail from "./ArchivalEmail/ArchivalEmail";
import ArchivalUserList from "./ArchivalUserList/ArchivalUserList";
import AccessControl from "./AccessControl/AccessControl";
import ArchiveStoreStatistics from "./ArchiveStoreStatistic/ArchiveStoreStatistic";
import Attachment from "./Attachment/Attachment";
import AttachmentTypeStatistic from "./AttachmentTypeStatistic/AttachmentTypeStatistic";
import ChainOfCustody from "./ChainOfCustody/ChainOfCustody";
import Compliance from "./Compliance/Compliance";
import ConfigurationManagement from "./ConfigurationManagement/ConfigurationManagement";
import DataInformationAndLeakagePrevention from "./DataInformationAndLeakage/DataInformationAndLeakage";
import EmailStatistics from "./EmailStatistic/EmailStatistic";
import JournalEmailStatistic from "./JournalEamilStatistic/JournalEmailStatistic";
import NonQualifiedEmail from "./NonQualifiedEmail/NonQualifiedEmail";
import PurgePolicy from "./PurgePolicy/PurgePolicy";
import RetentionPolicy from "./RetentionPolicy/RetentionPolicy";
import ReviewManagement from "./ReviewManagement/ReviewManagement";
import SearchAudit from "./SearchAudit/SearchAudit";
import TamperedMessage from "./TamperedMessage/TamperedMessage";


class Reporting extends Component {

  routes = [
    {
      path: '/homescreen',
      // exact:true,
      breadCrums: "Home",
      redirect: '/homescreen'
    },
    {
      path: "/reports",
      breadCrums: "Reports",
      redirect: '/reports/archivedemails'
    },
    {
      path: "/reports/archivedemails",
      breadCrums: "Archived Emails",
      iconName: "Archive Email",
      redirect: "/reports/archivedemails",
      main: () => <ArchivedEmail formatMessage={this.props.formatMessage} />
    },
    {
      path: "/reports/emailstatistic",
      breadCrums: "Email Statistics",
      iconName: "Email Statistics",
      redirect: "/reports/emailstatistic",
      main: () => <EmailStatistics formatMessage={this.props.formatMessage} />
    },
    {
      path: "/reports/archivestorestatistic",
      breadCrums: "Archive Store Statistics",
      iconName: "Archival Store",
      redirect: "/reports/archivestorestatistic",
      main: () => <ArchiveStoreStatistics formatMessage={this.props.formatMessage} />
    },
    {
      path: "/reports/attachment",
      breadCrums: "Attachment",
      iconName: "Attachment",
      redirect: "/reports/attachment",
      main: () => <Attachment formatMessage={this.props.formatMessage} />
    },
    {
      path: "/reports/compliance",
      breadCrums: "Compliance",
      iconName: "Compliance",
      redirect: "/reports/compliance",
      main: () => <Compliance formatMessage={this.props.formatMessage} />
    },
    {
      path: "/reports/accesscontrol",
      breadCrums: "Access Control",
      iconName: "Access Control",
      redirect: "/reports/accesscontrol",
      main: () => <AccessControl formatMessage={this.props.formatMessage} />
    },
    {
      path: "/reports/configurationmanagement",
      breadCrums: "Configuration Management",
      iconName: "Configuration Management",
      redirect: "/reports/configurationmanagement",
      main: () => <ConfigurationManagement formatMessage={this.props.formatMessage} />
    },
    {
      path: "/reports/datainformationandleakageprevention",
      breadCrums: "Data Information And Leakage Prevention",
      iconName: "Data Information and leakage",
      redirect: "/reports/datainformationandleakageprevention",
      main: () => <DataInformationAndLeakagePrevention formatMessage={this.props.formatMessage} />
    },
    {
      path: "/reports/purgepolicy",
      breadCrums: "Purge Policy",
      iconName: "Purge Policy",
      redirect: "/reports/purgepolicy",
      main: () => <PurgePolicy formatMessage={this.props.formatMessage} />
    },
    {
      path: "/reports/retentionpolicy",
      breadCrums: "Retention Policy",
      iconName: "Retention Policy",
      redirect: "/reports/retentionpolicy",
      main: () => <RetentionPolicy formatMessage={this.props.formatMessage} />
    },
    {
      path: "/reports/nonqualifiedemail",
      breadCrums: "Non-Qualified Email",
      iconName: "Non qualified Emails",
      redirect: "/reports/nonqualifiedemail",
      main: () => <NonQualifiedEmail formatMessage={this.props.formatMessage} />
    },
    {
      path: "/reports/archivaluserlist",
      breadCrums: "Archival User List",
      iconName: "Archival User List",
      redirect: "/reports/archivaluserlist",
      main: () => <ArchivalUserList formatMessage={this.props.formatMessage} />
    },
    {
      path: "/reports/journalemailstatistic",
      breadCrums: "Journal Email Statistic",
      iconName: "General Email Statistics",
      redirect: "/reports/journalemailstatistic",
      main: () => <JournalEmailStatistic formatMessage={this.props.formatMessage} />
    },
    {
      path: "/reports/attachmenttypestatistic",
      breadCrums: "Attachment Type Statistic",
      iconName: "Attachment Type",
      redirect: "/reports/attachmenttypestatistic",
      main: () => <AttachmentTypeStatistic formatMessage={this.props.formatMessage} />
    },
    {
      path: "/reports/tamperedmessage",
      breadCrums: "Tampered Message",
      iconName: "Tempered Messages",
      redirect: "/reports/tamperedmessage",
      main: () => <TamperedMessage formatMessage={this.props.formatMessage} />
    },
    {
      path: "/reports/searchaudit",
      breadCrums: "Search Audit",
      iconName: "Search Audit",
      redirect: "/reports/searchaudit",
      main: () => <SearchAudit formatMessage={this.props.formatMessage} />
    },
    {
      path: "/reports/reviewmanagement",
      breadCrums: "Review Management",
      iconName: "Review Management",
      redirect: "/reports/reviewmanagement",
      main: () => <ReviewManagement formatMessage={this.props.formatMessage} />
    },
    {
      path: "/reports/chainofcustody",
      breadCrums: "Chain Of Custody",
      iconName: "Chain of Custody",
      redirect: "/reports/chainofcustody",
      main: () => <ChainOfCustody formatMessage={this.props.formatMessage} />
    },
  ]

  render() {
    return (
      <Template formatMessage={this.props.formatMessage} routes={this.routes} iconName="Configuration Management_Blue" /*heading="Reports"*/ imageFlag={true} />
    )
  }
};

export default Reporting;

