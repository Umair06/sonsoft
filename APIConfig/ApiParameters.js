import { connect } from "react-redux";

const ApiResponseMessages = {
    getData: "Loading...",
    postData: "Updating...",
    deletingData: "Deleting...",
    updated: "Successfully Updated",
    deleted: "Successfully Deleted",
    saved: "Successfully Saved",
    error: "Something went wrong. Please try again. If the problem persist then please contact the admin. Thanks",
    forwardedEmail: "Email Forward Successfully",
    exported: 'Successfully Exported',
    savedSearchCriteria: "Search Criteria has been saved",
    appliedLegalHold: "Succesfully applied legal hold",
    removeOnHold: "Succesfully Removed",
    releasedLegalHold: "Succesfully Released Legal Hold(s)",
    activatedLegalHold: "Succesfully Activated Legal Hold(s)",
    deletedSearchCriteria: "Search Criteria Deleted successfully",
    loggedIn: "Successfully Logged In",
    loggedOut: "Successfully Logged Out",
    releasingLegalHold: "Releasing Legal Hold(s)",
    activatingLegalHold: "Activating Legal Hold(s)",
    applyingPriority: "Applying Priority",
    cancelAPIcall: "Cancel",
    applyingLicense: "Applying License..",
    licenseAppliedSuccessfully: "License applied successfully",
    active: 'Activated Successfully',
    deactive: 'Deactive Successfully',
    applyLabel: 'Label Applied Successfully',
};

export let APITOKEN;

const Apis = ({ authenticUserInfo }) => {
    try {
        // if (authenticUserInfo.data.data.output[0].name === "sonasoftarc") {
        //     APITOKEN = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVU0VSX0lEIjowLCJVU0VSX05BTUUiOiJzb25hc29mdGFyYyIsIkRJU1BMQVlfTkFNRSI6IiIsIkRPTUFJTl9OQU1FIjoiIiwiVVNFUl9QV0QiOiJFa2dMOUZ0TmQ0REtiMWJua3JBVjFnPT0iLCJNQUlMQk9YX05BTUUiOiIiLCJST0xFX0lEIjoxLCJVU0VSX1RZUEUiOiJTIiwiVVNFUl9QUklOQ0lQQUxfTkFNRSI6bnVsbCwiUk9MRV9OQU1FIjoiRUFTIEFETUlOSVNUUkFUT1IiLCJST0xFX0RFU0NSSVBUSU9OIjoiRUFTIEFETUlOSVNUUkFUT1IiLCJTVEFUVVMiOjEsIlJPTEVfVFlQRSI6IlMiLCJUT0tFTl9TRUNSRVQiOiIzMCVeJjkxYTUxYWE0YiFAYjFBd2R-KDYpKiY1YjllNDc5ODdkZXYiLCJDTElFTlRfTkFNRSI6InNvbmFzb2Z0IiwiaWF0IjoxNTc2ODI3ODU3fQ.QKCq7bM5jQi5SgcY083aTpnyeiD1aLvcbOIOq5UyGIE`;
        // } else {
        APITOKEN = `Bearer ${authenticUserInfo.data.data.output[0].token}`;
        // }

    } catch (e) {
        DEBUGER && console.log(e.message);
    }
    return null;
};

export const Bearer = "Bearer ";

export const APICHANNEL = "sonasoft";
export const APIPORT = "http://51.143.12.194:1338";
export const DEBUGER = true;
export { ApiResponseMessages };

const mapStateToProps = state => ({
    authenticUserInfo: state.LoginReducer.authenticUserInfo,
});

export default connect(mapStateToProps)(Apis);

