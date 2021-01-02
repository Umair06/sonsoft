import React, { Component } from 'react';
import { Form, Select, Input, Row, Collapse } from "antd";
import { defineMessages } from 'react-intl';
import { PrimaryButton, SecondryButton } from "../../../Components/Button/Button"
import theme from "../../../Assets/Theme/Theme";
const { Panel } = Collapse;
const { color } = theme;

class ChainOfCustody extends Component {
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
      selectValue: "All",
      inputVal: undefined
    }
  }
  onChangeRadio = e => {

    this.setState({
      value: e.target.value
    });

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

  handleChange = (value) => {
    this.setState({ selectValue: value })
  }
  handleInputChange = (e) => {
    this.setState({inputVal: e.target.value})
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
      selectValue: "All",
      inputVal: undefined
    })
  }
  render() {
    const { Option } = Select;
    const select = [], date = [], startMonth = [], startDay = [], startYear = [];
    const dateSearch = ['Any date', 'Date before', 'Date after', 'Date between', 'Date equals'];
    const monthSearch = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
    const yearSearch = ['2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009', '2008', '2007', '2006', '2005', '2004', '2003', '2002', '2001', '2000', '1999', '1998', '1997', '1996'];
    const selectFields = ['All', 'SNS_ARCHDB_00001(20-Jul-2019 - Till Date)', 'SNS_ARCHDB_00048(01-Jul-2019 - 19-Jul-2019)', 'SNS_ARCHDB_00049(01-Jun-2019 - 30-Jun-2019)', 'SNS_ARCHDB_00051(01-May-2019 - 31-May-2019)', 'SNS_ARCHDB_00050(01-Apr-2019 - 30-Apr-2019)', 'SNS_ARCHDB_00047(01-Sep-2017 - 30-Sep-2017)', 'SNS_ARCHDB_00044(01-Dec-2008 - 31-Dec-2008)', 'SNS_ARCHDB_00046(01-Mar-2007 - 31-Mar-2007)', 'SNS_ARCHDB_00043(01-Dec-2006 - 31-Dec-2006)', 'SNS_ARCHDB_00045(01-Nov-2006 - 30-Nov-2006)', 'SNS_ARCHDB_00037(01-Feb-2004 - 29-Feb-2004)', 'SNS_ARCHDB_00040(01-May-2002 - 31-May-2002)', 'SNS_ARCHDB_00041(01-Apr-2002 - 30-Apr-2002)', 'SNS_ARCHDB_00034(01-Mar-2002 - 31-Mar-2002)', 'SNS_ARCHDB_00031(01-Feb-2002 - 28-Feb-2002)', 'SNS_ARCHDB_00030(01-Jan-2002 - 31-Jan-2002)', 'SNS_ARCHDB_00029(01-Dec-2001 - 31-Dec-2001)', 'SNS_ARCHDB_00028(01-Nov-2001 - 30-Nov-2001)', 'SNS_ARCHDB_00007(01-Oct-2001 - 31-Oct-2001)', 'SNS_ARCHDB_00026(01-Sep-2001 - 30-Sep-2001)', 'SNS_ARCHDB_00027(01-Aug-2001 - 31-Aug-2001)', 'SNS_ARCHDB_00032(01-Jul-2001 - 31-Jul-2001)', 'SNS_ARCHDB_00016(01-Jun-2001 - 30-Jun-2001)', 'SNS_ARCHDB_00010(01-May-2001 - 31-May-2001)', 'SNS_ARCHDB_00009(01-Apr-2001 - 30-Apr-2001)', 'SNS_ARCHDB_00005(01-Mar-2001 - 31-Mar-2001)', 'SNS_ARCHDB_00023(01-Feb-2001 - 28-Feb-2001)', 'SNS_ARCHDB_00014(01-Jan-2001 - 31-Jan-2001)', 'SNS_ARCHDB_00002(01-Dec-2000 - 31-Dec-2000)', 'SNS_ARCHDB_00011(01-Nov-2000 - 30-Nov-2000)', 'SNS_ARCHDB_00003(01-Oct-2000 - 31-Oct-2000)', 'SNS_ARCHDB_00008(01-Sep-2000 - 30-Sep-2000)', 'SNS_ARCHDB_00006(01-Aug-2000 - 31-Aug-2000)', 'SNS_ARCHDB_00021(01-Jul-2000 - 31-Jul-2000)', 'SNS_ARCHDB_00020(01-Jun-2000 - 30-Jun-2000)', 'SNS_ARCHDB_00019(01-May-2000 - 31-May-2000)', 'SNS_ARCHDB_00012(01-Apr-2000 - 30-Apr-2000)', 'SNS_ARCHDB_00004(01-Mar-2000 - 31-Mar-2000)', 'SNS_ARCHDB_00025(01-Feb-2000 - 29-Feb-2000)', 'SNS_ARCHDB_00022(01-Jan-2000 - 31-Jan-2000)', 'SNS_ARCHDB_00017(01-Dec-1999 - 31-Dec-1999)', 'SNS_ARCHDB_00036(01-Nov-1999 - 30-Nov-1999)', 'SNS_ARCHDB_00035(01-Oct-1999 - 31-Oct-1999)', 'SNS_ARCHDB_00033(01-Sep-1999 - 30-Sep-1999)', 'SNS_ARCHDB_00018(01-Aug-1999 - 31-Aug-1999)', 'SNS_ARCHDB_00015(01-Jul-1999 - 31-Jul-1999)', 'SNS_ARCHDB_00038(01-Jun-1999 - 30-Jun-1999)', 'SNS_ARCHDB_00024(01-May-1999 - 31-May-1999)', 'SNS_ARCHDB_00039(01-Apr-1999 - 30-Apr-1999)', 'SNS_ARCHDB_00042(01-May-1998 - 31-May-1998)', 'SNS_ARCHDB_00013(01-Jan-1980 - 31-Jan-1980)'];

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

    for (let i = 0; i < selectFields.length; i++) {
      select.push(<Option key={i} value={selectFields[i]}>{selectFields[i]}</Option>);
    }
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
                {/* <div style={{ marginLeft: "50px", display: "flex", width: "90%" }}> */}
                  <Row style={{display: "flex", marginTop: "2%", marginLeft: "5%"}}>
                    <p style={{marginRight: "2%"}}>Enter mailbox name</p>
                    <Input style={{width: "40%"}} 
                    value={this.state.inputVal}
                    onChange={this.handleInputChange}
                    ></Input>
                  </Row>
                {/* </div> */}
              </Form.Item>
              <Form.Item>

                <Row style={{ display: "flex", marginLeft: "", width: "100%" }} >

                  <div style={{ marginLeft: "50px", display: "flex", width: "33%" }}>
                    <Select
                      placeholder={formatMessage(messages["DD"])}
                      style={{ width: "90px", height: 40, marginRight: "2%" }}
                      onChange={e => this.handleChangeFromDay(e)}
                      onFocus={this.onFocus}
                      onBlur={this.onBlur}
                      onSearch={this.onSearch}
                      value={this.state.dayFromRange}
                    >
                      {startDay}
                    </Select>
                    <Select
                      placeholder={formatMessage(messages["MM"])}
                      style={{ width: "90px", height: 40, marginRight: "2%" }}
                      onChange={e => this.handleChangeFromMonth1(e)}
                      onFocus={this.onFocus}
                      onBlur={this.onBlur}
                      onSearch={this.onSearch}
                      value={this.state.monthFromRange1}
                    >
                      {startMonth}
                    </Select>
                    <Select
                      placeholder={formatMessage(messages["YYYY"])}
                      style={{ width: "90px", height: 40 }}
                      onChange={e => this.handleChangeFromYear(e)}
                      onFocus={this.onFocus}
                      onBlur={this.onBlur}
                      onSearch={this.onSearch}
                      value={this.state.yearFromRange}
                    >
                      {startYear}
                    </Select>
                  </div>
                  <p style={{ marginRight: "3%" }}>To</p>
                  <div style={{ width: "33%" }}>
                    <Select
                      placeholder={formatMessage(messages["DD"])}
                      style={{ width: "90px", height: 40, marginRight: "2%" }}
                      onChange={e => this.handleChangeToDay(e)}
                      onFocus={this.onFocus}
                      onBlur={this.onBlur}
                      onSearch={this.onSearch}
                      value={this.state.dayToRange}
                    >
                      {startDay}
                    </Select>
                    <Select
                      placeholder={formatMessage(messages["MM"])}
                      style={{ width: "90px", height: 40, marginRight: "2%" }}
                      onChange={e => this.handleChangeToMonth1(e)}
                      onFocus={this.onFocus}
                      onBlur={this.onBlur}
                      onSearch={this.onSearch}
                      value={this.state.monthToRange1}
                    >
                      {startMonth}
                    </Select>
                    <Select
                      placeholder={formatMessage(messages["YYYY"])}
                      style={{ width: "90px", height: 40 }}
                      onChange={e => this.handleChangeToYear(e)}
                      onFocus={this.onFocus}
                      onBlur={this.onBlur}
                      onSearch={this.onSearch}
                      value={this.state.yearToRange}
                    >
                      {startYear}
                    </Select>
                  </div>
                </Row>

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

export default ChainOfCustody;

