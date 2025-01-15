import { BrowserRouter, Route, Routes } from "react-router-dom"
import App from "./App"
import Main from "./pages/main";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/main" element={<Main />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router