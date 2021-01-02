import React from "react"
import { Drawer, Form, Typography, Radio } from 'antd';
import { defineMessages } from 'react-intl';

const messages = defineMessages({
	'Roll Over Policy': {
		id: "RollOverPolicy.RollOverPolicy",
		defaultMessage: "Roll Over Policy",
	},
	'Type:': {
		id: "RollOverPolicy.Type",
		defaultMessage: "Type:"
	},
	'AD': {
		id: "RollOverPolicy.AD",
		defaultMessage: "AD"
	},
	'Local': {
		id: "RollOverPolicy.Local",
		defaultMessage: "Local"
	},
})
const { Text } = Typography

class RollOverPolicy extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            //   checkValue: [],
            //   data: datatree.treeData,
           value:1
        };
    }
    onChangeRadio = e =>{
        this.setState({
            value: e.target.value,
        });
    }

    render() {
        const {formatMessage} = this.props;
        return (
            <div>

                <Drawer
                    title={formatMessage(messages["Roll Over Policy"])}
                    width={400}
                    onClose={() => this.props.close()}
                    closable={false}
                    visible={true}
                    maskStyle={{ backgroundColor: "transparent" }}
                >
                    <Form layout="vertical">

                        <Form.Item style={{ margin: "14px 0px" }} label={<Text>{formatMessage(messages["Type:"])}</Text>} >
                            <div>
                                {/* <Input style={{ width: "80vh" }} suffix={<img style={{ cursor: "pointer" }} src={require(`../../../../Assets/icons/SV_ICONS/Orange-Add.png`)} width={30} height={30} alt="Add" />} /> */}
                                <Radio.Group style={{ width: "100%", display: "flex", justifyContent: "space-around", alignItems: "end" }} onChange={this.onChangeRadio} value={this.state.value}>
                                    <Radio value={1}>{formatMessage(messages["AD"])}</Radio>
                                    <Radio value={2}>{formatMessage(messages["Local"])}</Radio>
                                </Radio.Group>
                            </div>
                        </Form.Item>

                    </Form>

                </Drawer>
            </div>
        );
    }
}

const RollOverPolicyDrawerForm = Form.create('RollOverPolicy')(RollOverPolicy);

export default RollOverPolicyDrawerForm