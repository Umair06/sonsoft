import React, { Component } from 'react'
import { Drawer, Typography, Form, Checkbox, Icon, Row, Col } from "antd";
import style from "../../../styles"
import Theme from "../../../Assets/Theme/Theme";
import { PrimaryButton, SecondryButton } from "../../Button/Button";
import { defineMessages } from 'react-intl';

const messages = defineMessages({
    'My Archive Emails': {
        id: "MyArchiveEmails.MyArchiveEmails",
        defaultMessage: "My Archive Emails",
    },
    'Submit': {
        id: "MyArchiveEmails.Submit",
        defaultMessage: "Submit"
    },
    'Cancel': {
        id: "MyArchiveEmails.Cancel",
        defaultMessage: "Cancel"
    },
})

const { color } = Theme;
const { Title } = Typography;

class MyArchiveEmails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 1
        }
    }
    onChange = e => {
        this.setState({
            value: e.target.value,
        });
    };
    render() {
        const { customizedColums, customizeColumn, formatMessage } = this.props
        return (
            <div>
                <Drawer
                    style={{ marginTop: 125 }}
                    closable={false}
                    maskStyle={{ backgroundColor: "transparent" }}
                    width={400}
                    title={<div style={{ display: "flex", alignItems: "center", height: 28 }}>
                        <img title="My Archive Emails" alt='' style={{...style.cursorPointer}} width="40px" src={require('../../../Assets/icons/Icon Library/Icon Library/Reporting_Orange.png')} />
                        <Title style={{ color: `${color.Blue}`, padding: "15px 0 0 5px", fontSize: 24 }}>{formatMessage(messages["My Archive Emails"])}</Title>
                    </div>}
                    visible={true}
                >

                    <Form onSubmit={this.handleSubmit} className="login-form">

                        {customizedColums.map((val, ind) =>
                            <Form.Item key={ind} label="" style={{ margin: 0, padding: 3 }}>

                                {val.title &&
                                    <div style={{ border: "1px solid lightgrey" }}>
                                        <div style={{ paddingLeft: "10px" }}>
                                            <Checkbox checked={!val.hide} onChange={() => customizeColumn(val)}> {val.title}</Checkbox>
                                        </div>
                                    </div>}
                            </Form.Item>
                        )}

                        <Form.Item>
                            <Row gutter={16} style={{ display: "flex", marginTop: 50 }}>
                                <Col span={4}>
                                    <Icon style={{ fontSize: 40, color: `${color.Blue}` }} type="file-excel" />
                                </Col>
                                <Col span={4}>
                                    <Icon style={{ fontSize: 40, color: `${color.Blue}` }} type="file-pdf" />
                                </Col>
                            </Row>
                        </Form.Item>


                        <Form.Item>
                            <div style={{ display: "flex", justifyContent: "center", padding: "30px" }} >
                                <PrimaryButton text={formatMessage(messages["Submit"])} />
                                <SecondryButton text={formatMessage(messages["Cancel"])} onClick={() => this.props.close()} />
                            </div>
                        </Form.Item>
                    </Form>
                </Drawer>
            </div >
        )
    }
};

const WrappedMyArchiveEmails = Form.create({ name: 'forward_Controls' })(MyArchiveEmails);

export default WrappedMyArchiveEmails;
