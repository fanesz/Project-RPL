import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddProduct from "./components/Admin/Produk-Add";
import EditProduct from "./components/Admin/Produk-Edit";
import Login from "./components/LoginLogout/Login";
import ChangePass from "./components/LoginLogout/ChangePass";
import MainMenu from "./components/Admin/MainMenu"
import ProdukList from "./components/Admin/Produk-List"
import Home from "./components/Homepage/Home";
import Katalog from "./components/Homepage/Katalog";


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
            <Route path="/login" element={<Login/>} />
            <Route path="/account/forgetpass/:id" element={<ChangePass/>} />

            {/* admin */}
            <Route path="/admin" element={<MainMenu/>} />
            <Route path="/admin/produk" element={<ProdukList/>} />
            <Route path="/admin/add" element={<AddProduct/>} />
            <Route path="/admin/edit/:id" element={<EditProduct/>} />


          </Routes>
        </div>
      </div>
    </div>
    </Router>
  );
}

export default App;
