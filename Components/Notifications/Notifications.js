import React, { Component } from "react";
import { Form, Input, TreeSelect, Spin, Typography } from 'antd';
import style from "../../styles"
import CollapseableHeader from '../CollapseAbleHeader/CollapseAbleHeader';
import rightArrow from "../../Assets/icons/Side Column Arrow Expand.png";
import leftArrow from "../../Assets/icons/Side Column Arrow compressed.png";
import searchIcon from '../../Assets/icons/SV_ICONS/Search_White.png';
import searchIconOrange from '../../Assets/icons/Identification_Orange.png'
import { PrimaryButton } from "../Button/Button";
import { defineMessages } from 'react-intl';

const { Text } = Typography;

const messages = defineMessages({
    'Open Menu': {
        id: "NotificationSideBar.OpenMenu",
        defaultMessage: "Open Menu",
    },
    'SEARCH': {
        id: "NotificationSideBar.SEARCH",
        defaultMessage: "SEARCH"
    },
    'Please enter notification type': {
        id: "NotificationSideBar.PleaseEnterNotificationType",
        defaultMessage: "Please enter notification type"
    },
    'Notification Type': {
        id: "NotificationSideBar.NotificationType",
        defaultMessage: "Notification Type"
    },
    'Please enter search Item': {
        id: "NotificationSideBar.PleaseEnterSearchItem",
        defaultMessage: "Please enter search Item"
    },
    'Type to search': {
        id: "NotificationSideBar.TypeToSearch",
        defaultMessage: "Type to search"
    },
    'Search': {
        id: "NotificationSideBar.Search",
        defaultMessage: "Search"
    },
})

const notificationsData = [{ NotificationsSelect: 'Export Complete' }, { NotificationsSelect: 'Email Archive Failed' }]

class NotificationSideBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: true
        }
    }
    onCheck = (checkValue, info) => {
        this.setState({ checkValue });
    }
    moveToFilter = () => {
        this.setState({ filter: true, search: false })
    }
    moveToSearch = () => {
        this.setState({ filter: false, search: true })
    }
    generateNotificationsSelectData = (data, variable) => {

        let treeData = []
        data && data.length > 0 && data.map((val, ind) => {
            return treeData.push({
                title: val.NotificationsSelect,
                value: val.NotificationsSelect,
                key: ind,
            })
        })
        this.setState({
            [variable]: treeData
        })
    }
    onChange = (value, label) => {
        this.setState({ [label]: value });
    };
    componentDidMount() {
        this.generateNotificationsSelectData(notificationsData, "notificationsData")
    }

    render() {
        const { collapsed, collapseSideMenu, formatMessage } = this.props
        const { getFieldDecorator } = this.props.form;
        const { search, notificationsData, NotificationType } = this.state;
        return (
            <div style={!collapsed ? style.sideMenuHeight : { height: "10vh" }}>
                <div style={collapsed ? style.emailsCollapsedSideMenuIcon : style.emailsSideMenuIcon} >
                    {collapsed ?
                        // <div onClick={collapseSideMenu} title={formatMessage(messages["Open Menu"])} style={{ cursor: "pointer", width: "100%", display: "flex", justifyContent: "center" }}><img src={rightArrow} style={{ cursor: "pointer" }} alt={"button"} width={20} height={20} title="Open Menu" /></div>
                        // :
                        // <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', alignItems: "center" }}>
                        //     <img style={{ cursor: "pointer" }} title="Search" src={searchIcon} alt={"button"} width={35} height={35} onClick={this.moveToSearch} />
                        //     <img src={leftArrow} title="Close Menu" alt={"button"} style={{ cursor: "pointer" }} width={20} height={20} onClick={collapseSideMenu} />
                        // </div>
                        
                        <div onClick={collapseSideMenu} title="Open Menu" style={{ cursor: "pointer", width: "100%", display: "flex", justifyContent: "center", }}>
                            <img src={rightArrow} style={{ cursor: "pointer" }} alt={"button"} width={20} height={20} title="Open Menu" />
                        </div>
                        :
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '90%', alignItems: "center", WebkitTransition: 'webkitTransition .5s linears' }}>
                            <img style={{ cursor: "pointer" }} title="Search" src={searchIcon} alt={"button"} width={35} height={35} onClick={this.moveToSearch} />
                            <img src={leftArrow} title="Close Menu" alt={"button"} style={{ cursor: "pointer" }} width={20} height={20} onClick={collapseSideMenu} />
                        </div>
                        }
                </div>
                {!collapsed &&
                    <div style={{ padding: "70px 0px" }}>
                        {search &&
                            <CollapseableHeader bgColor="#efeff7" heading={formatMessage(messages["SEARCH"])} bordered={false} accordion={false} destroyInactivePanel={false}>
                                <Form layout="vertical" onSubmit={this.handleSubmit}>

                                    <Form.Item label="" style={{ marginBottom: 0, marginTop: 0 }} >
                                        {getFieldDecorator('Search panel', {
                                            rules: [{
                                                required: true, message: formatMessage(messages["Please enter search Item"])
                                            }],
                                        })(<Input placeholder={formatMessage(messages["Search"])} width={100} suffix={<img title="Add" style={{ cursor: "pointer" }} src={searchIconOrange} width={30} height={30} alt="Add" />} />)}
                                    </Form.Item>

                                    <Form.Item label="" style={{ ...style.marginBottom0 }}>
                                        {getFieldDecorator('Notification Type', {
                                            rules: [{
                                                required: true, message: formatMessage(messages["Please enter notification type"])
                                            }],
                                        })(
                                            <TreeSelect
                                                style={{ width: '100%' }}
                                                setFieldsValue={NotificationType}
                                                dropdownStyle={{ maxHeight: 200, overflow: 'auto', }}
                                                treeData={notificationsData}
                                                placeholder={formatMessage(messages["Notification Type"])}
                                                // onFocus={() => (!this.props.simpleSearch || !this.props.simpleSearch.EmployeeList || !this.props.simpleSearch.EmployeeList.length > 0) && this.props.fetchSimpleSearch()}
                                                onChange={(e) => this.onChange(e, "NotificationType")}
                                                treeCheckable={true}
                                                showSearch
                                                filterTreeNode={(input, treeNode) =>
                                                    treeNode.props.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                                notFoundContent={
                                                    (!this.props.simpleSearch || !this.props.simpleSearch.EmployeeList) &&
                                                    <Text>
                                                        <Spin size="small" style={{ marginRight: 15 }} />Fetching Source
                                                    </Text>
                                                }

                                            />

                                        )}
                                    </Form.Item>

                                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <PrimaryButton text={formatMessage(messages["Search"])} />
                                    </div>
                                </Form>
                            </CollapseableHeader>}

                    </div>}
            </div>

        )
    }
}

const NotificationSideBarForm = Form.create('DeploymentForm')(NotificationSideBar);

export default NotificationSideBarForm;