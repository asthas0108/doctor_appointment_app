import React, { useState , useEffect } from 'react'
import Layout from './../components/Layout';
import axios from "axios";
import moment from 'moment';
import { Table } from 'antd';

export const Appointments = () => {

    const [appointments, setAppointments] = useState([]);
    const getAppointments = async ()=> {
        try{
            const res = await axios.get("/api/v1/user/user-appointments", {
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`,
                }
            })
            if(res.data.success){
                setAppointments(res.data.data);
            }
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        getAppointments();
    },[])


    const columns = [
        {
            title:"ID",
            dataIndex:"_id",
        },
        // {
        //     title:"Name",
        //     dataIndex:"name",
        //     render:(text,record) => (
        //         <span>
        //             {record.doctorId.firstName} {record.doctorId.lastName}
        //         </span>
        //     )
        // },
        // {
        //     title:"Phone No:",
        //     dataIndex:"phone",
        //     render:(text,record) => (
        //         <span>
        //             {record.doctorInfo.phone}
        //         </span>
        //     )
        // }, 
        {
            title:"Date & Time",
            dataIndex:"date",
            render:(text,record) => (
                <span>
                    {moment(record.date).format("DD-MM-YYYY")} &nbsp;
                    {moment(record.time).format("HH:mm")}
                </span>
            )
        },
        {
            title:"Status",
            dataIndex:"status",
        },
    ]

  return (
    <Layout>
        <h2> Your Appointments List </h2>
        <Table columns={columns} dataSource={appointments}>

        </Table>
    </Layout>
  )
}
