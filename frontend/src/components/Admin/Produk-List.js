import { useState, useEffect } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import s from "./css/Produk-List.module.css";
import { logout } from "../utils/utils";
import ReactModal from "react-modal";
import Dropzone from "react-dropzone";
import gambar from "../img/home-2.png";
import "./css/Produk-List.module.css";

const ProductList = () => {
  // loginChecker();

  const [modalTambah, setModalTambah] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);

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

  useEffect(() => {
    getProductById();
  }, []);

  const getProducts = async () => {
    const res = await axios.get("http://localhost:5000/produk");
    setProduct(res.data);
    console.log(products);
  };


  

  useEffect(() => {
    getProducts();
  }, []);

  const deleteProduct = async (id) => {
    const res = await axios.delete(`http://localhost:5000/produk/${id}`);
    console.log(res.data.message);
    getProducts();
  };

  function refreshPage() {
    window.location.reload(false);
  }

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

  return (
    <div>
      <style jsx global>
        {`
          body {
            background-image: url(${gambar});
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            overflow-x: hidden;
            // padding-top: 15vh;
          }
        `}
      </style>
      <div className={s.container_produk_list}>
        <ReactModal isOpen={modalTambah} onRequestClose={closeModal.bind(null, "tambah")} className="custom_modal">
          <button className={s.modal_closebutton} onClick={() => closeModal("tambah")}>
            X
          </button>
          <div className={s.modal_produk}>
            <h2 class="text-center mb-5">Tambah Menu</h2>
            <form onSubmit={saveProduct} class="justify-content-center">
              <div class="row ">
                <div class="col-md-6">
                  <div className="field">
                    <label className="label" class="p-2">
                      Kode
                    </label>

                    <div class="col-md-3">
                      <input className="input" type="text" placeholder="Title" value={tambah_idProduk} onChange={(e) => tambah_setIdProduk(e.target.value)} />
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div className="field">
                    <label className="label" class="p-2">
                      Nama
                    </label>
                    <div class="col-md-3">
                      <input className="input" type="text" placeholder="Price" value={tambah_nama} onChange={(e) => tambah_setName(e.target.value)} />
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div className="field">
                    <label className="label" class="p-2">
                      Deskripsi
                    </label>

                    <div class="col-md-3">
                      <input className="input" type="text" placeholder="Stock" value={tambah_deskripsi} onChange={(e) => tambah_setDeskripsi(e.target.value)} />
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div className="field">
                    <label className="label" class="p-2">
                      Stok
                    </label>
                    <div class="col-md-3">
                      <input className="input" type="text" placeholder="Stock" value={tambah_stok} onChange={(e) => tambah_setStok(e.target.value)} />
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div className="field">
                    <label className="label" class="p-2">
                      Harga
                    </label>
                    <div class="col-md-3">
                      <input className="input" type="number" placeholder="Stock" value={tambah_harga} onChange={(e) => tambah_setHarga(e.target.value)} />
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div className="field">
                    <label className="label" class="p-2">
                      Berat
                    </label>
                    <div class="col-md-3">
                      <input className="input" type="text" placeholder="Stock" value={tambah_berat} onChange={(e) => tambah_setBerat(e.target.value)} />
                    </div>
                  </div>
                </div>
                <div className={s.dropzone_wrapper}>
                  <Dropzone onDrop={handleDrop}>
                    {({ getRootProps, getInputProps }) => (
                      <div className={`${s.dropzone} ${s.dropzone_custom}`} {...getRootProps()} class="p-2">
                        <input {...getInputProps()} />
                        {tambah_gambar ? (
                          <img className={s.dropzone_img} src={tambah_gambar} alt="Uploaded Image" />
                        ) : (
                          <span className={`${s.dropzone_text} ${s.upload_text}`}>
                            <i className="fas fa-upload"></i> Upload Image
                          </span>
                        )}
                      </div>
                    )}
                  </Dropzone>
                </div>
              </div>

              <button class="btn btn-success mx-3 my-1 text-left">Upload</button>

              <div className="field">
                <button class="btn btn-success mx-3 my-3 text-left">Tambah</button>
              </div>
            </form>
          </div>
        </ReactModal>

        <ReactModal isOpen={modalEdit} onRequestClose={closeModal.bind(null, "edit")} className="custom_modal card card-body p-4  ">
          <div>
            <form onSubmit={updateProduct}>
              <div className="field">
                <label className="label">Kode</label>
                <input className="input" type="text" placeholder="Title" value={edit_idProduk} onChange={(e) => edit_setIdProduk(e.target.value)} />
              </div>
              <div className="field">
                <label className="label">Nama</label>
                <input className="input" type="text" placeholder="Price" value={edit_nama} onChange={(e) => edit_setName(e.target.value)} />
              </div>
              <div className="field">
                <label className="label">deskripsi</label>
                <input className="input" type="text" placeholder="Stock" value={edit_deskripsi} onChange={(e) => edit_setDeskripsi(e.target.value)} />
              </div>
              <div className="field">
                <label className="label">Stok</label>
                <input className="input" type="text" placeholder="Stock" value={edit_stok} onChange={(e) => edit_setStok(e.target.value)} />
              </div>

              <div className="field">
                <label className="label">Harga</label>
                <input className="input" type="number" placeholder="Stock" value={edit_harga} onChange={(e) => edit_setHarga(e.target.value)} />
              </div>
              <div className="field">
                <label className="label">Berat</label>
                <input className="input" type="text" placeholder="Stock" value={edit_berat} onChange={(e) => edit_setBerat(e.target.value)} />
              </div>
              <div className={s.dropzone_wrapper}>
                <Dropzone onDrop={handleDrop}>
                  {({ getRootProps, getInputProps }) => (
                    <div className={s.dropzone} {...getRootProps()}>
                      <input {...getInputProps()} />
                      {edit_gambar ? <img className={s.dropzone_img} src={edit_gambar}></img> : <span className={s.dropzone_text}>Upload Image</span>}
                    </div>
                  )}
                </Dropzone>
              </div>
              <button>Upload</button>
              <div className="field">
                <button>Update</button>
              </div>
            </form>
          </div>
        </ReactModal>

        <br />

        <button class="btn btn-success mb-3" onClick={refreshPage}>
          Click to reload!
        </button>
        <table className="table is-striped is-fullwidth" border="1px" cellspacing="0" cellpadding="10px">
          <thead>
            <tr class="text-center">
              <th>No</th>
              <th>idProduk</th>
              <th>Nama</th>
              <th>Stok</th>
              <th>Harga</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.idProduk}</td>
                <td>{product.nama}</td>
                <td>{product.stok}</td>
                <td>{product.harga}</td>
                <td>
                  <button onClick={() => setModalEditHelper(product.id)}>Edit</button>
                  <button onClick={() => deleteProduct(product.id)} className="button is-small is-danger">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* current price : {products[products.length-1].price == undefined ? products.price : products[products.length-1].price} */}
        <br />
        {/* <button onClick={() => navigate('/add')}>ADD</button> */}
        <button class="mb-3 btn btn-success" onClick={() => setModalTambah(true)}>
          Tambah
        </button>

        {/* <button onClick={() => navigate('/catalog')}>catalog</button> */}
        <br />
        <br />
        <button class="mb-3 btn btn-success" onClick={() => logout()}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProductList;
