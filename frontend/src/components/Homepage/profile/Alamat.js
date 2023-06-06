import "./css/Profile.css";
import default_img from "../../img/default_profile.webp";
import PUBLIC_NAVBAR from '../../_public/Public-Navbar';
import PUBLIC_FOOTER from '../../_public/Public-Footer';
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setLocalStorage, getLocalStorage, getLoginCookie } from "../../utils/utils";

const Alamat = () => {

  const [alamat, setAlamat] = useState({})

  const getProfile = async() => {
    const res = await axios.get(`http://localhost:5000/detailakun/alamat/${getLoginCookie()}`)
    console.log(res.data[0]);
    console.log(res.data[0]);
    setAlamat(res.data[0]);
  }

  useEffect(() => {
    getProfile();
  }, []);

  const updateAlamat = async() => {
    const res = await axios.post('http://localhost:5000/detailakun/alamat/update', { datas: alamat, idAkun: getLoginCookie() })
    if(res.data.status){

    } else {
      alert(res.data.message);
    }
  }




    return (
    <div>

        <div className="container">
        <PUBLIC_NAVBAR />
        <main className="container-profile d-flex justify-content-center">

            <div className="card card-body wrapper">

            <div className="card-title p-1 ms-2">
                <h3>Alamat Kamu</h3>
            </div>

            <div className="card-title">
                <form className="form-control">
                    <div className="row p-2">
                        <div className="col-md-3">
                            <label className="form-control mb-3 mt-2">Nama Penerima</label>
                            <label className="form-control mb-3">Jalan</label>
                            <label className="form-control mb-3">No Telp</label>


                        </div>

                        <div className="col me-3">
                            <input type="text" className="form-control shadow-none mb-3 mt-2" />
                            <input type="text" className="form-control shadow-none mb-3" />
                            <input type="text" className="form-control shadow-none mb-3" />
                        </div>
                    </div>
                    <div className="row">
                      <div className="col d-flex">
                        <label className="form-control mb-3">RT/RW</label>
                        <input type="text" className="form-control shadow-none w-50" />
                      </div>
                      <div className="col d-flex">
                        <label className="form-control mb-3">Kode Pos</label>
                        <input type="text" className="form-control shadow-none w-50" />
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
 
export default Alamat

