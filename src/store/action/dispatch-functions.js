// Note: All authentication dispatch functions are defined here...!

import {
    SIGN_UP_USER,
    LOG_IN_USER,
    LOG_OUT_USER
}
    from "../constant/action-types";

/***** Note: SignUp function *****/
const signUpUserDispatch = (user) => {
    return (dispatch) => {
        // console.log(user);
        dispatch({
            type: SIGN_UP_USER,
            payload: user
        });
    }
}

/***** Note: Login function *****/
const logInUserDispatch = (user) => {
    return (dispatch) => {
        // console.log(user);
        dispatch({
            type: LOG_IN_USER,
            payload: user
        });
    }
}

/***** Note: logout function *****/
const logOutUser = () => {
    return (dispatch) => {
        dispatch({
            type: LOG_OUT_USER
        });
    }
}

export {
    signUpUserDispatch,
    logInUserDispatch,
    logOutUser
};