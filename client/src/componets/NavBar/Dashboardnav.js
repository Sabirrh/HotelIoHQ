import { NavLink } from "react-router-dom";

const DashboardNav = () => {
  return (
    <div className="container mt-3">
      <ul className="nav nav-tabs rounded shadow-sm bg-white p-2">
        <li className="nav-item">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              "text-decoration-none px-3 py-2 rounded " +
              (isActive
                ? "bg-primary text-white fw-bold"
                : "bg-light text-dark")
            }
          >
            Your Bookings
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/dashboard/seller"
            className={({ isActive }) =>
              "text-decoration-none px-3 py-2 rounded " +
              (isActive
                ? "bg-primary text-white fw-bold"
                : "bg-light text-dark")
            }
          >
            Your Hotels
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default DashboardNav;
