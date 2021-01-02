import React, { Component } from 'react';
import {
  Drawer,
  Typography,
  Form,
  Checkbox,
  Input,
  Select,
  TreeSelect,
  message,
  Spin
} from 'antd';
import style from '../../styles';
import Theme from '../../Assets/Theme/Theme';
import { PrimaryButton, SecondryButton } from '../Button/Button';
import Clear_Gray from '../../Assets/icons/SV_ICONS/Clear_Gray.png';
import { version } from '../../APIConfig/Config';
import { EnCrypt } from '../../PasswordEncryption/PasswordEncryption';
import { connect } from 'react-redux';
import {
  fetchExportDropDown,
  postExportData,
  postExportAdvanceSearchData,
  postExportQueryBuilderData,
  postExportLegalHoldData,
  exportAllSmartSearchDocs
} from '../../Redux/Actions/ExportAction/ExportAction';
import { defineMessages } from 'react-intl';


const messages = defineMessages({
  'Create Export': {
    id: 'Export.CreateExports',
    defaultMessage: 'Create Export'
  },
  'Select Exports': {
    id: 'Export.Select Exports',
    defaultMessage: 'Select Exports'
  },
  'Please Enter Task Name': {
    id: 'Export.PleaseEnterTaskName',
    defaultMessage: 'Please Enter Task Name'
  },
  'Apply Exclusion List': {
    id: 'Export.ApplyExclusionList',
    defaultMessage: 'Apply Exclusion List'
  },
  'Apply Auto Redaction': {
    id: 'Export.ApplyAutoRedaction',
    defaultMessage: 'Apply Auto Redaction'
  },
  'Select Redaction': {
    id: 'Export.SelectRedaction',
    defaultMessage: 'Select Redaction'
  },
  'Required Password': {
    id: 'Export.RequiredPassword',
    defaultMessage: 'Required Password'
  },
  Submit: {
    id: 'Export.Submit',
    defaultMessage: 'Submit'
  },
  Cancel: {
    id: 'Export.Cancel',
    defaultMessage: 'Cancel'
  }
});

const { Option } = Select;
const { color } = Theme;
const { Title, Text } = Typography;
const exportList = [];
const exportData = ['HTML', 'EML', 'MSG', 'PST'];
const data = ['Credit Card', 'SIN', 'SSN'];
const redaction = [];
const redactionData = [
  { Redaction_Data: 'Credit Card' },
  { Redaction_Data: 'SIN' },
  { Redaction_Data: 'SSN' }
];
for (let i = 0; i <= data.length; i++) {
  redaction.push(<Option value={data[i]}>{data[i]}</Option>);
}
for (let i = 0; i <= exportData.length; i++) {
  exportList.push(<Option key={exportData[i]}>{exportData[i]}</Option>);
}

let userInfo = JSON.parse(localStorage.getItem('userInfo'));
let userId;
try {
  userId = userInfo.data.data.output[0].uid;
} catch (e) {
  userId = 0;
}

class Export extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
    };
  }

  static getDerivedStateFromProps(props) {
    if (props.exportEmail && (!props.exportDropDown)) {
      props.fetchExportDropDown();
    }
    return null;
  }

  onChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  onCheck = (checkValue, info) => {
    this.setState({ checkValue });
  };

  filter = (input, option) => {
    return (
      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    );
  };
  moveToFilter = () => {
    this.setState({ filter: true, search: false })
  }
  moveToSearch = () => {
    this.setState({ filter: false, search: true })
  }

  selectedColor = (e, color, ind) => {
    const { file } = this.state
    file.forEach((val) => {
      val.style = false;
    })
    file[ind].style = true;
    this.setState({ file })
  }
  openApplyExclusionList = () => {

    this.setState({
      applyExclusionList: !this.state.applyExclusionList
    });
  };
  openapplyAutoRedaction = () => {
    this.setState({
      applyAutoRedaction: !this.state.applyAutoRedaction
    })
  }
  openrequiredPassword = () => {
    this.setState({
      requiredPassword: !this.state.requiredPassword
    })
  }

  Close = () => {
    this.props.close();
    this.props.form.resetFields();
    this.setState({
      requiredPassword: false
    })
  };

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, data) => {
      if (err) {
      }
      else {
        if (data && data.password) {
          data.password = EnCrypt(data.password)
        }
        if (this.props.onHoldTab && this.props.legalhold) {
          if (data.Select_Export && data.Select_Export.includes("A")) {
            let APIBody = {
              action: 3,
              exportType: data.Select_Export,
              userId: userId,
              queryType: "all",
              caseId: this.props.legalhold.CASE_ID,
              jobName: data.Task,
              jobDesc: data.Task,
              jobType: 36,
              password: data.password || "",
              exclusion: "",
              redaction: [],
              docIds: [],
            }
            this.props.postExportLegalHoldData(APIBody)
            this.Close()
          } else {
            if (this.props.selectedDocs && Array.isArray(this.props.selectedDocs) && this.props.selectedDocs.length > 0) {
              let APIBody = {
                action: 3,
                exportType: data.Select_Export,
                userId: userId,
                queryType: "not",
                caseId: this.props.legalhold.CASE_ID,
                jobName: data.Task,
                jobDesc: data.Task,
                jobType: 16,
                password: data.password || "",
                exclusion: "",
                redaction: [],
                docIds: this.props.selectedDocs.map(doc => doc.split("=")[1])
              }
              this.props.postExportLegalHoldData(APIBody)
              this.Close()
            } else {
              message.warn("No Documents Selected", 3)
            }
          }
        } else {
          if ((this.props.updatedSearchCriteria && Object.keys(this.props.updatedSearchCriteria) && Object.keys(this.props.updatedSearchCriteria).length)) {
            if (this.props.searchType === 1 || (this.props.searchType === 4 && this.props.searchTypeTree === "S")) {
              if (data.Select_Export && data.Select_Export.includes("A")) {
                let exportData = {
                  ...data,
                  ...this.props.updatedSearchCriteria,
                  "jobType": 36,
                  "queryType": "all",
                  docIds: []
                }
                this.props.postExportData(exportData)
                this.Close()
              } else {
                if (this.props.selectedDocs && Array.isArray(this.props.selectedDocs) && this.props.selectedDocs.length > 0) {
                  let exportData = {
                    ...data,
                    "jobType": 16,
                    "queryType": "not",
                    ...this.props.updatedSearchCriteria,
                    docIds: this.props.selectedDocs.map(doc => doc.split("=")[1])
                  }
                  this.props.postExportData(exportData)
                  this.Close()
                } else {
                  message.warn("No Documents Selected", 3)
                }
              }
            } else {
              if (this.props.searchType === 2 || (this.props.searchType === 4 && this.props.searchTypeTree === "A")) {
                if (data.Select_Export && data.Select_Export.includes("A")) {
                  let APIBody = {
                    action: 2,
                    exportType: data.Select_Export,
                    userId: userId,
                    queryType: "all",
                    jobName: data.Task,
                    jobDesc: data.Task,
                    jobType: 36,
                    password: data.password || "",
                    exclusion: "",
                    redaction: [],
                    docIds: [],
                    ...this.props.updatedSearchCriteria
                  }
                  this.props.postExportAdvanceSearchData(APIBody)
                  this.Close()
                } else {
                  if (this.props.selectedDocs && Array.isArray(this.props.selectedDocs) && this.props.selectedDocs.length > 0) {
                    let APIBody = {
                      action: 2,
                      exportType: data.Select_Export,
                      userId: userId,
                      queryType: "not",
                      jobName: data.Task,
                      jobDesc: data.Task,
                      jobType: 16,
                      password: data.password || "",
                      exclusion: "",
                      redaction: [],
                      docIds: this.props.selectedDocs.map(doc => doc.split("=")[1]),
                      ...this.props.updatedSearchCriteria
                    }
                    this.props.postExportAdvanceSearchData(APIBody)
                    this.Close()
                  } else {
                    message.warn("No Documents Selected", 3)
                  }
                }
              } else {
                if (this.props.searchType === 3 || (this.props.searchType === 4 && this.props.searchTypeTree === "Q")) {
                  let query = { ...this.props.updatedSearchCriteria }
                  try {
                    query.body = JSON.parse(query.body)
                    query.body.size = this.props.searchedDataLength || query.body.size
                    // query.body = JSON.stringify(query.body)
                  } catch (e) { }
                  if (data.Select_Export && data.Select_Export.includes("A")) {
                    let APIBody = {
                      action: 4,
                      exportType: data.Select_Export,
                      userId: userId,
                      queryType: "all",
                      jobName: data.Task,
                      jobDesc: data.Task,
                      jobType: 36,
                      password: data.password || "",
                      exclusion: "",
                      redaction: [],
                      docIds: [],
                      "body": query.body,
                      "type": ["_doc"],
                      "index": query.index
                    }
                    this.props.postExportQueryBuilderData(APIBody)
                    this.Close()
                  } else {
                    if (this.props.selectedDocs && Array.isArray(this.props.selectedDocs) && this.props.selectedDocs.length > 0) {
                      let APIBody = {
                        action: 4,
                        exportType: data.Select_Export,
                        userId: userId,
                        queryType: "not",
                        jobName: data.Task,
                        jobDesc: data.Task,
                        jobType: 16,
                        password: data.password || "",
                        exclusion: "",
                        redaction: [],
                        docIds: this.props.selectedDocs.map(doc => doc.split("=")[1]),
                        "body": query.body,
                        "type": ["_doc"],
                        "index": query.index
                      }
                      this.props.postExportQueryBuilderData(APIBody)
                      this.Close()
                    } else {
                      message.warn("No Documents Selected", 3)
                    }
                  }
                } else {
                  if (this.props.searchType === 5 || (this.props.searchType === 4 && this.props.searchTypeTree === "SS")) {
                    if (this.props.simplesearchresult && Array.isArray(this.props.simplesearchresult) && this.props.simplesearchresult.length > 0) {
                      if (data.Select_Export && data.Select_Export.includes("A")) {
                        let exportData = {
                          ...data,
                          "jobType": 16,
                          "queryType": "not",
                          ...this.props.updatedSearchCriteria,
                          // docIds: this.props.simplesearchresult.map(doc => doc.split("=")[1])
                        }                       
                        this.props.exportAllSmartSearchDocs(
                          this.props.searchedDataLength,
                          exportData,
                          this.props.updatedSearchCriteria,
                          this.props.searchDatatablePageSize,
                          this.props.searchType,
                          this.props.smartSearchAccessToken,
                          this.props.searchTypeTree
                        )
                        this.Close()
                      } else {
                        if (this.props.selectedDocs && Array.isArray(this.props.selectedDocs) && this.props.selectedDocs.length <= 0) {
                          message.warn("No Documents Selected")
                          return
                        }
                        let exportData = {
                          ...data,
                          "jobType": 16,
                          "queryType": "not",
                          ...this.props.updatedSearchCriteria,
                          docIds: this.props.selectedDocs.map(doc => doc.split("=")[1])
                        }
                        this.props.postExportData(exportData)
                        this.Close()
                      }
                    } else {
                      message.warn("Documents Not Availble", 3)
                    }
                  }
                }
              }
            }
          } else {
            message.warn("No Search Criteria available", 3)
          }
        }
      }
    });
  }
  generateReductionSelectData = (data, variable) => {
    let treeData = []
    data && data.length > 0 && data.forEach((val, ind) => {
      treeData.push({
        title: val.Redaction_Data,
        value: val.Redaction_Data,
        key: ind,
      })
    })
    this.setState({
      [variable]: treeData
    })
  }
  onChangeReduction = (value, label) => {
    this.setState({ [label]: value });
  };
  componentDidMount() {
    this.generateReductionSelectData(redactionData, "redactionData")
  }
  render() {
    const { applyExclusionList, applyAutoRedaction, requiredPassword, redactionData, SelectRedaction } = this.state
    const { getFieldDecorator } = this.props.form;
    const { exportEmail, formatMessage } = this.props;
    return (
      <Drawer
        style={{ marginTop: 125 }}
        bodyStyle={{ height: 'calc(100vh - 125px)', overflowY: "auto" }}
        maskStyle={{ backgroundColor: "transparent" }}
        onClose={() => this.Close()}
        width={400}
        closable={false}
        visible={exportEmail}
      >
        <div style={{ ...style.setting.drawerMain }}>
          <div style={{ ...style.setting.drawerIconTitleWrapper }}>
            <img title="" alt='' style={{ ...style.cursorPointer }} width="40px" src={require('../../Assets/icons/SV_ICONS/Export_Orange.png')} />
            <Title style={{ color: `${color.Blue}`, padding: "15px 0 0 5px", fontSize: 24 }}>{"Create Export"}</Title>
          </div>
          <div onClick={() => this.Close()} style={{ paddingTop: 10, cursor: "pointer" }}>
            <img src={Clear_Gray} title="Close" alt="" onClick={() => this.Close()} width={28} height={28} />
          </div>
        </div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('Select_Export', {
              rules: [{ required: true, message: "please select a Export Type" }]
            })(
              <Select
                style={{ width: '100%', height: 40 }}
                placeholder={"Select Exports Format"}
                showSearch
                optionFilterProp="children"
                allowClear={true}
                // onChange={this.onChangeDropdown}
                // onFocus={() => (!this.props.exportDropDown || !this.props.exportDropDown.length) && exportEmail && this.props.fetchExportDropDown()}
                notFoundContent={(!this.props.exportDropDown) && <Text>
                  <Spin size="small" style={{ marginRight: 15 }} />Fetching Export Types</Text>}
                onBlur={this.onBlur}
                onSearch={this.onSearch}
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {this.props.exportDropDown && this.props.exportDropDown.map((val, ind) =>
                  <Option key={ind} value={val.Value}>{val.DisplayName}</Option>
                )}

              </Select>
            )}

            {/* return (
      <Drawer
        style={{ marginTop: 125 }}
        bodyStyle={{ height: 'calc(100vh - 125px)', overflowY: 'auto' }}
        // closable={true}
        maskStyle={{ backgroundColor: 'transparent' }}
        onClose={() => this.Close()}
        width={400}
        closable={false}
        visible={exportEmail}>
        <div style={{ ...style.setting.drawerMain }}>
          <div style={{ ...style.setting.drawerIconTitleWrapper }}>
            <img
              title=''
              alt=''
              style={{ ...style.cursorPointer }}
              width='40px'
              src={require('../../Assets/icons/SV_ICONS/Export_Orange.png')}
            />
            <Title
              style={{
                color: `${color.Blue}`,
                padding: '15px 0 0 5px',
                fontSize: 24
              }}>
              {formatMessage(messages['Create Export'])}
            </Title>
          </div>
          <div
            onClick={() => this.Close()}
            style={{ paddingTop: 10, cursor: 'pointer' }}>
            <img
              src={Clear_Gray}
              title='Close'
              alt=''
              onClick={() => this.Close()}
              width={28}
              height={28}
            />
          </div>
        </div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('Select_Export', {
              rules: [
                { required: true, message: 'please select a Export Type' }
              ]
            })(
              <Select
                style={{ width: '100%', height: 40 }}
                placeholder={formatMessage(messages['Select Exports'])}
                showSearch
                optionFilterProp='children'
                allowClear={true}
                // onChange={this.onChangeDropdown}
                onFocus={() =>
                  (!this.props.exportDropDown ||
                    !this.props.exportDropDown.length) &&
                  exportEmail &&
                  this.props.fetchExportDropDown()
                }
                onBlur={this.onBlur}
                onSearch={this.onSearch}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }>
                {this.props.exportDropDown &&
                  this.props.exportDropDown.map(val =>
                    <Option value={val.Value}>{val.DisplayName}</Option>
                  )}
              </Select>
            )} */}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('Task', {
              rules: [
                {
                  required: true,
                  message: formatMessage(messages['Please Enter Task Name'])
                }
              ]
            })(
              <Input
                placeholder={formatMessage(messages['Please Enter Task Name'])}
                allowClear={true}
              />
            )}
          </Form.Item>
          <Form.Item>
            <div>
              {version > 7.2 && (
                <Checkbox
                  checked={applyExclusionList}
                  onChange={() => this.openApplyExclusionList()}>
                  {formatMessage(messages['Apply Exclusion List'])}
                </Checkbox>
              )}
              {/* {applyExclusionList && 
                                <div></div>
                            } */}
              {version > 7.2 && <br />}
              {version > 7.2 && (
                <Checkbox
                  checked={applyAutoRedaction}
                  onChange={() => this.openapplyAutoRedaction()}>
                  {formatMessage(messages['Apply Auto Redaction'])}
                </Checkbox>
              )}
              {applyAutoRedaction &&
                version > 7.2 &&
                getFieldDecorator('Apply_Redaction', {})(
                  <TreeSelect
                    style={{ width: '100%', padding: 0 }}
                    value={SelectRedaction}
                    dropdownStyle={{ maxHeight: 200, overflow: 'auto' }}
                    treeData={redactionData}
                    placeholder={formatMessage(messages['Select Redaction'])}
                    allowClear={true}
                    // onFocus={() => (!this.props.simpleSearch || !this.props.simpleSearch.EmployeeList || !this.props.simpleSearch.EmployeeList.length > 0) && this.props.fetchSimpleSearch()}
                    onChange={e => this.onChangeReduction(e, 'SelectRedaction')}
                    treeCheckable={true}
                    showSearch
                    filterTreeNode={(input, treeNode) =>
                      treeNode.props.title
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  // notFoundContent={(!this.props.simpleSearch || !this.props.simpleSearch.EmployeeList || !this.props.simpleSearch.EmployeeList.length > 0) && <Text>
                  //     <Spin size="small" style={{ marginRight: 15 }} />Fetching Source
                  // </Text>
                  // }
                  />
                  // <Select
                  //     showSearch
                  //     mode="multiple"
                  //     showArrow={true}
                  //     style={{ width: '100%', color: 'black', height: 40 }}
                  //     placeholder={formatMessage(messages["Select Redaction"])}
                  //     onChange={this.onChangeDropdown}
                  //     maxTagCount={0}
                  //     maxTagTextLength={0}
                  //     onClick={(e) => this.onClickHandler(e)}
                  //     onFocus={this.onFocus}
                  //     onBlur={this.onBlur}
                  //     onSearch={this.onSearch}
                  //     filterOption={(input, option) => {
                  //         return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  //     }
                  //     }
                  // // dropdownStyle={{ height: 90, overflowY: 'scroll' }}
                  // >
                  //     <Option value="Credit Card">Credit Card</Option>
                  //     <Option value="SIN" >SIN</Option>
                  //     <Option value="SSN">SSN</Option>
                  // </Select>
                )}

              {version > 7.2 && <br />}
              <Checkbox
                style={{ margin: 0, padding: 0 }}
                checked={requiredPassword}
                onChange={() => this.openrequiredPassword()}>
                {formatMessage(messages['Required Password'])}
              </Checkbox>
              {requiredPassword &&
                getFieldDecorator('password', {
                  rules: [
                    { required: { requiredPassword }, message: 'Please input the password' }
                  ]
                })(<Input style={{ padding: 0 }} type='password' placeholder="Password" allowClear={true} />)}
            </div>
          </Form.Item>
          <Form.Item>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '30px'
              }}>
              <PrimaryButton
                text={formatMessage(messages['Submit'])}
                htmlType='submit'
              />
              <SecondryButton
                text={formatMessage(messages['Cancel'])}
                onClick={() => this.Close()}
              />
            </div>
          </Form.Item>
        </Form>
      </Drawer>
    );
  }
}

const WrappedExport = Form.create({ name: 'forward_Controls' })(Export);

const mapStateToProps = state => {
  return {
    // loaded:state.SimpleSearchReducer.loaded,
    exportDropDown: state.ExportReducer.exportDropDown,
    updatedSearchCriteria: state.UpdateSearchCriteriaReducer.updatedSearchCriteria,
    searchType: state.UpdateSearchCriteriaReducer.searchType,
    searchTypeTree: state.UpdateSearchCriteriaReducer.searchTypeTree,
    simplesearchresult: state.SimpleSearchReducer.simplesearchresult,
    searchedDataLength: state.SimpleSearchReducer.searchedDataLength,
    searchDatatablePageSize: state.UpdateDataTablePageSizeTypes.searchDatatablePageSize,
    smartSearchAccessToken: state.SimpleSearchReducer.smartSearchAccessToken,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchExportDropDown: noMessage => dispatch(fetchExportDropDown()),
    postExportData: data => dispatch(postExportData(data)),
    postExportAdvanceSearchData: APIBody => dispatch(postExportAdvanceSearchData(APIBody)),
    postExportQueryBuilderData: APIBody => dispatch(postExportQueryBuilderData(APIBody)),
    postExportLegalHoldData: APIBody => dispatch(postExportLegalHoldData(APIBody)),
    exportAllSmartSearchDocs: (totalResultSetSize, APIbody, updatedSearchCriteria, pageSize, searchType, smartSearchAccessToken, searchTypeTree, closeReadingPane) => dispatch(exportAllSmartSearchDocs(totalResultSetSize, APIbody, updatedSearchCriteria, pageSize, searchType, smartSearchAccessToken, searchTypeTree, closeReadingPane))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedExport);
