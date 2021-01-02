import React, { Component } from 'react'
import { Drawer, Typography, Form, Tree, Icon } from "antd";
import style from "../../styles"
import Theme from "../../Assets/Theme/Theme";
// import { SecondryButton } from "../Button/Button";
import CollapseableHeader from "../CollapseAbleHeader/CollapseAbleHeader"
import filterTree from '../../Redux/TreeData/SearchCriteria.json';
import moment from "moment";
import Clear_Gray from '../../Assets/icons/SV_ICONS/Clear_Gray.png';
import { defineMessages } from 'react-intl';
import * as ApiInfo from "../../APIConfig/ApiParameters";


const messages = defineMessages({
    'Keyword': {
        id: "SearchCriteria.Keyword",
        defaultMessage: "Keyword",
    },
    'Date Range': {
        id: "SearchCriteria.DateRange",
        defaultMessage: "Date Range"
    },
    'Employees': {
        id: "SearchCriteria.Employees",
        defaultMessage: "Employees"
    },
    'Types': {
        id: "SearchCriteria.Types",
        defaultMessage: "Types"
    },
    'Labels': {
        id: "SearchCriteria.Labels",
        defaultMessage: "Labels"
    },
    'Saved Search Criteria': {
        id: "SearchCriteria.SavedSearchCriteria",
        defaultMessage: "Saved Search Criteria",
    },
    'SEARCH CRITERIA': {
        id: "SearchCriteria.SEARCH_CRITERIA",
        defaultMessage: "SEARCH CRITERIA"
    },
    'From: ': {
        id: "SearchCriteria.From",
        defaultMessage: "From: "
    },
    'To: ': {
        id: "SearchCriteria.To",
        defaultMessage: "To: "
    },
    'Any Date': {
        id: "SearchCriteria.AnyDate",
        defaultMessage: "Any Date"
    },
})

// const { TextArea } = Input;
const { color } = Theme;
const { Title, Text, Paragraph } = Typography;
const { TreeNode } = Tree;

class SearchCriteria extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 1,
            file: [{ name: 'file-excel', style: true }, { name: 'file-pdf', style: false }],
            data: filterTree.treeData,
            checkValue: [],
            dataSimpleSearchCriteria: [
                { title: this.props.formatMessage(messages["Keyword"]), key: '0', children: [] },
                { title: this.props.formatMessage(messages["Date Range"]), key: '1', children: [] },
                { title: this.props.formatMessage(messages["Employees"]), key: '2', children: [] },
                { title: this.props.formatMessage(messages["Types"]), key: '3', children: [] },
                // { title: this.props.formatMessage(messages["Labels"]), key: '4', children: [] }
            ],
            advanceSearchCriteria: [
                { title: "Date", key: "0", children: [] },
                { title: "Types", key: "1", children: [] },
                { title: "Contains any of these terms", key: "2", children: [] },
                { title: "Contains all of these terms", key: "3", children: [] },
                { title: "Contains none of these terms", key: "4", children: [] },
                { title: "Metadata Search", key: "5", children: [] },
            ],
            dataQueryBuilderSearchCriteria: [
                { title: "Types", key: "0", children: [] },
                { title: "Query", key: '1', children: [] },

            ],
            dataSmartSearchCriteria: [
                { title: this.props.formatMessage(messages["Keyword"]), key: '0', children: [] },
            ]
        }
    }
    onCheck = (checkValue, info) => {
        this.setState({ checkValue });
    }
    renderTreeNodes = data => data.map((item, index) => {
        if (item.children) {
            return (
                <TreeNode key={item.key} title={<Paragraph style={{ overflowY: "auto" }} ><Text style={{ wordBreak: 'break-all' }}>{item.title}</Text></Paragraph>} icon={item.icon ? <Icon type={item.icon} /> : false} checkable={false} isLeaf={false} disabled={item.disabled || false} dataRef={item}>
                    {this.renderTreeNodes(item.children)}
                </TreeNode>
            );
        }
        return <TreeNode key={item.key} title={<Paragraph style={{ overflowY: "auto" }} ><Text style={item.color ? { backgroundColor: item.color, color: "#fff" } : { color: "inherit", display: "flex", flexDirection: "row", wordBreak: 'break-all' }} >{item.title}</Text></Paragraph>} checkable={false} dataRef={item} />;
    })
    genrateTreeData = (data, SearchType) => {
        const { formatMessage } = this.props;
        if (SearchType === 'S') {
            let dataSimpleSearchCriteria = [
                { title: this.props.formatMessage(messages["Keyword"]), key: '0', children: [] },
                { title: this.props.formatMessage(messages["Date Range"]), key: '1', children: [] },
                { title: this.props.formatMessage(messages["Employees"]), key: '2', children: [] },
                { title: this.props.formatMessage(messages["Types"]), key: '3', children: [] },
                { title: this.props.formatMessage(messages["Labels"]), key: '4', children: [] }
            ]
            if (data.contentValue) {
                let newSearch = {
                    title: data.contentValue,
                    key: data.contentValue
                }
                try {
                    dataSimpleSearchCriteria[0].children.push(newSearch)
                }
                catch (e) {
                    ApiInfo.DEBUGER && console.log("error", e)
                }
            } else {
                let newSearch = {
                    title: "---",
                    key: "0"
                }
                try {
                    dataSimpleSearchCriteria[0].children.push(newSearch)
                }
                catch (e) {
                    ApiInfo.DEBUGER && console.log("error", e)
                }
            }

            let dateRangeFrom = {
                title: `${formatMessage(messages["From: "])} ${data.fromDate ? (moment(data.fromDate).format('DD-MMM-YYYY') === "Invalid date" ? data.fromDate : moment(data.fromDate).format('DD-MMM-YYYY')) : formatMessage(messages["Any Date"])}`,
                key: `${formatMessage(messages["From: "])} ${data.fromDate ? (moment(data.fromDate).format('DD-MMM-YYYY') === "Invalid date" ? data.fromDate : moment(data.fromDate).format('DD-MMM-YYYY')) : formatMessage(messages["Any Date"])}`
            }

            let dateRangeTo = {
                title: `${formatMessage(messages["To: "])} ${data.toDate ? (moment(data.toDate).format('DD-MMM-YYYY') === "Invalid date" ? data.toDate : moment(data.toDate).format('DD-MMM-YYYY')) : formatMessage(messages["Any Date"])}`,
                key: `${formatMessage(messages["To: "])} ${data.toDate ? (moment(data.toDate).format('DD-MMM-YYYY') === "Invalid date" ? data.toDate : moment(data.toDate).format('DD-MMM-YYYY')) : formatMessage(messages["Any Date"])}`
            }


            dataSimpleSearchCriteria[1].children.push(dateRangeFrom)
            dataSimpleSearchCriteria[1].children.push(dateRangeTo)

            if (data.employee && data.employee.length) {
                data.employee.forEach((employ, index) => {
                    let child = {
                        title: employ,
                        key: employ
                    }
                    try {
                        dataSimpleSearchCriteria[2].children.push(child)
                    } catch (e) {
                        ApiInfo.DEBUGER && console.log("Error", e)
                    }
                })
            } else {
                let child = {
                    title: "Any Employee",
                    key: "2"
                }
                try {
                    dataSimpleSearchCriteria[2].children.push(child)
                } catch (e) {
                    ApiInfo.DEBUGER && console.log("error", e)
                }
            }

            if (data.filterType && data.filterType.length) {
                data.filterType.forEach((type, index) => {
                    let child = {
                        title: type,
                        key: type
                    }
                    try {
                        dataSimpleSearchCriteria[3].children.push(child)
                    } catch (e) {
                        ApiInfo.DEBUGER && console.log("error", e)
                    }
                })
            }
            else {
                let child = {
                    title: "Any Type",
                    key: "2"
                }
                try {
                    dataSimpleSearchCriteria[3].children.push(child)
                } catch (e) {
                    ApiInfo.DEBUGER && console.log("error", e)
                }
            }

            if (data.labelName && data.labelName.length > 0 && Array.isArray(data.labelName)) {
                try {
                  let child
                  data.labelName.forEach((title, i) => {
                    //I'm getting the title like this "G-270-cf559b-Powerfull" I just want its name last Index so I do this.
                    const length = title.split('-').length
                    child = { title: title.split('-')[length - 1] }
                    dataSimpleSearchCriteria[4].children.push(child)
                  })
                } catch (e) {
                  ApiInfo.DEBUGER && console.log(e)
                }
              } else {
                try {
                  let child = {
                    title: "Any label",
                    key: "4"
                  }
                  dataSimpleSearchCriteria[4].children.push(child)
                } catch (e) {
                  ApiInfo.DEBUGER && console.log("error", e)
                }
              }
            this.setState({
                dataSimpleSearchCriteria
            })
        }
        else if (SearchType === 'Q') {
            try {

                let queryBody;
                let dataQueryBuilderSearchCriteria = [
                    { title: "Types", key: "0", children: [] },
                    { title: "Query", key: "1", children: [] },
                ]
                try {
                    queryBody = JSON.parse(data.body);
                } catch (e) {
                    ApiInfo.DEBUGER && console.log("Error", e)
                }

                if (data.filterType && data.filterType.length) {
                    data.filterType.forEach((type, index) => {
                        let child = {
                            title: type,
                            key: type
                        }
                        try {
                            dataQueryBuilderSearchCriteria[0].children.push(child)
                        } catch (e) {
                            ApiInfo.DEBUGER && console.log("error", e)
                        }
                    })
                }
                else {
                    let child = {
                        title: "Any Type",
                        key: "0"
                    }
                    try {
                        dataQueryBuilderSearchCriteria[0].children.push(child)
                    } catch (e) {
                        ApiInfo.DEBUGER && console.log("error", e)
                    }
                }

                if (data.body) {
                    // let metaData = data.displaymetadataQuary.replace("+", " Contains ")
                    // metaData = metaData.replace("-", " Does not Contain ")

                    let child = {
                        title: JSON.stringify(queryBody, undefined, 2),
                        key: data.body
                    }
                    ApiInfo.DEBUGER && console.log(child)
                    try {
                        dataQueryBuilderSearchCriteria[1].children.push(child)
                    } catch (e) {
                        ApiInfo.DEBUGER && console.log(e)
                    }
                } else {
                    let child = {
                        title: "---",
                        key: "1"
                    }
                    try {
                        dataQueryBuilderSearchCriteria[1].children.push(child)
                    } catch (e) {
                        ApiInfo.DEBUGER && console.log(e)
                    }
                }

                this.setState({
                    dataQueryBuilderSearchCriteria
                })
            } catch (error) { ApiInfo.DEBUGER && console.error("Error", error) };
        }
        else {
            if (SearchType === 'A') {
                let advanceSearchCriteria = [
                    { title: "Date", key: "0", children: [] },
                    { title: "Types", key: "1", children: [] },
                    { title: "labels", key: "2", children: [] },
                    { title: "Contains any of these terms", key: "3", children: [] },
                    { title: "Contains all of these terms", key: "4", children: [] },
                    { title: "Contains none of these terms", key: "5", children: [] },
                    { title: "Metadata Search", key: "6", children: [] },
                  ]
                let dateLabel;
                let toDate;
                let fromDate;
                let date;
                if (data.toDate && data.fromDate && data.fromDate !== data.toDate) {
                    dateLabel = []
                    toDate = data.toDate.split("-").reverse().join("-")
                    fromDate = data.fromDate.split("-").reverse().join("-")
                } else {
                    if (data.toDate && data.fromDate && data.fromDate === data.toDate) {
                        dateLabel = "Equals: "
                        date = data.toDate.split("-").reverse().join("-")
                    } else {
                        if (data.toDate && !data.fromDate) {
                            dateLabel = "Before: "
                            date = data.toDate.split("-").reverse().join("-")
                        } else {
                            if (!data.toDate && data.fromDate) {
                                dateLabel = "After: "
                                date = data.fromDate.split("-").reverse().join("-")
                            } else {
                                if (!data.toDate && !data.fromDate) {
                                    dateLabel = "Any Date"
                                    date = ""
                                }
                            }
                        }
                    }
                }
                if (dateLabel && Array.isArray(dateLabel)) {
                    let dateRangeFrom = {
                        title: `From: ${fromDate}`,
                        key: `From: ${fromDate}`
                    }
                    let dateRangeTo = {
                        title: `To: ${toDate}`,
                        key: `To: ${toDate}`
                    }
                    try {
                        advanceSearchCriteria[0].children.push(dateRangeFrom)
                        advanceSearchCriteria[0].children.push(dateRangeTo)
                    } catch (e) {
                        ApiInfo.DEBUGER && console.log("error", e)
                    }
                } else {
                    let dateType = {
                        title: `${dateLabel}${date}`,
                        key: `${dateLabel}${date}`
                    }
                    try {
                        advanceSearchCriteria[0].children.push(dateType)
                    } catch (e) {
                        ApiInfo.DEBUGER && console.log("error", e)
                    }

                }

                if (data.filterType && Array.isArray(data.filterType) && data.filterType.length > 0) {
                    data.filterType.forEach((labelType, index) => {
                        let child = {
                            title: labelType,
                            key: index
                        }
                        try {
                            advanceSearchCriteria[1].children.push(child)
                        } catch (e) {
                            ApiInfo.DEBUGER && console.log(e)
                        }
                    })
                } else {
                    let child = {
                        title: "Any Type",
                        key: "1"
                    }
                    try {
                        advanceSearchCriteria[1].children.push(child)
                    } catch (e) {
                        ApiInfo.DEBUGER && console.log(e)
                    }
                }
                if (data.labelName && data.labelName.length > 0) {
                    try {
                      let child
                      data.labelName.forEach((title, i) => {
                        //I'm getting the title like this "G-270-cf559b-Powerfull" I just want its name last Index so I do this.
                        const length = title.split('-').length
                        child = { title: title.split('-')[length - 1] }
                        advanceSearchCriteria[2].children.push(child)
                      })
                    } catch (e) {
                      ApiInfo.DEBUGER && console.log(e)
                    }
                  } else {
                    try {
                      let child = {
                        title: "Any label",
                        key: "4"
                      }
                      advanceSearchCriteria[2].children.push(child)
                    } catch (e) {
                      ApiInfo.DEBUGER && console.log("error", e)
                    }
                  }
                if (data.anyTerms && Array.isArray(data.anyTerms) && data.anyTerms.length > 0) {
                    let anyTargetedFields = ""
                    data.anyTermsType && Array.isArray(data.anyTermsType) && data.anyTermsType.length > 0 && data.anyTermsType.map(field => {
                        return (
                            anyTargetedFields = anyTargetedFields + "," + (field === "message_body" ? "body" : field === "attachment.data.content" ? "attachment" : field)
                            // anyTargetedFields = anyTargetedFields + "," + (field.length === 12 ? field.slice(8) : field)

                        )
                    })
                    let anyFieldCriteria = {
                        title: `(${anyTargetedFields.slice(1)})`,
                        key: anyTargetedFields
                    }
                    try {
                        advanceSearchCriteria[3].children.push(anyFieldCriteria)
                    } catch (e) {
                        ApiInfo.DEBUGER && console.log(e)
                    }
                }
                if (data.anyTerms && Array.isArray(data.anyTerms) && data.anyTerms.length > 0) {
                    data.anyTerms.forEach((term, index) => {
                        let child = {
                            title: term,
                            key: index
                        }
                        try {
                            advanceSearchCriteria[3].children.push(child)
                        } catch (e) {
                            ApiInfo.DEBUGER && console.log(e)
                        }
                    })
                }
                else {
                    let child = {
                        title: "Any Terms",
                        key: "2"
                    }
                    try {
                        advanceSearchCriteria[3].children.push(child)
                    } catch (e) {
                        ApiInfo.DEBUGER && console.log(e)
                    }
                }


                if (data.allTerms && Array.isArray(data.allTerms) && data.allTerms.length > 0) {
                    let allTargetedFields = ""
                    data.allTermsType && Array.isArray(data.allTermsType) && data.allTermsType.length > 0 && data.allTermsType.forEach(field => {
                        // allTargetedFields = allTargetedFields + "," + (field.length === 12 ? field.slice(8) : field)
                        allTargetedFields = allTargetedFields + "," + (field === "message_body" ? "body" : field === "attachment.data.content" ? "attachment" : field)
                    })
                    let allFieldCriteria = {
                        title: `(${allTargetedFields.slice(1)})`,
                        key: allTargetedFields
                    }
                    try {
                        advanceSearchCriteria[4].children.push(allFieldCriteria)
                    } catch (e) {
                        ApiInfo.DEBUGER && console.log(e)
                    }
                }
                if (data.allTerms && Array.isArray(data.allTerms) && data.allTerms.length > 0) {
                    data.allTerms.forEach((term, index) => {
                        let child = {
                            title: term,
                            key: index
                        }
                        try {
                            advanceSearchCriteria[4].children.push(child)
                        } catch (e) {
                            ApiInfo.DEBUGER && console.log(e)
                        }
                    })
                }
                else {
                    let child = {
                        title: "All Terms",
                        key: "3"
                    }
                    try {
                        advanceSearchCriteria[4].children.push(child)
                    } catch (e) {
                        ApiInfo.DEBUGER && console.log(e)
                    }
                }
                if (data.noneTerms && Array.isArray(data.noneTerms) && data.noneTerms.length > 0) {
                    let noneTargetedFields = ""
                    data.noneTermsType && Array.isArray(data.noneTermsType) && data.noneTermsType.length > 0 && data.noneTermsType.forEach(field => {
                        // noneTargetedFields = noneTargetedFields + "," + (field.length === 12 ? field.slice(8) : field)
                        noneTargetedFields = noneTargetedFields + "," + (field === "message_body" ? "body" : field === "attachment.data.content" ? "attachment" : field)
                    })
                    let noneFieldCriteria = {
                        title: `(${noneTargetedFields.slice(1)})`,
                        key: noneTargetedFields
                    }
                    try {
                        advanceSearchCriteria[5].children.push(noneFieldCriteria)
                    } catch (e) {
                        ApiInfo.DEBUGER && console.log("error", e)
                    }
                }
                if (data.noneTerms && Array.isArray(data.noneTerms) && data.noneTerms.length > 0) {
                    data.noneTerms.forEach((term, index) => {
                        let child = {
                            title: term,
                            key: index
                        }
                        try {
                            advanceSearchCriteria[5].children.push(child)
                        } catch (e) {
                            ApiInfo.DEBUGER && console.log(e)
                        }
                    })
                }
                else {
                    let child = {
                        title: "None Terms",
                        key: "4"
                    }
                    try {
                        advanceSearchCriteria[5].children.push(child)
                    } catch (e) {
                        ApiInfo.DEBUGER && console.log(e)
                    }
                }

                if (data.Metadata) {
                    let metaData = data.Metadata.replace("+", " Contains ")
                    metaData = metaData.replace("-", " Does not Contain ")
                    let child = {
                        title: metaData,
                        key: metaData
                    }
                    try {
                        advanceSearchCriteria[6].children.push(child)
                    } catch (e) {
                        ApiInfo.DEBUGER && console.log(e)
                    }
                }
                else {
                    let child = {
                        title: "---",
                        key: "5"
                    }
                    try {
                        advanceSearchCriteria[6].children.push(child)
                    } catch (e) {
                        ApiInfo.DEBUGER && console.log(e)
                    }
                }
                this.setState({
                    advanceSearchCriteria
                })

            }
            else {
                if (SearchType === "SS") {
                    let dataSmartSearchCriteria = [
                        { title: formatMessage(messages["Keyword"]), key: '0', children: [] },
                    ]
                    if (data.query) {
                        let newSearch = {
                            title: data.query,
                            key: "0"
                        }
                        try {
                            dataSmartSearchCriteria[0].children.push(newSearch)
                        }
                        catch (e) {
                            ApiInfo.DEBUGER && console.log("error", e)
                        }
                    } else {
                        let newSearch = {
                            title: "---",
                            key: "0"
                        }
                        dataSmartSearchCriteria[0].children.push(newSearch)
                    }
                    this.setState({
                        dataSmartSearchCriteria
                    })
                }
            }
        }

    }

    render() {
        // const { getFieldDecorator } = this.props.form;
        const { dataSimpleSearchCriteria, advanceSearchCriteria, dataQueryBuilderSearchCriteria, dataSmartSearchCriteria } = this.state;
        const { searchCriteria, criterea, formatMessage } = this.props;
        const searchType = criterea && criterea.SEARCH_TYPE_VALUE
        try {
            criterea && searchType === "S" && (!dataSimpleSearchCriteria[0].children.length) && this.genrateTreeData(JSON.parse(criterea.SEARCH_QUERY), searchType)
            criterea && searchType === "A" && (!advanceSearchCriteria[0].children.length) && this.genrateTreeData(JSON.parse(criterea.SEARCH_QUERY), searchType)
            criterea && searchType === "Q" && (!dataQueryBuilderSearchCriteria[0].children.length) && this.genrateTreeData(JSON.parse(criterea.SEARCH_QUERY), searchType)
            criterea && searchType === "SS" && (!dataSmartSearchCriteria[0].children.length) && this.genrateTreeData(JSON.parse(criterea.SEARCH_QUERY), searchType)
        } catch (err) {
            ApiInfo.DEBUGER && console.error("Error", err);

        }
        return (
            <div>
                <Drawer
                    style={{ marginTop: 125 }}
                    bodyStyle={{ height: 'calc(100vh -125px)', overflowY: "auto" }}
                    maskStyle={{ backgroundColor: "transparent" }}
                    onClose={() => this.props.close()}
                    width={400}
                    closable={false}
                    visible={searchCriteria}
                >
                    <div style={{ ...style.setting.drawerMain }}>
                        <div style={{ ...style.setting.drawerIconTitleWrapper }}>
                            <img title="" alt='' style={{ ...style.cursorPointer }} width="40px" src={require('../../Assets/icons/SV_ICONS/Query_Orange.png')} />
                            <Title style={{ color: `${color.Blue}`, padding: "15px 0 0 5px", fontSize: 24 }}>{formatMessage(messages["Saved Search Criteria"])}</Title>
                        </div>
                        <div onClick={() => this.props.close()} style={{ cursor: "pointer" }}>
                            <img src={Clear_Gray} title="Close" alt="" onClick={() => this.props.close()} width={28} height={28} />
                        </div>
                    </div>
                    <Form onSubmit={this.handleSubmit} style={{ marginTop: 20 }}>
                        <CollapseableHeader heading={formatMessage(messages["SEARCH CRITERIA"])} >
                            <div style={{ padding: "0px 15px" }}>
                                <Tree
                                    defaultExpandedKeys={['0', '1', '2', '3', '4', '5', "6"]}
                                    onSelect={this.onSelect}
                                    onCheck={this.onCheck}
                                    checkable={true}
                                    selectable={false}
                                    style={{ overflowY: "auto", height: 450 }}
                                >
                                    {this.renderTreeNodes(searchType === "S" ? dataSimpleSearchCriteria : searchType === "A" ? advanceSearchCriteria : searchType === "Q" ? dataQueryBuilderSearchCriteria : searchType === "SS" ? dataSmartSearchCriteria : [])}
                                </Tree>
                            </div>
                        </CollapseableHeader>

                        {/* <Form.Item>
                            <div style={{ display: "flex", justifyContent: "center", padding: "30px" }} >
                                <SecondryButton text="Cancel" onClick={() => this.props.close()} />
                            </div>
                        </Form.Item> */}
                    </Form>
                </Drawer>
            </div >
        )
    }
};

const WrappedSearchCriteria = Form.create({ name: 'forward_Controls' })(SearchCriteria);

export default WrappedSearchCriteria;
