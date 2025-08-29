import React, { useState, useEffect } from "react";
import { FaPaypal, FaCreditCard } from "react-icons/fa";
import '../Styles/Register.css'
//orders is an object where  each key is a user's email
export function Customer({ user }) {
  //loading the products from the local storage
  const [products, setProducts] = useState(() => JSON.parse(localStorage.getItem("products")) || []);
  // Load the cart specific to this customer (based on email)
  const [cart, setCart] = useState(() => {
    const carts = JSON.parse(localStorage.getItem("carts")) || {};
    return carts[user.Email] || [];
  });
  // payment method state
  const [payment, setPayment] = useState("paypal"); // default is paypal
  const [paypalEmail, setPaypalEmail] = useState("");//for paypal
  const [cardNumber, setCardNumber] = useState("");//for cart
  const [expiry, setExpiry] = useState("");//for cart expiry date
  // save cart to localStorage whenever it changes
  useEffect(() => {
    // update carts in localStorage
    const carts = JSON.parse(localStorage.getItem("carts")) || {};
    carts[user.Email] = cart;//save cart per user
    localStorage.setItem("carts", JSON.stringify(carts));
  }, [cart, user.Email]);
  //add product to cart
  const addToCart = (product) => {
    setCart([...cart, product]);
  };
//removing items from the cart
const removeFromCart = (id) => {
  const index = cart.findIndex(p => p.id === id); // find first match
  if (index === -1) return; // nothing to remove

  const newCart = [...cart];   // copy cart
  newCart.splice(index, 1);    // remove 1 item at the found index splice(startIndex, deleteCount) removes items from the array w bi ma enno ana badde mn baada 1 bas seeta sar fine ene chil 1 prod at a time
  setCart(newCart);            // update state
};
  //placing an order 
  const placeOrder = () => {
    //if cart is empty stop
    if (cart.length === 0) return alert("Cart is empty!");

    // validate based on payment method
    if (payment === "paypal" && !paypalEmail) {
      return alert("Please enter your PayPal email!");
    }
    if (payment === "card" && (!cardNumber || !expiry)) {
      return alert("Please enter full card details!");
    }
    //calculating the total
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    //load previous orders from localStoragebecause if the user logs out and come  back later or refreshes the page their past order doesnt vanish
    //Convert a string (previously saved with JSON.stringify) back into a JavaScript object or array so you can use it normally in my code.
    const orders = JSON.parse(localStorage.getItem("orders")) || {};
    //build new order
    const newOrder = {
      items: cart,//is the array holding all the products that the user added
      total,
      paymentMethod: payment,//the current selected payment method
      //ternary operator if the paymant method is paypal then 3emelle l osas yalle khassa bl paypal otherwise 3mol l khbar li khassa bl card
      paymentDetails: payment === "paypal"
        ? { email: paypalEmail }
        : { cardNumber: "**** **** **** " + cardNumber.slice(-4), expiry },
      date: new Date().toLocaleString()//Stores the exact timestamp of when the order was placed.
      //toLocaleString() converts it to a human-readable format like:"8/21/2025, 8:25:00 PM"
    };
    //appending new orders
    orders[user.Email] = [...(orders[user.Email] || []), newOrder];
    //Convert a JavaScript object or array into a string so it can be saved in localStorage
    localStorage.setItem("orders", JSON.stringify(orders));
    setCart([]);

    // clear form
    setPaypalEmail("");
    setCardNumber("");
    setExpiry("");

    alert(`Order placed successfully via ${payment.toUpperCase()}! Total: $${total}`);
  };

  return (
    <div>
    <h2 className="show">Products</h2>
    <div className="products">
    {products.map(p => (
      <div key={p.id} className="product-card">
      <h4 className="prod">{p.name}</h4>
      <p>${p.price.toFixed(2)}</p>
      <div>
      <button onClick={() => addToCart(p)} className='button3'>Add to Cart</button>
    </div>
    </div>
  ))}
</div>

      <h2 className="show">Your Cart</h2>
      {cart.length === 0 ? <p>Cart is empty</p> : (
        <div className="products">
          {cart.map((p, idx) => (
            <div key={idx} className="product-card">
              <h4 className="prod">{p.name}</h4>
              <p>${p.price.toFixed(2)}</p>
              <button onClick={() => removeFromCart(p.id)} className='button3'>Remove</button>
            </div>
          ))}
        </div>
      )}

      {/* Payment Selection */}
      <h3>Choose Payment Method</h3>
      <label style={{ gap: "30px" }}>
        <input
          type="radio"
          value="paypal"
          checked={payment === "paypal"}
          onChange={(e) => setPayment(e.target.value)}

        />
  <FaPaypal size={20} color="#94b0e5ff" />

        PayPal
      </label>
      <label style={{  gap: "30px" }}>
        <input
          type="radio"
          value="card"
          checked={payment === "card"}
          onChange={(e) => setPayment(e.target.value)}
        />
  <FaCreditCard size={20} color="#7dbfecff" />

        Card
      </label>

      {/* Mock Checkout Fields */}
      {payment === "paypal" && (
        <div style={{ marginTop: "10px" }}>
          <input
            type="email"
            placeholder="Enter PayPal Email"
            value={paypalEmail}
            onChange={(e) => setPaypalEmail(e.target.value)}
          />
        </div>
      )}

      {payment === "card" && (
        <div style={{ marginTop: "10px" }}>
          <input
            type="text"
            placeholder="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
          <input
            type="text"
            placeholder="Expiry (MM/YY)"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
          />
        </div>
      )}

      <br />
      <button onClick={placeOrder} disabled={cart.length === 0} className="button5">Place Order</button>
    </div>
  );
}
