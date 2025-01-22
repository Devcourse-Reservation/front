import { BrowserRouter, Route, Routes } from "react-router-dom"
import App from "./App"
import ReservationList from "./pages/ReservationList";
import ReservationDeatil from "./pages/ReservationDetail";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/reservation-list" element={<ReservationList />} />
                <Route path="/reservation-detail" element={<ReservationDeatil />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router