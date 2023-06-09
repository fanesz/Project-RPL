import "./css/Profile.css";
import default_img from "../../img/default_profile.webp";
import PUBLIC_NAVBAR from '../../_public/Public-Navbar';
import PUBLIC_FOOTER from '../../_public/Public-Footer';
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactModal from "react-modal";
import { setLocalStorage, getLocalStorage, getLoginCookie, isLogin, loginChecker } from "../../utils/utils";

const Alamat = () => {
  loginChecker();

  const [alamat, setAlamat] = useState({})
  const [oldAlamat, setOldAlamat] = useState({})
  const [modalKonfirmasi, setModalKonfirmasi] = useState(false);

  const [provinsi, setProvinsi] = useState([]);
  const [kota, setKota] = useState([]);
  const [kecamatan, setKecamatan] = useState([]);
  const [kelurahan, setKelurahan] = useState([]);
  
  const [displayKota, setDisplayKota] = useState(false);
  const [displayKecamatan, setDisplayKecamatan] = useState(false);
  const [displayKelurahan, setDisplayKelurahan] = useState(false);
  
  const [userProvinsi, setUserProvinsi] = useState('');
  const [userKota, setUserKota] = useState('');
  const [userKecamatan, setUserKecamatan] = useState('');
  const [userKelurahan, setUserKelurahan] = useState('');
  


  const getProfile = async() => {
    const res = await axios.get(`http://localhost:5000/detailakun/alamat/${getLoginCookie()}`)
    setAlamat(res.data[0]);
    setOldAlamat(res.data[0]);

    if(res.data[0].provinsi.length != 0){ getKota(res.data[0].provinsi.split('-')[0]) }
    if(res.data[0].kota.length != 0){ getKecamatan(res.data[0].kota.split('-')[0]) }
    if(res.data[0].kecamatan.length != 0){ getKelurahan(res.data[0].kecamatan.split('-')[0]) }

  }

  useEffect(() => {
    getProfile();
  }, []);

  const updateAlamat = async() => {
    const res = await axios.post('http://localhost:5000/detailakun/alamat/update', { datas: alamat, idAkun: getLoginCookie() })
    if(res.data.status){
      setModalKonfirmasi(true);
      setTimeout(()=> {
        setModalKonfirmasi(false);
      }, 2000)
      getProfile();
      setOldAlamat(alamat);
    } else {
      alert(res.data.message);
    }
  }



  const getProvinsi = async() => {
    const res = await axios.get('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json')
    setProvinsi((res.data).sort((a, b) => a.name.localeCompare(b.name)));
  }
  useEffect(() => {
    getProvinsi();
  }, []);

  const getKota = async(provinsiId) => {
    const res = await axios.get(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinsiId}.json`)
    setKota((res.data).sort((a, b) => a.name.localeCompare(b.name)));
    setDisplayKota(true);
  }

  const getKecamatan = async(kecamatanId) => {
    const res = await axios.get(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${kecamatanId}.json`)
    setKecamatan((res.data).sort((a, b) => a.name.localeCompare(b.name)));
    setDisplayKecamatan(true);
  }

  const getKelurahan = async(kelurahanId) => {
    const res = await axios.get(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${kelurahanId}.json`)
    setKelurahan((res.data).sort((a, b) => a.name.localeCompare(b.name)));
    setDisplayKelurahan(true);
  }

  const provinsiSelected = async(e) => {
    setAlamat({...alamat, provinsi: e.target.value+'-'+provinsi.filter(data => data.id===e.target.value)[0]?.name});
    setOldAlamat({ ...oldAlamat, provinsi:"-2" })
    setUserProvinsi(e.target.value);
    await getKota(e.target.value);
    setDisplayKota(false);
    setTimeout(() => { setDisplayKota(true) },1)
    setDisplayKecamatan(false);
    setDisplayKelurahan(false);
  }

  const kotaSelected = async(e) => {
    setAlamat({...alamat, kota: e.target.value+'-'+kota.filter(data => data.id===e.target.value)[0]?.name});
    setUserKota(e.target.value);
    await getKecamatan(e.target.value);
    setDisplayKecamatan(false);
    setTimeout(() => { setDisplayKecamatan(true) },1)
    setDisplayKelurahan(false);
  }

  const kecamatanSelected = async(e) => {
    setAlamat({...alamat, kecamatan: e.target.value+'-'+kecamatan.filter(data => data.id===e.target.value)[0]?.name});
    setUserKecamatan(e.target.value);
    await getKelurahan(e.target.value);
    setDisplayKelurahan(false);
    setTimeout(() => { setDisplayKelurahan(true) },1)
  }

  const kelurahanSelected = async(e) => {
    setAlamat({...alamat, kelurahan: e.target.value+'-'+kelurahan.filter(data => data.id===e.target.value)[0]?.name});
    setUserKelurahan(e.target.value);
  }


    return (
    <div>

      <ReactModal
      isOpen={ modalKonfirmasi }
      className="custom_modal_notif card card-body bg-light p-3 text-center">
      
      Alamat Berhasil Diupdate!

      </ReactModal>

      <div className="container-alamat">
      <PUBLIC_NAVBAR />
      <main className="container-profile d-flex justify-content-center">

        <div className="card card-body wrapper">

        <div className="card-title p-1 ms-2">
            <h3>Alamat Kamu</h3>
        </div>

        <div className="card-title">
          <form className="form-control">

            <div className="d-flex ">
              <label className="form-control mb-3 mt-2 w-25">Nama Penerima</label>
              <input 
                value={alamat.penerima} onChange={ (e)=>setAlamat({...alamat, penerima:e.target.value}) }
                type="text" className="form-control shadow-none mb-3 mt-2 me-5" />
            </div>

            <div className="d-flex ">
              <label className="form-control mb-3 mt-2 w-25">No Telp</label>
              <input 
                value={alamat.noTelp} onChange={ (e)=>setAlamat({...alamat, noTelp:e.target.value}) }
                type="text" className="form-control shadow-none mb-3 mt-2 me-5" />
            </div>

            <div className="d-flex ">
              <label className="form-control mb-3 mt-2 w-25">Jalan</label>
              <input 
                value={alamat.jalan} onChange={ (e)=>setAlamat({...alamat, jalan:e.target.value}) }
                type="text" className="form-control shadow-none mb-3 mt-2 me-5" />
            </div>

            <div className="d-flex ">
              <label className="form-control mb-3 mt-2 w-25">RT/RW</label>
              <input 
                value={alamat.rtrw} onChange={ (e)=>setAlamat({...alamat, rtrw:e.target.value}) }
                type="text" className="form-control shadow-none mb-3 mt-2 me-5" />
            </div>

            <div className="d-flex ">
              <label className="form-control mb-3 mt-2 w-25">Kode Pos</label>
              <input 
                value={alamat.kodePos} onChange={ (e)=>setAlamat({...alamat, kodePos:e.target.value}) }
                type="text" className="form-control shadow-none mb-3 mt-2 me-5" />
            </div>

            <div className="lokasi ms-2">

              <div className="provinsi mb-3">
                <label for="provinsi">Pilih Provinsi</label>
                <select className="form-control" id="provinsi" onChange={provinsiSelected}>
                  <option value="-1">{ alamat && alamat.provinsi && (alamat.provinsi).length != 0 ? alamat.provinsi.split('-')[1] : '--- Pilih ---' }</option>
                { provinsi && provinsi.map((data, index) => (
                  <option value={data.id}>{data.name}</option>
                ))}
                </select>
              </div>

              {displayKota && (<div className="kota mb-3">
                <label for="kota">Kota / Kabupaten</label>
                <select className="form-control" id="kota" onChange={kotaSelected}>
                <option value="-1">{ alamat && alamat.kota && (alamat.kota).length != 0 ? alamat.kota.split('-')[1] : '--- Pilih ---' }</option>
                { kota && kota.map((data, index) => (
                  <option value={data.id}>{data.name}</option>
                ))}
                </select>
              </div>
              )}

              {displayKecamatan && (<div className="kecamatan mb-3">
                <label for="kecamatan">Kecamatan</label>
                <select className="form-control" id="kecamatan" onChange={kecamatanSelected}>
                  <option value="-1">{ alamat && alamat.kecamatan && (alamat.kecamatan).length != 0 ? alamat.kecamatan.split('-')[1] : '--- Pilih ---' }</option>
                { kecamatan && kecamatan.map((data, index) => (
                  <option value={data.id}>{data.name}</option>
                ))}
                </select>
              </div>
              )}

              {displayKelurahan && (<div className="kelurahan mb-2">
                <label for="kelurahan">Kelurahan</label>
                <select className="form-control" id="kelurahan" onChange={kelurahanSelected}>
                  <option value="-1">{ alamat && alamat.kelurahan && (alamat.kelurahan).length != 0 ? alamat.kelurahan.split('-')[1] : '--- Pilih ---' }</option>
                { kelurahan && kelurahan.map((data, index) => (
                  <option value={data.id}>{data.name}</option>
                ))}
                </select>
              </div>
              )}

            </div>


          </form>
          
          { alamat === oldAlamat ? (
            <button className="btn btn-secondary mt-3">Simpan</button>
            ) : (
            <button onClick={updateAlamat} className="btn btn-success mt-3">Simpan</button>
              
          )}


        </div>






        </div>



      </main>
      </div>
              
      <PUBLIC_FOOTER />

    </div>
    )
}
 
export default Alamat


