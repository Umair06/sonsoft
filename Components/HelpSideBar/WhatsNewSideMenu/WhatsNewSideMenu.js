import React, { Component } from "react";
import { Tree, Typography, Icon, Form, Input, DatePicker, Menu } from "antd";
import style from "../../../styles";
import rightArrow from "../../../Assets/icons/Side Column Arrow Expand.png";
import leftArrow from "../../../Assets/icons/Side Column Arrow compressed.png";
// import Search from "antd/lib/input/Search";
import { defineMessages } from "react-intl";

const messages = defineMessages({
  "Contents": {
    id: "WhatsNewSideMenu.Contents",
    defaultMessage: "Contents"
  },
  "WHATS NEW": {
    id: "WhatsNewSideMenu.WHATS_NEW",
    defaultMessage: "WHATS NEW"
  },
  "RESOLVED ISSUES": {
    id: "WhatsNewSideMenu.RESOLVED_ISSUES",
    defaultMessage: "RESOLVED ISSUES"
  },
  "KNOWN ISSUES": {
    id: "WhatsNewSideMenu.KNOWN_ISSUES",
    defaultMessage: "KNOWN ISSUES"
  },
  "LIMITATIONS": {
    id: "WhatsNewSideMenu.LIMITATIONS",
    defaultMessage: "LIMITATIONS"
  }
});
const { TreeNode } = Tree;
const { Text } = Typography;

class WhatsNewSideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: true,
      search: false
    };
  }

  render() {
    const { collapsed, collapseSideMenu, formatMessage } = this.props;
    const { filter, search } = this.state;
    return (
      <div style={{ ...style.sideMenuHeight }}>
        <div
          style={
            collapsed ? style.collapsedHelpSideMenuIcon : style.helpSideMenuIcon
          }
        >
          {collapsed ? (
            <div
              onClick={collapseSideMenu}
              style={{
                cursor: "pointer",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                webkitTransition: "all 0.9s ease-in-out" 
}}
            >
              <img
                title="Forward"
                src={rightArrow}
                style={{ cursor: "pointer" }}
                alt={"button"}
                width={35}
                height={35}
              />
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                width: "100%",
                
              }}
            >
              <Text style={{ ...style.pageHeaderSideBarContent }}>
                {formatMessage(messages["Contents"])}
              </Text>
              <img
                title="Backward"
                src={leftArrow}
                alt={"button"}
                style={{ cursor: "pointer" }}
                width={35}
                height={35}
                onClick={collapseSideMenu}
              />
            </div>
          )}
        </div>
        {!collapsed && (
          <div style={{ padding: "70px 0px", WebkitTransition: "all 0.5s ease-in-out" }}>
            <Menu
              style={{ backgroundColor: "transparent",}}
              mode="inline"
              defaultSelectedKeys={["1"]}
            >
              <Menu.Item
                key="1"
                style={{ height: 50, width: "100%", fontSize: 17 }}
              >
                <img
                  title="What's New"
                  src={require("../../../Assets/icons/SV_ICONS/WhatsNew_Blue.png")}
                  width={45}
                />
                <span>{formatMessage(messages["WHATS NEW"])}</span>
              </Menu.Item>
              <Menu.Item
                key="2"
                style={{ height: 50, width: "100%", fontSize: 17 }}
              >
                <img
                  title="Resolved Issues"
                  src={require("../../../Assets/icons/SV_ICONS/ResolvedIssues_Blue.png")}
                  width={45}
                />
                <span>{formatMessage(messages["RESOLVED ISSUES"])}</span>
              </Menu.Item>
              <Menu.Item
                key="3"
                style={{ height: 50, width: "100%", fontSize: 17 }}
              >
                <img
                  title="Known Issues"
                  src={require("../../../Assets/icons/SV_ICONS/KnownIssues_Blue.png")}
                  width={45}
                />
                <span>{formatMessage(messages["KNOWN ISSUES"])}</span>
              </Menu.Item>
              <Menu.Item
                key="4"
                style={{ height: 50, width: "100%", fontSize: 17 }}
              >
                <img
                  title="Limitations"
                  src={require("../../../Assets/icons/SV_ICONS/Limitations_Blue.png")}
                  width={45}
                />
                <span>{formatMessage(messages["LIMITATIONS"])}</span>
              </Menu.Item>
            </Menu>
          </div>
        )}
      </div>
    );
  }
}

export default WhatsNewSideMenu;
