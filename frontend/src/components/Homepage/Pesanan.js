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
import { setLocalStorage, getLocalStorage, updateLocalStorage, getLoginCookie, loginChecker } from "../utils/utils";

const Pesanan = () => {
  loginChecker();
    const [modalDetailPesanan, setModalDetailPesanan] = useState(false);
    const [itemInginDihapus, setItemInginDihapus] = useState('');
    
    const [filter, setFilter] = useState('');
    
    const [pesanan, setPesanan] = useState([]);
    const [alamat, setAlamat] = useState({});
    const [listPesanan, setlistPesanan] = useState([]);
    const [filteredPesanan, setFilteredPesanan] = useState([]);
    const [detailPesanan, setDetailPesanan] = useState([]);

    const getPesanan = (async () => {
      const res = await axios.get(`http://localhost:5000/pesanan/${getLoginCookie()}`);
      setPesanan(res.data)
      let tempPesanan = {}
      for(let key in res.data){
        tempPesanan = { ...tempPesanan, [res.data[key].idPesanan]: (res.data).filter((data) => data.idPesanan === res.data[key].idPesanan ) }
      }
      let tempPesananArr = [];
      for(let key in tempPesanan){
        tempPesananArr.push(tempPesanan[key])
      }
      setlistPesanan(tempPesananArr);
      tempPesananArr.sort((a, b) => {
        const statusOrder = {"Sudah Bayar": 0,"Sudah Terkirim": 1,"Dibatalkan": 2};
        const statusA = a[0].status;
        const statusB = b[0].status;
        return statusOrder[statusA] - statusOrder[statusB];
      });
      setFilteredPesanan(tempPesananArr);
      
    });

    useEffect(() => {
      getPesanan();
    }, []);



    const handleCloseModal = () => {
      setModalDetailPesanan(false);
    }

    const filterProduk = (filter) => {
      setFilter(filter);
      if(filter === 'semua') {
        setFilteredPesanan(listPesanan);
        return;
      }

      setFilteredPesanan(listPesanan
        .map(subArr => subArr.filter(item => item.status === filter))
        .filter(subArr => subArr.length > 0));
    }

    const LihatDetailPesanan = (idPesanan) => {
      const filteredPesanan = listPesanan.flatMap((arr) =>
        arr.filter((obj) => obj.idPesanan === idPesanan )
      );
      const filteredDetailPesanan = listPesanan.flatMap((arr) => {
        const filteredArr = arr.filter((obj) => obj.idPesanan === idPesanan );
        return filteredArr.length > 0 ? [filteredArr[0]] : [];
      });
      
      console.log(filteredPesanan);
      setDetailPesanan(filteredPesanan);
      setAlamat(JSON.parse(filteredPesanan[0].alamat)[0]);
      setModalDetailPesanan(true);
      
    }

    return (
    <div>

    <div className="container_pesanan" style={{ backgroundImage: `url(${background})`}}>
    <ReactModal
      isOpen={ modalDetailPesanan }
      onRequestClose={ handleCloseModal }
      className="custom_modal card card-body bg-light">
      <div className='modal_content'>
        
      {Object.keys(detailPesanan).length > 0 && (
      <div class="card card-title mb-3 p-2 pb-1 ps-3 pe-3 d-inline-block w-auto">
        <h5 class="card-title">
          <span class="bi bi-cart4 me-2"></span>
          {detailPesanan[0].idPesanan}
        </h5>
      </div>
      )}

      <div class="card card-body mb-2">
      <table className='table table-striped'>
        <tr>
          <th>Kode</th>
          <th>Nama Produk</th>
          <th>Jumlah</th>
          <th>Harga</th>
        </tr>

      {Object.keys(detailPesanan).length > 0 && detailPesanan.map((data, index) => (
          <tr>
            <td>{data.idProduk}</td>
            <td>{data.namaProduk}</td>
            <td>{data.jumlah}</td>
            <td>{data.harga}</td>
          </tr>
      ))}
      </table>
      </div>

      {Object.keys(detailPesanan).length > 0 && alamat.length != 0 && (
      <div class="card card-body">
        <div className='row g-1'>
          <div className='col'>
            <div class="card_title mb-1"><i class="bi bi-house-door me-2" />Alamat</div>
              <div className="">{detailPesanan.email}</div>
              <div className="">{alamat.penerima} | {alamat.noTelp}</div>
              <div className="">{alamat.kecamatan.split('-')[1]}, {alamat.jalan}, {alamat.rtrw}</div>
              <div className="">{alamat.kelurahan.split('-')[1]}, {alamat.kota.split('-')[1]}, {alamat.provinsi.split('-')[1]}, {alamat.kodePos}</div>
          </div>
          <div className='col-md-4'>
            <div class="card_title mb-1"><i class="bi bi-bank me-2" />Pembayaran</div>
              <div className='pembayaran'>{listPesanan[0][0].bank} | {listPesanan[0][0].atasNama}</div>
              <div className='pembayaran'>{listPesanan[0][0].waktuPesan}</div>
              <div className='pembayaran'>Rp {listPesanan[0][0].total.toLocaleString('id-ID', { minimumFractionDigits: 0 })}</div>
              <div className='pembayaran'></div>
          </div>
        </div>
      </div>
      )}

        
      </div>
    </ReactModal>

    <PUBLIC_NAVBAR />

    <main>

      <div className="container">

        <div className="title card card-body pesanan_wrapper">
          <div className="keranjang_title"><strong><i class="bi bi-cart-fill pe-3" />Pesanan Kamu</strong></div>

          <div className="card card-body p-4 pt-3">

            <div className="filter_wrapper d-inline-block">
              <button className={`btn btn-light border me-3 mb-2 ` + (filter==='semua'?'border-dark':'')}
                onClick={ () => filterProduk('semua') }>Semua</button>
       
              <button className={`btn btn-light border me-3 mb-2 ` + (filter==='Sudah Bayar'?'border-dark':'')}
                onClick={ () => filterProduk('Sudah Bayar') }>Berlangsung</button>
       
              <button className={`btn btn-light border me-3 mb-2 ` + (filter==='Sudah Terkirim'?'border-dark':'')}
                onClick={ () => filterProduk('Sudah Terkirim') }>Terkirim</button>

              <button className={`btn btn-light border me-3 mb-2 ` + (filter==='Dibatalkan'?'border-dark':'')}
                onClick={ () => filterProduk('Dibatalkan') }>Dibatalkan</button>
            </div>

            <div className="list_pesanan_wrapper d-flex mt-5 mb-3">

                <div className="container pesanan-semua">
                  {filteredPesanan.length != 0 ? (filteredPesanan.map((data, index) => (
                  <div className="card card-body border-0 list_pesanan mb-4">
                    <div className="list_pesanan_header ms-3 mb-3">
                      {data[0].waktuPesan}
                      { data[0].status==='Sudah Bayar' ? (
                        <span className="berlangsung border border-warning rounded p-1 py-0 ms-2">Sedang Berlangsung</span>
                      ) : data[0].status==='Sudah Terkirim' || data[0].status==='Selesai' ? (
                        <span className="terkirim border border-success rounded p-1 py-0 ms-2">Terkirim</span>
                      ) : data[0].status==='Dibatalkan' ? (
                        <span className="dibatalkan border border-danger rounded p-1 py-0 ms-2">Dibatalkan</span>
                      ) : ('')}
                    </div>
                    <div className="list_pesanan_produk">
                      <div className="row">
                        <div className="col-md-3">
                          <img className="card card-image" src={filteredPesanan[index][0].gambar === null ? blank_image : filteredPesanan[index][0].gambar}></img>
                        </div>
                        <div className="col align-self-center list_pesanan_produk_nama">
                          <div className="title">{data[0].namaProduk}</div>
                          { data[0].jumlahJenisBarang - 1 != 0 ? (
                            <div className="sub-title">dan {data[0].jumlahJenisBarang - 1} barang lainnya...</div>
                            ) : (
                            <div className="sub-title">x {data[0].jumlah} barang</div>
                          ) }
                        </div>
                        <div className="col-md-3 align-self-center list_pesanan_produk_harga border-start">
                          <div className="sub-title">Total harga</div>
                          <div className="title">Rp {(data.reduce((total, current) => total + current.harga, 0)).toLocaleString('id-ID', { minimumFractionDigits: 0 })}</div>
                        </div>
                      </div>
                    </div>
                  <div className="list_pesanan_footer">
                    <button onClick={ () => LihatDetailPesanan(data[0].idPesanan) } className="btn btn-secondary float-end me-4">&emsp;Lihat Detail&emsp;</button>
                  </div>
                </div>
                  ))) : (
                    <div className="opacity-50">
                      tidak ada pesanan~
                    </div>
                  )}
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
 
export default Pesanan


