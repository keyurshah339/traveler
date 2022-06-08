import "./Explore.css";
import { Categories } from "../Categories/Categories";
import { Main } from "../Main/Main";
import { useVideo } from "../Reducer/Reducer";
import { useLocation } from "react-router-dom";
import { SetLoader } from "../Loader/Loader";
export function Explore() {
  const { state } = useVideo();
  const { videos, originalVideos } = state;
  const location = useLocation();
  if (originalVideos.length > 0) {
    return (
      <div>
        <div className="categories">
          <Categories />
        </div>
        {}
        <div>
          {location.pathname === "/explore" && <Main videos={originalVideos} />}
          {location.pathname !== "/explore" && <Main videos={videos} />}
        </div>
      </div>
    );
  } else {
    return <SetLoader />;
  }
}
