// Note: All authentication cases are defined here...!

import {
    SIGN_UP_USER,
    LOG_IN_USER,
    LOG_OUT_USER
}
    from "../constant/action-types";
import swal from 'sweetalert';
import Cookies from "js-cookie";

const INIT_STATE = {
    usersArr: [],
    authenticatedUser: null
}

const authReducer = (state = INIT_STATE, action) => {

    // Note: Function to check duplicate user...!
    const checkDuplicateUser = (email) => {
        let duplicateFlag = false;
        let allUsersClone = state.usersArr;

        for (let i = 0; i < allUsersClone.length; i++) {
            // console.log(allUsersClone[i].email);

            if (email === allUsersClone[i].email) {
                duplicateFlag = true;
            }
        }

        return duplicateFlag;
    }

    switch (action.type) {

        /********** USER SIGN_UP AREA **********/
        case SIGN_UP_USER:
            let duplicateUser = checkDuplicateUser(action.payload.email);
            // console.log(duplicateUser);
            let usersClone = state.usersArr;

            if (duplicateUser) {
                swal({
                    title: "Error! ⚠️",
                    text: "The email you entered is already registered by another account. Please use another email address!",
                    icon: "warning",
                    button: "Try Again",
                });
            }

            else {
                usersClone.push(action.payload);
                console.log(usersClone);
                swal({
                    title: "Registered Successfully!",
                    text: "You have signed up sucessfully!",
                    icon: "success",
                    button: "Ok!",
                });

                return {
                    ...state,
                    usersArr: usersClone
                }
            }

        /********** USER LOG_IN AREA **********/
        case LOG_IN_USER:
            // console.log(action.payload);
            let userCloneForLogIn = state.usersArr;
            let userEmail = action.payload.email;
            let userPassword = action.payload.password;
            let message;
            let userFlag = false;
            let targetUser;

            for (let i = 0; i < userCloneForLogIn.length; i++) {
                let usersList = userCloneForLogIn[i];

                if ((userEmail === usersList.email) && (userPassword === usersList.password)) {
                    targetUser = userCloneForLogIn[i];
                    message = "Authorized User!";
                    userFlag = true;
                    break;
                }

                else if ((userEmail === usersList.email) && (userPassword != usersList.password)) {
                    message = "Email is correct, But Password is Incorrect!";
                    userFlag = false;
                    break;
                }

                else if ((userEmail != usersList.email) && (userPassword != usersList.password)) {
                    message = "User does not exist!";
                    userFlag = false;
                }
            }

            // console.log(message);
            // console.log(userFlag);

            if (userFlag) {
                // Note: Set user in cookies...!
                Cookies.set('user', targetUser);
                swal({
                    title: "Logged In Successfully!",
                    text: "You have logged in sucessfully!",
                    icon: "success",
                    button: "Ok!",
                });
            }

            else {
                swal({
                    title: "Something Went Wrong!",
                    text: `${message}`,
                    icon: "error",
                    button: "Try Again!",
                });
            }

            return {
                ...state,
                authenticatedUser: targetUser
            }

        /********** USER LOG_OUT AREA **********/
        case LOG_OUT_USER:
            swal({
                title: "Good Bye!",
                text: "You have logged out sucessfully!",
                icon: "success",
                button: "Bye!",
            });

            // Note: Removing user information from local storage and cookies...!
            Cookies.remove('user');

            return {
                ...state,
                authenticatedUser: null
            }

        default:
            return state;
    }
}

export default authReducer;