import React from 'react'
import { PrimaryButton, SecondryButton } from "../Button/Button";
import { Drawer, Typography, message, Form, Icon } from "antd";
import Text from 'antd/lib/typography/Text';
import style from "../../styles"
import { defineMessages } from 'react-intl';
import Theme from "../../Assets/Theme/Theme";
import Clear_Gray from '../../Assets/icons/SV_ICONS/Clear_Gray.png';


const messages = defineMessages({
  'Apply Labels': {
    id: "GlobalLabel.ApplyLabels",
    defaultMessage: "Apply Labels",
  },
  'Remove Labels': {
    id: "GlobalLabel.Remove Labels",
    defaultMessage: "Remove Labels"
  },
  'Apply': {
    id: "GlobalLabel.Apply",
    defaultMessage: "Apply"
  },
})

function ConfirmationDrawer(props) {
  const {
    formatMessage,
    warningMessage,
    confirmDrawer,
    closeAndReset,
    handleSubmit,
    reopenTheGlobalLabeLDrawer,
    remove, apply } = props
  const { Title } = Typography;
  const { color } = Theme;


  return (
    <div>
      <Drawer
        style={{ marginTop: 125 }}
        bodyStyle={{ height: 'calc(100vh - 125px)', overflowY: "auto" }}
        closable={false}
        mask={true}
        maskClosable={true}
        maskStyle={{ backgroundColor: "transparent" }}
        width={400}
        visible={confirmDrawer}
        onClose={() => closeAndReset()}
      >
        <div style={{ ...style.setting.drawerMain }}>
          <div style={{ ...style.setting.drawerIconTitleWrapper }}>
            <Title
              style={{
                color: `${color.Blue}`, padding: "15px 0 0 5px", fontSize: 24
              }}
            >
              {formatMessage(messages[`${remove ? "Remove Labels" : "Apply Labels"}`])}
            </Title>
          </div>
          <img src={Clear_Gray} title="Close" alt="" onClick={() => closeAndReset()}
            width={28} height={28} 
          />
        </div>

        <Form onSubmit={(e) => handleSubmit(e)} className="login-form">
          <Form.Item >

            <div>
              <Text style={{ padding: "0px 20px", }}>
                Are you sure you want {`${apply || remove}`} this label ?
              </Text>
            </div>

            {warningMessage && message.warning(
              <span>
                {warningMessage}
                <Icon className="closebtn" onClick={() => message.destroy && message.destroy()} />
              </span>,
              5)}

            <div style={{ display: "flex", justifyContent: "center", padding: "30px" }} >

              <PrimaryButton text="Yes" htmlType='submit' />
              <SecondryButton text="No" onClick={() => reopenTheGlobalLabeLDrawer()} />

            </div>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  )
}

export default ConfirmationDrawer

