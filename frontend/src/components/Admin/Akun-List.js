import { useState, useEffect } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import "./css/Produk-List.css";
import { getLoginCookie } from "../utils/utils";
import ReactModal from "react-modal";
import Dropzone from "react-dropzone";
import gambar from "../img/home-2.png";
import ADMIN_NAVBAR from "../_public/Admin-Navbar";
import { useNavigate } from "react-router-dom";

const AkunList = () => {
  const navigate = useNavigate();
  if(getLoginCookie() === undefined){
    window.location.href = '/';
  }
  const adminChecker = async() => {
    const res = await axios.get(`http://localhost:5000/akun/akses/${getLoginCookie()}`)
    if(res.data.akses !== 'admin'){
      navigate('/');
    }
  }
  useEffect(() => {
    adminChecker();
  },[])

  const [modalTambah, setModalTambah] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [hiddenText, setHiddenText] = useState('');


  const [id, setId] = useState(null);
  const [account, setAccount] = useState([]);

  // tambah
  const [tambah_email, tambah_setEmail] = useState("");
  const [tambah_password, tambah_setPassword] = useState("");
  const [tambah_akses, tambah_setAkses] = useState("user");
  const [tambah_changepwCode, tambah_setChangepwCode] = useState("");

  // edit
  const [edit_email, edit_setEmail] = useState("");
  const [edit_password, edit_setPassword] = useState("");
  const [edit_akses, edit_setAkses] = useState("");
  const [edit_changepwCode, edit_setChangepwCode] = useState("");

  //tambah

  const saveAccount = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:5000/detailakun/create`, {
        email: tambah_email,
        password: tambah_password,
        akses: tambah_akses,
        changepwCode: tambah_changepwCode,
      });
      if (res.data.status) {
        closeModal("tambah");
        getProducts();
        tambah_setEmail('');
        tambah_setPassword('');
        tambah_setAkses('user');
        tambah_setChangepwCode('');
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error("Error saving product", error);
    }
  };

  //edit
  const updateAkun = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.patch(`http://localhost:5000/akun/${id}`, {
        email: edit_email,
        password: edit_password,
        akses: edit_akses,
        changepwCode: edit_changepwCode,
      });

      if (res.data.status) {
        closeModal("edit");
        getProducts();
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error("Error updating product", error);
    }
  };

  const getAccountById = async (ids) => {
    try {
      setId(ids);
      const res = await axios.get(`http://localhost:5000/akun/${ids}`);
      edit_setEmail(res.data[0].email);
      edit_setPassword(res.data[0].password);
      edit_setAkses(res.data[0].akses);
      edit_setChangepwCode(res.data[0].changepwCode);
    } catch (error) {
      console.error("Error retrieving product", error);
    }
  };

  const getProducts = async () => {
    const res = await axios.get("http://localhost:5000/akun");
    setAccount(res.data);
  };


  useEffect(() => {
    getProducts();
  }, []);


  const closeModal = (modal) => {
    if (modal === "tambah") {
      setModalTambah(false);
    } else if (modal === "edit") {
      setModalEdit(false);
    }
  };

  const setModalEditHelper = (ids) => {
    console.log(ids);
    getAccountById(ids);
    setModalEdit(true);
  };

  
  const handleClick = (text) => {
    setHiddenText(text);
    setTimeout(() => {
      setHiddenText('');
    }, 4000);
  };

  return (
    <div>

      <ADMIN_NAVBAR />
      <div className="container_produk_list">

      <ReactModal 
        isOpen={modalTambah} 
        onRequestClose={closeModal.bind(null, "tambah")} 
        className="admin_custom_modal card card-body">
        <div className="modal_close_button_wrapper ">
          <button onClick={  closeModal.bind(null, "tambah") } className="modal_close_button float-end pt-2 pe-3"><i className="bi bi-x-lg" /></button>
        </div>
        <div className="modal_produk p-2">
          <h3 class="mb-4 ms-3">Tambah Menu</h3>
          <form className="card card-body">

            <div class="mb-3 row">
              <label for="email" class="col-sm-2 col-form-label">Email</label>
              <div class="col-sm-10">
                <input className="form-control shadow-none" id="email" type="text" value={tambah_email} onChange={(e) => tambah_setEmail(e.target.value)} />
              </div>
            </div>
            <div class="mb-3 row">
              <label for="password" class="col-sm-2 col-form-label">Password</label>
              <div class="col-sm-10">
                <input className="form-control shadow-none" id="password" type="text" value={tambah_password} onChange={(e) => tambah_setPassword(e.target.value)} />
              </div>
            </div>
            <div class="mb-3 row">
              <label for="akses" class="col-sm-2 col-form-label">Akses</label>
              <div class="col-sm-10">
                <a className={tambah_akses==='user'?'btn btn-light border me-2 border-dark':'btn btn-light border me-2 '}
                  onClick={ () => tambah_setAkses('user') }>User</a>
                <a className={tambah_akses==='seller'?'btn btn-light border me-2 border-dark':'btn btn-light border me-2 '}
                  onClick={ () => tambah_setAkses('seller') }>Seller</a>
                <a className={tambah_akses==='admin'?'btn btn-light border me-2 border-dark':'btn btn-light border me-2 '}
                  onClick={ () => tambah_setAkses('admin') }>Admin</a>
              </div>
            </div>
            <div class="mb-3 row">
              <label for="changepw" class="col-sm-2 col-form-label">Change PW Code</label>
              <div class="col-sm-10">
                <input className="form-control shadow-none" id="changepw" type="text" value={tambah_changepwCode} onChange={(e) => tambah_setChangepwCode(e.target.value)} />
              </div>
            </div>

          </form>
          <button 
            onClick={ saveAccount }
            className="btn btn-success ms-3 my-1 text-left w-25">Tambah</button>
        </div>
      </ReactModal>

      <ReactModal 
        isOpen={modalEdit} 
        onRequestClose={closeModal.bind(null, "edit")} 
        className="custom_modal card card-body">
        <div className="modal_close_button_wrapper ">
          <button onClick={  closeModal.bind(null, "tambah") } className="modal_close_button float-end pt-2 pe-3"><i className="bi bi-x-lg" /></button>
        </div>
        <div className="modal_produk p-2">
          <h3 class="mb-4 ms-3">Tambah Menu</h3>
          <form className="card card-body">

            <div class="mb-3 row">
              <label for="stok" class="col-sm-2 col-form-label">Email</label>
              <div class="col-sm-10">
                <input className="form-control shadow-none" id="stok" type="text" value={edit_email} onChange={(e) => edit_setEmail(e.target.value)} />
              </div>
            </div>
            <div class="mb-3 row">
              <label for="berat" class="col-sm-2 col-form-label">Password</label>
              <div class="col-sm-10">
                <input className="form-control shadow-none" id="berat" type="text" value={edit_password} onChange={(e) => edit_setPassword(e.target.value)} />
              </div>
            </div>
            <div class="mb-3 row">
              <label for="akses" class="col-sm-2 col-form-label">Akses</label>
              <div class="col-sm-10">
                <a className={edit_akses==='user'?'btn btn-light border me-2 border-dark':'btn btn-light border me-2 '}
                  onClick={ () => edit_setAkses('user') }>User</a>
                <a className={edit_akses==='seller'?'btn btn-light border me-2 border-dark':'btn btn-light border me-2 '}
                  onClick={ () => edit_setAkses('seller') }>Seller</a>
                <a className={edit_akses==='admin'?'btn btn-light border me-2 border-dark':'btn btn-light border me-2 '}
                  onClick={ () => edit_setAkses('admin') }>Admin</a>
              </div>
            </div>
            <div class="mb-3 row">
              <label for="deskripsi" class="col-sm-2 col-form-label">Change PW Code</label>
              <div class="col-sm-10">
                <input className="form-control shadow-none" id="deskripsi" type="text" value={edit_changepwCode} onChange={(e) => edit_setChangepwCode(e.target.value)} />
              </div>
            </div>

          </form>
          <button 
            onClick={ updateAkun }
            className="btn btn-success ms-3 my-1 text-left w-25">Update</button>
        </div>
      </ReactModal>

        <div className="admin-title">
          Daftar Akun
        </div>


        <table className="table table-striped border">
          <thead>
            <tr className="">
              <th className="text-center nomor">No</th>
              <th className="text-center idAkun">idAkun</th>
              <th className="text-center email">Email</th>
              <th className="text-center">Akses</th>
              <th className="text-center">Password</th>
              <th className="text-center">Change Pw Code</th>
              <th className="text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {account.map((akun, index) => (
              <tr key={akun.id}>
                <td className="text-center">{index + 1}</td>
                <td className="text-center">{akun.idAkun}</td>
                <td className="text-center">{akun.email}</td>
                <td className="text-center">{akun.akses}</td>
                <td className="text-center">{akun.password}</td>
                <td className="text-center">{akun.changepwCode === null || akun.changepwCode === '' ? '-' : akun.changepwCode}</td>
                <td className="text-center">
                  <button className="btn btn-warning btn-sm" onClick={() => setModalEditHelper(akun.idAkun)}>Edit</button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button class="mb-3 btn btn-success" onClick={() => setModalTambah(true)}>
          Tambah
        </button>


      </div>
    </div>
  );
};

export default AkunList;
