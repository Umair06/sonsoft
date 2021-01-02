import React, { Component, } from 'react';
import { connect } from "react-redux";
import { Spin } from "antd";
import { fetchFactoidAnswer, getFactoidAnswer } from "../../../Redux/Actions/ReadingPaneAction/FactoidAction";
import Theme from "../../../Assets/Theme/Theme";

const { color } = Theme;

class Factoid extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    static getDerivedStateFromProps(props, state) {
        const { licenseInformation, isTabOpened, openedEmail, smartSearchAccessToken } = props;
        if (isTabOpened && (!state.docId || (openedEmail && openedEmail[0] && state.docId !== openedEmail[0]._id))) {
            let customValues = { ...props.updatedSearchCriteria }
            let APIbody = {};
            if (licenseInformation && licenseInformation.smart_search_information && openedEmail && openedEmail[0]) {
                if (customValues) {
                    APIbody.emailID = (licenseInformation.smart_search_information.Smart_Email_Address) || ""
                    APIbody.question = customValues.query
                    APIbody.knowledgeId = licenseInformation.smart_search_information.Smart_Knowledge_Id
                    APIbody.documentId = openedEmail[0]._id
                    props.fetchFactoidAnswer({}, true)
                    props.fetchFactoidAnswer(APIbody, false, smartSearchAccessToken)
                }

            } else {

            }
            return {
                docId: openedEmail && openedEmail[0] && openedEmail[0]._id
            }
        }
    }
    render() {
        const { factoidAnswer } = this.props;
        return (
            <div style={{
                marginBottom: 25,
                padding: "5px 25px 50px 25px",
                borderTop: `1px solid ${color.Black10}`,
                wordBreak: "break-all"
            }}>
                {factoidAnswer ? <div dangerouslySetInnerHTML={{ __html: factoidAnswer }}></div> : <Spin size="small" style={{ marginRight: 15 }} />}
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        smartSearchAccessToken: state.SimpleSearchReducer.smartSearchAccessToken,
        licenseInformation: state.ControlCenterReducer.licenseInformation,
        updatedSearchCriteria: state.UpdateSearchCriteriaReducer.updatedSearchCriteria,
        factoidAnswer: state.FactoidAnswerReducer.factoidAnswer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchFactoidAnswer: (APIbody, cancelRequest, accessToken) => dispatch(fetchFactoidAnswer(APIbody, cancelRequest, accessToken)),
        getFactoidAnswer: () => dispatch(getFactoidAnswer())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Factoid);
