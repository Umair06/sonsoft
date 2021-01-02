import React, { Component } from 'react'
import { Drawer, Typography, Form, message } from "antd";
import style from "../../styles"
import Theme from "../../Assets/Theme/Theme";
import { PrimaryButton, SecondryButton } from "../Button/Button";
import { connect } from "react-redux";
// import { deleteSearchData } from "../../Redux/Actions/SimpleSearchAction/SimpleSearchAction"
import Clear_Gray from '../../Assets/icons/SV_ICONS/Clear_Gray.png';
import { defineMessages } from 'react-intl';

const messages = defineMessages({
    'Deleted Your Saved Email': {
        id: "DeleteSavedSearch.DeletedYourSavedEmail",
        defaultMessage: "Deleted Your Saved Email",
    },
    'Delete Saved Search': {
        id: "DeleteSavedSearch.DeleteSavedSearch",
        defaultMessage: "Delete Saved Search"
    },
    'Are you sure you want to delete the following Saved Search?': {
        id: "DeleteSavedSearch.SureYouWantToDeleteTheFollowingSavedSearch",
        defaultMessage: "Are you sure you want to delete the following Saved Search?"
    },
    'Name:': {
        id: "DeleteSavedSearch.Name",
        defaultMessage: "Name:"
    },
    'Description:': {
        id: "DeleteSavedSearch.Description",
        defaultMessage: "Description:"
    },
    'Submit': {
        id: "DeleteSavedSearch.Submit",
        defaultMessage: "Submit"
    },
    'Cancel': {
        id: "DeleteSavedSearch.Cancel",
        defaultMessage: "Cancel"
    },
})

const { Paragraph, Text } = Typography
const { color } = Theme;
const { Title } = Typography;

class DeleteSavedSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 1,
            file: [{ name: 'file-excel', style: true }, { name: 'file-pdf', style: false }]
        }
    }
    deleteData = (data) => {
        const { selectedDocs } = this.props;
        if (data) { 
            // let Ids = [+data.SEARCH_CRITERIA_ID]
            // this.props.deleteSearchData(Ids) 
            this.props.close() 
        } else if (selectedDocs && selectedDocs.length) {
            // let Ids = selectedDocs.map(doc => +doc.SEARCH_CRITERIA_ID)
            // this.props.deleteSearchData(Ids)
            this.props.close()
        }
    }



    render() {
        const { searchUser, deleteSaveSearch, formatMessage, selectedDocs } = this.props
        return (
            <Drawer
                style={{ marginTop: 125 }}
                maskStyle={{ backgroundColor: "transparent" }}
                onClose={() => this.props.close()}
                width={400}
                closable={false}
                visible={deleteSaveSearch}
            >
                {this.props.success && message.success(formatMessage(messages["Deleted Your Saved Email"]))}
                <div style={{ ...style.setting.drawerMain }}>
                    <div style={{ ...style.setting.drawerIconTitleWrapper }}>
                        <img title="" alt='' style={{ ...style.cursorPointer }} width="40px" src={require('../../Assets/icons/SV_ICONS/Delete_Orange.png')} />
                        <Title style={{ color: `${color.Blue}`, padding: "15px 0 0 5px", fontSize: 24 }}>{formatMessage(messages["Delete Saved Search"])}</Title>
                    </div>
                    <div onClick={() => this.props.close()} style={{ paddingTop: 10, cursor: "pointer" }}>
                        <img src={Clear_Gray} title="Close" alt="" onClick={() => this.props.close()} width={28} height={28} />
                    </div>
                </div>

                <Form onSubmit={this.handleSubmit}>

                    <Form.Item>
                        <Paragraph >
                            <Text strong>{formatMessage(messages["Are you sure you want to delete the following Saved Search?"])}</Text>
                        </Paragraph>
                    </Form.Item>
                    {deleteSaveSearch && !searchUser && selectedDocs && Array.isArray(selectedDocs) ?
                        selectedDocs && Array.isArray(selectedDocs) && selectedDocs.length > 1 ? <p>{selectedDocs.length} Criteria Selected</p>
                            :
                            (selectedDocs && selectedDocs.length < 2) &&
                            <Form.Item style={{ ...style.formItemBetweenGap }}>
                                <Text style={{ ...style.marginBottom0 }}> {formatMessage(messages["Name:"])} {deleteSaveSearch && selectedDocs && Array.isArray(selectedDocs) && selectedDocs[0].SEARCH_CRITERIA_NAME}</Text><br />
                                <Text style={{ ...style.marginBottom0 }}> {formatMessage(messages["Description:"])} {deleteSaveSearch && selectedDocs && Array.isArray(selectedDocs) && selectedDocs[0].SEARCH_CRITERIA_DESC}</Text>
                            </Form.Item>
                        :
                        <Form.Item style={{ ...style.formItemBetweenGap }}>
                            <Text style={{ ...style.marginBottom0 }}> {formatMessage(messages["Name:"])} {searchUser && searchUser.SEARCH_CRITERIA_NAME}</Text><br />
                            <Text style={{ ...style.marginBottom0 }}> {formatMessage(messages["Description:"])} {searchUser && searchUser.SEARCH_CRITERIA_DESC}</Text>
                        </Form.Item>
                    }
                    <Form.Item>
                        <div style={{ ...style.drawerButtons }}>
                            <PrimaryButton text={formatMessage(messages["Submit"])} onClick={() => this.deleteData(searchUser)} />
                            <SecondryButton text={formatMessage(messages["Cancel"])} onClick={() => this.props.close()} />
                        </div>
                    </Form.Item>
                </Form>
            </Drawer>
        )
    }
};

const WrappedDeleteSavedSearch = Form.create({ name: 'forward_Controls' })(DeleteSavedSearch);

const mapStateToProps = state => {
    return {

        success: state.SimpleSearchReducer.success,
    }
};
// const mapDispatchToProps = dispatch => {
//     return {
//         deleteSearchData: (data) => dispatch(deleteSearchData(data))


//     }
// }


export default connect(mapStateToProps, null)(WrappedDeleteSavedSearch);
