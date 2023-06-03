import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactModal from 'react-modal';
import "./css/order.css";
import "bootstrap-icons/font/bootstrap-icons.css";




const MainMenu = () => {

  const [pesanan, setPesanan] = useState([]);
  const [listPesanan, setlistPesanan] = useState({});
  const [modalDetailPesanan, setModalDetailPesanan] = useState(false);

  const getPesanan = (async () => {

    const res = await axios.get('http://localhost:5000/pesanan');
    setPesanan(res.data);

  
  })

  useEffect(() => {
    getPesanan();
  }, []);



  const getPesananById = (async (idPesanan) => {
    const res = await axios.post('http://localhost:5000/pesanan/id', {
      idPesanan: idPesanan
    });
    setlistPesanan((prevState) => {
      return { ...prevState, [res.data[0].idPesanan]: res.data };
    });

  });

  const detailPesanan = (async (idPesanan) => {
    setModalDetailPesanan(true);
    if (listPesanan[idPesanan]) {
      console.log(listPesanan[idPesanan]);
      return listPesanan[idPesanan];
    } else {
      console.log("replaced");
      const res = await getPesananById(idPesanan);

      console.log(res);
    }
  })



  const closeModal = () => {
    setModalDetailPesanan(false);
  }










  return (
    <div>
    <ReactModal
      isOpen={ modalDetailPesanan }
      onRequestClose={ closeModal }
      className="custom_modal">
      <button className="modal_closebutton" onClick={() => closeModal()}>X</button>
      <div className='modal_content'>
        
      </div>
    </ReactModal>

    <div className="container">
    <div className="row g-1">
      <div className="col-sm-2">
        <div class="sidebar">
          <ul class="sidebar-content">
            <div class="align-items-center">
              <div className="title mb-3"><strong>Ayamku</strong></div>
            </div>
            <li class="non">
              <span class="text">Review</span>
              <span class="kanan">0</span>
            </li>
            <li class="non">
              <span class="text">Rating Toko</span>
              <span class="kanan">4.5/5</span>
            </li>
            <li>
              <span class="text">Transaksi Sukses</span>
              <span class="kanan">97%</span>
            </li>
            <li>
              <span class="text">Omset bulan Desember</span>
              <span class="kanan">Rp. 32.500.000</span>
            </li>
            <li>
              <i class="bi bi-box-seam me-2" />
              <span class="judul">Tokoku</span><br />
              <span class="text2">Beranda</span>
              <span class="text2">Profil Toko</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="col me-5 mt-4 col-content">
        <h1 className="mt-4">Selamat datang, Nama Penjual</h1>
        <div class="container mt-4 transaction_card product_info feuture-box">

          <div className="container-wrapper">
            <div className="accordian_title"><strong>Perlu Diproses</strong></div>
            <div class="accordion" id="perlu_diproses">
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                  <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_perlu_diproses" aria-expanded="true" aria-controls="collapseOne">Lihat Detail</button>
                </h2>
                <div id="collapse_perlu_diproses" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#perlu_diproses">
                  <div class="accordion-body">
                    <div class="row">
                      { pesanan.map((data, index) => (

                        <div class="col-sm-3 mb-3">
                            <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Pesanan#{data.idPesanan}</h5>
                                <div class="card-text mb-2">
                                <div className="idProduk">{data.waktuPesan}</div>
                                <div className="harga">Rp{}</div>
                                </div>
                                <button onClick={ () => detailPesanan(data.idPesanan) } href="#" class="btn btn-secondary">Detail Pesanan</button>
                            </div>
                          </div>
                        </div>


                      )) }



                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container-wrapper">
            <div className="accordian_title"><strong>Menunggu Konfirmasi</strong></div>
            <div class="accordion" id="menunggu_konfirmasi">
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                  <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_menunggu_konfirmasi" aria-expanded="true" aria-controls="collapseOne">Lihat Detail</button>
                </h2>
                <div id="collapse_menunggu_konfirmasi" class="accordion-collapse collapse hidden" aria-labelledby="headingOne" data-bs-parent="#menunggu_konfirmasi">
                  <div class="accordion-body">
                      <div class="row">
                      <div class="col-sm-4">
                          <div class="card">
                          <div class="card-body">
                              <h5 class="card-title">Pesanan#004</h5>
                              <div class="card-text mb-2">
                              <div className="nama">nama: Nicholas</div>
                              <div className="nama">nama: Nicholas</div>
                              <div className="nama">nama: Nicholas</div>
                              <div className="nama">nama: Nicholas</div>
                              </div>
                              <a href="#" class="btn btn-primary">Pesanan Selesai</a>
                              <a href="#" class="btn btn-danger">Pesanan Dibatalkan</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      </div>


    </div>
    </div>

    )
}
 
export default MainMenu