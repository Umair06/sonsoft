import React, { Component } from 'react';
import { Drawer, Typography, } from 'antd';
import Clear_Gray from '../../Assets/icons/SV_ICONS/Clear_Gray.png';
//import Theme from "../../Assets/Theme/Theme";
import { defineMessages } from 'react-intl';
import style from '../../styles'

const messages = defineMessages({
  'Granted Mailboxes': {
    id: "EmailModal.GrantedMailboxes",
    defaultMessage: "Granted Mailboxes",
  },
})

// const { Option } = Select
//const { color } = Theme
const { Title, Text } = Typography

class EmailModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      visible: true,
    };
  }
  handleChange = e => {
  }

  render() {
    const { emailModal, data, formatMessage } = this.props
    return (

      <Drawer
        width={400}
        visible={emailModal}
        maskStyle={{ backgroundColor: "transparent" }}
        footer={null}
        onClose={() => this.props.close()}
        closable={false}
      >

        <div style={{ ...style.setting.drawerMain }}>
          <div style={{ ...style.setting.drawerIconTitleWrapper }}>

            <Title style={{ ...style.setting.drawerTitles }}>{formatMessage(messages["Granted Mailboxes"])}</Title>
          </div>
          <div onClick={() => this.props.close()} style={{ paddingTop: 10, cursor: "pointer" }}>
            <img src={Clear_Gray} title="Close" alt="" onClick={() => this.props.close()} width={28} height={28} />
          </div>
        </div>
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          {data && data.map((val, ind) =>
            <div key={ind}>
              <Text style={{ fontWeight: 700 }}>{val.userLogon}: </Text> <Text>{val.Email_ID}</Text>
              {ind === data.length - 1 ? "" : <hr />}
            </div>
          )}

        </div>

      </Drawer>
    );
  }
}
export default EmailModal
