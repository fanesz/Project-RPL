import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactModal from "react-modal";
import "./css/order.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { getLoginCookie } from "../utils/utils";

const MainMenu = () => {
  ReactModal.setAppElement("#root");

  const sellerChecker = async () => {
    if (getLoginCookie() === undefined) {
      navigate("/");
    }
    const res = await axios.get(`http://localhost:5000/akun/akses/${getLoginCookie()}`);
    if (res.data.akses !== "admin" && res.data.akses !== "seller") {
      navigate("/");
    }
  };

  const logout = () => {
    getLoginCookie();
    navigate("/login");
  };

  useEffect(() => {
    sellerChecker();
  }, []);

  const [pesananPerluDiproses, setPesananPerluDiproses] = useState([]);
  const [pesananMenungguKonfirmasi, setPesananMenungguKonfirmasi] = useState([]);
  const [pesananDibatalkan, setPesananDibatalkan] = useState([]);
  const [showDetailPesanan, setShowDetailPesanan] = useState([]);
  const [showAlamat, setShowAlamat] = useState([]);
  const [listPesanan, setlistPesanan] = useState({});
  const [modalDetailPesanan, setModalDetailPesanan] = useState(false);

  const navigate = useNavigate();

  const getPesanan = async () => {
    const res = await axios.get("http://localhost:5000/pesanan");
    const data = res.data;

    setPesananPerluDiproses(data.filter((item) => item.status === "Sudah Bayar"));
    setPesananMenungguKonfirmasi(data.filter((item) => item.status === "Sudah Terkirim"));
    setPesananDibatalkan(data.filter((item) => item.status === "Dibatalkan"));
  };

  useEffect(() => {
    getPesanan();
  }, []);

  const getPesananById = async (idPesanan) => {
    const res = await axios.get(`http://localhost:5000/pesanan/${idPesanan}`);
    const objPesanan = { [res.data[0].idPesanan]: res.data };
    setShowAlamat(JSON.parse(objPesanan[Object.keys(objPesanan)][0].alamat)[0]);
    setShowDetailPesanan(objPesanan[Object.keys(objPesanan)]);

    setlistPesanan((prevState) => {
      return { ...prevState, [res.data[0].idPesanan]: res.data };
    });
  };

  const detailPesanan = async (idPesanan) => {
    if (!listPesanan[idPesanan]) {
      await getPesananById(idPesanan);
    } else {
      setShowAlamat(JSON.parse({ [idPesanan]: listPesanan[idPesanan] }[Object.keys({ [idPesanan]: listPesanan[idPesanan] })][0].alamat)[0]);
      setShowDetailPesanan({ [idPesanan]: listPesanan[idPesanan] }[Object.keys({ [idPesanan]: listPesanan[idPesanan] })]);
    }
    setModalDetailPesanan(true);
  };

  const closeModal = () => {
    setModalDetailPesanan(false);
  };

  const pesananSelesai = async (idPesanan) => {
    const res = await axios.post("http://localhost:5000/pesanan/status", {
      idPesanan: idPesanan,
      status: "Sudah Terkirim",
    });
    if (res.data.status) {
      getPesanan(); //refresh semua pesanan
      closeModal();
      window.location.reload();
    }
  };

  const batalkanPesanan = async (idPesanan) => {
    const res = await axios.post("http://localhost:5000/pesanan/status", {
      idPesanan: idPesanan,
      status: "Dibatalkan",
    });
    if (res.data.status) {
      getPesanan(); //refresh semua pesanan
      closeModal();
      window.location.reload();
    }
  };

  return (
    <div>
      <ReactModal isOpen={modalDetailPesanan} onRequestClose={closeModal} className="custom_modal card card-body bg-light">
        <div className="modal_content">
          {showDetailPesanan.length != 0 && (
            <div class="card card-title mb-3 p-2 pb-1 ps-3 pe-3 d-inline-block w-auto">
              <h5 class="card-title">
                <span class="bi bi-cart4 me-2"></span>
                {showDetailPesanan[0].idPesanan}
              </h5>
            </div>
          )}

          <div class="card card-body mb-2">
            <table className="table table-striped">
              <tr>
                <th>Kode</th>
                <th>Nama Produk</th>
                <th>Jumlah</th>
                <th>Harga</th>
              </tr>
              {showDetailPesanan.length != 0 &&
                showDetailPesanan.map((data, index) => (
                  <tr>
                    <td>{data.idProduk}</td>
                    <td>{data.namaProduk}</td>
                    <td>{data.jumlah}</td>
                    <td>{data.harga.toLocaleString("id-ID", { minimumFractionDigits: 0 })}</td>
                  </tr>
                ))}
            </table>
          </div>

          {showAlamat.length != 0 && showDetailPesanan && (
            <div class="card card-body">
              <div className="row g-1">
                <div className="col">
                  <div class="card_title mb-1">
                    <i class="bi bi-house-door me-2" />
                    Alamat
                  </div>
                  <div className="">{showDetailPesanan[0].email}</div>
                  <div className="">
                    {showAlamat.penerima} | {showAlamat.noTelp}
                  </div>
                  <div className="">
                    {showAlamat.kecamatan.split("-")[1]}, {showAlamat.jalan}, {showAlamat.rtrw}
                  </div>
                  <div className="">
                    {showAlamat.kelurahan.split("-")[1]}, {showAlamat.kota.split("-")[1]}, {showAlamat.provinsi.split("-")[1]}, {showAlamat.kodePos}
                  </div>
                </div>
                <div className="col-md-4">
                  <div class="card_title mb-1">
                    <i class="bi bi-bank me-2" />
                    Pembayaran
                  </div>
                  <div className="pembayaran">
                    {showDetailPesanan[0].bank} | {showDetailPesanan[0].atasNama}
                  </div>
                  <div className="pembayaran">{showDetailPesanan[0].waktuPesan}</div>
                  <div className="pembayaran">Rp {showDetailPesanan[0].total.toLocaleString("id-ID", { minimumFractionDigits: 0 })}</div>
                  <div className="pembayaran"></div>
                </div>
              </div>
            </div>
          )}

          {showDetailPesanan.length != 0 && showDetailPesanan[0].status === "Sudah Bayar" && (
            <div class="card card-body mt-3">
              <div className="row">
                <div className="col d-flex justify-content-center">
                  <button onClick={() => pesananSelesai(showDetailPesanan[0].idPesanan)} className="btn btn-primary w-100 me-4 ms-4">
                    Pesanan Selesai
                  </button>
                </div>
                <div className="col d-flex justify-content-center">
                  <button onClick={() => batalkanPesanan(showDetailPesanan[0].idPesanan)} className="btn btn-danger w-100 me-4 ms-4">
                    Batalkan Pesanan
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </ReactModal>

      <div className="container">
        <div className="row g-1">
          <div className="col-sm-2">
            <div className="sidebar">
              <ul className="sidebar-content">
                <div className="align-items-center">
                  <div className="title mb-3">
                    <strong>Ayamku</strong>
                  </div>
                </div>
                <li>
                  <span className="text">Review</span>
                  <span className="kanan">0</span>
                </li>
                <li>
                  <span className="text">Toko Rating</span>
                  <span className="kanan">4.5/5</span>
                </li>
                <li>
                  <span className="text">Transaksi Sukses</span>
                  <span className="kanan">97%</span>
                </li>
                <li>
                  <span className="text">Omset bulan Desember</span>
                  <span className="kanan">Rp. 32.500.000</span>
                </li>
                <li>
                  <i className="bi bi-box-seam me-2"></i>
                  <a className="judul" href="/">
                    Toko Ayamku
                  </a>
                  <br />
                </li>
                <li>
                  <button onClick={logout} className="btn btn-secondary rounded text-light py-3 px-3 me-4 opacity-75">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="col me-5 mt-4 col-content">
            <h1 className="mt-4">Halaman Penjual</h1>
            <div class="container mt-4 transaction_card product_info feuture-box">
              <div className="container-wrapper">
                <div className="accordian_title">
                  <strong>Perlu Diproses</strong>
                </div>
                <div class="accordion" id="perlu_diproses">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_perlu_diproses" aria-expanded="true" aria-controls="collapseOne">
                        Lihat Detail
                      </button>
                    </h2>
                    <div id="collapse_perlu_diproses" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#perlu_diproses">
                      <div class="accordion-body">
                        <div class="row">
                          {pesananPerluDiproses.length === 0 && <div className="noPesanan">Tidak ada pesanan yang perlu diproses...</div>}
                          {pesananPerluDiproses.map((data, index) => (
                            <div class="col-sm-3 mb-3">
                              <div class="card">
                                <div class="card-body">
                                  <h5 class="card-title">Pesanan#{data.idPesanan}</h5>
                                  <div class="card-text mb-2">
                                    <div className="idProduk">{data.waktuPesan}</div>
                                    <div className="harga">Rp {data.total.toLocaleString("id-ID", { minimumFractionDigits: 0 })}</div>
                                  </div>
                                  <button onClick={() => detailPesanan(data.idPesanan)} href="#" class="btn btn-secondary">
                                    Detail Pesanan
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="container-wrapper">
                <div className="accordian_title">
                  <strong>Terkirim</strong>
                </div>
                <div class="accordion" id="menunggu_konfirmasi">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_menunggu_konfirmasi" aria-expanded="true" aria-controls="collapseOne">
                        Lihat Detail
                      </button>
                    </h2>
                    <div id="collapse_menunggu_konfirmasi" class="accordion-collapse collapse hidden" aria-labelledby="headingOne" data-bs-parent="#menunggu_konfirmasi">
                      <div class="accordion-body">
                        <div class="row">
                          {pesananMenungguKonfirmasi.length === 0 && <div className="noPesanan">Tidak ada pesanan yang Menunggu Konfirmasi...</div>}
                          {pesananMenungguKonfirmasi.map((data, index) => (
                            <div class="col-sm-3 mb-3">
                              <div class="card">
                                <div class="card-body">
                                  <h5 class="card-title">Pesanan#{data.idPesanan}</h5>
                                  <div class="card-text mb-2">
                                    <div className="idProduk">{data.waktuPesan}</div>
                                    <div className="harga">Rp {data.total.toLocaleString("id-ID", { minimumFractionDigits: 0 })}</div>
                                  </div>
                                  <button onClick={() => detailPesanan(data.idPesanan)} href="#" class="btn btn-secondary">
                                    Detail Pesanan
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="container-wrapper">
                <div className="accordian_title">
                  <strong>Dibatalkan</strong>
                </div>
                <div class="accordion" id="dibatalkan">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_dibatalkan" aria-expanded="true" aria-controls="collapseOne">
                        Lihat Detail
                      </button>
                    </h2>
                    <div id="collapse_dibatalkan" class="accordion-collapse collapse hidden" aria-labelledby="headingOne" data-bs-parent="#dibatalkan">
                      <div class="accordion-body">
                        <div class="row">
                          {pesananDibatalkan.length === 0 && <div className="noPesanan">Tidak ada pesanan yang Dibatalkan...</div>}
                          {pesananDibatalkan.map((data, index) => (
                            <div class="col-sm-3 mb-3">
                              <div class="card">
                                <div class="card-body">
                                  <h5 class="card-title">Pesanan#{data.idPesanan}</h5>
                                  <div class="card-text mb-2">
                                    <div className="idProduk">{data.waktuPesan}</div>
                                    <div className="harga">Rp {data.total.toLocaleString("id-ID", { minimumFractionDigits: 0 })}</div>
                                  </div>
                                  <button onClick={() => detailPesanan(data.idPesanan)} href="#" class="btn btn-secondary">
                                    Detail Pesanan
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
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
  );
};

export default MainMenu;
