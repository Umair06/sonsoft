import React, { Component } from 'react';
import {
  Drawer,
  Form,
  Input,
  Checkbox,
  Typography,
  Button,
  Icon,
  Tree, message
} from 'antd';
import { PrimaryButton, SecondryButton } from '../Button/Button';
import AdvanceSearch from '../../Components/AdvanceSearch/AdvanceSearch';
import Clear_Gray from '../../Assets/icons/SV_ICONS/Clear_Gray.png';
import { defineMessages } from 'react-intl';
import { connect } from 'react-redux';
import {
  insertRetention,
  updateRetention,
  updateDefaultRetention
} from '../../Redux/Actions/Policies/RetentionPolicyAction';
import style from '../../styles';
import RetentionIcon from '../../Assets/icons/SV_ICONS/Retention Policy_Blue.png';
import { updateSearchCriteria, updateAdvanceSearch } from "../../Redux/Actions/UpdateSearchCriteriaAction/UpdateSearchCriteriaAction";
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import * as ApiInfo from "../../APIConfig/ApiParameters";

const messages = defineMessages({
  'couldNot Save SomeThing Went': {
    id: 'Retention.couldNotSaveSomeThingWent',
    defaultMessage: 'couldNot Save SomeThing Went'
  },
  'Edit Retention Policy': {
    id: 'Retention.EditRetentionPolicy',
    defaultMessage: 'Edit Retention Policy'
  },
  'Add Retention Policy': {
    id: 'Retention.AddRetentionPolicy',
    defaultMessage: 'Add Retention Policy'
  },
  'Policy Name: ': {
    id: 'Retention.PolicyName',
    defaultMessage: 'Policy Name: '
  },
  'Please enter policy name': {
    id: 'Retention.PleaseEnterPolicyName',
    defaultMessage: 'Please enter policy name'
  },
  'Retention Period: ': {
    id: 'Retention.RetentionPeriod',
    defaultMessage: 'Retention Period: '
  },
  'Please enter Retention Period': {
    id: 'Retention.PleaseEnterRetentionPeriod',
    defaultMessage: 'Please enter Retention Period'
  },
  'Retention Grace Period: ': {
    id: 'Retention.RetentionGracePeriod',
    defaultMessage: 'Retention Grace Period: '
  },
  'Please enter Retention Grace Period': {
    id: 'Retention.PleaseEnterRetentionGracePeriod',
    defaultMessage: 'Please enter Retention Grace Period'
  },
  'Please enter Active': {
    id: 'Retention.PleaseEnterActive',
    defaultMessage: 'Please enter Active'
  },
  'Active: ': {
    id: 'Retention.Active',
    defaultMessage: 'Active: '
  },
  'Search Criteria': {
    id: 'Retention.SearchCriteria',
    defaultMessage: 'Search Criteria'
  },
  'Please submit': {
    id: 'Retention.PleaseSubmit',
    defaultMessage: 'Please submit'
  },
  Save: {
    id: 'Retention.Save',
    defaultMessage: 'Save'
  }
});

const { Title, Text, Paragraph } = Typography;
const { TreeNode } = Tree;

class Retention extends Component {
  constructor(props) {
    super(props);
    this.state = {
      priority: this.props.values ? this.props.values.priority : '',
      retentionPeriod: this.props.values ? this.props.values.retentionPeriod : '',
      retentionGracePeriod: this.props.values ? this.props.values.retentionGracePeriod : '',
      status: this.props.values ? this.props.values.status : '',
      name: this.props.values ? this.props.values.name : '',
      visible: false,
      childrenDrawer: false,
      advanceSearchCriteria: [
        { title: 'Date', key: 'Employees', children: [] },
        { title: 'Types', key: 'Types', children: [] },
        // { title: "Labels", key: "Labels", children: [] },
        {
          title: 'Any of these terms',
          key: 'Any of these terms',
          children: []
        },
        {
          title: 'All of these terms',
          key: 'All of these terms',
          children: []
        },
        { title: 'Metadata Search', key: 'Metadata Search', children: [] }
      ],
      defaultDisabled: false,
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (props.values && props.openAddForm && props.values.FILTER_ID === 1 && !props.values.IS_ACTIVE && !state.fetchedIsActive) {
      props.form.setFieldsValue({ Retention_Grace_Period: props.values.RETENTION_GRACE_PERIOD, Retention_Period: props.values.RETENTION_PERIOD })
      return { defaultDisabled: true, fetchedIsActive: true }
    }
    else if (props.values && props.openAddForm && props.values.FILTER_ID === 1 && props.values.IS_ACTIVE && !state.fetchedIsActive) {
      return { defaultDisabled: false, fetchedIsActive: true }
    }
    else if (props.values && props.values.FILTER_ID > 1 && props.openAddForm) {
      return { defaultDisabled: false }
    }
    return null;
  }

  onChange = e => {
    try {
      this.setState({
        [e.target.name]: e.target.value
      });
    } catch (e) { }
  };

  openDrawer = isDrawerOpen => {
    this.setState({
      [isDrawerOpen]: true
    });

  };

  closeDrawer = isDrawerOpen => {
    this.setState({
      [isDrawerOpen]: false
    });
  };
  Close = () => {
    try {
      this.props.close();
      this.props.form.resetFields();
      let resetAdvanceSearchFields = {
        dateRange: 2,
        allSearch: undefined,
        anySearch: undefined,
        noneSearch: undefined,
        allTerm: undefined,
        anyTerm: undefined,
        noneTerm: undefined,
        anyOfThese: ['message_body', 'subject', 'attachment.data.content'],
        noneOfThese: ['message_body', 'subject', 'attachment.data.content'],
        allOfThese: ['message_body', 'subject', 'attachment.data.content'],
        allTermsType: undefined,
        anyTermsType: undefined,
        noneTermsType: undefined,
        type: undefined,
        yearToRange: undefined,
        dayToRange: undefined,
        monthToRange: undefined,
        yearFromRange: undefined,
        dayFromRange: undefined,
        monthFromRange: undefined,
        metadataRows: [{}],
        resetForm: true,
      }

      this.props.updateSearchCriteria(resetAdvanceSearchFields, 2)
      // const defaultState = {
      //   dateFilter: 2,
      //   allTerms: undefined,
      //   anyTerms: undefined,
      //   noneTerms: undefined,
      //   filterType: undefined,
      //   yearToRange: undefined,
      //   dayToRange: undefined,
      //   monthToRange: undefined,
      //   yearFromRange: undefined,
      //   dayFromRange: undefined,
      //   monthFromRange: undefined,
      //   anyTermsType: ['message_body', 'subject', 'attachment.data.content'],
      //   noneTermsType: ['message_body', 'subject', 'attachment.data.content'],
      //   allTermsType: ['message_body', 'subject', 'attachment.data.content'],
      //   toDate: undefined,
      //   metadataRows: undefined,
      //   resetForm: undefined,
      //   displaymetadataQuary: undefined,
      //   Metadata: [{}]
      // }
      this.setState({
        advanceSearchCriteria: [
          { title: 'Date', key: 'Employees', children: [] },
          { title: 'Types', key: 'Types', children: [] },
          // { title: "Labels", key: "Labels", children: [] },
          {
            title: 'Any of these terms',
            key: 'Any of these terms',
            children: []
          },
          {
            title: 'All of these terms',
            key: 'All of these terms',
            children: []
          },
          { title: 'Metadata Search', key: 'Metadata Search', children: [] }
        ],
        searchCriteriaQuery: "",
        defaultDisabled: false,
        fetchedIsActive: false,
      })

    } catch (e) { ApiInfo.DEBUGER && console.log(e.message) }
  };

  handleSubmit = e => {
    e.preventDefault();
    try {
      const { values } = this.props;
      const { searchCriteriaQuery } = this.state;
      this.props.form.validateFieldsAndScroll((err, data) => {
        if (!err &&
          (searchCriteriaQuery || ((!values && searchCriteriaQuery) || (values && values.FILTER_ID === 1))) &&
          ((!values && searchCriteriaQuery) || values.FILTER_ID >= 1)) {
          data.query = searchCriteriaQuery || '';
          data.policyId = (values && values.FILTER_ID) || '';
          data.Active = data.Active === false || data.Active === 'False' ? 0
            : data.Active === true || data.Active === 'True' ? 1 : data.Active;
          if (values) {
            if (values.FILTER_ID === 1) {
              this.props.updateDefaultRetention(data)
            } else {
              this.props.updateRetention(data);
            }
          } else {
            this.props.insertRetention(data);
          }
          this.Close();
        } else {
          !searchCriteriaQuery && message.warning("please specify a search criteria")
        }
      });
    } catch (e) { ApiInfo.DEBUGER && console.log(e.message) }
  };

  //this function took Criteria data from values and setstate of advanceSearchCriteria which is render the Criteria on UI
  handleEditEvent = (values) => {
    const TransformDataAsGenerateTreeRequired = JSON.parse(values.FILTER_QUERY)
    this.props.openAddForm && !this.state.advanceSearchCriteria[0].children.length && this.genrateTreeData(TransformDataAsGenerateTreeRequired);
  }


  genrateTreeData = query => {
    //const { formatMessage } = this.props;
    let advanceSearchCriteria = [
      { title: "Date", key: "0", children: [] },
      { title: "Types", key: "1", children: [] },
      { title: "labels", key: "2", children: [] },
      { title: "Contains any of these terms", key: "3", children: [] },
      { title: "Contains all of these terms", key: "4", children: [] },
      { title: "Contains none of these terms", key: "5", children: [] },
      { title: "Metadata Search", key: "6", children: [] },
    ]
    let dateLabel;
    let toDate;
    let fromDate;
    let date;
    try {
      if (query.toDate.length > 0 && query.fromDate.length > 0 && query.fromDate !== query.toDate) {
        dateLabel = [];
        toDate = query.toDate;
        fromDate = query.fromDate;
      } else {
        if (query.toDate.length > 0 && query.fromDate.length > 0 && query.fromDate === query.toDate) {
          dateLabel = 'Equals: ';
          date = query.toDate;
        } else {
          if (query.toDate.length > 0 && query.fromDate.length === 0) {
            dateLabel = 'Before: ';
            date = query.toDate;
          } else {
            if (query.toDate.length === 0 && query.fromDate.length > 0) {
              dateLabel = 'After: ';
              date = query.fromDate;
            } else {
              if (query.toDate.length === 0 && query.fromDate.length === 0) {
                dateLabel = 'Any Date';
                date = '';
              }
            }
          }
        }
      }
      if (dateLabel && Array.isArray(dateLabel)) {
        let dateRangeFrom = {
          title: `From: ${fromDate}`,
          key: `From: ${fromDate}`
        };

        let dateRangeTo = {
          title: `To: ${toDate}`,
          key: `To: ${toDate}`
        };
        advanceSearchCriteria[0].children.push(dateRangeFrom);
        advanceSearchCriteria[0].children.push(dateRangeTo);
      } else {
        let dateType = {
          title: `${dateLabel}${date}`,
          key: `${dateLabel}${date}`
        };
        advanceSearchCriteria[0].children.push(dateType);
      }

      query.filterType &&
        Array.isArray(query.filterType) &&
        query.filterType.length > 0 &&
        query.filterType.map((labelType, index) => {
          let child = {
            title: labelType,
            key: labelType
          };
          return advanceSearchCriteria[1].children.push(child);
        });

        if (query.labelName && query.labelName.length > 0) {
          try {
            let child
            query.labelName.forEach((title, i) => {
              //I'm getting the title like this "G-270-cf559b-Powerfull" I just want its name last Index so I do this.
              const length = title.split('-').length
              child = { title: title.split('-')[length - 1] }
              advanceSearchCriteria[2].children.push(child)
            })
          } catch (e) {
            ApiInfo.DEBUGER && console.log(e)
          }
        } else {
          try {
            let child = {
              title: "Any label",
              key: "2"
            }
            advanceSearchCriteria[2].children.push(child)
          } catch (e) {
            ApiInfo.DEBUGER && console.log("error", e)
          }
        }

      query.anyTerms &&
        Array.isArray(query.anyTerms) &&
        query.anyTerms.length > 0 &&
        query.anyTerms.map((term, index) => {
          let child = {
            title: term,
            key: index
          };
          return advanceSearchCriteria[3].children.push(child);
        });


      if (query.anyTerms && Array.isArray(query.anyTerms) && query.anyTerms.length > 0) {
        let anyCheckBoxesValue = ""
        query.anyTermsType && Array.isArray(query.anyTermsType) && query.anyTermsType.length > 0 && query.anyTermsType.map(field => {
          return (
            anyCheckBoxesValue = anyCheckBoxesValue + "," + (field === "message_body" ? "body" : field === "attachment.data.content" ? "attachment" : field)
            // anyCheckBoxes = anyCheckBoxes + "," + (field.length === 12 ? field.slice(8) : field)
          )
        })
        let anyFieldCriteria = {
          title: `(${anyCheckBoxesValue.slice(1)})`,
          key: anyCheckBoxesValue
        }
        try {
          advanceSearchCriteria[3].children.push(anyFieldCriteria)
        } catch (e) {
          ApiInfo.DEBUGER && console.log(e)
        }
      }


      query.allTerms &&
        Array.isArray(query.allTerms) &&
        query.allTerms.length > 0 &&
        query.allTerms.map((term, index) => {
          let child = {
            title: term,
            key: index
          };
          return advanceSearchCriteria[4].children.push(child);
        });


      if (query.allTerms && Array.isArray(query.allTerms) && query.allTerms.length > 0) {
        let anyCheckBoxesValue = ""
        query.allTermsType && Array.isArray(query.allTermsType) && query.allTermsType.length > 0 && query.allTermsType.map(field => {
          return (
            anyCheckBoxesValue = anyCheckBoxesValue + "," + (field === "message_body" ? "message_body" : field === "attachment.data.content" ? ".data.content" : field)
            // anyCheckBoxes = anyCheckBoxes + "," + (field.length === 12 ? field.slice(8) : field)
          )
        })
        let anyFieldCriteria = {
          title: `(${anyCheckBoxesValue.slice(1)})`,
          key: anyCheckBoxesValue
        }
        try {
          advanceSearchCriteria[4].children.push(anyFieldCriteria)
        } catch (e) {
          ApiInfo.DEBUGER && console.log(e)
        }
      }

      query.noneTerms &&
        Array.isArray(query.noneTerms) &&
        query.noneTerms.length > 0 &&
        query.noneTerms.map((term, index) => {
          let child = {
            title: term,
            key: index
          };
          return advanceSearchCriteria[5].children.push(child);
        });

      if (query.noneTerms && Array.isArray(query.noneTerms) && query.noneTerms.length > 0) {

        let anyCheckBoxesValue = ""
        query.noneTermsType && Array.isArray(query.noneTermsType) && query.noneTermsType.length > 0 && query.noneTermsType.map(field => {
          return (
            anyCheckBoxesValue = anyCheckBoxesValue + "," + (field === "message_body" ? "body" : field === "attachment.data.content" ? "attachment" : field)
            // anyCheckBoxes = anyCheckBoxes + "," + (field.length === 12 ? field.slice(8) : field)
          )
        })
        let anyFieldCriteria = {
          title: `(${anyCheckBoxesValue.slice(1)})`,
          key: anyCheckBoxesValue
        }
        try {
          advanceSearchCriteria[5].children.push(anyFieldCriteria)
        } catch (e) {
          ApiInfo.DEBUGER && console.log(e)
        }
      }

      if (query.Metadata) {
        let child = {
          title: query.Metadata,
          key: 'Metadata'
        };
        advanceSearchCriteria[6].children.push(child);
      }
    } catch (e) { }
    this.props.updateAdvanceSearch(advanceSearchCriteria, 2)
    this.setState({
      advanceSearchCriteria
    });
  };

  getSearchCriteriaQuery = (query, data) => {
    this.setState({
      searchCriteriaQuery: query
    });
    this.genrateTreeData(query);
  };

  renderTreeNodesSearchCriteria = data => {
    try {
      return data && data.map((item, index) => {
        if (item.children) {
          return (
            <TreeNode
              selectable={false}
              key={item.key}
              title={
                <Paragraph>
                  <Text>{item.title.slice(0, 20)}</Text>
                </Paragraph>
              }
              icon={item.icon ? <Icon type={item.icon} /> : false}
              checkable={false}
              isLeaf={false}
              disabled={item.disabled || false}
              dataRef={item}>
              {this.renderTreeNodesSearchCriteria(item.children)}
            </TreeNode>
          );
        }
        return (
          <TreeNode
            selectable={false}
            title={
              <Paragraph title={item.title}>
                <Text
                  style={
                    item.color
                      ? { backgroundColor: item.color, color: '#fff' }
                      : {
                        color: 'inherit',
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap'
                      }
                  }>
                  {item.title && item.title.length > 23
                    ? item.title.slice(0, 23) + '...'
                    : item.title}
                </Text>
              </Paragraph>
            }
            checkable={false}
            key={item.key}
            dataRef={item}
          />
        );
      });
    } catch (e) { }
  }

  openDrawerAndInsertTheValueInAdvaceSearch = (advanceSearchFieldValue, searchCriteria) => {
    advanceSearchFieldValue = JSON.parse(advanceSearchFieldValue)
    this.props.updateSearchCriteria(advanceSearchFieldValue, 2)
    this.openDrawer(searchCriteria)
  }


  handleActiveCheckbox = e => {
    try {
      if (e.target && e.target.checked) {
        this.setState({ defaultDisabled: false })
      } else {
        this.setState({ defaultDisabled: true })
        this.props.form.setFieldsValue({ Retention_Grace_Period: this.props.values.RETENTION_GRACE_PERIOD, Retention_Period: this.props.values.RETENTION_PERIOD })
      }
    } catch (e) { }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { values, openAddForm, formatMessage } = this.props;
    const { /*retentionPeriod, retentionGracePeriod, status, name, advanceSearchCriteria, searchCriteriaQuery,*/ searchCriteria } = this.state;
    return (
      <div>
        <Drawer
          width={400}
          visible={openAddForm}
          closable={false}
          bodyStyle={{ overflowY: 'auto' }}
          onClose={() => this.Close()}
          maskStyle={{ backgroundColor: 'transparent' }}>
          <div style={{ ...style.setting.drawerMain }}>
            <div style={{ ...style.setting.drawerIconTitleWrapper }}>
              <img
                title='Retention'
                src={RetentionIcon}
                alt=''
                style={{ ...style.setting.drawerIcons }}></img>
              <Title style={{ ...style.setting.drawerTitles }}>
                {values ? formatMessage(messages['Edit Retention Policy']) : formatMessage(messages['Add Retention Policy'])}
              </Title>
            </div>
            <div
              onClick={() => this.Close()}
              style={{ paddingTop: 10, cursor: 'pointer' }}>
              <img
                src={Clear_Gray}
                title='Close'
                alt=''
                onClick={() => this.props.close()}
                width={28}
                height={28}
              />

            </div>
          </div>

          <AdvanceSearch
            visible={openAddForm}
            formatMessage={formatMessage}
            searchCriteria={searchCriteria}
            query={values && values.FILTER_QUERY}
            getSearchCriteriaQuery={(query, data) => this.getSearchCriteriaQuery(query, data)}
            close={() => this.closeDrawer('searchCriteria')}
          />
          <ErrorBoundary>
            <Form layout='vertical' onSubmit={this.handleSubmit}>
              <Form.Item label={formatMessage(messages['Policy Name: '])}>
                {getFieldDecorator('Policy_Name', {
                  initialValue: values && values.FILTER_NAME,
                  rules: [
                    {
                      required: true,
                      message: formatMessage(messages['Please enter policy name'])
                    }
                  ]
                })(<Input disabled={values && values.FILTER_ID === 1} />)}
              </Form.Item>

              <Form.Item
                style={{ ...style.formItemBetweenGap }}
                label={formatMessage(messages['Retention Period: '])}>
                {getFieldDecorator('Retention_Period', {
                  initialValue: values && values.RETENTION_PERIOD,
                  rules: [
                    {
                      required: true,
                      message: formatMessage(
                        messages['Please enter Retention Period']
                      )
                    }
                  ]
                })(<Input disabled={this.state.defaultDisabled} type='number' allowClear={true} onBlur={e => {
                  const { form } = this.props;
                  if (e.target.value < 1 && e.target.value !== "" && e.target.value !== null) {
                    form.setFieldsValue({
                      Retention_Period: 1
                    })
                  } else {
                    if (e.target.value > 7300) {
                      form.setFieldsValue({
                        Retention_Period: 7300
                      })
                    }
                  }
                }} min={1} max={7300} />)}
              </Form.Item>
              <Form.Item
                style={{ ...style.formItemBetweenGap }}
                label={formatMessage(messages['Retention Grace Period: '])}>
                {getFieldDecorator('Retention_Grace_Period', {
                  initialValue: values && values.RETENTION_GRACE_PERIOD,
                  rules: [
                    {
                      required: true,
                      message: formatMessage(
                        messages['Please enter Retention Grace Period']
                      )
                    }
                  ]
                })(<Input disabled={this.state.defaultDisabled} type='number' allowClear={true} onBlur={e => {
                  const { form } = this.props;
                  if (e.target.value < 1 && e.target.value !== "" && e.target.value !== null) {
                    form.setFieldsValue({
                      Retention_Grace_Period: 1
                    })
                  } else {
                    if (e.target.value > 365) {
                      form.setFieldsValue({
                        Retention_Grace_Period: 365
                      })
                    }
                  }
                }} min={1} max={365} />)}
              </Form.Item>
              <Form.Item style={{ ...style.formItemBetweenGap, marginBottom: 0 }}>
                <Text style={{ paddingRight: 10, margin: 0 }}>
                  {formatMessage(messages['Active: '])}
                </Text>
                {getFieldDecorator('Active', {
                  valuePropName: 'checked',
                  initialValue: values && values.IS_ACTIVE
                  // rules: [{ required: false, message: formatMessage(messages["Please enter Active"]) }],
                })(<Checkbox onChange={values && values.FILTER_ID === 1 && (e => this.handleActiveCheckbox(e))} />)}
              </Form.Item>
              {/* ye edit ma chal raha ha */}
              {
                values && values.FILTER_ID === 1 ? null
                  : (
                    <Form.Item style={{ ...style.formItemBetweenGap, margin: 0 }}>
                      <div style={{}}>
                        <Button
                          style={{
                            border: 'none',
                            width: 'auto',
                            padding: 0,
                            margin: 0
                          }}
                          onClick={() => !values ? this.openDrawer('searchCriteria') :
                            this.openDrawerAndInsertTheValueInAdvaceSearch(values.FILTER_QUERY, 'searchCriteria')}
                          type='link'>
                          {formatMessage(messages['Search Criteria'])}
                          <Icon type='edit' />
                        </Button>
                      </div>
                      {/* {getFieldDecorator('Saved Criteria', {
                    rules: [{ required: false, message: '' }]
                   })} */}
                    </Form.Item>
                  )}
              {/* ye edit ma chal raha ha */}
              {(
                <Form.Item label=''>
                  {getFieldDecorator('Saved Criteria', {
                    rules: [{ required: false, message: '' }]
                  })(
                    <div>
                      <ErrorBoundary>
                        {<Tree
                          style={{ padding: 0 }}
                          defaultExpandAll={true}
                          autoExpandParent={true}
                          checkable={true}>
                          {
                            this.state.searchCriteriaQuery ? ((!values || values.FILTER_ID !== 1) ?
                              this.renderTreeNodesSearchCriteria(this.props.updatedAdvanceSearch) : null)

                              : (values ? values.FILTER_ID !== 1 ? (this.handleEditEvent(values), this.renderTreeNodesSearchCriteria(this.props.updatedAdvanceSearch))
                                : null : null)
                          }
                        </Tree>}
                      </ErrorBoundary>
                    </div>
                    // </CollapseableHeader>
                  )}
                </Form.Item>
              )}
              <Form.Item
                style={{
                  ...style.formItemBetweenGap,
                  marginTop: values && values.FILTER_ID === 1 ? 15 : 0
                }}>
                {getFieldDecorator('submit', {
                  rules: [
                    {
                      required: false,
                      message: formatMessage(messages['Please submit'])
                    }
                  ]
                })(
                  <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                    <PrimaryButton htmlType="submit" text={formatMessage(messages['Save'])} />
                    <SecondryButton text='Cancel' onClick={() => this.Close()} />
                  </div>
                )}
              </Form.Item>
            </Form>
          </ErrorBoundary>
        </Drawer>
      </div >
    );
  }
}

const wrappedRetentionForm = Form.create('Retention')(Retention);

const mapStateToProps = state => {
  return {
    retentionbyid: state.RetentionPolicyReducer.retentionbyid,
    advancedquery: state.AdvancedSearchReducer.advancedquery,
    updatedSearchCriteria: state.UpdateSearchCriteriaReducer.updatedSearchCriteria,
    updatedAdvanceSearch: state.UpdateSearchCriteriaReducer.updatedAdvanceSearch
  };
};

const mapDispatchToProps = dispatch => {
  return {
    insertRetention: data => dispatch(insertRetention(data)),
    updateRetention: data => dispatch(updateRetention(data)),
    updateDefaultRetention: (data) => dispatch(updateDefaultRetention(data)),
    updateSearchCriteria: (searchedData, searchType, searchTypeTree) => dispatch(updateSearchCriteria(searchedData, searchType, searchTypeTree)),
    updateAdvanceSearch: (data) => dispatch(updateAdvanceSearch(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(wrappedRetentionForm);
