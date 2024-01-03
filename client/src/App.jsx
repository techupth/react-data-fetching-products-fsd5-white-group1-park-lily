import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
function App() {
  let productList = [];
  const [product, setProduct] = useState([]);

  const getProduct = async () => {
    let result = await axios.get("http://localhost:4001/products");
    setProduct(result.data.data);
  };
  const deleteProduct = async (event) => {
    console.log(event.target.parentElement.id);
    let idString = event.target.parentElement.id.toString();
    console.log(idString);
    let sendToDelete = await axios.delete(
      "http://localhost:4001/products/" + idString
    );
    getProduct();
  };

  useEffect(() => {
    getProduct();
  }, [product]);
  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {product.map((item) => {
          return (
            <div className="product" key={item.id} id={item.id}>
              <div className="product-preview">
                <img
                  src="https://via.placeholder.com/350/350"
                  alt="some product"
                  width="350"
                  height="350"
                />
              </div>
              <div className="product-detail">
                <h1>Product name: {item.name}</h1>
                <h2>Product price: {item.price} Baht</h2>
                <p>Product description: {item.description}</p>
              </div>

              <button className="delete-button" onClick={deleteProduct}>
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
