import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import pageHeaderReducer from "./pageHeader/pageHeader";
import UserManagementReducer from "./UserManagementReducer/UserManagementReducer";
import RoleManagementReducer from "./RoleManagementReducers/RoleManagementReducer";
import ConfigurationReducer from "./ConfigurationReducer/ConfigurationReducer";
import SimpleSearchReducer from "./SimpleSearchReducer/SimpleSearchReducer";
import ArchivalPolicyReducer from "./Policies/ArchivalPolicyReducer";
import MoveToTemplateReducer from "./MoveToTemplate/MoveToTemplate";
import FolderSyncReducer from "./Policies/FolderSyncReducer";
import StubPolicyReducer from "./Policies/StubPolicyReducer";
import RetentionPolicyReducer from "./Policies/RetentionPolicyReducer";
import AutoLabelingReducer from "./Policies/AutoLabelingReducer";
import UpdateSearchCriteriaReducer from "./UpdateSearchCriteriaReducer/UpdateSearchCriteriaReducer";
import UpdateDataTablePageSizeTypes from "./UpdateDataTablePageSizeTypes/UpdateDataTablePageSizeTypes";
import ExportReducer from "./ExportReducer/ExportReducer";
import ControlCenterReducer from "./ControlCenterReducer/ControlCenterReducer";
import AdvancedSearchReducer from "./AdvancedSearchReducer/AdvancedSearchReducer";
import LegalHoldsReducer from "./LegalHoldsReducer/LegalHoldsReducer";
import EmailServerReducer from "./EmailServerReducer/EmailServerReducer";
import HistoricDomainReducer from "./HistoricDomainReducer/HistoricDomainReducer";
import SecurityReducer from "./SecurityReducer/SecurityReducer";
import NotificationReducer from "./NotificationReducer/NotificationReducer";
import MyArchivedEmailReducer from "./MyArchivedEmailsReducer/MyArchivedEmailsReducer";
import LoginReducer from "./LoginReducer/LoginReducer";
import ForwardReducer from "./ReadingPaneReducer/ForwardReducer";
import DownloadReducer from "./ReadingPaneReducer/DownloadReducer";
import FactoidAnswerReducer from "./ReadingPaneReducer/FactoidAnswerReducer";
import UserTasksReducer from "./UserTaksReducer/UserTasksReducer";
import SystemTasksReducer from "./SystemTasksReucer/SystemTasksReducer";
import RouteRolesReducer from "./RouteRolesReducer/RouteRolesReducer";
import ApplyLegalHoldReducer from "./ApplyLegalHoldReducer/ApplyLegalHoldReducer";
import updateSelectedRecordsReducer from "./updateSelectedRecordsReducer/updateSelectedRecordsReducer";
import MultiTenantReducer from "./MultiTenantReducer/MultiTenantReducer";
import ActionRowReducer from "./ActionRowReducer/ActionRowReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["RouteRolesReducer", "MultiTenantReducer", "LoginReducer", "SimpleSearchReducer"]
};

const rootReducer = combineReducers({
  AdvancedSearchReducer,
  pageHeaderReducer,
  UserManagementReducer,
  RoleManagementReducer,
  ConfigurationReducer,
  SimpleSearchReducer,
  MoveToTemplateReducer,
  ArchivalPolicyReducer,
  FolderSyncReducer,
  StubPolicyReducer,
  RetentionPolicyReducer,
  UpdateSearchCriteriaReducer,
  ExportReducer,
  UpdateDataTablePageSizeTypes,
  ControlCenterReducer,
  LegalHoldsReducer,
  EmailServerReducer,
  HistoricDomainReducer,
  SecurityReducer,
  NotificationReducer,
  MyArchivedEmailReducer,
  AutoLabelingReducer,
  LoginReducer,
  ForwardReducer,
  DownloadReducer,
  UserTasksReducer,
  SystemTasksReducer,
  RouteRolesReducer,
  ApplyLegalHoldReducer,
  updateSelectedRecordsReducer,
  MultiTenantReducer,
  FactoidAnswerReducer,
  ActionRowReducer,
});

export default persistReducer(persistConfig, rootReducer);
