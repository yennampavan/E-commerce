import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Logo from "../logo.png";

const Header = ({ selectedCategory, setSelectedCategory }) => {
  const [data, setData] = useState([]);
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate(); // Add this line to use the navigate hook

  const total = () => {
    let count = 0;
    for (let item in cart) {
      count += cart[item].quantity;
    }
    return count;
  };

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        if (Array.isArray(json)) {
          const categories = [...new Set(json.map(product => product.category))];
          setData(categories);
        } else {
          console.error("Fetched data is not an array:", json);
        }
      });
  }, []);

  const handleCartClick = () => {
    navigate('/cart'); // Navigate to the cart page
  };
  const handlecategory=(category)=>{
    setSelectedCategory(category);
    navigate(`/`);
  }

  return (
    <div className="header-items">
      <div className="logo">
        <img src={Logo} alt="logo" />
      </div>
      {data.map((category) => (
        <div
          key={category}
          onClick={() => handlecategory(category)}
          className={
            "header-item " +
            (category === selectedCategory ? "header-item--selected" : "")
          }
        >
          {category}
        </div>
      ))}
      <div className="shopping-cart" onClick={handleCartClick}>
        <FontAwesomeIcon icon={faShoppingCart} />
        <span className="cart-length">{total()}</span>
      </div>
    </div>
  );
};

export default Header;
