    import "./Homepage.css";
    import { Link } from "react-router-dom";
    import { useAuth } from "../Reducer/AuthReducer";
    export function Homepage() {
      const { stateAuth } = useAuth();
      const { isUserAuthenticated } = stateAuth;
      return isUserAuthenticated ? (
        <div className="homepage">
          <p>TO TRAVEL IS TO LIVE</p>
          <div className="homepage-buttons-outer">
            <Link to="/explore">
              <button className="homepage-single-button">Explore</button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="homepage">
          <p>TO TRAVEL IS TO LIVE</p>
        
          <div className="homepage-buttons-outer">
            <Link to="/explore">
              <button className="homepage-single-button">Explore</button>
            </Link>
            <Link to="/login">
              <button className="homepage-single-button">Sign In</button>
            </Link>
          </div>
        </div>
      );
    }
