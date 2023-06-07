import "./css/Produk.css";
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
import { setLocalStorage, getLocalStorage, updateLocalStorage, loginChecker } from "../utils/utils";

const Keranjang = () => {
  loginChecker();
    const [product, setProduct] = useState([]);
    const [modalKonfirmasi, setModalKonfirmasi] = useState(false);
    const [itemInginDihapus, setItemInginDihapus] = useState('');


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
        setProduct(res.data)
        
    });

    useEffect(() => {
        setShopingCart();
    }, []);


    const checkout = () => {
        navigate('/checkout')
    }

    const handleCloseModal = () => {
      setModalKonfirmasi(false);
    }

    const konfirmasiHapusProduk = (idProduk) => {
      setItemInginDihapus(idProduk);
      setModalKonfirmasi(true);
    }


    const hapusProduk = () => {
      let cart = getLocalStorage("cart") || {}; 
      delete cart[itemInginDihapus];
      setLocalStorage("cart", cart);
      setProduct(product && product.filter(obj => obj.idProduk !== itemInginDihapus));
      setModalKonfirmasi(false);
    }


    const maxStok = () => {
      
    }
    
    return (
    <div>

    <div className="container_keranjang" style={{ backgroundImage: `url(${background})`}}>
    <ReactModal
      isOpen={ modalKonfirmasi }
      onRequestClose={ handleCloseModal }
      className="custom_modal_notif card card-body bg-light p-4 text-center">
      <div className="modal_close_button_wrapper d-flex justify-content-end">
        <button onClick={  handleCloseModal } className="modal_close_button"><i className="bi bi-x-lg" /></button>
      </div>
      <div className="modal_content_wrapper pe-1">
        Apakah kamu ingin menghapus produk {product && product.filter(obj => obj.idProduk===itemInginDihapus).nama} dari Keranjang?
        <div className="d-flex justify-content-center mt-4">
          <button onClick={ handleCloseModal } className="btn btn-success mx-3 w-25">Tidak</button>
          <button onClick={ hapusProduk } className="btn btn-danger mx-3 w-25">Ya</button>
        </div>
      </div>
      

      </ReactModal>

    <PUBLIC_NAVBAR />

    <main>

      <div className="container">
        <div className="row">

          <div className="col-md-8 mb-4">
            <div className="feuture-box">
              <div className="container d-flex flex-wrap justify-content-end">
                <div className="keranjang_wrapper">
                <div className="card card-body">
                  <div className="keranjang_title"><strong>Keranjang Anda</strong></div>

                    <div className="card card-body">

                    { product && product.length != 0 ? (
                      <table className="table is-striped">

                        <tbody>
                        { product.map((produk, index) => (
                            <tr key={ produk.id }>
                                <td><img src={produk.gambar === null ? blank_image : produk.gambar} className="card card-image" /></td>
                                <td>{ produk.nama }</td>
                                <td>Rp { (parseFloat(produk.harga)).toLocaleString('id-ID', { minimumFractionDigits: 0 }) }</td>
                                <td>
                                  <div className="checkout_card">

                                    <button className="plus_minus_button"
                                      onClick={ () => {
                                        if(jumlah[index] > 1){
                                          setJumlah(prevJumlah => prevJumlah.map((value, idx) => (idx === index ? value - 1 : value)));
                                          updateLocalStorage("cart", produk.idProduk, jumlah[index]-1);
                                        } else {
                                          konfirmasiHapusProduk(produk.idProduk) 
                                        }
                                      }}>-</button>
                                    
                                    <input type="number" className="input_quantity" value={jumlah[index]} 
                                      onChange={(e) => {
                                        setJumlah(prevJumlah => prevJumlah.map((value, idx) => (idx === index ? Math.max(1, Math.min(Number(e.target.value), produk.stok)) : value)))
                                        updateLocalStorage("cart", produk.idProduk, Math.max(1, Math.min(Number(e.target.value), produk.stok)) );
                                      }
                                      } />
                                    
                                    <button className="plus_minus_button"
                                      onClick={ () => {
                                        if(jumlah[index] < produk.stok){
                                          setJumlah(prevJumlah => prevJumlah.map((value, idx) => (idx === index ? value + 1 : value)));
                                          updateLocalStorage("cart", produk.idProduk, jumlah[index]+1);
                                        }
                                      }}>+</button>

                                  </div>
                                  <button onClick={ () => konfirmasiHapusProduk(produk.idProduk) } class="btn btn-danger btn-sm mb-1 ms-3"><i class="bi bi-trash3" /></button>
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
              <div class="transaction-card d-flex" className="transaction_card3">
                  <div class="basket-info p-3">
                      <h6 className="checkout_title">Checkout</h6>


                      <div className="container mt-4 pt-3">
                          <div className="row align-items-center">
                              <div class="col-md-1 mt-2">
                                  <div className="basket_subtotal_text">
                                      <strong>Subtotal</strong>
                                  </div>
                              </div>
                              <div class="col d-flex justify-content-end">
                                  <div className="basket_subtotal">
                                      <strong>
                                          Rp{ Object.values(product).reduce((acc, curr, index) => {
                                              const hargaFloat = parseFloat(curr.harga);
                                              return parseFloat(acc + hargaFloat * jumlah[index]);
                                          }, 0).toLocaleString('id-ID', { minimumFractionDigits: 0 })}
                                      </strong>
                                  </div>
                              </div>
                          </div>
                      </div>
                      
                      <div className="container">
                        { product ? (
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


