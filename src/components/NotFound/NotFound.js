import { Link } from "react-router-dom";
import "./NotFound.css";
export function NotFound() {
  return (
    <div className="not-found-outer">
      <div className="not-found-content">
        <p className="not-found-text">
          Oops!The Page you were looking for does not exist
        </p>
        <Link className="not-found-back-button" to="/">
          Go Back to Homepage
        </Link>
      </div>
    </div>
  );
}
