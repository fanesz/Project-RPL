import "./css/Profile.css";
import default_img from "../../img/default_profile.webp";
import PUBLIC_NAVBAR from '../../_public/Public-Navbar';
import PUBLIC_FOOTER from '../../_public/Public-Footer';
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ReactModal from "react-modal";
import { setLocalStorage, getLocalStorage, getLoginCookie, isLogin, loginChecker } from "../../utils/utils";

const Profile = () => {
  loginChecker();

  const [profile, setProfile] = useState({});
  const [email, setEmail] = useState("");
  const [nama, setNama] = useState("");
  const [notelp, setNotelp] = useState("");
  const [modalKonfirmasi, setModalKonfirmasi] = useState(false);


  const getProfile = async() => {
    const res = await axios.get(`http://localhost:5000/detailakun/${getLoginCookie()}`)
    setEmail(res.data[0].email);
    setNama(res.data[0].nama);
    setNotelp(res.data[0].noTelp);
    setProfile(res.data[0]);
  }

  useEffect(() => {
    getProfile();
  }, []);

  const updateProfile = async() => {
    const res = await axios.post(`http://localhost:5000/detailakun/update`,{
      idAkun: getLoginCookie(),
      nama: nama,
      noTelp: notelp
    })
    if(res.data.status){
      setModalKonfirmasi(true);
      setTimeout(()=> {
        setModalKonfirmasi(false);
      }, 2000)
      getProfile();
    } else {
      alert(res.data.message);
    }
  }

  const handleCloseModal = () => {
    setModalKonfirmasi(false);
  }




    return (
    <div>
      <ReactModal
      isOpen={ modalKonfirmasi }
      className="custom_modal_notif card card-body bg-light p-3 text-center">
      
      Profil Berhasil Diupdate!


      </ReactModal>


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
                            <label className="form-control mb-3 mt-2">E-mail</label>
                            <label className="form-control mb-3">Nama</label>
                            <label className="form-control mb-3">No Telp</label>
                        </div>

                        <div className="col me-3">
                            <input type="text" className="form-control shadow-none mb-3 opacity-50"
                              value={email} disabled>

                            </input>
                            <input type="text" className="form-control shadow-none mb-3 mt-2"
                              value={nama} onChange={(e)=>{setNama(e.target.value)}}>

                            </input>
                            <input type="text" className="form-control shadow-none mb-3"
                              value={notelp} onChange={(e)=>{setNotelp(e.target.value)}}>

                            </input>


                      </div>
                    </div>
                </form>
                { profile && (nama===profile.nama && notelp===profile.noTelp) ? (
                          <button onClick={ (e) => e.preventDefault() } className="btn btn-secondary mt-3">Save</button>
                          ) : (
                            <button onClick={ updateProfile } className="btn btn-primary mt-3">Save</button>
                        ) }
            </div>
            






            </div>



        </main>
        </div>
                
        <PUBLIC_FOOTER />

    </div>
    )
}
 
export default Profile


