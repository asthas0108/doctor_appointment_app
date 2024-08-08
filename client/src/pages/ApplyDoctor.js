import React from 'react';
import Layout from "./../components/Layout";
import { Col, Form, Input, Row, TimePicker, Button, message } from "antd";
import '../styles/ApplyDoctor.css'; // Import the CSS file
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {showLoading, hideLoading} from '../redux/features/alertSlice';
import axios from "axios";

const ApplyDoctor = () => {

    const {user}= useSelector(state=>state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleFinish = async (values) => {
        try{
            dispatch(showLoading());
            const res = await axios.post("/api/v1/user/apply-doctor", {...values, userId:user._id}, {
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            })
            dispatch(hideLoading());
            if(res.data.success){
                message.success(res.data.success);
                navigate("/");
            }else{
                message.error(res.data.success);
                dispatch(hideLoading());
            }
        }catch(error){
            console.log(error);
            message.error("something went wrong");
        }
    }

    return (
        <Layout>
            <h1 className="text-center">Apply Doctor</h1>
            <div className="form-container">
                <Form layout="vertical" onFinish={handleFinish} className="form-content">
                    <h4>Personal Details:</h4>
                    <Row gutter={40}>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item 
                                label="First Name" 
                                name="firstName" 
                                rules={[{ required: true, message: 'Please enter your first name' }]}
                            >
                                <Input placeholder='Your first Name' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item 
                                label="Last Name" 
                                name="lastName" 
                                rules={[{ required: true, message: 'Please enter your last name' }]}
                            >
                                <Input placeholder='Your last Name' />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={40}>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item 
                                label="Phone Number" 
                                name="phone" 
                                rules={[{ required: true, message: 'Please enter your phone number' }]}
                            >
                                <Input placeholder='Your phone number' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item 
                                label="Email" 
                                name="email" 
                                rules={[{ required: true, message: 'Please enter your email', type: 'email' }]}
                            >
                                <Input type='email' placeholder='Your email' />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={40}>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item 
                                label="Website" 
                                name="website" 
                                rules={[{ required: true, message: 'Please enter your website' }]}
                            >
                                <Input placeholder='Your website' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item 
                                label="Address" 
                                name="address" 
                                rules={[{ required: true, message: 'Please enter your clinic address' }]}
                            >
                                <Input placeholder='Your clinic address' />
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* PROFESSIONAL DETAILS */}

                    <h4>Professional Details:</h4>

                    <Row gutter={40}>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item 
                                label="Specialization" 
                                name="specialization" 
                                rules={[{ required: true, message: 'Please enter your specialization' }]}
                            >
                                <Input placeholder='Your Specialization' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item 
                                label="Experience" 
                                name="experiences" 
                                rules={[{ required: true, message: 'Please enter your experience' }]}
                            >
                                <Input placeholder='Your experience' />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={40}>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item 
                                label="Fees per Consultation" 
                                name="feesperConsultation" 
                                rules={[{ required: true, message: 'Please enter your fees per consultation' }]}
                            >
                                <Input placeholder='Your fees per consultation' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item 
                                label="Timings" 
                                name="timing" 
                                rules={[{ required: true, message: 'Please select your timings' }]}
                            >
                                <TimePicker.RangePicker format="HH:mm" />
                            </Form.Item>
                        </Col>
                    </Row>
                    
                    <Button className="form-btn" type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </Layout>
    )
}

export default ApplyDoctor;
