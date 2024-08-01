import React from "react";
import "../styles/RegisterStyle.css";
import { Form, Input, message } from "antd";
import {Link, useNavigate} from "react-router-dom";


const login = () => {

  //form handler
  const onfinishHandler= async (values)=>{
    console.log(values);
  }

  return (
    <div className="form-container ">
      <Form layout="vertical" onFinish={onfinishHandler} className="register-form">
        <h3 className="text-center">LOGIN FORM</h3>

        <Form.Item label="Email" name="email">
          <Input type="email" required />
        </Form.Item>

        <Form.Item label="Password" name="password">
          <Input type="password" required />
        </Form.Item>

        <Link to="/register" className="m-2">
          Not a user ? Register here
        </Link>

        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </Form>
    </div>
  );
};
export default login;