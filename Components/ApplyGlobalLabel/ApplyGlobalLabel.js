import React, { Component } from 'react';
import style from '../../styles';
import { Drawer, Typography, Select, Form, Spin } from 'antd';
import { PrimaryButton, SecondryButton } from '../Button/Button';
import CreateLegalHold from '../../Components/CreateLegalHold/CreateLegalHold';
import Clear_Gray from '../../Assets/icons/SV_ICONS/Clear_Gray.png';
import Theme from '../../Assets/Theme/Theme';
import { connect } from 'react-redux';
import { fetchLegalHolds } from '../../Redux/Actions/LegalHoldsActions/LegalHoldsActions';
import {
  ApplyLegalHoldData
} from '../../Redux/Actions/ApplyLegalHoldAction/ApplyLegalHoldAction';
// import myTheme from "../../Assets/Theme/Theme" ;
import { defineMessages } from 'react-intl';

const messages = defineMessages({
  'Apply Legal Hold': {
    id: 'ApplyGlobalLabel.ApplyLegalHold',
    defaultMessage: 'Apply Legal Hold'
  },
  'Select Legal Hold': {
    id: 'ApplyGlobalLabel.SelectLegalHold',
    defaultMessage: 'Select Legal Hold'
  },
  'Apply All': {
    id: 'ApplyGlobalLabel.ApplyAll',
    defaultMessage: 'Apply All'
  },
  'Create a New Case': {
    id: 'ApplyGlobalLabel.CreateNewCase',
    defaultMessage: 'Create new Legal Hold'
  },
  Submit: {
    id: 'ApplyGlobalLabel.Submit',
    defaultMessage: 'Submit'
  },
  Cancel: {
    id: 'ApplyGlobalLabel.Cancel',
    defaultMessage: 'Cancel'
  }
});

const { Option } = Select;
const { color } = Theme;
const { Title, Text } = Typography;

function compare(a, b) {
  const CASE_NAMEA = a.CASE_NAME.toUpperCase();
  const CASE_NAMEB = b.CASE_NAME.toUpperCase();

  let comparison = 0;
  if (CASE_NAMEA > CASE_NAMEB) {
    comparison = 1;
  } else if (CASE_NAMEA < CASE_NAMEB) {
    comparison = -1;
  }
  return comparison;
}

class ApplyGlobalLabel extends Component {
  state = {
    loading: false,
    visible: true
  };

  filter = (input, option) => {
    return (
      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    );
  };

  static getDerivedStateFromProps(props) {
    props.applyGlobalLabel && !props.legalHolds && props.fetchLegalHolds();
    return null;
  }

  render() {
    const {
      applyGlobalLabel,
      selected,
      closeDrawer,
      openDrawer,
      createLegalHold,
      formatMessage,
      onCase,
      applyLegalHoldToAllDocs,
      applyLegalHoldData,
      selectedDocs
    } = this.props;
    let legalholds = this.props.legalHolds && [...this.props.legalHolds];
    // applyGlobalLabel &&  console.log("ApplyLegalHoldData",this.props.applyLegalHoldData);
    
    return (
      <div>
        <CreateLegalHold
          formatMessage={formatMessage}
          createLegalHold={createLegalHold}
          close={() => closeDrawer && closeDrawer('createLegalHold')}
        />
        <Drawer
          style={{ marginTop: 125 }}
          bodyStyle={{ height: 'calc(100vh - 125px)', overflowY: 'auto' }}
          width={400}
          visible={applyGlobalLabel}
          maskStyle={{ backgroundColor: 'transparent' }}
          closable={false}
          onClose={() => this.props.close('applyGlobalLabel')}>
          <div style={{ ...style.setting.drawerMain }}>
            <div style={{ ...style.setting.drawerIconTitleWrapper }}>
              <img
                title=''
                alt=''
                style={{ ...style.cursorPointer }}
                width='40px'
                src={require('../../Assets/icons/SV_ICONS/LegalHold_Orange.png')}
              />
              <Title
                style={{
                  color: color.Blue,
                  padding: '15px 0 0 5px',
                  fontSize: 24
                }}
                level={2}>
                {formatMessage(messages['Apply Legal Hold'])}
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
          <Form>
            <div style={{ justifyContent: 'center', alignItems: 'center' }}>
              <div>
                <div>
                  {applyGlobalLabel && <Select
                    disabled={onCase ? true : false}
                    // value={this.props.applyLegalHoldData && this.props.applyLegalHoldData.applyLegalHoldData.caseName}
                    allowClear={true}
                    style={{ width: '100%', height: 40 }}
                    onChange={this.props.handleChangeCase}
                    placeholder={
                      onCase ? onCase
                        : (applyLegalHoldData && applyLegalHoldData.applyLegalHoldData) ? applyLegalHoldData.applyLegalHoldData.caseName
                          : formatMessage(messages['Select Legal Hold'])
                    }
                    notFoundContent={
                      !legalholds && (
                        <Text>
                          <Spin size='small' style={{ marginRight: 15 }} />
                          Fetching Legal Holds
                        </Text>
                      )
                    }
                    onSearch={this.onSearch}
                    filterOption={(input, option) => this.filter(input, option)}
                    showSearch>
                    {legalholds &&
                      legalholds.sort(compare).map(val => (
                        <Option
                          key={val.CASE_ID}
                          value={val.CASE_ID}
                          optionLabelProp={val}>
                          {val.CASE_NAME}
                        </Option>
                      ))}
                  </Select>}
                  {/* {!selected ? (
                    <p style={{ marginTop: 20 }}>0 Document Selected</p>
                  ) : ( */}
                      <p style={{ marginTop: 20 }}>
                        {selectedDocs && Array.isArray(selectedDocs) && selectedDocs.length > 0 ? `Apply legal hold on selected ${selectedDocs.length} ${selectedDocs.length === 1 ? 'Document' : 'Documents'}` : selected > 0 && `Apply legal hold on total ${selected} Documents`}
                      </p>
                    {/* )} */}
                  <div
                    style={{ ...style.drawerButtons }}>
                    <PrimaryButton
                      text={formatMessage(messages['Submit'])}
                      onClick={() => selected && selectedDocs && selectedDocs.length > 0 ? this.props.onApplyGlobalLabel && this.props.onApplyGlobalLabel() : applyLegalHoldToAllDocs && applyLegalHoldToAllDocs()
                      }
                    />
                    <SecondryButton
                      text={formatMessage(messages['Cancel'])}
                      onClick={() => this.props.close('applyGlobalLabel')}
                    />
                  </div>
                  {!onCase && (
                    <div
                      style={{ ...style.drawerButtons }}
                      onClick={() =>
                        openDrawer && openDrawer('createLegalHold', true)
                      }>
                      <img
                        alt='Add'
                        id='addImage'
                        src={require('../../Assets/icons/SV_ICONS/Orange-Add.png')}
                        width='35px'
                        height='35px'
                      />
                      <Text style={{ marginTop: 5, cursor: 'pointer' }}>
                        {formatMessage(messages['Create a New Case'])}
                      </Text>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Form>
        </Drawer>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    legalHolds: state.LegalHoldsReducer.legalHolds,
    applyLegalHoldData: state.ApplyLegalHoldReducer.applyLegalHoldData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // clearSearchedResults: () => dispatch(clearSearchedResults()),
    fetchLegalHolds: () => dispatch(fetchLegalHolds()),
    // clearOnholdDocuments: () => dispatch(clearOnholdDocuments())
    ApplyLegalHoldData: data => dispatch(ApplyLegalHoldData(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplyGlobalLabel);
