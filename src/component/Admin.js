import React, { useState, useEffect } from "react";
import '../Styles/Register.css'

export function Admin() {
  //state for products ,initialized from local storage if available
const [products, setProducts] = useState(() => {
    return JSON.parse(localStorage.getItem("products")) || [];
  });

  // state for the name input field
  const [name, setName] = useState("");

  // state for the price input field
  const [price, setPrice] = useState("");

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);
  //adding new product
  const addProduct = () => {
    // if both fields are not filled=> show an alert message
    if (!name || !price) return alert("Enter product name and price!");
    
    const newProduct = {
      id: Date.now(),// unique id (timestamp)
      name,//name 
      price: parseFloat(price)// converting the string price to float 
    };
      // update products state with new product
    setProducts([...products, newProduct]);
     // clear input fields
    setName(""); setPrice("");
  };
  // remove a product by id goes throught each product in the array and let all the ids that are not equal to the id to be removed
  const removeProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };
  // update a product by prompting user for new values
  const updateProduct = (id) => {
    // find the product to update
    const product=products.find(p=>p.id===id);
    //asking for the new name and price
    const newName = prompt("Enter new name: please if you dont want to update the name leave it empty",product.name);
    const newPrice = prompt("Enter new price:please if you dont want to update the name leave it empty",product.price);
    
    // update state with changed values
    setProducts(products.map(p=>p.id===id ?{
      ...p,name:newName &&newName.trim()!==""?newName:p.name,
      price:newPrice && newPrice.trim()!==""?parseFloat(newPrice):p.price
    }:p));
  };

  return (
    <div>
      <h2 className="admin-title">Admin- Product Management</h2>
      <input placeholder="Product name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
      <button onClick={addProduct}className='button5'>Add Product</button>

      <h3>Product Catalog</h3>
      <div className="products">
        {products.map(p => (
          <div key={p.id} className="product-card">
            {p.name} - ${p.price.toFixed(2)}
            <div>
            <button onClick={() => updateProduct(p.id)} className='button4'>Update</button>
            <button onClick={() => removeProduct(p.id)}  className='button4'>Remove</button>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
}