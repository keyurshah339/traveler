import { Link } from "react-router-dom";
import { BsHandThumbsUp } from "react-icons/bs";
import { BsFillHandThumbsUpFill } from "react-icons/bs";
import { MdAddCircle } from "react-icons/md";

// css from VideoPlayes.css
export function UserNotLoggedIn() {
  return (
    <div className="interactions">
      <Link to="/login">
        <button title="Like" className="not-liked buttons">
          <BsHandThumbsUp/>
        </button>
      </Link>
      <Link to="/login">
        <button title="Add to Library" className="buttons tooltip">
            <MdAddCircle />
        </button>
      </Link>
    </div>
  );
}
