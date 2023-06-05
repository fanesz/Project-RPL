import "./css/Profile.css";
import default_img from "../../img/default_profile.webp";
import PUBLIC_NAVBAR from '../../_public/Public-Navbar';
import PUBLIC_FOOTER from '../../_public/Public-Footer';
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setLocalStorage, getLocalStorage } from "../../utils/utils";

const Profile = () => {

    const getProfile = async() => {

    }




    return (
    <div>


        <div className="container">
        <PUBLIC_NAVBAR />
        <main className="container-profile d-flex justify-content-center">

            <div className="card card-body wrapper">

            <div className="profile">
                <img className="rounded-circle" src={default_img} />
            </div>

            <div className="card-title mt-5">
                <form className="form-control">
                    <div className="row p-2">
                        <div className="col-md-3">
                            <label className="form-control mb-3 mt-2">Nama</label>
                            <label className="form-control mb-3">E-mail</label>
                            <label className="form-control mb-3">No Telp</label>
                        </div>

                        <div className="col me-3">
                            <input type="text" className="form-control shadow-none mb-3 mt-2"></input>
                            <input type="text" className="form-control shadow-none mb-3"></input>
                            <input type="text" className="form-control shadow-none mb-3"></input>
                        </div>
                    </div>
                </form>
            </div>






            </div>



        </main>
        </div>
                
        <PUBLIC_FOOTER />

    </div>
    )
}
 
export default Profile


