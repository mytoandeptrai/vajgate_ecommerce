import UseAdminAuth from "../CustomHooks/UseAdminAuth";

const WithAdminAuth = (props) => UseAdminAuth(props) && props.children;

export default WithAdminAuth;
