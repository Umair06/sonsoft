import React from 'react';
import "../../App.css";
import { Table, Button, Icon, Typography, Input, ConfigProvider, message, /*Menu, Dropdown, Row, Col, Select, Divider*/ } from 'antd';
import { DndProvider, DragSource, DropTarget } from 'react-dnd';
import ColumConfigurationSideDrawer from "../CustomizeColumnDrawer/CustomizeColumDrawer";
import EditOrange from "../../Assets/icons/SV_ICONS/Edit_Orange.png";
import DeleteOrange from "../../Assets/icons/SV_ICONS/Delete_Orange.png";
import DismissIcon from '../../Assets/icons/SV_ICONS/Close_Orange.png';

import { connect } from "react-redux";
// import { Resizable } from 'react-resizable';
// import Highlighter from 'react-highlight-words';
import Theme from "../../Assets/Theme/Theme";
// import style from '../../styles'
import HTML5Backend from 'react-dnd-html5-backend';
// import { dataLoaded } from '../../Redux/Actions/SimpleSearchAction/SimpleSearchAction';
// import { updateDataTablePageSize } from "../../Redux/Actions/UpdateDataTablePageSize/UpdateDataTablePageSize";
import { updateSelectedRecords, resetSelectedRecords } from "../../Redux/Actions/updateSelectedRecordsAction/updateSelectedRecordsAction";
import { defineMessages } from 'react-intl';
import DeleteDrawer from "../Modal/DeleteDrawer";

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
  'Deactivate': {
    id: "DataTable.Deactivate",
    defaultMessage: "Deactivate",
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
  'Loading': {
    id: "DataTable.Loading",
    defaultMessage: "Loading..."
  },
  'No Recods Found': {
    id: "DataTable.NoRecodsFound",
    defaultMessage: "No Recods Found"
  },
})

const { Text } = Typography;
const { color } = Theme;
// const { Option } = Select;
const pageSizeHolder = ['20', '30', '40', '50', '75', '100'];
// const pageSizeHolder = ['1', '2', '3', '4', '5', '6'];
let lastMark = null;
let nSearch = 0;

// const ResizeableTitle = props => {
//   const { onResize, width, ...restProps } = props;

//   if (!width) {
//     return <th {...restProps} />;
//   }

//   return (
//     <Resizable
//       width={width}
//       height={0}
//       onResize={onResize}
//       draggableOpts={{ enableUserSelectHack: false }}
//     >
//       <th {...restProps} />
//     </Resizable>
//   );
// };

// let checkboxClicked = false;
let dragingIndex = -1;

class BodyRow extends React.Component {
  render() {
    const { isOver, connectDragSource, connectDropTarget, moveRow, ...restProps } = this.props;
    const style = { ...restProps.style, cursor: 'move' };

    let { className } = restProps;
    if (isOver) {
      if (restProps.index > dragingIndex) {
        className += ' drop-over-downward';
      }
      if (restProps.index < dragingIndex) {
        className += ' drop-over-upward';
      }
    }

    return connectDragSource(
      connectDropTarget(<tr {...restProps} className={className} style={style} />),
    );
  }
}

const rowSource = {
  beginDrag(props) {
    dragingIndex = props.index;
    return {
      index: props.index,
    };
  },
};

const rowTarget = {
  drop(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Time to actually perform the action
    props.moveRow(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  },
};

const DragableBodyRow = DropTarget('row', rowTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
}))(
  DragSource('row', rowSource, connect => ({
    connectDragSource: connect.dragSource(),
  }))(BodyRow),
);


class DataTable extends React.Component {
  constructor(props) {
    super(props)
    this.dataTableRef = React.createRef();
    this.state = {
      pageSize: pageSizeHolder[0],
      value: true,
      columns: [],
      totalSelection: 0,
      resetBtnDisable: true,
      selectedRows: [],
      currentPage: 1,
      // handleSelectRowChange: (record) => {
      //   const { checkedRows, selectedRows } = this.state
      //   let filteredCheckedRows = [...checkedRows]
      //   if (filteredCheckedRows.includes(record.key)) {
      //     filteredCheckedRows = filteredCheckedRows.filter(key => key !== record.key)
      //   } else {
      //     filteredCheckedRows.push(record.key)
      //   }
      //   this.setState({
      //     checkedRows: filteredCheckedRows
      //   })
      // },
      // handleAllSelectRowChange: (e, documents) => {
      //   const { checkedRows, /*selectedRows*/ } = this.state
      //   const { disableCheckboxKey } = this.props
      //   let filteredCheckedRows = [...checkedRows]
      //   let data = documents

      //   if (disableCheckboxKey === "ROLE_TYPE") {
      //     data = data.filter(doc => doc[disableCheckboxKey] !== "S")
      //   }
      //   let docKeys = data && data.map(doc => doc.key)
      //   if (data && filteredCheckedRows.length < data.length) {
      //     data.forEach(doc => {
      //       // if (doc.ROLE_TYPE !== "S") {
      //       if (!(filteredCheckedRows.includes(doc.key))) {
      //         filteredCheckedRows.push(doc.key)
      //       }
      //       // }
      //     })
      //   } else {
      //     filteredCheckedRows = []
      //   }
      //   this.setState({
      //     checkedRows: filteredCheckedRows
      //   })
      // },
      // checkboxClicked: () => {
      //   this.props.notOnRowClick && this.props.notOnRowClick()
      //   checkboxClicked = true
      // },
      // openDeleteDrawer: record => {
      //   this.setState({
      //     deleteDrawer: true,
      //     deleteRecord: record
      //   })
      // }
      // searchText: props.searchText
    }
    this.props.resetSelectedRecords && this.props.resetSelectedRecords();
  }


  handleResize = index => (e, { size }) => {
    this.setState(({ columns }) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };
      return { columns: nextColumns };
    });
  };


  customizeRenderEmpty = props => {
    return (
      <div style={{ textAlign: 'center', overflow: 'hidden' }}>
        <img src={require(`../../Assets/icons/noSelection.svg`)} width={100} alt="" />
        {/* <p>{this.props.loaded ? this.props.formatMessage(messages["Loading"]) : this.props.formatMessage(messages["No Emails, Please select a criteria"])}</p> */}
        <p>{this.props.datatableMsg ? this.props.datatableMsg : this.props.formatMessage(messages["No Recods Found"])}</p>
      </div>
    );
  };

  handlePageSizeHolderChange = (value) => {
    let prevPageSize = this.props.pageSize
    let datasearched = this.props.data
    if (this.props.getDataWithPagination) {
      this.props.onPageSizeChange(value, prevPageSize, datasearched)
    }
    this.setState({
      pageSize: value,
      currentPage: 1
    })
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8, overflow: 'hidden' }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          // placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 165, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, clearFilters)}
          icon="search"
          size="small"
          style={{ width: 'auto', marginRight: 8 }}
        >
          Search
				</Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
			</Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) => value && record && record[dataIndex] &&
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }

    },
    // render: text => (
    //   <Highlighter
    //     highlightStyle={{ backgroundColor: color.Orange, padding: 0 }}
    //     searchWords={[this.state.searchText]}
    //     autoEscape
    //     textToHighlight={text && text.toString()}
    //   />
    // ) ,
  });

  handleSearch = (selectedKeys, confirm, clearFilters) => {
    confirm();
    this.setState({ searchText: selectedKeys[0], ["clearFilters" + nSearch.toString()]: clearFilters, resetBtnDisable: false });
    nSearch = nSearch + 1
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '', resetBtnDisable: true });
  };


  static getDerivedStateFromProps(props, state) {
    const { formatMessage } = props;
    let columns = props.columns;
    let selectedRows = [];
    // onClick={() => props.Delete && props.Delete(text)}
    if (props.columns && state.columns && props.columns.length !== state.columns.length) {
      columns = props.addEditColumn ? [...props.columns, {
        title: () =>
          <div style={{ color: "inherit" }}>
            {props.noEditIcon && <Text style={{ color: "inherit" }}>{formatMessage(messages["Delete"])}</Text>}
            {props.dismissIcon && <Text style={{ color: "inherit" }}>{formatMessage(messages["Dismiss"])}</Text>}
            {props.noDelete && <Text style={{ color: "inherit" }}>{formatMessage(messages["Edit"])}</Text>}
            {!props.noDelete && !props.noEditIcon && !props.dismissIcon && <Text style={{ color: "inherit" }}>{formatMessage(messages["EditORDelete"])}</Text>}
          </div>,
        render: text => <div >
          {!props.noEditIcon && !props.dismissIcon && <img src={EditOrange} alt="" width={25} title={formatMessage(messages["Edit"])} onClick={() => props.openDrawer && props.openDrawer(text)} style={{ zIndex: '1000', cursor: "pointer" }} />}
          {!props.noDelete && !props.dismissIcon && <img src={DeleteOrange} alt="" width={25} title={formatMessage(messages["Delete"])} style={!props.noEditIcon ? { marginLeft: 10, cursor: "pointer" } : { cursor: "pointer" }} onClick={() => props.openDeleteDrawer(text)} />}
          {props.dismissIcon && <img src={DismissIcon} alt="" width={25} title={formatMessage(messages["Dismiss"])} style={{ cursor: "pointer" }} onClick={() => props.openDismissDrawer(text)} />}
        </div>,
        width: 90

      }] :
        [...props.columns]
      columns.map(col => {
        if (col.dataIndex) {
          col.sorter = (a, b) => col.dataIndex && a[col.dataIndex] && a[col.dataIndex] && b[col.dataIndex].length && b[col.dataIndex].length && a[col.dataIndex].length - b[col.dataIndex].length
          col.sorter = (a, b) => col.dataIndex && a && a[col.dataIndex] && b && b[col.dataIndex] && a[col.dataIndex].length && b[col.dataIndex].length && a[col.dataIndex].length - b[col.dataIndex].length

          col.sortDirections = ['descend', 'ascend']
        }
        return col
      })

    }
    if (props.data && Array.isArray(props.data) && props.data.length && !(props.data[props.data.length - 1].key)) {
      props.data.forEach((doc, index) => doc.key = props.keyID ? (props.seperator ? (props.keyID_2 ? `${props.keyID}=${doc[props.keyID]}=${doc[props.keyID_2]}=${props.seperator}` : `${props.keyID}=${doc[props.keyID]}=${props.seperator}`) : `${props.keyID}=${doc[props.keyID]}`) : props.seperator ? `${props.seperator}=${index}` : index)
    }
    if (props.selectedRowKeys && Array.isArray(props.selectedRowKeys) && props.selectedRowKeys.length && props.data && Array.isArray(props.data) && props.data.length) {
      props.data.forEach(record => {
        if (props.selectedRowKeys.includes(record.key)) {
          selectedRows.push(record)
        }
      })
    } else if (!props.selectedRowKeys || (Array.isArray(props.selectedRowKeys) && !props.selectedRowKeys.length)) {
      selectedRows = [];
    }
    // if (props.needRowSelection || props.actionDropdown) {
    //   columns = [{
    //     width: 10,
    //     title: () => <div ><Checkbox disabled={!props.data || (props.data && !props.data.length)} indeterminate={props.data && props.data.length && checkedRows.length > 0 && checkedRows.length < props.data.length} checked={props.data && props.data.length && checkedRows.length === props.data.length} onChange={e => state.handleAllSelectRowChange(e, props.data)} /></div>,
    //     render: record => <div style={{ width: 18, overflow: 'hidden' }} onClick={() => state.checkboxClicked()}><Checkbox checked={checkedRows.includes(record.key)} onChange={() => state.handleSelectRowChange(record)} disabled={(record.ROLE_TYPE === "S") && true} /></div>
    //   }, ...columns]
    // }
    // if (props.data && Array.isArray(props.data) && props.data.length > 0) {
    //   props.data.forEach(doc => {
    //     if (state.checkedRows.includes(doc.key)) {
    //       selectedRows.push(doc)
    //     }
    //   })
    // }
    // if (checkedRows && checkedRows.length && props.data && Array.isArray(props.data) && props.data.length) {
    //   checkedRows = checkedRows.filter(doc => JSON.stringify(props.data).includes(JSON.stringify(doc && doc)))
    // }
    // if (JSON.stringify(selectedRows) !== JSON.stringify(state.selectedRows)) {
    //   props.getRowSelection && props.getRowSelection(selectedRows)
    // }
    return {
      columns,
      selectedRows
      // data
      // checkedRows,
      // selectedRows,
      // totalSelection: (props.totalSelectedRows) ? props.totalSelectedRows.length : state.totalSelection
    };
  }


  // closeDeleteDrawer = () => {
  //   this.setState({
  //     deleteDrawer: false,
  //     deleteRecord: undefined
  //   })
  // }



  customizeColumn = col => {
    const { columns } = this.state;
    let matched = false
    let matchedObj;
    if (columns) {
      for (let obj of columns) {
        if (obj.title === col.title && !matched) {
          matched = true
          matchedObj = obj
        }
      }
    }
    matchedObj.hide = !matchedObj.hide
    this.setState({
      hide: true
    })
  }

  resetAll() {
    this.reset()
    setTimeout(() => this.reset(), 2000)

  }

  reset() {
    for (let i = nSearch - 1; i >= 0; i--) {
      this.state["clearFilters" + i.toString()] && this.state["clearFilters" + i.toString()]()
    }
  }
  components = {
    body: {
      row: DragableBodyRow,
    },
  };

  moveRow = (dragIndex, hoverIndex) => {
    const { data } = this.props;
    // const dragRow = data[dragIndex];
    if (data[dragIndex].IS_ACTIVE && data[dragIndex].IS_ACTIVE !== "0" && data[hoverIndex].IS_ACTIVE && data[hoverIndex].IS_ACTIVE !== "0") {
      [data[dragIndex], data[hoverIndex]] = [data[hoverIndex], data[dragIndex]]
      let draggedRow = { dragIndex: dragIndex + 1, record: data[dragIndex] }
      let hoveredRow = { hoveredIndex: hoverIndex + 1, record: data[hoverIndex] }
      this.props.applyPriority && this.props.applyPriority(draggedRow, hoveredRow)
      this.setState({
        data,
        checkedRows: [],
        selectedRows: []
      })
    } else {
      message.warn("Cannot update the priority of disabled Retention Policy")
    }
  };

  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.props.getRowSelection && this.props.getRowSelection(selectedRows, selectedRowKeys);
    this.setState({ selectedRows });
    this.props.updateSelectedRecords && this.props.updateSelectedRecords(selectedRowKeys)
  };

  render() {
    const { /*actions, noReadingPane, navigateToSavedSearch, navigateToSearchArchive, actionDropdown, openDrawer, noCustomizeColumn, add,*/ needRowSelection, data, screenName, onRowClick, disappearMark, coveredHeight, indicateRow, addEditColumn, xscroll, totalData, currentPage, fetchingMsg, dragging, Delete, deleteMessage, selectedRowKeys, columnConfig, deleteDrawer, deleteRecord, dismissDrawer, dismissRecord, deleteLabels } = this.props;
    const { columns, pageSize } = this.state;
    // const { saveSearch } = this.props.actions
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      getCheckboxProps: record => ({
        disabled: (screenName === "Role_Management" && record.ROLE_ID < 4) || (screenName === "User_Management" && (record.USER_TYPE === "A" || record.USER_TYPE === "S"))
      }),
      hideDefaultSelections: true,
      selections: [
        {
          key: 'Deselect-all-data',
          text: 'Deselect all',
          onSelect: () => {
            this.onSelectChange([], [])
            this.setState({
              selectedRowKeys: []
            });
          },
        }
      ],
    };
    let customizedColumns = columns.filter(col => !col.hide)
    customizedColumns = customizedColumns.map((col, index) => col.dataIndex ? ({
      ...col,
      ...this.getColumnSearchProps(col.dataIndex),
      onHeaderCell: column => ({
        width: column.width,
        // onResize: this.handleResize(index),
      }),

    }) : { ...col });
    const { formatMessage } = this.props;
    let datatableWidth = 0;
    xscroll && customizedColumns.forEach(col => {
      datatableWidth = col.width && !(isNaN(Number(col.width))) ? (datatableWidth + Number(col.width)) : datatableWidth
    })
    // let pgSize = this.props.pageSize || pageSizeHolder[0]
    return (
      <div style={{ /*border: '1px solid #e6e7e8',*/ height: "100%", marginTop: 0, overflow: "hidden" }}>
        <ColumConfigurationSideDrawer formatMessage={formatMessage} openCustomizedColumn={columnConfig} customizeColumn={col => this.customizeColumn(col)} rowSelection={needRowSelection || (this.props.actionDropdown && true)} customizedColums={addEditColumn ? columns.slice(0, columns.length - 1) : columns} close={() => this.props.closeColumConfigDrawer()} />
        <DeleteDrawer deleteMessage={deleteMessage ? deleteMessage : ""} deleteLabels={deleteLabels} deleteDrawer={deleteDrawer} dismissDrawer={dismissDrawer} deleteRecord={deleteRecord} dismissRecord={dismissRecord} onSubmit={records => Delete && Delete(records)} close={() => ((this.props.closeDeleteDrawer && this.props.closeDeleteDrawer()) || (this.props.closeDismissDrawer && this.props.closeDismissDrawer()))} />
        <div id="div" style={{ cursor: "pointer", height: "100%" }}>
          <ConfigProvider renderEmpty={this.customizeRenderEmpty} >
            {dragging ? <DndProvider backend={HTML5Backend}  >
              <Table style={{ height: "inherit" }} ref={this.dataTableRef} scroll={{ y: coveredHeight && `calc(100vh - ${coveredHeight}px)` }} onRow={(record, index) => {
                return {
                  index,
                  moveRow: this.moveRow,
                  onClick: event => {
                    try {
                      if (indicateRow) {
                        if (lastMark !== null) {
                          lastMark.style.borderLeft = "none"
                        }
                        let node = event.target.parentNode
                        while (node && node !== null && (!node.className || !node.className.split(" ").includes("ant-table-row"))) {
                          node = node['parentNode']
                        }
                        node['children'][0].style.borderLeft = `8px solid ${color.Orange}`
                        lastMark = node['children'][0];
                        disappearMark(node['children'][0])

                      }
                    } catch (e) { }
                    onRowClick && onRowClick(record)
                  }
                }
              }} components={this.components} rowSelection={(this.props.needRowSelection || this.props.actionDropdown) && rowSelection} pagination={this.props.getDataWithPagination ? { pageSize: Number(this.props.pageSize), current: currentPage, simple: true, total: this.props.data && totalData, onChange: (page, pageSize) => this.props.pageChanged(page, pageSize) } : { pageSize: Number(pageSize), simple: true, total: data && data.length }} columns={customizedColumns} dataSource={this.props.getDataWithPagination ? (data && Array.isArray(data) && data.length ? data.slice(0, this.props.pageSize): []) : data} size="middle" loading={{ tip: fetchingMsg || "Fetching", size: "large", spinning: this.props.noLoading ? (this.props.loaded ? (data || this.props.error ? false : true) : false) : (data || Array.isArray(data) ? false : true) }} />
            </DndProvider>
              : <Table style={{ height: "inherit" }} ref={this.dataTableRef} rowSelection={(this.props.needRowSelection || this.props.actionDropdown) && rowSelection} scroll={{ y: coveredHeight && `calc(100vh - ${coveredHeight}px)`, x: xscroll && (Number(datatableWidth)) }} onRow={(record, index) => {
                return {
                  onClick: event => {
                    try {
                      let notOnRowClickVar = onRowClick && onRowClick(record)
                      if (indicateRow && !notOnRowClickVar) {
                        if (lastMark !== null) {
                          lastMark.style.borderLeft = "none"
                        }
                        let node = event.target.parentNode;
                        while (node && node !== null && (!node.className || !node.className.split(" ").includes("ant-table-row"))) {
                          node = node['parentNode']
                        }
                        node['children'][0].style.borderLeft = `8px solid ${color.Orange}`
                        lastMark = node['children'][0];
                        disappearMark(node['children'][0])

                      }
                    } catch (e) { }
                    // checkboxClicked = checkboxClicked && false
                  }
                }
              }}
                // onRowClick={(text) => onRowClick && onRowClick(text)} 
                pagination={this.props.getDataWithPagination ? { pageSize: Number(this.props.pageSize), current: currentPage, simple: true, total: this.props.data && totalData, onChange: (page, pageSize) => this.props.pageChanged && this.props.pageChanged(page, pageSize) }
                  //  data && data.length > 0 && data.slice((page - 2) * pageSize, data.length).length < pageSize * 2 && data.slice((page - 1) * pageSize, data.length).length < (totalData - pageSize * (page - 1)) ? this.props.pageChanged(page, p FageSize) : this.props.updateCurrentPage(page, pageSize) } 
                  :
                  { pageSize: Number(this.props.pageSize), simple: true, total: data && data.length, current: this.props.currentPage, onChange: (page) => this.props.currentPaginationSize && this.props.currentPaginationSize(page) /*(page, pageSize) => this.setState({ currentPage: page })*/ }}
                columns={customizedColumns}
                dataSource={this.props.getDataWithPagination ? (data && Array.isArray(data) && data.length ? data.slice(0, this.props.pageSize): []) : data} size="middle"
                loading={{
                  tip: fetchingMsg || "Fetching", size: "large",
                  spinning: this.props.noLoading ? (this.props.loaded ? (data || this.props.error ? false : true) : false) : (data || Array.isArray(data) ? false : true)
                }}
              />}
          </ConfigProvider>
        </div>

      </div >
    )
  }
}

const mapStateToProps = state => {
  return {
    loaded: state.SimpleSearchReducer.loaded,
    selectedRowKeys: state.updateSelectedRecordsReducer.selectedRowKeys
  }
};
const mapDispatchToProps = dispatch => {
  return {
    updateSelectedRecords: selectedRowKeys => (dispatch(updateSelectedRecords(selectedRowKeys))),
    resetSelectedRecords: () => dispatch(resetSelectedRecords())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);
