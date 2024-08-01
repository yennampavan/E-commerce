// src/components/CartPage.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../store/cart";

const CartPage = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleAdd = (item) => {
    dispatch(addToCart(item));
  };

  const handleRemove = (item) => {
    dispatch(removeFromCart(item));
  };

  // Calculate total
  const totalAmount = Object.values(cart).reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <h1>Cart</h1>
      <div className="cart-items">
        {Object.values(cart).map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} />
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p>Category: {item.category}</p>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <div className="cart-item-actions">
                <button className="add-to-cart" onClick={() => handleAdd(item)}>+</button>
                <a>{item.quantity}</a>
                <button className="add-to-cart" onClick={() => handleRemove(item)}>-</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-total">
        <h2>Total: ${totalAmount.toFixed(2)}</h2>
      </div>
    </div>
  );
};

export default CartPage;
