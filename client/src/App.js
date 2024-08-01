import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "./pages/homepage";
import Login from "./pages/login";
import Register from "./pages/register";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
