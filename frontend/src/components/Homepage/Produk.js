import s from "./css/Produk.module.css";
import anakAyam from "../img/anakayam.jpg";
import anakAyam2 from "../img/anakayam2.jpg";
import PUBLIC_NAVBAR from '../_public/Public-Navbar';
import PUBLIC_FOOTER from '../_public/Public-Footer';
import background from "../img/green-farm-blur.jpg";
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { setLocalStorage, getLocalStorage } from "../utils/utils";

const Produk = () => {
    const [products, setProduct] = useState([]);

    const [idProduk, setIdProduk] = useState(''); 
    const [nama, setName] = useState(''); 
    const [deskripsi, setDeskripsi] = useState(''); 
    const [stok, setStok] = useState(''); 
    const [harga, setHarga] = useState(''); 
    const [berat, setBerat] = useState('');

    const [jumlah, setJumlah] = useState(1);
    
    const navigate = useNavigate();

    const { id } = useParams();

    const getProductById = (async () => {
        const response = await axios.get(`http://localhost:5000/produk/${id}`);
        setIdProduk(response.data.idProduk);
        setName(response.data.nama);
        setDeskripsi(response.data.deskripsi);
        setStok(response.data.stok);
        setHarga(response.data.harga);
        setBerat(response.data.berat);
        console.log(response);
    });

    useEffect(() => {
        getProductById();
    }, []);
    
    
    const addCart = (id, jumlah) => {
        let cart = getLocalStorage("cart") || {}; 
        cart[id] = jumlah;
        setLocalStorage("cart", cart);
    
        if (cart[id]) {
            const button = document.getElementById(`cart-button-${id}`);
            button.innerHTML = "Go to Cart";
            button.addEventListener("click", navigate("/produk/id")); 
        }
    }



    return (
    <div>


    <div className={s.container_produk} style={{ backgroundImage: `url(${background})`}}>

    <PUBLIC_NAVBAR />

    <main className={s.main}>
        <div className="container d-flex flex-wrap justify-content-center">

            <div class="feuture-box" className={s.feuture_box}>
                <div class="transaction-card d-flex" className={s.transaction_card1}>
                    <img src={anakAyam2} style={{width:"20rem"}} alt="ayam lucuk" />
                </div>
            </div>

            <div className="feuture-box ">
                <div className="container d-flex flex-wrap justify-content-center">
                    <div className={s.transaction_card2}>
                        <div className={s.product_info}>
                            <div className={s.product_name}>{nama}</div>
                            <div className={s.product_sold}>131283 terjual</div>
                            <div className={s.product_price}>Rp{parseInt(harga).toLocaleString('en-US', { minimumFractionDigits: 0 })}</div>
                            <div className={s.line}/>
                            <div className={s.product_detail}>Detail</div>
                            <div className={s.line}/>
                            <div className={s.product_berat}>Berat: {berat} gram</div>
                            <div className={s.product_deskripsi}>{deskripsi}</div>

                            <div className="mb-4" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="feuture-box">
                <div class="transaction-card d-flex" className={s.transaction_card3}>
                    <div class="basket-info" className={s.basket_info}>
                        <h6>Set amount</h6>
                        <div className="container d-flex align-items-center mt-4">
                            <div class="checkout-card" className={s.checkout_card}>
                                <button onClick={ () => jumlah > 1 ? setJumlah(jumlah-1) : "" } className={s.plus_minus_button}>-</button>
                                <input type="text" className={s.input_quantity} value={jumlah} />
                                <button onClick={ () => setJumlah(jumlah+1) } className={s.plus_minus_button}>+</button>
                            </div>
                            <span className="ms-2">stok: {stok}</span>
                        </div>

                        <div className="container mt-4 pt-3">
                            <div className="row align-items-center">
                                <div class="col-md-1 mt-2">
                                    <div className={s.basket_subtotal_text}>
                                        <strong>Subtotal</strong>
                                    </div>
                                </div>
                                <div class="col d-flex justify-content-end">
                                    <div className={s.basket_subtotal}>
                                        <strong>Rp{(jumlah*harga).toLocaleString('en-US', { minimumFractionDigits: 0 })}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="container">
                            <button type="button" class="btn btn-outline-success mb-2 mt-3" style={{minWidth:"100%"}}>+ Shopping Cart</button><br/>
                            <button type="button" class="btn btn-success" style={{minWidth:"100%"}}>Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </main>
            

            
    <PUBLIC_FOOTER />

    </div>
    </div>
    )
}
 
export default Produk


