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
import { setLocalStorage, getLocalStorage, getLoginCookie, unsetLocalStorage } from "../utils/utils";

const Checkout = () => {
    const [notif, setNotif] = useState(false);
    const [product, setProduct] = useState([]);
    const [user, setUser] = useState([]);
    const [modalBayar, setModalBayar] = useState(false);
    const [atasNama, setAtasNama] = useState('');

    const [jumlah, setJumlah] = useState([]);

    const setShopingCart = (async () => {
      const getBuyNow = getLocalStorage("buynow");
      const getCart = getLocalStorage("cart");

      let listProduct;
      if(getBuyNow) {
        listProduct = [getBuyNow[0]];
        setJumlah([getBuyNow[1]])
      } else {
        listProduct = Object.keys(getCart);
        setJumlah(Object.values(getCart))
      }
      const res = await axios.post(`http://localhost:5000/produk/idProduk`, { idProduk: listProduct });
      setProduct(res.data);
      unsetLocalStorage("buynow");

    });

    useEffect(() => {
        setShopingCart();
    }, []);

    const getAlamat = async() => {
      const res = await axios.get(`http://localhost:5000/detailakun/${getLoginCookie()}`)
      setUser(res.data);
    }

    useEffect(() => {
      getAlamat();
  }, []);


    const bayar = () => {
      setModalBayar(true);
    }

    const handleCloseModal = () => {
      setNotif(false);
      setModalBayar(false);
    }

    const sudahBayar = async() => {
      if(product.length === 0) return;
      if(atasNama.trim() === ''){
        document.querySelector("form input").focus();
        return;
      }
      const datas = {};
      console.log(getLoginCookie());
      for(const data in product){
          datas[data] = { 
              idAkun: getLoginCookie(), 
              idProduk:product[data].idProduk, 
              jumlah: jumlah[data], 
              harga: product[data].harga,
              total: parseFloat(jumlah[data])*parseFloat(product[data].harga),
              atasNama: atasNama
          }; 

      }
      const res = await axios.post('http://localhost:5000/pesanan/', datas);
      if(res.data.status){
          // selesai bayar
          setLocalStorage("cart", {});
          setShopingCart();
      } else {
          alert(res.data.message);
      }
    }



    return (
    <div>
    <div className={s.container_produk} style={{ backgroundImage: `url(${background})`}}>

    <ReactModal
      isOpen={ modalBayar }
      onRequestClose={ handleCloseModal }
      className="custom_modal card card-body bg-light">
      
      <div className="container-wrapper ms-3">
        <div className="accordian_title"><strong>Metode Pembayaran</strong></div>
        <div class="accordion" id="perlu_diproses">
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
              <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_perlu_diproses" aria-expanded="true" aria-controls="collapseOne">Lihat Detail</button>
            </h2>
            <div id="collapse_perlu_diproses" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#perlu_diproses">
              <div class="accordion-body">
                <div class="row">
                  Bank : Rekening <br />
                  Bank : Rekening


                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={s.atas_nama}>
          <form onSubmit={ sudahBayar }>
            <input className="form-control shadow-none mt-2 mb-3" type="text" placeholder="Atas Nama" value={atasNama} onChange={(e) => setAtasNama(e.target.value)} required/>
            <button onClick={ sudahBayar } type="button" class="btn btn-success mb-1" style={{minWidth:"100%"}}>Sudah Bayar</button>
          </form>
        </div>
      </div>




    </ReactModal>

    <PUBLIC_NAVBAR />


    <main className={s.main}>

      <div className="container">
        <div className="row">

          <div className="col-md-8 mb-4">
            <div className="feuture-box">
              <div className="container d-flex flex-wrap justify-content-end">
                <div className={s.keranjang_wrapper}>
                <div className="card card-body">
                  <div className={s.keranjang_title}><strong>Checkout</strong></div>

                    <div className="card card-body">

                    { product && product.length != 0 ? (
                      <table className="table is-striped">

                        <tbody>
                        { product.map((produk, index) => (
                            <tr key={ produk.id }>
                                <td><img src={produk.gambar === null ? blank_image : produk.gambar} className="card card-image" /></td>
                                <td>{ produk.nama }</td>
                                <td>Rp { (parseFloat(produk.harga)).toLocaleString('en-US', { minimumFractionDigits: 0 }) }</td>
  
                            </tr>
                        )) }
                                    
                        </tbody>
                      </table>
                    ) : (
                      <div className="opacity-50">Tidak ada barang yang bisa di checkout~</div>
                    ) }

                    </div>

                    <div className="card card-body">
                      <div className={s.alamat_title}><i class="bi bi-house-door me-2" /><strong>Alamat</strong></div>
                      <div className="card card-body p-2 ps-3 mt-1">
                        {/* <div className="">{user[0].nama} | {user[0].noTelp}</div>
                        <div className="">{user[0].alamat}</div> */}
                      </div>
                      <div className="">
                        <button className="btn btn-secondary mt-2">Ubah Alamat</button>
                      </div>
                    
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-2">
            <div className="feuture-box">
              <div class="transaction-card d-flex" className={s.transaction_card3}>
                  <div class="basket-info p-3">
                      <h6 className={s.checkout_title}>Pembayaran</h6>


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
                      <button onClick={ bayar } type="button" class="btn btn-success mt-3" style={{minWidth:"100%"}}>Bayar</button>
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
 
export default Checkout


