import React from 'react';
import Layout from "./../components/Layout";
import { Tabs, message } from "antd";
import { useSelector, useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import axios from "axios";
import {useNavigate} from 'react-router-dom';

const NotificationPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.user);

    const handleMarkAllRead = async() => {
        try{
            dispatch(showLoading());
            const res = await axios.post("/api/v1/user/get-all-notification", {userId:user._id},{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`,
                },
            })
            dispatch(hideLoading());
            if(res.data.success){
                message.success(res.data.message);
            }else{
                message.error(res.data.message);
            }
        }catch(error){
            dispatch(hideLoading());
            console.log(error);
            message.error("something went wrong");
        }
    };

    const handleDeleteAllRead = () => {
        // Your logic here
    };

    // Define the tabs content
    const tabItems = [
        {
            key: '0',
            label: 'Unread',
            children: (
                <div>
                    <div className='d-flex justify-content-end'>
                        <h4 className='p-2' onClick={handleMarkAllRead}>Mark all read</h4>
                    </div>
                    {
                        user?.notification.map((notificationMsg, index) => (
                            <div key={index} className='card' style={{cursor:'pointer'}} >
                                <div className='card-text' onClick={navigate(notificationMsg.onClickPath)}>
                                    {notificationMsg.message}
                                </div>
                            </div>
                        ))
                    }
                </div>
            ),
        },
        {
            key: '1',
            label: 'Read',
            children: (
                <div>
                    <div className='d-flex justify-content-end'>
                        <h4 className='p-2' onClick={handleDeleteAllRead}>Delete all</h4>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <Layout>
            <h4 className="p-2 text-center">Notification Page</h4>
            <Tabs items={tabItems} />
        </Layout>
    );
}

export default NotificationPage;
