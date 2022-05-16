import React, { useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import { Link, useNavigate } from "react-router-dom";
const Signup = () => {
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [error,setError]= useState("");
    const navigate = useNavigate();
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:8000/api/users"
            const {data:res}= await axios.post(url,data);
           navigate("/login");
           console.log(res.message) 
        } catch (error) {
            if(error.response&&error.response.status>=400&&error.response.status<=500){
                setError(error.response.data.message)
            }
        }
    };
    return (
        <div className={styles.signup_container}>
            <div className={styles.signup_form_container}>
                <div className={styles.left}>
                    <h1>Welcome Back</h1>
                    <Link to="/login">
                        <button type="button" className={styles.white_btn}>
                            Sign in
                        </button>
                    </Link>
                </div>
                <div className={styles.right}>
                    <form
                        action=""
                        className={styles.form_container}
                        onSubmit={handleSubmit}
                    >
                        <h1>Create Account</h1>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            placeholder="First Name"
                            value={data.firstName}
                            required
                            className={styles.input}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            placeholder="Last Name"
                            value={data.lastName}
                            required
                            className={styles.input}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="email"
                            id="email"
                            placeholder="Email"
                            value={data.email}
                            required
                            className={styles.input}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Passsword"
                            value={data.password}
                            required
                            className={styles.input}
                            onChange={handleChange}
                        />
                        {error && <div className={styles.error_msg}>{error}</div>}
                        <button type="submit" className={styles.green_btn}>
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
