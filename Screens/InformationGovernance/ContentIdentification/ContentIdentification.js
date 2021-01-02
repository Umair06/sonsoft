import React, { Component } from 'react';
import Template from "../../Container/Template/Template";
import ContentReview from "../../Screens/ContentIdentification/ContentReview/ContentReview"

const routes = [
  {
    path: '*',
    // exact:true,
    breadCrums: "Home",
    to: '/contentidentification',
  },
  {
    path: '*',
    // exact:true,
    breadCrums: "Content Identification",
    to: '/contentidentification',
  },

  {
    path: "/contentidentification/contentreview",
    breadCrums: "Content Review",
    main: () => <ContentReview />,
    iconName: "Content Revoew"
  },


]
class ContentIdentification extends Component {
  render() {
    return (
      <Template routes={routes} iconName="Content Revoew" heading="Content Identification" />
    )
  }
};

export default ContentIdentification;

