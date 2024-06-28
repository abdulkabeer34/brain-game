import "./App.css";
import { GameArea, Navbar } from "./Interface";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { History } from "./Interface/Pages/History";
import { ConfigProvider } from "antd";
import { AntdTheme } from "./UseCases";

const App = () => {
  return (
   <ConfigProvider theme={AntdTheme}>
    <div className="bg-purple-50">
     <Router>
      <Navbar />
      <Routes>
        <Route Component={GameArea} path="/"/>
        <Route Component={History} path="/history"/>
      </Routes>
    </Router>
   </div>
   </ConfigProvider>
  );
};

export default App;
