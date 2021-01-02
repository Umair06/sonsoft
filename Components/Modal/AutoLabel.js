import React from "react"
import { Drawer, Form, Input, Divider, Icon, Typography, Switch } from 'antd';
import { PrimaryButton } from "../Button/Button";
import { SecondryButton } from "../Button/Button"
import style from "../../styles";
// import Theme from "../../Assets/Theme/Theme";
import Clear_Gray from '../../Assets/icons/SV_ICONS/Clear_Gray.png';
// import DeleteOrange from "../../Assets/icons/SV_ICONS/Delete_Orange.png";
import { defineMessages } from 'react-intl';
import AutoLabelIcon from '../../Assets/icons/SV_ICONS/Labelling_Blue.png';
import Orange_Subtract from "../../Assets/icons/SV_ICONS/Orange-Subtract.png"
import { connect } from "react-redux";

const messages = defineMessages({
    'Edit Labeling Policy': {
        id: "AutoLabel.EditLabelingPolicy",
        defaultMessage: "Edit Labeling Policy",
    },
    'Add Labeling Policy': {
        id: "AutoLabel.AddLabelingPolicy",
        defaultMessage: "Add Labeling Policy"
    },
    'Policy Name:': {
        id: "AutoLabel.PolicyName",
        defaultMessage: "Policy Name:"
    },
    'Please enter policy name': {
        id: "AutoLabel.PleaseEnterPolicyName",
        defaultMessage: "Please enter policy name"
    },
    'Select Color': {
        id: "AutoLabel.SelectColor",
        defaultMessage: "Select Color"
    },
    'Please enter description': {
        id: "AutoLabel.PleaseEnterDescription",
        defaultMessage: "Please enter description"
    },
    'Label Name:': {
        id: "AutoLabel.LabelName",
        defaultMessage: "Label Name:",
    },
    'Please select the Label name': {
        id: "AutoLabel.PleaseSelectTheLabelName",
        defaultMessage: "Please select the Label name"
    },
    'Add New Label': {
        id: "AutoLabel.AddNewLabel",
        defaultMessage: "Add New Label"
    },
    'Save': {
        id: "AutoLabel.Save",
        defaultMessage: "Save"
    },
    'Cancel': {
        id: "AutoLabel.Cancel",
        defaultMessage: "Cancel"
    },
})

const { Title, Text } = Typography
const btnTagColors = [
    {
        color: '#ffd605',
        style: true
    },
    {
        color: '#64b1be',
        style: false
    },
    {
        color: '#ffafbd',
        style: false
    },
    {
        color: '#c69be0',
        style: false
    },
    {
        color: '#70d0e9',
        style: false
    },
    {
        color: '#9fe7d9',
        style: false
    },
    {
        color: '#feab4b',
        style: false
    },
    {
        color: '#fd5000',
        style: false
    },
    {
        color: '#cf559b',
        style: false
    }
]

class GlobalLabels extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 1,
            tagIconColor: 'grey',
            tagColor: '#ffd605',
            tagColors: btnTagColors,
            newLblInput: false,
            removeLabelIds: [],
            policyInfo: {
                LABEL_ID: [],
                LABEL_NAME: []
            },
            policyName: this.props.values ? this.props.values.policyName : "",
            notToRunAgain: false
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.values && props.LabelModal && !state.fetchedLabels) {
            return {
                policyInfo: props.values ? {
                    FILTER_ID: props.values.FILTER_ID,
                    FILTER_NAME: props.values.FILTER_NAME,
                    IsDefault: props.values.IsDefault,
                    LABEL_ID: props.values.LABEL_ID && props.values.LABEL_ID.split(","),
                    LABEL_NAME: props.values.LABEL_NAME && props.values.LABEL_NAME.split(","),
                    COLOR_CODE: props.values.COLOR_CODE && props.values.COLOR_CODE.split(",") && props.values.COLOR_CODE.split(",")[0],
                    ID_NAME_COLOR: props.values.ID_NAME_COLOR && props.values.ID_NAME_COLOR.split(",")
                } :
                {
                    LABEL_ID: [],
                    LABEL_NAME: []
                },
                fetchedLabels: true,
                tagColor: props.values.COLOR_CODE ? props.values.COLOR_CODE.split(',') && props.values.COLOR_CODE.split(',')[0] : '#ffd605'
            }
        }
        return null;
    }

    onChangeRadio = e => this.setState({ value: e.target.value })

    handleSubmit = e => {
        const { policyInfo, tagColor, removeLabelIds } = this.state;
        const { values } = this.props;
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, data) => {
            if (err) {
                // ApiInfo.DEBUGER && console.log("error", err)
            }
            else {
                if (policyInfo && policyInfo.LABEL_NAME && Array.isArray(policyInfo.LABEL_NAME) && policyInfo.LABEL_NAME.length) {
                    let APIbody = {
                        "filterId": values && values.FILTER_ID,
                        "status": data.active ? 1 : 0,
                        "filterName": data.Policy_Name,
                        "filterType": this.props.labelType,
                        "labelName": policyInfo.LABEL_NAME,
                        "labelType": this.props.labelType,
                        "colorCode": tagColor,
                        "removeLabelIds": removeLabelIds
                    }
                    this.close()
                    if (this.props.values) this.props.editAutoLabels(APIbody)
                    else this.props.postAutoLabels(APIbody)
                    this.setState({ labelError: "" })
                } else {
                    this.setState({
                        labelError: "Please Add Labels"
                    })
                }
            }
        });
    }

    getSelectColorOnEdit = () => {
        const { tagColors, tagColor, notToRunAgain } = this.state
        // let { COLOR_CODE } = this.props.values

        // on edit getting index num from true statement otherwise get ind in func param
        // COLOR_CODE = COLOR_CODE.split(',')[0]
        const index = tagColors.findIndex(el => el.color === tagColor)

        tagColors.forEach((val) => {//making all values of false which impact false values shown as unselected
            val.style = false;
        })

        if (tagColors[index]) tagColors[index].style = true;
        !notToRunAgain &&
            this.setState({ tagColor: tagColor, tagColors, notToRunAgain: true })
    }

    selectedColor = (e, color, ind) => {
        const { tagColors } = this.state

        tagColors.forEach((val) => {//making all values of false which impact false values shown as unselected
            val.style = false;
        })
        //This making the true shown the selected color
        tagColors[ind].style = true;
        this.setState({ tagColor: color, tagColors })
    }

    onChange = e => {
        this.setState({
            labelName: e.target.value,
            labelError: ""
        })
    }

    AddList = () => {
        const { labelName, policyInfo } = this.state
        if (labelName) {
            if (policyInfo && policyInfo.LABEL_NAME && !policyInfo.LABEL_NAME.includes(labelName.trim().toLowerCase())) {
                policyInfo.LABEL_NAME.push(labelName)
                policyInfo.LABEL_ID.push("null")
                this.setState({
                    policyInfo,
                    labelName: "",
                    labelError: ""
                })
            } else {
                this.setState({
                    labelError: "Label Already Exist"
                })
            }
        } else {
            this.setState({
                labelError: "Please Enter Label"
            })
        }
    }

    deleteLabel = (label, index) => {
        const { policyInfo, removeLabelIds } = this.state;
        if (policyInfo &&  policyInfo.LABEL_NAME && Array.isArray(policyInfo.LABEL_NAME) && policyInfo.LABEL_NAME.length) {
            policyInfo.LABEL_NAME.splice(index, 1)
            if(policyInfo.LABEL_ID[index] !== "null") {
                policyInfo.ID_NAME_COLOR.forEach(el => {
                    if(typeof(el) === "string" && el.split("-")[1] === label){
                        removeLabelIds.push(el.split("-")[0]);
                    }
                })
            }
            policyInfo.LABEL_ID.splice(index, 1)
            this.setState({
                policyInfo,
                removeLabelIds
            })
        }
        // else if(policyInfo.IsDefault){
        //     message.warning("You cannot remove Default Labels", 1)
        // }
    }

    close = () => {
        // const { tagColors } = this.state;
        this.props.form && this.props.form.resetFields();
        this.props.close()
        this.selectedColor(null, "#ffd605", 0)
        this.setState({
            labelName: "",
            policyInfo: {
                LABEL_ID: [],
                LABEL_NAME: []
            },
            removeLabelIds: [],
            fetchedLabels: false,
            labelError: "",
            notToRunAgain: false
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { tagColors, labelName, policyInfo, labelError } = this.state;
        const { values, LabelModal, formatMessage } = this.props;
        if (values && values.COLOR_CODE) {
            this.getSelectColorOnEdit()
        }
        return (
            <div>
                <Drawer
                    width={400}
                    onClose={() => this.close()}
                    visible={LabelModal}
                    closable={false}
                    maskStyle={{ backgroundColor: "transparent" }}
                >
                    <div style={style.setting.drawerMain}>
                        <div style={style.setting.drawerIconTitleWrapper}>
                            <img title="AutoLabel" src={AutoLabelIcon} alt="" style={style.setting.drawerIcons} ></img>
                            <Title style={style.setting.drawerTitles}>{values ? formatMessage(messages["Edit Labeling Policy"]) : formatMessage(messages["Add Labeling Policy"])}</Title>
                        </div>
                        <div onClick={() => this.close()} style={{ paddingTop: 10, cursor: "pointer" }}>
                            <img src={Clear_Gray} title="Close" alt="" onClick={() => this.close()} width={28} height={28} />
                        </div>
                    </div>
                    <Form layout="vertical" onSubmit={this.handleSubmit}>

                        <Form.Item label={formatMessage(messages["Policy Name:"])}>
                            {getFieldDecorator('Policy_Name', {
                                initialValue: values && values.FILTER_NAME,
                                rules: [{ required: true, message: formatMessage(messages["Please enter policy name"]) }],
                            })(
                                // CONDITION or something to Check for Edit or Add ????
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item label={<div>
                            <Icon type="tag" theme="twoTone" style={{ fontSize: '18px' }} twoToneColor={`${this.state.tagColor}`} />
                            <Text style={{ fontSize: '18px', paddingLeft: 10 }}>{formatMessage(messages["Select Color"])}
                            </Text>
                        </div>
                        }>

                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                {tagColors.map((val, index) =>
                                    <div key={index}
                                        style={!val.style
                                            ? { padding: '2px 2px', marginLeft: 5, borderRadius: '100%' }
                                            : { padding: '2px 2px', marginLeft: 5, borderRadius: '100%', border: "1px solid grey" }}>
                                        <div
                                            style={{
                                                backgroundColor: `${val.color}`,
                                                margin: '2px', borderRadius: '100%',
                                                width: '17px', height: '17px', cursor: "pointer"
                                            }}
                                            onClick={e => this.selectedColor(e, val.color, index)} />
                                    </div>
                                )}
                            </div>
                        </Form.Item>

                        <Form.Item style={style.formItemBetweenGap} label=''>
                            <div style={{ display: 'flex' }}>
                                <Text style={{ marginRight: '5px' }}>Active : </Text>
                                {getFieldDecorator('active', {
                                    valuePropName: 'checked',
                                    initialValue: values ? values.IS_ACTIVE : true
                                })(<Switch />)}
                            </div>
                        </Form.Item>
                        <Divider />

                        <Form.Item style={style.formItemBetweenGap}
                            label={formatMessage(messages["Label Name:"])}
                            validateStatus={labelError && "error"}
                            help={labelError}>
                            {getFieldDecorator('LabelName', {
                                rules: [{ required: labelError, message: labelError }],
                            })(
                                <div>
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <Input height='25' onPressEnter={() => this.AddList()} placeholder={formatMessage(messages["Add New Label"])} value={labelName} name="labelName" onChange={e => this.onChange(e)} />
                                        <img title="Add" onClick={() => this.AddList()} alt='Add' height={40} width={55} id="addImage" style={{ ...style.paddingLeft, ...style.cursorPointer }}
                                            src={require('../../Assets/icons/Icon Library/Icon Library/Orange-Add.png')} />
                                    </div>
                                </div>
                            )}

                        </Form.Item>
                        <div style={policyInfo && policyInfo.LABEL_NAME && policyInfo.LABEL_NAME.length ? { border: "2px solid #d9d9d9", padding: '10px 20px' } : {}}>
                            <ul style={{ ...style.noMargin, paddingLeft: 10 }}>
                                {policyInfo && policyInfo.LABEL_NAME && Array.isArray(policyInfo.LABEL_NAME) && policyInfo.LABEL_NAME.map((label, index) => {
                                    return (
                                        <li key={index}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <span style={{
                                                    fontWeight: 'bold', color: "#fff", width: "fit-content", backgroundColor:
                                                        `${this.state.tagColor}`, padding: "2px 4px", borderRadius: 3
                                                }}>{label}</span>
                                                <span><img onClick={() => this.deleteLabel(label, index)} src={Orange_Subtract} alt="Remove" style={{ ...style.cursorPointer }} width={20} /></span>
                                            </div>
                                            {index !== policyInfo.LABEL_NAME.length - 1 && <hr />}
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                        <Form.Item>
                            <div style={{ ...style.drawerButtons }}>
                                <PrimaryButton text={"Submit"} onClick={e => this.handleSubmit(e)} htmlType="submit" />
                                <SecondryButton text={formatMessage(messages["Cancel"])} onClick={() => this.close()} style={{ marginRight: 8 }} />
                            </div>
                        </Form.Item>


                    </Form>

                </Drawer>
            </div>
        );
    }
}

const GlobalLabelsDrawerForm = Form.create('AdSetting')(GlobalLabels);

const mapStateToProps = state => {
    return {


    }
};
const mapDispatchToProps = dispatch => {
    return {
        // editAutoLabeling: data => dispatch(editAutoLabeling(data)),
        // postAutoLabeling: data => dispatch(postAutoLabeling(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(GlobalLabelsDrawerForm)