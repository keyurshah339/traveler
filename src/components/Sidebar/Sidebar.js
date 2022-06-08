import "./Sidebar.css";
import { NavLink } from "react-router-dom";
export function Sidebar() {
  return (
    <div className="sidebar">
      <NavLink
        to="/"
        end
        className="sidebar-link"
        activeClassName="sidebar-icon-selected"
      >
        <div className="side-icon">
          <span className="adjustment">
            <ion-icon name="home-outline"></ion-icon>
          </span>
          <span className="adjustment icon-text">Home</span>
        </div>
      </NavLink>
      <NavLink
        to="/explore"
        className="sidebar-link"
        activeClassName="sidebar-icon-selected"
      >
        <div className="side-icon">
          <span className="adjustment">
            <ion-icon name="compass-outline"></ion-icon>
          </span>
          <span className="adjustment icon-text">Explore</span>
        </div>
      </NavLink>
      <NavLink
        to="/library"
        className="sidebar-link"
        activeClassName="sidebar-icon-selected"
      >
        <div className="side-icon">
          <span className="adjustment">
            <ion-icon name="library-outline"></ion-icon>
          </span>
          <span className="adjustment icon-text">Library</span>
        </div>
      </NavLink>
    </div>
  );
}
