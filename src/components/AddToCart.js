// src/components/Products/AddToCart.js

import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../store/cart";  // Corrected path

const AddToCart = ({ product }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const productInCart = cart[product.id];

  const handleAdd = () => {
    dispatch(addToCart(product));
  };

  const handleRemove = () => {
    dispatch(removeFromCart(product));
  };

  return (
    <div className="add-to-cart-container">
      {productInCart ? (
        <>
          <button className="add-to-cart" onClick={handleRemove}>-</button>
          <span>{productInCart.quantity}</span>
          <button className="add-to-cart" onClick={handleAdd}>+</button>
        </>
      ) : (
        <button className="add-to-cart" onClick={handleAdd}>Add to Cart</button>
      )}
    </div>
  );
};

export default AddToCart;
