import "./css/Produk.css";
import blank_image from "../img/blank-image.png";
import PUBLIC_NAVBAR from '../_public/Public-Navbar';
import PUBLIC_FOOTER from '../_public/Public-Footer';
import background from "../img/green-farm-blur.jpg";
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactModal from 'react-modal';
import { setLocalStorage, getLocalStorage, getLoginCookie, unsetLocalStorage, loginChecker } from "../utils/utils";

const Checkout = () => {
  loginChecker();
    const [product, setProduct] = useState([]);
    const [alamat, setAlamat] = useState({});
    const [rekening, setRekening] = useState({});
    const [pembayaran, setPembayaran] = useState({});
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

  function hasNullValue(obj) {
    for (let key in obj) {
      if (obj[key] === null) {
        return true;
      }
    }
    return false;
  }
  
  const getAlamat = async() => {
    const res = await axios.get(`http://localhost:5000/detailakun/alamat/${getLoginCookie()}`)
    console.log(res.data);
    
    if(hasNullValue(res.data[0])){
      navigate('/alamat')
    } else {
      setAlamat(res.data[0]);
    }
  }

  useEffect(() => {
    getAlamat();
  }, []);


  const getRekening = async() => {
    const res = await axios.get(`http://localhost:5000/informasi/rekening`);
    if(res.data.length != 0) {
      setPembayaran(res.data[0].idRekening);
      setRekening(res.data);
    }

  }

  useEffect(() => {
    getRekening();
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
            namaProduk: product[data].nama,
            jumlah: jumlah[data], 
            harga: product[data].harga,
            total: parseFloat(jumlah[data])*parseFloat(product[data].harga),
            atasNama: atasNama,
            alamat: alamat,
            idRekening: pembayaran
        }; 

    }
    const res = await axios.post('http://localhost:5000/pesanan/', datas);
    if(res.data.status){
      setLocalStorage("cart", {});
      setProduct([]);
      setModalBayar(false);
      navigate('/pesanan');
    } else {
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
          <div className="checkout_title mb-4">Metode Pembayaran</div>
          <div className="pembayaran-wrapper">

            { Object.entries(rekening).length != 0 ? (rekening.map((data, index) => (
              <div className={`card card-body mb-2 card-pembayaran ${data.idRekening === pembayaran ? "card-pembayaran-selected" : ""}`} onClick={ () => setPembayaran(data.idRekening) }>
                <div className=""><strong>{data.bank}</strong></div>
                <div className="">{data.nomor} | {data.nama}</div>
              </div>
            ))) : (
              <div>
                <div className="card card-body opacity-50">Rekening Tidak Tersedia!</div>
              </div>
            ) }
          </div>
          <div className="atas_nama">
          <div className="line mt-3" />
            <form onSubmit={ sudahBayar }>
              <input className="form-control shadow-none mt-3" type="text" placeholder="Atas Nama" value={atasNama} onChange={(e) => setAtasNama(e.target.value)} required/>
              <h5 className="card card-body mt-3 mb-2 border border-dark "><strong>
                Total : Rp { Object.values(product).reduce((acc, curr, index) => {
                  const hargaFloat = parseFloat(curr.harga);
                  return parseFloat(acc + hargaFloat * jumlah[index]);
                }, 0).toLocaleString('id-ID', { minimumFractionDigits: 0 })}
              </strong></h5>
              { Object.entries(rekening).length != 0 && atasNama != '' ? (
                <button onClick={ sudahBayar } type="button" className="btn btn-success w-100">Sudah Bayar</button>
              ) : (
                <button type="button" className="btn btn-secondary w-100">Sudah Bayar</button>
              ) }
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
                                <td>Rp { (parseFloat(produk.harga)).toLocaleString('id-ID', { minimumFractionDigits: 0 }) }</td>
  
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
                        { alamat && Object.entries(alamat).length != 0 && (
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
              <div className="transaction-card d-flex transaction_card3 " >
                  <div className="basket-info p-3 w-100">
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
                                          }, 0).toLocaleString('id-ID', { minimumFractionDigits: 0 })}
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


