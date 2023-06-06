import "./css/Produk.css";
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
    const [product, setProduct] = useState([]);
    const [alamat, setAlamat] = useState({});
    const [modalBayar, setModalBayar] = useState(false);
    const [atasNama, setAtasNama] = useState('');

    const [jumlah, setJumlah] = useState([]);
    const navigate = useNavigate();

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
      const res = await axios.get(`http://localhost:5000/detailakun/alamat/${getLoginCookie()}`)
      setAlamat(res.data[0]);
    }

    useEffect(() => {
      getAlamat();
  }, []);


    const bayar = () => {
      setModalBayar(true);
    }

    const handleCloseModal = () => {
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
              idAkun: getLoginCookie(), 
              idProduk:product[data].idProduk, 
              jumlah: jumlah[data], 
              harga: product[data].harga,
              total: parseFloat(jumlah[data])*parseFloat(product[data].harga),
              atasNama: atasNama,
              alamat: alamat
          }; 

      }
      const res = await axios.post('http://localhost:5000/pesanan/', datas);
      if(res.data.status){
        // selesai bayar
        setLocalStorage("cart", {});
        // setShopingCart();
        // navigate ke pesanan
      } else {
        console.log("err");
          alert(res.data.message);
      }
    }



    return (
    <div>
    <div className="container_checkout" style={{ backgroundImage: `url(${background})`}}>

    <ReactModal
      isOpen={ modalBayar }
      onRequestClose={ handleCloseModal }
      className="custom_modal card card-body bg-light p-4">
      <div className="modal_close_button_wrapper d-flex justify-content-end">
        <button onClick={  handleCloseModal } className="modal_close_button"><i className="bi bi-x-lg" /></button>
      </div>
      <div className="modal_content_wrapper pe-1">
        <div className="container-wrapper ms-3">
          <div className="accordian_title"><strong>Metode Pembayaran</strong></div>
          <div className="accordion" id="perlu_diproses">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_perlu_diproses" aria-expanded="true" aria-controls="collapseOne">Lihat Detail</button>
              </h2>
              <div id="collapse_perlu_diproses" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#perlu_diproses">
                <div className="accordion-body">
                  <div className="row">
                    Bank : Rekening <br />
                    Bank : Rekening
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="atas_nama">
            <form onSubmit={ sudahBayar }>
              <input className="form-control shadow-none mt-2 mb-3" type="text" placeholder="Atas Nama" value={atasNama} onChange={(e) => setAtasNama(e.target.value)} required/>
              <button onClick={ sudahBayar } type="button" className="btn btn-success mb-1" style={{minWidth:"100%"}}>Sudah Bayar</button>
            </form>
          </div>
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
                  <div className="keranjang_title"><strong>Checkout</strong></div>

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
                      <div className="alamat_title"><i className="bi bi-house-door me-2" /><strong>Alamat</strong></div>
                      <div className="card card-body p-2 ps-3 mt-1">
                        { Object.entries(alamat).length != 0 && (
                          <div>
                            <div className="">{alamat.penerima} | {alamat.noTelp}</div>
                            <div className="">{alamat.kecamatan.split('-')[1]}, {alamat.jalan}, {alamat.rtrw}</div>
                            <div className="">{alamat.kelurahan.split('-')[1]}, {alamat.kota.split('-')[1]}, {alamat.provinsi.split('-')[1]}, {alamat.kodePos}</div>
                          </div>
                        )}
                      </div>
                      <div className="">
                        <button onClick={ () => navigate('/alamat') } className="btn btn-secondary mt-2">Ubah Alamat</button>
                      </div>
                    
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-2">
            <div className="feuture-box">
              <div className="transaction-card d-flex transaction_card3" >
                  <div className="basket-info p-3">
                      <h6 className="checkout_title">Pembayaran</h6>


                      <div className="container mt-4 pt-3">
                          <div className="row align-items-center">
                              <div className="col-md-1 mt-2">
                                  <div className="basket_subtotal_text">
                                      <strong>Subtotal</strong>
                                  </div>
                              </div>
                              <div className="col d-flex justify-content-end">
                                  <div className="basket_subtotal">
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
                      <button onClick={ bayar } type="button" className="btn btn-success mt-3" style={{minWidth:"100%"}}>Bayar</button>
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


