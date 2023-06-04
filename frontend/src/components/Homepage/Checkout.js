import s from "./css/Produk.module.css";
import anakAyam from "../img/anakayam.jpg";
import anakAyam2 from "../img/anakayam2.jpg";
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


      let result = [];
      const res = await axios.post(`http://localhost:5000/produk/idProduk`, { idProduk: listProduct });
      result.push(res.data)
      // for (let i = 0; i < listProduct.length; i++) {
      // }
      setProduct(result);
      unsetLocalStorage("buynow");

    });

    useEffect(() => {
        setShopingCart();
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
      for(const data in product){
          datas[data] = { 
              idAkun:getLoginCookie(), 
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
                            
                            <div className="container">
                            
                                <div className={s.alamat_section}>
                                <div className={s.product_name}>Checkout</div>
                                    <div className={s.line}/>
                                    <div className={s.title}><strong>Alamat Pengiriman</strong></div>
                                    <div className={s.nama}><strong>Fanes Pratama</strong></div>
                                    <div className={s.notelp}>082312311231</div>
                                    <div className={s.alamat}>JL. awdaiuwdhajwbdna</div>
                                    <div className={s.line}/>
                                </div>
                            </div>

                            <table className="table is-striped is-fullwidth" border="1px" cellspacing="0" cellpadding="10px">
                                <thead>
                                <tr>
                                    <th>Nama</th>
                                    <th>Harga</th>
                                    <th>Jumlah</th>
                                </tr>
                                </thead>
                                <tbody>
                                { product.map((produk, index) => (
                                    <tr key={ produk.id }>
                                        <td>{ produk.nama }</td>
                                        <td>{ produk.harga }</td>
                                        <td>{ jumlah[index] }</td>
                                    </tr>
                                )) }
                                            
                                </tbody>
                            </table>
                            <div className="mb-4" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="feuture-box">
                <div class="transaction-card d-flex" className={s.transaction_card3}>
                    <div class="basket-info" className={s.basket_info}>
                        <h6>Set amount</h6>
                        {/* <div className="container d-flex align-items-center mt-4">
                            <div class="checkout-card" className={s.checkout_card}>
                                <button onClick={ () => jumlah > 1 ? setJumlah(jumlah-1) : "" } className={s.plus_minus_button}>-</button>
                                <input type="text" className={s.input_quantity} value={jumlah} />
                                <button onClick={ () => setJumlah(jumlah+1) } className={s.plus_minus_button}>+</button>
                            </div>
                            <span className="ms-2">stok: {stok}</span>
                        </div> */}

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
                        
                        <div className="container mt-3">
                            <button onClick={ bayar } type="button" class="btn btn-success" style={{minWidth:"100%"}}>Bayar</button>
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


