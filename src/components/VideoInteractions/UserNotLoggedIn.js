import { Link } from "react-router-dom";
// css from VideoPlayes.css
export function UserNotLoggedIn() {
  return (
    <div className="interactions">
      <Link to="/login">
        <button title="Like" className="not-liked buttons">
          <ion-icon name="thumbs-up-outline"></ion-icon>
        </button>
      </Link>
      <Link to="/login">
        <button title="Add to Library" className="buttons tooltip">
          <ion-icon name="create-outline"></ion-icon>
        </button>
      </Link>
    </div>
  );
}
