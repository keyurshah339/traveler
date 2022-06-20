import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { MdOutlineExplore } from "react-icons/md";
import { ImLibrary } from "react-icons/im";
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
            <AiFillHome />
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
            <MdOutlineExplore />
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
            <ImLibrary />
          </span>
          <span className="adjustment icon-text">Library</span>
        </div>
      </NavLink>
    </div>
  );
}
