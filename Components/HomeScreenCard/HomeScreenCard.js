import React, { Component } from 'react';
import style from "../../styles"
import { Card, Typography, Divider } from "antd";
import moveToTemplate from "../../Redux/Actions/UpdateHistory/MoveToTemplate/MoveToTemplate";
import { clearSearchedResults, totalSimpeSearchedDocs, postSearchData } from "../../Redux/Actions/SimpleSearchAction/SimpleSearchAction";
import { updateSearchCriteria } from "../../Redux/Actions/UpdateSearchCriteriaAction/UpdateSearchCriteriaAction";
import { connect } from "react-redux";
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'

const { Title } = Typography;

class HomeScreenCard extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  cardOnClick = () => {
    const { children, historyProp, cardTitle, clearResult, uid } = this.props
    // let route = uid || uid === 0 ? (children ? `${cardTitle}${children}/${uid}` : `${cardTitle}/${uid}`) : cardTitle
    this.props.moveToTemplate(historyProp, cardTitle, children, uid)
    if (clearResult) {
      this.props.clearSearchedResults()
      this.props.totalSimpeSearchedDocs(null)
      this.props.postSearchData({}, true)
      this.props.updateSearchCriteria({})
    }
  }

  render() {
    const { cardTitle, iconName, dropdown } = this.props
    return (
      <div>
        <Card className={dropdown ? "" : "onHoverAction"}
          style={dropdown ? { ...style.homeScreen.homeScreenCardDropdown } : { ...style.homeScreen.homeScreenCard }}
          onClick={() => this.cardOnClick()}
        >
          <img title={cardTitle} src={require(`../../Assets/icons/SV_ICONS/${iconName}.png`)} alt={cardTitle} width={dropdown ? 50 : 60} />
          <div style={{ ...style.homeScreen.homeScreenCardDividerMainDiv }}>
            <div style={{ ...style.homeScreen.homeScreenCardDividerDiv }}>
              <Divider style={{ ...style.homeScreen.homeScreenCardDivider }} />
            </div>
          </div>
          <Title level={4} style={{ ...style.homeScreen.homeScreenCardTitle }}>{cardTitle}</Title>
        </Card>
      </div>
    )
  }
};

const mapDispatchToProps = dispatch => {
  return {
    moveToTemplate: (history, cardTitle, children, uid) => dispatch(moveToTemplate(history, cardTitle, children, uid)),
    clearSearchedResults: () => dispatch(clearSearchedResults()),
    totalSimpeSearchedDocs: searchedDataLength => dispatch(totalSimpeSearchedDocs(searchedDataLength)),
    postSearchData: (data, cancelRequest) => dispatch(postSearchData(data, cancelRequest)),
    updateSearchCriteria: (searchedData, searchType) => dispatch(updateSearchCriteria(searchedData, searchType)),
  }
};

export default compose(connect(null, mapDispatchToProps),
  withRouter
)(HomeScreenCard);
