import { useState, useEffect } from 'react'
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { loginChecker, logout } from "../utils/utils"
import ReactModal from 'react-modal';

// ReactModal.setAppElement('#root');

const ProductList = () => {
    loginChecker();

    const [modalTambah, setModalTambah] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    
    const [products, setProduct] = useState([]);

    const [title, setTitle] = useState(''); const [title2, setTitle2] = useState('');
    const [price, setPrice] = useState(''); const [price2, setPrice2] = useState('');
    const [stock, setStock] = useState(''); const [stock2, setStock2] = useState('');
    const [id, setId] = useState(null);

    //tambah 
    const saveProduct = async (e) => {
        e.preventDefault();
        let res = await axios.post('http://localhost:5000/products',{
            title: title,
            price: price,
            stock: stock
        });
        if(res.status === 200){
            refreshPage();
        } else {
            alert(res.message);
        }
    }


    const updateProduct = async (e) => {
        e.preventDefault();
        let res = await axios.patch(`http://localhost:5000/products/${id}`, {
            title: title2,
            price: price2,
            stock: stock2
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
        setTitle2(response.data.title);
        setPrice2(response.data.price);
        setStock2(response.data.stock);
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
        await axios.delete(`http://localhost:5000/produk/${id}`);
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
                    <label className="label">Title</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Title"
                        value={ title }
                        onChange={ (e) => setTitle(e.target.value) }
                        />
                </div>

                <div className="field">
                    <label className="label">Price</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Price"
                        value={ price }
                        onChange={ (e) => setPrice(e.target.value) }
                    />
                </div>

                <div className="field">
                    <label className="label">Stock</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Stock"
                        value={ stock }
                        onChange={ (e) => setStock(e.target.value) }
                    />
                </div>

                <div className="field">
                    <button className="button is-primary">Save</button>
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
                    <label className="label">Title</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Title"
                        value={ title2 }
                        onChange={ (e) => setTitle2(e.target.value) }
                    />
                </div>
 
                <div className="field">
                    <label className="label">Price</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Price"
                        value={ price2 }
                        onChange={ (e) => setPrice2(e.target.value) }
                    />
                </div>

                <div className="field">
                    <label className="label">Stock</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Stock"
                        value={ stock2 }
                        onChange={ (e) => setStock2(e.target.value) }
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
                <th>Title</th>
                <th>Price</th>
                <th>stok</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            { products.map((product, index) => (
                <tr key={ product.id }>
                    <td>{ index + 1 }</td>
                    <td>{ product.kode }</td>
                    <td>{ product.nama }</td>
                    <td>{ product.stok }</td>
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