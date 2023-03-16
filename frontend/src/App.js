import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
import Catalog from "./components/Catalog";
import ForgetPass from "./components/ForgetPass";
import Login from "./components/Login";


function App() {
    return (
        <Router>
    <div className="container">
      
      <div className="columns">
        <div className="column is-half is-offset-one-quarter">
          <Routes>
            <Route exact path="/" element={<ProductList/>} />
            <Route path="/add" element={<AddProduct/>} />
            <Route path="/edit/:id" element={<EditProduct/>} />
            <Route path="/catalog" element={<Catalog/>} />
            <Route path="/forgetpass" element={<ForgetPass/>} />
            <Route path="/login" element={<Login/>} />

          </Routes>
        </div>
      </div>
    </div>
    </Router>
  );
}

export default App;
