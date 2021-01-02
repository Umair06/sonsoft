import React, { Component } from 'react';
import { Tabs } from 'antd';
import style from "../../../../../styles";
import StubPolicy from "./StubPolicy/StubPolicy";
import AutoLabel from "./AutoLabel/AutoLabel";
import RetentionPolicy from "./RetentionPolicy/RetentionPolicy";
import ArchivalPolicy from "./ArchivalPolicy/ArchivalPolicy"
import FolderSyncPolicy from "./FolderSyncPolicy/FolderSyncPolicy"
// import Theme from "../../../../../Assets/Theme/Theme"

// const { SubMenu } = Menu;

// const { Text, Title } = Typography;
const { TabPane } = Tabs;
// const {color} = Theme

class ControlCenter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Edit: false,
            addnew: false,
            notification: true
        }
    }
    // componentDidMount() {
    //     this.callBack('1')
    // }


    render() {

        return (
            <div className="card-container">
                <Tabs type="card" tabBarStyle={{ ...style.tabs.tabBar, margin: 0, padding: 0 }} onChange={this.callBack} >
                    <TabPane tab={"Archival Policy"} key="1" style={{ margin: 0, padding: 0 }}>
                        <ArchivalPolicy />
                    </TabPane>
                    <TabPane tab={"Folder Sync"} key="2">
                        <FolderSyncPolicy />
                    </TabPane>
                    <TabPane tab={"Stub Policy"} key="3">
                        <StubPolicy />
                    </TabPane>
                    <TabPane tab={"Retention Policy"} key="4">
                        <RetentionPolicy />
                    </TabPane>
                    <TabPane tab={"Auto Labeling"} key="5">
                        <AutoLabel />

                    </TabPane>
                </Tabs>

            </div>
        )
    }

}

export default ControlCenter;