import React, { Component } from 'react'
import { Drawer, Typography, Form } from "antd";
import style from "../../styles"
import Theme from "../../Assets/Theme/Theme";
import { PrimaryButton, SecondryButton } from "../Button/Button";
import { connect } from "react-redux";
import Clear_Gray from '../../Assets/icons/SV_ICONS/Clear_Gray.png';
import { defineMessages } from 'react-intl';

const messages = defineMessages({
  'Deleted Your Saved Email': {
    id: "ActiveLegalHold.DeletedYourSavedEmail",
    defaultMessage: "Deleted Your Saved Email",
  },
  'Release Legal Hold': {
    id: "ActiveLegalHold.ReleaseLegalHold",
    defaultMessage: "Release Legal Hold"
  },
  'Are you sure you want to release the following Legal Hold(s)?': {
    id: "ActiveLegalHold.AreyousureyouwanttoreleasethefollowingLegalHold(s)",
    defaultMessage: "Are you sure you want to release the selected Legal Hold(s)?"
  },
  'Name:': {
    id: "ActiveLegalHold.Name",
    defaultMessage: "Name:"
  },
  'Description:': {
    id: "ActiveLegalHold.Description",
    defaultMessage: "Description:"
  },
  'Submit': {
    id: "ActiveLegalHold.Submit",
    defaultMessage: "Submit"
  },
  'Cancel': {
    id: "ActiveLegalHold.Cancel",
    defaultMessage: "Cancel"
  },
  'Releases Legal Hold': {
    id: "ActiveLegalHold.ReleasesLegalHolds",
    defaultMessage: "Releases Legal Hold"
  },
})

const { Text } = Typography
const { color } = Theme;
const { Title } = Typography;

class ReleasesLegalHold extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 1,
      file: [{ name: 'file-excel', style: true }, { name: 'file-pdf', style: false }]
    }
  }


  render() {
    const { activeLegalHold, formatMessage, selectedDocs, legalHoldsActive } = this.props
    return (
      <Drawer
        style={{ marginTop: 125 }}
        maskStyle={{ backgroundColor: "transparent" }}
        onClose={() => this.props.close()}
        width={400}
        closable={false}
        visible={activeLegalHold}
      >
        <div style={{ ...style.setting.drawerMain }}>
          <div style={{ ...style.setting.drawerIconTitleWrapper }}>
            <img title="" alt='' style={{ ...style.cursorPointer }} width="40px" src={require('../../Assets/icons/SV_ICONS/ReleaseLH_Orange.png')} />
            <Title style={{ color: `${color.Blue}`, padding: "15px 0 0 5px", fontSize: 24 }}>Active Legal Hold</Title>
          </div>
          <div onClick={() => this.props.close()} style={{ paddingTop: 10, cursor: "pointer" }}>
            <img src={Clear_Gray} title="Close" alt="" onClick={() => this.props.close()} width={28} height={28} />
          </div>
        </div>
        <div>
          <div style={{ marginBottom: 20 }}>
            <p style={{ margin: 0, padding: 0 }}>Are you sure you want to Active the Selected Legal Hold(s)?</p>
          </div>
          {selectedDocs && selectedDocs.length === 1 ?
            <div>
              <div style={{ marginBottom: 10 }}>
                <Text>{formatMessage(messages["Name:"])} {selectedDocs[0].CASE_NAME}</Text>
              </div>
              <div>
                <Text>{formatMessage(messages["Description:"])} {selectedDocs[0].CASE_DESC} </Text>
              </div>
            </div>
            : selectedDocs &&
            <div>{selectedDocs.length} Legal Holds Selected</div>
          }
          <div style={{ ...style.drawerButtons }} >
            <PrimaryButton text={formatMessage(messages["Submit"])} onClick={() => legalHoldsActive && selectedDocs.length && legalHoldsActive()} />
            <SecondryButton text={formatMessage(messages["Cancel"])} onClick={() => this.props.close && this.props.close()} />
          </div>
        </div>

      </Drawer>
    )
  }
};

const WrappedReleasesLegalHold = Form.create({ name: 'forward_Controls' })(ReleasesLegalHold);

const mapStateToProps = state => {
  return {

    success: state.SimpleSearchReducer.success,
  }
};



export default connect(mapStateToProps, null)(WrappedReleasesLegalHold);
