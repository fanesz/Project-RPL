import s from "./css/Katalog.module.css";
import anakAyam from "../img/anakayam.jpg";
import PUBLIC_NAVBAR from '../_public/Public-Navbar';
import PUBLIC_FOOTER from '../_public/Public-Footer';
import background from "../img/green-farm-blur.jpg";
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setLocalStorage, getLocalStorage } from "../utils/utils";

const Katalog = () => {
    const [products, setProduct] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getProducts();
    }, []);


    const getProducts = async () => {
        const response = await axios.get('http://localhost:5000/produk')
        setProduct(response.data);
    }
    
    
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
    

    const getCart = () => {
        return getLocalStorage("cart");
    }

    function setButtonName(id){
        for(let key in getCart()){
            if(id === key){
                return "Shopping Cart";
            }
        }
        return "Add to Cart";
    }




    // const addCartButton = 








    return (
    <div>

<style jsx global>{`

`}
</style>
    <div className={s.container_katalog} style={{ backgroundImage: `url(${background})`}}>

        <PUBLIC_NAVBAR />

        <main className={s.main}>
            <div className="row justify-content-center">
                <div className="col-md-2"></div>

                <div className="col-md-6">
                    <section className={s.feature_box}>
                    <div class="container d-flex flex-wrap justify-content-center">

                    { products.map((product, index) => (
                        <div class="product-card" className={s.product_card}>
                            <div class="product-image" className={s.product_image}>
                                <img src={anakAyam} alt="ayam lucuk"/>
                            </div>
                            <div class="product-info" className={s.product_info}>
                                <h3 class="product-name" className={s.product_name}><strong>{product.nama}</strong></h3>
                                <p class="product-description" className={s.product_description}>Product description goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut sapien euismod, sodales elit a, efficitur velit.</p>
                                <div class="product-stock" className={s.product_stock}>stok : {product.stok}</div>
                                <div class="product-price" className={s.product_price}>Rp. {product.harga}</div>
                                <button 
                                    id={`cart-button-${product.id}`} 
                                    className={s.add_to_cart_button} 
                                    onClick={() => addCart(product.id, 1)}>
                                    {
                                        setButtonName(product.id)
                                    }
                                </button>

                            </div>
                        </div>
                    )) }
                    </div>
                    </section>
                </div>

                <div className="col-md-3">
                    <section className={s.feature_box}>
                        <div class="container">
                            Orderan anda:<br />
                            - ayam <br />
                            - pakan <br /><br />
                            <button className="btn btn-primary">Checkout</button>
                            <button className="btn btn-info" onClick={() => getCart()}>cek</button>

                        </div>
                    </section>
                </div>
            </div>


        </main>
                
        <PUBLIC_FOOTER />

    </div>
    </div>
    )
}
 
export default Katalog


