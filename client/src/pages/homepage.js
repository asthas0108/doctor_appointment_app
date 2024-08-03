import React, { useEffect } from 'react';
import axios from "axios";

const HomePage = () => {
  const getUserData = async () => {
    try {
      const res = await axios.post("/api/v1/user/getUserData", {}, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div>
      
    </div>
  );
};

export default HomePage;
