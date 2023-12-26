import { useState, useEffect } from "react";
import "./App.css";
import axios, { Axios } from "axios";

// 1. หา API ก่อนว่าใช้ API ตัวไหน

// 2. สร้าง request ไปหา Server (Axios)
// - ติดตั้ง axios
// - import axios
// - execute axios (useEffect, useState, async)

// 3. นำข้อมูลจาก response มา render

function App() {
  const [productList, setProductList] = useState([]);

  // 2.1 สร้าง function getProductList เอาไว้สร้าง request
  const getProductList = async () => {
    const result = await axios.get("http://localhost:4001/products");
    // ถ้าอยากจะได้ข้อมูลจาก server ต้อง result.data.data เช็คใน console.log
    setProductList(result.data.data);
  };

  // 2.2 execute getProductList แต่ว่าต้องใส่ใน useEffect เพื่อให้สร้าง request
  // แค่ครั้งแรกครั้งเดียวตอนที่ component render
  useEffect(() => {
    getProductList();
  }, [productList]);

  const deleteProduct = async (productID) => {
    await axios.delete(`http://localhost:4001/products/${productID}`);
  };

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      {/* 3. นำข้อมูลจาก response มา render */}
      <div className="product-list">
        {productList.map((product) => {
          return (
            <div className="product" key={product.id}>
              <div className="product-preview">
                <img
                  src={product.image}
                  alt="some product"
                  width="350"
                  height="350"
                />
              </div>
              <div className="product-detail">
                <h1>Product name: {product.name}</h1>
                <h2>Product price: {product.price} Baht</h2>
                <p>Product description: {product.description}</p>
              </div>

              <button
                className="delete-button"
                onClick={() => {
                  deleteProduct(product.id);
                }}
              >
                x
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
