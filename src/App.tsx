import React from "react";
import { Footer, Header } from "./components";
import { Heap, MinCut } from "./pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Heap />} />
          <Route path="/mincut" element={<MinCut />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
