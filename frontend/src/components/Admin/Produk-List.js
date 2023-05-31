import { useState, useEffect } from 'react'
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { logout } from "../utils/utils"
import ReactModal from 'react-modal';

// ReactModal.setAppElement('#root');

const ProductList = () => {
    // loginChecker();

    const [modalTambah, setModalTambah] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    
    const [id, setId] = useState(null);
    const [products, setProduct] = useState([]);

    // tambah
    const [tambah_idProduk, tambah_setIdProduk] = useState(''); 
    const [tambah_nama, tambah_setName] = useState(''); 
    const [tambah_deskripsi, tambah_setDeskripsi] = useState(''); 
    const [tambah_stok, tambah_setStok] = useState(''); 
    const [tambah_harga, tambah_setHarga] = useState(''); 
    const [tambah_berat, tambah_setBerat] = useState('');

    // edit
    const [edit_idProduk, edit_setIdProduk] = useState(''); 
    const [edit_nama, edit_setName] = useState(''); 
    const [edit_deskripsi, edit_setDeskripsi] = useState(''); 
    const [edit_stok, edit_setStok] = useState(''); 
    const [edit_harga, edit_setHarga] = useState(''); 
    const [edit_berat, edit_setBerat] = useState('');



    //tambah 
    const saveProduct = async (e) => {
        e.preventDefault();
        let res = await axios.post('http://localhost:5000/produk',{
            idProduk: tambah_idProduk,
            nama: tambah_nama,
            deskripsi: tambah_deskripsi,
            stok: tambah_stok,
            harga: tambah_harga,
            berat: tambah_berat
        });
        alert(res.data.message);
        if(res.data.status){
            refreshPage();
        }
    }

    //edit
    const updateProduct = async (e) => {
        e.preventDefault();
        let res = await axios.patch(`http://localhost:5000/produk/${id}`, {
            idProduk: edit_idProduk,
            nama: edit_nama,
            deskripsi: edit_deskripsi,
            stok: edit_stok,
            harga: edit_harga,
            berat: edit_berat
        });
        if(res.status === 200){
            refreshPage();
        } else {
            alert(res.message);
        }
    };


    const getProductById = (async (ids) => {
        setId(ids);
        const response = await axios.get(`http://localhost:5000/produk/${ids}`);
        edit_setIdProduk(response.data.idProduk);
        edit_setName(response.data.nama);
        edit_setDeskripsi(response.data.deskripsi);
        edit_setStok(response.data.stok);
        edit_setHarga(response.data.harga);
        edit_setBerat(response.data.berat);
    });

    useEffect(() => {
        getProductById();
    }, []);
 
    const getProducts = async () => {
        const response = await axios.get('http://localhost:5000/produk');
        setProduct(response.data);
    }
    
    useEffect(() => {
        getProducts();
    }, []);
 
    const deleteProduct = async (id) => {
        const res = await axios.delete(`http://localhost:5000/produk/${id}`);
        console.log(res.data.message);
        getProducts();
    }

    function refreshPage() {
        window.location.reload(false);
    }

    const closeModal = (modal) => {
        if(modal === "tambah"){
            setModalTambah(false);
        } else if(modal === "edit"){
            setModalEdit(false);
        }
    };

    const setModalEditHelper = (ids) => {
        setModalEdit(true);
        getProductById(ids);
    }


 
    return (
        <div>

    <style jsx global>{`
    body {
        padding: 3vw;
    }

    .custom-modal {
        background-color:grey;
        width: 60%;
        height: 80vh;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    
    #modal-produk{
        padding: 3rem;

    }

    #modal-produk-closebutton{
        background-color: red;
        width: 3rem;
    }
      
      

      
    `}</style>

    <ReactModal 
        isOpen={modalTambah}
        onRequestClose={closeModal.bind(null, "tambah")}
        className="custom-modal">
        <button class="float-end" id="modal-produk-closebutton" onClick={() => closeModal("tambah")}>X</button>
        <div class="container" id="modal-produk">
            <h2>Tambah Menu</h2>
            <form onSubmit={ saveProduct }>
            <div className="field">
                    <label className="label">Kode</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Title"
                        value={ tambah_idProduk }
                        onChange={ (e) => tambah_setIdProduk(e.target.value) }
                    />
                </div>
                <div className="field">
                    <label className="label">Nama</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Price"
                        value={ tambah_nama }
                        onChange={ (e) => tambah_setName(e.target.value) }
                    />
                </div>
                <div className="field">
                    <label className="label">deskripsi</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Stock"
                        value={ tambah_deskripsi }
                        onChange={ (e) => tambah_setDeskripsi(e.target.value) }
                    />
                </div>
                <div className="field">
                    <label className="label">Stok</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Stock"
                        value={ tambah_stok }
                        onChange={ (e) => tambah_setStok(e.target.value) }
                    />
                </div>
                <div className="field">
                    <label className="label">Harga</label>
                    <input 
                        className="input"
                        type="number"
                        placeholder="Stock"
                        value={ tambah_harga }
                        onChange={ (e) => tambah_setHarga(e.target.value) }
                    />
                </div>
                <div className="field">
                    <label className="label">Berat</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Stock"
                        value={ tambah_berat }
                        onChange={ (e) => tambah_setBerat(e.target.value) }
                    />
                </div>
                <div className="field">
                    <button>Tambah</button>
                </div>
            </form>
        </div>
    </ReactModal>

    <ReactModal 
        isOpen={modalEdit}
        onRequestClose={closeModal.bind(null, "edit")}
        className="custom-modal">
        <button class="float-end" id="modal-produk-closebutton" onClick={() => closeModal("edit")}>X</button>
        <div>
            <form onSubmit={ updateProduct }>
                <div className="field">
                    <label className="label">Kode</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Title"
                        value={ edit_idProduk }
                        onChange={ (e) => edit_setIdProduk(e.target.value) }
                    />
                </div>
 
                <div className="field">
                    <label className="label">Nama</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Price"
                        value={ edit_nama }
                        onChange={ (e) => edit_setName(e.target.value) }
                    />
                </div>

                <div className="field">
                    <label className="label">deskripsi</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Stock"
                        value={ edit_deskripsi }
                        onChange={ (e) => edit_setDeskripsi(e.target.value) }
                    />
                </div>

                <div className="field">
                    <label className="label">Stok</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Stock"
                        value={ edit_stok }
                        onChange={ (e) => edit_setStok(e.target.value) }
                    />
                </div>

                <div className="field">
                    <label className="label">Harga</label>
                    <input 
                        className="input"
                        type="number"
                        placeholder="Stock"
                        value={ edit_harga }
                        onChange={ (e) => edit_setHarga(e.target.value) }
                    />
                </div>

                <div className="field">
                    <label className="label">Berat</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Stock"
                        value={ edit_berat }
                        onChange={ (e) => edit_setBerat(e.target.value) }
                    />
                </div>
 
                <div className="field">
                    <button>Update</button>
                </div>
            </form>
        </div>
    </ReactModal>

    <br />

    <button onClick={refreshPage}>Click to reload!</button>
    <table className="table is-striped is-fullwidth" border="1px" cellspacing="0" cellpadding="10px">
        <thead>
            <tr>
                <th>No</th>
                <th>idProduk</th>
                <th>Nama</th>
                <th>Stok</th>
                <th>Harga</th>
            </tr>
        </thead>
        <tbody>
            { products.map((product, index) => (
                <tr key={ product.id }>
                    <td>{ index + 1 }</td>
                    <td>{ product.idProduk }</td>
                    <td>{ product.nama }</td>
                    <td>{ product.stok }</td>
                    <td>{ product.harga }</td>
                    <td>
                        <button onClick={ () => setModalEditHelper(product.id) }>Edit</button>
                        <button onClick={ () => deleteProduct(product.id) } className="button is-small is-danger">Delete</button>
                    </td>
                </tr>
            )) }
                    
            </tbody>
        </table>
        {/* current price : {products[products.length-1].price == undefined ? products.price : products[products.length-1].price} */}
        <br />
        {/* <button onClick={() => navigate('/add')}>ADD</button> */}
        <button onClick={() => setModalTambah(true)}>Tambah</button>

        {/* <button onClick={() => navigate('/catalog')}>catalog</button> */}
        <br />
        <br />
        <button onClick={() => logout()}>Logout</button>
    </div>
    
    )

    
}
 
export default ProductList