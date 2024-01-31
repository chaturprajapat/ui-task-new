import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductsPage from "../components/ProductPage";
import LoginPage from "../components/LoginPage";


export default function Router() {

  console.log('calling');
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/products"  element={<ProductsPage />} />
          {/* <Route path="*" element={<div>Not Found!</div>} /> */}
      </Routes>
    </BrowserRouter>
  );
}