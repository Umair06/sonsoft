import React, { Component } from 'react';
import { Form, Select, Radio, Row, Collapse } from "antd";
import { defineMessages } from 'react-intl';
import { PrimaryButton, SecondryButton } from "../../../Components/Button/Button"
import theme from "../../../Assets/Theme/Theme";
const { Panel } = Collapse;
const { color } = theme;

class EmailStatistic extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dateRange: 2,
      dateFromRange: undefined,
      dateToRange: undefined,
      monthFromRange1: undefined,
      monthToRange1: undefined,
      monthFromRange2: undefined,
      monthToRange2: undefined,
      dayFromRange: undefined,
      dayToRange: undefined,
      yearFromRange: undefined,
      yearToRange: undefined,
      value: 1,
      disableDate: false,
      disableMonth: true
    }
  }
  onChangeRadio = e => {
    if(!isNaN(e.target.value) && Number(e.target.value) === 1) {
      this.setState({
        disableDate: false,
        disableMonth: true,
        value: e.target.value
      })
    }
    else if(!isNaN(e.target.value) && Number(e.target.value) === 2) {
      this.setState({
        disableDate: true,
        disableMonth: false,
        value: e.target.value
      })
    }
    else {
      this.setState({
        value: e.target.value
      });
    }
  };
  handleChangeDate1 = (value) => {
    this.setState({ dateRange1: value })
  }
  handleChangeDate2 = (value) => {
    this.setState({ dateRange2: value })
  }
  handleChangeFromMonth1 = (value) => {
    this.setState({ monthFromRange1: value })
  }
  handleChangeToMonth1 = (value) => {
    this.setState({ monthToRange1: value })
  }
  handleChangeFromMonth2 = (value) => {
    this.setState({ monthFromRange2: value })
  }
  handleChangeToMonth2 = (value) => {
    this.setState({ monthToRange2: value })
  }
  handleChangeFromDay = (value) => {
    this.setState({ dayFromRange: value })
  }
  handleChangeToDay = (value) => {
    this.setState({ dayToRange: value })
  }
  handleChangeFromYear = (value) => {
    this.setState({ yearFromRange: value })
  }
  handleChangeToYear = (value) => {
    this.setState({ yearToRange: value })
  }
  onSearch = (val) => {
    this.setState({ search: val })
  }
  handleReset = () => {
    this.setState({
      dateFromRange: undefined,
      dateToRange: undefined,
      monthFromRange1: undefined,
      monthToRange1: undefined,
      monthFromRange2: undefined,
      monthToRange2: undefined,
      dayFromRange: undefined,
      dayToRange: undefined,
      yearFromRange: undefined,
      yearToRange: undefined,
      value: 1,
      disableMonth: true,
      disableDate: false
    })
  }
  render() {
    const { Option } = Select;
    const date = [], startMonth = [], startDay = [], startYear = [];
    const dateSearch = ['Any date', 'Date before', 'Date after', 'Date between', 'Date equals'];
    const monthSearch = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
    const yearSearch = ['2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009', '2008', '2007', '2006', '2005', '2004', '2003', '2002', '2001', '2000', '1999', '1998', '1997', '1996'];

    for (let i = 0; i < dateSearch.length; i++) {
      date.push(<Option key={i} value={i}>{dateSearch[i]}</Option>);
    }
    for (let i = 1; i <= 31; i++) {
      startDay.push(<Option key={i < 10 ? "0" + i : i} value={i < 10 ? "0" + i : i}>{i < 10 ? "0" + i : i}</Option>);
    }
    for (let i = 0; i < monthSearch.length; i++) {
      startMonth.push(<Option key={i < 9 ? "0" + (i + 1) : i + 1} value={i < 9 ? "0" + (i + 1) : i + 1}>{monthSearch[i]}</Option>);
    }
    for (let i = 0; i < yearSearch.length; i++) {
      startYear.push(<Option key={i} value={yearSearch[i]}>{yearSearch[i]}</Option>);
    }

    const radioStyle = {
      display: 'block',
      height: '60px',
      lineHeight: '30px'
    };
    const messages = defineMessages({
      'Submit': {
        id: "AdvanceSearch.Submit",
        defaultMessage: "Submit"
      },
      'Cancel': {
        id: "AdvanceSearch.Cancel",
        defaultMessage: "Cancel"
      },
      'MM': {
        id: "AdvanceSearch.MM",
        defaultMessage: "MM"
      },
      'DD': {
        id: "AdvanceSearch.DD",
        defaultMessage: "DD"
      },
      'YYYY': {
        id: "AdvanceSearch.YYYY",
        defaultMessage: "YYYY"
      },
    })
    const { formatMessage } = this.props;

    return (
      <div style={{ marginTop: "10%" }}>
        <Collapse bordered={false} defaultActiveKey={['1']} >
          <Panel header="Search Criteria" key="1" style={{ marginLeft: "10%", color: `${color.Blue}`, fontSize: "20px", border: 0 }} >
            <Form style={{ marginLeft: "5%" }}>
              <Form.Item>
                <Radio.Group onChange={this.onChangeRadio} value={this.state.value} style={{ width: "100%" }}>
                  <Row style={{ display: "flex" }} >
                    <Radio style={radioStyle} value={1}>
                      By Date:</Radio>
                    <div style={{ marginLeft: "50px", display: "flex", width: "20%" }}>
                      <Select
                        placeholder={formatMessage(messages["DD"])}
                        style={{ width: "90px", height: 40, marginRight: "5%" }}
                        onChange={e => this.handleChangeFromDay(e)}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                        onSearch={this.onSearch}
                        value={this.state.dayFromRange}
                        disabled={this.state.disableDate}
                      >
                        {startDay}
                      </Select>
                      <Select
                        placeholder={formatMessage(messages["MM"])}
                        style={{ width: "90px", height: 40 }}
                        onChange={e => this.handleChangeFromMonth1(e)}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                        onSearch={this.onSearch}
                        value={this.state.monthFromRange1}
                        disabled={this.state.disableDate}
                      >
                        {startMonth}
                      </Select>
                    </div>
                    <p style={{ marginLeft: "3%", marginRight: "3%" }}>To</p>
                    <Select
                      placeholder={formatMessage(messages["DD"])}
                      style={{ width: "90px", height: 40, marginRight: "1%" }}
                      onChange={e => this.handleChangeToDay(e)}
                      onFocus={this.onFocus}
                      onBlur={this.onBlur}
                      onSearch={this.onSearch}
                      value={this.state.dayToRange}
                      disabled={this.state.disableDate}
                    >
                      {startDay}
                    </Select>
                    <Select
                      placeholder={formatMessage(messages["MM"])}
                      style={{ width: "90px", height: 40 }}
                      onChange={e => this.handleChangeToMonth1(e)}
                      onFocus={this.onFocus}
                      onBlur={this.onBlur}
                      onSearch={this.onSearch}
                      value={this.state.monthToRange1}
                      disabled={this.state.disableDate}
                    >
                      {startMonth}
                    </Select>
                  </Row>
                </Radio.Group>
              </Form.Item>
              <div style={{ width: '50%' }}>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", marginTop: 20 }}>
                  <PrimaryButton
                    text={formatMessage(messages["Submit"])}
                    htmlType="submit"
                  />
                  <SecondryButton text={formatMessage(messages["Cancel"])}
                    onClick={this.handleReset}
                  />
                </div>
              </div>
            </Form>
          </Panel>
        </Collapse>
      </div>
    )
  }
};

export default EmailStatistic;
