import { Routes, Route } from "react-router-dom";
import FirstPage from "./components/FirstPage/FirstPage";
import Login from "./components/Login";
import Register from "./components/Register";
import { WindowContextProvider } from "./components/ScreenSize";

function App() {

  return (
    <>
      <WindowContextProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/firstPage" element={<FirstPage />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </WindowContextProvider>
    </>
  );
}

export default App;
