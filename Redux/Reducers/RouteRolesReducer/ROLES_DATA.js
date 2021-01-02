// import ContentIdentification from "../../../Screens/ContentIdentification/ContentIdentification";
import { version } from "../../../APIConfig/Config";

const HomeScreenTilesData =

  version > 7.2 ?
    {
      CONTROL_CENTER: {
        id: "homeScreen.controlCenterCard",
        cardTitle: "CONTROL CENTER",
        defaultMessage: "CONTROL_CENTER",
        iconName: "Configuration Management_Blue",
        children: "/statistic"
      },

      MY_ARCHIVED_EMAIL: {
        id: "homeScreen.myArchivedEmailCard",
        cardTitle: "MY ARCHIVED EMAIL",
        defaultMessage: "MY_ARCHIVED_EMAIL",
        iconName: "My Archived Emails_Blue",
        children: ""
      },
      SEARCH_ARCHIVE: {
        id: "homeScreen.searchArchiveCard",
        cardTitle: "SEARCH ARCHIVE",
        defaultMessage: "SEARCH_ARCHIVE",
        iconName: "Search Archive_Blue",
        children: ""
      },
      LEGAL_HOLDS: {
        id: "homeScreen.legalHoldsCard",
        cardTitle: "LEGAL HOLDS",
        defaultMessage: "LEGAL_HOLDS",
        iconName: "Acces Contril_Blue",
        children: ""
      },
      EXPORTS: {
        id: "homeScreen.exportsCard",
        cardTitle: "EXPORTS",
        defaultMessage: "EXPORTS",
        iconName: "Exports_Blue",
        children: "/tasks"
      },

      POLICIES: {
        id: "homeScreen.policiesCard",
        cardTitle: "POLICIES",
        defaultMessage: "POLICIES",
        iconName: "Policies_Blue",
        children: '/archival'
      },
      REPORTS: {
        id: "homeScreen.reportingCard",
        cardTitle: "REPORTS",
        defaultMessage: "REPORTS",
        iconName: "Reporting_Blue",
        children: "/archivedemails"
      },
      CONTENT_IDENTIFICATION: {
        id: "homeScreen.contentidentificationCard",
        cardTitle: "CONTENT IDENTIFICATION",
        defaultMessage: "CONTENT IDENTIFICATION",
        iconName: "Configuration Management_Blue",
        children: "/contentreview"
      },
      SCHEDULER: {
        id: 'homeScreen.schedulerCard',
        cardTitle: 'SCHEDULER',
        defaultMessage: 'SCHEDULER',
        iconName: 'Stub Policy_Blue',
        children: '/systemtasks',
      }
    }
    :
    {
      CONTROL_CENTER: {
        id: "homeScreen.controlCenterCard",
        cardTitle: "CONTROL CENTER",
        defaultMessage: "CONTROL_CENTER",
        iconName: "Configuration Management_Blue",
        children: "/statistic"
      },

      MY_ARCHIVED_EMAIL: {
        id: "homeScreen.myArchivedEmailCard",
        cardTitle: "MY ARCHIVED EMAIL",
        defaultMessage: "MY_ARCHIVED_EMAIL",
        iconName: "My Archived Emails_Blue",
        children: ""
      },
      SEARCH_ARCHIVE: {
        id: "homeScreen.searchArchiveCard",
        cardTitle: "SEARCH ARCHIVE",
        defaultMessage: "SEARCH_ARCHIVE",
        iconName: "Search Archive_Blue",
        children: ""
      },
      LEGAL_HOLDS: {
        id: "homeScreen.legalHoldsCard",
        cardTitle: "LEGAL HOLDS",
        defaultMessage: "LEGAL_HOLDS",
        iconName: "Acces Contril_Blue",
        children: ""
      },
      EXPORTS: {
        id: "homeScreen.exportsCard",
        cardTitle: "EXPORTS",
        defaultMessage: "EXPORTS",
        iconName: "Exports_Blue",
        children: "/tasks"
      },

      POLICIES: {
        id: "homeScreen.policiesCard",
        cardTitle: "POLICIES",
        defaultMessage: "POLICIES",
        iconName: "Policies_Blue",
        children: '/archival'
      },
      SCHEDULER: {
        id: 'homeScreen.schedulerCard',
        cardTitle: 'SCHEDULER',
        defaultMessage: 'SCHEDULER',
        iconName: 'Stub Policy_Blue',
        children: '/systemtasks',
      }
    };

const {
  CONTROL_CENTER,
  MY_ARCHIVED_EMAIL,
  SEARCH_ARCHIVE,
  LEGAL_HOLDS,
  EXPORTS,
  POLICIES,
  CONTENT_IDENTIFICATION,
  REPORTS,
  SCHEDULER
} = HomeScreenTilesData;

const ROLES_DATA = {
  "-3": {
    roll: "EAS SUPER REVIEWER",
    id: -3,
    paths: [
      "/homescreen",
      "/exports",
      "/legalholds",
      "/searcharchive",
      "/case",
      "/savedsearch"
    ],
    tiles: [SEARCH_ARCHIVE, LEGAL_HOLDS, EXPORTS]
  },

  "-2": {
    roll: "EAS REVIEWER",
    id: -2,
    paths: [
      "/homescreen",
      "/exports",
      "/searcharchive",
      "/legalholds",
      "/case"
    ],
    tiles: [LEGAL_HOLDS, EXPORTS]
  },

  "-1": {
    roll: "EAS READ ONLY",
    id: -1,
    paths: version > 7.2 ? [
      "/homescreen",
      "/myarchivedemail",
      "/exports",
      "/help",
      "/whatsnew",
      "/setting",
      "/controlcenter",
      "/legalholds",
      "/case",
      "/notifications",
      "/savedsearch",
      "/reports",
      "*",
      "/searcharchive",
      "/contentidentification",
      "/case",
      "/scheduler"
    ] : [
        "/homescreen",
        "/myarchivedemail",
        "/exports",
        "/help",
        "/whatsnew",
        "/setting",
        "/controlcenter",
        "/legalholds",
        "/case",
        // "/notifications",
        "/savedsearch",
        // "/reports",
        "*",
        "/searcharchive",
        // "/contentidentification",
        "/case",
        "/scheduler"
      ],
    tiles: version > 7.2 ? [
      CONTROL_CENTER,
      MY_ARCHIVED_EMAIL,
      SEARCH_ARCHIVE,
      LEGAL_HOLDS,
      EXPORTS,
      POLICIES,
      REPORTS,
      CONTENT_IDENTIFICATION,
      SCHEDULER
    ] : [
        CONTROL_CENTER,
        MY_ARCHIVED_EMAIL,
        SEARCH_ARCHIVE,
        LEGAL_HOLDS,
        EXPORTS,
        POLICIES,
        // REPORTS,
        // CONTENT_IDENTIFICATION,
        SCHEDULER
      ]
  },

  "0": {
    roll: "EAS NOT UI ACCESS",
    id: 0,
    paths: [],
    tiles: []
  },

  "1": {
    roll: "EAS ADMINISTRATOR",
    id: 1,
    paths: version > 7.2 ? [
      "/homescreen",
      "/myarchivedemail",
      "/exports",
      "/help",
      "/whatsnew",
      "/setting",
      "/controlcenter",
      "/legalholds",
      "/exports",
      "/case",
      "/notifications",
      "/savedsearch",
      "/searcharchive",
      '/policies',
      "/reports",
      "/contentidentification",
      "*",
      "/scheduler"
    ] : [
        "/homescreen",
        "/myarchivedemail",
        "/exports",
        "/help",
        "/whatsnew",
        "/setting",
        "/controlcenter",
        "/legalholds",
        "/exports",
        "/case",
        // "/notifications",
        "/savedsearch",
        "/searcharchive",
        '/policies',
        // "/reports",
        // "/contentidentification",
        "*",
        "/scheduler"
      ],
    tiles: version > 7.2 ? [
      CONTROL_CENTER,
      MY_ARCHIVED_EMAIL,
      SEARCH_ARCHIVE,
      LEGAL_HOLDS,
      EXPORTS,
      POLICIES,
      REPORTS,
      CONTENT_IDENTIFICATION,
      SCHEDULER
    ] : [
        CONTROL_CENTER,
        MY_ARCHIVED_EMAIL,
        SEARCH_ARCHIVE,
        LEGAL_HOLDS,
        EXPORTS,
        POLICIES,
        // REPORTS,
        // CONTENT_IDENTIFICATION,
        SCHEDULER
      ]
  },

  "2": {
    roll: "EAS AUDITOR",
    id: 2,
    paths: ["/homescreen", "/exports"],
    tiles: [EXPORTS]
  },

  "3": {
    roll: "EAS GENERAL USER",
    id: 3,
    paths: ["/homescreen", "/myarchivedemail"],
    tiles: [MY_ARCHIVED_EMAIL]
  }
};

export default ROLES_DATA;
