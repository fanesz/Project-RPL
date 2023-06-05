// import { useState, useEffect } from 'react'
// import axios from "axios";

import { useNavigate } from "react-router-dom";

const MainMenu = () => {
  const navigate = useNavigate();
  return (
    <div>
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          outline: 0;
          font-family: "Open Sans", sans-serif;
        }
        .container {
          padding: 1rem;
        }
        #produkList {
          height: 5rem;
        }
      `}</style>

      <div className="container">
        <button onClick={() => navigate('/admin/produk')} className="btn btn-primary" id="produkList">
          Produk List
        </button>
      </div>
    </div>
  );
};

export default MainMenu;
