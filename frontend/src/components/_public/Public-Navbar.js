import "./Public.css";

const PUBLIC_NAVBAR = () => {
    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark psy-3">
                    <div className="container">
                        <a className="navbar-brand mb-2" href="/">My Chicken Coop</a>
                        <button className="navbar-toggler me-3 mb-1" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item"><a className="nav-link" aria-current="page" href="/">Home</a></li>
                                <li className="nav-item"><a className="nav-link" aria-current="page" href="#/">Katalog</a></li>
                                <li className="nav-item"><a className="nav-link" aria-current="page" href="#/">About</a></li>
                                <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#/" role="button" data-bs-toggle="dropdown" aria-expanded="false">Order</a>
                                <ul className="dropdown-menu">
                                    <a className="dropdown-item" href="#/">Current Order</a>
                                    <a className="dropdown-item" href="#/">History</a>
                                </ul>
                                </li>
                                <li className="nav-item"><a className="nav-link" aria-current="page" href="#/">Sign Up</a></li>
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


