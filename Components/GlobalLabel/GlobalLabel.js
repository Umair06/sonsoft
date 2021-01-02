import React, { Component } from 'react'
import style from "../../styles"
import { Drawer, Typography, message, Form, Icon, Tree, Skeleton } from "antd";
import Theme from "../../Assets/Theme/Theme";
import { PrimaryButton, SecondryButton as SecondaryButton } from "../Button/Button";
// import filterTree from '../../Redux/TreeData/ApplyLabel.json';
import Clear_Gray from '../../Assets/icons/SV_ICONS/Clear_Gray.png';
import { defineMessages } from 'react-intl';
import { fetchAutoLabels, applyRemoveLabelsOnSearchArchiveDocs } from "../../Redux/Actions/Policies/AutoLabelingAction"
import { connect } from 'react-redux'
import Text from 'antd/lib/typography/Text';
import ConfirmationDrawer from './ConfirmationDrawer';
import { resetSelectedRecords } from '../../Redux/Actions/updateSelectedRecordsAction/updateSelectedRecordsAction';
// import { styles } from 'ansi-colors';


const messages = defineMessages({
    'Apply Labels': {
        id: "GlobalLabel.ApplyLabels",
        defaultMessage: "Apply Labels",
    },
    'Remove Labels': {
        id: "GlobalLabel.RemoveLabels",
        defaultMessage: "Remove Labels",
    },
    'Submit': {
        id: "GlobalLabel.Submit",
        defaultMessage: "Submit"
    },
    'Cancel': {
        id: "GlobalLabel.Cancel",
        defaultMessage: "Cancel"
    },
    'Remove': {
        id: "GlobalLabel.Remove",
        defaultMessage: "Remove"
    },
    'Apply': {
        id: "GlobalLabel.Apply",
        defaultMessage: "Apply"
    },
})

const { color } = Theme;
const { Title } = Typography;
const { TreeNode } = Tree;

class GlobalLabel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 1,
            file: [{ name: 'file-excel', style: true }, { name: 'file-pdf', style: false }],
            checkValue: [],
            data: [],
            dataFor: [],
            filterId: [],
            labelIds: [],
            labelNames: [],
            filterType: [],
            checkedKeys: [],
            warningMessage: '',
            hideApplyButton: true,
            hideCancelButton: true,
            // confirmationDrawer: false,
            confirmDrawer: false,
            apiBody: {
                labelPolicy: [],
                filterType: [],
                labelType: ["_doc"],
                docIds: []
            }
        }
    }

    static getDerivedStateFromProps(props, state) {
        const { legalHold, legalHoldAutoLabels, globalLabel, globalAutoLabels, fetchAutoLabels } = props;
        if (legalHold && !legalHoldAutoLabels && globalLabel) {
            fetchAutoLabels("all")
        } else if (!legalHold && !globalAutoLabels && globalLabel) {
            fetchAutoLabels("G")
        }
        return null
    }


    putDocIdFilterTypeInAPIBody = () => {
        try {
            const { apiBody } = this.state;
            const { selected } = this.props;

            if (selected && selected.length > 0) {
                (selected || []).forEach(el => {
                    let id = el.split("=")[1]
                    let index = el.split("=")[2]
                    apiBody.docIds.push(id)
                    apiBody.filterType.push(index)
                });
            } else {
                this.displayWarningMessage('Document')
            }

            this.setState({ apiBody })

        } catch (e) {
            console.log(e.message);
        }
    }


    displayWarningMessage = (docORLabel) => {
        message.warning(
            <span>
                {`Please Select The ${docORLabel} First`}
                <Icon className="closebtn" onClick={() => message.destroy && message.destroy()} />
            </span>,
            5)
    }

    //This function run when click on apply and remove button
    openTheConfirmationDrawer = (applyOrRemove) => {
        try {
            const { apiBody } = this.state;
            //this function insert the filterType and docIds fields and doc not selected the show the warning message to the user
            this.putDocIdFilterTypeInAPIBody()
            if (apiBody.labelPolicy && apiBody.labelPolicy.length < 1) this.displayWarningMessage("Label")
            else if (apiBody.docIds && apiBody.docIds.length > 0 && apiBody.labelPolicy && apiBody.labelPolicy.length > 0) {
                this.setState({ confirmDrawer: true, [applyOrRemove]: applyOrRemove })
                this.props.close()
            }
        } catch (e) { console.log(e.message) }
    }


    closeAndReset = () => {
        this.setState({
            notToRunAgain: false,
            checkedKeys: [],
            warningMessage: '',
            apply: '',
            remove: '',
            data: [],

            //Reset the apiBody
            apiBody: {
                labelPolicy: [],
                filterType: [],
                labelType: ["_doc"],
                docIds: []
            },
            confirmDrawer: false
        })
        this.setState({})
        this.props.close()
    }

    transformAPIDataForTreeNode = (data) => {
        try {
            let treeData = []
            if (this.props.legalHold) {
                treeData = [{
                    "title": <Text
                        style={{ fontFamily: 'segoe ui', fontSize: '20px', color: color.Blue, fontWeight: 500 }}>
                        Global Label</Text>,
                    "key": "global",
                    "children": []
                },
                {
                    "title": <Text
                        style={{ fontFamily: 'segoe ui', fontSize: '20px', color: color.Blue, fontWeight: 500 }}>
                        Legal Label
                        </Text>,
                    "key": "Legal",
                    "children": []
                }]
            } else {
                treeData = [{
                    "title": <span> <Text
                        style={{ fontFamily: 'segoe ui', fontSize: '20px', color: color.Blue, fontWeight: 500 }}>Global Label</Text>
                    </span>,
                    "key": "global",
                    "children": []
                }]
            }


            const pushDataIntoTreeData = (el, type, i) => {
                treeData[i].children.push({
                    "title": el.FILTER_NAME,
                    "key": el.FILTER_ID,
                    "children": this.transformChildren(el.LABEL_ID, el.LABEL_NAME, el.COLOR_CODE, type)
                })
                return treeData
            }

            data.length && data.forEach(el => {
                const { applyOrRemove } = this.props;

                if (el.IS_ACTIVE && applyOrRemove === 'apply' && el.FILTER_TYPE === "G")
                    treeData = pushDataIntoTreeData(el, 'global', 0)

                if (applyOrRemove === 'remove' && el.FILTER_TYPE === "G")
                    treeData = pushDataIntoTreeData(el, 'global', 0)

                else if (el.FILTER_TYPE.includes('L'))
                    treeData = pushDataIntoTreeData(el, 'folder', 1)
            })

            !this.state.notToRunAgain && this.setState({ data: treeData, notToRunAgain: true })
        } catch (e) {
            // console.log(e.message, '💥')
        }
    }

    transformChildren = (id, name, color, iconType) => {
        if (id && name && color && iconType) {
            id = id.split(',')
            name = name.split(',')
            color = color.split(',')[0]
            let children = [];

            id.forEach(el => children.push({ key: el }))
            name.forEach((el, i) => children[i].title =
                <span > <Text style={{ ...style.labelDropdownStyle }}> <Icon type={iconType} />  {el} </Text> </span>)
            children.forEach((el, i) => children[i].color = color)
            return children
        }
    }

    getMatch = (globalLabelDocs, checkedKeys) => {
        try {
            let matches = [];
            for (let i = 0; i < globalLabelDocs.length; i++) {
                for (let j = 0; j < checkedKeys.length; j++) {
                    if (globalLabelDocs[i].LABEL_ID.includes(checkedKeys[j])) matches.push(globalLabelDocs[i]);
                }
            }

            //Check If object include "," comma
            let filteredArray = []
            matches.forEach((doc, i) => {
                if (doc.LABEL_ID.includes(',')) {
                    //find Index of the checkedKeys in doc
                    const labelIds = doc.LABEL_ID.split(',') //convert comma separated ids into Array
                    //find match ids of check box click and documents we have
                    const matchedIds = checkedKeys.filter((checkedKey, ind) => labelIds.includes(checkedKey)) //56,35,24

                    if (matchedIds) {
                        matchedIds.forEach(id => {
                            let index = doc.LABEL_ID.split(',').indexOf(id)
                            if (index !== -1) {
                                filteredArray.push({
                                    FILTER_TYPE: doc.FILTER_TYPE,
                                    FILTER_ID: doc.FILTER_ID,
                                    LABEL_ID: doc.LABEL_ID.split(',')[index],
                                    COLOR_CODE: doc.COLOR_CODE.split(',')[index],
                                    LABEL_NAME: doc.LABEL_NAME.split(',')[index]
                                })
                            }
                        })
                    }
                } else {
                    filteredArray.push({
                        FILTER_TYPE: doc.FILTER_TYPE,
                        FILTER_ID: doc.FILTER_ID,
                        LABEL_ID: doc.LABEL_ID,
                        COLOR_CODE: doc.COLOR_CODE,
                        LABEL_NAME: doc.LABEL_NAME
                    })
                }
            })

            //Convert , separated strings to Arrays
            return filteredArray
        } catch (e) {
            console.log(e.message);
        }
    }

    reopenTheGlobalLabeLDrawer = () => {
        this.setState({ confirmDrawer: false, apply: '', remove: '' })
        this.props.openDrawer()
    }

    handleSubmit = (e) => {

        e.preventDefault()
        const { apply, remove, apiBody } = this.state;
        const { applyRemoveLabelsOnSearchArchiveDocs, updatedSearchCriteria, resetSelectedRecords, searchTypeTree, searchType, legalHold, apiBodyData, smartSearchAccessToken, pageSize, currentPage } = this.props;

        //Apply Label Action
        if (!legalHold) {
            if (searchType === 1 || (searchType === 4 && searchTypeTree === "S")) {
                updatedSearchCriteria.fromCount = (!isNaN(currentPage) && !isNaN(pageSize) && (currentPage - 1) * pageSize) || 0;
                updatedSearchCriteria.toCount = pageSize;
            } else if (searchType === 3 || (searchType === 4 && searchTypeTree === "Q")) {
                if (updatedSearchCriteria.body) {
                    try {
                        updatedSearchCriteria.body = JSON.parse(updatedSearchCriteria.body)
                    } catch (e) { }
                    updatedSearchCriteria.body.from = (!isNaN(currentPage) && !isNaN(pageSize) && (currentPage - 1) * pageSize) || 0;
                    updatedSearchCriteria.body.size = pageSize;
                    try {
                        updatedSearchCriteria.body = JSON.stringify(updatedSearchCriteria.body)
                    } catch (e) { }

                }
            } else if (searchType === 2 || (searchType === 4 && searchTypeTree === "A")) {
                updatedSearchCriteria.fromCount = (!isNaN(currentPage) && !isNaN(pageSize) && (currentPage - 1) * pageSize) || 0;
                updatedSearchCriteria.toCount = pageSize;
            } else if (searchType === 5 || (searchType === 4 && searchTypeTree === "SS")) {
                updatedSearchCriteria.startIndex = (!isNaN(currentPage) && !isNaN(pageSize) && (currentPage - 1) * pageSize) || 0;
                updatedSearchCriteria.itemsPerPage = pageSize;
            }
        }
        apply && applyRemoveLabelsOnSearchArchiveDocs(
            apiBody,
            updatedSearchCriteria,
            apply,
            searchTypeTree,
            searchType,
            legalHold,
            apiBodyData,
            smartSearchAccessToken
        )

        //Remove Label Action
        remove && applyRemoveLabelsOnSearchArchiveDocs(apiBody,
            updatedSearchCriteria,
            remove,
            searchTypeTree,
            searchType,
            legalHold,
            apiBodyData,
            smartSearchAccessToken
        )
        resetSelectedRecords()
        this.closeAndReset()

    }


    handleCheckboxClick = (checkedKeys, e) => {
        const { legalHoldAutoLabels, globalAutoLabels, legalHold, onHoldTab, caseId } = this.props
        let labelInfo = []
        let labels = []
        let docIds = []
        let filterType = []

        //this function return the object of label after match the CheckedKeys input by user, We need this object because API required the info and checkedKeys just provide us key not full information
        legalHold ?
            labels = this.getMatch(legalHoldAutoLabels, checkedKeys)
            :
            labels = this.getMatch(globalAutoLabels, checkedKeys);

        //transformData for sending to API
        labels.forEach((el, i) => {
            if (onHoldTab && caseId && el.FILTER_TYPE === "L") {
                labelInfo.push(`${el.FILTER_ID}-${el.LABEL_ID}-${caseId}`)
            } else {
                labelInfo.push(`${el.FILTER_ID}-${el.LABEL_ID}`)
            }
        });

        //I don't know why I get duplicate element in So I use [..new Set(Array)] trick to return unique array items
        labelInfo = [...new Set(labelInfo)];


        const apiBody = {
            labelPolicy: labelInfo,
            "labelType": ["_doc"],
            filterType,
            docIds
        };
        this.setState({ apiBody, checkedKeys });
    };

    selectedColor = (e, color, ind) => {
        const { file } = this.state
        file.forEach((val) => {
            val.style = false;
        })
        file[ind].style = true;
        this.setState({ file })
    };

    onCheck = (checkValue, info) => {
        this.setState({ checkValue });
    };

    renderTreeNodes = data => data.map((item, index) => {
        if (item.children) {
            return (
                <TreeNode
                    selectable={false}
                    key={item.key} title={item.title}
                    icon={item.icon ? <Icon type={item.icon} /> : false}
                    checkable={false}
                    isLeaf={false}
                    disabled={item.disabled || false}
                    dataRef={item}
                    onSelect={this.handleCheckboxClick}
                    onCheck={this.handleCheckboxClick}
                >
                    {this.renderTreeNodes(item.children)}
                </TreeNode>
            );
        }
        return <TreeNode selectable={false}
            title={<div style={{ backgroundColor: item.color, color: "#fff", padding: "2px 4px", borderRadius: 3 }}>
                {item.title}</div>} key={item.key} dataRef={item} />
    })

    putDataInDrawer = () => {
        //Conditionally Generate the tree data based on the screen. It is legal Hold OR Search Archive
        const { notToRunAgain } = this.state
        const { globalAutoLabels, legalHoldAutoLabels } = this.props;
        this.props.legalHold ? ((legalHoldAutoLabels && !notToRunAgain) && this.transformAPIDataForTreeNode(legalHoldAutoLabels)) : (globalAutoLabels && !notToRunAgain) && this.transformAPIDataForTreeNode(globalAutoLabels)
    }

    render() {
        const { data } = this.state
        const { formatMessage, applyOrRemove, globalLabel } = this.props;

        return (
            <div>
                <Drawer
                    style={{ marginTop: 125 }}
                    bodyStyle={{ height: 'calc(100vh - 125px)', overflowY: "auto" }}
                    closable={false}
                    maskStyle={{ backgroundColor: "transparent" }}
                    width={400}
                    visible={globalLabel}
                    // closable={true}
                    onClose={() => this.closeAndReset()
                    }
                >
                    <div style={{ ...style.setting.drawerMain }}>
                        <div style={{ ...style.setting.drawerIconTitleWrapper }}>
                            <img
                                title=""
                                alt=''
                                style={{ ...style.cursorPointer }}
                                width="40px"
                                src={require('../../Assets/icons/SV_ICONS/Label_Orange.png')}
                            />
                            <Title
                                style={{
                                    color: `${color.Blue}`, padding: "15px 0 0 5px", fontSize: 24
                                }}
                            >
                                {formatMessage(messages[applyOrRemove === 'remove' ? "Remove Labels" : "Apply Labels"])}
                            </Title>
                        </div>

                        <div onClick={() => this.closeAndReset()} style={{ paddingTop: 10, cursor: "pointer" }}>
                        </div>

                        <img src={Clear_Gray} title="Close" alt="close"
                            onClick={() => this.closeAndReset()}
                            width={28} height={28}
                        />
                    </div>

                    <Form >

                        <div style={{ padding: "0px 15px" }}>
                            {data.length > 0 ? <Tree
                                defaultExpandAll
                                onSelect={this.handleCheckboxClick}
                                onCheck={this.handleCheckboxClick}
                                checkable={true}
                                defaultValue={this.state}
                                checkedKeys={this.state.checkedKeys}
                            >
                                {(data && data.length) && this.renderTreeNodes(data)}
                            </Tree> : <Skeleton active loading={!data.length} />}
                        </div>


                        {((applyOrRemove === 'apply' || applyOrRemove === 'remove') && globalLabel) && this.putDataInDrawer()}

                        <Form.Item>
                            <div style={{ ...style.drawerButtons }} >


                                {applyOrRemove === 'remove' ? <PrimaryButton text={formatMessage(messages["Remove"])} onClick={() => this.openTheConfirmationDrawer('remove')} />
                                    :
                                    <PrimaryButton text={formatMessage(messages["Apply"])} onClick={() => this.openTheConfirmationDrawer('apply')} />
                                }

                                <SecondaryButton text={formatMessage(messages["Cancel"])} onClick={() => this.closeAndReset()} />
                            </div>
                        </Form.Item>
                    </Form>
                </Drawer>

                <ConfirmationDrawer
                    formatMessage={formatMessage}
                    confirmDrawer={this.state.confirmDrawer}
                    closeAndReset={this.closeAndReset}
                    handleSubmit={(e) => this.handleSubmit(e)}
                    warningMessage={this.state.warningMessage}
                    reopenTheGlobalLabeLDrawer={this.reopenTheGlobalLabeLDrawer}
                    apply={this.state.apply}
                    remove={this.state.remove}
                />
                {/* <Drawer
                    style={{ marginTop: 125 }}
                    bodyStyle={{ height: 'calc(100vh - 125px)', overflowY: "auto" }}
                    closable={false}
                    mask={true}
                    maskClosable={true}
                    maskStyle={{ backgroundColor: "transparent" }}
                    width={400}
                    visible={this.state.confirmDrawer}
                    onClose={() => this.closeAndReset()}
                >
                    <div style={{ ...style.setting.drawerMain }}>
                        <div style={{ ...style.setting.drawerIconTitleWrapper }}>
                            <Title
                                style={{
                                    color: `${color.Blue}`, padding: "15px 0 0 5px", fontSize: 24
                                }}
                            >
                                {formatMessage(messages["Apply Labels"])}
                            </Title>
                        </div>
                        <img src={Clear_Gray} title="Close" alt="" onClick={() => this.closeAndReset()} width={28} height={28} />
                    </div>

                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item >

                            <div>
                                <Text style={{ padding: "0px 20px", }}>
                                    Are you sure you want Apply this label ?
                                </Text>
                            </div>


                            {this.state.warningMessage && message.warning(
                                <span>
                                    {this.state.warningMessage}
                                    <Icon
                                        className="closebtn"
                                        onClick={() => message.destroy && message.destroy()}
                                    />
                                </span>,
                                5)}

                            <div style={{ display: "flex", justifyContent: "center", padding: "30px" }} >

                                <PrimaryButton text="Yes" htmlType='submit' />

                                <SecondryButton text="No" onClick={() => this.closeAndReset()} />

                            </div>
                        </Form.Item>
                    </Form>


                </Drawer> */}

            </div>
        )
    }
}

const WrappedGlobalLabel = Form.create({ name: 'forward_Controls' })(GlobalLabel);

const mapStateToProps = state => {
    return {

        globalAutoLabels: state.AutoLabelingReducer.globalAutoLabels,
        legalHoldAutoLabels: state.AutoLabelingReducer.legalHoldAutoLabels,
        updatedSearchCriteria: state.UpdateSearchCriteriaReducer.updatedSearchCriteria,
        searchType: state.UpdateSearchCriteriaReducer.searchType,
        searchTypeTree: state.UpdateSearchCriteriaReducer.searchTypeTree,
        apiBodyData: state.LegalHoldsReducer.apiBodyData,
        smartSearchAccessToken: state.SimpleSearchReducer.smartSearchAccessToken,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAutoLabels: labelType => dispatch(fetchAutoLabels(labelType)),

        applyRemoveLabelsOnSearchArchiveDocs: (apiBody, searchCriteria, applyOrRemove, searchTypeTree, searchType, legalHold, apiBodyLegalHold, smartSearchAccessToken) => dispatch(applyRemoveLabelsOnSearchArchiveDocs(
            apiBody, searchCriteria, applyOrRemove, searchTypeTree, searchType, legalHold, apiBodyLegalHold, smartSearchAccessToken)
        ),
        resetSelectedRecords: () => dispatch(resetSelectedRecords())

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedGlobalLabel);
