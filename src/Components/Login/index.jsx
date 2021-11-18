import { Button, Card, CardActions, CardContent, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import EmailIcon from '@mui/icons-material/Email';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { makeStyles } from '@mui/styles';
import axios from "client/axios.js"
import endpoints from "endpoints.json"
import "./login.css"

const useStyles = makeStyles({
    card_controls: {
        display: 'block'
    }
})



const Login = () => {
    const classes = useStyles()
    const navigate = useNavigate()


    let [error, setError] = useState("")
    let [isPasswordVisible, setPasswordVisibility] = useState(false)
    let [form, setFormValues] = useState({
        email: '',
        password: '',
    })
    const togglePasswordVisibility = () => setPasswordVisibility(!isPasswordVisible);
    const validateEmail = mail => !(mail === "" || /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
    const validatePassword = pwd => (pwd.length > 0 && pwd.length < 6)
    const validateForm = () => {
        let title = '', message = ''
        if (form.password.length == 0 || form.email.length == 0) {
            title = "Fields Blank!"
            message = "Please Fill all the fields to Login"
        }
        else if (validateEmail(form.email)) {
            title = "Email not valid"
            message = "Specified Email Format is incorrect"
        }
        else if (validatePassword(form.password)) {
            title = "Password not valid"
            message = "Password Must be at least 6 characters"
        }
        else return true
        return false
    }
    const login = async () => {
        console.log("form", form)
        if (!validateForm()) return false
        try {
            let res = await axios.post(endpoints.login, form)
            console.log("res ", res)
            if (!res.data.success) {
                setError(res.data.err)
            }
            else {
                let admin = { ...res.data.admin }
                localStorage.setItem('admin', JSON.stringify(admin))
                navigate('/dashboard')
            }
        }
        catch (err) {
            console.log("login err", err)
        }

    }
    const handleEnter = v => {
        if (v.keyCode == 13) console.log("Login");
    }
    const handleFormChange = (prop) => (event) => {
        setFormValues({ ...form, [prop]: event.target.value });
    };
    return (
        <Card className={`login_card`}>
            <h2 className="login_card_heading">Login Now</h2>
            <CardContent component="form">
                <div className="form_input">
                    <EmailIcon className="input_icon input_icon_left" />
                    <input
                        id="login_email"
                        autoComplete="email"
                        type="email"
                        value={form.email}
                        onChange={handleFormChange("email")}
                        placeholder="Email"
                        onKeyUp={handleEnter}

                    />
                </div>
                <div className="form_input">
                    <VpnKeyIcon className="input_icon input_icon_left" />
                    <input
                        id="login_password"
                        type={isPasswordVisible ? "text" : "password"}
                        value={form.password}
                        onChange={handleFormChange("password")}
                        placeholder="Password"
                        onKeyUp={handleEnter}
                    />
                    <>
                        {
                            isPasswordVisible ?
                                <VisibilityIcon className="input_icon input_icon_right " onClick={togglePasswordVisibility} /> :
                                <VisibilityOffIcon className="input_icon input_icon_right " onClick={togglePasswordVisibility} />
                        }
                    </>
                </div>
                <div className="login-errors">
                    {error}
                </div>
            </CardContent>
            <CardActions className={classes.card_controls} >
                <Button
                    className="btn"
                    variant="contained"
                    color="primary"
                    onClick={login}
                >
                    Log In
                </Button>

            </CardActions>

        </Card>
    );
}

export default Login;
