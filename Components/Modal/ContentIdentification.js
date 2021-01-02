import React from "react"
import { Drawer, Form, Input, Divider, Checkbox, Button, Select } from 'antd';
import { PrimaryButton } from "../Button/Button";
import { SecondryButton } from "../Button/Button";
import Datatable from "../../Components/DataTable/DataTable";
// import * as ApiInfo from "../../APIConfig/ApiParameters";


const { Option } = Select;
const { TextArea } = Input;
const data = [
    {
        key: '1',
        Edit: '',
        User_Logon: "Bilal Ahmad",
        Email_ID: "asrara@sonasoft.com",
    },
    {
        key: '2',
        Edit: '',
        User_Logon: "Asrar Alam",
        Email_ID: "bilala@sonasoft.com",
    },
];
const columns = [
    {
        title: 'Email ID',
        dataIndex: 'Email_ID',
        render: Email_ID => <div style={{ wordBreak: "break-all" }} >{Email_ID}</div>,
        key: 'Email ID',
    },
    {
        title: 'User Logon',
        dataIndex: 'User_Logon',
        render: User_Logon => <div style={{ wordBreak: "break-all" }} >{User_Logon}</div>,
        key: 'User Logon',
    },
];

class ContentIdentification extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            checkValue: [],
            mockData: [],
            targetKeys: [],
            abc: this.props.values ? this.props.values.abc : "",
        };
    }
    componentDidMount() {
        this.getMock();
    }
    getMock = () => {
        const targetKeys = [];
        const mockData = [];
        for (let i = 0; i < 20; i++) {
            const data = {
                key: i.toString(),
                title: `content${i + 1}`,
                description: `description of content${i + 1}`,
                chosen: Math.random() * 2 > 1,
            };
            if (data.chosen) {
                targetKeys.push(data.key);
            }
            mockData.push(data);
        }
        this.setState({ mockData, targetKeys });
    };

    filterOption = (inputValue, option) => option.description.indexOf(inputValue) > -1;

    handleChange = targetKeys => {
        this.setState({ targetKeys });
    };

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
    renderFooter = () => (
        <Button size="small" style={{ float: 'right', margin: 5 }} onClick={this.getMock}>
            reset
        </Button>
    );

    onSelect = (selectedKeys, info) => {
        //ApiInfo.DEBUGER && console.log('selected', selectedKeys, info);
    }
    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { values } = this.props;
        const { abc } = this.state;

        const { formatMessage } = this.props;
        // const messagesKeys = Object.keys(messages);
        // const messagesValues = Object.values(messages);
        // columns.forEach((c) => {
        //     messagesKeys.forEach((mK, index) => {
        //         if (c.key === mK) {
        //             // ApiInfo.DEBUGER && console.log(messagesValues[index]);
        //             c.title = formatMessage(messagesValues[index]);
        //         }
        //     })

        // })

        return (
            <div>

                <Drawer
                    title={values ? "Edit Content Identification Settings" : "Add Content Identification Settings"}
                    width={600}
                    onClose={() => this.props.close()}
                    closable={false}
                    visible={true}
                    maskStyle={{ backgroundColor: "transparent" }}
                >
                    <Form layout="vertical" onSubmit={this.handleSubmit}>

                        <Form.Item label="">
                            {getFieldDecorator('Policy Name : ', {
                                rules: [{ required: true, message: 'Please enter policy name ' }],
                            })(<div style={{ display: "flex", flexDirection: "row" }}><div style={{ width: "200px" }}>Policy Name : </div><Input value={abc} name="abc" onChange={e => this.onChange(e)} style={{ width: "350px" }} /></div>)}
                        </Form.Item>

                        <Form.Item label="">
                            {getFieldDecorator('Policy Description: ', {
                                rules: [{ required: true, message: 'Please enter policy description' }],
                            })(
                                <div style={{ display: "flex" }}><span style={{ width: "200px" }}>Policy Description: </span> <Input value={abc} name="abc" onChange={e => this.onChange(e)} style={{ width: "350px" }} /></div>,
                            )}
                        </Form.Item>

                        <Form.Item label="">
                            {getFieldDecorator('Enable :', {
                                rules: [{ required: true, message: 'Please choose to enable or disable' }],
                            })(
                                <div style={{ display: "flex", width: "inherit" }}><span style={{ width: "200px" }}>Enable : </span><Checkbox /></div>,
                            )}
                        </Form.Item>

                        <Form.Item label="">
                            {getFieldDecorator('Notification Option : ', {
                                rules: [{ required: true, message: 'Please enter notification option' }],
                            })(
                                <div style={{ display: "flex", width: "inherit" }}><span style={{ width: "36%" }}>Notification Option :	</span>
                                    <Select style={{ width: "64%", height: 40 }} defaultValue="1" onChange={this.handleChange}>
                                        <Option value="1">Don't Notify</Option>
                                        <Option value="2">Notify Immediately</Option>
                                        <Option value="3">Delayed Notification</Option>
                                    </Select>
                                </div>,
                            )}
                        </Form.Item>

                        <Divider />
                        <Form.Item label="">
                            {getFieldDecorator('Condition Name : ', {
                                rules: [{ required: true, message: 'Please enter condition name' }],
                            })(
                                <div style={{ display: "flex", width: "inherit" }}><span style={{ width: "36%" }}>Condition Name : </span>
                                    <Select style={{ width: "64%", height: 40 }} defaultValue="0" onChange={this.handleChange}>
                                        <Option value="0">Select One...</Option>
                                        <Option value="1">Sender</Option>
                                        <Option value="2">Sent Date</Option>
                                        <Option value="3">Subject</Option>
                                        <Option value="4">Mail Size</Option>
                                        <Option value="5">Priority</Option>
                                        <Option value="6">Received Date</Option>
                                        <Option value="7">Attachment Count</Option>
                                        <Option value="8">Lock Option</Option>
                                        <Option value="9">Public Folder Option</Option>
                                        <Option value="10">Message Expiry Option</Option>
                                        <Option value="11">To</Option>
                                        <Option value="12">Cc</Option>
                                        <Option value="13">Bcc</Option>
                                        <Option value="14">Label</Option>
                                        <Option value="15">Body</Option>
                                        <Option value="16">Attachment Name</Option>
                                        <Option value="17">Attachment Size</Option>
                                        <Option value="18">Attachment</Option>
                                        <Option value="19">Expiry Date</Option>
                                        <Option value="20">Standard Body</Option>
                                    </Select>
                                </div>,
                            )}
                        </Form.Item>

                        <Form.Item label="">
                            {getFieldDecorator('Condition Type : ', {
                                rules: [{ required: true, message: 'Please enter notification option' }],
                            })(
                                <div style={{ display: "flex", width: "inherit" }}><span style={{ width: "36%" }}>Condition Type : </span>
                                    <Select style={{ width: "64%", height: 40 }} defaultValue="0" onChange={this.handleChange}>
                                        <Option value="0">Select One...</Option>
                                    </Select>
                                </div>,
                            )}
                        </Form.Item>

                        <Form.Item label="">
                            {getFieldDecorator('Condition Value : ', {
                                rules: [{ required: true, message: 'Please enter condition value' }],
                            })(
                                <div style={{ display: "flex", width: "inherit" }}><span style={{ width: "36%" }}>Condition Value : </span>
                                    <Select style={{ width: "64%", height: 40 }} defaultValue="0" onChange={this.handleChange}>
                                        <Option value="0">Select One...</Option>
                                    </Select>
                                </div>,
                            )}
                        </Form.Item>

                        <Form.Item style={{ display: "flex", flexDirection: "row", justifyContent: "center", paddingTop: "10px" }}>
                            <div style={{ width: "200px", display: "flex" }}>
                                <PrimaryButton text="Add" />
                                <SecondryButton text="Cancel" />
                            </div>
                            <div style={{ width: "200px", display: "flex" }}>
                                <PrimaryButton text="AND" />
                                <SecondryButton text="OR" />
                                <PrimaryButton text="(" />
                                <SecondryButton text=")" />
                            </div>
                        </Form.Item>

                        <Divider />
                        <Form.Item label="">
                            {getFieldDecorator('text area', {
                                rules: [{ required: true, message: 'Please enter something in text area' }],
                            })(
                                <div style={{ display: "flex", width: "inherit" }}>
                                    <TextArea rows={3} autoSize={{ minRows: 3 }} />
                                </div>,
                            )}
                        </Form.Item>

                        <Form.Item label="">
                            <div style={{ margin: "10px 10px 0 10px" }}>
                                <Datatable rowSelection columns={columns} data={data} formatMessage={formatMessage}  />
                            </div>
                        </Form.Item>


                        {/* <Form.Item style={{ display: "flex", flexDirection: "row", justifyContent: "center", paddingTop: "10px" }}>
                            <div style={{ width: "200px", display: "flex" }}>
                                <PrimaryButton text="Save" htmlType="submit" />
                                <SecondryButton text="Cancel" onClick={() => this.props.close()} style={{ marginRight: 8 }} />
                            </div>
                        </Form.Item> */}

                    </Form>

                </Drawer>
            </div>
        );

    }
}

const HistoricDomainDrawerForm = Form.create('HistoricDomain')(ContentIdentification);

export default HistoricDomainDrawerForm;