import React, { Component } from 'react'
import { Drawer, Typography, Form, Checkbox } from "antd";
import style from "../../styles"
// import Theme from "../../Assets/Theme/Theme";
// import { SecondryButton } from "../Button/Button";
import Clear_Gray from '../../Assets/icons/SV_ICONS/Clear_Gray.png';
import { defineMessages } from 'react-intl';

const messages = defineMessages({
	'Column Configuration': {
		id: "ColumConfiguration.ColumnConfiguration",
		defaultMessage: "Column Configuration",
	},
})

// const { color } = Theme;
const { Title } = Typography;

class ColumConfiguration extends Component {
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
        const { customizedColums, customizeColumn, openCustomizedColumn, formatMessage, rowSelection } = this.props
        var columns = customizedColums;    
        if (rowSelection) { 
            columns = customizedColums.slice(1,customizedColums.length) }    
        return (
            <Drawer
                style={{ marginTop: 125, overflow: "auto" }}
                bodyStyle={{ height: 'calc(100vh - 125px)', overflowY: "auto" }}
                closable={false}
                maskStyle={{ backgroundColor: "transparent" }}
                width={400}
                visible={openCustomizedColumn}
                onClose={() => this.props.close()}
            >
                <div style={{ ...style.setting.drawerMain }}>
                    <div style={{...style.setting.drawerIconTitleWrapper}}>
                        <img title="Column Configuration" alt='Column Configuration' style={{...style.cursorPointer}} width="40px" src={require('../../Assets/icons/SV_ICONS/Columns_Blue.png')} />
                        <Title style={{...style.setting.drawerTitles}}>{formatMessage(messages["Column Configuration"])}</Title>
                    </div>
                    <div onClick={() => this.props.close()} style={{ paddingTop: 10, cursor: "pointer" }}>
                        <img src={Clear_Gray} title="Close" alt="" onClick={() => this.props.close()} width={28} height={28} />
                    </div>
                </div>

                <Form onSubmit={this.handleSubmit} className="login-form">
                    {columns && columns.map((val, index) => {
                        return (<Form.Item key={index} label="" style={{ margin: 0, padding: 3 }}>
                            {val.title && (
                                // <div style={{ border: "1px solid lightgrey", padding: 5, margin: 0, cursor: val.disabled && "pointer" }} onClick={() => val.disabled && customizeColumn(val)} onChange={() => customizeColumn(val)}>
                                <div style={{ border: "1px solid lightgrey", padding: 5, margin: 0, cursor: val.disabled && "pointer" }}>
                                    <div style={{ paddingLeft: "10px", display: "flex" }}>
                                        <Checkbox checked={!val.hide} onChange={() => customizeColumn(val)} disabled={!val.disabled} style={{...style.setting.drawerIconTitleWrapper}}>{val.title}</Checkbox>
                                    </div>
                                </div>
                            )}
                        </Form.Item>
                        )
                    }
                    )}


                    {/* <Form.Item>
                        <div style={{ display: "flex", justifyContent: "center",marginTop:20}} >
                            {/* <PrimaryButton text="Submit" /> */}
                    {/* <SecondryButton text="Cancel" onClick={() => this.props.close()} /> 
                        </div>
                    </Form.Item> */}
                </Form>
            </Drawer>
        )
    }
};

const WrappedColumConfiguration = Form.create({ name: 'forward_Controls' })(ColumConfiguration);

export default WrappedColumConfiguration;
