import React, { Component } from 'react';
import { Form, Input, Radio, Typography, Row, Col, Switch, Select, message } from 'antd';
// import FormItem from 'antd/lib/form/FormItem';
import { connect } from 'react-redux';
// import style from '../../../../styles';
import {
  SaveDeletedDocument,
  DeletedDocument,
  fetchDeletedDocumentRunningStatus,
  fetchDeletedDocuments,
  getDeletedDocumentData
} from '../../../../Redux/Actions/Policies/RetentionPolicyAction';
import { defineMessages } from 'react-intl';
import * as ApiInfo from "../../../../APIConfig/ApiParameters";

const messages = defineMessages({
  'As Soon as Retention Period Expires': {
    id: 'Deletion.AsSoonasRetentionPeriodExpires',
    defaultMessage: 'As Soon as Retention Period Expires'
  },
  'Grace Period': {
    id: 'Deletion.GracePeriod',
    defaultMessage: 'Grace Period'
  },
  Days: {
    id: 'Deletion.Days',
    defaultMessage: 'Days'
  },
  Expired: {
    id: 'Deletion.Expired',
    defaultMessage: 'Expired'
  },
  Schedule: {
    id: 'Deletion.Schedule',
    defaultMessage: 'Schedule'
  },
  '(Time in HH:mm format)': {
    id: 'Deletion.TimeinHH:mmformat',
    defaultMessage: '(Time in HH:mm format)'
  },
  HH: {
    id: 'Deletion.HH',
    defaultMessage: 'HH'
  },
  MM: {
    id: 'Deletion.MM',
    defaultMessage: 'MM'
  },
  AM: {
    id: 'Deletion.am',
    defaultMessage: 'AM'
  },
  Enabled: {
    id: 'Deletion.Enabled',
    defaultMessage: 'Enabled'
  }
});

const { Option } = Select;
const Hours = [],
  Am_Pm = [],
  Time = [];
const Am_PmSearch = ['AM', 'PM'];
let hours = [];

for (let i = 0; i < 12; i++) {
  hours.push(i < 10 ? '0' + i : i);
}
for (let i = 0; i < hours.length; i++) {
  Hours.push(<Option key={i} value={hours[i]}> {hours[i]}</Option>);
}
for (let i = 0; i < 60; i++) {
  Time.push(<Option key={i} value={i < 10 ? '0' + i : i}>{i < 10 ? '0' + i : i}</Option>);
}
for (let i = 0; i < Am_PmSearch.length; i++) {
  Am_Pm.push(<Option key={i} value={Am_PmSearch[i]}>{Am_PmSearch[i]}</Option>);
}

const { Text } = Typography;

class Deletion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changePeriodValue: "R",
      gracePeriod: false,
      flag: true,
      gracePeriodValue: 'Days',
      hours: '00',
      minutes: '01',
      TimeZone: 'AM'
    };
    message.destroy()
  }
  static getDerivedStateFromProps(props, state) {
    props.getDeletionData(state);
    !props.deleteddocument && props.fetchDeletedDocuments();
    if (props.deleteddocument && props.deleteddocument.length > 0 && props.deleteddocument[0] && props.deleteddocument[0].JOB_OBJECT && state.flag) {
      let parseJobObject;
      try {
        parseJobObject = JSON.parse(props.deleteddocument[0].JOB_OBJECT);
        return {
          changePeriodValue: parseJobObject.changePeriodValue,
          gracePeriodValue: parseJobObject.gracePeriodValue,
          gracePeriod: parseJobObject.gracePeriod === 'true' ? true : false,
          hours: parseJobObject.hours,
          minutes: parseJobObject.minutes,
          TimeZone: parseJobObject.TimeZone,
          check: parseJobObject.Enable === 'true' ? true : false,
          Days: parseJobObject.day,
          flag: false
        };
      } catch (e) {
        ApiInfo.DEBUGER && console.log(e)
      }
    }
    return {};
  }
  changePeriod = e => {
    this.setState({
      gracePeriod: !this.state.gracePeriod,
      changePeriodValue: e.target.value,
      // Days: 100,
      gracePeriodValue: 'Days'
    })
  };
  changeGracePeriod = e => {
    e.target.value === 'Days' ?
      this.setState({
        gracePeriodValue: e.target.value
      })
      : this.setState({
        gracePeriodValue: e.target.value,
        // Days: ''
      });
  };
  hours = e => {
    this.setState({
      hours: e
    });
  };
  minutes = e => {
    this.setState({
      minutes: e
    });
  };
  timeZone = val => {
    this.setState({
      TimeZone: val
    });
  };
  checkChange = check => {
    this.setState({
      check: check
    });
  };
  changeDays = e => {
    const { gracePeriodValue } = this.state;
    this.setState({
      [gracePeriodValue]: e.target.value
    });
  };
  componentDidMount() {
    // this.props.fetchDeletedDocumentRunningStatus();
  }

  render() {
    // const { getFieldDecorator } = this.props.form;
    const { getFieldDecorator } = this.props.form;
    const { formatMessage } = this.props;
    const { gracePeriod, gracePeriodValue, changePeriodValue } = this.state;
    this.props.getDeletedDocumentData(this.state);

    return (
      <div /*style={{ ...style.padding10 }}*/ style={{paddingTop:10}}>

        <Form layout="inline">
          <Radio.Group onChange={this.changePeriod} value={changePeriodValue}>
            <Row>
              <Col span={8} push={8}>
                <Radio value={'R'}>
                  {formatMessage(messages['As Soon as Retention Period Expires'])}
                </Radio>
                <Radio value={'P'}>
                  {formatMessage(messages['Grace Period'])}
                </Radio>
              </Col>

              {changePeriodValue === 'P' &&
                <Col span={4} push={6} style={{ paddingTop: 25 }}>
                  <Radio.Group
                    onChange={this.changeGracePeriod}
                    // defaultValue={gracePeriodValue}
                    value={gracePeriodValue}
                    disabled={!gracePeriod}>
                    <Row>
                      <Col span={2} pull={0}>
                        <Radio value={'Days'}>
                          <Form.Item>
                            {getFieldDecorator('Grace_Period_Days', {
                              initialValue: 1
                            })(
                              <Input
                                disabled={gracePeriodValue === 'Expired'}
                                defaultValue={1}
                                style={{ height: 30, width: 80 }}
                                type='number'
                                onChange={e => this.changeDays(e)}
                                // allowClear={true}
                                onBlur={e => {
                                  const { form } = this.props;
                                  if (e.target.value < 1 || e.target.value === "" || e.target.value === null) {
                                    form.setFieldsValue({
                                      Grace_Period_Days: 1
                                    })
                                  } else {
                                    if (e.target.value > 365) {
                                      form.setFieldsValue({
                                        Grace_Period_Days: 365
                                      })
                                    }
                                  }
                                }} min={1} max={365} />
                            )}

                            <Text style={{ marginLeft: '10px' }}>
                              {formatMessage(messages['Days'])}
                            </Text>

                          </Form.Item>
                        </Radio>
                      </Col>

                      <Col span={4} push={22} style={{ paddingLeft: 30 }}>
                        <Radio value={'Expired'}>
                          <Form.Item>
                            <Text>{formatMessage(messages['Expired'])}</Text>
                          </Form.Item>
                        </Radio>
                      </Col>

                    </Row>
                  </Radio.Group>
                </Col>
              }
            </Row>




            <Row style={{ paddingTop: 20 }}>
              <Col span={8} push={1}>
                <Text>{formatMessage(messages['Schedule'])}:</Text>
                <Text
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    fontSize: 10,
                    marginTop: 0
                  }}>
                  {formatMessage(messages['(Time in HH:mm format)'])}
                </Text>
              </Col>
              <Col span={8}>
                <Select
                  placeholder={formatMessage(messages['HH'])}
                  style={{ width: 100 }}
                  onChange={e => this.hours(e)}
                  onFocus={this.onFocus}
                  onBlur={this.onBlur}
                  onSearch={this.onSearch}
                  defaultValue={this.state.hours}
                  value={this.state.hours}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }>
                  {Hours}
                </Select>
                <Text style={{ marginLeft: 13 }}>:</Text>
              </Col>
              <Col span={8} pull={3} style={{ display: 'flex' }}>
                <Select
                  placeholder={formatMessage(messages['MM'])}
                  style={{ width: 200 }}
                  onChange={e => this.minutes(e)}
                  onFocus={this.onFocus}
                  onBlur={this.onBlur}
                  onSearch={this.onSearch}
                  defaultValue={this.state.minutes}
                  value={this.state.minutes}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }>
                  {Time}
                </Select>
                <Select
                  placeholder={formatMessage(messages['AM'])}
                  style={{ width: 200, paddingLeft: 20 }}
                  onChange={e => this.timeZone(e)}
                  onFocus={this.onFocus}
                  onBlur={this.onBlur}
                  onSearch={this.onSearch}
                  defaultValue={this.state.TimeZone}
                  value={this.state.TimeZone}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }>
                  {Am_Pm}
                </Select>
              </Col>
            </Row>

            <Row style={{ paddingTop: 10 }}>
              <Col span={8} push={8} style={{ display: 'flex', paddingTop: 8 }}>
                <Switch
                  checked={this.state.check}
                  onChange={val => this.checkChange(val)}></Switch>
              </Col>
              <Col span={8} push={2} style={{ display: 'flex', paddingTop: 8 }}>
                <Text>{formatMessage(messages['Enabled'])}</Text>
              </Col>
            </Row>

          </Radio.Group>

        </Form>
      </div>
    );
  }
}
const WrapperDeletionForm = Form.create('Deletion')(Deletion);

const mapStateToProps = state => {
  return {
    deleteddocument: state.RetentionPolicyReducer.deleteddocument,
    deleteddocumentrunning: state.RetentionPolicyReducer.deleteddocumentrunning
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDeletedDocumentData: data => dispatch(getDeletedDocumentData(data)),
    SaveDeletedDocument: data => dispatch(SaveDeletedDocument(data)),
    DeletedDocument: data => dispatch(DeletedDocument(data)),
    fetchDeletedDocuments: () => dispatch(fetchDeletedDocuments()),
    fetchDeletedDocumentRunningStatus: () => dispatch(fetchDeletedDocumentRunningStatus())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WrapperDeletionForm);