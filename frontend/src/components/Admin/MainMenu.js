// import { useState, useEffect } from 'react'
// import axios from "axios";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getLoginCookie } from "../utils/utils";
import { useEffect } from "react";

const MainMenu = () => {

  const navigate = useNavigate();
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
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          outline: 0;
          font-family: "Open Sans", sans-serif;
        }
        .container {
          padding: 1rem;
        }
        #produkList {
          height: 5rem;
        }
      `}</style>

      <div className="container">
        <button onClick={() => navigate('/admin/produk')} className="btn btn-primary" id="produkList">
          Produk List
        </button>
      </div>
    </div>
  );
};

export default MainMenu;
