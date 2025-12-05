import { BrowserRouter, Route, Routes } from "react-router-dom";
import TopNav from "./componets/NavBar/TopNav";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//Components
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./booking/Home";
import Dashboard from "./user/Dashboard";
import PrivateRoute from "./componets/PrivateRoute/PrivateRoute";
import DashboardSeller from "./user/DashboardSeller";
import NewHotels from "./hotels/NewHotels";
import StripeCallback from "./stripe/StripeCallback";
import EditHotel from "./hotels/EditHotel";
import ViewHotel from "./hotels/ViewHotel";
import StripeSuccess from "./stripe/StripeSuccess";
import StripeCancel from "./stripe/StripeCancel";
import SearchResult from "./hotels/SearchResult";

function App() {
  return (
    <BrowserRouter>
      <TopNav />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/seller"
          element={
            <PrivateRoute>
              <DashboardSeller />
            </PrivateRoute>
          }
        />
        <Route
          path="/hotels/new"
          element={
            <PrivateRoute>
              <NewHotels />
            </PrivateRoute>
          }
        />
        <Route
          path="/hotel/edit/:hotelId"
          element={
            <PrivateRoute>
              <EditHotel />
            </PrivateRoute>
          }
        />
        <Route
          path="/stripe/callback"
          element={
            <PrivateRoute>
              <StripeCallback />
            </PrivateRoute>
          }
        />
        <Route
          path="/stripe/success/:hotelId"
          element={
            <PrivateRoute>
              <StripeSuccess />
            </PrivateRoute>
          }
        />
        <Route
          path="/stripe/cencel"
          element={
            <PrivateRoute>
              <StripeCancel />
            </PrivateRoute>
          }
        />
        <Route path="/hotel/:hotelId" Component={ViewHotel}/>
        <Route path="/search-result" element={<SearchResult />} />
      </Routes>
    </BrowserRouter>
  )
};

export default App;