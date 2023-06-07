import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/LoginLogout/Login";
import ChangePass from "./components/LoginLogout/ChangePass";
import MainMenu from "./components/Admin/MainMenu"
import MainMenuSeller from "./components/Seller/MainMenu"
import ProdukList from "./components/Admin/Produk-List"
import Home from "./components/Homepage/Home";
import Katalog from "./components/Homepage/Katalog";
import Produk from "./components/Homepage/Produk";
import Keranjang from "./components/Homepage/Keranjang";
import Checkout from "./components/Homepage/Checkout";
import Profile from "./components/Homepage/profile/Profile";
import Alamat from "./components/Homepage/profile/Alamat";
import Pesanan from "./components/Homepage/Pesanan";


function App() {
    return (
    <Router>
    <div className="container">
      <div className="columns">
        <div className="column is-half is-offset-one-quarter">
          <Routes>


            {/* home n produk */}
            <Route path="/" element={<Home/>} />
            <Route path="/katalog" element={<Katalog/>} />
            <Route path="/produk" element={<Katalog/>} />
            <Route path="/produk/:id" element={<Produk/>} />
            <Route path="/checkout" element={<Checkout/>} />
            <Route path="/keranjang" element={<Keranjang/>} />
            <Route path="/pesanan" element={<Pesanan/>} />
            
            {/* profile */}
            <Route path="/profile" element={<Profile/>} />
            <Route path="/alamat" element={<Alamat/>} />


            {/* admin */}
            <Route path="/admin" element={<MainMenu/>} />
            <Route path="/admin/produk" element={<ProdukList/>} />

            {/* seller */}
            <Route path="/seller" element={<MainMenuSeller/>} />

            {/* login */}
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
