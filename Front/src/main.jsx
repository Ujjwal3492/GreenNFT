import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter,Routes,Route } from "react-router";
import App from "./App";
import './index.css'
import TextExtractionComponent from "./components/Image_data";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <React.StrictMode>
  <BrowserRouter>
      <Routes>
          <Route path="/" element={<App />}/>
          <Route path="/some" element={<TextExtractionComponent/>} />
      </Routes>
  </BrowserRouter>
</React.StrictMode>
);
