import "./css/Katalog.css";
import anakAyam from "../img/anakayam.jpg";
import PUBLIC_NAVBAR from '../_public/Public-Navbar';
import PUBLIC_FOOTER from '../_public/Public-Footer';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import axios from "axios";

const Katalog = () => {

    // const navigate = useNavigate();
    const [products, setProduct] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);
 
    const getProducts = async () => {
        const response = await axios.get('http://localhost:5000/produk')
        setProduct(response.data);
    }


    return (
    <div>

<style jsx global>{`

`}
</style>

    <div className="container" id="background">

        <PUBLIC_NAVBAR />


        <main>
            <section class="feature-box">
                <div class="container d-flex flex-wrap" id="catalog-warper">



                { products.map((product, index) => (
                <div class="product-card">
                <div class="product-image">
                    <img src={anakAyam} alt="ayam lucuk"/>
                </div>
                <div class="product-info">
                    <h3 class="product-name"><strong>{product.nama}</strong></h3>
                    <p class="product-description">Product description goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut sapien euismod, sodales elit a, efficitur velit.</p>
                    <div class="product-stok">stok : {product.stok}</div>
                    <div class="product-price">Rp. {product.harga}</div>
                    <button class="add-to-cart-button" onclick="window.location.href = 'hal_produk.html';">Add to Cart</button>
                </div>
                </div>
                )) }

                    
                </div>
            </section>
        </main>
                
        <PUBLIC_FOOTER />

    </div>
    </div>
    )
}
 
export default Katalog


