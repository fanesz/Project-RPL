import s from "./css/Home.module.css";
import PUBLIC_NAVBAR from '../_public/Public-Navbar';
import PUBLIC_FOOTER from '../_public/Public-Footer';
import { useNavigate } from "react-router-dom";
import home_1 from "../img/home-1.png";
import home_2 from "../img/home-2.png";
import home_3 from "../img/home-3.png";
import background from "../img/green-farm-blur.jpg";

const Home = () => {

    const navigate = useNavigate();

    return (
    <div>

<style jsx global>{`

`}
</style>

    <div className={s.container_main} style={{ backgroundImage: `url(${background})`}}>

        <PUBLIC_NAVBAR />

        <main>
            <section className={s.main}>
                <h1>Welcome to Ayamku Shop</h1>
                <p>Buy the healthiest baby chickens!</p>
                {/* <a href="#/" className="btn">Shop Now</a> */}
                <button className={s.btn} onClick={() => navigate('/katalog')}>Shop Now</button>
            </section>
            <section className={s.features}>
                <div className={s.feature_box} style={{ backgroundImage: `url(${home_1})`}}>
                    <h3>Fast Shipping</h3>
                    <p>Get your baby chickens delivered right to your farm within 24 hours.</p>
                </div>
                <div className={s.feature_box} style={{ backgroundImage: `url(${home_2})`}}>
                    <h3>Affordable Prices</h3>
                    <p>We offer the best prices for the cutest baby chickens in town.</p>
                </div>
                <div className={s.feature_box} style={{ backgroundImage: `url(${home_3})`}}>
                    <h3>Care for Animals</h3>
                    <p>We believe in providing the best care for our animals to ensure their health and happiness.</p>
                </div>
            </section>
            <section className={s.cta}>
                <h2>Order Your Baby Chickens Today!</h2>
                <button className={s.btn} onClick={() => navigate('/katalog')}>Shop Now</button>
                <br/>mungkin ganti jadi section buat rating/review daripada double ado button Show Now
            </section>
        </main>
                
        <PUBLIC_FOOTER />

    </div>
    </div>
    )
}
 
export default Home


