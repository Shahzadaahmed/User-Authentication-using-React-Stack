// Note: SignUp component...!

import React, { useState } from 'react';
import { Button, Grid, Paper, TextField, Typography, FormControlLabel, Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signUpUserDispatch } from '../../store/action/dispatch-functions';
import "./style.css";

// Note: Handeling Material UI styling here...!
const useStyle = makeStyles((theme) => ({
    Paper: {
        width: '520px',
        [theme.breakpoints.down('sm')]: {
            width: "auto"
        },
        color: '#f6f6f6',
        borderRadius: '17px',
        padding: '2em',
        backgroundColor: "transparent"
    },

    Heading: {
        fontSize: '1.3em',
        fontFamily: 'sans-serif',
        color: `#212943`,
    },

    Link: { textDecoration: 'none' },

    Button: {
        borderRadius: '20px',
        padding: '13px',
        backgroundColor: `#212943`,
        color: '#fff',
        '&:hover': {
            backgroundColor: '#1976D2',
        },
    },
}));

const SignUp = () => {

    // Note: To access Material UI...!
    const classes = useStyle();

    // Note: Handeling states here...!
    const [formData, setformData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [validationHelper, setValidationHelper] = useState({
        nameHelper: '',
        emailHelper: '',
        passwordHelper: '',
    });
    const [checkedState, setCheckedState] = useState(false);

    const { name, email, password } = formData;
    const { nameHelper, emailHelper, passwordHelper } = validationHelper;

    // Note: Handling redux here...!
    const dispatch = useDispatch();

    // Note: Function to handle form...!
    const onChange = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value });
    };

    // Note: Function to handle checkbox...!
    const handleCheckBox = (event) => {
        setCheckedState(event.target.checked);
    }

    // Note: Function to submit form data...!
    const onSubmit = () => {

        let validEmailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (
            formData.name != 0 &&
            (formData.email != 0 && formData.email.match(validEmailFormat)) &&
            formData.password.length > 5
        ) {
            dispatch(signUpUserDispatch(formData));
            clearAll();
        }

        else {
            validationHelper.nameHelper = "Name is Required";
            validationHelper.emailHelper = "Email is Required or Inavlid Email Format";
            validationHelper.passwordHelper = "Password is Required or Password length should be greater than six";

            setTimeout(() => {
                setValidationHelper({
                    nameHelper: '',
                    emailHelper: '',
                    passwordHelper: ''
                });
            }, 5000);

            setValidationHelper({
                ...validationHelper
            });
        }
    };

    // Note: Function to clear all input fields...!
    const clearAll = () => {
        setformData({
            name: '',
            email: '',
            password: '',
        });
        setValidationHelper({
            nameHelper: '',
            emailHelper: '',
            passwordHelper: '',
        });
        setCheckedState(false);
    }

    // Note: This is just for testing purpose...!
    let getUser = useSelector(({ users }) => { return users.usersArr });
    console.log(getUser);

    /***** Note: UI *****/
    return (
        <div id="custom-body">
            <Grid item container style={{ display: "flex", justifyContent: "center" }}>
                <Grid item container component={Paper} elevation={3} className={classes.Paper} justify='center' alignItems='center'>
                    <Grid item container justify='center' className={classes.Heading}>
                        <Typography variant='h4'> Sign Up </Typography>
                    </Grid>
                    <Grid item container direction='row' justify='center' alignItems='center' style={{ marginTop: '2em' }}>
                        <Grid item container justify='center'>
                            <TextField
                                id='name'
                                variant='outlined'
                                placeholder='Name'
                                name='name'
                                fullWidth
                                size='small'
                                inputProps={{
                                    style: {
                                        padding: 13,
                                        fontSize: '1.1rem',
                                        borderColor: "none",
                                        color: "white"
                                    },
                                }}
                                value={name || ""}
                                error={nameHelper.length !== 0}
                                helperText={nameHelper}
                                onChange={onChange}
                            />
                        </Grid>

                        <Grid item container justify='center' style={{ marginTop: '2em' }}>
                            <TextField
                                id='email'
                                variant='outlined'
                                placeholder='Email'
                                name='email'
                                fullWidth
                                size='small'
                                inputProps={{
                                    style: {
                                        padding: 13,
                                        fontSize: '1.1rem',
                                        borderColor: "none",
                                        color: "white"
                                    },
                                }}
                                value={email || ""}
                                error={emailHelper.length !== 0}
                                helperText={emailHelper}
                                onChange={onChange}
                            />
                        </Grid>

                        <Grid item container justify='center' style={{ marginTop: '2em' }}>
                            <TextField
                                type='password'
                                id='outlined-basic'
                                variant='outlined'
                                fullWidth
                                placeholder='Password'
                                size='small'
                                inputProps={{
                                    style: {
                                        padding: 13,
                                        fontSize: '1.1rem',
                                        color: "white"
                                    },
                                }}
                                name='password'
                                value={password || ""}
                                error={passwordHelper.length !== 0}
                                helperText={passwordHelper}
                                onChange={onChange}
                            />
                        </Grid>

                        <Grid item container justify='center' style={{ marginTop: '1em' }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checkedState}
                                        onChange={handleCheckBox}
                                        name="checkedState"
                                        color="primary"
                                    />}
                                label="I accept all terms and conditions"
                            />
                        </Grid>

                        <Grid item container justify='center' style={{ marginTop: '1em' }}>
                            <Button disabled={(checkedState) ? (false) : (true)} onClick={onSubmit} fullWidth variant='contained' className={classes.Button}>
                                Submit
						    </Button>
                        </Grid>
                    </Grid>

                    <Grid item container justify='center' style={{ marginTop: '2em' }}>
                        <Link to='/' className={classes.Link}>
                            <Typography variant='h6'>
                                Already have an account ? <span style={{ color: 'white' }}> Login </span>
                            </Typography>
                        </Link>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default SignUp;