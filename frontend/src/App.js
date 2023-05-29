import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddProduct from "./components/Admin/Produk-Add";
import EditProduct from "./components/Admin/Produk-Edit";
import Catalog from "./components/Catalog";
import Login from "./components/Login";
import ChangePass from "./components/ChangePass";
import MainMenu from "./components/Admin/MainMenu"
import ProdukList from "./components/Admin/Produk-List"
import Home from "./components/Homepage/Home";


function App() {
    return (
    <Router>
    <div className="container">
      
      <div className="columns">
        <div className="column is-half is-offset-one-quarter">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/catalog" element={<Catalog/>} />
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
