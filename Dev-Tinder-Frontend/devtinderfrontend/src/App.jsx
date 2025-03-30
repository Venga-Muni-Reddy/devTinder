import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from 'react';
import Body from './Components/Body';
import Profile from './Components/Profile';
import Login from './Components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from "react-redux";
import appStore from './utils/appStore';
import Feed from './Components/Feed';
import Connections from "./Components/Connections"
import Request from "./Components/Request";

const App = () => {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Body /> {/* Navbar and Footer stay persistent */}
        <div className="container text-center mt-5">
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/request" element={<Request />} />
            <Route path="/feed" element={<Feed />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;


//eAlLLByywKVsmoRP