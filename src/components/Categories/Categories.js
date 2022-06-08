import "./Categories.css";
import { useVideo } from "../Reducer/Reducer";
import { NavLink } from "react-router-dom";

export function Categories() {
  const { state, dispatch } = useVideo();
  const { originalVideos } = state;
  let categories = ["All"];
  originalVideos.forEach((video) => {
    if (!categories.includes(video.category)) categories.push(video.category);
  });
  return (
    <div className="buttons-outer">
      {categories.map((category) => (
        <>
          <NavLink
            // replace used to remove whitespaces in param
            to={`/categories/${category.replace(/ /g, "")}`}
            className="categories-button"
            activeClassName="selected"
            key={category}
          >
            <button
              onClick={() =>
                dispatch({
                  type: "FILTER_OUT_CATEGORIES",
                  payload: { category },
                })
              }
              className="categories-button-specific"
            >
              {category}
            </button>
          </NavLink>
        </>
      ))}
    </div>
  );
}
