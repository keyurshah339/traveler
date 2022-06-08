import "./Search.css";
import { useLocation, Link } from "react-router-dom";
import { useVideo } from "../Reducer/Reducer";
import { useEffect } from "react";
import { Main } from "../Main/Main";
import { SetLoader } from "../Loader/Loader";

export function Search() {
  const { dispatch, state } = useVideo();
  const { videos, originalVideos } = state;
  //   to get the query params we use useLocation() from react-router
  function useQuery() {
    //   constructor accepts query string | returns URLSearchParms() object
    return new URLSearchParams(useLocation().search);
  }

  let query = useQuery();
  let keyword = query.get("keyword");

  useEffect(() => {
    dispatch({
      type: "SEARCH_FOR_VIDEOS",
      payload: { searchKeyword: keyword },
    });
  }, [originalVideos, dispatch, keyword]);
  if (originalVideos.length > 0) {
    return (
      <div>
        {videos.length > 0 ? (
          <Main videos={videos} />
        ) : (
          <div className="none-found">
            <h1 className="heading-intro">
              Oops!No Videos matched your keyword
            </h1>
            <Link to="/explore">
              <button className="button-back">Explore</button>
            </Link>
          </div>
        )}
      </div>
    );
  } else {
    return <SetLoader />;
  }
}
