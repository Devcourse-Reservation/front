import { BrowserRouter, Route, Routes } from "react-router-dom"
import App from "./App"
import Login from "./pages/Login"; 
import LoginSuccess from "./pages/LoginSuccess"; 

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* 메인 페이지 */}
                <Route path="/" element={<App />} />
                {/* 로그인 페이지 */}
                <Route path="/login" element={<Login />} />
                {/* 로그인 확인 페이지 */}
                <Route path="/loginsuccess" element={<LoginSuccess />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router