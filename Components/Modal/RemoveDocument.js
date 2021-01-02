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
        id: "RemoveDocument.DeletedYourSavedEmail",
        defaultMessage: "Deleted Your Saved Email",
    },
    'Release Legal Hold': {
        id: "RemoveDocument.ReleaseLegalHold",
        defaultMessage: "Release Legal Hold"
    },
    'Are you sure you want to remove all documents?': {
        id: "RemoveDocument.Areyousureyouwanttoremovealldocuments?",
        defaultMessage: "Are you sure you want to remove all documents?"
    },
    'Are you sure you want to remove the selected documents?': {
        id: "RemoveDocument.Areyousureyouwanttoremovetheselecteddocument?",
        defaultMessage: "Are you sure you want to remove the selected documents?"
    },

    'Name:': {
        id: "RemoveDocument.Name",
        defaultMessage: "Name:"
    },
    'Description:': {
        id: "RemoveDocument.Description",
        defaultMessage: "Description:"
    },
    'Submit': {
        id: "RemoveDocument.Submit",
        defaultMessage: "Submit"
    },
    'Cancel': {
        id: "RemoveDocument.Cancel",
        defaultMessage: "Cancel"
    },
    'Releases Legal Hold': {
        id: "RemoveDocument.ReleasesLegalHolds",
        defaultMessage: "Releases Legal Hold"
    },
})

// const { Paragraph, Text } = Typography
const { color } = Theme;
const { Title } = Typography;

class RemoveDocument extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 1,
            file: [{ name: 'file-excel', style: true }, { name: 'file-pdf', style: false }]
        }
    }


    render() {
        const { selected, removeDocument, formatMessage } = this.props
        return (
            <Drawer
                style={{ marginTop: 125 }}
                maskStyle={{ backgroundColor: "transparent" }}
                onClose={() => this.props.close()}
                width={400}
                closable={false}
                visible={removeDocument}
            >

                <div style={{ ...style.setting.drawerMain }}>
                    <div style={{ ...style.setting.drawerIconTitleWrapper }}>
                        <img title="" alt='' style={{ ...style.cursorPointer }} width="40px" src={require('../../Assets/icons/SV_ICONS/ReleaseLH_Orange.png')} />
                        <Title style={{ color: `${color.Blue}`, padding: "15px 0 0 5px", fontSize: 24 }}> Remove Documents</Title>
                    </div>
                    <div onClick={() => this.props.close()} style={{ paddingTop: 10, cursor: "pointer" }}>
                        <img src={Clear_Gray} title="Close" alt="" onClick={() => this.props.close()} width={28} height={28} />
                    </div>
                </div>

                <Form onSubmit={this.handleSubmit}>

                    <Form.Item style={{ margin: 0, padding: 0 }}>
                        <p style={{ margin: 0, padding: 0 }}>{selected && selected.length ? formatMessage(messages["Are you sure you want to remove the selected documents?"]) : formatMessage(messages["Are you sure you want to remove all documents?"])}</p>
                        {/* <Text > {formatMessage(messages["Name:"])} </Text><br/>
                        <Text > {formatMessage(messages["Description:"])} </Text> */}
                    </Form.Item>

                    <div style={{ ...style.drawerButtons }}>
                        <PrimaryButton text={formatMessage(messages["Submit"])} onClick={() => selected && selected.length ? this.props.removeSelectedDocFromOnHold && this.props.removeSelectedDocFromOnHold() : this.props.removeAllDocFromOnHold && this.props.removeAllDocFromOnHold()} />
                        <SecondryButton text={formatMessage(messages["Cancel"])} onClick={() => this.props.close()} />
                    </div>

                </Form>
            </Drawer>
        )
    }
};

const WrappedRemoveDocument = Form.create({ name: 'forward_Controls' })(RemoveDocument);

const mapStateToProps = state => {
    return {

        success: state.SimpleSearchReducer.success,
    }
};


export default connect(mapStateToProps, null)(WrappedRemoveDocument);
