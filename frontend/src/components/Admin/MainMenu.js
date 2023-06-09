// import { useState, useEffect } from 'react'
// import axios from "axios";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getLoginCookie } from "../utils/utils";
import { useEffect } from "react";
import ADMIN_NAVBAR from "../_public/Admin-Navbar";

const MainMenu = () => {
  const navigate = useNavigate();
  if(getLoginCookie() === undefined){
    window.location.href = '/';
  }
  const adminChecker = async() => {
    const res = await axios.get(`http://localhost:5000/akun/akses/${getLoginCookie()}`)
    if(res.data.akses !== 'admin'){
      navigate('/')
    }
  }
  useEffect(() => {
    adminChecker();
  },[])

  return (
    <div>
      <ADMIN_NAVBAR />


      <div className="container">
        
        main menu



      </div>
    </div>
  );
};

export default MainMenu;
