import React, { Component } from 'react'
import { Drawer, Typography } from "antd";
import profile from "../../../Assets/icons/SV_ICONS/EditProfile_Blue.png";
import style from "../../../styles";
import Clear_Gray from '../../../Assets/icons/SV_ICONS/Clear_Gray.png';

import Theme from "../../../Assets/Theme/Theme";
// import { defineMessages } from 'react-intl';

// messages = defineMessages({
// 	'Recipients': {
// 		id: "RecipentsDrawer.Recipients", 
// 		defaultMessage: "Recipients",
// 	},
// 	'Labels': {
// 		id: "RecipentsDrawer.Labels", 
// 		defaultMessage: "Labels",
// 	},
// })

const { Title } = Typography
const { color } = Theme

class RecipientDrawer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { recipents, recipentsDrawer } = this.props
    return (
      <Drawer
        style={{ marginTop: "162px", overflow: "auto" }} qq
        bodyStyle={{ height: 'calc(100vh - 162px)', overflowY: "auto" }}
        maskStyle={{ backgroundColor: "transparent" }}
        width={400}
        onClose={() => this.props.close()}
        closable={false}
        visible={recipentsDrawer}
      >
        <p style={{ padding: "0px 10px", display: "flex", flexDirection: "column" }}>
          <div style={{ ...style.setting.drawerMain }}>
            <div style={{ display: "flex", alignItems: "center", }}>
              <img title="Recipents" src={profile} width="45px" style={{ ...style.cursorPointer }} alt="" />
              <Title style={{ color: color.Blue, paddingBottom: 10, padding: "15px 0 0 18px", fontSize: 24 }} level={2}>Recipients</Title>
            </div>
            <div onClick={() => this.props.close()} style={{ paddingTop: 10, cursor: "pointer" }}>
              <img
                src={Clear_Gray} title="Close" alt="" onClick={() => this.props.close()} width={28} height={28} />
            </div>
          </div>
          <p style={{ width: 350, backgroundColor: "#fff" }}>
            {recipents && recipents.length > 0 && recipents.map((recipient, ind) => <p key={ind} style={{ margin: "10px 0px" }}>{recipient}</p>)}
          </p>
        </p>
      </Drawer>
    )
  }
};

export default RecipientDrawer;
