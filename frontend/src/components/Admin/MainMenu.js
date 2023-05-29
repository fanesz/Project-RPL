// import { useState, useEffect } from 'react'
// import axios from "axios";

const MainMenu = () => {





  return (
    <div>
        <style jsx global>{`
        * {
            margin: 0;
            padding: 0;
            outline: 0;
            font-family: "Open Sans", sans-serif;
        }
        .container{
            padding: 1rem;
        }
        #produkList{
            height: 5rem;
        }
        
        `}</style>

        <div className="container">

            <a href="/admin/produk">
                <button className="btn btn-primary" id="produkList">Produk List</button>
            </a>


        </div>
    
    </div>

    )
}
 
export default MainMenu