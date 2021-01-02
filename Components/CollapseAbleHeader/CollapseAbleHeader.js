import * as React from "react"
import { Collapse } from 'antd';
import theme from "../../Assets/Theme/Theme";

const {color} = theme
const Panel = Collapse.Panel;
/* if you want the collapsible header to be collapsed by default just add defaultCollapsed={true} prop  */
class CollapseAbleHeader extends React.Component {
    render() {
        const { heading, bgColor, defaultCollapsed} = this.props;
        return (
            <Collapse style={{ backgroundColor: bgColor, borderBottom: "0px none none" }} bordered={false} defaultActiveKey={[!defaultCollapsed && '1']}>
                <Panel style={{ fontSize: 14, color: `${color.Blue}`,border:0}} header={heading} key="1">
                    {this.props.children}
                </Panel>
            </Collapse>
        );
    }
}

export default CollapseAbleHeader;