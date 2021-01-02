import React, { Component } from 'react'
import { Typography, Drawer, Icon, Tree, Skeleton } from "antd";

import style from "../../../styles";
import Clear_Gray from '../../../Assets/icons/SV_ICONS/Clear_Gray.png';
import labelImage from '../../../Assets/icons/SV_ICONS/Label_Orange.png'

import Theme from "../../../Assets/Theme/Theme";
import { connect } from 'react-redux';
import { returnLegalLabelOrGlobal } from '../../../Screens/SearchArchive/utils';
import getLabelTypeColorAndName from './utils';

const { Title, Text } = Typography;
const { color } = Theme;
const { TreeNode } = Tree;

class LabelDrawer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      treeData: []
    }
  }

  transformChildren = (id, name, color, icon, type) => {
    let children = []
    icon = icon === 'G' ? 'global' : 'folder'

    //this run when we policy already exist and we need to just put label inside the policy 
    if (type === 'Object') { //Step #6
      return {
        key: id,
        title: <Text style={{ ...style.labelDropdownStyle }}>
          <Icon type={icon} /> {name} </Text>,
        color
      }
    }

    //this run when we creating complete policy
    else if (type === 'Array') { //Step #6
      children.push({
        key: id,
        title: <Text style={{ ...style.labelDropdownStyle }}> <Icon type={icon} /> {name} </Text>,
        color
      })
      return children
    }
  }

  renderTreeNodes = data => data.map((item, index) => {
    if (item.children) {
      return (
        <TreeNode
          selectable={false}
          key={item.key}
          title={item.title}
          icon={item.icon ? <Icon type={item.icon} /> : false}
          checkable={false}
          isLeaf={false}
          disabled={item.disabled || false}
          dataRef={item}
          onSelect={this.handleCheckboxClick}
        >
          {this.renderTreeNodes(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode selectable={false}
      title={<div style={{ backgroundColor: item.color, color: "#fff", padding: "2px 4px", borderRadius: 3 }}>
        {item.title}</div>} key={item.key} dataRef={item} />
  })

  generateLabelTree = () => {
    try {
      let policies = [], treeData = [];
      const { legalHoldAutoLabels, simpleSearch, openedEmail, onHold, currentCaseId, labelDataFromModal } = this.props
      const pushDataIntoTreeData = ({ labelId, labelName, color, policyName, policyId, labelType }) => { //Destructuring the params
        let getIndex = -1
        //In this line of code we check coming policy is exist in treeData Array if its exist so we push this label to already exist policy if its no exist
        // so in the else section we create create the policy and label as its children
        if (treeData.length > 0) getIndex = treeData.findIndex(policy => policy.title === policyName) //Step #4

        if (getIndex !== -1 && getIndex !== undefined)  //Step #5
          return treeData[getIndex].children.push(this.transformChildren(labelId, labelName, color, labelType, 'Object'))
        else { //Step #5
          treeData.push({
            "title": policyName,
            "key": policyId,
            "children": this.transformChildren(labelId, labelName, color, labelType, 'Array')
          })
        }
      }
      // this line of code put policies all the match policies into Policies Array
      const allPolicies = labelDataFromModal ? labelDataFromModal : (simpleSearch && simpleSearch.LabelType) || legalHoldAutoLabels
      openedEmail.forEach(labels => policies.push(getLabelTypeColorAndName(labels, allPolicies, onHold))) //Step #1

      //This function check if user on legalHold screen it will 
      // return global and label label according to doc caseId. If user on SearchArchive screen this will return global Label
      policies = returnLegalLabelOrGlobal(policies, onHold, currentCaseId)

      // blow line pushDataIntoTreeData this generate the complete tree Data 
      policies.forEach(policy => pushDataIntoTreeData(policy)) //Step #3

      //
      !this.state.notToRunAgain && this.setState({ data: treeData, notToRunAgain: true }) //Step #7
    } catch (error) {
      console.log(error.message);
    }
  }

  closeAndSetState = () => {
    console.log('notToRunAgain');
    this.setState({ notToRunAgain: false, data: [] })
    this.props.close()
  }

  render() {
    const { data } = this.state;
    const { labelDrawer } = this.props
    labelDrawer && this.generateLabelTree()
    return (
      <Drawer
        style={{ marginTop: "155px", overflow: "auto" }}
        bodyStyle={{ height: 'calc(100vh - 155px)', overflowY: "auto" }}
        maskStyle={{ backgroundColor: "transparent" }}
        width={400}
        onClose={() => this.closeAndSetState()}
        closable={false}
        visible={labelDrawer}
      >
        <div style={{ padding: "0px 10px", display: "flex", flexDirection: "column" }}>
          <div style={{ ...style.setting.drawerMain }}>
            <div style={{ display: "flex", alignItems: "center", }}>
              <img title="Recipents" src={labelImage} width="45px" style={{ ...style.cursorPointer }} alt="" />
              <Title style={{ color: color.Blue, paddingBottom: 10, padding: "15px 0 0 18px", fontSize: 24 }} level={2}>Labels</Title>
            </div>
            <div onClick={() => this.props.close()} style={{ paddingTop: 10, cursor: "pointer" }}>
              <img src={Clear_Gray} title="Close" alt="" onClick={() => this.closeAndSetState()} width={28} height={28} />
            </div>
          </div>
          {(data || []).length > 0 ?
            <Tree
              defaultExpandAll
              onSelect={this.handleCheckboxClick}
              checkable={false}
            >
              {(data && (data || []).length) && this.renderTreeNodes(data)}
            </Tree> : <Skeleton active loading={!(data || []).length} />}
        </div>
      </Drawer>
    )
  }
};


const mapStateToProps = state => {
  return {
    globalAutoLabels: state.AutoLabelingReducer.globalAutoLabels,
    simpleSearch: state.SimpleSearchReducer.simpleSearch,
    legalHoldAutoLabels: state.AutoLabelingReducer.legalHoldAutoLabels,

  }
}

export default connect(mapStateToProps)(LabelDrawer);
