import React from "react"
import moment from 'moment';
import { Drawer, Form, Input, Select, DatePicker } from 'antd';
import { PrimaryButton } from "../Button/Button";
import { SecondryButton } from "../Button/Button"
import { defineMessages } from 'react-intl';
import * as ApiInfo from "../../APIConfig/ApiParameters";


const messages = defineMessages({
	'Add New Case': {
		id: "AddNewCase.AddNewCase",
		defaultMessage: "Add New Case",
	},
	'From:': {
		id: "AddNewCase.From",
		defaultMessage: "From:"
	},
	'To:': {
		id: "AddNewCase.To",
		defaultMessage: "To:"
	},
	'Type': {
		id: "AddNewCase.Type",
		defaultMessage: "Type"
	},
	'Primary Attorney': {
		id: "AddNewCase.PrimaryAttorney",
		defaultMessage: "Primary Attorney"
	},
	'Team': {
		id: "AddNewCase.Team",
		defaultMessage: "Team"
    },
    'Please choose the approver': {
		id: "AddNewCase.PleaseChooseTheApprover",
		defaultMessage: "Please choose the approver",
	},
	'Save': {
		id: "AddNewCase.Save",
		defaultMessage: "Save"
	},
	'Cancel': {
		id: "AddNewCase.Cancel",
		defaultMessage: "Cancel"
	},
})

const { Option } = Select
const dateFormat = 'YYYY/MMM/DD';
let Type = ['All']

class AdSetting extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            checkValue: [],
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                // ApiInfo.DEBUGER && console.log("error", err)
            }
            else {
                // ApiInfo.DEBUGER && console.log("values", values)
            }
        });
    }

    AdSettingSelect = e => {
        this.setState({
            AdSettingOption: e.target.value,
        });
    };
    selectAzure = () => {
        let azureSelected = this.state.azure
        this.setState({
            azure: !azureSelected
        })
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const {formatMessage} = this.props;
        return (
            <div>

                <Drawer
                    style={{ height: "100vh", overflow: "hidden", marginTop: 125 }}
                    bodyStyle={{ height: "100vh", overflowY: "auto" }}
                    title={formatMessage(messages["Add New Case"])}
                    width={400}
                    closable={false}
                    onClose={() => this.props.close()}
                    visible={true}
                    maskStyle={{ backgroundColor: "transparent" }}
                >
                    <Form layout="vertical" onSubmit={this.handleSubmit}>

                        <Form.Item label={formatMessage(messages["From:"])}>
                            {getFieldDecorator('From', {

                            })(<div><DatePicker dropdownClassName="Calender" defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} style={{ width: "100%" }} /></div>)}
                        </Form.Item>

                        <Form.Item label={formatMessage(messages["To:"])}>
                            {getFieldDecorator('To', {

                            })(
                                <div><DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} style={{ width: "100%" }} /></div>
                            )}
                        </Form.Item>

                        <Form.Item label={formatMessage(messages["Type"])}>
                            {getFieldDecorator('Type', {

                            })(
                                <div>
                                    <Select
                                        showSearch
                                        style={{ width: "100%",height:40 }}
                                        placeholder={formatMessage(messages["Type"])}
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        <Option value={Type[0]}>{Type[0]}</Option>
                                    </Select>
                                </div>
                            )}
                        </Form.Item>

                        <Form.Item label={formatMessage(messages["Primary Attorney"])}>
                            {getFieldDecorator('Primary Attorney', {

                            })(
                                <div><Input placeholder={formatMessage(messages["Primary Attorney"])} /></div>,
                            )}
                        </Form.Item>

                        <Form.Item label={formatMessage(messages["Team"])}>
                            {getFieldDecorator('Team ', {
                                rules: [{ required: true, message: formatMessage(messages["Please choose the approver"]) }],
                            })(
                                <div>
                                    <Select
                                        showSearch
                                        style={{ width: "100%" ,height:40}}
                                        placeholder={formatMessage(messages["Team"])}
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        <Option value={Type[0]}>{formatMessage(messages[Type[0]])}</Option>
                                    </Select>
                                </div>
                            )}
                        </Form.Item>

                        <Form.Item>
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                <PrimaryButton text={formatMessage(messages["Save"])} htmlType="submit" />
                                <SecondryButton text={formatMessage(messages["Cancel"])} onClick={() => this.props.close()} style={{ marginRight: 8 }} />
                            </div>
                        </Form.Item>

                    </Form>

                </Drawer>
            </div >
        );
    }
}

const AdSettingDrawerForm = Form.create('AdSetting')(AdSetting);

export default AdSettingDrawerForm