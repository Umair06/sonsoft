import React, { Component } from 'react';
import { Typography, Icon, Button, Dropdown, Col, Row, Divider, Menu } from 'antd';
//import Theme from "../../Assets/Theme/Theme";
import { defineMessages } from 'react-intl';
import style from '../../../styles.js'
import DeleteOrange from "../../../Assets/icons/SV_ICONS/Delete_Orange.png";
import { resetSelectedRecords, updateSelectedRecords } from "../../../Redux/Actions/updateSelectedRecordsAction/updateSelectedRecordsAction";
import { connect } from "react-redux";
import { version } from '../../../APIConfig/Config';




// const { Option } = Select
//const { color } = Theme
const { Text } = Typography
const pageSizeHolder = ['20', '30', '40', '50', '75', '100'];
const messages = defineMessages({
  'Sync Status': {
    id: "DataTable.SyncStatus",
    defaultMessage: "Sync Status",
  },
  'Enable': {
    id: "DataTable.Enable",
    defaultMessage: "Enable"
  },
  'Disable': {
    id: "DataTable.Disable",
    defaultMessage: "Disable"
  },
  'Archive Public Folder': {
    id: "DataTable.ArchivePublicFolder",
    defaultMessage: "Archive Public Folder"
  },
  'Stub Enable': {
    id: "DataTable.StubEnable",
    defaultMessage: "Stub Enable"
  },
  'Stub Period': {
    id: "DataTable.StubPeriod",
    defaultMessage: "Stub Period"
  },
  'Enabled': {
    id: "DataTable.Enabled",
    defaultMessage: "Enabled"
  },
  'Activate': {
    id: "DataTable.Activate",
    defaultMessage: "Activate",
  },
  'Priority': {
    id: "DataTable.Priority",
    defaultMessage: "Priority"
  },
  'Dismiss': {
    id: "DataTable.Dismiss",
    defaultMessage: "Dismiss"
  },
  'Delete': {
    id: "DataTable.Delete",
    defaultMessage: "Delete"
  },
  'Edit': {
    id: "DataTable.Edit",
    defaultMessage: "Edit"
  },
  'EditORDelete': {
    id: "DataTable.EditORDelete",
    defaultMessage: "Edit/Delete"
  },
  'No Emails, Please select a criteria': {
    id: "DataTable.NoEmailsPleaseSelectCriteria",
    defaultMessage: "“Please perform NEW SEARCH to see data.”"
  },
  'Actions': {
    id: "DataTable.Actions",
    defaultMessage: "Actions"
  },
  'Reset': {
    id: "DataTable.Reset",
    defaultMessage: "Reset"
  },
  'Row Selected': {
    id: "DataTable.RowSelected",
    defaultMessage: "Row Selected"
  },
  'Rows Selected': {
    id: "DataTable.RowsSelected",
    defaultMessage: "Rows Selected"
  },
  'Column Configuration': {
    id: "DataTable.ColumnConfiguration",
    defaultMessage: "Column Configuration"
  },
  'Refresh': {
    id: "DataTable.Refresh",
    defaultMessage: "Refresh"
  },
  'Loading': {
    id: "DataTable.Loading",
    defaultMessage: "Loading..."
  },
  'No Recods Found': {
    id: "DataTable.NoRecodsFound",
    defaultMessage: "No Recods Found"
  },
})

class DataTableHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pageSize: pageSizeHolder[0],
      currentPage: 1

    };
  }
  static getDerivedStateFromProps(props, state) {
    let selectedRows = [];

    if (props.selectedRowKeys && Array.isArray(props.selectedRowKeys) && props.selectedRowKeys.length && props.data && Array.isArray(props.data) && props.data.length) {
      props.data.forEach(record => {
        if (props.selectedRowKeys.includes(record.key)) {
          selectedRows.push(record)
        }
      })
    } else if (!props.selectedRowKeys || (Array.isArray(props.selectedRowKeys) && !props.selectedRowKeys.length)) {
      selectedRows = [];
    }

    return {
      selectedRows
    };
  }

  openDrawerAndHandleLabels = (applyOrRemove) => {
    this.props.openDrawer('globalLabel')
    this.props.toggleApplyAndRemoveLabel(applyOrRemove)
  }

  menuForActions = () => {
    try {
      const { formatMessage, openDrawer, changeStatus, /*stubStatus, Delete, openReleaseDrawer,*/ openActiveLegalHoldDrawer, openDismissDrawer } = this.props;

      const { selectedRows } = this.state;

      return (

        <Menu>
          {this.props.actions && this.props.actions.remove &&
            <Menu.Item key="0"
              style={{ display: "flex", alignItems: "center" }}
              onClick={() => this.props.removeSelectedDocFromOnHold &&
                this.props.removeSelectedDocFromOnHold()} >
              {/* <Icon type="delete" /> */}
              <img src={DeleteOrange} alt="" width={20} title={formatMessage(messages["Delete"])} style={{ cursor: "pointer" }} />&nbsp;&nbsp;
              <Text>Remove</Text>
            </Menu.Item>}

          {/* SearchArchive */}

          {
            this.props.actions && this.props.actions.lock &&
            <Menu.Item key="1"
              style={{ display: "flex", alignItems: "center" }}
              onClick={() => this.props.openDrawer('applyGlobalLabel')}>
              <img
                title="Apply Legal Hold" alt=''
                style={{ ...style.cursorPointer }}
                width="20px"
                src={require('../../../Assets/icons/SV_ICONS/LegalHold_Orange.png')} />&nbsp;&nbsp;
              <Text>Apply Legal Hold</Text>
            </Menu.Item>}


          {this.props.actions && this.props.actions.export &&
            < Menu.Item
              key="2"
              style={{ display: "flex", alignItems: "center" }}
              onClick={() => this.props.openDrawer('exportEmail')}>
              <img
                title="Export"
                alt=''
                style={{ ...style.cursorPointer }}
                width="20px"
                src={require('../../../Assets/icons/SV_ICONS/Export_Orange.png')} />&nbsp;&nbsp;
              <Text>Export</Text>
            </Menu.Item>}

          {
            version > 7.2 && (
              this.props.actions && this.props.actions.report &&
              <Menu.Item
                key="3"
                style={{ display: "flex", alignItems: "center" }}
                onClick={() => this.props.openDrawer('reportEmail')}>
                <img
                  title="Report" alt=''
                  style={{ ...style.cursorPointer }}
                  width="20px"
                  src={require('../../../Assets/icons/SV_ICONS/Report_Orange.png')} />&nbsp;&nbsp;
              <Text>Report</Text>
              </Menu.Item>
            )
          }


          {this.props.actions && this.props.actions.tag &&
            <Menu.Item
              key="4"
              style={{ display: "flex", alignItems: "center" }}
              onClick={() => this.props.openDrawer('reportEmail')}>
              <img
                title="Report" alt=''
                style={{ ...style.cursorPointer }}
                width="20px"
                src={require('../../../Assets/icons/SV_ICONS/Report_Orange.png')} />&nbsp;&nbsp;
              <Text> </Text>
            </Menu.Item>
          }

          {
            this.props.actions && this.props.actions.applyLabel &&
            <Menu.Item
              key="0"
              style={{ display: "flex", alignItems: "center" }}
              onClick={() => this.openDrawerAndHandleLabels('apply')}>
              <img
                title="Apply Label" alt=''
                style={{ ...style.cursorPointer }}
                width="20px"
                src={require('../../../Assets/icons/SV_ICONS/Label_Orange.png')} />&nbsp;&nbsp;
              <Text>Apply Label</Text>
            </Menu.Item>
          }
          {
            this.props.actions && this.props.actions.removeLabel &&
            <Menu.Item
              key="5"
              style={{ display: "flex", alignItems: "center" }}
              onClick={() => this.openDrawerAndHandleLabels('remove')}>
              <img
                title="Apply Label" alt=''
                style={{ ...style.cursorPointer }}
                width="20px"
                src={require('../../../Assets/icons/SV_ICONS/Label_Orange.png')} />&nbsp;&nbsp;
              <Text>Remove Label</Text>
            </Menu.Item>
          }
          {/* SearchArchive */}
          {
            this.props.actions && this.props.actions.removeAll &&
            <Menu.Item key="6"
              style={{ display: "flex", alignItems: "center" }}
              onClick={() => this.props.removeAllDocFromOnHold &&
                this.props.removeAllDocFromOnHold()}>
              {/* <Icon type="delete" /> */}
              <img src={DeleteOrange} alt="" width={20} title={formatMessage(messages["Delete"])} style={{ cursor: "pointer" }} />&nbsp;&nbsp;
              <Text>Remove All</Text>
            </Menu.Item>
          }
          {
            this.props.actions &&
            this.props.actions.syncStatus &&
            <Menu.Item key="7"
              style={{ ...style.setting.drawerIconTitleWrapper }}>
              <Icon type="check" />&nbsp;&nbsp;
              <Text>{formatMessage(messages["Sync Status"])}</Text>
            </Menu.Item>
          }

          {
            this.props.actions &&
            this.props.actions.release &&
            <Menu.Item key="8"
              style={{ ...style.setting.drawerIconTitleWrapper }}
              onClick={() => openDrawer && openDrawer('removeDocument')}>
              <img title="Release legal hold"
                style={{ paddingRight: 5 }}
                alt='Release legal hold' width={20}
                src={require('../../../Assets/icons/SV_ICONS/release_legal_hold.png')} />&nbsp;&nbsp;
              <Text>Release</Text>
            </Menu.Item>
          }

          {
            this.props.actions && this.props.actions.active &&
            <Menu.Item key="9"
              style={{ ...style.setting.drawerIconTitleWrapper }}
              onClick={() => openActiveLegalHoldDrawer &&
                openActiveLegalHoldDrawer("legalHoldReleases", selectedRows)}>
              <img title="Release legal hold"
                style={{ paddingRight: 5 }}
                alt='Release legal hold' width={20}
                src={require('../../../Assets/icons/SV_ICONS/release_legal_hold.png')} />&nbsp;&nbsp;
              <Text>Active</Text>
            </Menu.Item>
          }

          {
            this.props.actions && this.props.actions.syncStatus &&
            <Menu.Item key="10"
              style={{ ...style.setting.drawerIconTitleWrapper }}>
              <Icon type="close" />&nbsp;&nbsp;
              <Text >{formatMessage(messages["Sync Status"])}</Text>
            </Menu.Item>
          }

          {
            this.props.actions && this.props.actions.status &&
            <Menu.Item key="11" style={{ ...style.setting.drawerIconTitleWrapper }}
              onClick={() => changeStatus && changeStatus(selectedRows, true)}>
              <Icon type="check" />&nbsp;&nbsp;
              <Text>{formatMessage(messages["Enable"])}</Text>
            </Menu.Item>
          }

          {
            this.props.actions && this.props.actions.status &&
            <Menu.Item key="12"
              style={{ ...style.setting.drawerIconTitleWrapper }}
              onClick={() => changeStatus && changeStatus(selectedRows, false)}>
              <Icon type="close" />&nbsp;&nbsp;
              <Text>{formatMessage(messages["Disable"])}</Text>
            </Menu.Item>
          }

          {/* {this.props.actions && this.props.actions.archivePublicFolder &&
                  <Menu.Item key="13" style={{ display: "flex", alignItems: "center" }}>
                    <Icon type="check" />
                    <Text >{formatMessage(messages["Archive Public Folder"])}</Text>
                  </Menu.Item>} */}
          {/* {this.props.actions && this.props.actions.archivePublicFolder && <Menu.Item key="14" style={{ display: "flex", alignItems: "center" }}>
                  <Icon type="close" />
                  <Text >{formatMessage(messages["Archive Public Folder"])}</Text>
                </Menu.Item>
                }   */}
          {/* {this.props.actions && this.props.actions.stubEnable &&
                  <Menu.Item key="15" style={{ display: "flex", alignItems: "center" }}>
                    <Icon type="check" />
                   <Text >{formatMessage(messages["Stub Enable"])}</Text>
                 </Menu.Item>} */}
          {/* {this.props.actions && this.props.actions.stubEnable && <Menu.Item key="16" style={{ display: "flex", alignItems: "center" }} >
                 <Icon type="close" />
                   <Text >{formatMessage(messages["Stub Enable"])}</Text>
                 </Menu.Item>
                }   */}
          {/* {this.props.actions && this.props.actions.stubPeriod &&
                 <Menu.Item key="17" style={{ display: "flex", alignItems: "center" }}>
                   <Icon type="check" />
                  <Text >{formatMessage(messages["Stub Period"])}</Text>
                </Menu.Item>} */}
          {/* {this.props.actions && this.props.actions.stubPeriod && <Menu.Item key="18" style={{ display: "flex", alignItems: "center" }}>
                 <Icon type="close" />
                  <Text >{formatMessage(messages["Stub Period"])}</Text>
                </Menu.Item>
                 }  */}
          {/* {this.props.actions && this.props.actions.enabled &&
                <Menu.Item key="19" style={{ display: "flex", alignItems: "center" }}  onClick={()=> stubStatus(selectedRows,true)}>
                 <Icon type="check" />
                 <Text >{formatMessage(messages["Stub Enable"])}</Text>
                </Menu.Item>} */}
          {/* {this.props.actions && this.props.actions.enabled && <Menu.Item key="20" style={{ display: "flex", alignItems: "center" }}  onClick={()=> stubStatus(selectedRows,false)}>
                 <Icon type="close" />
                 <Text >{formatMessage(messages["Stub Enable"])}</Text>
                </Menu.Item>
                } */}
          {
            this.props.actions && this.props.actions.activate &&
            <Menu.Item key="21" style={{ ...style.setting.drawerIconTitleWrapper }} onClick={() => this.props.onActive && this.props.onActive(selectedRows, true)}>
              <Icon type="check" />&nbsp;&nbsp;
              <Text>{formatMessage(messages["Activate"])}</Text>
            </Menu.Item>
          }
          {
            this.props.actions && this.props.actions.activate && <Menu.Item key="22" style={{ ...style.setting.drawerIconTitleWrapper }} onClick={() => this.props.onActive && this.props.onActive(selectedRows, false)}>
              <Icon type="close" />&nbsp;&nbsp;
              <Text>Deactivate</Text>
            </Menu.Item>
          }
          {/* {this.props.priority &&
                  <Menu.Item key="23" style={{ ...style.setting.drawerIconTitleWrapper }}>
                    <Icon type="ordered-list" />
                    <Text >{formatMessage(messages["Priority"])}</Text>,
                  </Menu.Item>
                } */}
          {
            this.props.actions && this.props.actions.dismiss &&
            <Menu.Item key="24" style={{ ...style.setting.drawerIconTitleWrapper }} onClick={() => openDismissDrawer && openDismissDrawer(selectedRows || [])}>
              <img title="Dismiss" alt='Dismiss' width={20} src={require('../../../Assets/icons/SV_ICONS/Close_Orange.png')} />&nbsp;&nbsp;
              <Text>{formatMessage(messages["Dismiss"])}</Text>
            </Menu.Item>
          }
          {/* {!this.props.actions && this.props.actions.noDelete && <Menu.Item key="25" style={{ display: "flex", alignItems: "center" }} onClick={() => Delete && Delete(selectedRows)}> */}
          {
            !this.props.noDelete && <Menu.Item key="26" style={{ ...style.setting.drawerIconTitleWrapper }} onClick={() => this.props.openDeleteDrawer(selectedRows || [])}
            >
              {/* <Icon type="delete" /> */}
              <img src={DeleteOrange} alt="" width={20} title={formatMessage(messages["Delete"])} style={{ cursor: "pointer" }} />&nbsp;
              <Text>{formatMessage(messages["Delete"])}</Text>
            </Menu.Item>
          }
        </Menu>
      )
    } catch (e) { }
  };
  handlePageSizeHolderChange = (value) => {
    let prevPageSize = this.props.pageSize
    let datasearched = this.props.data
    if (this.props.getDataWithPagination) {
      this.props.onPageSizeChange(value, prevPageSize, datasearched)
    }
    this.props.currentPageSize && this.props.currentPageSize(value);
    this.setState({
      pageSize: value,
      currentPage: 1
    })
  }
  render() {
    const { pageSize } = this.state
    const { needRowSelection, data, actionDropdown, openDrawer, add, noCustomizeColumn, totalData, selectedRowKeys, noReadingPane, navigateToSavedSearch, navigateToSearchArchive, formatMessage, currentPage, openLegalDrawer } = this.props;
    let pgSize = this.props.pageSize || pageSizeHolder[0]
    return (

      <div style={{ padding: '6px', height: 65, width: "100%" }}>
        <Row>
          <Col span={8}>
            {/* && data && data.length > 0 && */}
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '50px', overflow: 'hidden', padding: 2 }}>
              {actionDropdown &&
                <Dropdown overlay={this.menuForActions}
                  trigger={['click']}
                  disabled={this.props.separator === "SearchArchive" || this.props.separator === 'SaveSearch' ?
                    false : !selectedRowKeys || !selectedRowKeys.length} >
                  <Button >
                    {formatMessage(messages.Actions)} <Icon type="down" />
                  </Button>
                </Dropdown>
              }
              {/* <Button onClick={() => this.resetAll()} size="small" style={{ width: 90, marginLeft: 10 }}>
              {formatMessage(messages["Reset"])}
                </Button> */}
              {data && data.length > 0 && <Text style={{ marginLeft: actionDropdown ? 20 : 0 }}>{(!selectedRowKeys || (selectedRowKeys && selectedRowKeys.length < 2)) ? (needRowSelection || actionDropdown) && <Text>{`${(selectedRowKeys && selectedRowKeys.length)} Record Selected`}</Text> : (needRowSelection || actionDropdown) && <Text>{`${(selectedRowKeys && selectedRowKeys.length)} Records Selected`}</Text>} </Text>}
            </div>
          </Col>
          <Col span={6}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px', overflow: 'hidden', padding: 2 }}>
              {this.props.getDataWithPagination ? (!isNaN(Number(currentPage)) && !isNaN(Number(pgSize)) && !isNaN(Number(totalData)) && data && data.length > 0 && <Text style={{ marginLeft: actionDropdown ? 20 : 0 }}>{`${currentPage && ((currentPage - 1) * pgSize) + 1} - ${currentPage && (currentPage * pgSize > totalData) ? totalData : currentPage * pgSize} of ${totalData} Records`}</Text>)
                :
                !isNaN(Number(currentPage)) && !isNaN(Number(pageSize)) && data && data.length > 0 && <Text style={{ marginLeft: actionDropdown ? 20 : 0 }}>{`${currentPage && ((currentPage - 1) * pageSize) + 1} - ${currentPage && (currentPage * pageSize > data.length) ? data.length : currentPage * pageSize} of ${data.length} Records`}</Text>}
            </div>
          </Col>

          <Col span={10} >
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '50px', overflow: 'hidden', padding: 2 }}>

              {/* {this.props.actions && this.props.actions.remove &&
                  <div style={{ padding: "0 0px" }}>
                    <img
                      title="Release" alt='' style={{ ...style.cursorPointer }}
                      width="32px" src={require('../../Assets/icons/SV_ICONS/ReleaseLH_Orange.png')}
                      onClick={() => openDrawer && openDrawer('removeDocument')} />
                  </div>} */}

              {this.props.release && <div style={{ padding: "0 5px" }}><img title="Release" alt='' style={{ ...style.cursorPointer }} width="35px" src={require('../../../Assets/icons/SV_ICONS/ReleaseLH_Orange.png')} onClick={() => openLegalDrawer && openLegalDrawer('legalHoldReleases')} /></div>}

              {this.props.active && <div style={{ padding: "0 5px" }}><img title="Active" alt='' style={{ ...style.cursorPointer }} width="35px" src={require('../../../Assets/icons/SV_ICONS/LegalHold_Orange.png')} onClick={() => openLegalDrawer && openLegalDrawer('activeLegalHold')} /></div>}



              {add && <div onClick={() => openDrawer && openDrawer()} style={{ cursor: "pointer", margin: '0px 10px', overflow: 'hidden' }}><img title="Add" width={34} alt="" src={require(`../../../Assets/icons/SV_ICONS/Add_Orange.png`)} /></div>}
              {this.props.actions && this.props.actions.saveSearch &&
                <div title="Save Search" style={this.props.actions.saveSearch ? { padding: '0px 10px' } : { padding: '0px' }}>
                  <img title="Save Search" alt=''
                    style={{ ...style.cursorPointer }} width="35px"
                    src={require('../../../Assets/icons/SV_ICONS/SaveSearch_Orange.png')}
                    onClick={() => openDrawer && openDrawer('saveSearch')} />
                </div>}

              {(add || (this.props.actions && this.props.actions.saveSearch)) && !noCustomizeColumn && <Divider style={{ height: 40, width: 2, color: '#6d8bbb' }} type="vertical" />}

              {!noReadingPane ?
                (this.props.actions && this.props.actions.savedSearch &&

                  // <div style={this.props.actions.savedSearch ? { padding: '0px 10px' } : { padding: '0px' }}> <img title="Saved Searches" alt=''
                  // height="35px"

                  <div style={{ padding: '5px', cursor: 'pointer' }}> <img title="Saved Searches" alt=''
                    height="32px"
                    src={require('../../../Assets/icons/SV_ICONS/SaveSearch_Blue.png')}
                    onClick={() => navigateToSavedSearch && navigateToSavedSearch()}
                  /></div>) :
                (<div style={{ padding: "0 10px", display: "flex" }}>
                  <img title="Back To Search Archive" alt='' style={{ cursor: "pointer", marginRight: 0 }} height="32px" src={require('../../../Assets/icons/SV_ICONS/Search_Blue.png')} onClick={() => navigateToSearchArchive && navigateToSearchArchive()} />
                </div>)}

              {!noCustomizeColumn &&
                <img
                  alt=''
                  title={formatMessage(messages["Column Configuration"])}
                  style={{ cursor: "pointer", padding: "0 10px" }}
                  onClick={() => this.props.openColumConfigDrawer()}
                  width="55" src={require('../../../Assets/icons/SV_ICONS/Columns_Blue.png')}
                />}

              {this.props.pageHeaderActions && (this.props.pageHeaderActions.refresh || this.props.needRefreshIcon) && (
                <div
                  style={{ padding: '0 10px', fontSize: '20px' }}
                  onClick={() =>
                    this.props.pageHeaderActions.onRefresh &&
                    this.props.pageHeaderActions.onRefresh()
                  }>
                  <img
                    alt=''
                    title={formatMessage(messages["Refresh"])}
                    src={require(`../../../Assets/icons/SV_ICONS/Refresh_Blue.png`)}
                    style={{ cursor: 'pointer' }}
                    width={32}
                  />
                </div>
              )}
              {this.props.pageHeaderActions && (this.props.pageHeaderActions.setting || this.props.needSettingIcon) && (
                <div style={{ padding: '0 10px' }}>
                  <Icon
                    type='setting'
                    title='Page Settings'
                    theme='filled'
                    width='35px'
                    style={{ fontSize: '25px', cursor: 'pointer' }}
                    onClick={() =>
                      this.props.pageHeaderActions.settingOpenDrawer &&
                      this.props.pageHeaderActions.settingOpenDrawer()
                    }
                  />
                </div>
              )}

              <Dropdown overlay={
                <Menu>
                  {
                    pageSizeHolder.map((pageSize, index) => (
                      <Menu.Item key={index} style={{ display: "flex", alignItems: "center" }} onClick={() => this.handlePageSizeHolderChange(pageSize)} >
                        <Text >{pageSize}</Text>
                      </Menu.Item>
                    ))}
                </Menu>} trigger={['click']} >
                <Button style={{ width: 90, padding: "0px 8px 0 15px", display: "flex", justifyContent: "space-between", alignItems: "center", }} >
                  {pageSize} <Icon style={{ marginTop: 3 }} type="down" />
                </Button>
              </Dropdown>

              {/* <Select
                defaultValue={this.props.pageSize || pageSizeHolder[0]}
                style={{ width: 85, height: 40, margin: '10px 0 10px 10px' }}
                onChange={this.handlePageSizeHolderChange}
              >
                {pageSizeHolder.map((pageSize, index) => (
                  <Option key={index} value={pageSize}>{pageSize}</Option>
                ))}
              </Select> */}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    selectedRowKeys: state.updateSelectedRecordsReducer.selectedRowKeys,
    pageHeaderActions: state.pageHeaderReducer.actions,

  }
};
const mapDispatchToProps = dispatch => {
  return {
    updateSelectedRecords: selectedRowKeys => (dispatch(updateSelectedRecords(selectedRowKeys))),
    resetSelectedRecords: () => dispatch(resetSelectedRecords())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataTableHeader);