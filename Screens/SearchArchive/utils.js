import React from 'react';
import styles from "../../styles";
import { Icon } from "antd";
import getLabelTypeColorAndName from '../../Components/ReadingPane/Components/utils';


const returnJsxOfLabe =
  ({ color, labelName, labelType, caseId }, onHold, currentCaseId, ind) => {
  const icon = labelType === 'G' ? 'global' : 'folder'
    return (<div key={ind} style={{ backgroundColor: `${color}`, ...styles.labelDropdownStyle, display: "flex" }}>
      <Icon type={icon} style={{ ...styles.labelDropdownStyle }} />{labelName}
    </div>);
  }

export const getPoliciesData = (idsArray, openLabelDrawer, allPolicies, onHold, currentCaseId, notOnRowClick) => {
  try {
    let policies = []
    
    //with this line of code we get all policies which is matched the doc policy and label ids
    allPolicies &&
      idsArray.forEach(ids => policies.push(getLabelTypeColorAndName(ids, allPolicies, onHold)))

    //This function check if user on legalHold screen it will 
    // return global and label label according to doc caseId. If user on SearchArchive screen this will return global Label
    policies = returnLegalLabelOrGlobal(policies, onHold, currentCaseId)

    // this if statement render labels, if ets qty less than 4 
    if ((policies || []).length < 4)
    // simply return jsx of each label
      return policies.map((policyData, ind) => (returnJsxOfLabe(policyData, onHold, currentCaseId, ind)))

    // This else show three label with ">>" button for drawer opening
    else {
      const firstThree = policies.slice(0, 3)
      return (
        <div onClick={() => notOnRowClick && notOnRowClick()}>
          {(firstThree || []).length > 0 && firstThree.map((policyData, ind) =>
            returnJsxOfLabe(policyData, onHold, currentCaseId, ind))}
          <span
            onClick={() => openLabelDrawer(idsArray)}
            style={{ ...styles.greaterThanSignButton }}
            title="See All Labels">
            >>
        </span>
        </div>
      )
    }
  } catch (e) {
    console.log(e.message);
  }
}

export const returnLegalLabelOrGlobal = (policies, onHold, currentCaseId) => {
  if (onHold && currentCaseId)
    return policies = policies.filter(({ labelType, caseId }) => (labelType === 'G' || caseId === Number(currentCaseId)))
  else if (!onHold) return policies = policies.filter(({ labelType }) => labelType === 'G')
}
