import React, { Component } from 'react'
import style from "../../styles";
import { Breadcrumb, Typography, Icon } from "antd"
// import theme from "../../Assets/Theme/Theme";
import ColumConfigurationSideDrawer from "../../Components/CustomizeColumnDrawer/CustomizeColumDrawer";
import ApplyGlobalLabel from "../../Components/ApplyGlobalLabel/ApplyGlobalLabel"
import SaveSearch from "../../Components/SaveSearch/SaveSearch";
import GlobalLabel from "../../Components/GlobalLabel/GlobalLabel";
import ExportEmail from "../../Components/Export/Export";
import ReportEmail from "../../Components/Report/Report";
import DismissDrawer from "../../Components/Modal/DismissDrawer";
import { version } from "../../APIConfig/Config";
import { defineMessages } from 'react-intl';
import { connect } from "react-redux";
import { updateHistory } from "../../Redux/Actions/UpdateHistory/UpdateHistory";

const messages = defineMessages({
  'Total': {
    id: "GridViewPageHeader.Total",
    defaultMessage: "Total",
  },
  'Documents': {
    id: "GridViewPageHeader.Documents",
    defaultMessage: "Documents"
  },
  'Last Updated': {
    id: "GridViewPageHeader.LastUpdated",
    defaultMessage: "Last Updated"
  },
  'Save Search': {
    id: "GridViewPageHeader.SaveSearch",
    defaultMessage: "Save Search"
  },
  'Delete': {
    id: "GridViewPageHeader.Delete",
    defaultMessage: "Delete"
  },
  'Add New Case': {
    id: "GridViewPageHeader.AddNewCase",
    defaultMessage: "Add New Case"
  },
})
const { Text, Title } = Typography
// const { color } = theme


class GridViewPageHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {}

  }

  navigateToPage = pathname => {
    let customHistory = this.props.historyProp || this.props.customHistory
    this.props.updateHistory(customHistory, pathname)
  }

  itemRender = (route) => {
    return (
      <span style={{ color: "#446BA8" }}>
        <span style={{ color: "#446BA8", cursor: "pointer" }} onClick={() => this.navigateToPage(route.path)} >{route.breadCrums}</span>
      </span>
    )
  }

  render() {
    const { iconName, title, reportHeading, routes, openCustomizedColumn, closeDrawer, customizedColums, noReadingPane, openDrawer,
      navigateToSavedSearch, navigateToSearchArchive, customizeColumn, applyGlobalLabel, saveSearch, globalLabel, exportEmail, reportEmail, createLegalHold, onApplyGlobalLabel,
      formatMessage, searchCritearea, columData, onCase, selectedDocs, onHoldTab } = this.props
    return (
      <div style={{
        width: "inherit", height: 65, display: "flex", padding: "0 7px 0 30px",
        justifyContent: "space-between", alignItems: "center", backgroundColor: "#F5F7FA",
        MozBoxShadow: "4px 4px 8px -3px #777",
        WebkitBoxShadow: "`4px 4px 8px -3px #777",
        boxShadow: "4px 4px 8px -3px #777 ",
      }}>
        <div style={{ width: "53%", display: "flex", justifyContent: "space-between", alignItems: "center", }}>
          <div style={{ display: "flex" }}>
            <div style={{ ...style.pageHeaderDivContent }}>
              <img src={require(`../../Assets/icons/SV_ICONS/${iconName}.png`)} title={title} alt={title} width={35} height={35} />

              <ColumConfigurationSideDrawer
                formatMessage={formatMessage}
                openCustomizedColumn={openCustomizedColumn}
                close={() => closeDrawer && closeDrawer('customizedColum')} c
                ustomizedColums={customizedColums} customizeColumn={(val) => customizeColumn && customizeColumn(val)} />

              <ApplyGlobalLabel selectedDocs={selectedDocs} onCase={onCase && onCase.CASE_NAME} selected={this.props.selected} handleChangeCase={this.props.handleChangeCase} formatMessage={formatMessage} applyGlobalLabel={applyGlobalLabel} createLegalHold={createLegalHold} onApplyGlobalLabel={caseInfo => onApplyGlobalLabel && onApplyGlobalLabel(caseInfo)} applyLegalHoldToAllDocs={caseInfo => this.props.applyLegalHoldToAllDocs && this.props.applyLegalHoldToAllDocs(caseInfo)} openDrawer={(drawer, notCloseDrawer) => openDrawer(drawer, notCloseDrawer)} closeDrawer={drawer => closeDrawer(drawer)} close={() => closeDrawer && closeDrawer('applyGlobalLabel')} />

              <SaveSearch searchCritearea={searchCritearea} formatMessage={formatMessage} customizedColums={customizedColums} saveSearch={saveSearch} close={() => closeDrawer && closeDrawer('saveSearch')} />

              <GlobalLabel formatMessage={formatMessage} customizedColums={customizedColums} globalLabel={globalLabel} close={() => closeDrawer && closeDrawer('globalLabel')} />

              <ExportEmail selectedDocs={selectedDocs} onHoldTab={onHoldTab} legalhold={onCase} selected={this.props.selected} formatMessage={formatMessage} customizedColums={customizedColums} exportEmail={exportEmail} close={() => closeDrawer && closeDrawer('exportEmail')} />

              <ReportEmail reportHeading={reportHeading} formatMessage={formatMessage} reportEmail={reportEmail} customizedColums={customizedColums} columData={columData} customizeColumn={(val) => this.props.customizeColumn(val)} close={() => closeDrawer && closeDrawer('reportEmail')} />
              <DismissDrawer formatMessage={formatMessage} /*dismissDrawer={dismissDrawer}*/ close={() => closeDrawer('dismissDrawer')} />

            </div>
            <div>
              <Title style={{ ...style.pageHeaderTitle }}>{title}</Title>
              <Breadcrumb style={{ marginLeft: 20, padding: style.noPadding.padding }} itemRender={this.itemRender} routes={routes} separator={<Icon type="right" />} />
            </div>
          </div>
          {/* {emailSize && emailSize.totalEmails > 0 && <div>
            <Text style={{ paddingRight: 5, color: `${color.Blue}` }}>{formatMessage(messages["Total"])} {emailSize.totalEmails} {formatMessage(messages["Documents"])}</Text> */}
          {/* <Text style={{ paddingLeft: 5, color: `${color.Blue}`, borderLeft: `1px solid ${color.Blue}` }}>40 GB</Text> */}
          {/* </div>} */}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", }}>
          {this.props.helpScreen
            ?
            <div>
              <Text style={{ ...style.pageHeaderHelpText }}>{formatMessage(messages["Last Updated"])} September 31st, 2019</Text>
            </div>
            :
            <div style={{ display: 'flex', flexDirection: 'row' }}>


              {/* {this.props.actions && this.props.actions.saveSearch &&  <div title="Save Search" style={{ padding: "0 10px" }}> <img title="Save Search" alt='' style={{ ...style.cursorPointer }} width="32px" src={require('../../Assets/icons/SV_ICONS/SaveSearch_Orange.png')} onClick={() => openDrawer && openDrawer('saveSearch')} /></div>} */}



              {this.props.actions &&
                this.props.actions.delete &&
                <div title="Delete" style={{ padding: "0 10px" }}>
                  <img alt='' style={{ ...style.cursorPointer }}
                    width="32px" src={require('../../Assets/icons/SV_ICONS/Delete_Orange.png')} />
                </div>
              }

              {this.props.actions && this.props.actions.remove &&
                <div style={{ padding: "0 0px" }}>
                  <img
                    title="Release" alt='' style={{ ...style.cursorPointer }}
                    width="32px" src={require('../../Assets/icons/SV_ICONS/ReleaseLH_Orange.png')}
                    onClick={() => openDrawer && openDrawer('removeDocument')} />
                </div>}


              {this.props.actions && this.props.actions.add && <div title="Add New Case" style={{ padding: "0 10px" }} onClick={() => openDrawer && openDrawer('createLegalHold')}><img alt='' style={{ ...style.cursorPointer }} width="32px" src={require('../../Assets/icons/SV_ICONS/Add_Orange.png')} /></div>}

              {this.props.actions && this.props.actions.label && version > 7.1 && <div style={{ padding: "0 10px" }}><img title="Apply Label" alt='' style={{ ...style.cursorPointer }} width="32px" src={require('../../Assets/icons/SV_ICONS/Label_Orange.png')} onClick={() => openDrawer && openDrawer('globalLabel')} /></div>}


              {this.props.actions && this.props.actions.lock && <div style={{ padding: "0 10px" }}><img title="Apply Legal Hold" alt='' style={{ ...style.cursorPointer }} width="32px" src={require('../../Assets/icons/SV_ICONS/LegalHold_Orange.png')} onClick={() => openDrawer && openDrawer('applyGlobalLabel')} /></div>}

              {this.props.actions && this.props.actions.export && <div style={{ padding: "0 10px", marginRight: version < 7.2 ? 10 : 0 }}><img title="Export" alt='' style={{ ...style.cursorPointer }} width="32px" src={require('../../Assets/icons/SV_ICONS/Export_Orange.png')} onClick={() => openDrawer && openDrawer('exportEmail')} /></div>}


              {this.props.actions && this.props.actions.release && <div style={{ padding: "0 0px" }}><img title="Release" alt='' style={{ ...style.cursorPointer }} width="32px" src={require('../../Assets/icons/SV_ICONS/ReleaseLH_Orange.png')} onClick={() => openDrawer && openDrawer('legalHoldReleases')} /></div>}

              {this.props.actions && this.props.actions.active && <div style={{ padding: "0 0px" }}><img title="Active" alt='' style={{ ...style.cursorPointer }} width="32px" src={require('../../Assets/icons/SV_ICONS/LegalHold_Orange.png')} onClick={() => openDrawer && openDrawer('activeLegalHold')} /></div>}

              {version > 7.2 && <div style={{ padding: "0 10px" }} onClick={() => openDrawer && openDrawer('reportEmail')}><img alt='' title="Report" style={{ ...style.cursorPointer }} width="32px" src={require('../../Assets/icons/SV_ICONS/Report_Orange.png')} /></div>}
              {!noReadingPane && <div style={{ padding: "0 10px 0 10px" }}>
                {this.props.actions && this.props.actions.saveSearch && !this.props.actions.noSavedSearches && <img title="Saved Searches" alt='' style={{ borderLeft: "1px solid grey", cursor: "pointer", marginRight: 17, marginLeft: -10, paddingLeft: 10 }} height="32px" src={require('../../Assets/icons/SV_ICONS/SaveSearch_Blue.png')} onClick={() => navigateToSavedSearch && navigateToSavedSearch()} />}
                
                {this.props.actions && this.props.actions.savedSearches && !this.props.actions.noSavedSearches && <img title="Saved Searches" alt='' style={{ ...style.cursorPointer }} height="32px" src={require('../../Assets/icons/SV_ICONS/Search_Blue.png')} onClick={() => navigateToSearchArchive && navigateToSearchArchive()} />}
              </div>}
              {noReadingPane && this.props.actions && this.props.actions.savedSearches && !this.props.actions.noSavedSearches && <div style={{ padding: "0 10px 0 10px", display: "flex" }}>
                <img title="Back To Search Archive" alt='' style={{ cursor: "pointer", marginRight: 15 }} height="32px" src={require('../../Assets/icons/SV_ICONS/Search_Blue.png')} onClick={() => navigateToSearchArchive && navigateToSearchArchive()} />
              </div>
              }
            </div>}
        </div>
      </div>
    )
  }
};

const mapStateToProps = state => {
  return {
    customHistory: state.MoveToTemplateReducer.customHistory
  }
};

const mapDispatchToProps = dispatch => {
  return {
    updateHistory: (history, pathname) => dispatch(updateHistory(history, pathname)),
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(GridViewPageHeader);
