import "./Public.css";
import profile from "../img/default_profile.webp";
import { unsetLoginCookie } from "../utils/utils";

const PUBLIC_NAVBAR = () => {



    return (
        <div>
            <header>
                <nav className="navbar navbar-publik navbar-expand-lg navbar-dark bg-dark psy-3">
                    <div className="container">
                        <a className="navbar-brand mb-2" href="/">Ayamku</a>
                        <button className="navbar-toggler me-3 mb-1" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item"><a className="nav-link" aria-current="page" href="/">Home</a></li>
                                <li className="nav-item"><a className="nav-link" aria-current="page" href="/katalog">Katalog</a></li>
                                <li className="nav-item"><a className="nav-link" aria-current="page" href="/about">About</a></li>
                                <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#/" role="button" data-bs-toggle="dropdown" aria-expanded="false">Order</a>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <a className="dropdown-item" href="/keranjang">Keranjang Saya</a>
                                    <a className="dropdown-item" href="/pesanan">Pesanan Saya</a>
                                </ul>
                                </li>
                                <li className="nav-item dropdown profile-dropdown">
                                    <div className="nav-link-profile dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img className="profile_picture float-end rounded-circle" src={profile} />
                                        <a className="nav-link" aria-current="page" href="/about">Profile</a>
                                    </div>
                                    <div className="dropdown_profile">
                                        <ul class="dropdown-menu dropdown-menu-end">
                                            <a className="dropdown-item" href="/profile">Profile Kamu</a>
                                            <a className="dropdown-item" href="/alamat">Alamat Kamu</a>
                                            <a className="dropdown-item" href="/setting">Setting</a>
                                            <a className="dropdown-item" onClick={unsetLoginCookie} href="/login">Logout</a>
                                        </ul>
                                    </div>
                                </li>
                                {/* <li class="nav-item dropdown bg-light profile_wrapper ">
                                    <div class="nav-link dropdown-toggle" className="profile_dropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img className="profile_picture float-end" src={profile} alt="Testing"></img>
                                    </div>
                                    <div className="dropdown_list">
                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" href="#">Sign Up</a></li>
                                            <li><a class="dropdown-item" href="#">Profile</a></li>
                                            <li><a class="dropdown-item" href="#">Address</a></li>
                                            <li><a class="dropdown-item" href="#">Setting</a></li>
                                            <li><a class="dropdown-item" href="#">Logout</a></li>
                                        </ul>
                                    </div>
                                </li> */}
                            </ul>
                            </div>
                        </div>
                    </nav>
            </header>
            <br/><br/><br/><br/>
            
        </div>
    )
}
 
export default PUBLIC_NAVBAR


