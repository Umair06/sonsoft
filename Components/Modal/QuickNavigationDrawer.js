import React, { Component } from "react";
import { Drawer, Typography } from "antd";
// import { SecondryButton } from "../Button/Button"
import Theme from "../../Assets/Theme/Theme";
// import ConfigurationManagement_Blue from "../../Assets/icons/SV_ICONS/Configuration Management_Blue.png";
// import MyArchivedEmails_Blue from "../../Assets/icons/SV_ICONS/My Archived Emails_Blue.png";
// import SearchArchive_Blue from "../../Assets/icons/SV_ICONS/Search Archive_Blue.png";
// import AccesContril_Blue from "../../Assets/icons/SV_ICONS/Acces Contril_Blue.png";
// import Exports_Blue from "../../Assets/icons/SV_ICONS/Exports_Blue.png";
// import Policies_Blue from "../../Assets/icons/SV_ICONS/Policies_Blue.png";
import Apps_DBlue from "../../Assets/icons/SV_ICONS/Apps_DBlue.png";
// import StubPolicy_Blue from "../../Assets/icons/SV_ICONS/Stub Policy_Blue.png";
import Clear_Gray from "../../Assets/icons/SV_ICONS/Clear_Gray.png";
import style from "../../styles";
import { connect } from "react-redux";
import {
  clearSearchedResults,
  totalSimpeSearchedDocs,
  postSearchData
} from "../../Redux/Actions/SimpleSearchAction/SimpleSearchAction";
import { updateSearchCriteria } from "../../Redux/Actions/UpdateSearchCriteriaAction/UpdateSearchCriteriaAction";
import { defineMessages } from "react-intl";
// import { version } from "../../APIConfig/Config";

const messages = defineMessages({
  "Quick Navigation": {
    id: "QuickNavigationDrawer.Quick Navigation",
    defaultMessage: "Quick Navigation"
  },
  "CONTROL CENTER": {
    id: "QuickNavigationDrawer.controlCenterCard",
    defaultMessage: "CONTROL CENTER"
  },
  "MY ARCHIVED EMAIL": {
    id: "QuickNavigationDrawer.myArchivedEmailCard",
    defaultMessage: "MY ARCHIVED EMAIL"
  },
  "SEARCH ARCHIVE": {
    id: "QuickNavigationDrawer.searchArchiveCard",
    defaultMessage: "SEARCH ARCHIVE"
  },
  "LEGAL HOLDS": {
    id: "QuickNavigationDrawer.legalHoldsCard",
    defaultMessage: "LEGAL HOLDS"
  },
  EXPORTS: {
    id: "QuickNavigationDrawer.exportsCard",
    defaultMessage: "EXPORTS"
  },
  POLICIES: {
    id: "QuickNavigationDrawer.policiesCard",
    defaultMessage: "POLICIES"
  },
  SCHEDULER: {
    id: "QuickNavigationDrawer.schedulerCard",
    defaultMessage: "SCHEDULER"
  },
  "CONTENT IDENTIFICATION": {
    id: "QuickNavigationDrawer.contentidentificationCard",
    defaultMessage: "CONTENT IDENTIFICATION"
  },
});

const { color } = Theme;
const { Title, Paragraph } = Typography;

class QuickNavigationDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  pagesOnClickHandler = (pageName, children, clearResults) => {
    this.props.MoveToTemplate(pageName, children);
    if (clearResults) {
      this.props.clearSearchedResults();
      this.props.totalSimpeSearchedDocs(null);
      this.props.postSearchData({}, true);
      this.props.updateSearchCriteria({});
    }
    this.props.close();
  };

  render() {
    const { formatMessage, currentUserRole } = this.props;
    return (
      <Drawer
        style={{ marginTop: "61px", padding: "0px 24px", overflow: "auto" }}
        bodyStyle={{ height: "calc(100vh - 61px)", overflowY: "auto" }}
        maskStyle={{ backgroundColor: "transparent" }}
        width={400}
        onClose={() => this.props.close()}
        closable={false}
        visible={this.props.menuDrawer}
      >
        <div
          style={{
            padding: "0px 10px",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <div style={{ ...style.setting.drawerMain }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                title="Quick Navigation"
                src={Apps_DBlue}
                width="45px"
                style={{ ...style.cursorPointer }}
                alt=""
              />
              <Title
                style={{
                  color: color.Blue,
                  paddingBottom: 10,
                  padding: "15px 0 0 18px",
                  fontSize: 24
                }}
                level={2}
              >
                {formatMessage(messages["Quick Navigation"])}
              </Title>
            </div>
            <div
              onClick={() => this.props.close()}
              style={{ paddingTop: 10, cursor: "pointer" }}
            >
              <img
                src={Clear_Gray}
                title="Close"
                alt=""
                onClick={() => this.props.close()}
                width={28}
                height={28}
              />
            </div>
          </div>
          <div style={{ width: 350, backgroundColor: "#fff" }}>
            {/* Here is the DropDown Data start */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                flexDirection: "column",
                padding: 10
              }}
            >
              {currentUserRole
                ? currentUserRole &&
                currentUserRole.tiles &&
                currentUserRole.tiles.map(
                  ({ cardTitle, children, iconName }, index) => {
                    return (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          cursor: "pointer",
                          marginTop: 8
                        }}
                        onClick={() =>
                          this.pagesOnClickHandler(cardTitle, children)
                        }
                      >
                        <img
                          src={require(`../../Assets/icons/SV_ICONS/${iconName}.png`)}
                          height="35px"
                          style={{ ...style.cursorPointer }}
                          alt="WhatNew"
                        />

                        <Paragraph
                          style={{
                            marginLeft: 20,
                            padding: 5,
                            color: color.Orange,
                            alignSelf: "center",
                            cursor: "pointer",
                            fontSize: '16px'
                          }}
                        >
                          {cardTitle}
                        </Paragraph>
                      </div>
                    );
                  }
                )
                : null}

              {/* <div style={{ display: "flex", cursor: "pointer" }} onClick={() => this.pagesOnClickHandler(formatMessage(messages["MY ARCHIVED EMAIL"]), "")}>
                                <img src={MyArchivedEmails_Blue} height="35px" style={{ ...style.cursorPointer }} alt="my archived" />
                                <Paragraph style={{ marginLeft: 20, padding: 5, color: color.Orange }}>{formatMessage(messages["MY ARCHIVED EMAIL"])}</Paragraph>
                            </div>
                            <br />
                            <div style={{ display: "flex", cursor: "pointer" }} onClick={() => this.pagesOnClickHandler(formatMessage(messages["SEARCH ARCHIVE"]), "", true)}>
                                <img src={SearchArchive_Blue} height="35px" style={{ ...style.cursorPointer }} alt="search" />
                                <Paragraph style={{ marginLeft: 20, padding: 5, color: color.Orange }}>{formatMessage(messages["SEARCH ARCHIVE"])}</Paragraph>
                            </div>
                            <br />
                            <div style={{ display: "flex", cursor: "pointer" }} onClick={() => this.pagesOnClickHandler(formatMessage(messages["LEGAL HOLDS"]), "", true)}>
                                <img src={AccesContril_Blue} height="35px" style={{ ...style.cursorPointer }} alt="legal" />
                                <Paragraph style={{ marginLeft: 20, padding: 5, color: color.Orange }}>{formatMessage(messages["LEGAL HOLDS"])}</Paragraph>
                            </div>
                            <br />
                            <div style={{ display: "flex", cursor: "pointer" }} onClick={() => this.pagesOnClickHandler(formatMessage(messages.EXPORTS), "/tasks")}>
                                <img src={Exports_Blue} height="35px" style={{ ...style.cursorPointer }} alt="exports" />
                                <Paragraph style={{ marginLeft: 20, padding: 5, color: color.Orange }}>{formatMessage(messages.EXPORTS)}</Paragraph>
                            </div>
                            <br />
                            <div style={{ display: "flex", cursor: "pointer" }} onClick={() => this.pagesOnClickHandler(formatMessage(messages.POLICIES), "")}>
                                <img src={Policies_Blue} height="35px" style={{ ...style.cursorPointer }} alt="policies" />
                                <Paragraph style={{ marginLeft: 20, padding: 5, color: color.Orange }}>{formatMessage(messages.POLICIES)}</Paragraph>
                            </div>
                            <br />
                            {version > 7.0 && <div style={{ display: "flex", cursor: "pointer" }} onClick={() => this.pagesOnClickHandler(formatMessage(messages.SCHEDULER), "/systemtasks")}>
                                <img src={StubPolicy_Blue} height="35px" style={{ ...style.cursorPointer }} alt="scheduler" />
                                <Paragraph style={{ marginLeft: 20, padding: 5, color: color.Orange }}>{formatMessage(messages.SCHEDULER)}</Paragraph>
                            </div>}
                            <br /> */}
            </div>
          </div>
        </div>
      </Drawer>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // moveToTemplate: (history, cardTitle, children) => dispatch(moveToTemplate(history, cardTitle, children)),
    clearSearchedResults: () => dispatch(clearSearchedResults()),
    totalSimpeSearchedDocs: searchedDataLength =>
      dispatch(totalSimpeSearchedDocs(searchedDataLength)),
    postSearchData: (data, cancelRequest) =>
      dispatch(postSearchData(data, cancelRequest)),
    updateSearchCriteria: (searchedData, searchType) =>
      dispatch(updateSearchCriteria(searchedData, searchType))
  };
};

const mapStateToProps = state => {
  return {
    authenticUserInfo: state.LoginReducer.authenticUserInfo,
    currentUserRole: state.RouteRolesReducer.currentUserRole
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuickNavigationDrawer);
