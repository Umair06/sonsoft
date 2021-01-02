import React, { Component } from 'react';
import { Drawer, Typography, Form, Checkbox, Row, Col } from 'antd';
import style from '../../styles';
import Theme from '../../Assets/Theme/Theme';
import { PrimaryButton, SecondryButton } from '../Button/Button';
import Clear_Gray from '../../Assets/icons/SV_ICONS/Clear_Gray.png';
import { defineMessages } from 'react-intl';

const messages = defineMessages({
  'Search Archive Report': {
    id: 'Report.SearchArchiveReport',
    defaultMessage: 'Search Archive Report'
  },
  Submit: {
    id: 'Report.Submit',
    defaultMessage: 'Submit'
  },
  Cancel: {
    id: 'Report.Cancel',
    defaultMessage: 'Cancel'
  }
});

const { Title } = Typography;
const { color } = Theme;

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      file: [
        { name: 'Excel.png', style: true },
        { name: 'PDF.png', style: false }
      ]
    };
  }
  onChange = e => {
    this.setState({
      value: e.target.value
    });
  };
  // ExcelFile = (data) => {
  //     const blob = new Blob([data], { type: "text/csv" });
  //     const url = window.URL.createObjectURL(blob);
  //     const a = document.createElement('a');
  //     a.setAttribute('hidden', '');
  //     a.setAttribute('href', url);
  //     a.setAttribute('download', 'download.csv');
  //     document.body.appendChild(a);
  //     a.click();
  //     document.body.removeChild(a)
  //   }
  //   ObjectToCsv = (data) => {
  //     const {  customizedColums } = this.props
  //     const csvRows = []
  //     let Data=[]
  //     //get the Headers(
  //     const colums =  customizedColums.filter(col => !col.hide)

  //     let columnsHead = []
  //     for (var i = 0; i < colums.length; i++) {
  //       columnsHead.push(colums[i].title)

  //     }
  //     csvRows.push(columnsHead.join(','))
  //     data.map(val=>Data.push(val._source.to+val._source.from))

  //     //loop  over the Rows
  //     for (const row of  Data) {

  //       const values = columnsHead.map(header => {

  //         const escaped = (' ' + row).replace(/"/g, '\\"')
  //         return `"${escaped}"`
  //       })

  //       csvRows.push(values.join(','))
  //     }
  //     return csvRows.join('\n')
  //   }
  //   //form escaped comma seperated values
  //   async downloadToExcel() {
  //     const { columData } = this.props
  //     const csvData = this.ObjectToCsv(columData)
  //     this.ExcelFile(csvData)

  //   }

  selectedColor = (e, color, ind) => {
    const { file } = this.state;
    file.forEach(val => {
      val.style = false;
    });
    file[ind].style = true;
    this.setState({ file });
  };
  render() {
    const { file } = this.state;
    const {
      customizedColums,
      reportEmail,
      formatMessage,
      reportHeading
    } = this.props;

    return (
      <Drawer
        style={{ marginTop: 125 }}
        bodyStyle={{ height: 'calc(100vh - 125px)', overflowY: 'auto' }}
        closable={false}
        maskStyle={{ backgroundColor: 'transparent' }}
        width={400}
        onClose={() => this.props.close()}
        visible={reportEmail}>
        <div style={{ ...style.setting.drawerMain }}>
          <div style={{ ...style.setting.drawerIconTitleWrapper }}>
            <img
              alt=''
              title='Report'
              style={{ ...style.cursorPointer }}
              width={45}
              src={require('../../Assets/icons/Icon Library/Icon Library/Report_Orange.png')}
            />

            <Title
              style={{
                color: `${color.Blue}`,
                padding: '20px 0 5px 18px',
                fontSize: 24
              }}>
              {reportHeading}
            </Title>
          </div>
          <div
            onClick={() => this.props.close()}
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
        <Form onSubmit={this.handleSubmit} className='login-form'>
          {customizedColums &&
            customizedColums.map((val, ind) => (
              <Form.Item key={ind} label='' style={{ margin: 0, padding: 3 }}>
                {val.title && (
                  <div style={{ border: '1px solid lightgrey' }}>
                    <div style={{ paddingLeft: '10px', display: 'flex' }}>
                      <Checkbox
                        defaultChecked
                        disabled={!val.disabled}
                        style={{ ...style.setting.drawerIconTitleWrapper }}>
                        {val.title}
                      </Checkbox>
                    </div>
                  </div>
                )}
              </Form.Item>
            ))}
          <Form.Item>
            <Row gutter={16} style={{ display: 'flex', marginTop: 30 }}>
              {file.map((val, index) => {
                return (
                  <Col
                    key={index}
                    span={4}
                    style={
                      !val.style
                        ? { padding: '4px', margin: 5 }
                        : {
                            padding: '4px',
                            margin: 5,
                            border: `2px solid ${color.Orange}`
                          }
                    }>
                    {/* <Icon onClick={e => this.selectedColor(e, val, index)} style={{ fontSize: 40, color: `${color.Blue}` }} type={val.name} /> */}
                    <img
                      alt=''
                      width={48}
                      onClick={e => this.selectedColor(e, val, index)}
                      style={{ cursor: 'pointer' }}
                      src={require(`../../Assets/icons/File Types/${val.name}`)}
                    />
                  </Col>
                );
              })}
            </Row>
          </Form.Item>

          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <PrimaryButton text={formatMessage(messages['Submit'])} />
              <SecondryButton text={formatMessage(messages['Cancel'])} onClick={() => this.props.close()} />
            </div>
          </Form.Item>
        </Form>
      </Drawer>
    );
  }
}

const WrappedReport = Form.create({ name: 'forward_Controls' })(Report);

export default WrappedReport;
