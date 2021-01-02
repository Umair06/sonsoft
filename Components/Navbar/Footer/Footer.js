import React, { Component } from 'react';
import style from "../../../styles"
import { Row, Col } from 'antd';
import FooterLogo from "../../../Assets/icons/Logo/Footer.png"
import { defineMessages } from 'react-intl';
import { version } from "../../../APIConfig/Config";

const messages = defineMessages({
  'Copyright (c) Sonasoft 2020': {
    id: "Footer.Copyright_(c)_Sonasoft_2020",
    defaultMessage: "Copyright (c) Sonasoft 2020",
  },
  'Version 7.0': {
    id: "Footer.Version7",
    defaultMessage: "Version 7.0"
  },
  'Sonasoft.com': {
    id: "Footer.Sonasoft.com",
    defaultMessage: "Sonasoft.com"
  },
})

class Footer extends Component {
  render() {
    const { formatMessage } = this.props;

    return (
      <div style={{ ...style.footer.container }}>
        <Row type="flex" justify="center">
          <img src={FooterLogo} title="Sonavault" alt="Sonavault Logo" />
        </Row>
        <Row type="flex" justify="center" style={{ ...style.footer.text }}>
        {formatMessage(messages["Copyright (c) Sonasoft 2020"])}
          </Row>
        <Row>
          <Col push={7} span={10} style={{ display: "flex", justifyContent: "center", color: style.footer.text.color, fontSize: style.footer.text.fontSize }}>
            Sonasoft.com
            </Col>
          <Col style={{ display: "flex", justifyContent: "flex-end", marginRight: 15, color: style.footer.text.color, fontSize: style.footer.text.fontSize }}>
            Version {version === 7.0 ? "7.0" : String(version)}
          </Col>
        </Row>
      </div>
    )
  }
};

export default Footer;
