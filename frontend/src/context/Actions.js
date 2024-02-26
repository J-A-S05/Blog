
const LoginStart = (userCredentials) => ({
    type : "LOGIN_START"
})

const LoginSuccess = (user) => ({
    type : "LOGIN_SUCCESS",
    payload : user
})

const LoginFailure = () => ({
    type : "LOGIN_FAILURE"
})

const UpdateStart = (userCredentials) => ({
    type : "UPDATE_START"
})

const UpdateSuccess = (user) => ({
    type : "UPDATE_SUCCESS",
    payload : user
})

const UpdateFailure = () => ({
    type : "UPDATE_FAILURE"
})

const Logout = () => ({
    type : "LOGOUT"
})

export {LoginFailure , LoginStart , LoginSuccess , Logout , UpdateFailure , UpdateStart , UpdateSuccess }