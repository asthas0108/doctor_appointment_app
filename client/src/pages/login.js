import React from "react";
import "../styles/RegisterStyle.css";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; 
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Form handler
  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/login", values, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      dispatch(hideLoading());

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login successful");
        navigate('/');
      } else {
        message.error(res.data.message || "Login failed");
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error('Login Error:', error.response || error.message);
      message.error(
        error.response?.data?.message || 
        "Something went wrong"
      );
    }
  };

  return (
    <div className="form-container">
      <Form 
        layout="vertical" 
        onFinish={onFinishHandler} 
        className="card p-4 register-form"
      >
        <h3 className="text-center">LOGIN FORM</h3>

        <Form.Item 
          label="Email" 
          name="email" 
          rules={[{ required: true, type: 'email', message: 'Please enter a valid email!' }]}
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item 
          label="Password" 
          name="password" 
          rules={[{ required: true, message: 'Please enter your password!' }]}
        >
          <Input type="password" />
        </Form.Item>

        <Link to="/register" className="m-2">
          Not a user? Register here
        </Link>

        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </Form>
    </div>
  );
};

export default Login;
