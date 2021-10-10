let token = localStorage.getItem("currentUser")
            ? JSON.parse(localStorage.getItem("currentUser")).access_token
            : ""

export const initialState = {
    token: "" || token,
    loading: false,
    errorMessage: null
}

export const AuthReducer = (initialState, action) => {
    switch(action.type) {
        case "REQUEST_LOGIN":
            return {
                ...initialState,
                loading: true
            }
        case "LOGIN_SUCCESS":
            return {
                ...initialState,
                token: action.payload.access_token,
                loading: false
            }
        case "LOGOUT":
            return {
                ...initialState,
                token: ""
            }
        case "LOGIN_ERROR":
            return {
                ...initialState,
                loading: false,
                errorMessage: action.error
            }
        default:
            throw new Error(`Unhandled action type: ${action.type}`)
    }
}