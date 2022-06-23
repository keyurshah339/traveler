import { Link } from "react-router-dom";
import { BsHandThumbsUp } from "react-icons/bs";
import { BsFillHandThumbsUpFill } from "react-icons/bs";
import { MdAddCircle } from "react-icons/md";
import { MdOutlineWatchLater } from "react-icons/md";
import { MdOutlineAddCircleOutline } from "react-icons/md";



// css from VideoPlayes.css
export function UserNotLoggedIn() {
  return (
    <div className="interactions">
      <Link to="/login">
        <button title="Like" className="not-liked buttons">
          <BsHandThumbsUp size="1.5em"/>
        </button>
      </Link>
      <Link to="/login">
        <button title="Watchlater" className="not-liked buttons">
          <MdOutlineWatchLater size="1.5em"/>
        </button>
      </Link>
      <Link to="/login">
        <button title="Add to Library" className="buttons tooltip">
            <MdOutlineAddCircleOutline size="1.5em" />
        </button>
      </Link>
    </div>
  );
}
