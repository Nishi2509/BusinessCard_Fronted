import React, { useState, useEffect } from 'react';
import { FiMail } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import validation from './Validation'; 

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState({});
    const [submit, setSubmit] = useState(false);

    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const newObj = { ...data, [e.target.name]: e.target.value };
        setData(newObj);
    };

    const handleSignIn = (e) => {
        e.preventDefault();
        const validationErrors = validation(data);
        console.log('Validation Errors:', validationErrors); // Debugging
        setError(validationErrors);
        setSubmit(true);
    };

    useEffect(() => {
        console.log('Effect Triggered', { error, submit }); // Debugging
        if (Object.keys(error).length === 0 && submit) {
            navigate("/home");
        }
    }, [error, navigate, submit]);

    return (
        <div className="container">
            <div className="container-form">
                <form onSubmit={handleSignIn}>
                    <h1>Login</h1>
                    <p>Please sign in to continue.</p>

                    <div className="inputBox">
                        <FiMail className='mail' />
                        <input
                            type="email"
                            name="email"
                            id="email"
                            onChange={handleChange}
                            placeholder='Email'
                        />
                    </div>
                    {error.email && <span style={{ color: "red", display: "block", marginTop: "5px" }}>{error.email}</span>}

                    <div className="inputBox">
                        <RiLockPasswordLine className='password' />
                        <input
                            type="password"
                            name="password"
                            id="password"
                            onChange={handleChange}
                            placeholder='Password'
                        />
                    </div>
                    {error.password && <span style={{ color: "red", display: "block", marginTop: "5px" }}>{error.password}</span>}

                    <div className='divBtn'>
                        <small className='FG'>Forgot Password?</small>
                        <button type='submit' className='loginBtn'>LOGIN</button>
                    </div>
                </form>

                <div className='dont'>
                    <p>Don't have an account? <Link to="/signup"><span>Sign up</span></Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;

