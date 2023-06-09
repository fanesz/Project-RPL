import "./Public.css";
import profile from "../img/default_profile.webp";
import { unsetLoginCookie } from "../utils/utils";
import { useNavigate } from "react-router-dom";

const ADMIN_NAVBAR = () => {

  const navigate = useNavigate();

  const logout = () => {
    unsetLoginCookie();
    navigate('/login');
  }

    return (
        <div>
        <header>
        <nav className="navbar navbar-admin navbar-expand-lg navbar-dark bg-dark psy-3">
            <div className="container">
                <a className="navbar-brand mb-2" href="/admin">Ayamku - admin</a>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 p-2 me-4">
                        <li className="nav-item">
                            <button onClick={ () => navigate('/admin/produk') } className="btn btn-success rounded text-light py-3 px-3 me-4 opacity-75">Daftar Produk</button>
                        </li>
                        <li className="nav-item">
                            <button onClick={ () => navigate('/admin/akun') } className="btn btn-success rounded text-light py-3 px-3 me-4 opacity-75">Daftar Akun</button>
                        </li>
                        <li className="nav-item">
                            <button onClick={ logout } className="btn btn-secondary rounded text-light py-3 px-3 me-4 opacity-75">Logout</button>
                        </li>

                    </ul>
                    </div>
                </div>
            </nav>
        </header>
        <br/><br/><br/><br/>
            
        </div>
    )
}
 
export default ADMIN_NAVBAR


