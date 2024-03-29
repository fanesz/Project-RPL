import "./css/Katalog.css";
import blank_image from "../img/blank-image.png"
import PUBLIC_NAVBAR from '../_public/Public-Navbar';
import PUBLIC_FOOTER from '../_public/Public-Footer';
import background from "../img/green-farm-blur.jpg";
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import { getLocalStorage } from "../utils/utils";

const Katalog = () => {
  const navigate = useNavigate();
  const [products, setProduct] = useState([]);

  const getProducts = async () => {
    const res = await axios.get('http://localhost:5000/produk');
    setProduct((res.data).filter(item => item.stok >= 0));
  }
  useEffect(() => {
    getProducts();
  }, []);

  const addCart = (id) => {
    navigate(`/produk/${id}`);
  }

  const getCart = () => {
    return getLocalStorage("cart");
  }


    return (
    <div>

    <div className="container-katalog" style={{ backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>

        <PUBLIC_NAVBAR />


        <main className="main">
            <div className="row justify-content-center">

                <div className="col-md-9">
                  <div className="title feature_box card card-body">
                    <div className="keranjang_title"><strong><i class="bi bi-cart-fill pe-3" />Katalog</strong></div>
                    <section className="pt-4">
                    <div class="container d-flex flex-wrap justify-content-center">
                    { products && products.map((product, index) => (
                      <div className="product-card mb-5">
                            <div className="product-image">
                            <img alt={product.nama}
                              onClick={ () => navigate(`/produk/${product.idProduk}`)}
                              src={product.gambar === null ? blank_image : product.gambar} 
                              className="card card-image" />
                            </div>
                            <div class="product-info p-4 pt-3">
                                <div className="product_name">{product.nama}</div>
                                <div className="product_price"><strong>Rp. {parseFloat(product.harga).toLocaleString('id-ID', { minimumFractionDigits: 0 })}</strong></div>
                                <div className="product_stock mt-3 mb-1">stok : {product.stok}</div>
                                { getCart() && getCart().hasOwnProperty(product.idProduk) ? (

                                  <button className="btn btn-success" onClick={ ()=> navigate('/keranjang') }><i class="bi bi-cart2 me-2" />Cek Keranjang</button>
                                  ) : (
                                      <button className="btn btn-success" onClick={ ()=> addCart(product.idProduk) }>+ Keranjang</button>
                                      
                                  )
                              }

                            </div>
                        </div>
                    )) }
                    </div>
                    </section>
                    </div>
                </div>


            </div>


        </main>
                
        <PUBLIC_FOOTER />

    </div>
    </div>
    )
}
 
export default Katalog


