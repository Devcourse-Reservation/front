import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import ReservationList from './components/pages/ReservationList'
import ReservationDetail from './components/pages/ReservationDetail' // 오타 수정
import DepartureList from './components/pages/DepartureList'
import ArrivalList from './components/pages/ArrivalList'
import ReadyPage from './components/pages/ReadyPage'
import PaymentPage from './components/pages/PaymentPage' // 결제 페이지 추가
import ReservationConfirm from './components/pages/ReserevationConfirm'
import Login from './components/pages/Login'
import AuthCallback from './components/pages/AuthCallback'
import AdminVerification from './components/pages/VerifyAdmin'

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/callback" element={<AuthCallback />} />{' '}
        {/* ✅ 콜백 라우트 추가 */}
        <Route path="/reservation-list" element={<ReservationList />} />
        <Route path="/reservation-detail/:id" element={<ReservationDetail />} />
        {/* ✅ reservation-detail에 id 파라미터 추가 */}
        <Route path="/departure-list" element={<DepartureList />} />
        <Route path="/arrival-list" element={<ArrivalList />} />
        <Route path="/payment" element={<PaymentPage />} />{' '}
        {/* ✅ 결제 페이지 추가 */}
        <Route path="/ready" element={<ReadyPage />} />
        <Route path="/admin-verification" element={<AdminVerification />} />
        <Route
          path="/reservation-confirm"
          element={<ReservationConfirm />}
        />{' '}
        {/* ✅ 추가 */}
      </Routes>
    </BrowserRouter>
  )
}

export default Routers
