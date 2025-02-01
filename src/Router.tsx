import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import ReservationList from './components/pages/ReservationList'
import ReservationDeatil from './components/pages/ReservationDetail'
import DepartureList from './components/pages/DepartureList'
import ArrivalList from './components/pages/ArrivalList'
import ReadyPage from './components/pages/ReadyPage'

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/reservation-list" element={<ReservationList />} />
        <Route path="/reservation-detail" element={<ReservationDeatil />} />
        <Route path="/departure-list" element={<DepartureList />} />
        <Route path="/arrival-list" element={<ArrivalList />} />
        <Route path="/ready" element={<ReadyPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Routers
