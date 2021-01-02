import React, { Component } from 'react';
import Template from "../../Container/Template/Template";
import ContentReview from "./ContentReview/ContentReview"
import Identifications from "./ContentIdentifications/ContentIdentifications";



class ContentIdentification extends Component {
  routes = [
    {

      path: '/homescreen',
      exact: true,
      breadCrums: "Home",
      redirect: '/homescreen',
    },
    {
      path: '/contentidentification',
      exact: true,
      breadCrums: "Content Identification",
      redirect: "/contentidentification/contentreview"
    },

    {
      path: "/contentidentification/contentreview",
      breadCrums: "Content Review",
      iconName: "Content Revoew",
      redirect: "/contentidentification/contentreview",
      main: () => <ContentReview formatMessage={this.props.formatMessage} />
    },

    {
      path: "/contentidentification/contentidentification",
      breadCrums: "Content Identification",
      iconName: "Content Identification_Blue15",
      redirect: "/contentidentification/contentidentification",
      main: () => <Identifications formatMessage={this.props.formatMessage} />
    },

  ]
  render() {

    return (
      <Template imageFlag={true} formatMessage={this.props.formatMessage} routes={this.routes} iconName="Configuration Management_Blue" heading="Content Identification" />
    )
  }
};

export default ContentIdentification;
