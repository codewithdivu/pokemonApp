import React from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Registration from "./components/Registration/Registration";
import { LikedPokemons } from "./components/LikedPokemons";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="app bg-dark">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="register" element={<Registration />} />
            <Route exact path="liked" element={<LikedPokemons />} />
            <Route
              path="*"
              element={
                <h className="text-white page-not-found">Page Not Found</h>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
