import React, { Component } from 'react'
import { Drawer, Typography, Form } from "antd";
import style from "../../styles"
import Theme from "../../Assets/Theme/Theme";
import { PrimaryButton, SecondryButton } from "../Button/Button";
import { connect } from "react-redux";
import Clear_Gray from '../../Assets/icons/SV_ICONS/Clear_Gray.png';
// import { defineMessages } from 'react-intl';
// import { __values } from 'tslib';
import { resetSelectedRecords } from "../../Redux/Actions/updateSelectedRecordsAction/updateSelectedRecordsAction";

const { Paragraph, Text } = Typography
const { color } = Theme;
const { Title } = Typography;
class DeleteDrawer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ad: false,
            sys: false,
            user: false
        }
    }

    onSubmit = () => {
        try {
            const { deleteRecord, dismissRecord, onSubmit, resetSelectedRecords } = this.props;
            const { unDefaultRecords } = this.state

            Array.isArray(unDefaultRecords) ? onSubmit(unDefaultRecords) : onSubmit(deleteRecord || dismissRecord)

            resetSelectedRecords()
            this.closeAndReset()
        } catch (e) { console.log(e.message) }
    }

    static getDerivedStateFromProps(props, state) {
        let ad, sys, user;
        props.deleteDrawer && props.deleteRecord && Array.isArray(props.deleteRecord) && props.deleteRecord.length > 0 && props.deleteRecord.forEach(val => {
            if (val.USER_TYPE === "A" || val.USER_TYPE === "S") {
                ad = true
                sys = true
            } else {
                user = true
            }

        })
        return { ad, sys, user }
    }

    displayMessage = (condition, message) => {
        const { notToRunAgain } = this.state;
        (condition && !notToRunAgain) &&
            this.setState({ warningMessage: message, notToRunAgain: true, });
    }

    handleSingleDeletes = containObjectForSingleDelete => {
        let checkIsDefaultORNot;
        try {
            checkIsDefaultORNot = containObjectForSingleDelete['IsDefault'];
            this.displayMessage(checkIsDefaultORNot, "You can't delete default policies")
        } catch (e) {
            console.log(e.message);
        }
        return !checkIsDefaultORNot;
    }

    handleDeleteLabels = () => {
        try {
            const { deleteRecord } = this.props

            // containObjectForSingleDelete contain just an object not any Array
            const containObjectForSingleDelete = (Array.isArray(deleteRecord) && deleteRecord.length === 1) ?
                deleteRecord[0] : !(Array.isArray(deleteRecord)) && deleteRecord

            //this function handle the single delete. If delete policy is not default so this function return true otherwise false
            if (containObjectForSingleDelete && this.handleSingleDeletes(containObjectForSingleDelete))
                return <PrimaryButton text={"Submit"} onClick={() => this.onSubmit()} />;
            
            //Selected All Policies Are Default Or All are unDefault
            const defaultPolicies = deleteRecord.length > 1 && deleteRecord.every(policy => policy.IsDefault);
            const unDefaultPolicies = deleteRecord.length > 1 && deleteRecord.every(policy => !policy.IsDefault);
            if (unDefaultPolicies)
                return <PrimaryButton text={"Submit - 1"} onClick={() => this.onSubmit()} />;
            if (defaultPolicies) this.displayMessage(true, "You can't delete default policies");

            //This part of the function is handle when user select some default policies and some undefault below piece of text handle the situation
            const selectedDefaultPolicies = deleteRecord.length > 1 && deleteRecord.filter(el => el.IsDefault)
            const selectedUnDefaultPolicies = deleteRecord.length > 1 && deleteRecord.filter(el => !el.IsDefault)

            if (selectedDefaultPolicies.length > 0 && selectedUnDefaultPolicies.length > 0) {
                this.displayMessage(true, "You've Selected some default policies, Do you want to delete other policies ?");
                return <PrimaryButton text={"Submit"} onClick={() => this.onSubmit()} />;
            }

        } catch (error) {
            console.log(error.message)
        }
    }

    closeAndReset() {
        this.setState({ notToRunAgain: false, warningMessage: '', unDefaultRecords: undefined })
        this.props.close()
    }

    displayAndHideSubmitButton = () => {
        const { deleteRecord } = this.props
        const { ROLE_TYPE, USER_TYPE } = deleteRecord
        const { ad, user, sys } = this.state

        if ((ROLE_TYPE === "S" || USER_TYPE === "A" || USER_TYPE === "S")) return
        else if ((deleteRecord || []).length > 0) {
            if (ad && sys && !user) return
            else return <PrimaryButton text={"Submit"} onClick={() => this.onSubmit()} />
        }
        else return < PrimaryButton text={"Submit"} onClick={() => this.onSubmit()} />
    }

    render() {
        const { deleteDrawer, deleteRecord, deleteMessage, dismissRecord, dismissDrawer, deleteLabels } = this.props
        const { warningMessage } = this.state
        return (
            <Drawer
                style={{ marginTop: 125 }}
                maskStyle={{ backgroundColor: "transparent" }}
                onClose={() => this.closeAndReset()}
                width={400}
                closable={false}
                visible={deleteDrawer || dismissDrawer}
            >
                <div style={{ ...style.setting.drawerMain }}>
                    <div style={{ ...style.setting.drawerIconTitleWrapper }}>
                        {(deleteDrawer && deleteRecord) ?
                            <>
                                <img title="" alt='' style={{ ...style.cursorPointer }} width="40px" src={require('../../Assets/icons/SV_ICONS/Delete_Orange.png')} />
                                <Title style={{ color: `${color.Blue}`, padding: "15px 0 0 5px", fontSize: 24 }}>Delete Records</Title>
                            </>
                            :
                            <>
                                <img title="" alt='' style={{ ...style.cursorPointer }} width="40px" src={require("../../Assets/icons/SV_ICONS/Close_Orange.png")} />
                                <Title style={{ color: `${color.Blue}`, padding: "15px 0 0 5px", fontSize: 24 }}>Dismiss Notification</Title>
                            </>
                        }
                    </div>
                    <div onClick={() => this.closeAndReset()} style={{ paddingTop: 10, cursor: "pointer" }}>
                        <img src={Clear_Gray} title="Close" alt="" onClick={() => this.closeAndReset()} width={28} height={28} />
                    </div>
                </div>

                <Form onSubmit={this.handleSubmit}>
                    <Form.Item>

                        {(deleteDrawer && deleteRecord && !deleteLabels) &&
                            ((deleteRecord.ROLE_TYPE === "S" || deleteRecord.USER_TYPE === "A" || deleteRecord.USER_TYPE === "S")
                                ?
                                <Text strong>{deleteMessage}</Text>
                                :
                                deleteDrawer && deleteRecord && Array.isArray(deleteRecord) && deleteRecord.length > 0
                                    ? (this.state.ad && this.state.sys && !this.state.user)
                                        ?
                                        <Text strong>
                                            Cannot delete AD/System user!
                                    </Text>
                                        :
                                        (this.state.ad && this.state.sys && this.state.user)
                                            ?
                                            <Text strong>
                                                Cannot delete AD/System users. Only Local users will be deleted!
                                    </Text>
                                            :
                                            <Text strong>Are you sure you want to delete the selected Records?</Text>

                                    :
                                    dismissDrawer && dismissRecord ?
                                        <Text strong>Are you sure you want to dismiss the selected notifications?</Text>
                                        :
                                        <Text strong>Are you sure you want to delete?</Text>)
                        }
                        {
                            //On the Auto Label Screen this line of code show warning message OR confirmation message.
                            (deleteRecord && deleteLabels) && warningMessage ? warningMessage : deleteMessage
                        }
                    </Form.Item>
                    {Array.isArray(deleteRecord) &&
                        <Form.Item>
                            <Paragraph >
                                {deleteRecord.length} Record(s) Selected
                        </Paragraph>
                        </Form.Item>}
                    <Form.Item>
                        <div style={{ ...style.drawerButtons }} >
                            {(deleteDrawer && deleteRecord && !deleteLabels) && this.displayAndHideSubmitButton()}

                            {/* this line of code run on Auto Label screen this function display or hide submit button as well as manage the message state/*/}
                            {(deleteDrawer && deleteRecord && deleteLabels) && this.handleDeleteLabels()}
                            <SecondryButton text={"Cancel"} onClick={() => this.closeAndReset()} />
                        </div>
                    </Form.Item>
                </Form>
            </Drawer>
        )
    }
};

const WrappedDeleteSavedSearch = Form.create({ name: 'forward_Controls' })(DeleteDrawer);

const mapStateToProps = state => {
    return {
        success: state.SimpleSearchReducer.success,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        resetSelectedRecords: () => dispatch(resetSelectedRecords())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedDeleteSavedSearch);
