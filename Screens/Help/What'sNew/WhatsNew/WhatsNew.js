import React, { Component } from 'react';

import {Typography } from 'antd';

const {Title} = Typography;



class WhatsNew extends Component {
    constructor(props) {
        super(props)
        this.state = {
            aboutUsDrawer: false
        }
    }

    openAboutUsDrawer = () => {
        this.setState({
            aboutUsDrawer: true
        })
    };

    closeAboutUsDrawer = () => {
        this.setState({
            aboutUsDrawer: false
        })
    }
    // navigateToHomeScreen = () => {
    //     window.location.pathname = "/homescreen"
    // };

    collapseSideMenu = () => {
        const toggleCollapsed = !this.state.collapsed
        this.setState({
            collapsed: toggleCollapsed
        })
    };

    openDrawer = Drawer => {
        this.setState({
            [Drawer]: true
        })
    }
    onClose = Drawer => {
        this.setState({
            [Drawer]: false
        })
    }
    openChangePassDrawer = () => {
        this.setState({
            changePassDrawer: true
        })
    }

    closeChangePassDrawer = () => {
        this.setState({
            changePassDrawer: false
        })
    }
    render() {
       
        // const {formatMessage} = this.props;
        return (
            <div>
                <div style={{display:"flex",justifyContent:"center"}}>
                <Title style={{ color: `grey`, padding: "15px 0 0 0px", fontSize: 50 }}>{"Available in Later Versions"}</Title>

            </div>
               
            </div>
        )
    }
};

export default WhatsNew;
