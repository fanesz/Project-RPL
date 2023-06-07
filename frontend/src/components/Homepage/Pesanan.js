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
import { setLocalStorage, getLocalStorage, updateLocalStorage, getLoginCookie } from "../utils/utils";

const Pesanan = () => {
    // const [product, setProduct] = useState([]);
    const [modalKonfirmasi, setModalKonfirmasi] = useState(false);
    const [itemInginDihapus, setItemInginDihapus] = useState('');
    
    const [filter, setFilter] = useState('');
    
    const [pesanan, setPesanan] = useState([]);


    const navigate = useNavigate();

    const getPesanan = (async () => {
      const res = await axios.get(`http://localhost:5000/pesanan/${getLoginCookie()}`);
      setPesanan(res.data)
      console.log(res.data);
        
    });

    useEffect(() => {
      getPesanan();
      setFilter('semua');
    }, []);

    const handleCloseModal = () => {

    }

    const filterProduk = (filter) => {
      setFilter(filter);
      
    }


    
    return (
    <div>

    <div className="container_pesanan" style={{ backgroundImage: `url(${background})`}}>
    {/* <ReactModal
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
          <button onClick={ handleCloseModal } className="btn btn-danger mx-3 w-25">Ya</button>
        </div>
      </div>
      

      </ReactModal> */}

    <PUBLIC_NAVBAR />

    <main>

      <div className="container">

        <div className="title card card-body pesanan_wrapper">
          <div className="keranjang_title"><strong><i class="bi bi-cart-fill pe-3" />Pesanan Kamu</strong></div>

          <div className="card card-body p-4 pt-3">

            <div className="filter_wrapper d-flex">
              <button className={`btn btn-light border me-3 ` + (filter==='semua'?'border-dark':'')}
                onClick={ () => filterProduk('semua') }>Semua</button>
       
              <button className={`btn btn-light border me-3 ` + (filter==='berlangsung'?'border-dark':'')}
                onClick={ () => filterProduk('berlangsung') }>Berlangsung</button>
       
              <button className={`btn btn-light border me-3 ` + (filter==='terkirim'?'border-dark':'')}
                onClick={ () => filterProduk('terkirim') }>Terkirim</button>
       
              <button className={`btn btn-light border me-3 ` + (filter==='berhasil'?'border-dark':'')}
                onClick={ () => filterProduk('berhasil') }>Berhasil</button>

              <button className={`btn btn-light border me-3 ` + (filter==='tidakberhasil'?'border-dark':'')}
                onClick={ () => filterProduk('tidakberhasil') }>Tidak Berhasil</button>
            </div>

            <div className="list_pesanan_wrapper d-flex mt-5 mb-3">
              {filter==='semua' ? (
                <div className="container pesanan-semua">

                  <div className="card card-body border-0 list_pesanan">
                    <div className="list_pesanan_header ms-3 mb-3">
                      07 Juni 2023 <span className="berhasil border border-success rounded p-1 py-0 ms-2">Berhasil</span>
                    </div>
                    <div className="list_pesanan_produk">
                      <div className="row">
                        <div className="col-md-3">
                          <img className="card card-image" src={anakAyam}></img>
                        </div>
                        <div className="col align-self-center list_pesanan_produk_nama">
                          <div className="title">Anak Ayam</div>
                          <div className="sub-title">dan 3 barang lainnya...</div>
                        </div>
                        <div className="col-md-3 align-self-center list_pesanan_produk_harga border-start">
                          <div className="sub-title">Total harga</div>
                          <div className="title">Rp 3.000.000</div>
                        </div>
                      </div>
                    </div>
                    <div className="list_pesanan_footer">

                    </div>

                  </div>


                </div>
              ) : filter==='berlangsung' ? (
                <div className="pesanan-berlangsung">



                </div>
              ) : filter==='terkirim' ? (
                <div className="pesanan-terkirim">



                </div>
              ) : filter==='berhasil' ? (
                <div className="pesanan-berhasil">



                </div>
              ) : filter==='tidakberhasil' ? (
                <div className="pesanan-tidakberhasil">



                </div>
              ) : (<></>)}
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
 
export default Pesanan


