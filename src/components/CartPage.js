import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../store/cart";
import './CartPage.css'

const CartPage = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleAdd = (item) => {
    dispatch(addToCart(item));
  };

  const handleRemove = (item) => {
    dispatch(removeFromCart(item));
  };

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
              {/* <p>{item.description}</p> */}
              <p><b>Category:</b> {item.category}</p>
              <p><b>Price:</b> ${item.price}</p>
              <p><b>Quantity:</b> {item.quantity}</p>
              <div className="cart-item-actions">
                <button className="add-to-cart" onClick={() => handleRemove(item)}>-</button>
                <span>{item.quantity}</span>
                <button className="add-to-cart" onClick={() => handleAdd(item)}>+</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-total">
        <p>{console.log(cart.length)}</p>
        <h2>Total: ${totalAmount.toFixed(2)}</h2>
      </div>
    </div>
  );
};

export default CartPage;
