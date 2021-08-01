import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { DataProvider } from "./GlobalState";
import Header from "./Components/headers/Header";
import MainPages from "./Components/mainpages/Pages";

const App = () => {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header />
          <MainPages />
        </div>
      </Router>
    </DataProvider>
  );
};

export default App;
