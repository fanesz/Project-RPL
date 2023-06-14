// import { useState, useEffect } from 'react'
// import axios from "axios";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getLoginCookie } from "../utils/utils";
import { useEffect } from "react";
import ADMIN_NAVBAR from "../_public/Admin-Navbar";

const MainMenu = () => {
  const navigate = useNavigate();
  if (getLoginCookie() === undefined) {
    navigate("/");
  }
  const adminChecker = async () => {
    const res = await axios.get(`http://localhost:5000/akun/akses/${getLoginCookie()}`);
    if (res.data.akses !== "admin") {
      navigate("/");
    }
  };
  useEffect(() => {
    adminChecker();
  }, []);

  return (
    <div>
      <ADMIN_NAVBAR />
      <div className="container text-center mt-5">
        <h1 className="display-4">Selamat Datang, Admin!</h1>
        <p className="lead">Anda memiliki akses penuh ke menu admin</p>
        <div className="row justify-content-center">
          <div className="col-md-3">
            <div className="card mt-5">
              <div className="card-body">
                <h5 className="card-title pb-4">Kelola Produk</h5>

                <a href="admin/produk" className="btn btn-success">
                  Daftar Produk
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card mt-5">
              <div className="card-body">
                <h5 className="card-title pb-4">Kelola Akun</h5>
                <a href="admin/akun" className="btn btn-success">
                  Lihat Pengguna
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="row justify-content-around ">
          <div className="col-md-3">
            <div className="card mt-5">
              <div className="card-body">
                <h5 className="card-title pb-4">Menuju Landing Page</h5>
                <a href="/" className="btn btn-primary">
                  Daftar Produk
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card mt-5">
              <div className="card-body">
                <h5 className="card-title pb-4">Menuju Halaman Seller</h5>

                <a href="seller" className="btn btn-primary">
                  Daftar Produk
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
