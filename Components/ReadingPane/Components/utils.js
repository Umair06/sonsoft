const getLabelTypeColorAndName = (label, simpleSearch, onHold) => {
  const getPolicy = {};
  try {
    let policyData = simpleSearch
    // let policyData = returnPolicyDataArray(onHold, simpleSearch)
    const policyId = Number(label.split("-")[0] && label.split("-")[0]);
    const labelId = Number(label.split("-")[0] && label.split("-")[1]);
    const caseId = Number(label.split("-")[0] && label.split("-")[2]);
    let policy = policyData && policyData.filter(policy => policy.FILTER_ID === policyId);
    policy = policy && (policy || []).length && policy[0];
    let labelIndex = policy.LABEL_ID && policy.LABEL_ID.split(",").indexOf(String(labelId))
    getPolicy.labelName = policy.LABEL_NAME && policy.LABEL_NAME.split(",")[labelIndex]
    getPolicy.labelId = labelId
    getPolicy.labelType = policy && policy.FILTER_TYPE
    getPolicy.policyName = policy.FILTER_NAME
    getPolicy.policyId = policy.FILTER_ID
    getPolicy.caseId = caseId && caseId;
    getPolicy.color = policy && policy.COLOR_CODE.split(",")[0];
    return getPolicy
  }
  catch (e) { console.log(e.message) }
}
export default getLabelTypeColorAndName
