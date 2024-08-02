import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const ShimmerCard = () => (
  <div className="loading-card">
    <div className="image loading-shimmer"></div>
    <div
      className="title loading-shimmer"
      style={{ marginTop: "1rem", height: "1rem" }}
    ></div>
    <div
      className="title loading-shimmer"
      style={{ marginTop: "0.5rem", height: "1rem", width: "80%" }}
    ></div>
  </div>
);

const ProductList = ({ selectedCategory }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]); // Adjust default range as needed

  useEffect(() => {
    setLoading(true);
    const url =
      selectedCategory === "all"
        ? "https://fakestoreapi.com/products"
        : `https://fakestoreapi.com/products/category/${selectedCategory}`;
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setProducts(json);
        setLoading(false);
      });
  }, [selectedCategory]);

  const filteredProducts =
    selectedCategory === "all"
      ? products
          .filter((product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .filter((product) => {
            const [minPrice, maxPrice] = priceRange;
            return product.price >= minPrice && product.price <= maxPrice;
          })
      : products;

  if (loading) {
    return (
      <div className="products">
        {Array.from({ length: 6 }, (_, index) => (
          <ShimmerCard key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="products">
      {selectedCategory === "all" && (
        <div className="filters">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <div className="range-filters">
            <label>
              Min Price: ${priceRange[0]}
              <input
                type="range"
                min="0"
                max="1000"
                step="10"
                value={priceRange[0]}
                onChange={(e) =>
                  setPriceRange([Number(e.target.value), priceRange[1]])
                }
                className="range-input"
              />
            </label>
            <label>
              Max Price: ${priceRange[1]}
              <input
                type="range"
                min="0"
                max="1000"
                step="10"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], Number(e.target.value)])
                }
                className="range-input"
              />
            </label>
          </div>
        </div>
      )}
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
