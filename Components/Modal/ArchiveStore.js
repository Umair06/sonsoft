import React from "react"
import { Drawer, Form, Input, Checkbox } from 'antd';
import style from "../../styles";
import { PrimaryButton } from "../Button/Button";
import { SecondryButton } from "../Button/Button";
import datatree from "../../Redux/TreeData/datatree.json";
import { defineMessages } from 'react-intl';

const messages = defineMessages({
	'Archive Store Name': {
		id: "ArchiveStore.ArchiveStoreName",
		defaultMessage: "Archive Store Name",
	},
	'Please enter store name': {
		id: "ArchiveStore.PleaseEnterStoreName",
		defaultMessage: "Please enter store name"
	},
	'Archive Store Database Name': {
		id: "ArchiveStore.ArchiveStoreDatabaseName",
		defaultMessage: "Archive Store Database Name"
	},
	'Please enter database name': {
		id: "ArchiveStore.PleaseEnterDatabaseName",
		defaultMessage: "Please enter database name"
	},
	'Enable Sync :': {
		id: "ArchiveStore.EnableSync",
		defaultMessage: "Enable Sync :"
	},
	'Search Allowed': {
		id: "ArchiveStore.SearchAllowed",
		defaultMessage: "Search Allowed"
	},
	'Archive Allowed': {
		id: "ArchiveStore.ArchiveAllowed",
		defaultMessage: "Archive Allowed"
	},
	'Save': {
		id: "ArchiveStore.Save",
		defaultMessage: "Save"
	},
	'Cancel': {
		id: "ArchiveStore.Cancel",
		defaultMessage: "Cancel"
	},
})

class ArchiveStore extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            checkValue: [],
            data: datatree.treeData,
            abc: this.props.values ? this.props.values.abc : "",
        };
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                //ApiInfo.DEBUGER && console.log("error", err)
            }
            else {
                // ApiInfo.DEBUGER && console.log("values", values)
            }
        });
    }
    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { values, formatMessage } = this.props;
        const { abc } = this.state;

        return (
            <div>

                <Drawer
                    // title={this.props.edit}
                    title={values ? this.props.edit : ""}
                    onClose={() => this.props.close()}
                    width={400}
                    visible={true}
                    maskStyle={{ backgroundColor: "transparent" }}
                >
                    <Form layout="vertical" onSubmit={this.handleSubmit}>

                        <Form.Item label={formatMessage(messages["Archive Store Name"])}>
                            {getFieldDecorator('Archive Store Name', {
                                rules: [{ required: true, message: formatMessage(messages["Please enter store name"]) }],
                            })(
                                <div><Input value={abc} name="abc" onChange={e => this.onChange(e)}></Input></div>
                            )}
                        </Form.Item>

                        <Form.Item label={formatMessage(messages["Archive Store Database Name"])}>
                            {getFieldDecorator('Archive Store Database Name', {
                                rules: [{ required: true, message: formatMessage(messages["Please enter database name"]) }],
                            })(
                                <div><Input value={abc} name="abc" onChange={e => this.onChange(e)}></Input></div>,
                            )}
                        </Form.Item>

                        <Form.Item label="">
                            {getFieldDecorator(formatMessage(messages["Enable Sync :"]), {

                            })(
                                <Checkbox.Group style={{ width: '100%' }}>
                                    <Checkbox value="Search Allowed">{formatMessage(messages["Search Allowed"])}</Checkbox>
                                    <Checkbox value="Archive Allowed">{formatMessage(messages["Archive Allowed"])}</Checkbox>
                                </Checkbox.Group>
                            )}
                        </Form.Item>

                        <Form.Item>
                            <div style={{ ...style.drawerButtons }}>
                                <PrimaryButton text={formatMessage(messages["Save"])} htmlType="submit" />
                                <SecondryButton text={formatMessage(messages["Cancel"])} onClick={() => this.props.close()} style={{ marginRight: 8 }} />
                            </div>
                        </Form.Item>

                    </Form>

                </Drawer>
            </div>
        );
    }
}

const ArchiveStoreDrawerForm = Form.create('Archive')(ArchiveStore);

export default ArchiveStoreDrawerForm