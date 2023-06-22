import React from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import Header from "./components/header/header";

function App() {
  return (
    <div className="App">
      <Header />
      <ToastContainer />
    </div>
  );
}

export default App;
