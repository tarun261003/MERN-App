import React, { useState } from "react";
import Navbar from "./components/Navbat/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Placeorder from "./pages/Placeorder/Placeorder";
import Footer from "./components/Footer/Footer";
import Loginpop from "./components/popup/Loginpop";

const App = () => {
  const [showLogin,setshowLogin] = useState(false)

  return (
    <>
    {showLogin?<Loginpop setshowLogin={setshowLogin}/>:<></>}
      <div className="App">
        <Navbar setshowLogin={setshowLogin}></Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Placeorder />} />
          <Route path='/login' element={<Loginpop/>}/>
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
