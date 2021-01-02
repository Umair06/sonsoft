import React, { Component } from 'react';
import { IntlProvider, addLocaleData } from "react-intl";
import arLocaleData from "react-intl/locale-data/ar";
import esLocaleData from "react-intl/locale-data/es";
import translations from "./i18n/locales";
import App from "./App";

addLocaleData(arLocaleData);
addLocaleData(esLocaleData);

class AppWrapper extends Component {

  render() {
    const locale = window.location.search.replace("?locale=","") || "en";
    const messages = translations[locale];
    return (
      <IntlProvider locale={locale} key={locale} messages={messages}>
        <App />
      </IntlProvider>
    );
  }
}

export default AppWrapper;