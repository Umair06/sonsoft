import React, { Component } from "react";
import { Form, } from 'antd';
import style from "../../styles"
import rightArrow from "../../Assets/icons/Side Column Arrow Expand.png";
import leftArrow from "../../Assets/icons/Side Column Arrow compressed.png";

import { connect } from "react-redux";
class MultiTenantSideBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        const { collapsed, collapseSideMenu } = this.props
        return (
            <div style={!collapsed ? style.sideMenuHeight : { height: "10vh" }}>
                <div style={collapsed ? style.emailsCollapsedSideMenuIcon : style.emailsSideMenuIcon} >
                    {collapsed ?
                        <div onClick={collapseSideMenu} title="Open Menu" style={{ cursor: "pointer", width: "100%", display: "flex", justifyContent: "center", }}>
                            <img src={rightArrow} style={{ cursor: "pointer" }} alt={"button"} width={20} height={20} title="Open Menu" />
                        </div>
                        :
                        <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', alignItems: "center", WebkitTransition: 'webkitTransition .5s linears' }}>
                            <div style={{ display: "flex", width: "80%" }}></div>
                            <div style={{ display: "flex", width: "20%"}}>
                                <img src={leftArrow} title="Close Menu" alt={"button"} style={{ cursor: "pointer" }} width={20} height={20} onClick={collapseSideMenu} />
                            </div>
                        </div>
                    }
                </div>

            </div>
        )
    }
}


const MultiTenantSideBarForm = Form.create('DeploymentForm')(MultiTenantSideBar);

const mapStateToProps = state => {
    return {
    }
};
const mapDispatchToProps = dispatch => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MultiTenantSideBarForm);