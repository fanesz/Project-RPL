import { useState, useEffect } from 'react'
import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
import img_anakAyam from "../img/anakayam.jpg"

const Catalog = () => {
    const [products, setProduct] = useState([]);
    // const navigate = useNavigate()
 
    useEffect(() => {
        getProducts();
    }, []);
 
    const getProducts = async () => {
        const response = await axios.get('http://localhost:5000/products')
        setProduct(response.data);
    }
 
    // const deleteProduct = async (id) => {
    //     await axios.delete(`http://localhost:5000/products/${id}`);
    //     getProducts();
    // }

    function refreshPage() {
        window.location.reload(false);
    }




  return (
    <div>
            
<style jsx global>{`
.product-catalog {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #fdfff7;
}
.product-card {
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 2rem;
  max-width: 20rem;
  color: black;
  margin-left: 2rem;
  margin-right: 2rem;
}
a{text-decoration: none;}
a:visited{text-decoration: none;}
a:link{text-decoration: none;}

.product-image {
  height: 250px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info {
  padding: 20px;
}

.product-name {
  font-size: 1.2em;
  margin-bottom: 10px;
}

.product-description {
  margin-bottom: 10px;
  font-size: 0.9em;
}

.product-price {
  font-weight: bold;
  font-size: 1.2em;
  margin-bottom: 10px;
}

.add-to-cart-button {
  background-color: #4CAF50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.add-to-cart-button:hover {
  background-color: #3e8e41;
}
`}
</style>
    
            

      <br />
      <div class="product-catalog">
      { products.map((product, index) => (
          <div class="product-card">
              <div class="product-image">
                  <img src={img_anakAyam} alt="ayam lucuk"/>
              </div>
              <div class="product-info">
                  <h3 class="product-name">Product Name</h3>
                  <p class="product-description">Product description goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut sapien euismod, sodales elit a, efficitur velit.</p>
                  <div class="product-stok">stok :  {product.stock}</div>
                  <div class="product-price">Rp. {product.price}</div>
                  <button class="add-to-cart-button">Add to Cart</button>
              </div>
          </div>
      )) }
      </div>

    <br />
    <button onClick={refreshPage}>Click to reload!</button>
    </div>
    )
}
 
export default Catalog