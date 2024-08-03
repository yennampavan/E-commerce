import AddToCart from "./AddToCart";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product,item ,setItem}) => {
  const { id, image, title, price } = product;
  const navigate=useNavigate();
  const handleclick=()=>{
    setItem(product);
    navigate(`/productid/${id}`);
  }
  return (
    <div className="product">
      <div onClick={()=>handleclick()}  className="product-top">
        <img src={image} className="image" alt={title} />
        <div className="title">{title}</div>
      </div>
      <div className="product-body">
        <span>${price}</span>
        <AddToCart product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
