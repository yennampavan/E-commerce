import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Cart from "./components/CartPage";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("electronics");

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
              element={<ProductList selectedCategory={selectedCategory} />}
            />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
