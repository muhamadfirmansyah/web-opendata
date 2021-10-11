const ROOT_URL = "https://apiopendata.herokuapp.com"

export const loginUser = async (dispatch, loginPayload) => {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginPayload)
    }

    try {
        dispatch({ type: "REQUEST_LOGIN" })

        let response = await fetch(`${ROOT_URL}/api/login`, requestOptions)
        let data = await response.json()

        if (data.access_token) {
            dispatch({ type: "LOGIN_SUCCESS", payload: data })
            localStorage.setItem("currentUser", JSON.stringify(data))
            return data
        }

        dispatch({ type: "LOGIN_ERROR", error: data.message })
        return
    } catch (error) {
        dispatch({ type: "LOGIN_ERROR", error: error.message })
    }
}

export const logout = async (dispatch) => {

    let token = JSON.parse(localStorage.getItem("currentUser")).access_token

    const requestOptions = {
        method: "POST",
        headers: { 
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
         },
    }

    dispatch({ type: "LOGOUT" })
    
    try {
        let response = await fetch(`${ROOT_URL}/api/logout`, requestOptions)
        let data = await response.json()

        if (data.message) {
            localStorage.removeItem("currentUser")
            localStorage.removeItem("token")
        }

    } catch (error) {
        console.log(error)
    }

}