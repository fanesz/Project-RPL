import "./css/Home.css";
import PUBLIC_NAVBAR from '../_public/Public-Navbar';
import PUBLIC_FOOTER from '../_public/Public-Footer';
import { useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate();

    return (
    <div>

<style jsx global>{`

`}
</style>

    <div className="container" id="background">

        <PUBLIC_NAVBAR />

        <main>
            <section className="main">
                <h1>Welcome to Baby Chicken</h1>
                <p>Buy the cutest baby chickens in town!</p>
                {/* <a href="#/" className="btn">Shop Now</a> */}
                <button className="btn" onClick={() => navigate('/catalog')}>Shop Now</button>
            </section>
            <section className="features">
                <div className="feature-box" id="section-1">
                    <i className="fas fa-shipping-fast"></i>
                    <h3>Fast Shipping</h3>
                    <p>Get your baby chickens delivered right to your doorstep within 24 hours.</p>
                </div>
                <div className="feature-box" id="section-2">
                    <i className="fas fa-hand-holding-usd"></i>
                    <h3>Affordable Prices</h3>
                    <p>We offer the best prices for the cutest baby chickens in town.</p>
                </div>
                <div className="feature-box" id="section-3">
                    <i className="fas fa-heart"></i>
                    <h3>Care for Animals</h3>
                    <p>We believe in providing the best care for our animals to ensure their health and happiness.</p>
                </div>
            </section>
            <section className="cta">
                <h2>Order Your Baby Chickens Today!</h2>
                <button className="btn" onClick={() => navigate('/catalog')}>Shop Now</button>
            </section>
        </main>
                
        <PUBLIC_FOOTER />

    </div>
    </div>
    )
}
 
export default Home


