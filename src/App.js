import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Cart from "./components/CartPage";
import { Provider } from "react-redux";
import store from "./store";
import ProductPage from "./components/ProductPage";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [productid,setProductid] = useState()
  const [item,setItem]=useState({})

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <Routes>
            <Route
              path="/"
              element={<ProductList  selectedCategory={selectedCategory} item={item} setItem={setItem}/>}
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/productid/:id" element={<ProductPage item={item} />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
