import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/LoginLogout/Login";
import ChangePass from "./components/LoginLogout/ChangePass";
import MainMenu from "./components/Admin/MainMenu"
import ProdukList from "./components/Admin/Produk-List"
import Home from "./components/Homepage/Home";
import Katalog from "./components/Homepage/Katalog";
import Produk from "./components/Homepage/Produk";
import Keranjang from "./components/Homepage/Keranjang";
import Checkout from "./components/Homepage/Checkout";


function App() {
    return (
    <Router>
    <div className="container">
      <div className="columns">
        <div className="column is-half is-offset-one-quarter">
          <Routes>

            {/* login logout */}
            <Route path="/login" element={<Login/>} />


            {/* home n produk */}
            <Route path="/" element={<Home/>} />
            <Route path="/katalog" element={<Katalog/>} />
            <Route path="/produk" element={<Katalog/>} />
            <Route path="/produk/:id" element={<Produk/>} />
            <Route path="/keranjang" element={<Keranjang/>} />
            <Route path="/checkout" element={<Checkout/>} />

            {/* admin */}
            <Route path="/admin" element={<MainMenu/>} />
            <Route path="/admin/produk" element={<ProdukList/>} />


            <Route path="/login" element={<Login/>} />
            <Route path="/akun/forgetpass/:id" element={<ChangePass/>} />


          </Routes>
        </div>
      </div>
    </div>
    </Router>
  );
}

export default App;
