import s from "./css/Produk.module.css";
import anakAyam from "../img/anakayam.jpg";
import anakAyam2 from "../img/anakayam2.jpg";
import blank_image from "../img/blank-image.png";
import PUBLIC_NAVBAR from '../_public/Public-Navbar';
import PUBLIC_FOOTER from '../_public/Public-Footer';
import background from "../img/green-farm-blur.jpg";
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactModal from 'react-modal';
import { setLocalStorage, getLocalStorage } from "../utils/utils";

const Keranjang = () => {
    const [notif, setNotif] = useState(false);
    const [product, setProduct] = useState([]);

    const [idProduk, setIdProduk] = useState([]); 
    const [nama, setName] = useState([]); 
    const [stok, setStok] = useState([]);
    const [harga, setHarga] = useState([]); 
    const [jumlah, setJumlah] = useState([]);


    

    const navigate = useNavigate();

    const setShopingCart = (async () => {
        const datas = getLocalStorage("cart");
        const datasKey = Object.keys(datas)
        setJumlah(Object.values(datas))

        const res = await axios.post(`http://localhost:5000/produk/idProduk`, { idProduk: datasKey });
        console.log(res.data);
        setProduct(res.data)
        
    });

    useEffect(() => {
        setShopingCart();
    }, []);

    const refreshShopingCart = () => {
    }


    console.log(product);


    const checkout = () => {
        navigate('/checkout')
    }

    const handleCloseModal = () => {
        setNotif(false);
    }

    const hapusProduk = (idProduk) => {
      let cart = getLocalStorage("cart") || {}; 
      delete cart[idProduk];
      setLocalStorage("cart", cart);
      setProduct(product.filter(obj => obj.idProduk!== idProduk));

    }


    const maxStok = () => {

    }
    


    return (
    <div>

    <div className={s.container_produk} style={{ backgroundImage: `url(${background})`}}>
{/* 
    <ReactModal isOpen={notif} onRequestClose={handleCloseModal} className={s.notif_modal} overlayClassName={s.notif_overlay}> 

    
        <div className={s.notif_wrapper}>
            <div className={s.notif_title}>Berhasil Ditambahkan</div>
            <button onClick={handleCloseModal}>Yes</button>
        </div>
    </ReactModal> */}

    <PUBLIC_NAVBAR />

    <main className={s.main}>

      <div className="container">
        <div className="row">

          <div className="col-md-8 mb-4">
            <div className="feuture-box">
              <div className="container d-flex flex-wrap justify-content-end">
                <div className={s.keranjang_wrapper}>
                <div className="card card-body">
                  <div className={s.keranjang_title}><strong>Keranjang Anda</strong></div>

                    <div className="card card-body">

                    { product.length != 0 ? (
                      <table className="table is-striped">

                        <tbody>
                        { product.map((produk, index) => (
                            <tr key={ produk.id }>
                                <td><img src={produk.gambar === null ? blank_image : produk.gambar} className="card card-image" /></td>
                                <td>{ produk.stok }</td>
                                <td>Rp { (parseFloat(produk.harga)).toLocaleString('en-US', { minimumFractionDigits: 0 }) }</td>
                                <td>
                                  <div className={s.checkout_card}>
                                    <button className={s.plus_minus_button}
                                      onClick={ 
                                        () => jumlah[index] > 1 ? setJumlah(prevJumlah=>prevJumlah.map((value, idx)=>(idx===index?value-1:value))) : hapusProduk(produk.idProduk) 
                                      }>-</button>
                                    <input type="number" className={s.input_quantity} value={jumlah[index]} 
                                      onChange={
                                        (e) => setJumlah(prevJumlah => prevJumlah.map((value, idx) => (idx === index ? Math.max(1, Math.min(Number(e.target.value), produk.stok)) : value)))
                                      } />
                                    <button className={s.plus_minus_button}
                                      onClick={ 
                                        () => jumlah[index] < produk.stok ? tambahProduk(produk.idProduk) : hapusProduk(produk.idProduk) 
                                      }>+</button>
                                  </div>
                                  <button onClick={ () => hapusProduk(produk.idProduk) } class="btn btn-danger btn-sm mb-1 ms-3"><i class="bi bi-trash3" /></button>
                              </td>
                            </tr>
                        )) }
                                    
                        </tbody>
                      </table>
                    ) : (
                      <div className="opacity-50">Keranjang Anda Kosong~</div>
                    ) }

                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-2">
            <div className="feuture-box">
              <div class="transaction-card d-flex" className={s.transaction_card3}>
                  <div class="basket-info" className={s.basket_info}>
                      <h6>Checkout</h6>


                      <div className="container mt-4 pt-3">
                          <div className="row align-items-center">
                              <div class="col-md-1 mt-2">
                                  <div className={s.basket_subtotal_text}>
                                      <strong>Subtotal</strong>
                                  </div>
                              </div>
                              <div class="col d-flex justify-content-end">
                                  <div className={s.basket_subtotal}>
                                      <strong>
                                          Rp{ Object.values(product).reduce((acc, curr, index) => {
                                              const hargaFloat = parseFloat(curr.harga);
                                              return parseFloat(acc + hargaFloat * jumlah[index]);
                                          }, 0).toLocaleString('en-US', { minimumFractionDigits: 0 })}
                                      </strong>
                                  </div>
                              </div>
                          </div>
                      </div>
                      
                      <div className="container">
                        { product.length != 0 ? (
                          <button onClick={ checkout } type="button" class="btn btn-success mt-3" style={{minWidth:"100%"}}>Checkout</button>
                        ) : (
                          <button type="button" class="btn btn-secondary mt-3" style={{minWidth:"100%"}}>Checkout</button>
                        )}
                      </div>
                  </div>
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
 
export default Keranjang


