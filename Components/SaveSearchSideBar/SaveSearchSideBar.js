import React, { Component } from "react";
import {  Form, Input ,Select} from 'antd';
import style from "../../styles"
import CollapseableHeader from '../CollapseAbleHeader/CollapseAbleHeader';
import rightArrow from "../../Assets/icons/Side Column Arrow Expand.png";
import leftArrow from "../../Assets/icons/Side Column Arrow compressed.png";
import searchIcon from '../../Assets/icons/SV_ICONS/Search_White.png'
import searchIconOrange from '../../Assets/icons/Identification_Orange.png'
import { PrimaryButton } from "../Button/Button";
// import Search from "antd/lib/input/Search";
import { defineMessages } from 'react-intl';

const messages = defineMessages({
	'Open Menu': {
		id: "SaveSearchSideBar.OpenMenu",
		defaultMessage: "Open Menu",
	},
	'SEARCH': {
		id: "SaveSearchSideBar.SEARCH",
		defaultMessage: "SEARCH"
	},
	'Search': {
		id: "SaveSearchSideBar.Search",
		defaultMessage: "Search"
	},
	'Please enter search item': {
		id: "SaveSearchSideBar.PleaseEnterSearchItem",
		defaultMessage: "Please enter search item"
	},
})

// const { TreeNode } = Tree;
// const { Text } = Typography;
const { Option } = Select;

const plainEmployeeOptions = ['Natasha', 'Bilal', 'Asrar', 'Faizan', 'Osama', 'Mohtashim'];
const employeeDefaultCheckedList = [];

for (let i = 0; i < plainEmployeeOptions.length; i++) {
    employeeDefaultCheckedList.push(<Option key={plainEmployeeOptions[i]}>{plainEmployeeOptions[i]}</Option>);
}

class SaveSearchSideBar extends Component {
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
    render() {
        const { collapsed, collapseSideMenu, formatMessage } = this.props
        const { getFieldDecorator } = this.props.form;
        const { search } = this.state;
        return (
            <div style={!collapsed ? style.sideMenuHeight : { height: "10vh" }}>
                <div style={collapsed ? style.emailsCollapsedSideMenuIcon : style.emailsSideMenuIcon} >
                    {collapsed ?
                        <div onClick={collapseSideMenu} title={formatMessage(messages["Open Menu"])} style={{display: 'flex', justifyContent: 'space-around', width: '100%', alignItems: "center" }}><img src={rightArrow} style={{ cursor: "pointer" }} alt={"button"} width={20} height={20} title="Open Menu" /></div>
                        :
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '90%', alignItems: "center" }}>
                            <img style={{ cursor: "pointer" }} title="Search" src={searchIcon} alt={"button"} width={35} height={35} onClick={this.moveToSearch} />
                            <img src={leftArrow} title="Close Menu" alt={"button"} style={{ cursor: "pointer" }}  width={20} height={20} onClick={collapseSideMenu} />
                        </div>}
                </div>
                {!collapsed &&
                    <div style={{ padding: "70px 0px" }}>
                        {search &&
                            <CollapseableHeader bgColor="#F5F7FA" heading={formatMessage(messages["SEARCH"])}>
                                <Form layout="vertical" onSubmit={this.handleSubmit}>

                                    {/* <Form.Item label="" style={{ marginBottom: 0}}>
                                        {getFieldDecorator('Notification Type', {
                                            rules: [{
                                                required: true, message: 'Please enter notification type'
                                            }],
                                        })(
                                            <Select
                                                showSearch
                                                mode="multiple"
                                                showArrow={true}
                                                style={{ width: '100%', color: 'black' }}
                                                placeholder="Notification Type"
                                                onChange={this.onChangeDropdown}
                                                maxTagCount={0}
                                                maxTagTextLength={0}
                                                onClick={(e) => this.onClickHandler(e)}
                                                onFocus={this.onFocus}
                                                onBlur={this.onBlur}
                                                onSearch={this.onSearch}
                                                filterOption={(input, option) =>

                                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                                dropdownStyle={{ height: 90, overflowY: 'scroll' }}
                                            >
                                                {employeeDefaultCheckedList}
                                            </Select>

                                        )}
                                    </Form.Item> */}
                                    <Form.Item label="" style={{ marginBottom: 0, marginTop: 0 }} >
                                        {getFieldDecorator('Search panel', {
                                            rules: [{
                                                required: true, message: formatMessage(messages["Please enter search item"])
                                            }],
                                        })(<Input placeholder={formatMessage(messages["Search"])} width={100} suffix={<img title="Add" style={{ cursor: "pointer" }} src={searchIconOrange} width={30} height={30} alt="Add" />} />)}
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

const SaveSearchSideBarForm = Form.create('DeploymentForm')(SaveSearchSideBar);

export default SaveSearchSideBarForm;