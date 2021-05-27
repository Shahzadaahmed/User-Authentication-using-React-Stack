// Note: Home component...!

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from "../../store/action/dispatch-functions";
import { Button } from '@material-ui/core';
import "./style.css";

const Home = () => {

    // Note: Handeling redux here...!
    const dispatch = useDispatch();

    // Note: Function to logout user...!
    const logout = () => {
        dispatch(logOutUser());
    }

    let authenticatedUser = useSelector(({ users }) => { return users.authenticatedUser });
    let { name } = authenticatedUser;
    // console.log(authenticatedUser);

    return (
        <React.Fragment>
            <div className="container">
                <h1 className="heading"> Hi {`${name}, Welcome to React-JS Technical Code Challenge! 🙂`} </h1>
                <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    onClick={logout}
                    style={{
                        marginTop: '1.3em',
                        textTransform: "capitalize",
                        borderStyle: "solid",
                        borderColor: "white",
                        borderWidth: 1
                    }}
                >
                    Logout
                </Button>
            </div>
        </React.Fragment>
    );
}

export default Home;