import "./css/Produk.css";
import anakAyam from "../img/anakayam.jpg";
import blank_image from "../img/blank-image.png";
import PUBLIC_NAVBAR from '../_public/Public-Navbar';
import PUBLIC_FOOTER from '../_public/Public-Footer';
import background from "../img/green-farm-blur.jpg";
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ReactModal from 'react-modal';
import { setLocalStorage, getLocalStorage } from "../utils/utils";

const Produk = () => {

  const [notif, setNotif] = useState(false);
  const [modalBayar, setModalBayar] = useState(false);

  const [products, setProduct] = useState([]);
  const [jumlah, setJumlah] = useState(1);
  const [terjual, setTerjual] = useState('');

  const navigate = useNavigate();

  const { id } = useParams();

  const getProductById = (async () => {
    const res = await axios.get(`http://localhost:5000/produk/${id}`);
    const res2 = await axios.get(`http://localhost:5000/produk/terjual/${id}`);
    setTerjual(res2.data.terjual);
    setProduct(res.data);
  });


  useEffect(() => {
    getProductById();
  }, []);

  const addCart = (isAlert = true) => {
    let cart = getLocalStorage("cart") || {};
    cart[products.idProduk] = cart[products.idProduk] == undefined ? cart[products.idProduk] = 0 : cart[products.idProduk];
    cart[products.idProduk] += jumlah;
    setLocalStorage("cart", cart);
    // setNotif(true);
    if (isAlert) alert("Produk Berhasil Ditambahkan!")
  }

  const buyNow = () => {
    addCart(false);
    setLocalStorage("buynow", [products.idProduk, jumlah])
    navigate('/checkout')
  }

  const handleCloseModal = () => {
    setNotif(false);
    setModalBayar(false);
  }

  return (
    <div>

      <div className="container_produk" style={{ backgroundImage: `url(${background})` }}>
        <ReactModal
          isOpen={modalBayar}
          onRequestClose={handleCloseModal}
          className="custom_modal card card-body bg-light">

        </ReactModal>

        <PUBLIC_NAVBAR />


        <main className="main">

          <div className="container d-flex flex-wrap justify-content-center">

            <div class="feuture-box">
              <div class="transaction-card d-flex">
                <img
                  onClick={() => navigate(`/produk/${products.idProduk}`)}
                  src={products.gambar === null ? blank_image : products.gambar} />
              </div>
            </div>

            <div className="feuture-box ">
              <div className="container d-flex flex-wrap justify-content-center">
                <div className="transaction_card2">
                  <div className="product_info">
                    <div className="product_name">{products.nama}</div>
                    <div className="product_sold">{terjual} terjual</div>
                    <div className="product_price">Rp{parseInt(products.harga).toLocaleString('en-US', { minimumFractionDigits: 0 })}</div>
                    <div className="line" />
                    <div className="product_detail">Detail</div>
                    <div className="line" />
                    <div className="product_berat">Berat: {products.berat} gram</div>
                    <div className="product_deskripsi">{products.deskripsi}</div>

                    <div className="mb-4" />
                  </div>
                </div>
              </div>
            </div>
            <div className="feuture-box">
              <div class="transaction_card d-flex p-4">
                <div class="basket-info">
                  <h6 className="checkout_title">Jumlah</h6>
                  <div className="container d-flex align-items-center mt-4">
                    <div class="checkout_card">


                      <button onClick={() => jumlah > 1 ? setJumlah(jumlah - 1) : ""} className="plus_minus_button">-</button>
                      <input type="number" className="input_quantity" value={jumlah}
                        onChange={(e) => { setJumlah(Math.max(1, Math.min(Number(e.target.value), products.stok))) }} />

                      <button onClick={() => setJumlah(jumlah + 1)} className="plus_minus_button">+</button>

                    </div>
                    <span className="ms-2">stok: {products.stok}</span>
                  </div>

                  <div className="container mt-4 pt-3">
                    <div className="row align-items-center">
                      <div class="col-md-1 mt-2">
                        <div className="basket_subtotal_text">
                          <strong>Subtotal</strong>
                        </div>
                      </div>
                      <div class="col d-flex justify-content-end">
                        <div className="basket_subtotal">
                          <strong>Rp{(jumlah * (products.harga)).toLocaleString('en-US', { minimumFractionDigits: 0 })}</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="container">
                    <button onClick={addCart} type="button" class="btn btn-outline-success mb-2 mt-3" style={{ minWidth: "100%" }}>+ Shopping Cart</button><br />
                    <button onClick={buyNow} type="button" class="btn btn-success" style={{ minWidth: "100%" }}>Buy Now</button>
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
