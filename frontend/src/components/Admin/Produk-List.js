import { useState, useEffect } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import "./css/Produk-List.css";
import { getLoginCookie, logout } from "../utils/utils";
import ReactModal from "react-modal";
import Dropzone from "react-dropzone";
import gambar from "../img/home-2.png";
import ADMIN_NAVBAR from "../_public/Admin-Navbar";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const navigate = useNavigate();
  if(getLoginCookie() === undefined){
    navigate('/');
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
  const [modalKonfirmasi, setModalKonfirmasi] = useState(false);
  
  const [produkInginDihapus, setProdukInginDihapus] = useState('');

  const [id, setId] = useState(null);
  const [products, setProduct] = useState([]);

  // tambah
  const [tambah_idProduk, tambah_setIdProduk] = useState("");
  const [tambah_nama, tambah_setName] = useState("");
  const [tambah_deskripsi, tambah_setDeskripsi] = useState("");
  const [tambah_stok, tambah_setStok] = useState("");
  const [tambah_harga, tambah_setHarga] = useState("");
  const [tambah_berat, tambah_setBerat] = useState("");
  const [tambah_gambar, tambah_setGambar] = useState(null);

  // edit
  const [edit_idProduk, edit_setIdProduk] = useState("");
  const [edit_nama, edit_setName] = useState("");
  const [edit_deskripsi, edit_setDeskripsi] = useState("");
  const [edit_stok, edit_setStok] = useState("");
  const [edit_harga, edit_setHarga] = useState("");
  const [edit_berat, edit_setBerat] = useState("");
  const [edit_gambar, edit_setGambar] = useState("");

  //tambah

  const saveProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:5000/produk`, {
        idProduk: tambah_idProduk,
        nama: tambah_nama,
        deskripsi: tambah_deskripsi,
        stok: tambah_stok,
        harga: tambah_harga,
        berat: tambah_berat,
        gambar: tambah_gambar,
      });
      if (res.data.status) {
        closeModal("tambah");
        getProducts();
        tambah_setIdProduk('');
        tambah_setName('');
        tambah_setDeskripsi('');
        tambah_setStok('');
        tambah_setHarga('');
        tambah_setBerat('');
        tambah_setGambar('');
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error("Error saving product", error);
    }
  };

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
      if (modalEdit) {
        edit_setGambar(reader.result);
      } else {
        tambah_setGambar(reader.result);
      }
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  //edit
  const updateProduct = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.patch(`http://localhost:5000/produk/${id}`, {
        idProduk: edit_idProduk,
        nama: edit_nama,
        deskripsi: edit_deskripsi,
        stok: edit_stok,
        harga: edit_harga,
        berat: edit_berat,
        gambar: edit_gambar,
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

  const getProductById = async (ids) => {
    try {
      setId(ids);
      const res = await axios.get(`http://localhost:5000/produk/${ids}`);
      edit_setIdProduk(res.data.idProduk);
      edit_setName(res.data.nama);
      edit_setDeskripsi(res.data.deskripsi);
      edit_setStok(res.data.stok);
      edit_setHarga(res.data.harga);
      edit_setBerat(res.data.berat);
      edit_setGambar(res.data.gambar);
    } catch (error) {
      console.error("Error retrieving product", error);
    }
  };

  const getProducts = async () => {
    const res = await axios.get("http://localhost:5000/produk");
    setProduct(res.data);
    console.log(products);
  };


  useEffect(() => {
    getProducts();
  }, []);


  const konfirmasiDeleteProduk = async (id) => {
    setProdukInginDihapus(id);
    setModalKonfirmasi(true);
  }

  const deleteProduk = async () => {
    const res = await axios.delete(`http://localhost:5000/produk/${produkInginDihapus}`);
    if(res.data.status){
      getProducts();
    } else {
      alert(res.data.message);
    }
    setModalKonfirmasi(false);
  };

  const closeModal = (modal) => {
    if (modal === "tambah") {
      setModalTambah(false);
    } else if (modal === "edit") {
      setModalEdit(false);
    }
  };

  const setModalEditHelper = (ids) => {
    setModalEdit(true);
    getProductById(ids);
  };

  const handleCloseModal = () => {
    setModalKonfirmasi(false);
  }
  

  return (
    <div>

      <ADMIN_NAVBAR />
      <div className="container_produk_list">
      <ReactModal
      isOpen={ modalKonfirmasi }
      onRequestClose={ handleCloseModal }
      className="custom_modal_notif card card-body bg-light p-4 text-center">
      <div className="modal_close_button_wrapper d-flex justify-content-end">
        <button onClick={  handleCloseModal } className="modal_close_button"><i className="bi bi-x-lg" /></button>
      </div>
      <div className="modal_content_wrapper pe-1">
        Apakah kamu ingin menghapus produk ?
        <div className="d-flex justify-content-center mt-4">
          <button onClick={ handleCloseModal } className="btn btn-success mx-3 w-25">Tidak</button>
          <button onClick={ deleteProduk } className="btn btn-danger mx-3 w-25">Ya</button>
        </div>
      </div>
      

      </ReactModal>

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

            <div class="row">
              <div class="col">

                <div class="mb-3 row">
                  <label for="kode" class="col-sm-2 col-form-label">Kode</label>
                  <div class="col-sm-10">
                    <input className="form-control shadow-none" id="kode" type="text" value={tambah_idProduk} onChange={(e) => tambah_setIdProduk(e.target.value)} />
                  </div>
                </div>
                <div class="mb-3 row">
                  <label for="nama" class="col-sm-2 col-form-label">Nama</label>
                  <div class="col-sm-10">
                    <input className="form-control shadow-none" id="nama" type="text" value={tambah_nama} onChange={(e) => tambah_setName(e.target.value)} />
                  </div>
                </div>
                <div class="mb-3 row">
                  <label for="stok" class="col-sm-2 col-form-label">Stok</label>
                  <div class="col-sm-10">
                    <input className="form-control shadow-none" id="stok" type="number" value={tambah_deskripsi} onChange={(e) => tambah_setDeskripsi(e.target.value)} />
                  </div>
                </div>
                <div class="mb-3 row">
                  <label for="berat" class="col-sm-2 col-form-label">Berat</label>
                  <div class="col-sm-10">
                    <input className="form-control shadow-none" id="berat" type="number" value={tambah_stok} onChange={(e) => tambah_setStok(e.target.value)} />
                  </div>
                </div>
                <div class="mb-3 row">
                  <label for="harga" class="col-sm-2 col-form-label">Harga</label>
                  <div class="col-sm-10">
                    <input className="form-control shadow-none" id="harga" type="number" value={tambah_harga} onChange={(e) => tambah_setHarga(e.target.value)} />
                  </div>
                </div>
                <div class="mb-3 row">
                  <label for="deskripsi" class="col-sm-2 col-form-label">Deskripsi</label>
                  <div class="col-sm-10">
                    <input className="form-control shadow-none" id="deskripsi" type="text" value={tambah_berat} onChange={(e) => tambah_setBerat(e.target.value)} />
                  </div>
                </div>
              </div>
              <div class="col-md-4 d-flex me-3">
                <div className="dropzone_wrapper">
                  <Dropzone onDrop={handleDrop}>
                    {({ getRootProps, getInputProps }) => (
                      <div className="dropzone card card-body border border-dark p-1 text-center" {...getRootProps()}>
                        <input {...getInputProps()} />
                        {tambah_gambar ? (
                          <img className="dropzone_img" src={tambah_gambar} alt="Uploaded Image" />
                        ) : (
                          <span className="dropzone_text">
                            <i className="fas fa-upload"></i> Upload Image
                          </span>
                        )}
                      </div>
                    )}
                  </Dropzone>
                </div>
    
              </div>
            </div>
          </form>
          <button 
            onClick={ saveProduct }
            className="btn btn-success ms-3 my-1 text-left w-25 mt-4">Tambah</button>
        </div>
      </ReactModal>

      <ReactModal 
        isOpen={modalEdit} 
        onRequestClose={closeModal.bind(null, "edit")} 
        className="admin_custom_modal card card-body">
        <div className="modal_close_button_wrapper ">
          <button onClick={  closeModal.bind(null, "tambah") } className="modal_close_button float-end pt-2 pe-3"><i className="bi bi-x-lg" /></button>
        </div>
        <div className="modal_produk p-2">
          <h3 class="mb-4 ms-3">Tambah Menu</h3>
          <form className="card card-body" onSubmit={updateProduct}>

            
          <div class="row">
              <div class="col">

                <div class="mb-3 row">
                  <label for="kode" class="col-sm-2 col-form-label">Kode</label>
                  <div class="col-sm-10">
                    <input className="form-control shadow-none" type="text" placeholder="Title" value={edit_idProduk} onChange={(e) => edit_setIdProduk(e.target.value)} />
                  </div>
                </div>
                <div class="mb-3 row">
                  <label for="nama" class="col-sm-2 col-form-label">Nama</label>
                  <div class="col-sm-10">
                    <input className="form-control shadow-none" type="text" placeholder="Price" value={edit_nama} onChange={(e) => edit_setName(e.target.value)} />                  </div>
                </div>
                <div class="mb-3 row">
                  <label for="stok" class="col-sm-2 col-form-label">Berat</label>
                  <div class="col-sm-10">
                    <input className="form-control shadow-none" type="number" placeholder="berat" value={edit_berat} onChange={(e) => edit_setBerat(e.target.value)} />                  </div>
                </div>
                <div class="mb-3 row">
                  <label for="berat" class="col-sm-2 col-form-label">Stok</label>
                  <div class="col-sm-10">
                    <input className="form-control shadow-none" type="number" placeholder="stok" value={edit_stok} onChange={(e) => edit_setStok(e.target.value)} />                  </div>
                </div>
                <div class="mb-3 row">
                  <label for="harga" class="col-sm-2 col-form-label">Harga</label>
                  <div class="col-sm-10">
                    <input className="form-control shadow-none" type="number" placeholder="harga" value={edit_harga} onChange={(e) => edit_setHarga(e.target.value)} />                  </div>
                </div>
                <div class="mb-3 row">
                  <label for="deskripsi" class="col-sm-2 col-form-label">Deskripsi</label>
                  <div class="col-sm-10">
                    <input className="form-control shadow-none" type="text" placeholder="deskripsi" value={edit_deskripsi} onChange={(e) => edit_setDeskripsi(e.target.value)} />                  </div>
                </div>
              </div>
              <div class="col-md-4 d-flex me-3">
                <div className="dropzone_wrapper">
                  <Dropzone onDrop={handleDrop}>
                    {({ getRootProps, getInputProps }) => (
                      <div className="dropzone card card-body border border-dark p-1 text-center" {...getRootProps()}>
                        <input {...getInputProps()} />
                        {edit_gambar ? (
                          <img className="dropzone_img" src={edit_gambar} alt="Uploaded Image" />
                        ) : (
                          <span className="dropzone_text">
                            <i className="fas fa-upload"></i> Upload Image
                          </span>
                        )}
                      </div>
                    )}
                  </Dropzone>
                </div>
    
              </div>
            </div>
          </form>
          <button 
            onClick={ updateProduct }
            className="btn btn-success ms-3 my-1 text-left w-25 mt-4">Update</button>
        </div>
      </ReactModal>

        <div className="admin-title">
          Daftar Produk
        </div>


        <table className="table table-striped border">
          <thead>
            <tr className="">
              <th className="text-center nomor">No</th>
              <th className="text-center idproduk">idProduk</th>
              <th className="text-center">Nama</th>
              <th className="text-center">Stok</th>
              <th className="text-center">Harga</th>
              <th className="text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id}>
                <td className="text-center">{index + 1}</td>
                <td className="text-center">{product.idProduk}</td>
                <td className="text-center">{product.nama}</td>
                <td className="text-center">{product.stok}</td>
                <td className="text-center">{product.harga}</td>
                <td className="text-center">
                  <button className="btn btn-warning btn-sm" onClick={() => setModalEditHelper(product.idProduk)}>Edit</button>
                  <button className="btn btn-danger btn-sm ms-3" onClick={() => konfirmasiDeleteProduk(product.id)} >
                    Delete
                  </button>
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

export default ProductList;
