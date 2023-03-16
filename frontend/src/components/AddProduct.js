import { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
 
const AddProduct = () => {
    const navigate = useNavigate()
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const history = useNavigate();
 
    const saveProduct = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/products',{
            title: title,
            price: price,
            stock: stock

        });
        history.push("/");
    }
 
    return (
        <div>
            <style jsx global>{`
                body {
                    padding: 3vw;
                }
            `}</style>

            <form onSubmit={ saveProduct }>
                <div className="field">
                    <label className="label">Title</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Title"
                        value={ title }
                        onChange={ (e) => setTitle(e.target.value) }
                    />
                </div>
 
                <div className="field">
                    <label className="label">Price</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Price"
                        value={ price }
                        onChange={ (e) => setPrice(e.target.value) }
                    />
                </div>

                <div className="field">
                    <label className="label">Stock</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Stock"
                        value={ stock }
                        onChange={ (e) => setStock(e.target.value) }
                    />
                </div>
 
                <div className="field">
                    <button className="button is-primary">Save</button>
                </div>
            </form>
            <button onClick={() => navigate('/')}>LIST</button>
        </div>
    )
}
 
export default AddProduct